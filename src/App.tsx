import { useCallback, useEffect, useState } from 'react';
import { CosmosCanvas } from './components/CosmosCanvas';
import { Nav } from './components/Nav';
import { Cursor } from './components/ui';
import { LegalModal } from './components/Legal';
import { Hero } from './sections/Opening';
import { Games, News, Press } from './sections/Catalogue';
import { Luminis } from './sections/Luminis';
import { Varden } from './sections/Varden';
import { Luna } from './sections/Luna';
import { Contact, Footer, Studio } from './sections/Closing';
import { useReveals } from './hooks/useReveals';
import { lockScroll, startSmoothScroll } from './motion';

export default function App() {
  const [legal, setLegal] = useState<'privacy' | 'terms' | null>(null);
  const closeLegal = useCallback(() => setLegal(null), []);

  useEffect(() => startSmoothScroll(), []);
  useEffect(() => { lockScroll(legal !== null); }, [legal]);
  useReveals();

  return (
    <div className="site">
      <div aria-hidden className="backdrop" />
      <CosmosCanvas />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Games />
        <News />
        <Luminis />
        <Varden />
        <Luna />
        <Studio />
        <Press />
        <Contact />
      </main>
      <Footer onLegal={setLegal} />
      <LegalModal kind={legal} onClose={closeLegal} />
    </div>
  );
}
