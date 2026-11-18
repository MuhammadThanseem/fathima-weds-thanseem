"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { rand } from "./Art";
import { config } from "@/lib/config";

/* Envelope geometry, in viewBox units. The envelope always keeps this aspect
   ratio and is scaled to cover the screen, so every layer lines up exactly. */
const W = 400, H = 860;
const TIP = 0.47;          // top flap point (and the seal), as a fraction of H
const TY = H * TIP;
const BY = TY + 26;        // bottom flap point, tucked just under the seal
const EASE = [0.65, 0, 0.35, 1] as const;
/** Round so server and browser render identical SVG numbers (avoids hydration mismatches). */
const f = (n: number) => Math.round(n * 100) / 100;

/* ───────── embossed white florals ───────── */
const PAPER = "#f7f6f3";
const LINE = "#e2ddd5";

const PETAL = "M0 0 C -12 -3, -17 -17, -7 -22 C -2 -25, 5 -25, 9 -21 C 17 -13, 11 -2, 0 0Z";

function ERose({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} filter="url(#emboss)">
      {[0, 72, 144, 216, 288].map((a) => <path key={a} d={PETAL} transform={`rotate(${a})`} fill={PAPER} stroke={LINE} strokeWidth="0.6" />)}
      {[36, 108, 180, 252, 324].map((a) => <path key={a} d={PETAL} transform={`rotate(${a}) scale(.68)`} fill={PAPER} stroke={LINE} strokeWidth="0.6" />)}
      <circle r="7.5" fill={PAPER} stroke={LINE} strokeWidth="0.6" />
      <path d="M-4.5 0.5 C -4.5 -5, 4 -6, 5 -1 C 6 4, -1 6, -3 3 C -4.5 0.5, 0 -2.5, 1.5 0.5" fill="none" stroke="#d9d3ca" strokeWidth="0.8" />
    </g>
  );
}

function ELeaf({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} filter="url(#emboss)">
      <path d="M0 0 C 7 -6, 8 -19, 0 -28 C -8 -19, -7 -6, 0 0Z" fill={PAPER} stroke={LINE} strokeWidth="0.5" />
      <path d="M0 -2 V -25" stroke="#e0dad1" strokeWidth="0.6" />
    </g>
  );
}

function EBloom({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#emboss)">
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-5" rx="3.4" ry="5.5" transform={`rotate(${a})`} fill={PAPER} stroke={LINE} strokeWidth="0.5" />)}
      <circle r="2" fill="#ece7df" />
    </g>
  );
}

/** A full bouquet: roses in the middle, leaves and small blooms radiating out. */
function Bouquet({ x, y, s = 1, seed = 1, wide = 1 }: { x: number; y: number; s?: number; seed?: number; wide?: number }) {
  const r = rand(seed);
  const leaves = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 + r() * 0.3;
    const d = 38 + r() * 18;
    return <ELeaf key={`l${i}`} x={f(Math.cos(a) * d * wide)} y={f(Math.sin(a) * d * 0.8)} r={f((a * 180) / Math.PI + 90)} s={f(0.8 + r() * 0.4)} />;
  });
  const blooms = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + 0.3;
    const d = 52 + r() * 16;
    return <EBloom key={`b${i}`} x={f(Math.cos(a) * d * wide)} y={f(Math.sin(a) * d * 0.75)} s={f(0.7 + r() * 0.4)} />;
  });
  const roses: [number, number, number][] = [[0, 0, 1.25], [-34 * wide, 8, 0.95], [34 * wide, 6, 1], [-14, -30, 0.85], [18, -28, 0.8], [-6, 32, 0.8], [26, 30, 0.7], [-30, -12, 0.6]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {leaves}
      {blooms}
      {roses.map(([rx, ry, rs], i) => <ERose key={i} x={rx} y={ry} s={rs} r={f(r() * 70)} />)}
    </g>
  );
}

/** Roses cascading down a side flap. */
function Cascade({ x, y, h, flip = false, seed = 1 }: { x: number; y: number; h: number; flip?: boolean; seed?: number }) {
  const r = rand(seed);
  const n = 7;
  const pts = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [f(Math.sin(t * Math.PI * 2.2) * 16), f(t * h)] as const;
  });
  const stem = `M${pts.map(([px, py]) => `${px} ${py}`).join(" L")}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d={stem} fill="none" stroke="#efebe5" strokeWidth="2.4" filter="url(#emboss)" strokeLinejoin="round" />
      {pts.map(([px, py], i) => (
        <g key={i}>
          <ELeaf x={px} y={py} r={i % 2 ? 60 : -60} s={0.9} />
          <ELeaf x={px} y={py + 10} r={i % 2 ? -120 : 120} s={0.75} />
          <EBloom x={px + (i % 2 ? -18 : 18)} y={py + 20} s={0.8} />
          {i % 2 === 0 ? <ERose x={px + 6} y={py - 4} s={f(0.95 - i * 0.06)} r={f(r() * 60)} /> : <ERose x={px - 4} y={py + 2} s={0.6} r={f(r() * 60)} />}
        </g>
      ))}
    </g>
  );
}

/* ───────── wax seal with a gold ring ───────── */
function Seal() {
  const blob = "M0 -50 C 14 -54, 22 -44, 34 -40 C 48 -34, 50 -20, 52 -6 C 56 10, 46 20, 40 32 C 32 46, 18 50, 4 52 C -10 56, -22 46, -34 40 C -48 32, -52 18, -52 4 C -56 -10, -46 -22, -40 -34 C -32 -48, -16 -48, 0 -50Z";
  return (
    <svg viewBox="-60 -60 120 120" width="100%" height="100%" style={{ overflow: "visible", filter: "drop-shadow(0 5px 7px rgba(80,70,60,.3))" }}>
      <path d={blob} fill="url(#waxSeal)" />
      <circle r="35" fill="#f4f0ea" />
      <circle r="35" fill="none" stroke="url(#gold)" strokeWidth="2.6" />
      <circle r="30" fill="none" stroke="url(#gold)" strokeWidth="0.8" opacity="0.8" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} cx={f(Math.cos((i / 24) * Math.PI * 2) * 32.5)} cy={f(Math.sin((i / 24) * Math.PI * 2) * 32.5)} r="0.9" fill="#c9a865" />
      ))}
      <g filter="url(#emboss)" fill="#f2ede6">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <ellipse key={a} cx="0" cy="-12" rx="5" ry="11" transform={`rotate(${a})`} stroke="#e2d9cb" strokeWidth=".6" />)}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => <ellipse key={a} cx="0" cy="-8" rx="3" ry="7" transform={`rotate(${a})`} stroke="#e2d9cb" strokeWidth=".6" />)}
      </g>
      <circle r="5" fill="url(#gold)" />
    </svg>
  );
}

/* ───────── envelope layers ───────── */
function Pocket() {
  const left = `M0 0 L ${W / 2 - 6} ${TY + 4} Q ${W / 2} ${TY + 8} ${W / 2 - 4} ${BY + 6} L 0 ${H} Z`;
  const right = `M${W} 0 L ${W / 2 + 6} ${TY + 4} Q ${W / 2} ${TY + 8} ${W / 2 + 4} ${BY + 6} L ${W} ${H} Z`;
  const bottom = `M0 ${H} L ${W / 2 - 8} ${BY + 4} Q ${W / 2} ${BY - 2} ${W / 2 + 8} ${BY + 4} L ${W} ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <filter id="flapShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="-1.5" stdDeviation="2.2" floodColor="#8f877d" floodOpacity="0.28" />
        </filter>
        <filter id="sideShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#8f877d" floodOpacity="0.22" />
        </filter>
      </defs>
      <path d={left} fill="#f3f2ef" filter="url(#sideShadow)" />
      <path d={right} fill="#f3f2ef" filter="url(#sideShadow)" />
      <Cascade x={46} y={150} h={560} seed={3} />
      <Cascade x={W - 46} y={150} h={560} seed={8} flip />
      <path d={bottom} fill="#f6f5f2" filter="url(#flapShadow)" />
      <Bouquet x={W / 2} y={H - 150} s={1.05} seed={20} wide={1.25} />
      <Bouquet x={W / 2 - 92} y={H - 40} s={0.55} seed={21} />
      <Bouquet x={W / 2 + 92} y={H - 40} s={0.55} seed={22} />
    </svg>
  );
}

function TopFlapFace() {
  return (
    <svg viewBox={`0 0 ${W} ${TY}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
      <path d={`M0 0 H${W} L ${W / 2 + 8} ${TY - 6} Q ${W / 2} ${TY + 2} ${W / 2 - 8} ${TY - 6} Z`} fill="#f8f7f5" />
      <Bouquet x={W / 2} y={150} s={1.1} seed={30} wide={1.3} />
      <Bouquet x={W / 2 - 110} y={48} s={0.5} seed={31} />
      <Bouquet x={W / 2 + 110} y={48} s={0.5} seed={32} />
    </svg>
  );
}

/* ───────── the gold moment ───────── */
function GoldBurst() {
  const r = rand(77);
  const dust = Array.from({ length: 80 }, () => ({
    x: r() * 100, y: r() * 100, size: 2 + r() * 5, delay: r() * 0.35, dur: 1.4 + r() * 1.2, star: r() > 0.7, fall: 4 + r() * 10,
  }));
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 8 }}>
      {/* glow behind the seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 1, 0.5], scale: [0.2, 1.6, 3] }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        style={{ position: "absolute", left: "50%", top: `${TIP * 100}%`, width: "60%", aspectRatio: "1", translate: "-50% -50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,200,.95) 0%, rgba(230,200,130,.55) 35%, rgba(214,189,132,0) 70%)", mixBlendMode: "multiply" }}
      />
      {/* gold ripples */}
      {[0, 0.22, 0.44].map((d) => (
        <motion.div
          key={d}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.3, 5.5] }}
          transition={{ duration: 1.6, delay: d, ease: "easeOut" }}
          style={{ position: "absolute", left: "50%", top: `${TIP * 100}%`, width: "34%", aspectRatio: "1", translate: "-50% -50%", borderRadius: "50%", border: "1.5px solid #cfae6a", boxShadow: "0 0 12px rgba(214,189,132,.6), inset 0 0 12px rgba(214,189,132,.4)" }}
        />
      ))}
      {/* gold sheen sweeping the whole envelope */}
      <motion.div
        initial={{ backgroundPosition: "130% 0" }}
        animate={{ backgroundPosition: "-30% 0" }}
        transition={{ duration: 1.3, delay: 0.15, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(115deg, transparent 38%, rgba(222,190,120,.55) 47%, rgba(255,244,214,.9) 50%, rgba(222,190,120,.55) 53%, transparent 62%)", backgroundSize: "250% 100%", backgroundRepeat: "no-repeat", mixBlendMode: "multiply" }}
      />
      {/* glitter flung from the seal to every corner */}
      {dust.map((p, i) => (
        <motion.div
          key={i}
          initial={{ left: "50%", top: `${TIP * 100}%`, opacity: 0, scale: 0 }}
          animate={{ left: `${p.x}%`, top: [`${TIP * 100}%`, `${p.y}%`, `${p.y + p.fall}%`], opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.6] }}
          transition={{ duration: p.dur + 1.2, delay: p.delay, ease: [0.16, 1, 0.3, 1], times: [0, 0.35, 0.75, 1] }}
          style={{ position: "absolute", width: p.star ? p.size * 2.4 : p.size, height: p.star ? p.size * 2.4 : p.size, translate: "-50% -50%" }}
        >
          {p.star ? (
            <svg viewBox="-10 -10 20 20" width="100%" height="100%"><path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z" fill="url(#gold)" /></svg>
          ) : (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #fff6d8, #d6b46e 60%, #9c7a3c)", boxShadow: "0 0 6px rgba(230,200,130,.9)" }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/** Gold lines tracing every crease of the envelope. */
function GoldCreases({ show }: { show: boolean }) {
  const lines = [
    `M0 0 L ${W / 2} ${TY} L ${W} 0`,
    `M0 ${H} L ${W / 2} ${BY} L ${W} ${H}`,
    `M6 6 H${W - 6} V${H - 6} H6 Z`,
  ];
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", inset: 0, zIndex: 7, pointerEvents: "none" }}
    >
      {lines.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#gold)"
          strokeWidth={i === 2 ? 1.2 : 1.8}
          pathLength={1}
          strokeDasharray="1 1"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 3px rgba(230,200,130,.9))" }}
        />
      ))}
    </motion.svg>
  );
}

/* ───────── the card that slides out ───────── */
function Card() {
  const d = new Date(config.dateISO);
  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "linear-gradient(170deg,#fffdf9,#f6f1e8)", boxShadow: "0 10px 30px rgba(120,100,70,.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "2.5cqw", padding: "6cqw" }}>
      <div style={{ position: "absolute", inset: "2.5cqw", border: "1px solid var(--gold-soft)", borderRadius: "inherit", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "3.6cqw", border: "0.5px solid var(--gold-soft)", pointerEvents: "none" }} />
      <div className="arabic" style={{ fontSize: "5cqw", color: "var(--gold-dark)" }}>بِسْمِ ٱللَّٰهِ</div>
      <div className="caps" style={{ fontSize: "2.6cqw", letterSpacing: ".3em" }}>{config.ceremony}</div>
      <div className="script shimmer" style={{ fontSize: "11cqw", lineHeight: 1.1 }}>{config.brideShort}</div>
      <div className="script" style={{ fontSize: "6cqw", color: "var(--gold-dark)" }}>&amp;</div>
      <div className="script shimmer" style={{ fontSize: "11cqw", lineHeight: 1.1, animationDelay: "1s" }}>{config.groomShort}</div>
      <div style={{ width: "30cqw", height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "1cqw 0" }} />
      <div className="caps" style={{ fontSize: "2.8cqw", letterSpacing: ".28em", color: "var(--gold-dark)" }}>
        {d.toLocaleDateString("en", { day: "2-digit", month: "long", year: "numeric" })}
      </div>
    </div>
  );
}

export default function Envelope({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  // 0 sealed · 1 gold burst · 2 flap opens · 3 card slides out · 4 card fills the screen · 5 gone
  const [stage, setStage] = useState(0);

  const open = () => {
    if (stage) return;
    onOpen();
    setStage(1);
    setTimeout(() => setStage(2), 1500);
    setTimeout(() => setStage(3), 2600);
    setTimeout(() => setStage(4), 3900);
    setTimeout(() => setStage(5), 4900);
    setTimeout(onDone, 5500);
  };

  return (
    <AnimatePresence>
      {stage < 5 && (
        <motion.div
          key="env"
          onClick={open}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "center", background: "#e8e3dc", cursor: stage ? "default" : "pointer" }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 480, height: "100%", overflow: "hidden", containerType: "size", background: "radial-gradient(ellipse at 50% 30%, #fbf7f0, #ece4d6 75%)" }}>
            {/* envelope, scaled to cover the screen at a fixed aspect ratio */}
            <motion.div
              initial={false}
              animate={stage === 2 || stage === 3 ? { scale: 0.64, y: "18%" } : { scale: 1, y: "0%" }}
              transition={{ duration: stage >= 4 ? 0.9 : 1.1, ease: EASE }}
              style={{ position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", width: `max(100cqw, calc(100cqh * ${W} / ${H}))`, aspectRatio: `${W} / ${H}`, containerType: "size", perspective: 1400 }}
            >
              {/* inside of the envelope */}
              <motion.div animate={{ opacity: stage >= 4 ? 0 : 1 }} transition={{ duration: 0.6 }} style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 50% 25%, #f4f1ec, #e4dfd8 70%)" }} />

              {/* the card */}
              <motion.div
                initial={false}
                animate={
                  stage >= 4
                    ? { left: "0%", top: "0%", width: "100%", height: "100%", borderRadius: 0 }
                    : stage >= 3
                      ? { left: "8%", top: "-40%", width: "84%", height: "62%", borderRadius: 6 }
                      : { left: "8%", top: "26%", width: "84%", height: "62%", borderRadius: 6 }
                }
                transition={{ duration: stage >= 4 ? 0.9 : 1.2, ease: EASE }}
                style={{ position: "absolute", zIndex: stage >= 4 ? 9 : 2, containerType: "inline-size" }}
              >
                <Card />
              </motion.div>

              {/* side + bottom flaps */}
              <motion.div animate={{ opacity: stage >= 4 ? 0 : 1, y: stage >= 4 ? "6%" : "0%" }} transition={{ duration: 0.7 }} style={{ position: "absolute", inset: 0, zIndex: 3 }}>
                <Pocket />
              </motion.div>

              {/* top flap folds back */}
              <motion.div
                initial={false}
                animate={{ rotateX: stage >= 2 ? 180 : 0, opacity: stage >= 4 ? 0 : 1 }}
                transition={{ duration: 1.2, ease: EASE }}
                style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${TIP * 100}%`, transformOrigin: "top center", transformStyle: "preserve-3d", zIndex: stage >= 3 ? 1 : 4 }}
              >
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", filter: "drop-shadow(0 3px 4px rgba(110,100,90,.28))" }}><TopFlapFace /></div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateX(180deg)", clipPath: `polygon(0 0, 100% 0, 50% 100%)`, background: "linear-gradient(180deg,#ebe7e1,#f2efea)" }} />
              </motion.div>

              {/* wax seal */}
              <motion.button
                type="button"
                aria-label="Open the invitation"
                onClick={(e) => { e.stopPropagation(); open(); }}
                animate={
                  stage >= 2 ? { scale: 1.35, opacity: 0 } : stage === 1 ? { scale: [1, 0.88, 1.12, 1.04] } : { scale: 1 }
                }
                transition={{ duration: stage >= 2 ? 0.5 : 0.9, ease: "easeOut" }}
                className={stage === 0 ? "seal-idle" : undefined}
                style={{ position: "absolute", left: "50%", top: `${TIP * 100}%`, width: "30%", aspectRatio: "1", marginLeft: "-15%", marginTop: "-15%", zIndex: 6, background: "none", border: 0, padding: 0, cursor: "pointer", borderRadius: "50%" }}
              >
                <Seal />
              </motion.button>

              {stage >= 1 && stage < 4 && <GoldCreases show={stage < 2} />}
              {stage >= 1 && stage < 4 && <GoldBurst />}

              {stage === 0 && (
                <div style={{ position: "absolute", left: 0, right: 0, top: `calc(${TIP * 100}% + 19cqw)`, textAlign: "center", zIndex: 6, animation: "glow 2s ease-in-out infinite", pointerEvents: "none" }}>
                  <span className="caps" style={{ fontSize: "2.6cqw", letterSpacing: ".32em", color: "#a08a5c", background: "rgba(247,246,243,.85)", padding: "4px 10px", borderRadius: 20 }}>Tap the seal to open</span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
