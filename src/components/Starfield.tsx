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
    s = (s * 48271) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STAR_COUNT = 22;

export function Starfield() {
  const stars = useMemo(() => {
    const rng = seededRandom(137);
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: rng() * 94 + 3,
      y: rng() * 94 + 3,
      size: rng() * 1.2 + 1, // 1–2.2px core
      halo: rng() * 8 + 6, // 6–14px glow
      opacity: rng() * 0.25 + 0.1, // 0.10–0.35
      delay: rng() * 10,
      duration: rng() * 5 + 5, // 5–10s twinkle
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
              background: 'radial-gradient(circle, rgba(58,155,231,0.2) 0%, transparent 70%)',
            }}
          />
          {/* Bright core */}
          <span
            style={{
              position: 'relative',
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.85)',
              boxShadow: '0 0 2px rgba(255,255,255,0.5)',
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
