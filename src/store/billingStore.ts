import { create } from "zustand";
import { Invoice } from "../types";
import { mockInvoices } from "../constants/mockData";

interface BillingState {
  invoices: Invoice[];
  searchQuery: string;
  statusFilter: string | null;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string | null) => void;
  getFilteredInvoices: () => Invoice[];
  markAsPaid: (invoiceId: string) => void;
}

export const useBillingStore = create<BillingState>()((set, get) => ({
  invoices: mockInvoices,
  searchQuery: "",
  statusFilter: null,
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  
  getFilteredInvoices: () => {
    const { invoices, searchQuery, statusFilter } = get();
    
    return invoices.filter((inv) => {
      const matchesSearch = 
        inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        inv.id.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter ? inv.status === statusFilter : true;
      
      return matchesSearch && matchesStatus;
    });
  },
  
  markAsPaid: (invoiceId) => {
    set((state) => ({
      invoices: state.invoices.map((inv) => 
        inv.id === invoiceId ? { ...inv, status: "Paid" } : inv
      )
    }));
  }
}));
