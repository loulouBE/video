#!/usr/bin/env bash
# contactblad van out/stills/s-<t>.png in de opgegeven volgorde
args=(); for t in "$@"; do args+=(-i "out/stills/s-$t.png"); done
ffmpeg -loglevel error -y "${args[@]}" -filter_complex "hstack=inputs=$#,scale=-1:700" out/stills/sheet.jpg
