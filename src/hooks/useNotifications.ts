import { useCallback } from "react";

/**
 * ARCHITECTURAL DECISION: Hook-based Notification Orchestration
 * We encapsulate notification logic in a custom hook to separate the "What" (UI triggering an alert)
 * from the "How" (Service Worker registration, Permission API, and Local Notification API).
 * This allows us to easily swap the delivery mechanism (e.g., moving from local notifications 
 * to Firebase Cloud Messaging) without touching the component layer.
 */

export const useNotifications = () => {
  const registerSW = useCallback(async () => {
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered successfully:", reg.scope);
      } catch (err) {
        console.error("Service Worker registration failed:", err);
      }
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }
    
    if (Notification.permission === "granted") return true;
    
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }, []);

  const sendNotification = useCallback((title: string, body: string, type: "Critical" | "Stable" | "Info" = "Info") => {
    if (Notification.permission === "granted") {
      new Notification(title, { 
        body, 
        icon: "/logo192.png",
        badge: "/logo192.png",
        tag: type,
        requireInteraction: type === "Critical"
      });
    } else {
      console.warn("Notification permission not granted");
    }
  }, []);

  const notifyCriticalPatient = useCallback((patientName: string) => {
    sendNotification(
      "⚠️ Critical Alert",
      `Patient ${patientName} requires immediate attention!`,
      "Critical"
    );
  }, [sendNotification]);

  return { 
    registerSW, 
    requestPermission, 
    sendNotification, 
    notifyCriticalPatient 
  };
};
