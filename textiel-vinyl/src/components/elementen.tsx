import React from "react";
import { Img, staticFile } from "remotion";
import { FONT, KLEUR } from "../config";
import { tussen, zacht } from "../util";
import { goudTekst } from "./sfeer";

// ---------------------------------------------------------------------------
// Draaiende vinylplaat (SVG): groeven, glans die stil blijft staan, label
// ---------------------------------------------------------------------------
export const Vinyl: React.FC<{
  grootte: number;
  hoek: number; // graden
  label?: React.ReactNode;
  labelKleur?: string;
  glans?: number;
}> = ({ grootte, hoek, label, labelKleur = KLEUR.bordeaux, glans = 1 }) => {
  const groeven = Array.from({ length: 34 });
  return (
    <div style={{ position: "relative", width: grootte, height: grootte }}>
      <svg width={grootte} height={grootte} viewBox="-100 -100 200 200" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="vinylBasis" r="1">
            <stop offset="0" stopColor="#1b1414" />
            <stop offset="0.7" stopColor="#0d0a0a" />
            <stop offset="1" stopColor="#050404" />
          </radialGradient>
        </defs>
        <circle r="99" fill="url(#vinylBasis)" />
        <g transform={`rotate(${hoek})`}>
          {groeven.map((_, i) => (
            <circle
              key={i}
              r={38 + i * 1.75}
              fill="none"
              stroke={i % 5 === 0 ? "#2a2020" : "#171111"}
              strokeWidth={i % 5 === 0 ? 0.55 : 0.35}
            />
          ))}
          {/* kleine onregelmatigheden zodat je de rotatie ziet */}
          <path d="M 0 -96 A 96 96 0 0 1 22 -93" stroke="#3a2c26" strokeWidth="0.6" fill="none" />
          <path d="M -60 50 A 78 78 0 0 1 -70 30" stroke="#33251f" strokeWidth="0.5" fill="none" />
        </g>
        {/* stilstaande lichtreflectie */}
        <g opacity={0.55 * glans}>
          <path d="M 0 0 L -30 -95 A 100 100 0 0 1 30 -95 Z" fill="url(#glansA)" />
          <path d="M 0 0 L 30 95 A 100 100 0 0 1 -30 95 Z" fill="url(#glansA)" />
        </g>
        <defs>
          <linearGradient id="glansA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E9C987" stopOpacity="0.0" />
            <stop offset="0.5" stopColor="#E9C987" stopOpacity="0.22" />
            <stop offset="1" stopColor="#E9C987" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <circle r="35" fill={labelKleur} />
        <circle r="35" fill="none" stroke="#C5A06A" strokeWidth="0.8" />
        <circle r="2.6" fill="#0b0808" />
      </svg>
      {label && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: grootte * 0.33,
            height: grootte * 0.33,
            transform: `translate(-50%, -50%) rotate(${hoek}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Smartphone: strak, modern frame; inhoud = 390 × 844 "CSS-pixels" geschaald
// ---------------------------------------------------------------------------
export const SCHERM_B = 390;
export const SCHERM_H = 844;

export const Telefoon: React.FC<{ schaal: number; children: React.ReactNode }> = ({ schaal, children }) => {
  const rand = 14;
  return (
    <div
      style={{
        position: "relative",
        width: SCHERM_B * schaal + rand * 2,
        height: SCHERM_H * schaal + rand * 2,
        borderRadius: 78,
        padding: rand,
        background: "linear-gradient(145deg, #3b302a, #0f0b0a 40%, #2a201b)",
        boxShadow:
          "0 0 0 2px rgba(197,160,106,0.55), 0 50px 120px rgba(0,0,0,0.65), 0 0 90px rgba(197,160,106,0.18)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: SCHERM_B * schaal,
          height: SCHERM_H * schaal,
          borderRadius: 64,
          overflow: "hidden",
          background: KLEUR.nacht,
        }}
      >
        <div style={{ width: SCHERM_B, height: SCHERM_H, transform: `scale(${schaal})`, transformOrigin: "0 0", position: "relative", overflow: "hidden" }}>
          {children}
        </div>
        {/* dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            width: 150,
            height: 42,
            marginLeft: -75,
            borderRadius: 24,
            background: "#000",
          }}
        />
        {/* glasreflectie */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(120deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Geanimeerde vinger met tik-rimpel (coördinaten in de ouder)
// ---------------------------------------------------------------------------
export const Vinger: React.FC<{
  t: number;
  x: number;
  y: number;
  tikOp: number; // moment van de tik
  verschijn?: number;
  weg?: number;
  schaal?: number;
}> = ({ t, x, y, tikOp, verschijn = tikOp - 0.5, weg = tikOp + 0.45, schaal = 1 }) => {
  if (t < verschijn || t > weg + 0.3) return null;
  const inP = tussen(t, verschijn, tikOp - 0.08);
  const uitP = tussen(t, weg, weg + 0.3);
  const druk = t > tikOp - 0.08 && t < tikOp + 0.12 ? 0.9 : 1;
  const rimpel = tussen(t, tikOp, tikOp + 0.55);
  const dx = (1 - inP) * 120 + uitP * 120;
  const dy = (1 - inP) * 160 + uitP * 140;
  return (
    <>
      {t >= tikOp && rimpel < 1 && (
        <div
          style={{
            position: "absolute",
            left: x - 60 * schaal,
            top: y - 60 * schaal,
            width: 120 * schaal,
            height: 120 * schaal,
            borderRadius: "50%",
            border: `${4 * schaal}px solid rgba(233,201,135,${1 - rimpel})`,
            transform: `scale(${0.3 + rimpel * 1.2})`,
            boxShadow: `0 0 30px rgba(233,201,135,${0.6 * (1 - rimpel)})`,
          }}
        />
      )}
      <svg
        width={150 * schaal}
        height={190 * schaal}
        viewBox="0 0 150 190"
        style={{
          position: "absolute",
          left: x - 38 * schaal + dx,
          top: y - 8 * schaal + dy,
          opacity: inP * (1 - uitP),
          transform: `scale(${druk})`,
          transformOrigin: "38px 8px",
          filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.5))",
        }}
      >
        {/* gestileerde wijsvinger + hand, crème met gouden rand */}
        <path
          d="M38 10 C 30 10 26 16 26 24 L 26 96 C 18 90 8 88 4 96 C 0 104 6 112 14 120 L 46 160 C 54 172 66 182 86 182 L 112 182 C 132 182 144 168 144 148 L 144 104 C 144 94 136 88 128 90 C 126 82 118 78 110 80 C 108 72 100 68 92 70 C 90 64 84 60 76 62 L 50 66 L 50 24 C 50 16 46 10 38 10 Z"
          fill="#F6EFE3"
          stroke="#C5A06A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M76 62 L 76 104 M 92 70 L 92 106 M 110 80 L 110 108" stroke="#D9C4A0" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </>
  );
};

// ---------------------------------------------------------------------------
// Stappenindicator 1–5
// ---------------------------------------------------------------------------
export const Stappen: React.FC<{ actief: number; zicht: number }> = ({ actief, zicht }) => (
  <div style={{ display: "flex", gap: 26, alignItems: "center", opacity: zicht }}>
    {[1, 2, 3, 4, 5].map((n) => {
      const aan = n === actief;
      const klaar = n < actief;
      return (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              width: aan ? 64 : 46,
              height: aan ? 64 : 46,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT.sans,
              fontWeight: 600,
              fontSize: aan ? 32 : 24,
              color: aan ? KLEUR.nacht : klaar ? KLEUR.nacht : KLEUR.goud,
              background: aan ? "linear-gradient(180deg,#F3D9A0,#C5A06A)" : klaar ? "rgba(197,160,106,0.75)" : "transparent",
              border: `2px solid ${KLEUR.goud}`,
              boxShadow: aan ? "0 0 26px rgba(233,201,135,0.6)" : "none",
            }}
          >
            {klaar ? "✓" : n}
          </div>
          {n < 5 && <div style={{ width: 22, height: 2, background: n < actief ? KLEUR.goud : "rgba(197,160,106,0.35)" }} />}
        </div>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------
// Kinetische titel: letters komen gestaffeld omhoog, goud verloop
// ---------------------------------------------------------------------------
export const KineTitel: React.FC<{
  tekst: string;
  t: number;
  start: number;
  grootte?: number;
  font?: string;
  gewicht?: number;
  goud?: boolean;
  kleur?: string;
  spatiering?: string;
  stagger?: number;
  uit?: number;
}> = ({ tekst, t, start, grootte = 92, font = FONT.display, gewicht = 600, goud = true, kleur = KLEUR.champagne, spatiering = "0.04em", stagger = 0.025, uit }) => {
  const uitP = uit !== undefined ? tussen(t, uit, uit + 0.3) : 0;
  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: gewicht,
        fontSize: grootte,
        letterSpacing: spatiering,
        lineHeight: 1.02,
        textAlign: "center",
        whiteSpace: "pre-wrap",
        opacity: 1 - uitP,
        transform: `translateY(${-uitP * 30}px)`,
      }}
    >
      {(() => {
        // per woord groeperen zodat regels enkel tussen woorden breken
        let i = 0;
        return tekst.split(" ").map((woord, wi) => (
          <React.Fragment key={wi}>
            {wi > 0 && " "}
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {woord.split("").map((c) => {
                const k = i++;
                const p = tussen(t, start + k * stagger, start + k * stagger + 0.5, zacht);
                return (
                  <span
                    key={k}
                    style={{
                      display: "inline-block",
                      opacity: p,
                      transform: `translateY(${(1 - p) * 0.6 * grootte}px)`,
                      ...(goud ? goudTekst : { color: kleur }),
                    }}
                  >
                    {c}
                  </span>
                );
              })}
            </span>
          </React.Fragment>
        ));
      })()}
    </div>
  );
};

// Logo TEXTIEL & VINYL (origineel bestand)
export const Logo: React.FC<{ breedte: number; style?: React.CSSProperties }> = ({ breedte, style }) => (
  <Img src={staticFile("img/logo-textiel-vinyl.png")} style={{ width: breedte, height: "auto", ...style }} />
);
