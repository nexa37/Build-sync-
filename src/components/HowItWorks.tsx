import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FileSearch, Users, TrendingUp, ArrowRight, Check, Sparkles } from 'lucide-react';
import { ModalKey } from '../types';

interface HowItWorksProps {
  onOpenModal: (key: ModalKey) => void;
}

const steps = [
  {
    icon: <FileSearch size={28} className="text-brand-gold" />,
    title: "1. Scope & Plan",
    subtitle: "Architectural Blueprint Ingestion",
    description: "Start with a solid foundation. Upload CAD & BIM sets, define milestone budgets, and establish strict zoning compliance checks.",
    details: ["CAD/PDF OCR parsing", "Scope-of-work generator", "Milestone timeline mapping"]
  },
  {
    icon: <Users size={28} className="text-brand-gold" />,
    title: "2. Sync Stakeholders",
    subtitle: "Contractor & Architect Network",
    description: "Bring the field and office together. Invite general contractors, structural engineers, and investors to collaborate in real-time.",
    details: ["Role-based sub permissions", "Instant RFI messaging", "Verified contractor bidding"]
  },
  {
    icon: <TrendingUp size={28} className="text-brand-gold" />,
    title: "3. Build & Deliver",
    subtitle: "Continuous Milestone Tracking",
    description: "Execute with zero blindspots. Inspect site progress, approve phase draw payments securely, and lock in on-time delivery.",
    details: ["Mobile field logs", "Milestone escrow verification", "Turnover & punchlist signoff"]
  }
];

export default function HowItWorks({ onOpenModal }: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const lineScaleX = useTransform(smoothProgress, [0.1, 0.7], [0, 1]);

  return (
    <section id="how-it-works" ref={containerRef} className="py-28 bg-transparent relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute w-[800px] h-[800px] bg-brand-gold rounded-full blur-[140px] opacity-5 -top-40 -right-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full glass-gold-pill text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={13} />
              <span>Standard Operating Procedure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-text mb-4 leading-[1.15]">
              How BuildSync Works
            </h2>
            <p className="text-base sm:text-lg text-brand-text/65 font-light">
              A battle-tested 3-phase coordination lifecycle taking your construction project from concept to turnover with zero ambiguity.
            </p>
          </div>
        </div>

        {/* Desktop Animated Connector Line */}
        <div className="relative mb-12">
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-white/10 -translate-y-12 -z-0">
            <motion.div 
              style={{ scaleX: lineScaleX }}
              className="h-full bg-gradient-to-r from-brand-gold via-[#e8c887] to-brand-gold origin-left"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => onOpenModal('how-it-works')}
                className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl relative group overflow-hidden cursor-pointer shadow-xl backdrop-blur-2xl"
              >
                {/* Subtle hover golden radiant specular sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white/10 border border-brand-gold/40 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold/25 transition-all duration-400 backdrop-blur-md shadow-inner">
                      {step.icon}
                    </div>
                    <div className="text-3xl font-light text-brand-gold/40 group-hover:text-brand-gold transition-colors font-mono select-none">
                      0{index + 1}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mb-1 font-semibold">
                    {step.subtitle}
                  </div>
                  <h3 className="text-xl font-semibold text-brand-text mb-3">{step.title}</h3>
                  
                  <p className="text-brand-text/65 text-sm leading-relaxed mb-6 font-light">
                    {step.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-brand-text/80">
                        <div className="w-4 h-4 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-brand-gold" />
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-xs text-brand-gold font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                    <span>Explore Phase 0{index + 1} Specs</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Trigger Interactive Breakdown */}
        <div className="text-center mt-8">
          <button
            onClick={() => onOpenModal('how-it-works')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/85 hover:text-brand-gold glass-card hover:border-brand-gold/50 px-7 py-3.5 rounded-full transition-all cursor-pointer shadow-lg backdrop-blur-xl hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]"
          >
            <span>Open Full Interactive Workflow Drawer</span>
            <ArrowRight size={14} className="text-brand-gold" />
          </button>
        </div>

      </div>
    </section>
  );
}

