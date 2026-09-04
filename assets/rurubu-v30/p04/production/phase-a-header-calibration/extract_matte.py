#!/usr/bin/env python3
"""Create an edge-aware RGBA cutout from the P04 violet-matte source."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


def fit_background(rgb: np.ndarray) -> tuple[np.ndarray, dict[str, object]]:
    height, width, _ = rgb.shape
    yy, xx = np.mgrid[0:height, 0:width]
    x = xx / max(width - 1, 1)
    y = yy / max(height - 1, 1)

    # The extraction matte is the only violet region by contract.
    matte = (
        (rgb[..., 0] >= 45)
        & (rgb[..., 0] <= 145)
        & (rgb[..., 1] <= 45)
        & (rgb[..., 2] >= 75)
        & (rgb[..., 2] <= 210)
        & (rgb[..., 2] >= rgb[..., 0] + 25)
    )
    sample = matte & ((xx % 6) == 0) & ((yy % 6) == 0)
    sx, sy = x[sample], y[sample]
    design = np.column_stack(
        [
            np.ones_like(sx),
            sx,
            sy,
            sx * sx,
            sy * sy,
            sx * sy,
            sx * sx * sx,
            sy * sy * sy,
            sx * sx * sy,
            sx * sy * sy,
        ]
    )
    full = np.stack(
        [
            np.ones_like(x),
            x,
            y,
            x * x,
            y * y,
            x * y,
            x * x * x,
            y * y * y,
            x * x * y,
            x * y * y,
        ],
        axis=-1,
    )
    background = np.empty_like(rgb, dtype=np.float32)
    for channel in range(3):
        coeffs, *_ = np.linalg.lstsq(design, rgb[..., channel][sample], rcond=None)
        background[..., channel] = np.tensordot(full, coeffs, axes=([-1], [0]))
    background = np.clip(background, 0, 255)

    residual = np.linalg.norm(rgb.astype(np.float32) - background, axis=2)[matte]
    stats = {
        "matte_pixels_for_fit": int(matte.sum()),
        "fit_residual_p50": round(float(np.percentile(residual, 50)), 3),
        "fit_residual_p95": round(float(np.percentile(residual, 95)), 3),
        "fit_residual_p99": round(float(np.percentile(residual, 99)), 3),
    }
    return background, stats


def smoothstep(value: np.ndarray, low: float, high: float) -> np.ndarray:
    t = np.clip((value - low) / (high - low), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def save_composite(rgba: Image.Image, color: tuple[int, int, int], path: Path) -> None:
    backdrop = Image.new("RGBA", rgba.size, (*color, 255))
    backdrop.alpha_composite(rgba)
    backdrop.convert("RGB").save(path, quality=96)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    qa_dir = args.output_dir / "qa"
    qa_dir.mkdir(parents=True, exist_ok=True)

    source_image = Image.open(args.source).convert("RGB")
    rgb = np.asarray(source_image, dtype=np.float32)
    background, fit_stats = fit_background(rgb)
    distance = np.linalg.norm(rgb - background, axis=2)

    low = max(12.0, fit_stats["fit_residual_p99"] + 3.0)
    high = 105.0
    alpha_float = smoothstep(distance, low, high)
    alpha = np.round(alpha_float * 255.0).astype(np.uint8)

    # Undo matte premultiplication on transitional pixels. This removes violet
    # edge contamination without blurring opaque lettering or printed details.
    corrected = rgb.copy()
    transition = (alpha_float > 0.02) & (alpha_float < 0.995)
    a = alpha_float[transition, None]
    corrected[transition] = (rgb[transition] - (1.0 - a) * background[transition]) / a
    corrected = np.clip(corrected, 0, 255).astype(np.uint8)
    corrected[alpha == 0] = 0

    rgba_array = np.dstack([corrected, alpha])
    rgba = Image.fromarray(rgba_array, "RGBA")
    bbox = rgba.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("Extraction produced no foreground alpha")
    pad = 24
    crop_box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(rgba.width, bbox[2] + pad),
        min(rgba.height, bbox[3] + pad),
    )
    rgba = rgba.crop(crop_box)

    output = args.output_dir / "P04_HEADER_ECOLOGY_V30_ALIGNED.png"
    rgba.save(output, optimize=True)

    alpha_out = np.asarray(rgba.getchannel("A"))
    Image.fromarray(alpha_out, "L").save(qa_dir / "alpha-mask.png")
    save_composite(rgba, (250, 248, 241), qa_dir / "composite-light.png")
    save_composite(rgba, (128, 128, 128), qa_dir / "composite-gray.png")
    save_composite(rgba, (10, 18, 42), qa_dir / "composite-dark.png")

    thumb_width = 530
    thumb_height = round(rgba.height * thumb_width / rgba.width)
    thumb = rgba.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
    a5 = Image.new("RGBA", (559, 794), (250, 248, 241, 255))
    a5.alpha_composite(thumb, ((559 - thumb_width) // 2, 12))
    a5.convert("RGB").save(qa_dir / "a5-placement-preview.png", quality=96)

    unique_alpha = np.unique(alpha_out)
    interior = alpha_out >= 250
    diagnostics = {
        "source": str(args.source),
        "source_mode": source_image.mode,
        "source_dimensions": list(source_image.size),
        "matte_nominal_hex": "#6C00A8",
        "matte_model": "violet-only pixel selection + cubic 2D background-field fit",
        "cutout": {
            "distance_low": round(float(low), 3),
            "distance_high": high,
            "decontamination": "inverse matte compositing on partial-alpha pixels",
            "crop_box": list(crop_box),
        },
        "output": str(output),
        "output_mode": rgba.mode,
        "output_dimensions": list(rgba.size),
        "sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "alpha": {
            "min": int(alpha_out.min()),
            "max": int(alpha_out.max()),
            "unique_count": int(unique_alpha.size),
            "transparent_pixels": int((alpha_out == 0).sum()),
            "partial_pixels": int(((alpha_out > 0) & (alpha_out < 255)).sum()),
            "opaque_pixels": int((alpha_out == 255).sum()),
            "opaque_or_near_opaque_pixels": int(interior.sum()),
            "corner_values": [
                int(alpha_out[0, 0]),
                int(alpha_out[0, -1]),
                int(alpha_out[-1, 0]),
                int(alpha_out[-1, -1]),
            ],
        },
        "background_fit": fit_stats,
    }
    (args.output_dir / "alpha-diagnostics.json").write_text(
        json.dumps(diagnostics, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    contact = Image.new("RGB", (rgba.width, rgba.height * 3), "white")
    for index, name in enumerate(("composite-light.png", "composite-gray.png", "composite-dark.png")):
        panel = Image.open(qa_dir / name).convert("RGB")
        contact.paste(panel, (0, index * rgba.height))
    draw = ImageDraw.Draw(contact)
    draw.text((12, 10), "LIGHT", fill=(0, 0, 0))
    draw.text((12, rgba.height + 10), "GRAY", fill=(255, 255, 255))
    draw.text((12, rgba.height * 2 + 10), "DARK", fill=(255, 255, 255))
    contact.save(qa_dir / "composite-contact-sheet.jpg", quality=94)
    print(json.dumps(diagnostics, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
