'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-blue-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black tracking-widest uppercase">Protocol: Return Home</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 backdrop-blur-2xl p-12 rounded-[3rem] border border-white/10 shadow-2xl shadow-blue-500/10"
          >
            <div className="flex items-center mb-12 border-b border-white/10 pb-8">
              <div className="p-4 bg-blue-500/10 rounded-2xl mr-6 border border-blue-500/20">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-white/80 uppercase mb-1">Data Security Charter</p>
                <h1 className="font-display text-4xl font-black tracking-tighter text-white leading-tight uppercase italic">
                  Privacy <span className="text-blue-400">Policy</span>
                </h1>
              </div>
            </div>

            <div className="space-y-10 text-xl font-light leading-relaxed text-white/80 tracking-wide">
              <p className="border-l-2 border-blue-500/30 pl-8 italic">
                "We are committed to protecting user data and maintaining transparency in how information is collected, stored, and processed."
              </p>
              
              <div className="space-y-6">
                <p>
                  All user data is securely stored and used strictly for operational purposes. We implement <span className="text-white font-medium">military-grade authentication security</span>, encrypted communication channels, and strictly controlled database access protocols.
                </p>
                <p>
                  We do not sell, leak, or misuse user information. Your digital footprint is our responsibility, guarded by the <span className="text-emerald-400 font-medium italic">Aurora Security Shield</span>.
                </p>
              </div>

              <div className="pt-10 mt-10 border-t border-white/5 flex items-center justify-between">
                <p className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">Last Sync: May 2026</p>
                <div className="flex space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse delay-75" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
