"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bismillah, BowParts, Dove, Monogram } from "./Art";
import { config } from "@/lib/config";

const ease = [0.65, 0, 0.35, 1] as const;

export default function Intro({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const [stage, setStage] = useState(0); // 0 navy intro · 1 bow in the sky · 2 bow unties + doves · 3 gone
  const date = new Date(config.dateISO);
  const dateText = `${date.toLocaleDateString("en-GB", { weekday: "long" })} · ${date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;

  const open = () => {
    if (stage) return;
    onOpen();
    setStage(1);
    setTimeout(() => setStage(2), 1500);
    setTimeout(() => setStage(3), 3300);
    setTimeout(onDone, 4100);
  };

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", justifyContent: "center", background: "#0d1222" }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 480, height: "100%", overflow: "hidden" }}>
            {/* ── Sky behind the bow ── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 30% at 50% 95%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 60% 20% at 20% 80%, #f6f8fc 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg,#86abd6 0%,#bcd1e8 50%,#eef3f9 100%)",
              }}
            />
            <div style={{ position: "absolute", left: "-20%", right: "-20%", bottom: "-6%", height: "40%", background: "radial-gradient(circle at 20% 60%, #fff 0 18%, transparent 30%), radial-gradient(circle at 50% 70%, #fff 0 22%, transparent 34%), radial-gradient(circle at 80% 60%, #fff 0 18%, transparent 30%), radial-gradient(circle at 35% 40%, #f3f6fb 0 14%, transparent 26%), radial-gradient(circle at 68% 42%, #f3f6fb 0 14%, transparent 26%)", filter: "blur(6px)" }} />

            {/* ── The satin bow ── */}
            {stage >= 1 && (
              <motion.div
                initial={{ scale: 1.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease }}
                style={{ position: "absolute", inset: 0 }}
              >
                <motion.div
                  animate={stage >= 2 ? { x: "-120%", y: "-30%", rotate: -35, scale: 1.4, opacity: 0 } : {}}
                  transition={{ duration: 1.4, ease }}
                  style={{ position: "absolute", left: "-22%", top: "18%", width: "78%", height: "50%" }}
                >
                  {BowParts.leftLoop}
                </motion.div>
                <motion.div
                  animate={stage >= 2 ? { x: "120%", y: "-30%", rotate: 35, scale: 1.4, opacity: 0 } : {}}
                  transition={{ duration: 1.4, ease }}
                  style={{ position: "absolute", right: "-22%", top: "18%", width: "78%", height: "50%" }}
                >
                  {BowParts.rightLoop}
                </motion.div>
                <motion.div
                  animate={stage >= 2 ? { y: "60%", opacity: 0 } : {}}
                  transition={{ duration: 1.2, ease }}
                  style={{ position: "absolute", left: "8%", right: "8%", top: "52%", height: "50%" }}
                >
                  {BowParts.tails}
                </motion.div>
                <motion.div
                  animate={stage >= 2 ? { scale: 3, opacity: 0 } : {}}
                  transition={{ duration: 1.1, ease }}
                  style={{ position: "absolute", left: "50%", top: "43%", width: 130, height: 140, marginLeft: -65, marginTop: -70 }}
                >
                  {BowParts.knot}
                </motion.div>
              </motion.div>
            )}

            {/* ── Monogram floats above everything once the bow appears ── */}
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ position: "absolute", left: "50%", top: "33%", marginLeft: -60, marginTop: -60, zIndex: 3 }}
              >
                <Monogram size={120} orbit />
              </motion.div>
            )}

            {/* ── Doves fly up as the bow comes undone ── */}
            {stage >= 2 &&
              [
                { x: "8%", y: "85%", tx: "-10vw", ty: "-110vh", s: 70, d: 0, f: false },
                { x: "60%", y: "95%", tx: "20vw", ty: "-120vh", s: 90, d: 0.15, f: true },
                { x: "30%", y: "100%", tx: "-5vw", ty: "-115vh", s: 56, d: 0.3, f: false },
                { x: "75%", y: "70%", tx: "30vw", ty: "-90vh", s: 64, d: 0.05, f: true },
                { x: "45%", y: "80%", tx: "10vw", ty: "-100vh", s: 46, d: 0.45, f: true },
              ].map((dv, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: dv.tx, y: dv.ty, opacity: [0, 1, 1, 0.9] }}
                  transition={{ duration: 2.4, delay: dv.d, ease: "easeOut" }}
                  style={{ position: "absolute", left: dv.x, top: dv.y, zIndex: 4 }}
                >
                  <Dove size={dv.s} flip={dv.f} delay={i * 0.07} />
                </motion.div>
              ))}

            {/* ── Navy intro card ── */}
            <AnimatePresence>
              {stage === 0 && (
                <motion.div
                  key="navy"
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.9 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 5,
                    background: "radial-gradient(ellipse 80% 50% at 50% 35%, #1c2440 0%, #12182b 60%, #0d1222 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "0 24px",
                    gap: 22,
                    paddingBottom: "12%",
                  }}
                >
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }} style={{ width: "100%" }}>
                    <Bismillah size={2.2} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.6 }}>
                    <Monogram size={112} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
                    <div className="caps" style={{ color: "#c8cde0", fontSize: ".66rem", letterSpacing: ".38em" }}>{config.ceremony}</div>
                    <div style={{ color: "#c8cde0", fontStyle: "italic", fontSize: "1.05rem", marginTop: 14 }}>{dateText}</div>
                  </motion.div>
                  <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3 }} className="pill-open" onClick={open}>
                    Open Invitation
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
