import React, { useState } from 'react';
import { 
  Users, Search, Plus, Mail, Phone, Shield, HardHat, 
  CheckCircle, UserPlus, Edit3, Trash2, X, AlertCircle, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminUser } from '../../../types';

interface AdminTeamAndClientsProps {
  users: AdminUser[];
  onAddUser: (user: AdminUser) => void;
  onUpdateUser: (user: AdminUser) => void;
  onDeleteUser: (userId: string) => void;
}

const ROLES: AdminUser['role'][] = [
  'Client',
  'Lead Architect',
  'General Contractor',
  'Site Engineer',
  'Project Manager',
  'Subcontractor'
];

export default function AdminTeamAndClients({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}: AdminTeamAndClientsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    name: '',
    email: '',
    role: 'Client',
    phone: '',
    status: 'Active',
    assignedProjectsCount: 1,
    avatarColor: 'from-[#10B981] to-[#047857]',
    joinedDate: new Date().toISOString().split('T')[0]
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const user: AdminUser = {
      id: `USR-${Math.floor(10 + Math.random() * 90)}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || 'Client',
      phone: newUser.phone || '+1 (512) 555-0100',
      status: (newUser.status as any) || 'Active',
      assignedProjectsCount: Number(newUser.assignedProjectsCount) || 1,
      avatarColor: newUser.avatarColor || 'from-[#06110D] to-[#4A4A4A]',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    onAddUser(user);
    setIsCreateModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'Client',
      phone: '',
      status: 'Active',
      assignedProjectsCount: 1
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    onUpdateUser(editingUser);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#06110D]">Clients & Contractor Directory</h1>
          <p className="text-sm text-[#666]">
            Manage client profiles, licensed architects, engineering consultants, and trade subcontractors.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <UserPlus size={16} />
          <span>Add Member / Client</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#A7F3D0] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search by name, role, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

        <div className="w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D] focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="All">All Roles ({users.length})</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}s</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((u) => (
          <motion.div
            key={u.id}
            layout
            className="bg-white p-5 rounded-3xl border border-[#A7F3D0] shadow-sm hover:border-[#10B981] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${u.avatarColor || 'from-[#06110D] to-[#4A4A4A]'} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#06110D] leading-tight">{u.name}</h3>
                    <span className="inline-block text-[11px] font-semibold text-[#10B981] mt-0.5">
                      {u.role}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {u.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#666] pt-3 border-t border-[#F0EFED]">
                <p className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-[#888] shrink-0" />
                  <span className="truncate">{u.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={13} className="text-[#888] shrink-0" />
                  <span>{u.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building2 size={13} className="text-[#888] shrink-0" />
                  <span>Assigned Projects: <strong className="text-[#06110D]">{u.assignedProjectsCount}</strong></span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EFED] flex items-center justify-between gap-2">
              <span className="text-[10px] text-[#999] font-mono">ID: {u.id}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingUser(u)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#A7F3D0] text-[11px] font-bold text-[#06110D] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingUserId(u.id)}
                  className="p-1.5 rounded-lg bg-[#F0FDF4] hover:bg-rose-50 hover:text-rose-600 text-[#777] transition-colors"
                  title="Delete user"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CREATE USER MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-md overflow-hidden my-8"
            >
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#06110D]">Add Directory Member</h3>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#555]"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Full Name / Org *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="elena.r@buildsync.io"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Role / Position</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (512) 555-0100"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Active Assigned Projects</label>
                  <input
                    type="number"
                    min="0"
                    value={newUser.assignedProjectsCount}
                    onChange={(e) => setNewUser({ ...newUser, assignedProjectsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#A7F3D0] text-sm text-[#666]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#333] text-white text-sm font-bold shadow-md"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#06110D]">Edit Member Profile</h3>
                <button onClick={() => setEditingUser(null)} className="w-8 h-8 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#555]">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Invited">Invited</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Phone</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 rounded-xl border border-[#A7F3D0] text-sm">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold shadow-md">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION */}
      <AnimatePresence>
        {deletingUserId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-6 border border-[#A7F3D0] shadow-2xl max-w-md w-full text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#06110D]">Remove User?</h3>
              <p className="text-xs text-[#666] mt-2 leading-relaxed">
                Are you sure you want to remove <strong>{deletingUserId}</strong> from the active team roster?
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button onClick={() => setDeletingUserId(null)} className="px-4 py-2 rounded-xl border border-[#A7F3D0] text-xs font-bold">Cancel</button>
                <button onClick={() => { onDeleteUser(deletingUserId); setDeletingUserId(null); }} className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">Confirm</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
