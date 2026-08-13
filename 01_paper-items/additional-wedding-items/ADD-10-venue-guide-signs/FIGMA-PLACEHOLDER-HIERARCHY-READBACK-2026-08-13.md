# ADD-10 会場案内サイン — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `8f13c2bd97d50eb1130ffa9edb175224a25f8685`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- production roots: A4 `2:2 / 2:13 / 2:24`, A5 `2:35 / 2:46 / 2:57`
- Drive folder: `ADD-10_会場案内サイン` / `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- Drive metadata readback confirmed the exact folder ID and parent `0ADXt8irGMFGnUk9PVA`.

## Fresh live verification

The previous evidence incorrectly left A5-forward `2:57` as a color/opacity follow-up. Fresh text-range readback now verifies that the production token treatment is already normalized.

A5-forward `2:57` currently has:

- destination JP semantic field `52 px`; `LAYOUT DUMMY` suffix `10 px`, muted warm-gray, opacity about `0.76`;
- destination EN semantic field `17 px`; suffix `7 px`, muted warm-gray, opacity about `0.76`;
- floor/room semantic field `22 px`; suffix `8 px`, muted warm-gray, opacity about `0.76`;
- direction semantic field `16 px` rust; suffix `7 px`, muted warm-gray, opacity about `0.76`.

This matches the proof-metadata hierarchy already established on the other five production templates. The previously recorded A5-forward family-consistency defect is therefore closed in live Figma.

## Screenshot QA

A fresh actual-size screenshot of A5-forward at `1400 × 990` confirms:

- arrow remains the primary directional cue;
- Japanese destination is the first readable information after the arrow;
- English, floor/room and direction note remain subordinate;
- `LAYOUT DUMMY` suffixes visibly recede instead of inheriting the semantic navy/rust colors;
- no collision, clipping, dashboard-like paneling or image artifact is present.

## Structure / image decision

The production root remains `2:57`; no new Figma mutation was required in this verification run. Existing native text/vector structure and arrow geometry remain intact.

`IMAGE_GENERATION_NOT_REQUIRED`. The issue was proof-metadata hierarchy consistency, not missing imagery. Drive writes: `0`.

## Result

ADD-10 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`, and the stale A5-forward follow-up is now verified closed as `PLACEHOLDER_HIERARCHY_PASS`.
