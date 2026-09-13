import React, { useState } from 'react';
import { 
  Calendar, Search, Plus, CheckCircle, Clock, XCircle, Phone, 
  Mail, MapPin, User, Video, Edit3, Trash2, X, AlertCircle, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminConsultation } from '../../../types';

interface AdminConsultationsManagerProps {
  consultations: AdminConsultation[];
  onAddConsultation: (consultation: AdminConsultation) => void;
  onUpdateConsultation: (consultation: AdminConsultation) => void;
  onDeleteConsultation: (id: string) => void;
}

const STAFF_LIST = [
  'Sarah Jenkins (Lead Architect)',
  'Elena Rostova (Senior Designer)',
  'Alex Mercer (Field Engineer)',
  'David Kalu (Site Lead)',
  'Marcus Vance (General Contractor)'
];

export default function AdminConsultationsManager({
  consultations,
  onAddConsultation,
  onUpdateConsultation,
  onDeleteConsultation,
}: AdminConsultationsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminConsultation | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // New consultation state
  const [newConsultation, setNewConsultation] = useState<Partial<AdminConsultation>>({
    clientName: '',
    clientEmail: '',
    phone: '',
    projectType: 'Initial Architectural Discovery',
    budget: '$500k - $1M',
    location: 'Austin, TX',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '10:00 AM (CST)',
    assignedStaff: 'Sarah Jenkins (Lead Architect)',
    status: 'Confirmed',
    notes: '',
    meetingLink: 'https://meet.google.com/bsy-site-plan'
  });

  const filteredConsultations = consultations.filter((c) => {
    const matchesSearch = 
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConsultation.clientName) return;

    const item: AdminConsultation = {
      id: `CNS-${Math.floor(200 + Math.random() * 800)}`,
      clientName: newConsultation.clientName || 'Client',
      clientEmail: newConsultation.clientEmail || 'client@example.com',
      phone: newConsultation.phone || '+1 (512) 555-0100',
      projectType: newConsultation.projectType || 'General Consultation',
      budget: newConsultation.budget || '$500k+',
      location: newConsultation.location || 'Austin, TX',
      preferredDate: newConsultation.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: newConsultation.preferredTime || '10:00 AM (CST)',
      assignedStaff: newConsultation.assignedStaff || STAFF_LIST[0],
      status: (newConsultation.status as any) || 'Confirmed',
      notes: newConsultation.notes || '',
      meetingLink: newConsultation.meetingLink || 'https://meet.google.com/bsy-site-plan',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    onAddConsultation(item);
    setIsCreateModalOpen(false);
    setNewConsultation({
      clientName: '',
      clientEmail: '',
      phone: '',
      projectType: 'Initial Architectural Discovery',
      budget: '$500k - $1M',
      location: 'Austin, TX',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM (CST)',
      assignedStaff: 'Sarah Jenkins (Lead Architect)',
      status: 'Confirmed',
      notes: ''
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    onUpdateConsultation(editingItem);
    setEditingItem(null);
  };

  const handleQuickStatusChange = (item: AdminConsultation, status: 'Confirmed' | 'Completed' | 'Cancelled') => {
    onUpdateConsultation({ ...item, status });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#06110D]">Consultations & Client Discovery Queue</h1>
          <p className="text-sm text-[#666]">
            Review, approve, assign architects, and generate virtual conference links for incoming site bookings.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus size={16} />
          <span>Book Consultation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#A7F3D0] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search by client name, email, project type, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="All">All Statuses ({consultations.length})</option>
            <option value="Pending">Pending Review ({consultations.filter(c => c.status === 'Pending').length})</option>
            <option value="Confirmed">Confirmed ({consultations.filter(c => c.status === 'Confirmed').length})</option>
            <option value="Completed">Completed ({consultations.filter(c => c.status === 'Completed').length})</option>
            <option value="Cancelled">Cancelled ({consultations.filter(c => c.status === 'Cancelled').length})</option>
          </select>
        </div>
      </div>

      {/* Consultations Card List */}
      <div className="space-y-4">
        {filteredConsultations.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-[#A7F3D0]">
            <Calendar size={36} className="mx-auto text-[#10B981] mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[#06110D]">No consultations found</h3>
            <p className="text-xs text-[#777] mt-1">Try switching status filters or search term.</p>
          </div>
        ) : (
          filteredConsultations.map((c) => (
            <motion.div
              key={c.id}
              layout
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#A7F3D0] shadow-sm hover:border-[#10B981] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left Identity Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#059669] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                      {c.id}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      c.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      c.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      c.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-[#888]">
                      Submitted: {c.submittedAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#06110D]">{c.clientName}</h3>
                  <p className="text-sm font-semibold text-[#10B981]">{c.projectType}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#666] pt-1">
                    <p className="flex items-center gap-1.5 truncate">
                      <Mail size={13} className="text-[#888] shrink-0" />
                      <span className="truncate">{c.clientEmail}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone size={13} className="text-[#888] shrink-0" />
                      <span>{c.phone}</span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin size={13} className="text-[#888] shrink-0" />
                      <span className="truncate">{c.location}</span>
                    </p>
                  </div>

                  {c.notes && (
                    <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#F0EFED] text-xs text-[#555] mt-2">
                      <strong>Client Notes:</strong> {c.notes}
                    </div>
                  )}
                </div>

                {/* Middle Schedule Block */}
                <div className="w-full lg:w-72 bg-[#FFFFFF] p-4 rounded-2xl border border-[#A7F3D0] shrink-0 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#06110D]">
                    <Clock size={15} className="text-[#10B981]" />
                    <span>{c.preferredDate} • {c.preferredTime}</span>
                  </div>

                  <div className="text-xs text-[#666] pt-1 border-t border-[#A7F3D0]">
                    <span className="text-[10px] uppercase font-bold text-[#888] block">Assigned Lead</span>
                    <strong className="text-[#06110D]">{c.assignedStaff}</strong>
                  </div>

                  <div className="text-xs text-[#666] flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#888]">Est. Budget</span>
                    <strong className="text-[#059669]">{c.budget}</strong>
                  </div>

                  {c.meetingLink && (
                    <a
                      href={c.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-xl bg-white border border-[#A7F3D0] hover:border-[#10B981] text-[11px] font-bold text-[#06110D] transition-colors"
                    >
                      <Video size={13} className="text-blue-600" />
                      <span>Virtual Room Link</span>
                    </a>
                  )}
                </div>

                {/* Right Action Controls */}
                <div className="flex lg:flex-col gap-2 shrink-0 justify-end">
                  {c.status === 'Pending' && (
                    <button
                      onClick={() => handleQuickStatusChange(c, 'Confirmed')}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <CheckCircle size={14} />
                      <span>Approve</span>
                    </button>
                  )}

                  {c.status === 'Confirmed' && (
                    <button
                      onClick={() => handleQuickStatusChange(c, 'Completed')}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <CheckCircle size={14} />
                      <span>Mark Done</span>
                    </button>
                  )}

                  <button
                    onClick={() => setEditingItem(c)}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white border border-[#A7F3D0] hover:border-[#10B981] text-[#06110D] text-xs font-bold transition-all cursor-pointer"
                  >
                    <Edit3 size={14} className="text-[#10B981]" />
                    <span>Edit / Reassign</span>
                  </button>

                  <button
                    onClick={() => setDeletingId(c.id)}
                    className="p-2 rounded-xl bg-white border border-[#A7F3D0] hover:border-rose-300 hover:bg-rose-50 text-rose-600 text-xs transition-all cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-xl overflow-hidden my-8"
            >
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center text-white">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-[#06110D]">Schedule New Client Consultation</h3>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#A7F3D0] hover:bg-[#D5D4D0] flex items-center justify-center text-[#555] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jonathan Vance"
                      value={newConsultation.clientName}
                      onChange={(e) => setNewConsultation({ ...newConsultation, clientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Client Email</label>
                    <input
                      type="email"
                      placeholder="jvance@example.com"
                      value={newConsultation.clientEmail}
                      onChange={(e) => setNewConsultation({ ...newConsultation, clientEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+1 (512) 555-0199"
                      value={newConsultation.phone}
                      onChange={(e) => setNewConsultation({ ...newConsultation, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="Austin, TX"
                      value={newConsultation.location}
                      onChange={(e) => setNewConsultation({ ...newConsultation, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Project Scope / Topic</label>
                    <input
                      type="text"
                      placeholder="e.g. Site Survey & Topography Feasibility"
                      value={newConsultation.projectType}
                      onChange={(e) => setNewConsultation({ ...newConsultation, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Appointment Date</label>
                    <input
                      type="date"
                      value={newConsultation.preferredDate}
                      onChange={(e) => setNewConsultation({ ...newConsultation, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Time Slot</label>
                    <input
                      type="text"
                      placeholder="10:00 AM (CST)"
                      value={newConsultation.preferredTime}
                      onChange={(e) => setNewConsultation({ ...newConsultation, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Assigned Staff</label>
                    <select
                      value={newConsultation.assignedStaff}
                      onChange={(e) => setNewConsultation({ ...newConsultation, assignedStaff: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    >
                      {STAFF_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Initial Status</label>
                    <select
                      value={newConsultation.status}
                      onChange={(e) => setNewConsultation({ ...newConsultation, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Notes / Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="Meeting agenda, special requirements..."
                      value={newConsultation.notes}
                      onChange={(e) => setNewConsultation({ ...newConsultation, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-semibold text-[#666] hover:bg-[#F0FDF4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#333] text-white text-sm font-bold shadow-md cursor-pointer"
                  >
                    Save Consultation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-xl overflow-hidden my-8"
            >
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center text-white">
                    <Edit3 size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-[#06110D]">Update Consultation {editingItem.id}</h3>
                </div>
                <button
                  onClick={() => setEditingItem(null)}
                  className="w-8 h-8 rounded-full bg-[#A7F3D0] hover:bg-[#D5D4D0] flex items-center justify-center text-[#555] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Status</label>
                    <select
                      value={editingItem.status}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Assigned Architect</label>
                    <select
                      value={editingItem.assignedStaff}
                      onChange={(e) => setEditingItem({ ...editingItem, assignedStaff: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    >
                      {STAFF_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Date</label>
                    <input
                      type="date"
                      value={editingItem.preferredDate}
                      onChange={(e) => setEditingItem({ ...editingItem, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Time</label>
                    <input
                      type="text"
                      value={editingItem.preferredTime}
                      onChange={(e) => setEditingItem({ ...editingItem, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Virtual Room URL</label>
                    <input
                      type="url"
                      value={editingItem.meetingLink || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, meetingLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Notes & Follow-up Plan</label>
                    <textarea
                      rows={3}
                      value={editingItem.notes}
                      onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-semibold text-[#666] hover:bg-[#F0FDF4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 border border-[#A7F3D0] shadow-2xl max-w-md w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#06110D]">Delete Consultation Record?</h3>
              <p className="text-xs text-[#666] mt-2 leading-relaxed">
                Are you sure you want to remove appointment <strong>{deletingId}</strong>?
              </p>

              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#A7F3D0] text-xs font-bold uppercase tracking-wider text-[#666] hover:bg-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDeleteConsultation(deletingId);
                    setDeletingId(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
