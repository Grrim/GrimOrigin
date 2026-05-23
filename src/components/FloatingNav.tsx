import { useEffect, useRef, useState } from 'react';
import { TOKENS, TYPE } from '../tokens';
import { useMagnetic } from '../hooks/useSpotlight';
import { smoothScrollTo } from '../hooks/useLenis';

type Props = {
  links: string[];
  active: string;
};

export function FloatingNav({ links, active }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | null = null;
    const update = () => {
      raf = null;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        transition: `top 500ms ${TOKENS.ease}, opacity 400ms ${TOKENS.ease}`,
        width: 'min(1200px, calc(100vw - 32px))',
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '12px 14px 12px 24px',
          borderRadius: '999px',
          background: scrolled ? 'rgba(10,10,14,0.85)' : 'rgba(10,10,14,0.60)',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: scrolled
            ? '0 4px 24px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 2px 12px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.03)',
          transition: `padding 400ms ${TOKENS.ease}, background 400ms ${TOKENS.ease}, border-color 400ms ${TOKENS.ease}, box-shadow 400ms ${TOKENS.ease}`,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {/* Brand */}
        <button
          onClick={() => smoothScrollTo('hero')}
          aria-label="Grim Origin — Home"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 12px 6px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <span
            aria-hidden
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: TOKENS.accent,
              boxShadow: `0 0 8px ${TOKENS.accent}`,
            }}
          />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: TOKENS.textMute,
              textTransform: 'uppercase',
            }}
          >
            Grim<span style={{ color: TOKENS.accent }}>Origin</span>
          </span>
        </button>

        {/* Separator */}
        <span
          aria-hidden
          style={{
            width: '1px',
            height: '16px',
            background: 'rgba(255,255,255,0.10)',
            flexShrink: 0,
          }}
        />

        {/* Center links */}
        <div
          className="hidden md:flex items-center"
          style={{ flex: 1, justifyContent: 'center', gap: '32px' }}
        >
          {links.map((link) => (
            <NavLink
              key={link}
              label={link}
              active={active === link}
              onClick={() => smoothScrollTo(link.toLowerCase())}
            />
          ))}
        </div>

        {/* Mobile: active section label */}
        <span
          className="md:hidden"
          style={{
            ...TYPE.mono,
            flex: 1,
            textAlign: 'center',
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: TOKENS.textMute,
          }}
        >
          {active || 'Home'}
        </span>

        {/* CTA pill */}
        <button
          onClick={() => smoothScrollTo('contact')}
          className="glow-btn"
          style={{
            ...TYPE.mono,
            fontSize: '12px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#0E0E12',
            background: TOKENS.accent,
            border: 'none',
            borderRadius: '999px',
            padding: '10px 18px',
            cursor: 'pointer',
            flexShrink: 0,
            transition: `transform 220ms ${TOKENS.ease}, box-shadow 300ms ${TOKENS.ease}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${TOKENS.accent}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          Contact
        </button>

        {/* Scroll progress */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: '16px',
            right: '16px',
            bottom: '0',
            height: '1px',
            pointerEvents: 'none',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              display: 'block',
              height: '100%',
              width: `${(progress * 100).toFixed(1)}%`,
              background: TOKENS.accent,
              boxShadow: `0 0 6px ${TOKENS.accent}`,
              transition: 'width 80ms linear',
              borderRadius: '999px',
            }}
          />
        </span>
      </div>
    </nav>
  );
}

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref, 0.25, 5);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="magnet-link"
      style={{
        background: active ? 'rgba(58,155,231,0.12)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        ...TYPE.mono,
        fontSize: '12px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
        color: active ? TOKENS.textHigh : TOKENS.textMute,
        padding: '10px 36px',
        borderRadius: '999px',
        transition: `color 250ms ${TOKENS.ease}, background 250ms ${TOKENS.ease}`,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = TOKENS.textHigh;
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = TOKENS.textMute;
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }
      }}
    >
      {label}
    </button>
  );
}
