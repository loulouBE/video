// REGISTRATIE-VERSIE (± 22 s): één doel, zo veel mogelijk registraties.
// Hergebruikt de animaties van de lange versie via een tijd-mapping (snellere montage).
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AUDIO, EVENT, FONT, HOEZEN, KLEUR, SITE } from "./config";
import { laadFonts, lerp, tussen, inUit, zacht } from "./util";
import { Achtergrond, Eyebrow, Flits, Glitter, Grain, goudTekst, Lichtlek, Vignet, Discolicht } from "./components/sfeer";
import { KineTitel, Logo, PopHoezen, Vinyl } from "./components/elementen";
import { TelefoonFlow, TelefoonGloed } from "./scenes/TelefoonFlow";
import { GoedDoel, Platenbak } from "./scenes/Scenes";

laadFonts();
import VO_KORT from "./voiceover-kort.json";

const muziekVolume = (t: number) => {
  let d = 0;
  for (const v of VO_KORT) {
    const a = v.op - 0.25, b = v.op + v.duur + 0.15;
    const p = t < a || t > b + 0.4 ? 0 : t < v.op ? (t - a) / 0.25 : t <= b ? 1 : 1 - (t - b) / 0.4;
    d = Math.max(d, p);
  }
  return AUDIO.muziekVolume + (AUDIO.muziekOnderStem - AUDIO.muziekVolume) * d;
};

export const KORT_DUUR = 22;

// Tekst voor de korte versie (aanpasbaar)
export const KORT = {
  hook: ["WAT ZIJN JOUW", "OUDE PLATEN", "WAARD?"],
  stappen: [
    { nr: 1, titel: "SCAN BARCODE OF HOES", van: 2.2, tot: 6.5 },
    { nr: 2, titel: "JIJ KIEST DE PRIJS", van: 6.5, tot: 10.5 },
    { nr: 3, titel: "WIJ VERKOPEN ZE", van: 10.5, tot: 14.0 },
  ],
  oproep: "REGISTREER NU JOUW VINYL",
  teaser: "Te koop op 14 november",
  teaserDJ: "Textiel & Vinyl · met Blanche & Cécile",
};

// Tijd-mapping: [korte versie van, tot] → [lange versie van, tot]
const MAP: [number, number, number, number][] = [
  [2.2, 6.5, 9.3, 14.3], // scannen → herkend → editie gekozen
  [6.5, 8.0, 17.3, 18.9], // richtprijs
  [8.0, 9.6, 20.4, 22.0], // zelf prijs typen
  [9.6, 10.5, 23.45, 24.6], // registreren + "Plaat geregistreerd"
  [10.5, 12.2, 27.5, 29.25], // online in de collectie
  [12.2, 14.0, 29.6, 31.4], // platenbak + prijsticketje
  [14.0, 17.0, 32.0, 35.4], // 90 / 10
];
const bron = (t: number) => {
  for (const [a, b, c, d] of MAP) if (t >= a && t < b) return c + ((t - a) / (b - a)) * (d - c);
  return -1;
};

// ---------- hook ----------
const Hook: React.FC<{ t: number }> = ({ t }) => {
  if (t > 2.5) return null;
  const uit = tussen(t, 2.05, 2.4, inUit);
  return (
    <AbsoluteFill style={{ opacity: 1 - uit }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: `translateY(520px) scale(${lerp(1.25, 1.05, tussen(t, 0, 2))})` }}>
          <Vinyl grootte={1300} hoek={t * 300} labelKleur={KLEUR.bordeaux} label={<Logo breedte={300} />} />
        </div>
      </AbsoluteFill>
      <PopHoezen
        t={t}
        hoezen={HOEZEN}
        plekken={[
          { x: 30, y: 70, s: 200, r: -10, d: 0.15 },
          { x: 850, y: 60, s: 200, r: 9, d: 0.25 },
          { x: 40, y: 1060, s: 240, r: -6, d: 0.35 },
          { x: 420, y: 1130, s: 250, r: 4, d: 0.45 },
          { x: 800, y: 1060, s: 240, r: 8, d: 0.55 },
          { x: 220, y: 1400, s: 220, r: -4, d: 0.65 },
          { x: 640, y: 1420, s: 220, r: 6, d: 0.75 },
        ]}
      />
      <div style={{ position: "absolute", top: 330, left: 50, right: 50 }}>
        {KORT.hook.map((r, i) => (
          <KineTitel key={i} tekst={r} t={t} start={0.05 + i * 0.18} grootte={i === 2 ? 150 : 108} stagger={0.012} />
        ))}
      </div>
      {/* prijsticketjes met vraagteken: geen verzonnen bedragen */}
      {[
        { x: 120, y: 860, r: -12, d: 0.7 },
        { x: 690, y: 820, r: 9, d: 0.85 },
      ].map((k, i) => {
        const p = tussen(t, k.d, k.d + 0.35, zacht);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: k.x,
              top: k.y,
              width: 270,
              height: 140,
              borderRadius: 10,
              background: "#FBF7EF",
              boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
              transform: `rotate(${k.r}deg) scale(${lerp(1.6, 1, p)})`,
              opacity: p,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 18, letterSpacing: "0.3em", color: "#6b5a50" }}>TEXTIEL &amp; VINYL</div>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 76, lineHeight: 1, color: KLEUR.bordeaux }}>€ ?</div>
          </div>
        );
      })}
      <Lichtlek t={t} start={0.0} duur={1.1} x={75} />
    </AbsoluteFill>
  );
};

// ---------- titels + vaste URL ----------
const KortTitels: React.FC<{ t: number }> = ({ t }) => {
  const s = KORT.stappen.find((x) => t >= x.van && t < x.tot);
  const band = tussen(t, 2.2, 2.5) * (1 - tussen(t, 13.8, 14.1));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 418, background: "linear-gradient(180deg, #0c0909 0%, #140e0f 100%)", opacity: band, boxShadow: "0 18px 40px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", top: 418, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C5A06A, transparent)", opacity: band }} />
      {s && (
        <div style={{ position: "absolute", top: 250, left: 60, right: 60 }} key={s.nr}>
          <KineTitel tekst={`${s.nr}. ${s.titel}`} t={t} start={s.van + 0.05} grootte={76} uit={s.tot - 0.25} stagger={0.014} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// De URL staat van 2,2 s tot het einde in beeld (wie afhaakt, zag ze toch)
const VasteURL: React.FC<{ t: number }> = ({ t }) => {
  const p = tussen(t, 2.3, 2.7) * (1 - tussen(t, 16.8, 17.1));
  if (p <= 0) return null;
  return (
    <div style={{ position: "absolute", top: 138, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p }}>
      <div
        style={{
          padding: "12px 30px",
          borderRadius: 40,
          border: `2px solid ${KLEUR.goud}`,
          background: "rgba(16,12,13,0.85)",
          fontFamily: FONT.sans,
          fontWeight: 500,
          fontSize: 40,
          letterSpacing: "0.03em",
          color: KLEUR.goudLicht,
          boxShadow: "0 0 24px rgba(197,160,106,0.3)",
        }}
      >
        {SITE.url}
      </div>
    </div>
  );
};

// ---------- oproep ----------
const Oproep: React.FC<{ t: number }> = ({ t }) => {
  const a = 17.0;
  if (t < a - 0.1) return null;
  const regel = (van: number) => ({ opacity: tussen(t, van, van + 0.3), transform: `translateY(${(1 - tussen(t, van, van + 0.35)) * 24}px)` });
  return (
    <AbsoluteFill style={{ opacity: tussen(t, a, a + 0.35) }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 85% 55% at 50% 30%, ${KLEUR.bordeaux} 0%, ${KLEUR.choco} 50%, ${KLEUR.nacht} 100%)` }} />
      <Discolicht sterkte={0.35} />
      <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `scale(${lerp(0.85, 1, tussen(t, a, a + 0.6))})`, filter: "drop-shadow(0 0 30px rgba(233,201,135,0.35))" }}>
          <Logo breedte={470} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 560, left: 110, right: 110, ...regel(a + 0.3) }}>
        <div
          style={{
            height: 112,
            borderRadius: 8,
            background: "linear-gradient(180deg, #F3D9A0, #C5A06A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.sans,
            fontWeight: 600,
            fontSize: 40,
            letterSpacing: "0.1em",
            color: KLEUR.nacht,
            boxShadow: `0 0 ${30 + Math.sin(t * 6) * 14}px rgba(233,201,135,0.6)`,
            transform: `scale(${1 + Math.max(0, Math.sin((t - a) * 5)) * 0.015})`,
          }}
        >
          {KORT.oproep}
        </div>
      </div>
      <div style={{ position: "absolute", top: 700, left: 40, right: 40, textAlign: "center", fontFamily: FONT.sans, fontWeight: 500, fontSize: 76, color: KLEUR.goudLicht, ...regel(a + 0.5) }}>
        {SITE.url}
      </div>
      {/* teaser van het event */}
      <div style={{ position: "absolute", top: 870, left: 140, right: 140, ...regel(a + 0.9) }}>
        <div style={{ height: 500, overflow: "hidden", borderRadius: 6, boxShadow: "0 0 0 3px #C5A06A, 0 30px 70px rgba(0,0,0,0.6)" }}>
          <Img src={staticFile("img/blanche-cecile.png")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${lerp(1.0, 1.06, tussen(t, a, 22, (x) => x))})` }} />
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 58, lineHeight: 1.1, ...goudTekst }}>{KORT.teaser}</div>
          <Eyebrow style={{ fontSize: 24, marginTop: 12, color: KLEUR.champagne, letterSpacing: "0.22em" }}>{KORT.teaserDJ}</Eyebrow>
        </div>
      </div>
      <Glitter aantal={20} seed={31} sterkte={0.9} zone={[20, 160]} />
      <Flits t={t} op={a} duur={0.3} />
    </AbsoluteFill>
  );
};

// Geluidseffecten in de korte versie
const SFX: [number, string, number][] = [
  ...[0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75].map((s): [number, string, number] => [s, "tik", 0.45]),
  [0.05, "glitter", 0.6],
  [0.7, "tik", 0.8],
  [0.85, "tik", 0.8],
  [2.15, "whoosh", 0.6],
  [3.66, "piep", 1],
  [5.85, "tik", 1],
  [6.45, "whoosh", 0.4],
  [6.59, "tik", 0.9],
  [8.15, "tik", 1],
  [8.55, "typ", 0.9],
  [8.9, "typ", 0.9],
  [9.68, "tik", 1],
  [10.15, "bevestig", 0.9],
  [10.45, "whoosh", 0.4],
  [12.15, "whoosh", 0.5],
  [13.15, "sluiter", 1],
  [13.95, "whoosh", 0.5],
  [15.76, "bevestig", 0.7],
  [17.0, "glitter", 0.9],
];

export const KortReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const bt = bron(t);
  const fasen = {
    telefoon: t >= 2.2 && t < 12.2,
    bak: t >= 12.2 && t < 14.0,
    doel: t >= 14.0 && t < 17.0,
  };
  const telIn = tussen(t, 2.2, 2.6);
  return (
    <AbsoluteFill style={{ background: KLEUR.nacht }}>
      <Achtergrond />
      <Hook t={t} />
      {fasen.telefoon && (
        <AbsoluteFill style={{ opacity: telIn, transform: `translateY(${(1 - telIn) * 300}px)` }}>
          <TelefoonGloed t={bt} />
          <TelefoonFlow t={bt} />
        </AbsoluteFill>
      )}
      {fasen.bak && (
        <AbsoluteFill style={{ opacity: 1 - tussen(t, 13.8, 14.0) }}>
          <Platenbak t={bt} />
        </AbsoluteFill>
      )}
      <KortTitels t={t} />
      {fasen.doel && <GoedDoel t={bt} titelTop={250} />}
      <VasteURL t={t} />
      <Oproep t={t} />
      <Lichtlek t={t} start={13.9} duur={0.8} x={60} />
      <Vignet sterkte={0.6} />
      <Grain sterkte={0.07} />

      <Audio src={staticFile("audio/muziek-kort.wav")} volume={(f) => muziekVolume(f / fps)} />
      {VO_KORT.map((v, i) => (
        <Sequence key={`vo${i}`} from={Math.round(v.op * fps)} durationInFrames={Math.ceil((v.duur + 0.2) * fps)}>
          <Audio src={staticFile(v.bestand)} volume={AUDIO.stemVolume} />
        </Sequence>
      ))}
      {SFX.map(([s, naam, v], i) => (
        <Sequence key={i} from={Math.round(s * fps)} durationInFrames={Math.round(1.2 * fps)}>
          <Audio src={staticFile(`audio/sfx-${naam}.wav`)} volume={v * AUDIO.sfxVolume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export { EVENT };
