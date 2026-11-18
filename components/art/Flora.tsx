// Garden roses, blossoms & glossy leaves in a painted style, with gold-leaf accents.

type P = { x: number; y: number; s?: number; r?: number };

export function Blossom({ x, y, s = 1, r = 0, white = false }: P & { white?: boolean }) {
  const fill = white ? "url(#petalWhite)" : "url(#petal)";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0 0 C -9 -6, -12 -20, -4 -27 C -1 -29, 1 -29, 4 -27 C 12 -20, 9 -6, 0 0Z"
          fill={fill}
          stroke="#c9a9a0"
          strokeWidth="0.5"
        />
      ))}
      <circle r="4.2" fill="url(#gold)" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 6} cy={Math.sin((a * Math.PI) / 180) * 6} r="1.2" fill="#9a5a5c" />
      ))}
    </g>
  );
}

/** A layered garden rose: cupped outer petals, spiralled heart. */
export function Rose({ x, y, s = 1, r = 0, white = false }: P & { white?: boolean }) {
  const fill = white ? "url(#petalWhite)" : "url(#petal)";
  const edge = white ? "#cdb7a3" : "#b98088";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 2 C -16 -2, -20 -20, -6 -25 C 0 -27, 6 -26, 10 -22 C 18 -14, 12 -2, 0 2Z" fill={fill} stroke={edge} strokeWidth="0.6" />
      ))}
      {[30, 150, 270].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 1 C -11 -1, -13 -13, -4 -16 C 2 -18, 9 -14, 8 -8 C 7 -3, 4 0, 0 1Z" fill={fill} stroke={edge} strokeWidth="0.6" />
      ))}
      <circle r="8.5" fill={white ? "url(#petalWhite)" : "url(#roseCore)"} />
      <path d="M-6 1 C -6 -6, 4 -8, 6 -2 C 7 3, 1 6, -2 4 C -5 2, -3 -3, 1 -3 C 3 -3, 3 0, 1 1" fill="none" stroke={white ? "#b8957a" : "#7e3443"} strokeWidth="0.9" strokeLinecap="round" />
    </g>
  );
}

export function Bud({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C -2 -8, -1 -14, 0 -18" stroke="#3f5a40" strokeWidth="1.4" fill="none" />
      <path d="M-5 -18 C -6 -26, 0 -31, 0 -31 C 0 -31, 6 -26, 5 -18 C 3 -15, -3 -15, -5 -18Z" fill="url(#petal)" stroke="#b98088" strokeWidth="0.5" />
      <path d="M-5 -18 C -2 -16, 2 -16, 5 -18 L 3 -14 L -3 -14Z" fill="#4c6b4c" />
    </g>
  );
}

export function Leaf({ x, y, s = 1, r = 0, gold = false }: P & { gold?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C 10 -12, 10 -38, 0 -52 C -10 -38, -10 -12, 0 0Z" fill={gold ? "url(#gold)" : "url(#leaf)"} />
      <path d="M0 -2 L0 -48" stroke={gold ? "#9a5a5c" : "#a7b99c"} strokeWidth="0.8" opacity="0.6" />
    </g>
  );
}

/** A cascading branch of roses, blossoms & leaves with a few gilded leaves. */
export function Spray({ x = 0, y = 0, s = 1, r = 0, flip = false }: Partial<P> & { flip?: boolean }) {
  const leaves: [number, number, number, number, boolean?][] = [
    [0, 0, 1.1, 200], [20, 18, 1, 160, true], [-14, 30, 0.9, 230], [38, 40, 1, 140], [10, 52, 1.05, 190],
    [60, 58, 0.9, 120], [-6, 76, 0.85, 215, true], [34, 84, 1, 170], [78, 82, 0.8, 110], [54, 104, 0.95, 160],
    [16, 108, 0.8, 200], [92, 108, 0.75, 130, true], [74, 128, 0.85, 175], [40, 132, 0.7, 210],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${r})`} filter="url(#paint)">
      <path d="M-10 -10 C 20 40, 50 80, 80 150" stroke="#3a2f2a" strokeWidth="2.6" fill="none" />
      {leaves.map(([lx, ly, ls, lr, g], i) => <Leaf key={i} x={lx} y={ly} s={ls} r={lr} gold={g} />)}
      <Rose x={26} y={30} s={1.15} r={10} />
      <Blossom x={8} y={92} s={0.85} r={80} white />
      <Rose x={56} y={70} s={1.3} r={40} white />
      <Rose x={90} y={100} s={0.95} r={20} />
      <Blossom x={44} y={120} s={0.9} r={60} />
      <Rose x={72} y={146} s={0.75} r={30} white />
      <Bud x={66} y={36} r={30} />
      <Bud x={-2} y={60} r={-20} s={0.9} />
      <Bud x={102} y={128} r={40} s={0.8} />
    </g>
  );
}

export function Butterfly({ x, y, s = 1, r = 0, delay = 0 }: P & { delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g style={{ transformOrigin: "0px 0px", animation: `flutter 1.6s ease-in-out ${delay}s infinite` }}>
        <path d="M0 0 C -14 -16, -24 -6, -16 4 C -22 12, -10 18, 0 4Z" fill="url(#gold)" stroke="#8e4f53" strokeWidth="0.7" />
        <path d="M0 0 C 14 -16, 24 -6, 16 4 C 22 12, 10 18, 0 4Z" fill="url(#gold)" stroke="#8e4f53" strokeWidth="0.7" />
        <path d="M-3 -1 C -9 -8, -15 -8, -16 -2 M3 -1 C 9 -8, 15 -8, 16 -2" stroke="#fff7df" strokeWidth="0.6" fill="none" opacity="0.8" />
      </g>
      <path d="M0 -6 L0 8" stroke="#6e3a40" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Four-point twinkle star. */
export function Sparkle({ x, y, s = 1, delay = 0, color = "#f7dcd5" }: P & { delay?: number; color?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -8 C 1 -2, 2 -1, 8 0 C 2 1, 1 2, 0 8 C -1 2, -2 1, -8 0 C -2 -1, -1 -2, 0 -8Z"
      fill={color}
      style={{ animation: `twinkle 3.2s ease-in-out ${delay}s infinite`, transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

/** Seeded random so server & client render identically. */
export function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
