# GELEERD — mijn stijl

Lees dit vóór stap 5 van elke video. Vraag nooit opnieuw wat hier staat.

## Jouw stijl

1. **Type video's:** video's over nieuwe collecties in mijn winkel (Lou Lou, kledingwinkel, België).
   Meestal praat ik in de camera en laat ik kledingstukken zien.
2. **Formaat:** 9:16 verticaal, 1080×1920, voor Instagram Reels en TikTok.
3. **Lengte:** 15 tot 20 seconden. Kort en to the point, één boodschap.
4. **Taal:** ik spreek Nederlands, de ondertitels zijn in het **Frans** (vertaald).
   Transcribeer in NL en vertaal naar natuurlijk, kort Frans, niet woord voor woord.
   **Plaatsnamen nooit vertalen:** Ronse blijft Ronse (niet Renaix), Avelgem blijft Avelgem.
5. **Ondertitels:** korte stukjes van 2–4 Franse woorden, groot en vet, in de onderste helft maar
   binnen de veilige zone (niet lager dan 85 % van de hoogte). Het tempo volgt de NL-spraak per zin,
   verdeeld over de stukjes.
6. **Nadruktekst boven het hoofd:** productnamen + prijzen (bv. "Robe lin – €79"), animatie pop-in,
   maximaal één keer per ~5 seconden. Nooit over het gezicht.
7. **Huisstijl Lou Lou** (uit het Shopify-thema "Lou Lou V.17"):
   - Titels/nadruk: **Noto Serif**. Ondertitels/body: **Instrument Sans**, labels in HOOFDLETTERS.
   - Kleuren: antraciet `#1D1C1C`, wit `#FFFFFF`, crème `#F4F2ED`, warm grijs `#585756`.
   - Accent: **terracotta `#CC8E72`** (prijzen en nadruktekst).
   - Ondertitels: wit, met antraciet blokje of schaduw voor leesbaarheid.
   - Logo: `assets/logo.png` = zwart "Lou Lou"-script op transparant (400×150, uit het thema),
     goedgekeurd. Op donker beeld: `assets/logo-wit.png`.
8. **Zwevende foto's:** bij elk genoemd product zweeft de packshot ernaast (uit `assets/`; titels en
   prijzen staan in `assets/producten.json`, gebruik die voor de nadruktekst).
   Maximaal 1 tegelijk, witte rand + zachte schaduw. Nooit over het gezicht.
9. **Stiltes:** stiltes vanaf 600 ms wegknippen (`silencedetect d=0.6`, ca. −35 dB), 200 ms
   ademruimte tussen zinnen. **Binnen een zin** ook kortere pauzes (vanaf ±0,2 s) bijna helemaal
   wegknippen (laat ±50 ms), zodat een zin vloeiend doorloopt.
10. **Slechte takes:** bij herhalingen/herstarts de **beste** poging houden (vloeiendst, minste
    "euh", volledige zin), niet automatisch de laatste. In de oplevering melden welke ik koos.
11. **Muziek:** geen achtergrondtrack. **Wel geluidjes (SFX)**: pop bij kaartjes, tik bij productwissel,
    zachte whoosh bij zoom-sprongen; onder de stem, nooit storend.
12. **Intro/outro:** geen. Meteen starten met mij, eindigen op de laatste zin.
13. **Tempo:** **dynamisch**: snelle zoom-sprongen (1,00 ↔ 1,08–1,12) per zin of kernwoord, als
    jump-cuts; ondertitels poppen in met kernwoorden in terracotta; producten schuiven in.
14. **Nooit doen:**
    - geen gloed, 3D-tekst, neon of glitch-effecten;
    - geen emoji's, pijltjes of stickers;
    - geen rommel: kaartjes één tegelijk; camera-zoom + ondertitel-pop mogen wel samen.
15. **Oplevering:** `exports/<naam>-draft.mp4`, ook rechtstreeks in de chat sturen (zodat ik hem op
    mijn gsm kan bekijken), plus 5 regels samenvatting.

## Afgewezen

- IMG_6134: "Renaix" voor Ronse: plaatsnamen niet vertalen.
- IMG_6134: video zonder geluidjes en met te weinig dynamiek (één punch-in, rustige ondertitels).
- IMG_6134: te lange pauze midden in een zin ("nieuwigheden … van vandaag").
- TEXTIEL & VINYL: te veel tekst in beeld (uitlegkadertjes per stap, extra slogan "Verkoop ze bij Lou Lou!").

## Doe in de plaats

- Plaatsnamen in het origineel laten (Ronse, Avelgem).
- Met voice-over: weinig tekst in beeld. Enkel korte titels (+ URL); de stem legt uit. Geen extra kadertjes.
- Pauzes binnen een zin wegknippen: check de energie per 50 ms, niet alleen silencedetect d=0.6.
- Geluidjes (pop / tik / whoosh) bij elk visueel moment.
- Zoom-sprongen per zin, ondertitels die poppen met kernwoorden in terracotta, producten die inschuiven.
- Als ik "loulou.store" / de webshop noem: cutaway naar een telefoon met de scrollende webshop
  (`scripts/webshop-screenshot.cjs`, `assets/webshop-mobiel.jpg`), bij voorkeur scrollend naar de
  producten die in de video zitten.
