'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'design-system',
    title: 'Component Library',
    description: 'A comprehensive, fully-accessible React component library with 50+ components, TypeScript support, and Storybook documentation.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    demo: '#',
    source: '#',
  },
  {
    id: 2,
    name: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, Stripe integration, and advanced search capabilities.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis'],
    demo: '#',
    source: '#',
  },
  {
    id: 3,
    name: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts, data visualization, and custom report generation.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    demo: '#',
    source: '#',
  },
  {
    id: 4,
    name: 'mobile-app',
    title: 'Mobile App',
    description: 'Cross-platform mobile application with offline-first architecture, push notifications, and biometric authentication.',
    tags: ['React Native', 'Firebase', 'GraphQL', 'Redux'],
    demo: '#',
    source: '#',
  },
];

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="py-24 border-b border-[#21262d] px-4 relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <div className="mb-16">
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
              className="group transition-all duration-200"
            >
              {/* Project card */}
              <div
                className={`border transition-all duration-200 overflow-hidden backdrop-blur-md bg-[#0a0f0d]/70 ${
                  hoveredId === project.id
                    ? 'border-green-400 shadow-lg shadow-green-500/50 glow'
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
              >
                {/* Terminal header */}
                <div className="bg-[#0f1419]/80 border-b border-gray-700/50 px-4 py-3 flex items-center gap-3">
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
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-mono text-lg text-green-400 mb-1">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1 border border-gray-700/50 text-gray-400 group-hover:border-green-400/50 group-hover:text-green-400/80 transition-colors"
                      >
                        [ #{tag.toLowerCase()} ]
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-4">
                    <a
                      href={project.demo}
                      className="flex-1 font-mono text-xs px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 transition-all duration-200 group text-center"
                    >
                      <span className="group-hover:text-green-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ RUN_DEMO ]
                      </span>
                    </a>
                    <a
                      href={project.source}
                      className="flex-1 font-mono text-xs px-4 py-2 border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400 transition-all duration-200 group text-center"
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
