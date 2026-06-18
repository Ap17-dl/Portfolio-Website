'use client';

import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasPointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let firstMove = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (firstMove) {
        dotX = mouseX;
        dotY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        firstMove = false;
      }
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Track hovered elements for visual feedback
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'RECT' ||
          target.tagName === 'rect' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.classList.contains('interactive') ||
          target.closest('.interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', onMouseOver);

    let animationFrameId: number;

    const render = () => {
      // Instant tracking for the center dot (zero lag)
      dotX = mouseX;
      dotY = mouseY;

      // Snappy trailing tracking for the outer ring (0.6 coefficient)
      ringX += (mouseX - ringX) * 0.6;
      ringY += (mouseY - ringY) * 0.6;

      if (dot) {
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasPointer, isVisible]);

  if (!hasPointer) return null;

  return (
    <>
      {/* Central Cursor Dot Container */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`w-1.5 h-1.5 bg-[#00FF9C] rounded-full transition-transform duration-200 ${
            isHovered ? 'scale-[1.6]' : ''
          }`}
          style={{
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px #00FF9C, 0 0 16px #00FF9C',
          }}
        />
      </div>
      {/* Outer Cursor Ring Container */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`w-6 h-6 border border-[#00FF9C]/45 bg-[#00FF9C]/[0.02] rounded-full transition-all duration-200 ${
            isHovered ? 'scale-[1.8] border-[#00FF9C] bg-[#00FF9C]/[0.08] shadow-[0_0_20px_rgba(0,255,156,0.3)]' : ''
          } ${
            isClicking ? 'scale-[0.8] border-[#00FF9C] bg-[#00FF9C]/[0.15]' : ''
          }`}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </>
  );
}
