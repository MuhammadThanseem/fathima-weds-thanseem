"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { archD, cuspedD, FloralCorner, Flourish, Lantern, MosqueScene, PalaceScene, RoseCluster, Sparkles, TimelineArt } from "./Art";
import ScratchCard from "./Scratch";
import { Burst } from "./Effects";
import { config } from "@/lib/config";

const fade = (delay = 0, y = 22) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ═════════ 1. WELCOME — arch window onto the mosque ═════════ */
export function Welcome() {
  return (
    <section className="screen" style={{ background: "linear-gradient(180deg,#f3eee7,#e9e1d6)" }}>
      <svg viewBox="0 0 400 760" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <clipPath id="heroWin"><path d={`${cuspedD(62, 70, 276, 690, 0.36, 8)} Z`} /></clipPath>
        </defs>
        {/* carved stone frame */}
        <path d={`${archD(24, 30, 352, 740, 0.36)} Z`} fill="url(#stone)" />
        <path d={`${archD(24, 30, 352, 740, 0.36)} Z`} fill="url(#jali)" opacity="0.45" />
        <path d={archD(40, 48, 320, 720, 0.36)} fill="none" stroke="#c4b195" strokeWidth="1.5" />
        <path d={archD(52, 60, 296, 710, 0.36)} fill="none" stroke="#fffaf2" strokeWidth="2" />
        {/* scene */}
        <g clipPath="url(#heroWin)">
          <g className="hero-zoom">
          {config.heroImage ? (
            <image href={config.heroImage} x="62" y="70" width="276" height="690" preserveAspectRatio="xMidYMid slice" />
          ) : (
            <svg x="40" y="70" width="320" height="690" viewBox="0 0 300 520" preserveAspectRatio="xMidYMid slice"><MosqueScene /></svg>
          )}
          </g>
          <rect x="62" y="70" width="276" height="300" fill="url(#sky)" opacity="0.25" />
        </g>
        <path d={cuspedD(62, 70, 276, 690, 0.36, 8)} fill="none" stroke="#b9a685" strokeWidth="2" />
        <path d={cuspedD(56, 64, 288, 696, 0.36, 8)} fill="none" stroke="#fffaf2" strokeWidth="1.5" opacity="0.8" />
        {/* columns */}
        {[44, 344].map((x) => (
          <g key={x}>
            <rect x={x} y="330" width="12" height="430" fill="#e8dece" stroke="#c9b79c" strokeWidth="0.8" />
            <rect x={x - 3} y="324" width="18" height="8" fill="#d9c9ae" />
          </g>
        ))}
      </svg>

      {/* lush rose clusters in every corner */}
      <div style={{ position: "absolute", top: -18, left: -26, width: 215, height: 160, zIndex: 3 }}>
        <svg viewBox="0 0 215 160" width="100%" height="100%" overflow="visible" className="floral-sway"><RoseCluster seed={4} /></svg>
      </div>
      <div style={{ position: "absolute", top: -18, right: -26, width: 215, height: 160, zIndex: 3 }}>
        <svg viewBox="0 0 215 160" width="100%" height="100%" overflow="visible" className="floral-sway" style={{ animationDelay: "-3s" }}><g transform="translate(215 0) scale(-1 1)"><RoseCluster seed={9} /></g></svg>
      </div>
      <div style={{ position: "absolute", bottom: -22, left: -30, width: 230, height: 170, zIndex: 3 }}>
        <svg viewBox="0 0 230 170" width="100%" height="100%" overflow="visible" className="floral-sway" style={{ animationDelay: "-1.5s" }}><g transform="translate(0 170) scale(1 -1)"><RoseCluster seed={14} /></g></svg>
      </div>
      <div style={{ position: "absolute", bottom: -22, right: -30, width: 230, height: 170, zIndex: 3 }}>
        <svg viewBox="0 0 230 170" width="100%" height="100%" overflow="visible" className="floral-sway" style={{ animationDelay: "-4.5s" }}><g transform="translate(230 170) scale(-1 -1)"><RoseCluster seed={17} /></g></svg>
      </div>

      {/* lanterns hanging inside the arch */}
      {[
        { side: "left", x: "11%", chain: 150, size: 30, delay: 0 },
        { side: "left", x: "19%", chain: 205, size: 21, delay: 1.1 },
        { side: "right", x: "11%", chain: 150, size: 30, delay: 0.6 },
        { side: "right", x: "19%", chain: 205, size: 21, delay: 1.6 },
      ].map((l, i) => (
        <div key={i} style={{ position: "absolute", top: 0, [l.side]: l.x, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", transformOrigin: "50% 0", animation: `sway 5s ease-in-out ${l.delay}s infinite`, marginLeft: l.side === "left" ? -l.size / 2 : 0, marginRight: l.side === "right" ? -l.size / 2 : 0 }}>
          <div style={{ width: 1, height: l.chain, background: "linear-gradient(180deg, transparent, #b8975a 30%, #8c6d36)" }} />
          <Lantern size={l.size} delay={l.delay} />
        </div>
      ))}

      <Sparkles count={12} seed={2} />

      <div style={{ position: "absolute", left: "16%", right: "16%", top: "25%", textAlign: "center", zIndex: 4, textShadow: "0 0 14px rgba(255,250,244,.95), 0 0 4px rgba(255,250,244,.9)" }}>
        <motion.div {...fade(0.3)} style={{ fontSize: "1.05rem", color: "#6c6260", letterSpacing: ".02em" }}>Welcome to the</motion.div>
        <motion.div {...fade(0.5)} className="script" style={{ fontSize: "2.05rem", color: "#5f5452", lineHeight: 1.1 }}>{config.ceremony}</motion.div>
        <motion.div {...fade(0.7)} style={{ fontSize: "1.05rem", color: "#6c6260", marginTop: 2 }}>of</motion.div>
        <motion.div {...fade(0.9)} className="script shimmer" style={{ fontSize: "2.35rem", lineHeight: 1.05, color: "#5f5452", marginTop: 4, textWrap: "balance" }}>{config.bride}</motion.div>
        <motion.div {...fade(1.1)} className="script" style={{ fontSize: "1.5rem", color: "#5f5452", lineHeight: 1 }}>&amp;</motion.div>
        <motion.div {...fade(1.3)} className="script shimmer" style={{ fontSize: "2.35rem", lineHeight: 1.05, color: "#5f5452", animationDelay: "2s", textWrap: "balance" }}>{config.groom}</motion.div>
      </div>

      {/* scroll hint */}
      <motion.div {...fade(1.8, 10)} style={{ position: "absolute", left: 0, right: 0, bottom: "3.5%", textAlign: "center", zIndex: 4, color: "#5f5452", textShadow: "0 0 10px rgba(255,250,244,.95)" }}>
        <div className="script" style={{ fontSize: "1.45rem" }}>Scroll down</div>
        <div style={{ animation: "bob 2s ease-in-out infinite", fontSize: "1.2rem", lineHeight: 0.6 }}>⌄</div>
      </motion.div>
    </section>
  );
}

/* ═════════ 2. THE DATE — scratch to reveal ═════════ */
export function TheDate() {
  const d = new Date(config.dateISO);
  const values = [String(d.getDate()).padStart(2, "0"), d.toLocaleString("en", { month: "short" }).toUpperCase(), String(d.getFullYear())];
  const [count, setCount] = useState(0);
  const all = count >= 3;
  return (
    <section style={{ position: "relative", padding: "30px 0 60px", background: "var(--white)" }}>
      <div style={{ position: "absolute", top: 0, left: -10, width: 170, height: 110 }}>
        <svg className="floral-sway" style={{ animationDelay: "-6.5s" }} viewBox="0 0 170 100" width="100%" height="100%" overflow="visible"><FloralCorner seed={21} /></svg>
      </div>
      <div style={{ position: "absolute", top: 0, right: -10, width: 170, height: 110 }}>
        <svg className="floral-sway" style={{ animationDelay: "-0.8s" }} viewBox="0 0 170 100" width="100%" height="100%" overflow="visible"><g transform="translate(170 0)"><FloralCorner flip seed={23} /></g></svg>
      </div>
      <motion.div {...fade()} className="center" style={{ marginTop: 60 }}>
        <div className="script" style={{ fontSize: "2.6rem" }}>The Date</div>
        <div style={{ fontSize: "1.05rem", color: "var(--ink-soft)", marginTop: 6 }}>✦ Scratch to reveal the date ✦</div>
      </motion.div>
      <motion.div {...fade(0.2)} style={{ position: "relative", display: "flex", justifyContent: "center", gap: 14, marginTop: 30 }}>
        {all && <Burst />}
        {values.map((v, i) => (
          <ScratchCard key={i} w={104} h={104} value={v} label={["Day", "Month", "Year"][i]} onReveal={() => setCount((c) => c + 1)} />
        ))}
      </motion.div>
      <motion.div
        animate={{ opacity: all ? 1 : 0, y: all ? 0 : 10 }}
        transition={{ duration: 0.8 }}
        className="center"
        style={{ marginTop: 22, fontStyle: "italic", fontSize: "1.15rem", color: "var(--gold-dark)" }}
      >
        {d.toLocaleDateString("en", { weekday: "long" })} · {config.timeText} ♡
      </motion.div>
    </section>
  );
}

/* ═════════ 3. EMBOSSED INVITATION CARD ═════════ */
export function InviteCard() {
  const W = 360, H = 640;
  return (
    <section style={{ position: "relative", padding: "10px 0 30px", background: "var(--white)" }}>
      <motion.div {...fade(0, 30)} style={{ position: "relative", width: "92%", margin: "0 auto", aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <path d={`${archD(8, 8, W - 16, H - 8, 0.3)} Z`} fill="#f7f4ef" filter="url(#emboss)" />
          <path d={cuspedD(22, 24, W - 44, H - 24, 0.3, 8)} fill="none" stroke="#ece6dd" strokeWidth="6" filter="url(#deboss)" />
          <path d={cuspedD(40, 46, W - 80, H - 46, 0.3, 8)} fill="none" stroke="#f0ebe3" strokeWidth="3" filter="url(#emboss)" />
          {/* jali side panels */}
          {[26, W - 38].map((x) => (
            <rect key={x} x={x} y={H * 0.36} width="12" height={H * 0.6} fill="url(#jali)" opacity="0.6" />
          ))}
          {/* finial */}
          <circle cx={W / 2} cy="2" r="4" fill="#f7f4ef" filter="url(#emboss)" />
        </svg>
        <div style={{ position: "absolute", left: "15%", right: "15%", top: "17%", bottom: "6%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
          <motion.div {...fade(0.2)} className="arabic" style={{ fontSize: "1.25rem", color: "var(--gold-dark)" }}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</motion.div>
          <motion.div {...fade(0.35)} className="caps" style={{ fontSize: ".66rem", lineHeight: 1.6 }}>
            You are invited to the<br />{config.ceremony} of
          </motion.div>
          <motion.div {...fade(0.5)} className="script shimmer" style={{ fontSize: "2.5rem", lineHeight: 1.05 }}>{config.bride}</motion.div>
          <Flourish width={110} />
          <motion.div {...fade(0.6)} className="caps" style={{ fontSize: ".6rem", lineHeight: 1.7 }}>
            Daughter of<br />{config.brideParents}
          </motion.div>
          <motion.div {...fade(0.7)} className="script" style={{ fontSize: "1.9rem" }}>With</motion.div>
          <motion.div {...fade(0.8)} className="script shimmer" style={{ fontSize: "2.4rem", lineHeight: 1.05, animationDelay: "2s" }}>{config.groom}</motion.div>
          <Flourish width={110} />
          <motion.div {...fade(0.9)} className="caps" style={{ fontSize: ".6rem", lineHeight: 1.7 }}>
            Son of<br />{config.groomParents}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═════════ 4. NOTE + VERSE ═════════ */
export function Verse() {
  return (
    <section style={{ position: "relative", padding: "40px 36px 50px", background: "var(--white)", textAlign: "center" }}>
      <div style={{ position: "absolute", top: 10, left: -20, width: 140, height: 90, opacity: 0.9 }}>
        <svg className="floral-sway" style={{ animationDelay: "-2.1s" }} viewBox="0 0 170 100" width="100%" height="100%" overflow="visible"><FloralCorner seed={31} /></svg>
      </div>
      <div style={{ position: "absolute", top: 10, right: -20, width: 140, height: 90, opacity: 0.9 }}>
        <svg className="floral-sway" style={{ animationDelay: "-3.4s" }} viewBox="0 0 170 100" width="100%" height="100%" overflow="visible"><g transform="translate(170 0)"><FloralCorner flip seed={33} /></g></svg>
      </div>
      <motion.p {...fade()} style={{ fontStyle: "italic", fontSize: "1.12rem", lineHeight: 1.55, color: "var(--ink-soft)", marginTop: 70 }}>{config.welcomeNote}</motion.p>
      <motion.div {...fade(0.1)} style={{ margin: "34px 0 10px" }}><Flourish /></motion.div>
      <motion.div {...fade(0.2)} className="arabic" style={{ fontSize: "2rem", color: "var(--ink)" }}>{config.verseArabic}</motion.div>
      <motion.div {...fade(0.35)} style={{ fontSize: "1.2rem", marginTop: 8 }}>{config.verseEnglish}</motion.div>
      <motion.div {...fade(0.45)} style={{ fontSize: "1rem", color: "var(--ink-soft)" }}>{config.verseRef}</motion.div>
    </section>
  );
}

/* ═════════ 5. WEDDING TIMELINE ═════════ */
export function Timeline() {
  return (
    <section style={{ position: "relative", padding: "30px 18px 60px", background: "var(--white)" }}>
      <motion.div {...fade()} className="center">
        <div className="script" style={{ fontSize: "2.5rem" }}>Wedding Timeline</div>
        <Flourish width={200} />
      </motion.div>
      <div style={{ position: "relative", marginTop: 26 }}>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, var(--gold-soft) 6%, var(--gold-soft) 94%, transparent)", transformOrigin: "top" }}
        />
        <svg width="14" height="22" viewBox="0 0 14 22" style={{ position: "absolute", left: "calc(50% - 7px)", top: -14 }}>
          <path d="M7 0 L12 8 L7 16 L2 8Z" fill="url(#gold)" /><path d="M7 16 V22" stroke="url(#gold)" />
        </svg>
        {config.timeline.map((item, i) => {
          const artLeft = i % 2 === 0;
          const text = (
            <div style={{ textAlign: artLeft ? "left" : "right" }}>
              <div className="script" style={{ fontSize: "1.7rem", color: "var(--gold-dark)" }}>{item.time}</div>
              <div style={{ fontSize: "1.1rem", lineHeight: 1.25, color: "var(--ink)" }}>{item.title}</div>
            </div>
          );
          const art = <TimelineArt name={item.art} />;
          return (
            <motion.div key={i} {...fade(0.05, 30)} className="draw-wrap" onViewportEnter={(e) => (e?.target as HTMLElement | undefined)?.classList.add("on")} style={{ display: "grid", gridTemplateColumns: "1fr 28px 1fr", alignItems: "center", minHeight: 150 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 8 }}>{artLeft ? art : text}</div>
              <div style={{ display: "grid", placeItems: "center" }}>
                <svg width="18" height="18" viewBox="-9 -9 18 18">
                  {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-4" rx="2.4" ry="4.2" transform={`rotate(${a})`} fill="#fbf6ea" stroke="url(#gold)" strokeWidth=".8" />)}
                  <circle r="2" fill="url(#gold)" />
                </svg>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 8 }}>{artLeft ? text : art}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ═════════ 6. COUNTDOWN ═════════ */
function useCountdown(iso: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return ["–", "–", "–", "–"];
  const d = Math.max(0, new Date(iso).getTime() - now);
  return [String(Math.floor(d / 864e5)), ...[Math.floor((d / 36e5) % 24), Math.floor((d / 6e4) % 60), Math.floor((d / 1e3) % 60)].map((n) => String(n).padStart(2, "0"))];
}

export function Countdown() {
  const c = useCountdown(config.dateISO);
  const labels = ["Days", "Hours", "Minutes", "Seconds"];
  return (
    <section style={{ position: "relative", padding: "40px 16px 36px", background: "var(--white)", textAlign: "center" }}>
      <motion.div {...fade()}>
        <div className="script" style={{ fontSize: "2.4rem" }}>Until Our Celebration</div>
        <Flourish width={180} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontStyle: "italic", fontSize: "1.15rem", color: "var(--ink-soft)", marginTop: 4 }}>
          Counting every heartbeat
          <svg className="heartbeat" width="16" height="15" viewBox="0 0 24 22" aria-hidden>
            <path d="M12 21 C 5 15, 0 11, 0 6 A 6 6 0 0 1 12 4 A 6 6 0 0 1 24 6 C 24 11, 19 15, 12 21Z" fill="url(#gold)" />
          </svg>
        </div>
      </motion.div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
        {c.map((n, i) => (
          <motion.div
            key={i}
            {...fade(0.15 + i * 0.12, 26)}
            style={{
              width: 74,
              padding: "14px 0 10px",
              borderRadius: 10,
              background: "linear-gradient(160deg,#fffdf9,#f3eee6)",
              border: "1px solid var(--gold-soft)",
              boxShadow: "inset 1px 1px 3px rgba(150,130,100,.25), inset -1px -1px 2px #fff, 0 6px 14px rgba(140,110,60,.15)",
            }}
          >
            <div style={{ height: "2.3rem", overflow: "hidden", position: "relative" }}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={n}
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: "2rem", lineHeight: "2.3rem", fontWeight: 500, fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}
                >
                  {n}
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ width: 28, height: 1, margin: "6px auto", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
            <div className="caps" style={{ fontSize: ".5rem", letterSpacing: ".2em", color: "var(--ink-soft)" }}>{labels[i]}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═════════ 7. LOCATION + RSVP ═════════ */
function downloadIcs() {
  const start = new Date(config.dateISO);
  const end = new Date(start.getTime() + config.durationHours * 36e5);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nikkah Invite//EN", "BEGIN:VEVENT",
    `UID:${start.getTime()}@nikkah-invite`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${config.ceremony} – ${config.brideShort} & ${config.groomShort}`, `LOCATION:${config.venue}, ${config.city}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "nikkah.ics";
  a.click();
}

export function Location() {
  const wa = config.whatsapp
    ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Assalamu Alaikum! In sha Allah I will attend the ${config.ceremony} of ${config.brideShort} & ${config.groomShort}.`)}`
    : "";
  return (
    <section style={{ position: "relative", background: "var(--white)", textAlign: "center" }}>
      <div style={{ position: "absolute", top: 0, right: -20, width: 120, height: 200, opacity: 0.95 }}>
        <svg className="floral-sway" style={{ animationDelay: "-4.7s" }} viewBox="0 0 100 170" width="100%" height="100%" overflow="visible"><g transform="translate(100 0) rotate(90)"><FloralCorner seed={41} /></g></svg>
      </div>
      <div style={{ padding: "50px 30px 30px" }}>
        <motion.div {...fade()}>
          <div className="script" style={{ fontSize: "2.5rem" }}>Location</div>
          <Flourish width={150} />
        </motion.div>
        <motion.div {...fade(0.1)} className="caps" style={{ fontSize: ".7rem", letterSpacing: ".25em", color: "var(--gold-dark)", marginTop: 10 }}>{config.timeText}</motion.div>
        <motion.div {...fade(0.15)} style={{ fontSize: "1.45rem", letterSpacing: ".04em", marginTop: 10 }}>{config.venue}</motion.div>
        <motion.div {...fade(0.25)} style={{ fontSize: "1.15rem", lineHeight: 1.35, color: "var(--ink-soft)" }}>{config.city}</motion.div>
        <motion.div {...fade(0.35)} style={{ display: "grid", gap: 10, maxWidth: 290, margin: "26px auto 0" }}>
          <a className="btn solid" href={config.mapUrl} target="_blank" rel="noreferrer">Get Directions</a>
          <button className="btn" onClick={downloadIcs}>Add to Calendar</button>
          {wa && <a className="btn" href={wa} target="_blank" rel="noreferrer">RSVP on WhatsApp</a>}
        </motion.div>
      </div>
      <motion.div {...fade(0.1)} style={{ padding: "6px 0 26px" }}>
        <div className="script shimmer on-gold" style={{ fontSize: "2.2rem", color: "var(--gold-dark)", display: "inline-block" }}>{config.brideShort} &amp; {config.groomShort}</div>
        <div className="caps" style={{ fontSize: ".55rem", letterSpacing: ".3em", color: "var(--ink-soft)", marginTop: 4 }}>Your duas are our greatest gift</div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} style={{ position: "relative", height: 280 }}>
        <PalaceScene />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--white) 0%, transparent 30%)" }} />
      </motion.div>
    </section>
  );
}
