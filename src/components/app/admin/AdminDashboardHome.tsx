import React, { useState } from 'react';
import { 
  Activity, Calendar, FileText, DollarSign, Users, CheckCircle2, 
  Clock, AlertTriangle, ArrowRight, Plus, ExternalLink, ShieldCheck,
  TrendingUp, HardHat, Compass, Eye, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminProject, AdminConsultation, AdminDocument, AdminInvoice, AdminActivityLog } from '../../../types';

interface AdminDashboardHomeProps {
  projects: AdminProject[];
  consultations: AdminConsultation[];
  documents: AdminDocument[];
  invoices: AdminInvoice[];
  activityLogs?: AdminActivityLog[];
  onNavigateTab: (tab: string) => void;
  onOpenCreateProject?: () => void;
  onOpenCreateConsultation?: () => void;
}

export default function AdminDashboardHome({
  projects,
  consultations,
  documents,
  invoices,
  activityLogs = [],
  onNavigateTab,
  onOpenCreateProject,
  onOpenCreateConsultation,
}: AdminDashboardHomeProps) {
  // Aggregate stats
  const activeProjectsCount = projects.filter(p => p.status === 'Active').length;
  const pendingConsultationsCount = consultations.filter(c => c.status === 'Pending').length;
  const pendingDocumentsCount = documents.filter(d => d.status === 'Under Review' || d.status === 'Needs Revision').length;
  
  const totalBudgetManaged = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
  const totalCollectedInvoices = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
  const totalPendingInvoices = invoices.filter(i => i.status === 'Pending').reduce((acc, i) => acc + i.amount, 0);

  const stats = [
    {
      title: 'Active Projects',
      value: activeProjectsCount.toString(),
      subtext: `${projects.length} Total in Pipeline`,
      icon: HardHat,
      color: 'text-[#10B981]',
      bg: 'bg-[#10B981]/10',
      tab: 'admin-projects',
    },
    {
      title: 'Pending Consultations',
      value: pendingConsultationsCount.toString(),
      subtext: `${consultations.filter(c => c.status === 'Confirmed').length} Confirmed upcoming`,
      icon: Calendar,
      color: 'text-amber-600',
      bg: 'bg-amber-500/10',
      tab: 'admin-consultations',
    },
    {
      title: 'Document Approvals',
      value: pendingDocumentsCount.toString(),
      subtext: 'Permits & Blueprints pending',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-500/10',
      tab: 'admin-documents',
    },
    {
      title: 'Budget Under Mgmt',
      value: `$${(totalBudgetManaged / 1000000).toFixed(2)}M`,
      subtext: `$${(totalSpent / 1000).toFixed(0)}k Capital Deployed`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
      tab: 'admin-financials',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#06110D] via-[#242424] to-[#06110D] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold uppercase tracking-wider border border-[#10B981]/30">
              <ShieldCheck size={13} />
              General Contractor & Executive Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            BuildSync Master Control
          </h1>
          <p className="text-white/70 text-sm mt-1 max-w-xl">
            Live overview across all active construction sites, client consultation queues, municipal permits, and contractor assignments.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenCreateProject ? onOpenCreateProject() : onNavigateTab('admin-projects')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#10B981]/20 cursor-pointer active:scale-95"
          >
            <Plus size={16} />
            <span>New Project</span>
          </button>
          <button
            onClick={() => onOpenCreateConsultation ? onOpenCreateConsultation() : onNavigateTab('admin-consultations')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
          >
            <Calendar size={15} />
            <span>Schedule Site Visit</span>
          </button>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => onNavigateTab(stat.tab)}
            className="bg-white p-6 rounded-3xl border border-[#A7F3D0] shadow-sm hover:shadow-md hover:border-[#10B981] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
                <stat.icon size={24} strokeWidth={1.8} />
              </div>
              <span className="text-[#A0A0A0] group-hover:text-[#10B981] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                <ArrowRight size={18} />
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#06110D] tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-[#06110D] uppercase tracking-wider mt-1">{stat.title}</p>
              <p className="text-xs text-[#777] mt-0.5">{stat.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Live Projects & Pending Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Construction Projects Monitoring */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#A7F3D0] shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-bold text-[#06110D]">Active Construction Operations</h2>
            </div>
            <button
              onClick={() => onNavigateTab('admin-projects')}
              className="text-xs font-bold text-[#10B981] hover:text-[#059669] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({projects.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="divide-y divide-[#F0EFED] p-2">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                onClick={() => onNavigateTab('admin-projects')}
                className="p-4 sm:p-5 rounded-2xl hover:bg-[#FFFFFF] transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#10B981] shrink-0 border border-[#A7F3D0] shadow-sm relative">
                      {project.thumbnailUrl ? (
                        <img 
                          src={project.thumbnailUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40">
                          <HardHat size={20} />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#059669] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                          {project.id}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#06110D] group-hover:text-[#10B981] transition-colors mt-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#666] flex items-center gap-2 mt-0.5">
                        <span>Client: <strong className="text-[#333]">{project.clientName}</strong></span>
                        <span>•</span>
                        <span>{project.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Progress info */}
                  <div className="sm:text-right shrink-0">
                    <div className="flex items-center sm:justify-end gap-2 text-xs font-semibold text-[#06110D]">
                      <span>{project.stage}</span>
                      <span className="font-bold text-[#10B981]">({project.progress}%)</span>
                    </div>
                    <div className="w-full sm:w-36 h-2 bg-[#A7F3D0] rounded-full overflow-hidden mt-1.5">
                      <div 
                        className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#777] mt-1">
                      Budget: <strong>${(project.budget / 1000).toFixed(0)}k</strong> (Spent: ${(project.spent / 1000).toFixed(0)}k)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Urgent Inquiries & Consultation Queue */}
        <div className="space-y-6 flex flex-col">
          {/* Consultations Card */}
          <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#10B981]" />
                <h2 className="text-base font-bold text-[#06110D]">Upcoming Consultations</h2>
              </div>
              <button
                onClick={() => onNavigateTab('admin-consultations')}
                className="text-xs font-bold text-[#10B981] hover:text-[#059669] uppercase tracking-wider"
              >
                Manage
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[340px]">
              {consultations.length === 0 ? (
                <div className="text-center py-8 text-sm text-[#888]">
                  No consultations booked at this time.
                </div>
              ) : (
                consultations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onNavigateTab('admin-consultations')}
                    className="p-4 rounded-2xl border border-[#F0EFED] hover:border-[#10B981] hover:bg-[#FFFFFF] transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          c.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          c.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {c.status}
                        </span>
                        <h4 className="text-sm font-bold text-[#06110D] mt-1.5">{c.clientName}</h4>
                        <p className="text-xs text-[#666]">{c.projectType}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-[#06110D]">{c.preferredDate}</p>
                        <p className="text-[11px] text-[#888]">{c.preferredTime}</p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#F0EFED] flex items-center justify-between text-xs text-[#777]">
                      <span className="truncate">Staff: <strong className="text-[#333]">{c.assignedStaff.split('(')[0]}</strong></span>
                      <span className="font-semibold text-[#059669]">{c.budget}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Action Banner */}
          <div className="bg-[#10B981] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>Executive Actions</span>
              </div>
              <h3 className="text-lg font-bold">Need to assign staff or issue an invoice?</h3>
              <p className="text-xs text-white/70 mt-1 mb-4 leading-relaxed">
                Seamlessly coordinate blueprints, permit filing status, and contractor milestone payouts.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigateTab('admin-documents')}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center border border-white/10 transition-all cursor-pointer"
                >
                  Review Documents
                </button>
                <button
                  onClick={() => onNavigateTab('admin-financials')}
                  className="px-3 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold text-center transition-all cursor-pointer shadow-md"
                >
                  Manage Invoices
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: Document Review Pipeline & Quick Financial Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Document Review Pipeline */}
        <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#10B981]" />
              <h2 className="text-base font-bold text-[#06110D]">Permit & Blueprint Approvals</h2>
            </div>
            <button
              onClick={() => onNavigateTab('admin-documents')}
              className="text-xs font-bold text-[#10B981] hover:text-[#059669] uppercase tracking-wider"
            >
              All Documents
            </button>
          </div>

          <div className="p-4 divide-y divide-[#F0EFED]">
            {documents.slice(0, 4).map((doc) => (
              <div key={doc.id} className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#06110D] shrink-0 font-mono text-xs font-bold border border-[#A7F3D0]">
                    {doc.category === 'Blueprint' ? 'DWG' : doc.category === 'Permit' ? 'GOV' : 'PDF'}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#06110D]">{doc.title}</h4>
                    <p className="text-xs text-[#777] mt-0.5">
                      {doc.projectName} • <span className="font-medium text-[#444]">{doc.uploadedBy}</span>
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  doc.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices & Financials Quick Snapshot */}
        <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-[#10B981]" />
              <h2 className="text-base font-bold text-[#06110D]">Invoicing & Cashflow Radar</h2>
            </div>
            <button
              onClick={() => onNavigateTab('admin-financials')}
              className="text-xs font-bold text-[#10B981] hover:text-[#059669] uppercase tracking-wider"
            >
              Financial Hub
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#A7F3D0]">
                <p className="text-xs text-[#777] uppercase font-bold tracking-wider">Settled & Collected</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">${totalCollectedInvoices.toLocaleString()}</p>
                <p className="text-[11px] text-[#888] mt-0.5">All verified milestones</p>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#A7F3D0]">
                <p className="text-xs text-[#777] uppercase font-bold tracking-wider">Pending Remittance</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">${totalPendingInvoices.toLocaleString()}</p>
                <p className="text-[11px] text-[#888] mt-0.5">Awaiting bank deposit</p>
              </div>
            </div>

            <div className="space-y-3">
              {invoices.slice(0, 3).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAFA] border border-[#F0EFED] text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#06110D]">{inv.invoiceNumber}</span>
                    <p className="text-[#666] font-medium mt-0.5">{inv.projectName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#06110D]">${inv.amount.toLocaleString()}</span>
                    <p className={`font-semibold uppercase tracking-wider text-[10px] mt-0.5 ${
                      inv.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {inv.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
