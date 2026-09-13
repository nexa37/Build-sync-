import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Edit3, Trash2, HardHat, Calendar, 
  DollarSign, User, MapPin, CheckCircle2, ChevronRight, X, AlertCircle,
  Clock, ArrowUpRight, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminProject, ProjectStage } from '../../../types';

interface AdminProjectsManagerProps {
  projects: AdminProject[];
  onAddProject: (project: AdminProject) => void;
  onUpdateProject: (project: AdminProject) => void;
  onDeleteProject: (projectId: string) => void;
}

const STAGES: ProjectStage[] = [
  'Consultation & Discovery',
  'Architectural Design',
  'Permits & Engineering',
  'Foundation & Framing',
  'MEP Rough-in',
  'Finishes & Interior',
  'Final Inspection',
  'Handover & Closeout'
];

export default function AdminProjectsManager({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}: AdminProjectsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [stageFilter, setStageFilter] = useState<string>('All');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // New Project Form State
  const [formState, setFormState] = useState<Partial<AdminProject>>({
    title: '',
    clientName: '',
    clientEmail: '',
    location: '',
    stage: 'Architectural Design',
    progress: 10,
    budget: 500000,
    spent: 50000,
    startDate: new Date().toISOString().split('T')[0],
    targetCompletion: '2027-01-01',
    assignedArchitect: 'Sarah Jenkins (Lead Architect)',
    assignedManager: 'David Kalu (Site Lead)',
    status: 'Active',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    notes: ''
  });

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesStage = stageFilter === 'All' || p.stage === stageFilter;

    return matchesSearch && matchesStatus && matchesStage;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.clientName) return;

    const newProject: AdminProject = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      title: formState.title || 'Untitled Project',
      clientName: formState.clientName || 'Client',
      clientEmail: formState.clientEmail || 'client@example.com',
      location: formState.location || 'Austin, TX',
      stage: (formState.stage as ProjectStage) || 'Architectural Design',
      progress: Number(formState.progress) || 0,
      budget: Number(formState.budget) || 0,
      spent: Number(formState.spent) || 0,
      startDate: formState.startDate || new Date().toISOString().split('T')[0],
      targetCompletion: formState.targetCompletion || '2027-01-01',
      assignedArchitect: formState.assignedArchitect || 'Sarah Jenkins (Lead Architect)',
      assignedManager: formState.assignedManager || 'Marcus Vance (General Contractor)',
      status: (formState.status as any) || 'Active',
      thumbnailUrl: formState.thumbnailUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      notes: formState.notes || ''
    };

    onAddProject(newProject);
    setIsCreateModalOpen(false);
    // Reset form
    setFormState({
      title: '',
      clientName: '',
      clientEmail: '',
      location: '',
      stage: 'Architectural Design',
      progress: 10,
      budget: 500000,
      spent: 50000,
      startDate: new Date().toISOString().split('T')[0],
      targetCompletion: '2027-01-01',
      assignedArchitect: 'Sarah Jenkins (Lead Architect)',
      assignedManager: 'David Kalu (Site Lead)',
      status: 'Active',
      notes: ''
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    onUpdateProject(editingProject);
    setEditingProject(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingProjectId) {
      onDeleteProject(deletingProjectId);
      setDeletingProjectId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#06110D]">Project Master Directory</h1>
          <p className="text-sm text-[#666]">
            Manage master project files, milestones, staff allocations, and budgets across {projects.length} sites.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#A7F3D0] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search by project name, client, ID, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:bg-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888] hover:text-[#06110D]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
            <option value="Pending Review">Pending Review</option>
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="All">All Stages</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects List View / Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-[#A7F3D0]">
            <HardHat size={36} className="mx-auto text-[#10B981] mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[#06110D]">No projects match your filter criteria</h3>
            <p className="text-xs text-[#777] mt-1">Try clearing your search term or adjusting filters.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#A7F3D0] shadow-sm hover:border-[#10B981] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Project Identity */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#10B981] shrink-0 border border-[#A7F3D0] shadow-sm relative">
                    <img 
                      src={project.thumbnailUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-[#10B981]/80 backdrop-blur-md text-[#10B981] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                      {project.id}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs font-semibold text-[#888]">
                        Started: {project.startDate}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#06110D] mt-1 truncate">
                      {project.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 mt-2 text-xs text-[#666]">
                      <p className="flex items-center gap-1.5 truncate">
                        <User size={13} className="text-[#10B981] shrink-0" />
                        <span>Client: <strong className="text-[#06110D]">{project.clientName}</strong></span>
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <MapPin size={13} className="text-[#10B981] shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </p>
                    </div>

                    {project.notes && (
                      <p className="text-xs text-[#777] bg-[#FFFFFF] p-2 rounded-xl mt-2 line-clamp-1 border border-[#F0EFED]">
                        📝 {project.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress & Milestone info */}
                <div className="w-full lg:w-72 bg-[#FFFFFF] p-4 rounded-2xl border border-[#A7F3D0] shrink-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#06110D] truncate max-w-[170px]">{project.stage}</span>
                    <span className="font-bold text-[#10B981] text-sm">{project.progress}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-[#A7F3D0] rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#A7F3D0] flex items-center justify-between text-xs text-[#666]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#888] block">Budget</span>
                      <strong className="text-[#06110D]">${(project.budget / 1000).toFixed(0)}k</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#888] block">Deployed</span>
                      <strong className="text-[#059669]">${(project.spent / 1000).toFixed(0)}k</strong>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex lg:flex-col gap-2 shrink-0 justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-[#F0EFED]">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#A7F3D0] hover:border-[#10B981] hover:bg-[#FFFFFF] text-[#06110D] text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Edit3 size={14} className="text-[#10B981]" />
                    <span>Edit Project</span>
                  </button>

                  <button
                    onClick={() => setDeletingProjectId(project.id)}
                    className="flex items-center justify-center p-2 rounded-xl bg-white border border-[#A7F3D0] hover:border-rose-300 hover:bg-rose-50 text-rose-600 text-xs transition-all cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* CREATE PROJECT MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-2xl overflow-hidden my-8"
            >
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center text-white">
                    <HardHat size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-[#06110D]">Create New Construction Project</h3>
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
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hillside Modern Villa"
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mira Henderson"
                      value={formState.clientName}
                      onChange={(e) => setFormState({ ...formState, clientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Client Email
                    </label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={formState.clientEmail}
                      onChange={(e) => setFormState({ ...formState, clientEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Site Address / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1200 Lakefront Trail, Austin, TX"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Construction Stage
                    </label>
                    <select
                      value={formState.stage}
                      onChange={(e) => setFormState({ ...formState, stage: e.target.value as ProjectStage })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Progress ({formState.progress}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formState.progress}
                      onChange={(e) => setFormState({ ...formState, progress: Number(e.target.value) })}
                      className="w-full accent-[#10B981] mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Total Budget ($)
                    </label>
                    <input
                      type="number"
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Funds Disbursed ($)
                    </label>
                    <input
                      type="number"
                      value={formState.spent}
                      onChange={(e) => setFormState({ ...formState, spent: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Assigned Lead Architect
                    </label>
                    <input
                      type="text"
                      value={formState.assignedArchitect}
                      onChange={(e) => setFormState({ ...formState, assignedArchitect: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Assigned Project Manager
                    </label>
                    <input
                      type="text"
                      value={formState.assignedManager}
                      onChange={(e) => setFormState({ ...formState, assignedManager: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Thumbnail Image URL
                    </label>
                    <input
                      type="url"
                      value={formState.thumbnailUrl}
                      onChange={(e) => setFormState({ ...formState, thumbnailUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Site & Engineering Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Special instructions, zoning variances, inspection checkpoints..."
                      value={formState.notes}
                      onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-semibold text-[#666] hover:bg-[#F0FDF4] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#333] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    Save & Create Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT PROJECT MODAL */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-2xl overflow-hidden my-8"
            >
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center text-white">
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#06110D]">Edit Project: {editingProject.id}</h3>
                    <p className="text-xs text-[#777]">{editingProject.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingProject(null)}
                  className="w-8 h-8 rounded-full bg-[#A7F3D0] hover:bg-[#D5D4D0] flex items-center justify-center text-[#555] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={editingProject.clientName}
                      onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Project Status</label>
                    <select
                      value={editingProject.status}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    >
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending Review">Pending Review</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Stage</label>
                    <select
                      value={editingProject.stage}
                      onChange={(e) => setEditingProject({ ...editingProject, stage: e.target.value as ProjectStage })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">
                      Progress: {editingProject.progress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={(e) => setEditingProject({ ...editingProject, progress: Number(e.target.value) })}
                      className="w-full accent-[#10B981] mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Budget ($)</label>
                    <input
                      type="number"
                      value={editingProject.budget}
                      onChange={(e) => setEditingProject({ ...editingProject, budget: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Spent / Disbursed ($)</label>
                    <input
                      type="number"
                      value={editingProject.spent}
                      onChange={(e) => setEditingProject({ ...editingProject, spent: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Site Notes & Milestones</label>
                    <textarea
                      rows={3}
                      value={editingProject.notes || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
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

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingProjectId && (
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
              <h3 className="text-lg font-bold text-[#06110D]">Delete Project Record?</h3>
              <p className="text-xs text-[#666] mt-2 leading-relaxed">
                Are you sure you want to remove project <strong>{deletingProjectId}</strong>? All associated permit links, progress tracking, and contractor logs will be archived.
              </p>

              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setDeletingProjectId(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#A7F3D0] text-xs font-bold uppercase tracking-wider text-[#666] hover:bg-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
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
