# RURUBU V6 AC + DC/DB — Q&A photo integration QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / DC_PREFERRED / V7_HOLD / NOT_PRINT_READY`

## Authority read before test

- live Figma is the highest authority;
- GitHub current status before this test: Outer AC `1614:2` + Profile/Q&A DA `1612:2` + Story/chronology DB `1615:2`;
- Drive V6 root read back live: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- project-wide shared learning + Rurubu feed + neutral non-Rurubu feed + hybrid-authoring policy were read before any write;
- V7 remained HOLD and no non-Rurubu item-specific state was inspected or edited for design input.

## Visible problem

DA's Q&A page was structurally safe but Q02/Q03 still floated on the cream background between the upper memory hero and lower dining photo. At whole-spread scale this read as two small form-like question modules placed in leftover space rather than a deliberate travel-magazine editorial beat.

## Root-cause hypothesis

The defect was not missing decoration or missing imagery. Q02/Q03 already had valid native copy and a valid replaceable memory photo directly below them, but those roles were visually separated. Binding the two secondary questions to that existing photo should increase editorial continuity without creating another card grid or rasterizing variable copy.

## Bounded test

Rollback-safe duplicate from DA:

- study / final candidate: `1618:2`;
- Q&A page: `1618:42`;
- old DA `1612:2` was left untouched during comparison;
- lower replaceable memory photo kept the same `455×370` geometry and existing image source/hash, but moved from `y=610` to `y=492`;
- one bounded functional navy strip `455×112` was placed over the top of that photo;
- Q02 and Q03 remained native Figma text and were moved into the strip as two compact editorial columns;
- Q02 cyan and Q03 yellow number hierarchy was retained;
- question/answer copy became white native text for photo-strip contrast;
- Q04/Q05/Q06, upper hero, Profile page, route texture, image hashes and all other content were preserved;
- no new generated asset, Drive save or external binary placement was used.

## Expected improvement

- remove the floating-form impression around Q02/Q03;
- create a direct reading sequence from upper hero → Q02/Q03 photo beat → Q04 → Q05/Q06;
- keep the lower dining image replaceable;
- keep all variable Q&A copy native and editable;
- avoid adding a repeated card system.

## Regression risks

- the dark binding strip could become UI-like if repeated elsewhere;
- narrowed Q02/Q03 columns could fail with realistic Japanese answer length;
- moving the photo upward could collide with Q04 or reduce breathing room;
- overlay contrast could fail at actual size.

The strip is therefore a local role treatment, not a new Rurubu-wide visual motif.

## Three-scale evidence

### Whole item / thumbnail

`1618:2` at 500×354: PASS.

Q02/Q03 now read as one secondary photo-supported beat instead of two isolated question blocks. Profile balance remains unchanged.

### Reading scale

`1618:2` at 900×637: PASS.

The new beat bridges the upper memory hero and lower half without competing with Q04's larger yellow feature treatment.

### Actual size

Q&A page `1618:42` at 794×1123: PASS.

- native visible text count: 26;
- text-to-text collisions: 0;
- 18px text safe-area risks: 0;
- Q02/Q03 remain legible over the bounded navy strip;
- photo remains independently replaceable;
- Q04/Q05/Q06 remain visually and structurally unchanged.

## Realistic-copy stress

Hidden proof: `1619:2 / PROOF / V6_INSIDE_DC_QA_Q02_Q03_LONG_COPY_2026_08_17`.

Stress answers:

- Q02: `何でも一緒に楽しんでくれて、困った時に自然に支えてくれるところ。`;
- Q03: `旅行の計画を立てながら、行きたい店や景色を相談している時間。`.

Both answers were native `HEIGHT` auto-resize text and reached 39px natural height.

Result:

- text collision count: 0;
- 18px safe-area risk count: 0;
- page overflow: 0.

Proof was hidden after verification.

## Adoption

After visual + structural QA:

- `1618:2` renamed to `PREFERRED / V6_INSIDE_DC_QA_PHOTO_INTEGRATED_2026_08_17`;
- DA `1612:2` renamed to rollback and hidden;
- Start Here updated to `V5 FU/FX · V6 AC + DC/DB INSIDE STUDIES · V7 HOLD`;
- live readback confirms the only visible V6 preferred set is AC `1614:2`, DB `1615:2`, DC `1618:2`.

## Asset lifecycle truth

- newly generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- replaceable photo geometry resized: 0;
- existing replaceable photo repositioned: YES;
- new functional native geometry: 1 bounded navy binding strip;
- variable copy remains native: YES;
- screenshot / actual-size QA: PASS;
- realistic-copy stress: PASS;
- rollback preserved: YES;
- V7 touched: NO.

## Decision

`DC VERIFIED_LOCAL / PREFERRED`.

Do not generalize the exact navy strip, coordinates, colors, question hierarchy or photography outside Rurubu. The transferable candidate principle is only that repeated secondary copy may be bound to an already-valid photo anchor instead of being left as floating form-like modules, provided actual-size contrast and realistic long-copy stress both pass.
