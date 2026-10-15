import React from "react";
import { Composition } from "remotion";
import { BREEDTE, DUUR, FPS, HOOGTE } from "./config";
import { Reel } from "./Reel";

export const Root: React.FC = () => (
  <Composition id="TextielVinylReel" component={Reel} durationInFrames={DUUR * FPS} fps={FPS} width={BREEDTE} height={HOOGTE} />
);
