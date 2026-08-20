# Rurubu V6 HR — timeline photo-boundary experiment

Date: 2026-08-20
Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Visible problem

HJ timeline had a strong photographic hero but lower content still read as separate text and photo modules. The 03 travel photo sat fully inside the cream lower half, leaving a hard section boundary and preserving timeline-template rhythm.

## Principle / capability tested

Before adding another asset, rail or card, test whether an already legitimate replaceable photo can cross the hero/paper boundary and carry its own native milestone copy. Use unequal visual mass so 01/03/05/06 read as major beats while 02/04 stay subordinate.

## Expected improvement

- stronger photo-led continuity;
- less timeline/UI reading;
- clearer 01 → 03 → 05 → WEDDING hierarchy;
- no new asset dependency;
- native editability and photo replacement preserved.

## Regression risk

- overlaid 03 text could lose contrast;
- moving milestones inward could create text contacts or safe-area violations;
- larger visual responsibility on a photo must not exceed its source fidelity;
- too much overlap could reduce chronological readability.

## Bounded test / evidence

Created rollback-safe HR `2033:111` from HJ `2024:2`.

Changes limited to timeline right page `2033:137`:

- existing 03 photo kept at `350×260`, moved upward to overlap hero/cream boundary;
- native 03/title/copy moved onto photo;
- weak lower composed texture hidden;
- 01/02/04/05/06 native hierarchy redistributed;
- WEDDING rebuilt as the terminal page-width beat;
- small kicker/folio changed to native reader-facing Japanese after explicit font load.

Three-scale result:

- 1200px whole spread: PASS and visually preferred to HJ;
- page/reading: PASS;
- 794×1123 timeline actual size: PASS;
- text collision: 0 after correction;
- 18px text safe-area risk: 0;
- stray text: 0;
- new image hash: 0.

## Rejected / corrected states

- first character mutation failed because `Noto Sans JP Bold` had not been loaded; no partial candidate existed on readback;
- first successful geometry had 3 actual-size text contacts around 05 and 06, so it was not adopted;
- event 05 was moved/narrowed and WEDDING shifted before final promotion.

## Adopted state

HR `2033:111` preferred.
HJ `2024:2` hidden rollback.
Start Here: `V5 FU/FX · V6 HN + HK/HR + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`.

## Next application

Continue V6 only. Recompare all six live spreads at the same scale. Prefer photo responsibility + native Japanese hierarchy over additional cards/rails/assets when the existing source is semantically legitimate and actual-size QA remains clean.
