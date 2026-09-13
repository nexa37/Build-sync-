import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { HardHat, FileSpreadsheet, ShieldCheck, Ruler, Layers } from 'lucide-react';

export default function WhatIsBuildSync() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const imageY = useTransform(smoothProgress, [0, 1], ['-10%', '10%']);
  const overlayCardY = useTransform(smoothProgress, [0, 1], ['15%', '-15%']);

  return (
    <section id="about" ref={containerRef} className="py-28 bg-transparent border-t border-white/5 relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none arch-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & Core Platform Pillars (7 cols on lg) */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full glass-gold-pill text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers size={14} />
              <span>The Platform Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-text mb-6 leading-[1.12]">
              The Single Source of Truth for <span className="text-brand-gold italic">Modern Construction.</span>
            </h2>

            <div className="space-y-5 text-brand-text/70 text-base sm:text-lg leading-relaxed font-light">
              <p>
                BuildSync is engineered to resolve the most expensive failure point in 
                construction: <strong className="text-brand-text font-medium">miscommunication between stakeholders</strong>. We replace fragmented email threads, conflicting CAD versions, and lost change orders with a synchronized workspace.
              </p>
              <p>
                From groundbreaking soil tests to final occupancy sign-offs, every blueprint revision, permit approval, and subcontractor schedule is tracked in real-time.
              </p>
            </div>
            
            {/* Value Pillars with frosted glass styling */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -3 }}
                className="glass-card glass-card-hover p-4 rounded-2xl flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 border border-brand-gold/30">
                  <HardHat size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-text">Field & Office Sync</h4>
                  <p className="text-xs text-brand-text/60 mt-0.5 font-light">Instant mobile blueprint markups on site</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="glass-card glass-card-hover p-4 rounded-2xl flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold flex-shrink-0 border border-white/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-text">Zoning & Code Safe</h4>
                  <p className="text-xs text-brand-text/60 mt-0.5 font-light">Automated compliance checklist audit</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Right: Card with Dedicated Companion Readables (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Visual Viewport Card */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <motion.img 
                style={{ y: imageY, scale: 1.08 }}
                src="/IMG_8FA160DA.jpg" 
                alt="Engineers reviewing structural drawings" 
                className="object-cover w-full h-full transform-gpu"
                fetchPriority="high"
                onError={(e) => {
                  e.currentTarget.src = "https://res.cloudinary.com/nmizpaiu/image/upload/v1787138609/IMG_8FA160DA-E619-46EA-B023-96A0FA899BC0.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/95 via-black/20 to-transparent" />
              
              {/* Technical CAD HUD overlay lines */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-brand-gold bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-gold/40 shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span>ELEVATION // +142.50 FT AGL</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                <span className="font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  Model: IFC_BIM_REV_4.2
                </span>
                <span className="font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-500/30">
                  100% Synced
                </span>
              </div>
            </div>
            
            {/* Structured Readable Information Cards Beside/Underneath - Cleanly Rendered on Laptop & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="glass-card rounded-2xl p-4 sm:p-5 border border-brand-gold/30 backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-gold font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Blueprint</span>
                  </span>
                  <span className="text-[10px] font-mono text-brand-text/50">v4.8.1</span>
                </div>
                <div className="text-sm font-semibold text-brand-text mb-1">
                  Phase 3: Structural Steel Core
                </div>
                <div className="text-xs text-brand-text/65 font-light leading-relaxed">
                  12 RFIs resolved this week • 0 critical blockers pending on site
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-text/80 font-bold flex items-center gap-1.5">
                    <Ruler size={13} className="text-brand-gold" />
                    <span>Clash Detection</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">0 Clashes</span>
                </div>
                <div className="text-sm font-semibold text-brand-text mb-1">
                  MEP & HVAC Duct Clearance
                </div>
                <div className="text-xs text-brand-text/65 font-light leading-relaxed">
                  3D spatial geometry verified across all 14 active trade models
                </div>
              </div>
            </div>

            {/* Subtle glow sphere */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-gold/15 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}

