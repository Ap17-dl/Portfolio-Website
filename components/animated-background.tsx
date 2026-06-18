'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  twinkleSpeed: number;
  color: string;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;
    let cursorX = -1000;
    let cursorY = -1000;
    let targetCursorX = -1000;
    let targetCursorY = -1000;

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = isMobile() ? 45 : 120;
      
      const starColors = [
        'rgba(255, 255, 255, 0.9)',  
        'rgba(230, 245, 255, 0.85)', 
        'rgba(235, 255, 240, 0.85)', 
        'rgba(180, 255, 210, 0.75)', 
      ];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.4,
          speed: Math.random() * 0.08 + 0.02, 
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      targetCursorX = e.clientX;
      targetCursorY = e.clientY;
      if (cursorX === -1000) {
        cursorX = targetCursorX;
        cursorY = targetCursorY;
      }
    };

    const onMouseLeave = () => {
      targetCursorX = -1000;
      targetCursorY = -1000;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.phase += star.twinkleSpeed;
        const currentOpacity = 0.35 + 0.65 * Math.abs(Math.sin(star.phase));

        ctx.fillStyle = star.color.replace('0.9', currentOpacity.toString())
                                  .replace('0.85', (currentOpacity * 0.9).toString())
                                  .replace('0.75', (currentOpacity * 0.8).toString());
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.x -= star.speed;
        star.y += star.speed * 0.4;

        if (star.x < -2) {
          star.x = canvas.width + 2;
          star.y = Math.random() * canvas.height;
        }
        if (star.y > canvas.height + 2) {
          star.y = -2;
          star.x = Math.random() * canvas.width;
        }
      }

      if (targetCursorX !== -1000) {
        cursorX += (targetCursorX - cursorX) * 0.08;
        cursorY += (targetCursorY - cursorY) * 0.08;
        const glow = ctx.createRadialGradient(
          cursorX, cursorY, 0,
          cursorX, cursorY, 130
        );
        glow.addColorStop(0, 'rgba(0, 255, 102, 0.07)');
        glow.addColorStop(0.5, 'rgba(0, 255, 102, 0.02)');
        glow.addColorStop(1, 'rgba(0, 255, 102, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, 130, 0, Math.PI * 2);
        ctx.fill();
      } else {
        cursorX = -1000;
        cursorY = -1000;
      }

      ctx.strokeStyle = 'rgba(0, 255, 102, 0.012)';
      ctx.lineWidth = 1;
      const step = 4;
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 bg-[#050505]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(0, 255, 102, 0.025) 0%, transparent 45%),
          radial-gradient(circle at 85% 80%, rgba(0, 120, 255, 0.02) 0%, transparent 50%)
        `
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
