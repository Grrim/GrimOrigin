import { useEffect, useMemo, useRef, useState } from 'react';
import { TOKENS, TYPE } from '../tokens';

type Asset = {
  id: string;
  label: string;
  ticker: string;
  unit: string;
  delta: number; // pct
  series: number[];
};

const ASSETS: Asset[] = [
  {
    id: 'eth',
    label: 'Ethereum',
    ticker: 'ETH/USD',
    unit: 'USD',
    delta: 2.84,
    series: [
      2980, 3010, 2995, 3060, 3120, 3080, 3145, 3210, 3180, 3260, 3220, 3300,
      3340, 3290, 3370, 3420, 3380, 3460, 3500, 3470, 3540,
    ],
  },
  {
    id: 'ag',
    label: 'Silver',
    ticker: 'XAG/oz',
    unit: 'USD/oz',
    delta: 1.12,
    series: [
      28.4, 28.6, 28.5, 28.9, 29.1, 29.0, 29.4, 29.6, 29.5, 29.8, 30.0, 29.9,
      30.2, 30.4, 30.3, 30.6, 30.8, 30.7, 31.0, 31.2, 31.1,
    ],
  },
  {
    id: 'lego',
    label: 'LEGO Index',
    ticker: 'BRICK',
    unit: 'idx',
    delta: 0.46,
    series: [
      100, 101, 102, 101, 103, 104, 103, 105, 106, 107, 106, 108, 109, 108, 110,
      111, 112, 111, 113, 114, 115,
    ],
  },
];

/** Catmull-Rom → cubic Bezier smoothing for a clean line. */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

const W = 720;
const H = 200;
const PAD_Y = 14;

function buildPoints(series: number[]) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const stepX = W / (series.length - 1);
  return series.map((v, i) => ({
    x: i * stepX,
    y: PAD_Y + (1 - (v - min) / range) * (H - PAD_Y * 2),
    v,
  }));
}

export function MarketSignals() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<{ x: number; y: number; v: number; i: number } | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const containerRef = useRef<SVGSVGElement>(null);
  const asset = ASSETS[active];

  const points = useMemo(() => buildPoints(asset.series), [asset]);
  const linePath = useMemo(() => smoothPath(points), [points]);
  const areaPath = useMemo(
    () => `${linePath} L${W},${H} L0,${H} Z`,
    [linePath]
  );

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    setLength(path.getTotalLength());
  }, [linePath]);

  const last = asset.series[asset.series.length - 1];
  const lastPoint = points[points.length - 1];
  const positiveDelta = asset.delta >= 0;

  // Crosshair hover
  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = containerRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    // nearest point
    const idx = Math.max(
      0,
      Math.min(points.length - 1, Math.round(x / (W / (points.length - 1))))
    );
    const p = points[idx];
    setHover({ x: p.x, y: p.y, v: p.v, i: idx });
  };
  const onLeave = () => setHover(null);

  return (
    <div
      style={{
        background: 'rgba(13,13,13,0.80)',
        border: `1px solid ${TOKENS.borderSoft}`,
        borderRadius: '24px',
        padding: 'clamp(24px,1.8vw+16px,36px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      {/* Soft accent wash */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 80% 0%, rgba(58,155,231,0.08) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              aria-hidden
              style={{
                position: 'relative',
                width: '7px',
                height: '7px',
                display: 'inline-flex',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: TOKENS.accent,
                  animation: 'signal-ring 2.4s ease-out infinite',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: TOKENS.accent,
                  boxShadow: `0 0 8px ${TOKENS.accent}`,
                }}
              />
            </span>
            <span
              style={{
                ...TYPE.eyebrow,
                ...TYPE.mono,
                color: TOKENS.textMute,
                fontSize: '10px',
                letterSpacing: '0.18em',
              }}
            >
              LIVE · {asset.ticker}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                ...TYPE.mono,
                fontSize: 'clamp(28px,2.5vw+18px,42px)',
                fontWeight: 600,
                color: TOKENS.textHigh,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {(hover ? hover.v : last).toLocaleString(undefined, {
                minimumFractionDigits: asset.id === 'eth' ? 0 : 2,
                maximumFractionDigits: asset.id === 'eth' ? 0 : 2,
              })}
            </span>
            <span
              style={{
                ...TYPE.mono,
                fontSize: '12px',
                color: TOKENS.textDim,
                letterSpacing: '0.08em',
              }}
            >
              {asset.unit}
            </span>
            <DeltaBadge value={asset.delta} positive={positiveDelta} />
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Asset selector"
          style={{
            display: 'flex',
            gap: '4px',
            padding: '4px',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.40)',
            border: `1px solid ${TOKENS.borderSoft}`,
          }}
        >
          {ASSETS.map((a, i) => {
            const isActive = i === active;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                style={{
                  background: isActive ? TOKENS.accentSoft : 'transparent',
                  border: 'none',
                  color: isActive ? TOKENS.textHigh : TOKENS.textMute,
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  ...TYPE.mono,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  transition: `color 250ms ${TOKENS.ease}, background 250ms ${TOKENS.ease}`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = TOKENS.textHigh;
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = TOKENS.textMute;
                }}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative' }}>
        <svg
          ref={containerRef}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: 'clamp(180px, 22vw, 240px)',
            display: 'block',
            cursor: 'crosshair',
          }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          aria-label={`${asset.label} price chart`}
        >
          <defs>
            <linearGradient id={`grad-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={TOKENS.accent} stopOpacity="0.30" />
              <stop offset="60%" stopColor={TOKENS.accent} stopOpacity="0.06" />
              <stop offset="100%" stopColor={TOKENS.accent} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`stroke-${asset.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={TOKENS.accent} stopOpacity="0.7" />
              <stop offset="100%" stopColor={TOKENS.accent} stopOpacity="1" />
            </linearGradient>
            <filter id={`glow-${asset.id}`} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle horizontal grid */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={H * g}
              y2={H * g}
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Area */}
          <path
            key={`area-${asset.id}`}
            d={areaPath}
            fill={`url(#grad-${asset.id})`}
            style={{ animation: `chart-fade 600ms ${TOKENS.easeOutExpo} both` }}
          />

          {/* Smooth line */}
          <path
            key={`line-${asset.id}`}
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke={`url(#stroke-${asset.id})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${asset.id})`}
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: length || 1000,
              strokeDashoffset: length || 1000,
              animation: `draw-line 1100ms ${TOKENS.easeOutExpo} forwards`,
            }}
          />

          {/* Endpoint */}
          <g>
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="7"
              fill={TOKENS.accent}
              opacity="0.20"
              style={{ animation: 'signal-ring 2.4s ease-out infinite' }}
            />
            <circle cx={lastPoint.x} cy={lastPoint.y} r="2.5" fill={TOKENS.accent} />
          </g>

          {/* Crosshair */}
          {hover && (
            <g style={{ animation: `chart-fade 200ms ${TOKENS.ease} both` }}>
              <line
                x1={hover.x}
                x2={hover.x}
                y1={0}
                y2={H}
                stroke={TOKENS.accent}
                strokeOpacity="0.30"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={hover.x}
                cy={hover.y}
                r="6"
                fill="rgba(58,155,231,0.18)"
              />
              <circle cx={hover.x} cy={hover.y} r="3" fill={TOKENS.textHigh} />
              <circle
                cx={hover.x}
                cy={hover.y}
                r="3"
                fill="none"
                stroke={TOKENS.accent}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Footer stats */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 1.5vw, 24px)',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: `1px solid ${TOKENS.borderSoft}`,
        }}
      >
        <Stat label="LAST" value={last.toLocaleString()} unit={asset.unit} accent />
        <Stat
          label="HIGH"
          value={Math.max(...asset.series).toLocaleString()}
          unit={asset.unit}
        />
        <Stat
          label="LOW"
          value={Math.min(...asset.series).toLocaleString()}
          unit={asset.unit}
        />
        <Stat label="RANGE" value="21d" unit="window" />
      </div>
    </div>
  );
}

function DeltaBadge({ value, positive }: { value: number; positive: boolean }) {
  return (
    <span
      style={{
        ...TYPE.mono,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: positive ? TOKENS.accent : '#f87171',
        background: positive ? TOKENS.accentSoft : 'rgba(248,113,113,0.10)',
        border: `1px solid ${positive ? TOKENS.accentBorder : 'rgba(248,113,113,0.40)'}`,
        padding: '3px 8px',
        borderRadius: '999px',
      }}
    >
      <span aria-hidden style={{ fontSize: '8px' }}>
        {positive ? '▲' : '▼'}
      </span>
      {positive ? '+' : ''}
      {value.toFixed(2)}%
    </span>
  );
}

function Stat({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          ...TYPE.mono,
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: TOKENS.textDim,
          marginBottom: '6px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          ...TYPE.mono,
          fontSize: '14px',
          fontWeight: 600,
          color: accent ? TOKENS.accent : TOKENS.textHigh,
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          ...TYPE.mono,
          fontSize: '9px',
          color: TOKENS.textDim,
          letterSpacing: '0.10em',
          marginTop: '2px',
        }}
      >
        {unit}
      </div>
    </div>
  );
}
