# 青春ふたりきっぷ — Microtype Print Legibility QA 2026-08-04

Status: `MICROTYPE_PRINT_LEGIBILITY_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/v7rIRHv8YKQXG0LYD0I5OA
Production frame: `11:2 / FRAME_LABEL / 720 × 250`

## Start state

- GitHub `main` start SHA: `e39b143a5919ff33f904a63d190c0536c8256d64`
- Drive Current authority and reference materials for 青春ふたりきっぷ were live-searchable.
- `01_LABEL` contained one visible production frame, `11:2`.
- archived legacy frame `1:4` remained hidden.
- no RURUBU/るるぶ target was read or modified.

## Visible issue

The prior print-geometry audit established that the provisional physical scale may make the smallest text layer unusually small. In the live screenshot, the three fact labels and bottom serial were the weakest informational text layer:

- `TXT_DATE_LABEL`
- `TXT_FROM_LABEL`
- `TXT_DEST_LABEL`
- `DECOR_SERIAL`

This was a native-text legibility issue, not an asset-quality issue.

## Rollback-safe proof

A production clone was created on `99_QA`:

- `32:2 / MICROTYPE_PRINT_LEGIBILITY_PROOF_2026_08_04`

The proof increased only the four smallest informational text nodes from 9 to 10 Figma units. Fact values were moved from y=12 to y=13 to preserve label/value separation, and the serial was moved from y=218 to y=217.

The proof screenshot showed improved small-text visibility without altering the ticket hierarchy or causing collisions.

## Production change

Applied to existing native-text nodes only:

- `11:76 TXT_DATE_LABEL`: 9 → 10
- `11:78 TXT_FROM_LABEL`: 9 → 10
- `11:80 TXT_DEST_LABEL`: 9 → 10
- `11:136 DECOR_SERIAL`: 9 → 10; y 218 → 217
- `11:77 TXT_DATE`: y 12 → 13
- `11:79 TXT_FROM`: y 12 → 13
- `11:81 TXT_DEST`: y 12 → 13

No node was deleted, flattened, rasterized, renamed, or replaced. Semantic IDs and editable text were preserved.

## Screenshot and structure QA

Post-change live screenshot result:

- fact labels and serial are more legible at the natural 720 × 250 view;
- labels remain clearly separated from their values;
- no collision with the lower rule, guilloche, route, train, or gate stamp;
- title, route, date, stamps, train, and issue-number hierarchy are unchanged;
- no clipping, missing content, or new overlap was observed.

Post-change structure readback:

- one visible production frame: `11:2 / FRAME_LABEL`;
- frame remains `720 × 250`, `clipsContent=true`, export settings empty;
- all seven changed nodes remain native `TEXT` nodes;
- proof remains isolated on `99_QA` for rollback/reference.

## Drive

Drive change: none.
Asset regeneration: none.
Reason: the verified defect was native typography, not accepted asset quality.

## Remaining blocks

- physical MINTIA application-area measurement;
- final mm size, bleed, safe area, and corner treatment;
- final wording and serial-number rule;
- 100% scale test print;
- physical adhesion and normal viewing-distance review;
- final print PDF QA.

Current state:

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / LIVE_PRINT_GEOMETRY_AUDITED / MICROTYPE_PRINT_LEGIBILITY_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
