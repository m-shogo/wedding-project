#!/usr/bin/env python3
"""Validate the Rurubu asset evidence ledger using only Python stdlib.

Usage:
    python3 tools/validate_rurubu_asset_ledger.py
    python3 tools/validate_rurubu_asset_ledger.py path/to/ledger.json

The validator intentionally permits incomplete work. It fails only when counts or
completion claims contradict the role-level evidence. Quality risks on incomplete
roles are emitted as warnings.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


DRIVE_VERIFIED_STATES = {
    "MASTER_DRIVE_READBACK_VERIFIED",
    "DRIVE_READBACK_VERIFIED",
    "FIGMA_DERIVATIVE_CREATED",
    "DERIVATIVE_QA_PASS",
    "FIGMA_APPLIED",
    "SOURCE_NODE_HASH_VERIFIED",
    "SCREENSHOT_QA_PASS",
    "STRUCTURE_QA_PASS",
    "GIT_RECORDED",
    "ROLE_COMPLETE",
}

APPLIED_STATES = {
    "FIGMA_APPLIED",
    "SOURCE_NODE_HASH_VERIFIED",
    "SCREENSHOT_QA_PASS",
    "STRUCTURE_QA_PASS",
    "GIT_RECORDED",
    "ROLE_COMPLETE",
}

PASS_QUALITY_STATES = {"PHOTO_ROLE_PASS", "PASS"}
DOMINANT_PURPOSES = {"cover hero", "back-cover main image", "history lead image"}


def _duplicate_values(roles: list[dict], field: str) -> list[str]:
    values = [str(role[field]) for role in roles if role.get(field)]
    seen: set[str] = set()
    duplicates: set[str] = set()
    for value in values:
        if value in seen:
            duplicates.add(value)
        seen.add(value)
    return sorted(duplicates)


def validate(data: dict) -> tuple[list[str], list[str], dict[str, int]]:
    errors: list[str] = []
    warnings: list[str] = []

    roles = data.get("roles")
    if not isinstance(roles, list):
        errors.append("roles must be an array")
        roles = []

    for field in ("role_id", "semantic_role", "drive_file_id", "target_node_id"):
        duplicates = _duplicate_values(roles, field)
        if duplicates:
            errors.append(f"duplicate {field}: {', '.join(duplicates)}")

    derived_counts = {
        "total_roles": len(roles),
        "drive_readback_verified": sum(
            role.get("asset_state") in DRIVE_VERIFIED_STATES for role in roles
        ),
        "intended_source_applied": sum(
            role.get("asset_state") in APPLIED_STATES for role in roles
        ),
        "photo_role_pass": sum(
            role.get("quality_state") in PASS_QUALITY_STATES for role in roles
        ),
        "role_complete": sum(bool(role.get("role_complete")) for role in roles),
    }

    counts = data.get("counts", {})
    for field, derived in derived_counts.items():
        recorded = counts.get(field)
        if recorded != derived:
            errors.append(f"counts.{field}={recorded!r}, derived={derived}")

    for role in roles:
        role_id = str(role.get("role_id", "<unknown>"))

        if role.get("role_complete"):
            required = ("drive_file_id", "target_node_id", "figma_image_hash")
            missing = [field for field in required if not role.get(field)]
            if missing:
                errors.append(
                    f"{role_id}: role_complete=true but missing {', '.join(missing)}"
                )

            if role.get("quality_state") not in PASS_QUALITY_STATES:
                errors.append(f"{role_id}: complete without photo-role quality pass")

            if role.get("screenshot_qa") != "PASS":
                errors.append(f"{role_id}: complete without screenshot QA PASS")

            if role.get("structure_qa") not in {"PASS", "PASS_NODE_PRESERVED"}:
                errors.append(f"{role_id}: complete without structure QA PASS")

        if role.get("asset_state") in APPLIED_STATES:
            if not role.get("figma_image_hash"):
                errors.append(f"{role_id}: applied without figma_image_hash")

            if "derivative_px" not in role:
                warnings.append(
                    f"{role_id}: applied but derivative_px is not recorded"
                )

            derivative_bytes = role.get("imported_derivative_bytes")
            if (
                role.get("purpose") in DOMINANT_PURPOSES
                and isinstance(derivative_bytes, int)
                and derivative_bytes < 20_000
            ):
                warnings.append(
                    f"{role_id}: dominant derivative under 20KB; review visible quality"
                )

        target = role.get("target_box_px") or {}
        minimum = role.get("dummy_derivative_min_px") or {}
        if target and minimum:
            if minimum.get("width", 0) < target.get("width", 0):
                errors.append(f"{role_id}: derivative minimum width below target width")
            if minimum.get("height", 0) < target.get("height", 0):
                errors.append(f"{role_id}: derivative minimum height below target height")

    return errors, warnings, derived_counts


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "ledger",
        nargs="?",
        default=(
            "01_paper-items/rurubu-wedding/"
            "RURUBU-V5-ASSET-EVIDENCE-LEDGER.json"
        ),
    )
    args = parser.parse_args()

    path = Path(args.ledger)
    data = json.loads(path.read_text(encoding="utf-8"))
    errors, warnings, derived_counts = validate(data)

    result = {
        "ledger": str(path),
        "errors": errors,
        "warnings": warnings,
        "derived_counts": derived_counts,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
