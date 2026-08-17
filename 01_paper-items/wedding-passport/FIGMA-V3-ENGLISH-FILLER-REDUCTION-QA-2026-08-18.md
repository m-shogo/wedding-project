# WEDDING PASSPORT — V3 decorative English filler reduction QA

Date: 2026-08-18
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ENGLISH_FILLER_REDUCTION_ADOPTED / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `22315c917ac55f777fbaa10356486d473a343f4f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected V3 front: `144:3 / V3 / FRONT / ARCHIVAL PORT LOG`
- selected V3 back: `144:26 / V3 / BACK / ARCHIVAL END NOTE`
- selected family remains V3 front/back + V2 menu `138:43` + V2 seating `138:89`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production: unchanged

## Visible issue

Fresh 500 px review found three tiny English lines that had no required factual or navigation role and read as template-like transport/editorial filler rather than useful passport content:

- front `TEXT / NOTE`: `ISSUED FOR ONE DAY, KEPT FOR THE JOURNEY.`
- back `TEXT / ROUTE SUB`: `CEREMONY → RECEPTION → NEXT JOURNEY`
- back `TEXT / FOLIO`: `END OF TODAY / BEGINNING OF TOMORROW`

The artifact identity `WEDDING PASSPORT`, the actual date/location line, Japanese headline/body, page index, semantic placeholders and route artwork already provide the intended role. Current explicitly asks to reduce excessive decorative English and fake transport metadata when they do not serve the artifact.

## Bounded comparison

Rollback-safe QA duplicates were created from the already-selected clean-room V3, not from legacy production:

- `155:44 / QA / PASSPORT V3 / REDUCE ENGLISH FILLER / FRONT / 2026-08-18`
- `155:69 / QA / PASSPORT V3 / REDUCE ENGLISH FILLER / BACK / 2026-08-18`

Only the three non-semantic English lines above were hidden. No Japanese copy, date, names, place, issue placeholder, index, route geometry, palette, typography, vector artwork, image role or physical geometry changed.

At 500 px the front keeps the same `10.24 → 旅の手帖 → route → page index` hierarchy with less decorative footnote noise. The back becomes materially cleaner in the dark lower field: `2026.10.24 / YOKOHAMA → route graphic → [発行情報]` remains, while the two invented narrative labels no longer compete with the closing message.

## Promotion / rollback

Before selected-node mutation, exact hidden rollbacks were created:

- `156:2 / ROLLBACK / PASSPORT V3 FRONT / PRE-ENGLISH-FILLER-REDUCTION / 2026-08-18`
- `156:27 / ROLLBACK / PASSPORT V3 BACK / PRE-ENGLISH-FILLER-REDUCTION / 2026-08-18`

The verified bounded change was promoted to selected V3:

- `144:25` hidden on front;
- `144:40` and `144:42` hidden on back.

QA candidates `155:44 / 155:69` and rollback copies remain hidden. Legacy production was not changed.

## Post-write QA

Fresh selected screenshots:

- whole/thumbnail 500 px front: PASS;
- whole/thumbnail 500 px back: PASS;
- reading/detail review: PASS; the lower back field reads more quietly and the front keeps its navigation/index role.

Structural readback:

- front `144:3`: visible native text 8; outside text 0; same-parent text collisions 0; IMAGE fills 0; removed filler retained only as hidden rollback-safe text;
- back `144:26`: visible native text 5; outside text 0; same-parent text collisions 0; IMAGE fills 0; removed filler retained only as hidden rollback-safe text.

No final/variable information was deleted or baked into graphics.

## Drive / generated asset decision

Drive authority was live-read before the write. New Drive assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the concrete defect was non-semantic decorative copy, not a missing hero, texture or illustration.

## Decision

`ENGLISH_FILLER_REDUCTION_ADOPTED`.

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Keep `NOT_PRINT_READY` until final names, menu/drink copy, seating assignments, issue information, printer/export conditions and physical proof are authoritative.