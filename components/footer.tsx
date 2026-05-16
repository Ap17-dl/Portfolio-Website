'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f0d]/60 backdrop-blur-md border-t border-[#21262d] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Terminal info */}
          <div className="font-mono text-xs text-gray-500">
            <p>
              <span className="text-green-400">user</span>
              <span className="text-gray-500">@portfolio</span>
              <span className="text-gray-500">:~$</span>
              <span className="text-white ml-2">echo &quot;Built with passion&quot;</span>
            </p>
          </div>

          {/* Center - Copyright */}
          <p className="font-mono text-xs text-gray-600">
            © {currentYear} All rights reserved. Crafted with <span className="text-green-400">{'</>'}</span>
          </p>

          {/* Right - Tech stack */}
          <div className="font-mono text-xs text-gray-500 text-center md:text-right">
            <p>
              Built with <span className="text-green-400">React</span> + <span className="text-green-400">Next.js</span> +
              <span className="text-green-400"> Tailwind</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
