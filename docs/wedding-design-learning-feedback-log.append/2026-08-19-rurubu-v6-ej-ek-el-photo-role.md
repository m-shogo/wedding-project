# Rurubu V6 EJ / EK / EL — photo-role and hierarchy experiments

Date: 2026-08-19
Scope: Rurubu WEDDING only

## EJ — Memory Spots stronger Spot 04 feature

Observed: EB right page had a source-limited Spot 03 (`240×220`) and a weak blank band before Spot 04, while Spot 04 had a much stronger `732×498` source.

Hypothesis: do not enlarge the low-resolution Spot 03; instead promote the legitimate high-resolution Spot 04 to a stronger second feature.

Test: EJ `1759:2` moved/enlarged only Spot 04 and rebalanced its existing native title/copy/label. Photo hashes and native copy stayed unchanged.

Result: adopted. Whole/read/actual review passed. EJ right page `1759:24` has native text `14`, collision `0`, 18px safe risk `0`, overflow `0`, Spot 03 `238×218 / 240×220`, Spot 04 `493×344 / 732×498`.

Regression risk: promoting a secondary photo is valid only when source resolution and editorial meaning support the larger role.

## EK — Profile repeated skyline → native destination beat

Observed: DN's third small skyline snapshot repeated a weak `240×220` source already used elsewhere. The role was editorial/supporting rather than photographic evidence.

Hypothesis: with the Profile hero and two meaningful snapshots retained, the third support slot can become native editorial structure without reducing the page to a template.

Test: EK `1762:2` hid only snapshot 03 and used the existing composed travel texture plus editable `NEXT DESTINATION`, large `03`, `次の目的地へ。` and a functional rule.

Rejected intermediate states:

- first native clones landed at Figma page root rather than inside the candidate page; visual output therefore failed despite node creation success;
- after re-parenting, text-box overlap and safe-area proximity remained and were repaired before adoption.

Result: adopted. Whole spread and Profile actual `794×1123` pass; native text `25`; collision `0`; safe risk `0`; all visible image roles intrinsic-safe. Skyline use across preferred set `6 → 5`.

## EL — remove same-spread duplicate waterfront from Event 01

Observed: DO showed the identical waterfront photo as both the left Story hero and Event 01 on the facing chronology page.

Hypothesis: same-spread duplicate photography is more visually damaging than tolerated cross-spread reuse; Event 01 can remain meaningful through native hierarchy because the photo itself is not factual evidence of the event.

Test: EL `1763:2` preserved the Story hero, hid only Event 01's repeated waterfront, and converted Event 01 to a large native `01`, date, `出会い`, and supporting copy. Event 03/05 photos and WEDDING closing band stayed intact.

Rejected intermediate state: absolute-bounds QA found a 6px `01`/date overlap. Date position was repaired before promotion.

Result: adopted. Chronology actual `794×1123` passes with native text `31`, collision `0`, safe risk `0`, intrinsic violations `0`. Waterfront use across preferred set `6 → 5`.

## Final preferred-set state

- Outer EE `1730:2`
- Profile/Q&A EK `1762:2`
- Story/Chronology EL `1763:2`
- Memory Spots EJ `1759:2`
- Cafe/Table EF `1734:2`
- 1DAY Plan EI `1752:2`
- V7 HOLD

Final visible IMAGE roles: `34`; intrinsic violations: `0`; reader-visible production/proof terminology: `0`.

Newly generated `0`; adopted generated `0`; new Drive save `0`; new binary placement `0`; new image hash `0`.

Next Rurubu application: keep V6 preferred photography semantically honest. Prioritize same-reading-unit duplicate removal and legitimate final Yokohama photography; do not substitute unrelated scenery or unknown-provenance people simply to lower reuse counts.
