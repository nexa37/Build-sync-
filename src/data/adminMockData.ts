import { AdminProject, AdminConsultation, AdminUser, AdminDocument, AdminInvoice, AdminActivityLog } from '../types';

export const INITIAL_ADMIN_PROJECTS: AdminProject[] = [
  {
    id: 'PRJ-101',
    title: 'Modern 3-Bedroom Residence',
    clientName: 'Mira Henderson',
    clientEmail: 'mira.h@example.com',
    location: '1428 Elm Ridge, Austin, TX',
    stage: 'Foundation & Framing',
    progress: 42,
    budget: 680000,
    spent: 285600,
    startDate: '2026-03-15',
    targetCompletion: '2026-11-30',
    assignedArchitect: 'Sarah Jenkins (Lead Architect)',
    assignedManager: 'David Kalu (Site Lead)',
    status: 'Active',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    notes: 'Framing inspection scheduled for Thursday. Concrete pour completed with full PSI certification.'
  },
  {
    id: 'PRJ-102',
    title: 'Lakeside Modern Cabin',
    clientName: 'Mira Henderson',
    clientEmail: 'mira.h@example.com',
    location: '88 Lakeview Point, Travis County, TX',
    stage: 'Permits & Engineering',
    progress: 18,
    budget: 420000,
    spent: 75600,
    startDate: '2026-06-01',
    targetCompletion: '2027-02-15',
    assignedArchitect: 'Sarah Jenkins (Lead Architect)',
    assignedManager: 'Alex Mercer (Field Engineer)',
    status: 'Active',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    notes: 'Environmental runoff and shoreline setback permits under county review.'
  },
  {
    id: 'PRJ-103',
    title: 'Highland Park Commercial Studio',
    clientName: 'Robert Sterling',
    clientEmail: 'r.sterling@sterlingarch.com',
    location: '304 Congress Ave, Suite 400, Austin, TX',
    stage: 'Finishes & Interior',
    progress: 88,
    budget: 950000,
    spent: 836000,
    startDate: '2025-10-10',
    targetCompletion: '2026-09-15',
    assignedArchitect: 'Elena Rostova (Senior Designer)',
    assignedManager: 'Marcus Vance (General Contractor)',
    status: 'Active',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    notes: 'Acoustic wall paneling and custom architectural millwork in final installation.'
  },
  {
    id: 'PRJ-104',
    title: 'Hill Country Eco-Villa & Vineyard',
    clientName: 'Claire & Thomas Dupont',
    clientEmail: 'tdupont@winecountry.org',
    location: '512 Ranch Road 12, Dripping Springs, TX',
    stage: 'Architectural Design',
    progress: 25,
    budget: 1450000,
    spent: 362500,
    startDate: '2026-05-20',
    targetCompletion: '2027-08-30',
    assignedArchitect: 'Sarah Jenkins (Lead Architect)',
    assignedManager: 'David Kalu (Site Lead)',
    status: 'Active',
    thumbnailUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    notes: 'Geothermal heating schematics and rainwater harvesting system drafted.'
  },
  {
    id: 'PRJ-105',
    title: 'Barton Springs Passive House Remodel',
    clientName: 'Dr. Evelyn Martinez',
    clientEmail: 'emartinez@healthtx.edu',
    location: '2210 Barton Creek Blvd, Austin, TX',
    stage: 'Handover & Closeout',
    progress: 100,
    budget: 520000,
    spent: 512000,
    startDate: '2025-08-01',
    targetCompletion: '2026-07-30',
    assignedArchitect: 'Elena Rostova (Senior Designer)',
    assignedManager: 'Alex Mercer (Field Engineer)',
    status: 'Completed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    notes: 'Final occupancy certificate granted. Blower-door air tightness test achieved 0.4 ACH50.'
  }
];

export const INITIAL_ADMIN_CONSULTATIONS: AdminConsultation[] = [
  {
    id: 'CNS-201',
    clientName: 'Mira Henderson',
    clientEmail: 'mira.h@example.com',
    phone: '+1 (512) 839-4412',
    projectType: 'Site Survey & Structural Planning',
    budget: '$400k - $750k',
    location: 'Travis County, TX',
    preferredDate: '2026-08-28',
    preferredTime: '10:00 AM (CST)',
    assignedStaff: 'Sarah Jenkins (Lead Architect)',
    status: 'Confirmed',
    notes: 'Client requests in-depth discussion on foundation options for sloped lakeside topography.',
    meetingLink: 'https://meet.google.com/bsy-site-plan',
    submittedAt: '2026-08-22 14:30'
  },
  {
    id: 'CNS-202',
    clientName: 'Jonathan Vance',
    clientEmail: 'jvance@vancetech.io',
    phone: '+1 (512) 991-8800',
    projectType: 'Custom Modern Penthouse Buildout',
    budget: '$1.2M+',
    location: 'Downtown Austin, TX',
    preferredDate: '2026-08-30',
    preferredTime: '02:00 PM (CST)',
    assignedStaff: 'Elena Rostova (Senior Designer)',
    status: 'Pending',
    notes: 'Needs structural feasibility review for private rooftop pool and reinforced steel pergola.',
    submittedAt: '2026-08-23 09:15'
  },
  {
    id: 'CNS-203',
    clientName: 'Sophia Lin & Daniel Craig',
    clientEmail: 'sophialin.design@gmail.com',
    phone: '+1 (737) 412-9031',
    projectType: 'Net-Zero Solar Contemporary Home',
    budget: '$850k - $1.1M',
    location: 'Westlake Hills, TX',
    preferredDate: '2026-09-02',
    preferredTime: '11:30 AM (CST)',
    assignedStaff: 'Alex Mercer (Field Engineer)',
    status: 'Confirmed',
    notes: 'Client prepared zoning setback documents and utility connection maps.',
    meetingLink: 'https://meet.google.com/bsy-solar-spec',
    submittedAt: '2026-08-23 16:45'
  },
  {
    id: 'CNS-204',
    clientName: 'Marcus Gable',
    clientEmail: 'mgable@heritageproperties.com',
    phone: '+1 (512) 650-2219',
    projectType: 'Historic Facade Restoration & Extension',
    budget: '$600k - $900k',
    location: 'Hyde Park Historic District, Austin, TX',
    preferredDate: '2026-09-05',
    preferredTime: '03:30 PM (CST)',
    assignedStaff: 'Sarah Jenkins (Lead Architect)',
    status: 'Pending',
    notes: 'Requires compliance with Historic Landmark Commission guidelines.',
    submittedAt: '2026-08-24 08:20'
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'USR-01',
    name: 'Mira Henderson',
    email: 'mira.h@example.com',
    role: 'Client',
    phone: '+1 (512) 839-4412',
    status: 'Active',
    assignedProjectsCount: 2,
    avatarColor: 'from-[#1A1A1A] to-[#4A4A4A]',
    joinedDate: '2026-02-10'
  },
  {
    id: 'USR-02',
    name: 'Marcus Vance',
    email: 'marcus.vance@buildsync.io',
    role: 'General Contractor',
    phone: '+1 (512) 555-0199',
    status: 'Active',
    assignedProjectsCount: 5,
    avatarColor: 'from-[#10B981] to-[#047857]',
    joinedDate: '2024-01-15'
  },
  {
    id: 'USR-03',
    name: 'Sarah Jenkins, AIA',
    email: 'sarah.jenkins@buildsync.io',
    role: 'Lead Architect',
    phone: '+1 (512) 555-0144',
    status: 'Active',
    assignedProjectsCount: 3,
    avatarColor: 'from-amber-600 to-amber-800',
    joinedDate: '2024-03-01'
  },
  {
    id: 'USR-04',
    name: 'David Kalu',
    email: 'david.kalu@buildsync.io',
    role: 'Project Manager',
    phone: '+1 (512) 555-0177',
    status: 'Active',
    assignedProjectsCount: 2,
    avatarColor: 'from-blue-600 to-indigo-800',
    joinedDate: '2024-06-12'
  },
  {
    id: 'USR-05',
    name: 'Alex Mercer, PE',
    email: 'alex.mercer@buildsync.io',
    role: 'Site Engineer',
    phone: '+1 (512) 555-0128',
    status: 'Active',
    assignedProjectsCount: 2,
    avatarColor: 'from-emerald-600 to-teal-800',
    joinedDate: '2024-09-20'
  },
  {
    id: 'USR-06',
    name: 'Elena Rostova',
    email: 'elena.r@buildsync.io',
    role: 'Lead Architect',
    phone: '+1 (512) 555-0182',
    status: 'Active',
    assignedProjectsCount: 2,
    avatarColor: 'from-purple-600 to-indigo-700',
    joinedDate: '2025-02-14'
  },
  {
    id: 'USR-07',
    name: 'Apex Precision Framing LLC',
    email: 'dispatch@apexframing.com',
    role: 'Subcontractor',
    phone: '+1 (512) 774-9000',
    status: 'Active',
    assignedProjectsCount: 3,
    avatarColor: 'from-stone-600 to-stone-800',
    joinedDate: '2025-05-18'
  }
];

export const INITIAL_ADMIN_DOCUMENTS: AdminDocument[] = [
  {
    id: 'DOC-501',
    title: 'Architectural_Master_Plan_v3.pdf',
    projectName: 'Modern 3-Bedroom Residence',
    clientName: 'Mira Henderson',
    category: 'Blueprint',
    fileSize: '24.8 MB',
    version: '3.1',
    uploadedBy: 'Sarah Jenkins (Lead Architect)',
    uploadedAt: '2026-08-20',
    status: 'Approved',
    fileUrl: '#'
  },
  {
    id: 'DOC-502',
    title: 'Travis_County_Building_Permit_Signed.pdf',
    projectName: 'Modern 3-Bedroom Residence',
    clientName: 'Mira Henderson',
    category: 'Permit',
    fileSize: '4.2 MB',
    version: '1.0',
    uploadedBy: 'Alex Mercer (Field Engineer)',
    uploadedAt: '2026-08-18',
    status: 'Approved',
    fileUrl: '#'
  },
  {
    id: 'DOC-503',
    title: 'HVAC_Revised_Layout_Schedule.pdf',
    projectName: 'Modern 3-Bedroom Residence',
    clientName: 'Mira Henderson',
    category: 'Engineering Report',
    fileSize: '8.6 MB',
    version: '2.0',
    uploadedBy: 'Alex Mercer (Field Engineer)',
    uploadedAt: '2026-08-23',
    status: 'Under Review',
    fileUrl: '#'
  },
  {
    id: 'DOC-504',
    title: 'Shoreline_Setback_Hydro_Analysis.pdf',
    projectName: 'Lakeside Modern Cabin',
    clientName: 'Mira Henderson',
    category: 'Engineering Report',
    fileSize: '16.4 MB',
    version: '1.2',
    uploadedBy: 'Apex Precision Engineering',
    uploadedAt: '2026-08-21',
    status: 'Needs Revision',
    fileUrl: '#'
  },
  {
    id: 'DOC-505',
    title: 'General_Contractor_Agreement_Executed.pdf',
    projectName: 'Highland Park Commercial Studio',
    clientName: 'Robert Sterling',
    category: 'Contract',
    fileSize: '2.1 MB',
    version: 'Final',
    uploadedBy: 'Marcus Vance (General Contractor)',
    uploadedAt: '2025-10-08',
    status: 'Approved',
    fileUrl: '#'
  },
  {
    id: 'DOC-506',
    title: 'Change_Order_04_Acoustic_Panels.pdf',
    projectName: 'Highland Park Commercial Studio',
    clientName: 'Robert Sterling',
    category: 'Change Order',
    fileSize: '1.8 MB',
    version: '1.0',
    uploadedBy: 'Elena Rostova',
    uploadedAt: '2026-08-22',
    status: 'Under Review',
    fileUrl: '#'
  }
];

export const INITIAL_ADMIN_INVOICES: AdminInvoice[] = [
  {
    id: 'INV-801',
    invoiceNumber: 'BS-2026-041',
    projectName: 'Modern 3-Bedroom Residence',
    clientName: 'Mira Henderson',
    amount: 142800,
    issueDate: '2026-08-15',
    dueDate: '2026-09-01',
    status: 'Paid',
    phaseDescription: 'Phase 2: Foundation Pour & Framing Milestone Complete'
  },
  {
    id: 'INV-802',
    invoiceNumber: 'BS-2026-048',
    projectName: 'Lakeside Modern Cabin',
    clientName: 'Mira Henderson',
    amount: 38400,
    issueDate: '2026-08-10',
    dueDate: '2026-08-25',
    status: 'Pending',
    phaseDescription: 'Phase 1: Soil Sampling, Topography LiDAR, & Zoning Retainer'
  },
  {
    id: 'INV-803',
    invoiceNumber: 'BS-2026-039',
    projectName: 'Highland Park Commercial Studio',
    clientName: 'Robert Sterling',
    amount: 195000,
    issueDate: '2026-07-28',
    dueDate: '2026-08-15',
    status: 'Paid',
    phaseDescription: 'Phase 4: MEP Rough-In & Structural Steel Acceptance'
  },
  {
    id: 'INV-804',
    invoiceNumber: 'BS-2026-052',
    projectName: 'Hill Country Eco-Villa & Vineyard',
    clientName: 'Claire & Thomas Dupont',
    amount: 85000,
    issueDate: '2026-08-22',
    dueDate: '2026-09-10',
    status: 'Pending',
    phaseDescription: 'Phase 1: Architectural Schematic Design & 3D BIM Model'
  }
];

export const INITIAL_ADMIN_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'ACT-01',
    timestamp: '10 mins ago',
    user: 'Sarah Jenkins',
    role: 'Lead Architect',
    action: 'Uploaded new revision',
    target: 'Architectural_Master_Plan_v3.pdf',
    category: 'document'
  },
  {
    id: 'ACT-02',
    timestamp: '45 mins ago',
    user: 'Marcus Vance',
    role: 'General Contractor',
    action: 'Approved inspection milestone',
    target: 'Modern 3-Bedroom Residence - Concrete Pour',
    category: 'project'
  },
  {
    id: 'ACT-03',
    timestamp: '2 hours ago',
    user: 'System Bot',
    role: 'Automated Queue',
    action: 'New consultation booked by client',
    target: 'Jonathan Vance (Downtown Penthouse)',
    category: 'consultation'
  },
  {
    id: 'ACT-04',
    timestamp: '4 hours ago',
    user: 'David Kalu',
    role: 'Project Manager',
    action: 'Updated progress to 42%',
    target: 'Modern 3-Bedroom Residence',
    category: 'project'
  },
  {
    id: 'ACT-05',
    timestamp: 'Yesterday',
    user: 'Finance Desk',
    role: 'Admin',
    action: 'Dispatched progress invoice BS-2026-052',
    target: 'Hill Country Eco-Villa ($85,000)',
    category: 'finance'
  },
  {
    id: 'ACT-06',
    timestamp: '2 days ago',
    user: 'Alex Mercer',
    role: 'Site Engineer',
    action: 'Requested revision on shoreline report',
    target: 'Lakeside Modern Cabin',
    category: 'document'
  }
];
