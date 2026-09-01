'use client';

import React, { useEffect, useRef } from 'react';

export default function GoldPopperSprinkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 20 Delicate small golden leaves
    const leaves = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -120 - 10,
      size: Math.random() * 3 + 3.5, // Small & delicate (3.5px - 6.5px)
      speedY: Math.random() * 1.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleAmp: Math.random() * 0.7 + 0.3,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.05 + 0.02,
      alpha: Math.random() * 0.3 + 0.7,
      delay: Math.random() * 30, // Staggered drop
    }));

    // 20 Subtle golden sparkle dust particles
    const sparkles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -80 - 10,
      size: Math.random() * 1.6 + 0.8,
      speedY: Math.random() * 0.9 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * 0.06 + 0.02,
      alpha: Math.random() * 0.5 + 0.5,
      isStar: Math.random() > 0.5,
      delay: Math.random() * 40,
    }));

    let frame = 0;
    let isRunning = true;

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
          if (leaf.y > height * 0.75) {
            leaf.alpha -= 0.015;
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

          if (s.y > height * 0.7) {
            s.alpha -= 0.02;
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
        isRunning = false;
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] w-full h-full"
    />
  );
}
