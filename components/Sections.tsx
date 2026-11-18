"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { PaintedSky, CloudBand, Villa, Fountain, Garland } from "./art/Scenes";
import { Spray, Butterfly } from "./art/Flora";
import { GoldCorner, RoseCluster, VineFrame, FiligreeBand, ProgramIcon, Heart, Monogram } from "./art/Ornaments";
import { config, t, type Lang } from "@/lib/config";

const Divider = () => (
  <div className="rule" aria-hidden>
    <svg width="14" height="14" viewBox="-8 -8 16 16"><path d="M0 -8 C 1 -2, 2 -1, 8 0 C 2 1, 1 2, 0 8 C -1 2, -2 1, -8 0 C -2 -1, -1 -2, 0 -8Z" fill="currentColor" /></svg>
  </div>
);

/* ═════════════════════ HERO ═════════════════════ */
export function Hero({ lang }: { lang: Lang }) {
  const d = t[lang];
  const day = new Date(config.weddingDate).getDate();
  return (
    <section className="hero">
      <div style={{ position: "absolute", inset: 0 }}>
        <PaintedSky />
      </div>

      <div className="hero-card">
        <div className="hero-card-border" />
        <div className="hero-content">
          <Reveal delay={0.2}>
            <Monogram size={84} />
          </Reveal>
          <Reveal delay={0.35}>
            <div className="title hero-name" style={{ marginTop: 14 }}>{config.bride}</div>
            <div className="script foil" style={{ fontSize: "2.2rem", lineHeight: 1.2 }}>&amp;</div>
            <div className="title hero-name">{config.groom}</div>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="caps" style={{ marginTop: 20, lineHeight: 1.9, maxWidth: 260 }}>{d.inviteLine}</p>
          </Reveal>
          <Reveal delay={0.7}>
            <div style={{ marginTop: 24 }}>
              <div className="caps" style={{ color: "var(--gold-deep)" }}>{d.month}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 22, justifyContent: "center" }}>
                <span className="caps" style={{ minWidth: 70, textAlign: "right", borderTop: "1px solid var(--gold)", borderBottom: "1px solid var(--gold)", padding: "6px 0" }}>{d.weekday}</span>
                <span className="title foil" style={{ fontSize: "clamp(3rem, 2.4rem + 3vw, 4.4rem)" }}>{day}</span>
                <span className="caps" style={{ minWidth: 70, textAlign: "left", borderTop: "1px solid var(--gold)", borderBottom: "1px solid var(--gold)", padding: "6px 0" }}>{d.year}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.9}>
            <div className="caps" style={{ marginTop: 22, fontSize: "0.6rem" }}>{d.heldAt}</div>
            <div style={{ fontSize: "1.3rem", marginTop: 4, fontStyle: "italic" }}>{d.venueShort}</div>
          </Reveal>
        </div>
        <div className="scroll-cue" aria-hidden>
          <svg width="18" height="26" viewBox="0 0 18 26" fill="none" stroke="currentColor"><path d="M9 1v22M2 16l7 7 7-7" /></svg>
        </div>
      </div>

      {/* florals & villa overlap the card edges */}
      <motion.div className="hero-spray" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.4 }}>
        <div className="sway">
          <svg viewBox="-40 -30 200 230" width="100%" height="100%" overflow="visible" aria-hidden><Spray x={0} y={0} s={1.15} r={-25} /></svg>
        </div>
      </motion.div>
      <motion.div className="hero-spray right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.7 }}>
        <div className="sway">
          <svg viewBox="-40 -30 200 230" width="100%" height="100%" overflow="visible" aria-hidden>
            <g transform="rotate(180 60 85)"><Spray x={0} y={0} s={1.15} r={-25} /></g>
          </svg>
        </div>
      </motion.div>
      <motion.div className="hero-villa" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.6 }}>
        <Villa w={460} h={220} cxRatio={0.45} />
      </motion.div>
      <svg width="44" height="38" viewBox="-20 -18 40 34" style={{ position: "absolute", top: "18%", right: "12%" }} aria-hidden>
        <Butterfly x={0} y={0} s={0.9} r={20} delay={0.4} />
      </svg>
    </section>
  );
}

/* ═════════════════════ COUNTDOWN ═════════════════════ */
function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - (now ?? 0));
  if (now === null) return { d: "–", h: "–", m: "–", s: "–" };
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff / 36e5) % 24),
    m: Math.floor((diff / 6e4) % 60),
    s: Math.floor((diff / 1e3) % 60),
  };
}

export function Countdown({ lang }: { lang: Lang }) {
  const d = t[lang];
  const c = useCountdown(config.weddingDate);
  const units: [string | number, string][] = [[c.d, d.days], [c.h, d.hours], [c.m, d.minutes], [c.s, d.seconds]];
  return (
    <section className="grain" style={{ padding: "clamp(64px, 9vw, 110px) 0 clamp(64px, 8vw, 100px)" }}>
      <Reveal>
        <p className="caps" style={{ textAlign: "center", color: "var(--gold-deep)" }}>{d.until}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="cd-frame" style={{ marginTop: 40 }}>
          {(["tl", "tr", "bl", "br"] as const).map((p) => <GoldCorner key={p} className={`cd-corner ${p}`} />)}
          <div className="cd-roses tr"><RoseCluster flip /></div>
          <div className="cd-roses bl"><RoseCluster /></div>
          <div className="cd-grid">
            {units.map(([n, label]) => (
              <div key={label}>
                <div className="cd-num">{n}</div>
                <div className="cd-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═════════════════════ OUR STORY ═════════════════════ */
export function Story({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section className="grain" style={{ paddingBottom: "clamp(40px, 6vw, 80px)" }}>
      <div className="cloud-band">
        <CloudBand />
      </div>
      <Reveal>
        <h2 className="title" style={{ textAlign: "center", marginTop: "clamp(-150px, -10vw, -110px)", position: "relative" }}>{d.storyTitle}</h2>
        <Divider />
      </Reveal>
      <div className="wrap-narrow" style={{ paddingTop: 30, textAlign: "center" }}>
        {d.story.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="body-text" style={{ marginBottom: 20 }}>{p}</p>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <p className="script foil" style={{ fontSize: "clamp(2rem, 1.6rem + 2vw, 2.8rem)", marginTop: 16 }}>{d.signature}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════════════ THE CELEBRATION ═════════════════════ */
export function Celebration({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section id="celebration" data-dark style={{ background: "var(--green)", color: "var(--sage)", borderTop: "3px double var(--gold)" }}>
      <div className="fountain">
        <Fountain />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, transparent 70%, var(--green) 100%)" }} />
      </div>
      <Reveal>
        <h2 className="title foil" style={{ textAlign: "center", marginTop: -20, position: "relative" }}>{d.celebrationTitle}</h2>
        <p className="caps" style={{ textAlign: "center", color: "var(--sage)", marginTop: 12 }}>{d.celebrationSub}</p>
      </Reveal>
      <div className="venue-card">
        <div style={{ position: "absolute", inset: 0 }}>
          <VineFrame w={320} h={470} />
        </div>
        <div style={{ position: "relative", padding: "clamp(64px, 9vw, 84px) clamp(36px, 9vw, 64px) clamp(60px, 8vw, 76px)", textAlign: "center" }}>
          <Reveal>
            <div className="title" style={{ fontSize: "clamp(2rem, 1.6rem + 2vw, 2.8rem)", color: "#f4ecdc" }}>{d.venueName}</div>
            <div className="caps" style={{ color: "var(--gold-light)", marginTop: 8 }}>{d.venueArea}</div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="body-text" style={{ color: "var(--sage)", margin: "26px 0", fontStyle: "italic" }}>{d.celebrationText}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ fontSize: "1.1rem" }}>{d.celebrationDate}</div>
            <div className="title foil" style={{ fontSize: "clamp(1.7rem, 1.4rem + 1.4vw, 2.3rem)", margin: "8px 0 28px" }}>{d.celebrationTime}</div>
            <a className="btn-outline" style={{ color: "var(--gold-light)" }} href={config.mapUrl} target="_blank" rel="noreferrer">{d.viewMap}</a>
          </Reveal>
        </div>
      </div>
      <div style={{ height: "clamp(90px, 9vw, 120px)", marginTop: 34 }}>
        <Garland />
      </div>
    </section>
  );
}

/* ═════════════════════ THE DAY / PROGRAM ═════════════════════ */
export function Program({ lang }: { lang: Lang }) {
  const d = t[lang];
  const day = new Date(config.weddingDate).getDate();
  return (
    <section className="grain">
      <div className="villa-band">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ position: "absolute", inset: "10px 0 0", WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 55%, #000 60%, transparent 100%)", maskImage: "radial-gradient(ellipse 60% 55% at 50% 55%, #000 60%, transparent 100%)" }}
        >
          <Villa w={1200} h={240} wide />
        </motion.div>
      </div>

      <div className="wrap" style={{ textAlign: "center", paddingTop: 10 }}>
        <Reveal>
          <h2 className="title">{d.dayTitle}</h2>
          <p className="caps" style={{ marginTop: 14, color: "var(--gold-deep)" }}>{d.programLabel} · {d.programDate}</p>
          <p style={{ fontStyle: "italic", fontSize: "1.12rem", marginTop: 10, color: "var(--ink-soft)" }}>{d.programSub}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(16px, 4vw, 34px)", margin: "30px 0 10px", fontSize: "1.3rem", color: "var(--ink-soft)" }}>
            {[day - 2, day - 1].map((n) => <span key={n}>{n}</span>)}
            <Heart size={52}>{day}</Heart>
            {[day + 1, day + 2].map((n) => <span key={n}>{n}</span>)}
          </div>
        </Reveal>
      </div>

      <div className="timeline">
        {d.program.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <Reveal key={item.time} delay={0.05}>
              <div className="tl-row">
                <div style={{ paddingRight: 12, display: "flex", justifyContent: "flex-end" }}>
                  {left ? <Item time={item.time} title={item.title} align="right" /> : <ProgramIcon name={item.icon} />}
                </div>
                <div style={{ display: "grid", placeItems: "center" }}>
                  <svg width="12" height="12" viewBox="-8 -8 16 16" aria-hidden><path d="M0 -8 L8 0 L0 8 L-8 0Z" fill="url(#gold)" /></svg>
                </div>
                <div style={{ paddingLeft: 12, display: "flex", justifyContent: "flex-start" }}>
                  {left ? <ProgramIcon name={item.icon} /> : <Item time={item.time} title={item.title} align="left" />}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <FiligreeBand />
    </section>
  );
}

function Item({ time, title, align }: { time: string; title: string; align: "left" | "right" }) {
  return (
    <div style={{ textAlign: align }}>
      <div className="tl-time">{time}</div>
      <div className="tl-title">{title}</div>
    </div>
  );
}

/* ═════════════════════ RSVP ═════════════════════ */
export function Rsvp({ lang }: { lang: Lang }) {
  const d = t[lang];
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") || ""),
      attending: attending ?? "",
      guests: String(form.get("guests") || "1"),
      message: String(form.get("message") || ""),
    };
    setBusy(true);
    try {
      if (config.rsvpEndpoint) {
        await fetch(config.rsvpEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        const body = encodeURIComponent(`Name: ${data.name}\nAttending: ${data.attending}\nGuests: ${data.guests}\nMessage: ${data.message}`);
        window.location.href = `mailto:${config.rsvpEmail}?subject=${encodeURIComponent("RSVP – " + data.name)}&body=${body}`;
      }
      setSent(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="grain" style={{ padding: "clamp(72px, 9vw, 110px) 0 clamp(48px, 6vw, 70px)", textAlign: "center" }}>
      <div className="rsvp-spray">
        <svg viewBox="-40 -30 200 230" width="100%" height="100%" overflow="visible" aria-hidden><Spray s={0.9} flip r={-20} x={120} /></svg>
      </div>
      <div className="wrap-narrow" style={{ position: "relative" }}>
        <Reveal>
          <h2 className="title">{d.rsvpTitle}</h2>
          <Divider />
          <p style={{ fontStyle: "italic", color: "var(--ink-soft)", fontSize: "1.1rem" }}>{d.rsvpSub}</p>
        </Reveal>
        {sent ? (
          <Reveal>
            <p className="body-text" style={{ marginTop: 40 }}>{d.thanks}</p>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <form onSubmit={submit} className="rsvp-form">
              <input className="field" name="name" placeholder={d.name} required />
              <div>
                <div className="caps" style={{ marginBottom: 12 }}>{d.attending}</div>
                <div className="choices">
                  <button type="button" className={`choice ${attending === "yes" ? "on" : ""}`} onClick={() => setAttending("yes")}>{d.yes}</button>
                  <button type="button" className={`choice ${attending === "no" ? "on" : ""}`} onClick={() => setAttending("no")}>{d.no}</button>
                </div>
              </div>
              {attending !== "no" && (
                <input className="field" name="guests" type="number" min={1} max={6} defaultValue={1} placeholder={d.guests} aria-label={d.guests} />
              )}
              <textarea className="field" name="message" rows={2} placeholder={d.message} style={{ resize: "none" }} />
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button className="btn-outline" type="submit" disabled={busy || !attending} style={{ color: "var(--ink)", opacity: attending ? 1 : 0.5 }}>
                  {d.send}
                </button>
              </div>
            </form>
          </Reveal>
        )}
        <Reveal>
          <div style={{ marginTop: 64, display: "grid", placeItems: "center", gap: 10 }}>
            <Monogram size={70} />
            <p className="script foil" style={{ fontSize: "clamp(1.9rem, 1.5rem + 1.6vw, 2.5rem)" }}>{d.footer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
