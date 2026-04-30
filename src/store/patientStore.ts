import { create } from "zustand";
import { Patient, ViewMode } from "../types";
import { mockPatients } from "../constants/mockData";

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  selectedPatient: Patient | null;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedPatient: (patient: Patient | null) => void;
  getFilteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>()((set, get) => ({
  patients: mockPatients,
  viewMode: "grid",
  searchQuery: "",
  selectedPatient: null,
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedPatient: (selectedPatient) => set({ selectedPatient }),
  getFilteredPatients: () => {
    const { patients, searchQuery } = get();
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
}));
