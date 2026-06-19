'use client';

import { Calendar, MapPin, Briefcase } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'AI-ML Intern',
    company: 'Grus & Grade Pvt. Ltd.',
    location: 'Delhi, India',
    duration: 'June 2026 - Present',
    details: [
      'Engineered end-to-end Python data preprocessing pipelines, reducing cleaning time by 40%.',
      'Designed and deployed predictive ML models for supply chain and demand forecasting.',
      'Automated reporting workflows with Python scripts, saving 6-7 hours/week for the founding team.'
    ]
  }
];

export function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center border-b border-[#21262d] px-4 py-12 md:py-24 relative"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section title */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-mono text-xl md:text-2xl text-green-400 mb-2">
            [ WORK_HISTORY ]
          </h2>
          <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
        </div>

        {/* Timeline container */}
        <div className="relative pl-6 md:pl-32 space-y-12">
          {/* Vertical axis line */}
          <div className="absolute left-[7px] md:left-[119px] top-2 bottom-2 w-px bg-gradient-to-b from-green-500/40 via-green-500/10 to-transparent"></div>

          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[24px] md:-left-[18px] top-1.5 z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500 shadow-[0_0_10px_rgba(0,255,102,0.8)] heartbeat"></div>
              </div>

              {/* Layout: Date on left (desktop), Card on right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                {/* Date column (desktop only, hidden on mobile) */}
                <div className="hidden md:block md:col-span-3 text-right pt-1">
                  <span className="font-mono text-xs text-green-400 bg-green-500/5 border border-green-500/20 px-3 py-1.5 rounded-none shadow-[inset_0_1px_0_rgba(0,255,102,0.05)]">
                    {exp.duration}
                  </span>
                </div>

                {/* Card column */}
                <div className="md:col-span-9">
                  <div className="glass-terminal glass-terminal-hover overflow-hidden">
                    {/* Terminal Title Bar */}
                    <div className="bg-white/[0.02] border-b border-green-500/10 px-4 py-3 flex items-center justify-between backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="font-mono text-xs text-gray-500 ml-2">
                          sys/experience/job_{exp.id}.sh
                        </span>
                      </div>

                      {/* Mobile-only duration tag */}
                      <span className="md:hidden font-mono text-[10px] text-green-400 bg-green-500/5 border border-green-500/20 px-2 py-1">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-4">
                      <div>
                        <h3 className="font-mono text-lg md:text-2xl text-green-400 mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-green-500/60" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-green-500/60" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="hidden md:flex items-center gap-1.5">
                            <Calendar size={14} className="text-green-500/60" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Summary points */}
                      <ul className="space-y-3 pt-2">
                        {exp.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-gray-300 font-sans">
                            <span className="font-mono text-green-400 mt-1 select-none text-xs md:text-sm">
                              →
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
