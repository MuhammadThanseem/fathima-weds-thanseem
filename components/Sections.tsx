"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Arch, Bouquet, Console, Icon, Mirror, Sparkles } from "./Art";
import { config } from "@/lib/config";

/* ───────── Word-by-word "writing" reveal (keeps Arabic letters joined) ───────── */
export function Write({
  text,
  delay = 0,
  step = 0.07,
  style,
  className,
  as = "p",
}: {
  text: string;
  delay?: number;
  step?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: "p" | "div" | "h2";
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      style={style as import("framer-motion").MotionStyle}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{ hidden: { opacity: 0, y: 6, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } } }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ───────── Soft floral bokeh backdrop with draped curtains ───────── */
const bokeh: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: `
    radial-gradient(circle at 12% 10%, rgba(255,255,255,.95) 0 6%, transparent 13%),
    radial-gradient(circle at 30% 4%, rgba(255,255,255,.85) 0 5%, transparent 11%),
    radial-gradient(circle at 70% 8%, rgba(255,255,255,.9) 0 7%, transparent 14%),
    radial-gradient(circle at 92% 18%, rgba(255,255,255,.85) 0 6%, transparent 13%),
    radial-gradient(circle at 5% 40%, rgba(255,255,255,.7) 0 5%, transparent 12%),
    radial-gradient(circle at 96% 46%, rgba(255,255,255,.7) 0 5%, transparent 12%),
    radial-gradient(circle at 15% 92%, rgba(255,255,255,.9) 0 8%, transparent 16%),
    radial-gradient(circle at 55% 98%, rgba(255,255,255,.95) 0 9%, transparent 18%),
    radial-gradient(circle at 90% 94%, rgba(255,255,255,.9) 0 8%, transparent 16%),
    repeating-linear-gradient(90deg, rgba(214,150,165,.0) 0 26px, rgba(214,150,165,.22) 34px, rgba(214,150,165,0) 46px),
    linear-gradient(180deg, #e7bcc4 0%, #f3d6db 40%, #ebc7ce 100%)`,
  filter: "blur(2px)",
};

function MirrorScreen({ children }: { children: React.ReactNode }) {
  return (
    <section className="screen">
      <div style={bokeh} />
      <svg viewBox="0 0 400 300" width="100%" style={{ position: "absolute", top: -20, left: 0, filter: "blur(3px)", opacity: 0.9 }}>
        <Bouquet x={-20} y={10} s={1.2} seed={31} />
        <Bouquet x={420} y={0} s={1.3} flip seed={37} />
        <Bouquet x={150} y={-30} s={0.9} seed={41} />
      </svg>
      <Sparkles count={12} seed={children ? 3 : 5} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "calc(min(100vw, 480px) * 0.575)" }}>
        <Console />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: "calc(min(100vw, 480px) * 0.315)", display: "flex", justifyContent: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", width: "74%", maxHeight: "68svh", aspectRatio: "320 / 514" }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Mirror />
        </div>
        <div style={{ position: "absolute", left: "14%", right: "14%", top: "20%", bottom: "16%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          {children}
        </div>
      </motion.div>
      </div>
    </section>
  );
}

export function Bismillah() {
  return (
    <MirrorScreen>
      <motion.div
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        whileInView={{ clipPath: "inset(0 0 0 0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 0.6, ease: "easeInOut" }}
        className="gold-text"
        style={{ fontFamily: "var(--ruqaa)", fontSize: "2.7rem", lineHeight: 1.55, direction: "rtl", fontWeight: 700 }}
      >
        {(() => {
          const w = config.bismillah.split(" ");
          return (
            <>
              <div>{w.slice(0, 2).join(" ")}</div>
              <div>{w.slice(2).join(" ")}</div>
            </>
          );
        })()}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.6, duration: 1 }} style={{ marginTop: 10 }}>
        <svg width="90" height="20" viewBox="0 0 90 20"><path d="M2 10 C 20 0, 30 20, 45 10 C 60 0, 70 20, 88 10" stroke="url(#gold)" fill="none" strokeWidth="1.4" /><circle cx="45" cy="10" r="3" fill="url(#gold)" /></svg>
      </motion.div>
    </MirrorScreen>
  );
}

export function Verse() {
  return (
    <MirrorScreen>
      <svg width="110" height="16" viewBox="0 0 110 16" style={{ marginBottom: 8 }}>
        <path d="M2 8 H40 M70 8 H108" stroke="url(#gold)" strokeWidth="1" />
        <path d="M55 2 L61 8 L55 14 L49 8Z" fill="url(#gold)" />
      </svg>
      <Write text={config.verseArabic} className="arabic" step={0.08} style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "var(--ink)" }} />
      <Write text={config.verseEnglish} delay={1.6} step={0.06} style={{ fontSize: "0.92rem", lineHeight: 1.4, marginTop: 10, fontWeight: 600, color: "var(--ink-soft)" }} />
      <Write text={config.verseRef} delay={3.4} style={{ fontSize: "0.85rem", marginTop: 10, fontWeight: 700, color: "var(--gold-dark)" }} />
    </MirrorScreen>
  );
}

/* ───────── Pearl arch screens ───────── */
function ArchScreen({ children, seed = 1 }: { children: React.ReactNode; seed?: number }) {
  return (
    <section className="screen" style={{ background: "#f7e4e6" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <rect width="100%" height="100%" fill="url(#lace)" />
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
        style={{ position: "absolute", inset: "2% 0 0" }}
      >
        <Arch />
      </motion.div>
      <Sparkles count={10} seed={seed} />
      <div style={{ position: "absolute", left: "17%", right: "17%", top: "11%", bottom: "17%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}

const nameStyle: React.CSSProperties = { fontSize: "2.1rem", lineHeight: 1.1, color: "var(--gold-dark)", marginTop: 4 };
const parentStyle: React.CSSProperties = { fontSize: "1.02rem", fontWeight: 600, lineHeight: 1.3, color: "var(--ink)", marginTop: 4 };

export function Details() {
  return (
    <ArchScreen seed={6}>
      <Write as="h2" text={config.title} className="script" step={0.15} style={{ fontSize: "2.3rem", color: "var(--ink)", marginTop: 6 }} />
      <Write text={config.blessing} delay={0.5} step={0.05} style={{ fontSize: "0.98rem", fontWeight: 600, lineHeight: 1.35, marginTop: 10, color: "var(--ink-soft)" }} />
      <Write text={config.inviteLine} delay={1.2} step={0.06} style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.35, marginTop: 10 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, width: "100%" }}>
        <Write text={config.bride} className="script" delay={1.9} step={0.15} style={nameStyle} />
        {config.brideParents && <Write text={config.brideParents} delay={2.3} step={0.05} style={parentStyle} />}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.6, duration: 0.8 }} style={{ margin: "8px auto", display: "grid", justifyItems: "center", gap: 2 }}>
          <div className="script" style={{ fontSize: "1.7rem", lineHeight: 1, color: "var(--ink-soft)" }}>{config.and}</div>
          <Icon name="rings" size={26} />
        </motion.div>
        <Write text={config.groom} className="script" delay={3.1} step={0.15} style={nameStyle} />
        {config.groomParents && <Write text={config.groomParents} delay={3.5} step={0.05} style={parentStyle} />}
      </div>
    </ArchScreen>
  );
}

export function WhenWhere() {
  const row = (icon: "calendar" | "clock" | "pin", delay: number, children: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
    >
      <Icon name={icon} size={30} />
      {children}
    </motion.div>
  );
  return (
    <ArchScreen seed={8}>
      <motion.div
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        whileInView={{ clipPath: "inset(0 0 0 0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="arabic"
        style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--ink)", marginTop: 4 }}
      >
        {config.inshaAllah}
      </motion.div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", paddingBottom: 10 }}>
        {row("calendar", 0.6, <div style={{ fontSize: "1.35rem", fontWeight: 600 }}>{config.dateText}</div>)}
        {row("clock", 1.0, <div style={{ fontSize: "1.35rem", fontWeight: 600 }}>{config.timeText}</div>)}
        {row(
          "pin",
          1.4,
          <div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "0.04em" }}>{config.venueName}</div>
            {config.venueLines.map((l) => (
              <div key={l} style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.3 }}>{l}</div>
            ))}
          </div>
        )}
      </div>
    </ArchScreen>
  );
}

/* ───────── Countdown, calendar, map, RSVP ───────── */
function useCountdown(iso: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return ["–", "–", "–", "–"];
  const d = Math.max(0, new Date(iso).getTime() - now);
  return [Math.floor(d / 864e5), Math.floor((d / 36e5) % 24), Math.floor((d / 6e4) % 60), Math.floor((d / 1e3) % 60)].map((n) => String(n).padStart(2, "0"));
}

function downloadIcs() {
  const start = new Date(config.dateISO);
  const end = new Date(start.getTime() + config.durationHours * 36e5);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invite//EN", "BEGIN:VEVENT",
    `UID:${start.getTime()}@wedding-invite`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:Wedding – ${config.bride} & ${config.groom}`,
    `LOCATION:${[config.venueName, ...config.venueLines].join(", ")}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function Closing() {
  const c = useCountdown(config.dateISO);
  const labels = ["Days", "Hours", "Minutes", "Seconds"];
  const wa = config.whatsapp
    ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Assalamu Alaikum! I'll be attending the wedding of ${config.bride} & ${config.groom} in sha Allah.`)}`
    : "";
  return (
    <section style={{ position: "relative", padding: "64px 26px 70px", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, #fffafb 0%, #f9e7ea 60%, #f2d6db 100%)" }}>
      <Sparkles count={8} seed={12} />
      <Write text="Counting the days" className="script" style={{ fontSize: "2.2rem", color: "var(--gold-dark)" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22 }}>
        {c.map((n, i) => (
          <motion.div
            key={labels[i]}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            style={{ width: 74, padding: "14px 0 10px", border: "1px solid rgba(199,112,127,.55)", borderRadius: "40px 40px 6px 6px", background: "rgba(255,248,249,.7)" }}
          >
            <div style={{ fontSize: "1.9rem", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>{n}</div>
            <div style={{ fontFamily: "var(--caps)", fontSize: "0.5rem", letterSpacing: "0.18em", color: "var(--gold-dark)" }}>{labels[i].toUpperCase()}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: "grid", gap: 10, marginTop: 34, maxWidth: 300, marginInline: "auto" }}>
        <a className="btn solid" href={config.mapUrl} target="_blank" rel="noreferrer"><Icon name="pin" size={16} />View Location</a>
        <button className="btn" onClick={downloadIcs}><Icon name="calendar" size={16} />Add to Calendar</button>
        {wa && <a className="btn" href={wa} target="_blank" rel="noreferrer">RSVP on WhatsApp</a>}
      </div>
      <Write text="Your presence and prayers will make our day complete." delay={0.2} style={{ fontSize: "1.15rem", fontStyle: "italic", fontWeight: 500, marginTop: 40, color: "var(--ink-soft)" }} />
      <Write text={`${config.bride} & ${config.groom}`} className="script" delay={0.6} step={0.12} style={{ fontSize: "2rem", color: "var(--gold-dark)", marginTop: 14 }} />
    </section>
  );
}
