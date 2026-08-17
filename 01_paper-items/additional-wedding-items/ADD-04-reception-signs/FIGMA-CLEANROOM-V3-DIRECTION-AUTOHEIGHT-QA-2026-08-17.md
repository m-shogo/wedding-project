# ADD-04 受付サイン — Clean-room V3 direction-field auto-height QA

Status: `CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DIRECTION_AUTOHEIGHT_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `415c55e90fcb81ed6f597d0ca09ae8988d0c74ba`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- selected groom V3: `16:2 / CLEANROOM_V3_ADD04_GROOM_TYPO_BAND`
- selected bride V3: `16:17 / CLEANROOM_V3_ADD04_BRIDE_TYPO_BAND`
- long-copy proofs: `16:32 / 16:47`
- Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

Legacy production was not changed.

## Issue found

The selected V3 pair already had resilient optional-name handling through `GROUP_NAME_FIELD_AUTO`, but live structure readback found a mismatch in the other variable semantic field: `TXT_DIRECTION_TBD` was still `textAutoResize=NONE` with a fixed `24px` height in selected groom/bride and both long-copy proofs.

The current short `[方向]` placeholder rendered correctly, so screenshot-only QA would not reveal the risk. A later authoritative reception-direction sentence could therefore become dependent on the current fixed-height box.

## Bounded repair

Before mutation, hidden rollback copies were created for all four affected roots.

Only `TXT_DIRECTION_TBD` was changed to native `textAutoResize=HEIGHT` in:

- groom selected `16:12`
- bride selected `16:27`
- groom stress `16:42`
- bride stress `16:57`

No band geometry, side label, optional-name auto-layout, route line, footer, palette or legacy production was changed.

## QA

Natural-height readback after repair:

- selected groom direction: `27px`, auto-height
- selected bride direction: `27px`, auto-height
- stress groom direction: `27px`, auto-height
- stress bride direction: `27px`, auto-height
- direction bottom: `712px`
- route line y: `750px`
- verified direction-to-route clearance: `38px`
- visible text outside root: `0` across selected + stress frames

Fresh selected groom actual-size screenshot remained visually unchanged at `740×1050`: `新郎側受付 → GROOM RECEPTION → [お名前] → [方向]` remains the intended hierarchy, with no new UI containment or decoration.

The existing long-name auto-layout remains intact and no raster/image fill was added.

## Drive / assets

Drive authority metadata was live-read before the Figma change. No asset write or image generation was required because this was a native variable-text resilience defect.

## Decision

`CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS` remains valid with a safer editable contract.

Still deferred: authoritative optional receptionist/name use, actual direction wording, final stand/placement conditions, vendor bleed/template and physical 2m proof.