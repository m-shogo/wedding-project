# RSL-082 — Repeated native copy can become one closing editorial beat

Date: 2026-08-17
Source: Rurubu WEDDING V6 Q&A DG
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Provenance: bounded local experiment; not cross-item verified

## OBSERVED

After Q02/Q03 were successfully bound to an existing photo anchor, the final Q04/Q05/Q06 sequence still continued vertically. Q05/Q06 therefore read like appended form rows, and the lower page retained a template/questionnaire rhythm.

## ROOT_CAUSE_HYPOTHESIS

The defect was not missing decoration. Repeating the same vertical spatial treatment for the final editable items preserved the form grammar even after typography and photography were otherwise editorially strong.

## TESTED_LOCAL

DG moved only Q05/Q06 into a horizontal two-column closing beat beneath the already-valid replaceable support photograph.

Bounded constraints:

- no new card system;
- no generated asset or new raster;
- photograph source/hash unchanged;
- questions and answers remain native Figma text;
- Q02/Q03 binding treatment retained;
- Q04 semantic priority retained.

Expected improvement: close the page with a single photo-led editorial beat instead of extending a vertical questionnaire.

Regression risks: sequence ambiguity, long-copy collision, loss of safe area, or photo dominance over Q04.

## VERIFIED_LOCAL

Figma:

- preferred DG `1631:2`;
- Q&A page `1631:42`;
- hidden realistic-copy proof `1632:2` / page `1632:42`;
- whole 1400×990: PASS;
- actual-size 794×1123: PASS;
- visible native Q&A text: 26;
- text collisions: 0;
- 18px safe-area risks: 0;
- overflow: 0.

Realistic-copy proof:

- Q05 answer natural height: 39px;
- Q06 answer natural height: 26px;
- collision: 0;
- safe-area risk: 0.

Drive:

- V6 authority root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read;
- new Drive save: 0.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AD-DG-DE-QA-LAST-TWO-EDITORIAL-BEAT-2026-08-17.md`.

Decision: DG adopted locally; DC retained hidden as rollback.

## MUST NOT TRANSFER

Do not transfer:

- Rurubu photography;
- exact question wording;
- exact column coordinates;
- palette or accent-line colors;
- Rurubu-specific magazine grammar;
- current production state conclusions.

## Cross-item applicability hypothesis

When repeated editable content still reads as a form after hierarchy cleanup, a receiving item may test grouping its final repeated items into one closing beat tied to an already-valid visual anchor. The receiving item must preserve semantic order/native text and independently pass realistic long-copy and actual-size QA.
