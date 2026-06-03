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
  weight?: number;
  height?: number;
  allergies?: string[];
  medicalHistory?: string[];
  prescriptions?: Prescription[];
  labResults?: LabResult[];
}

export interface Appointment {
  id: string;
  title: string;
  patientName: string;
  doctorName: string;
  start: Date;
  end: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
  type: "Consultation" | "Follow-up" | "Surgery" | "Routine Checkup";
  isVirtual?: boolean;
  meetingLink?: string;
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

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  date: string;
  doctor: string;
}

export interface LabResult {
  id: string;
  testName: string;
  result: string;
  normalRange: string;
  date: string;
  status: "Normal" | "Abnormal" | "Critical";
}
