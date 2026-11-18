import { rand, Blossom, Rose, Spray, Sparkle } from "./Flora";

/* ───────── December twilight sky: midnight blue → rose-gold horizon, champagne clouds, stars ─────────
   Wide viewBox + "slice" so it fills phones and desktops without stretching. */
export function PaintedSky({ w = 1600, h = 1000, seed = 7 }: { w?: number; h?: number; seed?: number }) {
  const r = rand(seed);
  const id = `sky${seed}`;
  const clouds = Array.from({ length: Math.round((w * h) / 26000) }, () => {
    const y = h * (0.35 + r() * 0.65);
    return {
      x: r() * w,
      y,
      rx: 40 + r() * 90,
      ry: 12 + r() * 22,
      c: ["#f6e7d6", "#e9c9c0", "#d6b2b8", "#fdf4ea", "#c9a7b9"][Math.floor(r() * 5)],
    };
  });
  const stars = Array.from({ length: Math.round(w / 14) }, () => ({ x: r() * w, y: r() * h * 0.55, s: 0.25 + r() * 0.55, d: r() * 3 }));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1631" />
          <stop offset="0.38" stopColor="#25305b" />
          <stop offset="0.68" stopColor="#6d5476" />
          <stop offset="0.88" stopColor="#c99183" />
          <stop offset="1" stopColor="#ecc39c" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
      <g filter="url(#glow)">
        {stars.map((s, i) => (
          <Sparkle key={i} x={s.x} y={s.y} s={s.s} delay={s.d} />
        ))}
      </g>
      <g filter="url(#paintSoft)">
        {clouds.map((c, i) => (
          <g key={i}>
            <ellipse cx={c.x} cy={c.y + 6} rx={c.rx} ry={c.ry} fill="#5c4a6e" opacity="0.45" />
            <ellipse cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} fill={c.c} opacity="0.92" />
            <ellipse cx={c.x - c.rx * 0.3} cy={c.y - c.ry * 0.5} rx={c.rx * 0.5} ry={c.ry * 0.6} fill="#fff8ec" opacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ───────── Soft blush & champagne cloud band (Our Story header) ───────── */
export function CloudBand({ w = 1200, h = 260, seed = 21 }: { w?: number; h?: number; seed?: number }) {
  const r = rand(seed);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g filter="url(#paintSoft)" opacity="0.95">
        {Array.from({ length: Math.round(w / 20) }, (_, i) => {
          const x = r() * w, y = 30 + r() * (h - 60), rx = 30 + r() * 60, ry = 10 + r() * 18;
          const c = ["#efdcd2", "#e6cbc6", "#f3e5d3", "#e9d6cf", "#dcc3bd"][Math.floor(r() * 5)];
          return (
            <g key={i}>
              <ellipse cx={x} cy={y + 5} rx={rx} ry={ry} fill="#c7a99e" opacity="0.35" />
              <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={c} />
              <ellipse cx={x - rx * 0.25} cy={y - ry * 0.4} rx={rx * 0.45} ry={ry * 0.5} fill="#fffaf2" opacity="0.85" />
            </g>
          );
        })}
      </g>
      {Array.from({ length: Math.round(w / 60) }, (_, i) => (
        <Sparkle key={i} x={r() * w} y={20 + r() * (h - 40)} s={0.4 + r() * 0.5} delay={r() * 3} color="#c9a466" />
      ))}
    </svg>
  );
}

/* ───────── Amalfi coast at dusk: lit windows, gilded sea (envelope liner) ───────── */
export function Coast({ w = 480, h = 1000 }: { w?: number; h?: number }) {
  const r = rand(42);
  const houses = Array.from({ length: 46 }, () => {
    const x = r() * w * 0.62;
    const y = h * 0.28 + r() * h * 0.42 + x * 0.25;
    return {
      x, y,
      hw: 14 + r() * 22,
      hh: 12 + r() * 20,
      c: ["#e9c3a8", "#f3dcc6", "#d9a487", "#f8e9d8", "#e6b597", "#cf977a"][Math.floor(r() * 6)],
      lit: r() > 0.35,
    };
  }).sort((a, b) => a.y - b.y);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2347" />
          <stop offset="0.55" stopColor="#7a5c7e" />
          <stop offset="1" stopColor="#e7b994" />
        </linearGradient>
      </defs>
      <rect width={w} height={h * 0.36} fill="url(#duskSky)" />
      <g filter="url(#paintSoft)">
        <ellipse cx={w * 0.7} cy={h * 0.08} rx="120" ry="26" fill="#e8c9c0" opacity="0.8" />
        <ellipse cx={w * 0.2} cy={h * 0.05} rx="90" ry="20" fill="#d3b3bd" opacity="0.7" />
      </g>
      {/* sea with golden reflections */}
      <g filter="url(#water)">
        <rect x="0" y={h * 0.32} width={w} height={h} fill="#16244f" />
        {Array.from({ length: 46 }, (_, i) => (
          <rect key={i} x={(i * 53) % w} y={h * 0.34 + ((i * 89) % (h * 0.66))} width={30 + (i % 4) * 14} height="3" fill={i % 3 ? "#2c4180" : "#e3c486"} opacity={i % 3 ? 0.8 : 0.7} />
        ))}
      </g>
      <g filter="url(#paint)">
        <path d={`M${w * 0.55} ${h * 0.33} C ${w * 0.7} ${h * 0.22}, ${w * 0.85} ${h * 0.24}, ${w} ${h * 0.27} L ${w} ${h * 0.36} L ${w * 0.55} ${h * 0.35}Z`} fill="#5d4a5c" />
        <path d={`M${w * 0.62} ${h * 0.32} C ${w * 0.75} ${h * 0.26}, ${w * 0.9} ${h * 0.28}, ${w} ${h * 0.3} L ${w} ${h * 0.35}Z`} fill="#86697a" />
        <path d={`M0 ${h * 0.22} C ${w * 0.3} ${h * 0.24}, ${w * 0.55} ${h * 0.4}, ${w * 0.72} ${h * 0.62} C ${w * 0.6} ${h * 0.7}, ${w * 0.3} ${h * 0.9}, 0 ${h}Z`} fill="#8e6a62" />
        <path d={`M0 ${h * 0.3} C ${w * 0.25} ${h * 0.34}, ${w * 0.45} ${h * 0.5}, ${w * 0.6} ${h * 0.66} L 0 ${h * 0.95}Z`} fill="#a98072" opacity="0.8" />
        {houses.map((hs, i) => (
          <g key={i}>
            <rect x={hs.x} y={hs.y} width={hs.hw} height={hs.hh} fill={hs.c} />
            <rect x={hs.x} y={hs.y} width={hs.hw} height="3" fill="#a5604a" opacity="0.8" />
            <rect x={hs.x + hs.hw * 0.25} y={hs.y + hs.hh * 0.4} width="3" height="4" fill={hs.lit ? "#ffd98a" : "#5d4a55"} />
            <rect x={hs.x + hs.hw * 0.62} y={hs.y + hs.hh * 0.4} width="3" height="4" fill={hs.lit && i % 2 ? "#ffd98a" : "#5d4a55"} />
          </g>
        ))}
        {Array.from({ length: 26 }, (_, i) => (
          <ellipse key={i} cx={(i * 37) % (w * 0.6)} cy={h * 0.3 + ((i * 71) % (h * 0.5))} rx="12" ry="7" fill={i % 2 ? "#3c5640" : "#59714f"} />
        ))}
      </g>
      {/* yachts with lanterns */}
      {[[0.78, 0.5], [0.86, 0.62], [0.7, 0.78], [0.9, 0.86], [0.62, 0.9]].map(([bx, by], i) => (
        <g key={i} transform={`translate(${w * bx} ${h * by})`}>
          <path d="M0 0 L0 -18 L10 0Z" fill="#fbf6ec" />
          <path d="M-6 2 L14 2 L10 6 L-3 6Z" fill="#f2e9da" />
          <circle cx="0" cy="-19" r="1.6" fill="#ffd98a" filter="url(#glow)" />
        </g>
      ))}
      <Spray x={-20} y={h * 0.62} s={1.2} r={-30} />
      <Spray x={-10} y={-10} s={1.1} r={-10} />
    </svg>
  );
}

/* ───────── Hilltop villa at dusk, lit windows ─────────
   Composed around a centre point sized from `h`, so a wide viewBox simply reveals more landscape. */
export function Villa({ w = 400, h = 260, wide = false, cxRatio = 0.5 }: { w?: number; h?: number; wide?: boolean; cxRatio?: number }) {
  const r = rand(77);
  const cx = w * cxRatio;
  const hw = h * 0.9; // main house width
  const hx = cx - hw / 2;
  const lit = "#f6d48d";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <g filter="url(#paint)">
        <path d={`M0 ${h * 0.55} C ${w * 0.3} ${h * 0.4}, ${w * 0.7} ${h * 0.45}, ${w} ${h * 0.5} L ${w} ${h} L 0 ${h}Z`} fill="#62704f" />
        <path d={`M0 ${h * 0.7} C ${w * 0.4} ${h * 0.6}, ${w * 0.7} ${h * 0.68}, ${w} ${h * 0.62} L ${w} ${h} L 0 ${h}Z`} fill="#45573d" />
        {/* main house */}
        <rect x={hx} y={h * 0.3} width={hw} height={h * 0.28} fill="#f3e6d3" />
        <path d={`M${hx - h * 0.04} ${h * 0.31} L ${cx} ${h * 0.2} L ${hx + hw + h * 0.04} ${h * 0.31}Z`} fill="#bf8468" />
        {[0.37, 0.47].flatMap((row) =>
          Array.from({ length: 6 }, (_, i) => (
            <rect key={`${row}${i}`} x={hx + hw * 0.07 + i * hw * 0.145} y={h * row} width={hw * 0.06} height={h * 0.06} fill={(i + (row > 0.4 ? 1 : 0)) % 3 ? lit : "#6f6270"} />
          ))
        )}
        <rect x={hx} y={h * 0.3} width={hw} height="2" fill="#c9a466" />
        {/* tower */}
        <rect x={hx - h * 0.42} y={h * 0.16} width={h * 0.24} height={h * 0.42} fill="#e9d4bc" />
        <path d={`M${hx - h * 0.44} ${h * 0.16} h ${h * 0.28} v -6 h -${h * 0.05} v 4 h -${h * 0.04} v -4 h -${h * 0.05} v 4 h -${h * 0.05} v -4 h -${h * 0.04} v 4 h -${h * 0.05} Z`} fill="#d8c0a6" />
        <rect x={hx - h * 0.33} y={h * 0.24} width={h * 0.06} height={h * 0.05} fill={lit} />
        <rect x={hx - h * 0.33} y={h * 0.36} width={h * 0.06} height={h * 0.05} fill={lit} />
        {wide && (
          <>
            <rect x={hx + hw + h * 0.1} y={h * 0.38} width={h * 0.48} height={h * 0.2} fill="#eedcc8" />
            <path d={`M${hx + hw + h * 0.08} ${h * 0.39} L ${hx + hw + h * 0.34} ${h * 0.31} L ${hx + hw + h * 0.6} ${h * 0.39}Z`} fill="#bb8269" />
            <rect x={hx + hw + h * 0.2} y={h * 0.44} width={h * 0.06} height={h * 0.06} fill={lit} />
            <rect x={hx + hw + h * 0.34} y={h * 0.44} width={h * 0.06} height={h * 0.06} fill={lit} />
          </>
        )}
        {/* cypress */}
        {Array.from({ length: Math.round(w / (wide ? 70 : 45)) }, (_, i) => {
          const x = r() * w, base = h * (0.55 + r() * 0.2);
          if (Math.abs(x - cx) < hw * 0.55) return null;
          return <path key={i} d={`M${x} ${base} C ${x - 9} ${base - 30}, ${x - 4} ${base - 70}, ${x} ${base - 86} C ${x + 4} ${base - 70}, ${x + 9} ${base - 30}, ${x} ${base}Z`} fill={i % 2 ? "#2a3f31" : "#38533e"} />;
        })}
        {Array.from({ length: Math.round(w / 12) }, (_, i) => (
          <ellipse key={i} cx={r() * w} cy={h * (0.62 + r() * 0.35)} rx={10 + r() * 16} ry={7 + r() * 8} fill={["#71855a", "#99a172", "#56694a", "#c8a9a6"][i % 4]} />
        ))}
        {Array.from({ length: Math.round(w / 12) }, (_, i) => (
          <circle key={i} cx={r() * w} cy={h * (0.5 + r() * 0.45)} r={2 + r() * 3} fill={["#e8bcbf", "#fbf1ec", "#c9a466"][i % 3]} />
        ))}
      </g>
    </svg>
  );
}

/* ───────── Garden fountain under festoon lights (Celebration) ───────── */
export function Fountain({ w = 1200, h = 360 }: { w?: number; h?: number }) {
  const r = rand(5);
  const cx = w / 2;
  const pr = h * 0.62; // pool radius, sized from height so it reads the same on every screen
  // festoon strands
  const strands = Array.from({ length: Math.ceil(w / 260) + 1 }, (_, i) => i * 260 - 40);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1d18" />
          <stop offset="1" stopColor="#24382d" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#dusk)" />
      <g filter="url(#paint)">
        {Array.from({ length: Math.round(w / 30) }, (_, i) => {
          const x = (i / (Math.round(w / 30) - 1)) * w + (r() - 0.5) * 20;
          const top = h * (0.08 + r() * 0.2);
          const base = h * 0.62;
          return <path key={i} d={`M${x} ${base} C ${x - 14} ${base - 60}, ${x - 6} ${top + 40}, ${x} ${top} C ${x + 6} ${top + 40}, ${x + 14} ${base - 60}, ${x} ${base}Z`} fill={i % 2 ? "#233a2c" : "#31503b"} />;
        })}
        <path d={`M0 ${h * 0.6} L ${w} ${h * 0.6} L ${w} ${h} L 0 ${h}Z`} fill="#a89584" />
        <ellipse cx={cx} cy={h * 0.78} rx={pr} ry={h * 0.13} fill="#e8dccb" />
        <ellipse cx={cx} cy={h * 0.78} rx={pr} ry={h * 0.13} fill="none" stroke="url(#gold)" strokeWidth="3" />
        <ellipse cx={cx} cy={h * 0.77} rx={pr * 0.9} ry={h * 0.105} fill="#3f6f8f" />
        <ellipse cx={cx} cy={h * 0.765} rx={pr * 0.82} ry={h * 0.085} fill="#6a9cba" opacity="0.8" />
        <rect x={cx - 6} y={h * 0.48} width="12" height={h * 0.28} fill="url(#goldV)" />
        <ellipse cx={cx} cy={h * 0.56} rx="40" ry="9" fill="url(#gold)" />
        <ellipse cx={cx} cy={h * 0.47} rx="22" ry="6" fill="url(#gold)" />
      </g>
      {/* golden reflections */}
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={cx - pr * 0.7 + r() * pr * 1.4} y={h * (0.73 + r() * 0.08)} width={10 + r() * 20} height="2" fill="#f4dfa4" opacity="0.7" />
      ))}
      <g stroke="#f4ead2" strokeWidth="1.3" fill="none" opacity="0.85">
        {[-1, 1].flatMap((d) =>
          [60, 95, 130].map((spread, i) => (
            <path key={`${d}${i}`} d={`M${cx} ${h * 0.42} Q ${cx + d * spread * 0.6} ${h * (0.22 - i * 0.04)}, ${cx + d * spread} ${h * 0.74}`} />
          ))
        )}
        <path d={`M${cx} ${h * 0.47} L ${cx} ${h * 0.3}`} />
      </g>
      {/* festoon lights */}
      {strands.map((x0, i) => {
        const x1 = x0 + 260, sag = h * 0.16, y0 = h * 0.06;
        const bulbs = Array.from({ length: 9 }, (_, k) => {
          const t = (k + 1) / 10;
          return [x0 + (x1 - x0) * t, y0 + 4 * sag * t * (1 - t)];
        });
        return (
          <g key={i}>
            <path d={`M${x0} ${y0} Q ${(x0 + x1) / 2} ${y0 + 2 * sag}, ${x1} ${y0}`} stroke="#0a120e" strokeWidth="1.2" fill="none" opacity="0.8" />
            {bulbs.map(([bx, by], k) => (
              <circle key={k} cx={bx} cy={by + 4} r="3" fill="#ffe2a0" filter="url(#glow)" style={{ animation: `pulse ${2.4 + (k % 3) * 0.6}s ease-in-out ${k * 0.2}s infinite` }} />
            ))}
          </g>
        );
      })}
      <g filter="url(#paint)">
        {Array.from({ length: Math.round(w / 10) }, (_, i) => {
          const side = i % 2 ? 1 : -1;
          const x = cx + side * (pr * 0.95 + r() * (w / 2 - pr * 0.6));
          const y = h * (0.62 + r() * 0.36);
          return (
            <g key={i}>
              <ellipse cx={x} cy={y + 4} rx="10" ry="6" fill="#36523b" />
              <circle cx={x} cy={y} r={3 + r() * 3} fill={["#e8bcbf", "#fbf1ec", "#c27884"][i % 3]} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ───────── Blush & ivory rose garland with gold leaf ───────── */
export function Garland({ w = 1200, h = 100 }: { w?: number; h?: number }) {
  const r = rand(13);
  const n = Math.round(w / 2.2);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g filter="url(#paint)">
        {Array.from({ length: n }, (_, i) => {
          const x = r() * w;
          const y = h * 0.15 + r() * h * 0.75 * (0.5 + 0.5 * Math.abs(Math.sin(x / 60)));
          const k = i % 5;
          if (k === 0 || k === 3) return <ellipse key={i} cx={x} cy={y} rx="9" ry="5" fill={i % 7 === 0 ? "url(#gold)" : "#36543f"} transform={`rotate(${r() * 180} ${x} ${y})`} />;
          return <circle key={i} cx={x} cy={y} r={3 + r() * 4} fill={["#e8bcbf", "#fbf1ec", "#c27884", "#f3e5d3"][i % 4]} />;
        })}
        {Array.from({ length: Math.round(w / 90) }, (_, i) => (
          <Rose key={`r${i}`} x={45 + i * 90 + (r() - 0.5) * 30} y={h * (0.4 + r() * 0.3)} s={0.7 + r() * 0.3} r={r() * 90} white={i % 2 === 0} />
        ))}
      </g>
    </svg>
  );
}

export { Blossom };
