# RSL-195 — Redundant index removal needs a semantic replacement, not empty polish

Date: 2026-08-22
Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source item: Rurubu WEDDING V8 Memory/Guide N `2189:2`

## OBSERVED

Memory M removed equal-row UI rhythm, but the left page still repeated the same four-scene list already carried by the right Guide/Index. The duplication made the spread feel authored at the component level but not fully edited at the publication level.

## ROOT_CAUSE_HYPOTHESIS

Deleting duplicate content is not enough. If the vacated space becomes undirected whitespace, a page can move from `template` to `wireframe` rather than to professional editorial design. The replacement visual mass should be owned by the article's meaning.

## TESTED_LOCAL

On a rollback-safe duplicate:

- hide the duplicate four-scene list on the left page;
- preserve the actual memory essay and factual waterfront cue;
- strengthen the essay body scale/leading;
- use one oversized native Japanese word already present in the copy (`温度`) as a low-opacity semantic anchor;
- keep the right Guide/Index facts unchanged;
- add no unrelated image, generic sticker, card, shadow, gradient, or decorative English.

## REJECTED INTERMEDIATE

Fingerprint: `F-RSL-195-JAPANESE-SEMANTIC-ANCHOR-WRAPS-BECAUSE-TEXT-BOX-IS-TOO-NARROW`

The first oversized `温度` text box was too narrow and wrapped into unintended vertical lines. Thumbnail QA caught it. The method switched to a wider horizontal box and smaller 128px scale instead of accepting the artifact as expressive typography.

A second structural check caught an 8px overlap between the anchor and its note; that was fixed before promotion.

## VERIFIED_LOCAL

Memory N passed 500px / 1400px / 1587×1123 review with visible native text `22`, IMAGE `0`, text intersections `0`, 18px safe risks `0`, and no internal-process copy.

The new professional knowledge changed the decision: instead of preserving the duplicate list for 'information density' or filling the page with arbitrary imagery, the page now uses one semantic word from the article as editorial mass.

## CROSS-ITEM APPLICABILITY

Candidate principle only:

> When the same factual index appears twice in one spread, first test removing the weaker duplicate. If the page then becomes dead whitespace, rebuild mass from content-owned typography, photography, or information — not generic filler.

Do not copy the `温度` word, its scale, its opacity, coordinates, or the Rurubu page rhythm into other items.

## NOT PROMOTED PROJECT-WIDE

Needs verification on a materially different page role before stronger promotion.
