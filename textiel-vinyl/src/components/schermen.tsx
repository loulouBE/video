// Schermen van events.loulou.store, in "CSS-pixels" van een iPhone (390 × 844).
// - ScreenHome / ScreenLogin / ScreenCollectie = echte schermafbeeldingen van de live site.
// - De schermen achter de login (dashboard, toevoegen, camera, editie, formulier, mijn platen)
//   zijn nagebouwd met de letterlijke teksten, kleuren en fonts uit de code van de site.
import React from "react";
import { Img, staticFile } from "remotion";
import { DEMO_VOORNAAM, FONT, KLEUR, PLAAT } from "../config";
import { lerp, tussen, zacht } from "../util";

const goud = KLEUR.goud;
const rand = "rgba(197,160,106,0.22)";

// ---------- gedeelde stukjes ----------
export const SiteHeader: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 82,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 20px 0",
      background: "rgba(16,12,13,0.92)",
      borderBottom: `1px solid ${rand}`,
      zIndex: 5,
    }}
  >
    <Img src={staticFile("img/logo-textiel-vinyl.png")} style={{ width: 62 }} />
    <div style={{ width: 40, height: 40, border: `1px solid rgba(241,228,210,0.5)`, borderRadius: 4, display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, padding: "0 11px" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ height: 1.5, background: KLEUR.champagne }} />
      ))}
    </div>
  </div>
);

const eyebrow: React.CSSProperties = {
  fontFamily: FONT.sans,
  fontWeight: 500,
  fontSize: 10.5,
  letterSpacing: "0.35em",
  color: goud,
  textTransform: "uppercase",
};
const display: React.CSSProperties = { fontFamily: FONT.display, fontWeight: 500, color: KLEUR.champagne };
const body: React.CSSProperties = { fontFamily: FONT.sans, fontWeight: 300, color: "rgba(241,228,210,0.82)", fontSize: 14.5, lineHeight: 1.55 };

export const KnopLuxe: React.FC<{ tekst: string; druk?: number; outline?: boolean; breedte?: number | string; style?: React.CSSProperties }> = ({
  tekst,
  druk = 0,
  outline = false,
  breedte = "100%",
  style,
}) => (
  <div
    style={{
      width: breedte,
      height: 48,
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT.sans,
      fontWeight: 500,
      fontSize: 12.5,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: outline ? KLEUR.champagne : KLEUR.nacht,
      background: outline ? (druk > 0 ? `rgba(197,160,106,${0.9 * druk})` : "rgba(16,12,13,0.55)") : druk > 0 ? KLEUR.champagne : goud,
      border: outline ? "1px solid rgba(197,160,106,0.6)" : "none",
      transform: `scale(${1 - druk * 0.04})`,
      boxShadow: druk > 0 ? `0 0 ${24 * druk}px rgba(233,201,135,0.7)` : "none",
      ...style,
    }}
  >
    {tekst}
  </div>
);

export const Toast: React.FC<{ tekst: string; p: number; succes?: boolean }> = ({ tekst, p, succes = true }) => (
  <div
    style={{
      position: "absolute",
      left: 18,
      right: 18,
      top: 96,
      padding: "14px 16px",
      borderRadius: 8,
      background: "#1d1517",
      border: `1px solid ${goud}`,
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: p,
      transform: `translateY(${-(1 - p) * 40}px)`,
      boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
      zIndex: 20,
    }}
  >
    <div style={{ width: 24, height: 24, borderRadius: "50%", background: succes ? goud : "transparent", border: `1.5px solid ${goud}`, display: "flex", alignItems: "center", justifyContent: "center", color: KLEUR.nacht, fontSize: 14, fontWeight: 700 }}>
      ✓
    </div>
    <div style={{ fontFamily: FONT.sans, fontWeight: 400, fontSize: 14, color: KLEUR.champagne }}>{tekst}</div>
  </div>
);

// ---------- echte schermen (schermafbeeldingen) ----------
export const ScreenHome: React.FC<{ scroll?: number; knopDruk?: number }> = ({ scroll = 0, knopDruk = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
    <Img src={staticFile("img/site-home-full.png")} style={{ width: 390, position: "absolute", top: -scroll, left: 0 }} />
    {/* highlight op de echte knop "Registreer je vinyl" (y 568–608 op de site) */}
    {knopDruk > 0 && (
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 568 - scroll,
          width: 350,
          height: 40,
          borderRadius: 4,
          background: `rgba(197,160,106,${0.85 * knopDruk})`,
          boxShadow: `0 0 ${30 * knopDruk}px rgba(233,201,135,0.8)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT.sans,
          fontWeight: 500,
          fontSize: 12.5,
          letterSpacing: "0.2em",
          color: KLEUR.nacht,
          opacity: knopDruk,
        }}
      >
        REGISTREER JE VINYL
      </div>
    )}
  </div>
);

export const ScreenLogin: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
    <Img src={staticFile("img/site-registreer-full.png")} style={{ width: 390, position: "absolute", top: 0, left: 0 }} />
  </div>
);

export const ScreenCollectie: React.FC<{ gloed?: number }> = ({ gloed = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
    <Img src={staticFile("img/site-collectie-full.png")} style={{ width: 390, position: "absolute", top: 0, left: 0 }} />
    {/* de echte plaat in de collectie (hoes op 20,151 – 183×207) */}
    <div
      style={{
        position: "absolute",
        left: 16,
        top: 448,
        width: 172,
        height: 340,
        borderRadius: 6,
        border: `2px solid rgba(233,201,135,${gloed})`,
        boxShadow: `0 0 ${40 * gloed}px rgba(233,201,135,${0.55 * gloed})`,
      }}
    />
  </div>
);

// ---------- nagebouwde schermen ----------
export const ScreenDashboard: React.FC<{ knopDruk?: number }> = ({ knopDruk = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
    <SiteHeader />
    <div style={{ position: "absolute", top: 120, left: 20, right: 20 }}>
      <div style={eyebrow}>Mijn vinyl</div>
      <div style={{ ...display, fontSize: 46, marginTop: 10 }}>Dag {DEMO_VOORNAAM}</div>
      <div style={{ ...body, fontSize: 13, marginTop: 4 }}>sofie@voorbeeld.be · 0470 12 34 56</div>
      <div style={{ marginTop: 34 }}>
        <KnopLuxe tekst="+ Plaat toevoegen" druk={knopDruk} />
      </div>
      <div style={{ marginTop: 44, borderTop: `1px solid ${rand}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ ...display, fontSize: 28 }}>Mijn platen</div>
        <div style={{ ...body, fontSize: 13 }}>0 · € 0,00</div>
      </div>
      <div style={{ ...body, marginTop: 18, fontStyle: "italic" }}>Nog geen platen geregistreerd.</div>
    </div>
  </div>
);

export const ScreenToevoegen: React.FC<{ scanDruk?: number }> = ({ scanDruk = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
    <SiteHeader />
    <div style={{ position: "absolute", top: 130, left: 20, right: 20 }}>
      <div style={eyebrow}>Mijn vinyl</div>
      <div style={{ ...display, fontSize: 44, marginTop: 10 }}>Plaat toevoegen</div>
      <div style={{ ...body, marginTop: 10 }}>Scan de barcode of fotografeer de hoes. Wij zoeken de plaat voor je op.</div>
      <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 14 }}>
        <KnopLuxe tekst="Scan barcode" druk={scanDruk} />
        <KnopLuxe tekst="Foto van hoes" outline />
      </div>
      <div style={{ ...body, textAlign: "center", marginTop: 22, textDecoration: "underline", fontSize: 13 }}>Annuleren</div>
    </div>
  </div>
);

// Achterkant van de platenhoes met de echte EAN-13 van de plaat
export const HoesAchterkant: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      background: "linear-gradient(160deg, #E8E1D4, #CFC6B6)",
      position: "relative",
      boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
      borderRadius: 2,
    }}
  >
    <div style={{ position: "absolute", left: 18, top: 16, fontFamily: FONT.sans, fontWeight: 600, fontSize: 15, letterSpacing: "0.25em", color: "#a01b1b" }}>KRAFTWERK</div>
    <div style={{ position: "absolute", left: 18, top: 38, fontFamily: FONT.sans, fontWeight: 400, fontSize: 9.5, color: "#3a3330", letterSpacing: "0.1em" }}>KING BISCUIT RADIO 1975</div>
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} style={{ position: "absolute", left: 18, top: 66 + i * 13, width: 110 + ((i * 37) % 60), height: 3, background: "rgba(58,51,48,0.35)", borderRadius: 2 }} />
    ))}
    <div style={{ position: "absolute", right: 14, bottom: 14, width: 150, background: "#fff", padding: "6px 6px 2px" }}>
      <Img src={staticFile("img/barcode-ean13.svg")} style={{ width: "100%" }} />
    </div>
    <div style={{ position: "absolute", left: 18, bottom: 16, fontFamily: FONT.sans, fontSize: 8, color: "#5a504b", letterSpacing: "0.1em" }}>CULT LEGENDS · 2020</div>
  </div>
);

export const ScreenCamera: React.FC<{ t: number; start: number; herkend: number }> = ({ t, start, herkend }) => {
  const lt = t - start;
  // licht wiebelende hand
  const wx = Math.sin(lt * 2.1) * 6 * (1 - herkend);
  const wy = Math.cos(lt * 1.7) * 5 * (1 - herkend);
  const rot = Math.sin(lt * 1.3) * 2.2 * (1 - herkend) - 4 * (1 - herkend);
  const nadering = tussen(t, start, start + 1.4);
  const lijnY = 300 + Math.sin(lt * 4.2) * 70;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0b0807", overflow: "hidden" }}>
      {/* "camerabeeld": tafel + hoes */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 45%, #4a3328 0%, #24170f 60%, #120b08 100%)" }} />
      <div
        style={{
          position: "absolute",
          left: 45 + wx,
          top: 230 + wy,
          transform: `rotate(${rot}deg) scale(${lerp(0.8, 1.05, nadering) + herkend * 0.05})`,
          filter: `blur(${(1 - nadering) * 3}px)`,
        }}
      >
        <HoesAchterkant />
      </div>
      {/* scanvenster rond de barcode */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 395,
          width: 230,
          height: 150,
          border: `2px solid rgba(233,201,135,${0.5 + herkend * 0.5})`,
          borderRadius: 10,
          boxShadow: `0 0 0 2000px rgba(8,5,4,${0.45}), 0 0 ${herkend * 40}px rgba(233,201,135,0.9)`,
          transform: `scale(${1 - herkend * 0.04})`,
        }}
      >
        {herkend < 0.5 && (
          <div style={{ position: "absolute", left: 6, right: 6, top: (lijnY - 300) * 0.9 + 70, height: 2, background: "#E9C987", boxShadow: "0 0 12px 3px rgba(233,201,135,0.85)" }} />
        )}
      </div>
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", ...eyebrow, fontSize: 12, color: KLEUR.champagne }}>
        Richt op de streepjescode
      </div>
      <div style={{ position: "absolute", left: 20, right: 20, bottom: 110 }}>
        <KnopLuxe tekst="Sluiten" outline />
      </div>
    </div>
  );
};

export const ScreenZoeken: React.FC<{ t: number; start: number }> = ({ t, start }) => {
  const p = tussen(t, start, start + 0.5);
  const hoek = (t - start) * 520;
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(16,12,13,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <div style={{ position: "relative", width: 250, height: 250, transform: `scale(${lerp(0.4, 1, p)})`, opacity: p }}>
        <svg width="250" height="250" viewBox="-100 -100 200 200" style={{ position: "absolute", inset: 0 }}>
          <circle r="99" fill="#0c0909" />
          {Array.from({ length: 22 }).map((_, i) => (
            <circle key={i} r={40 + i * 2.6} fill="none" stroke={i % 4 === 0 ? "#3a2c26" : "#1d1616"} strokeWidth="0.6" />
          ))}
          <path d="M 0 0 L -25 -97 A 100 100 0 0 1 25 -97 Z" fill="rgba(233,201,135,0.18)" />
          <circle r="100" fill="none" stroke="#C5A06A" strokeWidth="1" strokeDasharray={`${Math.min(1, (t - start) / 1.1) * 628} 628`} transform="rotate(-90)" />
        </svg>
        <div style={{ position: "absolute", left: 125 - 48, top: 125 - 48, width: 96, height: 96, borderRadius: "50%", overflow: "hidden", transform: `rotate(${hoek}deg)`, filter: `blur(${(1 - tussen(t, start + 0.4, start + 1.0)) * 6}px)` }}>
          <Img src={staticFile(PLAAT.hoes)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ ...display, fontSize: 26, fontStyle: "italic" }}>Plaat opzoeken…</div>
    </div>
  );
};

export const ScreenEditie: React.FC<{ p: number; kiesDruk?: number }> = ({ p, kiesDruk = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
    <SiteHeader />
    <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${0.6 * p})` }} />
    <div
      style={{
        position: "absolute",
        left: 14,
        right: 14,
        top: 170,
        padding: "22px 18px",
        background: "#1a1314",
        border: `1px solid ${rand}`,
        borderRadius: 6,
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px) scale(${0.96 + p * 0.04})`,
      }}
    >
      <div style={eyebrow}>Kijk wat we gevonden hebben</div>
      <div style={{ ...display, fontSize: 34, marginTop: 8 }}>Kies de juiste editie</div>
      <div
        style={{
          marginTop: 18,
          display: "flex",
          gap: 14,
          padding: 10,
          border: `1px solid ${kiesDruk > 0 ? goud : rand}`,
          borderRadius: 4,
          background: kiesDruk > 0 ? `rgba(197,160,106,${0.18 * kiesDruk})` : "transparent",
        }}
      >
        <Img src={staticFile(PLAAT.hoes)} style={{ width: 78, height: 78, objectFit: "cover" }} />
        <div>
          <div style={{ ...display, fontSize: 19, lineHeight: 1.15 }}>
            {PLAAT.artiest} — {PLAAT.album}
          </div>
          <div style={{ ...body, fontSize: 11.5, marginTop: 6 }}>{PLAAT.jaar} · Digital Media · {PLAAT.label}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <KnopLuxe tekst="Het is iets anders" outline style={{ fontSize: 9.5, letterSpacing: "0.12em" }} />
        <KnopLuxe tekst="Opnieuw zoeken" outline style={{ fontSize: 9.5, letterSpacing: "0.12em" }} />
      </div>
    </div>
  </div>
);

// Het registratieformulier (lange pagina, scrollbaar)
export type FormStaat = {
  scroll: number;
  vul: number; // 0–1: automatisch ingevulde velden
  richt: number; // 0 = niets, 0–1 = laden, 1 = getoond
  prijsTekst: string; // inhoud van het prijsveld
  prijsFocus: number;
  akkoord: number;
  knopDruk: number;
  opslaan: number;
  nadrukIndicatie: number;
};

const Veld: React.FC<{ label: string; waarde: string; p: number; focus?: number; placeholder?: string }> = ({ label, waarde, p, focus = 0, placeholder }) => {
  const n = Math.round(waarde.length * p);
  const zichtbaar = waarde.slice(0, n);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...eyebrow, fontSize: 9.5, marginBottom: 5 }}>{label}</div>
      <div
        style={{
          height: 40,
          border: `1px solid ${focus > 0 ? `rgba(233,201,135,${0.4 + focus * 0.6})` : rand}`,
          borderRadius: 4,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: FONT.sans,
          fontWeight: 400,
          fontSize: 15,
          color: KLEUR.champagne,
          background: focus > 0 ? `rgba(197,160,106,${0.1 * focus})` : "rgba(255,255,255,0.02)",
          boxShadow: focus > 0 ? `0 0 ${18 * focus}px rgba(233,201,135,0.45)` : "none",
        }}
      >
        <span>
          {zichtbaar || <span style={{ color: "rgba(241,228,210,0.35)" }}>{placeholder}</span>}
          {focus > 0.5 && <span style={{ color: goud }}>|</span>}
        </span>
        {p >= 1 && waarde && <span style={{ color: goud, fontSize: 14 }}>✓</span>}
      </div>
    </div>
  );
};

const Conditie: React.FC<{ titel: string }> = ({ titel }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ ...eyebrow, fontSize: 9.5, marginBottom: 6 }}>{titel}</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
      {["Mint (M)", "Near Mint (NM)", "Very Good Plus (VG+)", "Very Good (VG)", "Good (G)", "Poor (P)"].map((c, i) => (
        <div
          key={c}
          style={{
            height: 34,
            border: `1px solid ${i === 0 ? goud : rand}`,
            background: i === 0 ? "rgba(197,160,106,0.2)" : "transparent",
            borderRadius: 4,
            fontFamily: FONT.sans,
            fontSize: 9.5,
            color: i === 0 ? KLEUR.champagne : "rgba(241,228,210,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 4px",
          }}
        >
          {c}
        </div>
      ))}
    </div>
  </div>
);

export const ScreenFormulier: React.FC<{ s: FormStaat; t: number }> = ({ s, t }) => {
  const velden: [string, string][] = [
    ["Artiest *", PLAAT.artiest],
    ["Album *", PLAAT.album],
    ["Jaar", PLAAT.jaar],
    ["Label", PLAAT.label],
    ["Barcode", PLAAT.barcode],
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
      <div style={{ position: "absolute", left: 20, right: 20, top: 100 - s.scroll }}>
        <div style={{ ...body, fontSize: 12, color: goud }}>← Andere editie zoeken</div>
        <div style={{ display: "flex", gap: 14, marginTop: 12, alignItems: "center" }}>
          <Img src={staticFile(PLAAT.hoes)} style={{ width: 96, height: 96, objectFit: "cover", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }} />
          <div>
            <div style={{ ...display, fontSize: 24, lineHeight: 1.05 }}>{PLAAT.artiest}</div>
            <div style={{ ...display, fontSize: 18, fontStyle: "italic", color: "rgba(241,228,210,0.8)" }}>{PLAAT.album}</div>
          </div>
        </div>
        <div style={{ marginTop: 22 }}>
          {velden.map(([l, w], i) => (
            <Veld key={l} label={l} waarde={w} p={tussen(s.vul, i / velden.length, (i + 1) / velden.length, (x) => x)} />
          ))}
        </div>
        <div style={{ marginTop: 6 }}>
          <Conditie titel="Conditie plaat" />
          <Conditie titel="Conditie hoes" />
        </div>
        <Veld label="Vraagprijs (€) *" waarde={s.prijsTekst} p={1} focus={s.prijsFocus} placeholder="bv. 15" />
        {/* Richtprijs (Discogs) */}
        <div style={{ border: `1px solid ${rand}`, borderRadius: 4, padding: "12px 14px", marginTop: 4, background: "rgba(84,32,47,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ ...eyebrow, fontSize: 9.5 }}>Richtprijs (Discogs)</div>
            <div style={{ ...body, fontSize: 11, color: goud, textDecoration: "underline" }}>Waarde opzoeken</div>
          </div>
          {s.richt > 0 && s.richt < 1 && <div style={{ ...body, fontSize: 13, marginTop: 8, fontStyle: "italic" }}>Richtprijs opzoeken…</div>}
          {s.richt >= 1 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ ...body, fontSize: 13.5, color: KLEUR.champagne, display: "flex", gap: 6, alignItems: "center" }}>
                Vanaf <Wazig breedte={46} t={t} /> · <Wazig breedte={16} t={t} /> te koop
              </div>
              <div style={{ ...body, fontSize: 12.5, marginTop: 4, display: "flex", gap: 6, alignItems: "center", color: goud }}>
                Suggestie bij VG+: <Wazig breedte={40} t={t} /> — gebruik
              </div>
              <div
                style={{
                  ...body,
                  fontSize: 12.5,
                  marginTop: 6,
                  color: s.nadrukIndicatie > 0 ? KLEUR.champagne : "rgba(241,228,210,0.7)",
                  background: `rgba(197,160,106,${0.25 * s.nadrukIndicatie})`,
                  padding: "2px 4px",
                  marginLeft: -4,
                }}
              >
                Enkel een indicatie; jij kiest de prijs.
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ ...eyebrow, fontSize: 9.5, marginBottom: 5 }}>Opmerkingen</div>
          <div style={{ height: 56, border: `1px solid ${rand}`, borderRadius: 4 }} />
        </div>
        <div style={{ marginTop: 16, border: `1px solid ${rand}`, borderRadius: 4, padding: "12px 14px" }}>
          <div style={{ ...eyebrow, fontSize: 9.5 }}>Verkoopvoorwaarden</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 3,
                border: `1.5px solid ${goud}`,
                background: s.akkoord > 0.5 ? goud : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: KLEUR.nacht,
                fontSize: 13,
                fontWeight: 700,
                transform: `scale(${1 + Math.sin(Math.min(1, s.akkoord) * Math.PI) * 0.25})`,
              }}
            >
              {s.akkoord > 0.5 ? "✓" : ""}
            </div>
            <div style={{ ...body, fontSize: 12 }}>Ik aanvaard de verkoopvoorwaarden en de privacyverklaring.</div>
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <KnopLuxe tekst={s.opslaan > 0 && s.opslaan < 1 ? "Opslaan…" : "Plaat registreren"} druk={s.knopDruk} />
        </div>
        <div style={{ height: 200 }} />
      </div>
      <SiteHeader />
    </div>
  );
};

// Vervaagd bedrag: de echte richtprijs wordt live bij Discogs opgezocht (geen verzonnen cijfers)
const Wazig: React.FC<{ breedte: number; t: number }> = ({ breedte, t }) => (
  <span
    style={{
      display: "inline-block",
      width: breedte,
      height: 13,
      borderRadius: 7,
      background: `linear-gradient(90deg, rgba(233,201,135,0.25), rgba(233,201,135,0.6) ${50 + Math.sin(t * 5) * 40}%, rgba(233,201,135,0.25))`,
      filter: "blur(1.5px)",
    }}
  />
);

export const ScreenMijnPlaten: React.FC<{ status: number; t: number }> = ({ status, t }) => {
  // status: 0 = Aangemeld, 1 = Goedgekeurd
  const hoek = t * 20;
  return (
    <div style={{ position: "absolute", inset: 0, background: KLEUR.nacht }}>
      <SiteHeader />
      <div style={{ position: "absolute", top: 120, left: 20, right: 20 }}>
        <div style={eyebrow}>Mijn vinyl</div>
        <div style={{ ...display, fontSize: 40, marginTop: 8 }}>Dag {DEMO_VOORNAAM}</div>
        <div style={{ marginTop: 24, borderTop: `1px solid ${rand}`, paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ ...display, fontSize: 28 }}>Mijn platen</div>
          <div style={{ ...body, fontSize: 13 }}>1 · {PLAAT.vraagprijsTekst}</div>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 14, alignItems: "center", padding: 12, border: `1px solid ${status > 0 ? goud : rand}`, borderRadius: 4, boxShadow: status > 0 ? `0 0 ${24 * status}px rgba(233,201,135,0.35)` : "none" }}>
          <div style={{ width: 74, height: 74, borderRadius: "50%", overflow: "hidden", transform: `rotate(${hoek}deg)`, border: `2px solid ${KLEUR.nacht}`, boxShadow: "0 0 0 1px rgba(197,160,106,0.5)" }}>
            <Img src={staticFile(PLAAT.hoes)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...eyebrow, fontSize: 9, display: "flex", gap: 6, alignItems: "center" }}>
              {PLAAT.nummer} ·
              <span style={{ position: "relative", display: "inline-block", minWidth: 96 }}>
                <span style={{ opacity: 1 - status }}>Aangemeld</span>
                <span style={{ position: "absolute", left: 0, opacity: status, color: KLEUR.goudLicht }}>Goedgekeurd ✓</span>
              </span>
            </div>
            <div style={{ ...display, fontSize: 18, marginTop: 4, lineHeight: 1.1 }}>
              {PLAAT.artiest} — {PLAAT.album}
            </div>
            <div style={{ ...body, fontSize: 11.5, marginTop: 4 }}>
              {PLAAT.conditie}/{PLAAT.conditie} · {PLAAT.vraagprijsTekst}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 22 }}>
          <KnopLuxe tekst="Download afgiftebewijs (PDF)" outline style={{ fontSize: 10.5, letterSpacing: "0.14em" }} />
        </div>
      </div>
    </div>
  );
};

export { lerp, zacht };
