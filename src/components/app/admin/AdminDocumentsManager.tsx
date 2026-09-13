import React, { useState } from 'react';
import { 
  FileText, Search, Plus, UploadCloud, CheckCircle2, AlertTriangle, 
  Clock, Download, Eye, Trash2, X, Filter, Sparkles, Check, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminDocument } from '../../../types';

interface AdminDocumentsManagerProps {
  documents: AdminDocument[];
  onAddDocument: (doc: AdminDocument) => void;
  onUpdateDocument: (doc: AdminDocument) => void;
  onDeleteDocument: (docId: string) => void;
}

const CATEGORIES: AdminDocument['category'][] = [
  'Blueprint',
  'Permit',
  'Contract',
  'Engineering Report',
  'Invoice',
  'Change Order'
];

export default function AdminDocumentsManager({
  documents,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
}: AdminDocumentsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<AdminDocument | null>(null);

  const [newDoc, setNewDoc] = useState<Partial<AdminDocument>>({
    title: '',
    projectName: 'Modern 3-Bedroom Residence',
    clientName: 'Mira Henderson',
    category: 'Blueprint',
    fileSize: '12.4 MB',
    version: '1.0',
    uploadedBy: 'Admin / General Contractor',
    status: 'Under Review'
  });

  const filteredDocuments = documents.filter((d) => {
    const matchesSearch = 
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title) return;

    const doc: AdminDocument = {
      id: `DOC-${Math.floor(500 + Math.random() * 500)}`,
      title: newDoc.title.endsWith('.pdf') ? newDoc.title : `${newDoc.title}.pdf`,
      projectName: newDoc.projectName || 'General Site Plan',
      clientName: newDoc.clientName || 'Mira Henderson',
      category: newDoc.category || 'Blueprint',
      fileSize: newDoc.fileSize || '8.5 MB',
      version: newDoc.version || '1.0',
      uploadedBy: newDoc.uploadedBy || 'Admin Desk',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: (newDoc.status as any) || 'Under Review',
      fileUrl: '#'
    };

    onAddDocument(doc);
    setIsUploadModalOpen(false);
    setNewDoc({
      title: '',
      projectName: 'Modern 3-Bedroom Residence',
      clientName: 'Mira Henderson',
      category: 'Blueprint',
      fileSize: '12.4 MB',
      version: '1.0',
      status: 'Under Review'
    });
  };

  const handleStatusChange = (doc: AdminDocument, newStatus: AdminDocument['status']) => {
    onUpdateDocument({ ...doc, status: newStatus });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#06110D]">Permits & Blueprint Approval Pipeline</h1>
          <p className="text-sm text-[#666]">
            Review structural revisions, city building permits, contractor agreements, and change order signatures.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <UploadCloud size={16} />
          <span>Upload New Plan / Permit</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#A7F3D0] shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search documents by title, project, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D] focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}s</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A7F3D0] text-xs font-semibold text-[#06110D] focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Under Review">Under Review</option>
            <option value="Needs Revision">Needs Revision</option>
          </select>
        </div>
      </div>

      {/* Documents Table / Grid */}
      <div className="bg-white rounded-3xl border border-[#A7F3D0] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#F0EFED]">
          {filteredDocuments.length === 0 ? (
            <div className="p-12 text-center text-sm text-[#777]">
              No documents match your filter.
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                className="p-5 hover:bg-[#FFFFFF] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#081611] text-[#10B981] flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-sm border border-white/10">
                    {doc.category.substring(0, 3).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#888] bg-[#F0EFED] px-2 py-0.5 rounded">
                        v{doc.version}
                      </span>
                      <span className="text-[10px] font-bold text-[#047857] bg-[#10B981]/15 px-2 py-0.5 rounded uppercase">
                        {doc.category}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        doc.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#06110D] mt-1">{doc.title}</h3>
                    <p className="text-xs text-[#666] mt-0.5">
                      Project: <strong className="text-[#06110D]">{doc.projectName}</strong> • Uploaded by {doc.uploadedBy} on {doc.uploadedAt} ({doc.fileSize})
                    </p>
                  </div>
                </div>

                {/* Workflow Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#F0EFED]">
                  {doc.status !== 'Approved' && (
                    <button
                      onClick={() => handleStatusChange(doc, 'Approved')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                      title="Approve document"
                    >
                      <Check size={13} />
                      <span>Approve</span>
                    </button>
                  )}

                  {doc.status !== 'Needs Revision' && (
                    <button
                      onClick={() => handleStatusChange(doc, 'Needs Revision')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all cursor-pointer"
                      title="Flag for revision"
                    >
                      <RefreshCw size={13} />
                      <span>Request Revision</span>
                    </button>
                  )}

                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="p-2 rounded-xl bg-white hover:bg-[#A7F3D0] border border-[#A7F3D0] text-[#06110D] text-xs transition-colors cursor-pointer"
                    title="View Document Details"
                  >
                    <Eye size={15} />
                  </button>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading ${doc.title}...`);
                    }}
                    className="p-2 rounded-xl bg-white hover:bg-[#A7F3D0] border border-[#A7F3D0] text-[#06110D] text-xs transition-colors cursor-pointer"
                    title="Download document"
                  >
                    <Download size={15} />
                  </a>

                  <button
                    onClick={() => onDeleteDocument(doc.id)}
                    className="p-2 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-600 border border-[#A7F3D0] text-[#888] text-xs transition-colors cursor-pointer"
                    title="Delete document"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl border border-[#A7F3D0] shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-[#A7F3D0] bg-[#FAFAFA] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#06110D]">Upload Construction File</h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="w-8 h-8 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#555]">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                <div className="border-2 border-dashed border-[#10B981]/40 bg-[#FFFFFF] rounded-2xl p-6 text-center">
                  <UploadCloud size={32} className="mx-auto text-[#10B981] mb-2" />
                  <p className="text-xs font-bold text-[#06110D]">Click to select PDF, CAD/DWG or Spec file</p>
                  <p className="text-[11px] text-[#888] mt-0.5">Maximum file size: 50MB</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electrical_Panel_Load_Calc.pdf"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={newDoc.category}
                      onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Version</label>
                    <input
                      type="text"
                      value={newDoc.version}
                      onChange={(e) => setNewDoc({ ...newDoc, version: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newDoc.projectName}
                    onChange={(e) => setNewDoc({ ...newDoc, projectName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-[#A7F3D0] flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 rounded-xl border border-[#A7F3D0] text-sm text-[#666]">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#333] text-white text-sm font-bold shadow-md">Publish Document</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {viewingDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-6 border border-[#A7F3D0] shadow-2xl max-w-lg w-full">
              <div className="flex items-center justify-between pb-4 border-b border-[#A7F3D0]">
                <h3 className="text-lg font-bold text-[#06110D]">{viewingDoc.title}</h3>
                <button onClick={() => setViewingDoc(null)} className="w-8 h-8 rounded-full bg-[#A7F3D0] flex items-center justify-center text-[#555]">
                  <X size={16} />
                </button>
              </div>
              <div className="py-4 space-y-3 text-sm text-[#555]">
                <p><strong>Category:</strong> {viewingDoc.category}</p>
                <p><strong>Associated Project:</strong> {viewingDoc.projectName}</p>
                <p><strong>Client:</strong> {viewingDoc.clientName}</p>
                <p><strong>File Size & Version:</strong> {viewingDoc.fileSize} (Version {viewingDoc.version})</p>
                <p><strong>Uploaded By:</strong> {viewingDoc.uploadedBy} on {viewingDoc.uploadedAt}</p>
                <p><strong>Current Status:</strong> <span className="font-bold text-[#059669]">{viewingDoc.status}</span></p>
              </div>
              <div className="pt-4 border-t border-[#A7F3D0] flex justify-end">
                <button onClick={() => setViewingDoc(null)} className="px-5 py-2 rounded-xl bg-[#10B981] text-white text-xs font-bold">Close Preview</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
