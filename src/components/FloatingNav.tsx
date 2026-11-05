import { useEffect, useState } from 'react';
import { smoothScrollTo } from '../hooks/useLenis';
import { useLocalTime } from '../hooks/useLocalTime';

export type NavSection = { id: string; label: string };

type Props = {
  sections: NavSection[];
  /** id of the section currently in view ('' for the hero). */
  active: string;
};

/** Fixed top bar: wordmark, numbered section links, local time and a contact CTA. */
export function FloatingNav({ sections, active }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const time = useLocalTime();
  const links = sections.filter((s) => s.id !== 'contact');
  const activeLabel = sections.find((s) => s.id === active)?.label ?? 'Home';

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
    <nav aria-label="Primary" className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-nav-inner">
        <button type="button" onClick={() => smoothScrollTo('hero')} aria-label="Grim Origin — back to top" className="nav-brand">
          <span aria-hidden className="pulse-dot" />
          Grim Origin
        </button>

        <ul className="nav-links">
          {links.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => smoothScrollTo(s.id)} className="nav-link" aria-current={active === s.id ? 'true' : undefined}>
                <span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <span className="nav-mobile-label">{active === 'contact' ? '' : activeLabel}</span>

        <span className="nav-time">PL {time}</span>

        <button type="button" onClick={() => smoothScrollTo('contact')} className="btn btn-primary btn-sm" aria-current={active === 'contact' ? 'true' : undefined}>
          Contact
        </button>
      </div>
      <span aria-hidden className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}
