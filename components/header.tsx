'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-green-600/30 bg-[#0a0f0d]/80 backdrop-blur-lg'
          : 'border-b border-[#21262d] bg-[#0a0f0d]/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - terminal prompt */}
        <div className="font-mono text-sm text-green-400 whitespace-nowrap">
          <span className="text-white">ankushpratham</span>
          <span className="text-gray-500">@portfolio</span>
          <span className="text-gray-500">:~</span>
          <span className="text-green-400">$</span>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 ml-8">
          {[
            { label: '[01] Home', id: 'hero' },
            { label: '[02] Projects', id: 'projects' },
            { label: '[03] Connect', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-mono text-xs text-gray-400 hover:text-green-400 transition-colors duration-200 group"
            >
              <span className="group-hover:text-green-400 transition-colors">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right side - System status */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="font-mono text-xs text-gray-400">SYS_STATUS:</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse glow"></div>
            <span className="font-mono text-xs text-green-400">ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
