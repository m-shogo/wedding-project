# ADD-02 Bali — V4C Split Gate Folio

Date: 2026-08-29
Scope: non-Rurubu only
Status: `V4C_CANDIDATE / LONG_COPY_QA_PASS / THREE_SCALE_SCREENSHOT_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`
Latest main immediately before write: `173053217f5eb575f1e8d8ef1ad9ff7e071d3bff`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`

## Authority

- Figma fileKey: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Figma page: `197:2` — `V4_CLEANROOM_ADD02_COUNTRY_SIGNS_2026_08_28`
- retained comparison: `198:116` — `V4 / ADD-02 / TABLE 09 / BALI / CLEANROOM`
- new clean-room root: `237:2` — `V4C / ADD-02 / TABLE 09 / BALI / SPLIT GATE FOLIO / CLEANROOM`
- hidden long-copy proof: `237:30` — `QA / V4C / ADD-02 / BALI / LONG COPY / FINAL`
- native copy stack: `237:23` — `TEXT / BALI EDITORIAL STACK`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r` — `ADD-02_11卓の国別テーブルサイン`
- Drive write: none; this direction does not require raster/generated imagery.

## Clean-room provenance and visual direction

The retained V4 Bali uses broad terraced color bands plus repeated circular/weave geometry. V4C was created from a blank `1000 × 1480` frame and does not duplicate or restyle the retained V4/V2/V3 production.

The new direction is a Bali-specific split-gate editorial folio: volcanic dark spine, saffron header, vermilion register, abstracted split-gate architecture, offering/leaf geometry and a restrained moss plinth. At thumbnail scale the black split-gate silhouette and large `BALI` title become the first read rather than another layered landscape/vector study. Equal cards, badges, generic travel icons, fake stamps, stock imagery and decorative English filler are intentionally absent.

## Authoring roles

- variable copy/facts: native editable Figma text (`TABLE 09`, `BALI`, `バリ`, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`)
- semantic copy grouping: native vertical Auto Layout `237:23`
- fixed atmosphere: editable Figma vector/primitives
- replaceable photography: none required
- reusable SVG: none required
- raster/generated imagery: none
- raster IMAGE fills: `0`

## Meaningful correction during QA

The initial long-copy proof exposed a real structural defect: the editorial Auto Layout container retained a `10px` fixed height even though its children visually overflowed. Candidate and proof were corrected to content-hugging vertical sizing.

Readback after correction:

- candidate stack `237:23`: `317px` high
- proof stack: `407px` high
- candidate text outside root: `0`
- candidate text/text overlap: `0`
- proof text outside root: `0`
- proof text/text overlap: `0`

The hidden proof uses a deliberately long Japanese theme and explanation. No font-size reduction was used to force a pass.

## Three-scale visual QA

- thumbnail / 3-second scan: live `244 × 360` screenshot confirms the volcanic spine, saffron header, split-gate silhouette and `BALI` title survive as distinct first-read elements; the direction is materially different from the retained terrace-band V4.
- reading scale: `BALI → バリ → theme → explanation` forms a simple editorial path. The split-gate and offering geometry stay above/right of the copy column instead of becoming UI-like decoration.
- actual-size / print-detail: native `1000 × 1480` screenshot and geometry readback show all seven text roles inside the root with no text/text collision; the key bottom rule is `8px = 0.8mm` at working scale.

This makes Bali a serious V4C comparison candidate. It does not promote ADD-02 family production yet.

## Print-first readback

Working physical authority: `100 × 148 mm`; current geometry is `1000 × 1480 px` = `10 px/mm`.

Approximate actual-size type:

- `BALI` 128px → 12.8mm → about `36.3pt`
- `バリ` 40px → about `11.3pt`
- theme 30px → about `8.5pt`
- description 25px → about `7.1pt`
- `TABLE 09` 30px → about `8.5pt`
- date 28px → about `7.9pt`
- index `09` 86px → about `24.4pt`

Raster effective PPI: `N/A`; `RESOLUTION_WARNING`: none because IMAGE fills = `0`.

CMYK risks remain for volcanic near-black, saffron/orange, vermilion/coral, moss green and warm paper. Final rich-black/100K construction is not asserted before printer specification. Grayscale hierarchy and vendor-profile conversion remain finalization work.

## Physical / production conditions still deferred

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

`DEFERRED_FINALIZATION`:

- printer template and confirmed trim/bleed/safe geometry
- holder/stand/easel occlusion measurements
- final stock/coating and CMYK profile
- final black construction and overprint/knockout behavior
- PDF export, font embedding, transparency and preflight
- 100% printed proof / physical stand test

No QR, fold, punch, perforation, signature or handwriting field applies to this table sign under current authority.

## Current state

`V4C_BALI_CREATED / LONG_COPY_QA_PASS / STRUCTURE_QA_PASS / THREE_SCALE_SCREENSHOT_QA_PASS / SERIOUS_COMPARISON_CANDIDATE / NOT_PROMOTED / NOT_PRINT_READY`

Next safe ADD-02 work: complete Maldives V4C evidence and then perform family-level comparison across the 11 table signs before any `SELLABLE_VISUAL_QA_PASS` promotion.
