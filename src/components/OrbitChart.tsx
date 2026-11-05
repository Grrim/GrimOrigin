import type { App } from '../content';

const C = 300; // centre of the 600×600 viewBox
const RADII = [96, 150, 204, 258];
const START_ANGLES = [-30, 115, 220, 330];
const DURATIONS = [38, 56, 80, 110]; // seconds per revolution

const toRoman = (n: number) => ['I', 'II', 'III', 'IV', 'V', 'VI'][n] ?? String(n + 1);

/**
 * Star-chart style diagram: every title is a body orbiting the "origin".
 * Pure SVG; orbits rotate via CSS (disabled for reduced motion).
 */
export function OrbitChart({ apps }: { apps: App[] }) {
  const bodies = apps.slice(0, RADII.length);
  return (
    <figure className="orbit">
      <svg viewBox="0 0 600 600" role="img" aria-label={`Chart: ${bodies.map((a) => a.title).join(', ')} orbiting the origin`}>
        {/* Degree ticks */}
        <g className="orbit-ticks">
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i * 5 * Math.PI) / 180;
            const long = i % 6 === 0;
            const r1 = 286;
            const r2 = long ? 274 : 280;
            return <line key={i} x1={C + r1 * Math.cos(a)} y1={C + r1 * Math.sin(a)} x2={C + r2 * Math.cos(a)} y2={C + r2 * Math.sin(a)} />;
          })}
        </g>
        {/* Crosshair */}
        <g className="orbit-cross">
          <line x1={C} y1={8} x2={C} y2={592} />
          <line x1={8} y1={C} x2={592} y2={C} />
        </g>
        {/* Orbits + bodies */}
        {bodies.map((app, i) => (
          <g key={app.id}>
            <circle className="orbit-ring" cx={C} cy={C} r={RADII[i]} />
            <g className="orbit-spin" style={{ ['--start' as never]: `${START_ANGLES[i]}deg`, animationDuration: `${DURATIONS[i]}s` }}>
              <circle cx={C + RADII[i]} cy={C} r={14} fill={app.accent} opacity={0.18} />
              <circle cx={C + RADII[i]} cy={C} r={5.5} fill={app.accent} />
              {/* Counter-rotates so the numeral stays upright */}
              <text x={C + RADII[i] + 14} y={C - 12} className="orbit-label" style={{ ['--start' as never]: `${START_ANGLES[i]}deg`, animationDuration: `${DURATIONS[i]}s` }}>{toRoman(i)}</text>
            </g>
          </g>
        ))}
        {/* Origin */}
        <circle cx={C} cy={C} r={34} className="origin-glow" />
        <circle cx={C} cy={C} r={7} className="origin-core" />
      </svg>
      <figcaption>
        <span>Fig. 0 — The origin</span>
        <ol>
          {bodies.map((app, i) => (
            <li key={app.id}><span aria-hidden className="orbit-dot" style={{ background: app.accent }} />{toRoman(i)} · {app.title}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
