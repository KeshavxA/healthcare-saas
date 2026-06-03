import React, { useMemo } from 'react';
import { useBillingStore } from '../../store/billingStore';
import { 
  Search, Filter, Plus, FileText, CheckCircle, 
  Clock, AlertCircle, Shield, MoreVertical, Download 
} from 'lucide-react';
import { Invoice } from '../../types';

const StatusBadge = ({ status }: { status: Invoice["status"] }) => {
  const styles: any = {
    "Paid": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    "Pending": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    "Overdue": "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    "Insurance Pending": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
  };
  
  const icons: any = {
    "Paid": <CheckCircle className="w-3.5 h-3.5 mr-1" />,
    "Pending": <Clock className="w-3.5 h-3.5 mr-1" />,
    "Overdue": <AlertCircle className="w-3.5 h-3.5 mr-1" />,
    "Insurance Pending": <Shield className="w-3.5 h-3.5 mr-1" />,
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const BillingPage = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    getFilteredInvoices,
    markAsPaid,
    invoices
  } = useBillingStore();

  const filteredInvoices = useMemo(() => getFilteredInvoices(), [getFilteredInvoices]);

  // Derived metrics
  const totalRevenue = useMemo(() => {
    return invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  }, [invoices]);
  
  const pendingAmount = useMemo(() => {
    return invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((acc, curr) => acc + curr.amount, 0);
  }, [invoices]);

  const insuranceClaims = useMemo(() => {
    return invoices.filter(i => i.status === 'Insurance Pending').reduce((acc, curr) => acc + curr.amount, 0);
  }, [invoices]);

  return (
    <div className="space-y-8 pb-10 fade-in h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Billing & Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage patient payments and insurance claims</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Payments</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">${pendingAmount.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Insurance Claims</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">${insuranceClaims.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search invoices by ID or Patient Name..."
            className="input-field pl-12 bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="input-field bg-slate-50 dark:bg-slate-800 border-transparent dark:text-white"
            value={statusFilter || ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Insurance Pending">Insurance Pending</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-700">
            <Filter className="w-5 h-5" />
            More
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invoice ID</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patient</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dates</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        {invoice.id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{invoice.patientName}</p>
                      {invoice.insuranceProvider && (
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Shield className="w-3 h-3" /> {invoice.insuranceProvider}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <p className="text-slate-600 dark:text-slate-300">Issued: {invoice.date}</p>
                      <p className="text-slate-500 text-xs">Due: {invoice.dueDate}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {invoice.status !== 'Paid' && (
                          <button 
                            onClick={() => markAsPaid(invoice.id)}
                            className="px-3 py-1.5 text-xs font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all" title="Download PDF">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No invoices found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Try adjusting your search query or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
