# TEXTIEL & VINYL – 10 JAAR LOU LOU · TikTok/Reels-video

Verticale promovideo (1080 × 1920, 30 fps, H.264, 48 s), gebouwd met **Remotion (React/TypeScript)**.
De gerenderde video: `out/textiel-vinyl-reel.mp4` (kopie in `../exports/textiel-vinyl-reel.mp4`).

## Twee versies

| Versie | Compositie | Bestand | Doel |
|---|---|---|---|
| Registratie (22 s) | `TextielVinylRegistratie` (`src/KortReel.tsx`) | `exports/textiel-vinyl-registratie.mp4` | zo veel mogelijk registraties: hook, 3 stappen, 90/10, URL vast in beeld |
| Event (49,6 s) | `TextielVinylReel` (`src/Reel.tsx`) | `exports/textiel-vinyl-reel.mp4` | uitnodiging voor het feest + volledige uitleg |

Renderen: `npx remotion render TextielVinylRegistratie out/registratie.mp4` (of `TextielVinylReel`).

## Voice-over

ElevenLabs-stem "Jeroen Vlaams" (bronbestanden `public/audio/voiceover-bron.mp3` en `voiceover-kort-bron.mp3`).
De opname is per zin geknipt en op de juiste scène gelegd: zie `src/voiceover.json` en `src/voiceover-kort.json`
(`op` = starttijd in seconden). De muziek zakt automatisch onder de stem (`AUDIO.muziekOnderStem`).
Nieuwe opname? Vervang de bron, knip opnieuw op de stiltes (zie de tijden in de json) en pas `op` aan.

## Snel starten

```bash
cd textiel-vinyl
npm install
npm run studio          # live voorvertoning in de browser (Remotion Studio)
npm run render          # → out/textiel-vinyl-reel.mp4
```

Zonder internet (of in een container zonder Chrome-download) geef je een lokale Chrome Headless Shell op:
`REMOTION_BROWSER=/pad/naar/headless_shell npm run render`.

Controlebeelden op bepaalde seconden: `node stills.mjs 2.5 12 40` → `out/stills/`.

## Wat pas je waar aan?

| Wat | Waar |
|---|---|
| **Alle teksten** (titels, stappen, 90/10, DJ's, datum, uur, plaats, oproep, URL) | `src/config.ts` → `TEKST`, `EVENT`, `SITE` |
| **Kleuren en fonts** | `src/config.ts` → `KLEUR`, `FONT` (fonts staan in `public/fonts/`) |
| **Timing van de scènes** | `src/config.ts` → `SCENE` (seconden) |
| **Voorbeeldplaat** (hoes, artiest, prijs, barcode) | `src/config.ts` → `PLAAT`, hoes in `public/img/` |
| Tikmomenten, camera-zooms en schermvolgorde in de telefoon | `src/scenes/TelefoonFlow.tsx` → `TIKKEN`, `CAMERA`, `VOLGORDE` |
| Opbouw van de scènes | `src/scenes/Scenes.tsx` (opening, titels, platenbak, goed doel, DJ's, einde) |
| Nagebouwde schermen van de website | `src/components/schermen.tsx` |
| **Beelden** | `public/img/` (zelfde bestandsnaam = automatisch vervangen) |
| **Muziek** | vervang `public/audio/muziek.wav` (± 48 s) of pas `audio-src/maak_muziek.py` aan en draai `python3 audio-src/maak_muziek.py public/audio` |
| Geluidseffecten en hun momenten | `public/audio/sfx-*.wav`, lijst `SFX` in `src/Reel.tsx` |
| Barcodes | `node audio-src/maak_barcodes.cjs <EAN> <TV-nummer>` |
| Schermafbeeldingen van de site vernieuwen | `PW=$(npm root -g)/playwright node site-capture.cjs <map>` en kopieer naar `public/img/site-*.png` |

Elke stap heeft ook een groot uitlegkader (`TEKST.stapUitleg`), zodat de video zonder geluid begrijpelijk is.

Verandert de duur, pas dan ook `DUUR` in `src/config.ts` en in `audio-src/maak_muziek.py` aan.

## Storyboard (zoals gerenderd)

| Tijd | Scène |
|---|---|
| 0–4 s | Close-up draaiende plaat + scratch → logo → "STAAN ER BIJ JOU NOG PLATEN OP ZOLDER?" → "VERKOOP ZE BIJ LOU LOU!" |
| 4–8 s | **1. Registreer je vinyl online**: telefoon met de echte homepage, zoom op "Registreer je vinyl", tik, loginpagina |
| 8–14 s | **2. Scan de barcode**: "+ Plaat toevoegen" → "Scan barcode" → camerabeeld met scanvenster en scanlijn → "Barcode gelezen" → "Plaat opzoeken…" → "Kies de juiste editie" |
| 14–20 s | **3. Ontdek de waarde**: velden vullen zich automatisch (artiest, album, jaar, label, barcode), "Waarde opzoeken" → "Richtprijs (Discogs)" |
| 20–25,3 s | **4. Jij bepaalt de prijs!**: tik in "Vraagprijs (€)", typ 10, "Enkel een indicatie; jij kiest de prijs.", voorwaarden aanvinken, "Plaat registreren" → "Plaat geregistreerd" |
| 25,3–32 s | **5. Wij verkopen jouw platen!**: status "Aangemeld" → "Goedgekeurd", de plaat in "The Vinyl Collection", daarna de platenbak met prijsticketje |
| 32–37 s | "EN JE STEUNT EEN GOED DOEL!": 90 % voor jou / 10 % voor het goede doel |
| 37–42,6 s | Blanche & Cécile (originele foto), "BEKEND VAN DE MEMLING", "EXCLUSIEF ACHTER DE DRAAITAFELS!" + dansvloer, bar, kerst- & nieuwjaarscollectie, cadeaus |
| 42,6–48 s | Logo, 10 jaar Lou Lou, datum, uur, Lou Lou Ronse, "SCAN. REGISTREER. VERKOOP.", "REGISTREER NU JOUW VINYL!", events.loulou.store |

## Echt, nagebouwd of concept? (belangrijk)

**Echt (van de live site events.loulou.store of de echte bronnen)**
- Logo TEXTIEL & VINYL en de foto van Blanche & Cécile: originele bestanden van de site, niet bewerkt (enkel trage zoom).
- Sfeerbeelden `mirrorball.jpg`, `fashion.jpg`, `gifts.jpg`, `vinyl.jpg`: van de site.
- Homepage, loginpagina en "The Vinyl Collection": echte schermafbeeldingen (iPhone 13).
- Voorbeeldplaat **Kraftwerk – King Biscuit Radio 1975** (Cult Legends, 2020, EAN 8717662582301): staat echt in de publieke collectie aan **€ 10,00 · M/M**; hoes en gegevens via MusicBrainz/Cover Art Archive. De barcode in beeld is de echte EAN-13.
- Teksten in de interface ("Plaat toevoegen", "Scan barcode", "Richt op de streepjescode", "Barcode gelezen", "Plaat opzoeken…", "Kies de juiste editie", "Richtprijs (Discogs)", "Enkel een indicatie; jij kiest de prijs.", "Plaat registreren", "Plaat geregistreerd", statussen "Aangemeld"/"Goedgekeurd") zijn letterlijk overgenomen uit de code van de site.
- Prijsticketje: zelfde opzet als de ticketjes uit het beheer (70 × 37 mm, TEXTIEL & VINYL, prijs, artiest, titel, conditie, Code128-barcode van het TV-nummer).
- 10 % commissie voor het goede doel: staat op de homepage ("Je geeft 10% commissie af aan het goede doel.").

**Nagebouwd (de site zelf, maar achter de login, dus niet te fotograferen)**
- Dashboard "Dag Sofie", "Plaat toevoegen", camerascherm, editiekeuze, registratieformulier en "Mijn platen": nagebouwd in de stijl van de site (Cormorant Garamond, Jost, kleuren uit `styles.css`). "Sofie" en haar e-mail/telefoon zijn fictief.
- Het camerabeeld van de hoes-achterkant is een illustratie (de echte achterkant was niet beschikbaar).

**Bewust zonder cijfers / concept**
- **Richtprijs:** in de video is het bedrag vervaagd ("Vanaf ▒▒ · ▒ te koop"). De echte richtprijs wordt op de site live bij Discogs opgezocht; zonder Discogs-sleutel konden we die niet ophalen, en we verzinnen geen marktwaarde. Wil je een echt bedrag tonen: vervang de `Wazig`-component in `src/components/schermen.tsx` door het bedrag dat de site toont.
- **Goed doel:** op de site staat geen naam van het goede doel; de video noemt daarom geen naam.
- **Binnenbrengen in de winkel en prijslabel kleven:** de site toont (nog) geen info over afgiftemomenten; de platenbak-scène is een illustratie van het proces.
- **De bar:** er waren geen foto's van de bar; die is getekend (cocktailillustratie). De dansvloer gebruikt de spiegelbol-foto van de site met een geanimeerde lichtvloer.
- **"Bekend van de Memling":** uit de opdracht, niet van de site.

## Muziek, geluid en voice-over

- **Soundtrack:** volledig synthetisch gemaakt in `audio-src/maak_muziek.py` (120 BPM disco/funk: four-on-the-floor, claps, open hats, octaafbas, akkoordstabs, strijkers, vinyl-scratch bij de opening, riser + climax bij Blanche & Cécile). Geen samples of bestaande muziek, dus geen rechtenkwestie.
- **Geluidseffecten** (tik, piep, bevestiging, whoosh, sluiter, glitter): ook synthetisch, zelfde script.
- **Voice-over:** aangeleverd via ElevenLabs (zie hierboven). In de lange versie is "Dansen, klinken, shoppen" weggelaten omdat de slotzin anders over het eindbeeld liep; de beelden tonen het wel.
- Wil je liever een bestaande disco-track: gebruik enkel muziek met licentie voor sociale media (bv. de TikTok/Instagram-muziekbibliotheek bij het posten).

## Veilige zones

Belangrijke tekst staat tussen y ≈ 150 en 1450 px en tussen x ≈ 80 en 1000 px, dus niet onder de TikTok/Reels-knoppen rechts en de beschrijving onderaan.

## Licenties

- Remotion: gratis voor individuen en bedrijven tot 3 medewerkers; daarboven is een Remotion Company License nodig (zie remotion.pro).
- Fonts Cormorant Garamond, Jost, Noto Serif: SIL Open Font License.
- Hoes Kraftwerk: Cover Art Archive (gebruikt zoals op de site in de collectie).
