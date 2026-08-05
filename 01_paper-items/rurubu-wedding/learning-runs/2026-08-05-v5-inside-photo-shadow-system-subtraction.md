# Rurubu V5 — Inside photo shadow-system subtraction

Date: 2026-08-05
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PHOTO_ROLE_PASS_UNCHANGED`

## Authorities read before the change

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`

## Visible problem

The V5 inside-right page still mixed two image treatments: the lead memory photograph was already integrated directly into the page, while the history lead and two visible small memory photographs retained generic drop shadows. At whole-spread scale, these shadows made the photos read as floating UI cards rather than parts of one editorial photo system.

The image sources themselves remain unresolved against the Drive evidence ledger. This experiment therefore addressed only the visible containment defect and did not claim source or photo-role completion.

## Anti-anchoring question

Would these shadows be chosen if the current layout did not already contain them?

No. The page already has strong grouping through scale, alignment, caption strips, numbered markers, rules, and background fields. The shadows were inherited decoration rather than necessary information architecture.

## Tested principle

Attempt subtraction before adding containers or effects. Use scale, crop, alignment, caption relation, and quiet space to establish hierarchy before relying on shadows.

Evidence level before change: `DISCOVERED / previously verified on bounded outer-spread roles`.

## Expected improvement

- reduce Web/UI-card appearance;
- unify the history and MEMORY SPOTS photography as one editorial system;
- make image scale and caption hierarchy—not effects—the grouping mechanism;
- preserve native text, semantic nodes, image fills, crops, and rollback state.

## Possible regression

- small photographs could lose separation from the pale-blue page;
- history lead could appear visually weak without depth;
- image boundaries could become ambiguous at actual size.

## Live Figma change

Page: `01_RURUBU_WEDDING`

Current frame: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` — `77:290`

Mutated nodes:

- `77:422 / IA_HISTORY_MEMORY_PHOTO`
  - removed drop shadow: radius `5`, offset `0,3`, black alpha approximately `12%`
- `77:438 / IA_MEMORY_2_PHOTO`
  - removed drop shadow: radius `10`, offset `0,5`, navy/black alpha approximately `16%`
- `77:454 / IA_MEMORY_4_PHOTO`
  - removed the same drop shadow

No node was deleted. No text, size, position, crop, fill, or semantic name was changed.

## Structure evidence after change

- `77:422`: `678 × 280`, `FILL`, image hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`, transform unchanged
- `77:438`: `88 × 92`, `FILL`, image hash `27ad4cfab8fd579b8452540ce954f8b36edc77fb`, transform unchanged
- `77:454`: `88 × 92`, `FILL`, image hash `f8357056c1f50bc928066273ce9391f5feba02d2`, transform unchanged
- effects after change: `[]` for all three nodes
- V4 rollback frames preserved: outer `59:2`, inside `59:178`

## Three-scale QA

### Thumbnail / whole item

PASS. The inside spread still has a clear left-profile/right-history division. The right page reads more consistently as a magazine page, and the history photograph remains dominant through size rather than shadow.

### Reading / page scale

PASS. Reading order remains `OUR HISTORY → timeline → history photograph/caption → MEMORY SPOTS → lead memory → supporting locations`. The small photographs remain grouped by their numbered markers, colored rules, and adjacent copy.

### Detail / actual-size plausibility

PASS for this bounded effect change. Image edges remain identifiable against the pale-blue background because the photo content, border geometry, spacing, and adjacent modules provide sufficient separation. No clipping, blank hole, mask exposure, text collision, or overflow was visible in the `1588 × 1123` screenshot.

## Result

`VERIFIED / ADOPTED FOR CURRENT V5`

The change improves editorial integration without changing source provenance or pretending that the unresolved Drive assets are complete.

## Failure / limitation

The current history image remains visibly low-quality/pixelated and the displayed hashes are not yet closed against the intended Drive IDs. Removing shadows cannot repair source quality. It must not increase `intended_source_applied`, `PHOTO_ROLE_PASS`, or the V6 start gate.

## Ledger and gate decision

- intended source applied: unchanged
- photo role pass: unchanged at `0 / 13`
- dominant role pass: unchanged
- V6 production gate: not opened

## Learning status

A shadow-free editorial photo system is now verified for this bounded V5 inside-page context. It is not promoted as a universal rule: photographs may still require a keyline, field, or shadow when contrast, overlap, or physical-material simulation genuinely needs it.

## Next application

Stop broad decorative subtraction after this system-level cleanup. The next highest-impact safe step remains binary-safe placement of the verified Batch A Drive derivatives and closure of `Drive ID → node ID → image hash → screenshot QA → structure QA` evidence.