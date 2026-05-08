'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Code2, Cpu, Globe, LayoutDashboard, Users, Zap } from 'lucide-react';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      <div className="aurora-dashboard-bg opacity-80" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 z-10">

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-6xl font-bold tracking-tighter text-white sm:text-8xl leading-[1.1]">
              Building Scalable SaaS <br className="hidden sm:block" />
              & AI Solutions
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl font-light text-white/60 leading-relaxed">
              We are a team of elite engineers crafting enterprise-grade software, intelligent AI agents, and high-performance web platforms that drive growth.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-8">
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center bg-white px-8 py-4 text-sm font-bold text-[#0a0520] transition-all hover:scale-105 active:scale-95 uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                Book a Demo
              </Link>
              <Link
                href="/careers"
                className="group text-sm font-medium leading-6 text-white flex items-center gap-3 uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Join Our Team <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Services Overview */}
      <section className="py-32 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-xs font-medium tracking-widest text-white/80 uppercase mb-4">Our Expertise</h2>
            <p className="font-display text-4xl font-bold tracking-tighter text-white sm:text-6xl">
              Everything you need to scale
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'SaaS Platforms',
                description: 'Custom CRM, ERP, and management systems built for scale and performance.',
                icon: LayoutDashboard,
                gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              },
              {
                title: 'AI Agents & Automation',
                description: 'Intelligent workflows and AI-driven agents to automate your business processes.',
                icon: Cpu,
                gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              },
              {
                title: 'Enterprise Software',
                description: 'Robust, secure, and scalable custom software tailored to your specific needs.',
                icon: Code2,
                gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              },
            ].map((service) => (
              <div key={service.title} className="uiverse-parent group">
                <div 
                  className="uiverse-card"
                  style={{ '--card-gradient': service.gradient } as any}
                >
                  <div className="uiverse-glass" />
                  
                  <div className="uiverse-logo">
                    <span className="uiverse-circle uiverse-circle1"></span>
                    <span className="uiverse-circle uiverse-circle2"></span>
                    <span className="uiverse-circle uiverse-circle3"></span>
                    <span className="uiverse-circle uiverse-circle4"></span>
                    <span className="uiverse-circle uiverse-circle5">
                      <service.icon className="w-5 h-5 text-white" />
                    </span>
                  </div>

                  <div className="uiverse-content">
                    <span className="title group-hover:text-emerald-400 transition-colors duration-300">{service.title}</span>
                    <p className="text italic mt-6 leading-relaxed">
                      {service.description}
                    </p>
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

      {/* Mission & Vision */}
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-5xl font-bold tracking-tighter text-white sm:text-6xl leading-[1.1]">
                Driven by innovation, built for the future.
              </h2>
              <p className="mt-8 text-xl font-light leading-relaxed text-white/60">
                Our mission is to democratize enterprise-grade technology. We believe that every business, regardless of size, deserves access to powerful, scalable, and intelligent software solutions.
              </p>
              <dl className="mt-12 space-y-10 text-base leading-relaxed text-white/60">
                <div className="relative pl-12">
                  <dt className="inline font-bold text-white">
                    <Zap className="absolute left-0 top-1 h-6 w-6 text-white/20" />
                    Speed to Market.
                  </dt>{' '}
                  <dd className="inline font-light">We deliver MVPs in weeks, not months, allowing you to validate and scale faster.</dd>
                </div>
                <div className="relative pl-12">
                  <dt className="inline font-bold text-white">
                    <Globe className="absolute left-0 top-1 h-6 w-6 text-white/20" />
                    Global Standards.
                  </dt>{' '}
                  <dd className="inline font-light">Built with modern tech stacks ensuring security, reliability, and global scale.</dd>
                </div>
              </dl>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 lg:mt-0 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md aspect-square bg-white/5 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-3xl flex items-center justify-center border border-white/10">
                <img 
                  src="/images/abhibhi-logo.png" 
                  alt="Abhibhi Logo" 
                  className="w-[110%] h-[110%] max-w-none object-contain filter drop-shadow-2xl absolute"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
