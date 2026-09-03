#!/usr/bin/env python3
"""Extract the approved violet generation matte to true alpha.

The matte is intentionally outside the V30 ornament palette. Only violet pixels
connected to the canvas edge are removed, preserving enclosed light artwork.
"""

from collections import deque
from pathlib import Path
import sys

import numpy as np
from PIL import Image


def extract(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    pixels = np.asarray(image).copy()
    red = pixels[:, :, 0].astype(np.int16)
    green = pixels[:, :, 1].astype(np.int16)
    blue = pixels[:, :, 2].astype(np.int16)

    violet = (
        (red >= 65)
        & (blue >= 80)
        & (green <= 95)
        & (green * 2 < red + 25)
        & (green * 2 < blue + 25)
        & (np.abs(red - blue) <= 115)
    )

    height, width = violet.shape
    background = np.zeros((height, width), dtype=bool)
    queue: deque[tuple[int, int]] = deque()
    for x in range(width):
        queue.extend(((0, x), (height - 1, x)))
    for y in range(height):
        queue.extend(((y, 0), (y, width - 1)))

    while queue:
        y, x = queue.popleft()
        if background[y, x] or not violet[y, x]:
            continue
        background[y, x] = True
        if y:
            queue.append((y - 1, x))
        if y + 1 < height:
            queue.append((y + 1, x))
        if x:
            queue.append((y, x - 1))
        if x + 1 < width:
            queue.append((y, x + 1))

    pixels[:, :, 3] = np.where(background, 0, 255).astype(np.uint8)
    result = Image.fromarray(pixels, "RGBA")
    bbox = result.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        pad = 12
        result = result.crop(
            (max(0, left - pad), max(0, top - pad), min(width, right + pad), min(height, bottom + pad))
        )
    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract-violet-matte-alpha.py SOURCE DESTINATION")
    extract(Path(sys.argv[1]), Path(sys.argv[2]))
