# 2026-08-19 — Rurubu V6 EJ 1DAY photo-scale rhythm

## Source problem

EI 1DAY Plan had correct travel-guide information structure, but the right-page photos still read as a repeated vertical module stack.

## Hypothesis

The page needed stronger differences between photo roles rather than another decorative system. Existing legitimate photos could carry more editorial hierarchy through scale, position and slight rotation.

## Bounded experiment

- duplicated EI `1752:2` into rollback-safe EJ;
- preserved native copy and all image sources/hashes;
- changed only right-page photo geometry and nearby native copy positions;
- kept `01–04` + times as the sequence authority;
- rejected the first STOP01 enlargement after detecting source-size overreach;
- corrected skyline to source-safe `238×210` before promotion.

## Expected improvement

Less repeated-module reading, stronger Japanese travel-magazine photo diary rhythm, no return to a route-line UI.

## Regression risks checked

- native-copy collision from rotated photos;
- 18px text safe area;
- small-source enlargement;
- route-order ambiguity.

## Evidence

- whole spread comparison: EJ stronger than EI;
- actual-size right `794×1123`: PASS;
- native visible text `25`;
- text collisions `0`;
- 18px safe-area risks `0`;
- replaceable photo roles `4`.

Figma:
- EI rollback `1752:2`;
- EJ preferred `1784:2`;
- EJ right `1784:29`;
- Start Here `845:27` updated to EJ.

Drive authority re-read:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

GitHub evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EJ-1DAY-PHOTO-SCALE-RHYTHM-QA-2026-08-19.md`.

## Result

`VERIFIED_LOCAL / ADOPTED`.

## What stays Rurubu-specific

Yokohama content, exact crop/angles, image choices, colors, coordinates and Japanese travel-magazine art direction.

## Next application

Continue comparing the preferred six-spread set for visible dead paper, repeated photo-module rhythm or semantic-photo defects. Do not generate or substitute imagery unless a concrete role cannot be improved safely from verified existing sources.
