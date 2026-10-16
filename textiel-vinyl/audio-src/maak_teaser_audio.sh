#!/usr/bin/env bash
# Teaser-geluid: stuk groove uit muziek.wav, elke dag minder gedempt ("achter de deur" → open).
set -e
cd "$(dirname "$0")/../public/audio"
SRC=muziek.wav; S=8.0; D=6.0
fx(){ echo "atrim=$S:$(python3 -c "print($S+$D)"),asetpts=PTS-STARTPTS,$1,afade=t=in:d=0.25,afade=t=out:st=$(python3 -c "print($D-0.6)"):d=0.6"; }
ffmpeg -loglevel error -y -i $SRC -af "$(fx 'lowpass=f=260,lowpass=f=260,volume=2.2')" teaser-1.wav
ffmpeg -loglevel error -y -i $SRC -af "$(fx 'lowpass=f=600,lowpass=f=600,volume=1.8')" teaser-2.wav
ffmpeg -loglevel error -y -i $SRC -af "$(fx 'lowpass=f=1500,volume=1.4')" teaser-3.wav
# dag 4: gedempt tot de onthulling (0,95 s), dan volledig open + crash
ffmpeg -loglevel error -y -i $SRC -filter_complex "[0:a]atrim=$S:$(python3 -c "print($S+$D)"),asetpts=PTS-STARTPTS,asplit[a][b];[a]lowpass=f=400,lowpass=f=400,volume=2.0,afade=t=out:st=0.85:d=0.15[dicht];[b]afade=t=in:st=0.9:d=0.1[open];[dicht][open]amix=inputs=2:normalize=0,afade=t=in:d=0.2,afade=t=out:st=$(python3 -c "print($D-0.6)"):d=0.6[o]" -map "[o]" teaser-4-zonder-crash.wav
ffmpeg -loglevel error -y -i teaser-4-zonder-crash.wav -i sfx-glitter.wav -filter_complex "[1:a]adelay=950|950,volume=1.4[g];[0:a][g]amix=inputs=2:normalize=0[o]" -map "[o]" teaser-4.wav && rm teaser-4-zonder-crash.wav
ffmpeg -loglevel error -y -i $SRC -af "$(fx 'volume=1.0')" teaser-5.wav
ls -la teaser-*.wav
