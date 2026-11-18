"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bouquet, Filigree, Pearl, Sparkles } from "./Art";
import { config } from "@/lib/config";

const W = 400, H = 860;

/** Pearls placed every `gap` px along a straight line. */
function pearlLine(x1: number, y1: number, x2: number, y2: number, gap = 10, r = 3.6) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const n = Math.floor(len / gap);
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return <Pearl key={i} x={x1 + (x2 - x1) * t} y={y1 + (y2 - y1) * t} r={r} />;
  });
}

/** One satin sash running corner to corner, edged with gold and pearls. */
function Sash({ from, to }: { from: [number, number]; to: [number, number] }) {
  const [x1, y1] = from, [x2, y2] = to;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  // Rounded so server & browser trig results match exactly (avoids hydration mismatch).
  const nx = +(-Math.sin(ang)).toFixed(6), ny = +Math.cos(ang).toFixed(6);
  const half = 34;
  const p = (s: number) => [x1 + nx * s, y1 + ny * s, x2 + nx * s, y2 + ny * s] as const;
  const [a1, b1, a2, b2] = p(half), [c1, d1, c2, d2] = p(-half);
  const [e1, f1, e2, f2] = p(half + 9), [g1, h1, g2, h2] = p(-half - 9);
  return (
    <g>
      <polygon points={`${a1},${b1} ${a2},${b2} ${c2},${d2} ${c1},${d1}`} fill="url(#satin)" opacity="0.95" />
      {/* soft folds */}
      {[-18, -4, 12, 24].map((s) => (
        <line key={s} x1={x1 + nx * s} y1={y1 + ny * s} x2={x2 + nx * s} y2={y2 + ny * s} stroke="#efd2d7" strokeWidth={s % 2 ? 5 : 3} opacity="0.7" />
      ))}
      <line x1={a1} y1={b1} x2={a2} y2={b2} stroke="url(#gold)" strokeWidth="2" />
      <line x1={c1} y1={d1} x2={c2} y2={d2} stroke="url(#gold)" strokeWidth="2" />
      {pearlLine(e1, f1, e2, f2)}
      {pearlLine(g1, h1, g2, h2)}
    </g>
  );
}

export function EnvelopeArt() {
  const cx = W / 2, cy = H * 0.52;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width={W} height={H} fill="url(#ivoryPanel)" />
      <rect width={W} height={H} fill="url(#lace)" opacity="0.35" />
      {/* inner gold border */}
      <rect x="14" y="14" width={W - 28} height={H - 28} fill="none" stroke="url(#gold)" strokeWidth="1.2" />
      <Filigree x={cx} y={70} s={0.95} />
      <Filigree x={cx} y={H - 70} s={0.95} flipY />
      {/* X sashes */}
      <Sash from={[-60, 40]} to={[cx, cy]} />
      <Sash from={[W + 60, 40]} to={[cx, cy]} />
      <Sash from={[cx, cy]} to={[-60, H - 40]} />
      <Sash from={[cx, cy]} to={[W + 60, H - 40]} />
      {/* bouquets along the sash edges */}
      <Bouquet x={-10} y={10} s={0.75} seed={3} />
      <Bouquet x={W + 10} y={10} s={0.75} flip seed={5} />
      <Bouquet x={-10} y={H - 120} s={0.75} seed={7} />
      <Bouquet x={W + 10} y={H - 120} s={0.75} flip seed={11} />
      <Bouquet x={20} y={cy - 50} s={0.55} seed={13} />
      <Bouquet x={W - 20} y={cy - 50} s={0.55} flip seed={17} />
    </svg>
  );
}

/** Satin bow + gold wax seal + pearl tassels. */
function BowSeal() {
  return (
    <svg viewBox="-110 -80 220 240" width="100%" height="100%" style={{ overflow: "visible", filter: "drop-shadow(0 6px 10px rgba(110,40,60,.3))" }}>
      {/* loops */}
      <path d="M0 0 C -30 -60, -100 -60, -96 -8 C -92 30, -40 26, 0 6Z" fill="url(#satin)" stroke="#e2b9c0" />
      <path d="M0 0 C 30 -60, 100 -60, 96 -8 C 92 30, 40 26, 0 6Z" fill="url(#satin)" stroke="#e2b9c0" />
      <path d="M-20 -6 C -40 -30, -70 -34, -84 -14 M20 -6 C 40 -30, 70 -34, 84 -14" stroke="#efd0d5" strokeWidth="3" fill="none" />
      {/* tails */}
      <path d="M-6 8 C -30 50, -50 80, -64 120 L -40 112 C -28 80, -12 50, 4 12Z" fill="url(#satin)" stroke="#e2b9c0" />
      <path d="M6 8 C 30 50, 50 80, 64 120 L 40 112 C 28 80, 12 50, -4 12Z" fill="url(#satin)" stroke="#e2b9c0" />
      {/* pearl tassels */}
      {[-24, -12, 0, 12, 24].map((x, i) => {
        const len = [70, 96, 120, 96, 70][i];
        return (
          <g key={x}>
            <line x1={x} y1={20} x2={x} y2={20 + len} stroke="#e6c3c9" strokeWidth="0.6" />
            {Array.from({ length: Math.floor(len / 9) }, (_, k) => <Pearl key={k} x={x} y={26 + k * 9} r={k === Math.floor(len / 9) - 1 ? 5 : 3.2} />)}
          </g>
        );
      })}
      {/* wax seal */}
      <path d="M0 -30 C 14 -32, 30 -18, 30 -2 C 32 14, 16 30, 0 30 C -18 32, -32 16, -30 0 C -32 -16, -16 -30, 0 -30Z" fill="url(#seal)" />
      <circle r="21" fill="none" stroke="#9a4f5e" strokeWidth="1.2" opacity="0.7" />
      <circle r="17" fill="none" stroke="#fbdde2" strokeWidth="0.6" opacity="0.8" />
      <text y="6" textAnchor="middle" fontFamily="Great Vibes, cursive" fontSize="20" fill="#85404f">{config.initials.replace(" ", "&")}</text>
    </svg>
  );
}

function SaveTheDate() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 42%, #fffafb 0%, #f9e6e9 55%, #f0d3d8 100%)" }}>
      {/* pearl side rails */}
      <svg viewBox="0 0 400 860" width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <line x1="22" y1="0" x2="22" y2="860" stroke="url(#gold)" strokeWidth="3" />
        <line x1="378" y1="0" x2="378" y2="860" stroke="url(#gold)" strokeWidth="3" />
        {Array.from({ length: 86 }, (_, i) => (
          <g key={i}>
            <Pearl x={32} y={i * 10 + 5} r={3.6} />
            <Pearl x={368} y={i * 10 + 5} r={3.6} />
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", top: 40, left: 40, width: 120, height: 90, opacity: 0.9 }}>
        <svg viewBox="-20 -20 180 130" width="100%" height="100%"><Bouquet s={0.6} seed={21} /></svg>
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 320, height: 320, transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,214,222,.85) 0%, rgba(255,214,222,0) 65%)", animation: "glow 3s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.4, delay: 0.3 }}>
          <div className="script gold-text" style={{ fontSize: "5.2rem", lineHeight: 1 }}>Save</div>
          <div className="script gold-text" style={{ fontSize: "3.4rem", lineHeight: 1.1 }}>The</div>
          <div className="script gold-text" style={{ fontSize: "5.2rem", lineHeight: 1 }}>Date</div>
        </motion.div>
      </div>
      <Sparkles count={18} seed={4} />
    </div>
  );
}

export default function Envelope({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const [stage, setStage] = useState(0); // 0 closed · 1 seal off · 2 doors open (save the date) · 3 leaving

  const open = () => {
    if (stage) return;
    onOpen();
    setStage(1);
    setTimeout(() => setStage(2), 700);
    setTimeout(() => setStage(3), 4200);
    setTimeout(onDone, 5200);
  };

  const door = (side: "l" | "r") => (
    <motion.div
      animate={stage >= 2 ? { x: side === "l" ? "-100%" : "100%", rotateY: side === "l" ? 25 : -25 } : { x: 0, rotateY: 0 }}
      transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
      style={{
        position: "absolute",
        inset: 0,
        clipPath: side === "l" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
        transformOrigin: side === "l" ? "left center" : "right center",
        zIndex: 3,
      }}
    >
      <EnvelopeArt />
    </motion.div>
  );

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="env"
          onClick={open}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
          transition={{ duration: 1 }}
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "center", background: "#e9c9cf", cursor: "pointer", perspective: 1600 }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 480, height: "100%", overflow: "hidden" }}>
            {stage >= 1 && <SaveTheDate />}
            {door("l")}
            {door("r")}
            <motion.div
              animate={stage >= 1 ? { scale: 0.4, opacity: 0, y: 30 } : { scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "backIn" }}
              style={{ position: "absolute", left: "50%", top: "52%", width: 220, height: 240, marginLeft: -110, marginTop: -80, zIndex: 4 }}
            >
              <div style={{ animation: "floaty 3s ease-in-out infinite", width: "100%", height: "100%" }}>
                <BowSeal />
              </div>
            </motion.div>
            {stage === 0 && (
              <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, textAlign: "center", zIndex: 5, animation: "glow 2s ease-in-out infinite" }}>
                <span style={{ fontFamily: "var(--caps)", fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--gold-dark)", background: "rgba(255,246,248,.85)", padding: "8px 16px", borderRadius: 999 }}>
                  TAP TO OPEN
                </span>
              </div>
            )}
            <Sparkles count={10} seed={9} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
