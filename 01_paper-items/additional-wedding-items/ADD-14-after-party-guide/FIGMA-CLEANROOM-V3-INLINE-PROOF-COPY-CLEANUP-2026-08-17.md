# ADD-14 After-party Guide — V3 inline proof-copy cleanup

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GUEST_FACING_PLACEHOLDER_CLEANUP_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `b40bc4e778ce57a9e195bc7a202034a76236eafe`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- shared method: `NRSL-004` + neutral RSL-065 support
- Figma: `IygEr140Yqk12LsGL3TFrT`
- selected V3: A6 `32:3`, A5 `32:29`
- Drive: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- retained legacy production: A6 `1:2`, A5 `1:18` — unchanged

## Visible defect

The selected V3 had already removed standalone internal status copy, but the venue/address placeholders still displayed the implementation suffix `LAYOUT DUMMY` at guest-facing scale. The unresolved roles themselves were valid; the implementation wording was not part of the event content.

## Bounded change

Hidden rollback copies were created before the edit:

- A6 rollback `39:2`
- A5 rollback `39:29`

Changed only four native placeholder strings:

- A6 `32:7`: `[会場名 · LAYOUT DUMMY]` → `[会場名]`
- A6 `32:8`: `[住所・階数 · LAYOUT DUMMY]` → `[住所・階数]`
- A5 `32:33`: `[会場名 · LAYOUT DUMMY]` → `[会場名]`
- A5 `32:34`: `[住所・階数 · LAYOUT DUMMY]` → `[住所・階数]`

Reception/start/end time, access, fee, RSVP/contact and notice roles were not invented or finalized. Existing bracketed placeholders remain explicit.

## QA

Post-change screenshot review:

- A6 `592×420`: PASS; `二次会のご案内 → 夜のつづきへ。 → 会場 → time route` remains the first read;
- A5 `840×592`: PASS; venue/address now read as unresolved content rather than proof metadata;
- A6 visible native text: `16`; IMAGE fills: `0`; outside text: `0`;
- A5 visible native text: `16`; IMAGE fills: `0`; outside text: `0`.

The change only shortens four strings, so the previously verified A6/A5 realistic long-copy stress is not weakened. Hidden stress `33:2 / 33:28` remains retained.

## Asset / Drive

Image generation: not required; this was a lexical hierarchy defect.
Drive write: `0`; exact authority folder was read back successfully.

## Result

V3 retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The event remains `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` until authoritative venue/time/fee/RSVP/contact facts exist. Legacy production and all finalization gates remain unchanged.
