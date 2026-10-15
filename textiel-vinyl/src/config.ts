// ============================================================================
//  TEXTIEL & VINYL – 10 JAAR LOU LOU · alle aanpasbare inhoud op één plaats
//  Tijden in seconden. Teksten in hoofdletters zoals ze in beeld komen.
// ============================================================================

export const FPS = 30;
export const BREEDTE = 1080;
export const HOOGTE = 1920;
export const DUUR = 50.6; // seconden

// Kleuren: overgenomen van events.loulou.store (src/styles.css) + art direction
export const KLEUR = {
  nacht: "#100C0D", // achtergrond van de site
  choco: "#2A1712", // chocoladebruin
  chocoLicht: "#4A2A1F",
  bordeaux: "#54202F", // --bordeaux van de site
  bordeauxDiep: "#3A1320",
  goud: "#C5A06A", // --gold van de site
  goudLicht: "#E9C987",
  champagne: "#F1E4D2", // --champagne van de site
  creme: "#F4EBDD",
  ivoor: "#F6EFE3",
  grijs: "#B8A88F",
};

// Goudverloop voor luxe typografie
export const GOUD_VERLOOP =
  "linear-gradient(180deg, #FFF1C9 0%, #E9C987 28%, #C5A06A 52%, #8C6A3A 74%, #E9C987 100%)";

export const FONT = {
  display: "Cormorant Garamond", // titels op de evenementensite
  sans: "Jost", // teksten en knoppen op de evenementensite
  louLou: "Noto Serif", // Lou Lou-huisstijl
};

// Website
export const SITE = {
  url: "events.loulou.store",
  registreerPad: "events.loulou.store/registreer",
};

// Echt voorbeeld uit de publieke collectie (events.loulou.store/collectie),
// aangevuld met MusicBrainz (release 2145683f-…). Vraagprijs = echte prijs uit de collectie.
export const PLAAT = {
  artiest: "Kraftwerk",
  album: "King Biscuit Radio 1975",
  jaar: "2020",
  label: "Cult Legends",
  barcode: "8717662582301",
  conditie: "M",
  conditieLang: "Mint (M)",
  vraagprijs: "10",
  vraagprijsTekst: "€ 10,00",
  nummer: "TV-00001",
  hoes: "img/kraftwerk-king-biscuit-1975.jpg",
};

// Fictieve voornaam voor de demo-gebruiker in de interface
export const DEMO_VOORNAAM = "Sofie";

export const EVENT = {
  naam: "TEXTIEL & VINYL",
  jubileum: "10 JAAR LOU LOU",
  datum: "ZATERDAG 14 NOVEMBER 2026",
  uur: "17:00 – 22:00",
  plaats: "LOU LOU RONSE",
  adres: "Abeelstraat 25 · Ronse",
};

// Bekende platenhoezen die in de opening poppen (Cover Art Archive, zie public/img/hoezen/hoezen.json)
export const HOEZEN = [
  "img/hoezen/abba-arrival.jpg",
  "img/hoezen/fleetwood-mac-rumours.jpg",
  "img/hoezen/michael-jackson-thriller.jpg",
  "img/hoezen/pink-floyd-the-dark-side-of-the-moon.jpg",
  "img/hoezen/queen-a-night-at-the-opera.jpg",
  "img/hoezen/donna-summer-bad-girls.jpg",
  "img/hoezen/chic-c-est-chic.jpg",
  "img/hoezen/david-bowie-let-s-dance.jpg",
  "img/hoezen/earth--wind---fire-i-am.jpg"
];

// Scènes (start, einde) in seconden
export const SCENE = {
  opening: [0, 4],
  stap1: [4, 8],
  stap2: [8, 14],
  stap3: [14, 20],
  stap4: [20, 25.3],
  stap5: [25.3, 32],
  goedDoel: [32, 37],
  djs: [37, 43.7],
  einde: [43.7, 50.6],
} as const;

export const TEKST = {
  openingVraag: ["STAAN ER BIJ JOU", "NOG PLATEN", "OP ZOLDER?"],
  openingAntwoord: "", // leeg = niet tonen (de voice-over zegt het)
  stappen: [
    { nr: 1, titel: "REGISTREER JE VINYL ONLINE" },
    { nr: 2, titel: "SCAN DE BARCODE OF HOES" },
    { nr: 3, titel: "ONTDEK DE WAARDE" },
    { nr: 4, titel: "JIJ BEPAALT DE PRIJS!" },
    { nr: 5, titel: "WIJ VERKOPEN ZE OP 14 NOVEMBER" },
  ],
  // uitlegkader per stap: uitgeschakeld (te druk; de voice-over legt het uit)
  toonUitleg: false,
  stapUitleg: [
    "op events.loulou.store",
    "Richt je camera op de streepjescode",
    "Automatisch herkend!",
    "Richtprijs = enkel een indicatie. Jij kiest!",
    "Te koop in de winkel op 14 november",
  ],
  stap5Sub: "", // leeg = geen tekst bij de platenbak (de voice-over zegt het)
  goedDoelTitel: "EN JE STEUNT EEN GOED DOEL!",
  deelJij: "90%",
  deelJijTekst: "VOOR JOU",
  deelDoel: "10%",
  deelDoelTekst: "VOOR HET GOEDE DOEL",
  djNamen: "BLANCHE & CÉCILE",
  djBekend: "BEKEND VAN DE MEMLING",
  djExclusief: "EXCLUSIEF ACHTER DE DRAAITAFELS!",
  // sfeermontage na Blanche & Cécile (uitgeschakeld: foto blijft staan tot "10 jaar Lou Lou")
  toonSfeer: false,
  sfeer: [
    { label: "DE DANSVLOER", beeld: "img/mirrorball.jpg", soort: "dansvloer" },
    { label: "DE BAR", beeld: "", soort: "bar" },
    { label: "KERST- & NIEUWJAARSCOLLECTIE", beeld: "img/fashion.jpg", soort: "foto" },
    { label: "FEESTELIJKE CADEAUS", beeld: "img/gifts.jpg", soort: "foto" },
  ],
  slogan: ["SCAN.", "REGISTREER.", "VERKOOP."],
  oproep: "REGISTREER NU JOUW VINYL!",
};

// Geluid (bestanden in public/audio, gemaakt met audio-src/maak_muziek.py)
export const AUDIO = {
  muziek: "audio/muziek.wav",
  muziekVolume: 0.9,
  muziekOnderStem: 0.32, // muziekvolume terwijl de voice-over spreekt
  stemVolume: 1.0,
  sfxVolume: 0.55,
};
