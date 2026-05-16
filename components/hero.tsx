'use client';

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center border-b border-[#21262d] px-4 relative overflow-hidden"
    >
      {/* Terminal Card */}
      <div className="max-w-3xl w-full z-10">
        <div className="bg-[#0a0f0d]/85 backdrop-blur-xl border border-green-500/20 shadow-2xl shadow-green-900/20">
          {/* Terminal title bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-green-500/10 bg-[#0a0f0d]/60">
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
                  AI/ML Engineer passionate about building intelligent, scalable, and impactful solutions that bridge data, automation, and real-world applications.
                </p>

                <p className="font-sans text-lg leading-relaxed text-gray-300">
                  With a strong foundation in Machine Learning, Data Structures, and software development, 
                  I focus on creating efficient models and impactful AI applications across domains like finance, healthcare, and predictive analytics.
                </p>

                <p className="font-sans text-lg leading-relaxed text-gray-400">
                  Currently exploring advanced Machine Learning architectures, deployment pipelines, and AI-powered applications that streamline decision-making and enhance digital experiences.
                </p>
              </div>

              {/* Cursor animation */}
              <div className="font-mono text-lg text-green-400 h-8 flex items-center">
                <span className="cursor">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons - outside the card */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href="#projects"
            className="font-mono text-sm px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-200 group whitespace-nowrap backdrop-blur-sm bg-[#0a0f0d]/40"
          >
            <span className="group-hover:text-green-300">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ VIEW_WORK ]
            </span>
          </a>
          <a
            href="#contact"
            className="font-mono text-sm px-6 py-3 border border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 group whitespace-nowrap backdrop-blur-sm bg-[#0a0f0d]/40"
          >
            <span className="group-hover:text-green-300">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ GET_IN_TOUCH ]
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
