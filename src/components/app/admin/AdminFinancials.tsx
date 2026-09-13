import React, { useState } from 'react';
import { 
  DollarSign, Plus, Search, CheckCircle, Clock, AlertTriangle, 
  Download, FileText, X, ArrowUpRight, TrendingUp, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminInvoice, AdminProject } from '../../../types';

interface AdminFinancialsProps {
  invoices: AdminInvoice[];
  projects: AdminProject[];
  onAddInvoice: (inv: AdminInvoice) => void;
  onUpdateInvoice: (inv: AdminInvoice) => void;
  onDeleteInvoice: (invId: string) => void;
}

export default function AdminFinancials({
  invoices,
  projects,
  onAddInvoice,
  onUpdateInvoice,
  onDeleteInvoice,
}: AdminFinancialsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newInvoice, setNewInvoice] = useState<Partial<AdminInvoice>>({
    invoiceNumber: `BS-2026-0${Math.floor(55 + Math.random() * 40)}`,
    projectName: projects[0]?.title || 'Modern 3-Bedroom Residence',
    clientName: projects[0]?.clientName || 'Mira Henderson',
    amount: 50000,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '2026-09-15',
    status: 'Pending',
    phaseDescription: 'Phase 3: MEP Rough-in & Inspection Approval'
  });

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((acc, i) => acc + i.amount, 0);

  const filteredInvoices = invoices.filter((i) => {
    const matchesSearch = 
      i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.clientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoice.amount) return;

    const invoice: AdminInvoice = {
      id: `INV-${Math.floor(800 + Math.random() * 200)}`,
      invoiceNumber: newInvoice.invoiceNumber || `BS-2026-099`,
      projectName: newInvoice.projectName || 'General Construction',
      clientName: newInvoice.clientName || 'Client',
      amount: Number(newInvoice.amount) || 0,
      issueDate: newInvoice.issueDate || new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate || '2026-09-30',
      status: (newInvoice.status as any) || 'Pending',
      phaseDescription: newInvoice.phaseDescription || 'Milestone invoice'
    };

    onAddInvoice(invoice);
    setIsCreateModalOpen(false);
  };

  const handleStatusToggle = (inv: AdminInvoice, newStatus: AdminInvoice['status']) => {
    onUpdateInvoice({ ...inv, status: newStatus });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#06110D]">Financial Ledger & Invoicing Center</h1>
          <p className="text-sm text-[#666]">
            Track milestone payments, capital calls, change orders, and project cashflow.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus size={16} />
          <span>Issue Progress Invoice</span>
        </button>
      </div>

      {/* Financial Health Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-[#A7F3D0] shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#777]">Total Contract Invoicing</p>
          <p className="text-3xl font-bold text-[#06110D] mt-2">${totalInvoiced.toLocaleString()}</p>
          <p className="text-xs text-[#888] mt-1">{invoices.length} Invoices Issued to Date</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#A7F3D0] shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Settled & Deposited</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">${totalPaid.toLocaleString()}</p>
          <p className="text-xs text-[#888] mt-1">{((totalPaid / (totalInvoiced || 1)) * 100).toFixed(0)}% Collection Rate</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#A7F3D0] shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Outstanding Receivable</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">${totalPending.toLocaleString()}</p>
          <p className="text-xs text-[#888] mt-1">Pending escrow / client payment</p>
        </div>
      </div>

      {/* Filter and Invoices List */}
      <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
            <input
              type="text"
              placeholder="Search invoices by number, client or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-3.5 py-2 rounded-xl bg-white border border-[#A7F3D0] text-xs font-semibold text-[#06110D]"
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-[#F0EFED]">
          {filteredInvoices.length === 0 ? (
            <div className="p-12 text-center text-sm text-[#777]">
              No invoices match your filter.
            </div>
          ) : (
            filteredInvoices.map((inv) => (
              <div key={inv.id} className="p-5 hover:bg-[#FFFFFF] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#06110D] bg-[#F0FDF4] px-2.5 py-1 rounded-lg">
                      {inv.invoiceNumber}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      inv.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#06110D] mt-1.5">{inv.projectName}</h3>
                  <p className="text-xs text-[#666] mt-0.5">
                    Client: <strong>{inv.clientName}</strong> • {inv.phaseDescription}
                  </p>
                  <p className="text-[11px] text-[#888] mt-1">
                    Issued: {inv.issueDate} • Due Date: <span className="font-semibold text-[#444]">{inv.dueDate}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#F0EFED]">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-[#888] block">Invoice Amount</span>
                    <span className="text-2xl font-bold text-[#06110D]">${inv.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {inv.status !== 'Paid' ? (
                      <button
                        onClick={() => handleStatusToggle(inv, 'Paid')}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusToggle(inv, 'Pending')}
                        className="px-3 py-1.5 rounded-xl bg-[#F0FDF4] hover:bg-[#A7F3D0] text-xs font-semibold text-[#666] transition-colors"
                      >
                        Reopen
                      </button>
                    )}

                    <button
                      onClick={() => alert(`Downloading PDF Invoice ${inv.invoiceNumber}...`)}
                      className="p-2 rounded-xl bg-white border border-[#A7F3D0] hover:bg-[#F0FDF4] text-[#06110D] text-xs"
                      title="Download PDF"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Project Budget Utilization Table */}
      <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[#06110D] mb-4">Project Budget Burn & Cost Tracking</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#A7F3D0] text-[#888] uppercase font-bold text-[10px]">
                <th className="pb-3">Project Title</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Approved Budget</th>
                <th className="pb-3">Capital Spent</th>
                <th className="pb-3">Burn %</th>
                <th className="pb-3 text-right">Remaining Reserve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFED]">
              {projects.map((p) => {
                const burnRate = ((p.spent / (p.budget || 1)) * 100).toFixed(1);
                const remaining = p.budget - p.spent;
                return (
                  <tr key={p.id} className="hover:bg-[#FFFFFF]">
                    <td className="py-3.5 font-bold text-[#06110D]">{p.title}</td>
                    <td className="py-3.5 text-[#555]">{p.clientName}</td>
                    <td className="py-3.5 font-semibold text-[#06110D]">${p.budget.toLocaleString()}</td>
                    <td className="py-3.5 font-semibold text-[#047857]">${p.spent.toLocaleString()}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#A7F3D0] rounded-full overflow-hidden">
                          <div className="h-full bg-[#10B981]" style={{ width: `${Math.min(Number(burnRate), 100)}%` }} />
                        </div>
                        <span className="font-bold">{burnRate}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right font-bold text-emerald-600">${remaining.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE INVOICE MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#06110D]">Generate Progress Invoice</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="w-8 h-8 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#555]">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Invoice Number</label>
                    <input
                      type="text"
                      required
                      value={newInvoice.invoiceNumber}
                      onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Amount ($)</label>
                    <input
                      type="number"
                      required
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Associated Project</label>
                  <select
                    value={newInvoice.projectName}
                    onChange={(e) => {
                      const selectedPrj = projects.find(p => p.title === e.target.value);
                      setNewInvoice({
                        ...newInvoice,
                        projectName: e.target.value,
                        clientName: selectedPrj?.clientName || newInvoice.clientName
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Issue Date</label>
                    <input
                      type="date"
                      value={newInvoice.issueDate}
                      onChange={(e) => setNewInvoice({ ...newInvoice, issueDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Milestone Description</label>
                  <textarea
                    rows={2}
                    value={newInvoice.phaseDescription}
                    onChange={(e) => setNewInvoice({ ...newInvoice, phaseDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-xl border border-[#A7F3D0] text-sm text-[#666]">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#333] text-white text-sm font-bold shadow-md">Issue Invoice</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
