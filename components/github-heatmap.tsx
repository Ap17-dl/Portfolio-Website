'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion, AnimatePresence } from 'framer-motion';

export function GithubHeatmap() {
  const [mounted, setMounted] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    level: number;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const fetchCount = async () => {
      try {
        const res = await fetch('https://github-contributions-api.deno.dev/Ap17-dl.json');
        if (!res.ok) throw new Error('API failed');
        const json = await res.json();
        if (json && typeof json.totalContributions === 'number') {
          setTotalCount(json.totalContributions);
        }
      } catch (err) {
        console.warn('Failed to fetch contributions count, using fallback', err);
        setTotalCount(187); 
      }
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (mounted && scrollContainerRef.current) {
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  return (
    <div 
      ref={containerRef}
      className="glass-terminal glass-terminal-hover w-full rounded-none relative select-none animate-fadeIn"
    >
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%',
          opacity: 0.08
        }}
      />

      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-green-500/10 bg-white/[0.02] backdrop-blur-md">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
        </div>
        <span className="font-mono text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-semibold ml-1">
          ~/portfolio/github_activity.exe
        </span>
        <div className="ml-auto flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse"></span>
          <span className="font-mono text-[9px] text-green-400/60 uppercase">CALENDAR_ONLINE</span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto lg:overflow-x-visible pb-2 flex justify-end sm:justify-center [&_svg]:w-full [&_svg]:h-auto"
        >
          <div className="w-full min-w-[450px] pr-2 flex justify-end sm:justify-center">
            {mounted ? (
              <GitHubCalendar
                username="Ap17-dl"
                colorScheme="dark"
                theme={{
                  dark: ['#111815', '#0E4429', '#006D32', '#00C37A', '#00FF9C'],
                }}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: '#8B8B8B',
                }}
                blockSize={8.5}
                blockMargin={2}
                fontSize={9}
                showTotalCount={false}
                showColorLegend={false}
                showWeekdayLabels={false}
                renderBlock={(block, activity) => {
                  return React.cloneElement(block, {
                    onMouseEnter: (e: React.MouseEvent<SVGElement>) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      if (containerRef.current) {
                        const containerRect = containerRef.current.getBoundingClientRect();
                        setHoveredCell({
                          date: activity.date,
                          count: activity.count,
                          level: activity.level,
                          x: rect.left - containerRect.left + rect.width / 2,
                          y: rect.top - containerRect.top - 8,
                        });
                      }
                    },
                    onMouseLeave: () => {
                      setHoveredCell(null);
                    },
                    style: {
                      cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'><circle cx='4' cy='4' r='2.5' fill='%2300FF9C' stroke='%23090d0b' stroke-width='0.5'/></svg>") 4 4, pointer`,
                      transition: 'all 0.12s ease-in-out',
                    }
                  } as any);
                }}
              />
            ) : (
              <div className="h-[95px] w-full bg-transparent" />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3 pt-2 border-t border-green-500/5">
          {/* Total count on bottom left */}
          <span className="font-mono text-xs text-[#8B8B8B] select-text">
            {totalCount !== null ? totalCount : '187'} contributions in the last year
          </span>

          <div className="flex items-center gap-1.5 text-xs text-[#8B8B8B] font-mono">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[1.5px] border border-black/10" style={{ backgroundColor: '#111815' }} />
            <span className="w-2.5 h-2.5 rounded-[1.5px] border border-black/20" style={{ backgroundColor: '#0E4429' }} />
            <span className="w-2.5 h-2.5 rounded-[1.5px] border border-black/20" style={{ backgroundColor: '#006D32' }} />
            <span className="w-2.5 h-2.5 rounded-[1.5px] border border-black/20" style={{ backgroundColor: '#00C37A' }} />
            <span className="w-2.5 h-2.5 rounded-[1.5px] border border-black/20" style={{ backgroundColor: '#00FF9C' }} />
            <span>More</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 px-3 py-1.5 bg-[#090d0b] text-[#e6edf3] border border-green-500/20 shadow-lg rounded-lg pointer-events-none text-xs text-center font-sans"
            style={{
              left: hoveredCell.x,
              top: hoveredCell.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <span className="text-[11px] whitespace-nowrap">
              {hoveredCell.count === 0 ? (
                <>No contributions on {hoveredCell.date}</>
              ) : (
                <>
                  <strong>{hoveredCell.count}</strong> contribution{hoveredCell.count > 1 ? 's' : ''} on {hoveredCell.date}
                </>
              )}
            </span>
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-green-500/20"
            />
            <div 
              className="absolute bottom-[0.5px] left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-[#090d0b]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
