# ADD-14 二次会案内 — A6 actual-size readability hardening

Status: `VERIFIED_LOCAL / SELECTED_V3_UPDATED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start main SHA: `9377a7d5cb4fa3d48ff1b36992e6d2c78af011ae`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- selected clean-room A6: `32:3`
- selected clean-room A5: `32:29` — not changed in this bounded pass
- hidden long-copy A6: `33:2`
- retained legacy A6/A5: `1:2 / 1:18` — untouched
- Drive authority: `ADD-14_二次会案内 / 1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`

## Visible / actual-size issue

Fresh native A6 review showed that the practical lower-copy roles were only `9 px` with `14 px` line-height:

- `TXT_ACCESS`
- `TXT_FEE`
- `TXT_RSVP_DEADLINE`

The composition still read well at thumbnail scale, but these guest-critical roles were too small relative to the physical A6 working size (`592×420`) and were materially weaker than the headline/time hierarchy at native detail scale.

This was a readability defect, not an image/art-direction deficiency. No generated asset was justified.

## Rollback-safe test

Before changing selected V3, two isolated QA duplicates were created:

- `43:56 / QA / ADD-14 / A6 BODY 11PX / 2026-08-18`
- `43:83 / QA / ADD-14 / A6 BODY 11PX STRESS / 2026-08-18`

The first naive 11 px test preserved current copy but caused the realistic stress lower grid to extend beyond A6. Instead of shrinking the type back down, the lower information architecture was rebalanced according to expected text mass.

Final tested lower-grid contract:

- body copy: `9 px / 14` → `11 px / 16`
- lower grid y: `338` → `330`
- access column: `260` → `220`
- fee column: `110` → `120`
- RSVP/contact column: `110` → `140`
- existing 20 px inter-column gaps retained

The wider RSVP column is intentional because its realistic copy mass is larger than the short access/fee labels and equal widths are not required by the visual system.

## Promotion / rollback

Exact pre-change rollbacks were created before promotion:

- selected rollback: `44:2 / ROLLBACK / ADD-14 / A6 PRE-READABILITY-HARDENING / 2026-08-18`
- stress rollback: `44:29 / ROLLBACK / ADD-14 / A6 STRESS PRE-READABILITY-HARDENING / 2026-08-18`

The verified treatment was then applied only to selected A6 `32:3` and hidden A6 stress `33:2`. A5 and retained legacy production were not changed. QA comparison duplicates were hidden after promotion.

## Post-change structure QA

Selected A6 `32:3`:

- lower grid y `330`, height `55`, bottom `385 / 420`
- `TXT_ACCESS`: 11 px / 16, width 220, height 32
- `TXT_FEE`: 11 px / 16, width 120, height 16
- `TXT_RSVP_DEADLINE`: 11 px / 16, width 140, height 32
- visible text outside root: `0`

Realistic long-copy A6 `33:2`:

- lower grid y `330`, height `87`, bottom `417 / 420`
- access height `48`
- fee height `64`
- RSVP/contact height `64`
- visible text outside root: `0`

The long-copy result fits with a small but positive 3 px bottom reserve and does not require reducing body text below 11 px.

## Screenshot QA

- whole / 500 px: PASS; `夜のつづきへ。` and the reception/start/end route remain dominant while the practical copy is still readable.
- reading/native A6: PASS at `592×420`; the lower practical information no longer reads as microcopy.
- realistic long-copy/native A6: PASS after the width rebalance; no clipping or root escape.

No image fills or generated assets were added. The night-specific visual grammar, route axis, venue hierarchy and A5 version remain unchanged.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_ACTUAL_SIZE_READABILITY_HARDENED / A6_LONG_COPY_STRESS_PASS / CLEANROOM_V3_SELECTED / LEGACY_PRESERVED / NOT_PRINT_READY`

Final venue/times/fee/access/RSVP/contact facts and physical printer proof remain blocked/deferred and were not invented.
