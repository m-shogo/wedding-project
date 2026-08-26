#!/usr/bin/env python3
"""Create a deterministic dotLottie v1 ZIP from explicit source mappings.

This proves package construction only. It does not prove DaVinci Resolve can import,
render, trim, preserve alpha, or expose internal animation controls.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import pathlib
import zipfile

FIXED_TIMESTAMP = (1980, 1, 1, 0, 0, 0)


def parse_mapping(raw: str) -> tuple[pathlib.Path, str]:
    if "=" not in raw:
        raise argparse.ArgumentTypeError("mapping must be SOURCE=ARCHIVE_PATH")
    source_raw, archive_path = raw.split("=", 1)
    source = pathlib.Path(source_raw).expanduser().resolve()
    if not source.is_file():
        raise argparse.ArgumentTypeError(f"source file missing: {source}")
    archive = pathlib.PurePosixPath(archive_path)
    if archive.is_absolute() or ".." in archive.parts or not archive.parts:
        raise argparse.ArgumentTypeError(f"unsafe archive path: {archive_path}")
    return source, archive.as_posix()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    parser.add_argument("--file", action="append", required=True, type=parse_mapping)
    parser.add_argument("--report")
    args = parser.parse_args()

    output = pathlib.Path(args.output).expanduser().resolve()
    if output.suffix.lower() != ".lottie":
        parser.error("--output must end in .lottie")
    output.parent.mkdir(parents=True, exist_ok=True)

    mappings: list[tuple[pathlib.Path, str]] = sorted(args.file, key=lambda item: item[1])
    archive_paths = [archive_path for _, archive_path in mappings]
    if len(archive_paths) != len(set(archive_paths)):
        parser.error("duplicate archive path")
    if "manifest.json" not in archive_paths:
        parser.error("dotLottie v1 package requires root manifest.json")
    if not any(path.startswith("animations/") and path.endswith(".json") for path in archive_paths):
        parser.error("dotLottie v1 package requires at least one animations/*.json entry")

    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for source, archive_path in mappings:
            info = zipfile.ZipInfo(archive_path, FIXED_TIMESTAMP)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            info.create_system = 3
            archive.writestr(info, source.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)

    with zipfile.ZipFile(output, "r") as archive:
        names = archive.namelist()
        if names != archive_paths:
            raise SystemExit(f"archive entry mismatch: expected={archive_paths} actual={names}")
        if any(pathlib.PurePosixPath(name).is_absolute() or ".." in pathlib.PurePosixPath(name).parts for name in names):
            raise SystemExit("unsafe path found after archive creation")

        manifest = json.loads(archive.read("manifest.json").decode("utf-8"))
        if manifest.get("version") != "1":
            raise SystemExit("neutral canary intentionally requires dotLottie manifest version 1")
        animation_ids = [item.get("id") for item in manifest.get("animations", [])]
        expected_animation_paths = {f"animations/{animation_id}.json" for animation_id in animation_ids if animation_id}
        if not expected_animation_paths or not expected_animation_paths.issubset(set(names)):
            raise SystemExit(
                f"manifest animation IDs do not resolve to archive entries: ids={animation_ids} names={names}"
            )

        report = {
            "schemaVersion": "deterministic-dotlottie-pack-report/v1",
            "output": str(output),
            "dotLottieSpecVersion": "1",
            "fixedTimestamp": "1980-01-01T00:00:00",
            "entries": [
                {
                    "path": info.filename,
                    "byteLength": info.file_size,
                    "compressedByteLength": info.compress_size,
                    "dateTime": list(info.date_time),
                    "sha256": sha256_bytes(archive.read(info.filename)),
                }
                for info in archive.infolist()
            ],
        }

    if args.report:
        report_path = pathlib.Path(args.report).expanduser().resolve()
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    else:
        print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
