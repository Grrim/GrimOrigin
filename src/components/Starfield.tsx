import { useMemo } from 'react';

/**
 * Starfield that scrolls with the page (not fixed).
 * Fewer stars (30), bigger with soft glow halos, scattered across
 * the full page height. Feels like distant stars in deep space,
 * not dust on a screen.
 */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STAR_COUNT = 30;

export function Starfield() {
  const stars = useMemo(() => {
    const rng = seededRandom(42);
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 2 + 1.5, // 1.5–3.5px core
      halo: rng() * 12 + 8, // 8–20px glow
      opacity: rng() * 0.35 + 0.15, // 0.15–0.50
      delay: rng() * 8,
      duration: rng() * 4 + 4, // 4–8s twinkle
    }));
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.halo}px`,
            height: `${star.halo}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: `star-twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        >
          {/* Soft glow halo */}
          <span
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(58,155,231,0.3) 0%, transparent 70%)',
            }}
          />
          {/* Bright core */}
          <span
            style={{
              position: 'relative',
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              boxShadow: '0 0 3px rgba(255,255,255,0.6)',
            }}
          />
        </span>
      ))}

      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
