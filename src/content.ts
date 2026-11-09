// ─── Site content ─────────────────────────────────────────────────────────────
// Everything that describes the apps and projects lives here, so swapping a
// placeholder for the real thing is a one-line change.
//
// Images: put files in /public (e.g. public/apps/luna/icon.png) and reference
// them without a leading slash: icon: 'apps/luna/icon.png'.

export type AppStatus = 'Available' | 'Closed Testing' | 'Premiering Soon' | 'In Development';

export type DetailItem = {
  title: string;
  body: string;
  /** Optional key/value readouts shown under the body. */
  meta?: [label: string, value: string][];
};

export type App = {
  id: string;
  title: string;
  kind: 'Game' | 'App';
  tagline: string;
  description: string;
  status: AppStatus;
  tags: string[];
  /** Accent colour used for the icon, phone mockup and glow. */
  accent: string;
  /** App icon (square). Falls back to a gradient tile with the first letter. */
  icon?: string;
  /** Portrait screenshots, ~9:19.5. Falls back to a themed placeholder screen. */
  screenshots?: string[];
  links?: { googlePlay?: string; appStore?: string };
  privacyHref?: string;
  details: { eyebrow: string; heading: string; itemLabel: string; items: DetailItem[] };
};

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
};

// Text below mirrors the Google Play store listings (Play Console, Nov 2026).
// All three titles are currently in closed testing on Google Play.

const shots = (id: string, n = 4) => Array.from({ length: n }, (_, i) => `apps/${id}/shot-${i + 1}.webp`);

export const APPS: App[] = [
  {
    id: 'luminis',
    title: 'LUMINIS',
    kind: 'Game',
    tagline: 'Celestial Harmony',
    description: 'Draw beams of light and guide falling stars home. A calm cosmic puzzle: swipe to draw glowing lines and bounce every star into the receptor of its colour — 120 hand-crafted levels across 12 zodiac chapters.',
    status: 'Closed Testing',
    tags: ['Puzzle', 'Physics', 'Relaxing'],
    accent: '#6C7BFF',
    icon: 'apps/luminis/icon.webp',
    screenshots: shots('luminis'),
    privacyHref: 'luminis/privacy-policy.html',
    details: {
      eyebrow: 'LUMINIS · Store listing',
      heading: 'Draw light. Guide the stars.',
      itemLabel: 'Feature',
      items: [
        { title: 'A journey through the zodiac', body: '120 hand-crafted levels across 12 chapters. Each chapter awakens a new constellation — from Aries to Pisces — and reveals a new verse of an ancient, poetic story.', meta: [['levels', '120'], ['chapters', '12']] },
        { title: 'Master cosmic forces', body: 'Moving light rails, vortexes, pulsars, repulsors, splitters, nebula clouds, cosmic wind and even reversed gravity. Every chapter brings something new to outsmart.' },
        { title: 'Resonance combos', body: 'Sort stars in a row without mistakes to build Resonance combos and multiply your essence. Earn up to three stars on every level.' },
        { title: 'Meet Ognik', body: 'A friendly little spirit guides you through the journey, cheers you on and shares the secrets of the universe.' },
        { title: 'Celestial powers', body: 'Unlock six abilities as you progress — Stasis, Lift, Magnet, Shield, Chrono and Nova — and choose cosmic relics before each level.' },
        { title: 'More ways to play', body: 'Endless Void to play at your own pace, a Daily Ritual challenge every day and a new Event Horizon challenge every week.' },
        { title: 'Make it yours', body: 'Collect stardust and unlock new light colours, Ognik variants and visual themes.' },
        { title: 'Calm by design', body: 'A soothing synthesized soundscape that reacts to your moves. Works fully offline, with high-contrast mode and adjustable haptics.', meta: [['ads', 'none'], ['in-app purchases', 'none'], ['languages', 'EN · PL · DE · FR · IT']] },
      ],
    },
  },
  {
    id: 'varden-files',
    title: 'VARDEN FILES',
    kind: 'Game',
    tagline: 'Found phones. Missing owners.',
    description: 'An investigative found-phone thriller series set in the corrupt city of Varden. No cutscenes, no narrator — only a stranger’s messages, photos, notes, emails, voicemails and browser history. Unlock them, read everything, find the truth.',
    status: 'Closed Testing',
    tags: ['Investigation', 'Thriller', 'Narrative'],
    accent: '#39C5BB',
    icon: 'apps/varden-files/icon.webp',
    screenshots: shots('varden-files'),
    privacyHref: 'varden-files/privacy-policy.html',
    details: {
      eyebrow: 'VARDEN FILES · Evidence locker',
      heading: 'How it plays',
      itemLabel: 'Note',
      items: [
        { title: 'Case #01: Her Phone', body: 'Nina Kessler, a 28-year-old media analyst, vanishes near Greywood Forest. Her phone was active 7 minutes ago.' },
        { title: 'Case #02: The Last Shift', body: 'A paramedic’s phone left in locker 14 after a night that went wrong. A state witness, a missing briefcase, and a doctor who knows too much.' },
        { title: 'More cases coming', body: 'Four more devices are already secured in the evidence locker — new cases arrive in free updates.' },
        { title: 'A phone that feels real', body: 'Thirteen working apps: messages, gallery with photo metadata, notes, files, browser with private mode, email, maps, voice recorder, calendar, contacts, call log and more. Clues hide between apps.' },
        { title: 'Your choices matter', body: 'Reply to the people texting the owner, attach evidence to your chats or type answers yourself. Earn or lose trust. Multiple endings per case, plus New Game+.' },
        { title: 'Real puzzles', body: 'Crack PINs from details the owner left behind, recover deleted emails from fragments, match voices on recordings and reconstruct routes on the map.' },
        { title: 'Fair and offline-friendly', body: 'Completely free. No ads, no in-app purchases, no account and no personal data collected. Progress is saved so you can continue a case anytime.', meta: [['languages', 'PL · EN'], ['recommended', '16+']] },
      ],
    },
  },
  {
    id: 'luna',
    title: 'Luna',
    kind: 'App',
    tagline: 'Private cycle & ovulation calendar',
    description: 'A calm, medically responsible and 100% private space to track your cycle, ovulation phases and wellbeing. Fully offline — no sign-in, no ads.',
    status: 'Closed Testing',
    tags: ['Health', 'Cycle tracker', 'Privacy-first'],
    accent: '#F28AB2',
    icon: 'apps/luna/icon.webp',
    screenshots: shots('luna'),
    privacyHref: 'luna/privacy-policy.html',
    details: {
      eyebrow: 'Luna · Overview',
      heading: 'What Luna does',
      itemLabel: 'Feature',
      items: [
        { title: 'Truly offline', body: 'Luna has no INTERNET permission — it physically cannot send your data anywhere. No sign-in, no accounts, no cloud; Android cloud backup is disabled by default.' },
        { title: 'AES-256 encryption', body: 'The local database is fully encrypted with AES-256 (SQLCipher), with the key held in the hardware-backed Android Keystore.' },
        { title: 'Biometric lock', body: 'Instant fingerprint or face unlock, plus a discreet mode for public places.' },
        { title: 'FIGO 2018 predictions', body: 'The prediction engine follows the cycle norms recommended by the International Federation of Gynecology and Obstetrics (FIGO 2018).' },
        { title: 'Honest confidence score', body: 'Luna tells you how much each prediction relies on your own history versus general norms, and turns off fertile-window estimates for hormonal methods that suppress ovulation.' },
        { title: 'Calm by design', body: 'Soft-minimalist design with a cycle ring, a biorhythm wave in insights and 200+ rotating wellness tips. Zero ads, zero subscriptions, zero notification spam.' },
        { title: 'Important', body: 'Luna is for cycle self-observation and wellness education only. It is not a medical device, does not diagnose, and must not be used as contraception.' },
      ],
    },
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Grim History',
    category: 'Media Channel',
    description: 'Exploring historical anomalies, medieval mysteries, and dark history through engaging short-form video content.',
    tags: ['YouTube', 'Storytelling', 'Research'],
    // TODO: add the channel URL, e.g. href: 'https://www.youtube.com/@…', linkLabel: 'Watch on YouTube'
  },
  {
    title: 'Astrophysics Simulations',
    category: 'Interactive Lab',
    description: 'Web-based 2D/3D interactive simulations focusing on stellar dynamics, thermodynamics, and black hole behaviors.',
    tags: ['TypeScript', 'WebGL', 'Physics'],
    // TODO: add a demo URL, e.g. href: 'https://…', linkLabel: 'Open the lab'
  },
];

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
