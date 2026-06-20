import React, { useRef, useEffect } from "react";

const ALIVE = [244, 197, 0];
const FADE = [107, 94, 22];
function mix(a, b, t) {
  return (
    "rgb(" +
    Math.round(a[0] + (b[0] - a[0]) * t) + "," +
    Math.round(a[1] + (b[1] - a[1]) * t) + "," +
    Math.round(a[2] + (b[2] - a[2]) * t) + ")"
  );
}

/**
 * PixelAccent — random N×N grid that fades between fills (or evolves).
 * Defaults are the canonical signage accent: 5×5, shuffle @1.5s, slow morph,
 * 25% gap, dots, alive/fade, soft glow.
 */
export function PixelAccent({
  grid = 4,
  density = 0.5,
  size = 64,
  gap = 0.25,
  dots = true,
  mode = "alive",
  color = "#f4c500",
  glow = 0.4,
  motion = "shuffle",
  every = 1.5,
  morph = 3,
  background = "transparent",
  className,
  style,
}) {
  // tolerate string props (e.g. when mounted via <x-import> in a template)
  grid = +grid || 4;
  size = +size || 64;
  gap = isNaN(+gap) ? 0.25 : +gap;
  glow = isNaN(+glow) ? 0.4 : +glow;
  density = isNaN(+density) ? 0.5 : +density;
  every = isNaN(+every) ? 1.5 : +every;
  morph = isNaN(+morph) ? 3 : +morph;
  dots = !(dots === false || dots === "false");
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const N = Math.max(2, Math.round(grid));
    cv.width = Math.round(size * dpr);
    cv.height = Math.round(size * dpr);
    const ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);

    let g = [];
    let t = [];
    for (let i = 0; i < N; i++) {
      g.push(new Float32Array(N));
      t.push(new Float32Array(N));
    }
    const rand = () => {
      let arr, c, tries = 0;
      do {
        arr = []; c = 0;
        for (let y = 0; y < N; y++) {
          arr.push(new Float32Array(N));
          for (let x = 0; x < N; x++) {
            if (Math.random() < density) { arr[y][x] = 1; c++; }
          }
        }
        tries++;
      } while (c < 2 && tries < 12);
      return arr;
    };
    const setT = (a) => { for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t[y][x] = a[y][x]; };
    const thr = () => {
      const a = [];
      for (let y = 0; y < N; y++) { a.push(new Float32Array(N)); for (let x = 0; x < N; x++) a[y][x] = g[y][x] > 0.5 ? 1 : 0; }
      return a;
    };
    const life = (a) => {
      const n = [];
      for (let y = 0; y < N; y++) n.push(new Float32Array(N));
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        let c = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          c += a[(y + dy + N) % N][(x + dx + N) % N];
        }
        n[y][x] = (a[y][x] && (c === 2 || c === 3)) || (!a[y][x] && c === 3) ? 1 : 0;
      }
      return n;
    };

    setT(rand());
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) g[y][x] = t[y][x];

    const cell = size / N;
    const drawn = cell * (1 - gap);
    const blur = cell * glow;

    let raf, last = performance.now(), acc = 0, evo = 0;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      if (background && background !== "transparent") { ctx.fillStyle = background; ctx.fillRect(0, 0, size, size); }
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const v = g[y][x];
        if (v < 0.03) continue;
        let col, alpha;
        if (mode === "alive") { col = mix(FADE, ALIVE, Math.min(1, v)); alpha = Math.min(1, v * 1.3); }
        else { col = color; alpha = Math.min(1, v * 1.25); }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = col;
        if (blur > 0) { ctx.shadowColor = col; ctx.shadowBlur = blur; } else ctx.shadowBlur = 0;
        const px = x * cell + (cell - drawn) / 2;
        const py = y * cell + (cell - drawn) / 2;
        if (dots) { ctx.beginPath(); ctx.arc(px + drawn / 2, py + drawn / 2, drawn / 2, 0, 6.2832); ctx.fill(); }
        else ctx.fillRect(px, py, drawn, drawn);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    if (reduce || motion === "hold") { draw(); return; }

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (motion === "shuffle") { acc += dt; if (acc >= every) { acc = 0; setT(rand()); } }
      else if (motion === "evolve") { evo += dt; if (evo >= 0.2) { evo = 0; setT(life(thr())); } }
      const r = Math.min(1, morph * dt);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) g[y][x] += (t[y][x] - g[y][x]) * r;
      draw();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [grid, density, size, gap, dots, mode, color, glow, motion, every, morph, background]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: "block", width: size, height: size, ...style }}
    />
  );
}
