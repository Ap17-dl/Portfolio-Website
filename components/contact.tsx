'use client';

import { useState } from 'react';

export function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitted(false);

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmail('');
      setErrorMsg('enter a valid email address');
      return;
    }

    setIsSubmitting(true);
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
        setEmail('');
        setMessage('');
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg('Error submitting form');
    } finally {
      setIsSubmitting(false);
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
            className="md:col-span-2 glass-terminal glass-terminal-hover overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-green-500/10 bg-white/[0.02] backdrop-blur-md">
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
          <div className="md:col-span-3 glass-terminal glass-terminal-hover overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-green-500/10 bg-white/[0.02] backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="font-mono text-xs text-gray-500 ml-2">~/portfolio/message</span>
            </div>

            <div className="p-6 md:p-8">
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
                    className="w-full px-4 py-3 glass-input text-gray-200 placeholder-gray-600 font-mono text-sm focus:outline-none transition-all duration-200"
                    required
                    disabled={isSubmitting}
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
                    placeholder="Type your message here..."
                    rows={6}
                    className="w-full px-4 py-3 glass-input text-gray-200 placeholder-gray-600 font-mono text-sm focus:outline-none transition-all duration-200 resize-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-mono text-sm px-6 py-3 border border-green-500/30 text-green-400 hover:border-green-400 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] transition-all duration-300 group backdrop-blur-sm bg-gradient-to-br from-green-950/10 to-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none"
                >
                  <span className="group-hover:text-green-300">
                    {isSubmitting ? (
                      <span>[ SENDING... ]</span>
                    ) : (
                      <>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ SEND_MESSAGE ]
                      </>
                    )}
                  </span>
                </button>

                {/* Success message */}
                {submitted && (
                  <p className="font-mono text-sm text-green-400 text-center mt-2 animate-pulse">
                    ✓ mail sent
                  </p>
                )}

                {/* Error message */}
                {errorMsg && (
                  <p className="font-mono text-sm text-red-400 text-center mt-2">
                    ✗ {errorMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
