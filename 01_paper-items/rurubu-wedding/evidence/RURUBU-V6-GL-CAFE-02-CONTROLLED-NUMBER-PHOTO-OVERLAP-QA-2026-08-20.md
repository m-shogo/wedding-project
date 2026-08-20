# RURUBU V6 GL — Cafe 02 Controlled Number/Photo Overlap QA — 2026-08-20

## Scope

Rurubu WEDDING only. V7 remained HOLD. No non-Rurubu wedding item-specific Figma, Drive, ledger, asset, or GitHub path was inspected or mutated.

## Source problem

Cross-spread structural QA after HA promotion found one remaining visible text-text collision in current preferred V6: GK Cafe left page `1991:3` had `TEXT / VIEW_NUM` (`02`) overlapping `TEXT / VIEW_TITLE` (`景色まで、\nごちそう。`) by `12×62px`.

The visual composition was close enough that the defect was easy to miss in a thumbnail, but the actual text bounds were not production-safe.

## Bounded rollback-safe test

GL `2000:2` duplicated GK `1991:2` and changed only the native `02` ordinal position:

- `TEXT / VIEW_NUM`: x `224 → 202`, y unchanged `590`, size unchanged `120×92`, font size unchanged `88`;
- verified replaceable view photo remained `238×218`, image/hash unchanged;
- title, body, metadata, Cafe Check, closing copy, composed texture, Table page, all image geometry and all other text remained unchanged.

Instead of pushing the title farther right and weakening the text column, the number was moved deeper onto the already legitimate view photograph. This increased the intentional number/photo overlap from 40px to 62px while creating a clean gap before the title.

## Three-scale visual QA

- whole spread / ~900px: PASS; `02` reads more intentionally as a photo-bound editorial ordinal;
- reading / 1200px equivalent: PASS;
- Cafe actual size `2000:3 / 794×1123`: PASS; `02` remains legible over the source-safe view photograph and the title has clear separation.

## Structure QA

- Cafe visible native text: `20`;
- visible text-text collisions: `0`;
- 18px text safe-area risks: `0`;
- `02` number/photo horizontal overlap: `62px`;
- view photograph remains independently replaceable and source/hash unchanged.

A final all-six-preferred cross-spread structure readback after GL promotion reports:

- every preferred page text collisions: `0`;
- every preferred page 18px text safe-area risks: `0`;
- implementation/proof/placeholder leakage: `0` visible hits;
- visible IMAGE roles: `29`;
- unique image hashes: `8`.

## Promotion / rollback

- preferred: GL `2000:2`;
- Cafe page: `2000:3`;
- hidden rollback: GK `1991:2`;
- Start Here `845:27`: `V5 FU/FX · V6 GU + HA/GW + GV MEMORY SPOTS + GL CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Asset lifecycle

- generated this run: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- image geometry changed in GL: `0`;
- native text editability preserved: YES;
- replaceable-photo structure preserved: YES;
- rollback preserved: YES;
- V7 touched: NO.

## Drive evidence

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02` re-read after GL promotion.

## Completion state

`VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / NOT_PRINT_READY`. Final photography, final copy, final page count/imposition, exact printer template, PDF preflight, and physical proof remain open.
