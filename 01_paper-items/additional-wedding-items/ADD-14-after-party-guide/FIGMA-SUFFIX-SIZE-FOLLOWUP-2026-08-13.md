# ADD-14 二次会案内 — Suffix Size Visual Follow-up — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_SUFFIX_SIZE_PASS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before the production correction: `e0b4da8c9590c2fc7352171f8dad6fe8e981de9a`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- production A6: `1:2 / FRAME_AFTER_PARTY_GUIDE_FRONT`
- production A5: `1:18 / FRAME_AFTER_PARTY_GUIDE_A5`
- existing rollback copies: `17:2 / 17:27`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- Drive parent readback: `0ADXt8irGMFGnUk9PVA`

## Fresh actual-size diagnosis

A6 `592 × 420` and A5 `840 × 592` retained the sellable V2 itinerary composition, but proof-only `LAYOUT DUMMY` tokens were still too large after the earlier color-only polish. Venue, status, address, timing, fee, access, RSVP, contact, QR and notice placeholders therefore retained avoidable proof-sheet/form character.

## Production correction

Only the `LAYOUT DUMMY` token ranges were resized. Semantic placeholder wording, Japanese-first hierarchy, venue/time fields, QR geometry, layout grid, fills and facts were preserved.

A6 suffix sizes now use a restrained authoring scale:

- status/contact: `6 px`
- venue/time: `7 px`
- address/fee/access/RSVP/QR/notice: `5.5 px`

A5 preserves the larger-size proportional relationship:

- status/contact: `8.5 px`
- venue: `10 px`
- time: `9 px`
- address/fee/access/RSVP/notice: `7.5 px`
- QR: `7 px`

The existing warm-gray proof-token fill was preserved. Twenty-four native text nodes were changed; no rasterization or content replacement occurred.

## Post-write QA

Fresh A6 and A5 actual-size screenshots were captured after the correction.

Structural readback:

- A6 `1:2`: `592 × 420`, `18` visible native text nodes, `IMAGE fill 0`, `outside text 0`, `clipsContent=true`
- A5 `1:18`: `840 × 592`, `18` visible native text nodes, `IMAGE fill 0`, `outside text 0`, `clipsContent=true`
- all twelve `LAYOUT DUMMY` tokens per size read back at the intended reduced sizes with the existing warm-gray fill
- variable/factual fields remain native editable text

The proof metadata now recedes behind the guest-facing itinerary hierarchy at actual size without weakening semantic placeholder clarity.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The bottleneck was proof-metadata typography, not imagery. Drive writes: `0`.

## Result

`PLACEHOLDER_SUFFIX_SIZE_PASS`.

ADD-14 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE`. Final event facts, confirmed QR destination and physical print proof remain `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.