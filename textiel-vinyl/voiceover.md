# Voice-over TEXTIEL & VINYL (Vlaams, warm en enthousiast)

Getimed op de video van 48 s. Spreektempo ± 3 woorden per seconde: vlot, met een glimlach.
Tekst tussen [haakjes] is regie, niet uitspreken.

| Tijd | Beeld | Tekst |
|---|---|---|
| 0:00–0:04 | Draaiende plaat → logo | Staan er bij jou nog platen op zolder? [korte pauze] Verkoop ze bij Lou Lou! |
| 0:04–0:08 | 1. Registreer je vinyl online | Surf naar events punt loulou punt store en registreer je vinyl. |
| 0:08–0:14 | 2. Scan de barcode | Scan de barcode op de hoes met je gsm… [biep] en hop: je plaat wordt automatisch herkend! |
| 0:14–0:20 | 3. Ontdek de waarde | Artiest, album, jaartal: alles staat er meteen. Plus een richtprijs, als indicatie. |
| 0:20–0:25 | 4. Jij bepaalt de prijs | Maar jíj kiest de prijs! Vul hem in, vink aan… en registreren. |
| 0:25–0:32 | 5. Wij verkopen jouw platen | Na goedkeuring staat je plaat online. Jij brengt ze binnen, wij doen de rest. |
| 0:32–0:37 | Goed doel 90/10 | Negentig procent is voor jou, tien procent gaat naar het goede doel. |
| 0:37–0:43 | Blanche & Cécile + sfeer | En op veertien november draaien Blanche en Cécile, bekend van de Memling, exclusief bij ons! Dansen, klinken, shoppen! |
| 0:43–0:48 | Eindbeeld | Tien jaar Lou Lou: van vijf tot tien in Ronse. Registreer nu je vinyl op events punt loulou punt store! |

## Opnemen en toevoegen

- Neem op als één doorlopende take (gsm in een stille kamer is prima), of per regel.
- Zet het bestand als `public/audio/voiceover.wav` en voeg in `src/Reel.tsx` toe:
  `<Audio src={staticFile("audio/voiceover.wav")} volume={1} />`
- Zet `AUDIO.muziekVolume` in `src/config.ts` lager (bv. 0.45), zodat de stem boven de muziek uitkomt.
