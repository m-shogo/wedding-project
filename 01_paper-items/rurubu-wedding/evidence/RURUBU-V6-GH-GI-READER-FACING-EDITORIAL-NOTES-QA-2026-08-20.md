# Rurubu WEDDING V6 — GH / GI Reader-Facing Editorial Notes QA

Date: 2026-08-20
Scope: `01_paper-items/rurubu-wedding` only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
Start GitHub authority: `ac7166b36fadbb2044ea1541c921a97ca35eb9b3`

## Read-before-write authority

Before production writes this run re-read:

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/rurubu-shared-learning-feed.md`
- `docs/design-learning/non-rurubu-shared-learning-feed.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- live `00_RURUBU_START_HERE / 845:2`
- Drive V6 root above

No non-Rurubu item-specific Figma, Drive, ledger, asset, or GitHub production path was inspected or modified.

## Starting live preferred set

- Outer GB `1929:2`
- Profile / Q&A GA `1922:2`
- Story / chronology FR `1904:18`
- Memory Spots GE `1941:2`
- Cafe / Table GC `1933:2`
- 1DAY Plan GD `1938:2`
- V7: HOLD

## Experiment A — Cafe microcopy density

### Visible problem

GC Cafe left page had a useful composed travel-note field, but the upper-right `4 NOTES` cluster was split into four small generic metadata strings (`SWEETS / MOOD / PHOTO / TALK`). At reading and actual-size scales the cluster felt closer to authoring/template microcopy than a reader-facing travel-guide feature.

### Root-cause hypothesis

The problem was not insufficient photography. The field already had enough visual material; its information mass was simply too fragmented and generic. Converting the same area into a short, specific, readable native list could improve editorial utility without adding a card, image, generated asset, or new decorative system.

### Bounded test

Rollback-safe candidate GH duplicated GC and changed only the existing Cafe info text roles:

- `TEXT / CAFE_INFO_KICK` → `CAFE CHECK / 3 PICKS`
- item 01 → `01  午後の光がやわらかい席`
- item 02 → `02  窓ぎわでゆっくり話せる`
- item 03 → `03  食後に海まで歩ける`
- old fourth item hidden
- item size raised to 15px for actual-size readability

No photo, image hash, composed raster, Page geometry, Table page, or final replaceable-image behavior changed.

### Expected improvement

Make the travel-note field feel like a compact magazine recommendation instead of metadata scattered to fill space.

### Regression risk

Over-condensing could remove real facts, or an oversized checklist could compete with `01` and the main Cafe headline. Therefore the treatment is limited to non-factual editorial support copy and was checked at three scales.

### Evidence

Figma:

- old GC: `1933:2` → hidden rollback
- adopted GH: `1947:2`
- Cafe page: `1947:3`

Three-scale QA:

- whole spread / ~500px: PASS
- reading spread / 1200px: PASS
- Cafe actual-size `794×1123`: PASS
- visible Cafe text collision: `0`
- 18px text safe-area risk: `0`

Result: `ADOPTED / VERIFIED_LOCAL`.

## Experiment B — Story scene note

### Visible problem

FR Story left page had a tiny `TRAVEL NOTE / 03 SCENES` block with English-heavy rows (`YOKOHAMA EVENING WALK / NEXT DESTINATION / CAFE MEMORY`). It was structurally correct but at actual size looked like production/template notation next to an otherwise strongly Japanese editorial page.

### Root-cause hypothesis

A small support list can remain useful while becoming more reader-facing if the final labels describe the actual scenes in concise native Japanese rather than generic English role names.

### Bounded test

Rollback-safe GI duplicated FR and changed only the existing scene-note text roles:

- kicker → `旅メモ / 3 SCENES`
- scene list →
  - `01  横浜の夕暮れ`
  - `02  次の目的地へ`
  - `03  休日のカフェ`
- list size raised to 14px

All Story photography, chronology right page, image hashes, crop roles, main title/body, composed texture and V7 remained unchanged.

### Expected improvement

Reduce AI/template-production wording and let the support note read as a small magazine sidebar that a guest can understand.

### Regression risk

Generic-English removal must not become a rule to eliminate intentional bilingual art direction. Only microcopy with no brand, fact, navigation or production necessity should be rewritten.

### Evidence

Figma:

- old FR: `1904:18` → hidden rollback
- adopted GI: `1950:2`
- Story page: `1950:3`

Three-scale QA:

- whole spread / ~500px: PASS
- reading spread / 1200px: PASS
- Story actual-size `794×1123`: PASS
- visible Story text collision: `0`
- 18px text safe-area risk: `0`

Result: `ADOPTED / VERIFIED_LOCAL`.

## Asset lifecycle

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- native variable text preserved: YES
- replaceable photos preserved: YES
- rollback states preserved: YES
- V7 touched: NO

Drive V6 root was re-read during the run; stored Profile / Q&A / Timeline / Memories generated masters remain stored and unadopted.

## Learning state

`RSL-137 — VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Transferable hypothesis: when a small support area reads as generic role-name metadata or authoring/template microcopy, first test replacing it with a compact reader-facing native editorial list before adding cards, pictures, or decoration.

Must remain Rurubu-specific: the three Cafe picks, Story scene wording, Japanese travel-magazine grammar, palette, exact coordinates, photo choices, issue hierarchy, and typography scale.

## Result

`V6_GH_GI_ADOPTED / THREE_SCALE_QA_PASS / NATIVE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / NO_NEW_ASSET / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`
