# RURUBU V8 AW8 — Person-name label ordinal QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Baseline

V8 Profile/Q&A AW7 `2439:2` was already personal-content truth-gated, with unresolved answers shown as native `回答待ち`. Two person labels still read:

- `2439:25 / P_A_K`: `SHOGO / 01`
- `2439:28 / P_B_K`: `SHI-CHAN / 02`

The labels identified the people, but `01 / 02` did not currently map to verified chapter order, navigation, quantity, time, issue, or cross-reference structure.

## New professional input

This run rotated research toward current editorial/interview practice rather than reusing the recent photo/section-number references. Society of Publication Designers examples and Pentagram editorial work were used only to test one decision principle: interview/profile systems can vary structure by article and content role; systematic numbering is not itself evidence of stronger editorial design.

The hypothesis was deliberately narrow: person identity labels should keep the names but should not carry decorative ordinal furniture unless those ordinals perform a real reader-facing job.

## Bounded Figma experiment

Immediate pre-write readback verified AW7 current at `x=1800 / y=8500`, parent `2052:2`, visible, with exactly one visible semantic match for each person label.

AW8 was created rollback-safe from AW7. Only two native text strings changed:

- `2459:25`: `SHOGO / 01` → `SHOGO`
- `2459:28`: `SHI-CHAN / 02` → `SHI-CHAN`

The nodes were renamed to explicit semantic roles:

- `P_A_K / PERSON NAME / NO DECORATIVE ORDINAL`
- `P_B_K / PERSON NAME / NO DECORATIVE ORDINAL`

No font family, weight, size, x/y, object portrait, Q&A question/answer content, `回答待ち`, palette, grid, image hash, or root geometry changed.

## Three-scale critique

### Whole-item / 500px — PASS

The page keeps its V8 book/interview identity. Removing `/ 01` and `/ 02` does not create dead space or weaken the left-page rhythm; the person labels read more directly as identity rather than record slots.

### Reading / 1400px — PASS

The reading order remains `ふたり → ふたりの輪郭。 → SHOGO / SHI-CHAN prompts → reader-facing close` on the left and `Q&A → questions/回答待ち` on the right. The labels no longer imply an unexplained sequence.

### Actual size / 1587×1123 — DESIGN QA PASS

The shorter labels remain optically stable at the original Noto Sans JP Bold / 14px treatment. No compensating decorative element was needed.

## Professional critique

- Art director: PASS — the restrained publication personality is preserved; the page does not lose its idea.
- Editorial designer: PASS — names identify the two people directly; unexplained numbering no longer competes with the actual Q1/Q2/Q3 interview navigation on the facing page.
- Book designer: PASS — removes one small template/system cue without flattening the page rhythm.
- Typographer: PASS — no new wrap, spacing, or Japanese/Latin mismatch was introduced.
- Photo editor: PASS for DESIGN QA only — the object portrait remains a structural dummy and is not promoted as real identity evidence.
- Print designer: PASS for current design structure only — no printer/preflight/physical-proof claim.

## Structure QA

Post-write readback:

- current AW8: `2459:2`
- parent: `2052:2`
- current position: `1800 / 8500`
- visible native text: `20`
- visible IMAGE fills: `1`
- text intersections: `0`
- 18px edge risks: `0`
- Japanese text assigned to Inter: `0`
- current V7/V8 root overlap: `0`

Rollback:

- AW7 `2439:2`
- renamed `ROLLBACK / V8 AW7 / PROFILE+Q&A / PRE-PERSON-NAME-LABEL-CLEANUP / HIDDEN`
- `visible=false / x=300000 / parent=2052:2`

## Learning disposition

Do not create a new failure fingerprint. This is another bounded reproduction of existing RSL-251:

`F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

The verified principle remains conditional: keep numbers when they perform quantity, verified sequence, time, issue, finding/navigation, cross-reference, or another authoritative structural job. Remove or revise only unsupported editorial numbering.

State remains `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE` because all evidence is still inside Rurubu WEDDING.

## Truth / asset boundary

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- final photography: `0`
- personal answer invention: `0`
- V6 changes: `0`
- V7 production changes: `0`

AW8 is a preferred V8 comparison candidate for this role, not print-ready and not a global winner.
