// ─── Site content ─────────────────────────────────────────────────────────────
// Everything that describes the apps and projects lives here, so swapping a
// placeholder for the real thing is a one-line change.
//
// Images: put files in /public (e.g. public/apps/luna/icon.png) and reference
// them without a leading slash: icon: 'apps/luna/icon.png'.

export type AppStatus = 'Available' | 'Premiering Soon' | 'In Development';

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

const LUMINIS_CHAPTERS: [string, string][] = [
  ['Ignition', 'A protostar collapses inward. Hydrogen begins to fuse — the first photon escapes the cradle.'],
  ['Main Sequence', 'Equilibrium settles. Gravity pulls, radiation pushes. A long quiet stability begins.'],
  ['Cosmic Dust', 'Drift through nebular fields. Particles cluster under weak gravity, sketching new geometries.'],
  ['Red Giant', 'The core contracts, the envelope swells. Outer layers bleed crimson into the void.'],
  ['Helium Flash', 'A sudden ignition deep in the core. The puzzle reshapes itself in a single brilliant pulse.'],
  ['The Companion', 'A binary partner enters orbit. Mutual gravity bends the path of every falling object.'],
  ['Stellar Winds', 'Mass shedding. Light pressure becomes a literal force shaping the level around you.'],
  ['Planetary Nebula', 'A glowing shell expands outward. Color, symmetry, and silence converge.'],
  ['White Dwarf', 'Density beyond intuition. Each step echoes through degenerate matter.'],
  ['Supernova', 'A constraint shatters. Energy releases. The board rearranges itself around the blast.'],
  ['Neutron Star', 'Spin and magnetism dominate. Lighthouse beams sweep across the play field.'],
  ['Singularity', 'The final chapter. Geometry inverts. The puzzle solves itself only by letting go.'],
];

export const APPS: App[] = [
  {
    id: 'luminis',
    title: 'LUMINIS',
    kind: 'Game',
    tagline: 'Celestial Harmony',
    description: 'A 12-chapter physics puzzle through stellar evolution and deep space lore. Guide light through gravity wells, binary orbits and collapsing stars.',
    status: 'Premiering Soon',
    tags: ['Physics Puzzle', 'Matter.js', 'Narrative'],
    accent: '#6C7BFF',
    privacyHref: 'luminis/privacy-policy.html',
    details: {
      eyebrow: 'LUMINIS · Deep Dive',
      heading: 'Stellar Evolution',
      itemLabel: 'Chapter',
      items: LUMINIS_CHAPTERS.map(([title, body], i) => {
        const n = i + 1;
        return {
          title,
          body,
          meta: [
            ['luminosity', `${(n * 0.42 + 1.2).toFixed(2)} L☉`],
            ['radius', `${(n * 1.8 + 0.4).toFixed(1)} R☉`],
            ['temp', `${(8000 - n * 320).toLocaleString('en-US')} K`],
            ['age', `${(n * 0.85).toFixed(2)} Gyr`],
          ],
        };
      }),
    },
  },
  {
    id: 'varden-files',
    title: 'VARDEN FILES',
    kind: 'Game',
    tagline: 'A found-phone mystery',
    description: 'An investigative thriller played entirely on a stranger’s phone. Read the messages, collect evidence, make choices and uncover what really happened.',
    status: 'Premiering Soon',
    tags: ['Investigation', 'Thriller', 'Narrative'],
    accent: '#39C5BB',
    privacyHref: 'varden-files/privacy-policy.html',
    details: {
      eyebrow: 'VARDEN FILES · Case Notes',
      heading: 'How it plays',
      itemLabel: 'Note',
      items: [
        { title: 'A phone that isn’t yours', body: 'Everything happens inside a found device — chats, photos, notes and call logs are your only leads.' },
        { title: 'Collect the evidence', body: 'Pin messages and media as evidence and connect them to build your theory of the case.' },
        { title: 'Choices that matter', body: 'Dialogue choices change who trusts you, what you learn and which ending you reach.' },
        { title: 'It talks back', body: 'Story-driven local notifications keep the case alive between sessions.' },
        { title: 'Private by design', body: 'No account, no ads, no in-app purchases. Your progress never leaves your phone.' },
      ],
    },
  },
  {
    id: 'luna',
    title: 'Luna',
    kind: 'App',
    tagline: 'Cycle tracking, kept private',
    description: 'A minimal, privacy-first menstrual cycle tracker with smart predictions and health insights.',
    status: 'Premiering Soon',
    tags: ['Health', 'Tracker', 'Privacy-first'],
    accent: '#F28AB2',
    privacyHref: 'luna/privacy-policy.html',
    details: {
      eyebrow: 'Luna · Overview',
      heading: 'What Luna does',
      itemLabel: 'Feature',
      items: [
        { title: 'Smart predictions', body: 'Period and fertile-window predictions that adapt to your own cycle history.' },
        { title: 'Daily log in seconds', body: 'Symptoms, mood and notes with a calm, minimal interface.' },
        { title: 'Health insights', body: 'Spot patterns across cycles with clear, readable summaries.' },
        { title: 'Your data stays yours', body: 'Privacy-first by default — see the privacy policy for exactly what is stored and where.' },
      ],
    },
  },
  {
    id: 'offline',
    title: 'OFFLINE',
    kind: 'App',
    tagline: 'Digital detox companion',
    description: 'Track screen-free time, set goals, and build healthier habits — one quiet hour at a time.',
    status: 'In Development',
    tags: ['Wellness', 'Habits', 'Minimalist'],
    accent: '#F5B85B',
    details: {
      eyebrow: 'OFFLINE · Overview',
      heading: 'Planned features',
      itemLabel: 'Feature',
      items: [
        { title: 'Screen-free sessions', body: 'Start a session, put the phone down, and let the time add up.' },
        { title: 'Goals & streaks', body: 'Set daily targets and build streaks that reward consistency, not perfection.' },
        { title: 'Gentle insights', body: 'See when you reach for your phone most — without guilt or nagging.' },
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
