# ADD-10 会場案内サイン — Clean-room V4 semantic-copy hardening — 2026-08-18

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / SEMANTIC_COPY_HARDENING_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Start authority SHA: `d981e140432e9a7849ca72e02e1768bdb480c978`

## Current selected authority

The older `ADD-10/QA.md` still centers retained legacy nodes `2:*`. For the reopened clean-room visual pass, the later `CLEANROOM-V4-STUDY-2026-08-15.md` is the selected-family evidence:

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- V4 left/right/forward: `32:3 / 32:15 / 32:27`
- long-copy stress: `33:3 / 33:15 / 33:27`
- retained legacy `2:*`: preserved and not mutated
- Drive: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`

This evidence supersedes the old QA node listing only for which family is the current clean-room selected visual candidate.

## Fresh defect and bounded repair

Live readback of selected V4 found:

- `[階数・部屋名 · LAYOUT DUMMY]` still printed in guest-facing copy;
- `[方向・設置地点は未確定 / EXPORT前に会場確認必須]` still printed as an internal authority/export note;
- category/context native text remained `textAutoResize=NONE` in ~10px-high boxes.

Before mutation, six full-frame hidden rollback clones were created: `38:2 / 38:15 / 38:28 / 38:40 / 38:53 / 38:66`.

Changes were limited to selected V4 + its stress evidence:

- floor/room selected copy → `[階数・部屋名]`;
- stress floor/room copy → `[12F・披露宴会場名が長い場合の表示確認]`;
- internal authority/export note hidden;
- category/context converted to native auto-height text.

Direction-axis vector, destination hierarchy, spacing grammar, palette, paper size, and retained legacy were unchanged.

## Post-write QA

Selected `32:3 / 32:15 / 32:27`:

- guest-facing proof language `0`;
- fixed ~10px text roles `0`;
- outside visible text `0`;
- text-to-text collision `0`;
- authority/export note hidden;
- IMAGE fills added `0`.

Stress `33:3 / 33:15 / 33:27`:

- proof language `0`;
- fixed ~10px text roles `0`;
- outside visible text `0`;
- text-to-text collision `0`;
- authority/export note hidden.

Stress frames were returned to hidden QA state after screenshot review.

## Three-scale visual QA

Selected left `32:3` freshly passed:

- whole/thumbnail max 500px;
- reading max 1000px;
- actual-size native `1400×1980`.

The reader-facing hierarchy is now `会場案内 → 受付 → RECEPTION → [階数・部屋名] → direction axis`, without internal export instructions.

Long-copy left `33:3` also passed actual-size review with `披露宴会場 / RECEPTION HALL / [12F・披露宴会場名が長い場合の表示確認]`; the direction axis follows expanded copy without collision.

## Drive / image decision

Drive authority was re-read live: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`, parent `0ADXt8irGMFGnUk9PVA`. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the defects were guest-copy leakage and native-text resilience, not missing pictorial art.

## Deferred finalization

Still unresolved and not fabricated: official destination/floor/room wording, exact direction per installation point, sign count/map, installation hardware/interference, venue-sign coordination, printer proof, and final export.

Result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / SEMANTIC_COPY_HARDENING_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
