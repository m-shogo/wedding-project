# ADD-14 二次会案内 — Suffix Size Visual Follow-up — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_SUFFIX_SIZE_FOLLOWUP_REQUIRED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `30c3cbdc0ae18bbb2b2935202bfa0f4c9d1dcb1e`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- production A6: `1:2 / FRAME_AFTER_PARTY_GUIDE_FRONT`
- production A5: `1:18 / FRAME_AFTER_PARTY_GUIDE_A5`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- Drive metadata readback confirmed exact folder ID and parent `0ADXt8irGMFGnUk9PVA`.

## Fresh actual-size diagnosis

Fresh A6 `592 × 420` and A5 `840 × 592` screenshots confirm that the V2 itinerary composition remains sellable, but the earlier placeholder polish only changed the `LAYOUT DUMMY` color. Several proof-only tokens are still too large relative to the semantic field and remain visually present as proof metadata instead of quietly receding.

Representative live text-range readback:

### A6 `1:2`

- venue `[会場名 · LAYOUT DUMMY]`: semantic and suffix are both about `11.2 px`;
- reception/start/end: `[時刻]` about `14.5 px`, suffix about `9.2 px`;
- status/contact/notice and fee/access/RSVP suffixes remain the same size as their surrounding semantic placeholder copy.

### A5 `1:18`

- venue `[会場名 · LAYOUT DUMMY]`: semantic and suffix are both about `15.9 px`;
- reception/start/end: `[時刻]` about `20.6 px`, suffix about `13.1 px`;
- status/address/contact/QR/notice and fee/access/RSVP similarly retain proof tokens at the surrounding field size.

The warm-gray color treatment helps, but at actual size these large suffixes still contribute avoidable proof-sheet/form character. This is a bounded typography defect; the Japanese-first headline, event hierarchy, QR role and itinerary composition do not need redesign.

## Intended bounded correction

When Figma write is available:

- keep all semantic placeholder wording and native editability;
- keep the existing warm-gray proof-token fill;
- reduce only the `LAYOUT DUMMY` token font sizes to a secondary authoring scale, preserving A6/A5 proportional relationship;
- do not alter title, venue semantic field, times, QR geometry, layout grid, or facts;
- capture fresh A6/A5 actual-size screenshots and native-text/overflow readback afterward.

A fresh rollback snapshot was attempted before mutation, but the Figma write was blocked by the runtime safety gate before execution. No rollback or production mutation is claimed from that blocked call. Existing rollback copies `17:2 / 17:27` remain available from the prior placeholder-color polish.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The current bottleneck is proof-metadata typography, not missing imagery. Drive writes: `0`.

## Result

ADD-14 keeps its existing composition-level `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, but the suffix-size issue is deliberately left open as a bounded visual follow-up rather than silently treated as complete. Final event facts and physical proof remain `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.
