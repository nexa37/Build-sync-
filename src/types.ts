export type ModalKey =
  | 'how-it-works'
  | 'features'
  | 'consultation'
  | 'about-us'
  | 'careers'
  | 'blog'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'get-started'
  | null;

export interface ConsultationFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  location: string;
  timeline: string;
  message: string;
}

export type UserRole = 'client' | 'admin';

export type ProjectStage = 
  | 'Consultation & Discovery'
  | 'Architectural Design'
  | 'Permits & Engineering'
  | 'Foundation & Framing'
  | 'MEP Rough-in'
  | 'Finishes & Interior'
  | 'Final Inspection'
  | 'Handover & Closeout';

export interface AdminProject {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  location: string;
  stage: ProjectStage;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  targetCompletion: string;
  assignedArchitect: string;
  assignedManager: string;
  status: 'Active' | 'On Hold' | 'Completed' | 'Pending Review';
  thumbnailUrl?: string;
  notes?: string;
}

export interface AdminConsultation {
  id: string;
  clientName: string;
  clientEmail: string;
  phone: string;
  projectType: string;
  budget: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  assignedStaff: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes: string;
  meetingLink?: string;
  submittedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Client' | 'Lead Architect' | 'General Contractor' | 'Site Engineer' | 'Project Manager' | 'Subcontractor';
  phone: string;
  status: 'Active' | 'Invited' | 'Inactive';
  assignedProjectsCount: number;
  avatarColor: string;
  joinedDate: string;
}

export interface AdminDocument {
  id: string;
  title: string;
  projectName: string;
  clientName: string;
  category: 'Blueprint' | 'Permit' | 'Contract' | 'Engineering Report' | 'Invoice' | 'Change Order';
  fileSize: string;
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'Approved' | 'Under Review' | 'Needs Revision' | 'Draft';
  fileUrl?: string;
}

export interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  projectName: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  phaseDescription: string;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  category: 'project' | 'consultation' | 'document' | 'finance' | 'system';
}

