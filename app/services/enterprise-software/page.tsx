'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Code2, Server, Database, Shield } from 'lucide-react';

export default function EnterpriseSoftwarePage() {
  const features = [
    {
      icon: Server,
      title: 'Microservices Architecture',
      description: 'Scalable, maintainable systems with independent service deployment.',
    },
    {
      icon: Database,
      title: 'Legacy System Modernization',
      description: 'Transform outdated systems into modern, efficient architectures.',
    },
    {
      icon: Code2,
      title: 'API Development & Integration',
      description: 'RESTful and GraphQL APIs for seamless system connectivity.',
    },
    {
      icon: Shield,
      title: 'High Availability Setup',
      description: '99.9% uptime with redundant infrastructure and failover systems.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-amber-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link 
            href="/services" 
            className="group inline-flex items-center text-[10px] font-black tracking-[0.4em] text-white/80 hover:text-white mb-16 transition-colors uppercase"
          >
            <ArrowLeft className="h-3 w-3 mr-4 group-hover:-translate-x-2 transition-transform" />
            Return to Core Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[10px] font-black tracking-[0.4em] text-amber-400 uppercase mb-6">Vertical Overview</h2>
            <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Architectures</span>
            </h1>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="text-xl font-light leading-relaxed text-white/80 tracking-wide border-l-2 border-amber-500/30 pl-8 italic">
                "We engineer bespoke enterprise systems designed to solve high-complexity business challenges—streamlining core operations through modular high-availability clusters."
              </p>
              <p className="text-lg font-light leading-relaxed text-white/80">
                Gain a decisive competitive edge with software that perfectly synchronizes with your unique organizational logic, built on modernized microservices and immutable data layers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-24">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-display text-3xl font-black tracking-tighter text-white uppercase italic">
              Key <span className="text-amber-400">Capabilities</span>
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="uiverse-parent h-full group">
                <div 
                  className="uiverse-card" 
                  style={{ '--card-gradient': 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)' } as any}
                >
                  <div className="uiverse-glass" />
                  
                  <div className="uiverse-logo">
                    <span className="uiverse-circle uiverse-circle1"></span>
                    <span className="uiverse-circle uiverse-circle2"></span>
                    <span className="uiverse-circle uiverse-circle3"></span>
                    <span className="uiverse-circle uiverse-circle4"></span>
                    <span className="uiverse-circle uiverse-circle5">
                      <feature.icon className="h-6 w-6 text-white" />
                    </span>
                  </div>

                  <div className="uiverse-content !p-10">
                    <span className="title group-hover:text-amber-400 transition-colors duration-300 italic uppercase mb-4 block">
                      {feature.title}
                    </span>
                    <p className="text italic leading-relaxed text-white/80">
                      {feature.description}
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
    </div>
  );
}
