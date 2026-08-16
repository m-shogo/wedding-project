# RSL-055 — Secondary photo anchor before new ornament

Date: 2026-08-17
Source scope: Rurubu WEDDING V6
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem
Two already-structured V6 pages still felt template-like for different reasons:

- Story BX had a strong hero but a weak lower half; the second photo and cream field did not form a meaningful editorial beat.
- Q&A BW had valid hierarchy but Q04–Q06 still floated around a relatively weak lower support image.

The visible defect was not missing ornament. It was insufficient **secondary visual anchoring**.

## Root-cause hypothesis
When a print page already has native semantic copy and valid replaceable photography, adding another card, badge, sticker or generated decoration may increase complexity without fixing the hierarchy. A stronger result may come from promoting an existing intrinsic-safe secondary photo into a real page-level feature, then letting native copy occupy the complementary field.

## Bounded tests
### Story BX → BY
- chronology untouched;
- no new photo, hash, card or generated decoration;
- existing support-2 photo promoted to `515×350`;
- support-1 kept source-safe at `238×216` for source `240×220`;
- native Japanese copy compressed into a narrow right editorial column;
- existing composed texture retained as support, not the subject.

Expected improvement: reduce the large quiet lower field and create hero → second feature → copy reading rhythm.

Regression risks: source upscaling, photo/copy collision, over-crowding, loss of safe area.

Three-scale evidence:
- whole 500px PASS;
- reading 1200px PASS;
- actual Story 794×1123 PASS.

Structure evidence:
- native text 11;
- replaceable images 3;
- text collision 0;
- 18px safe risk 0;
- support-1 `238×216 / 240×220` PASS;
- support-2 `515×350 / 810×552` PASS.

A first `246px` support-1 width exceeded the `240px` source and one native-text collision was found. Neither state was adopted; both were repaired before promotion.

Figma: preferred `1510:2`, Story `1510:3`; rollback BX `1508:2` hidden.

### Q&A BW → BZ
- no new image, decoration or copy structure;
- existing lower support photo promoted from `355×298` to `430×330`;
- Q05/Q06 remain native text in the complementary left field.

Expected improvement: make the lower half read as a magazine feature rather than a question list with a small leftover picture.

Regression risks: Q05/Q06 collision, source upscaling, safe-area pressure.

Three-scale evidence:
- whole 500px PASS;
- reading 1200px PASS;
- actual Q&A 794×1123 PASS.

Structure evidence:
- native text 25;
- replaceable images 2;
- text collision 0;
- 18px safe risk 0;
- hero `465×480 / 944×608` PASS;
- support `430×330 / 732×498` PASS.

Figma: preferred `1514:2`, Q&A `1514:38`; rollback BW `1502:2` hidden.

## Asset / provenance evidence
No new generation, Drive save, binary placement or raster bytes were needed. Existing verified replaceable photo roles were recomposed. V6 Drive authority remains unchanged.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BZ-BY-SECONDARY-PHOTO-ANCHOR-QA-2026-08-17.md`.

## Finding
Before adding new ornament to an editorial page that already has valid content, test whether an existing legitimate secondary photograph can become a stronger visual anchor. If source fidelity, safe area and copy flow all survive, this can create magazine density more effectively than another containment layer.

## What must remain Rurubu-specific
Do not transfer the exact tropical texture, copy, Japanese headline wording, photo subjects, crop, coordinates, palette or page composition.

## Cross-item applicability hypothesis
On a materially different wedding item, test the principle only in a rollback-safe duplicate: when semantic copy is sound but a page looks templated or under-anchored, promote an already legitimate secondary visual role before inventing new cards or ornament.

This is not `VERIFIED_CROSS_ITEM` and not a project-wide visual rule.