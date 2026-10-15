#!/usr/bin/env python3
"""Synthetische 70's disco/funk-soundtrack (120 BPM) voor TEXTIEL & VINYL.

Alles wordt hier wiskundig opgebouwd (geen samples), dus volledig rechtenvrij.
Gebruik: python3 audio-src/maak_muziek.py public/audio
Schrijft muziek.wav (de soundtrack) en losse geluidseffecten (sfx-*.wav).

Aanpassen: BPM, DUUR en de akkoorden/baslijn staan bovenaan. De sectie-indeling
(intro, groove, break, climax, outro) staat in `arrangement()`.
"""
import sys
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 44100
BPM = 120
BEAT = 60 / BPM          # 0,5 s
BAR = 4 * BEAT           # 2 s
DUUR = 47.0              # seconden
rng = np.random.default_rng(1970)


# ---------- bouwstenen ----------
def t_(d):
    return np.arange(int(d * SR)) / SR


def filt(x, kind, f, order=2):
    if isinstance(f, (list, tuple)):
        f = [v / (SR / 2) for v in f]
    else:
        f = f / (SR / 2)
    return sosfilt(butter(order, f, btype=kind, output="sos"), x)


def env(n, a=0.005, d=0.2, s=0.0, r=0.05, hold=None):
    """ADSR-envelope over n samples."""
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    hold_n = max(0, n - a_n - d_n - r_n) if hold is None else int(hold * SR)
    e = np.concatenate([
        np.linspace(0, 1, max(a_n, 1)),
        np.linspace(1, s, max(d_n, 1)),
        np.full(hold_n, s),
        np.linspace(s, 0, max(r_n, 1)),
    ])
    out = np.zeros(n)
    out[: min(n, len(e))] = e[:n]
    return out


def saw(f, t):
    return 2 * ((f * t) % 1) - 1


def note(n):
    """MIDI-noot → frequentie."""
    return 440 * 2 ** ((n - 69) / 12)


def place(buf, x, t0, gain=1.0):
    i = int(round(t0 * SR))
    if i >= len(buf):
        return
    j = min(len(buf), i + len(x))
    buf[i:j] += gain * x[: j - i]


# ---------- instrumenten ----------
def kick():
    t = t_(0.42)
    f = 46 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) * np.exp(-t * 7.5)
    x += 0.35 * filt(rng.standard_normal(len(t)), "high", 2500) * np.exp(-t * 180)
    return np.tanh(1.6 * x)


def clap():
    n = int(0.35 * SR)
    x = np.zeros(n)
    noise = filt(rng.standard_normal(n), "band", [900, 3200])
    for k, off in enumerate((0, 0.011, 0.022)):
        i = int(off * SR)
        seg = noise[: n - i] * np.exp(-np.arange(n - i) / SR * (90 if k < 2 else 16))
        x[i:] += seg * (0.7 if k < 2 else 1.0)
    return x * 0.7


def hat(open_=False):
    d = 0.22 if open_ else 0.045
    t = t_(d)
    x = filt(rng.standard_normal(len(t)), "high", 7000)
    return x * np.exp(-t * (14 if open_ else 95)) * (0.45 if open_ else 0.3)


def shaker():
    t = t_(0.06)
    x = filt(rng.standard_normal(len(t)), "band", [5000, 11000])
    return x * np.sin(np.pi * t / 0.06) ** 2 * 0.12


def bass_note(n, d):
    t = t_(d)
    f = note(n)
    x = 0.6 * saw(f, t) + 0.4 * np.sign(np.sin(2 * np.pi * f * t))
    x = filt(x, "low", 900)
    x += 0.5 * np.sin(2 * np.pi * f * t)
    return np.tanh(1.4 * x) * env(len(t), a=0.004, d=0.08, s=0.65, r=0.03)


def stab(chord, d=0.22, bright=2600):
    t = t_(d)
    x = sum(saw(note(n) * (1 + det), t) for n in chord for det in (-0.004, 0.004))
    x = filt(x / (2 * len(chord)), "low", bright)
    return x * env(len(t), a=0.004, d=0.12, s=0.35, r=0.06)


def keys(chord, d):
    """Elektrische piano (zachte FM-bel)."""
    t = t_(d)
    x = 0
    for n in chord:
        f = note(n)
        x = x + np.sin(2 * np.pi * f * t + 1.2 * np.exp(-t * 6) * np.sin(2 * np.pi * 2 * f * t))
    return x / len(chord) * env(len(t), a=0.003, d=0.6, s=0.25, r=0.2)


def strings(chord, d):
    t = t_(d)
    x = sum(saw(note(n) * (1 + det) , t) for n in chord for det in (-0.006, 0, 0.006))
    vib = 1 + 0.002 * np.sin(2 * np.pi * 5.5 * t)
    x = x * vib
    x = filt(x / (3 * len(chord)), "low", 3800)
    return x * env(len(t), a=0.35, d=0.2, s=0.85, r=0.6)


def crash():
    t = t_(2.6)
    x = filt(rng.standard_normal(len(t)), "high", 4500)
    return x * np.exp(-t * 1.6) * 0.35


def riser(d):
    t = t_(d)
    x = rng.standard_normal(len(t))
    out = np.zeros_like(x)
    seg = int(0.05 * SR)
    for i in range(0, len(x), seg):
        frac = i / len(x)
        lo = 400 + 6000 * frac ** 2
        out[i:i + seg] = filt(x[max(0, i - 2048):i + seg], "band", [lo, lo * 1.8])[-len(x[i:i + seg]):]
    return out * np.linspace(0, 1, len(t)) ** 2 * 0.4


def scratch():
    """Vinyl-scratch: een korte toon/ruis die heen en weer 'gescratcht' wordt."""
    src_t = t_(1.0)
    src = 0.6 * saw(220, src_t) + 0.4 * filt(rng.standard_normal(len(src_t)), "band", [500, 4000])
    src = filt(src, "band", [300, 5000])
    dur = 0.62
    t = t_(dur)
    # afspeelpositie: snel vooruit, terug, vooruit (handbeweging)
    pos = 0.18 * np.sin(2 * np.pi * t / dur * 1.5) ** 2 + 0.05 * t
    idx = np.clip((pos * SR).astype(int), 0, len(src) - 1)
    speed = np.abs(np.gradient(pos)) * SR
    x = src[idx] * np.clip(speed / 0.5, 0, 1.2)
    return np.tanh(2 * x) * 0.8 * env(len(t), a=0.005, d=0.1, s=1, r=0.08)


def crackle(d):
    n = int(d * SR)
    x = np.zeros(n)
    pops = rng.integers(0, n, int(d * 14))
    x[pops] = rng.uniform(-1, 1, len(pops))
    return filt(x, "band", [1500, 8000]) * 0.5 + filt(rng.standard_normal(n), "band", [200, 2000]) * 0.004


# ---------- harmonie ----------
# A-dorisch disco-vamp: Am9 | D9 | Fmaj7 | E7sus (per maat, 2 s)
AKKOORDEN = [
    [57, 60, 64, 67, 71],   # Am9
    [62, 66, 69, 72, 76],   # D9
    [53, 57, 60, 64, 67],   # Fmaj9
    [52, 57, 59, 62, 64],   # E7sus4
]
BAS_GROND = [33, 38, 29, 28]     # A1, D2, F1, E1
# funky octaafbas per maat (8 achtsten): (offset in halve tonen, octaaf-sprong)
BAS_RITME = [0, 12, 0, 12, 0, 12, 10, 12]


def arrangement():
    n = int(DUUR * SR)
    drums, bas, harm, fx = (np.zeros(n) for _ in range(4))
    K, CL, HC, HO, SH = kick(), clap(), hat(), hat(True), shaker()

    def sectie(t):
        if t < 0.6:
            return "scratch"
        if t < 4:
            return "intro"
        if t < 32:
            return "groove"
        if t < 36:
            return "break"
        if t < 37:
            return "riser"
        if t < 46:
            return "climax"
        return "einde"

    nb = int(DUUR / BEAT)
    for b in range(nb):
        t = b * BEAT
        s = sectie(t)
        maat = int(t // BAR)
        akk = AKKOORDEN[maat % 4]
        grond = BAS_GROND[maat % 4]
        if s in ("intro", "groove", "climax"):
            place(drums, K, t, 1.0)
            place(drums, HO, t + BEAT / 2, 0.8 if s != "intro" else 0.5)
            for q in range(4):
                place(drums, SH, t + q * BEAT / 4, 1.0 if q % 2 else 0.6)
            if b % 2 == 1 and s != "intro":
                place(drums, CL, t, 0.9)
            if s != "intro" or t >= 2:
                # bas: twee achtsten per tel
                for e in range(2):
                    stap = (b % 4) * 2 + e
                    off = BAS_RITME[stap]
                    place(bas, bass_note(grond + off, BEAT / 2 * 0.85), t + e * BEAT / 2, 0.55)
            if s in ("groove", "climax"):
                # stabs op de "en" van tel 2 en 4, keys op de 1
                if b % 2 == 1:
                    place(harm, stab(akk), t + BEAT / 2, 0.55)
                if b % 4 == 0:
                    place(harm, keys(akk, BAR), t, 0.35)
        elif s == "break":
            if b % 4 == 0:
                place(harm, strings(akk, BAR * 1.0), t, 0.5)
                place(harm, keys(akk, BAR), t, 0.3)
            place(drums, SH, t + BEAT / 2, 0.8)
            for e in range(2):
                stap = (b % 4) * 2 + e
                place(bas, bass_note(grond + BAS_RITME[stap], BEAT / 2 * 0.8), t + e * BEAT / 2, 0.4)
        elif s == "einde":
            pass

    # strijkers boven de climax (Blanche & Cécile) en de finale
    for m in range(int(37 // BAR), int(46 // BAR) + 1):
        t = max(37.0, m * BAR)
        if t < 46:
            place(harm, strings([n + 12 for n in AKKOORDEN[m % 4][1:4]], min(BAR, 46 - t) + 0.4), t, 0.45)

    # effecten
    place(fx, scratch(), 0.0, 1.0)
    place(fx, crackle(4.5), 0.0, 1.0)
    place(fx, riser(3.0), 34.0, 1.0)
    for tc in (4.0, 37.0):
        place(fx, crash(), tc, 1.0)
    # slotakkoord
    place(harm, strings([57, 64, 69, 72, 76], 1.0), 46.0, 0.6)
    place(drums, K, 46.0, 1.0)
    place(fx, crash(), 46.0, 0.8)

    # zachte zijketen: bas en harmonie ademen mee met de kick
    pump = np.ones(n)
    for b in range(nb):
        t = b * BEAT
        if sectie(t) in ("intro", "groove", "climax"):
            i = int(t * SR)
            L = int(0.18 * SR)
            pump[i:i + L] = np.minimum(pump[i:i + L], 0.55 + 0.45 * np.linspace(0, 1, len(pump[i:i + L])) ** 0.7)
    mix = 0.9 * drums + 0.85 * bas * pump + 0.7 * harm * pump + 0.8 * fx

    # stereo: harmonie licht breed, hats licht rechts
    left = mix + 0.08 * np.roll(harm, 300)
    right = mix + 0.08 * np.roll(harm, -300)
    st = np.stack([left, right], 1)
    # zachte master: warme lowshelf-achtige kleur + limiter
    st = np.tanh(st / (np.max(np.abs(st)) + 1e-9) * 1.3) * 0.89
    fade = int(0.8 * SR)
    st[-fade:] *= np.linspace(1, 0, fade)[:, None]
    return st


# ---------- losse geluidseffecten voor de interface ----------
def sfx():
    out = {}
    t = t_(0.06)
    out["tik"] = np.sin(2 * np.pi * 2100 * t) * np.exp(-t * 110) * 0.7 + filt(rng.standard_normal(len(t)), "high", 3000) * np.exp(-t * 300) * 0.3
    t = t_(0.16)
    out["piep"] = np.sin(2 * np.pi * 1760 * t) * env(len(t), a=0.003, d=0.02, s=0.8, r=0.05) * 0.5
    t = t_(0.7)
    chime = sum(np.sin(2 * np.pi * note(n) * t) * np.exp(-t * 5) for n in (76, 83, 88))
    out["bevestig"] = chime / 3 * env(len(t), a=0.004, d=0.1, s=1, r=0.2) * 0.6
    t = t_(0.5)
    x = filt(rng.standard_normal(len(t)), "band", [800, 3500])
    out["whoosh"] = x * np.sin(np.pi * t / 0.5) ** 3 * 0.5
    t = t_(0.12)
    out["sluiter"] = filt(rng.standard_normal(len(t)), "band", [1500, 6000]) * np.exp(-t * 60) * 0.6
    t = t_(0.9)
    out["glitter"] = sum(np.sin(2 * np.pi * note(n) * t) * np.exp(-((t - k * 0.07) * 18).clip(0)) * (t >= k * 0.07) for k, n in enumerate((88, 91, 95, 100, 103))) / 5 * 0.4
    t = t_(0.35)
    out["typ"] = np.zeros(len(t))
    for k in range(4):
        place(out["typ"], np.sin(2 * np.pi * 3000 * t_(0.02)) * np.exp(-t_(0.02) * 300) * 0.4, k * 0.08)
    return out


def schrijf(pad, x):
    x = np.asarray(x)
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    wavfile.write(pad, SR, (np.clip(x, -1, 1) * 32767).astype(np.int16))


if __name__ == "__main__":
    uit = Path(sys.argv[1] if len(sys.argv) > 1 else "public/audio")
    uit.mkdir(parents=True, exist_ok=True)
    schrijf(uit / "muziek.wav", arrangement())
    for naam, x in sfx().items():
        schrijf(uit / f"sfx-{naam}.wav", x)
    print("klaar:", sorted(p.name for p in uit.iterdir()))
