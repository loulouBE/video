#!/usr/bin/env bash
# Installeert de video-studio-tools opnieuw (handig in een verse (cloud-)sessie).
set -e
node -v
ffmpeg -version | head -1 || { echo "ffmpeg ontbreekt (macOS: brew install ffmpeg, Linux: apt install ffmpeg)"; exit 1; }
python3 -c "import faster_whisper" 2>/dev/null || pip install faster-whisper || pip install --break-system-packages faster-whisper
npx -y hyperframes skills update
echo "Video-studio tools klaar."
