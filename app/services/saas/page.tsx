'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, Users, Zap, Shield, BarChart } from 'lucide-react';

export default function SaasPage() {
  const features = [
    {
      icon: Users,
      title: 'Multi-tenant Architecture',
      description: 'Securely serve multiple customers from a single application instance.',
    },
    {
      icon: Shield,
      title: 'Role-based Access Control',
      description: 'Granular permissions and user management for enterprise security.',
    },
    {
      icon: Zap,
      title: 'Subscription Billing Integration',
      description: 'Seamless payment processing with Stripe, PayPal, and custom billing.',
    },
    {
      icon: BarChart,
      title: 'Real-time Analytics Dashboard',
      description: 'Track usage, revenue, and user engagement with live data.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30">
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
            <h2 className="text-[10px] font-black tracking-[0.4em] text-emerald-400 uppercase mb-6">Vertical Overview</h2>
            <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
              SaaS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Platforms</span>
            </h1>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="text-xl font-light leading-relaxed text-white/80 tracking-wide border-l-2 border-emerald-500/30 pl-8 italic">
                "We engineer robust, scalable, and secure SaaS ecosystems tailored to the unique demands of your industry—from School Management to global ERP protocols."
              </p>
              <p className="text-lg font-light leading-relaxed text-white/80">
                By implementing modern microservices architecture and high-availability protocols, we reduce operational overhead while maximizing business agility and performance metrics.
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
              Key <span className="text-emerald-400">Capabilities</span>
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="uiverse-parent h-full group">
                <div 
                  className="uiverse-card" 
                  style={{ '--card-gradient': 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)' } as any}
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
                    <span className="title group-hover:text-emerald-400 transition-colors duration-300 italic uppercase mb-4 block">
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
