# V5 back-cover folio subtraction and binary-upload blocker

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer candidate: `77:18`

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- Rurubu evidence ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 research/status files

## Priority work attempted first

### Visible problem

Batch A back-main derivative was already visually accepted and Drive-readback verified, but had not reached exact Figma placement and hash/screenshot evidence closure.

### Source and target

- Drive derivative ID: `1mRalEP6V7TI6MS1NFkhkbMMUDcIVgbZV`
- filename: `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY__FIGMA_708x456_Q35.jpg`
- MIME: `image/jpeg`
- bytes: `33,535`
- target semantic node: `77:24`

### Method tested

Used the Figma connector-native `upload_assets` action to obtain a fresh single-use upload endpoint bound directly to node `77:24`, then attempted a multipart binary POST from the mounted Drive-readback file.

### Result

`BLOCKED / NO LIVE MUTATION`

The Figma connector successfully issued the target-bound upload URL, but the execution container again failed DNS resolution for `mcp.figma.com`. The single-use endpoint was not consumed and node `77:24` was not changed. This confirms the blocker is between the execution container and the upload host, not Drive retrieval, derivative preparation, target resolution, or Figma authorization.

### Adopted process consequence

Do not repeat container-to-`mcp.figma.com` POST in the next run unless the execution network changes. Preserve the Drive derivative and target mapping. Continue another safe incomplete V5 step rather than manufacturing activity or lowering image quality.

## Bounded editorial experiment

### Visible problem

The back-cover top-right area contained both:

- a full-width issue identity bar: `YOKOHAMA WEDDING 保存版`
- a second small pill instance: `P.08 BACK`

The small locator repeated page/back identification already supplied by the spread structure and footer. At whole-item scale it read as an isolated interface pill rather than useful editorial information.

### Legacy challenge

Asked whether the `P.08 BACK` pill would be added if the existing design did not already contain it. The answer was no: it did not improve navigation, reading order, page identity, factual content, or print plausibility.

### Hypothesis

Non-destructively hiding only the redundant folio instance would strengthen the back-cover heading silhouette and remove one UI-like badge without weakening page orientation.

### Expected improvement

- quieter top-right back-cover area
- clearer priority for `OUR TRAVEL NOTES` and the issue bar
- less badge/card vocabulary
- no effect on photographs, captions, route, fold, or factual content

### Possible regression

The top-right area could feel under-resolved or lose a useful page locator at actual size.

### Evidence required

- whole-spread screenshot after mutation
- reading-order check
- actual-size/detail inspection of the vacated area
- structure readback showing only the intended node hidden
- rollback preservation

## Live Figma change

- target instance: `77:114 / RURUBU/Folio`
- nested native text: `I77:114;68:79 / LABEL / P.08 BACK`
- change: `visible: true → false`
- deletion: none
- photo fills/crops/hashes: unchanged
- native text content: unchanged
- semantic photo nodes: unchanged
- fold guide: unchanged
- V4 rollback frames: unchanged

## Three-scale QA

### Thumbnail / whole item

PASS. The back-cover upper-right corner is quieter and no visual hole appears. The issue identity bar still anchors the upper edge, while the heading and dominant photo remain the primary back-cover focuses.

### Reading / page scale

PASS. Reading order remains `issue bar → OUR TRAVEL NOTES → lead image/article → Friends & Family → journey route → footer`. No essential orientation was removed.

### Detail / actual-size scale

PASS. The removed module was redundant microcopy, not required factual content. No text reflow, clipping, overlap, mask exposure, or alignment regression was observed.

## Result

`DISCOVERED → PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

This is a bounded V5-specific gain. It is not promoted directly into a project-wide rule. The broader principle remains: repeated page locators should be removed only when page identity and navigation remain unambiguous at actual print size.

## Gate impact

No photo evidence gate changed:

- `INTENDED_SOURCE_APPLIED`: unchanged
- `PHOTO_ROLE_PASS`: unchanged
- V5 dummy-design completion: unchanged
- V6 production start gate: unchanged

## Next application

Resume Batch A evidence closure through a genuinely binary-safe route. Do not substitute more decorative polish for the dominant-image work. If upload remains unavailable, use the next run for evidence/structure preparation that directly reduces Batch A closure risk.