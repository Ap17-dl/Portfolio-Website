'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

function Typewriter({ text, speed = 25, onComplete }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayed}</span>;
}

export function SystemStatus() {
  const [visibleRows, setVisibleRows] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState<number>(0);

  // Trigger row visibility sequentially
  const handleRowComplete = (index: number) => {
    if (index === typingIndex) {
      setTypingIndex(index + 1);
      setVisibleRows(index + 1);
    }
  };

  useEffect(() => {
    // Start typing the first row
    setVisibleRows(0);
    setTypingIndex(0);
  }, []);

  const items = [
    {
      key: 'CURRENT FOCUS',
      type: 'tags',
      value: ['Generative AI', 'LLMs', 'MLOps', 'Typescript'],
      icon: '◈',
    },
    {
      key: 'BUILDING',
      type: 'tags',
      value: ['LocalCricket', 'Smart ML Systems'],
      icon: '▲',
    },
    {
      key: 'EXPERIENCE',
      type: 'tags',
      value: ['Full Stack', 'Machine Learning'],
      icon: '■',
    },
    {
      key: 'PROJECTS',
      type: 'value',
      value: '10+ Completed & 6 Active Deployments',
      icon: '➕',
    },
  ];

  return (
    <div className="glass-terminal glass-terminal-hover relative overflow-hidden rounded-none p-5 md:p-6 w-full select-none">
      {/* CRT Scanline Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%',
          opacity: 0.15
        }}
      />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-green-500/10 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
          <span className="font-mono text-[10px] tracking-widest text-green-400 font-semibold uppercase">
            [SYS_MONITOR_v1.0.8]
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
          <span className="w-1 h-1 bg-green-500/30 rounded-full"></span>
          <span>SYS: CALIBRATED</span>
        </div>
      </div>

      {/* Terminal Rows */}
      <div className="space-y-4 md:space-y-5">
        {items.map((item, idx) => {
          const isRowVisible = visibleRows >= idx;
          const isRowTyping = typingIndex === idx;

          return (
            <div
              key={item.key}
              className={`grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-3 items-start transition-opacity duration-300 ${
                isRowVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Monospace Label */}
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="font-mono text-xs text-green-400/50 select-none">
                  {item.icon}
                </span>
                <span className="font-mono text-[10px] tracking-wider text-gray-400 font-semibold uppercase select-none">
                  {item.key}
                </span>
              </div>

              {/* Monospace Value Field */}
              <div className="md:col-span-8 font-mono text-xs flex flex-wrap items-center gap-1.5">
                {isRowVisible && (
                  <>
                    {/* Render Special STATUS row */}
                    {item.type === 'status' && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(0,255,156,0.6)]"></span>
                        <span className="text-gray-200">
                          {isRowTyping ? (
                            <Typewriter
                              text={item.value as string}
                              onComplete={() => handleRowComplete(idx)}
                            />
                          ) : (
                            <span>{item.value}</span>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Render standard TEXT values */}
                    {item.type === 'value' && (
                      <span className="text-gray-200">
                        {isRowTyping ? (
                          <Typewriter
                            text={item.value as string}
                            onComplete={() => handleRowComplete(idx)}
                          />
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </span>
                    )}

                    {/* Render TAGS values */}
                    {item.type === 'tags' && (
                      <div className="flex flex-wrap gap-1.5">
                        {(item.value as string[]).map((tag, tagIdx) => {
                          // Check if this specific tag should be visible/typing
                          // Simple delay logic for tags typing
                          return (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: tagIdx * 0.15 }}
                              onAnimationComplete={() => {
                                // If this is the last tag, mark row complete
                                if (tagIdx === (item.value as string[]).length - 1) {
                                  // Wait a tiny bit then trigger next row
                                  setTimeout(() => handleRowComplete(idx), 200);
                                }
                              }}
                              className="font-mono text-[10px] px-2 py-0.5 bg-green-400/5 text-green-300 border border-green-500/10 rounded-none hover:bg-green-400/10 hover:border-green-400/35 transition-all duration-300 select-none"
                            >
                              {tag}
                            </motion.span>
                          );
                        })}
                      </div>
                    )}

                    {/* Blinking Cursor for active row */}
                    {isRowTyping && item.type !== 'tags' && (
                      <span className="text-green-400 animate-pulse font-bold ml-0.5">_</span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
