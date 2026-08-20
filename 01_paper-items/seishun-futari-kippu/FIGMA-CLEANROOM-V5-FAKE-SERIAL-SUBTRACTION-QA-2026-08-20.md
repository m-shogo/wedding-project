# 青春ふたりきっぷ — Clean-room V5 fake serial subtraction QA

Date: 2026-08-20
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5 / FAKE_SERIAL_REMOVED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before write: `2abcb16a452091e9f15e0341550afd5fbb753cb7`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- selected clean-room root: `52:25 / V5 / ARCHIVAL JOURNEY COUPON / 720x250`
- Drive authority folder: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`

The selected V5 is the post-2026-08-15 clean-room direction. Legacy and earlier V3/V4 remain preserved; this change does not rebuild from or promote any legacy visual construction.

## Visible problem

Fresh actual-size screenshot of selected V5 showed `No.1024` at the lower right. The same artifact already states the verified event date `2026.10.24`, so `No.1024` was not a required fact, operational code, or necessary semantic field. It read as invented transport credential/data added only to make the artifact look ticket-like.

That conflicts with Current's sellable-artifact standard: do not create fake transport data, fake credentials, or decorative pseudo-metadata when the artifact identity is already carried by physical-paper structure and real facts.

## Bounded rollback-safe change

- preserved hidden rollback: `65:2 / ROLLBACK / V5 PRE FAKE SERIAL SUBTRACTION / 2026-08-20`
- selected root retained: `52:25`
- only changed node: `52:41 / TEXT / ISSUE`
- pre-change characters: `No.1024`
- change: `visible true → false`

No date, route, title, phrase, crop cue, ink band, date seal, type hierarchy, frame geometry, image role, or other semantic/factual content changed.

## Hybrid-authoring roles

- variable/factual copy: native Figma `TEXT`
- fixed flat support: editable Figma/vector roles
- generated/composed raster: none added in this change
- replaceable image roles: none added in this change
- variable facts baked into raster/SVG: `0`

Image generation was not used because the observed bottleneck was unnecessary fake metadata, not missing art or atmosphere.

## Three-scale screenshot QA

Post-change screenshots of `52:25`:

- whole-item / 360×125: PASS — title, route cadence, date seal and physical ticket boundary remain immediate; removing the serial does not create an obvious visual hole.
- reading scale / 720×250: PASS — the lower-right field becomes quieter and the route/title/date hierarchy is clearer.
- actual-size / native 720×250: PASS — no clipping or collision introduced; `No.1024` is absent.

The selected result remains intentionally asymmetric rather than refilling the freed area with a badge, English label, stamp, icon or substitute pseudo-data.

## Structure QA

Fresh metadata readback after the write:

- root: `52:25`, `720×250`
- issue node: `52:41`, native text, hidden
- title/date/route/phrase remain native editable text
- editable date-seal/vector and crop-cue roles remain separate from copy
- hidden rollback `65:2` preserved
- no rasterization or flattening introduced

## Drive / generated assets

Drive metadata was re-read before the Figma change and matched the exact non-Rurubu authority folder.

- Drive write: `0`
- generated candidates: `0`
- decision: `IMAGE_GENERATION_NOT_REQUIRED`

## Decision

`VERIFIED_LOCAL` visual defect repaired.

The post-2026-08-15 clean-room V5 remains the selected direction and retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Remaining work is deferred final copy/vendor/physical proof, not a reason to block the next non-Rurubu target.

Next queue target: `ADD-01 ウェルカムボード`.