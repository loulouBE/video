import { continueRender, delayRender, Easing, interpolate, staticFile } from "remotion";

// Tijdhulpjes: alles in seconden, geklemd en met zachte easing.
export const zacht = Easing.bezier(0.22, 1, 0.36, 1); // easeOutQuint-achtig
export const inUit = Easing.bezier(0.65, 0, 0.35, 1);

export const tussen = (t: number, a: number, b: number, ease = zacht) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// Venster: 0 → 1 (in) … 1 → 0 (uit)
export const venster = (t: number, a: number, b: number, inDuur = 0.35, uitDuur = 0.3) =>
  Math.min(tussen(t, a, a + inDuur), 1 - tussen(t, b - uitDuur, b, inUit));

// Deterministische pseudo-random (voor glitter, grain)
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Fonts laden vóór de eerste frame
const FONTS: [string, string, string, string?][] = [
  ["Cormorant Garamond", "cormorant-garamond-latin-500-normal.woff2", "500"],
  ["Cormorant Garamond", "cormorant-garamond-latin-600-normal.woff2", "600"],
  ["Cormorant Garamond", "cormorant-garamond-latin-700-normal.woff2", "700"],
  ["Cormorant Garamond", "cormorant-garamond-latin-500-italic.woff2", "500", "italic"],
  ["Jost", "jost-latin-300-normal.woff2", "300"],
  ["Jost", "jost-latin-400-normal.woff2", "400"],
  ["Jost", "jost-latin-500-normal.woff2", "500"],
  ["Jost", "jost-latin-600-normal.woff2", "600"],
  ["Noto Serif", "noto-serif-latin-400-normal.woff2", "400"],
  ["Noto Serif", "noto-serif-latin-600-normal.woff2", "600"],
];

let geladen = false;
export const laadFonts = () => {
  if (geladen || typeof document === "undefined") return;
  geladen = true;
  const h = delayRender("fonts");
  Promise.all(
    FONTS.map(([fam, file, weight, style]) => {
      const ff = new FontFace(fam, `url(${staticFile("fonts/" + file)})`, {
        weight,
        style: style ?? "normal",
      });
      return ff.load().then((f) => (document.fonts as unknown as { add: (x: FontFace) => void }).add(f));
    })
  )
    .then(() => continueRender(h))
    .catch((e) => {
      console.error(e);
      continueRender(h);
    });
};
