#!/usr/bin/env bash
# Maakt rechtenvrije geluidjes (synthetisch, met ffmpeg) in assets/sfx/.
set -e
cd "$(dirname "$0")/../assets/sfx"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
# pop: korte toon die snel zakt in toonhoogte
ffmpeg -loglevel error -y -f lavfi -i "aevalsrc='0.9*sin(2*PI*(520*t+2600*t*t*(0.5-t)))*exp(-28*t)':d=0.16:s=48000" -af "afade=t=in:d=0.004,lowpass=f=5000" $A pop.wav
# tik: droog klikje voor productwissels
ffmpeg -loglevel error -y -f lavfi -i "aevalsrc='0.7*(sin(2*PI*1800*t)+0.5*sin(2*PI*3100*t))*exp(-90*t)':d=0.07:s=48000" -af "afade=t=in:d=0.002,highpass=f=600" $A tik.wav
# whoosh: gefilterde ruis die aanzwelt en wegvalt
ffmpeg -loglevel error -y -f lavfi -i "anoisesrc=d=0.42:c=pink:a=0.6:r=48000:seed=7" -af "bandpass=f=1200:width_type=o:w=2,afade=t=in:d=0.26:curve=qsin,afade=t=out:st=0.26:d=0.16:curve=exp,volume=1.6" $A whoosh.wav
ls -la
