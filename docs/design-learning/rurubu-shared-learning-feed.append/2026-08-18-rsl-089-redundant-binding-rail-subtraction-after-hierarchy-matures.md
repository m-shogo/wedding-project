# RSL-089 — Re-test old binding rails after hierarchy matures

Source scope/item: Rurubu WEDDING / V6 Story-Chronology

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The chronology page already distinguished major events through large photos and native typography, but a long vertical rail with ticks still bound secondary events 02/04. At whole-page and actual-size review, that line increasingly read as timeline UI rather than editorial structure.

## Evidence before change

Preferred DM `1665:2` passed earlier QA and the rail had once helped bind the side-trip notes. The defect appeared only after the surrounding hierarchy had become stronger; this was not evidence that the rail had always been wrong.

## Root-cause hypothesis

A binder can become redundant as the rest of the composition matures. If ordinal/date/title hierarchy and spatial grouping now communicate the relationship without the line, retaining the old scaffold can over-explain the structure and push print editorial toward a diagram.

## Bounded test

On rollback-safe duplicate DO `1679:2`:

- hide only `DECOR / SIDE_TRIP_BINDING_RAIL`;
- hide only the two small rail ticks for 02/04;
- preserve the native `寄り道メモ / 02・04` label;
- preserve every event/date/title/copy role, photo role, image hash, composed texture, WEDDING terminal and Story page;
- add no new decorative object or image.

## Expected improvement

Keep the side-trip relationship readable while making the chronology page feel more like a Japanese travel feature and less like a timeline component.

## Regression risk

02/04 could lose grouping or appear accidental. Rail subtraction is therefore invalid unless the receiving composition independently proves that hierarchy and spacing already carry the relationship.

## Three-scale evidence

- whole spread / 900px: PASS, visually cleaner than DM;
- reading scale: PASS;
- actual-size chronology `1679:28` / `794×1123`: PASS;
- visible native text `31`;
- text collisions `0`;
- 18px safe-area risks `0`;
- visible overflow `0`.

## Figma / Drive / GitHub evidence

- Figma preferred: DO `1679:2`;
- chronology page: `1679:28`;
- hidden rollback: DM `1665:2`;
- Start Here: `845:27` → `V5 FU/FX · V6 AG + DN/DO INSIDE STUDIES · V7 HOLD`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DO-SIDE-TRIP-RAIL-SUBTRACTION-QA-2026-08-18.md`.

## Adopted / rejected / blocked

`VERIFIED_LOCAL / ADOPTED` in Rurubu V6.

## What must remain Rurubu-specific

Do not transfer the Japanese label, exact event ordering, colors, timeline positions, photo selection, or Rurubu editorial grammar.

## Cross-item applicability hypothesis

On another materially different print artifact, if a seam/rail/border originally had a proven binding function, re-test that function after major hierarchy changes rather than preserving it forever. Remove it only when three-scale evidence shows the content remains grouped and more editorial without it.

This extends the existing binding-function method; it does **not** promote a blanket rule that rails should be removed.
