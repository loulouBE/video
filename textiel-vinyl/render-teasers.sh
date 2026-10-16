#!/usr/bin/env bash
# Rendert de 5 teasers (6 s) en exporteert ze als H.264 naar ../exports/teaser-dag-<n>.mp4
set -e
cd "$(dirname "$0")"
B=${REMOTION_BROWSER:+--browser-executable=$REMOTION_BROWSER}
for d in 1 2 3 4 5; do
  npx remotion render "TextielVinylTeaser$d" "out/teaser-$d.mp4" $B --concurrency="$(nproc)" 2>&1 | grep -vE "^\s*$|Rendered [0-9]+/|Encoded [0-9]+/" | tail -1
  ffmpeg -loglevel error -y -i "out/teaser-$d.mp4" -vf "scale=in_range=full:out_range=tv,format=yuv420p" -c:v libx264 -crf 20 -preset slow -profile:v high -level 4.2 -maxrate 12M -bufsize 24M -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -af "loudnorm=I=-14:TP=-1.5:LRA=9" -c:a aac -b:a 192k -ar 48000 -movflags +faststart "../exports/teaser-dag-$d.mp4"
  ffprobe -v error -show_entries format=duration,size -of compact "../exports/teaser-dag-$d.mp4"
done
