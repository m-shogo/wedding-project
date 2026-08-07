# Rurubu V5 — cover side-headline field subtraction

Date: 2026-08-07
Status: `DISCOVERED → PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- V6 Current status and Hawaii clean-room asset queue

## Priority / blocker handling

Dominant-photo evidence remains the primary V5 gate. No already-rejected binary transport path was retried. Drive still preserves the masters and the accepted back-main derivative, while the runtime upload fingerprint remains blocked. Photo-role counts were not advanced.

This run therefore used the next safe high-impact editorial task rather than manufacturing image-generation or transport activity.

## Visible problem

The front-cover hero carried a saturated pink `245 × 58` rounded field behind the native headline `横浜で叶える / 最高のWEDDING DAY`.

Nodes:
- `77:196 / SIDE_HEADLINE_PINK`
- `77:197 / SIDE_HEADLINE_1`

At whole-item scale the large pink field behaved like a CTA/button or UI banner. It competed with the masthead and dominant photograph even though the headline itself was useful and should remain.

Anti-anchoring question: if the field did not already exist, would a professional editor add a large rounded saturated rectangle here? The comparison hypothesis was no; the semantic content could survive through direct type plus a minimal rule.

## Hypothesis

Replace containment with hierarchy:

- reduce the pink background to a slim vertical rule
- preserve the native headline text
- change the text from white to dark navy so it can sit directly over the current light-sky region

Expected improvement:
- less Web/UI-card language
- more visible photograph
- stronger masthead/hero authority
- headline remains readable and clearly attached to the cover promise

Possible regression:
- dark text could lose contrast on a future darker crop
- the headline could look under-designed without the field
- a later real-photo replacement may require contrast re-QA

Required evidence:
- rollback-safe comparison frame
- whole-spread comparison
- reading/page comparison
- actual-size/detail screenshot inspection
- native text preserved
- dominant image hashes, fold guide, semantic structure and rollback unchanged

## Safe prototype

Created comparison frame:
- `352:2 / V5_OUTER_SIDE_HEADLINE_FIELD_SUBTRACTION_TEST_2026_08_07`

Duplicate-only changes:
- `SIDE_HEADLINE_PINK`: `245 × 58`, radius `5` → `5 × 58`, radius `0`
- `SIDE_HEADLINE_1`: characters unchanged; white fill → dark navy `rgb≈(6,19,38)`

No image, crop, copy, semantic name, page geometry, fold guide, or Current node was changed during the prototype.

## Three-scale QA

### Whole item / thumbnail

PASS. The hero no longer carries a large CTA-like saturated block. The masthead and photograph become the primary cover silhouette, while the pink rule still gives the main cover promise a clear entry point.

### Reading / page scale

PASS. Reading order remains:

`るるぶWEDDING masthead → hero/main promise → hero caption → six cover lines`.

The headline remains clearly legible over the current light sky and is no longer visually heavier than its semantic importance.

### Detail / actual-size-like screenshot

PASS for the current dummy image. Native text remains crisp and editable. The 5 px rule remains visible. No clipping, reflow, collision, or accidental mask exposure was observed.

Important future condition: when the rejected cover hero is replaced by a quality-passing derivative or final photograph, headline contrast must be re-QA'd because the direct navy treatment depends on the local photograph luminance.

## Current adoption

After the comparison won, applied the same bounded change to Current:

- `77:196 / SIDE_HEADLINE_PINK`: `245 × 58` → `5 × 58`; corner radius `5 → 0`
- `77:197 / SIDE_HEADLINE_1`: native characters unchanged; white → dark navy

Preserved live evidence after adoption:
- comparison frame: `352:2`
- outer rollback: `59:2`
- inside rollback: `59:178`
- fold guide: `77:288`, visible
- cover hero hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, unchanged
- back-main hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`, unchanged
- outer native text nodes: `85`
- visible outer text nodes: `41`
- outer IMAGE-fill nodes: `14`

No photo-role state, Drive ID, asset ledger count, or V6 gate changed.

## Result

`VERIFIED / ADOPTED FOR V5 CURRENT`

The improvement is context-specific. It does not establish a universal rule that cover lines should always use direct type or vertical rules. A background field remains justified when the actual photograph cannot provide stable contrast or when containment has a genuine editorial function.

## Reusable lesson candidate

When a cover promise is already supported by a dominant photograph and masthead, test whether a large saturated headline field is solving contrast or merely adding interface-like visual weight. Prefer direct type plus the lightest semantic separator that passes actual-image contrast QA.

Status: `TESTED / NOT PROJECT_RULE`.

## Remaining gate

V5 remains below `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` because active photo-role provenance and quality are incomplete, especially the three dominant images. `PHOTO_ROLE_PASS` remains `0` and V6 production remains gated.
