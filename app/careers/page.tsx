'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { databases, ID } from '@/lib/appwrite';
import { CircleCheck, Loader2, AlertCircle } from 'lucide-react';

export default function Careers() {
  const { user, loginWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    university: '',
    roll_number: '',
    branch: '',
    age: '',
    email: '',
    linkedin: '',
    github: '',
    primary_skill: '',
    tech_stack: [] as string[],
    experience_level: '',
    why_join: '',
    ambition: '',
    contribution: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, tech_stack: options }));
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
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        ID.unique(),
        {
          ...formData,
          age: parseInt(formData.age, 10),
          status: 'pending',
          user_id: user.$id,
          created_at: new Date().toISOString(),
        }
      );
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
                <label htmlFor="name" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Full Name <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Email Address <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="age" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Age <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    required
                    min="16"
                    max="100"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="university" className="block text-xs font-medium text-black uppercase tracking-widest">
                  University <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="university"
                    id="university"
                    required
                    value={formData.university}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="roll_number" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Roll Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="roll_number"
                    id="roll_number"
                    value={formData.roll_number}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="branch" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Branch / Major
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="branch"
                    id="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="linkedin" className="block text-xs font-medium text-black uppercase tracking-widest">
                  LinkedIn Profile URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="linkedin"
                    id="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors placeholder:text-black/20"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="github" className="block text-xs font-medium text-black uppercase tracking-widest">
                  GitHub Profile URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="github"
                    id="github"
                    placeholder="https://github.com/..."
                    value={formData.github}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors placeholder:text-black/20"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="primary_skill" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Primary Skill <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="primary_skill"
                    name="primary_skill"
                    required
                    value={formData.primary_skill}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  >
                    <option value="" disabled>Select a skill</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Machine Learning / AI">Machine Learning / AI</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Sales / Marketing">Sales / Marketing</option>
                    <option value="Product Management">Product Management</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="experience_level" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Experience Level <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="experience_level"
                    name="experience_level"
                    required
                    value={formData.experience_level}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors"
                  >
                    <option value="" disabled>Select level</option>
                    <option value="Beginner (0-1 years)">Beginner (0-1 years)</option>
                    <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
                    <option value="Advanced (3+ years)">Advanced (3+ years)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="tech_stack" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Tech Stack <span className="text-black/40 lowercase normal-case">(Hold Ctrl/Cmd to select multiple)</span>
                </label>
                <div className="mt-4">
                  <select
                    id="tech_stack"
                    name="tech_stack"
                    multiple
                    value={formData.tech_stack}
                    onChange={handleTechStackChange}
                    className="block w-full border border-black/10 bg-black/5 py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-3 h-48 transition-colors"
                  >
                    <option value="React">React</option>
                    <option value="Next.js">Next.js</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Tailwind CSS">Tailwind CSS</option>
                    <option value="Appwrite">Appwrite</option>
                    <option value="Firebase">Firebase</option>
                    <option value="AWS">AWS</option>
                    <option value="Figma">Figma</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="why_join" className="block text-xs font-medium text-black uppercase tracking-widest">
                  Why do you want to join us? <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="why_join"
                    name="why_join"
                    rows={3}
                    required
                    value={formData.why_join}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ambition" className="block text-xs font-medium text-black uppercase tracking-widest">
                  What is your ambition? <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="ambition"
                    name="ambition"
                    rows={3}
                    required
                    value={formData.ambition}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contribution" className="block text-xs font-medium text-black uppercase tracking-widest">
                  How can you contribute to our startup? <span className="text-black/40">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="contribution"
                    name="contribution"
                    rows={3}
                    required
                    value={formData.contribution}
                    onChange={handleInputChange}
                    className="block w-full border-0 border-b border-black/20 bg-transparent py-3 text-black focus:border-black focus:ring-0 sm:text-base font-light px-0 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center bg-black px-10 py-4 text-sm font-medium text-white transition-transform hover:scale-105 uppercase tracking-widest disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-4 w-4 animate-spin" />
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
