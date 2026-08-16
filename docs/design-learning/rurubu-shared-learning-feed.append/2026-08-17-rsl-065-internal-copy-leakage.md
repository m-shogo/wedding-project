# RSL-065 — Internal implementation language must not occupy guest-facing editorial copy

Source scope/item: Rurubu WEDDING / V6 Profile-Q&A

State: `VERIFIED_LOCAL → VERIFIED_CROSS_ITEM_SUPPORT`

Consumed neutral hypothesis: non-Rurubu `2026-08-17-nrsl-internal-status-label-leakage.md`. No non-Rurubu production node, asset, item-specific path, layout, palette or current-state conclusion was inspected or copied.

## Visible problem

Preferred CK Q&A displayed `質問も答えもnative text。あとから自由に変更できます。` as the reader-facing deck. The underlying Q&A roles were correctly editable, but the sentence exposed implementation guidance and made the page read like a proof/template rather than a travel-magazine feature.

## Root-cause hypothesis

Editability belongs in structure and production evidence, not in the guest-facing hierarchy. When semantic placeholders and native roles already preserve truthfulness/editability, production instructions should be translated into real editorial copy or removed.

## Bounded test

Rollback-safe CL `1556:2` changed only the Q&A deck to native reader-facing copy:

`旅の途中で聞いた、ふたりの6つのこと。`

Questions, answers, photos, composed texture, profile page, image hashes and geometry were unchanged.

## Expected improvement

Remove proof-sheet/implementation language without hiding unresolved facts or weakening editability.

## Regression risk

Do not remove actual semantic placeholders merely because they look unfinished. Only remove or translate reader-irrelevant production/status language whose function is already represented structurally.

## Evidence

- Q&A actual-size `1556:40` = 794×1123: PASS;
- native text 26;
- IMAGE fills 3;
- text collision 0;
- 18px safe-area risk 0;
- visible text outside page 0;
- new generation / Drive save / binary placement / image hash changes: 0.

Figma: CL `1556:2`; CK `1553:79` retained hidden rollback.
GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CL-CJ-GUEST-FACING-COPY-CHRONOLOGY-QA-2026-08-17.md`.

## What remains Rurubu-specific

Exact Japanese wording, Q&A theme, typography, travel-magazine art direction, photo composition and section layout.

## Cross-item applicability

This Rurubu reproduction supports the already cross-item-verified neutral method across a materially different wedding magazine artifact. It does not itself promote a project-wide wording rule. Future items should preserve semantic placeholder truth while keeping implementation terms such as native text, QA, dummy, temp, proof, or editable instructions out of guest-facing copy unless those words are genuinely part of the content.
