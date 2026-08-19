# RURUBU V6 FB — Cafe intrinsic-safe texture correction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / ADOPTED / SOURCE_FIDELITY_REPAIR / V7_HOLD / NOT_PRINT_READY`

## Scope

Rurubu WEDDING only. Figma file `bfM0d4c9dCeBv5pCkJ3TNM`. No non-Rurubu item production state and no V7 production state was inspected or edited.

## Starting authority

- live Cafe preferred before repair: EY `1835:2`, Cafe `1835:3`;
- cross-spread live audit after FA promotion found one remaining intrinsic-size violation;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Visible / production defect

EY looked acceptable in screenshot review, but `DECOR / GOURMET_CAFE_TRAVEL_TEXTURE_COMPOSED_RASTER` (`1835:10`) was displayed at `793.7×448` while its actual Figma image source was `720×860`. Width was therefore enlarged about 10.2% beyond intrinsic source width.

This was fixed even though the role is decoration rather than photography: a composed raster still has a source-fidelity boundary, and screenshot beauty alone is not sufficient production evidence.

## Bounded repair

Rollback-safe candidate FB `1843:2` was cloned from EY.

Only the composed texture geometry changed:

- old: `793.7×448`, x `0`;
- repaired: `720×448`, centered at x `36.84375`;
- source remains `720×860`;
- opacity, image hash, native copy, photo role, typography and Table page were not changed.

No new image, crop source, generated asset, Drive save, binary placement, or image hash was introduced.

## Three-scale / structure evidence

- whole spread / 1200px: PASS;
- Cafe actual-size / `794×1123`: PASS;
- Cafe visible native text: `17`;
- same-parent absolute text intersections: `0`;
- 18px text safe-area risks: `0`;
- visible Cafe image roles: `2`;
- intrinsic violations after repair: `0/2`.

Specific image checks:

- composed travel texture: display `720×448`, source `720×860`, PASS;
- Yokohama view replaceable photo: display `238×218`, source `240×220`, PASS.

## Promotion / rollback

Promoted:

- FB `1843:2 / PREFERRED / V6_INSIDE_FB_CAFE_INTRINSIC_SAFE_TEXTURE_2026_08_19`;
- Cafe `1843:3`.

Rollback:

- EY `1835:2` renamed `ROLLBACK / V6_INSIDE_EY_CAFE_NATIVE_CLOSING_FEATURE_2026_08_19` and hidden.

Start Here `845:27` updated to:

`V5 FU/FX · V6 EZ + ET/EN + EW MEMORY SPOTS + FB CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

## Learning classification

No new shared-learning lesson was created because this is a direct recurrence/application of the already established Rurubu intrinsic-display/source-fidelity gate. Recording another cross-item candidate would duplicate existing learning rather than change future decisions.

## Asset lifecycle

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: `YES`;
- replaceable photo roles preserved: `YES`;
- rollback preserved: `YES`.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

FB keeps the visual result of EY while restoring source-fidelity compliance. This does not establish final print resolution, PDF preflight, or physical proof.