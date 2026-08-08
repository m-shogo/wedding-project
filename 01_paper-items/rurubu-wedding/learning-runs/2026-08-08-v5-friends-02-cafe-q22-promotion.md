# V5-12 Friends cafe — live-geometry correction + role crop promotion

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Production Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Current target: `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`
Comparison: `442:2 / V5_FRIENDS_02_CAFE_DERIVATIVE_COMPARISON_2026_08_08`, target `442:23`

## Visible problem

V5-12 remained an active incomplete Friends & Family role. The ledger described the target as `236 × 176`, but a fresh live-Figma duplicate audit returned the actual visible semantic box as `270 × 184`. Building a derivative from the stale ledger geometry would violate the authority order and risk a weak crop.

## Source / hypothesis

Drive master:
- `12_FRIENDS_FAMILY_02_CAFE_DUMMY.png`
- ID `1D0U-rBuidfk7YttssNyonTW2YAPrpUjv`
- `2,043,274 bytes`
- decoded source `1254 × 1254`

Visual review found a usable identity-safe cafe still life: flowers, coffee, cake and camera, with no recognizable generated person. Regeneration was therefore rejected as unnecessary.

Hypothesis: a role-specific crop at exact `3×` the live `270 × 184` semantic box (`810 × 552`) would keep the table-story specificity while reading cleanly beside the second Friends image.

Expected improvement:
- correct source identity instead of a generic/duplicate placeholder
- clearer Friends & Family travel/lifestyle rhythm
- no false-person identity risk
- accurate derivative planning based on live geometry

Possible regression:
- cafe still life could become too visually dominant
- lower compression could visibly smear cake/flowers/camera
- stale ledger geometry could cause wrong framing if not corrected first

Evidence required:
- Drive readback
- exact Figma node/hash
- duplicate-first screenshot
- whole/page, reading and actual-size detail QA
- structure/rollback preservation
- ledger/status/Git readback

## Derivative

Accepted derivative:
- `RURUBU_V5_12_FRIENDS_CAFE__FIGMA_810x552_Q22.jpg`
- Drive ID `1CN3gXWgHccx6WwcsmJcXDfXWgARMLFrO`
- `810 × 552`
- `25,901 bytes`
- SHA-256 `bf441c0fba4d52c9694c311665f25958bf930efb33aad5f3c4fe287e4907e76f`

A higher-byte Q36 derivative was also preserved in Drive during comparison (`1CO-S9J3Kukat-Zrek9K2skeD9CZ4O29Y`, `35,134 bytes`) but was not used as Current evidence because Q22 passed natural-size visual QA and reduced transfer fragility. This is role-specific evidence, not a global compression rule.

## Binary-safe comparison

The exact Drive-readback Q22 JPEG was staged in six shared-data chunks:
- `6000,6000,6000,6000,6000,4536`
- total encoded length `34,536`
- decoded length `25,901 bytes`
- JPEG SOI/EOI verified

Comparison node `442:23`:
- geometry `270 × 184`
- old hash `2005b91ce26ead7d8128f547c293fe4a510f5d24`
- new hash `c1ada11205bc3978bf426b304d683f1c1566cac2`

No Current node was touched before duplicate screenshot QA.

## Three-scale QA

### Whole item
PASS. The cafe still life reads as a purposeful Friends & Family memory and sits comfortably below the large back-cover travel-note image. It does not overwhelm the route or captions.

### Reading/page
PASS. `FRIENDS & FAMILY` → two image groups → captions → `OUR JOURNEY ROUTE` remains clear. The new cafe image is immediately distinct from the adjacent image.

### Actual-size detail
PASS for V5 dummy-design QA at natural `270 × 184`. Cup, cake, flowers and camera remain distinct without obvious blocking or identity ambiguity.

## Current promotion / structure QA

Current `77:39` was promoted only after comparison passed:
- previous hash `2005b91ce26ead7d8128f547c293fe4a510f5d24`
- Current hash `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Current/comparison hashes match
- semantic geometry `270 × 184` preserved
- outer native text nodes `85`
- outer IMAGE-fill nodes `14`
- fold guide preserved
- rollback `59:2` / `59:178` preserved
- comparison `442:2` preserved
- temporary transfer chunks cleared after verification

A semantic-neighborhood audit also confirmed:
- `77:39` is `BACK_VISUAL_FRIEND_2_PHOTO`, visible at `270 × 184`
- its hidden dummy source label remains hidden
- caption nodes `77:41` / `77:42` remain intact
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO` remains separate and unchanged

## Failure / correction learned

The stale ledger geometry was not trusted simply because it had been documented. Live Figma returned `270 × 184`, so the derivative plan was recalculated to `810 × 552` before adoption. This is the correct use of the project authority order: live semantic geometry can invalidate older evidence metadata without invalidating provenance history.

## Result

`DISCOVERED → PROTOTYPED → VERIFIED_FOR_V5_DUMMY_DESIGN / PHOTO_ROLE_PASS / ROLE_COMPLETE / NOT_PROJECT_RULE`

V5-12 is complete for dummy-design QA. The rule being tested is not “always use 3× or Q22”; it is “resolve semantic geometry from the live authority before deriving and judge compression at the actual role size.”

## Next application

1. Re-read live geometry for V5-13 before deriving; the old ledger geometry may also be stale.
2. Keep V5-01 on a stricter dominant-photo quality bar.
3. Keep V5-03/V5-04 identity-safe; generated recognizable faces may not represent the real couple.
4. V6 production remains blocked until V5 dummy-photo/design QA is genuinely complete.
