# ADD-01 — V4 proof-language cleanup — 2026-08-30

State: `V4_VISUAL_QA_IN_PROGRESS / PROOF_LANGUAGE_CLEANUP_PASS / REAL_PHOTO_IMPORT_BLOCKED / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority before write

- latest `main`: `5d9703f6f7cf68652599f7fead7418d606d178d5`;
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`;
- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`;
- V4 clean-room root: `24:3 / V4 / ADD-01 / OPEN DOOR / CLEANROOM`;
- replaceable hero role: `24:9 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED`;
- exact Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`;
- Rurubu item-specific scope was not read or edited.

## Visible defect

Fresh Plugin API readback found one internal QA-only text node still visible inside the V4 candidate:

- `24:10 / QA / PHOTO PLACEHOLDER LABEL`;
- text: `REAL PHOTO`;
- `visible=true` before correction.

This is not reader-facing copy. Current authority explicitly requires internal authoring/proof state to live in node names, hidden QA layers, and GitHub evidence instead of being printed on the guest-facing surface. Leaving `REAL PHOTO` visible would therefore create proof-language leakage even though the candidate is not yet promoted.

## Figma correction

Only node `24:10` was changed:

- `visible: true → false`.

No typography, composition, image crop, hero geometry, V4 clean-room construction, legacy production, or retained comparison node was otherwise changed.

The actual replaceable hero remains intentionally unresolved:

- `24:9` remains `310×930`;
- current fill type remains `SOLID`;
- IMAGE fills inside V4 root remain `0`;
- hero node name continues to carry `REAL_PHOTO_REQUIRED` as non-printed workflow state.

Fresh post-write readback of root `24:3`:

- visible native text: `6`;
- visible proof/internal-language matches: `0`;
- IMAGE-fill nodes: `0`;
- root size: `852×1200`;
- replaceable hero structure preserved.

Decision: `PROOF_LANGUAGE_CLEANUP_PASS`.

## Image / Drive state

No Drive write was needed. The authoritative ADD-01 folder remains `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`.

The real couple-photo source already located elsewhere in the connected wedding corpus remains the required hero source, but the current execution environment still cannot complete the raster-upload POST to Figma. No AI-generated bride/groom substitute is allowed and no failed historical IMAGE hash is promoted.

This cleanup does **not** remove the real-photo gate and does not justify `SELLABLE_VISUAL_QA_PASS` for V4.

## Print-first state

Working Figma canvas remains provisional `852×1200 px`; authoritative final physical A2/A3 selection is still unresolved. Therefore:

- final physical size in mm: `DEFERRED_FINALIZATION`;
- actual-size type conversion: `DEFERRED_FINALIZATION`;
- final crop-based effective PPI for the located real photograph: `DEFERRED_FINALIZATION`;
- current V4 raster IMAGE fills: `0`, so effective raster PPI for the current placeholder state is `N/A`;
- `RESOLUTION_WARNING`: not assigned until final physical size + real-photo crop exist.

Still required before `PRINT_READY`:

- real-photo non-destructive placement and focal/crop QA;
- final A2/A3 choice;
- printer template, trim, bleed and safe area;
- stand/easel occlusion and real viewing-distance proof;
- CMYK/profile proof for skin, whites, highlights and deep colors;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% or physical proof.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

## Result / next

ADD-01 V4 remains:

`V4_VISUAL_QA_IN_PROGRESS / PROOF_LANGUAGE_CLEANUP_PASS / REAL_PHOTO_IMPORT_BLOCKED / NOT_PROMOTED / NOT_PRINT_READY`.

Next meaningful ADD-01 action is unchanged: after the authoritative real JPEG can be placed in `24:9`, run thumbnail / reading / actual-size visual QA, calculate effective PPI from the final physical size and crop, then compare V4 against retained production before any promotion.