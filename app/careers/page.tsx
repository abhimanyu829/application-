'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { CircleCheck, Loader2, AlertCircle } from 'lucide-react';

export default function Careers() {
  const { user, loginWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    NAME: '',
    UNIVERSITY: '',
    ROLL_NUMBER: '',
    BRANCH: '',
    AGE: '',
    EMAIL: '',
    LINKEDIN_ID: '',
    GITHUB: '',
    PRIMARY_SKILL: '',
    TECH_STACK: '',
    EXPERIENCE_LEVEL: '',
    WHY_YOU_JOIN: '',
    AMBITION: '',
    CONTRIBUTION: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit an application.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Map frontend Uppercase fields to backend lowercase fields
      const payload = {
        name: formData.NAME,
        university: formData.UNIVERSITY,
        roll_number: formData.ROLL_NUMBER,
        branch: formData.BRANCH,
        age: parseInt(formData.AGE, 10),
        email: formData.EMAIL,
        linkedin: formData.LINKEDIN_ID,
        github: formData.GITHUB,
        primary_skill: formData.PRIMARY_SKILL,
        tech_stack: formData.TECH_STACK.split(',').map(s => s.trim()).filter(Boolean),
        experience_level: formData.EXPERIENCE_LEVEL,
        why_join: formData.WHY_YOU_JOIN,
        ambition: formData.AMBITION,
        contribution: formData.CONTRIBUTION,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applicants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit application');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0520] relative overflow-hidden flex items-center justify-center">
        <div className="aurora-dashboard-bg opacity-50" />
        <div className="mx-auto max-w-md text-center px-6 relative z-10">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <AlertCircle className="h-10 w-10 text-white/40" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl uppercase italic">Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Team</span></h2>
          <p className="mt-6 text-lg font-light text-white/50 tracking-wide">
            Access the inner sanctum of innovation. Authenticate to proceed.
          </p>
          <div className="mt-10">
            <button
              onClick={loginWithGoogle}
              className="bg-white px-8 py-5 text-xs font-black text-[#0a0520] transition-all hover:scale-105 uppercase tracking-[0.3em] w-full rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0520] relative overflow-hidden flex items-center justify-center">
        <div className="aurora-dashboard-bg opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-md text-center px-6 relative z-10"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
            <CircleCheck className="h-10 w-10 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl uppercase italic">Transmission <span className="text-emerald-400">Received</span></h2>
          <p className="mt-6 text-lg font-light text-white/50 tracking-wide leading-relaxed">
            Your application has been logged into the Abhibhi collective. We will analyze your compatibility soon.
          </p>
          <div className="mt-10">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white/5 border border-white/10 px-8 py-5 text-xs font-black text-white transition-all hover:bg-white hover:text-[#0a0520] uppercase tracking-[0.3em] w-full rounded-2xl"
            >
              Back to Terminal
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-32 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <h2 className="text-xs font-black tracking-[0.3em] text-white/80 uppercase mb-6">Operations</h2>
          <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">Abhibhi Elite</span>
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-white/80 tracking-wide">
            We are looking for elite architects and visionaries to manifest the future of digital ecosystems.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-12 shadow-2xl"
        >
          {error && (
            <div className="mb-12 bg-red-500/10 p-8 rounded-3xl border border-red-500/20 backdrop-blur-xl">
              <div className="flex gap-4 items-center">
                <AlertCircle className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-xs font-black text-red-400 uppercase tracking-widest mb-1">System Error</h3>
                  <p className="text-sm font-light text-red-400/80 italic">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="NAME" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Identity Marker <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="NAME"
                  id="NAME"
                  required
                  placeholder="Full Name"
                  value={formData.NAME}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="EMAIL" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Communication Frequency <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  id="EMAIL"
                  required
                  placeholder="email@example.com"
                  value={formData.EMAIL}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="AGE" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Temporal Age <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="number"
                  name="AGE"
                  id="AGE"
                  required
                  min="18"
                  max="25"
                  value={formData.AGE}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="UNIVERSITY" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Training Ground <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="UNIVERSITY"
                  id="UNIVERSITY"
                  required
                  placeholder="University Name"
                  value={formData.UNIVERSITY}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="ROLL_NUMBER" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  System Index <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="ROLL_NUMBER"
                  id="ROLL_NUMBER"
                  required
                  placeholder="Roll / ID Number"
                  value={formData.ROLL_NUMBER}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="BRANCH" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Specialization Sector <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="BRANCH"
                  id="BRANCH"
                  required
                  placeholder="e.g. Computer Science Engineering"
                  value={formData.BRANCH}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="LINKEDIN_ID" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Social Nexus (LinkedIn)
                </label>
                <input
                  type="url"
                  name="LINKEDIN_ID"
                  id="LINKEDIN_ID"
                  placeholder="https://linkedin.com/..."
                  value={formData.LINKEDIN_ID}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="GITHUB" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Source Protocol (GitHub)
                </label>
                <input
                  type="url"
                  name="GITHUB"
                  id="GITHUB"
                  placeholder="https://github.com/..."
                  value={formData.GITHUB}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="PRIMARY_SKILL" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Dominant Directive <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="PRIMARY_SKILL"
                  name="PRIMARY_SKILL"
                  required
                  value={formData.PRIMARY_SKILL}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light appearance-none"
                >
                  <option value="" className="bg-[#0a0520] text-white/80">Select Discipline</option>
                  <option value="Frontend Development" className="bg-[#0a0520]">Frontend Development</option>
                  <option value="Backend Development" className="bg-[#0a0520]">Backend Development</option>
                  <option value="Full Stack Development" className="bg-[#0a0520]">Full Stack Development</option>
                  <option value="Mobile Development" className="bg-[#0a0520]">Mobile Development</option>
                  <option value="UI/UX Design" className="bg-[#0a0520]">UI/UX Design</option>
                  <option value="DevOps" className="bg-[#0a0520]">DevOps</option>
                  <option value="AI/ML" className="bg-[#0a0520]">AI/ML</option>
                  <option value="Data Science" className="bg-[#0a0520]">Data Science</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="EXPERIENCE_LEVEL" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Expertise Tier <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="EXPERIENCE_LEVEL"
                  name="EXPERIENCE_LEVEL"
                  required
                  value={formData.EXPERIENCE_LEVEL}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light appearance-none"
                >
                  <option value="" className="bg-[#0a0520] text-white/80">Select Tier</option>
                  <option value="Student" className="bg-[#0a0520]">Student</option>
                  <option value="Fresher (0-1 years)" className="bg-[#0a0520]">Fresher (0-1 years)</option>
                  <option value="Junior (1-3 years)" className="bg-[#0a0520]">Junior (1-3 years)</option>
                  <option value="Mid-Level (3-5 years)" className="bg-[#0a0520]">Mid-Level (3-5 years)</option>
                  <option value="Senior (5+ years)" className="bg-[#0a0520]">Senior (5+ years)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="TECH_STACK" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Arsenal (Comma Separated) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="TECH_STACK"
                  id="TECH_STACK"
                  required
                  placeholder="e.g. Next.js, FastAPI, PostgreSQL, Kubernetes"
                  value={formData.TECH_STACK}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="WHY_YOU_JOIN" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Core Motivation <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  name="WHY_YOU_JOIN"
                  id="WHY_YOU_JOIN"
                  rows={4}
                  required
                  placeholder="What drives your ambition to join Abhibhi?"
                  value={formData.WHY_YOU_JOIN}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="AMBITION" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Future Singularity (Long-term Ambition)
                </label>
                <textarea
                  name="AMBITION"
                  id="AMBITION"
                  rows={3}
                  placeholder="Where do you see your legacy in 5 years?"
                  value={formData.AMBITION}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="CONTRIBUTION" className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-3">
                  Net Contribution <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  name="CONTRIBUTION"
                  id="CONTRIBUTION"
                  rows={4}
                  required
                  placeholder="How will your presence amplify our collective impact?"
                  value={formData.CONTRIBUTION}
                  onChange={handleInputChange}
                  className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light resize-none"
                />
              </div>
            </div>

            <div className="mt-16 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white px-12 py-5 text-xs font-black uppercase tracking-[0.3em] text-[#0a0520] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  'Initialize Application'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}