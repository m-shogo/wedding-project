# ADD-06 V4 — LIGHT WINDOW QA — 2026-08-31

Status: `V4_CLEANROOM_CREATED / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / NOT_PRINT_READY`
Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md` + item `SPEC.md`
Observed main immediately before write: `0df14dea4a9277ae18eaccbb8efe4788464119eb`

## V4 exclusive / clean-room provenance

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- new blank page: `59:2 / V4 / ADD-06 / LIGHT WINDOW / 2026-08-31`
- V4 production root: `59:3 / V4 / ADD-06 / LIGHT WINDOW / A3 BLEED 303x426mm`
- hidden V4 long-copy proof: `60:2 / QA / HIDDEN / V4 LONG COPY / LIGHT WINDOW`
- retained prior V3 Current for comparison/rollback only: `56:106 / STRIP IN THE LIGHT`

The V4 root was created from a new blank page/frame. No old production/V2/V3 frame, photo-strip geometry, old SVG, old crop, lower dark panel, or ornament was duplicated into V4. Only verified semantic copy roles and physical requirements were re-entered.

## Reference-led visual intent

V3's dominant artifact was a tilted continuous photo strip. V4 deliberately takes a materially different direction: a large off-edge **light/aperture window** on a deep-blue side field, with Japanese-first editorial typography on warm paper. The visual read is:

1. `写真撮影はこちら`;
2. `フォトブース` + guidance;
3. aperture/light-window fixed art;
4. `写真を撮って、今日を持って帰ろう。`;
5. date + unresolved installation location.

At thumbnail scale V4 reads as a physical sign, not an equal-card grid, dashboard, fake camera UI, fake ticket/passport, or generic stock-photo layout. The right-side field and aperture are one asymmetric physical-art direction rather than repeated modules. `PHOTO BOOTH` is a genuine item label, not filler English.

## Role split

- variable/factual/emotional copy: native Figma text;
- fixed light field/discs/rules: native editable vector primitives;
- reusable flash glyph: editable SVG `59:10 / SVG / FLASH GLYPH / EDITABLE`;
- replaceable photo/image: not required in this direction;
- generated raster: none;
- semantic copy baked into raster/SVG: none.

Drive authority was live-confirmed before write:

- `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

No Drive write was required. The prior adopted V3 SVG remains historical/rollback material only and is not used by V4.

## Print-first geometry

Item SPEC is authoritative, so production geometry is not guessed:

- primary trim: **A3 portrait 297 × 420 mm**;
- bleed: **3 mm each side**;
- V4 canvas including bleed: **303 × 426 mm = 1010 × 1420 px**;
- trim guide: `59:4`, 990 × 1400 px, inset 10 px, hidden;
- safe: **12 mm inside trim**;
- safe guide: `59:5`, 910 × 1320 px, hidden;
- working scale: **3.333 px/mm**.

No fold, punch, perforation, QR, handwriting field, sticker application, or binding applies to the A3 primary sign. Stand/board/mounting/sightline remain deferred because the physical installation authority is not final.

## Actual-size typography

At 3.333 px/mm, approximately 0.850 pt per Figma px:

- hero 98 px ≈ **83.3 pt**;
- `フォトブース` 44 px ≈ **37.4 pt**;
- guidance 30 px ≈ **25.5 pt**;
- closing 32 px ≈ **27.2 pt**;
- date 32 px ≈ **27.2 pt**;
- location 31 px ≈ **26.4 pt**;
- English item label 22 px ≈ **18.7 pt**.

This is credible for the specified ~1.5–3 m viewing range. No microtype is used.

Fixed-detail actual-size checks:

- mint anchor rule 8 px ≈ 2.4 mm;
- silver note rule 2 px ≈ 0.6 mm;
- aperture ring 10 px ≈ 3.0 mm;
- silver foot 16 px ≈ 4.8 mm.

No hairline/thin-rule production veto is present at current scale.

## Three-scale visual QA

Live Figma screenshots were reviewed after the final composition fix:

- thumbnail: `356 × 500` render from `59:3` — **PASS**; hero Japanese first-read is immediate and aperture field remains legible without reading as a web card;
- reading: `712 × 1000` render — **PASS**; hierarchy is `hero → booth/guidance → closing → date/location` and the right field stays subordinate to copy;
- actual/native: `1010 × 1420` render — **PASS**; type density, rules and fixed art remain credible at production scale.

Retained V3 `56:106` was also reviewed at 500px. V4 is materially different and does not depend on V3's photo-strip artifact or lower dark information block. V4 was selected for the V4-exclusive program because it satisfies the new clean-room mandate while retaining stronger distance-first wayfinding hierarchy.

## Long-copy / structure QA

A screenshot pass exposed a real first-draft defect: the lower native Auto Layout was initially only 10 px tall and clipped date/location from the rendered sign. The V4 was not passed in that state.

Correction:

- `59:22 / LAYOUT / INFO STACK / NATIVE AUTO` rebuilt as unclipped vertical Auto Layout;
- emotional closing moved into the open middle field to avoid empty-premium-space behavior and to strengthen reading rhythm;
- date/location kept in the lower native stack.

Final production diagnostics:

- visible native text roles: 7;
- fixed-height visible text: 0;
- all visible text inside the confirmed 12 mm safe: **PASS**;
- raster IMAGE fills: 0;
- generated raster: 0;
- hidden stress proof remains hidden after QA.

Stress copy:

- guidance: `撮影の順番を確認しながら、空いている撮影スペースへゆっくりお進みください。`
- location: `[メインダイニング前・フォトブース特設スペース]`
- closing: longer two-line return-home copy.

Result: all stress text remains native auto-height and inside safe; long location expands to two lines without colliding with closing/date or trim.

## Raster / resolution

V4 contains no raster IMAGE fill.

- effective PPI: `N/A`;
- `RESOLUTION_WARNING`: `NONE`;
- no low-resolution proxy is treated as final.

## CMYK / grayscale risk

Still requires physical/profile proof:

- deep blue can darken/lose separation in CMYK;
- muted mint can gray out;
- silver-gray can lose contrast against warm paper;
- warm cream can shift yellow depending on stock/profile.

Grayscale hierarchy remains structurally available through the dark side field, heavy Japanese hero, aperture boundary and native text contrast, but grayscale output proof is still required.

Do not lock rich-black/100K construction until printer specification is known.

## Decision

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / ACTUAL_SIZE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / NOT_PRINT_READY`

`DESIGN_COMPLETE != PRINT_READY`.

Remain deferred until: final booth wording/location, exact stand/board/mounting and venue sightline, printer template/profile, CMYK + grayscale proof, final black construction, PDF export/font embedding, transparency/overprint/knockout checks, preflight, and 100%/physical proof.