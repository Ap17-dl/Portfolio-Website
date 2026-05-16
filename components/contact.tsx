'use client';

import { useState } from 'react';

export function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Ap17-dl', icon: '$(github)' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ankush-pratham-8447b5343/', icon: '$(linkedin)' },
    { name: 'Twitter', url: 'https://x.com/ankush_pratham3', icon: '$(twitter)' },
    { name: 'Email', url: 'mailto:ankush170306@gmail.com', icon: '$(mail)' },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center border-b border-[#21262d] px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section title */}
        <div className="mb-16">
          <h2 className="font-mono text-2xl text-green-400 mb-2">
            [ CONNECT ]
          </h2>
          <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
        </div>

        {/* Contact content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left - Social links */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-green-400 mb-4">
                <span className="text-white">user</span>
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
                  className="group flex items-center gap-3 font-mono text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  <span className="text-green-400/50">→</span>
                  <span className="group-hover:text-green-300">{link.name}</span>
                  <span className="text-gray-600">({link.icon})</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Contact form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label className="font-mono text-xs text-green-400 block mb-2">
                  /email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 bg-[#0f1419]/80 backdrop-blur-sm border border-gray-700 text-gray-200 placeholder-gray-600 font-mono text-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-200"
                  required
                />
              </div>

              {/* Message input */}
              <div>
                <label className="font-mono text-xs text-green-400 block mb-2">
                  /message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0f1419]/80 backdrop-blur-sm border border-gray-700 text-gray-200 placeholder-gray-600 font-mono text-sm focus:border-green-400 focus:outline-none focus:shadow-lg focus:shadow-green-500/20 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full font-mono text-sm px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 transition-all duration-200 group"
              >
                <span className="group-hover:text-green-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ SEND_MESSAGE ]
                </span>
              </button>

              {/* Success message */}
              {submitted && (
                <p className="font-mono text-sm text-green-400 text-center">
                  ✓ Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
