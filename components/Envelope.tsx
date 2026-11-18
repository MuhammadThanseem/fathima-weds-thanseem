"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Coast, PaintedSky } from "./art/Scenes";
import { config } from "@/lib/config";
import { WaxSeal, Monogram } from "./art/Ornaments";

type Stage = 0 | 1 | 2 | 3;

export default function Envelope({ label, onOpen, onDone }: { label: string; onOpen: () => void; onDone: () => void }) {
  const [stage, setStage] = useState<Stage>(0);

  const open = () => {
    if (stage) return;
    onOpen();
    setStage(1); // untie bow
    setTimeout(() => setStage(2), 900); // flap opens, card rises
    setTimeout(() => setStage(3), 2500); // fade away
    setTimeout(onDone, 3300);
  };

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="env"
          onClick={open}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="env-stage"
          role="button"
          aria-label={label}
        >
          <div className="env-frame">
            {/* Painted coast liner */}
            <div style={{ position: "absolute", inset: 0 }}>
              <Coast w={480} h={1000} />
            </div>

            {/* Invitation card rising out */}
            <motion.div
              initial={{ y: "70%", opacity: 0 }}
              animate={stage >= 2 ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
            >
              <PaintedSky w={600} h={1000} />
              <div
                style={{
                  position: "absolute",
                  inset: "7% 9%",
                  background: "var(--paper)",
                  borderRadius: 2,
                  boxShadow: "0 0 40px rgba(10,15,40,.35), inset 0 0 0 10px var(--paper), inset 0 0 0 11px var(--gold), inset 0 0 0 15px var(--paper), inset 0 0 0 16px rgba(176,141,87,.5)",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ padding: "0 28px", display: "grid", justifyItems: "center" }}>
                  <Monogram size={78} />
                  <div className="title" style={{ fontSize: "clamp(1.9rem, 7vw, 2.4rem)", marginTop: 14 }}>{config.bride}</div>
                  <div className="script foil" style={{ fontSize: "1.9rem", margin: "2px 0" }}>&amp;</div>
                  <div className="title" style={{ fontSize: "clamp(1.9rem, 7vw, 2.4rem)" }}>{config.groom}</div>
                </div>
              </div>
            </motion.div>

            {/* Top flap (linen) */}
            <motion.div
              animate={stage >= 2 ? { rotateX: 178 } : { rotateX: 0 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "56%",
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                zIndex: stage >= 2 ? 1 : 3,
                filter: "drop-shadow(0 10px 14px rgba(30,30,60,.35))",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 8%, 50% 100%, 0 8%)",
                  backfaceVisibility: "hidden",
                }}
              >
                <Linen />
              </div>
              {/* inside of flap shows a slice of coast */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 8%, 50% 100%, 0 8%)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <Coast w={480} h={620} />
              </div>
            </motion.div>

            {/* Satin ribbon + bow */}
            <motion.div
              animate={stage >= 1 ? { opacity: 0, scaleY: 0.2 } : { opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
              style={{ position: "absolute", top: 0, bottom: 0, left: "calc(50% - 22px)", width: 44, zIndex: 4, transformOrigin: "50% 56%" }}
            >
              <Ribbon vertical />
            </motion.div>
            <motion.div
              animate={stage >= 1 ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
              style={{ position: "absolute", left: 0, right: 0, top: "calc(56% - 22px)", height: 44, zIndex: 4 }}
            >
              <Ribbon />
            </motion.div>
            <motion.div
              animate={stage >= 1 ? { scale: 0.3, opacity: 0, rotate: 25 } : { scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "backIn" }}
              style={{ position: "absolute", left: "50%", top: "56%", width: 128, height: 128, marginLeft: -64, marginTop: -64, zIndex: 5 }}
            >
              <WaxSeal />
            </motion.div>

            {/* Prompt */}
            <AnimatePresence>
              {stage === 0 && (
                <motion.div
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    bottom: "7%",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 6,
                    color: "#fff8e6",
                    textShadow: "0 1px 10px rgba(0,0,20,.7)",
                    animation: "pulse 2.2s ease-in-out infinite",
                  }}
                >
                  <div className="caps" style={{ color: "#f4e6bd", fontSize: "0.74rem", display: "inline-block", padding: "9px 20px", borderRadius: 999, background: "rgba(15,22,49,.55)", border: "1px solid rgba(227,204,152,.5)", backdropFilter: "blur(6px)" }}>{label}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Linen({ tint = "#f6eedd" }: { tint?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: tint,
        backgroundImage: `${NOISE}, linear-gradient(160deg, rgba(255,252,242,.6), rgba(214,190,150,.35))`,
      }}
    />
  );
}

function Ribbon({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: vertical
          ? "linear-gradient(90deg,#c7ab78 0%,#f6ebcf 30%,#dcc596 55%,#fff6dd 75%,#b8975d 100%)"
          : "linear-gradient(180deg,#c7ab78 0%,#f6ebcf 30%,#dcc596 55%,#fff6dd 75%,#b8975d 100%)",
        boxShadow: "0 2px 8px rgba(30,30,60,.3)",
        opacity: 0.96,
      }}
    />
  );
}
