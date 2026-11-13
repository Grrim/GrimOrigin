// ─── Site content ─────────────────────────────────────────────────────────────
// Everything that describes the studio and its games lives here.
// Images live in /public and are referenced without a leading slash
// (e.g. 'apps/luminis/icon.webp'); wrap them with asset() when rendering.
//
// Facts come from each project's newest code and changelog (12 Nov 2026):
//   LUMINIS       release/2.4-rc        2.4.0 RC1
//   VARDEN FILES  test/e2e-…            2.0.0-rc.1+4
//   Luna          main                  4.0.0 (versionCode 7)
// Screenshots were captured from those builds (see README → Editing content).

export const EMAIL = 'grimssys@gmail.com';

export type WorldId = 'luminis' | 'varden' | 'luna';

/** A portrait screenshot; `ratio` is height / width. */
export type Shot = { src: string; caption: string; ratio?: number };

export type World = {
  id: WorldId;
  /** Cosmos stage that belongs to this world. */
  stage: number;
  numeral: string;
  title: string;
  kind: 'Game' | 'App';
  genre: string;
  status: string;
  version: string;
  tagline: string;
  icon: string;
  shots: Shot[];
  /** Three shot indexes used for the hero phones (centre first). */
  heroShots: [number, number, number];
  /** Shot used as the capsule art on the games grid. */
  cardShot: number;
  privacyHref: string;
  links?: { googlePlay?: string; appStore?: string };
};

const PHONE = 1558 / 720; // 9 : 19.5 captures (390 × 844)
const PIXEL = 1600 / 720; // 1080 × 2400 Android captures

const shots = (dir: string, ratio: number, captions: string[]): Shot[] =>
  captions.map((caption, i) => ({ src: `apps/${dir}/shot-${i + 1}.webp`, caption, ratio }));

export const WORLDS: Record<WorldId, World> = {
  luminis: {
    id: 'luminis',
    stage: 1,
    numeral: 'I',
    title: 'LUMINIS',
    kind: 'Game',
    genre: 'Musical physics puzzle',
    status: 'Closed testing on Google Play',
    version: '2.4',
    tagline: 'Catch falling stars with lines of light — and every catch plays a note.',
    icon: 'apps/luminis/icon.webp',
    shots: shots('luminis', PHONE, ['Main menu · Ember', 'Chapter V · Leo', 'Level preview', 'Aries speaks', 'Harmony · S rank', 'The Chronicles', 'Zodiac signs', 'Sign of Leo']),
    heroShots: [0, 4, 2],
    cardShot: 0,
    privacyHref: 'luminis/privacy-policy.html',
  },
  varden: {
    id: 'varden',
    stage: 2,
    numeral: 'II',
    title: 'VARDEN FILES',
    kind: 'Game',
    genre: 'Found-phone thriller',
    status: 'Closed testing on Google Play',
    version: '2.0',
    tagline: 'Every phone remembers its last night.',
    icon: 'apps/varden-files/icon.webp',
    shots: shots('varden-files', PHONE, [
      'Every phone remembers', 'Shelf B · all six cases open', 'Intake protocol', 'Case #01 · 23:52', 'Her lock screen',
      'Varden OS 26', 'Messages from Unknown', 'Photos', 'Greywood Forest, 23:45', 'The Varden Board',
    ]),
    heroShots: [9, 4, 1],
    cardShot: 0,
    privacyHref: 'varden-files/privacy-policy.html',
  },
  luna: {
    id: 'luna',
    stage: 3,
    numeral: 'III',
    title: 'Luna',
    kind: 'App',
    genre: 'Private cycle calendar',
    status: 'Closed testing on Google Play',
    version: '4.0',
    tagline: 'Discover your body’s rhythm — privately, honestly, offline.',
    icon: 'apps/luna/icon.webp',
    shots: shots('luna', PIXEL, ['Welcome to Luna', 'Today · cycle ring', 'Calendar', 'Journal', 'Analysis · Overview', 'Analysis · Your patterns', 'New entry', 'Your profile', 'Today · dark', 'Patterns · dark']),
    heroShots: [1, 2, 5],
    cardShot: 1,
    privacyHref: 'luna/privacy-policy.html',
  },
};

export const WORLD_ORDER: WorldId[] = ['luminis', 'varden', 'luna'];

// ─── LUMINIS ──────────────────────────────────────────────────────────────────

export const LUMINIS = {
  subtitle: 'Song of the Falling Stars',
  hook: 'The sky was an instrument. Twelve constellations sang the Harmony that held the stars in place. One night the song broke off mid-bar — and the stars began to fall.',
  pitch: 'Draw lines of light, guide each falling spark into the gate of its colour, and every catch plays the next note of a forgotten melody. With Ember — a chatty little spark with no memory of where it came from — you wake the zodiac one sign at a time and learn why the Choir sang with only twelve voices.',
  video: { src: 'apps/luminis/gameplay.mp4', poster: 'apps/luminis/gameplay-poster.jpg', caption: 'LUMINIS 2.4 · Tuned Light, recorded in game' },
  features: [
    { title: 'Tuned Light', body: 'New in 2.4. Lines of light stay where you draw them and take the colour of the first spark that touches them. Plan, then press RELEASE — no countdowns, no hidden time limits.' },
    { title: 'A game you play like an instrument', body: 'Every sign has its own melody. Sort cleanly and you perform it; slip, and the phrase breaks. No samples — every sound is synthesised live.' },
    { title: 'A story worth finishing', body: 'Twelve signs, each with a voice, a temper and a memory of the night the song broke. Three choices shape what Ember becomes; two endings.' },
    { title: 'Echoes to recover', body: 'Finish a level without a false note to recover an Echo — a fragment of the hidden story. Twenty-four Echoes unlock the full ending.' },
    { title: 'Cinematic, without a video file', body: 'A film-like intro and story scenes rendered live — constellations assembling, flashbacks, the arrival of the Hush — with a moving camera and its own score.' },
    { title: 'The sky every day', body: 'A Daily Ritual led by the sign of the day, a weekly Event Horizon in the territory of the Hush, and the Endless Void, where the melody changes sign after sign.' },
  ],
  stats: [
    ['120', 'validated levels'],
    ['12', 'zodiac realms'],
    ['24', 'Echoes to recover'],
    ['2', 'endings'],
  ] as [string, string][],
  meta: 'No ads · No in-app purchases · No energy timers · Plays offline · Story EN · PL, interface also DE · FR · IT',
};

// ─── VARDEN FILES ─────────────────────────────────────────────────────────────

export const VARDEN = {
  tagline: 'Every phone remembers its last night.',
  hook: 'Someone’s phone ends up in your hands. The owner is missing. The battery is dying.',
  pitch: 'An investigative found-phone thriller set in the corrupt city of Varden. No cutscenes, no narrator — only a stranger’s messages, photos, notes, emails, voicemails and browser history. Everything you learn, you dig out yourself.',
  notifications: [
    { app: 'Mom', time: '12 min ago', text: 'Why aren’t you answering? Is everything alright?' },
    { app: 'Unknown', time: 'now', text: 'We don’t have much time. They already know you have it.' },
    { app: 'Unknown', time: 'now', text: 'And don’t call anyone from this number. They’re listening.' },
  ],
  custodian: {
    label: 'Varden Police · Shelf B · Night shift',
    title: 'Evidence Room B',
    body: '“Good evening. I’m Ida Marr. For twenty-two years I’ve kept watch over the Varden Police evidence locker at night.” Every phone on shelf B carries a destruction order signed “R.” — and Ida keeps putting them on hold.',
  },
  cases: [
    { no: '#01', title: 'Her Phone', line: 'Nina Kessler, 28, media analyst. Found on a Northgate pavement at the edge of Greywood Forest, May 17, 23:52.' },
    { no: '#02', title: 'Room 307', line: 'Hotel Aldine, room 307. A phone found in a ventilation shaft.' },
    { no: '#03', title: 'The Last Shift', line: 'Kai Brenner, paramedic. A work phone left in locker 14, Riverside station, June 4, 04:18.' },
    { no: '#04', title: '23:17', line: 'A dashcam. 23:17. North Ring Road.' },
    { no: '#05', title: 'Offline', line: 'A locker at Central Station. A ferry ticket nobody used.' },
    { no: '#06', title: 'The Accountant', line: 'An accountant who wired €1.27M and vanished in a taxi.' },
  ],
  lockerNote: 'All six phones are on the shelf. Each case opens with its own scene and its own sound of the night — a hotel, a road, a station, rain in a taxi — and every one you close changes the files of the others.',
  features: [
    { title: 'Varden OS 26', body: 'Thirteen working apps that run in the background and remember where you left them. Swipe home, swipe back, pull a photo out of its thumbnail, flick away a notification. Clues hide between apps.' },
    { title: 'Your choices matter', body: 'Reply to the people texting the owner, attach evidence to your chats or type the answers yourself. Earn or lose trust. Up to nine endings in a case, and a New Game+ that remembers what you found last night.' },
    { title: 'Real puzzles', body: 'Crack PINs from details the owner left behind, recover deleted emails from fragments, match voices, rebuild routes on the map — and reconstruct a whole night, fact by fact, in the right order.' },
    { title: 'The Varden Board', body: 'Every ending changes the files. When two cases touch, a new thread appears on the board — seventeen cards, twelve threads, until the board names who signs the destruction orders.' },
  ],
  stats: [
    ['6', 'cases on shelf B'],
    ['13', 'working phone apps'],
    ['12', 'threads on the board'],
    ['9', 'endings in case #01'],
  ] as [string, string][],
  meta: 'Free · No ads · No in-app purchases · No account · PL · EN · 16+ · Best with headphones, after dark',
};

// ─── Luna ─────────────────────────────────────────────────────────────────────

export const LUNA = {
  tagline: 'A calm, private cycle calendar that tells the truth about its predictions.',
  promises: [
    { title: 'Only on this phone', body: 'Encrypted, no account, no cloud and no tracking. Luna has no INTERNET permission — it cannot send your data anywhere.' },
    { title: 'Honest estimates', body: 'Dates as ranges, with what they are based on. Logged days and predictions look different; fertility estimates switch off with hormonal contraception.' },
    { title: 'Shaped around you', body: 'With every entry Luna learns your rhythm a little better. Choose which journal sections you track, add your own tags and your own reminders.' },
  ],
  privacy: [
    { title: 'Encrypted at rest', body: 'The database is AES-256 encrypted (SQLCipher), with the key held in the Android Keystore.' },
    { title: 'Locked and discreet', body: 'Lock the whole app with fingerprint, face or screen lock. Content hidden in recent apps and screenshots; discreet notifications and widget.' },
    { title: 'Yours to move or erase', body: 'Backups encrypted with your own password. CSV, JSON or a PDF report for your doctor — only when you ask. Delete everything with one button.' },
    { title: 'Patterns, not diagnoses', body: 'Observations such as “bloating often before your period” appear only after three cycles with entries — descriptions of your records, never diagnoses.' },
  ],
  stats: [
    ['0', 'internet permissions'],
    ['256', 'bit AES encryption'],
    ['6', 'languages'],
    ['3', 'cycles before patterns'],
  ] as [string, string][],
  meta: 'No ads · No subscriptions · No account · EN · PL · DE · ES · FR · PT',
  disclaimer: 'Luna is for self-observation and education. It is not a medical device, does not diagnose and must not be used as contraception.',
};

// ─── News ─────────────────────────────────────────────────────────────────────
// Taken from each project's CHANGELOG.

export const NEWS = [
  {
    date: '2026-11-12',
    world: 'varden' as WorldId,
    title: 'VARDEN FILES 2.0 release candidate: six cases, one board',
    body: 'Room 307, 23:17, Offline and The Accountant join the shelf, each with its own opening scene and ambience. The Varden Board ties the six cases together — and names R.',
    shot: 9,
  },
  {
    date: '2026-11-12',
    world: 'luminis' as WorldId,
    title: 'LUMINIS 2.4: Tuned Light',
    body: 'A new core mechanic: lines that stay, take a colour and wait for your RELEASE. 120 validated levels in twelve chapters, every finale a Constellation Resonance.',
    shot: 4,
  },
  {
    date: '2026-11-12',
    world: 'luna' as WorldId,
    title: 'Luna 4.0: Blush & Burgundy',
    body: 'A new look with a calmer cycle ring, a full-screen journal entry and analysis in three tabs — Overview, Your patterns, Details. Still 100% offline.',
    shot: 1,
  },
];

// ─── Studio ───────────────────────────────────────────────────────────────────

export const PRINCIPLES = [
  { title: 'Craft over speed', body: 'Every title gets the time it needs. Releases are not rushed — they are refined until they feel right.' },
  { title: 'Respect the player', body: 'No ads, no dark patterns, no pay-to-win. Software that respects attention, privacy and time.' },
  { title: 'Follow curiosity', body: 'Astronomy, crime fiction, medicine, music theory — every obsession feeds back into the work.' },
];

export const PRESS_FACTS: [string, string][] = [
  ['Studio', 'Grim Origin'],
  ['Based', 'Poland'],
  ['Founded', '2026'],
  ['Team', 'One person — design, code, sound, art'],
  ['Platform', 'Android · Google Play'],
  ['Contact', EMAIL],
];

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
