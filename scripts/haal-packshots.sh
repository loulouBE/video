#!/usr/bin/env bash
# Downloadt logo + packshots uit assets/producten.json naar assets/ (vereist toegang tot cdn.shopify.com).
set -e
cd "$(dirname "$0")/../assets"
python3 -c 'import json;d=json.load(open("producten.json"));[print(x["bestand"],x["url"]) for x in [d["logo"],*d["producten"]]]' |
while read -r f u; do curl -sSfL -o "$f" "$u" && echo "ok  $f" || echo "MISLUKT  $f"; done
