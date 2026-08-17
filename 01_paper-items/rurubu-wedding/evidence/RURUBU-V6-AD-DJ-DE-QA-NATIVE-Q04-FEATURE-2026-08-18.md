# Rurubu WEDDING V6 — AD + DJ/DE QA evidence

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Live preferred set after this experiment

- Outer AD `1626:99` — unchanged preferred.
- Profile / Q&A DJ `1640:2` — promoted preferred.
- Story / chronology DE `1624:18` — unchanged preferred.
- Start Here: `V5 FU/FX · V6 AD + DJ/DE INSIDE STUDIES · V7 HOLD`.

Rollback / comparison:

- DH `1635:2` — hidden rollback after DJ promotion.
- DI `1639:2` — hidden rejected comparison.
- DJ long-copy proof `1641:2` — hidden after PASS.

## Visible problem

DH was already structurally sound, but Q04 remained visually stranded in the large cream field to the right of the second memory photograph. The page still had a small amount of questionnaire/template rhythm in its middle section.

## Root-cause hypothesis

The issue was not missing decoration. Q04 needed stronger native typographic hierarchy. The existing composed route texture partially filled the area but also contributed generic scrapbook atmosphere without solving Q04's editorial role.

## Bounded experiments

### DI — texture subtraction only

- duplicated DH safely;
- hid only `DECOR / QA_ROUTE_TEXTURE_COMPOSED_RASTER`;
- changed no image source/hash, photo geometry, Q&A copy, or other page.

Result: cleaner, but Q04 became too quiet and floated in empty cream space. `REJECTED`.

### DJ — native Q04 feature

Starting from DI:

- kept the route texture hidden;
- kept photos replaceable and unchanged;
- enlarged native Q04 ordinal to 64px;
- strengthened the native Q04 question to 23px;
- kept the answer native/auto-height;
- added only a small native-text editorial kick, `NEXT TRIP / FEATURE`;
- added no new Figma decoration geometry, raster bytes, Drive asset, generated asset, or image hash.

Result: Q04 now reads as a deliberate second feature beat rather than leftover form copy. `VERIFIED_LOCAL / PREFERRED`.

## Three-scale / structural QA

DJ:

- whole spread at 1200px render: PASS;
- Q&A actual-size `1640:42` at 794×1123: PASS;
- visible native Q&A text: 27;
- text-to-text collision count: 0;
- 18px text safe-area risk: 0;
- page overflow: 0.

## Realistic-copy stress

Hidden proof `1641:2` used:

- question: `これからふたりで、いちばん挑戦してみたいことは？`
- answer: `まだ行ったことのない国内外の街を少しずつ巡って、その土地のごはんや景色をふたりで楽しみたい。`

Natural-height readback:

- Q04 question: 112px;
- Q04 answer: 56px;
- text collisions: 0;
- 18px safe-area risk: 0;
- actual-size visual readback: PASS.

The preferred DJ keeps the shorter dummy wording but has now been stress-verified for materially longer native copy.

## Asset lifecycle truth

- newly generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- photo geometry changed: 0;
- variable copy remains native: YES;
- rollback preserved: YES;
- V7 touched: NO.

Drive V6 root was re-read live before the experiment:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL(DI rejected, DJ tested) → VERIFIED_LOCAL(DJ) → CROSS_ITEM_CANDIDATE`

Rurubu-specific type sizes, English kick wording, coordinates, colors, photos and Q&A copy must not transfer. The transferable candidate principle is only: when subtraction exposes an overly quiet repeated-information region, strengthen the semantic native-text hierarchy before restoring decorative texture or adding a new card system.

## Completion truth

V6 remains `NOT_PRINT_READY`. Final photography, final personal copy, exact printer template, PDF preflight and physical proof remain separate gates.