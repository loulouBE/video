#!/usr/bin/env bash
# Rendert beide versies en exporteert ze als H.264 (tv-range, -14 LUFS) naar ../exports/
set -e
cd "$(dirname "$0")"
B=${REMOTION_BROWSER:+--browser-executable=$REMOTION_BROWSER}
for paar in "TextielVinylReel:textiel-vinyl-reel" "TextielVinylRegistratie:textiel-vinyl-registratie"; do
  comp=${paar%%:*}; naam=${paar##*:}
  npx remotion render "$comp" "out/$naam.mp4" $B --concurrency="$(nproc)" 2>&1 | grep -vE "^\s*$|Rendered [0-9]+/|Encoded [0-9]+/" | tail -1
  ffmpeg -loglevel error -y -i "out/$naam.mp4" -vf "scale=in_range=full:out_range=tv,format=yuv420p" -c:v libx264 -crf 20 -preset slow -profile:v high -level 4.2 -maxrate 12M -bufsize 24M -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -af "loudnorm=I=-14:TP=-1.5:LRA=9" -c:a aac -b:a 192k -ar 48000 -movflags +faststart "../exports/$naam.mp4"
  ffprobe -v error -show_entries format=duration,size -of compact "../exports/$naam.mp4"
done
