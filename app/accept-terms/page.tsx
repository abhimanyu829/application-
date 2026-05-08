'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { acceptTermsAndPrivacy } from '@/lib/termsService';

export default function AcceptTermsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in — must be in useEffect to avoid calling router during render
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsChecked || !privacyChecked) {
      setError('You must accept both Terms of Service and Privacy Policy to continue.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const success = await acceptTermsAndPrivacy(user!._id);
      if (success) {
        // Redirect to dashboard or home
        router.push('/');
      } else {
        setError('Failed to save your acceptance. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || (!loading && !user)) {
    return (
      <div className="min-h-screen bg-[#0a0520] flex items-center justify-center relative overflow-hidden">
        <div className="aurora-dashboard-bg opacity-50" />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-white/80 font-black tracking-widest uppercase text-[10px]">Syncing Authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="py-32 relative z-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase mb-4">Compliance Protocol</h2>
            <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-6xl leading-[1.1] uppercase italic">
              Accept Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Policies</span>
            </h1>
            <p className="mt-8 text-xl font-light leading-relaxed text-white/80 tracking-wide border-l-2 border-emerald-500/30 pl-8 italic">
              "To continue using the Aurora platform, please review and authorize our Terms of Service and Privacy Policy."
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-12 shadow-2xl">
            {/* Terms Summary */}
            <div className="mb-12 pb-12 border-b border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="font-display text-2xl font-black text-white uppercase italic tracking-tight">
                  Terms of Service
                </h2>
              </div>
              <div className="text-white/80 space-y-4 text-sm leading-relaxed max-h-64 overflow-y-auto pr-4 custom-scrollbar font-light">
                <p>
                  By accepting these Terms of Service, you agree to comply with all applicable laws and regulations. You agree to use our platform responsibly and not to engage in any activities that could harm the platform or other users.
                </p>
                <p>
                  Our services are provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages. Your use of our platform is at your own risk.
                </p>
                <p>
                  You retain all rights to any content you submit. By submitting content, you grant us a license to use it for the purpose of providing our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of our platform constitutes acceptance of updated terms.
                </p>
              </div>
              <Link 
                href="/terms-of-service" 
                className="inline-block mt-6 text-[10px] font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-[0.2em]"
              >
                Access Full Terms Registry →
              </Link>
            </div>

            {/* Privacy Summary */}
            <div className="mb-12 pb-12 border-b border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <h2 className="font-display text-2xl font-black text-white uppercase italic tracking-tight">
                  Privacy Policy
                </h2>
              </div>
              <div className="text-white/80 space-y-4 text-sm leading-relaxed max-h-64 overflow-y-auto pr-4 custom-scrollbar font-light">
                <p>
                  We collect information to provide and improve our services. Your personal data is handled with care and security.
                </p>
                <p>
                  We may collect: your name, email, usage data, and browser information. This data helps us understand how you use our platform and improve our services.
                </p>
                <p>
                  Your data will not be sold to third parties without explicit consent. We may share data with service providers who help us operate our platform under strict confidentiality agreements.
                </p>
                <p>
                  You have the right to access, modify, or delete your personal data. Contact us to exercise these rights.
                </p>
              </div>
              <Link 
                href="/privacy-policy" 
                className="inline-block mt-6 text-[10px] font-black text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-[0.2em]"
              >
                Access Full Privacy Charter →
              </Link>
            </div>

            {/* Checkboxes */}
            <div className="space-y-6 mb-12">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${termsChecked ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-white/20 group-hover:border-white/40'}`}>
                    {termsChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </div>
                </div>
                <span className="ml-4 text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">
                  Authorize <span className="text-emerald-400">Terms of Service</span>
                </span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={privacyChecked}
                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${privacyChecked ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-white/20 group-hover:border-white/40'}`}>
                    {privacyChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </div>
                </div>
                <span className="ml-4 text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">
                  Authorize <span className="text-blue-400">Privacy Policy</span>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !termsChecked || !privacyChecked}
              className="w-full relative group overflow-hidden rounded-2xl bg-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                {submitting ? 'Authenticating...' : 'Confirm Acceptance'}
                {!submitting && <ArrowRight className="h-3 w-3" />}
              </span>
            </button>

            <div className="mt-8 flex items-center justify-between">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                Protocol v1.0
              </p>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                Last Registry Update: March 2026
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
