// Rendert controlebeelden op opgegeven seconden: node stills.mjs 2.5 6.8 12
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";
const tijden = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browserExecutable = process.env.REMOTION_BROWSER || null;
const comp = await selectComposition({ serveUrl, id: process.env.COMP || "TextielVinylReel", browserExecutable });
fs.mkdirSync("out/stills", { recursive: true });
for (const s of tijden) {
  const output = `out/stills/s-${s}.png`;
  await renderStill({ composition: comp, serveUrl, output, frame: Math.round(Number(s) * 30), browserExecutable, scale: 0.5 });
  console.log(output);
}
