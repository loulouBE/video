// Stap 1 t/m 5 (4–32 s): één doorlopende telefoon, zodat de kijker zelf lijkt te navigeren.
// Alle tijden zijn globale seconden van de video.
import React from "react";
import { AbsoluteFill } from "remotion";
import { KLEUR, PLAAT } from "../config";
import { lerp, tussen, inUit } from "../util";
import { Telefoon, Vinger, SCHERM_B, SCHERM_H } from "../components/elementen";
import {
  ScreenCamera,
  ScreenCollectie,
  ScreenDashboard,
  ScreenEditie,
  ScreenFormulier,
  ScreenHome,
  ScreenLogin,
  ScreenMijnPlaten,
  ScreenToevoegen,
  ScreenZoeken,
  Toast,
  FormStaat,
} from "../components/schermen";

export const SCHAAL = 1.4; // telefoon-schermschaal
const TEL_X = 540; // middelpunt op het canvas
const TEL_Y = 1050;

// ---- tikmomenten (ook gebruikt voor geluid) ----
export const TIKKEN = {
  registreerKnop: 6.75,
  plaatToevoegen: 8.45,
  scanBarcode: 9.15,
  editieKiezen: 13.55,
  waardeOpzoeken: 17.4,
  prijsVeld: 20.55,
  akkoord: 22.85,
  registreren: 23.55,
};
export const MOMENTEN = {
  barcodeGelezen: 11.0,
  plaatGevonden: 13.0,
  geregistreerd: 24.15,
  goedgekeurd: 26.4,
  typ: [20.95, 21.3],
};

// Schermvolgorde: [vanaf, scherm]
type Scherm =
  | "home"
  | "login"
  | "dashboard"
  | "toevoegen"
  | "camera"
  | "zoeken"
  | "editie"
  | "formulier"
  | "mijnplaten"
  | "collectie";
const VOLGORDE: [number, Scherm][] = [
  [0, "home"],
  [7.05, "login"],
  [7.55, "dashboard"],
  [8.75, "toevoegen"],
  [9.45, "camera"],
  [11.55, "zoeken"],
  [12.75, "editie"],
  [13.9, "formulier"],
  [24.75, "mijnplaten"],
  [27.3, "collectie"],
];

// Camera: [tijd, zoom, focusX, focusY] (focus in schermcoördinaten 390×844)
const CAMERA: [number, number, number, number][] = [
  [4.0, 1.0, 195, 422],
  [5.4, 1.0, 195, 422],
  [6.2, 1.75, 195, 588], // in op "Registreer je vinyl"
  [7.0, 1.75, 195, 588],
  [7.6, 1.0, 195, 422],
  [9.4, 1.0, 195, 422],
  [10.2, 1.45, 235, 470], // in op scanvenster
  [11.4, 1.45, 235, 470],
  [11.9, 1.0, 195, 422],
  [14.0, 1.0, 195, 422],
  [14.6, 1.3, 195, 330], // gegevens die ingevuld worden
  [16.6, 1.3, 195, 330],
  [17.3, 1.4, 195, 300], // richtprijs (na scroll)
  [19.6, 1.4, 195, 300],
  [20.2, 1.55, 195, 250], // vraagprijs
  [21.9, 1.55, 195, 250],
  [22.4, 1.25, 195, 300],
  [24.4, 1.25, 195, 300],
  [24.9, 1.0, 195, 422],
  [27.6, 1.0, 195, 422],
  [28.2, 1.35, 120, 420], // de plaat in de collectie
  [29.2, 1.35, 120, 420],
];

const camera = (t: number) => {
  let i = 0;
  while (i < CAMERA.length - 1 && t > CAMERA[i + 1][0]) i++;
  const a = CAMERA[i];
  const b = CAMERA[Math.min(i + 1, CAMERA.length - 1)];
  const p = b[0] === a[0] ? 1 : tussen(t, a[0], b[0], inUit);
  return { z: lerp(a[1], b[1], p), fx: lerp(a[2], b[2], p), fy: lerp(a[3], b[3], p) };
};

const schermOp = (t: number) => {
  let huidig: Scherm = "home";
  let sinds = 0;
  let vorig: Scherm | null = null;
  for (const [van, s] of VOLGORDE) {
    if (t >= van) {
      vorig = huidig;
      huidig = s;
      sinds = van;
    }
  }
  return { huidig, sinds, vorig };
};

const formStaat = (t: number): FormStaat => {
  const scroll =
    t < 16.7 ? 0 : t < 17.2 ? lerp(0, 700, tussen(t, 16.7, 17.2, inUit)) : t < 22.0 ? 700 : lerp(700, 1050, tussen(t, 22.0, 22.5, inUit));
  const typ = MOMENTEN.typ;
  const prijsTekst = t < typ[0] ? "" : t < typ[1] ? "1" : PLAAT.vraagprijs;
  return {
    scroll,
    vul: tussen(t, 14.3, 16.4, (x) => x),
    richt: t < TIKKEN.waardeOpzoeken ? 0 : t < 18.0 ? 0.5 : 1,
    prijsTekst,
    prijsFocus: t > TIKKEN.prijsVeld && t < 22.1 ? 1 : 0,
    akkoord: t < TIKKEN.akkoord ? 0 : tussen(t, TIKKEN.akkoord, TIKKEN.akkoord + 0.3),
    knopDruk: t > TIKKEN.registreren - 0.05 && t < TIKKEN.registreren + 0.25 ? 1 : 0,
    opslaan: tussen(t, TIKKEN.registreren + 0.1, MOMENTEN.geregistreerd, (x) => x),
    nadrukIndicatie: tussen(t, 21.5, 21.9) * (1 - tussen(t, 22.6, 22.9)),
  };
};

const SchermInhoud: React.FC<{ s: Scherm; t: number; sinds: number }> = ({ s, t, sinds }) => {
  switch (s) {
    case "home": {
      const druk = t > TIKKEN.registreerKnop - 0.05 && t < TIKKEN.registreerKnop + 0.3 ? 1 : 0;
      return <ScreenHome scroll={0} knopDruk={druk} />;
    }
    case "login":
      return <ScreenLogin />;
    case "dashboard":
      return <ScreenDashboard knopDruk={t > TIKKEN.plaatToevoegen - 0.05 && t < TIKKEN.plaatToevoegen + 0.3 ? 1 : 0} />;
    case "toevoegen":
      return <ScreenToevoegen scanDruk={t > TIKKEN.scanBarcode - 0.05 && t < TIKKEN.scanBarcode + 0.3 ? 1 : 0} />;
    case "camera":
      return <ScreenCamera t={t} start={sinds} herkend={tussen(t, MOMENTEN.barcodeGelezen, MOMENTEN.barcodeGelezen + 0.25)} />;
    case "zoeken":
      return <ScreenZoeken t={t} start={sinds} />;
    case "editie":
      return <ScreenEditie p={tussen(t, sinds, sinds + 0.45)} kiesDruk={t > TIKKEN.editieKiezen - 0.05 ? 1 : 0} />;
    case "formulier":
      return <ScreenFormulier s={formStaat(t)} t={t} />;
    case "mijnplaten":
      return <ScreenMijnPlaten status={tussen(t, MOMENTEN.goedgekeurd, MOMENTEN.goedgekeurd + 0.4)} t={t} />;
    case "collectie":
      return <ScreenCollectie gloed={tussen(t, 28.0, 28.5) * (1 - tussen(t, 29.4, 29.7))} />;
  }
};

// Vingerposities in schermcoördinaten
const VINGERS: { t: number; x: number; y: number }[] = [
  { t: TIKKEN.registreerKnop, x: 195, y: 588 },
  { t: TIKKEN.plaatToevoegen, x: 195, y: 330 },
  { t: TIKKEN.scanBarcode, x: 195, y: 318 },
  { t: TIKKEN.editieKiezen, x: 210, y: 300 },
  { t: TIKKEN.waardeOpzoeken, x: 330, y: 236 },
  { t: TIKKEN.prijsVeld, x: 160, y: 182 },
  { t: TIKKEN.akkoord, x: 32, y: 0 },
  { t: TIKKEN.registreren, x: 195, y: 0 },
];

export const TelefoonFlow: React.FC<{ t: number }> = ({ t }) => {
  if (t < 3.9 || t > 30.2) return null;
  // in- en uitkomen
  const binnen = tussen(t, 4.0, 4.7);
  const weg = tussen(t, 29.2, 29.9, inUit);
  const cam = camera(t);
  const { huidig, sinds, vorig } = schermOp(t);
  const overgang = tussen(t, sinds, sinds + 0.32);

  const telB = SCHERM_B * SCHAAL + 28;
  const telH = SCHERM_H * SCHAAL + 28;
  // focuspunt op het canvas (vóór zoom)
  const fxC = TEL_X - telB / 2 + 14 + cam.fx * SCHAAL;
  const fyC = TEL_Y - telH / 2 + 14 + cam.fy * SCHAAL;
  // focus naar het midden van de telefoon trekken bij inzoomen
  const trek = (cam.z - 1) / 0.75;
  const dx = (TEL_X - fxC) * Math.min(1, trek) * 0.9;
  const dy = (TEL_Y - fyC) * Math.min(1, trek) * 0.9;

  // vingers (dynamische y voor formulierknoppen die meescrollen)
  const fs = formStaat(t);
  const akkoordY = 100 - fs.scroll + 1081; // checkbox-positie in het formulier
  const knopY = 100 - fs.scroll + 1159;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: TEL_X - telB / 2,
          top: TEL_Y - telH / 2,
          transformOrigin: `${fxC - (TEL_X - telB / 2)}px ${fyC - (TEL_Y - telH / 2)}px`,
          transform: `translate(${dx}px, ${dy + (1 - binnen) * 900 + weg * 0}px) scale(${cam.z * (1 - weg * 0.55)}) rotate(${(1 - binnen) * 8 - weg * 6}deg)`,
          opacity: 1 - tussen(t, 29.7, 30.1),
        }}
      >
        <Telefoon schaal={SCHAAL}>
          {vorig && overgang < 1 && (
            <div style={{ position: "absolute", inset: 0, transform: `translateX(${-overgang * 120}px)`, opacity: 1 - overgang }}>
              <SchermInhoud s={vorig} t={t} sinds={sinds} />
            </div>
          )}
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - overgang) * 390}px)` }}>
            <SchermInhoud s={huidig} t={t} sinds={sinds} />
          </div>
          {/* toasts */}
          {t > MOMENTEN.barcodeGelezen && t < 12.4 && (
            <Toast tekst={`Barcode gelezen: ${PLAAT.barcode}`} p={tussen(t, MOMENTEN.barcodeGelezen, MOMENTEN.barcodeGelezen + 0.3) * (1 - tussen(t, 12.0, 12.4))} />
          )}
          {t > MOMENTEN.geregistreerd && t < 25.6 && (
            <Toast tekst="Plaat geregistreerd" p={tussen(t, MOMENTEN.geregistreerd, MOMENTEN.geregistreerd + 0.3) * (1 - tussen(t, 25.2, 25.6))} />
          )}
          {/* vinger (in schermcoördinaten) */}
          <div style={{ position: "absolute", inset: 0 }}>
            {VINGERS.map((v, i) => {
              const y = v.t === TIKKEN.akkoord ? akkoordY : v.t === TIKKEN.registreren ? knopY : v.y;
              return <Vinger key={i} t={t} x={v.x} y={y} tikOp={v.t} schaal={0.62} />;
            })}
          </div>
        </Telefoon>
      </div>
    </AbsoluteFill>
  );
};

export const TelefoonGloed: React.FC<{ t: number }> = ({ t }) => {
  const a = tussen(t, 4.0, 5.0) * (1 - tussen(t, 29.2, 30.0));
  return (
    <AbsoluteFill
      style={{
        opacity: a,
        background: `radial-gradient(ellipse 55% 35% at 50% 55%, rgba(197,160,106,0.22), transparent 70%)`,
        pointerEvents: "none",
      }}
    />
  );
};

export { KLEUR };
