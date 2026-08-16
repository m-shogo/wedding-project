# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_T_CURRENT / INSIDE_BG_BE_PREFERRED_STUDIES / T_PHOTO_LED_BACK_COVER_VERIFIED / BG_QA_EDITORIAL_BEATS_AND_LONG_COPY_STRESS_VERIFIED / BE_CHRONOLOGY_MAJOR_MINOR_EDITORIAL_CLUSTER_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 T + BG/BE INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer T `1447:2 / PREFERRED / V6_OUTER_T_PHOTO_LED_BACK_COVER_2026_08_16`
- Profile / Q&A BG `1439:58 / PREFERRED / V6_INSIDE_BG_QA_EDITORIAL_BEATS_2026_08_16`
- Story / chronology BE `1433:2 / PREFERRED / V6_INSIDE_BE_CHRONOLOGY_EDITORIAL_CLUSTER_2026_08_16`

Preserved rollback/evidence:

- Outer S `1439:2` — hidden rollback before T.
- Profile/Q&A BF `1436:56` — hidden rollback before BG.
- BG long-answer proof `1441:2` — hidden after PASS.
- profile long-value proof `1431:2` remains valid because T did not change Profile geometry.
- V7 remains HOLD.

## Outer T

T changes only the back-cover macro-composition. Front remains the previously verified S front.

### Back-cover change

Visible problem in S: the back read as `photo block → beige timeline section`, weaker than the photo-led front.

T bounded test:

- verified flatlay hash `e3738476f760932bb5b09c9d60f174dd6c84049d` expanded to full back width `793.7×490`; registered intrinsic `944×608`, therefore intrinsic-safe;
- existing navy field moved from right-side column to compact top-left photo overlay `305×265`, opacity `0.93`;
- native title/kicker/subline retained; first-pass subline/title collision was corrected before promotion;
- café image hash `c1ada11205bc3978bf426b304d683f1c1566cac2` → `430×270`, rotation `-2.2°`;
- skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042` → `232×210`, rotation `2.4°`;
- native `みんなとの思い出`, chronology facts and final `2026.10.24 / WEDDING` field retained;
- no new card, sticker, gradient, shadow, generated decoration, image asset, or binary transport.

Final back verification:

- visible native text `18`;
- replaceable IMAGE roles `3`;
- text/text collision `0`;
- 18px text safe-area risk `0`;
- 500px whole-item PASS and preferred over S;
- 900px reading-spread PASS;
- actual-size back `1447:3 / 794×1123` PASS.

Evidence:

- `RURUBU-V6-T-BG-BE-PHOTO-LED-BACK-QA-2026-08-16.md`
- `RURUBU-V6-T-BG-BE-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`.

## Profile / Q&A BG

Unchanged from the verified S + BG/BE pass.

Profile:

- native text `17`;
- replaceable IMAGE roles `4`;
- text/text collision `0`;
- unintended text/image collision `0`;
- 18px safe-area risk `0`;
- realistic profile long-value proof `1431:2` remains valid.

Q&A:

- native text `25`;
- replaceable IMAGE roles `2`;
- text/text collision `0`;
- unintended question/image collision `0`;
- 18px safe-area risk `0`;
- whole/read/actual-size visual QA PASS;
- dedicated long-answer proof `1441:2`: PASS and remains valid because T did not change BG geometry/type.

## Story / chronology BE

BE remains preferred and unchanged:

- Story native text `11`, replaceable IMAGE roles `3`, collision `0`, safe-area risks `0`;
- chronology native text `32`, replaceable IMAGE roles `6`, collision `0`, safe-area risks `0`;
- `01 / 03 / 05` major milestones, `02 / 04` support beats, WEDDING terminal field;
- chronology facts remain native/editable.

## Drive / generated section masters

Fresh Drive readback in this run confirms V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- generated masters remain registered as Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`, Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`, Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`, Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

No generated section master was adopted in this pass. Known unchanged boundary remains:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED / NO_NEW_GENERATED_SECTION_DECORATION_ADOPTION`.

Do not retry the unchanged failing submit method without a material capability/environment change.

## Asset lifecycle truth of latest pass

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified Figma image hashes reused: `YES`
- replaceable photo roles preserved: `YES`
- native editable copy preserved: `YES`
- generated/fixed section decoration adopted: `NO`
- whole/read/actual-size visual verification: `YES`
- structure/safe-area verification: `PASS`
- rollback comparison preserved: `YES`
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- T + BG/BE cohere with final real content as one magazine system;
- real photography and final copy replace dummy content and crop/contrast/text stress are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 T + BG/BE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Review T + BG/BE together at thumbnail scale; prioritize remaining magazine-system incoherence over decoration count.
3. Re-run profile value stress only if Profile geometry changes.
4. Re-run Q&A answer stress whenever Q&A geometry or type size changes.
5. Replace dummy photography only when actual-size visual quality and story semantics are clearly stronger.
6. Keep final print/template/PDF/physical-proof gates separate from dummy-design QA.
