'use client';

import { useEffect, useRef } from 'react';

export default function GoldPopperSprinkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (window.innerWidth < 768 || motion.matches || document.hidden) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let isRunning = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    canvas.hidden = false;

    const handleResize = () => {
      if (!isRunning) return;
      if (window.innerWidth < 768) { stop(); return; }
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 16 Delicate small golden leaves
    const leaves = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -100 - 10,
      size: Math.random() * 3 + 3,
      speedY: Math.random() * 1.2 + 0.9,
      speedX: (Math.random() - 0.5) * 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleAmp: Math.random() * 0.6 + 0.3,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.05 + 0.02,
      alpha: Math.random() * 0.3 + 0.7,
      delay: Math.random() * 25,
    }));

    // 16 Subtle golden sparkle dust particles
    const sparkles = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -60 - 10,
      size: Math.random() * 1.5 + 0.8,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * 0.06 + 0.02,
      alpha: Math.random() * 0.5 + 0.5,
      isStar: Math.random() > 0.5,
      delay: Math.random() * 30,
    }));

    let frame = 0;
    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      canvas.hidden = true;
      canvas.width = 0;
      canvas.height = 0;
    };
    const handlePreference = () => { if (motion.matches) stop(); };
    const handleVisibility = () => { if (document.hidden) stop(); };
    motion.addEventListener('change', handlePreference);
    document.addEventListener('visibilitychange', handleVisibility);
    // Release the canvas backing store after the initial celebration.
    const timer = setTimeout(stop, 2600);

    const drawLeaf = (x: number, y: number, size: number, angle: number, flip: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const scaleX = Math.cos(flip);
      ctx.scale(Math.abs(scaleX) < 0.15 ? 0.15 : scaleX, 1);

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.6, -size * 0.35, size * 0.6, size * 0.35, 0, size);
      ctx.bezierCurveTo(-size * 0.6, size * 0.35, -size * 0.6, -size * 0.35, 0, -size);
      ctx.closePath();

      ctx.fillStyle = '#DFC299';
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fill();

      ctx.restore();
    };

    const drawStar = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -size * 2);
      ctx.lineTo(size * 0.5, -size * 0.5);
      ctx.lineTo(size * 2, 0);
      ctx.lineTo(size * 0.5, size * 0.5);
      ctx.lineTo(0, size * 2);
      ctx.lineTo(-size * 0.5, size * 0.5);
      ctx.lineTo(-size * 2, 0);
      ctx.lineTo(-size * 0.5, -size * 0.5);
      ctx.closePath();

      ctx.fillStyle = '#FFF3D6';
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);
      frame++;

      let hasActive = false;

      // 1. Update and Draw Delicate Falling Golden Leaves
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        if (frame > leaf.delay) {
          leaf.y += leaf.speedY;
          leaf.x += leaf.speedX + Math.sin(leaf.wobble) * leaf.wobbleAmp;
          leaf.wobble += leaf.wobbleSpeed;
          leaf.angle += leaf.angleSpeed;
          leaf.flip += leaf.flipSpeed;

          // Fade out as it reaches the lower half of screen
          if (leaf.y > height * 0.65) {
            leaf.alpha -= 0.02;
          }

          if (leaf.alpha > 0.02 && leaf.y < height) {
            hasActive = true;
            drawLeaf(leaf.x, leaf.y, leaf.size, leaf.angle, leaf.flip, leaf.alpha);
          }
        } else {
          hasActive = true;
        }
      }

      // 2. Update and Draw Subtle Golden Sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        if (frame > s.delay) {
          s.y += s.speedY;
          s.x += s.speedX;
          const currentAlpha = Math.sin(frame * s.pulse) * 0.3 + 0.6;

          if (s.y > height * 0.6) {
            s.alpha -= 0.025;
          }

          if (s.alpha > 0.02 && s.y < height) {
            hasActive = true;
            const finalAlpha = Math.max(0, Math.min(1, s.alpha * currentAlpha));
            if (s.isStar) {
              drawStar(s.x, s.y, s.size, finalAlpha);
            } else {
              ctx.beginPath();
              ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
              ctx.fillStyle = '#DFC299';
              ctx.globalAlpha = finalAlpha;
              ctx.fill();
            }
          }
        } else {
          hasActive = true;
        }
      }

      if (hasActive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        stop();
      }
    };

    render();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      motion.removeEventListener('change', handlePreference);
      document.removeEventListener('visibilitychange', handleVisibility);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      hidden
      className="fixed inset-0 pointer-events-none z-[100] w-full h-full"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, width: '100vw', height: '100vh' }}
    />
  );
}
