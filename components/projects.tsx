'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'data-loss-analyzer',
    title: 'Data Loss Analyzer',
    description: 'An AI-powered data analysis platform that detects, visualizes, and predicts data loss patterns using machine learning and interactive dashboards.',
    tags: ['Python', 'Machine Learning', 'Streamlit', 'Data Analysis'],
    demo: 'https://data-loss-analyzer.streamlit.app',
    source: 'https://github.com/Ap17-dl/Data-Loss-Analyzer',
  },
  {
    id: 2,
    name: 'cricket-tournament-management-platform',
    title: 'Local Cricket',
    description: 'Full stack cricket tournaments management solution.',
    tags: ['React', 'PostgreSQL','Typescript', 'DBMS', 'Supabase'],
    demo: 'https://cricket-tournament-platform.vercel.app/',
    source: 'https://github.com/Ap17-dl/cricket-tournament-management',
  },
  {
    id: 3,
    name: 'prepflow',
    title: 'FocusedGov',
    description: 'AI-powered UPSC prep platform with smart revision, PYQ insights, and answer evaluation.',
    tags: ['Next.js','FastAPI','Supabase','OpenAI','RazorPay','EdTech','RAG','pgvector'],
    demo: 'https://focused-gov.vercel.app/',
    source: 'https://github.com/Ap17-dl/FocusedGov',
  },
  {
    id: 4,
    name: 'inno-verse',
    title: 'InnoVerse',
    description: 'A modern investors marketplace platform designed to streamline startup funding, investor discovery, and business collaboration with intelligent insights.',
    tags: ['Full Stack', 'Flutter', 'MongoDB', 'Machine Learning'],
    demo: 'https://innovators-verse.vercel.app/',
    source: 'https://github.com/Ap17-dl/Innovators-marketplace-new',
  },
];

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center border-b border-[#21262d] px-4 py-12 md:py-24 relative"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section title */}
        <div className="mb-8 md:mb-12">
          <h2 className="font-mono text-xl md:text-2xl text-green-400 mb-2">
            [ RECENT_BUILDS ]
          </h2>
          <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group transition-all duration-200 flex flex-col"
            >
              {/* Project card */}
              <div
                className="glass-terminal glass-terminal-hover overflow-hidden flex flex-col h-full"
              >
                {/* Terminal header */}
                <div className="bg-white/[0.02] border-b border-green-500/10 px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 min-h-fit backdrop-blur-md">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="font-mono text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2 truncate">
                    src/projects/{project.name}.exe
                  </span>
                </div>

                {/* Content */}
                <div className={`space-y-3 md:space-y-4 flex flex-col flex-grow p-4 md:p-8`}>
                  <div>
                    <h3 className="font-mono text-lg md:text-2xl text-green-400 mb-1">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono px-2 md:px-3 py-1 border border-gray-700/50 bg-white/[0.01] text-xs md:text-sm text-gray-400 group-hover:border-green-400/50 group-hover:text-green-400/80 transition-colors"
                      >
                        [ #{tag.toLowerCase()} ]
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-2 md:pt-4 mt-auto">
                    <a
                      href={project.demo}
                      className="flex-1 font-mono px-3 md:px-4 py-2 md:py-3 border border-green-500/30 text-green-400 hover:border-green-400 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] transition-all duration-300 group text-center text-xs md:text-sm backdrop-blur-sm bg-gradient-to-br from-green-950/10 to-transparent"
                    >
                      <span className="group-hover:text-green-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ RUN_DEMO ]
                      </span>
                    </a>
                    <a
                      href={project.source}
                      className="flex-1 font-mono px-3 md:px-4 py-2 md:py-3 border border-gray-700/50 text-gray-400 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_20px_rgba(0,255,102,0.1)] transition-all duration-300 group text-center text-xs md:text-sm backdrop-blur-sm bg-gradient-to-br from-white/[0.01] to-transparent"
                    >
                      <span className="group-hover:text-green-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ VIEW_SOURCE ]
                      </span>
                    </a>
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
