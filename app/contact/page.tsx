'use client';

import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl lg:text-center mb-24"
        >
          <h2 className="text-xs font-black tracking-[0.3em] text-white/80 uppercase mb-6">Contact Control</h2>
          <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
            Manifest the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">Next Horizon</span>
          </h1>
        </motion.div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="uiverse-parent group">
            <div 
              className="uiverse-card" 
              style={{ '--card-gradient': 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)' } as any}
            >
              <div className="uiverse-glass" />
              <div className="uiverse-logo">
                <span className="uiverse-circle uiverse-circle1"></span>
                <span className="uiverse-circle uiverse-circle2"></span>
                <span className="uiverse-circle uiverse-circle3"></span>
                <span className="uiverse-circle uiverse-circle4"></span>
                <span className="uiverse-circle uiverse-circle5">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                </span>
              </div>
              <div className="uiverse-content !p-10">
                <p className="text-xl font-light leading-relaxed text-white/80 tracking-wide italic mb-8">
                  "Whether manifesting a SaaS ecosystem, architecting AI neural pathways, or launching a digital vanguard — the convergence starts here."
                </p>
                <div className="space-y-4">
                  <p className="text-lg font-light leading-relaxed text-white/80">
                    We work with visionaries, architects, and industry leaders to transform abstract concepts into immutable digital reality.
                  </p>
                  <p className="text-lg font-light leading-relaxed text-white/80">
                    Your next breakthrough is a transmission away.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="uiverse-parent group">
            <div 
              className="uiverse-card" 
              style={{ '--card-gradient': 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)' } as any}
            >
              <div className="uiverse-glass" />
              <div className="uiverse-logo">
                <span className="uiverse-circle uiverse-circle1"></span>
                <span className="uiverse-circle uiverse-circle2"></span>
                <span className="uiverse-circle uiverse-circle3"></span>
                <span className="uiverse-circle uiverse-circle4"></span>
                <span className="uiverse-circle uiverse-circle5">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                </span>
              </div>
              <div className="uiverse-content !p-10 space-y-8">
                <div className="group transition-all">
                  <h2 className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-3 group-hover:text-emerald-400 transition-colors">Chief Architect:</h2>
                  <p className="text-2xl font-black text-white tracking-tight uppercase">Abhimanyu Kumar</p>
                </div>

                <div className="group transition-all">
                  <h2 className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-3 group-hover:text-blue-400 transition-colors">Direct Frequency (Mobile):</h2>
                  <p className="text-2xl font-black text-white tracking-tight tabular-nums">+91 91427 98767</p>
                </div>

                <div className="group transition-all">
                  <h2 className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-3 group-hover:text-purple-400 transition-colors">Business Intelligence (Email):</h2>
                  <p className="text-xl font-light text-white/60 hover:text-white transition-colors break-all underline decoration-white/20 underline-offset-8 mb-4">abhibhidevelopers@abhibhidevelopers.online</p>
                  <h2 className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-3 group-hover:text-purple-400 transition-colors">Technical Uplink (Personal):</h2>
                  <p className="text-xl font-light text-white/60 hover:text-white transition-colors break-all underline decoration-white/20 underline-offset-8">abhimanyuk50281@gmail.com</p>
                </div>

                <div className="pt-6 border-t border-white/10 group transition-all">
                  <h2 className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-3 group-hover:text-emerald-400 transition-colors">Web Store Hub:</h2>
                  <p className="text-lg font-light text-white/40 italic">Syncing Protocol Soon...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 text-center"
        >
          <p className="text-lg font-light text-white/40 tracking-widest uppercase mb-4">Transmission Priority: Critical</p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />
          <p className="text-2xl font-black text-white tracking-tighter uppercase italic">
            Your next breakthrough <span className="text-emerald-400">starts here.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
