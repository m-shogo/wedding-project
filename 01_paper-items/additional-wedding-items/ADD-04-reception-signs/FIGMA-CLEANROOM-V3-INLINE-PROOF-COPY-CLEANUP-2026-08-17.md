# ADD-04 受付サイン — Clean-room V3 inline proof-copy cleanup

Status: `CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / INLINE_IMPLEMENTATION_SUFFIX_REMOVAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `0ef8821a2a15221f371ce542d4a251ca0315a3ce`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Shared lesson consumed: `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-17-nrsl-inline-implementation-suffix-removal.md` (`VERIFIED_CROSS_ITEM`)
- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- selected groom: `16:2 / CLEANROOM_V3_ADD04_GROOM_TYPO_BAND`
- selected bride: `16:17 / CLEANROOM_V3_ADD04_BRIDE_TYPO_BAND`
- hidden stress: `16:32 / 16:47`
- retained legacy production: `1:3 / 1:14` — unchanged
- Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

## Visible problem

Fresh live readback of the selected V3 pair showed internal authoring terminology still printed inside two legitimate unresolved semantic roles:

- `[お名前 · LAYOUT DUMMY]`
- `[方向 · LAYOUT DUMMY]`

The name and direction roles must stay unresolved/editable until authoritative values exist, but `LAYOUT DUMMY` has no guest-facing meaning and makes a tabletop sign read like a proof template.

## Rollback-safe change

Hidden rollback copies were created before mutation:

- groom rollback: `17:2 / ROLLBACK_ADD04_GROOM_V3_PRE_INLINE_PROOF_SUFFIX_REMOVAL_2026-08-17`
- bride rollback: `17:17 / ROLLBACK_ADD04_BRIDE_V3_PRE_INLINE_PROOF_SUFFIX_REMOVAL_2026-08-17`

Selected pair and long-copy stress clones were changed only at the lexical layer:

- `[お名前 · LAYOUT DUMMY]` → `[お名前]`
- `[方向 · LAYOUT DUMMY]` → `[方向]`

Stress phrases retained their intentionally long Japanese content while only removing the implementation suffix.

Affected selected nodes:
- groom `16:10 / 16:12`
- bride `16:25 / 16:27`

Affected stress nodes:
- groom `16:40 / 16:42`
- bride `16:55 / 16:57`

No approved reception-side label, date/location, band geometry, auto-layout relationship, typography, position or factual content changed.

## Visual QA

- groom whole/thumbnail: PASS — `新郎側受付` remains the immediate first read; `[お名前]` and `[方向]` remain clearly secondary and editable without proof-sheet language;
- bride native `740×1050`: PASS — `新婦側受付` remains dominant and the pair retains its opposite-edge typographic relationship;
- no card/dashboard containment, new decoration, generated imagery or rasterized copy was introduced.

## Structural readback

Selected groom `16:2`:
- `740×1050`;
- native text `7`;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`.

Selected bride `16:17`:
- `740×1050`;
- native text `7`;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`.

Stress `16:32 / 16:47`:
- native text `7` each;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`;
- retained hidden after QA.

The hidden rollback pair intentionally preserves the former `LAYOUT DUMMY` strings as rollback evidence.

## Hybrid authoring / Drive

- variable/unresolved roles remain native editable Figma text;
- existing adaptive name-field auto-layout remains unchanged;
- SVG/generated/raster asset: not required;
- Drive write: `0`;
- exact Drive authority was live-read before the Figma change.

## Decision

ADD-04 remains:

`CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / INLINE_IMPLEMENTATION_SUFFIX_REMOVAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

This is a bounded guest-facing lexical cleanup. Legacy production remains untouched.
