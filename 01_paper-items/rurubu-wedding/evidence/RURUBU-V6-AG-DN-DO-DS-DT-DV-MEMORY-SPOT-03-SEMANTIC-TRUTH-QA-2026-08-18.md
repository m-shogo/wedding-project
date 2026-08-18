# Rurubu WEDDING V6 — DS Memory Spots semantic-truth QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Starting state

Preferred before this experiment:

- Outer AG `1676:2`
- Profile / Q&A DN `1675:2`
- Story / chronology DO `1679:2`
- Memory Spots DR `1689:2`
- Gourmet / Cafe DT `1695:2`
- 1DAY Plan DV `1701:2`
- V7 HOLD

DR had a known unresolved defect: SPOT 03 was presented inside a Yokohama destination-information spread, but its `439a719d73f28e8dd2889f2026cccb15f345ec63` old-town photograph had no legitimate Yokohama semantic authority.

## Evidence / diagnosis

A preserved retired V5 night-view role was inspected before reuse. The actual pixels showed a clearly non-Yokohama European river/city landmark scene, so it was rejected as a semantic repair despite preserved provenance. It was never adopted into the preferred V6 spread.

A separate already-verified V6 skyline role was then inspected at actual pixels. It visibly contains Yokohama Minato Mirai landmarks and was already used as `V6_H_BACK_YOKOHAMA_SKYLINE_SUPPORT` in the preferred outer spread.

## Bounded rollback-safe test

DR was cloned to DS `1709:2`.

Only SPOT 03 and directly dependent native copy were changed:

- old photo hash removed from SPOT 03: `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- replacement existing verified Yokohama skyline hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- display geometry: `238 × 218`, intentionally kept below the registered small skyline source role rather than enlarging it to the old `315 × 465` slot;
- photo remains an independent replaceable IMAGE role;
- title changed from `夜の街歩き` to native `みなとみらいの夕景`;
- copy/meta changed to native Yokohama/Minato Mirai sunset wording;
- guide deck changed from `路地の空気` to content that matches the actual visible destinations;
- practical metadata changed from `NIGHT 街歩き` to `SUNSET みなとみらい`;
- the obsolete tall yellow edge was shortened to the new photo geometry;
- a cyan rule that no longer provided binding/contrast function was removed after actual-size review.

No new image generation, Drive save, binary upload, raster hash, or non-Rurubu asset was used.

## Visual QA

### Whole spread / thumbnail

- DS at ~500px: PASS.
- Destination-information hierarchy remains readable.
- The smaller SPOT 03 image now behaves as a support beat instead of pretending a destination-wrong image is a dominant feature.

### Reading scale

- DS at ~1200px: PASS.
- SPOT 03 reads as `03 → Yokohama skyline → みなとみらいの夕景 → native descriptive copy`.
- SPOT 04 remains the stronger lower-page visual anchor.

### Actual size

Right page `1709:24` at `794 × 1123`: PASS.

- native text count: `14`;
- image roles: `2`;
- absolute text/text collisions: `0`;
- 18px text safe-area risks: `0`;
- page overflow: `0`;
- SPOT 03 skyline display: `238 × 218`, intrinsic-safe by the existing registered role constraint.

The existing SPOT 04 label/title intentionally overlap the SPOT 04 photo as editorial caption/title treatment; no unintended text/image collision was introduced by DS.

## Promotion

DS promoted:

- `1709:2 / PREFERRED / V6_INSIDE_DS_MEMORY_SPOTS_YOKOHAMA_TRUTH_REPAIR_2026_08_18`

DR preserved as hidden rollback:

- `1689:2 / ROLLBACK_HIDDEN / V6_INSIDE_DR_PRE_DS_MEMORY_SPOTS_2026_08_18`

Start Here `845:27` updated to:

`V5 FU/FX · V6 AG + DN/DO + DS MEMORY SPOTS + DT CAFE & TABLE + DV 1DAY PLAN · V7 HOLD`

## Result

`VERIFIED_LOCAL / ADOPTED`

The quality improvement is not that the replacement photograph is larger or more dramatic. It is that the page no longer makes a destination claim its pixels cannot support. A smaller truthful, intrinsic-safe photo is preferred over a visually stronger but destination-wrong image.

## Failure fingerprint

`DESTINATION_SEMANTIC_IMAGE_FALSE_AUTHORITY`

Fingerprint:

- operation: destination-information photo selection;
- symptom: technically valid image is presented as a named destination it does not depict or cannot substantiate;
- likely cause: visual-role fit was allowed to outrank destination semantic authority;
- stop condition: do not retry another destination-wrong travel image merely because its aspect ratio or quality is better;
- replacement method: use destination-authoritative imagery, or reauthor the native copy so no false destination implication remains.

## What remains Rurubu-specific

Do not transfer literal Yokohama images, `みなとみらい` wording, page geometry, colors, crop, numbering, or magazine treatment to other Wedding items.
