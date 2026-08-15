# ADD-02 11卓の国別テーブルサイン — zero-reuse clean-room V5

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V5_11_SIGN_STRUCTURAL_PASS / REPRESENTATIVE_LONG_COPY_STRESS_PASS / TABLE_INDEX_REPAIRED / LEGACY_COMPARISON_MIXED / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Figma: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Clean-room boundary

V5 was authored on a completely new Figma page:

- page `42:2 / CLEANROOM / ADD-02 / V5 / 2026-08-16`
- family proof section `43:132 / FAMILY PROOF / ADD-02 / V5 / PRE-LEGACY-COMPARISON`

No old production frame, V3/V4 candidate, retained image, old SVG/vector, crop, badge, rail, background composition, or generated asset was copied into V5. The retained production was not opened until the 11 new signs, representative screenshot QA, representative long-copy stress, and structure readback were complete.

Only current non-visual requirements were carried forward: 11 destinations/order, 100×148 mm working trim represented as `1000×1480`, native editable destination/table/copy roles, table/date semantics, provisional print constraints, and the requirement that the family remain recognisable without becoming 11 identical cards.

## Hybrid authoring split

- variable / semantic copy: native Figma text;
- fixed atmosphere/motif: newly authored composed editable SVG nodes;
- IMAGE fills: `0` across all 11 V5 roots;
- generated raster assets: `0`;
- Drive writes: `0`.

The composed SVG approach intentionally keeps each atmospheric field as a meaningful editable graphic role instead of expanding decoration into many low-value native primitives.

## V5 family

All eleven roots are `1000×1480`, clipped, and independent in composition:

- `43:3 / CLEANROOM_V5_HAWAII_BOTANICAL_SPECIMEN`
- `42:3 / CLEANROOM_V5_ITALY_MATERIAL_LEDGER`
- `42:21 / CLEANROOM_V5_FRANCE_FOLDED_PUBLICATION`
- `43:19 / CLEANROOM_V5_SPAIN_TILE_MARGIN`
- `43:34 / CLEANROOM_V5_TAIWAN_RAIL_WINDOW`
- `42:34 / CLEANROOM_V5_JAPAN_BOOK_JACKET_SEAM`
- `43:49 / CLEANROOM_V5_HONGKONG_HARBOUR_LEDGER`
- `43:67 / CLEANROOM_V5_SINGAPORE_GARDEN_SECTION`
- `43:83 / CLEANROOM_V5_BALI_WOVEN_PANEL`
- `43:105 / CLEANROOM_V5_KOREA_HANJI_WINDOWS`
- `43:118 / CLEANROOM_V5_MALDIVES_WATER_PANES`

V5 deliberately does not reuse the V3 motif directions. Examples: Italy uses a material-swatch field rather than an arch; France uses a folded publication field rather than diagonal typography; Japan uses a book-jacket/seam construction rather than an ink circle; Hawaii uses botanical/coral specimen forms rather than horizon/wave composition; Maldives uses translucent water panes rather than contour/tidal rings.

## Authority corrections during QA

Two issues were corrected before considering promotion:

1. The first Japan Japanese label was rotated and visually clipped at the left edge. It was replaced by native vertical `日 / 本` text without rotation.
2. Initial short editorial-note copy looked like authoritative final wording. All live V5 `TXT_COUNTRY_NOTE` nodes were corrected to explicit native semantic placeholder text: `[国テーマ説明文 · LAYOUT DUMMY]`.

The working family initially used only a small `TABLE xx` identifier. Completion comparison showed that distance scanning remained too weak for the current SPEC hierarchy, so each V5 sign gained a new native `TXT_TABLE_INDEX` (`01`–`11`) at a strong top-right read position. This is a requirement-driven repair, not a copied legacy layout.

## Structural readback

All 11 roots read back as:

- `1000×1480`;
- native text preserved;
- IMAGE fill nodes `0`;
- visible text outside the root `0`.

Live text counts before the index addition were 5–6 per sign; after the index repair each sign has one additional native `TXT_TABLE_INDEX`.

## Representative long-copy stress

Hidden QA proofs were created from the new V5 representatives only:

- `43:133 / QA / LONG NOTE STRESS / CLEANROOM_V5_ITALY_MATERIAL_LEDGER`
- `43:151 / QA / LONG NOTE STRESS / CLEANROOM_V5_FRANCE_FOLDED_PUBLICATION`
- `43:164 / QA / LONG NOTE STRESS / CLEANROOM_V5_JAPAN_BOOK_JACKET_SEAM`

Each used a materially longer multi-line Japanese note. Structural readback returned visible outside-text `0` for all three. The long-note heights remained contained inside the sign roots.

## Three-scale visual QA

Pre-legacy family proof was inspected at family/thumbnail scale through section `43:132`. Italy, France, and Japan were also captured individually at natural `1000×1480` actual size after the clean-room family was complete.

Observed V5 strengths:

- substantially calmer and more coherent family rhythm than the earlier vector-only clean-room study;
- each destination uses a materially different composed field rather than one recolored template;
- table indexes are now scannable across the family;
- typography remains native and copy is honest about placeholder state;
- no dashboard/card UI language and no generic airplane/passport/stamp decoration.

Observed V5 weakness:

- several V5 signs still rely on abstract composed geometry, so some destinations lack the richer print/editorial material depth that a strong photographic, architectural, paper-texture, or illustration role could provide.

## Completion-only retained comparison

Only after the V5 clean-room work and QA above was retained family proof `31:274` opened.

Result: **mixed, not a clean V5 victory**.

- V5 is stronger in family cohesion, quieter editorial rhythm, explicit semantic honesty, and post-repair table-number scanning.
- V5 France and Japan establish credible independent print directions; Italy is cleaner and calmer but remains intentionally abstract.
- retained production still has stronger destination-specific visual punch and richer material/editorial depth in several signs.
- therefore V5 does not yet satisfy the hard rule that a replacement must clearly beat retained production across the whole set.

No production promotion, overwrite, deletion, or legacy mutation was performed. V3/V4 and retained production remain unchanged outside the previously recorded history.

## Image / Drive decision

Drive authority was read back successfully at folder ID `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`. No new raster was written because no adopted generated/composed raster candidate exists from this run.

The remaining gap is now specific: **destination material depth**, not basic layout structure. Another vector-only iteration is unlikely to be the highest-value method switch. A later clean-room iteration should use image generation or another composed-image capability for a small representative subset (for example architecture/material/landscape/paper roles), while keeping destination/table/copy native and without reusing retained imagery.

## Current declaration

`SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V5_11_SIGN_STRUCTURAL_PASS / REPRESENTATIVE_LONG_COPY_STRESS_PASS / TABLE_INDEX_REPAIRED / LEGACY_COMPARISON_MIXED / LEGACY_PRESERVED / IMAGE_DEPTH_METHOD_SWITCH_RECOMMENDED / NOT_PRINT_READY`
