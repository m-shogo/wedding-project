# WEDDING PASSPORT V4 — Final Comparison / Promotion QA

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CURRENT_SELECTED / NOT_PRINT_READY`

Promotion-base latest-main SHA: `8163e07485181e9e4d3e2d656b43c0cf5683c04f`

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- image-generation-centered policy: `docs/design-learning/IMAGE-GENERATION-CENTERED-VISUAL-DESIGN-POLICY.md`
- V4 clean-room evidence: `01_paper-items/wedding-passport/FIGMA-V4-CLEANROOM-HARBOR-ATLAS-2026-08-27.md`
- V4 Auto Layout / long-copy QA: `01_paper-items/wedding-passport/V4-EDITORIAL-PAPER-AUTO-LAYOUT-QA-2026-08-27.md`
- V4 Menu family-coherence QA: `01_paper-items/wedding-passport/V4-MENU-TIDE-REGISTER-REFINEMENT-QA-2026-08-27.md`
- Figma: `UbK8KmuWJcDeGScsN49Uor`
- exact Drive authority live-confirmed: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- no Rurubu item-specific production content was used as construction input

## Mature V4 selected family

Figma page promoted to:

- `212:2 / CURRENT_V4_WEDDING_PASSPORT_2026_08_27`

Selected roots:

1. `212:3 / V4 / 01 COVER / HARBOR ATLAS / EDITORIAL PAPER REFINED / CURRENT SELECTED V4`
2. `212:13 / V4 / 02 MENU + DRINK / OPEN CHAPTER LEDGER / CURRENT SELECTED V4`
3. `212:58 / V4 / 03 SEATING / ATLAS LEDGER / PRINT-READABLE / CURRENT SELECTED V4`
4. `212:99 / V4 / 04 BACK / RETURN NOTE / QUIET LETTER REFINED / CURRENT SELECTED V4`

Prior production / vNext / V2 / V3 remain preserved and were not deleted or overwritten.

## Final V4-only maturity review before comparison

V4 was completed and QA'd before reopening retained Current for comparison.

### Cover

- asymmetric editorial-paper silhouette;
- Harbor Atlas fixed art remains subordinate to native Japanese title/date/place/couple roles;
- variable-copy stack is Auto Layout and long-copy stress passed;
- no fake passport/airline credentials, dashboard cards, random stickers, or generated fake text.

### Menu + Drink

- short oxblood chapter flag replaces prior full-height sidebar behavior;
- food remains dominant and drink subordinate;
- bounded lower-page `TIDE REGISTER` fixed art `223:47` closes the physical page without filler cards or stretched copy;
- native actual-size screenshot remains readable.

### Seating

- 11 tables × maximum 7 guests retained;
- three-column staggered ledger avoids shrinking guest names below practical actual-size readability;
- fixed contour/register cues stay outside the primary name-reading paths;
- long-name stress remains structurally safe.

### Back

- intentionally quieter than Cover;
- vertical letter field + Auto Layout copy stack preserve dynamic message growth;
- long-copy stress passed without coordinate nudging or type shrinkage.

## Final comparison against retained Current

Retained selected professional Current was opened only after V4 maturity, solely for final comparison:

- retained front `178:2 / VNEXT_SELECTED_CANDIDATE / PASSPORT FRONT / ISLAND DEPARTURE`
- retained back `178:16 / VNEXT_SELECTED_CANDIDATE / PASSPORT BACK / SUNSET AFTERGLOW`

Fresh thumbnail comparison showed the retained family remains energetic and legible, but is more dependent on large generic geometric color fields. V4 more clearly behaves as a tactile editorial paper artifact rather than a flat poster system.

### Why V4 wins

- stronger Japanese editorial typography and title silhouette;
- materially lower AI/template risk: no generic pill/capsule composition as the dominant visual system;
- better physical-paper credibility through asymmetric paper planes, register cues, ledger rhythm, and restrained atlas structure;
- clearer differentiation between Cover, Menu, Seating, and Back while retaining family coherence;
- stronger information-design behavior on the functional inner pages;
- full four-frame family is evaluated together rather than front/back visual excitement alone;
- long-copy and actual-size structure are already integrated into the selected composition.

Decision: **V4 clearly wins the retained Current for the present professional/sellable non-Rurubu quality brief and is promoted as the selected Wedding Passport family.**

## Image-generation / hybrid-authoring result

- generated/composed Harbor Atlas direction was selected from 3 materially different fixed-art candidates;
- Cover/Back fixed art is currently represented as editable composed SVG node trees after raster-transport method switch;
- Menu uses a separate bounded editable composed SVG fixed-art role;
- raster IMAGE fills: `0`;
- variable/factual copy baked into fixed art: `0`;
- no new image-generation batch was required in the final refinement because the remaining defects were containment, page rhythm, and typography/structure rather than missing imagery.

## Structure / print state

Verified V4 structure before promotion:

- Cover: native visible text `6` / fixed-height `0` / outside `0`;
- Menu: native visible text `35` / fixed-height `0` / outside `0`;
- Seating: native visible text `26` / fixed-height `0` / outside `0`;
- Back: native visible text `6` / fixed-height `0` / outside `0`;
- page-wide flattening: `0`;
- raster IMAGE fills: `0`.

### Print-first correction — 2026-08-29

Live authority was re-read from latest `main` before the Figma write. The current V4 frames remain `1480×2100`, corresponding to the established A5 `148×210 mm` working scale (`10 Figma units = 1 mm`). At that scale, Figma font-size units convert to physical point size by approximately `px × 0.2835`.

A fresh actual-size audit found that the current Seating guest-name role was still only `24 px ≈ 6.8 pt`, and Menu food English labels were `20 px ≈ 5.7 pt`. Those values were structurally valid but weaker than desired for dependable physical print reading. Two internal production notes were also still visible in guest-facing output.

Applied live Figma corrections:

- Seating `212:58`
  - all 11 guest-list text roles `212:65,68,71,74,77,80,83,86,89,92,95`: `24 px → 28 px` (`≈ 7.94 pt`), line-height `32 px → 36 px`, width `350 → 390 px`;
  - all 11 table labels `212:64,67,70,73,76,79,82,85,88,91,94`: `22 px → 25 px` (`≈ 7.09 pt`);
  - internal QA footer `212:98` (`1卓最大7名でレイアウト検証…`) set to `visible=false` so it cannot print as guest-facing copy.
- Menu + Drink `212:13`
  - food English role labels `212:21,25,29,33,37,41`: `20 px → 24 px` (`≈ 6.80 pt`);
  - drink labels `212:45,47,49,51,53,55`: `23 px → 25 px` (`≈ 7.09 pt`);
  - drink values `212:46,48,50,52,54,56`: `24 px → 28 px` (`≈ 7.94 pt`), line-height `38 px → 40 px`, width `300 → 320 px`;
  - internal replacement note `212:57` (`最終内容は確定後に差し替えます`) set to `visible=false`.

Post-write structure readback:

- Seating: all 11 guest lists remain seven-line roles, all within frame bounds; lowest current list ends at `y=1880`, no text outside frame; hidden internal note confirmed.
- Menu: all corrected labels/values remain within frame bounds; rightmost text edge is `x=1380 < 1480`; hidden internal note confirmed.
- raster IMAGE fills remain `0`, therefore effective raster PPI for these corrected roles is `N/A` and no `RESOLUTION_WARNING` was introduced.
- the existing composed fixed-art vectors remain vector-based; their final ink/CMYK survival still requires printer/profile/physical-proof validation.

This correction does **not** upgrade the item to `PRINT_READY`. Remaining print gates are still printer template, confirmed trim/bleed/safe, final stock/finishing, CMYK/profile conversion, overprint/knockout/transparency preflight, font/PDF embedding verification, final copy, and 100%/physical proof.

`NOT_PRINT_READY` remains because physical printer template/profile/stock/finishing, final names/menu/drink/seating/back copy, physical proof, and Drive master persistence for the adopted fixed-art source are still deferred or blocked.

## Learning status

`VERIFIED_LOCAL`:

- a full artifact family should be compared against retained Current only after the new clean-room version has mature whole/read/actual-size/long-copy/structure evidence;
- stronger sellable quality can come from replacing generic geometric excitement with item-specific editorial-paper logic while preserving emotional hierarchy;
- family resemblance should transfer visual grammar, not duplicate silhouettes across pages;
- structural overflow PASS is not sufficient print evidence: actual-size point-equivalent review can still reveal guest-facing microtype that should be enlarged before physical proof;
- internal QA/replacement notes must be hidden from guest-facing production even when their semantic purpose is useful during authoring.

## Progression

Wedding Passport exits the reopened visual-rebuild queue with:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CURRENT_SELECTED / PRINT_SIZE_READABILITY_HARDENED / NOT_PRINT_READY`.

Next target: **BOARDING PASS V4 print-first re-audit**. Start from factual/print/semantic requirements only; do not use the retained Boarding Pass production/V2/V3 visual system as construction input.
