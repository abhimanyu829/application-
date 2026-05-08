'use client';

import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-purple-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl lg:text-center mb-24"
        >
          <h2 className="text-xs font-black tracking-[0.3em] text-white/80 uppercase mb-6">Genesis Protocol</h2>
          <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400">Digital Empires</span>
          </h1>
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-xl font-light leading-relaxed text-white/90 italic border-l-2 border-purple-500/30 pl-6">
                  We are a technology-driven startup focused on building scalable SaaS platforms, AI-powered automation systems, and enterprise-grade digital solutions.
                </p>
                <p className="text-lg font-light leading-relaxed text-white/80">
                  Founded with a vision to engineer high-performance software ecosystems, our team combines structured architecture, modern cloud infrastructure, and intelligent automation.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg font-light leading-relaxed text-white/80">
                  We specialize in SaaS product development, AI agents, enterprise software systems, and rapid MVP development for startups and growing businesses.
                </p>
                <p className="text-lg font-light leading-relaxed text-white/80">
                  Our approach is rooted in clean code principles, modular backend architecture, and scalable cloud deployment strategies.
                </p>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="text-xl font-light leading-relaxed text-white/80 text-center">
                We believe innovation is about solving operational challenges with <span className="text-white font-medium">precision</span>, <span className="text-white font-medium">efficiency</span>, and <span className="text-white font-medium">long-term sustainability</span>.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="uiverse-content !p-10">
                  <h2 className="text-[10px] font-black tracking-[0.3em] text-white/70 uppercase mb-4 group-hover:text-purple-400 transition-colors">Our Mission:</h2>
                  <p className="text-xl font-light leading-relaxed text-white/90 italic">
                    To build intelligent, secure, and scalable software solutions that empower modern organizations.
                  </p>
                </div>
              </div>
            </div>

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
                  <h2 className="text-[10px] font-black tracking-[0.3em] text-white/70 uppercase mb-4 group-hover:text-emerald-400 transition-colors">Our Vision:</h2>
                  <p className="text-xl font-light leading-relaxed text-white/90 italic">
                    To become a globally recognized technology partner for SaaS and AI-driven digital transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center pt-12"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />
            <p className="text-2xl font-black text-white tracking-tighter uppercase italic">
              We don&apos;t just build software — we <span className="text-purple-400">architect digital ecosystems</span> for growth.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
