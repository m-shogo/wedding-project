# Rurubu WEDDING V7 — Profile+Q&A J semantic-grouping QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
GitHub main observed before Git write: `1764373cc78915220790390ba84f258dd0e054d8`
State: `TESTED_LOCAL / STUDY CANDIDATE / NOT PREFERRED / NOT PRINT READY`

## Authority and scope truth

- V6 control `JC + IX + JB + IZ + IT + JA` was not modified.
- V8 current `AV + AW + AL + AQ + AS + AT` was not modified.
- Live V7 now has all six comparable study roles after the Memory G + Cafe H work merged in PR #170.
- WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ and ADD items were not touched by this Rurubu work.
- V7 Drive authority search found `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`; no child files were observed in this run.

## Fresh design decision

The existing Profile E `2059:50` had already removed card containers, but its six profile facts still behaved like a database/dashboard: six equal numbered entries arranged as a regular 2×3 information grid. The layout was readable, yet the semantic difference between basic facts, interests, routine and personality was visually suppressed.

This run deliberately did **not** rasterize the Profile title simply because fixed-title graphics worked elsewhere. Instead, the higher-value defect was the information architecture below it. This is a theme+variation check against turning RSL-227 into a new repeated template.

Fresh Japanese editorial/type research was used as a decision input: authored display type can carry identity, but the useful professional principle is role ownership and controlled variation, not decorating every heading. Therefore the Profile opener stayed native while the fact structure changed.

## Candidate

Source:
- `2059:50 / V7 PRO STUDY E / HAWAII POP EDITORIAL / PROFILE + Q&A / STRUCTURAL PHOTO DUMMIES / PHOTO_BOUND_Q04`.

Rollback-safe candidate:
- `2301:2 / V7 PRO STUDY J / HAWAII POP EDITORIAL / PROFILE+Q&A / SEMANTIC GROUPING / TESTED_LOCAL / STRUCTURAL PHOTO DUMMIES / 2026-08-23`;
- parent: `2052:2`;
- source E remains untouched.

Changes:
- `PROFILE / ISLAND NOTES` → `ふたりのプロフィール`;
- `Q&A / 6 QUESTIONS` → `ふたりに、6つの質問。`;
- `6 NOTES` → `ふたりを知る、6つのこと。`;
- the six left-page numeric markers were hidden;
- all six factual values were preserved exactly;
- basic facts (`出身地 / 神奈川県`, `誕生日 / 1991年`) remain compact near the top;
- `趣味 / 旅行・写真・映画` becomes the strongest middle interest beat;
- `休日 / 散歩してカフェ巡り` is offset as a supporting routine beat;
- `好きなもの / カフェ・スイーツ` and `チャーム / 笑顔` form the lower personality close;
- Q&A numbering and existing photo hierarchy remain intact;
- all visible photos remain structural dummies / NOT FINAL HAWAII.

No new card, pill, badge, shadow, gradient, decorative English or generated image was added.

## Failure and correction

Initial structure QA found one invisible-but-real text-box intersection between the basic values `神奈川県` and `1991年`. The visible glyphs did not collide, but the text boxes overlapped because both inherited unnecessarily wide widths.

The candidate was not accepted in that state.

Correction:
- `神奈川県` box narrowed to `175×30`;
- `1991年` box narrowed to `150×30`;
- visible hierarchy did not change;
- structure QA rerun: intersections `0`.

This is a small production reminder: visual separation is not a substitute for structural box separation when the document will be edited later.

## Three-scale QA

- whole-item / 500 px: **PASS** — the left information area no longer reads as six equal database records; photo/coral opener remains the main entry.
- reading / 1400 px: **PASS** — basic facts, interests and personality read in distinguishable groups without card grammar.
- actual-size / 1587×1123: **PASS** — Japanese copy is legible, no accidental wrap or visible collision after the box-width correction.

Final structure readback:
- visible native text: `34`;
- visible photo/image roles: `5`, all structural dummies;
- unintended text-box intersections: `0`;
- 18 px text safe-area risks: `0`;
- unintended explicit one-character Japanese lines: `0`;
- parent page: `2052:2`.

## Professional critique

- art director: PASS — the page personality still comes from the photo/coral opener rather than new decoration.
- editorial designer: PASS — fact hierarchy now follows semantic grouping rather than equal database slots.
- book designer: PASS — this adds a quieter information rhythm that differs from the fixed-display Story/Memory/Cafe roles.
- typographer: PASS — all factual copy remains native and exact; generic English furniture was removed.
- photo editor: unchanged / not final — all photos remain structural dummies.
- print designer: design-QA PASS only; final copy/photos, printer template, preflight and physical proof remain open.

## Asset truth

- image-model generation: `0`;
- Drive new masters: `0`;
- Figma new fixed raster graphics: `0`;
- final Hawaii photography: `0`;
- V6/V8 changes: `0`.

## Decision

`TESTED_LOCAL`.

J is a stronger comparison candidate than E for the information-architecture hypothesis, but it is not promoted as final/preferred and does not prove V7 the global winner. The useful learning is not “make profile facts asymmetrical”; it is to group biographical information by semantic job before defaulting to equal numbered modules.
