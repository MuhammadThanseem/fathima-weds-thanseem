"use client";
import { useEffect, useRef, useState } from "react";
import Defs from "@/components/art/Defs";
import Envelope from "@/components/Envelope";
import { Hero, Countdown, Story, Celebration, Program, Rsvp } from "@/components/Sections";
import { config, t, type Lang } from "@/lib/config";

export default function Page() {
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const [dark, setDark] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  // Lock scroll until the envelope is opened; ?open skips the envelope.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("open")) setOpened(true);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    document.documentElement.lang = lang;
  }, [opened, lang]);

  // Switch floating controls to light-on-dark over the green section.
  useEffect(() => {
    const el = document.getElementById("celebration");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setDark(e.isIntersecting), { rootMargin: "-90% 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [opened]);

  const startMusic = () => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0.6;
    a.play().then(() => setPlaying(true)).catch(() => {});
  };
  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <Defs />
      <audio ref={audio} src={config.musicSrc} loop preload="auto" onError={() => setHasMusic(false)} />

      {!opened && <Envelope label={t[lang].tapToOpen} onOpen={startMusic} onDone={() => setOpened(true)} />}

      <div className={dark ? "dark-ui" : ""}>
        <button className="pill lang-pill" onClick={() => setLang(lang === "en" ? "es" : "en")} aria-label="Change language">
          {lang === "en" ? "ES" : "EN"}
        </button>
        {hasMusic && opened && (
          <button className="pill music-btn" onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="3" width="3" height="10" /><rect x="10" y="3" width="3" height="10" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6z" /></svg>
            )}
          </button>
        )}
      </div>

      <main className="page">
        <Hero lang={lang} />
        <Countdown lang={lang} />
        <Story lang={lang} />
        <Celebration lang={lang} />
        <Program lang={lang} />
        <Rsvp lang={lang} />
      </main>
    </>
  );
}
