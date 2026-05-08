'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Cloud, Cpu, Building2 } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      icon: Cloud,
      title: 'Building Multi-Tenant SaaS Platforms',
      excerpt: 'Learn the architectural patterns for scalable SaaS applications.',
      category: 'SaaS Architecture',
    },
    {
      icon: Cpu,
      title: 'AI Agents in Enterprise Environments',
      excerpt: 'How intelligent automation is transforming business operations.',
      category: 'AI & Automation',
    },
    {
      icon: Building2,
      title: 'Enterprise Software Modernization',
      excerpt: 'Strategies for migrating legacy systems to modern architectures.',
      category: 'Enterprise',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black tracking-widest uppercase">Registry: Home</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase mb-6">Knowledge Base</h2>
            <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
              Insights on <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">SaaS & AI Architecture</span>
            </h1>
            <div className="mt-12 space-y-6 max-w-3xl">
              <p className="text-xl font-light leading-relaxed text-white/80 tracking-wide border-l-2 border-emerald-500/30 pl-8 italic">
                "Exploring modern SaaS architecture, AI-driven automation, enterprise software engineering, and startup product strategies."
              </p>
              <p className="text-lg font-light leading-relaxed text-white/80">
                Learn how intelligent systems are transforming industries — and how your organization can lead the change.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-24">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-display text-4xl font-black tracking-tighter text-white uppercase italic">
              Featured <span className="text-emerald-400">Transmissions</span>
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {posts.map((post) => (
              <div key={post.title} className="uiverse-parent group">
                <div 
                  className="uiverse-card"
                  style={{ '--card-gradient': 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%)' } as any}
                >
                  <div className="uiverse-glass" />
                  
                  <div className="uiverse-logo">
                    <span className="uiverse-circle uiverse-circle1"></span>
                    <span className="uiverse-circle uiverse-circle2"></span>
                    <span className="uiverse-circle uiverse-circle3"></span>
                    <span className="uiverse-circle uiverse-circle4"></span>
                    <span className="uiverse-circle uiverse-circle5">
                      <post.icon className="w-5 h-5 text-white" />
                    </span>
                  </div>

                  <div className="uiverse-content">
                    <div className="absolute top-0 right-0 p-6">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    
                    <span className="text-[8px] font-black text-white/70 uppercase tracking-[0.2em]">{post.category}</span>
                    <span className="title group-hover:text-emerald-400 transition-colors duration-300 uppercase italic mt-2">{post.title}</span>
                    
                    <p className="text italic mt-4 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-[8px] font-black text-emerald-400 tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-all">
                      Read Protocol <BookOpen className="ml-2 h-2.5 w-2.5" />
                    </div>
                  </div>

                  <div className="uiverse-bottom">
                    {/* Optional footer content */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
