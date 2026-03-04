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
      <div className="bg-yellow-50 py-32 min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-md text-center px-6">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
            <AlertCircle className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter text-black sm:text-5xl">Join Our Team</h2>
          <p className="mt-6 text-lg font-light text-black/60">
            Please log in with your Google account to access the application form.
          </p>
          <div className="mt-10">
            <button
              onClick={loginWithGoogle}
              className="bg-black px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105 uppercase tracking-widest w-full"
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
      <div className="bg-yellow-50 py-32 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-md text-center px-6"
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
            <CircleCheck className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter text-black sm:text-5xl">Application Submitted</h2>
          <p className="mt-6 text-lg font-light text-black/60">
            Thank you for applying to Abhibhi SaaS Solutions. Our team will review your application and get back to you soon.
          </p>
          <div className="mt-10">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-black px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105 uppercase tracking-widest w-full"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <h2 className="text-xs font-medium tracking-widest text-black/40 uppercase mb-4">Careers</h2>
          <p className="font-display text-5xl font-bold tracking-tighter text-black sm:text-7xl leading-[1.1]">
            Join the Abhibhi Team
          </p>
          <p className="mt-8 text-xl font-light leading-relaxed text-black/60">
            We are looking for passionate engineers, designers, and innovators to help us build the future of enterprise software.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-transparent"
        >
          {error && (
            <div className="mb-12 bg-black/5 p-6 border-l-2 border-black">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-black" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-black uppercase tracking-widest">Error</h3>
                  <div className="mt-2 text-sm font-light text-black/80">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="NAME" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Full Name <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="NAME"
                    id="NAME"
                    required
                    value={formData.NAME}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="EMAIL" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Email Address <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="EMAIL"
                    id="EMAIL"
                    required
                    value={formData.EMAIL}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="AGE" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Age <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="AGE"
                    id="AGE"
                    required
                    min="18"
                    max="25"
                    value={formData.AGE}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="UNIVERSITY" className="block text-xs font-medium text-black uppercase tracking-widest">
                  University <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="UNIVERSITY"
                    id="UNIVERSITY"
                    required
                    value={formData.UNIVERSITY}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="ROLL_NUMBER" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Roll Number <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ROLL_NUMBER"
                    id="ROLL_NUMBER"
                    required
                    value={formData.ROLL_NUMBER}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="BRANCH" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Branch / Major <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="BRANCH"
                    id="BRANCH"
                    required
                    value={formData.BRANCH}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="LINKEDIN_ID" className="block text-xs font-medium text-black uppercase tracking-widest">
                  LinkedIn Profile URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="LINKEDIN_ID"
                    id="LINKEDIN_ID"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.LINKEDIN_ID}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors placeholder:text-black/20"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="GITHUB" className="block text-xs font-medium text-black uppercase tracking-widest">
                  GitHub Profile URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="GITHUB"
                    id="GITHUB"
                    placeholder="https://github.com/..."
                    value={formData.GITHUB}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors placeholder:text-black/20"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="PRIMARY_SKILL" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Primary Skill <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="PRIMARY_SKILL"
                    name="PRIMARY_SKILL"
                    required
                    value={formData.PRIMARY_SKILL}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  >
                    <option value="" className="bg-yellow-50">Select your primary skill</option>
                    <option value="Frontend Development" className="bg-yellow-50">Frontend Development</option>
                    <option value="Backend Development" className="bg-yellow-50">Backend Development</option>
                    <option value="Full Stack Development" className="bg-yellow-50">Full Stack Development</option>
                    <option value="Mobile Development" className="bg-yellow-50">Mobile Development</option>
                    <option value="UI/UX Design" className="bg-yellow-50">UI/UX Design</option>
                    <option value="DevOps" className="bg-yellow-50">DevOps</option>
                    <option value="AI/ML" className="bg-yellow-50">AI/ML</option>
                    <option value="Data Science" className="bg-yellow-50">Data Science</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="EXPERIENCE_LEVEL" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Experience Level <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="EXPERIENCE_LEVEL"
                    name="EXPERIENCE_LEVEL"
                    required
                    value={formData.EXPERIENCE_LEVEL}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  >
                    <option value="" className="bg-yellow-50">Select your experience level</option>
                    <option value="Student" className="bg-yellow-50">Student</option>
                    <option value="Fresher (0-1 years)" className="bg-yellow-50">Fresher (0-1 years)</option>
                    <option value="Junior (1-3 years)" className="bg-yellow-50">Junior (1-3 years)</option>
                    <option value="Mid-Level (3-5 years)" className="bg-yellow-50">Mid-Level (3-5 years)</option>
                    <option value="Senior (5+ years)" className="bg-yellow-50">Senior (5+ years)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="TECH_STACK" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Tech Stack (Comma Separated) <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="TECH_STACK"
                    id="TECH_STACK"
                    required
                    placeholder="e.g. React, Node.js, Python, AWS"
                    value={formData.TECH_STACK}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors placeholder:text-black/20"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="WHY_YOU_JOIN" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Why do you want to join us? <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    name="WHY_YOU_JOIN"
                    id="WHY_YOU_JOIN"
                    rows={4}
                    required
                    value={formData.WHY_YOU_JOIN}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="AMBITION" className="block text-xs font-medium text-black uppercase tracking-widest">
                  What is your long-term ambition?
                </label>
                <div className="mt-2">
                  <textarea
                    name="AMBITION"
                    id="AMBITION"
                    rows={3}
                    value={formData.AMBITION}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="CONTRIBUTION" className="block text-xs font-medium text-black uppercase tracking-widest">
                  How can you contribute to our team? <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    name="CONTRIBUTION"
                    id="CONTRIBUTION"
                    rows={4}
                    required
                    value={formData.CONTRIBUTION}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center bg-black px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}