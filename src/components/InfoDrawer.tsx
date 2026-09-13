import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Briefcase,
  Layers,
  Calendar,
  CheckCircle2,
  Send,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ArrowRight,
  HardHat,
  Sliders,
  Maximize2,
  ArrowLeft,
  BookOpen,
  User
} from 'lucide-react';
import { ModalKey, ConsultationFormData } from '../types';

interface InfoDrawerProps {
  activeModal: ModalKey;
  onClose: () => void;
  onSelectModal: (modal: ModalKey) => void;
}

export default function InfoDrawer({ activeModal, onClose, onSelectModal }: InfoDrawerProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    projectType: 'Commercial Build',
    budget: '$250k - $1M',
    location: '',
    timeline: 'Within 3-6 Months',
    message: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  if (!activeModal) return null;

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`BuildSync Consultation Request: ${formData.projectType} - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nEstimated Budget: ${formData.budget}\nProject Location: ${formData.location}\nTimeline: ${formData.timeline}\n\nProject Scope & Notes:\n${formData.message}`
    );
    window.location.href = `mailto:johnharrissimons@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmittedMessage('Your consultation request has been prepared for dispatch to johnharrissimons@gmail.com');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`BuildSync Inquiry: ${contactForm.subject || 'Direct Message'} - ${contactForm.name}`);
    const mailtoBody = encodeURIComponent(
      `From: ${contactForm.name} (${contactForm.email})\n\nMessage:\n${contactForm.message}`
    );
    window.location.href = `mailto:johnharrissimons@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmittedMessage('Your message has been addressed directly to johnharrissimons@gmail.com');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Lower Pop-up / Bottom Sheet Modal with Glassmorphism */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="relative z-10 w-full max-w-5xl max-h-[88vh] glass-drawer rounded-t-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.8)] flex flex-col text-brand-text overflow-hidden"
        >
          {/* Top Bar / Handle */}
          <div className="pt-3.5 pb-2.5 px-6 flex items-center justify-between border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold font-mono">
                BuildSync Hub • {activeModal.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            {/* Grab handle */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto hidden sm:block" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-brand-text/60 hover:text-brand-text hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content Container */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-8 custom-scrollbar">

            {/* 1. HOW IT WORKS */}
            {activeModal === 'how-it-works' && (
              <div>
                <div className="mb-8">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Platform Workflow</span>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                    How BuildSync Orchestrates Your Project
                  </h2>
                  <p className="text-brand-text/60 mt-2 text-base leading-relaxed max-w-3xl">
                    BuildSync converts disjointed job-site communication into a synchronized, transparent digital ecosystem from preliminary zoning feasibility to final certificate of occupancy.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-md bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold mb-4">
                      01
                    </div>
                    <h3 className="text-lg font-semibold text-brand-text mb-2">Phase 1: Scoping & Intake</h3>
                    <p className="text-brand-text/60 text-sm leading-relaxed mb-4">
                      Upload CAD schematics, BIM models, and site surveys. Our structural analysis engine flags potential zoning or budget bottlenecks before equipment mobilizes.
                    </p>
                    <ul className="text-xs text-brand-text/50 space-y-1.5">
                      <li>• Automated document versioning</li>
                      <li>• Zoning & permit pre-audit</li>
                      <li>• Milestone budget allocation</li>
                    </ul>
                  </div>

                  <div className="glass-card p-6 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-md bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold mb-4">
                      02
                    </div>
                    <h3 className="text-lg font-semibold text-brand-text mb-2">Phase 2: Expert Team Alignment</h3>
                    <p className="text-brand-text/60 text-sm leading-relaxed mb-4">
                      Invite architects, structural engineers, general contractors, and trade leads into unified workspaces with strict role-based data permissions.
                    </p>
                    <ul className="text-xs text-brand-text/50 space-y-1.5">
                      <li>• Subcontractor RFP & bidding</li>
                      <li>• Real-time blueprint markups</li>
                      <li>• RFI & submittal acceleration</li>
                    </ul>
                  </div>

                  <div className="glass-card p-6 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-md bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold mb-4">
                      03
                    </div>
                    <h3 className="text-lg font-semibold text-brand-text mb-2">Phase 3: Execution & Sync</h3>
                    <p className="text-brand-text/60 text-sm leading-relaxed mb-4">
                      Track daily site logs, weather impact forecasts, safety inspections, and escrow disbursements in synchronized live dashboards.
                    </p>
                    <ul className="text-xs text-brand-text/50 space-y-1.5">
                      <li>• Daily digital field logs</li>
                      <li>• Drone & photogrammetry sync</li>
                      <li>• Milestone escrow release</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm text-brand-text/60">
                    Ready to evaluate your build? Connect directly with our lead coordinator.
                  </div>
                  <button
                    onClick={() => onSelectModal('consultation')}
                    className="bg-brand-gold text-brand-bg px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-brand-gold-hover transition-all"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            )}

            {/* 2. FEATURES */}
            {activeModal === 'features' && (
              <div>
                <div className="mb-8">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Core Capabilities</span>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                    Engineered for Precision Construction
                  </h2>
                  <p className="text-brand-text/60 mt-2 text-base leading-relaxed max-w-3xl">
                    Every feature is built specifically to address the root causes of cost overruns, timeline drift, and communication fragmentation in modern construction.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Layers className="text-brand-gold" size={24} />,
                      title: 'Live Blueprint & BIM Synchronization',
                      desc: 'Ensure every sub on site has the latest revision. Push instant plan updates with visual diff tracking to eliminate costly rework.'
                    },
                    {
                      icon: <CheckCircle2 className="text-brand-gold" size={24} />,
                      title: 'Automated Inspection & Compliance Workflows',
                      desc: 'Standardized safety audits, municipal code compliance checklists, and digital sign-offs stored with cryptographic tamper-evident audit trails.'
                    },
                    {
                      icon: <Calendar className="text-brand-gold" size={24} />,
                      title: 'Critical Path Dynamic Gantt Scheduling',
                      desc: 'Phased scheduling that recalculates dependent milestones automatically when material delays or weather anomalies occur.'
                    },
                    {
                      icon: <ShieldCheck className="text-brand-gold" size={24} />,
                      title: 'Milestone Escrow & Verified Progress Billing',
                      desc: 'Release contractor disbursements based on verified photographic field proof and third-party inspection validation.'
                    }
                  ].map((feat, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-xl border border-white/10 flex gap-4">
                      <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-white/5 border border-white/10">
                        {feat.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-brand-text mb-1">{feat.title}</h3>
                        <p className="text-sm text-brand-text/60 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => onSelectModal('get-started')}
                    className="bg-brand-gold text-brand-bg px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-brand-gold-hover transition-all"
                  >
                    Start Using BuildSync
                  </button>
                </div>
              </div>
            )}

            {/* 3. CONSULTATION / GET STARTED */}
            {(activeModal === 'consultation' || activeModal === 'get-started') && (
              <div>
                <div className="mb-6">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                    {activeModal === 'get-started' ? 'Onboarding & Project Initiation' : 'Expert Consultation Booking'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                    Let’s Plan Your Next Build
                  </h2>
                  <p className="text-brand-text/60 mt-2 text-sm leading-relaxed max-w-2xl">
                    Fill in your project details below. Your submission directly dispatches to our principal coordinator at{' '}
                    <strong className="text-brand-gold font-mono">johnharrissimons@gmail.com</strong>.
                  </p>
                </div>

                {submittedMessage && (
                  <div className="p-4 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-sm flex items-center gap-3 mb-6">
                    <CheckCircle2 size={20} />
                    <span>{submittedMessage}</span>
                  </div>
                )}

                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                        Your Name / Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Henderson / Apex Developments"
                        className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@apexbuild.com"
                        className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                        Project Classification
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="glass-input w-full rounded-xl px-3 py-3 text-sm text-brand-text focus:outline-none bg-[#13161f]"
                      >
                        <option value="Commercial Build" className="bg-[#13161f]">Commercial Development</option>
                        <option value="Residential High-End" className="bg-[#13161f]">Luxury Residential</option>
                        <option value="Industrial & Logistics" className="bg-[#13161f]">Industrial / Logistics</option>
                        <option value="Urban Renovation" className="bg-[#13161f]">Major Renovation & Retrofit</option>
                        <option value="Municipal / Infrastructure" className="bg-[#13161f]">Municipal / Infrastructure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="glass-input w-full rounded-xl px-3 py-3 text-sm text-brand-text focus:outline-none bg-[#13161f]"
                      >
                        <option value="$100k - $250k" className="bg-[#13161f]">$100,000 – $250,000</option>
                        <option value="$250k - $1M" className="bg-[#13161f]">$250,000 – $1,000,000</option>
                        <option value="$1M - $5M" className="bg-[#13161f]">$1,000,000 – $5,000,000</option>
                        <option value="$5M+" className="bg-[#13161f]">$5,000,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="glass-input w-full rounded-xl px-3 py-3 text-sm text-brand-text focus:outline-none bg-[#13161f]"
                      >
                        <option value="Immediate (0-30 Days)" className="bg-[#13161f]">Immediate (0-30 Days)</option>
                        <option value="Within 3-6 Months" className="bg-[#13161f]">Within 3–6 Months</option>
                        <option value="6-12 Months" className="bg-[#13161f]">6–12 Months</option>
                        <option value="Planning Phase" className="bg-[#13161f]">Pre-Planning & Feasibility</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                      Site Location / City
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Austin, TX (or Project Address)"
                      className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">
                      Project Notes & Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe current status, permits required, architectural drawings completed..."
                      className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-brand-text/50 flex items-center gap-2">
                      <Mail size={14} className="text-brand-gold" />
                      <span>Direct Contact: johnharrissimons@gmail.com</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-brand-gold via-[#d4b374] to-brand-gold hover:from-brand-gold-hover hover:to-brand-gold text-brand-bg px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,160,89,0.35)] cursor-pointer active:scale-95 border border-white/20"
                    >
                      <span>Submit Consultation Request</span>
                      <Send size={15} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 4. ABOUT US */}
            {activeModal === 'about-us' && (
              <div>
                <div className="mb-8">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Company Overview</span>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                    Architecting the Future of Construction Tech
                  </h2>
                  <p className="text-brand-text/60 mt-2 text-base leading-relaxed max-w-3xl">
                    BuildSync was founded with a singular conviction: construction projects should be as predictable, transparent, and synchronized as aerospace engineering.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                  <div className="space-y-4 text-brand-text/70 text-sm leading-relaxed">
                    <p>
                      Traditional construction suffers from fragmented silos — architects draft in specialized CAD software, general contractors track timelines in spreadsheets, and site trade teams coordinate via disconnected text messages.
                    </p>
                    <p>
                      BuildSync establishes a unified, cloud-native coordination layer where data flows seamlessly from blueprint conception to final punch-list sign-off.
                    </p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-brand-gold">Our Philosophy</div>
                      <div className="text-xs text-brand-text/80 leading-relaxed">
                        • Complete transparency across client, contractor, and municipal stakeholders.<br />
                        • Zero tolerance for uncoordinated blueprint drift.<br />
                        • Precision escrow protection and verified milestone auditing.
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h3 className="text-base font-semibold text-brand-text">Headquarters & Operational Model</h3>
                    <div className="flex items-start gap-3 text-xs text-brand-text/70">
                      <MapPin className="text-brand-gold flex-shrink-0 mt-0.5" size={16} />
                      <div>
                        <strong className="text-brand-text block">Austin Innovation Hub (Suggested Location):</strong>
                        100 Congress Avenue, Suite 2000<br />
                        Austin, TX 78701
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-xs text-brand-text/70">
                      <Mail className="text-brand-gold flex-shrink-0 mt-0.5" size={16} />
                      <div>
                        <strong className="text-brand-text block">Direct Inquiries:</strong>
                        johnharrissimons@gmail.com
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-xs text-brand-text/70">
                      <Clock className="text-brand-gold flex-shrink-0 mt-0.5" size={16} />
                      <div>
                        <strong className="text-brand-text block">Operations:</strong>
                        Mon – Fri: 7:00 AM – 7:00 PM CST (24/7 Field Support for Active Jobsites)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CAREERS */}
            {activeModal === 'careers' && (
              <div>
                <div className="mb-8">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Join Our Team</span>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                    Building the Tools That Build the World
                  </h2>
                  <p className="text-brand-text/60 mt-2 text-base leading-relaxed max-w-3xl">
                    We are an agile, construction-obsessed team uniting architects, field engineers, and software crafters. Work remotely or from our Austin innovation center.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      role: 'Senior BIM & Blueprint Solutions Architect',
                      type: 'Full-Time • Austin, TX / Remote',
                      desc: 'Lead our 3D CAD/BIM ingestion pipeline, IFC schema parsing, and live clash detection system.'
                    },
                    {
                      role: 'Construction Tech Project Manager',
                      type: 'Full-Time • Austin, TX / Hybrid',
                      desc: 'Consult directly with enterprise general contractors and manage onboarding for high-rise commercial builds.'
                    },
                    {
                      role: 'Full-Stack Distributed Systems Engineer',
                      type: 'Full-Time • Remote',
                      desc: 'Scale our real-time synchronization backend, event streaming, and offline-first mobile sync.'
                    }
                  ].map((job, idx) => (
                    <div key={idx} className="glass-card p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-brand-text">{job.role}</h3>
                        <span className="text-xs text-brand-gold block mt-0.5">{job.type}</span>
                        <p className="text-xs text-brand-text/60 mt-1 max-w-xl">{job.desc}</p>
                      </div>
                      <a
                        href={`mailto:johnharrissimons@gmail.com?subject=${encodeURIComponent(`Application: ${job.role}`)}`}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-brand-text px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap"
                      >
                        Apply via Email
                      </a>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-brand-text/60 flex items-center justify-between">
                  <span>Don’t see your exact role? Send your resume and portfolio directly to <strong className="text-brand-gold">johnharrissimons@gmail.com</strong>.</span>
                </div>
              </div>
            )}

            {/* 6. BLOG & ARTICLES */}
            {activeModal === 'blog' && (
              <div>
                {/* Check if an article is selected to view */}
                {selectedArticleId ? (
                  (() => {
                    const article = [
                      {
                        id: 'cost-control-rework',
                        tag: 'Cost Control & BIM',
                        title: 'How Cloud Blueprint Versioning Eliminates $400k Rework Cycles',
                        subtitle: 'Analyzing how single-source CAD/BIM delta-syncing prevents multi-trade framing collisions and structural redraw liabilities.',
                        author: 'Elena Rostova, PE',
                        authorRole: 'Senior Structural Solutions Director',
                        date: 'August 14, 2026',
                        readTime: '5 min read',
                        keyTakeaways: [
                          'Over 68% of commercial jobsite rework traces back to sub-trades working from superseded 2D sheet sets.',
                          'Instant cloud delta-syncing alerts field superintendents within 3 seconds of an architectural revision release.',
                          'Early clash detection saves mid-rise and high-rise projects an average of $420,000 in change orders.'
                        ],
                        sections: [
                          {
                            heading: 'The Hidden Cost of Fragmented Sheet Distribution',
                            content: `In standard commercial construction, an architectural revision goes through multiple administrative checkpoints before reaching the sub-trades. Structural changes, HVAC routing adjustments, and plumbing penetrations are often emailed as large PDF attachments or uploaded to disjointed FTP servers. By the time a concrete core or drywall crew installs framing in Sector B, they may be operating off Revision C when Revision E has already moved the duct corridor by 18 inches. The result is instant conflict: demolished framing, delayed inspections, and expensive change orders.`
                          },
                          {
                            heading: 'Real-Time Delta Synchronization vs. Traditional Batch Updates',
                            content: `BuildSync replaces manual batch document management with continuous delta synchronization. When the structural engineering firm releases an amended IFC model or stamped drawing, the platform automatically flags geometric deviations against the active MEP layers. Field foremen receive push alerts directly on their ruggedized tablets, with modified vectors highlighted in amber. Work cannot proceed in an affected grid without acknowledged sign-off from the project engineer.`
                          },
                          {
                            heading: 'Quantifiable ROI: Case Study from One Metro Tower',
                            content: `During the construction of the 42-story One Metro Tower, the coordination team tracked 84 major architectural revisions across structural steel and mechanical trades. By resolving 112 potential pipe-beam penetrations in virtual pre-construction rather than on the deck, the general contractor eliminated an estimated $438,000 in saw-cutting, core drilling, and crew standby costs.`
                          }
                        ],
                        checklist: [
                          'Enforce mandatory daily morning blueprint synchronization for all foremen.',
                          'Require photo verification and digital pin tags for every field penetration.',
                          'Archive superseded revision sheets automatically to prevent accidental execution.',
                          'Link all RFIs directly to 3D coordinates rather than standalone email threads.'
                        ]
                      },
                      {
                        id: 'subcontractor-sync-guide',
                        tag: 'Trade Coordination',
                        title: 'The Modern General Contractor’s Guide to Subcontractor Sync',
                        subtitle: 'Eliminating chaotic SMS threads and unverified field directives with synchronized, geofenced job site logs.',
                        author: 'Marcus Sterling',
                        authorRole: 'VP of Construction Field Technology',
                        date: 'July 28, 2026',
                        readTime: '7 min read',
                        keyTakeaways: [
                          'Fragmented SMS and messaging groups create critical accountability gaps during forensic defect investigations.',
                          'Geofenced digital daily logs ensure on-site headcounts and equipment utilization are accurately documented.',
                          'Standardized 4-hour RFI response SLAs prevent multi-day downstream trade stoppages.'
                        ],
                        sections: [
                          {
                            heading: 'Why Text Messages Are the Enemy of Jobsite Accountability',
                            content: `When a field foreman encounters an unexpected utility obstruction, the default reaction is often to snap a quick photo and text the general superintendent. While fast, this creates an unindexed silo. The architect never sees the query, the MEP coordinator remains uninformed, and no formal record exists when a $45,000 delay claim arises months later. Transitioning trades to a centralized platform ensures every question is geo-tagged, timestamped, and visible to all dependent contractors.`
                          },
                          {
                            heading: 'Establishing Clear Role-Based Field Protocols',
                            content: `Coordination is not about restricting communication; it is about channeling it with clarity. BuildSync allows general contractors to configure custom permissions where electrical, plumbing, and structural trades can tag issues directly into the shared building model. The system routes the query immediately to the designated engineer of record with an automated escalation timer if unaddressed within 4 business hours.`
                          },
                          {
                            heading: 'Streamlining Daily Logs and Workforce Verification',
                            content: `By integrating GPS-verified site check-ins with automated weather telemetry, superintendents eliminate hours of manual paperwork each evening. Daily logs auto-populate with exact temperatures, crew counts by trade, active equipment hours, and milestone progress percentages ready for owner review.`
                          }
                        ],
                        checklist: [
                          'Mandate platform onboarding as a standard clause in subcontractor master agreements.',
                          'Conduct 10-minute digital coordination standups at the start of each work week.',
                          'Utilize voice-to-text field notes to record site observations immediately.',
                          'Require milestone sign-offs from both general contractor and trade leads prior to trade transitions.'
                        ]
                      },
                      {
                        id: 'milestone-progress-billing',
                        tag: 'Legal & Escrow',
                        title: 'Milestone Progress Billing: Mitigating Lien Risks in Commercial Builds',
                        subtitle: 'How escrow-backed milestone verification and automated partial lien waivers safeguard developer capital and sub-trade cashflow.',
                        author: 'David Vance, JD',
                        authorRole: 'Construction Risk & Contract Counsel',
                        date: 'June 19, 2026',
                        readTime: '4 min read',
                        keyTakeaways: [
                          'Mechanics liens represent the most common legal impediment to commercial project financing and title clarity.',
                          'Progress draw payments linked to photographic milestone verification eliminate subjective completion disputes.',
                          'Automated execution of conditional and unconditional lien waivers protects developers at every billing cycle.'
                        ],
                        sections: [
                          {
                            heading: 'The Vulnerability of Traditional Draw Requests',
                            content: `Conventional commercial draw schedules rely on monthly percentage-of-completion estimates submitted by the general contractor. Because these estimates are often based on subjective assessments rather than verified physical installations, developers frequently overpay early in the project lifecycle, leaving insufficient contingency when punchlist items and defects emerge near turnover.`
                          },
                          {
                            heading: 'Escrow-Backed Milestone Release Architecture',
                            content: `BuildSync links draw disbursements directly to pre-agreed verifiable deliverables: foundation pour completion, rough-in MEP inspection approvals, envelope water-testing sign-offs, and final municipal certificates. Funds are held in dedicated escrow sub-accounts and released only when all required inspection photos, third-party test reports, and signed lien waivers are cryptographically validated in the system.`
                          },
                          {
                            heading: 'Protecting Both Capital Providers and Trade Contractors',
                            content: `This structured transparency benefits both sides of the capital stack. Developers and institutional lenders gain absolute assurance that funds correspond to tangible installed value, while subcontractors receive guaranteed, on-time payment within 48 hours of verified milestone completion, eliminating predatory payment delays.`
                          }
                        ],
                        checklist: [
                          'Define precise milestone completion criteria in initial subcontract exhibits.',
                          'Require geotagged 360-degree photography for all concealed structural and MEP work.',
                          'Automate unconditional lien waiver generation upon electronic fund clearance.',
                          'Maintain an auditable digital chain of custody for all municipal and private inspection certificates.'
                        ]
                      },
                      {
                        id: 'energy-code-compliance',
                        tag: 'Zoning & Compliance',
                        title: 'Navigating 2026 Energy Code Compliance in High-Rise Envelopes',
                        subtitle: 'Practical field checklists for continuous thermal boundary audits, air barrier QA/QC, and municipal green code signoffs.',
                        author: 'Sarah Lin, AIA, LEED AP BD+C',
                        authorRole: 'Building Envelope & Sustainability Director',
                        date: 'May 11, 2026',
                        readTime: '6 min read',
                        keyTakeaways: [
                          'Updated 2026 municipal codes mandate quantitative air tightness testing for commercial envelopes above 50,000 sq ft.',
                          'Continuous thermal bridging inspections must be validated during framing before curtain wall closure.',
                          'Digital compliance tracking streamlines LEED and Net-Zero certification submissions by over 40%.'
                        ],
                        sections: [
                          {
                            heading: 'The Shift Toward Continuous Envelope Auditing',
                            content: `Municipal building departments across major metropolitan areas have adopted rigorous new energy codes emphasizing thermal performance and air tightness. Envelope compliance is no longer a document submitted at final inspection; it requires continuous verification at every stage of fenestration, flashing, and insulation installation.`
                          },
                          {
                            heading: 'Catching Thermal Flaws Before Enclosure',
                            content: `BuildSync enables envelope inspectors and commissioning agents to conduct infrared and visual inspections directly on the digital blueprint canvas. Deficiencies in air barrier continuity or thermal insulation gaps are flagged with GPS coordinates and assigned directly to the responsible trade before exterior cladding seals the assembly.`
                          }
                        ],
                        checklist: [
                          'Perform whole-building air leakage testing early during mock-up phases.',
                          'Verify continuous insulation R-values across all floor slabs and parapet details.',
                          'Log all sealant and membrane batch numbers for manufacturer warranty backing.',
                          'Integrate building envelope commissioning reports directly into the owner turnover binder.'
                        ]
                      }
                    ];

                    const currentPost = article.find(a => a.id === selectedArticleId) || article[0];

                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        {/* Top Back Navigation Bar */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <button
                            onClick={() => setSelectedArticleId(null)}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-gold-hover transition-colors px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-brand-gold/40 cursor-pointer"
                          >
                            <ArrowLeft size={14} />
                            <span>Back to All Insights</span>
                          </button>
                          
                          <div className="flex items-center gap-2 text-xs text-brand-text/50 font-mono">
                            <Clock size={13} className="text-brand-gold" />
                            <span>{currentPost.readTime}</span>
                          </div>
                        </div>

                        {/* Article Header */}
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full glass-gold-pill text-brand-gold text-xs font-semibold uppercase tracking-wider">
                            <BookOpen size={13} />
                            <span>{currentPost.tag}</span>
                          </div>

                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-brand-text leading-tight">
                            {currentPost.title}
                          </h1>

                          <p className="text-base sm:text-lg text-brand-text/75 font-light leading-relaxed">
                            {currentPost.subtitle}
                          </p>

                          {/* Author Byline */}
                          <div className="flex items-center gap-3 pt-2 pb-2 text-xs text-brand-text/60 border-y border-white/10">
                            <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold border border-brand-gold/40 flex-shrink-0">
                              <User size={16} />
                            </div>
                            <div>
                              <div className="font-semibold text-brand-text">{currentPost.author}</div>
                              <div className="text-brand-text/50 text-[11px]">{currentPost.authorRole} • Published {currentPost.date}</div>
                            </div>
                          </div>
                        </div>

                        {/* Key Takeaways Callout Card */}
                        <div className="glass-card rounded-2xl p-6 border border-brand-gold/40 bg-brand-gold/[0.04] backdrop-blur-xl">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-2">
                            <Sparkles size={14} />
                            <span>Executive Summary & Key Takeaways</span>
                          </h4>
                          <ul className="space-y-2.5">
                            {currentPost.keyTakeaways.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text/85 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Main Article Sections with Crystal-Clear Readability */}
                        <div className="space-y-8 text-sm sm:text-base text-brand-text/85 leading-relaxed font-light">
                          {currentPost.sections.map((sec, idx) => (
                            <div key={idx} className="space-y-3">
                              <h3 className="text-lg sm:text-xl font-semibold text-brand-text tracking-tight">
                                {sec.heading}
                              </h3>
                              <p className="text-brand-text/75 leading-relaxed">
                                {sec.content}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Field Checklist */}
                        <div className="glass-card rounded-2xl p-6 border border-white/15">
                          <h4 className="text-sm font-semibold text-brand-text mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                            <CheckCircle2 size={15} className="text-emerald-400" />
                            <span>Recommended Project Action Checklist</span>
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {currentPost.checklist.map((item, i) => (
                              <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-brand-text/80 flex items-start gap-2">
                                <span className="text-brand-gold font-mono font-bold">0{i+1}.</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Article Footer & Consultation CTA */}
                        <div className="p-6 rounded-2xl bg-white/[0.04] border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-brand-text">Need tailored coordination consulting for your project?</h4>
                            <p className="text-xs text-brand-text/60 mt-1">Our lead directors review architectural sets and establish customized BIM sync workflows.</p>
                          </div>
                          <button
                            onClick={() => onSelectModal('consultation')}
                            className="bg-brand-gold hover:bg-brand-gold-hover text-brand-bg px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer shadow-lg"
                          >
                            Book Consultation
                          </button>
                        </div>
                      </motion.div>
                    );
                  })()
                ) : (
                  /* Blog List View */
                  <div>
                    <div className="mb-8">
                      <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Industry Insights</span>
                      <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                        Construction Coordination Intelligence
                      </h2>
                      <p className="text-brand-text/65 mt-2 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
                        Practical methodologies, BIM clash analyses, legal escrow models, and operational field guides written by seasoned commercial project directors.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          id: 'cost-control-rework',
                          tag: 'Cost Control & BIM',
                          title: 'How Cloud Blueprint Versioning Eliminates $400k Rework Cycles',
                          date: 'August 2026 • 5 min read',
                          snippet: 'Analyzing the top three causes of site discrepancies between structural steel framing and MEP conduits, and how delta-syncing prevents them.'
                        },
                        {
                          id: 'subcontractor-sync-guide',
                          tag: 'Trade Coordination',
                          title: 'The Modern General Contractor’s Guide to Subcontractor Sync',
                          date: 'July 2026 • 7 min read',
                          snippet: 'Transitioning trade crews from fragmented SMS threads and WhatsApp groups to synchronized, geofenced job site logs.'
                        },
                        {
                          id: 'milestone-progress-billing',
                          tag: 'Legal & Escrow',
                          title: 'Milestone Progress Billing: Mitigating Lien Risks in Commercial Builds',
                          date: 'June 2026 • 4 min read',
                          snippet: 'Why escrow-backed verification and automated partial lien waivers safeguard both property developers and specialty trade contractors.'
                        }
                      ].map((post) => (
                        <motion.div 
                          key={post.id} 
                          whileHover={{ y: -4 }}
                          onClick={() => setSelectedArticleId(post.id)}
                          className="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-gold/40 flex flex-col justify-between cursor-pointer group transition-all shadow-lg"
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full inline-block border border-brand-gold/20">
                              {post.tag}
                            </span>
                            <h3 className="text-base font-semibold text-brand-text mt-3.5 mb-2 leading-snug group-hover:text-brand-gold transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-xs text-brand-text/65 leading-relaxed font-light">
                              {post.snippet}
                            </p>
                          </div>
                          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-brand-text/50">
                            <span>{post.date}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArticleId(post.id);
                              }}
                              className="text-brand-gold font-semibold flex items-center gap-1 cursor-pointer group-hover:translate-x-1 transition-transform"
                            >
                              <span>Read Article</span>
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. CONTACT */}
            {activeModal === 'contact' && (
              <div>
                <div className="mb-8">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Direct Contact</span>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-text mt-1">
                    Connect With BuildSync
                  </h2>
                  <p className="text-brand-text/60 mt-2 text-base leading-relaxed max-w-2xl">
                    For all consultation inquiries, platform partnerships, and project onboarding, email our direct contact address below.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info Card */}
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-brand-gold/30 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <HardHat size={96} className="text-brand-gold" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold block mb-2">
                        Official Direct Channel
                      </span>
                      <div className="flex items-center gap-3 text-lg font-mono text-brand-gold font-bold break-all">
                        <Mail className="text-brand-gold flex-shrink-0" size={24} />
                        <a href="mailto:johnharrissimons@gmail.com" className="hover:underline">
                          johnharrissimons@gmail.com
                        </a>
                      </div>
                      <p className="text-xs text-brand-text/60 mt-3 leading-relaxed">
                        Inquiries are monitored continuously with a typical response window of under 4 business hours.
                      </p>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                      <h3 className="text-sm font-semibold text-brand-text uppercase tracking-wider">
                        Suggested Headquarters Location
                      </h3>
                      <div className="flex items-start gap-3 text-xs text-brand-text/70">
                        <MapPin className="text-brand-gold flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <strong className="text-brand-text text-sm block mb-1">
                            BuildSync Coordination Center
                          </strong>
                          100 Congress Avenue, Suite 2000<br />
                          Austin, Texas 78701, United States<br />
                          <span className="text-[11px] text-brand-text/50 mt-1 block">
                            (Located in the heart of Austin’s high-growth construction & innovation corridor)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Message Form */}
                  <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15">
                    <h3 className="text-base font-semibold text-brand-text mb-4">Send a Direct Message</h3>
                    {submittedMessage && (
                      <div className="p-3.5 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs flex items-center gap-2 mb-4">
                        <CheckCircle2 size={16} />
                        <span>{submittedMessage}</span>
                      </div>
                    )}
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your Name"
                          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">Your Email *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="your.email@company.com"
                          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">Subject</label>
                        <input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Project Inquiry / Consultation"
                          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wider mb-1.5">Message *</label>
                        <textarea
                          required
                          rows={3}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="How can BuildSync assist with your build?"
                          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-brand-gold via-[#d4b374] to-brand-gold hover:from-brand-gold-hover hover:to-brand-gold text-brand-bg py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,160,89,0.35)] cursor-pointer active:scale-95 border border-white/20"
                      >
                        <span>Send to johnharrissimons@gmail.com</span>
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 8. TERMS OF SERVICE */}
            {activeModal === 'terms' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Legal Agreement</span>
                  <h2 className="text-3xl font-light text-brand-text mt-1">Terms of Service</h2>
                  <p className="text-xs text-brand-text/50 mt-1">Effective Date: August 17, 2026 • BuildSync Inc.</p>
                </div>

                <div className="space-y-4 text-xs text-brand-text/70 leading-relaxed max-w-4xl">
                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">1. Acceptance of Terms</h3>
                    <p>
                      By accessing or utilizing the BuildSync digital platform, consultation services, and project coordination frameworks, you agree to be legally bound by these Terms of Service. If you are entering into this agreement on behalf of a general contractor, architectural entity, or property development firm, you warrant that you hold authorized legal capacity to bind that organization.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">2. Platform Role & Advisory Scope</h3>
                    <p>
                      BuildSync operates as an advanced coordination, milestone tracking, and consultation matchmaking platform. While BuildSync facilitates structural assessments, feasibility estimations, and communications between licensed professionals, BuildSync does not replace the mandatory legal authority of the Architect of Record, Engineer of Record, or licensed municipal building inspector.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">3. Intellectual Property of Architectural Data</h3>
                    <p>
                      Users retain exclusive proprietary ownership of all uploaded CAD schematics, BIM specifications, structural drawings, and project documents. BuildSync receives a non-exclusive, encrypted operational license strictly for rendering, revision tracking, clash detection, and secure transmission among authorized project stakeholders.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">4. Milestone Escrow & Payment Terms</h3>
                    <p>
                      Disbursements authorized via milestone progress billing are released upon documented verification criteria established in the initial project scope. BuildSync is not liable for contractor-subcontractor mechanics liens resulting from external disputes outside platform-validated milestones.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">5. Governing Law & Official Legal Contact</h3>
                    <p>
                      These Terms are governed by and construed in accordance with the laws of the State of Texas. For any formal legal inquiries, contract clarifications, or notices, contact our representative directly at <strong className="text-brand-gold">johnharrissimons@gmail.com</strong>.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* 9. PRIVACY POLICY */}
            {activeModal === 'privacy' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Privacy & Data Governance</span>
                  <h2 className="text-3xl font-light text-brand-text mt-1">Privacy Policy</h2>
                  <p className="text-xs text-brand-text/50 mt-1">Last Updated: August 17, 2026 • BuildSync Inc.</p>
                </div>

                <div className="space-y-4 text-xs text-brand-text/70 leading-relaxed max-w-4xl">
                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">1. Commitment to Confidentiality</h3>
                    <p>
                      BuildSync recognizes the sensitive proprietary nature of architectural schematics, bidding financials, and commercial real estate development plans. We enforce strict end-to-end data encryption and enterprise-tier confidentiality.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">2. Information We Collect</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Account & Contact Data:</strong> Name, professional title, company affiliation, and direct contact details.</li>
                      <li><strong>Project Schematics & Files:</strong> Uploaded CAD, PDF blueprints, BIM files, inspection photographs, and site log notes.</li>
                      <li><strong>Communications:</strong> Message history, RFI threads, change order logs, and consultation records.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">3. Zero Third-Party Monetization</h3>
                    <p>
                      We never sell, rent, or trade your personal information, architectural drawings, or bidding rates to third-party advertisers, data brokers, or competitor developers.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">4. Data Security Standards</h3>
                    <p>
                      All data at rest is secured via AES-256 encryption, and data in transit utilizes TLS 1.3 cryptographic protocols with role-based access control (RBAC).
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-text">5. Data Inquiries & Privacy Officer</h3>
                    <p>
                      To request data export, deletion, or privacy auditing, please email our designated privacy contact at <strong className="text-brand-gold">johnharrissimons@gmail.com</strong>.
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Quick Links Navigation in Modal */}
          <div className="px-6 py-3.5 bg-[#0d1015] border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-brand-text/50">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-brand-gold font-semibold">Quick Links:</span>
              <button onClick={() => onSelectModal('how-it-works')} className="hover:text-brand-gold transition-colors cursor-pointer">How it Works</button>
              <span>•</span>
              <button onClick={() => onSelectModal('features')} className="hover:text-brand-gold transition-colors cursor-pointer">Features</button>
              <span>•</span>
              <button onClick={() => onSelectModal('consultation')} className="hover:text-brand-gold transition-colors cursor-pointer">Consultation</button>
              <span>•</span>
              <button onClick={() => onSelectModal('contact')} className="hover:text-brand-gold transition-colors cursor-pointer">Contact</button>
              <span>•</span>
              <button onClick={() => onSelectModal('terms')} className="hover:text-brand-gold transition-colors cursor-pointer">Terms</button>
              <span>•</span>
              <button onClick={() => onSelectModal('privacy')} className="hover:text-brand-gold transition-colors cursor-pointer">Privacy</button>
            </div>
            <div className="text-[11px] text-brand-text/40 hidden md:block font-mono">
              BuildSync • johnharrissimons@gmail.com
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
