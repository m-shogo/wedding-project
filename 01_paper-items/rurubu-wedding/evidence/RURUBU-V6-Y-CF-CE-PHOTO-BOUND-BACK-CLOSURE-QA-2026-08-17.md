# RURUBU V6 Y + CF/CE — Photo-Bound Back Closure QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

Adopted:
- Outer Y `1542:2 / PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`.

Retained unchanged:
- Profile/Q&A CF `1538:2`;
- Story/chronology CE `1535:78`.

Rollback:
- Outer W `1491:2 / ROLLBACK_HIDDEN / V6_OUTER_W_PRE_Y_PHOTO_BOUND_CLOSURE_2026_08_17`.

V7 remained HOLD and was not edited.

## Visible problem

Outer W's front cover already read strongly as a travel-information magazine, but the back cover still separated into a dominant top photo field and a lower cream chronology field. The secondary cafe/memory image ended too early, so `みんなとの思い出` and `ふたりの旅年表` behaved like a separate information panel rather than a continuous magazine page.

## Root-cause hypothesis

The defect was under-weighted legitimate photography, not missing decoration. If the existing verified cafe photo became a larger page-binding secondary field and the memory headline attached directly to it, the back cover could read as one continuous editorial composition while chronology facts remained native/editable.

## Bounded test

Created rollback-safe Outer Y from W and changed only the back-cover composition:

- cafe photo: `430×270 @ x24/y430` → `552×320 @ x0/y414` after actual-size correction;
- skyline support: retained near intrinsic size at `232×210`, moved into stronger overlap and rotated `-3°`;
- existing dark memory-caption strip widened to `518×58` and attached to the enlarged cafe photo;
- `ふたりの旅年表` and its magenta/cyan rules moved immediately below the bound photo field;
- five pre-wedding native text events tightened into an asymmetric rhythm;
- WEDDING terminal retained as the strong navy final destination.

No new raster, card, gradient, shadow, image source, generated decoration or text content was introduced.

## Expected improvement

- reduce `photo section → info panel` reading;
- create `photo → memory → chronology → WEDDING` continuity;
- make the back cover closer in energy to the strong front cover without sacrificing later editability.

## Regression risk

- enlarging the cafe role could expose source softness;
- the chronology title could become unreadable if allowed to remain on top of the extended photograph;
- tightening the event rhythm could create text collision or safe-area failures;
- the small skyline source could become visibly soft if enlarged beyond intrinsic size.

## Three-scale evidence

### Whole item / thumbnail

- Outer W 500px inspected before test.
- Outer Y 500px PASS and preferred: back cover reads more continuously and the lower half feels less like a detached form/info panel.

### Reading / page scale

The unchanged front cover remains strong and visually consistent with the new back. The existing native chronology hierarchy remains legible at whole-spread scale.

### Actual size

Outer Y back `1542:3` rendered at native `794×1123`.

Initial study FAIL:
- cafe image at `552×344` ended beneath the chronology title;
- `ふたりの旅年表` visually entered the photograph.

Correction:
- cafe height `344 → 320`;
- memory strip/title moved up with the photo ending;
- chronology title/rules positioned fully on the cream field.

Final actual-size result: PASS.

## Structure QA

Final Outer Y back:
- visible native text: `18`;
- absolute text/text intersections: `0`;
- 18px text safe-area risks: `0`;
- front cover unchanged from W;
- provisional fold guide unchanged.

Image intrinsic audit:

| Role | Figma display | intrinsic | result |
|---|---:|---:|---|
| travel flatlay dominant | 793.7×490 | 944×608 | PASS |
| cafe memory feature | 552×320 | 810×552 | PASS |
| Yokohama skyline support | 232×210 | 240×220 | PASS |

Image hashes:
- flatlay `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- skyline `644f449c3bf2001a94d4b822d2b55e2614c11042`.

No image hash changed in this run.

## Drive evidence

V6 Drive root re-read:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Timeline generated masters remain present:
- `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV / RURUBU_V6_SECTION_TIMELINE_GENERATED_V1_2026-08-15.png`;
- `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8 / RURUBU_V6_TIMELINE_SECTION_ROLE_v2.png`.

Generated section masters were not adopted or transported in this test.

## Asset lifecycle truth

- generated: `0`;
- new Drive save: `0`;
- new external upload: `0`;
- new raster bytes: `0`;
- existing verified image roles recomposed: `YES`;
- native text preserved: `YES`;
- replaceable image roles preserved: `YES`;
- visually verified: `YES`;
- structurally verified: `YES`.

## Status

`VERIFIED_LOCAL / ADOPTED`.

Outer Y is preferred over W for dummy-design study state. This is not a print-ready declaration.

## What must remain Rurubu-specific

Do not transfer the exact cafe crop, photo dimensions, skyline angle, palette, event positions, Yokohama imagery, Japanese headings, or Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

A materially different print artifact may independently test whether a legitimate secondary image can bind a dominant image region to a lower information region before adding another container or ornament. The transferable idea is the page-binding role test, not the visual treatment.
