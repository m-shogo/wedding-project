# ADD-14 二次会案内 — QA

Status: `CURRENT / V4_AFTERGLOW_LETTER_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_REFLOW_PASS / FRONT_BACK_STRUCTURE_PASS / LONG_COPY_STRESS_PASS / PRINT_GEOMETRY_APPLIED / STRUCTURE_READBACK_PASS / CLEANROOM_PROVENANCE_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
V4 evidence: `docs/add-items/ADD-14-FIGMA-V4-AFTERGLOW-LETTER-QA-2026-08-31.md`

## Current selected authority

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- V4 page: `72:2 / V4 / ADD-14 / AFTERGLOW LETTER / 2026-08-31`
- A6 front trim: `72:3` — `592×420` = `148×105 mm`
- A5 front trim: `72:15` — `840×592` = `210×148 mm`
- A6 back trim: `75:2`
- A5 back trim: `75:12`
- confirmed 3mm bleed parents: `75:22 / 75:24 / 75:26 / 75:28`
- hidden 7mm safe guides are present inside each trim
- front long-copy stress: `73:2 / 73:14` — hidden
- back long-copy stress: `76:2 / 76:12` — hidden
- exact Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`
- Drive writes for V4: `0`

## V4 selection

`AFTERGLOW LETTER` is a V4-exclusive blank-frame clean-room build. No prior production/V2/V3/VNEXT frame, group, ornament, crop or generated asset was duplicated into this production candidate.

Item SPEC art direction is authoritative:

- deep navy + warm ivory;
- limited mint + silver;
- time/place/movement as primary information;
- one night-route line + destination node as the fixed-art language;
- no neon-sign, alcohol, excessive stars, rounded-card UI, fake transport credentials or stock nightlife imagery.

Front first-read: `もう少し、夜を。`

The back separates access / fee / RSVP / contact / notice so unresolved factual roles remain editable without forcing them into the front composition.

## Hybrid authoring / editability

- variable/factual/emotional copy: native editable Figma text;
- variable information groups: native vertical Auto Layout;
- fixed flat graphics: editable native vector/shape geometry;
- generated/composed raster: `0`;
- replaceable images: `0`;
- IMAGE fills: `0`;
- effective PPI: `N/A`;
- `RESOLUTION_WARNING=NONE`.

`IMAGE_GENERATION_NOT_REQUIRED`: the production bottleneck was typography, information grouping and physical print logic rather than missing imagery.

## Print-first QA

SPEC confirms A6 `148×105 mm` primary, A5 `210×148 mm` alternate, 3mm bleed and 7mm safe.

Applied geometry at 4 px/mm:

- A6 trim `592×420 px`; bleed parent `616×444 px`;
- A5 trim `840×592 px`; bleed parent `864×616 px`;
- safe inset `28 px = 7 mm`.

Final structural readback:

- A6 front `72:3`: text 8, fixed-height 0, 7mm-safe violations 0, IMAGE fills 0;
- A5 front `72:15`: text 8, fixed-height 0, 7mm-safe violations 0, IMAGE fills 0;
- A6 back `75:2`: text 6, fixed-height 0, 7mm-safe violations 0, IMAGE fills 0;
- A5 back `75:12`: text 6, fixed-height 0, 7mm-safe violations 0, IMAGE fills 0;
- front stress `73:2 / 73:14`: fixed-height 0, safe violations 0;
- back stress `76:2 / 76:12`: fixed-height 0, safe violations 0.

A real defect was caught before promotion: initial V4 text nodes were internally fixed-height at 10 px. All were repaired to true Auto Height, and the front variable block was rebuilt as native vertical Auto Layout before final QA.

Actual-size typography:

- A6 front: min ≈9.2pt; hero ≈38.3pt;
- A5 front: min ≈12.0pt; hero ≈52.4pt;
- A6 back: min ≈8.5pt; title ≈12.8pt;
- A5 back: min ≈12.1pt; title ≈18.1pt;
- A6 back silver route ≈1.0mm; no hairline dependency.

Three-scale QA: `thumbnail / 3-second scan → reading scale → actual-size / print-detail` PASS for V4 front/back and independent A5 reflow.

## Retained history / rollback

Previous production remains preserved in Figma and Git history. It is no longer the V4 Current authority.

- former VNEXT Current: `59:2 / MIDNIGHT ZINE`, selected `59:3 / 59:15`;
- former no-yellow-edge comparisons: `65:2 / 65:14 / 65:26 / 65:38`;
- former complete pre-change rollbacks: `66:2 / 66:14 / 66:26 / 66:38`;
- prior `VELVET LETTER`: `56:3 / 56:18`;
- earlier clean-room / legacy studies remain history only.

Historical canonical evidence remains in repository history and the prior item evidence files; it may be reused only for verified structure/failure analysis, not as V4 sellable-visual proof.

## BLOCKED_REQUIRED_INPUT

Do not fabricate:

- whether the after-party is held;
- official venue/address/floor;
- reception/start/end;
- fee/payment method;
- access/travel time;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if used.

QR is not present in V4. If later required, final official URL, quiet zone and 100% actual-size scan proof are mandatory.

## DESIGN_COMPLETE != PRINT_READY

Still required before `PRINT_READY`:

- final after-party deployment decision and factual copy;
- actual stock and printer profile/template confirmation;
- deep navy / muted mint / silver-gray / warm ivory CMYK and grayscale proof;
- printer-appropriate black construction;
- duplex registration if both sides are used;
- stand/holder installation and occlusion check;
- font/embed, transparency, overprint/knockout;
- PDF export and preflight;
- 100% print or physical proof.

Fold / punch / perforation / binding / handwriting area are not required by the current ADD-14 SPEC.

Current result:

`V4_AFTERGLOW_LETTER_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.

ADD-15 remains blocked on its explicit `Model A / Model B / NOT_REQUIRED` deployment decision and must not be guessed.
