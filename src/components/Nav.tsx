import { useEffect, useState } from 'react';
import { WORLDS, WORLD_ORDER } from '../content';
import { scrollToId } from '../motion';

const LINKS: [string, string][] = [['games', 'Games'], ['news', 'News'], ['studio', 'Studio'], ['press', 'Press']];

/** Studio header + a side index of the three games that lights up the one you're in. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [world, setWorld] = useState('origin');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const mo = new MutationObserver(() => setWorld(document.documentElement.dataset.world ?? 'origin'));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-world'] });
    return () => { window.removeEventListener('scroll', onScroll); mo.disconnect(); };
  }, []);

  const go = (id: string) => { setOpen(false); scrollToId(id); };
  const inHero = !scrolled;

  return (
    <>
      <a href="#games" className="skip-link">Skip to the games</a>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <button type="button" className="nav-logo" onClick={() => go('top')} aria-label="Grim Origin, back to top">
          <span aria-hidden className="nav-mark">GO<span className="nav-mark-dot" /></span>
          <span className="nav-name">Grim Origin</span>
        </button>
        <nav aria-label="Main" className="nav-links">
          {LINKS.map(([id, label]) => <button key={id} type="button" onClick={() => go(id)}>{label}</button>)}
          <button type="button" className="nav-cta" onClick={() => go('contact')}>Contact</button>
        </nav>
        <button type="button" className="nav-burger" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">Menu</span><span aria-hidden /><span aria-hidden />
        </button>
      </header>
      <div id="nav-sheet" className={`nav-sheet ${open ? 'is-open' : ''}`} hidden={!open}>
        {[...LINKS, ['contact', 'Contact'] as [string, string]].map(([id, label]) => (
          <button key={id} type="button" onClick={() => go(id)}>{label}</button>
        ))}
      </div>

      <nav aria-label="Games index" className={`world-index ${inHero ? 'is-hidden' : ''}`}>
        {WORLD_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className={`world-index-item is-${id} ${world === id ? 'is-active' : ''}`}
            aria-current={world === id ? 'true' : undefined}
          >
            <span className="world-index-no">{WORLDS[id].numeral}</span>
            <span className="world-index-name">{WORLDS[id].title}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
