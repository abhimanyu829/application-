'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useTermsProtection } from '@/hooks/useTermsProtection';
import { Loader2 } from 'lucide-react';
import { LayoutDashboard, Cpu, Code2, Globe, CircleCheck, ArrowRight } from 'lucide-react';

export default function Services() {
  // Only enforce terms protection for logged-in users
  const { isLoading: termsLoading, isAllowed: termsAccepted, user } = useTermsProtection();

  // Show loading spinner only when a logged-in user's terms are being verified
  if (user && termsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0520]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white/80 text-[10px] font-black tracking-widest uppercase">Verifying Access...</p>
        </div>
      </div>
    );
  }

  const services = [
    {
      id: 'saas',
      title: 'SaaS Platforms',
      description: 'We build robust, scalable, and secure SaaS platforms tailored to your industry. From School Management to ERP systems.',
      icon: LayoutDashboard,
      features: ['Multi-tenant Architecture', 'Role-based Access Control', 'Subscription Billing Integration', 'Real-time Analytics Dashboard'],
      benefits: 'Reduce operational costs and scale your business with a centralized management system.',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      id: 'ai',
      title: 'AI Agents & Automation',
      description: 'Leverage the power of artificial intelligence to automate repetitive tasks, enhance customer support, and gain predictive insights.',
      icon: Cpu,
      features: ['Custom LLM Integration', 'Automated Workflows', 'Intelligent Chatbots', 'Predictive Data Analysis'],
      benefits: 'Increase efficiency by 10x and provide 24/7 intelligent support to your customers.',
      color: 'from-blue-400 to-indigo-400'
    },
    {
      id: 'web',
      title: 'Modern Business Websites',
      description: 'High-performance, SEO-optimized, and visually stunning websites that convert visitors into customers.',
      icon: Globe,
      features: ['Next.js App Router', 'Headless CMS Integration', 'Core Web Vitals Optimized', 'Responsive Design'],
      benefits: 'Establish a strong online presence and improve your conversion rates significantly.',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'enterprise',
      title: 'Custom Enterprise Software',
      description: 'Bespoke software solutions designed to solve complex business challenges and streamline operations.',
      icon: Code2,
      features: ['Microservices Architecture', 'Legacy System Modernization', 'API Development & Integration', 'High Availability Setup'],
      benefits: 'Gain a competitive edge with software that perfectly aligns with your unique business processes.',
      color: 'from-amber-400 to-orange-400'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-emerald-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <h2 className="text-xs font-black tracking-[0.3em] text-white/80 uppercase mb-6">Our Services</h2>
          <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">Solutions</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">Engineered</span>
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-white/80 tracking-wide">
            We provide end-to-end development services, from ideation to deployment, ensuring your product is built to the highest standards.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-12 gap-y-24 lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.id} className="uiverse-parent h-full group">
                <div 
                  className="uiverse-card" 
                  style={{ '--card-gradient': `linear-gradient(135deg, ${service.color.split(' ')[0].replace('from-', '#').replace('-400', '')}1a 0%, ${service.color.split(' ')[1].replace('to-', '#').replace('-400', '')}05 100%)` } as any}
                >
                  <div className="uiverse-glass" />
                  
                  <div className="uiverse-logo">
                    <span className="uiverse-circle uiverse-circle1"></span>
                    <span className="uiverse-circle uiverse-circle2"></span>
                    <span className="uiverse-circle uiverse-circle3"></span>
                    <span className="uiverse-circle uiverse-circle4"></span>
                    <span className="uiverse-circle uiverse-circle5">
                      <service.icon className="h-6 w-6 text-white" />
                    </span>
                  </div>

                  <div className="uiverse-content !p-10">
                    <span className="title group-hover:text-white transition-colors duration-300 italic uppercase mb-8 block">
                      {service.title}
                    </span>
                    
                    <div className="flex flex-auto flex-col">
                      <p className="text italic mb-8 leading-relaxed">{service.description}</p>
                      
                      <div className="mb-8">
                        <h4 className="text-[9px] font-black text-white/80 uppercase tracking-[0.2em] mb-4">Key Features</h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex gap-x-3 items-center">
                              <CircleCheck className="h-4 w-4 flex-none text-white/70" aria-hidden="true" />
                              <span className="text-xs font-light text-white/70">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mt-auto">
                        <p className="text-[11px] font-light text-white/80 leading-relaxed italic">
                          <span className="font-black text-white/80 uppercase tracking-widest text-[8px] block mb-2">Value Proposition</span> 
                          {service.benefits}
                        </p>
                      </div>

                      <div className="mt-8">
                        <Link
                          href={`/services/${service.id === 'saas' ? 'saas' : service.id === 'ai' ? 'ai-agents' : service.id === 'web' ? 'mvp-development' : 'enterprise-software'}`}
                          className="group/btn inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 hover:text-white transition-all"
                        >
                          Explore Vertical <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                        </Link>
                      </div>
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
      </div>
    </div>
  );
}
