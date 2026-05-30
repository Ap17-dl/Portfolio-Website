'use client';

import { useState } from 'react';

export function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setEmail('');
          setMessage('');
          setSubmitted(false);
        }, 3000);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Ap17-dl', icon: '$(github)' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ankush-pratham/', icon: '$(linkedin)' },
    { name: 'Twitter', url: 'https://x.com/ankush_pratham3', icon: '$(twitter)' },
    { name: 'Email', url: 'mailto:ankush170306@gmail.com', icon: '$(mail)' },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center border-b border-[#21262d] px-4 relative">
      <div className="max-w-5xl w-full mx-auto z-10">
        {/* Side by side: Connect card + Contact form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* Terminal Card - social links (narrower, 2 cols) */}
          <div 
            className={`md:col-span-2 bg-[#0a0f0d]/85 backdrop-blur-xl border border-green-500/20 shadow-2xl shadow-green-900/20 ${isHovered ? 'smoothGlow' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-green-500/10 bg-[#0a0f0d]/60">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="font-mono text-xs text-gray-500 ml-2">~/portfolio/connect</span>
            </div>

            {/* Terminal body */}
            <div className="p-6 md:p-8">
              {/* Section title */}
              <div className="mb-6">
                <h2 className="font-mono text-2xl text-green-400 mb-2">
                  [ CONNECT ]
                </h2>
                <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
              </div>

              {/* Social links */}
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-sm text-green-400 mb-4">
                    <span className="text-white">ankushpratham</span>
                    <span className="text-gray-500">@portfolio</span>
                    <span className="text-gray-500">:~$</span>
                    <span className="text-white ml-2">ls -la /social</span>
                  </p>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="group flex items-center gap-3 font-mono text-base text-gray-300 hover:text-green-400 transition-colors duration-200"
                    >
                      <span className="text-green-400/30">→</span>
                      <span className="group-hover:text-green-300">{link.name}</span>
                      <span className="text-gray-600/40">({link.icon})</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact form  */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label className="font-mono text-s text-green-400 block mb-2">
                  /email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-[#0a0f0d]/50 backdrop-blur-sm border border-green-500/20 text-gray-200 placeholder-gray-600 font-mono text-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-200"
                  required
                />
              </div>

              {/* Message input */}
              <div>
                <label className="font-mono text-s text-green-400 block mb-2">
                  /message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0a0f0d]/50 backdrop-blur-sm border border-green-500/20 text-gray-200 placeholder-gray-600 font-mono text-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full font-mono text-sm px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-200 group backdrop-blur-sm bg-[#0a0f0d]/40"
              >
                <span className="group-hover:text-green-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ SEND_MESSAGE ]
                </span>
              </button>

              {/* Success message */}
              {submitted && (
                <p className="font-mono text-sm text-green-400 text-center">
                  ✓ Message sent successfully!
                          Thank You
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
