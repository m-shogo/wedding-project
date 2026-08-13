# ADD-10 会場案内サイン — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_FOLLOWUP_REQUIRED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `a44c1e6f401c2e2fc53f1694079244bc86edca83`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- production roots: A4 `2:2 / 2:13 / 2:24`, A5 `2:35 / 2:46 / 2:57`
- Drive folder: `ADD-10_会場案内サイン` / `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- Drive metadata readback confirmed the exact folder ID and parent `0ADXt8irGMFGnUk9PVA`.

## Fresh six-template readback

A fresh live text-range inspection checked the visible `LAYOUT DUMMY` token on all four semantic fields in all six production templates.

Five templates (`2:2 / 2:13 / 2:24 / 2:35 / 2:46`) have the intended proof-metadata hierarchy:

- destination JP token: `10 px`, muted warm-gray, opacity about `0.76`
- destination EN token: `7 px`, muted warm-gray, opacity about `0.76`
- floor/room token: `8 px`, muted warm-gray, opacity about `0.76`
- direction token: `7 px`, muted warm-gray, opacity about `0.76`

A5-forward `2:57` has the intended reduced token sizes but its token fills did **not** receive the muted proof-only treatment. Live readback shows opacity `1.0` and the field's original semantic colors remain on the `LAYOUT DUMMY` ranges. Actual-size screenshot confirms this is most noticeable on the rust-red direction note, where the small proof suffix remains colored instead of receding like the other five templates.

This is a bounded family-consistency defect, not a composition failure. Arrow geometry, Japanese-first hierarchy, destination fields, safe clipping, native editability and overall sellable wayfinding direction remain intact.

## Figma write status

No production mutation is claimed in this evidence write. The current automation run encountered an OpenAI write-safety gate on bounded Figma text-range mutations in other non-Rurubu files, so the A5-forward fill normalization is intentionally left for the next write-safe run rather than retried aggressively.

Expected bounded follow-up when writes are available:

- production root stays `2:57`
- keep the existing reduced token font sizes
- change only the four `LAYOUT DUMMY` token fills to the same muted warm-gray / ~0.76 opacity treatment already verified on the other five production templates
- capture actual-size screenshot and structural readback afterward

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED`. The defect is proof-metadata typography consistency, not missing imagery. Drive writes: `0`.

## Result

ADD-10 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`, with one bounded A5-forward placeholder-color consistency follow-up now explicitly recorded instead of being silently treated as complete.
