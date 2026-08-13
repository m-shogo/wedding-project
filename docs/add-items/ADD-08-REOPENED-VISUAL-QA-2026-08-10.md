# ADD-08 メニュー補助サイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main` = `bcf955b167eb1936929a15fda8a2754bca1acb95`; Current remains `VISUAL_REOPENED`.

## Live authority

- Figma file key: `xvJH23nWjWAApd3yOwr4y3`
- page: `01_PRODUCTION`
- production: `1:3 / FRAME_MENU_SUPPORT_A4`
- Drive folder: `ADD-08_メニュー補助サイン` / `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`
- prior structure authority retained: `docs/add-items/ADD-08-FIGMA-EDITORIAL-REFINEMENT-QA-2026-08-09.md`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The prior production was structurally strong and had already removed literal UI decoration, but fresh screenshot review still judged the page too close to a generic information sheet: large Japanese title at top, equal allergy/dietary columns, a single separator, staff notice, and extensive uncommitted ivory space. It was functional but not yet distinctive enough to count as sellable visual completion under the reopened gate.

The old `DESIGN_QA_PASS_WITH_PLACEHOLDERS` and long-copy proof were therefore reused only as structural history, not as visual completion evidence.

## Clean-room comparison

Created:

- section: `4:2 / QA_ADD_08_REOPENED_CLEANROOM_2026_08_10`
- candidate: `4:3 / QA_ADD_08_MENU_SUPPORT_V2_CULINARY_EDITORIAL`

Art direction:

- Japanese-first culinary editorial headline `本日の食卓を、ゆっくりお楽しみください。` in native `Noto Serif JP`;
- main menu/drink placeholder stays in the broad left editorial field;
- allergy and dietary information move to a deep-navy right marginalia field rather than two equal dashboard-like columns;
- `01 / 02` are large editorial index numerals, with rust and high-contrast mint accents;
- staff guidance is promoted to an intentional large typographic message instead of a generic info strip;
- one thin teal top edge and restrained rust rules create print hierarchy without cards, badges, gradients, shadows, fake UI or decorative stock imagery;
- all variable copy remains native semantic text.

The first clean-room screenshot revealed two visible defects: the headline wrapped to an isolated final `い。`, and the `02` numeral had insufficient contrast on the navy field. Both were corrected before promotion by reflowing the title to 60 px / two lines and increasing the `02` accent contrast.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or saved. The observed bottleneck was composition and information hierarchy rather than missing media, so the run continued with native Figma typography/vector work. Drive writes: `0`.

## Visual decision

Whole-item, reading-scale, and full `1400 × 1980` screenshots show V2 clearly wins over the prior production. The page now reads as a designed culinary print object rather than a generic information sheet; the asymmetric dark marginalia gives allergy/dietary content an immediate role without turning it into web cards, while the Japanese main field remains calm and legible.

## Rollback-safe promotion

Immediately before promotion, the prior live production was preserved:

- rollback section: `4:27 / ROLLBACK_ADD_08_PRE_REOPENED_EDITORIAL_2026_08_10`
- rollback frame: `4:28 / ROLLBACK_ADD08_MENU_SUPPORT_PRE_V2`

Production ID `1:3` was preserved and its contents replaced with the approved clean-room design.

## Long-copy stress and correction

A fresh V2-specific stress proof was created after promotion:

- section: `4:67 / QA_ADD_08_V2_LONG_COPY_STRESS_2026_08_10`
- stress frame: `4:68 / QA_ADD08_V2_LONG_COPY_STRESS`

It uses deliberately long native dummy strings for menu/drink, allergy, dietary, and staff guidance. The first stress screenshot exposed a real collision between the long main menu copy and the horizontal rule. The production, candidate, and stress proof were all corrected by increasing the main-copy reserve and moving the rule/staff guidance down. A second stress screenshot confirmed the long strings wrap without cross-field collision or frame escape.

## Post-promotion structure QA

Production `1:3`:

- `1400 × 1980`
- `clipsContent=true`
- native text count: `15`
- IMAGE fills: `0`
- text outside frame: `0`
- hidden safe guide `4:66 / GUIDE_SAFE_10MM`, `1260 × 1840`
- all menu, allergy, dietary, staff and footer information remains native editable text.

Rollback `4:28` remains intact with the prior 11 native text nodes, zero IMAGE fills, zero text outside frame, and its safe guide.

## 2026-08-13 placeholder hierarchy polish

Fresh live inspection at `main` `7fd5b95de3ff51ea57656aa4b6ebd3a070e586c8` confirmed that the V2 composition remained sellable, but all four semantic placeholders still rendered the proof-only `LAYOUT DUMMY` suffix at the same size and color as the guest-facing field label. At actual size this reintroduced a visible proof-sheet / CMS-label impression.

Exact authority was re-read before the write:

- Figma: `xvJH23nWjWAApd3yOwr4y3 / 01_PRODUCTION / 1:3`
- Drive: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

A fresh hidden rollback copy was created on `99_QA`:

- `11:2 / ROLLBACK_ADD08_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production root `1:3` was preserved. Only native text-range styling changed:

- `4:49 / TXT_MENU_SUPPORT_BODY`: semantic field stays `34 px`; ` · LAYOUT DUMMY]` becomes `11 px`, muted warm-gray, `0.78` opacity.
- `4:53 / TXT_STAFF_BODY`: semantic field stays `27 px`; suffix becomes `10 px`, muted warm-gray, `0.78` opacity.
- `4:58 / TXT_ALLERGY_BODY`: semantic field stays `16 px`; suffix becomes `8 px`, pale warm-gray, `0.78` opacity on the navy rail.
- `4:62 / TXT_DIETARY_BODY`: semantic field stays `16 px`; suffix becomes `8 px`, pale warm-gray, `0.78` opacity on the navy rail.

Post-write screenshot QA at the full-item 1400×1980 design scale shows the semantic fields remain immediately legible while proof metadata recedes to a subordinate production cue. The Japanese editorial hierarchy, asymmetric navy marginalia, 01/02 index rhythm, and staff-callout hierarchy are unchanged.

Post-write structural readback:

- production root: `1400 × 1980`, `clipsContent=true`
- native text: `15`
- IMAGE fills: `0`
- no rasterization/flattening introduced
- all four changed fields remain native editable text; the semantic placeholder strings themselves were not deleted or factually resolved.

Image generation was not required: this defect was typography/proof-metadata hierarchy, not missing imagery. Drive writes: `0`.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / ACTUAL_SIZE_QA_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `ADD_08_PLACEHOLDER_HIERARCHY_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

`DEFERRED_FINALIZATION`:

- final food/drink copy;
- confirmed allergy/dietary wording and venue operating guidance;
- final venue/footer wording;
- printer bleed/template/profile;
- 100% physical proof and table/venue visibility check.

These do not block progression.

## Next

Proceed to ADD-09 Guest Bookサイン for the reopened visual-art-direction audit.
