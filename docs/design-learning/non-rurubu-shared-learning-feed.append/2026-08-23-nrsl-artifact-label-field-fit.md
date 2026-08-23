# NRSL append — Artifact label + owning field must read as one intentional role

Source scope/items: non-Rurubu / BOARDING PASS + ADD-12 新郎新婦クイズカード

State: `VERIFIED_CROSS_ITEM → CROSS_ITEM_CANDIDATE`

## Visible problem

Two materially different artifacts independently showed the same typography/field ownership failure while remaining structurally inside their canvases:

1. BOARDING PASS front: `ESCORT TICKET` wrapped only because its native text box was narrower than the physical plum binding strip that owned the artifact identity.
2. ADD-12 quiz back: `AFTER THE QUIZ` stayed on one line, but the fixed blue score tab ended before the native label, so the label visually escaped/clipped its owning field.

Both passed ordinary page containment. The defect appeared only when judging the **native label and its physical field as one compositional role**.

## Root-cause hypothesis

Short artifact/identity labels can look accidental when the geometry of the text role and the geometry of the physical field that claims it are authored independently. Figma may report no page overflow while the label still wraps or visually escapes for purely geometric reasons.

## Bounded tests

### BOARDING PASS

- retained Current visual system;
- changed only the artifact-label text geometry inside the existing binding strip;
- first 130px width still wrapped and was rejected;
- 146px width at 17px Inter Bold produced a deliberate one-line label without collision;
- verified whole / reading / actual size / long-copy.

Evidence:
- `01_paper-items/boarding-pass/FIGMA-ARTIFACT-LABEL-MOJIKUMI-POLISH-2026-08-22.md`

### ADD-12

- retained Current `ANSWER PUNCH CARD` visual system;
- changed only the fixed score-tab width `158 → 236px` on Current back and its long-copy proof;
- native `AFTER THE QUIZ` text, font, size, x/y and wording did not change;
- complete pre-change rollback copies preserved at `66:2 / 66:17`;
- Current and long-copy screenshot QA both PASS after repair.

Evidence:
- Figma `oZ24SbwGkeAfFJcXlbxCoD`
- Current back `59:84`, score tab `59:86`, label `59:88`
- stress back `59:129`, score tab `59:131`, label `59:133`
- Drive authority `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- item evidence `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/FIGMA-BACK-SCORE-TAB-LABEL-FIT-QA-2026-08-23.md`
- item QA `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/QA.md`

## Expected improvement

Fixed reader-facing artifact identity reads as intentional print furniture instead of accidental wrapping, clipping, or field escape.

## Regression risk

Blindly forcing every English label to one line or widening every field can damage hierarchy, physical plausibility, negative space, or trim/binding behavior. Some labels are intentionally multiline. The transferable rule is not a one-line mandate.

## Three-scale evidence

Both source items were verified at:

- whole-item / thumbnail;
- reading scale;
- actual native size;
- realistic long-copy proof where applicable.

No image generation or Drive write was required.

## What must remain item-specific

Do not transfer:

- BOARDING PASS plum binding strip, coordinates, colors or ticket grammar;
- ADD-12 blue score tab, punch-card layout, quiz copy or exact 236px width;
- English wording itself.

## Cross-item applicability

For a short reader-facing artifact/identity label that sits on a band, tab, spine, stub, ticket field, paper strip, score field, or other physical owner:

1. verify the label's line break/clipping visually, not only page overflow;
2. evaluate text + owning field as one role;
3. test the smallest bounded geometry repair first;
4. keep intentional multiline labels when they are compositionally deliberate;
5. re-run long-copy/variant QA if the field shares space with variable content.

## Next receiving-item experiment

Use this check only when another materially different item shows a screenshot-visible label/field mismatch. Do not reopen stable items merely to search for a third example. If independently reproduced again without regression, consider promotion to a project-wide default typography QA check.