"use client";
import { useEffect, useRef, useState } from "react";
import { Defs } from "@/components/Art";
import Envelope from "@/components/Envelope";
import { Bismillah, Verse, Details, WhenWhere, Closing } from "@/components/Sections";
import { config } from "@/lib/config";

export default function Page() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const audio = useRef<HTMLAudioElement>(null);

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
      {!opened && <Envelope onOpen={play} onDone={() => setOpened(true)} />}

      {hasMusic && opened && (
        <button className="pill" style={{ bottom: 16, right: "max(14px, calc(50vw - 240px + 14px))" }} onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="3" height="10" /><rect x="10" y="3" width="3" height="10" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6z" /></svg>
          )}
        </button>
      )}

      <main className="page">
        <Bismillah />
        <Verse />
        <Details />
        <WhenWhere />
        <Closing />
      </main>
    </>
  );
}
