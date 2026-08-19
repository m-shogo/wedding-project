# ADD-12 新郎新婦クイズカード — Trim / Bleed Guide Visibility Cleanup

Status: `VERIFIED_LOCAL / SELECTED + LONG_COPY GUIDE_VISIBILITY_PASS / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-20
Start authority SHA: `02b8155ae3642834a7063067b18d78ca8a242324`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected front: `26:3`
- selected back: `26:4`
- hidden long-copy front: `27:51`
- hidden long-copy back: `27:83`
- retained legacy: `1:2 / 1:26` — unchanged
- exact Drive authority: `ADD-12_新郎新婦クイズカード / 1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## Visible problem

Fresh actual-size review exposed production-guide geometry still visible on the guest-facing clean-room V3 surfaces:

- selected front `26:50 / ADD12/TrimGuide`: `visible=true`, opacity ≈ `0.18`;
- selected back `26:51 / ADD12/BleedGuide`: `visible=true`, opacity ≈ `0.12`;
- hidden long-copy roots carried the same guide visibility at `27:82 / 27:99`.

The guides were low-opacity, so they were easy to miss after earlier visual polish, but they still rendered as a thin outer border. Their job is authoring/print setup, not reader-facing design. Printing them would contradict the Current rule that internal implementation state belongs in structure/QA rather than guest-facing output.

## Bounded change

Before mutation, full hidden rollback copies were created:

- `47:2` — selected front pre-cleanup;
- `47:34` — selected back pre-cleanup;
- `47:51` — long-copy front pre-cleanup;
- `47:83` — long-copy back pre-cleanup.

Only visibility changed:

- `26:50 / ADD12/TrimGuide` → hidden;
- `26:51 / ADD12/BleedGuide` → hidden;
- `27:82 / ADD12/TrimGuide` → hidden;
- `27:99 / ADD12/BleedGuide` → hidden.

Guide nodes and their geometry remain preserved in Figma for internal production reference. Question, choices, writing lines, answer method, name/message roles, typography, palette and all semantic copy were unchanged. No raster/image/SVG asset was added.

## Three-scale visual QA

Post-change screenshots:

- front whole-item / ~500 px: PASS; outer proof-border reading removed;
- front native `620×875`: PASS;
- back whole-item / ~500 px: PASS; cream paper field now ends cleanly without the mint bleed-outline artifact;
- back native `620×875`: PASS.

The change is deliberately small in geometry but high-value for print truth: it removes a production-only mark from final visible artwork rather than adding decoration.

## Structure / long-copy QA

Post-write readback:

### Selected front `26:3`
- visible native text: `14`;
- outside visible text: `0`;
- text collision: `0`;
- IMAGE fills: `0`;
- `ADD12/TrimGuide visible=false`.

### Selected back `26:4`
- visible native text: `8`;
- outside visible text: `0`;
- text collision: `0`;
- IMAGE fills: `0`;
- `ADD12/BleedGuide visible=false`.

### Hidden long-copy `27:51 / 27:83`
- front visible-native-text descendants: `14`;
- back visible-native-text descendants: `8`;
- outside text: `0 / 0`;
- text collision: `0 / 0`;
- IMAGE fills: `0 / 0`;
- internal Trim/Bleed guide nodes remain present but hidden.

## Drive / asset decision

Live Drive metadata was re-read immediately before the Figma write and matched `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`.

- Drive writes: `0`;
- image generation: `0`;
- generated/composed asset requirement: `none`.

The defect was production-guide visibility, not missing visual material.

## Learning state

State: `VERIFIED_LOCAL`.

Failure fingerprint: `VISIBLE_INTERNAL_PRINT_GUIDE_ON_GUEST_ARTWORK`.

Do not promote this as a broad visual-style rule from one item. The transferable QA hypothesis is narrower: before final visual approval, distinguish semantic/physical printed rules from authoring-only trim/bleed/safe-area guides and verify the latter are not visible in guest-facing selected and stress roots.

A read-only spot check of ADD-16 selected/stress roots found no trim/bleed/safe-area guide nodes, so no second-item reproduction was claimed and no shared-learning promotion was written.

## Result

`GUIDE_VISIBILITY_PASS / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS_MAINTAINED / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
