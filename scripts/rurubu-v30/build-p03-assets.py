#!/usr/bin/env python3
"""Build deterministic P03 display and ornament assets.

The script keeps copy exact, paper interiors opaque, and floating canvases truly
transparent. High-saliency illustrated assets are generated separately.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[2]
PAGE = ROOT / "assets/rurubu-v30/p03/production"
DISPLAY = PAGE / "display/final"
ORNAMENT = PAGE / "ornaments/final"
FONT_REGULAR = Path("/Users/m-shogo/Library/Fonts/ZenMaruGothic-Regular.ttf")
FONT_BOLD = Path("/Users/m-shogo/Library/Fonts/ZenMaruGothic-Bold.ttf")
FONT_BLACK = Path("/Users/m-shogo/Library/Fonts/ZenMaruGothic-Black.ttf")

BLUE = "#087BE6"
NAVY = "#0B376A"
PINK = "#F31A78"
YELLOW = "#FFC718"
GREEN = "#69B91E"
CREAM = "#FFF9EA"
PAPER = "#FFFDF4"
INK = "#34291F"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def save_trimmed(image: Image.Image, path: Path, pad: int = 20) -> None:
    bbox = image.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        image = image.crop(
            (
                max(0, left - pad),
                max(0, top - pad),
                min(image.width, right + pad),
                min(image.height, bottom + pad),
            )
        )
    image = ImageOps.expand(image, border=pad, fill=(0, 0, 0, 0))
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, optimize=True)


def heart_points(cx: float, cy: float, size: float) -> list[tuple[float, float]]:
    points = []
    for i in range(181):
        t = math.pi * 2 * i / 180
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        points.append((cx + x * size / 34, cy - y * size / 34))
    return points


def star_points(cx: float, cy: float, r1: float, r2: float, count: int = 4) -> list[tuple[float, float]]:
    points = []
    for i in range(count * 2):
        angle = -math.pi / 2 + i * math.pi / count
        radius = r1 if i % 2 == 0 else r2
        points.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    return points


def dotted_curve(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]], color: str, radius: int = 5) -> None:
    for p0, p1 in zip(points, points[1:]):
        dx, dy = p1[0] - p0[0], p1[1] - p0[1]
        length = max(1, int(math.hypot(dx, dy)))
        for distance in range(0, length, 24):
            t = distance / length
            x, y = p0[0] + dx * t, p0[1] + dy * t
            draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)


def paper_grain(image: Image.Image, bbox: tuple[int, int, int, int], seed: int, opacity: int = 14) -> None:
    rng = random.Random(seed)
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    left, top, right, bottom = bbox
    for _ in range((right - left) * (bottom - top) // 80):
        x, y = rng.randrange(left, right), rng.randrange(top, bottom)
        value = rng.choice([(92, 68, 34, opacity), (255, 255, 255, opacity)])
        draw.point((x, y), fill=value)
    image.alpha_composite(overlay)


def build_background() -> None:
    rng = random.Random(303)
    image = Image.new("RGB", (1118, 1588), "#FFF9EC")
    pix = image.load()
    for y in range(image.height):
        for x in range(image.width):
            n = rng.randint(-3, 3)
            pix[x, y] = (max(0, min(255, 255 + n)), max(0, min(255, 249 + n)), max(0, min(255, 236 + n)))
    image.save(PAGE / "V30_P03_BG_WARM_PAPER.png", optimize=True)


def build_ribbon() -> None:
    image = Image.new("RGBA", (1100, 320), (0, 0, 0, 0))
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    ds = ImageDraw.Draw(shadow)
    body = [(95, 80), (920, 62), (1005, 125), (942, 170), (1015, 250), (820, 235), (118, 252), (42, 177)]
    ds.polygon([(x + 15, y + 19) for x, y in body], fill=(20, 48, 89, 60))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    image.alpha_composite(shadow)
    draw = ImageDraw.Draw(image)
    draw.polygon(body, fill=CREAM, outline=PINK, width=12)
    draw.polygon([(920, 62), (1018, 22), (992, 115)], fill="#FFD5E6", outline=PINK, width=9)
    draw.polygon([(942, 170), (1065, 222), (1005, 250)], fill="#FFD5E6", outline=PINK, width=9)
    paper_grain(image, (60, 60, 1020, 255), 41, 10)
    label = "ふたりのこれまで♡"
    f = font(FONT_BOLD, 76)
    box = draw.textbbox((0, 0), label, font=f, stroke_width=1)
    x = (image.width - (box[2] - box[0])) // 2 - 15
    draw.text((x, 103), label, font=f, fill=PINK, stroke_width=2, stroke_fill="#FFFFFF")
    save_trimmed(image, DISPLAY / "V30_P03_HEADER_RIBBON.png")


def build_step_label(index: int, title: str, color: str) -> None:
    image = Image.new("RGBA", (760, 230), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    jitter = {1: (88, 112), 2: (100, 108), 3: (90, 116), 4: (104, 111), 5: (92, 108)}[index]
    draw.polygon(heart_points(jitter[0], jitter[1], 138), fill=color, outline="#FFFFFF", width=10)
    draw.text((jitter[0] - 22, jitter[1] - 66), str(index), font=font(FONT_BLACK, 70), fill="#FFFFFF", stroke_width=2, stroke_fill=color)
    x = 178 + (index % 2) * 8
    draw.text((x, 58), title, font=font(FONT_BLACK, 72), fill=color, stroke_width=3, stroke_fill="#FFFFFF")
    if index == 1:
        draw.ellipse((610, 74, 653, 117), fill="#FFFDF4", outline=YELLOW, width=5)
        draw.ellipse((627, 52, 670, 95), fill="#FFFDF4", outline=YELLOW, width=5)
        draw.ellipse((644, 74, 687, 117), fill="#FFFDF4", outline=YELLOW, width=5)
        draw.ellipse((627, 92, 670, 135), fill="#FFFDF4", outline=YELLOW, width=5)
        draw.ellipse((642, 88, 656, 102), fill=YELLOW)
    elif index == 2:
        draw.polygon(heart_points(650, 103, 58), fill=PINK)
        draw.arc((620, 40, 700, 155), 210, 340, fill=PINK, width=5)
    elif index == 3:
        draw.ellipse((620, 58, 690, 128), fill=PINK, outline="#FFFFFF", width=5)
        draw.ellipse((648, 35, 690, 78), fill="#FF8EBF")
        draw.ellipse((650, 105, 692, 147), fill="#FF8EBF")
        draw.ellipse((675, 68, 717, 110), fill="#FF8EBF")
        draw.ellipse((655, 75, 678, 98), fill=YELLOW)
    elif index == 4:
        draw.ellipse((623, 61, 688, 126), outline=YELLOW, width=12)
        draw.polygon([(646, 60), (656, 35), (669, 59)], fill="#BFEAFF", outline=BLUE)
        draw.polygon(star_points(706, 82, 22, 5), fill=YELLOW)
    else:
        draw.polygon(star_points(638, 82, 29, 7), fill=YELLOW)
        draw.polygon(heart_points(697, 116, 45), fill=PINK)
    save_trimmed(image, DISPLAY / f"V30_P03_TIMELINE_STEP_{index}_LABEL.png")


def torn_polygon(width: int, height: int, seed: int) -> list[tuple[int, int]]:
    rng = random.Random(seed)
    margin = 34
    pts = []
    for x in range(margin, width - margin + 1, 22):
        pts.append((x, margin + rng.randint(-7, 7)))
    for y in range(margin, height - margin + 1, 22):
        pts.append((width - margin + rng.randint(-7, 7), y))
    for x in range(width - margin, margin - 1, -22):
        pts.append((x, height - margin + rng.randint(-7, 7)))
    for y in range(height - margin, margin - 1, -22):
        pts.append((margin + rng.randint(-7, 7), y))
    return pts


def build_q_paper(q: str, accent: str, fill: str, width: int, height: int, seed: int) -> None:
    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    poly = torn_polygon(width, height, seed)
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).polygon([(x + 12, y + 18) for x, y in poly], fill=(25, 38, 55, 65))
    image.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(13)))
    draw = ImageDraw.Draw(image)
    draw.polygon(poly, fill=fill, outline="#E1CDA5", width=5)
    paper_grain(image, (36, 36, width - 36, height - 36), seed, 14)
    for x in range(88, width - 60, 82):
        draw.ellipse((x - 13, 20, x + 13, 46), fill=(0, 0, 0, 0), outline="#E0CCAA", width=4)
        draw.ellipse((x - 7, 25, x + 7, 39), fill=(0, 0, 0, 0))
    bubble = (62, 76, 220, 205) if q == "Q3" else (58, 78, 238, 215)
    draw.ellipse(bubble, fill="#FFFDFC", outline=accent, width=9)
    draw.polygon([(bubble[2] - 50, bubble[3] - 8), (bubble[2] - 20, bubble[3] + 30), (bubble[2] - 12, bubble[3] - 18)], fill="#FFFDFC", outline=accent)
    draw.text((bubble[0] + 29, bubble[1] + 15), q, font=font(FONT_BLACK, 74), fill=accent)
    draw.line((65, 255, width - 68, 255), fill="#CEB997", width=4)
    draw.line((65, 374, width - 68, 374), fill="#D6C3A1", width=3)
    draw.line((65, 500, width - 68, 500), fill="#D6C3A1", width=3)
    save_trimmed(image, DISPLAY / f"V30_P03_{q}_PAPER_DISPLAY.png")


def build_wedding_day_card() -> None:
    image = Image.new("RGBA", (700, 500), (0, 0, 0, 0))
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((55, 58, 645, 444), 26, fill=(20, 38, 55, 65))
    image.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(14)))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((38, 35, 625, 425), 25, fill="#F8E0A9", outline="#FFFFFF", width=14)
    draw.rounded_rectangle((58, 55, 605, 405), 20, outline="#9E7440", width=6)
    paper_grain(image, (40, 35, 625, 425), 87, 18)
    draw.text((130, 90), "Wedding Day", font=font(FONT_BOLD, 72), fill=INK)
    draw.polygon(heart_points(115, 295, 55), fill=PINK)
    draw.text((150, 232), "2026.10.24", font=font(FONT_BLACK, 82), fill=INK)
    draw.arc((28, 8, 120, 250), 90, 270, fill="#7E6854", width=12)
    draw.arc((45, 25, 135, 268), 90, 270, fill="#7E6854", width=7)
    save_trimmed(image, DISPLAY / "V30_P03_WEDDING_DAY_CARD.png")


def build_airplane_route() -> None:
    image = Image.new("RGBA", (680, 360), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    curve = [(45, 225), (120, 115), (240, 145), (300, 220), (390, 158), (475, 112)]
    dotted_curve(draw, curve, PINK, 5)
    draw.polygon(heart_points(270, 162, 50), outline=PINK)
    plane = [(442, 122), (548, 66), (579, 78), (525, 130), (610, 145), (596, 166), (502, 153), (462, 225), (441, 216), (461, 150), (402, 148)]
    draw.polygon(plane, fill=BLUE, outline="#FFFFFF", width=10)
    draw.line((442, 122, 579, 78), fill=NAVY, width=5)
    draw.polygon(star_points(360, 74, 34, 8), fill=YELLOW, outline="#FFFFFF")
    save_trimmed(image, ORNAMENT / "V30_P03_HEADER_AIRPLANE_HEART_ROUTE.png")


def build_timeline_route() -> None:
    image = Image.new("RGBA", (260, 1100), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    route = [(165, 20), (80, 130), (125, 285), (55, 430), (112, 585), (48, 755), (126, 930), (82, 1060)]
    dotted_curve(draw, route, "#F3AE16", 7)
    for x, y in [route[1], route[3], route[5], route[7]]:
        draw.line((x - 18, y - 20, x, y, x + 10, y - 25), fill="#F3AE16", width=6)
    save_trimmed(image, ORNAMENT / "V30_P03_CONTINUOUS_TIMELINE_ROUTE.png", 10)


def build_tape() -> None:
    image = Image.new("RGBA", (500, 180), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    poly = [(32, 30), (460, 22), (478, 142), (18, 155)]
    draw.polygon(poly, fill="#F49AC0")
    for y in range(50, 145, 38):
        for x in range(50 + ((y // 38) % 2) * 20, 460, 42):
            draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill="#FFE4F0")
    save_trimmed(image, ORNAMENT / "V30_P03_HERO_PINK_TAPE.png")


def build_micro_ornaments() -> None:
    # Palm
    palm = Image.new("RGBA", (320, 440), (0, 0, 0, 0))
    d = ImageDraw.Draw(palm)
    d.line((170, 380, 150, 180), fill="#8B572A", width=22)
    for angle in [-150, -120, -90, -60, -30, 10]:
        rad = math.radians(angle)
        end = (150 + math.cos(rad) * 120, 180 + math.sin(rad) * 105)
        d.line((150, 180, end[0], end[1]), fill=GREEN, width=26)
        d.line((150, 180, end[0], end[1]), fill="#23884D", width=8)
    d.ellipse((125, 155, 178, 208), fill=YELLOW, outline="#FFFFFF", width=8)
    save_trimmed(palm, ORNAMENT / "V30_P03_STEP2_PALM.png")

    camera = Image.new("RGBA", (420, 300), (0, 0, 0, 0))
    d = ImageDraw.Draw(camera)
    d.rounded_rectangle((45, 75, 370, 250), 34, fill="#6F4A2E", outline="#FFFFFF", width=12)
    d.rectangle((105, 40, 210, 90), fill="#8C6038", outline="#FFFFFF", width=9)
    d.ellipse((135, 95, 295, 255), fill="#FFF9E8", outline="#3A2A20", width=14)
    d.ellipse((173, 133, 257, 217), fill=BLUE, outline=NAVY, width=10)
    d.polygon(star_points(338, 52, 30, 7), fill=YELLOW)
    save_trimmed(camera, ORNAMENT / "V30_P03_STEP3_CAMERA.png")

    ring = Image.new("RGBA", (340, 280), (0, 0, 0, 0))
    d = ImageDraw.Draw(ring)
    d.ellipse((55, 80, 240, 250), outline="#D99A12", width=28)
    d.polygon([(124, 82), (155, 20), (190, 82), (160, 118)], fill="#BFEAFF", outline=BLUE)
    d.polygon(star_points(275, 80, 34, 8), fill=YELLOW)
    save_trimmed(ring, ORNAMENT / "V30_P03_STEP4_RING.png")

    for name, color, petals in [("HERO_LOWER_PLUMERIA", "#FFFFFF", 5), ("Q3_FLORAL_ACCENT", PINK, 6), ("Q4_FLORAL_ACCENT", "#F21B77", 5)]:
        flower = Image.new("RGBA", (360, 320), (0, 0, 0, 0))
        d = ImageDraw.Draw(flower)
        for i in range(petals):
            a = math.pi * 2 * i / petals
            cx, cy = 175 + math.cos(a) * 62, 155 + math.sin(a) * 62
            d.ellipse((cx - 65, cy - 42, cx + 65, cy + 42), fill=color, outline="#FFFFFF", width=9)
        d.ellipse((142, 122, 208, 188), fill=YELLOW, outline="#FFFFFF", width=5)
        d.polygon([(75, 240), (20, 278), (96, 292), (135, 245)], fill="#2E9A51", outline="#FFFFFF")
        d.polygon([(245, 225), (330, 250), (270, 300), (215, 256)], fill="#65B63D", outline="#FFFFFF")
        save_trimmed(flower, ORNAMENT / f"V30_P03_{name}.png")


def main() -> None:
    DISPLAY.mkdir(parents=True, exist_ok=True)
    ORNAMENT.mkdir(parents=True, exist_ok=True)
    build_background()
    build_ribbon()
    for index, title, color in [
        (1, "出会い", PINK),
        (2, "デート", BLUE),
        (3, "旅", "#F0AE00"),
        (4, "プロポーズ", GREEN),
        (5, "今日", PINK),
    ]:
        build_step_label(index, title, color)
    build_q_paper("Q3", PINK, "#FFF2BA", 720, 650, 303)
    build_q_paper("Q4", BLUE, "#FFF8E9", 760, 720, 404)
    build_wedding_day_card()
    build_airplane_route()
    build_timeline_route()
    build_tape()
    build_micro_ornaments()


if __name__ == "__main__":
    main()
