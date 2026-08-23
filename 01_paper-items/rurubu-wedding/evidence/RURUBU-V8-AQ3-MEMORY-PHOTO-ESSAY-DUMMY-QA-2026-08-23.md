# Rurubu WEDDING V8 AQ3 — Memory/Guide photo-essay structural-dummy QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current root after promotion: `2337:2`
Previous AQ2 rollback: `2335:2`

## Why this test followed AQ2

AQ2 successfully removed misleading step ordinals from the browse-oriented `寄り道案内`. It improved V8 internally, but a common-scale Memory-role comparison exposed a larger problem:

- V6 IZ `2138:2` uses dominant waterfront/cafe/dining photography and is strongest for immediate place-memory recognition.
- V7 G2 `2299:2` uses a more energetic photo-led travel-magazine sequence.
- V8 AQ2 `2335:2` is clearer as a book system but remains much quieter and visually underuses photography; at thumbnail scale some whitespace reads as absence rather than pacing.

This comparison changed the next action: do not keep polishing text-only whitespace. Test V8's stated `photography-as-essay` philosophy directly.

## Asset truth before the test

Per Rurubu authority, V6 imagery reused in V7/V8 is a **STRUCTURAL PHOTO DUMMY** unless separately verified as the intended final role.

Read-only source inspection of frozen V6 IZ found these visible replaceable images:

- waterfront source `2138:4`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`, intrinsic `1356×560`;
- cafe source `2138:15`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- skyline source `2138:29`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- dining source `2138:36`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, intrinsic `732×498`.

No source is upgraded to final V8 photography by this test.

## Clean-room structural photo experiment

AQ3 `2337:2` cloned current AQ2 and kept all AQ2 typography/content/navigation decisions. It added only two independently composed replaceable photo roles:

1. `2337:35 / PHOTO_DUMMY / MEMORY_WATERFRONT_ESSAY_REPLACEABLE / NOT FINAL`
   - hash `539c259be8036b481d06b4f76db9a39b407d90e8`
   - role geometry `x=54 / y=828 / 650×150`
   - editorial job: setting/closing horizon for the left-page sensory memory.
2. `2337:36 / PHOTO_DUMMY / NIGHT_TABLE_ESSAY_REPLACEABLE / NOT FINAL`
   - hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
   - role geometry `x=1160 / y=612 / 305×260`
   - editorial job: specific visual close for the right-page `夜 / 食卓で終える` beat.

The composition does not copy V6 IZ or V7 G2 crop hierarchy, collage angles, numbering, palette behavior or image geometry. Only existing image bytes are reused as explicit temporary structural material.

## Three-scale QA

### 500px whole-item

PASS and stronger than AQ2 within V8.

The spread now has two semantically distinct photographic anchors without turning into a collage or UI/card system. The left horizon image gives the memory prose a place-based closing beat; the right dining image gives `夜` an editorial image owner.

### 1400px reading

PASS.

Type remains primary. Images support rather than overpower the text. `朝 / 昼 / 夕 / 夜` remain the navigation system; no ordinal layer was restored.

### 1587×1123 actual-size

PASS for DESIGN STRUCTURE.

No text collision, clipping or safe-area regression was introduced.

## Structural / source QA

AQ3 before promotion:

- parent `2052:2`
- visible native text `17`
- visible IMAGE fill nodes `2`
- text intersections `0`
- bounded 18px text safe risks `0`
- images retain explicit `PHOTO_DUMMY / ... / NOT FINAL` names

Intrinsic/source readback:

- waterfront: source `1356×560`, placed `650×150`;
- dining: source `732×498`, placed `305×260`.

Under the current **unverified** physical assumption `420×297 mm`, rough limiting effective resolution is about `200 ppi` for the waterfront role and about `184 ppi` for the dining role. This is acceptable only for structural design study evidence; it is not a print-photo approval.

## Professional critique

- **Art director:** PASS — V8's idea becomes clearer: restrained typography plus a small number of meaningful photographic observations.
- **Editorial designer:** PASS — images have distinct reader jobs and do not create equal repeated modules.
- **Book designer:** PASS — whitespace now participates in pacing around photographic beats rather than reading purely as omission.
- **Typographer:** PASS — AQ2's Japanese hierarchy and non-linear browse semantics are preserved.
- **Photo editor:** STRUCTURAL PASS / REAL CONTENT BLOCKED — image roles are defensible, but the actual photographs are dummies and must be replaced by role-specific legitimate photography.
- **Print designer:** DESIGN QA only — source resolution, exact printer template, bleed/trim, PDF preflight and physical proof are not approved.

## Promotion state

Current:

`2337:2 / V8 CLEANROOM AQ3 / BOOK EDITION / MEMORY+GUIDE / PHOTO-ESSAY / CURRENT / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED / 2026-08-23`

- visible `true`
- `x=0 / y=9850`
- parent `2052:2`

Rollback:

`2335:2 / ROLLBACK / V8 AQ2 / MEMORY+GUIDE / NONLINEAR-BROWSE-TEXT-ONLY / HIDDEN / 2026-08-23`

- visible `false`
- `x=300000 / y=9850`

Older AQ `2256:2` remains hidden rollback.

## Learning state

`RSL-239 / F-RSL-239-RESTRAINED-SPREAD-WITHHOLDS-ROLE-NECESSARY-PHOTOGRAPHY-UNTIL-WHITESPACE-BECOMES-ABSENCE`

State: `TESTED_LOCAL`.

Reason for not promoting further: the composition improvement is verified with structural dummies, but legitimate role-specific photography and final print behavior are not verified. Re-test after real asset replacement before considering `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Asset truth

- new image-model generation: `0`
- Drive write: `0`
- new image hashes: `0`
- V6 modified: NO
- V7 modified: NO
- existing V6 image hashes reused in V8: `2`, explicitly STRUCTURAL PHOTO DUMMIES
- native/factual copy changed: `0`
- DESIGN QA: PASS
- REAL CONTENT QA: BLOCKED on legitimate role-specific photography
- PRINT TEMPLATE/PREFLIGHT: NOT VERIFIED
- PHYSICAL PROOF: NOT VERIFIED
