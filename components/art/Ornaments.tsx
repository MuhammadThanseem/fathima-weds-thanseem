import { Blossom, Leaf, Bud, Rose, Sparkle } from "./Flora";
import { config } from "@/lib/config";


/* ───────── Gold filigree corner (placed at each corner of a CSS-bordered box) ───────── */
export function GoldCorner({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 90 90" width="90" height="90" aria-hidden>
      <g fill="none" stroke="url(#gold)" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4 60 C 4 26, 26 4, 60 4" />
        <path d="M12 74 C 8 36, 36 8, 74 12" strokeWidth="0.8" />
        <path d="M18 34 c 10 -4, 18 4, 14 14 c -3 6, -11 4, -10 -2 c 1 -4, 6 -4, 6 0" />
        <path d="M34 18 c -4 10, 4 18, 14 14 c 6 -3, 4 -11, -2 -10 c -4 1, -4 6, 0 6" />
        <path d="M60 4 c 6 0, 12 2, 16 6 M4 60 c 0 6, 2 12, 6 16" strokeWidth="0.8" />
      </g>
      <circle cx="26" cy="26" r="3" fill="url(#gold)" />
    </svg>
  );
}

/* ───────── Rose cluster that overlaps a frame corner ───────── */
export function RoseCluster({ flip = false, style }: { flip?: boolean; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-70 -60 160 140" style={style} aria-hidden overflow="visible">
      <g transform={flip ? "scale(-1 1)" : undefined} filter="url(#paint)">
        <Leaf x={-10} y={0} s={0.9} r={-110} />
        <Leaf x={6} y={8} s={0.8} r={150} gold />
        <Leaf x={-4} y={-6} s={0.85} r={-30} />
        <Leaf x={14} y={-2} s={0.75} r={60} />
        <Leaf x={-14} y={10} s={0.7} r={200} gold />
        <Rose x={-18} y={-6} s={1.2} r={10} />
        <Rose x={16} y={6} s={0.95} r={40} white />
        <Blossom x={-2} y={22} s={0.6} r={20} white />
        <Bud x={30} y={-14} s={0.8} r={50} />
        <Bud x={-40} y={18} s={0.7} r={-60} />
      </g>
    </svg>
  );
}

/* ───────── Fine-line gold botanical frame (Celebration) ───────── */
export function VineFrame({ w = 320, h = 460, color = "url(#gold)" }: { w?: number; h?: number; color?: string }) {
  const corner = (
    <g fill="none" stroke={color} strokeWidth="1">
      <path d="M0 40 C 0 18, 18 0, 40 0" />
      <path d="M8 60 C 4 30, 30 4, 60 8" />
      <path d="M14 30 c 8 -2, 14 4, 12 12" />
      <path d="M30 14 c -2 8, 4 14, 12 12" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${12 + i * 14} ${44 - i * 12}) rotate(${-45 + i * 5})`}>
          <path d="M0 0 c 4 -6, 10 -6, 12 0 c -4 6, -10 6, -12 0Z" />
        </g>
      ))}
      <circle cx="40" cy="40" r="2" fill="#d8bd84" stroke="none" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
      <rect x="10" y="10" width={w - 20} height={h - 20} fill="none" stroke={color} strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
      <rect x="18" y="18" width={w - 36} height={h - 36} fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" vectorEffect="non-scaling-stroke" />
      <g transform="translate(2 2)">{corner}</g>
      <g transform={`translate(${w - 2} 2) scale(-1 1)`}>{corner}</g>
      <g transform={`translate(2 ${h - 2}) scale(1 -1)`}>{corner}</g>
      <g transform={`translate(${w - 2} ${h - 2}) scale(-1 -1)`}>{corner}</g>
      {[h * 0.33, h * 0.66].map((y) => (
        <g key={y} fill="none" stroke={color} strokeWidth="0.8">
          <path d={`M10 ${y - 20} c 10 10, 10 30, 0 40`} />
          <path d={`M${w - 10} ${y - 20} c -10 10, -10 30, 0 40`} />
        </g>
      ))}
      {[14, h - 14].map((y, i) => (
        <g key={i} transform={`translate(${w / 2} ${y}) ${i ? "scale(1 -1)" : ""}`} fill="none" stroke={color} strokeWidth="0.9">
          <path d="M0 0 c -10 -10, -26 -6, -22 4 c 4 8, 16 2, 22 -4Z" />
          <path d="M0 0 c 10 -10, 26 -6, 22 4 c -4 8, -16 2, -22 -4Z" />
          <path d="M-3 2 l -10 16 M3 2 l 10 16" />
          <path d="M-60 0 C -40 -8, -20 -4, -6 0 M60 0 C 40 -8, 20 -4, 6 0" />
        </g>
      ))}
    </svg>
  );
}

/* ───────── Gold filigree band on emerald (bottom of program) ───────── */
export function FiligreeBand() {
  return (
    <svg width="100%" height="64" aria-hidden style={{ display: "block" }}>
      <defs>
        <pattern id="filigree" width="96" height="64" patternUnits="userSpaceOnUse">
          <rect width="96" height="64" fill="#14261f" />
          <g fill="none" stroke="url(#gold)" strokeWidth="1.2">
            <path d="M0 32 C 16 12, 32 12, 48 32 C 64 52, 80 52, 96 32" />
            <path d="M0 32 C 16 52, 32 52, 48 32 C 64 12, 80 12, 96 32" opacity="0.55" />
            <path d="M24 22 c -6 -6, -2 -12, 4 -10 M72 42 c 6 6, 2 12, -4 10" />
          </g>
          <path d="M48 24 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2Z" fill="url(#gold)" />
          <circle cx="0" cy="32" r="2.2" fill="#d8bd84" />
          <circle cx="96" cy="32" r="2.2" fill="#d8bd84" />
        </pattern>
      </defs>
      <rect width="100%" height="64" fill="url(#filigree)" />
      <rect width="100%" height="2" y="5" fill="url(#gold)" />
      <rect width="100%" height="2" y="57" fill="url(#gold)" />
    </svg>
  );
}

/* ───────── Monogram crest: initials in a gilded laurel wreath ───────── */
export function Monogram({ size = 120, color }: { size?: number; color?: string }) {
  const [a, b] = config.monogram;
  const fill = color ?? "url(#gold)";
  const R = 47;
  const pt = (deg: number, rr = R) => [Math.cos((deg * Math.PI) / 180) * rr, Math.sin((deg * Math.PI) / 180) * rr];
  const [sx, sy] = pt(100), [ex, ey] = pt(235);
  const laurel = (
    <g>
      <path d={`M${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`} fill="none" stroke={fill} strokeWidth="1.1" />
      {Array.from({ length: 9 }, (_, i) => {
        const deg = 110 + i * 14;
        return [-1, 1].map((side) => {
          const [x, y] = pt(deg, R + side * 5);
          return <ellipse key={`${i}${side}`} cx={x} cy={y} rx="6.5" ry="2.4" fill={fill} transform={`rotate(${deg + 90 + side * 35} ${x} ${y})`} />;
        });
      })}
    </g>
  );
  return (
    <svg viewBox="-64 -64 128 128" width={size} height={size} aria-hidden>
      <circle r="60" fill="none" stroke={fill} strokeWidth="0.6" opacity="0.8" />
      {laurel}
      <g transform="scale(-1 1)">{laurel}</g>
      <text x="-17" y="6" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="30" fill={fill}>{a}</text>
      <text x="0" y="12" textAnchor="middle" fontFamily="'Pinyon Script', cursive" fontSize="20" fill={fill}>&amp;</text>
      <text x="17" y="24" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="30" fill={fill}>{b}</text>
      <Sparkle x={0} y={-46} s={0.7} color="#e9d49f" />
    </svg>
  );
}

/* ───────── Gold wax seal for the envelope ───────── */
export function WaxSeal() {
  const [a, b] = config.monogram;
  const blob = "M0 -62 C 18 -64, 30 -52, 44 -46 C 60 -38, 64 -20, 62 0 C 66 20, 56 36, 44 46 C 30 58, 14 64, 0 62 C -18 66, -34 56, -46 44 C -60 30, -64 14, -62 -2 C -64 -22, -56 -36, -44 -46 C -32 -58, -16 -60, 0 -62Z";
  return (
    <svg viewBox="-70 -70 140 140" width="100%" height="100%" style={{ filter: "drop-shadow(0 8px 12px rgba(20,15,10,.45))" }} aria-hidden>
      <g filter="url(#emboss)">
        <path d={blob} fill="url(#seal)" />
        <circle r="44" fill="none" stroke="#7a5a2c" strokeWidth="2" opacity="0.7" />
        <circle r="38" fill="none" stroke="#f3e2b0" strokeWidth="0.8" opacity="0.8" />
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx={Math.cos((i / 24) * Math.PI * 2) * 41} cy={Math.sin((i / 24) * Math.PI * 2) * 41} r="1.1" fill="#7a5a2c" />
        ))}
        <text x="-14" y="4" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="26" fill="#6d4f24">{a}</text>
        <text x="0" y="10" textAnchor="middle" fontFamily="'Pinyon Script', cursive" fontSize="17" fill="#6d4f24">&amp;</text>
        <text x="14" y="22" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="26" fill="#6d4f24">{b}</text>
      </g>
    </svg>
  );
}

/* ───────── Gilded vignettes for the timeline ───────── */
export function ProgramIcon({ name }: { name: string }) {
  const stroke = "#8a6a3a";
  const wrap = (children: React.ReactNode) => (
    <svg viewBox="0 0 64 64" width="58" height="58" aria-hidden>
      <circle cx="32" cy="32" r="29" fill="#fbf7ef" stroke="url(#gold)" strokeWidth="1" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#gold)" strokeWidth="0.4" opacity="0.8" />
      <g filter="url(#paint)" transform="translate(6.4 6.4) scale(0.8)">{children}</g>
    </svg>
  );
  switch (name) {
    case "glasses":
      return wrap(<>
        <path d="M18 14 h12 l-2 16 a4 4 0 0 1 -8 0Z" fill="#f6e3b4" stroke={stroke} />
        <path d="M34 14 h12 l-2 16 a4 4 0 0 1 -8 0Z" fill="#f6e3b4" stroke={stroke} />
        <path d="M24 34 v12 M40 34 v12 M19 46 h10 M35 46 h10" stroke="url(#gold)" strokeWidth="1.8" />
        <Rose x={14} y={14} s={0.32} />
        <Leaf x={48} y={12} s={0.3} r={40} gold />
      </>);
    case "rings":
      return wrap(<>
        <circle cx="26" cy="34" r="10" fill="none" stroke="url(#gold)" strokeWidth="3.4" />
        <circle cx="38" cy="34" r="10" fill="none" stroke="url(#gold)" strokeWidth="3.4" />
        <path d="M22 22 l4 -4 l4 4 l-4 3Z" fill="#eef5fb" stroke="#8aa1b5" />
        <Rose x={46} y={18} s={0.34} white />
        <Leaf x={16} y={50} s={0.3} r={-60} />
      </>);
    case "cocktail":
      return wrap(<>
        <path d="M18 16 L46 16 L32 34Z" fill="#e8bcbf" stroke={stroke} />
        <path d="M32 34 V48 M24 48 H40" stroke="url(#gold)" strokeWidth="1.8" />
        <circle cx="42" cy="14" r="5" fill="url(#gold)" />
        <Leaf x={22} y={14} s={0.25} r={-30} />
      </>);
    case "dinner":
      return wrap(<>
        <ellipse cx="32" cy="34" rx="17" ry="13" fill="#fbf7ef" stroke="url(#gold)" strokeWidth="1.6" />
        <ellipse cx="32" cy="34" rx="10" ry="7" fill="#efe3d0" />
        <path d="M10 20 v24 M54 20 v24" stroke="url(#gold)" strokeWidth="1.8" />
        <Rose x={32} y={32} s={0.28} />
        <Leaf x={24} y={34} s={0.18} r={-70} />
        <Leaf x={40} y={34} s={0.18} r={70} />
      </>);
    case "cake":
      return wrap(<>
        <rect x="20" y="34" width="24" height="12" fill="#fffaf2" stroke={stroke} />
        <rect x="24" y="24" width="16" height="10" fill="#fffaf2" stroke={stroke} />
        <rect x="27" y="16" width="10" height="8" fill="#fffaf2" stroke={stroke} />
        <path d="M20 40 h24 M24 29 h16" stroke="url(#gold)" strokeWidth="1.2" />
        <Rose x={32} y={14} s={0.24} />
        <Rose x={22} y={34} s={0.2} white />
        <Blossom x={42} y={24} s={0.2} white />
      </>);
    case "dance":
      return wrap(<>
        <circle cx="27" cy="13" r="4" fill="#2b2723" />
        <circle cx="37" cy="12" r="4" fill="#7a5233" />
        <path d="M27 17 L22 46 L30 46 L28 30Z" fill="#2b2723" />
        <path d="M37 16 C 46 30, 48 40, 50 48 L 30 48 C 32 38, 34 28, 37 16Z" fill="#fffaf2" stroke={stroke} />
        <path d="M30 24 L36 22" stroke={stroke} strokeWidth="1.4" />
      </>);
    case "moon":
      return wrap(<>
        <path d="M38 12 A 16 16 0 1 0 46 42 A 12 12 0 1 1 38 12Z" fill="url(#gold)" />
        {[[16, 16], [50, 22], [22, 44], [48, 48]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 4} L${x + 1} ${y - 1} L${x + 4} ${y} L${x + 1} ${y + 1} L${x} ${y + 4} L${x - 1} ${y + 1} L${x - 4} ${y} L${x - 1} ${y - 1}Z`} fill="#d8bd84" />
        ))}
      </>);
    default: // bow
      return wrap(<>
        <path d="M32 30 C 18 14, 8 22, 14 32 C 18 38, 26 34, 32 30Z" fill="url(#gold)" stroke="#7d5f32" />
        <path d="M32 30 C 46 14, 56 22, 50 32 C 46 38, 38 34, 32 30Z" fill="url(#gold)" stroke="#7d5f32" />
        <path d="M30 32 L22 50 M34 32 L42 50" stroke="#b08d57" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="31" r="4" fill="#8a6a3a" />
      </>);
  }
}

export function Heart({ size = 40, color = "#14261f", children }: { size?: number; color?: string; children?: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg viewBox="-1 -1 34 32" width={size} height={size} style={{ position: "absolute", inset: 0 }} aria-hidden>
        <path d="M16 29 C 6 21, 0 15, 0 8.5 A 7.5 7.5 0 0 1 16 5 A 7.5 7.5 0 0 1 32 8.5 C 32 15, 26 21, 16 29Z" fill={color} stroke="url(#gold)" strokeWidth="1.2" />
      </svg>
      <span style={{ position: "relative", color: "#f3e6c4", fontSize: size * 0.32, marginTop: -size * 0.08 }}>{children}</span>
    </div>
  );
}
