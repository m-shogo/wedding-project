# RSL-171 — Advance an existing support photo to remove a false section break, but stop before contrast degrades

Source scope/item: Rurubu WEDDING / V6 Profile Q&A IP
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

IK Q&A right remained technically correct but briefly returned to a stacked `hero photo → cream Q02/Q03 band → lower photo` rhythm. The second photo arrived too late to sustain a continuous magazine page.

## Root-cause hypothesis

The issue was not insufficient imagery. A semantically legitimate support photo already existed, but its vertical start created too much separation from the hero. Advancing that same image and keeping the text bridge compact could improve continuity without generating another asset or adding containment.

## Principle / capability tested

Use photo-role timing as an editorial variable: when two real photo beats are separated by a shallow native-text bridge, test moving the downstream image earlier before creating a new module. Preserve a contrast stop: if moving copy onto the photo damages readability, keep the copy in a clean adjacent field instead of forcing an overlay.

## Exact bounded test

- rollback-safe duplicate IK `2084:2` → IP `2096:2`;
- support photo role kept the same hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- support photo moved from `y=610 / 545×255` to `y=552 / 555×300`;
- Q02/Q03 bridge moved slightly upward;
- first Q04 full-photo overlay variant was visually rejected because the copy became cramped/contrast-sensitive;
- final variant restored Q04 to an adjacent cream column and hid one redundant micro-kicker.

## Expected improvement

A more continuous photo-led page with less section-band reading and no additional asset or UI-like container.

## Regression risk

Crowding of the bridge copy, crop degradation from enlargement, or contrast loss if the treatment is pushed into image-overlaid text without a suitable dark/readable zone.

## Three-scale evidence

- whole spread / 500px: PASS;
- reading spread / 1400px: PASS;
- actual-size Q&A right / 794×1123: PASS;
- visible native text `54` across spread;
- visible IMAGE fills `5`;
- right-page same-parent text intersections `0`;
- right-page 18px safe-area risks `0`.

## Figma / Drive / GitHub evidence

- Figma preferred IP: `2096:2`; right page `2096:49`;
- hidden rollback IK: `2084:2`;
- support image hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- Drive V6 authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IP-PROFILE-QA-EARLIER-SUPPORT-PHOTO-Q04-BIND-QA-2026-08-21.md`.

## Adopted / rejected status

Final IP treatment: `VERIFIED_LOCAL / ADOPTED`.
Full-photo Q04 overlay sub-variant: `REJECTED` due to cramped/contrast-sensitive copy.

## What must remain Rurubu-specific

Do not transfer the exact photo, crop, cream field, Q&A numbering, coordinates, colors, typography, or Japanese travel-magazine treatment.

## Cross-item applicability hypothesis

Another print artifact may independently test whether an existing downstream photo can begin earlier to bind two otherwise coherent content regions. The transferable rule is not “always overlap text on photos”; the contrast stop is equally important.

## Next receiving-item experiment

On a materially different print item with a shallow text-only gap between two legitimate image/physical beats, compare current spacing with an earlier downstream beat while keeping variable/factual copy native and readable. Reject the transfer if contrast, dynamic-copy tolerance, or physical semantics regress.
