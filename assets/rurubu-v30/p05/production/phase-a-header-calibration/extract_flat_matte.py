#!/usr/bin/env python3
"""Normalize a generated violet field to a flat matte, then extract real RGBA."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


MATTE_RGB = np.array([108.0, 0.0, 168.0], dtype=np.float32)


def smoothstep(value: np.ndarray, low: float, high: float) -> np.ndarray:
    t = np.clip((value - low) / (high - low), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def fit_generated_background(rgb: np.ndarray) -> tuple[np.ndarray, dict[str, object]]:
    """Fit the generator's violet field without treating artwork colors as matte."""
    height, width, _ = rgb.shape
    yy, xx = np.mgrid[0:height, 0:width]
    x = xx / max(width - 1, 1)
    y = yy / max(height - 1, 1)
    violet = (
        (rgb[..., 0] >= 35)
        & (rgb[..., 0] <= 160)
        & (rgb[..., 1] <= 55)
        & (rgb[..., 2] >= 70)
        & (rgb[..., 2] <= 225)
        & (rgb[..., 2] >= rgb[..., 0] + 24)
    )
    sample = violet & ((xx % 5) == 0) & ((yy % 5) == 0)
    if int(sample.sum()) < 500:
        raise RuntimeError("Not enough violet matte pixels for a reliable field fit")
    sx, sy = x[sample], y[sample]
    design = np.column_stack(
        [
            np.ones_like(sx), sx, sy, sx * sx, sy * sy, sx * sy,
            sx * sx * sx, sy * sy * sy, sx * sx * sy, sx * sy * sy,
        ]
    )
    full = np.stack(
        [
            np.ones_like(x), x, y, x * x, y * y, x * y,
            x * x * x, y * y * y, x * x * y, x * y * y,
        ],
        axis=-1,
    )
    background = np.empty_like(rgb, dtype=np.float32)
    for channel in range(3):
        coeffs, *_ = np.linalg.lstsq(design, rgb[..., channel][sample], rcond=None)
        background[..., channel] = np.tensordot(full, coeffs, axes=([-1], [0]))
    background = np.clip(background, 0, 255)
    residual = np.linalg.norm(rgb - background, axis=2)[violet]
    return background, {
        "violet_pixels": int(violet.sum()),
        "fit_residual_p50": round(float(np.percentile(residual, 50)), 3),
        "fit_residual_p95": round(float(np.percentile(residual, 95)), 3),
        "fit_residual_p99": round(float(np.percentile(residual, 99)), 3),
    }


def decontaminate(rgb: np.ndarray, background: np.ndarray, alpha_float: np.ndarray) -> np.ndarray:
    corrected = rgb.copy()
    transition = (alpha_float > 0.02) & (alpha_float < 0.995)
    a = alpha_float[transition, None]
    corrected[transition] = (rgb[transition] - (1.0 - a) * background[transition]) / a
    return np.clip(corrected, 0, 255)


def save_composite(rgba: Image.Image, color: tuple[int, int, int], path: Path) -> None:
    backdrop = Image.new("RGBA", rgba.size, (*color, 255))
    backdrop.alpha_composite(rgba)
    backdrop.convert("RGB").save(path, quality=96)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("asset_id")
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    qa_dir = args.output_dir / "qa"
    qa_dir.mkdir(parents=True, exist_ok=True)

    original = Image.open(args.source).convert("RGB")
    rgb = np.asarray(original, dtype=np.float32)

    # Pre-normalization: separate only the generated violet field, then composite
    # the protected foreground over an exact single-color extraction matte.
    generated_bg, fit_stats = fit_generated_background(rgb)
    first_distance = np.linalg.norm(rgb - generated_bg, axis=2)
    first_low = max(12.0, float(fit_stats["fit_residual_p99"]) + 3.0)
    first_alpha = smoothstep(first_distance, first_low, 105.0)
    first_alpha[first_alpha < 0.018] = 0.0
    first_alpha[:12, :] = 0.0
    first_alpha[-12:, :] = 0.0
    first_alpha[:, :12] = 0.0
    first_alpha[:, -12:] = 0.0
    first_rgb = decontaminate(rgb, generated_bg, first_alpha)
    flat_rgb = first_rgb * first_alpha[..., None] + MATTE_RGB * (1.0 - first_alpha[..., None])
    flat_rgb_u8 = np.clip(np.round(flat_rgb), 0, 255).astype(np.uint8)
    flat_source_path = args.output_dir / f"{args.asset_id}_SOURCE_MATTE.png"
    Image.fromarray(flat_rgb_u8, "RGB").save(flat_source_path, optimize=True)

    # Production extraction starts from the normalized exact flat matte.
    distance = np.linalg.norm(flat_rgb - MATTE_RGB, axis=2)
    matte_field = np.broadcast_to(MATTE_RGB, flat_rgb.shape)
    alpha_float = smoothstep(distance, 7.0, 105.0)

    # Remove violet spill/shadow left by the extraction matte. This hue guard is
    # intentionally narrow: it does not match the approved blue, navy, pink,
    # yellow, green or white artwork palette.
    provisional = decontaminate(flat_rgb, matte_field, alpha_float)
    pr, pg, pb = provisional[..., 0], provisional[..., 1], provisional[..., 2]
    violet_spill = (
        (pr >= 20.0) & (pr <= 180.0) & (pg <= 85.0)
        & (pb >= 70.0) & (pb >= pr + 18.0) & (pb >= pg + 55.0)
    )
    hue_strength = np.clip((pb - pr - 18.0) / 70.0, 0.0, 1.0)
    low_green_strength = np.clip((85.0 - pg) / 85.0, 0.0, 1.0)
    spill_strength = hue_strength * low_green_strength * violet_spill
    alpha_float = alpha_float * (1.0 - spill_strength)
    alpha_float[violet_spill & (alpha_float < 0.98)] = 0.0
    alpha_float[alpha_float < 0.018] = 0.0
    # Generation contract requires generous matte margin, so the outer raster
    # border is guaranteed background and can be pinned to transparent. This
    # prevents field-fit noise from surviving at source corners.
    border = 12
    alpha_float[:border, :] = 0.0
    alpha_float[-border:, :] = 0.0
    alpha_float[:, :border] = 0.0
    alpha_float[:, -border:] = 0.0
    alpha = np.round(alpha_float * 255.0).astype(np.uint8)
    corrected = decontaminate(flat_rgb, matte_field, alpha_float).astype(np.uint8)
    # Any fully opaque generator shadow that still uses the extraction hue is
    # converted to the approved dark-navy outline/shadow language.
    opaque_violet_shadow = violet_spill & (alpha_float >= 0.98)
    corrected[opaque_violet_shadow] = np.array([8, 28, 82], dtype=np.uint8)
    # Re-evaluate the final recovered RGB, because quantization can leave a few
    # matte-coloured fringe pixels that were not violet in the provisional pass.
    # Only partial-alpha pixels are removed; opaque matches are normalized to the
    # approved navy so intentional outlines and interior artwork stay present.
    cr, cg, cb = corrected[..., 0], corrected[..., 1], corrected[..., 2]
    final_violet = (
        (cr >= 20) & (cr <= 180) & (cg <= 85)
        & (cb >= 70) & (cb >= cr + 18) & (cb >= cg + 55)
    )
    final_violet_edge = final_violet & (alpha < 250)
    final_violet_opaque = final_violet & (alpha >= 250)
    alpha[final_violet_edge] = 0
    corrected[final_violet_edge] = 0
    corrected[final_violet_opaque] = np.array([8, 28, 82], dtype=np.uint8)
    corrected[alpha == 0] = 0

    rgba_full = Image.fromarray(np.dstack([corrected, alpha]), "RGBA")
    bbox = rgba_full.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("Extraction produced no foreground alpha")
    pad = 24
    crop_box = (
        max(0, bbox[0] - pad), max(0, bbox[1] - pad),
        min(rgba_full.width, bbox[2] + pad), min(rgba_full.height, bbox[3] + pad),
    )
    rgba = rgba_full.crop(crop_box)
    output_path = args.output_dir / f"{args.asset_id}.png"
    rgba.save(output_path, optimize=True)

    alpha_out = np.asarray(rgba.getchannel("A"))
    Image.fromarray(alpha_out, "L").save(qa_dir / "alpha-mask.png")
    save_composite(rgba, (250, 248, 241), qa_dir / "composite-light.png")
    save_composite(rgba, (128, 128, 128), qa_dir / "composite-gray.png")
    save_composite(rgba, (10, 18, 42), qa_dir / "composite-dark.png")

    contact = Image.new("RGB", (rgba.width, rgba.height * 3), "white")
    labels = (("composite-light.png", "LIGHT", (0, 0, 0)), ("composite-gray.png", "GRAY", (255, 255, 255)), ("composite-dark.png", "DARK", (255, 255, 255)))
    draw = ImageDraw.Draw(contact)
    for index, (filename, label, color) in enumerate(labels):
        panel = Image.open(qa_dir / filename).convert("RGB")
        contact.paste(panel, (0, index * rgba.height))
        draw.text((12, index * rgba.height + 10), label, fill=color)
    contact.save(qa_dir / "composite-contact-sheet.jpg", quality=94)

    unique_alpha = np.unique(alpha_out)
    diagnostics = {
        "asset_id": args.asset_id,
        "input": str(args.source),
        "input_sha256": hashlib.sha256(args.source.read_bytes()).hexdigest(),
        "normalized_flat_matte": str(flat_source_path),
        "normalized_flat_matte_sha256": hashlib.sha256(flat_source_path.read_bytes()).hexdigest(),
        "matte_nominal_hex": "#6C00A8",
        "normalization": {
            "method": "violet-only cubic field fit, edge-aware foreground recovery, exact flat matte recomposite",
            "generated_field_fit": fit_stats,
            "first_distance_low": round(first_low, 3),
            "first_distance_high": 105.0,
        },
        "production_extraction": {
            "input": "normalized exact flat matte",
            "distance_low": 7.0,
            "distance_high": 105.0,
            "edge_rgb_treatment": "inverse flat-matte compositing plus narrow violet-spill suppression on partial-alpha pixels",
            "violet_spill_pixels_suppressed": int((spill_strength > 0).sum()),
            "violet_partial_pixels_removed": int((violet_spill & (alpha_float < 0.98)).sum()),
            "opaque_violet_shadow_pixels_recolored_navy": int(opaque_violet_shadow.sum()),
            "final_violet_edge_pixels_removed": int(final_violet_edge.sum()),
            "final_violet_opaque_pixels_recolored_navy": int(final_violet_opaque.sum()),
            "crop_box": list(crop_box),
        },
        "output": str(output_path),
        "output_sha256": hashlib.sha256(output_path.read_bytes()).hexdigest(),
        "output_mode": rgba.mode,
        "output_dimensions": list(rgba.size),
        "alpha": {
            "min": int(alpha_out.min()), "max": int(alpha_out.max()),
            "unique_count": int(unique_alpha.size),
            "transparent_pixels": int((alpha_out == 0).sum()),
            "partial_pixels": int(((alpha_out > 0) & (alpha_out < 255)).sum()),
            "opaque_pixels": int((alpha_out == 255).sum()),
            "opaque_or_near_opaque_pixels": int((alpha_out >= 250).sum()),
            "corner_values": [int(alpha_out[0, 0]), int(alpha_out[0, -1]), int(alpha_out[-1, 0]), int(alpha_out[-1, -1])],
        },
        "qa": {
            "light_gray_dark_contact": str(qa_dir / "composite-contact-sheet.jpg"),
            "alpha_mask": str(qa_dir / "alpha-mask.png"),
        },
    }
    diagnostics_path = args.output_dir / "alpha-diagnostics.json"
    diagnostics_path.write_text(json.dumps(diagnostics, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(diagnostics, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
