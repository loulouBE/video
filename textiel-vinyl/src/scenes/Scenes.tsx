import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { EVENT, FONT, KLEUR, PLAAT, SCENE, SITE, TEKST } from "../config";
import { inUit, lerp, tussen, venster, zacht, rnd } from "../util";
import { KineTitel, Logo, Stappen, Vinyl } from "../components/elementen";
import { Discolicht, Eyebrow, Flits, Glitter, goudTekst, Lichtlek } from "../components/sfeer";

// ============================================================================
// SCÈNE 1 · 0–4 s · draaiende plaat → logo → vraag → antwoord
// ============================================================================
export const Opening: React.FC<{ t: number }> = ({ t }) => {
  if (t > SCENE.opening[1] + 0.4) return null;
  const closeUp = 1 - tussen(t, 1.05, 1.3, inUit);
  const hoek = t * 260 + t * t * 40;
  const logoP = tussen(t, 1.15, 1.75);
  const weg = tussen(t, 3.75, 4.25, inUit);
  return (
    <AbsoluteFill style={{ opacity: 1 - weg }}>
      {/* close-up van de draaiende plaat */}
      {closeUp > 0 && (
        <AbsoluteFill style={{ opacity: closeUp, alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${lerp(1.15, 1.35, tussen(t, 0, 1.2))}) translate(220px, 260px)` }}>
            <Vinyl grootte={1900} hoek={hoek} labelKleur={KLEUR.bordeaux} label={<Logo breedte={420} />} />
          </div>
        </AbsoluteFill>
      )}
      {/* logo + vraag */}
      <AbsoluteFill style={{ opacity: 1 - closeUp }}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
          <div style={{ transform: `translateY(420px) scale(${lerp(1.1, 1.0, logoP)})` }}>
            <Vinyl grootte={1400} hoek={hoek * 0.25} labelKleur={KLEUR.bordeauxDiep} glans={0.7} />
          </div>
        </AbsoluteFill>
        <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ transform: `scale(${lerp(0.6, 1, logoP)})`, opacity: logoP, filter: `drop-shadow(0 0 ${30 * logoP}px rgba(233,201,135,0.45))` }}>
            <Logo breedte={640} />
          </div>
        </div>
        <div style={{ position: "absolute", top: 780, left: 60, right: 60 }}>
          {TEKST.openingVraag.map((r, i) => (
            <KineTitel key={i} tekst={r} t={t} start={1.55 + i * 0.28} grootte={104} spatiering="0.03em" stagger={0.018} />
          ))}
        </div>
        <div style={{ position: "absolute", top: 1180, left: 40, right: 40, textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontFamily: FONT.louLou,
              fontWeight: 600,
              fontSize: 70,
              letterSpacing: "0.04em",
              color: KLEUR.champagne,
              opacity: tussen(t, 2.75, 3.05),
              transform: `scale(${lerp(1.25, 1, tussen(t, 2.75, 3.1))})`,
            }}
          >
            {TEKST.openingAntwoord}
          </div>
          <div style={{ height: 4, margin: "18px auto 0", width: `${tussen(t, 3.0, 3.5) * 760}px`, background: "linear-gradient(90deg, transparent, #E9C987, transparent)" }} />
        </div>
      </AbsoluteFill>
      <Lichtlek t={t} start={0.1} duur={1.0} x={80} />
      <Flits t={t} op={1.1} duur={0.4} />
    </AbsoluteFill>
  );
};

// ============================================================================
// Titels voor stap 1–5 (boven de telefoon) + stappenindicator
// ============================================================================
const STAP_TIJDEN = [SCENE.stap1, SCENE.stap2, SCENE.stap3, SCENE.stap4, SCENE.stap5];

export const StapTitels: React.FC<{ t: number }> = ({ t }) => {
  if (t < SCENE.stap1[0] || t > SCENE.stap5[1]) return null;
  const idx = STAP_TIJDEN.findIndex(([a, b]) => t >= a && t < b);
  const [a, b] = STAP_TIJDEN[Math.max(0, idx)];
  const stap = TEKST.stappen[Math.max(0, idx)];
  const zicht = tussen(t, 4.0, 4.4) * (1 - tussen(t, 31.6, 32.0));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* donkere band zodat de titel leesbaar blijft boven een ingezoomde telefoon */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 418, background: "linear-gradient(180deg, #0c0909 0%, #140e0f 100%)", opacity: zicht, boxShadow: "0 18px 40px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", top: 418, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C5A06A, transparent)", opacity: zicht }} />
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Stappen actief={stap.nr} zicht={zicht} />
      </div>
      <div style={{ position: "absolute", top: 250, left: 90, right: 90 }} key={stap.nr}>
        <KineTitel tekst={`${stap.nr}. ${stap.titel}`} t={t} start={a + 0.08} grootte={78} uit={b - 0.3} stagger={0.016} />
      </div>
      {/* groot uitlegkader onder de telefoonbovenkant (binnen de safe zone) */}
      {(() => {
        const van = a + 0.9;
        const tot = idx === 4 ? 29.2 : b - 0.25;
        const p = tussen(t, van, van + 0.35) * (1 - tussen(t, tot, tot + 0.25));
        if (p <= 0) return null;
        return (
          <div style={{ position: "absolute", top: 1400, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${0.94 + p * 0.06})` }}>
            <div style={{ maxWidth: 820, padding: "20px 34px", borderRadius: 8, background: "rgba(16,12,13,0.9)", border: `2px solid ${KLEUR.goud}`, boxShadow: "0 18px 50px rgba(0,0,0,0.6), 0 0 30px rgba(197,160,106,0.25)", fontFamily: FONT.sans, fontWeight: 500, fontSize: 40, lineHeight: 1.25, color: KLEUR.champagne, textAlign: "center" }}>
              {TEKST.stapUitleg[idx]}
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

// ============================================================================
// SCÈNE 6b · 29,3–32 s · fysieke platenbak + afneembaar prijsticketje
// ============================================================================
const Ticketje: React.FC<{ breedte: number }> = ({ breedte }) => {
  const s = breedte / 70; // 70 × 37 mm, zoals de ticketjes uit het beheer
  return (
    <div
      style={{
        width: breedte,
        height: 37 * s,
        background: "#FBF7EF",
        borderRadius: 3 * s,
        padding: `${3 * s}px ${4 * s}px`,
        boxShadow: "0 10px 26px rgba(0,0,0,0.45)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: FONT.sans,
        color: "#1d1517",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 3.2 * s, letterSpacing: "0.25em", fontWeight: 600 }}>TEXTIEL &amp; VINYL</div>
        <div style={{ fontSize: 7 * s, fontWeight: 600, fontFamily: FONT.display }}>{PLAAT.vraagprijsTekst}</div>
      </div>
      <div>
        <div style={{ fontSize: 4.6 * s, fontFamily: FONT.display, fontWeight: 600, lineHeight: 1.1 }}>{PLAAT.artiest}</div>
        <div style={{ fontSize: 3.6 * s, lineHeight: 1.2 }}>{PLAAT.album}</div>
        <div style={{ fontSize: 2.8 * s, color: "#6b5a50" }}>
          Plaat {PLAAT.conditie} · Hoes {PLAAT.conditie}
        </div>
      </div>
      <Img src={staticFile("img/barcode-ticket.svg")} style={{ width: "62%", height: 7 * s, objectFit: "fill" }} />
    </div>
  );
};

const HOEZEN = ["#6b2232", "#c48a3a", "#3a1a22", "#8d5a3b", "#d8c7a3", "#4a2a1f", "#a33d2e", "#54202F"];

export const Platenbak: React.FC<{ t: number }> = ({ t }) => {
  const [a, b] = [29.3, SCENE.stap5[1]];
  if (t < a || t > b + 0.4) return null;
  const inP = tussen(t, a, a + 0.6);
  const uit = tussen(t, b - 0.25, b + 0.2, inUit);
  const optillen = tussen(t, 29.9, 30.5);
  const ticket = tussen(t, 30.55, 30.9, zacht);
  const sub = tussen(t, 30.9, 31.3);
  return (
    <AbsoluteFill style={{ opacity: inP * (1 - uit) }}>
      <div style={{ position: "absolute", top: 455, left: 90, right: 90, textAlign: "center", fontFamily: FONT.sans, fontWeight: 300, fontSize: 38, lineHeight: 1.35, color: KLEUR.champagne, opacity: sub }}>
        {TEKST.stap5Sub}
      </div>
      {/* platenbak */}
      <div style={{ position: "absolute", left: 140, top: 820, width: 800, height: 720, transform: `translateY(${(1 - inP) * 200}px)` }}>
        {/* hoezen in de bak (achter → voor) */}
        {HOEZEN.map((k, i) => {
          const isOnze = i === HOEZEN.length - 2;
          const lift = isOnze ? optillen * 330 : 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 70 + i * 6,
                top: 60 + i * 34 - lift,
                width: 520,
                height: 520,
                background: isOnze ? "#000" : `linear-gradient(150deg, ${k}, ${KLEUR.nacht} 140%)`,
                boxShadow: "0 -6px 18px rgba(0,0,0,0.45)",
                transform: `rotate(${(rnd(i) - 0.5) * 3 + (isOnze ? -4 * optillen : 0)}deg)`,
                overflow: "visible",
              }}
            >
              {isOnze && <Img src={staticFile(PLAAT.hoes)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              {isOnze && ticket > 0 && (
                <div style={{ position: "absolute", right: -110 + (1 - ticket) * 320, top: 250 - (1 - ticket) * 220, transform: `rotate(${6 - ticket * 10}deg) scale(${lerp(1.3, 1, ticket)})`, opacity: ticket }}>
                  <Ticketje breedte={430} />
                </div>
              )}
            </div>
          );
        })}
        {/* voorkant van de houten bak */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 380,
            height: 330,
            borderRadius: 10,
            background: "linear-gradient(180deg, #4A2A1F 0%, #2A1712 60%, #1a0e0b 100%)",
            border: "3px solid #C5A06A",
            boxShadow: "inset 0 6px 0 rgba(233,201,135,0.25), 0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(197,160,106,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[0.25, 0.5, 0.75].map((y) => (
            <div key={y} style={{ position: "absolute", left: 0, right: 0, top: `${y * 100}%`, height: 2, background: "rgba(40,20,10,0.35)" }} />
          ))}
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 30, letterSpacing: "0.4em", color: "rgba(255,226,180,0.85)", background: "rgba(30,15,8,0.5)", padding: "10px 26px", borderRadius: 4 }}>
            VINYL · TE KOOP
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCÈNE 7 · 32–37 s · goed doel: 90 % / 10 %
// ============================================================================
export const GoedDoel: React.FC<{ t: number; titelTop?: number }> = ({ t, titelTop = 210 }) => {
  const [a, b] = SCENE.goedDoel;
  if (t < a - 0.2 || t > b + 0.3) return null;
  const zicht = venster(t, a, b + 0.2, 0.4, 0.4);
  const boog = tussen(t, a + 0.6, a + 1.9, inUit);
  const doel = tussen(t, a + 1.9, a + 2.4, zacht);
  const r = 300;
  const hoek90 = 324 * boog;
  const pad = (van: number, tot: number, rr: number) => {
    const p = (d: number) => [Math.sin((d * Math.PI) / 180) * rr, -Math.cos((d * Math.PI) / 180) * rr];
    const [x1, y1] = p(van);
    const [x2, y2] = p(tot);
    return `M 0 0 L ${x1} ${y1} A ${rr} ${rr} 0 ${tot - van > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
  };
  const uitstoot = doel * 34;
  const mid = (342 * Math.PI) / 180;
  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      <div style={{ position: "absolute", top: titelTop, left: 80, right: 80 }}>
        <KineTitel tekst={TEKST.goedDoelTitel} t={t} start={a + 0.1} grootte={92} stagger={0.016} />
      </div>
      <div style={{ position: "absolute", left: 540 - 380, top: 560, width: 760, height: 760 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.85 }}>
          <Vinyl grootte={760} hoek={t * 40} labelKleur={KLEUR.bordeaux} glans={0.6} />
        </div>
        <svg width={760} height={760} viewBox="-380 -380 760 760" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="goudBoog" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFF1C9" />
              <stop offset="0.5" stopColor="#C5A06A" />
              <stop offset="1" stopColor="#8C6A3A" />
            </linearGradient>
          </defs>
          {boog > 0 && <path d={pad(0, Math.max(0.1, hoek90), r)} fill="url(#goudBoog)" opacity={0.88} />}
          {doel > 0 && (
            <g transform={`translate(${Math.sin(mid) * uitstoot} ${-Math.cos(mid) * uitstoot})`}>
              <path d={pad(324, 360, r)} fill={KLEUR.champagne} opacity={doel} />
              <path d={pad(324, 360, r)} fill="none" stroke={KLEUR.bordeaux} strokeWidth={4} opacity={doel} />
            </g>
          )}
          <circle r={112} fill={KLEUR.bordeauxDiep} stroke="#C5A06A" strokeWidth="2" />
        </svg>
        <div style={{ position: "absolute", left: 380 - 110, top: 380 - 60, width: 220, textAlign: "center" }}>
          <div style={{ opacity: tussen(t, a + 1.85, a + 2.2) }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 88, lineHeight: 1, ...goudTekst }}>90%</div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 22, letterSpacing: "0.3em", color: KLEUR.champagne }}>VOOR JOU</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1340, left: 110, right: 160, display: "flex", justifyContent: "space-between", gap: 40 }}>
        <div style={{ opacity: tussen(t, a + 1.4, a + 1.8), transform: `translateY(${(1 - tussen(t, a + 1.4, a + 1.8)) * 30}px)` }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 108, lineHeight: 1, ...goudTekst }}>{TEKST.deelJij}</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 30, letterSpacing: "0.28em", color: KLEUR.champagne, marginTop: 6 }}>{TEKST.deelJijTekst}</div>
        </div>
        <div style={{ textAlign: "right", opacity: doel, transform: `translateY(${(1 - doel) * 30}px)`, maxWidth: 400 }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 108, lineHeight: 1, color: KLEUR.champagne }}>{TEKST.deelDoel}</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 30, letterSpacing: "0.22em", color: KLEUR.champagne, marginTop: 6, lineHeight: 1.3 }}>{TEKST.deelDoelTekst}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCÈNE 8 · 37–42 s · Blanche & Cécile + sfeermontage
// ============================================================================
const Dansvloer: React.FC<{ t: number }> = ({ t }) => {
  const kol = 8;
  const rij = 6;
  return (
    <div style={{ position: "absolute", left: -200, right: -200, bottom: 0, height: 760, perspective: 900 }}>
      <div style={{ position: "absolute", inset: 0, transform: "rotateX(62deg)", transformOrigin: "50% 100%", display: "grid", gridTemplateColumns: `repeat(${kol}, 1fr)`, gap: 8 }}>
        {Array.from({ length: kol * rij }).map((_, i) => {
          const aan = rnd(i * 7 + Math.floor(t * 8)) > 0.55;
          const k = ["#E9C987", "#C5A06A", "#a33d5a", "#F1E4D2"][i % 4];
          return <div key={i} style={{ background: aan ? k : "#1c1214", boxShadow: aan ? `0 0 40px ${k}` : "none", opacity: aan ? 0.85 : 0.6 }} />;
        })}
      </div>
    </div>
  );
};

const Bar: React.FC<{ t: number }> = ({ t }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #6b2a3a, ${KLEUR.bordeauxDiep} 55%, ${KLEUR.nacht})` }}>
    <svg width="1080" height="1100" viewBox="0 0 1080 1100" style={{ position: "absolute", top: 320 }}>
      {/* bartoog */}
      <rect x="0" y="820" width="1080" height="280" fill="#2a1712" />
      <rect x="0" y="812" width="1080" height="14" fill="#C5A06A" />
      {/* drie glazen: coupe, flute, tumbler */}
      {[
        { x: 300, k: "#F3D9A0" },
        { x: 540, k: "#E9C987" },
        { x: 780, k: "#d9705f" },
      ].map((g, i) => (
        <g key={i} transform={`translate(${g.x} ${i === 1 ? 520 : 600})`}>
          {i === 0 && (
            <>
              <path d="M -110 0 Q 0 120 110 0 Z" fill={g.k} opacity="0.85" />
              <path d="M -120 -6 Q 0 140 120 -6" stroke="#fff" strokeOpacity="0.6" strokeWidth="5" fill="none" />
              <rect x="-5" y="60" width="10" height="150" fill="#fff" opacity="0.5" />
              <ellipse cx="0" cy="214" rx="70" ry="12" fill="#fff" opacity="0.5" />
            </>
          )}
          {i === 1 && (
            <>
              <path d="M -40 0 L 40 0 L 30 220 Q 0 240 -30 220 Z" fill={g.k} opacity="0.85" />
              <path d="M -46 -4 L -34 224 M 46 -4 L 34 224" stroke="#fff" strokeOpacity="0.6" strokeWidth="5" />
              <rect x="-5" y="232" width="10" height="56" fill="#fff" opacity="0.5" />
              <ellipse cx="0" cy="292" rx="56" ry="10" fill="#fff" opacity="0.5" />
              {Array.from({ length: 9 }).map((_, j) => (
                <circle key={j} cx={(rnd(j) - 0.5) * 50} cy={210 - ((t * 160 + j * 37) % 200)} r={3 + rnd(j + 3) * 3} fill="#fff" opacity="0.7" />
              ))}
            </>
          )}
          {i === 2 && (
            <>
              <path d="M -80 0 L 80 0 L 70 210 L -70 210 Z" fill={g.k} opacity="0.75" />
              <path d="M -86 -4 L -74 214 L 74 214 L 86 -4" stroke="#fff" strokeOpacity="0.6" strokeWidth="5" fill="none" />
              <circle cx="40" cy="-10" r="26" fill="#f2b84b" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
            </>
          )}
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);

export const DJs: React.FC<{ t: number }> = ({ t }) => {
  const [a, b] = SCENE.djs;
  if (t < a - 0.1 || t > b + 0.3) return null;
  const montage = TEKST.toonSfeer ? 39.2 : 9999;
  const fotoP = tussen(t, a, a + 0.6);
  const fotoUit = tussen(t, montage - 0.2, montage + 0.1);
  const kb = tussen(t, a, Math.min(montage, b), (x) => x);
  return (
    <AbsoluteFill style={{ opacity: 1 - tussen(t, b - 0.05, b + 0.25) }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 60% at 50% 35%, #6b2232 0%, ${KLEUR.bordeauxDiep} 45%, ${KLEUR.nacht} 100%)` }} />
      <Discolicht sterkte={0.55} />
      {/* deel 1: originele foto (identiteit onaangetast, enkel trage zoom) */}
      <AbsoluteFill style={{ opacity: 1 - fotoUit }}>
        <div style={{ position: "absolute", left: -260, top: 1060, opacity: 0.55 }}>
          <Vinyl grootte={700} hoek={t * 120} />
        </div>
        <div style={{ position: "absolute", right: -260, top: 120, opacity: 0.45 }}>
          <Vinyl grootte={600} hoek={-t * 120} labelKleur={KLEUR.goud} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 250,
            width: 960,
            height: 640,
            overflow: "hidden",
            borderRadius: 6,
            boxShadow: "0 0 0 3px #C5A06A, 0 0 0 10px rgba(16,12,13,0.8), 0 0 0 12px rgba(197,160,106,0.6), 0 40px 90px rgba(0,0,0,0.7)",
            opacity: fotoP,
            transform: `scale(${lerp(0.9, 1, fotoP)})`,
          }}
        >
          <Img src={staticFile("img/blanche-cecile.png")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${lerp(1.0, 1.07, kb)})`, transformOrigin: "50% 40%" }} />
        </div>
        <div style={{ position: "absolute", top: 975, left: 20, right: 20 }}>
          <KineTitel tekst={TEKST.djNamen} t={t} start={a + 0.35} grootte={96} stagger={0.02} spatiering="0.02em" />
        </div>
        <div style={{ position: "absolute", top: 1105, left: 0, right: 0, textAlign: "center", opacity: tussen(t, a + 0.7, a + 1.0) }}>
          <Eyebrow style={{ fontSize: 34, color: KLEUR.champagne }}>{TEKST.djBekend}</Eyebrow>
        </div>
        <div
          style={{
            position: "absolute",
            top: 1185,
            left: 60,
            right: 60,
            textAlign: "center",
            fontFamily: FONT.display,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 66,
            color: KLEUR.goudLicht,
            opacity: tussen(t, a + 1.0, a + 1.35),
            transform: `translateY(${(1 - tussen(t, a + 1.0, a + 1.35)) * 30}px)`,
          }}
        >
          {TEKST.djExclusief}
        </div>
      </AbsoluteFill>
      {/* deel 2: sfeermontage */}
      {TEKST.sfeer.map((s, i) => {
        const st = montage + i * 0.85;
        const en = st + 0.85 + (i === TEKST.sfeer.length - 1 ? 0.3 : 0.08);
        if (t < st || t > en) return null;
        const p = tussen(t, st, st + 0.22);
        const lt = t - st;
        return (
          <AbsoluteFill key={i} style={{ clipPath: `circle(${p * 120}% at 50% 50%)` }}>
            {s.soort === "bar" ? (
              <Bar t={t} />
            ) : (
              <AbsoluteFill style={{ background: KLEUR.nacht }}>
                <Img src={staticFile(s.beeld)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.12 - lt * 0.08})` }} />
                <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(16,12,13,0.35) 0%, transparent 30%, rgba(16,12,13,0.88) 55%, rgba(16,12,13,0.92) 75%, rgba(16,12,13,0.4) 100%)" }} />
                {s.soort === "dansvloer" && <Dansvloer t={t} />}
              </AbsoluteFill>
            )}
            <div style={{ position: "absolute", top: 1180, left: 60, right: 60, textAlign: "center" }}>
              <Eyebrow style={{ fontSize: 26, color: KLEUR.goudLicht }}>14 november · Lou Lou Ronse</Eyebrow>
              <div style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: s.label.length > 18 ? 60 : 96, lineHeight: 1.05, marginTop: 16, ...goudTekst }}>{s.label}</div>
            </div>
          </AbsoluteFill>
        );
      })}
      <Glitter aantal={22} seed={8} sterkte={1} zone={[20, 230]} />
      <Glitter aantal={18} seed={9} sterkte={0.9} zone={[1560, 1900]} />
      <Flits t={t} op={a} duur={0.45} />
      <Lichtlek t={t} start={a + 0.1} duur={1.2} x={30} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCÈNE 9 · 42–47 s · eindbeeld met logo, info en oproep
// ============================================================================
export const Einde: React.FC<{ t: number }> = ({ t }) => {
  const [a] = SCENE.einde;
  if (t < a - 0.2) return null;
  const inP = tussen(t, a, a + 0.5);
  const regel = (van: number) => ({ opacity: tussen(t, van, van + 0.35), transform: `translateY(${(1 - tussen(t, van, van + 0.4)) * 24}px)` });
  const info: React.CSSProperties = { fontFamily: FONT.sans, fontWeight: 500, fontSize: 40, letterSpacing: "0.16em", color: KLEUR.champagne, textAlign: "center" };
  return (
    <AbsoluteFill style={{ opacity: inP }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 85% 55% at 50% 30%, ${KLEUR.bordeaux} 0%, ${KLEUR.choco} 50%, ${KLEUR.nacht} 100%)` }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 0.22 }}>
        <div style={{ transform: "translateY(-430px)" }}>
          <Vinyl grootte={1100} hoek={t * 30} labelKleur={KLEUR.bordeauxDiep} />
        </div>
      </AbsoluteFill>
      <Discolicht sterkte={0.3} />
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `scale(${lerp(0.85, 1, tussen(t, a, a + 0.7))})`, filter: "drop-shadow(0 0 30px rgba(233,201,135,0.35))" }}>
          <Logo breedte={560} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 735, left: 60, right: 60 }}>
        <div style={{ ...regel(a + 0.25), textAlign: "center", fontFamily: FONT.louLou, fontWeight: 600, fontSize: 62, letterSpacing: "0.08em", color: KLEUR.champagne }}>{EVENT.jubileum}</div>
        <div style={{ height: 2, width: 420, margin: "22px auto", background: "linear-gradient(90deg, transparent, #C5A06A, transparent)", opacity: tussen(t, a + 0.5, a + 0.8) }} />
        <div style={{ ...info, ...regel(a + 0.4) }}>{EVENT.datum}</div>
        <div style={{ ...info, ...regel(a + 0.5), marginTop: 10 }}>{EVENT.uur}</div>
        <div style={{ ...info, ...regel(a + 0.6), marginTop: 10 }}>{EVENT.plaats}</div>
        <div style={{ ...info, ...regel(a + 0.7), fontSize: 28, fontWeight: 300, letterSpacing: "0.1em", marginTop: 4, color: "rgba(241,228,210,0.75)" }}>{EVENT.adres}</div>
      </div>
      <div style={{ position: "absolute", top: 1180, left: 90, right: 90, display: "flex", justifyContent: "center", gap: 18 }}>
        {TEKST.slogan.map((w, i) => {
          const p = tussen(t, a + 0.9 + i * 0.25, a + 1.2 + i * 0.25);
          return (
            <div key={w} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 60, opacity: p, transform: `scale(${lerp(1.4, 1, p)})`, ...goudTekst }}>
              {w}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 1300, left: 130, right: 130, ...regel(a + 1.75) }}>
        <div
          style={{
            height: 104,
            borderRadius: 6,
            background: "linear-gradient(180deg, #F3D9A0, #C5A06A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.sans,
            fontWeight: 600,
            fontSize: 36,
            letterSpacing: "0.12em",
            color: KLEUR.nacht,
            boxShadow: `0 0 ${30 + Math.sin(t * 6) * 12}px rgba(233,201,135,0.55)`,
          }}
        >
          {TEKST.oproep}
        </div>
        <div style={{ marginTop: 24, textAlign: "center", fontFamily: FONT.sans, fontWeight: 500, fontSize: 66, letterSpacing: "0.02em", color: KLEUR.goudLicht }}>
          {SITE.url}
        </div>
      </div>
      <Glitter aantal={22} seed={21} sterkte={0.9} zone={[20, 300]} />
      <Glitter aantal={16} seed={22} sterkte={0.8} zone={[1600, 1900]} />
      <Flits t={t} op={a} duur={0.3} />
    </AbsoluteFill>
  );
};
