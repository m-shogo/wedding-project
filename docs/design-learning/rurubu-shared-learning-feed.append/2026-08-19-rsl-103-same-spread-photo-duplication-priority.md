# RSL-103 — Same-spread photo duplication deserves priority over cosmetic cross-spread count reduction

Date: 2026-08-19
Source scope/item: Rurubu WEDDING / V6 Profile + Story/Chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V6 preferred set had a constrained legitimate photo pool. Some photos therefore repeated across different spreads, but one stronger defect was visible inside Story/Chronology itself: the same Yokohama waterfront image appeared as both the left Story hero and Event 01 on the facing chronology page. Profile also used the low-resolution Yokohama skyline as a small third snapshot even though that role was a supporting editorial cue rather than destination evidence.

## Root-cause hypothesis

Photo repetition should not be optimized as a raw count. Repetition is most damaging when the same image is visible twice in one reading unit or when a repeated photo occupies a role that does not actually require photographic evidence. Under a constrained legitimate pool, the safest first move is to preserve evidence-bearing photos and convert only non-evidence support roles to native editorial structure when the page remains strong.

## Bounded tests

### Test A — Profile DN → EK

- keep the full-width Profile photo and two meaningful replaceable snapshots;
- hide only the third repeated skyline support photo;
- retain the existing composed travel texture behind the cluster;
- replace the removed photo role with native `NEXT DESTINATION`, large `03`, `次の目的地へ。` and one functional rule;
- reject unrelated legacy coastal/resort images and unverified person images rather than using them merely to improve diversity metrics.

The first attempt exposed a parent/z-order failure: newly cloned native text lived at page root and rendered behind the intended candidate page. Parent readback caught it. After correct containment, text-box overlap and safe-area proximity were also repaired before adoption.

### Test B — Story/Chronology DO → EL

- preserve the large left Story waterfront hero;
- hide only the facing Event 01 copy of the same waterfront image;
- convert Event 01 to a strong native milestone with `01`, date, `出会い`, and supporting copy;
- preserve Events 03/05 photo beats and the WEDDING closing band;
- repair the initial 6px ordinal/date overlap before adoption.

## Expected improvement

Reduce the most noticeable repetition without introducing semantically false imagery, unknown-provenance people, new generated assets, or weaker generic placeholders. Keep the magazine photo-led while making photo use feel intentional rather than duplicated.

## Regression risk

Removing photos indiscriminately can make a travel publication visually weak or destroy evidence of place/food/experience. A support role should become native/editorial only when the remaining photo hierarchy still carries the page. Cross-spread repetition may be preferable to a semantically wrong substitute.

## Three-scale / structure evidence

EK Profile:

- whole spread: PASS;
- Profile actual `794×1123`: PASS;
- native visible text `25`;
- text collision `0`;
- 18px safe-area risk `0`;
- visible image roles intrinsic-safe;
- skyline use across preferred set `6 → 5`.

EL Story/Chronology:

- whole spread: PASS;
- chronology actual `794×1123`: PASS;
- native text `31`;
- text collision `0` after date repair;
- 18px safe-area risk `0`;
- visible image roles intrinsic-safe;
- same-spread duplicate waterfront removed;
- waterfront use across preferred set `6 → 5`.

Final preferred-set audit after EK/EL plus Memory Spots EJ:

- visible image roles `34`;
- intrinsic violations `0`;
- reader-visible production/proof terminology `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- EK preferred: `1762:2`, Profile page `1762:3`;
- EL preferred: `1763:2`, chronology page `1763:28`;
- DN rollback: `1675:2`;
- DO rollback: `1679:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EJ-EK-EL-SEMANTIC-PHOTO-ROLE-QA-2026-08-19.md`.

## Adopted / rejected / blocked

EK and EL were adopted as `VERIFIED_LOCAL`. The unrelated legacy coast/resort rasters and unverified people images were explicitly rejected for these roles. No new generated asset, Drive write or external binary placement was required.

## What must remain Rurubu-specific

Do not transfer the Yokohama imagery, travel-texture asset, exact copy, ordinal styling, colors, coordinates, photo-cascade geometry, or Rurubu-like art direction.

## Cross-item applicability hypothesis

On another materially different print artifact with a constrained legitimate photo pool, rank duplication defects by reading context rather than raw count. First test whether an identical same-page/same-spread duplicate or a non-evidence support photo can be removed or converted to native editorial structure while preserving the evidence-bearing photo roles. Reject semantic/provenance mismatches even if they would improve diversity metrics.
