// Navy & gold illustration kit: monogram, satin bow, doves, sky scene, petals, icons.
import React from "react";
import { config } from "@/lib/config";

export function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
}

export function Defs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f6c2f" />
          <stop offset="0.3" stopColor="#d9b96f" />
          <stop offset="0.5" stopColor="#f7e8b6" />
          <stop offset="0.7" stopColor="#c9a45c" />
          <stop offset="1" stopColor="#8f6c2f" />
        </linearGradient>
        <linearGradient id="satinL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="0.35" stopColor="#e6dac3" />
          <stop offset="0.55" stopColor="#fffdf7" />
          <stop offset="0.8" stopColor="#d9cbb0" />
          <stop offset="1" stopColor="#f3ebdb" />
        </linearGradient>
        <linearGradient id="satinR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="0.35" stopColor="#e6dac3" />
          <stop offset="0.55" stopColor="#fffdf7" />
          <stop offset="0.8" stopColor="#d9cbb0" />
          <stop offset="1" stopColor="#f3ebdb" />
        </linearGradient>
        <radialGradient id="knot" cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="0.6" stopColor="#ece2cf" />
          <stop offset="1" stopColor="#cbbb9c" />
        </radialGradient>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fa6d3" />
          <stop offset="0.45" stopColor="#b9cfe7" />
          <stop offset="0.75" stopColor="#e6eef7" />
          <stop offset="1" stopColor="#f6f4f2" />
        </linearGradient>
        <radialGradient id="pinkRose" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#f9dbe0" />
          <stop offset="0.6" stopColor="#e9a6b3" />
          <stop offset="1" stopColor="#c97586" />
        </radialGradient>
        <radialGradient id="blueRose" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#e4ebf6" />
          <stop offset="0.6" stopColor="#a9bddc" />
          <stop offset="1" stopColor="#6f87b3" />
        </radialGradient>
        <radialGradient id="whiteRose" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f1ece6" />
          <stop offset="1" stopColor="#d6ccc0" />
        </radialGradient>
        <filter id="blur6"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="blur2"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
    </svg>
  );
}

/* Monogram letters, e.g. "ف" and "ت" */
export const monogramLetters = () => [...config.monogram.replace(/\s/g, "")];

/* ───────── Gold Arabic monogram in a leafy ring ───────── */
export function Monogram({ size = 120, orbit = false }: { size?: number; orbit?: boolean }) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <circle r="44" fill="none" stroke="url(#gold)" strokeWidth="1.2" />
        {/* leaf sprig on the left of the ring */}
        <g stroke="url(#gold)" fill="none" strokeWidth="1">
          <path d="M-44 18 C -52 0, -50 -20, -40 -32" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5, y = 14 - t * 44, x = -46 + Math.sin(t * 2.6) * 6;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${-30 + i * 12})`}>
                <path d="M0 0 C -6 -3, -10 -8, -10 -14 C -4 -12, -1 -6, 0 0Z" fill="url(#gold)" />
                <path d="M0 0 C 6 -1, 10 -5, 11 -11 C 5 -10, 2 -5, 0 0Z" fill="url(#gold)" opacity="0.85" />
              </g>
            );
          })}
        </g>
        {orbit && (
          <g style={{ transformOrigin: "0 0", animation: "orbit 6s linear infinite" }}>
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return <circle key={i} cx={Math.cos(a) * 52} cy={Math.sin(a) * 52} r={i % 3 ? 0.9 : 1.6} fill="#fff6dc" opacity={0.4 + (i % 4) * 0.15} />;
            })}
          </g>
        )}
      </svg>
      <div
        className="gold-text"
        style={{ position: "absolute", inset: 0, display: "flex", direction: "rtl", alignItems: "center", justifyContent: "center", gap: size * 0.04, fontFamily: "var(--nastaliq)", fontWeight: 700, fontSize: size * 0.24, lineHeight: 1, paddingBottom: size * 0.08, filter: "drop-shadow(0 1px 0 rgba(60,40,10,.6))" }}
      >
        {/* separate letters with a small gap, e.g. "ف ت" */}
        {monogramLetters().map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

/* ───────── Gold Bismillah: "بسـ" with a long calligraphic baseline, then the rest ───────── */
export function Bismillah({ size = 1.9, align = "center" }: { size?: number; align?: "center" | "left" }) {
  // Split after the seen (س) so the kashida can stretch to fill the width, like hand-written calligraphy.
  const text = config.bismillah.trim();
  const i = text.indexOf("ْ", text.indexOf("س"));
  const cut = i > 0 ? i + 1 : text.indexOf("س") + 1;
  const head = text.slice(0, cut) + "ـ";
  const tail = "ـ" + text.slice(cut);
  return (
    <div className="bismillah" style={{ fontSize: `min(${size}rem, calc((100vw - 56px) / 10.5))`, width: "100%", maxWidth: align === "center" ? 420 : undefined, margin: align === "center" ? "0 auto" : undefined }} aria-label={text}>
      <span className="bis-word" aria-hidden>{head}</span>
      <span className="bis-line" aria-hidden><i /></span>
      <span className="bis-word" aria-hidden>{tail}</span>
    </div>
  );
}

/* ───────── White dove (wings flap) ───────── */
export function Dove({ size = 60, flip = false, delay = 0 }: { size?: number; flip?: boolean; delay?: number }) {
  return (
    <svg viewBox="-50 -40 100 70" width={size} height={size * 0.7} style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(60,80,120,.25))" }}>
      <g style={{ transformOrigin: "0px -2px", transformBox: "view-box", animation: `flap .5s ease-in-out ${delay}s infinite` }}>
        <path d="M-2 -4 C -14 -30, -34 -38, -46 -34 C -36 -28, -30 -18, -24 -10 C -16 -6, -8 -4, -2 -4Z" fill="#fbfcff" stroke="#d9e0ec" strokeWidth="0.6" />
        <path d="M-30 -30 l-6 6 M-24 -26 l-5 7 M-18 -20 l-4 8" stroke="#dfe5ef" strokeWidth="0.8" />
      </g>
      <path d="M-24 6 C -10 -6, 14 -8, 26 -4 C 32 -2, 36 -6, 40 -8 C 42 -4, 40 0, 36 2 C 30 10, 10 14, -6 12 C -16 12, -26 16, -40 22 C -34 14, -30 10, -24 6Z" fill="#ffffff" stroke="#dbe2ee" strokeWidth="0.6" />
      <circle cx="34" cy="-4" r="1.2" fill="#3a3f52" />
      <path d="M40 -6 l5 1 l-5 2z" fill="#e3b77b" />
      <g style={{ transformOrigin: "0px -2px", transformBox: "view-box", animation: `flap .5s ease-in-out ${delay + 0.05}s infinite` }}>
        <path d="M2 -2 C 4 -26, 18 -40, 34 -40 C 26 -30, 22 -18, 18 -8 C 12 -4, 6 -2, 2 -2Z" fill="#f2f5fb" stroke="#d9e0ec" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

/* ───────── Giant satin bow (split into parts so each can fly apart) ───────── */
export const BowParts = {
  leftLoop: (
    <svg viewBox="0 0 220 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      <path d="M220 150 C 170 90, 90 10, 20 30 C -10 40, -6 120, 14 170 C 30 230, 90 250, 150 210 C 180 190, 205 170, 220 150Z" fill="url(#satinL)" stroke="#cbbb9e" strokeWidth="1" />
      <path d="M210 150 C 160 110, 100 60, 40 60 M200 160 C 150 150, 90 160, 40 200 M190 150 C 150 120, 110 100, 70 110" stroke="#d8cab0" strokeWidth="6" fill="none" opacity="0.55" />
      <path d="M200 150 C 150 120, 80 90, 30 110" stroke="#ffffff" strokeWidth="5" fill="none" opacity="0.7" />
      <path d="M20 30 C -10 40, -6 120, 14 170" stroke="#b9a986" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  ),
  rightLoop: (
    <svg viewBox="0 0 220 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      <path d="M0 150 C 50 90, 130 10, 200 30 C 230 40, 226 120, 206 170 C 190 230, 130 250, 70 210 C 40 190, 15 170, 0 150Z" fill="url(#satinR)" stroke="#cbbb9e" strokeWidth="1" />
      <path d="M10 150 C 60 110, 120 60, 180 60 M20 160 C 70 150, 130 160, 180 200 M30 150 C 70 120, 110 100, 150 110" stroke="#d8cab0" strokeWidth="6" fill="none" opacity="0.55" />
      <path d="M20 150 C 70 120, 140 90, 190 110" stroke="#ffffff" strokeWidth="5" fill="none" opacity="0.7" />
      <path d="M200 30 C 230 40, 226 120, 206 170" stroke="#b9a986" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  ),
  knot: (
    <svg viewBox="0 0 120 130" width="100%" height="100%" style={{ overflow: "visible" }}>
      <path d="M14 20 C 40 4, 80 4, 106 20 C 116 50, 116 80, 106 110 C 80 126, 40 126, 14 110 C 4 80, 4 50, 14 20Z" fill="url(#knot)" stroke="#c4b390" />
      <path d="M30 24 C 34 50, 34 80, 30 106 M60 18 C 62 50, 62 80, 60 114 M88 24 C 86 50, 86 80, 90 106" stroke="#d6c7a8" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M44 22 C 48 50, 48 80, 44 108" stroke="#fff" strokeWidth="3" fill="none" opacity="0.8" />
    </svg>
  ),
  tails: (
    <svg viewBox="0 0 260 300" width="100%" height="100%" style={{ overflow: "visible" }}>
      <path d="M118 0 C 100 80, 60 170, 10 290 L 70 270 L 80 300 C 110 200, 130 90, 136 0Z" fill="url(#satinL)" stroke="#cbbb9e" />
      <path d="M142 0 C 160 80, 200 170, 250 290 L 190 270 L 180 300 C 150 200, 130 90, 124 0Z" fill="url(#satinR)" stroke="#cbbb9e" />
      <path d="M120 10 C 104 90, 70 170, 34 270" stroke="#fff" strokeWidth="4" fill="none" opacity="0.7" />
      <path d="M140 10 C 156 90, 190 170, 226 270" stroke="#fff" strokeWidth="4" fill="none" opacity="0.7" />
    </svg>
  ),
};

/* ───────── Roses for the cloud garland ───────── */
function GRose({ x, y, s = 1, fill = "url(#pinkRose)" }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="14" fill={fill} />
      <path d="M-8 2 C -8 -8, 8 -10, 8 0 C 8 6, -2 8, -3 2 C -4 -2, 3 -3, 3 0" stroke="rgba(120,60,80,.35)" strokeWidth="1.4" fill="none" />
      <path d="M-12 6 C -6 12, 6 12, 12 6" stroke="rgba(255,255,255,.6)" strokeWidth="1.2" fill="none" />
    </g>
  );
}

/* ───────── Sky scene: clouds, roses and the couple walking ───────── */
export function SkyScene() {
  const r = rand(17);
  const W = 400, H = 860;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width={W} height={H} fill="url(#skyG)" />
      <circle cx="200" cy="420" r="170" fill="#fffaf0" opacity="0.55" filter="url(#blur6)" />
      {/* high wispy clouds */}
      <g filter="url(#blur6)" opacity="0.8" style={{ animation: "drift 16s ease-in-out infinite alternate" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx={r() * W} cy={60 + r() * 260} rx={50 + r() * 70} ry={12 + r() * 14} fill="#ffffff" />
        ))}
      </g>
      {/* cloud bank */}
      <g filter="url(#blur2)">
        {Array.from({ length: 60 }, (_, i) => {
          const x = r() * (W + 80) - 40, y = 560 + r() * 320;
          return <circle key={i} cx={x} cy={y} r={36 + r() * 46} fill={i % 3 ? "#ffffff" : "#eef2f8"} />;
        })}
      </g>
      {/* couple from behind, walking into the light */}
      <g transform="translate(200 700)">
        <ellipse cx="0" cy="8" rx="80" ry="10" fill="#c9d3e3" opacity="0.5" filter="url(#blur2)" />
        {/* groom */}
        <path d="M-50 -326 C -50 -346, -16 -348, -14 -328 L -14 -312 L -50 -312Z" fill="#241b16" />
        <ellipse cx="-32" cy="-318" rx="17" ry="20" fill="#241b16" />
        <ellipse cx="-49" cy="-314" rx="3" ry="5" fill="#c69a7b" />
        <ellipse cx="-15" cy="-314" rx="3" ry="5" fill="#c69a7b" />
        <path d="M-40 -300 h16 v12 h-16z" fill="#c69a7b" />
        <path d="M-70 -290 C -58 -300, -6 -300, 6 -290 C 10 -230, 8 -150, 4 -110 L -74 -110 C -78 -150, -78 -230, -70 -290Z" fill="#f2ebe0" />
        <path d="M-70 -290 C -78 -250, -80 -200, -78 -150 L -64 -150 C -64 -200, -62 -250, -58 -288Z" fill="#e3d8c6" />
        <path d="M6 -290 C 12 -250, 14 -200, 12 -160 L 2 -160 C 2 -200, 0 -250, -4 -288Z" fill="#e8ded0" />
        <path d="M-70 -110 L -64 0 L -40 0 L -36 -110Z M-30 -110 L -24 0 L 0 0 L 2 -110Z" fill="#efe7da" />
        <path d="M-66 2 h26 M-26 2 h26" stroke="#6b5440" strokeWidth="6" strokeLinecap="round" />
        {/* bride */}
        <ellipse cx="34" cy="-306" rx="15" ry="18" fill="#4a3628" />
        <path d="M18 -270 C 10 -200, 0 -110, -16 6 L 96 6 C 84 -110, 66 -200, 52 -270Z" fill="#fbf8f4" />
        <path d="M18 -270 C 26 -280, 46 -280, 52 -270 L 50 -240 L 20 -240Z" fill="#f3ede4" />
        {/* long sheer veil trailing */}
        <path d="M34 -326 C 60 -326, 72 -300, 76 -270 C 100 -170, 150 -60, 200 10 L 0 10 C 6 -110, 12 -250, 16 -300 C 18 -318, 26 -326, 34 -326Z" fill="#ffffff" opacity="0.6" />
        <path d="M76 -270 C 100 -170, 150 -60, 200 10" stroke="#e9edf5" strokeWidth="1.5" fill="none" />
        {/* hands */}
        <path d="M4 -200 C 10 -194, 16 -194, 22 -200" stroke="#c69a7b" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {/* rose garland foreground */}
      <g>
        {Array.from({ length: 34 }, (_, i) => {
          const left = i < 17;
          const x = left ? r() * 120 - 10 : W - r() * 120 + 10;
          const y = 640 + r() * 220;
          const fill = ["url(#pinkRose)", "url(#blueRose)", "url(#whiteRose)"][i % 3];
          return (
            <g key={i}>
              <ellipse cx={x + (left ? 12 : -12)} cy={y + 10} rx="12" ry="5" fill="#7e9a7a" transform={`rotate(${left ? 30 : -30} ${x} ${y})`} />
              <GRose x={x} y={y} s={0.7 + r() * 0.8} fill={fill} />
            </g>
          );
        })}
      </g>
      {/* soft cloud overlay at the bottom */}
      <rect x="0" y={H - 120} width={W} height="120" fill="#f6f4f2" opacity="0.6" filter="url(#blur6)" />
    </svg>
  );
}

/* ───────── Falling petals (fixed overlay) ───────── */
export function Petals({ count = 22 }: { count?: number }) {
  const r = rand(5);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 30, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 480, height: "100%", overflow: "hidden" }}>
        {Array.from({ length: count }, (_, i) => {
          const size = 8 + r() * 10;
          const style = {
            position: "absolute" as const,
            left: `${r() * 100}%`,
            top: 0,
            width: size,
            height: size * 1.3,
            borderRadius: "60% 0 60% 0",
            background: i % 4 === 0 ? "linear-gradient(135deg,#e9eef8,#b9c7e2)" : "linear-gradient(135deg,#a9bde3,#6f87c0)",
            opacity: 0,
            animation: `fall ${9 + r() * 9}s linear ${r() * 12}s infinite`,
            ["--dx" as string]: `${(r() - 0.5) * 160}px`,
            ["--rot" as string]: `${r() * 720 - 360}deg`,
          } as React.CSSProperties;
          return <span key={i} style={style} />;
        })}
      </div>
    </div>
  );
}

/* ───────── Icons ───────── */
export function Icon({ name, size = 18, color = "currentColor" }: { name: "clock" | "pin" | "calendar" | "rings" | "whatsapp" | "instagram" | "globe" | "music" | "pause"; size?: number; color?: string }) {
  const p = { fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {name === "clock" && (<><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7v5l3 2" {...p} /></>)}
      {name === "pin" && (<><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" {...p} /><circle cx="12" cy="9.5" r="2.5" {...p} /></>)}
      {name === "calendar" && (<><rect x="3.5" y="5" width="17" height="15" rx="2" {...p} /><path d="M3.5 10h17M8 3v4M16 3v4" {...p} /></>)}
      {name === "rings" && (<><circle cx="9" cy="13" r="5.5" {...p} /><circle cx="15" cy="13" r="5.5" {...p} /><path d="M9 5.5l1.5-2 1.5 2-1.5 1z" {...p} /></>)}
      {name === "whatsapp" && (<><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" {...p} /><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" {...p} /></>)}
      {name === "instagram" && (<><rect x="4" y="4" width="16" height="16" rx="4.5" {...p} /><circle cx="12" cy="12" r="3.6" {...p} /><circle cx="16.8" cy="7.2" r=".8" fill={color} /></>)}
      {name === "globe" && (<><circle cx="12" cy="12" r="9" {...p} /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" {...p} /></>)}
      {name === "music" && (<><path d="M9 18V6l10-2v12" {...p} /><circle cx="7" cy="18" r="2" {...p} /><circle cx="17" cy="16" r="2" {...p} /></>)}
      {name === "pause" && (<><path d="M9 6v12M15 6v12" {...p} strokeWidth={2.2} /></>)}
    </svg>
  );
}
