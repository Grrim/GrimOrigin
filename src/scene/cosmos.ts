// ─── Cosmos ───────────────────────────────────────────────────────────────────
// One particle field that morphs between five "states of the studio":
//   0 origin  – a single point of light expanding into a nebula
//   1 LUMINIS – twelve constellations on a zodiac ring, falling stars, Ognik
//   2 VARDEN  – the city at night in the rain; six case windows tied by a red thread
//   3 Lune    – a crescent moon inside a four-phase cycle ring
//   4 outro   – everything collapses back into the point it came from
// Every particle owns one position + colour per state; the vertex shader
// blends them with weights derived from a single float (uMix), so scroll only
// has to tween one number.

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

const STATES = 5;

// Deterministic PRNG so the sky looks the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Writer = {
  pos: Float32Array;
  col: Float32Array;
};

const c = (hex: string) => new Color(hex);

function buildStates(n: number) {
  const rnd = mulberry32(20261113);
  const states: Writer[] = Array.from({ length: STATES }, () => ({
    pos: new Float32Array(n * 3),
    col: new Float32Array(n * 3),
  }));
  const motion = new Float32Array(n * 4); // x: star fall speed, y: rain speed, z: drift amp, w: ring spin
  const rand = new Float32Array(n * 4);

  const set = (s: number, i: number, x: number, y: number, z: number, col: Color, bright = 1) => {
    const w = states[s];
    w.pos[i * 3] = x; w.pos[i * 3 + 1] = y; w.pos[i * 3 + 2] = z;
    w.col[i * 3] = col.r * bright; w.col[i * 3 + 1] = col.g * bright; w.col[i * 3 + 2] = col.b * bright;
  };

  for (let i = 0; i < n; i++) {
    rand[i * 4] = rnd(); rand[i * 4 + 1] = rnd(); rand[i * 4 + 2] = rnd(); rand[i * 4 + 3] = rnd();
  }

  // ── 0 · origin nebula ──────────────────────────────────────────────────────
  const warm = [c('#FFE7C2'), c('#FFC98A'), c('#FF8A4C'), c('#FFFFFF')];
  const hints = [c('#8C9BFF'), c('#5FE0D2'), c('#F59AB8')];
  for (let i = 0; i < n; i++) {
    const u = rnd() * Math.PI * 2;
    const v = Math.acos(2 * rnd() - 1);
    const r = Math.pow(rnd(), 1.9) * 3.6 + 0.04;
    const flat = 0.5; // a slightly flattened, galaxy-like disc
    const x = r * Math.sin(v) * Math.cos(u);
    const y = r * Math.cos(v) * flat;
    const z = r * Math.sin(v) * Math.sin(u);
    const hint = rnd() < 0.12;
    const col = hint ? hints[Math.floor(rnd() * 3)] : warm[Math.floor(rnd() * warm.length)];
    set(0, i, x, y, z, col, hint ? 0.9 : 0.4 + (1 - r / 3.7) * 0.7);
  }

  // ── 1 · LUMINIS – zodiac ring ──────────────────────────────────────────────
  const signHues = ['#FF6B6B', '#FFB35C', '#FFE08A', '#9BE38A', '#5FE0D2', '#62B6FF', '#8C9BFF', '#C38BFF', '#FF8AD8', '#F2F2FF', '#FFD27A', '#7AF0FF'];
  // Each constellation: a handful of nodes and the lines between them.
  const constellations = signHues.map((hue, k) => {
    const angle = (k / 12) * Math.PI * 2 + Math.PI / 2;
    const cx = Math.cos(angle) * 2.55;
    const cy = Math.sin(angle) * 2.55;
    const count = 4 + Math.floor(rnd() * 3);
    const nodes: [number, number][] = [];
    let px = 0, py = 0;
    for (let j = 0; j < count; j++) {
      px += (rnd() - 0.5) * 0.42; py += (rnd() - 0.5) * 0.42;
      nodes.push([cx + px, cy + py]);
    }
    return { hue: c(hue), nodes };
  });
  const gold = c('#FFE3A3');
  const ognik = c('#8CF6FF');
  for (let i = 0; i < n; i++) {
    const roll = rand[i * 4];
    if (roll < 0.14) {
      // nodes: bright stars
      const k = Math.floor(rnd() * 12);
      const cst = constellations[k];
      const [nx, ny] = cst.nodes[Math.floor(rnd() * cst.nodes.length)];
      set(1, i, nx + (rnd() - 0.5) * 0.05, ny + (rnd() - 0.5) * 0.05, (rnd() - 0.5) * 0.1, cst.hue, 1.25);
    } else if (roll < 0.36) {
      // lines of light between nodes
      const cst = constellations[Math.floor(rnd() * 12)];
      const j = Math.floor(rnd() * (cst.nodes.length - 1));
      const [ax, ay] = cst.nodes[j];
      const [bx, by] = cst.nodes[j + 1];
      const t = rnd();
      set(1, i, ax + (bx - ax) * t, ay + (by - ay) * t, 0, gold, 0.42);
    } else if (roll < 0.44) {
      // the faint ring that holds the twelve
      const a = rnd() * Math.PI * 2;
      const r = 2.55 + (rnd() - 0.5) * 0.04;
      set(1, i, Math.cos(a) * r, Math.sin(a) * r, 0, c('#A9B4FF'), 0.18);
    } else if (roll < 0.52) {
      // Ognik – a small flame in the middle
      const a = rnd() * Math.PI * 2;
      const r = Math.pow(rnd(), 1.8) * 0.42;
      const flame = Math.max(0, 1 - r / 0.42);
      set(1, i, Math.cos(a) * r * 0.85, Math.sin(a) * r - 0.05 + flame * 0.12, 0.1, ognik, 0.6 + flame * 0.8);
    } else {
      // deep field, some of it falling
      set(1, i, (rnd() - 0.5) * 16, (rnd() - 0.5) * 10, -2 - rnd() * 6, rnd() < 0.15 ? constellations[Math.floor(rnd() * 12)].hue : c('#C9D2FF'), 0.25 + rnd() * 0.45);
      if (rnd() < 0.05) motion[i * 4] = 0.5 + rnd() * 0.9;
    }
  }

  // ── 2 · VARDEN FILES – the city at night, in the rain ──────────────────────
  // A skyline of lit and dark windows. Six windows burn brighter – one per case –
  // and a red thread runs between them, like the Varden Board laid over the city.
  type Building = { x: number; w: number; h: number; z: number };
  const GROUND = -3.3;
  const buildings: Building[] = [];
  for (let x = -8.2; x < 8.2;) {
    const w = 0.45 + rnd() * 1.05;
    const centre = 1 - Math.min(1, Math.abs(x + w / 2) / 8); // taller towards the middle
    const h = 0.9 + rnd() * 1.6 + centre * rnd() * 2.6;
    buildings.push({ x, w, h, z: -1.2 - rnd() * 1.6 });
    x += w + 0.04 + rnd() * 0.12;
  }
  // Pick six tall-enough buildings spread across the width for the case windows.
  const caseWindows: [number, number, number][] = [];
  const pool = buildings.filter((b) => b.h > 1.8 && Math.abs(b.x) < 6.8);
  for (let k = 0; k < 6; k++) {
    const b = pool[Math.floor(((k + 0.5) / 6) * pool.length)] ?? buildings[k];
    caseWindows.push([b.x + b.w * (0.3 + rnd() * 0.4), GROUND + b.h * (0.45 + rnd() * 0.4), b.z + 0.01]);
  }
  const outline = c('#5C8494');
  const winWarm = c('#FFC27A');
  const winCold = c('#BFE6F0');
  const sodium = c('#FFB25B');
  const thread = c('#FF3B4A');
  const rain = c('#6F8FA3');
  const pickBuilding = () => buildings[Math.floor(rnd() * buildings.length)];
  for (let i = 0; i < n; i++) {
    const roll = rand[i * 4 + 1];
    if (roll < 0.22) {
      // building edges: roofline and walls, faint
      const b = pickBuilding();
      const t = rnd();
      let x: number, y: number;
      if (t < 0.5) { x = b.x + rnd() * b.w; y = GROUND + b.h; }
      else { x = rnd() < 0.5 ? b.x : b.x + b.w; y = GROUND + rnd() * b.h; }
      set(2, i, x, y, b.z, outline, 0.75);
    } else if (roll < 0.52) {
      // windows on a grid; most are dark, some lit warm or cold
      const b = pickBuilding();
      const cols = Math.max(2, Math.floor(b.w / 0.16));
      const rows = Math.max(3, Math.floor(b.h / 0.2));
      const cx = Math.floor(rnd() * cols), cy = Math.floor(rnd() * rows);
      const x = b.x + (cx + 0.5) * (b.w / cols) + (rnd() - 0.5) * 0.03;
      const y = GROUND + 0.12 + (cy + 0.5) * ((b.h - 0.2) / rows) + (rnd() - 0.5) * 0.03;
      const lit = rnd();
      if (lit < 0.3) set(2, i, x, y, b.z + 0.01, rnd() < 0.7 ? winWarm : winCold, 0.7 + rnd() * 0.5);
      else set(2, i, x, y, b.z + 0.01, outline, 0.3);
    } else if (roll < 0.56) {
      // the six case windows, bright and slightly bloomed
      const [wx, wy, wz] = caseWindows[Math.floor(rnd() * 6)];
      const a = rnd() * Math.PI * 2, r = Math.pow(rnd(), 2) * 0.12;
      set(2, i, wx + Math.cos(a) * r, wy + Math.sin(a) * r, wz, sodium, 1.3 - r * 4);
    } else if (roll < 0.61) {
      // the red thread between them, sagging a little like string on a board
      const k = Math.floor(rnd() * 5);
      const [ax, ay, az] = caseWindows[k];
      const [bx, by, bz] = caseWindows[k + 1];
      const t = rnd();
      const sag = Math.sin(t * Math.PI) * 0.35;
      set(2, i, ax + (bx - ax) * t, ay + (by - ay) * t - sag, az + (bz - az) * t + 0.02, thread, 0.8);
    } else if (roll < 0.65) {
      // two sodium street lamps in the foreground
      const lamp = rnd() < 0.5 ? -5.2 : 4.6;
      const a = rnd() * Math.PI * 2;
      const r = Math.pow(rnd(), 2.2) * 1.5;
      set(2, i, lamp + Math.cos(a) * r, -1.2 + Math.sin(a) * r * 0.75, 0.6, sodium, 0.3 + (1 - r / 1.5) * 0.6);
    } else {
      set(2, i, (rnd() - 0.5) * 17, (rnd() - 0.5) * 10, -0.2 - rnd() * 5.5, rain, 0.2 + rnd() * 0.3);
      motion[i * 4 + 1] = 2.0 + rnd() * 2.2;
    }
  }

  // ── 3 · Lune – crescent inside the cycle ring ──────────────────────────────
  const phases = [c('#F07B98'), c('#F2C38A'), c('#FFE4A0'), c('#C6A8F0')]; // period, follicular, ovulation, luteal
  const phaseSplit = [0, 0.18, 0.5, 0.6, 1];
  const moon = c('#FFC4CF');
  const petal = c('#F59AB8');
  for (let i = 0; i < n; i++) {
    const roll = rand[i * 4 + 2];
    if (roll < 0.42) {
      let x = 0, y = 0;
      for (let tries = 0; tries < 40; tries++) {
        const a = rnd() * Math.PI * 2;
        const r = Math.sqrt(rnd()) * 1.75;
        x = Math.cos(a) * r; y = Math.sin(a) * r;
        const dx = x - 0.72, dy = y - 0.34;
        if (dx * dx + dy * dy > 1.55 * 1.55) break;
      }
      const lit = Math.min(1, Math.hypot(x, y) / 1.75);
      set(3, i, x, y, (rnd() - 0.5) * 0.2, moon, 0.45 + lit * 0.55);
    } else if (roll < 0.68) {
      const t = rnd();
      let p = 0; while (p < 3 && t > phaseSplit[p + 1]) p++;
      const a = Math.PI / 2 - t * Math.PI * 2;
      const r = 2.75 + (rnd() - 0.5) * 0.09;
      set(3, i, Math.cos(a) * r, Math.sin(a) * r, 0, phases[p], 0.8);
      motion[i * 4 + 3] = 1;
    } else {
      set(3, i, (rnd() - 0.5) * 14, (rnd() - 0.5) * 9, -1 - rnd() * 5, rnd() < 0.3 ? petal : c('#E8C9D6'), 0.18 + rnd() * 0.35);
      motion[i * 4 + 2] = 0.08 + rnd() * 0.25;
    }
  }

  // ── 4 · outro – back to a point ────────────────────────────────────────────
  for (let i = 0; i < n; i++) {
    const roll = rand[i * 4 + 3];
    if (roll < 0.8) {
      const u = rnd() * Math.PI * 2;
      const v = Math.acos(2 * rnd() - 1);
      const r = Math.pow(rnd(), 3) * 0.6;
      set(4, i, r * Math.sin(v) * Math.cos(u), r * Math.cos(v), r * Math.sin(v) * Math.sin(u), warm[Math.floor(rnd() * 4)], 0.5 + (1 - r / 0.6) * 0.7);
    } else {
      set(4, i, (rnd() - 0.5) * 16, (rnd() - 0.5) * 10, -3 - rnd() * 6, c('#FFE7C2'), 0.15 + rnd() * 0.25);
    }
  }

  return { states, motion, rand };
}

const vertex = /* glsl */ `
  attribute vec3 p1; attribute vec3 p2; attribute vec3 p3; attribute vec3 p4;
  attribute vec3 c0; attribute vec3 c1; attribute vec3 c2; attribute vec3 c3; attribute vec3 c4;
  attribute vec4 aMotion;
  attribute vec4 aRand;
  uniform float uTime;
  uniform float uMix;
  uniform float uIntro;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uShift[5];
  varying vec3 vColor;
  varying float vAlpha;
  varying float vStretch;

  vec2 rot(vec2 p, float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c) * p; }

  void main() {
    float w0 = max(0.0, 1.0 - abs(uMix - 0.0));
    float w1 = max(0.0, 1.0 - abs(uMix - 1.0));
    float w2 = max(0.0, 1.0 - abs(uMix - 2.0));
    float w3 = max(0.0, 1.0 - abs(uMix - 3.0));
    float w4 = max(0.0, 1.0 - abs(uMix - 4.0));

    // origin: slow galactic spin + intro burst from a single point
    vec3 a0 = position;
    a0.xz = rot(a0.xz, uTime * 0.05 + length(a0) * 0.4);
    float delay = aRand.x * 0.35;
    float k = clamp((uIntro - delay) / (1.0 - delay * 0.6), 0.0, 1.0);
    k = 1.0 - pow(1.0 - k, 4.0);
    a0 *= k * (1.0 + 0.025 * sin(uTime * 0.8 + aRand.y * 6.283));

    // LUMINIS: the ring turns gently, some stars fall
    vec3 a1 = p1;
    a1.xy = rot(a1.xy, uTime * 0.012);
    if (aMotion.x > 0.0) {
      a1.y = 5.0 - mod(5.0 - p1.y + uTime * aMotion.x, 10.0);
      a1.x = p1.x - (5.0 - a1.y) * 0.35;
    }

    // VARDEN: rain
    vec3 a2 = p2;
    if (aMotion.y > 0.0) {
      a2.y = 5.0 - mod(5.0 - p2.y + uTime * aMotion.y, 10.0);
      a2.x += (5.0 - a2.y) * 0.06;
    }

    // Lune: dust drifts, the cycle ring turns
    vec3 a3 = p3;
    if (aMotion.z > 0.0) {
      a3.x += sin(uTime * 0.25 + aRand.y * 6.283) * aMotion.z * 2.0;
      a3.y += cos(uTime * 0.2 + aRand.z * 6.283) * aMotion.z * 1.5;
    }
    if (aMotion.w > 0.0) a3.xy = rot(a3.xy, -uTime * 0.03);

    // outro: the point breathes
    vec3 a4 = p4 * (1.0 + 0.06 * sin(uTime * 1.3 + aRand.w * 6.283));

    vec3 pos = a0 * w0 + a1 * w1 + a2 * w2 + a3 * w3 + a4 * w4;

    // While morphing, particles swirl a little instead of flying in straight lines.
    float between = 1.0 - max(max(max(w0, w1), max(w2, w3)), w4);
    pos.xy = rot(pos.xy, between * (aRand.z - 0.5) * 1.2);
    pos.z += between * (aRand.w - 0.5) * 3.0;

    pos *= uScale;
    pos.x += uShift[0] * w0 + uShift[1] * w1 + uShift[2] * w2 + uShift[3] * w3 + uShift[4] * w4;

    vColor = c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3 + c4 * w4;

    float twinkle = 0.86 + 0.14 * sin(uTime * (0.8 + aRand.y * 1.6) + aRand.x * 40.0);
    float tw = mix(1.0, twinkle, w1 + w4 * 0.5);
    vAlpha = tw * mix(1.0, k, w0);
    vStretch = (aMotion.y > 0.0 ? w2 : 0.0) + (aMotion.x > 0.0 ? w1 * 0.6 : 0.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.8 + aRand.z * 3.6) * uSize * uPixelRatio;
    gl_PointSize = size * (10.0 / -mv.z) * (1.0 + vStretch * 1.5);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vStretch;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    p.x *= mix(1.0, 5.0, clamp(vStretch, 0.0, 1.0));
    float d = length(p);
    float a = smoothstep(0.5, 0.0, d);
    a = a * a;
    if (a < 0.003) discard;
    gl_FragColor = vec4(vColor * a * vAlpha, a * vAlpha);
  }
`;

export type CosmosHandle = {
  /** Continuous state, 0..4. */
  state: { mix: number; intro: number };
  setPointer(x: number, y: number): void;
  resize(): void;
  /** Render a single frame (used when motion is reduced). */
  renderOnce(): void;
  start(): void;
  stop(): void;
  dispose(): void;
};

export function createCosmos(canvas: HTMLCanvasElement, opts: { reducedMotion: boolean }): CosmosHandle {
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const count = small ? 4200 : 9000;

  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const { states, motion, rand } = buildStates(count);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(states[0].pos, 3));
  for (let s = 1; s < STATES; s++) geo.setAttribute(`p${s}`, new BufferAttribute(states[s].pos, 3));
  for (let s = 0; s < STATES; s++) geo.setAttribute(`c${s}`, new BufferAttribute(states[s].col, 3));
  geo.setAttribute('aMotion', new BufferAttribute(motion, 4));
  geo.setAttribute('aRand', new BufferAttribute(rand, 4));

  const uniforms = {
    uTime: { value: 0 },
    uMix: { value: 0 },
    uIntro: { value: opts.reducedMotion ? 1 : 0 },
    uSize: { value: 1 },
    uPixelRatio: { value: 1 },
    uScale: { value: 1 },
    uShift: { value: [0, 0, 0, 0, 0] },
  };
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geo, material);
  points.frustumCulled = false;
  scene.add(points);

  const state = { mix: 0, intro: uniforms.uIntro.value };
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uPixelRatio.value = dpr;
    const aspect = w / h;
    const wide = aspect > 1.05;
    // On wide screens each world sits beside its copy; on phones it is centred behind it.
    const side = Math.min(3.4, 1.15 * aspect + 0.6);
    // The Varden skyline spans the whole width, so it stays centred.
    uniforms.uShift.value = wide ? [0, side, 0, side, side * 0.95] : [0, 0, 0, 0, 0];
    uniforms.uScale.value = wide ? 1 : Math.max(0.62, aspect * 1.05);
    uniforms.uSize.value = wide ? 1 : 0.85;
  };
  resize();

  let raf = 0;
  let running = false;
  let last = performance.now();
  const frameFn = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    uniforms.uTime.value += dt;
    pointer.sx += (pointer.x - pointer.sx) * 0.04;
    pointer.sy += (pointer.y - pointer.sy) * 0.04;
    points.rotation.y = pointer.sx * 0.1;
    points.rotation.x = -pointer.sy * 0.06;
    uniforms.uMix.value = state.mix;
    uniforms.uIntro.value = state.intro;
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frameFn);
  };

  return {
    state,
    setPointer(x, y) { pointer.x = x; pointer.y = y; },
    resize,
    renderOnce() {
      uniforms.uMix.value = state.mix;
      uniforms.uIntro.value = state.intro;
      renderer.render(scene, camera);
    },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frameFn);
    },
    stop() { running = false; cancelAnimationFrame(raf); },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      geo.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
