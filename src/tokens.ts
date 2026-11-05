
export const TOKENS = {
  accent: '#3A9BE7',
  accentSoft: 'rgba(58,155,231,0.10)',
  accentBorder: 'rgba(58,155,231,0.40)',
  accentGlow: '0 12px 48px rgba(58,155,231,0.12)',
  surface: 'rgba(33,34,37,0.72)',
  surfaceAlt: 'rgba(22,23,26,0.88)',
  surfaceDeep: 'rgba(14,14,18,0.96)',
  divider: 'rgba(255,255,255,0.06)',
  borderSoft: 'rgba(255,255,255,0.08)',
  textMute: 'rgba(251,252,255,0.7)',
  textDim: 'rgba(251,252,255,0.45)',
  textHigh: '#FBFCFF',
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
    fontFamily:
      "'Porsche Next', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  } as const,
  mono: {
    fontFamily:
      "ui-monospace, 'SF Mono', Menlo, Monaco, 'Cascadia Mono', 'Roboto Mono', monospace",
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
