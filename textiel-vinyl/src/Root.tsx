import React from "react";
import { Composition } from "remotion";
import { BREEDTE, DUUR, FPS, HOOGTE } from "./config";
import { Reel } from "./Reel";
import { KortReel, KORT_DUUR } from "./KortReel";

export const Root: React.FC = () => (
  <>
    <Composition id="TextielVinylReel" component={Reel} durationInFrames={DUUR * FPS} fps={FPS} width={BREEDTE} height={HOOGTE} />
    <Composition id="TextielVinylRegistratie" component={KortReel} durationInFrames={KORT_DUUR * FPS} fps={FPS} width={BREEDTE} height={HOOGTE} />
  </>
);
