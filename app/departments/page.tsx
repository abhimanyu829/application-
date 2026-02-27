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
    <div className="bg-yellow-50 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-24">
          <h2 className="text-xs font-medium tracking-widest text-black/40 uppercase mb-4">Our Structure</h2>
          <p className="font-display text-5xl font-bold tracking-tighter text-black sm:text-7xl leading-[1.1]">
            The teams behind the innovation
          </p>
          <p className="mt-8 text-xl font-light leading-relaxed text-black/60">
            We are organized into specialized departments, each focused on delivering excellence in their respective domains while collaborating seamlessly.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-12 gap-y-24 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-black/5 rounded-full">
                  <dept.icon className="h-5 w-5 text-black" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-black mb-4">{dept.name}</h3>
                <p className="flex-auto text-base font-light leading-relaxed text-black/60">
                  {dept.description}
                </p>
                <div className="mt-10">
                  <h4 className="text-xs font-medium text-black uppercase tracking-widest mb-6">Key Roles</h4>
                  <div className="flex flex-wrap gap-3">
                    {dept.roles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-black/80 bg-black/5 rounded-none"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
