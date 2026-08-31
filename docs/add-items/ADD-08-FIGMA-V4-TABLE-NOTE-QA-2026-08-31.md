# ADD-08 Figma V4 — TABLE NOTE QA — 2026-08-31

Status: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / NOT_PRINT_READY`

## Live authority

- start/write authority `main`: `5c7689145cd5d7e2b3b2a42524432543d2fafbda`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected V4 page: `65:2 / CURRENT_SELECTED / V4 / ADD-08 / TABLE NOTE / 2026-08-31`
- selected V4 root: `65:3 / CURRENT_SELECTED / V4 / ADD-08 / TABLE NOTE / A4`
- hidden long-copy stress: `66:37 / QA / V4 / ADD-08 / TABLE NOTE / LONG COPY STRESS`
- retained pre-V4 comparison: `1:3 / HISTORY / PRE-V4 / ADD-08 / VNEXT V3 RESORT TABLECLOTH`
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

## V4 clean-room provenance

V4 was authored on a new Figma page and blank `1400×1980` frame. The previous production/V2/V3/vNext composition was not duplicated or used as a component source. It was opened only for mature visual comparison after the V4 direction existed.

Only verified non-visual requirements were re-authored:

- A4 portrait working size;
- menu/drink information role;
- allergy information role;
- dietary restriction role;
- staff-help role;
- date/place role;
- existing 10 mm safe-area concept.

No Rurubu visual grammar, palette, density, page structure or decoration was used as V4 authority.

## Art direction — TABLE NOTE

The V4 direction treats the item as a small restaurant/table editorial notice rather than a travel UI or equal-card information sheet.

Primary visual decisions:

- Japanese-first serif hero: `旅の続きを、ひと皿ずつ。`;
- warm paper field with deep ink typography;
- one coral vertical spine for directional rhythm;
- one oversized editable-vector plate/ring gesture and olive table-linen gesture;
- direct ruled information lanes instead of rounded cards;
- a single deep-ink staff-help field as the closing anchor;
- no fake airline credentials, English filler, badges, stock food photography, gradients, shadows, web UI, or decorative microcopy.

At thumbnail scale, the hero/title and plate/table cue establish the first read before the information lanes. The retained pre-V4 `RESORT TABLECLOTH` comparison remains structurally sound but reads more like a colorful system/template; V4 has stronger Japanese editorial hierarchy and a clearer physical table-use metaphor.

## Hybrid authoring roles

- variable/final copy: native editable Figma text;
- semantic placeholders: native editable Figma text;
- variable information reflow: native Figma Auto Layout;
- fixed flat graphic: editable native vector/shape geometry;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- rasterized variable copy: `0`;
- Drive writes: `0`.

Image generation was intentionally not used because screenshot diagnosis did not show imagery as the quality bottleneck and adding generated food imagery would increase stock/AI risk without improving the information task.

## Structural QA and defect corrections

Fresh V4 QA found and corrected two real implementation defects before promotion:

1. the first text build had `textAutoResize=NONE` despite visually rendering; all 13 native text nodes were repaired to true `HEIGHT` auto-resize after loading their actual fonts;
2. the first realistic long-copy stress allowed the expanded menu copy to cross a fixed section rule. The menu/allergy/dietary region was rebuilt as a native vertical Auto Layout stack so copy growth pushes subsequent sections down instead of colliding.

Final selected V4 readback:

- canvas: `1400×1980`;
- native text nodes: `13`;
- auto-height native text: `13/13`;
- text outside 10 mm safe concept: `0`;
- fixed-height text: `0`;
- IMAGE fills: `0`;
- visible stress/proof residue: `0` (stress frame hidden after QA).

## Long-copy stress

The fresh V4 stress used materially longer placeholders for:

- three-line menu/drink information;
- two-line allergy guidance;
- two-line dietary guidance;
- a long venue/placement string.

The initial absolute-layout version failed visually at a section rule even though text/text intersection checks were clean. After the Auto Layout repair, a fresh clone was rendered and reviewed: section rules reflow with the copy, menu/allergy/dietary blocks remain distinct, the staff-help field remains clear, and the long venue string remains inside the page.

Decision: `LONG_COPY_STRESS_PASS`.

## Three-scale visual QA

Live Figma screenshots were reviewed at:

- thumbnail / 3-second scan: `354×500` render — PASS;
- reading scale: `708×1000` render — PASS;
- actual working size: `1400×1980` render — PASS;
- realistic long-copy stress at `708×1000` — PASS after Auto Layout correction;
- retained pre-V4 comparison at `354×500` — V4 selected.

The V4 keeps a strong first read at thumbnail size, remains clearly grouped at reading size, and does not rely on hairline texture or low-detail raster effects at actual size.

## Print-first QA

### Physical size / geometry

Verified working authority is A4 portrait:

- trim scenario: `210×297 mm`;
- working frame: `1400×1980 px`;
- scale: approximately `6.667 px/mm`;
- 10 mm safe concept: `66.667 px` from each trim edge;
- hidden safe guide corrected to `x/y ≈ 66.667 px`, `1266.667×1846.667 px`;
- all visible native text is inside that 10 mm safe concept.

No printer/vendor template is yet authoritative, so production bleed was **not** guessed or added. `bleed = DEFERRED_FINALIZATION`.

Fold / punch / perforation / binding / QR / handwriting area: not part of the current ADD-08 A4 primary design.

### Actual-size type

Approximate physical type equivalents at A4 scale:

- hero `94 px` ≈ `40.0 pt`;
- category `30 px` ≈ `12.8 pt`;
- intro `27 px` ≈ `11.5 pt`;
- section labels `29 px` ≈ `12.3 pt`;
- menu placeholder `38 px` ≈ `16.2 pt`;
- allergy/dietary placeholders `36 px` ≈ `15.3 pt`;
- staff hero `54 px` ≈ `23.0 pt`;
- staff note `26 px` ≈ `11.1 pt`;
- date/place `23 px` ≈ `9.8 pt`.

The smallest current guest-facing type is therefore around 9.8 pt, with the secondary guidance around 11 pt; no microtype was introduced.

### Rules / raster resolution

- section rules: `3 px` ≈ `0.45 mm`, not an extreme hairline;
- plate outline: `4 px` ≈ `0.60 mm`;
- gold inner ring: `9 px` ≈ `1.35 mm`;
- raster IMAGE fills: `0`;
- effective PPI: `N/A`;
- `RESOLUTION_WARNING=NONE` for the current all-native/vector V4.

### CMYK / print risks

Still requires printer/profile proof for:

- deep ink field becoming too dense after CMYK conversion;
- coral losing warmth/saturation;
- olive becoming muddy;
- muted gold shifting toward brown;
- warm paper and gray intro copy losing contrast;
- grayscale hierarchy after color removal;
- final black construction (small black text vs rich black field), without assuming vendor CMYK values.

## Completion boundary

ADD-08 is promoted for the reopened visual program as:

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

This does **not** mean print-ready.

`DESIGN_COMPLETE != PRINT_READY` remains in force until final menu/drink/allergy/dietary copy, venue wording, printer template, bleed/trim/safe authority, paper stock, CMYK/profile conversion, black construction, PDF export/font embedding, transparency, overprint/knockout, preflight, and 100%/physical proof are verified.

## Next

Proceed in sequence to **ADD-09 Guest Book sign** under the same V4 blank-frame, reference-led, print-first rule.
