'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TermsAcceptance() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const accepted = localStorage.getItem('termsAccepted') === 'true';
    const hasCookie = document.cookie.includes('termsAccepted=1');

    if (accepted) {
      if (!hasCookie) {
        // Sync cookie if localStorage has it but cookie is missing
        document.cookie = `termsAccepted=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      }
      
      // Only redirect if we are actually on the terms-gate page to avoid unnecessary navigation
      if (window.location.pathname === '/terms-gate') {
        router.push(redirect);
      }
    }
  }, [router, redirect]);

  const onContinue = () => {
    if (typeof window === 'undefined') return;
    // Persist in localStorage and a short-lived cookie for middleware checks
    localStorage.setItem('termsAccepted', 'true');
    document.cookie = `termsAccepted=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0520] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="max-w-xl w-full relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-12 shadow-2xl">
          <div className="mb-10">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-emerald-400 uppercase mb-4">Verification Layer</h2>
            <h1 className="font-display text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
              Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Gateway</span>
            </h1>
          </div>

          <p className="text-white/80 mb-10 text-sm leading-relaxed font-light tracking-wide italic border-l border-emerald-500/30 pl-6">
            "Access to the Aurora neural network requires acknowledgment of our architectural protocols and privacy synchronization."
          </p>

          <div className="space-y-8 mb-12">
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${checked ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-transparent border-white/20 group-hover:border-white/40'}`}>
                  {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
              </div>
              <span className="ml-4 text-[10px] font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                I acknowledge the <Link href="/terms-of-service" className="text-emerald-400 hover:underline">Terms & Conditions</Link>
              </span>
            </label>
          </div>

          <button
            type="button"
            disabled={!checked}
            onClick={onContinue}
            className="w-full relative group overflow-hidden rounded-xl bg-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
              Initialize Connection
            </span>
          </button>

          <div className="mt-8 flex items-center justify-between opacity-70">
            <span className="text-[8px] font-black uppercase tracking-widest text-white">System: Active</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-white">Encrypted: AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
}

