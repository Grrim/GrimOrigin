
export const TOKENS = {
  accent: '#FF5B24',
  accentSoft: 'rgba(255,91,36,0.10)',
  accentBorder: 'rgba(255,91,36,0.40)',
  accentGlow: '0 12px 48px rgba(255,91,36,0.12)',
  surface: 'rgba(33,34,37,0.72)',
  surfaceAlt: 'rgba(22,23,26,0.88)',
  surfaceDeep: 'rgba(14,13,11,0.97)',
  divider: 'rgba(236,230,216,0.08)',
  borderSoft: 'rgba(236,230,216,0.12)',
  textMute: 'rgba(236,230,216,0.68)',
  textDim: 'rgba(236,230,216,0.42)',
  textHigh: '#ECE6D8',
  ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  duration: '300ms',
  durationLong: '600ms',
  sectionPad: 'clamp(80px, 8vw + 40px, 200px)',
  gutter: 'clamp(20px, 3vw + 12px, 80px)',
  containerMax: '1440px',
} as const;

export const TYPE = {
  sans: {
    fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif",
  } as const,
  display: {
    fontFamily: "'Archivo', 'Arial Narrow', ui-sans-serif, sans-serif",
    fontStretch: '62%',
    textTransform: 'uppercase' as const,
  } as const,
  serif: {
    fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif",
    fontStyle: 'italic',
    fontWeight: 400,
  } as const,
  mono: {
    fontFamily: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  } as const,
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
  },
  spaceLg: 'clamp(20px, 1.5vw + 16px, 40px)',
  spaceXl: 'clamp(48px, 4vw + 32px, 96px)',
};

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** '#RRGGBB' + alpha → 'rgba(r,g,b,a)' */
export function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
