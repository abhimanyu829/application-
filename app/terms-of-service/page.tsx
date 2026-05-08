'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-purple-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black tracking-widest uppercase">Registry: Home</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 backdrop-blur-2xl p-12 rounded-[3rem] border border-white/10 shadow-2xl shadow-purple-500/10"
          >
            <div className="flex items-center mb-12 border-b border-white/10 pb-8">
              <div className="p-4 bg-purple-500/10 rounded-2xl mr-6 border border-purple-500/20">
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-white/80 uppercase mb-1">Legal Framework</p>
                <h1 className="font-display text-4xl font-black tracking-tighter text-white leading-tight uppercase italic">
                  Terms of <span className="text-purple-400">Service</span>
                </h1>
              </div>
            </div>

            <div className="space-y-10 text-xl font-light leading-relaxed text-white/80 tracking-wide">
              <p className="border-l-2 border-purple-500/30 pl-8 italic">
                "By using our platform, you agree to comply with our service guidelines, usage policies, and operational standards."
              </p>
              
              <div className="space-y-6">
                <p>
                  Users must not misuse the system, compromise security, or violate intellectual property rights. Subscription-based services are governed by <span className="text-white font-medium">defined billing protocols</span> and immutable SLA agreements.
                </p>
                <p>
                  We reserve the right to update services and policies to maintain <span className="text-emerald-400 font-medium">peak performance</span>, absolute security, and architectural reliability.
                </p>
              </div>

              <div className="pt-10 mt-10 border-t border-white/5 flex items-center justify-between">
                <p className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">Last Registry Update: May 2026</p>
                <div className="flex space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse delay-75" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
