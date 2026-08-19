# RSL-137 — Replace generic support microcopy with reader-facing editorial notes before adding more design

Source scope/item: Rurubu WEDDING / V6
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Two materially different Rurubu support fields were structurally valid but still looked like authoring/template residue at reading and actual-size scales:

1. Cafe GC used four tiny generic metadata items (`SWEETS / MOOD / PHOTO / TALK`) inside an otherwise useful travel-note field.
2. Story FR used `TRAVEL NOTE / 03 SCENES` plus English role labels (`YOKOHAMA EVENING WALK / NEXT DESTINATION / CAFE MEMORY`) beside otherwise Japanese editorial copy.

## Root-cause hypothesis

The weakness was not missing imagery or missing decorative treatment. The support copy described design roles/categories more than it helped the reader understand the page. Adding another card, photo, badge or texture would increase density without fixing the semantic/template feel.

## Principle / capability tested

When a bounded support region contains generic role-name microcopy and has no factual, accessibility, navigation, branding or physical-production requirement to preserve that wording, test rewriting the existing native text into a compact reader-facing editorial note before adding new visual material.

## Bounded tests

### Cafe GH

Rollback-safe duplicate of GC:

- `4 NOTES` reduced to `3 PICKS`;
- replaced generic role labels with three specific readable recommendations:
  - `01  午後の光がやわらかい席`
  - `02  窓ぎわでゆっくり話せる`
  - `03  食後に海まで歩ける`
- raised item size for actual-size readability;
- no image, card, new raster, new rule system or layout rebuild.

### Story GI

Rollback-safe duplicate of FR:

- kicker → `旅メモ / 3 SCENES`;
- role names → `横浜の夕暮れ / 次の目的地へ / 休日のカフェ`;
- raised list size to 14px;
- no photography, chronology, image hash, composed texture or main hierarchy change.

## Expected improvement

- make support regions read as finished magazine content rather than template labels;
- improve actual-size comprehension;
- recover editorial density without introducing UI-like containment or unnecessary imagery;
- keep all changed copy native/editable.

## Regression risk

- simplification can accidentally remove real facts;
- converting everything to Japanese can erase intentional bilingual art direction;
- a checklist/list can become another UI module if over-boxed or over-scaled;
- specific wording must remain appropriate to the target item and audience.

## Three-scale evidence

Cafe GH:

- ~500px whole: PASS
- 1200px reading: PASS
- Cafe actual-size 794×1123: PASS
- text collision 0
- 18px safe-area risk 0

Story GI:

- ~500px whole: PASS
- 1200px reading: PASS
- Story actual-size 794×1123: PASS
- text collision 0
- 18px safe-area risk 0

## Figma / Drive / GitHub evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

- Cafe source GC `1933:2` → hidden rollback
- Cafe adopted GH `1947:2`, Cafe page `1947:3`
- Story source FR `1904:18` → hidden rollback
- Story adopted GI `1950:2`, Story page `1950:3`

Drive authority re-read:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- new Drive saves: 0
- generated asset adoption: 0

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GH-GI-READER-FACING-EDITORIAL-NOTES-QA-2026-08-20.md`
- feedback append: `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gh-gi-reader-facing-editorial-notes.md`

## Adopted / rejected / blocked status

- GH: ADOPTED / VERIFIED_LOCAL
- GI: ADOPTED / VERIFIED_LOCAL
- no transport/generation blocker involved

## What must remain Rurubu-specific

Do not transfer:

- Cafe picks wording
- Story scene wording
- Japanese travel-magazine grammar
- exact bilingual ratio
- magenta/cyan/yellow palette
- coordinates, scale, photo choices, page composition or current production state

## Cross-item applicability hypothesis

Another item may independently test this method if a small support region looks like internal category labels or generic template microcopy. Transfer only the diagnostic and QA method: ask whether the wording is for the reader or for the maker, then test a native reader-facing replacement in a rollback-safe role.

Do not apply when the text is factual, accessibility-critical, legally/physically required, true navigation, brand language, or intentionally bilingual.

## Failure fingerprint

`GENERIC_ROLE_MICROCOPY_READS_AS_AUTHORING_TEMPLATE`

Stop condition: if replacing the role labels reduces clarity, factual precision, identity, navigation or physical-function comprehension, reject the rewrite and keep/rework the original function instead of forcing reader-facing prose.
