import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AUDIO, KLEUR } from "./config";
import { laadFonts } from "./util";
import { Achtergrond, Glitter, Grain, Lichtlek, Vignet } from "./components/sfeer";
import { TelefoonFlow, TelefoonGloed, TIKKEN, MOMENTEN } from "./scenes/TelefoonFlow";
import { DJs, Einde, GoedDoel, Opening, Platenbak, StapTitels } from "./scenes/Scenes";

laadFonts();

// Geluidseffecten: [tijd (s), bestand, volume]
const SFX: [number, string, number][] = [
  [1.1, "glitter", 0.7],
  [3.9, "whoosh", 0.6],
  [TIKKEN.registreerKnop, "tik", 1],
  [7.0, "whoosh", 0.35],
  [TIKKEN.plaatToevoegen, "tik", 1],
  [TIKKEN.scanBarcode, "tik", 1],
  [MOMENTEN.barcodeGelezen, "piep", 1],
  [11.5, "whoosh", 0.4],
  [MOMENTEN.plaatGevonden, "glitter", 0.5],
  [TIKKEN.editieKiezen, "tik", 1],
  [14.3, "typ", 0.7],
  [15.0, "typ", 0.7],
  [15.7, "typ", 0.7],
  [TIKKEN.waardeOpzoeken, "tik", 1],
  [18.0, "glitter", 0.5],
  [TIKKEN.prijsVeld, "tik", 1],
  [MOMENTEN.typ[0], "typ", 0.9],
  [MOMENTEN.typ[1], "typ", 0.9],
  [TIKKEN.akkoord, "tik", 1],
  [TIKKEN.registreren, "tik", 1],
  [MOMENTEN.geregistreerd, "bevestig", 0.9],
  [MOMENTEN.goedgekeurd, "bevestig", 0.8],
  [27.3, "whoosh", 0.4],
  [29.3, "whoosh", 0.6],
  [30.6, "sluiter", 1],
  [31.9, "whoosh", 0.5],
  [34.0, "bevestig", 0.7],
  [37.0, "glitter", 0.9],
  [39.2, "whoosh", 0.5],
  [40.05, "whoosh", 0.35],
  [40.9, "whoosh", 0.35],
  [41.75, "whoosh", 0.35],
  [42.6, "glitter", 0.8],
];

export const Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ background: KLEUR.nacht }}>
      <Achtergrond />
      <Glitter aantal={14} seed={3} sterkte={0.55} zone={[20, 140]} />
      <Glitter aantal={14} seed={4} sterkte={0.55} zone={[1600, 1900]} />
      <TelefoonGloed t={t} />
      <Opening t={t} />
      <TelefoonFlow t={t} />
      <Platenbak t={t} />
      <StapTitels t={t} />
      <GoedDoel t={t} />
      <DJs t={t} />
      <Einde t={t} />
      <Lichtlek t={t} start={31.8} duur={0.9} x={60} />
      <Lichtlek t={t} start={42.3} duur={0.9} x={40} kleur="255,170,140" />
      <Vignet sterkte={0.6} />
      <Grain sterkte={0.07} />

      <Audio src={staticFile(AUDIO.muziek)} volume={AUDIO.muziekVolume} />
      {SFX.map(([s, naam, v], i) => (
        <Sequence key={i} from={Math.round(s * fps)} durationInFrames={Math.round(1.2 * fps)}>
          <Audio src={staticFile(`audio/sfx-${naam}.wav`)} volume={v * AUDIO.sfxVolume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
