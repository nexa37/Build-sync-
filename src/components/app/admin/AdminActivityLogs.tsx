import React, { useState } from 'react';
import { 
  Activity, Search, Filter, ShieldCheck, Clock, FileText, 
  DollarSign, HardHat, Calendar, CheckCircle, RefreshCw
} from 'lucide-react';
import { AdminActivityLog } from '../../../types';

interface AdminActivityLogsProps {
  logs: AdminActivityLog[];
}

export default function AdminActivityLogs({ logs }: AdminActivityLogsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredLogs = logs.filter((l) => {
    const matchesSearch = 
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (category: string) => {
    switch (category) {
      case 'project': return <HardHat size={16} className="text-[#10B981]" />;
      case 'consultation': return <Calendar size={16} className="text-amber-600" />;
      case 'document': return <FileText size={16} className="text-blue-600" />;
      case 'finance': return <DollarSign size={16} className="text-emerald-600" />;
      default: return <Activity size={16} className="text-[#666]" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#06110D]">Operations Telemetry & Audit Logs</h1>
          <p className="text-sm text-[#666]">
            Immutable chronological record of site milestone updates, permit approvals, document revisions, and client interactions.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Audit Streaming
        </span>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#A7F3D0] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search audit trail by user, action, or target..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D]"
          >
            <option value="all">All Event Categories</option>
            <option value="project">Projects</option>
            <option value="consultation">Consultations</option>
            <option value="document">Documents & Permits</option>
            <option value="finance">Financials</option>
          </select>
        </div>
      </div>

      {/* Log Feed */}
      <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm p-6">
        <div className="space-y-6">
          {filteredLogs.map((log, idx) => (
            <div key={log.id} className="flex gap-4 relative group">
              {idx !== filteredLogs.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-24px] w-[2px] bg-[#F0EFED]" />
              )}
              <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF] border border-[#A7F3D0] flex items-center justify-center shrink-0 z-10 shadow-sm">
                {getIcon(log.category)}
              </div>

              <div className="flex-1 bg-[#FAFAFA] hover:bg-[#F0FDF4] p-4 rounded-2xl border border-[#F0EFED] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <p className="text-sm font-bold text-[#06110D]">
                    {log.user} <span className="text-xs font-normal text-[#777]">({log.role})</span>
                  </p>
                  <span className="text-xs text-[#888] font-medium flex items-center gap-1">
                    <Clock size={12} /> {log.timestamp}
                  </span>
                </div>

                <p className="text-sm text-[#444] mt-1">
                  <span className="font-semibold text-[#10B981]">{log.action}:</span> {log.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
