import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, CalendarCheck, Mail, CheckCircle2, Award, Clock } from 'lucide-react';
import { ModalKey } from '../types';

interface ConsultationProps {
  onOpenModal: (key: ModalKey) => void;
}

export default function Consultation({ onOpenModal }: ConsultationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const photoY = useTransform(smoothProgress, [0, 1], ['-6%', '6%']);
  const floatingBadgeY = useTransform(smoothProgress, [0, 1], ['12%', '-12%']);

  return (
    <section id="consultation" ref={sectionRef} className="py-28 bg-transparent text-brand-text relative overflow-hidden border-t border-white/5">
      {/* Architectural background lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none arch-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl border border-white/15">
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 glass-gold-pill text-brand-gold px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
              <CalendarCheck size={15} />
              <span>Direct Expert Guidance & Feasibility</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-[1.12]">
              Construction Consultation <br/>
              <span className="text-brand-gold italic gold-glow font-normal">Tailored to Your Blueprint</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-text/65 mb-8 max-w-xl leading-relaxed font-light">
              Every successful build starts with proactive diligence. Request a one-on-one feasibility consultation with our network of senior construction managers and structural advisors before committing capital.
            </p>
            
            <ul className="space-y-3.5 mb-10">
              {[
                'Site feasibility, civil zoning, & permitting compliance review',
                'Milestone budget variance modeling and subcontractor bidding sanity checks',
                'General contractor vetting, milestone escrow scheduling, & contract audits'
              ].map((item, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-3 text-brand-text/75 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-gold/30">
                    <CheckCircle2 size={13} className="text-brand-gold" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button 
                onClick={() => onOpenModal('consultation')}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-gold via-[#d4b374] to-brand-gold hover:from-brand-gold-hover hover:to-brand-gold text-brand-bg px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-[0_4px_24px_rgba(197,160,89,0.35)] hover:shadow-[0_4px_30px_rgba(197,160,89,0.5)] active:scale-95 inline-flex items-center justify-center gap-2 group cursor-pointer border border-white/30"
              >
                <span>Book a Consultation</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onOpenModal('contact')}
                className="text-xs text-brand-text/60 hover:text-brand-gold flex items-center gap-1.5 py-2 px-3 rounded-full hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
              >
                <Mail size={14} className="text-brand-gold" />
                <span>johnharrissimons@gmail.com</span>
              </button>
            </div>
          </div>

          {/* Right Image with Parallax Framer */}
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
              <motion.img 
                style={{ y: photoY, scale: 1.06 }}
                src="/IMG_8472.jpg" 
                alt="Architects discussing plans over a table" 
                className="object-cover w-full h-full opacity-90 transition-all duration-700 hover:scale-105 transform-gpu"
                fetchPriority="high"
                onError={(e) => {
                  // Fallback if local image fails
                  e.currentTarget.src = "https://res.cloudinary.com/nmizpaiu/image/upload/v1787136791/IMG_8472.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-brand-gold/20 rounded-3xl m-3 pointer-events-none" />
            </div>

            {/* Floating Trust Pill with Scroll Offset */}
            <motion.div 
              style={{ y: floatingBadgeY }}
              className="absolute -bottom-6 -right-2 sm:-right-6 glass-card p-4 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-text">45-Min Advisory Session</div>
                <div className="text-[10px] text-brand-text/50">Direct with Senior Project Director</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

