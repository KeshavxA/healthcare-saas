self.addEventListener("install", (event) => {
  console.log("Healthcare SaaS Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Healthcare SaaS Service Worker activated");
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title || "HealthCare Alert", {
      body: data.body || "You have a new notification",
      icon: "/logo192.png",
      badge: "/logo192.png",
      tag: "healthcare-notification",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/dashboard")
  );
});
