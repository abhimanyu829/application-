'use client';

import { motion } from 'motion/react';
import { Code2, Palette, Megaphone, Cpu, Briefcase } from 'lucide-react';

export default function Departments() {
  const departments = [
    {
      name: 'Technical Department',
      description: 'The core engineering team responsible for building scalable, high-performance web applications and enterprise software.',
      icon: Code2,
      roles: ['Frontend Engineers', 'Backend Engineers', 'DevOps Specialists', 'QA Testers'],
    },
    {
      name: 'UI/UX & Design',
      description: 'Crafting intuitive, accessible, and visually stunning user interfaces that provide exceptional user experiences.',
      icon: Palette,
      roles: ['Product Designers', 'UX Researchers', 'Interaction Designers', 'Graphic Artists'],
    },
    {
      name: 'Sales & Marketing',
      description: 'Driving growth, acquiring new clients, and building our brand presence in the global market.',
      icon: Megaphone,
      roles: ['Growth Hackers', 'Content Strategists', 'B2B Sales Executives', 'SEO Specialists'],
    },
    {
      name: 'AI & Automation Team',
      description: 'Developing intelligent agents, integrating LLMs, and automating complex business workflows.',
      icon: Cpu,
      roles: ['Machine Learning Engineers', 'Data Scientists', 'Automation Experts', 'Prompt Engineers'],
    },
    {
      name: 'Operations & Finance',
      description: 'Ensuring smooth day-to-day operations, managing resources, and driving financial strategy.',
      icon: Briefcase,
      roles: ['Operations Managers', 'Financial Analysts', 'HR Specialists', 'Legal Counsel'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0520] relative overflow-hidden selection:bg-blue-500/30">
      <div className="aurora-dashboard-bg opacity-70" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-24">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase mb-4">Structural Analysis</h2>
          <h1 className="font-display text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[1.1] uppercase italic">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">Architects</span> of Innovation
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-white/60 tracking-wide border-l-2 border-blue-500/30 pl-8 italic">
            "We are organized into specialized departments, each focused on delivering excellence in their respective domains while collaborating seamlessly."
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-12 gap-y-24 lg:grid-cols-3">
            {departments.map((dept) => (
              <div key={dept.name} className="uiverse-parent group">
                <div 
                  className="uiverse-card"
                  style={{ '--card-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%)' } as any}
                >
                  <div className="uiverse-glass" />
                  
                  <div className="uiverse-logo">
                    <span className="uiverse-circle uiverse-circle1"></span>
                    <span className="uiverse-circle uiverse-circle2"></span>
                    <span className="uiverse-circle uiverse-circle3"></span>
                    <span className="uiverse-circle uiverse-circle4"></span>
                    <span className="uiverse-circle uiverse-circle5">
                      <dept.icon className="w-5 h-5 text-white" />
                    </span>
                  </div>

                  <div className="uiverse-content">
                    <div className="absolute top-0 right-0 p-6">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                    </div>
                    
                    <span className="title group-hover:text-blue-400 transition-colors duration-300 uppercase italic">{dept.name}</span>
                    
                    <p className="text italic mt-4 mb-6 leading-relaxed">
                      {dept.description}
                    </p>

                    <div className="pt-6 border-t border-white/5 w-full">
                      <h4 className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Core Competencies</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dept.roles.map((role) => (
                          <span
                            key={role}
                            className="inline-flex items-center px-2.5 py-1 text-[8px] font-black text-white/50 bg-white/5 rounded-full border border-white/5 group-hover:border-blue-500/20 group-hover:text-white/80 transition-all uppercase tracking-wider"
                          >
                            {role}
                          </span>
                        ))}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 text-center"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />
          <p className="text-2xl font-black text-white tracking-tighter uppercase italic">
            A unified force <span className="text-blue-400">driving the future.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
