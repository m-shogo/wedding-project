# Rurubu V6 — Y + CK/CJ visual feedback

Date: 2026-08-17
Scope: Rurubu WEDDING only

## Observation

CI chronology had already removed large UI-like containers but still distributed too much visual weight through sequential numbering. The page read as chronology-first rather than photo-story-first.

## Test

CJ duplicated CI in rollback-safe form and preserved Story, native dates/titles/copy, replaceable photos, known WEDDING date, and image provenance. Only chronology hierarchy changed: secondary numeric markers were removed, major event numbers reduced to small metadata, and major/minor title scale was separated.

## Expected improvement

Make chronology feel like an original Japanese travel-information-magazine feature: photographs establish the main beats, native text preserves the sequence, and secondary events bridge the story without becoming equal cards/modules.

## Regression risk

Sequence could become unclear or headline/date/copy could collide after stronger type hierarchy.

## Result

Initial candidate failed four text-collision checks and was corrected before promotion.

Final CJ:

- 500px whole spread PASS;
- 1200px reading PASS;
- actual-size chronology 794×1123 PASS;
- native text 28;
- visible IMAGE fills 5;
- text collisions 0;
- 18px safe-area risks 0;
- page overflow 0.

Adopted: CJ `1554:97` / chronology `1554:122`.
Rollback retained: CI `1551:2`, hidden.

## Next application

Continue V6, not V7. Re-evaluate Y + CK/CJ as a complete magazine system and target the next remaining area that still reads like a template at whole-item scale. Do not add decorative modules merely to increase density; prefer photo hierarchy, native Japanese typography, and bounded composed decoration only when it performs a visible editorial role.
