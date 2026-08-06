# V5 back editorial-kicker cluster subtraction

Date: 2026-08-07
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer candidate: `77:18`

## Authorities reviewed

Before the live change, the run re-read the project production and asset authorities and the current Rurubu status from GitHub main, then inspected the live outer spread. The current status still requires dominant-image provenance/quality closure before any V5 completion declaration.

## Visible problem

The back page title cluster contained all of the following in the same small area:

- pink vertical accent bar `77:20 / BACK_VISUAL_ACCENT`
- English kicker `77:21 / BACK_VISUAL_KICKER` — `QUIET EDITORIAL NOTES`
- primary title `77:22 / BACK_VISUAL_TITLE` — `OUR TRAVEL NOTES`
- Japanese subtitle `77:23 / BACK_VISUAL_SUB`

The English kicker and accent bar added a second pre-title identity without unique factual, navigation, provenance, or reading-order value. At whole-item scale they competed with the already sufficient primary title and created unnecessary decorative density.

## Quality-over-legacy question

Would the kicker-and-bar pair be selected if it did not already exist?

Decision: no. The primary title and Japanese subtitle fully establish the section. The pair was retained only as a rollback-safe hidden layer, not as part of the visible current candidate.

## Hypothesis

Hiding only the redundant kicker and its attached accent bar would:

- strengthen `OUR TRAVEL NOTES` as the first and only title focus;
- reduce template-like editorial decoration;
- improve quiet space at the upper-left edge;
- preserve all unique copy, semantic photo roles, image crops, fold geometry, editability, and rollback history.

Possible regression: the title block could feel under-accented or visually detached from the rest of the back page.

Evidence required for adoption: whole-item screenshot plus live structure readback proving title/subtitle visibility, unchanged image hashes, fold guide, native text, semantic roles, and V4 rollback frames.

## Bounded live experiment

Mutated nodes:

- `77:20 / BACK_VISUAL_ACCENT`: `visible true → false`
- `77:21 / BACK_VISUAL_KICKER`: `visible true → false`

No deletion, text rewrite, geometry change, image replacement, crop change, effect change, or frame restructuring was performed.

## Three-scale QA

### Thumbnail / whole item

The upper-left back page now begins directly with `OUR TRAVEL NOTES`. The removed pink bar and small English line no longer compete with the primary heading. The result is visibly quieter without creating a conspicuous empty hole.

### Reading / page scale

The reading sequence remains:

`OUR TRAVEL NOTES → Japanese subtitle → dominant memory photo and article copy → FRIENDS & FAMILY → OUR JOURNEY ROUTE → footer`.

The title and subtitle remain aligned and legible. No content-bearing label was lost.

### Detail / actual-size and structure

Verified live readback:

- `77:20`: visible `false`
- `77:21`: visible `false`; native text preserved
- `77:22 / BACK_VISUAL_TITLE`: visible `true`; `OUR TRAVEL NOTES`
- `77:23 / BACK_VISUAL_SUB`: visible `true`; Japanese subtitle preserved
- native text nodes in outer candidate: `85`
- visible text nodes: `45`
- IMAGE-fill nodes: `14`
- back main image `77:24` hash unchanged: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- provisional fold guide `77:288`: visible and preserved
- V4 rollback outer `59:2`: preserved
- V4 rollback inside `59:178`: preserved

No text reflow, collision, clipping, crop regression, semantic-role loss, or fold-safety regression was observed in the post-change screenshot.

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / ROLLBACK_SAFE`

## Failure / limitation

This is an editorial-density improvement only. It does not close dominant-photo source provenance or quality. The back-main role still retains its existing image hash, and the evidence gates `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, V5 completion, and V6 start remain unchanged.

This result also does not establish a universal rule to remove all kickers or accent bars. They remain valid when they add unique navigation, hierarchy, contrast, or publication identity.

## Reusable candidate lesson

When a title cluster already contains a complete primary title and explanatory subtitle, test removing any preceding English micro-kicker together with its attached decorative shape. Evaluate the cluster as one semantic unit so subtraction does not leave an orphaned accent.

Status: `VERIFIED_FOR_THIS_V5_CLUSTER / NOT_PROMOTED_TO_PROJECT_RULE`

## Next safe application

Return priority to unresolved dominant-image provenance and quality evidence. Continue subtraction only where a visible element is demonstrably redundant, non-factual, and rollback-safe.
