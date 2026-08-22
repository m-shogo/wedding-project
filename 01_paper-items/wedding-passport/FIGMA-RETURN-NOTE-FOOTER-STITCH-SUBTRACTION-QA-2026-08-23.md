# WEDDING PASSPORT — RETURN NOTE footer-stitch subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_POLISH_ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before Git write: `ecbc079cadfe81c052e5aa205eaaa9fa8afa8843`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current back: `181:80 / CURRENT_SELECTED / PASSPORT BACK / RETURN NOTE`
- long-copy stress: `182:30`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata was read back live; Drive writes `0`.

## Visible problem

The Current back remained structurally sound and professionally selected, but the eight small dark horizontal `BACK / STITCH 1…8` marks inside the mustard footer had become visually ambiguous at whole-item scale. Because they sat immediately to the right of `[新郎新婦名]`, they could read as a fake form/signature underline or arbitrary dash decoration rather than as convincing physical binding.

The physical-journal identity does not depend on this row: the front already owns the clear vertical stitched-binding gesture, while the back retains the ivory letter, brick fold, cobalt edge and mustard footer.

## Bounded comparison

A rollback-safe comparison was created from Current only for this isolated polish test:

- `189:2 / QA / VERIFIED / PASSPORT BACK / NO FOOTER STITCH ROW / 2026-08-23`

Only the eight horizontal footer stitch marks were hidden. No copy, type size, color field, position, crop, semantic placeholder, or other physical-paper element changed.

Whole-item / reading comparison favored the no-stitch version: the couple-name footer reads as a deliberate closing field rather than a form line, while the return-note / physical-journal identity remains intact.

## Production change

Before mutation, full hidden rollback copies were preserved:

- `189:23 / ROLLBACK / PASSPORT BACK / PRE-FOOTER-STITCH-SUBTRACTION / 2026-08-23`
- `189:44 / ROLLBACK / PASSPORT BACK STRESS / PRE-FOOTER-STITCH-SUBTRACTION / 2026-08-23`

Adopted change:

- Current back `181:80`: `BACK / STITCH 1…8` hidden.
- long-copy stress `182:30`: corresponding `BACK / STITCH 1…8` hidden.
- completed comparison `189:2` hidden after verification.

## Three-scale QA

- whole-item: PASS — cleaner footer, no loss of passport/field-journal identity;
- reading scale: PASS — couple-name role is clearer and less form-like;
- native 1480×2100 detail: PASS — remaining paper/fold/color geometry is intact;
- realistic long-copy stress: PASS after the same subtraction.

## Structure readback

Current back `181:80`:
- visible native text `8`;
- fixed-height text `0`;
- outside visible text `0`;
- text-text collisions `0`;
- visible footer stitches `0`;
- IMAGE fills `0`.

Stress back `182:30`:
- visible native text `8`;
- fixed-height text `0`;
- outside visible text `0`;
- text-text collisions `0`;
- visible footer stitches `0`;
- IMAGE fills `0`.

## Image / asset decision

Image generation: `0`. SVG: `0`. Drive writes: `0`.

The diagnosed defect was ambiguous fixed micro-decoration, not missing imagery or asset quality. Adding an image or new ornamental asset would not address the problem.

## Learning state

`VERIFIED_LOCAL` only.

Transferable hypothesis: when a small repeated physical cue sits next to variable/factual text, verify at whole-item scale that it still reads as the intended physical construction rather than a form underline, fake credential, or arbitrary decoration. Do not promote a global rule from one Passport case; another materially different artifact must reproduce the issue first.

Item-specific: do not transfer Passport stitch placement, palette, footer geometry, or binding treatment.

## Result

WEDDING PASSPORT remains:

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

The Current direction was not reopened or replaced; this was a bounded reader-facing fixed-decoration correction with rollback evidence.
