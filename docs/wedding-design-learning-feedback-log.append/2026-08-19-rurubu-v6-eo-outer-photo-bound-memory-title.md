# Rurubu V6 EO — Outer photo-bound memory-title experiment

Date: 2026-08-19

Visible problem: Outer EE back cover still contained a full-width navy `みんなとの思い出` strip that visually separated the dominant photo from the chronology like a web section header.

Root-cause hypothesis: the strip was solving contrast, but on this specific back-cover photo the lower field already had enough darkness to carry a native heading directly.

Bounded tests:
- Q&A direct-text study `1778:2`: REJECTED — contrast too weak on busy/bright photo.
- Q&A split-support study `1779:2`: REJECTED — two small supports increased card/module reading.
- Outer EO `1780:2`: ADOPTED — hide memory strip, move native heading onto the photo, shift chronology title/rule upward.

Expected improvement: stronger photo→heading→chronology continuity, less UI-like containment.

Regression risk: direct photo text can fail readability when the underlying image does not provide a stable dark/quiet zone.

Evidence:
- whole spread 1400px PASS;
- back actual size 794×1123 PASS;
- text collision 0;
- 18px safe-area risk 0;
- photos/hash/crop unchanged;
- EE retained hidden rollback;
- Drive root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

What remains Rurubu-specific: photo choice, wording, palette, chronology structure and exact typography/coordinates.

Next application: continue auditing full-width bands/containers only where their function is ambiguous; do not generalize subtraction without contrast/binding evidence.
