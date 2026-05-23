import { useRef } from 'react';
import { PHeading, PText, PIcon } from '@porsche-design-system/components-react';
import { TOKENS, TYPE, type StackIcon } from '../tokens';
import { useSpotlight } from '../hooks/useSpotlight';

type Props = {
  icon: StackIcon;
  title: string;
  description?: string;
  tags?: string[];
  /** Tailwind className for grid placement (e.g. "lg:col-span-2 lg:row-span-2"). */
  className?: string;
  /** Optional accent — first card in a bento grid gets emphasis. */
  feature?: boolean;
  /** Eyebrow telemetry label, shown above the icon (e.g. "01 / Mobile"). */
  eyebrow?: string;
};

export function BentoCard({
  icon,
  title,
  description,
  tags,
  className,
  feature = false,
  eyebrow,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useSpotlight(ref);

  return (
    <div
      ref={ref}
      className={`reveal beam-card ${className ?? ''}`}
      style={{
        padding: feature
          ? 'clamp(28px, 2.5vw + 18px, 48px)'
          : 'clamp(24px, 2vw + 16px, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: feature ? '20px' : '16px',
        minHeight: feature
          ? 'clamp(280px, 22vw, 360px)'
          : 'clamp(200px, 16vw, 260px)',
      }}
    >
      {/* Subtle thematic wash for featured tile */}
      {feature && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 0% 0%, rgba(58,155,231,0.08) 0%, transparent 55%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <PIcon
          name={icon}
          size={feature ? 'large' : 'medium'}
          color="inherit"
          theme="dark"
          style={{ color: TOKENS.accent }}
        />
        {eyebrow && (
          <span
            style={{
              ...TYPE.mono,
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: TOKENS.textDim,
            }}
          >
            {eyebrow}
          </span>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <PHeading
          size={feature ? 'large' : 'medium'}
          tag="h3"
          theme="dark"
          style={{
            marginBottom: '10px',
            lineHeight: 1.18,
            letterSpacing: feature ? '-0.015em' : '-0.005em',
          }}
        >
          {title}
        </PHeading>
        {description && (
          <PText
            size="small"
            color="contrast-medium"
            theme="dark"
            style={{ lineHeight: 1.75 }}
          >
            {description}
          </PText>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                ...TYPE.mono,
                fontSize: '10px',
                letterSpacing: '0.10em',
                color: TOKENS.textMute,
                border: `1px solid ${TOKENS.borderSoft}`,
                borderRadius: '4px',
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.30)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
