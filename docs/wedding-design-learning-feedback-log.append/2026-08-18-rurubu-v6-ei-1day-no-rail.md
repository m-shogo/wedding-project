# Rurubu V6 EI — 1DAY no-rail visual experiment

Date: 2026-08-18
Scope: Rurubu WEDDING only

## Observed

EH's 1DAY page was structurally correct and its asymmetric photos were stronger than EG, but the right page still looked partially like a process/timeline diagram because the long route rail and four circular stop markers duplicated sequence information already expressed by native `01–04`, time and vertical reading order.

## Root-cause hypothesis

The binder had become visually redundant after photo hierarchy and native sequence cues matured.

## Bounded test

Created EI `1752:2` from EH `1744:2`; removed only route rail/markers, preserved native content and replaceable images, and lightly staggered native ordinals. No new asset or card was added.

## Result

Whole spread and native-size right page both read more like a model-course travel-magazine feature and less like a route UI. Initial structure QA found tiny metadata contact with two rotated photos; those were repaired before promotion.

Final evidence:

- whole `1400×991`: PASS;
- right actual `794×1123`: PASS;
- native text `25`;
- replaceable photos `4`;
- text/text collision `0`;
- unintended text/photo collision `0`;
- 18px safe-area risk `0`.

Status: `VERIFIED_LOCAL / ADOPTED`.

Regression risk: rail subtraction is not a universal rule; if ordinal/time/placement hierarchy is weaker, removing the binder can make sequence ambiguous.

Rurubu-specific and non-transferable: Yokohama copy, colors, photo choices, exact coordinates/rotations and Rurubu-like art direction.

Next Rurubu application: continue comparing the preferred V6 spreads as one magazine and attack only the next screenshot-visible repetitive-module or semantic-photo defect; do not advance V7.
