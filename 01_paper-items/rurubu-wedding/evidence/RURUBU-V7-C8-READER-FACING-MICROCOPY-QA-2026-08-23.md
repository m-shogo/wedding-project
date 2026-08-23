# Rurubu WEDDING V7 C8 — reader-facing microcopy QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority re-read before write

- latest GitHub main at start: `e902918a7b1fe60addb81a9c39fad4a404d884b8`
- V6 control preserved: `JC + IX + JB + IZ + IT + JA`
- V7 pre-change current: `C7 2379:2 + K 2303:2 + F2 2351:2 + G2 2299:2 + H3 2311:2 + C6 2316:2`
- V8 preserved: `AV2 + AW3 + AL2 + AQ3 + AS4 + AT3`
- Drive V7 authority re-read: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`
- shared learning system, Rurubu feed, and neutral non-Rurubu feed re-read before the experiment.

## Fresh professional research

This run rotated away from numbering, folio and map truth toward editorial language / coverline responsibility.

Useful professional observations:

- JAGDA's typography teaching frames typography as beginning from linguistic meaning and then deciding how meaning is visually formed and transmitted.
- Society of Publication Designers material on coverlines describes them as reader-facing teasers that tell a potential reader what is inside; they are not merely decorative magazine texture.
- Eye's discussion of contents/navigation similarly treats editorial labels as navigation/sales/brand tools whose job depends on the publication and reader use.

Rurubu-specific hypothesis:

> Small editorial labels are not exempt from semantic accountability. If a visible label exists only to advertise the designer's study/version or simulate international-magazine texture, replace or hide it unless it performs a real reader-facing navigation, teaser, identity or production job.

## Live defect found on C7

C7 `2379:2` still contained two reader-visible microcopy problems:

1. `2379:9 / TEXT / V7_BACK_INDEX_KICK` = `4 WAYS / OUR ISLAND DAYS`
   - visually plausible, but it duplicated the nearby four-item browse function without adding reader information;
   - generic English texture rather than necessary editorial voice.
2. `2379:19 / TEXT / V7_BACK_FOLIO` = `V7 STUDY / HAWAII POP EDITORIAL`
   - internal production/schema language exposed to the reader;
   - directly violates the anti-AI/authenticity gate against internal-schema microcopy.

The rest of C7 remained materially strong and did not justify a redesign.

## Rollback-safe bounded experiment

Created C8 `2381:2` from live C7.

Only two visible microcopy responsibilities changed:

- `2381:9` changed from `4 WAYS / OUR ISLAND DAYS` to `ふたりの4つの過ごし方`.
- `2381:19` internal study label was hidden and renamed `TEXT / INTERNAL_STUDY_LABEL / HIDDEN`.

Preserved unchanged:

- front large semantic `4`;
- fixed `ハワイ / 旅するWEDDING` display lockup;
- all photography and crops;
- back `01–04` browse anchors;
- all factual/date copy;
- palette, root size and root position.

Old C7 `2379:2` was preserved as hidden rollback at `x=300000`.

## Three-scale QA

C8 `2381:2`:

- whole-item / 500 px: PASS — Japanese kick remains legible enough to establish the four-item browse role without introducing extra visual noise.
- reading / 1400 px: PASS — the back index now reads as reader-facing editorial language rather than imported English texture; removal of the internal study label leaves no awkward hole.
- actual-size canvas / `1587×1123`: PASS for DESIGN QA.

## Structural QA

Post-write readback:

- current root: `2381:2`, page `2052:2`, visible=true, `x=0 / y=13000`
- visible native text: `17`
- IMAGE fills: `6`
- text intersections: `0`
- bounded 18 px edge risks: `0`
- current V7 root overlap pairs: `0`
- index kick: `2381:9 / ふたりの4つの過ごし方`
- internal study label: `2381:19 / visible=false`
- rollback C7: `2379:2 / visible=false / x=300000`

## Professional critique

- Art director: stronger because the cover's microcopy now supports the actual publication premise rather than commenting on the design system.
- Editorial designer: improved semantic accountability; no loss of navigation or browse rhythm.
- Book designer: neutral-to-positive; no sequence/pacing regression.
- Typographer: Japanese label is plain and functional, avoids decorative bilingual redundancy.
- Photo editor: no photo/crop change; structural dummy truth unchanged.
- Print designer: no new print claim; exact printer template remains unknown.

## Decision

Promote C8 `2381:2` as current V7 Outer comparison candidate.
Preserve C7 `2379:2` as hidden rollback.

## Asset / truth

- image-model generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- production photo changes: `0`
- final Hawaii photography adopted: `0`
- factual/date copy invented: `0`
- V6 changes: NO
- V8 changes: NO

C8 is DESIGN-QA verified only. REAL CONTENT / PRINT TEMPLATE / PREFLIGHT / PHYSICAL PROOF remain separate and unresolved.
