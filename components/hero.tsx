'use client';

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center border-b border-[#21262d] px-4 py-12 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10 flex justify-start">
        {/* Terminal Card */}
        <div className="max-w-3xl w-full">
          <div className="glass-terminal glass-terminal-hover overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-green-500/10 bg-white/[0.02] backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="font-mono text-xs text-gray-500 ml-2">~/portfolio/intro.txt</span>
            </div>

            {/* Terminal body */}
            <div className="p-8 md:p-10">
              {/* Command prompt */}
              <div className="space-y-6">
                <div className="font-mono text-sm">
                  <p className="text-gray-500">
                    <span className="text-green-400">ankushpratham</span>
                    <span className="text-gray-500">@portfolio</span>
                    <span className="text-gray-500">:~$</span>
                    <span className="text-white ml-2">cat intro.txt</span>
                  </p>
                </div>

                {/* Content block */}
                <div className="space-y-6 text-white">
                  <p className="font-sans text-lg leading-relaxed text-gray-200">
                  AI/ML Engineer passionate about building scalable intelligent systems that create meaningful real-world impact.  
                  </p>

                  <p className="font-sans text-lg leading-relaxed text-gray-200">
                    With a strong foundation in Machine Learning, Data Structures, and software development, 
                    I focus on creating efficient models and impactful AI applications across domains like finance, healthcare, and predictive analytics.
                  </p>

                  <p className="font-sans text-lg leading-relaxed text-gray-400">
                    Currently exploring Deep Learning, MLOps, Generative AI, and advanced deployment workflows while creating projects that combine innovation with real-world usability.
                  </p>
                </div>

                {/* Cursor animation */}
                <div className="font-mono text-lg text-green-400 h-5 flex items-center">
                  <span className="cursor">_</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons - outside the card */}
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="#experience"
              className="font-mono text-sm px-6 py-3 border border-green-500/30 text-green-400 hover:border-green-400 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] transition-all duration-300 group whitespace-nowrap backdrop-blur-sm bg-gradient-to-br from-green-950/10 to-transparent"
            >
              <span className="group-hover:text-green-300">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ VIEW_EXPERIENCE ]
              </span>
            </a>
            <a
              href="#projects"
              className="font-mono text-sm px-6 py-3 border border-gray-700/50 text-gray-400 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_20px_rgba(0,255,102,0.1)] transition-all duration-300 group whitespace-nowrap backdrop-blur-sm bg-gradient-to-br from-white/[0.01] to-transparent"
            >
              <span className="group-hover:text-green-300">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ VIEW_PROJECTS ]
              </span>
            </a>
            <a
              href="#contact"
              className="font-mono text-sm px-6 py-3 border border-gray-700/50 text-gray-400 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_20px_rgba(0,255,102,0.1)] transition-all duration-300 group whitespace-nowrap backdrop-blur-sm bg-gradient-to-br from-white/[0.01] to-transparent"
            >
              <span className="group-hover:text-green-300">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ GET_IN_TOUCH ]
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
