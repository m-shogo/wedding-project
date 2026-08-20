# RURUBU V6 IL — Story Continuous Photo Bridge QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

After IK profile promotion, actual-size review of the remaining preferred pages identified the IJ story-left page as a useful next defect. IJ `2080:3` had strong photography and typography, but a broad cream band between the hero ending near y=`520` and the lower café photo beginning near y=`660` made the page read as `hero section → empty separator → lower section`. The gap was visually larger than its editorial function required.

## Root-cause hypothesis

The issue was not missing imagery or missing decoration. The lower legitimate photo/text field started too late, so empty cream space became an accidental section divider. Moving the existing lower photo and its bound native editorial copy upward should create a controlled transition while retaining a small breathing band and the existing supporting destination photo overlap.

## Bounded test

IJ was duplicated rollback-safely to IL `2085:2`. Only the left story page was reweighted; the chronology right page was preserved unchanged from IJ.

Changes on IL left `2085:3`:

- existing café support photo moved y=`660 → 585` and resized `545×370 → 525×420`;
- existing travel texture moved y=`610 → 555`;
- native `旅をするように、` moved y=`636 → 584`;
- native `ふたりで暮らしてきた。` moved y=`682 → 630`;
- native story body moved y=`804 → 752`;
- functional text-binding rule moved y=`620 → 570`;
- native 3-scenes note group moved upward as a unit (`888/918` range → `842/872` range);
- lower photo caption moved y=`1022 → 1012`;
- hero, hero headline, hero caption, destination support photo, factual chronology, image hashes and wording were unchanged;
- no new card, badge, shadow, gradient, image, generated asset or external upload was added.

## Expected improvement

- remove false section-band reading;
- keep enough cream breathing room for print rhythm;
- make hero → lower photo → story copy feel like one editorial journey;
- preserve photo dominance and native/editable copy.

## Regression risk

- collapsing the band too far can make the two large photos feel mechanically stacked;
- moving text and texture upward can crowd the supporting destination image;
- a larger lower image can expose weak source detail at actual size;
- this exact vertical spacing must not become a reusable template rule.

## Three-scale evidence

- whole spread / 500px: PASS; IL reads more continuous than IJ and the lower field joins the hero without becoming a dashboard/grid;
- reading spread / 1400px: PASS; hierarchy and body copy remain legible, supporting destination overlap remains intentional;
- actual-size story left `2085:3 / 794×1123`: PASS; a narrow cream transition remains, lower image/detail and native copy stay readable.

## Structure evidence

Final IL readback before promotion:

- visible native text: `39` across spread;
- visible IMAGE fills: `6`;
- same-parent absolute text intersections: `0`;
- page-edge 18px text safe-area risks: `0`;
- whole-page flattening: `NO`;
- native editable text preserved: `YES`;
- replaceable image roles preserved: `YES`.

## Asset / Drive evidence

Drive V6 root remained the verified authority for this run:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Asset lifecycle for IL:

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified Rurubu image fills only.

## Promotion / rollback

- IL `2085:2` → `PREFERRED / V6_INSIDE_IL_STORY_CONTINUOUS_PHOTO_BRIDGE_2026_08_21`, x=`275600`, y=`0`, visible;
- IL story left `2085:3`;
- IL chronology right `2085:28`, unchanged from IJ clone;
- IJ `2080:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IJ_CHRONOLOGY_PHOTO_ROUTE_2026_08_21`, hidden, not deleted.

Decision: `IL ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Scope firewall

Only Rurubu WEDDING production state was inspected or edited. The neutral non-Rurubu feed was consumed only as shared method input; no non-Rurubu item-specific Figma, Drive, ledger, asset or GitHub path was inspected or modified.

V7 remains untouched. V6 remains not print-ready pending final legitimate photography/copy, exact print template, bleed/trim/fold/safe-area specification, PDF preflight and physical proof.
