"use client";
import { useEffect, useRef, useState } from "react";
import { Defs, Icon, Petals } from "@/components/Art";
import Intro from "@/components/Intro";
import { Nav, Hero, Sacred, Weds, Marquee, Countdown, Elders, EventCard, Families, Blessings, Welcome } from "@/components/Sections";
import { config } from "@/lib/config";

export default function Page() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch(config.musicSrc, { method: "HEAD" })
      .then((r) => setHasMusic(r.ok && (r.headers.get("content-type") || "").startsWith("audio")))
      .catch(() => setHasMusic(false));
  }, []);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("open")) setOpened(true);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    if (opened) window.scrollTo(0, 0);
  }, [opened]);

  const play = () => audio.current?.play().then(() => setPlaying(true)).catch(() => {});
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) play();
    else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <Defs />
      <audio ref={audio} src={config.musicSrc} loop preload="auto" onError={() => setHasMusic(false)} />
      {!opened && <Intro onOpen={play} onDone={() => setOpened(true)} />}
      <Nav show={opened} />
      {opened && <Petals />}
      {hasMusic && opened && (
        <button className={`music ${playing ? "playing" : ""}`} style={{ right: "max(14px, calc(50vw - 240px + 14px))" }} onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
          <Icon name={playing ? "music" : "pause"} size={18} />
        </button>
      )}
      <main className="page">
        <Hero ready={opened} />
        <Sacred />
        <Weds />
        <Marquee />
        <Countdown />
        <Elders />
        <EventCard />
        <Families />
        <Blessings />
        <Welcome />
      </main>
    </>
  );
}
