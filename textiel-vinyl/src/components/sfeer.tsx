import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { GOUD_VERLOOP, KLEUR, FONT } from "../config";
import { rnd } from "../util";

// Analoge filmgrain (SVG-ruis, per frame een ander zaadje)
export const Grain: React.FC<{ sterkte?: number }> = ({ sterkte = 0.09 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", opacity: sterkte }}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 12} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

// Vignet voor diepte
export const Vignet: React.FC<{ sterkte?: number }> = ({ sterkte = 0.75 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse 75% 60% at 50% 45%, transparent 40%, rgba(8,4,4,${sterkte}) 100%)`,
    }}
  />
);

// Subtiele glitter: twinkelende goudsterretjes (deterministisch)
export const Glitter: React.FC<{ aantal?: number; seed?: number; sterkte?: number; zone?: [number, number] }> = ({
  aantal = 40,
  seed = 1,
  sterkte = 1,
  zone = [0, 1920],
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: aantal }).map((_, i) => {
        const x = rnd(seed * 100 + i) * 1080;
        const y = zone[0] + rnd(seed * 200 + i) * (zone[1] - zone[0]);
        const periode = 40 + rnd(seed * 300 + i) * 60;
        const fase = rnd(seed * 400 + i) * periode;
        const p = ((f + fase) % periode) / periode;
        const a = Math.max(0, Math.sin(p * Math.PI)) ** 3 * sterkte;
        const s = 6 + rnd(seed * 500 + i) * 16;
        const drift = (f * (0.2 + rnd(i) * 0.4)) % 60;
        return (
          <svg
            key={i}
            width={s * 2}
            height={s * 2}
            viewBox="-10 -10 20 20"
            style={{ position: "absolute", left: x - s, top: y - s - drift, opacity: a }}
          >
            <path d="M0,-10 L1.4,-1.4 L10,0 L1.4,1.4 L0,10 L-1.4,1.4 L-10,0 L-1.4,-1.4 Z" fill="#FFF1C9" />
            <circle r="2.2" fill="#fff" />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

// Vintage lichtflits / light leak
export const Lichtlek: React.FC<{ t: number; start: number; duur?: number; kleur?: string; x?: number }> = ({
  t,
  start,
  duur = 0.9,
  kleur = "255,190,120",
  x = 70,
}) => {
  const p = (t - start) / duur;
  if (p < 0 || p > 1) return null;
  const a = Math.sin(p * Math.PI) * 0.85;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: a,
        background: `radial-gradient(ellipse 60% 45% at ${x - p * 40}% ${30 + p * 30}%, rgba(${kleur},0.95), rgba(${kleur},0.25) 45%, transparent 75%)`,
      }}
    />
  );
};

// Flits (wit-goud) bij grote overgangen
export const Flits: React.FC<{ t: number; op: number; duur?: number }> = ({ t, op, duur = 0.35 }) => {
  const p = (t - op) / duur;
  if (p < 0 || p > 1) return null;
  return <AbsoluteFill style={{ background: "#FFF6E3", opacity: (1 - p) ** 2, pointerEvents: "none" }} />;
};

// Discolichten: zachte bewegende spots
export const Discolicht: React.FC<{ sterkte?: number }> = ({ sterkte = 0.5 }) => {
  const f = useCurrentFrame();
  const spots = [
    { k: "233,201,135", sp: 0.021, fase: 0 },
    { k: "200,60,90", sp: 0.017, fase: 2 },
    { k: "255,170,90", sp: 0.025, fase: 4 },
  ];
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", opacity: sterkte, pointerEvents: "none" }}>
      {spots.map((s, i) => {
        const x = 50 + Math.sin(f * s.sp + s.fase) * 40;
        const y = 40 + Math.cos(f * s.sp * 1.3 + s.fase) * 30;
        return (
          <AbsoluteFill
            key={i}
            style={{ background: `radial-gradient(circle at ${x}% ${y}%, rgba(${s.k},0.55), transparent 35%)` }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Goudtekst (verloop + subtiele schaduw, geen 3D)
export const goudTekst: React.CSSProperties = {
  background: GOUD_VERLOOP,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
};

export const Eyebrow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      fontFamily: FONT.sans,
      fontWeight: 500,
      fontSize: 30,
      letterSpacing: "0.35em",
      color: KLEUR.goud,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Achtergrond: React.FC<{ boven?: string; onder?: string }> = ({
  boven = KLEUR.bordeauxDiep,
  onder = KLEUR.nacht,
}) => {
  const { height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 90% 55% at 50% 30%, ${boven} 0%, ${KLEUR.choco} 45%, ${onder} 100%)`,
        height,
      }}
    />
  );
};
