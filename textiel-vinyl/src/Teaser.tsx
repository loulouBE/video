// TEASERS (± 6 s per dag): Blanche & Cécile worden stap voor stap onthuld.
// Dag 1–3 geheimzinnig (donker, wazig, close-ups), dag 4 de onthulling, dag 5 de afspraak.
// De muziek klinkt elke dag iets "helderder" (van gedempt achter een deur naar volledig open).
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AUDIO, EVENT, FONT, KLEUR, SITE } from "./config";
import { laadFonts, lerp, tussen, inUit, zacht } from "./util";
import { Discolicht, Eyebrow, Flits, Glitter, Grain, goudTekst, Lichtlek, Vignet } from "./components/sfeer";
import { KineTitel, Logo, Vinyl } from "./components/elementen";

laadFonts();

export const TEASER_DUUR = 6;

const FOTO = "img/blanche-cecile.png"; // 1536 × 1024

// Teksten per dag (aanpasbaar)
export const TEASERS = [
  { dag: 1, regels: ["ZE ZIJN", "TERUG."], sub: "" },
  { dag: 2, regels: ["VROEGER STONDEN", "ZE ACHTER DE TOOG…"], sub: "" },
  { dag: 3, regels: ["…NU DOEN ZE IETS", "WAT ZE NOG NOOIT", "DEDEN."], sub: "" },
  { dag: 4, regels: ["BLANCHE", "& CÉCILE"], sub: "VOOR HET EERST ACHTER DE DRAAITAFELS" },
  { dag: 5, regels: ["BLANCHE & CÉCILE", "DRAAIEN OP"], sub: "" },
];

// Uitsnede van de foto: focus (fx, fy) in fracties, zoom t.o.v. "cover"
const Uitsnede: React.FC<{ fx: number; fy: number; zoom: number; style?: React.CSSProperties; filter?: string }> = ({ fx, fy, zoom, style, filter }) => (
  <div style={{ position: "absolute", overflow: "hidden", ...style }}>
    <Img
      src={staticFile(FOTO)}
      style={{
        position: "absolute",
        width: `${zoom * 100 * (1536 / 1024) * (1920 / 1080)}%`,
        height: `${zoom * 100}%`,
        left: `${50 - fx * zoom * 100 * (1536 / 1024) * (1920 / 1080)}%`,
        top: `${50 - fy * zoom * 100}%`,
        filter,
      }}
    />
  </div>
);

const Datum: React.FC<{ t: number; van: number; groot?: boolean }> = ({ t, van, groot }) => {
  const p = tussen(t, van, van + 0.5);
  return (
    <div style={{ position: "absolute", top: groot ? 1180 : 1300, left: 0, right: 0, textAlign: "center", opacity: p, transform: `scale(${lerp(1.2, 1, p)})` }}>
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: groot ? 150 : 120, letterSpacing: "0.06em", lineHeight: 1, ...goudTekst }}>14.11</div>
      <Eyebrow style={{ fontSize: 26, marginTop: 14, color: KLEUR.champagne, letterSpacing: "0.4em" }}>TEXTIEL &amp; VINYL</Eyebrow>
    </div>
  );
};

const Regels: React.FC<{ t: number; regels: string[]; van: number; top: number; grootte?: number }> = ({ t, regels, van, top, grootte = 96 }) => (
  <div style={{ position: "absolute", top, left: 60, right: 60 }}>
    {regels.map((r, i) => (
      <KineTitel key={i} tekst={r} t={t} start={van + i * 0.35} grootte={grootte} stagger={0.02} />
    ))}
  </div>
);

// ---------- dag 1: gouden glitter in het donker ----------
const Dag1: React.FC<{ t: number }> = ({ t }) => {
  const licht = tussen(t, 0.2, 2.2, inUit);
  return (
    <>
      {/* alleen de pailletten, haast onherkenbaar, in een bewegende lichtbundel */}
      <Uitsnede
        fx={0.36}
        fy={0.7}
        zoom={2.6 + t * 0.05}
        style={{ inset: 0, opacity: 0.85 }}
        filter={`brightness(${0.25 + licht * 0.45}) blur(${lerp(10, 4, licht)}px) saturate(1.2)`}
      />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${30 + t * 8}% ${45 + Math.sin(t) * 8}%, transparent 0%, rgba(8,4,4,0.92) 38%)` }} />
      <Regels t={t} regels={TEASERS[0].regels} van={1.6} top={640} grootte={150} />
      <Datum t={t} van={3.6} />
    </>
  );
};

// ---------- dag 2: silhouetten achter matglas ----------
const Dag2: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Uitsnede fx={0.5} fy={0.42} zoom={1.25 + t * 0.02} style={{ inset: 0 }} filter={`brightness(0.45) blur(${lerp(34, 22, tussen(t, 0, 6, (x) => x))}px) saturate(1.3)`} />
    {/* "toog": warm barlicht en glazen */}
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,6,6,0.5) 0%, rgba(10,6,6,0.15) 40%, rgba(10,6,6,0.85) 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1570, height: 14, background: "linear-gradient(90deg, transparent, #C5A06A, transparent)", opacity: 0.7 }} />
    <Regels t={t} regels={TEASERS[1].regels} van={0.8} top={560} grootte={88} />
    <Datum t={t} van={3.9} />
  </>
);

// ---------- dag 3: koptelefoon en draaitafel in close-up ----------
const Dag3: React.FC<{ t: number }> = ({ t }) => {
  const wissel = tussen(t, 2.0, 2.4);
  return (
    <>
      <Uitsnede fx={0.42} fy={0.555} zoom={4.2 + t * 0.06} style={{ inset: 0, opacity: 1 - wissel }} filter="brightness(0.5) blur(2px)" />
      <Uitsnede fx={0.27} fy={0.9} zoom={3.0 + t * 0.06} style={{ inset: 0, opacity: wissel }} filter="brightness(0.55) blur(2px)" />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 10%, rgba(8,4,4,0.88) 70%)" }} />
      <Regels t={t} regels={TEASERS[2].regels} van={0.6} top={420} grootte={84} />
      <Datum t={t} van={4.2} />
    </>
  );
};

// ---------- dag 4: de onthulling ----------
const Dag4: React.FC<{ t: number }> = ({ t }) => {
  const onthul = tussen(t, 0.9, 1.6, inUit);
  return (
    <>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 60% at 50% 35%, #6b2232 0%, ${KLEUR.bordeauxDiep} 45%, ${KLEUR.nacht} 100%)` }} />
      <Discolicht sterkte={0.5 * onthul} />
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 260,
          width: 960,
          height: 640,
          overflow: "hidden",
          borderRadius: 6,
          boxShadow: `0 0 0 3px rgba(197,160,106,${onthul}), 0 40px 90px rgba(0,0,0,0.7)`,
        }}
      >
        <Img
          src={staticFile(FOTO)}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${lerp(1.25, 1.02, onthul)})`, filter: `blur(${(1 - onthul) * 26}px) brightness(${0.4 + onthul * 0.6})` }}
        />
      </div>
      <Regels t={t} regels={TEASERS[3].regels} van={1.5} top={960} grootte={124} />
      <div style={{ position: "absolute", top: 1250, left: 60, right: 60, textAlign: "center", opacity: tussen(t, 2.6, 3.0) }}>
        <Eyebrow style={{ fontSize: 32, color: KLEUR.champagne, letterSpacing: "0.22em", lineHeight: 1.5 }}>{TEASERS[3].sub}</Eyebrow>
      </div>
      <div style={{ position: "absolute", top: 1380, left: 0, right: 0, textAlign: "center", opacity: tussen(t, 3.6, 4.0) }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 96, ...goudTekst }}>14.11</div>
      </div>
      <Glitter aantal={26} seed={44} sterkte={onthul} zone={[20, 240]} />
      <Flits t={t} op={0.95} duur={0.5} />
    </>
  );
};

// ---------- dag 5: de afspraak ----------
const Dag5: React.FC<{ t: number }> = ({ t }) => {
  const regel = (van: number) => ({ opacity: tussen(t, van, van + 0.35), transform: `translateY(${(1 - tussen(t, van, van + 0.4)) * 24}px)` });
  const info: React.CSSProperties = { fontFamily: FONT.sans, fontWeight: 500, fontSize: 40, letterSpacing: "0.16em", color: KLEUR.champagne, textAlign: "center" };
  return (
    <>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 85% 55% at 50% 30%, ${KLEUR.bordeaux} 0%, ${KLEUR.choco} 50%, ${KLEUR.nacht} 100%)` }} />
      <Discolicht sterkte={0.35} />
      <div style={{ position: "absolute", left: 140, top: 200, width: 800, height: 533, overflow: "hidden", borderRadius: 6, boxShadow: "0 0 0 3px #C5A06A, 0 30px 70px rgba(0,0,0,0.6)", ...regel(0.1) }}>
        <Img src={staticFile(FOTO)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${lerp(1.0, 1.06, tussen(t, 0, 6, (x) => x))})` }} />
      </div>
      <Regels t={t} regels={TEASERS[4].regels} van={0.5} top={790} grootte={84} />
      <div style={{ position: "absolute", top: 990, left: 0, right: 0, display: "flex", justifyContent: "center", ...regel(1.3) }}>
        <Logo breedte={430} />
      </div>
      <div style={{ position: "absolute", top: 1330, left: 60, right: 60 }}>
        <div style={{ ...info, ...regel(2.1) }}>{EVENT.datum}</div>
        <div style={{ ...info, ...regel(2.3), marginTop: 10 }}>{EVENT.uur} · {EVENT.plaats}</div>
        <div style={{ ...regel(2.9), marginTop: 26, textAlign: "center", fontFamily: FONT.sans, fontWeight: 500, fontSize: 52, color: KLEUR.goudLicht }}>{SITE.url}</div>
      </div>
      <Glitter aantal={20} seed={55} sterkte={0.9} zone={[20, 180]} />
    </>
  );
};

export const Teaser: React.FC<{ dag: number }> = ({ dag }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const uit = tussen(t, TEASER_DUUR - 0.35, TEASER_DUUR);
  return (
    <AbsoluteFill style={{ background: KLEUR.nacht }}>
      <AbsoluteFill style={{ opacity: tussen(t, 0, 0.3) * (1 - uit) }}>
        {dag === 1 && <Dag1 t={t} />}
        {dag === 2 && <Dag2 t={t} />}
        {dag === 3 && <Dag3 t={t} />}
        {dag === 4 && <Dag4 t={t} />}
        {dag === 5 && <Dag5 t={t} />}
        {dag < 4 && <Glitter aantal={14} seed={dag * 7} sterkte={0.6} zone={[20, 300]} />}
        <Lichtlek t={t} start={0.05} duur={1.4} x={dag % 2 ? 80 : 20} />
      </AbsoluteFill>
      <Vignet sterkte={0.65} />
      <Grain sterkte={0.08} />
      <Audio src={staticFile(`audio/teaser-${dag}.wav`)} volume={AUDIO.muziekVolume} />
      <Sequence from={0} durationInFrames={Math.round(1.2 * fps)}>
        <Audio src={staticFile("audio/sfx-glitter.wav")} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};

export { zacht };
