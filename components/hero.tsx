'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { NeuralNetwork } from './neural-network';
import { SystemStatus } from './system-status';
import { GithubHeatmap } from './github-heatmap';

export function Hero() {
  // Parallax / 3D Tilt values using Framer Motion springs for premium responsiveness
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jerky movements
  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });

  // Map mouse positions to rotation values (tilt range: -4 to 4 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates around center: -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex items-center border-b border-[#21262d]/20 px-4 py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Absolute faint accent lights */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">
          
          {/* Left Column - Intro & Profile Terminal (40% width) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[55%] flex flex-col justify-center order-2 lg:order-1"
          >
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
              <div className="p-7 md:p-9">
                <div className="space-y-5">
                  <div className="font-mono text-sm">
                    <p className="text-gray-500">
                      <span className="text-green-400">ankushpratham</span>
                      <span className="text-gray-500">@portfolio</span>
                      <span className="text-gray-500">:~$</span>
                      <span className="text-white ml-2">cat intro.txt</span>
                    </p>
                  </div>

                  {/* Content block */}
                  <div className="space-y-5 text-white">
                    <p className="font-sans text-base md:text-lg leading-relaxed text-gray-200">
                      AI/ML Engineer passionate about building scalable intelligent systems that create meaningful real-world impact.  
                    </p>

                    <p className="font-sans text-base md:text-lg leading-relaxed text-gray-200">
                      With a strong foundation in Machine Learning, Data Structures, and software development, 
                      I focus on creating efficient models and impactful AI applications across domains like finance, healthcare, and predictive analytics.
                    </p>

                    <p className="font-sans text-sm md:text-base leading-relaxed text-gray-400">
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

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3.5 mt-7">
              <a
                href="#experience"
                className="font-mono text-xs md:text-sm px-5 py-3 border border-green-500/30 text-green-400 hover:border-green-400 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(0,255,156,0.15)] transition-all duration-300 group whitespace-nowrap backdrop-blur-sm bg-gradient-to-br from-green-950/10 to-transparent"
              >
                <span className="group-hover:text-green-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ VIEW_EXPERIENCE ]
                </span>
              </a>
              <a
                href="#projects"
                className="font-mono text-xs md:text-sm px-5 py-3 border border-gray-700/50 text-gray-400 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_20px_rgba(0,255,156,0.1)] transition-all duration-300 group whitespace-nowrap backdrop-blur-sm bg-gradient-to-br from-white/[0.01] to-transparent"
              >
                <span className="group-hover:text-green-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ VIEW_PROJECTS ]
                </span>
              </a>
              <a
                href="#contact"
                className="font-mono text-xs md:text-sm px-5 py-3 border border-gray-700/50 text-gray-400 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_20px_rgba(0,255,156,0.1)] transition-all duration-300 group whitespace-nowrap backdrop-blur-sm bg-gradient-to-br from-white/[0.01] to-transparent"
              >
                <span className="group-hover:text-green-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt; </span>[ GET_IN_TOUCH ]
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column - AI OS control panel dashboard (60% width) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="w-full lg:w-[45%] flex flex-col gap-5 relative order-1 lg:order-2"
          >
            <div className="glass-terminal overflow-hidden rounded-none relative w-full">
              <div className="flex items-center gap-3 px-5 py-2.5 border-b border-green-500/10 bg-white/[0.02] backdrop-blur-md">
                <span className="font-mono text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                  [NEURAL_ENGINE_VISUALIZATION]
                </span>
                <div className="ml-auto flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/20"></span>
                  <span className="font-mono text-[9px] text-green-400/60 uppercase">ACTIVE_NODES: 32</span>
                </div>
              </div>
              <div className="h-[160px] md:h-[180px] w-full">
                <NeuralNetwork />
              </div>
            </div>

            <SystemStatus />
            <GithubHeatmap />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
