# V5 inside folio subtraction

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Live Figma page: `01_RURUBU_WEDDING`
Candidate: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` (`77:290`)

## Source

- live Figma screenshot before and after the change
- project-wide quality-over-legacy and subtraction-first authorities
- existing verified outer-cover and back-cover folio subtraction evidence

## Visible problem

The inside spread retained two small dark pill-shaped page locators at the lower right of each page:

- `77:364 / RURUBU/Folio` — profile page (`P.02 PROFILE`)
- `77:501 / RURUBU/Folio` — history page (`P.03 HISTORY`)

The full-width navy footer already identifies the sections, and the page headings establish the reading context. The pills repeated location information without adding navigation value and introduced an extra Web/UI control silhouette.

## Hypothesis

Non-destructively hiding both duplicate folios would strengthen print-editorial restraint and footer hierarchy without changing content, reading order, photo roles, fold safety, or semantic structure.

## Expected improvement

- quieter lower-page corners
- clearer authority for the full-width footer bands
- less repeated pill/card language
- no loss of orientation because headings and footer copy remain

## Possible regression

The lower corners might feel empty, or the reader might lose page-level orientation if the footer and headings were insufficient.

## Experiment

Changed only:

- `77:364`: `visible: true → false`
- `77:501`: `visible: true → false`

The nodes were not deleted and remain available for immediate rollback.

## Verification

### Whole-item / thumbnail scale

The two-page spread remains balanced. The lower corners no longer compete with the continuous footer bars, and no visible holes appear.

### Page / reading scale

The sequence remains clear:

- left: `OUR PROFILE / ABOUT US → 3 QUESTIONS → common points → TRAVEL NOTE → footer`
- right: `OUR HISTORY → timeline → history photograph → MEMORY SPOTS → footer`

### Detail / actual-size plausibility

- no text reflow
- no collision or clipping
- no exposed mask
- no photo crop or image-hash change
- no fold or safe-area regression
- all ordinary copy remains native Figma text
- semantic photo nodes and V4 rollback frames remain untouched

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT`

## Failure

None observed in screenshot QA. This change does not address photo provenance or dominant-image quality.

## Ledger and gate impact

No asset ledger count changes:

- `INTENDED_SOURCE_APPLIED`: unchanged
- `PHOTO_ROLE_PASS`: unchanged
- V5 dummy-design completion gate: unchanged
- V6 production start gate: unchanged

## Next application

Resume the highest-impact incomplete work: binary-safe placement and evidence closure for Batch A dominant images. Do not repeat the failed DNS-dependent upload path; continue other safe editorial work when binary transport is unavailable.
