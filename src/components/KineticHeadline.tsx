import type { CSSProperties } from 'react';
import { TOKENS } from '../tokens';

type Line = {
  text: string;
  accent?: boolean;
  startDelay?: number;
  step?: number;
};

type Props = {
  lines: Line[];
  style?: CSSProperties;
};

export function KineticHeadline({ lines, style }: Props) {
  let runningDelay = 0;
  return (
    <span style={{ display: 'inline', ...style }}>
      {lines.map((line, lineIdx) => {
        const startDelay = line.startDelay ?? runningDelay;
        const step = line.step ?? 70;
        const words = line.text.split(' ');
        runningDelay = startDelay + words.length * step + 80;
        return (
          <span key={`${line.text}-${lineIdx}`} style={{ display: 'inline' }}>
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="hero-word kinetic-word"
                style={
                  {
                    '--word-delay': `${startDelay + i * step}ms`,
                    color: line.accent ? TOKENS.accent : undefined,
                    marginRight: i < words.length - 1 ? '0.25em' : 0,
                  } as CSSProperties
                }
              >
                {word}
              </span>
            ))}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}
