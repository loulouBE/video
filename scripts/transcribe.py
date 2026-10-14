#!/usr/bin/env python3
"""Transcribeer een opname met faster-whisper (woord-timestamps).

Gebruik: python3 scripts/transcribe.py opnames/x.mov werk/x [--model large-v3] [--taal nl]
Schrijft werk/x/transcript.json (segmenten + woorden) en werk/x/transcript.srt.
"""
import argparse
import json
import subprocess
from pathlib import Path

import numpy as np

from faster_whisper import WhisperModel


def srt_tijd(t):
    ms = int(round(t * 1000))
    u, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{u:02}:{m:02}:{s:02},{ms:03}"


def lees_audio(bron):
    # Eerste audiospoor via ffmpeg → 16 kHz mono float32 (omzeilt PyAV-versieproblemen en extra iPhone-sporen).
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-loglevel", "error", "-i", bron, "-map", "0:a:0", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
        check=True, capture_output=True,
    ).stdout
    return np.frombuffer(raw, np.float32)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("bron")
    p.add_argument("uitmap")
    p.add_argument("--model", default="medium")
    p.add_argument("--taal", default="nl")
    a = p.parse_args()

    uit = Path(a.uitmap)
    uit.mkdir(parents=True, exist_ok=True)

    model = WhisperModel(a.model, device="auto", compute_type="auto")
    segmenten, info = model.transcribe(lees_audio(a.bron), language=a.taal, word_timestamps=True, vad_filter=False)

    data = {"taal": info.language, "duur": info.duration, "segmenten": []}
    srt = []
    for i, seg in enumerate(segmenten, 1):
        woorden = [{"woord": w.word.strip(), "start": w.start, "einde": w.end, "kans": w.probability} for w in seg.words or []]
        data["segmenten"].append({"start": seg.start, "einde": seg.end, "tekst": seg.text.strip(), "woorden": woorden})
        srt.append(f"{i}\n{srt_tijd(seg.start)} --> {srt_tijd(seg.end)}\n{seg.text.strip()}\n")
        print(f"[{seg.start:7.2f}] {seg.text.strip()}")

    (uit / "transcript.json").write_text(json.dumps(data, ensure_ascii=False, indent=2))
    (uit / "transcript.srt").write_text("\n".join(srt))


if __name__ == "__main__":
    main()
