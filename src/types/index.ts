export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  status: "Active" | "Critical" | "Stable" | "Discharged";
  doctor: string;
  admissionDate: string;
  bloodGroup: string;
  contact: string;
  avatar?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "critical";
  timestamp: Date;
  read: boolean;
}

export type ViewMode = "grid" | "list";
