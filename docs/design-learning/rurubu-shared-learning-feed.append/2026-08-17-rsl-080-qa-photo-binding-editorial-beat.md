# RSL-080 — Bind floating repeated copy to an existing valid photo anchor before adding another card system

Date: 2026-08-17
Source scope: Rurubu WEDDING / V6 Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The V6 Q&A page was structurally valid, but Q02/Q03 sat on open cream space between two photographs. At thumbnail and reading scale they looked like two form fields placed in leftover space, weakening the intended Japanese travel-magazine editorial rhythm.

## ROOT_CAUSE_HYPOTHESIS

The problem was not lack of another decorative module. Native Q02/Q03 copy and a valid replaceable memory photo already existed, but they were visually disconnected. Rebinding those roles could improve continuity without introducing a new card grid or rasterizing variable copy.

## TESTED_LOCAL

Rollback-safe duplicate DC `1618:2`:

- existing lower memory photo retained its source/hash and `455×370` geometry, moved upward only;
- one bounded dark strip was placed over the top of that photo;
- Q02/Q03 stayed native text and were arranged as two compact columns within the strip;
- Q04/Q05/Q06 and all Profile content remained unchanged;
- no new image generation, Drive save, raster bytes or external binary placement.

Expected improvement: turn isolated secondary questions into one photo-supported editorial beat and improve whole-page reading flow.

Regression risks: overly UI-like strip, weak photo/text contrast, narrow-column long-copy failure, or crowding against Q04.

## VERIFIED_LOCAL

Three-scale visual QA:

- whole spread 500×354: PASS;
- reading spread 900×637: PASS;
- Q&A actual-size 794×1123: PASS.

Structural QA:

- native visible Q&A text: 26;
- text collisions: 0;
- 18px safe-area risks: 0.

Realistic-copy proof `1619:2` tested longer Q02/Q03 answers with native height auto-resize. Both reached 39px natural height with collision 0 and safe-area risk 0.

DC was promoted to preferred; DA was hidden as rollback.

## What must remain Rurubu-specific

Do NOT transfer:

- exact navy/cyan/yellow palette;
- exact strip geometry or coordinates;
- Q02/Q03 grouping;
- photograph choice/crop;
- Rurubu magazine grammar;
- caption wording or question hierarchy.

## CROSS_ITEM_CANDIDATE

General candidate principle only:

> When repeated secondary copy is structurally correct but reads like floating form modules, first test whether it can be semantically bound to an already-valid visual anchor. Keep variable copy native, use only the minimum functional support needed for contrast, and require actual-size + realistic-copy stress before adoption.

This is not yet `VERIFIED_CROSS_ITEM` and must be tested independently in any receiving item.

Normalized failure fingerprint candidate:

`FLOATING_REPEAT_COPY_SEPARATED_FROM_VALID_VISUAL_ANCHOR`

Stop condition: if photo binding harms legibility, creates a new UI/card pattern, or fails realistic-copy reflow, reject it rather than repeating cosmetic variants.
