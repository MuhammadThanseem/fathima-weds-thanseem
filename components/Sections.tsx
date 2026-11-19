"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bismillah, Dove, Icon, Monogram, SkyScene, monogramLetters } from "./Art";
import { config } from "@/lib/config";

const fade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const date = new Date(config.dateISO);
const day = String(date.getDate()).padStart(2, "0");
const monthShort = date.toLocaleString("en", { month: "short" }).toUpperCase();
const monthLong = date.toLocaleString("en", { month: "long" }).toUpperCase();
const year = String(date.getFullYear());
const weekday = date.toLocaleString("en", { weekday: "long" }).toUpperCase();
const timeShort = date.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" }).toUpperCase();

/* ═════════ NAV ═════════ */
export function Nav({ show }: { show: boolean }) {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: show ? 0 : -60 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, display: "flex", justifyContent: "center", pointerEvents: show ? "auto" : "none" }}
    >
      <div style={{ width: "100%", maxWidth: 480, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "linear-gradient(180deg, rgba(18,24,43,.92), rgba(30,40,70,.82))", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(201,164,92,.18)" }}>
        <a href="#top" aria-label="Top" className="gold-text" style={{ fontFamily: "var(--nastaliq)", fontWeight: 700, fontSize: "1.3rem", textDecoration: "none", lineHeight: 1 }}>
          {monogramLetters().join("")}
        </a>
        <div style={{ display: "flex", gap: 18 }}>
          {[["Nikah", "#nikah"], ["Family", "#family"], ["Wishes", "#wishes"]].map(([l, h]) => (
            <a key={l} href={h} className="caps" style={{ color: "#dfe3ef", textDecoration: "none", fontSize: ".56rem", letterSpacing: ".22em" }}>{l}</a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

/* ═════════ HERO — sky, couple, monogram ═════════ */
export function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" style={{ position: "relative", height: "100svh", minHeight: 640, overflow: "hidden" }}>
      <motion.div initial={{ scale: 1.12 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 3.2, ease: "easeOut" }} style={{ position: "absolute", inset: 0 }}>
        {config.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <>
            <img src={config.heroImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 50%" }} />
            {/* navy tint so the photo sits in the invitation's palette */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(30,40,70,.55) 0%, rgba(43,61,104,.18) 38%, rgba(43,61,104,.05) 60%, rgba(30,40,70,.45) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(60,80,130,.12)", mixBlendMode: "multiply" }} />
          </>
        ) : (
          <SkyScene />
        )}
      </motion.div>
      {ready && (
        <>
          {[{ x: "70%", y: "30%", s: 54, f: true, d: 0.2 }, { x: "10%", y: "38%", s: 44, f: false, d: 0.6 }].map((dv, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 0, y: 40 }} animate={{ opacity: [0, 1, 1, 0], x: dv.f ? 140 : -120, y: -260 }} transition={{ duration: 4, delay: dv.d, ease: "easeOut" }} style={{ position: "absolute", left: dv.x, top: dv.y }}>
              <Dove size={dv.s} flip={dv.f} />
            </motion.div>
          ))}
        </>
      )}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.4, delay: 0.3 }} style={{ position: "absolute", left: "50%", top: "17%", marginLeft: -55 }}>
        <Monogram size={110} orbit />
      </motion.div>
      <a href="#nikah" className="caps" style={{ position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)", padding: "8px 18px", borderRadius: 999, background: "rgba(255,255,255,.88)", color: "var(--ink)", textDecoration: "none", fontSize: ".58rem", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 4px 12px rgba(42,51,80,.15)" }}>
        Scroll <span style={{ display: "inline-block", animation: "bob 1.6s ease-in-out infinite" }}>↓</span>
      </a>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 40, background: "linear-gradient(180deg, transparent, #2b3d68)" }} />
    </section>
  );
}

/* ═════════ SACRED — Bismillah, monogram, verse ═════════ */
export function Sacred() {
  return (
    <section id="nikah" className="navy-bg" style={{ padding: "50px 26px 40px" }}>
      <motion.div {...fade()} style={{ position: "relative" }}>
        <Bismillah size={1.55} align="left" />
        <p style={{ fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.6, color: "#d3d8e8", marginTop: 12 }}>{config.sacredLine}</p>
      </motion.div>
      <motion.div {...fade(0.1)} style={{ display: "flex", justifyContent: "center", margin: "60px 0" }}>
        <Monogram size={170} orbit />
      </motion.div>
      <motion.div {...fade(0.1)} style={{ position: "relative", borderLeft: "1px solid rgba(201,164,92,.7)", paddingLeft: 16 }}>
        <div className="arabic gold-text" style={{ fontSize: "1.35rem", textAlign: "left" }}>{config.verseArabic}</div>
        <p style={{ fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.6, color: "#d3d8e8", marginTop: 8 }}>{config.verseEnglish}</p>
        <div className="caps" style={{ color: "#aab2cc", marginTop: 10, fontSize: ".55rem" }}>{config.verseRef}</div>
      </motion.div>
    </section>
  );
}

/* ═════════ WEDS — names + date boxes ═════════ */
export function Weds() {
  const boxes: [string, string][] = [[day, "Date"], [monthShort, "Month"], [year, "Year"], [timeShort, "Onwards"]];
  return (
    <section className="navy-bg" style={{ padding: "20px 26px 50px" }}>
      <motion.div {...fade()} style={{ position: "relative" }}>
        <div className="big-caps" style={{ fontSize: "2.6rem", color: "#f3f1ec" }}>{config.bride}</div>
        <div style={{ fontStyle: "italic", fontSize: "1.1rem", color: "#c9cfe2", margin: "2px 0 0 4px" }}>weds</div>
        <div className="big-caps" style={{ fontSize: "2.6rem", color: "#f3f1ec" }}>{config.groom}</div>
        <p style={{ fontStyle: "italic", fontSize: "1.05rem", color: "#c9cfe2", marginTop: 16 }}>By the grace of the Almighty</p>
      </motion.div>
      <motion.div {...fade(0.15)} style={{ display: "flex", marginTop: 22, border: "1px solid rgba(220,226,240,.35)", width: "fit-content", position: "relative" }}>
        {boxes.map(([v, l], i) => (
          <div key={l} style={{ padding: "10px 14px", textAlign: "center", borderLeft: i ? "1px solid rgba(220,226,240,.35)" : "none" }}>
            <div style={{ fontSize: "1.25rem", color: "#f3f1ec" }}>{v}</div>
            <div className="caps" style={{ fontSize: ".48rem", color: "#aab2cc", marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ═════════ MARQUEE ═════════ */
export function Marquee() {
  const item = `${config.bride.toUpperCase()} ✦ ${config.groom.toUpperCase()} ✦ `;
  return (
    <div className="marquee navy-bg" style={{ padding: "14px 0", borderTop: "1px solid rgba(201,164,92,.25)", borderBottom: "1px solid rgba(201,164,92,.25)" }}>
      <div className="marquee-track" style={{ fontStyle: "italic", letterSpacing: ".3em", fontSize: ".95rem", color: "#c9cfe2" }}>
        {Array.from({ length: 12 }, () => item).join("")}
      </div>
    </div>
  );
}

/* ═════════ COUNTDOWN ═════════ */
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

export function Countdown() {
  const c = useCountdown(config.dateISO);
  const labels = ["Days", "Hours", "Mins", "Secs"];
  return (
    <section className="blush-bg" style={{ padding: "50px 20px 40px", textAlign: "center" }}>
      <motion.div {...fade()} className="caps" style={{ color: "var(--ink-soft)" }}>Counting Down</motion.div>
      <motion.div {...fade(0.1)} style={{ display: "inline-flex", marginTop: 18, border: "1px solid rgba(42,51,80,.18)", background: "rgba(255,255,255,.6)" }}>
        {c.map((n, i) => (
          <div key={i} style={{ width: 66, padding: "12px 0 8px", borderLeft: i ? "1px solid rgba(42,51,80,.14)" : "none" }}>
            <motion.div key={n} initial={{ opacity: 0.3, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ fontSize: "1.7rem", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{n}</motion.div>
            <div className="caps" style={{ fontSize: ".48rem", color: "var(--ink-soft)", marginTop: 2 }}>{labels[i]}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ═════════ ELDERS ═════════ */
export function Elders() {
  return (
    <section className="blush-bg" style={{ padding: "30px 22px 30px" }}>
      <motion.div {...fade()} style={{ borderLeft: "1px solid rgba(42,51,80,.35)", paddingLeft: 14 }}>
        <div className="caps" style={{ color: "var(--ink-soft)", fontSize: ".55rem" }}>The Celebration</div>
        <div className="title" style={{ marginTop: 14 }}>
          With The Blessings
          <em style={{ color: "var(--ink-soft)" }}>of our elders</em>
        </div>
        <div className="rule" />
      </motion.div>
      <motion.div {...fade(0.15)} className="card-light" style={{ padding: "24px 22px", marginTop: 16 }}>
        {config.elders.map((e, i) => (
          <div key={e.label}>
            {i > 0 && <div style={{ textAlign: "center", color: "var(--ink-soft)", margin: "14px 0" }}>&amp;</div>}
            <div className="caps" style={{ fontSize: ".5rem", color: "var(--ink-soft)" }}>With the {i === 0 ? "heavenly " : ""}blessings of</div>
            <div className="caps" style={{ fontSize: ".72rem", color: "var(--ink)", marginTop: 6 }}>{e.label}</div>
            <div style={{ fontStyle: "italic", fontSize: "1.05rem", marginTop: 10, lineHeight: 1.35 }}>{e.names}</div>
          </div>
        ))}
      </motion.div>
      <motion.p {...fade(0.2)} style={{ fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.55, color: "var(--ink-soft)", marginTop: 26 }}>{config.invitationLine}</motion.p>
    </section>
  );
}

/* ═════════ EVENT CARD ═════════ */
function downloadIcs() {
  const start = new Date(config.dateISO);
  const end = new Date(start.getTime() + config.durationHours * 36e5);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nikah Invite//EN", "BEGIN:VEVENT", `UID:${start.getTime()}@nikah`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`, `SUMMARY:${config.ceremony} – ${config.bride} & ${config.groom}`, `LOCATION:${config.venueName.replace("@", "")}, ${config.venueAddress}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "nikah.ics";
  a.click();
}

export function EventCard() {
  return (
    <section className="blush-bg" style={{ padding: "30px 22px 50px" }}>
      <motion.div {...fade()} style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: -30, fontSize: "3rem", fontWeight: 300, color: "rgba(42,51,80,.1)" }}>01</div>
        <div className="caps" style={{ fontSize: ".52rem", color: "var(--ink-soft)" }}>{weekday} · {Number(day)} {monthLong} {year}</div>
        <div className="big-caps" style={{ fontSize: "1.6rem", marginTop: 6 }}>{config.ceremony}</div>
      </motion.div>
      <motion.div {...fade(0.1)} className="card-light" style={{ padding: "20px 18px", marginTop: 18 }}>
        {[
          { icon: "clock" as const, label: "Time", main: config.timeText, sub: config.timeNote },
          { icon: "pin" as const, label: "Venue", main: config.venueName, sub: config.venueAddress },
        ].map((r, i) => (
          <div key={r.label} style={{ display: "flex", gap: 14, padding: i ? "16px 0 0" : "0 0 16px", borderTop: i ? "1px solid rgba(42,51,80,.1)" : "none" }}>
            <div style={{ width: 36, height: 36, flex: "none", borderRadius: "50%", display: "grid", placeItems: "center", background: "#eef0f6", color: "var(--navy)" }}>
              <Icon name={r.icon} size={17} />
            </div>
            <div>
              <div className="caps" style={{ fontSize: ".48rem", color: "var(--ink-soft)" }}>{r.label}</div>
              <div style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: ".04em", marginTop: 3 }}>{r.main}</div>
              {r.sub && <div style={{ fontStyle: "italic", fontSize: ".95rem", color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.35 }}>{r.sub}</div>}
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div {...fade(0.2)} style={{ display: "grid", gap: 10, marginTop: 18 }}>
        <a className="btn btn-navy" href={config.mapUrl} target="_blank" rel="noreferrer"><Icon name="pin" size={14} /> Venue Location</a>
        <button className="btn btn-outline" onClick={downloadIcs}><Icon name="calendar" size={14} /> Add to Calendar</button>
      </motion.div>
    </section>
  );
}

/* ═════════ FAMILIES ═════════ */
export function Families() {
  const person = (role: string, name: string, parents: string) => (
    <div className="card-dark" style={{ padding: "20px 18px" }}>
      <div className="caps" style={{ fontSize: ".5rem", color: "#aab2cc" }}>{role}</div>
      <div className="big-caps" style={{ fontSize: "1.6rem", color: "#f3f1ec", marginTop: 6 }}>{name}</div>
      <div style={{ fontStyle: "italic", fontSize: ".98rem", color: "#c9cfe2", marginTop: 6 }}>({parents})</div>
    </div>
  );
  return (
    <section id="family" className="navy-bg" style={{ padding: "56px 22px 56px" }}>
      <motion.div {...fade()} style={{ position: "relative" }}>
        <div className="caps" style={{ fontSize: ".55rem", color: "#aab2cc" }}>Two families, one bond</div>
        <div className="title" style={{ marginTop: 14, color: "#f3f1ec" }}>
          With the blessings
          <em style={{ color: "#c9cfe2" }}>of our families</em>
        </div>
        <div className="rule" style={{ color: "#c9cfe2" }} />
      </motion.div>
      <motion.div {...fade(0.1)} style={{ position: "relative", marginTop: 20 }}>{person("Bride", config.brideFull, config.brideParents)}</motion.div>
      <motion.div {...fade(0.15)} style={{ display: "flex", justifyContent: "center", margin: "16px 0", position: "relative" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(201,164,92,.6)", display: "grid", placeItems: "center", color: "var(--gold)", background: "rgba(20,30,58,.5)" }}>
          <Icon name="rings" size={24} />
        </div>
      </motion.div>
      <motion.div {...fade(0.2)} style={{ position: "relative" }}>{person("Groom", config.groomFull, config.groomParents)}</motion.div>
    </section>
  );
}

/* ═════════ BLESSINGS / WISHES ═════════ */
export function Blessings() {
  const wa = config.whatsapp ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Assalamu Alaikum! Barakallahu Lakuma, ${config.bride} & ${config.groom}! `)}` : "";
  return (
    <section id="wishes" style={{ position: "relative", padding: "56px 22px 50px", textAlign: "center", background: "linear-gradient(180deg,#f4f1f3 0%,#ece6ea 100%)", overflow: "hidden" }}>
      {/* sheer veil folds */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(100deg, rgba(255,255,255,0) 0 40px, rgba(255,255,255,.55) 70px, rgba(255,255,255,0) 110px)", filter: "blur(6px)" }} />
      <motion.div {...fade()} style={{ position: "relative" }}>
        <div className="caps" style={{ fontSize: ".55rem", color: "var(--ink-soft)" }}>With love</div>
        <div className="title" style={{ marginTop: 14, color: "var(--ink)" }}>
          Blessings from
          <em style={{ color: "var(--ink-soft)" }}>family and friends</em>
        </div>
        <div className="rule" style={{ margin: "18px auto" }} />
      </motion.div>
      <motion.div {...fade(0.1)} style={{ position: "relative", borderRadius: 18, overflow: "hidden", aspectRatio: "1 / 0.92", boxShadow: "0 18px 36px rgba(42,51,80,.22)", marginTop: 8, background: "#3e523c" }}>
        {config.blessingImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={config.blessingImage} alt="Barakallahu Lakuma" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 25%, #7f9c74 0%, #5d7656 35%, #3e523c 70%)", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.25) 0 6%, transparent 12%), radial-gradient(circle at 70% 15%, rgba(255,255,255,.2) 0 5%, transparent 10%), radial-gradient(circle at 85% 40%, rgba(255,255,255,.15) 0 6%, transparent 12%)", filter: "blur(3px)" }} />
            <div style={{ color: "#f6efe0", transform: "translateY(-14px)" }}><Icon name="rings" size={80} color="#f1e2b8" /></div>
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "70px 12px 18px", background: "linear-gradient(180deg, rgba(42,51,80,0) 0%, rgba(42,51,80,.35) 45%, rgba(30,36,58,.82) 100%)", color: "#fff" }}>
          <div style={{ fontStyle: "italic", fontWeight: 400, fontSize: "1.45rem", letterSpacing: ".01em", textShadow: "0 2px 10px rgba(0,0,0,.25)" }}>Barakallahu Lakuma</div>
          <div className="caps" style={{ fontSize: ".52rem", marginTop: 6, color: "#e2e6f2", letterSpacing: ".32em" }}>{config.bride} &amp; {config.groom}</div>
        </div>
        {config.blessingImage && config.blessingImageCredit && <div style={{ position: "absolute", top: 8, right: 10, fontSize: ".5rem", color: "rgba(255,255,255,.75)", textShadow: "0 1px 3px rgba(0,0,0,.4)" }}>{config.blessingImageCredit}</div>}
      </motion.div>
      <motion.div {...fade(0.15)} style={{ position: "relative" }}>
        <div className="rule" style={{ margin: "26px auto 18px" }} />
        <div className="arabic" style={{ fontSize: "1.25rem", color: "#a3823f" }}>{config.duaArabic}</div>
        <p style={{ fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.55, color: "var(--ink-soft)", marginTop: 10 }}>{config.duaEnglish}</p>
        <div className="caps" style={{ fontSize: ".5rem", color: "var(--ink-soft)", marginTop: 10 }}>The prophetic dua for the newly weds</div>
        {wa && <a className="btn btn-navy" style={{ marginTop: 24 }} href={wa} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={14} /> Send your wishes</a>}
      </motion.div>
    </section>
  );
}

/* ═════════ WELCOME / FOOTER ═════════ */
export function Welcome() {
  return (
    <section className="navy-bg" style={{ padding: "56px 26px 90px", textAlign: "center" }}>
      <motion.div {...fade()} style={{ position: "relative" }}>
        <div className="caps" style={{ color: "var(--gold)", fontSize: ".58rem" }}>Awaiting to welcome you</div>
        <div style={{ marginTop: 16, display: "grid", gap: 6 }}>
          {config.hosts.map((h, i) => (
            <div key={i} style={{ fontStyle: "italic", fontSize: "1.02rem", color: "#d3d8e8" }}>{h}</div>
          ))}
        </div>
        <div className="caps" style={{ color: "var(--gold)", marginTop: 10, fontSize: ".6rem" }}>{config.familyName}</div>
      </motion.div>
      <motion.div {...fade(0.1)} style={{ position: "relative", marginTop: 46 }}>
        <div className="big-caps" style={{ fontSize: "1.5rem", color: "#f3f1ec" }}>{config.bride} &amp; {config.groom}</div>
        <div className="caps" style={{ color: "#aab2cc", marginTop: 6, fontSize: ".55rem" }}>{Number(day)} {monthLong} {year}</div>
      </motion.div>
      <motion.div {...fade(0.15)} style={{ position: "relative", marginTop: 34 }}>
        <div className="caps" style={{ color: "var(--gold)", fontSize: ".55rem" }}>Address</div>
        <div className="caps" style={{ color: "var(--gold-light)", marginTop: 8, fontSize: ".62rem" }}>{config.venueName}</div>
        <div style={{ fontStyle: "italic", color: "#d3d8e8", marginTop: 6, lineHeight: 1.45 }}>{config.venueAddress}</div>
        <div className="caps" style={{ color: "var(--gold)", fontSize: ".55rem", marginTop: 22 }}>Contact No.</div>
        <div style={{ color: "#d3d8e8", marginTop: 6, letterSpacing: ".06em" }}>{config.contact}</div>
      </motion.div>
      <div style={{ height: 1, background: "rgba(220,226,240,.18)", margin: "36px 0 24px", position: "relative" }} />
      <div className="caps" style={{ color: "#8f97b3", fontSize: ".5rem", position: "relative" }}>With love · {config.bride} &amp; {config.groom}</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 18, position: "relative" }}>
        {config.whatsapp && <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" style={circle}><Icon name="whatsapp" size={15} /></a>}
        {config.instagram && <a href={config.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" style={circle}><Icon name="instagram" size={15} /></a>}
        <a href={config.mapUrl} target="_blank" rel="noreferrer" aria-label="Map" style={circle}><Icon name="globe" size={15} /></a>
      </div>
    </section>
  );
}
const circle: React.CSSProperties = { width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(220,226,240,.35)", display: "grid", placeItems: "center", color: "#dfe3ef" };
