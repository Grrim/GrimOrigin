/**
 * Subtle ambient auroras — only visible if you're looking for them.
 * Single soft blue blob top-left, single indigo bottom-right, both ~5% opacity.
 */
export function Auroras() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />

      <style>{`
        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(160px);
          will-change: transform;
        }
        .aurora-a {
          width: 60vw;
          height: 60vw;
          top: -20%;
          left: -20%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(58, 155, 231, 0.06) 0%,
            transparent 65%
          );
          animation: aurora-drift-a 42s ease-in-out infinite alternate;
        }
        .aurora-b {
          width: 50vw;
          height: 50vw;
          bottom: -20%;
          right: -15%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(99, 102, 241, 0.05) 0%,
            transparent 65%
          );
          animation: aurora-drift-b 50s ease-in-out infinite alternate;
        }
        @keyframes aurora-drift-a {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(6vw, 4vh, 0) scale(1.06); }
        }
        @keyframes aurora-drift-b {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-5vw, -3vh, 0) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
