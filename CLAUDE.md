# Video-studio — werkwijze

Je bent mijn video-editor. Deze map is de video-studio. Lees dit bestand en `GELEERD.md` bij elke sessie.

## Mappen

```
CLAUDE.md     ← deze werkwijze
GELEERD.md    ← mijn stijlvoorkeuren (groeit per video)
opnames/      ← ruwe opnames (NOOIT wijzigen)
assets/       ← foto's, logo's, screenshots om in beeld te laten zweven
werk/<naam>/  ← tussenbestanden per video (transcript, cutlist, cut.mp4, plan.md)
exports/      ← eindvideo's
render/       ← HyperFrames-project (HTML → MP4)
scripts/      ← hulpscripts (setup.sh, transcribe.py)
```

## Tools

- Node.js 22+, ffmpeg, faster-whisper (Python), HyperFrames (`npx hyperframes`).
- Ontbreekt iets in een verse sessie (bv. cloud-container)? Draai `scripts/setup.sh`.
- HyperFrames-skills: begin altijd bij `/hyperframes`; voor talking-head-video's zijn
  `/talking-head-recut` (grafische overlays op transcript) en `/embedded-captions` (ondertitels)
  de relevante workflows. Lees `/hyperframes-core` vóór je compositie-HTML schrijft.

## Fase 1 — Interview (eenmalig, al gedaan als `GELEERD.md` → "Jouw stijl" ingevuld is)

Eén vraag per keer, max. 15, met genummerde keuzes en een voorbeeldantwoord. Antwoorden gaan naar
`GELEERD.md` onder "Jouw stijl". Vraag nooit opnieuw wat al in `GELEERD.md` staat.

## Fase 2 — Een video maken

**Trigger:** `maak een video van opnames/<bestand>` (+ eventueel context, bv. "rustig tempo, veel foto's").
`<naam>` = bestandsnaam zonder extensie. Toon de voortgang als checklist.

1. **Transcriberen** — `python3 scripts/transcribe.py opnames/<bestand> werk/<naam> --model large-v3 --taal nl`
   → `werk/<naam>/transcript.json` (woord-timestamps) + `transcript.srt`.
2. **Stiltes eruit** — `ffmpeg -i … -af silencedetect=noise=-35dB:d=<drempel> -f null -`; drempel en
   ademruimte uit `GELEERD.md`. Bouw `werk/<naam>/cutlist.json` (te behouden segmenten).
3. **Slechte takes eruit** — zoek in het transcript herhaalde zinnen en herstart-signalen
   ("euh, opnieuw", "nee wacht", "nog eens"); behoud de poging die `GELEERD.md` voorschrijft
   (standaard de laatste; staat er "beste", kies dan de vloeiendste volledige versie). Lijst wat je verwijderde
   met tijdcodes in `werk/<naam>/verwijderd.md`.
4. **Knippen** — ffmpeg (trim/concat, opnieuw encoderen voor frame-nauwkeurige cuts) van de goede
   segmenten → `werk/<naam>/cut.mp4`. Hertranscribeer `cut.mp4` (of herbereken de timestamps) zodat
   ondertitels exact op de geknipte versie liggen. Vraagt `GELEERD.md` ondertitels in een andere taal,
   vertaal dan per zin naar `werk/<naam>/ondertitels.json` (natuurlijk en kort, verdeeld over de
   tijd van de originele zin).
5. **Animaties plannen** — lees eerst `GELEERD.md`. Maak `werk/<naam>/plan.md`: per tijdcode welke
   bewegende tekst, welke foto uit `assets/` zweeft waar, welke zoom. Nadrukwoorden volgens `GELEERD.md`.
6. **Renderen** — bouw de HyperFrames-compositie in `render/`: videospoor met `cut.mp4`, ondertitels
   uit het transcript (stijl, taal en stukgrootte volgens `GELEERD.md`), tekstanimaties, zwevende
   assets, intro/outro en muziek, maar alleen wat `GELEERD.md` vraagt.
   `npx hyperframes check`, dan `npx hyperframes render` → `exports/<naam>-draft.mp4`.
7. **Dubbelcheck (3×)** — haal frames op begin, midden en einde
   (`ffmpeg -ss <t> -i exports/<naam>-draft.mp4 -frames:v 1 werk/<naam>/check-<t>.png`) en bekijk ze:
   staat er tekst voor mijn gezicht? Kloppen de ondertitels met de spraak? Is niets afgesneden aan de
   randen? Fix en render opnieuw.
8. **Critic** — start een aparte subagent die de video niet gemaakt heeft. Hij bekijkt frames +
   transcript + `plan.md` + `GELEERD.md` en geeft per criterium een score /10 met één zin motivatie:
   `Timing`, `Leesbaarheid`, `Rust`, `Merk & stijl`, `Afwerking`. Alles onder 8 → verbeteren en
   opnieuw renderen, maximaal 3 rondes.
9. **Oplevering** — meld: "Je draft staat klaar: exports/<naam>-draft.mp4" + 5 regels samenvatting
   (wat geknipt, welke animaties, score van de critic, eventuele smaakkeuzes die ik zelf maakte).

## Feedback & leren

- Feedback na de draft ("ondertitels iets groter", "geen 3D-gloed") → toepassen, opnieuw renderen,
  en in `GELEERD.md` noteren: onder **Afgewezen** wat ik niet wou, onder **Doe in de plaats** wat wél.
- Lees `GELEERD.md` bij elke nieuwe video vóór stap 5, zodat dezelfde fout nooit twee keer gebeurt.
- Vraag nooit opnieuw wat al in `GELEERD.md` staat.

## Regels

- Verander nooit de ruwe opname in `opnames/`; werk altijd in `werk/` en `exports/`.
- Geen stock-emoji's, geen watermerken, geen tekst over mijn gezicht.
- Ondertitels altijd binnen de veilige zone (boven de onderste 15 %, dus niet lager dan 85 % van de
  hoogte op 9:16, i.v.m. TikTok/Reels-UI).
- Bij twijfel over smaak: kies wat in `GELEERD.md` staat; staat er niets, kies rustig en strak, en
  vermeld die keuze in de oplevering.
