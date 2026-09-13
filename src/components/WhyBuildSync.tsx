import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { CheckCircle2, Shield, BarChart3, Users, Zap, Layers, Sparkles } from 'lucide-react';

const benefits = [
  {
    title: "Unified Project Workspace",
    description: "Consolidate architectural blueprints, engineering revisions, change orders, and municipal permits into one cryptographically verified repository."
  },
  {
    title: "Frictionless Stakeholder Comm",
    description: "Eliminate disjointed email threads and dropped voicemails. Pin questions and RFIs directly to 2D sheets and 3D models."
  },
  {
    title: "Milestone-Linked Escrow Tracking",
    description: "Automate phase completions and release funds with confidence based on verifiable field log validation."
  },
  {
    title: "Automated Regulatory Audit",
    description: "Continuously check plans against localized building codes and safety regulations before ground inspection."
  },
  {
    title: "Prevent Costly Field Rework",
    description: "Early clash detection and transparent sub-trade coordination saves an average of 14% on total project contingency budgets."
  }
];

export default function WhyBuildSync() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const dashboardY = useTransform(smoothProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={containerRef} className="py-28 bg-transparent relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Benefits text list */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full glass-gold-pill text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <Shield size={14} />
              <span>The Competitive Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-text mb-6 leading-[1.12]">
              Why Leading Developers & Contractors <span className="text-brand-gold italic">Choose BuildSync.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-text/65 mb-10 leading-relaxed font-light">
              Construction projects are intricate, high-stakes ecosystems. BuildSync replaces human friction with real-time operational clarity — delivering predictability to budgets, timelines, and craftsmanship.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex gap-4 group"
                >
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-brand-gold/30">
                      <CheckCircle2 className="text-brand-gold" size={15} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-brand-text mb-1 group-hover:text-brand-gold transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-brand-text/55 text-sm leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Simulated Dashboard Mockup with Glassmorphism */}
          <motion.div
            style={{ y: dashboardY }}
            className="lg:col-span-6 relative"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6 backdrop-blur-2xl">
              
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <span className="text-xs font-mono text-brand-text/50 ml-2">PROJECT: ONE_METRO_TOWER_REVISION_D</span>
                </div>
                <span className="text-[11px] font-mono text-brand-gold glass-gold-pill px-3 py-1 rounded-full font-bold">
                  LIVE SYNC
                </span>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-brand-text/80">
                  <span>Milestone 04: Concrete Slab & Core Pouring</span>
                  <span className="font-mono text-brand-gold font-bold">84% COMPLETE</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/15 backdrop-blur-sm">
                  <div 
                    style={{ width: '84%' }}
                    className="h-full bg-gradient-to-r from-brand-gold to-[#e8c887] rounded-full shadow-[0_0_12px_rgba(197,160,89,0.4)]"
                  />
                </div>
              </div>

              {/* Activity Feeds with frosted glass items */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-text/40">Recent Site Telemetry</div>
                
                <div className="p-3.5 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between text-xs hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-brand-text">Civil Inspector Signed Inspection #402</div>
                      <div className="text-brand-text/40 text-[10px] font-mono">Verified via GPS & Timestamp</div>
                    </div>
                  </div>
                  <span className="text-brand-text/40 font-mono text-[10px]">12m ago</span>
                </div>

                <div className="p-3.5 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between text-xs hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold border border-brand-gold/30">
                      CAD
                    </div>
                    <div>
                      <div className="font-semibold text-brand-text">Structural Model v4.8 Released</div>
                      <div className="text-brand-text/40 text-[10px] font-mono">HVAC duct clash resolved in Bay 3</div>
                    </div>
                  </div>
                  <span className="text-brand-text/40 font-mono text-[10px]">1h ago</span>
                </div>
              </div>

              {/* Stakeholder sync cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/15 text-center">
                  <div className="text-2xl font-light text-brand-gold font-mono">14 / 14</div>
                  <div className="text-[11px] text-brand-text/50 mt-1 font-mono">Subs Synchronized</div>
                </div>
                <div className="p-4 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-brand-gold/30 text-center">
                  <div className="text-2xl font-light text-emerald-400 font-mono">0.0 DAYS</div>
                  <div className="text-[11px] text-brand-text/50 mt-1 font-mono">Schedule Drift</div>
                </div>
              </div>

            </div>

            {/* Background ambient lighting */}
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-gold/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

