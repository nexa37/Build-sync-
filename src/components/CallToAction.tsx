import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Sparkles, CalendarCheck } from 'lucide-react';
import { ModalKey } from '../types';

interface CallToActionProps {
  onOpenModal: (key: ModalKey) => void;
}

export default function CallToAction({ onOpenModal }: CallToActionProps) {
  return (
    <section className="py-28 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div
          className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.8)] border border-brand-gold/35 relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Subtle gold top specular gradient stroke */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full glass-gold-pill text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={13} />
            <span>Accelerate Your Delivery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-text mb-6 leading-[1.12]">
            Ready to Start Planning Your Next <span className="text-brand-gold italic gold-glow">Landmark Project?</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-text/65 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Join the developers, general contractors, and structural engineers who rely on BuildSync 
            to deliver precision, code compliance, and synchronized coordination across every build.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => onOpenModal('get-started')}
              className="w-full sm:w-auto bg-gradient-to-r from-brand-gold via-[#d4b374] to-brand-gold hover:from-brand-gold-hover hover:to-brand-gold text-brand-bg px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-[0_4px_24px_rgba(197,160,89,0.35)] hover:shadow-[0_4px_30px_rgba(197,160,89,0.5)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-white/30"
            >
              <span>Get Started with BuildSync</span>
              <ArrowRight size={16} />
            </button>

            <button 
              onClick={() => onOpenModal('consultation')}
              className="w-full sm:w-auto bg-white/[0.05] hover:bg-white/[0.1] text-brand-text border border-white/20 hover:border-brand-gold/50 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all backdrop-blur-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <CalendarCheck size={15} className="text-brand-gold" />
              <span>Book a Consultation</span>
            </button>
          </div>

          <div className="mt-8 text-xs text-brand-text/50 flex items-center justify-center gap-2">
            <Mail size={13} className="text-brand-gold" />
            <span>Direct inquiries: <a href="mailto:johnharrissimons@gmail.com" className="text-brand-gold hover:underline">johnharrissimons@gmail.com</a></span>
          </div>
        </div>
      </div>
    </section>
  );
}

