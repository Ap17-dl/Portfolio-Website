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
    name: 'farm-management',
    title: 'Smart Farming Database',
    description: 'Full-stack e-commerce solution with real-time inventory, Stripe integration, and advanced search capabilities.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis'],
    demo: 'https://smart-farming-database.vercel.app/',
    source: 'https://github.com/Ap17-dl/Smart-Farming-Database',
  },
  {
    id: 3,
    name: 'prepflow',
    title: 'FocusedGov',
    description: 'AI-powered UPSC prep platform with smart revision, PYQ insights, and answer evaluation.',
    tags: ['Next.js','FastAPI','Supabase','OpenAI','RazorPay',
    'EdTech',
    'RAG',
    'pgvector'],
    demo: '#',
    source: '#',
  },
  {
    id: 4,
    name: 'in-progress',
    title: 'Investors Marketplace',
    description: 'A modern investors marketplace platform designed to streamline startup funding, investor discovery, and business collaboration with intelligent insights.',
    tags: ['Full Stack', 'React', 'MongoDB', 'Machine Learning'],
    demo: '#',
    source: 'https://github.com/Ap17-dl/innovators-marketplace',
  },
];

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center border-b border-[#21262d] px-4 py-24 relative"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section title */}
        <div className="mb-12">
          <h2 className="font-mono text-2xl text-green-400 mb-2">
            [ RECENT_BUILDS ]
          </h2>
          <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group transition-all duration-200 flex flex-col"
            >
              {/* Project card */}
              <div
                className={`border transition-all duration-200 overflow-hidden bg-[#0a0f0d]/80 backdrop-blur-xl flex flex-col h-full ${
                  hoveredId === project.id
                    ? 'border-green-400 shadow-lg shadow-green-500/50 glow'
                    : 'border-green-500/20 hover:border-green-500/40'
                }`}
              >
                {/* Terminal header */}
                <div className="bg-[#0a0f0d]/60 border-b border-green-500/10 px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="font-mono text-xs text-gray-500 ml-2">
                    src/projects/{project.name}.exe
                  </span>
                </div>

                {/* Content */}
                <div className={`space-y-4 flex flex-col flex-grow ${
                  project.id > 0 ? 'p-8' : 'p-6'
                }`}>
                  <div>
                    <h3 className={`font-mono text-green-400 mb-1 ${
                      project.id > 0 ? 'text-2xl' : 'text-lg'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`font-sans text-gray-400 leading-relaxed ${
                      project.id > 0 ? 'text-base' : 'text-sm'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`font-mono px-3 py-1 border border-gray-700/50 text-gray-400 group-hover:border-green-400/50 group-hover:text-green-400/80 transition-colors ${
                          project.id > 0 ? 'text-sm' : 'text-xs'
                        }`}
                      >
                        [ #{tag.toLowerCase()} ]
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className={`flex gap-3 pt-4 mt-auto ${
                    project.id > 2 ? 'gap-4 pt-6' : ''
                  }`}>
                    <a
                      href={project.demo}
                      className={`flex-1 font-mono px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 transition-all duration-200 group text-center ${
                        project.id > 2 ? 'text-sm py-3' : 'text-xs'
                      }`}
                    >
                      <span className="group-hover:text-green-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ RUN_DEMO ]
                      </span>
                    </a>
                    <a
                      href={project.source}
                      className={`flex-1 font-mono px-4 py-2 border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400 transition-all duration-200 group text-center ${
                        project.id > 2 ? 'text-sm py-3' : 'text-xs'
                      }`}
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
