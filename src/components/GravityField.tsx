import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../tokens';

/**
 * Calm cosmic dust field — 120 particles drift around the hero, gently
 * attracted to the cursor. Designed to be ambient, not loud: no slingshot,
 * no trails, just soft halos that brighten when the cursor is close.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  size: number;
  baseAlpha: number;
};

const COUNT = 120;
const INFLUENCE_RADIUS = 260;
const PULL_STRENGTH = 0.05;
const DRAG = 0.965;
const RETURN_FORCE = 0.0008;
const MAX_SPEED = 2.4;

export function GravityField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -9999, y: -9999, active: false };
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          size: Math.random() * 1.4 + 0.5,
          baseAlpha: Math.random() * 0.45 + 0.18,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
      mouse.active = true;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < INFLUENCE_RADIUS * INFLUENCE_RADIUS && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / INFLUENCE_RADIUS;
            const force = PULL_STRENGTH * falloff * falloff;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.homeX - p.x) * RETURN_FORCE;
        p.vy += (p.homeY - p.y) * RETURN_FORCE;
        p.vx *= DRAG;
        p.vy *= DRAG;

        const sp2 = p.vx * p.vx + p.vy * p.vy;
        if (sp2 > MAX_SPEED * MAX_SPEED) {
          const sp = Math.sqrt(sp2);
          p.vx = (p.vx / sp) * MAX_SPEED;
          p.vy = (p.vy / sp) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        let alpha = p.baseAlpha;
        if (mouse.active) {
          const ddx = mouse.x - p.x;
          const ddy = mouse.y - p.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < INFLUENCE_RADIUS) {
            alpha = Math.min(1, p.baseAlpha + (1 - d / INFLUENCE_RADIUS) * 0.55);
          }
        }

        // Halo
        ctx.beginPath();
        ctx.fillStyle = `rgba(58,155,231,${alpha * 0.22})`;
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `rgba(251,252,255,${alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    seed();
    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      resize();
      seed();
    });
    ro.observe(canvas);

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchmove', onTouch, { passive: true });
    canvas.addEventListener('touchend', onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchend', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        mixBlendMode: 'screen',
        zIndex: 1,
      }}
    />
  );
}
