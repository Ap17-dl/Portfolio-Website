'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const BACKGROUND_IMAGES = [
  '/bg-1.jpg',
  '/bg-2.jpg',
  '/bg-3.jpg',
  '/bg-4.jpg',
];

export function AnimatedBackground() {
  const [opacities, setOpacities] = useState([1, 0, 0, 0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // Calculate which image should be visible based on scroll position
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setOpacities([1, 0, 0, 0]);
      return;
    }

    const scrollProgress = Math.min(scrollY / docHeight, 1);
    const totalImages = BACKGROUND_IMAGES.length;

    // Each image occupies a segment of the scroll range
    // With overlap zones for smooth crossfade
    const segmentSize = 1 / (totalImages - 1); // 0.333...
    const fadeZone = segmentSize * 0.5; // overlap region for crossfade

    const newOpacities = BACKGROUND_IMAGES.map((_, index) => {
      const center = index * segmentSize;
      const distance = Math.abs(scrollProgress - center);

      if (distance <= fadeZone) {
        // Smooth cosine interpolation for butter-smooth transitions
        return Math.cos((distance / fadeZone) * (Math.PI / 2));
      }
      return 0;
    });

    // Normalize so total opacity contribution is reasonable
    const maxOpacity = Math.max(...newOpacities, 0.01);
    const normalized = newOpacities.map(o => o / maxOpacity);

    setOpacities(normalized);
  }, []);

  // Lightweight canvas overlay for scanlines + cursor glow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let cursorX = 0;
    let cursorY = 0;

    const drawOverlay = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanlines
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.015)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Subtle vignette overlay
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.9
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cursor glow
      const glow = ctx.createRadialGradient(
        cursorX, cursorY, 0,
        cursorX, cursorY, 120
      );
      glow.addColorStop(0, 'rgba(0, 255, 65, 0.08)');
      glow.addColorStop(0.5, 'rgba(0, 255, 65, 0.03)');
      glow.addColorStop(1, 'rgba(0, 255, 65, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 120, 0, Math.PI * 2);
      ctx.fill();

      frameRef.current++;
      rafRef.current = requestAnimationFrame(drawOverlay);
    };

    drawOverlay();

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Scroll listener with throttled RAF
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* Background images with crossfade */}
      {BACKGROUND_IMAGES.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: opacities[index] }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Green tint overlay to unify the look */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/60 via-transparent to-[#0a0f0d]/80" />

      {/* Canvas overlay for scanlines, vignette, cursor glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
