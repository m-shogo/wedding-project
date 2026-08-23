# RSL-244 — Quiet Cafe spread solves photo absence with a centered banner module

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V8 Cafe+Table
State: `TESTED_LOCAL`
Failure fingerprint: `F-RSL-244-QUIET-CAFE-SPREAD-SOLVES-PHOTO-ABSENCE-WITH-CENTERED-BANNER-MODULE`

## Visible problem

V8 Cafe/Table AS2 `2325:2` had coherent native Japanese typography and content-owned sensory rhythm but no visible photography. At whole-item scale the spread became more abstract than its food/table/place editorial role justified.

## Root-cause hypothesis

A restrained spread can require direct visual evidence without needing more decoration. However, simply inserting a photo as a mechanically centered horizontal banner can convert semantic absence into generic module grammar rather than editorial design.

## Bounded experiments

### AS3 — rejected

- root `2355:2`
- one existing Rurubu structural dining dummy
- `560×210`, centered-strip-like placement
- factual/native copy unchanged

Result: image evidence improved, but thumbnail/reading review showed a timid centered banner that looked template-like and visually detached from the spread's authored rhythm. AS3 was hidden as rejected evidence rather than cosmetically polished.

### AS4 — corrected local test

- root `2355:27`
- photo role `2355:51 / PHOTO_DUMMY / CAFE_TABLE_DINING_ESSAY_REPLACEABLE / NOT FINAL`
- existing structural hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- `500×330` at `x=930 / y=405`
- existing close moved to follow the photograph
- left page remains typographic; right page gets one role-owned dining observation
- no new card, badge, gradient, sticker, decorative English, collage grammar or factual copy

## Evidence

Three-scale design QA for AS4:

- whole-item / 500 px: PASS and stronger than AS2/AS3 within V8
- reading / 1200 px: PASS
- actual-size / `1587×1123`: PASS for DESIGN QA
- native visible text `13`
- visible IMAGE `1`
- text intersections `0`
- bounded 18 px safe risks `0`
- Japanese font mismatches `0`
- accidental explicit one-character lines `0`
- kinsoku probe findings `0`

Figma state after promotion:

- AS4 `2355:27`: current / visible at `x=1800 / y=9850`
- AS2 `2325:2`: hidden rollback at `x=300000`
- AS3 `2355:2`: hidden rejected evidence at `x=300000`

Detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-CAFE-AS4-ASYMMETRIC-DINING-PHOTO-ESSAY-QA-2026-08-23.md`.

## Professional-research observation vs project learning

Fresh professional research on photo editing and editorial pacing informed the test: select imagery for a story role, then let design respond to it; avoid monotonous repeated presentation; sequencing and placement change photographic meaning. These observations are not themselves project rules.

The local project learning is narrower: **when a restrained editorial page genuinely needs visual evidence, test whether the photograph owns a semantic beat and changes page rhythm. Reject default centered-banner insertion when it reads like reusable module grammar.**

## Regression risk

- asymmetric placement without content ownership can become fake sophistication;
- one-photo minimalism can become empty luxury if the page role needs more information;
- a strong dummy can conceal semantic or print-resolution failure;
- the literal ratio/position must not become a template signature across spreads.

## Asset truth / promotion boundary

The test used an existing Rurubu structural dummy, not legitimate final photography. No image generation, Drive write, new image hash or factual copy occurred. Under the current unverified physical assumption, the dummy is only about `140–145 ppi` in this role, so REAL CONTENT and PRINT QA remain blocked.

Therefore RSL-244 stays `TESTED_LOCAL`. It may move toward `VERIFIED_LOCAL` only if a legitimate role-specific dining/place image preserves the benefit without unacceptable semantic, crop, resolution or print regression.

## What must NOT transfer

Do not transfer V8's cream/navy palette, exact coordinates, one-photo count, dining image, Japanese copy, spread geometry or quiet monograph art direction to other wedding items.

## Cross-item hypothesis

On a materially different print artifact, if a visually quiet page needs an image, compare at least one obvious module-like insertion against a role-owned placement. Transfer the test method and anti-template diagnosis, not the V8 composition.
