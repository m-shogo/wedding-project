#!/usr/bin/env python3
"""Remove a saturated green/blue background from an AI-generated asset.

This is a deterministic fallback for image generators that fail to produce
clean transparency. It is intended for isolated illustrations, stamps, icons,
ornaments, and similar print-design assets.

Requirements:
  python3 -m pip install pillow numpy

Examples:
  python3 scripts/remove-chroma-background.py input.png output.png
  python3 scripts/remove-chroma-background.py input.png output.png --key blue

For hair, glass, smoke, translucent fabric, or complex photography, use a
semantic background remover / alpha matting workflow instead.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


def remove_key(
    image: Image.Image,
    key: str = "green",
    feather: float = 0.8,
    despill: float = 0.9,
) -> Image.Image:
    rgb = np.asarray(image.convert("RGB")).astype(np.float32) / 255.0
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

    if key == "green":
        key_channel = g
        other = np.maximum(r, b)
        dominance = g - other
    elif key == "blue":
        key_channel = b
        other = np.maximum(r, g)
        dominance = b - other
    else:
        raise ValueError("key must be 'green' or 'blue'")

    # Saturated key backgrounds receive a high background probability.
    # A soft threshold preserves antialiased edges better than exact color
    # replacement or a single hard threshold.
    score = np.clip((dominance - 0.10) / 0.30, 0.0, 1.0)
    score *= np.clip((key_channel - 0.45) / 0.45, 0.0, 1.0)
    alpha = np.where(dominance < 0.04, 1.0, 1.0 - score**0.8)

    # Despill removes the colored halo from semitransparent edge pixels.
    excess = np.maximum(0.0, key_channel - other)
    strength = (1.0 - alpha) * despill

    if key == "green":
        g2 = np.clip(g - excess * strength, 0.0, 1.0)
        r2 = np.clip(r + excess * strength * 0.10, 0.0, 1.0)
        b2 = np.clip(b + excess * strength * 0.10, 0.0, 1.0)
        out_rgb = np.stack([r2, g2, b2], axis=-1)
    else:
        b2 = np.clip(b - excess * strength, 0.0, 1.0)
        r2 = np.clip(r + excess * strength * 0.10, 0.0, 1.0)
        g2 = np.clip(g + excess * strength * 0.10, 0.0, 1.0)
        out_rgb = np.stack([r2, g2, b2], axis=-1)

    alpha8 = (np.clip(alpha, 0.0, 1.0) * 255).astype(np.uint8)
    if feather > 0:
        alpha8 = np.asarray(
            Image.fromarray(alpha8, "L").filter(ImageFilter.GaussianBlur(feather))
        )

    rgb8 = (np.clip(out_rgb, 0.0, 1.0) * 255).astype(np.uint8)
    rgba = np.dstack([rgb8, alpha8])
    return Image.fromarray(rgba, "RGBA")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--key", choices=["green", "blue"], default="green")
    parser.add_argument("--feather", type=float, default=0.8)
    parser.add_argument("--despill", type=float, default=0.9)
    args = parser.parse_args()

    image = Image.open(args.input)
    result = remove_key(image, args.key, args.feather, args.despill)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.save(args.output, "PNG")


if __name__ == "__main__":
    main()
