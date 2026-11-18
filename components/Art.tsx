// Ivory & gold illustration kit: roses, pearls, filigree, mirror, console, arch.
import React from "react";

export function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
}

/* ───────── Shared gradients ───────── */
export function Defs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a4f5e" />
          <stop offset="0.25" stopColor="#e6a7b1" />
          <stop offset="0.45" stopColor="#fbe1e4" />
          <stop offset="0.6" stopColor="#c7707f" />
          <stop offset="0.85" stopColor="#eeb8bf" />
          <stop offset="1" stopColor="#85404f" />
        </linearGradient>
        <linearGradient id="goldV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8d6db" />
          <stop offset="0.5" stopColor="#c7707f" />
          <stop offset="1" stopColor="#85404f" />
        </linearGradient>
        <radialGradient id="pearl" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#fcf0f1" />
          <stop offset="0.85" stopColor="#ecd2d6" />
          <stop offset="1" stopColor="#c9a3ab" />
        </radialGradient>
        <radialGradient id="roseOuter" cx="50%" cy="85%" r="95%">
          <stop offset="0" stopColor="#e48d9e" />
          <stop offset="0.4" stopColor="#f6c9d1" />
          <stop offset="1" stopColor="#fffafa" />
        </radialGradient>
        <radialGradient id="roseInner" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#cc6c80" />
          <stop offset="1" stopColor="#f9d9df" />
        </radialGradient>
        <linearGradient id="sageLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b6bc9c" />
          <stop offset="1" stopColor="#7b8466" />
        </linearGradient>
        <linearGradient id="satin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3d5da" />
          <stop offset="0.3" stopColor="#fff7f8" />
          <stop offset="0.55" stopColor="#f7e4e6" />
          <stop offset="0.8" stopColor="#fffafa" />
          <stop offset="1" stopColor="#e6bdc5" />
        </linearGradient>
        <radialGradient id="ivoryPanel" cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#fffafa" />
          <stop offset="1" stopColor="#f8e3e6" />
        </radialGradient>
        <radialGradient id="seal" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fbdde2" />
          <stop offset="0.5" stopColor="#d27f8f" />
          <stop offset="1" stopColor="#9a4f5e" />
        </radialGradient>
        <pattern id="lace" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#f7e4e6" />
          <path d="M0 20 Q 10 10 20 20 T 40 20" fill="none" stroke="#efd3d8" strokeWidth="1.2" />
          <path d="M0 0 Q 10 10 20 0 T 40 0 M0 40 Q 10 30 20 40 T 40 40" fill="none" stroke="#f1d8dc" strokeWidth="1" />
          <circle cx="10" cy="14" r="1.4" fill="#ebc9cf" />
          <circle cx="30" cy="26" r="1.4" fill="#ebc9cf" />
          <circle cx="20" cy="20" r="2.2" fill="none" stroke="#ebc9cf" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ───────── Elements ───────── */
export const Pearl = ({ x, y, r = 4 }: { x: number; y: number; r?: number }) => (
  // coordinates rounded so server & browser trig results match (no hydration mismatch)
  <circle cx={+x.toFixed(2)} cy={+y.toFixed(2)} r={r} fill="url(#pearl)" stroke="#d6b0b8" strokeWidth={0.3} />
);

export function Rose({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 0 C -16 -6, -20 -26, -4 -30 C 4 -32, 18 -26, 14 -10 C 12 -4, 6 0, 0 0Z" fill="url(#roseOuter)" stroke="#dc9aa7" strokeWidth="0.6" />
      ))}
      {[30, 100, 170, 250, 320].map((a) => (
        <path key={a} transform={`rotate(${a}) scale(.68)`} d="M0 0 C -16 -6, -20 -26, -4 -30 C 4 -32, 18 -26, 14 -10 C 12 -4, 6 0, 0 0Z" fill="url(#roseOuter)" stroke="#d48e9c" strokeWidth="0.6" />
      ))}
      <circle r="9" fill="url(#roseInner)" />
      <path d="M-6 -1 C -6 -8, 6 -8, 6 -1 C 6 4, -3 5, -3 0 C -3 -3, 2 -3, 2 0" fill="none" stroke="#a84d62" strokeWidth="1" />
    </g>
  );
}

export function Leaf({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C 9 -10, 9 -30, 0 -42 C -9 -30, -9 -10, 0 0Z" fill="url(#sageLeaf)" />
      <path d="M0 -2 L0 -38" stroke="#e5e7d6" strokeWidth="0.6" opacity="0.7" />
    </g>
  );
}

/** A lush corner bouquet: roses, leaves, baby's-breath and pearls. */
export function Bouquet({ x = 0, y = 0, s = 1, flip = false, seed = 3 }: { x?: number; y?: number; s?: number; flip?: boolean; seed?: number }) {
  const r = rand(seed);
  const roses: [number, number, number][] = [[40, 60, 1.25], [95, 40, 1], [10, 15, 0.85], [80, 95, 0.9], [130, 75, 0.75], [-10, 80, 0.8], [55, 0, 0.7]];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {Array.from({ length: 16 }, (_, i) => (
        <Leaf key={i} x={r() * 150 - 10} y={r() * 110} s={0.55 + r() * 0.4} r={r() * 360} />
      ))}
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={r() * 170 - 20} cy={r() * 120 - 15} r={1.6 + r() * 2} fill="#fffafb" stroke="#ecc6cc" strokeWidth="0.4" />
      ))}
      {roses.map(([rx, ry, rs], i) => <Rose key={i} x={rx} y={ry} s={rs} r={i * 37} />)}
      {Array.from({ length: 14 }, (_, i) => <Pearl key={i} x={r() * 160 - 10} y={r() * 110} r={2.5 + r() * 2.5} />)}
    </g>
  );
}

/** Gold baroque scroll ornament (used top/bottom of frames). */
export function Filigree({ x = 0, y = 0, s = 1, flipY = false }: { x?: number; y?: number; s?: number; flipY?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s} ${flipY ? -s : s})`} fill="none" stroke="url(#gold)" strokeWidth="2" strokeLinecap="round">
      <path d="M0 0 C -10 -18, -30 -22, -40 -8 C -46 2, -36 12, -28 4 C -22 -2, -28 -10, -34 -6" />
      <path d="M0 0 C 10 -18, 30 -22, 40 -8 C 46 2, 36 12, 28 4 C 22 -2, 28 -10, 34 -6" />
      <path d="M-40 -8 C -60 -14, -80 -4, -96 -6 M40 -8 C 60 -14, 80 -4, 96 -6" strokeWidth="1.2" />
      <path d="M0 0 C -6 -14, -2 -28, 0 -36 C 2 -28, 6 -14, 0 0Z" fill="url(#gold)" stroke="none" />
      <circle cx="0" cy="-42" r="3.5" fill="url(#gold)" stroke="none" />
      <path d="M-14 -6 C -18 -20, -10 -30, -4 -28 M14 -6 C 18 -20, 10 -30, 4 -28" strokeWidth="1.4" />
      {[-60, -76, 60, 76].map((px) => <circle key={px} cx={px} cy={-8} r="1.8" fill="url(#gold)" stroke="none" />)}
    </g>
  );
}

/* ───────── Gold rope + pearl arch ───────── */
function archPath(cx: number, cy: number, R: number, bottom: number) {
  return `M ${cx - R} ${bottom} L ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} L ${cx + R} ${bottom}`;
}
function archPoints(cx: number, cy: number, R: number, bottom: number, gap: number) {
  const pts: [number, number][] = [];
  for (let y = bottom; y > cy; y -= gap) pts.push([cx - R, y]);
  const n = Math.round((Math.PI * R) / gap);
  for (let i = 0; i <= n; i++) {
    const a = Math.PI + (i / n) * Math.PI;
    pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  for (let y = cy + gap; y <= bottom; y += gap) pts.push([cx + R, y]);
  return pts;
}

export function Arch({ w = 400, h = 820 }: { w?: number; h?: number }) {
  const cx = w / 2, cy = 190, bottom = h + 10;
  const rOuter = 178, rRope = 166, rPearl = 154, rInner = 144;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* panel */}
      <path d={`${archPath(cx, cy, rInner, bottom)} Z`} fill="url(#ivoryPanel)" />
      {/* outer pearls */}
      {archPoints(cx, cy, rOuter, bottom, 11).map(([x, y], i) => <Pearl key={`o${i}`} x={x} y={y} r={5} />)}
      {/* rope */}
      <path d={archPath(cx, cy, rRope, bottom)} fill="none" stroke="#e3aab3" strokeWidth="12" />
      <path d={archPath(cx, cy, rRope, bottom)} fill="none" stroke="#f6d5da" strokeWidth="12" strokeDasharray="3 5" />
      <path d={archPath(cx, cy, rRope, bottom)} fill="none" stroke="#b06a78" strokeWidth="12" strokeDasharray="1 7" strokeDashoffset="4" opacity="0.5" />
      {/* inner pearls */}
      {archPoints(cx, cy, rPearl, bottom, 9).map(([x, y], i) => <Pearl key={`i${i}`} x={x} y={y} r={3.8} />)}
      <path d={archPath(cx, cy, rInner + 2, bottom)} fill="none" stroke="url(#gold)" strokeWidth="1.5" />
      {/* rope knots at spring line */}
      {[cx - rRope, cx + rRope].map((x) => (
        <g key={x}>
          {[-16, -8, 0, 8, 16].map((d) => (
            <ellipse key={d} cx={x} cy={cy + 40 + d} rx="14" ry="4.5" fill="#e8b3bb" stroke="#b06a78" strokeWidth="0.8" />
          ))}
        </g>
      ))}
      {/* pearl drops hanging inside the crown */}
      {[-60, -30, 0, 30, 60].map((dx, i) => {
        const yTop = cy - Math.sqrt(rInner * rInner - dx * dx) + 4;
        const len = [26, 40, 52, 40, 26][i];
        return (
          <g key={dx} opacity="0.85">
            <line x1={cx + dx} y1={yTop} x2={cx + dx} y2={yTop + len} stroke="#e6c3c9" strokeWidth="0.6" />
            {Array.from({ length: Math.floor(len / 7) }, (_, k) => <Pearl key={k} x={cx + dx} y={yTop + 4 + k * 7} r={2.2} />)}
          </g>
        );
      })}
      {/* bouquets at the base */}
      <Bouquet x={-30} y={h - 150} s={1.15} seed={4} />
      <Bouquet x={w + 30} y={h - 150} s={1.15} flip seed={9} />
      <Bouquet x={cx - 40} y={h - 40} s={0.6} seed={12} />
    </svg>
  );
}

/* ───────── Baroque oval mirror ───────── */
export function Mirror() {
  const cx = 160, cy = 220, rx = 128, ry = 186;
  const beads = Array.from({ length: 90 }, (_, i) => {
    const a = (i / 90) * Math.PI * 2;
    return [+(cx + (rx + 10) * Math.cos(a)).toFixed(2), +(cy + (ry + 10) * Math.sin(a)).toFixed(2)];
  });
  return (
    <svg viewBox="0 -44 320 514" width="100%" height="100%">
      <ellipse cx={cx} cy={cy + 6} rx={rx + 24} ry={ry + 24} fill="rgba(110,40,60,.25)" filter="blur(6px)" />
      <ellipse cx={cx} cy={cy} rx={rx + 22} ry={ry + 22} fill="url(#gold)" />
      <ellipse cx={cx} cy={cy} rx={rx + 16} ry={ry + 16} fill="none" stroke="#85404f" strokeWidth="1.5" opacity="0.6" />
      {beads.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="url(#goldV)" />)}
      <ellipse cx={cx} cy={cy} rx={rx + 4} ry={ry + 4} fill="none" stroke="#fbe1e4" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#ivoryPanel)" />
      {/* crest */}
      <g transform={`translate(${cx} ${cy - ry - 16})`}>
        <path d="M-46 8 C -40 -20, -20 -38, 0 -40 C 20 -38, 40 -20, 46 8 C 30 0, 14 -2, 0 -2 C -14 -2, -30 0, -46 8Z" fill="url(#gold)" stroke="#85404f" strokeWidth="0.8" />
        {[-30, -18, -6, 6, 18, 30].map((d) => <path key={d} d={`M0 -2 L ${d * 1.1} -32`} stroke="#9a4f5e" strokeWidth="1" opacity="0.6" />)}
        <path d="M-46 8 C -64 0, -76 14, -66 24 C -60 30, -52 22, -56 16" fill="none" stroke="url(#gold)" strokeWidth="4" />
        <path d="M46 8 C 64 0, 76 14, 66 24 C 60 30, 52 22, 56 16" fill="none" stroke="url(#gold)" strokeWidth="4" />
      </g>
      {/* bottom flourish */}
      <g transform={`translate(${cx} ${cy + ry + 20})`}>
        <path d="M-40 -6 C -20 20, 20 20, 40 -6 C 26 4, -26 4, -40 -6Z" fill="url(#gold)" />
        <path d="M-40 -6 C -60 -14, -66 6, -54 10 M40 -6 C 60 -14, 66 6, 54 10" fill="none" stroke="url(#gold)" strokeWidth="4" />
      </g>
      {/* side scrolls */}
      {[-1, 1].map((d) => (
        <path key={d} d={`M${cx + d * (rx + 20)} ${cy - 40} c ${d * 14} 10, ${d * 14} 70, 0 80`} fill="none" stroke="url(#gold)" strokeWidth="5" />
      ))}
    </svg>
  );
}

/* ───────── White & gold console table with candles and vase ───────── */
export function Console() {
  return (
    <svg viewBox="0 0 400 230" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
      {/* candlesticks */}
      {[352, 374].map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y={i ? 20 : 4} width="6" height={i ? 46 : 62} fill="#fffafb" stroke="#f0d6da" />
          <g style={{ transformOrigin: `${x}px ${i ? 14 : -2}px`, animation: `flicker ${1.4 + i * 0.3}s ease-in-out infinite` }}>
            <ellipse cx={x} cy={i ? 12 : -4} rx="4" ry="9" fill="#ffd27a" opacity="0.9" />
            <ellipse cx={x} cy={i ? 14 : -2} rx="2" ry="5" fill="#fff6d6" />
          </g>
          <circle cx={x} cy={i ? 12 : -4} r="16" fill="#ffe6a8" opacity="0.25" style={{ animation: "glow 2s ease-in-out infinite" }} />
          <path d={`M${x - 8} ${i ? 66 : 66} h16 l-3 6 h-10z M${x - 2} 72 v26 M${x - 10} 100 h20 l-4 -4 h-12z`} fill="url(#gold)" stroke="url(#gold)" strokeWidth="2" />
        </g>
      ))}
      {/* glass vase + white blooms */}
      <g transform="translate(-44 0)">
      <path d="M58 100 C 50 80, 54 60, 62 52 L 82 52 C 90 60, 94 80, 86 100Z" fill="rgba(255,255,255,.35)" stroke="#e9d0d4" />
      {[[54, 34], [72, 20], [90, 34], [64, 44], [82, 46], [46, 50], [98, 52]].map(([x, y], i) => <Rose key={i} x={x} y={y} s={0.4} r={i * 40} />)}
      <Leaf x={60} y={56} s={0.6} r={-40} />
      <Leaf x={86} y={56} s={0.6} r={40} />
      </g>
      {/* tabletop */}
      <rect x="10" y="100" width="380" height="16" rx="3" fill="#fdf4f5" stroke="#e2b9c0" />
      <rect x="10" y="114" width="380" height="4" fill="url(#gold)" />
      {/* apron with gold scroll */}
      <path d="M24 118 H376 V140 C 330 150, 260 136, 200 156 C 140 136, 70 150, 24 140Z" fill="#fbeeef" stroke="#e2b9c0" />
      <g transform="translate(200 132) scale(.55)"><Filigree flipY /></g>
      {/* cabriole legs */}
      {[34, 366].map((x, i) => (
        <path key={x} d={`M${x} 136 C ${x + (i ? -14 : 14)} 170, ${x + (i ? 14 : -14)} 200, ${x + (i ? -4 : 4)} 230 L ${x + (i ? -16 : 16)} 230 C ${x + (i ? -6 : 6)} 200, ${x + (i ? -26 : 26)} 170, ${x + (i ? -18 : 18)} 136Z`} fill="#fdf4f5" stroke="url(#gold)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

/* ───────── Small gold icons ───────── */
export function Icon({ name, size = 30 }: { name: "calendar" | "clock" | "pin" | "rings"; size?: number }) {
  const common = { fill: "none", stroke: "url(#gold)", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "rings")
    return (
      <svg width={size * 4} height={size} viewBox="0 0 160 40">
        <path d="M4 22 C 30 12, 50 30, 56 20" {...common} strokeWidth={1} />
        <path d="M156 22 C 130 12, 110 30, 104 20" {...common} strokeWidth={1} />
        <circle cx="72" cy="22" r="11" {...common} />
        <circle cx="88" cy="22" r="11" {...common} />
        <path d="M68 8 l4 -4 l4 4 l-4 3z" fill="url(#gold)" />
      </svg>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      {name === "calendar" && (
        <>
          <rect x="4" y="7" width="24" height="21" rx="3" fill="url(#gold)" opacity="0.18" />
          <rect x="4" y="7" width="24" height="21" rx="3" {...common} />
          <path d="M4 13 H28 M10 4 V9 M22 4 V9" {...common} />
          {[10, 16, 22].flatMap((x) => [18, 23].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="url(#gold)" />))}
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="16" cy="16" r="12" fill="url(#gold)" opacity="0.18" />
          <circle cx="16" cy="16" r="12" {...common} />
          <path d="M16 9 V16 L21 19" {...common} />
        </>
      )}
      {name === "pin" && (
        <>
          <path d="M16 29 C 16 29, 6 19, 6 12 A 10 10 0 0 1 26 12 C 26 19, 16 29, 16 29Z" fill="url(#gold)" />
          <circle cx="16" cy="12" r="4" fill="#fff6f7" />
        </>
      )}
    </svg>
  );
}

/* ───────── Twinkling sparkles ───────── */
export function Sparkles({ count = 14, seed = 1 }: { count?: number; seed?: number }) {
  const r = rand(seed);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
      {Array.from({ length: count }, (_, i) => {
        const size = 8 + r() * 14;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="-10 -10 20 20"
            style={{ position: "absolute", left: `${r() * 95}%`, top: `${r() * 95}%`, animation: `twinkle ${2 + r() * 3}s ease-in-out ${r() * 4}s infinite`, opacity: 0 }}
          >
            <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z" fill="#fff3f5" />
            <circle r="2" fill="#fff" />
          </svg>
        );
      })}
    </div>
  );
}
