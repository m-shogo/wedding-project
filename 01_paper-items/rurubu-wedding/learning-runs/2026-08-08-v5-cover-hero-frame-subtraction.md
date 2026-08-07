# Rurubu V5 — cover hero frame subtraction

Date: 2026-08-08
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`
Scope: Rurubu WEDDING V5 only

## Authorities and evidence

This run remained subordinate to live Figma, verified Drive state, `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`, `CURRENT-STATUS.md`, the project-wide Figma/asset/learning authorities, the quality-over-legacy decision, the Rurubu editorial knowledge base, V5 operating system, postmortem, and V6 clean-room boundary.

Current outer:
- `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- cover hero `77:148 / IMG_HERO`

Rollback:
- outer V4 `59:2`
- inside V4 `59:178`

New comparison:
- `411:2 / V5_OUTER_HERO_FRAME_SUBTRACTION_TEST_2026_08_08`
- duplicate hero `411:132`

## Visible problem

The open dominant cover hero was still surrounded by a 7 px white stroke and 18 px rounded corners. The image itself remains below the required source-quality gate, but the heavy rounded white frame was an independent editorial defect: at whole-cover scale it made the dominant photo read like a large UI/card component rather than a travel-magazine photograph.

Quality-over-legacy question: if this hero frame did not already exist, would the current editorial direction deliberately add a thick white rounded container around the single dominant cover photograph? The tested hypothesis was no.

## Principle tested

Subtraction before decoration:
- remove containment that does not carry unique semantic meaning;
- let the dominant photograph own more visual authority;
- keep the caption contrast device separate from the photograph frame;
- do not change source identity, crop, or geometry during a frame-only experiment.

Expected improvement:
- stronger photographic dominance;
- less Web/UI-card silhouette;
- cleaner relation between masthead, main cover line, hero, and feature index.

Possible regression:
- the image could visually merge too much with the pale-blue page background;
- square geometry could feel unfinished;
- removing the white edge could expose crop defects.

Adoption evidence required:
- rollback-safe duplicate;
- whole-item comparison;
- natural-size hero review;
- unchanged image hash/crop/geometry;
- post-promotion screenshot.

## Experiment

Created `411:2` from Current without modifying Current.

Only the duplicate hero changed:
- strokes: white 7 px → none
- stroke weight → 0
- corner radius: 18 → 2
- geometry remains `665 × 610`
- image fill/hash preserved

Duplicate hero hash:
- `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

No text, image source, crop, feature index, masthead, caption copy, fold guide, or other geometry changed.

## Three-scale QA

### Whole item

PASS. Compared with Current before promotion, the cover photograph reads as the dominant editorial image instead of a rounded card. The main hierarchy remains masthead/date → hero/main cover line → feature index → issue folio.

### Reading/page

PASS. Removing only the border does not change reading order or caption contrast. The dark `SPECIAL INTERVIEW` caption strip remains attached to the image and continues to provide sufficient separation for its text.

### Actual-size/detail

PASS for the frame treatment. The `665 × 610` natural-size render shows no newly exposed clipping, stroke artifact, or corner artifact. This does **not** pass the hero image-quality role itself; the current derivative is still visibly soft/pixelated and remains rejected by the ledger.

## Current promotion

Applied the verified treatment to Current `77:148`:
- strokes removed
- stroke weight `0`
- corner radius `2`

Current image hash before and after:
- `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Therefore source identity/crop was not silently changed by this editorial experiment.

Preserved:
- `411:2` comparison
- V4 rollback `59:2` / `59:178`
- semantic node `77:148`
- native text
- non-destructive image fill
- provisional fold guide

## Failure / limitation

This does not advance `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, `ROLE_COMPLETE`, or dominant-photo counts. `V5-01 / IMG_HERO` still requires a quality-passing role-sized derivative, Drive ID → node ID → image-hash evidence, and full three-scale image QA.

The existing master is `1122 × 1402` while the target is `665 × 610`; its portrait-to-near-square mismatch remains a concrete reason to reconsider crop/derivation or select/regenerate a better-fitting source if the current master cannot pass the required role.

## Learning

A dominant travel-magazine photograph should not inherit a thick rounded white frame simply because earlier versions used card geometry. First test whether the photograph can carry the hierarchy directly. This is verified for the V5 cover context only and is not yet a project-wide rule.

## Next application

1. Continue the actual V5-01 quality/provenance gate separately.
2. Prefer an existing quality-passing derivative if one can be verified; otherwise the master-to-target aspect-ratio mismatch is a legitimate regeneration/selection trigger.
3. Keep `411:2` as rollback/comparison evidence.
4. Continue bounded subtraction only where an element has no unique semantic job.
5. Do not begin V6 production until the complete V5 dummy-photo design gate passes.
