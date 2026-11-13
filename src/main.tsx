import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { reducedMotion } from './motion';
import '../index.css';

const root = document.documentElement;
root.classList.remove('light', 'dark', 'auto');
root.classList.add('dark');
root.dataset.world = 'origin';
// Hidden start states for scroll reveals only apply when we will animate them in.
if (!reducedMotion()) root.classList.add('motion');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
