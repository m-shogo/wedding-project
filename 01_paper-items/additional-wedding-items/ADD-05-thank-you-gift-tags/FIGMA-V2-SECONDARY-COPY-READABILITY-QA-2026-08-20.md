# ADD-05 サンキュータグ V2 — Secondary Copy Readability QA

Status: `ADOPTED / VERIFIED_LOCAL / ACTUAL_SIZE_READABILITY_HARDENED / LEGACY_PRESERVED`
Date: 2026-08-20
Start authority SHA: `f76136fbb4a57cce14915c164d3eb3fa283b640d`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected 50×80 front: `9:2`
- selected 50×80 optional back: `9:13`
- selected 45×70 front reflow: `9:20`
- Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- retained legacy remains `1:2 / 1:12 / 1:19`

## Visible problem

Fresh native-size review showed that the selected clean-room V2 hierarchy was already strong, but the smallest meaningful reader-facing copy was visually fragile at physical tag scale:

- 50×80 front date: `18px`;
- 50×80 back date: `17px`;
- 45×70 front date: `16px`;
- front support line `for traveling with us.`: `23px` on 50×80 and `20px` on 45×70.

The problem was not missing decoration or imagery. Thumbnail/read scale naturally emphasized the large serif headline and punch composition, while the date/support copy remained too fine at actual size.

This locally applies the already `VERIFIED_CROSS_ITEM` non-Rurubu lesson `Actual-size QA must audit the smallest reader-facing copy`; it does not import another item's sizes or visual style.

## Bounded test

Rollback-safe comparison clones were created from the current selected roots only:

- `19:2 / QA_ADD05_50X80_SECONDARY_READABILITY_2026-08-20`
- `19:12 / QA_ADD05_BACK_50X80_DATE_READABILITY_2026-08-20`
- `19:19 / QA_ADD05_45X70_SECONDARY_READABILITY_2026-08-20`

Tested changes:

### 50×80 front
- `TXT_THANK_YOU_SECONDARY`: `23 → 25px`
- `TXT_DATE`: `18 → 22px`

### 50×80 optional back
- `TXT_DATE`: `17 → 22px`

### 45×70 front reflow
- `TXT_THANK_YOU_SECONDARY`: `20 → 23px`
- `TXT_DATE`: `16 → 20px`

No punch geometry, headline, lower journey line, paper field, text wording, or physical clearances changed.

## Comparison result

The larger support/date copy remained visually subordinate to the main headline but became materially easier to read at the real tag size. The change did not flatten the hierarchy or force wrapping.

The comparison was therefore adopted in the selected clean-room roots.

## Adopted Figma change

Selected roots updated:

- `9:2`
  - `9:8 / TXT_THANK_YOU_SECONDARY`: `25px`
  - `9:11 / TXT_DATE`: `22px`
- `9:13`
  - `9:19 / TXT_DATE`: `22px`
- `9:20`
  - `9:26 / TXT_THANK_YOU_SECONDARY`: `23px`
  - `9:29 / TXT_DATE`: `20px`

Pre-change hidden rollbacks:

- `20:2 / ROLLBACK_ADD05_50X80_BEFORE_SECONDARY_READABILITY_2026-08-20`
- `20:12 / ROLLBACK_ADD05_BACK_50X80_BEFORE_DATE_READABILITY_2026-08-20`
- `20:19 / ROLLBACK_ADD05_45X70_BEFORE_SECONDARY_READABILITY_2026-08-20`

Comparison clones `19:2 / 19:12 / 19:19` were hidden after adoption.

## Three-scale QA

- whole-item / reduced view: PASS; punch → headline → support → line/date hierarchy remains intact;
- reading scale: PASS;
- actual-size: PASS at native `500×800`, `500×800`, and `450×700`.

Post-change structure readback:

### `9:2`
- native text: `3`
- IMAGE fill nodes: `0`
- outside visible text: `0`
- text-to-text collisions: `0`
- visible proof-language: `0`

### `9:13`
- native text: `2`
- IMAGE fill nodes: `0`
- outside visible text: `0`
- text-to-text collisions: `0`
- visible proof-language: `0`

### `9:20`
- native text: `3`
- IMAGE fill nodes: `0`
- outside visible text: `0`
- text-to-text collisions: `0`
- visible proof-language: `0`

## Hybrid authoring / asset decision

- reader-facing copy remains native Figma text;
- no SVG change required;
- no replaceable image role involved;
- no raster/generated asset required;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the concrete bottleneck was actual-size typography, not missing visual material.

## Deferred finalization

Physical punch/attachment proof, stock, final printer profile/template, gift/package dimensions and final approved copy remain `NOT_PRINT_READY` inputs. This visual/readability hardening does not claim those gates are complete.

## Learning state

`VERIFIED_LOCAL` for ADD-05. No new shared-learning entry is required because this is a direct receiving-item verification of an existing `VERIFIED_CROSS_ITEM` method rather than a new principle.
