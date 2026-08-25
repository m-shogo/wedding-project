# Rurubu V7/V8 Cafe/Table — Print Color / Proof Gate

Date: 2026-08-25
Scope: Rurubu WEDDING only
Status: `PROFESSIONAL_RESEARCH_OBSERVED → ROOT_CAUSE_HYPOTHESIS / REAL-PHOTO-TEST-BLOCKED / PRINTER-PROFILE-BLOCKED`

## Why this pass exists

Cafe/Table is currently blocked by role-correct real photography. The existing Hawaii wedding pool has already been audited 36/36 and contains 0 eligible food/table/interior/shared-meal frames. This pass does **not** substitute layout polish for missing photography.

The new question is narrower: when role-correct Cafe/Table candidates become available, should screen appearance alone be allowed to decide adoption?

Professional print/color-management research says no. Food photography can look vivid on an emissive RGB display while losing useful hue separation, highlight detail, midtone modeling or shadow separation under the actual print condition. Printer, paper and ICC conditions therefore remain a distinct truth gate from photo-role selection and screen design QA.

## New professional observations

### JAGAT — color management / proofing

- JAGAT TG tools treat ICC-profile analysis, image gamut analysis, print color management and image comparison as separate quality-management tasks.
- JAGAT's current DTP curriculum defines color proofing as a check of color-image quality before press and a source of correction instructions for production.
- Therefore a screen-approved food photograph is not evidence that the same appetite/texture hierarchy survives the actual print condition.

Sources:
- https://www.jagat.or.jp/cat6/tgtool
- https://www.jagat.or.jp/cat5/dtp/exam/curriculum/1-6
- https://www.jagat.or.jp/pri230829

### SAVEUR — food-first editorial authenticity

SAVEUR's retrospective on its covers describes its early identity as moving away from pristine studio-food imagery toward food that was messy, real and photographed in the field. The useful Rurubu takeaway is not a style copy: food photography should retain believable material texture and context instead of relying on synthetic saturation or immaculate stock-like polish.

Source:
- https://www.saveur.com/gallery2/Saveur-Covers-Gallery/

## Rurubu-specific hypotheses

### V7 H10 photo authority

Live authority: `2305:2`
Hidden rollback before this pass: `2530:2`
New nodes:
- `2530:31 / PRINT COLOR / PROOF / LABEL`
- `2530:32 / PRINT COLOR / PROOF / BODY / PRINTER-PROFILE-BLOCKED`

Hypothesis: V7's high-energy food photography may still fail professionally if appetite is created mainly by screen saturation, crushed shadows or clipped highlights. Candidate evaluation should preserve high-quality RGB masters and prefer food/plate/interior tonal information that can plausibly survive later proofing. The real printer/paper/ICC condition must be tested after candidate adoption, not invented now.

QA after authority mutation:
- screenshot `1200×1295`: PASS;
- visible native text `30`;
- text intersections `0`;
- bottom reserve `53px`;
- parent `2052:2`.

Production H10 `2467:2` was not changed.

### V8 AS7 photo authority

Live authority: `2527:2`
Hidden rollback before this pass: `2530:33`
New row:
- `2530:64 / ROW / PRINT COLOR`
- `2530:65 / LABEL / PRINT COLOR`
- `2530:66 / BODY / PRINT COLOR / PRINTER-PROFILE-BLOCKED`

Hypothesis: V8's restraint must not turn into muddy low-contrast reproduction. A quiet dining essay still needs separable food midtones, plate whites, human gesture and room shadows. `book restraint` is not permission for black crush or flat tonal collapse.

QA after authority mutation:
- screenshot `1400×1080`: PASS;
- visible native text `22`;
- text intersections `0`;
- new row `1296×72` at `y=884`;
- bottom reserve `124px`;
- parent `2052:2`.

Production AS7 `2454:25` was not changed.

## Learning state

Do **not** create or promote a new RSL yet.

Current state:
`OBSERVED → ROOT_CAUSE_HYPOTHESIS`

Reason: no role-correct real food image has yet been placed in H10 or AS7, and no printer/paper/ICC profile or physical proof exists. This is a decision gate derived from professional research, not verified project learning.

Promotion requires at minimum:
1. role-correct photo candidate(s),
2. screen comparison and selected crop/area,
3. effective-resolution check,
4. known printer/paper/profile or defensible proof condition,
5. output comparison showing whether the color/proof gate actually changes selection or correction.

## Asset truth

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- production photo placements: `0`
- new image hashes: `0`
- H10 production changed: `NO`
- AS7 production changed: `NO`
- V6 changed: `NO`

## Next high-value action

Produce/select role-correct Cafe/Table photography first. Then evaluate V7 as a three-role picture-edit set and V8 as a materially different single dining essay. Only after a photo is genuinely eligible should color/proof behavior become an adoption/refinement gate.