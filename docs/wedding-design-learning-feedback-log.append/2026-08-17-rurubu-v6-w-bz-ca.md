# 2026-08-17 — Rurubu V6 W + BZ/CA

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Observation
Whole-item and actual-size review of W + BZ/BY found the next visible defect in BY chronology: major photo-led milestones were strong, but the middle cream field still left support events `02` and `04` visually isolated.

A separate book-level audit also confirmed repeated photo hashes across current dummy-design studies. This was treated as a final-photo replacement concern rather than a reason to insert weaker or identity-unsafe imagery.

## Hypothesis
The chronology did not need more event cards or one photo per milestone. It needed stronger continuity between its existing major/minor beats. A low-opacity, bounded composed travel texture could help only if the event positions were tightened at the same time.

## Bounded test — BY → CA
- cloned BY rollback-safely;
- Story untouched;
- reused the already-verified Rurubu travel texture as one bounded chronology decoration at low opacity;
- no new image generation or binary transport;
- moved `02 / 04` support events and `03 / 05` feature beats upward to form a denser diagonal sequence;
- preserved native event text and replaceable photo roles.

Rejected intermediate state:
- `04` moved but its magenta rule did not, causing a strike-through effect;
- event-02 copy collided with the moved `03` number.

Both were repaired before adoption. `EVENT_COPY_2` was narrowed to `170px`, and support-event rules were aligned to their moved numbers.

## Verified result
- whole 500px: PASS
- whole 1400px: PASS
- chronology actual 794×1123: PASS
- Story native text 11 / visible IMAGE 4
- Chronology native text 30 / visible IMAGE 5
- text collisions 0
- 18px text safe-area risks 0
- all visible photos and composed textures intrinsic-safe

Adopted: CA `1517:2` / chronology `1517:26`.
Rollback: BY `1510:2` hidden.
Start Here: `V5 FU/FX · V6 W + BZ/CA INSIDE STUDIES · V7 HOLD`.

## Photo-diversity audit
Same-scope Rurubu low-reuse candidates were inspected before replacing repeated dummy photography:
- two larger V5 candidates contained recognizable people and were rejected because they could imply real bride/groom imagery;
- one non-person beach image was only `270×192`, too small for a hero role;
- older generated timeline decoration was also visually weak/empty and not adopted.

No quality or identity gate was lowered merely to create more visual variety.

## Asset state
- new image generation: 0
- new Drive save: 0
- external binary placement: 0
- new raster bytes: 0
- existing verified composed texture reused: YES
- native editable text preserved: YES
- replaceable photos preserved: YES
- V7 touched: NO

## Learning
`RSL-056`: a bounded composed continuity field can improve an editorial sequence only when paired with a real rhythm/hierarchy correction. Texture alone is not enough, and it must remain subordinate to native copy and replaceable photography.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; not cross-item verified.

Evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BZ-CA-TIMELINE-TEXTURE-RHYTHM-QA-2026-08-17.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-W-BZ-CA-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`.