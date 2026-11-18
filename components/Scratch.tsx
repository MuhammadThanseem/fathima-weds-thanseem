"use client";
import { useEffect, useRef, useState } from "react";

/** A gold foil card you scratch with a finger or mouse to reveal what's underneath. */
export default function ScratchCard({
  value,
  label,
  onReveal,
  w = 96,
  h = 112,
}: {
  value: string;
  label: string;
  onReveal?: () => void;
  w?: number;
  h?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const moves = useRef(0);
  const done = useRef(false);
  const reveal = () => {
    if (done.current) return;
    done.current = true;
    setRevealed(true);
    onReveal?.();
  };

  useEffect(() => {
    const c = canvas.current!;
    const dpr = window.devicePixelRatio || 1;
    c.width = w * dpr;
    c.height = h * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    // gold foil
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#a8864a");
    g.addColorStop(0.3, "#e6cf97");
    g.addColorStop(0.5, "#f7ecca");
    g.addColorStop(0.7, "#c9a865");
    g.addColorStop(1, "#97773e");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, 10);
    ctx.fill();
    // brushed texture
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.18})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 6, 0.7);
      ctx.fillStyle = `rgba(110,80,30,${Math.random() * 0.12})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }
    // marbled foil swirls
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(255,248,225,${0.15 + Math.random() * 0.2})`;
      ctx.lineWidth = 2 + Math.random() * 6;
      ctx.beginPath();
      ctx.moveTo(-10, Math.random() * h);
      ctx.bezierCurveTo(w * 0.3, Math.random() * h, w * 0.7, Math.random() * h, w + 10, Math.random() * h);
      ctx.stroke();
    }
    // inner border
    ctx.strokeStyle = "rgba(255,248,225,.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(5, 5, w - 10, h - 10, 7);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,250,235,.85)";
    ctx.font = "16px 'Pinyon Script', cursive";
    ctx.textAlign = "center";
    ctx.fillText("scratch", w / 2, h / 2 + 5);
  }, [w, h]);

  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current || revealed) return;
    const c = canvas.current!;
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * w;
    const y = ((e.clientY - rect.top) / rect.height) * h;
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    if (++moves.current % 6 === 0) {
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 16) if (d[i] === 0) clear++;
      if (clear / (d.length / 16) > 0.45) {
        reveal();
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: w,
          height: h,
          borderRadius: 10,
          background: "linear-gradient(160deg,#fffdf9,#f3eee6)",
          boxShadow: "inset 1px 1px 3px rgba(150,130,100,.35), inset -1px -1px 2px #fff, 0 6px 14px rgba(140,110,60,.15)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span style={{ fontFamily: "var(--serif)", fontSize: value.length > 3 ? "1.7rem" : "2.2rem", fontWeight: 500, color: "var(--ink)", letterSpacing: ".04em" }}>{value}</span>
        <canvas
          ref={canvas}
          aria-label={`Scratch to reveal the ${label.toLowerCase()}`}
          onPointerDown={(e) => { drawing.current = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); scratch(e); }}
          onPointerMove={scratch}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
          onDoubleClick={reveal}
          style={{ position: "absolute", inset: 0, width: w, height: h, borderRadius: 10, touchAction: "none", cursor: "grab", transition: "opacity .7s", opacity: revealed ? 0 : 1, pointerEvents: revealed ? "none" : "auto" }}
        />
      </div>
      <div className="caps" style={{ fontSize: ".55rem", letterSpacing: ".3em", marginTop: 10, color: "var(--ink-soft)" }}>{label}</div>
    </div>
  );
}
