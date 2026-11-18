"use client";
import { motion } from "framer-motion";
import { rand } from "./Art";

const PETAL_COLORS = [
  ["#f7dcd6", "#e8b4ab"],
  ["#fbe9e4", "#efc6bd"],
  ["#fff6e6", "#e6cf97"],
];

/** Rose petals drifting down over the invitation. */
export function Petals({ count = 14, seed = 7 }: { count?: number; seed?: number }) {
  const r = rand(seed);
  return (
    <div className="petals" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const size = 12 + r() * 12;
        const [a, b] = PETAL_COLORS[Math.floor(r() * PETAL_COLORS.length)];
        const fall = 11 + r() * 9;
        const style = {
          left: `${r() * 96}%`,
          width: size,
          height: size * 1.2,
          animationDuration: `${fall}s`,
          animationDelay: `${-r() * fall}s`,
          ["--drift" as string]: `${(r() - 0.5) * 120}px`,
        };
        return (
          <div key={i} className="petal" style={style}>
            <svg viewBox="-10 -12 20 24" width="100%" height="100%" style={{ animationDuration: `${2.5 + r() * 2.5}s` }}>
              <defs>
                <radialGradient id={`pg${i}`} cx="40%" cy="30%" r="80%">
                  <stop offset="0" stopColor={a} />
                  <stop offset="1" stopColor={b} />
                </radialGradient>
              </defs>
              <path d="M0 12 C -9 6, -10 -6, -3 -11 C -1 -12, 1 -12, 3 -11 C 10 -6, 9 6, 0 12Z" fill={`url(#pg${i})`} opacity="0.85" />
              <path d="M0 10 C -1 3, -1 -4, 0 -9" stroke={b} strokeWidth="0.5" fill="none" opacity="0.6" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/** One-shot burst of gold confetti and sparkles from the centre of its parent. */
export function Burst({ count = 40, seed = 11 }: { count?: number; seed?: number }) {
  const r = rand(seed);
  const colors = ["#b8975a", "#e6cf97", "#f7dcd6", "#d8c49a", "#efc6bd", "#8c6d36"];
  return (
    <div aria-hidden style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, pointerEvents: "none", zIndex: 6 }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + r() * 0.4;
        const dist = 90 + r() * 110;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist * 0.75 - 40;
        const star = i % 4 === 0;
        const size = star ? 12 + r() * 6 : 5 + r() * 5;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{ x: [0, dx, dx * 1.1], y: [0, dy, dy + 130], opacity: [1, 1, 0], scale: [0.4, 1, 0.8], rotate: [0, r() * 360, r() * 720] }}
            transition={{ duration: 2 + r() * 0.6, ease: "easeOut", times: [0, 0.4, 1] }}
            style={{ position: "absolute", width: size, height: star ? size : size * 1.6, marginLeft: -size / 2, marginTop: -size / 2 }}
          >
            {star ? (
              <svg viewBox="-10 -10 20 20" width="100%" height="100%">
                <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z" fill="url(#gold)" />
              </svg>
            ) : (
              <div style={{ width: "100%", height: "100%", borderRadius: 2, background: colors[i % colors.length] }} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
