import { Patient } from "../types";
import { mockPatients } from "../constants/mockData";

export const patientService = {
  getAll: async (): Promise<Patient[]> => {
    // In a real app, this would be a Firebase/API call
    return Promise.resolve(mockPatients);
  },
  
  getById: async (id: string): Promise<Patient | undefined> => {
    return Promise.resolve(mockPatients.find(p => p.id === id));
  }
};
