import React from "react";
import { Composition } from "remotion";
import { BREEDTE, DUUR, FPS, HOOGTE } from "./config";
import { Reel } from "./Reel";
import { KortReel, KORT_DUUR } from "./KortReel";
import { Teaser, TEASER_DUUR } from "./Teaser";

export const Root: React.FC = () => (
  <>
    <Composition id="TextielVinylReel" component={Reel} durationInFrames={DUUR * FPS} fps={FPS} width={BREEDTE} height={HOOGTE} />
    {[1, 2, 3, 4, 5].map((dag) => (
      <Composition key={dag} id={`TextielVinylTeaser${dag}`} component={Teaser} defaultProps={{ dag }} durationInFrames={TEASER_DUUR * FPS} fps={FPS} width={BREEDTE} height={HOOGTE} />
    ))}
    <Composition id="TextielVinylRegistratie" component={KortReel} durationInFrames={KORT_DUUR * FPS} fps={FPS} width={BREEDTE} height={HOOGTE} />
  </>
);
