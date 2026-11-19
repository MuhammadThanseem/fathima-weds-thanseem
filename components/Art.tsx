// White-embossed & gold illustration kit.
import React from "react";

export function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
}

export function Defs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        {/* raised paper (light from top-left) */}
        <filter id="emboss" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="b" />
          <feOffset in="b" dx="1.4" dy="1.6" result="o1" />
          <feFlood floodColor="#a59c92" floodOpacity="0.55" />
          <feComposite in2="o1" operator="in" result="shadow" />
          <feOffset in="b" dx="-1.2" dy="-1.2" result="o2" />
          <feFlood floodColor="#ffffff" />
          <feComposite in2="o2" operator="in" result="hi" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="hi" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* pressed-in paper */}
        <filter id="deboss" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="b" />
          <feOffset in="b" dx="-1.3" dy="-1.3" result="o1" />
          <feFlood floodColor="#a59c92" floodOpacity="0.5" />
          <feComposite in2="o1" operator="in" result="shadow" />
          <feOffset in="b" dx="1.2" dy="1.2" result="o2" />
          <feFlood floodColor="#ffffff" />
          <feComposite in2="o2" operator="in" result="hi" />
          <feMerge>
            <feMergeNode in="hi" />
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation="2" /></filter>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8c6d36" />
          <stop offset="0.3" stopColor="#d6bd84" />
          <stop offset="0.5" stopColor="#f3e6c1" />
          <stop offset="0.7" stopColor="#b8975a" />
          <stop offset="1" stopColor="#8c6d36" />
        </linearGradient>
        <radialGradient id="waxSeal" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f1ede7" />
          <stop offset="1" stopColor="#cfc6ba" />
        </radialGradient>
        <radialGradient id="rosePetal" cx="50%" cy="85%" r="95%">
          <stop offset="0" stopColor="#d9cfc0" />
          <stop offset="0.45" stopColor="#f3eee6" />
          <stop offset="1" stopColor="#fffdf9" />
        </radialGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9c5d6" />
          <stop offset="0.45" stopColor="#e9dfdc" />
          <stop offset="0.75" stopColor="#f6e8d8" />
          <stop offset="1" stopColor="#efe2d3" />
        </linearGradient>
        <linearGradient id="pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d4dc" />
          <stop offset="1" stopColor="#bfb8c4" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9cbb7" />
          <stop offset="0.5" stopColor="#efe6d8" />
          <stop offset="1" stopColor="#d4c5b0" />
        </linearGradient>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8cdd8" />
          <stop offset="0.6" stopColor="#f0dcc8" />
          <stop offset="1" stopColor="#e9c9a8" />
        </linearGradient>
        <pattern id="jali" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M6 0 L12 6 L6 12 L0 6Z" fill="none" stroke="#c9bba5" strokeWidth="0.8" />
          <circle cx="6" cy="6" r="1.2" fill="#c9bba5" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ───────── Mughal (ogee) arch outline ───────── */
export function archD(x: number, y: number, w: number, h: number, spring = 0.42) {
  const s = y + h * spring;
  const top = y;
  const cx = x + w / 2;
  return [
    `M ${x} ${y + h}`,
    `L ${x} ${s}`,
    `C ${x} ${s - w * 0.28}, ${x + w * 0.2} ${s - w * 0.36}, ${x + w * 0.36} ${top + (s - top) * 0.32}`,
    `C ${x + w * 0.44} ${top + (s - top) * 0.2}, ${cx - 4} ${top + 12}, ${cx} ${top}`,
    `C ${cx + 4} ${top + 12}, ${x + w * 0.56} ${top + (s - top) * 0.2}, ${x + w * 0.64} ${top + (s - top) * 0.32}`,
    `C ${x + w * 0.8} ${s - w * 0.36}, ${x + w} ${s - w * 0.28}, ${x + w} ${s}`,
    `L ${x + w} ${y + h}`,
  ].join(" ");
}

/* ───────── Florals ───────── */
export function Rose({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 0 C -16 -6, -20 -26, -4 -30 C 4 -32, 18 -26, 14 -10 C 12 -4, 6 0, 0 0Z" fill="url(#rosePetal)" stroke="#ddd3c4" strokeWidth="0.6" />
      ))}
      {[30, 110, 190, 270].map((a) => (
        <path key={a} transform={`rotate(${a}) scale(.62)`} d="M0 0 C -16 -6, -20 -26, -4 -30 C 4 -32, 18 -26, 14 -10 C 12 -4, 6 0, 0 0Z" fill="url(#rosePetal)" stroke="#d6cab8" strokeWidth="0.6" />
      ))}
      <circle r="7" fill="#efe6d6" />
      <circle r="3" fill="#d7bf8b" />
    </g>
  );
}

/** White florals with fine gold leaves — corner sprays. */
export function FloralCorner({ flip = false, seed = 1, s = 1 }: { flip?: boolean; seed?: number; s?: number }) {
  const r = rand(seed);
  return (
    <g transform={`scale(${flip ? -s : s} ${s})`}>
      {Array.from({ length: 12 }, (_, i) => {
        const x = r() * 150, y = r() * 90, a = r() * 360;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
            <path d="M0 0 C 6 -8, 6 -22, 0 -30 C -6 -22, -6 -8, 0 0Z" fill="none" stroke="url(#gold)" strokeWidth="0.9" />
            <path d="M0 -2 V -26" stroke="#d8c49a" strokeWidth="0.5" />
          </g>
        );
      })}
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} cx={r() * 170} cy={r() * 100} r={1 + r() * 1.6} fill="#e3d2a8" />
      ))}
      <Rose x={40} y={30} s={0.9} />
      <Rose x={92} y={18} s={0.65} r={40} />
      <Rose x={12} y={70} s={0.6} r={80} />
      <Rose x={120} y={50} s={0.5} r={20} />
    </g>
  );
}

/** Embossed paper florals (white on white) used on the envelope. */
export function EmbossSprig({ x, y, s = 1, r = 0, seed = 1 }: { x: number; y: number; s?: number; r?: number; seed?: number }) {
  const rr = rand(seed);
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} filter="url(#emboss)" fill="#f4f1ed">
      <path d="M0 0 C 4 -40, -4 -80, 0 -120" stroke="#efebe5" strokeWidth="3" fill="none" />
      {Array.from({ length: 9 }, (_, i) => {
        const y = -12 - i * 12, side = i % 2 ? 1 : -1;
        return <path key={i} transform={`translate(0 ${y}) rotate(${side * (45 + rr() * 20)})`} d="M0 0 C 6 -6, 6 -16, 0 -22 C -6 -16, -6 -6, 0 0Z" />;
      })}
      {[[-10, -120], [10, -100], [0, -132]].map(([fx, fy], i) => (
        <g key={i} transform={`translate(${fx} ${fy})`}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-5" rx="3.5" ry="6" transform={`rotate(${a})`} />)}
        </g>
      ))}
    </g>
  );
}

export function EmbossMedallion({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#emboss)" fill="#f4f1ed">
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} transform={`rotate(${i * 30})`} d="M0 -8 C 8 -20, 8 -34, 0 -44 C -8 -34, -8 -20, 0 -8Z" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <path key={`b${i}`} transform={`rotate(${i * 30 + 15})`} d="M0 -10 C 4 -16, 4 -24, 0 -28 C -4 -24, -4 -16, 0 -10Z" />
      ))}
      <circle r="9" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={`d${i}`} cx={Math.cos(a) * 56} cy={Math.sin(a) * 56} r="3" />;
      })}
    </g>
  );
}

/* ───────── Wax seal ───────── */
export function WaxSeal({ size = 110 }: { size?: number }) {
  const blob = "M0 -50 C 14 -54, 22 -44, 34 -40 C 48 -34, 50 -20, 52 -6 C 56 10, 46 20, 40 32 C 32 46, 18 50, 4 52 C -10 56, -22 46, -34 40 C -48 32, -52 18, -52 4 C -56 -10, -46 -22, -40 -34 C -32 -48, -16 -48, 0 -50Z";
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible", filter: "drop-shadow(0 6px 8px rgba(80,70,60,.35))" }}>
      <path d={blob} fill="url(#waxSeal)" />
      <circle r="34" fill="#f3efe9" stroke="#d2c9bd" strokeWidth="2" />
      <circle r="34" fill="none" stroke="#fff" strokeWidth="1" transform="translate(-0.8 -0.8)" />
      <g filter="url(#emboss)" fill="#f0ebe4">
        {Array.from({ length: 14 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-25" rx="2.6" ry="5.5" transform={`rotate(${i * 25.7} 0 0) rotate(${i % 2 ? 25 : -25} 0 -25)`} />
        ))}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <ellipse key={a} cx="0" cy="-9" rx="4" ry="8" transform={`rotate(${a})`} />)}
        <circle r="4.5" />
      </g>
      <circle r="4.5" fill="#d9c08a" opacity="0.6" />
    </svg>
  );
}

/* ───────── Hanging lantern ───────── */
export function Lantern({ size = 46, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <div style={{ width: size, height: size * 2.6, transformOrigin: "50% 0", animation: `sway 4s ease-in-out ${delay}s infinite` }}>
      <svg viewBox="0 0 40 104" width="100%" height="100%">
        <line x1="20" y1="0" x2="20" y2="26" stroke="#8c6d36" strokeWidth="1" />
        <circle cx="20" cy="66" r="22" fill="#ffd98a" opacity="0.35" style={{ animation: "glow 2.4s ease-in-out infinite" }} />
        <path d="M14 26 h12 l4 8 h-20z" fill="url(#gold)" />
        <path d="M10 34 h20 l4 16 v22 l-6 10 h-16 l-6 -10 v-22z" fill="#fff1c9" stroke="url(#gold)" strokeWidth="2" />
        <path d="M20 34 v48 M10 50 h20 M8 66 h24" stroke="url(#gold)" strokeWidth="1.2" />
        <ellipse cx="20" cy="60" rx="5" ry="9" fill="#ffd36e" opacity="0.9" />
        <path d="M14 82 h12 l-2 6 h-8z M20 88 v10" fill="url(#gold)" stroke="url(#gold)" />
        <circle cx="20" cy="100" r="2.5" fill="url(#gold)" />
      </svg>
    </div>
  );
}

/* ───────── Hero scene: couple walking toward a white mosque ───────── */
const r2 = (n: number) => Math.round(n * 100) / 100;

function sceneDome(cx: number, base: number, r: number, key?: string | number) {
  return (
    <g key={key}>
      <rect x={r2(cx - r * 0.82)} y={base - 4} width={r2(r * 1.64)} height="4" fill="#efe7da" />
      <path d={`M${r2(cx - r)} ${base} C ${r2(cx - r)} ${r2(base - r * 1.25)}, ${r2(cx - r * 0.2)} ${r2(base - r * 1.5)}, ${cx} ${r2(base - r * 1.9)} C ${r2(cx + r * 0.2)} ${r2(base - r * 1.5)}, ${r2(cx + r)} ${r2(base - r * 1.25)}, ${r2(cx + r)} ${base}Z`} fill="#fdfaf6" />
      <path d={`M${r2(cx + r * 0.15)} ${r2(base - r * 1.8)} C ${r2(cx + r * 0.5)} ${r2(base - r * 1.4)}, ${r2(cx + r * 0.95)} ${r2(base - r * 1.1)}, ${r2(cx + r * 0.95)} ${base}`} fill="none" stroke="#e6dccd" strokeWidth={r2(Math.max(1, r * 0.18))} opacity="0.8" />
      <line x1={cx} y1={r2(base - r * 1.9)} x2={cx} y2={r2(base - r * 2.3)} stroke="#c9ad73" strokeWidth="1.2" />
      <circle cx={cx} cy={r2(base - r * 2.33)} r="1.4" fill="#c9ad73" />
    </g>
  );
}

function sceneMinaret(x: number, base: number, h: number) {
  return (
    <g key={`m${x}`}>
      <path d={`M${x - 4.5} ${base} L ${x - 3.5} ${base - h} H ${x + 3.5} L ${x + 4.5} ${base}Z`} fill="#f9f5ef" />
      <rect x={x + 1} y={base - h} width="2.5" height={h} fill="#ece3d6" />
      {[0.45, 0.7, 0.9].map((f) => (
        <g key={f}>
          <rect x={x - 6.5} y={r2(base - h * f)} width="13" height="3.2" rx="1" fill="#f3ece1" />
          <rect x={x - 6.5} y={r2(base - h * f + 3.2)} width="13" height="1" fill="#ddd0bc" />
        </g>
      ))}
      <path d={`M${x - 4.5} ${base - h} C ${x - 4.5} ${base - h - 7}, ${x} ${base - h - 11}, ${x} ${base - h - 17} C ${x} ${base - h - 11}, ${x + 4.5} ${base - h - 7}, ${x + 4.5} ${base - h}Z`} fill="#fdfaf6" />
      <line x1={x} y1={base - h - 17} x2={x} y2={base - h - 23} stroke="#c9ad73" />
    </g>
  );
}

function MosqueBuilding({ base }: { base: number }) {
  return (
    <g>
      {sceneMinaret(18, base, 176)}
      {sceneMinaret(282, base, 176)}
      {sceneMinaret(58, base, 138)}
      {sceneMinaret(242, base, 138)}
      {/* courtyard wall + arcade */}
      <rect x="10" y={base - 16} width="280" height="16" fill="#f4eee5" />
      {Array.from({ length: 23 }, (_, i) => <path key={`a${i}`} d={`${archD(14 + i * 12, base - 12, 7, 12, 0.55)} Z`} fill="#e3d8c8" />)}
      {/* main hall */}
      <rect x="44" y={base - 44} width="212" height="30" fill="#f8f3ec" />
      {Array.from({ length: 13 }, (_, i) => <path key={`b${i}`} d={`${archD(52 + i * 15.6, base - 38, 9, 22, 0.5)} Z`} fill="#e6dccd" />)}
      <rect x="44" y={base - 46} width="212" height="3" fill="#ece3d6" />
      {/* small dome ring */}
      {[30, 46, 254, 270].map((x, i) => sceneDome(x, base - 16, 6.5, `s${i}`))}
      {[64, 84, 216, 236].map((x, i) => sceneDome(x, base - 46, 8, `t${i}`))}
      {/* drum + central domes */}
      <rect x="96" y={base - 62} width="108" height="17" fill="#faf6f0" />
      {Array.from({ length: 9 }, (_, i) => <path key={`c${i}`} d={`${archD(102 + i * 11.4, base - 58, 6, 11, 0.5)} Z`} fill="#e9dfd1" />)}
      {sceneDome(108, base - 62, 13, "d1")}
      {sceneDome(192, base - 62, 13, "d2")}
      {sceneDome(128, base - 62, 10, "d3")}
      {sceneDome(172, base - 62, 10, "d4")}
      {sceneDome(150, base - 62, 31, "main")}
    </g>
  );
}

export function MosqueScene({ couple = true }: { couple?: boolean }) {
  const W = 300, H = 520, base = 300;
  const walk = `M141 ${base} L159 ${base} L 214 ${H} L 86 ${H}Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9c2d4" />
          <stop offset="0.35" stopColor="#d9dbe3" />
          <stop offset="0.52" stopColor="#efe6e0" />
          <stop offset="0.58" stopColor="#f7e9d6" />
          <stop offset="1" stopColor="#f3e7d8" />
        </linearGradient>
        <linearGradient id="heroWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9e4e6" />
          <stop offset="0.5" stopColor="#d3d3dc" />
          <stop offset="1" stopColor="#c2c4d0" />
        </linearGradient>
        <linearGradient id="heroWalk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6efe5" />
          <stop offset="1" stopColor="#ece2d4" />
        </linearGradient>
        <linearGradient id="reflFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="reflMask"><rect x="0" y={base} width={W} height="150" fill="url(#reflFade)" /></mask>
      </defs>
      <rect width={W} height={H} fill="url(#heroSky)" />
      {/* clouds */}
      <g filter="url(#soft)" opacity="0.75">
        <ellipse cx="50" cy="150" rx="80" ry="10" fill="#f1edf1" />
        <ellipse cx="250" cy="180" rx="90" ry="9" fill="#f5efea" />
        <ellipse cx="160" cy="120" rx="70" ry="7" fill="#e9e6ee" />
      </g>
      {/* sunset glow behind the dome */}
      <circle cx="150" cy={base - 40} r="110" fill="#fff1d6" opacity="0.6" filter="url(#soft)" />
      <circle cx="150" cy={base - 30} r="55" fill="#fff8ea" opacity="0.8" filter="url(#soft)" />

      <MosqueBuilding base={base} />

      {/* reflecting pool with the mosque mirrored in it */}
      <rect x="0" y={base} width={W} height={H - base} fill="url(#heroWater)" />
      <g mask="url(#reflMask)" filter="url(#soft)">
        <g transform={`translate(0 ${base * 2}) scale(1 -1)`}><MosqueBuilding base={base} /></g>
      </g>
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={(i * 53) % W} y={base + 6 + ((i * 29) % 200)} width={24 + (i % 4) * 14} height="1" fill="#fbf8f6" opacity="0.7" />
      ))}
      <rect x="0" y={base - 6} width={W} height="16" fill="#f8f2ea" opacity="0.7" filter="url(#soft)" />
      {/* central walkway */}
      <path d={walk} fill="url(#heroWalk)" />
      <path d={`M141 ${base} L 86 ${H} M159 ${base} L 214 ${H}`} stroke="#d9c9ae" strokeWidth="1" />

      {/* couple from behind, walking toward the mosque */}
      {couple && (
      <g transform="translate(146 452) scale(0.74)">
        <ellipse cx="6" cy="6" rx="70" ry="7" fill="#b8ad9e" opacity="0.25" filter="url(#soft)" />
        {/* groom */}
        <path d="M-30 -186 C -30 -198, -14 -200, -12 -188 L -12 -178 L -30 -178Z" fill="#2c221d" />
        <ellipse cx="-21" cy="-178" rx="9" ry="10.5" fill="#2f2520" />
        <path d="M-25 -169 h8 v6 h-8z" fill="#b98f73" />
        <path d="M-44 -160 C -36 -166, -6 -166, 2 -160 C 4 -120, 2 -60, 0 -24 L -46 -24 C -48 -60, -48 -120, -44 -160Z" fill="#f1e7d8" />
        <path d="M-44 -160 C -48 -130, -50 -90, -48 -60 L -40 -60 C -40 -100, -40 -136, -36 -158Z" fill="#e3d4bd" />
        <path d="M2 -160 C 6 -130, 8 -96, 6 -66 L 0 -66 C 0 -100, -2 -134, -4 -158Z" fill="#e8dbc6" />
        <path d="M-21 -164 V -30" stroke="#d6c4a6" strokeWidth="0.8" />
        {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-21} cy={-156 + i * 12} r="1" fill="#c9ad73" />)}
        <path d="M-40 -24 L -38 2 M-8 -24 L -10 2" stroke="#efe5d4" strokeWidth="11" />
        <path d="M-44 4 h12 M-16 4 h12" stroke="#8a6d4a" strokeWidth="4" strokeLinecap="round" />
        {/* bride */}
        <ellipse cx="22" cy="-172" rx="8.5" ry="10" fill="#4a3a30" />
        <path d="M14 -150 C 10 -110, 6 -60, -2 2 L 52 2 C 46 -60, 40 -110, 32 -150Z" fill="#eadbc4" />
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={6 + ((i * 17) % 44)} cy={-130 + ((i * 37) % 130)} r="0.9" fill="#c4a467" />)}
        <path d="M-2 2 C 10 -6, 40 -6, 52 2" fill="none" stroke="#c9ad73" strokeWidth="2" />
        {/* long sheer veil trailing behind */}
        <path className="veil" d="M22 -184 C 36 -184, 44 -168, 46 -150 C 60 -90, 92 -30, 124 10 C 90 18, 40 18, 6 8 C 10 -60, 8 -140, 10 -168 C 12 -180, 16 -184, 22 -184Z" fill="#fbf6ee" opacity="0.72" />
        <path d="M46 -150 C 60 -90, 92 -30, 124 10" fill="none" stroke="#d8c08a" strokeWidth="1.2" strokeDasharray="1.5 2.5" />
        <path d="M10 -168 C 8 -140, 10 -60, 6 8" fill="none" stroke="#d8c08a" strokeWidth="1.2" strokeDasharray="1.5 2.5" />
        <path d="M0 -112 C 6 -108, 10 -108, 14 -112" stroke="#b98f73" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      )}
    </svg>
  );
}

/** Lush white roses with gold leaves, drawn out from a corner at (0,0). */
export function RoseCluster({ seed = 1 }: { seed?: number }) {
  const r = rand(seed);
  const leaf = "M0 0 C 7 -6, 9 -20, 0 -30 C -9 -20, -7 -6, 0 0Z";
  const leaves = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * 100 - 5 + r() * 8;
    const rad = (a * Math.PI) / 180;
    const d = 70 + r() * 70;
    return { x: r2(Math.cos(rad) * d), y: r2(Math.sin(rad) * d * 0.75), rot: r2(a + 90 + (r() - 0.5) * 50), s: r2(0.7 + r() * 0.6) };
  });
  const sprigs = Array.from({ length: 7 }, (_, i) => {
    const a = ((i / 7) * 90 + r() * 10) * (Math.PI / 180);
    const d = 120 + r() * 50;
    return { x: r2(Math.cos(a) * d), y: r2(Math.sin(a) * d * 0.75), c: r2(Math.cos(a) * d * 0.55), cy: r2(Math.sin(a) * d * 0.3) };
  });
  const roses: [number, number, number][] = [[38, 28, 1.35], [98, 18, 1.05], [16, 86, 1.05], [76, 66, 0.9], [150, 26, 0.75], [128, 62, 0.62], [50, 120, 0.7], [182, 10, 0.5], [8, 140, 0.55]];
  return (
    <g>
      {sprigs.map((p, i) => (
        <g key={`s${i}`}>
          <path d={`M0 0 Q ${p.c} ${p.cy} ${p.x} ${p.y}`} fill="none" stroke="url(#gold)" strokeWidth="0.9" />
          {[0.6, 0.8, 1].map((t) => <circle key={t} cx={r2(p.x * t)} cy={r2(p.y * t)} r="1.6" fill="#d9bf86" />)}
        </g>
      ))}
      {leaves.map((l, i) => (
        <g key={`l${i}`} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
          <path d={leaf} fill={i % 3 ? "#f3ead9" : "#e6d3a8"} stroke="url(#gold)" strokeWidth="0.9" />
          <path d="M0 -2 V -27" stroke="#c9ad73" strokeWidth="0.5" />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const x = r2(20 + r() * 150), y = r2(10 + r() * 110);
        return (
          <g key={`b${i}`} transform={`translate(${x} ${y}) scale(${r2(0.6 + r() * 0.5)})`}>
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-5" rx="3.6" ry="5.6" transform={`rotate(${a})`} fill="#fffdf8" stroke="#e2d6c2" strokeWidth="0.5" />)}
            <circle r="2" fill="#d9bf86" />
          </g>
        );
      })}
      {roses.map(([x, y, s], i) => <Rose key={i} x={x} y={y} s={s} r={r2(r() * 70)} />)}
    </g>
  );
}

/* ───────── Location scene: palace with palms at golden hour ───────── */
export function PalaceScene() {
  const palm = (x: number, base: number, h: number, flip = 1) => (
    <g>
      <path d={`M${x} ${base} C ${x + 4 * flip} ${base - h * 0.5}, ${x - 2 * flip} ${base - h * 0.8}, ${x + 6 * flip} ${base - h}`} stroke="#5a4636" strokeWidth="5" fill="none" />
      {[-70, -35, 0, 35, 70, 110, -110, 150, -150].map((a) => (
        <path key={a} transform={`translate(${x + 6 * flip} ${base - h}) rotate(${a})`} d="M0 0 C 14 -6, 30 -2, 44 10 C 30 4, 14 4, 0 0Z" fill="#3f4a33" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <rect width="400" height="300" fill="url(#dusk)" />
      <circle cx="200" cy="160" r="70" fill="#fff0d8" opacity="0.6" filter="url(#soft)" />
      {/* palace */}
      <g fill="#c79a6c">
        <rect x="70" y="150" width="260" height="150" />
        <rect x="160" y="110" width="80" height="190" fill="#d4a777" />
        <path d={archD(178, 140, 44, 80, 0.45)} fill="#7d5a3d" />
        <rect x="60" y="140" width="40" height="160" fill="#b88a5e" />
        <rect x="300" y="140" width="40" height="160" fill="#b88a5e" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={archD(104 + i * 10 + (i > 2 ? 140 : 0), 190, 7, 22, 0.5)} fill="#7d5a3d" />)}
        {Array.from({ length: 6 }, (_, i) => <path key={`b${i}`} d={archD(104 + i * 10 + (i > 2 ? 140 : 0), 236, 7, 22, 0.5)} fill="#7d5a3d" />)}
        {[60, 100, 300, 340, 160, 240].map((x) => (
          <g key={x}>{Array.from({ length: 4 }, (_, k) => <rect key={k} x={x - 0 + k * 10 - (x === 100 || x === 340 ? 40 : 0)} y={x === 160 || x === 240 ? 104 : 134} width="6" height="6" />)}</g>
        ))}
        {[180, 200, 220].map((x, i) => <rect key={x} x={x - 3} y={190 + i * 0} width="6" height="12" fill="#ffd791" opacity="0.8" />)}
      </g>
      {palm(30, 300, 180)}
      {palm(80, 300, 140, -1)}
      {palm(360, 300, 190, -1)}
      {palm(320, 300, 130)}
      <rect y="285" width="400" height="15" fill="#4a3a2c" opacity="0.5" />
    </svg>
  );
}

/* ───────── Gold line-art vignettes for the timeline ───────── */
export function TimelineArt({ name }: { name: "doors" | "bride" | "rings" | "mosque" | "cloche" }) {
  const g = { fill: "none", stroke: "url(#gold)", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1 };
  const flowers = (
    <g>
      {[[18, 108], [30, 112], [96, 110], [106, 104]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(.35)`}><Rose x={0} y={0} /></g>
      ))}
      <path d="M10 114 C 20 100, 30 106, 36 96 M110 114 C 100 100, 92 104, 88 96" {...g} strokeWidth={0.8} />
    </g>
  );
  return (
    <svg viewBox="0 0 120 120" width="118" height="118" className="draw">
      {name === "doors" && (
        <g>
          <path d={archD(22, 10, 76, 100, 0.4)} {...g} />
          <path d={archD(30, 20, 60, 90, 0.4)} {...g} strokeWidth={0.8} />
          <path d="M30 110 L 16 104 L 16 52 L 30 46Z M90 110 L 104 104 L 104 52 L 90 46Z" {...g} />
          <path d="M20 60 h8 M20 72 h8 M20 84 h8 M92 60 h8 M92 72 h8 M92 84 h8" {...g} strokeWidth={0.7} />
          {flowers}
        </g>
      )}
      {name === "bride" && (
        <g>
          <path d={archD(18, 6, 84, 104, 0.4)} {...g} strokeWidth={0.8} opacity={0.7} />
          <circle cx="60" cy="34" r="7" {...g} />
          <path d="M60 26 C 76 30, 84 70, 98 110 L 22 110 C 36 80, 46 50, 53 40" {...g} />
          <path d="M53 42 C 48 60, 40 88, 34 110 M67 42 C 72 60, 80 88, 86 110 M54 56 h12" {...g} strokeWidth={1} />
          <circle cx="60" cy="62" r="4" fill="url(#gold)" />
          {[[14, 70], [106, 70], [14, 92], [106, 92]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y + 18} C ${x} ${y + 4}, ${x + (x < 60 ? 6 : -6)} ${y}, ${x} ${y - 8}`} {...g} strokeWidth={0.8} />
          ))}
          {flowers}
        </g>
      )}
      {name === "rings" && (
        <g>
          <path d={archD(18, 6, 84, 104, 0.4)} {...g} strokeWidth={0.8} opacity={0.7} />
          <circle cx="50" cy="66" r="18" {...g} strokeWidth={2.2} />
          <circle cx="70" cy="66" r="18" {...g} strokeWidth={2.2} />
          <path d="M44 46 l6 -8 l6 8 l-6 5z" {...g} fill="#fff8e6" />
          <path d="M36 98 C 50 90, 70 90, 84 98" {...g} strokeWidth={0.8} />
          {flowers}
        </g>
      )}
      {name === "mosque" && (
        <g>
          <path d={archD(14, 4, 92, 106, 0.4)} {...g} strokeWidth={0.8} opacity={0.7} />
          <path d="M38 76 C 38 54, 52 46, 60 34 C 68 46, 82 54, 82 76Z" {...g} />
          <path d="M60 34 v-8 M57 24 a3 3 0 1 0 6 0" {...g} />
          <rect x="32" y="76" width="56" height="26" {...g} />
          <path d={archD(52, 82, 16, 20, 0.5)} {...g} />
          <path d="M24 102 V 56 M20 56 h8 M22 56 l2 -8 l2 8 M96 102 V 56 M92 56 h8 M94 56 l2 -8 l2 8" {...g} />
          <path d="M18 102 h84" {...g} />
          {/* prayer mat */}
          <path d="M44 108 h32 l-2 6 h-28z" {...g} strokeWidth={0.8} />
          {flowers}
        </g>
      )}
      {name === "cloche" && (
        <g>
          <path d="M26 80 C 26 52, 44 38, 60 38 C 76 38, 94 52, 94 80Z" {...g} />
          <path d="M34 70 C 36 58, 46 50, 56 48" {...g} strokeWidth={0.8} />
          <circle cx="60" cy="33" r="5" {...g} />
          <path d="M18 80 h84 M24 80 l4 8 h64 l4 -8" {...g} />
          <path d="M60 88 v14 M46 104 h28" {...g} />
          {flowers}
        </g>
      )}
    </svg>
  );
}

/* ───────── Small ornaments ───────── */
export function Flourish({ width = 160 }: { width?: number }) {
  return (
    <svg width={width} height="18" viewBox="0 0 160 18">
      <path d="M4 9 H62 M98 9 H156" stroke="url(#gold)" strokeWidth="0.9" />
      <path d="M62 9 C 68 2, 74 2, 80 9 C 86 16, 92 16, 98 9 M62 9 C 68 16, 74 16, 80 9 C 86 2, 92 2, 98 9" stroke="url(#gold)" strokeWidth="0.9" fill="none" />
      <circle cx="80" cy="9" r="2.2" fill="url(#gold)" />
    </svg>
  );
}

export function Sparkles({ count = 10, seed = 1 }: { count?: number; seed?: number }) {
  const r = rand(seed);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
      {Array.from({ length: count }, (_, i) => {
        const size = 6 + r() * 10;
        return (
          <svg key={i} width={size} height={size} viewBox="-10 -10 20 20" style={{ position: "absolute", left: `${r() * 95}%`, top: `${r() * 95}%`, opacity: 0, animation: `twinkle ${2 + r() * 3}s ease-in-out ${r() * 4}s infinite` }}>
            <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z" fill="#fff8e2" />
          </svg>
        );
      })}
    </div>
  );
}

/* ───────── Cusped (scalloped) Mughal arch ───────── */
function bez(p0: number[], p1: number[], p2: number[], p3: number[], t: number) {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
}
/** Same silhouette as archD, but the crown is made of small lobes like carved Mughal arches. */
export function cuspedD(x: number, y: number, w: number, h: number, spring = 0.42, lobes = 7) {
  const s = y + h * spring, top = y, cx = x + w / 2;
  const segA = [[x, s], [x, s - w * 0.28], [x + w * 0.2, s - w * 0.36], [x + w * 0.36, top + (s - top) * 0.32]];
  const segB = [[x + w * 0.36, top + (s - top) * 0.32], [x + w * 0.44, top + (s - top) * 0.2], [cx - 4, top + 12], [cx, top]];
  const pts: number[][] = [];
  for (let i = 0; i <= lobes; i++) {
    const t = i / lobes;
    pts.push(t <= 0.6 ? bez(segA[0], segA[1], segA[2], segA[3], t / 0.6) : bez(segB[0], segB[1], segB[2], segB[3], (t - 0.6) / 0.4));
  }
  const right = pts.slice(0, -1).reverse().map(([px, py]) => [2 * cx - px, py]);
  const all = [...pts, ...right];
  let d = `M ${x} ${y + h} L ${x} ${s}`;
  for (let i = 1; i < all.length; i++) {
    const [ax, ay] = all[i - 1], [bx, by] = all[i];
    const r = Math.hypot(bx - ax, by - ay) * 0.62;
    d += ` A ${r} ${r} 0 0 1 ${bx} ${by}`;
  }
  return d + ` L ${x + w} ${y + h}`;
}

/** Tall embossed floral vine (side flaps of the envelope). */
export function EmbossVine({ x, y, h = 300, s = 1, flip = false, seed = 1 }: { x: number; y: number; h?: number; s?: number; flip?: boolean; seed?: number }) {
  const r = rand(seed);
  const n = Math.floor(h / 22);
  const stem = Array.from({ length: n + 1 }, (_, i) => [Math.sin(i * 0.7) * 8, -i * 22]);
  const d = stem.map(([px, py], i) => `${i ? "L" : "M"} ${px} ${py}`).join(" ");
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} filter="url(#emboss)" fill="#f2f0f2">
      <path d={d} stroke="#eeebee" strokeWidth="3" fill="none" />
      {stem.slice(1).map(([px, py], i) => {
        const side = i % 2 ? 1 : -1;
        const kind = r();
        return (
          <g key={i} transform={`translate(${px} ${py})`}>
            <path transform={`rotate(${side * (50 + r() * 25)})`} d="M0 0 C 6 -6, 7 -16, 0 -24 C -7 -16, -6 -6, 0 0Z" />
            {kind > 0.55 && (
              <g transform={`translate(${side * 20} ${-8})`}>
                {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="0" cy="-5" rx="3.4" ry="5.6" transform={`rotate(${a})`} />)}
                <circle r="2.4" />
              </g>
            )}
            {kind < 0.2 && <path d={`M0 0 c ${side * 12} -2, ${side * 18} -12, ${side * 10} -18 c ${-side * 6} -4, ${-side * 10} 4, ${-side * 4} 6`} fill="none" stroke="#eeebee" strokeWidth="2" />}
          </g>
        );
      })}
      {/* crowning bloom */}
      <g transform={`translate(0 ${-n * 22 - 10})`}>
        {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="0" cy="-8" rx="5" ry="9" transform={`rotate(${i * 36})`} />)}
        {Array.from({ length: 6 }, (_, i) => <ellipse key={`b${i}`} cx="0" cy="-4" rx="3" ry="5" transform={`rotate(${i * 60 + 30})`} />)}
        <circle r="3" />
      </g>
    </g>
  );
}

/** Large embossed bouquet (flap centres). */
export function EmbossBouquet({ x, y, s = 1, seed = 1 }: { x: number; y: number; s?: number; seed?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <EmbossVine x={0} y={40} h={110} seed={seed} />
      <g transform="rotate(-38)"><EmbossVine x={0} y={40} h={90} seed={seed + 1} s={0.9} /></g>
      <g transform="rotate(38)"><EmbossVine x={0} y={40} h={90} seed={seed + 2} s={0.9} flip /></g>
      <g transform="rotate(-75)"><EmbossVine x={0} y={40} h={70} seed={seed + 3} s={0.8} /></g>
      <g transform="rotate(75)"><EmbossVine x={0} y={40} h={70} seed={seed + 4} s={0.8} flip /></g>
      <EmbossMedallion x={0} y={0} s={0.55} />
    </g>
  );
}
