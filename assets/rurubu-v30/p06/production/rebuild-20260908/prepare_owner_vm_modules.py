#!/usr/bin/env python3
"""Prepare lossless P06 owner-Visual-Master module crops.

This script intentionally does NOT resize, JPEG-convert, alpha-key, or otherwise
reinterpret the artwork. It only verifies the canonical owner PNG and crops
original pixels into page-level editorial regions. Alpha/material processing is
a separate QA-gated step.
"""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path
from PIL import Image

EXPECTED_SHA256 = "13bed2e07d66803d67cd6a117a57bc67dbdd9677b9ba54f4b9dd634910747103"
EXPECTED_SIZE = (1055, 1491)

REGIONS = {
    "P06_HEADER_ECOLOGY_OWNER_VM_SOURCE.png": (0, 0, 720, 340),
    "P06_INTRO_BUBBLE_ECOLOGY_OWNER_VM_SOURCE.png": (680, 20, 1055, 310),
    "P06_Q5_EDITORIAL_ECOLOGY_OWNER_VM_SOURCE.png": (600, 300, 1055, 815),
    "P06_MAIN_CAPTION_ECOLOGY_OWNER_VM_SOURCE.png": (30, 680, 370, 820),
    "P06_FOOD_CAPTION_ECOLOGY_OWNER_VM_SOURCE.png": (30, 1040, 390, 1175),
    "P06_PETS_CAPTION_ECOLOGY_OWNER_VM_SOURCE.png": (380, 1040, 720, 1175),
    "P06_TRAVEL_CAPTION_ECOLOGY_OWNER_VM_SOURCE.png": (690, 1040, 1055, 1185),
    "P06_Q6_BOTTOM_ECOLOGY_OWNER_VM_SOURCE.png": (0, 1140, 1055, 1491),
}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()

    if sha256(args.source) != EXPECTED_SHA256:
        raise SystemExit("Refusing non-canonical P06 owner source: SHA-256 mismatch")

    with Image.open(args.source) as im:
        if im.size != EXPECTED_SIZE or im.format != "PNG":
            raise SystemExit(f"Unexpected source metadata: size={im.size}, format={im.format}")
        rgba = im.convert("RGBA")
        args.output_dir.mkdir(parents=True, exist_ok=True)

        for name, box in REGIONS.items():
            crop = rgba.crop(box)
            # PNG is lossless. No resize/downsample is performed.
            crop.save(args.output_dir / name, format="PNG", compress_level=6, optimize=False)

    print(f"Prepared {len(REGIONS)} original-pixel PNG source crops in {args.output_dir}")


if __name__ == "__main__":
    main()
