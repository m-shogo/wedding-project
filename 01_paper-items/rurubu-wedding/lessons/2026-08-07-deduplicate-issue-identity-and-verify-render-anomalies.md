# Deduplicate issue identity and verify render anomalies

Date: 2026-08-07
Status: `VERIFIED FOR V5 / NOT YET PROJECT_RULE`

## Source

Live Rurubu V5 outer frame `77:18`. The back cover repeated issue/publication identity in both an upper-right pill (`77:70`, `77:71`) and the bottom issue strip (`77:100`, `77:101`).

## Hypothesis

When issue identity is already present in a stable footer strip, a second small pill near the title may be decorative duplication rather than useful navigation. Removing the duplicate should improve title focus and quiet space.

## Result

Hiding `77:70` and `77:71` improved the upper-page hierarchy while preserving the primary title/subtitle, bottom issue strip, image fills, semantic nodes, editability, fold guide, and rollback safety.

## Failure observed

The first post-change whole-spread screenshot temporarily rendered the cover hero as blank even though `77:148` remained visible with the same IMAGE fill and hash. A direct node screenshot rendered the hero correctly. Therefore, a single composite screenshot can be a transport/render anomaly and must not automatically be treated as a live-design regression.

## Adopted use

For V5:

- keep one clear issue-identity location unless a second instance adds unique navigation or publication value;
- when a composite screenshot unexpectedly drops an image, verify the exact node visibility, IMAGE fill/hash, and a direct node screenshot before rollback or ledger changes;
- never mark a role failed or complete from one anomalous render.

## Limit

Do not remove repeated identity automatically. Repetition may be intentional on front/back, spine, detachable panels, or production marks. The test is whether each instance has a distinct reader or production function.

## Next application

Use this verification sequence during dominant-photo provenance closure and future three-scale QA. Keep the lesson at item-level until repeated evidence supports promotion.