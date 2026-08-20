# RURUBU V6 IK — Profile Clean-room Photo Column QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

Common-scale comparison of the preferred V6 set showed HU `2044:2` as the weakest remaining spread. The left profile page was technically clean but still read as a legacy-derived stack: full-width opening photo, separate fact rows, then a lower collage. The major photo and profile facts did not form one decisive editorial hierarchy.

## Root-cause hypothesis

The weakness was not missing decoration or missing imagery. The dominant photo orientation and the relationship between photo, facts, quote and lower snapshots were too section-like. A materially different vertical photo field plus a narrow native-information column could create a stronger Japanese travel-magazine reading path while keeping editable facts and replaceable photography.

## Bounded clean-room test

HU was duplicated rollback-safely into IK `2084:2`.

Left profile page only was materially rebuilt:

- existing replaceable main photo became a tall `520×640` photo field;
- generated route-texture raster was hidden rather than used to manufacture density;
- existing native title, `もっと。`, quote and profile name were bound directly to the dominant photo field;
- six existing native profile facts were consolidated into a narrow right editorial column;
- existing two verified replaceable snapshots were reweighted into a large lower photo plus smaller overlapping support photo;
- native `03 / 次の旅へ。` became a quiet terminal beat in the lower-right cream field;
- Q&A right page was preserved unchanged;
- no new wording, facts, person imagery, card, shadow, gradient, asset, image hash or external upload was added.

During QA, two issues were corrected before promotion:

1. the existing white `TEXT / DECK` became unreadable after moving onto cream; its fill was changed to the existing dark profile-value fill after loading the current `Noto Sans JP Regular` font;
2. `旅のつづき / 03`, the large `03`, and `次の旅へ。` initially produced native-text overlap; their vertical rhythm was separated until structural intersection count reached zero.

## Expected improvement

- stronger photo-first profile opening;
- one continuous photo → facts → lower snapshots → next-trip terminal reading path;
- less web-section/card feeling;
- preserved native text, semantic roles and photo replacement capability.

## Regression risk

- narrow profile fact column could become too small at thumbnail scale;
- moving white text off photography can create low contrast;
- large photo-column treatment can feel generic if copied literally to unrelated spreads;
- future longer factual copy must be stress-tested in the narrower column.

## Three-scale evidence

- whole spread / 500px: PASS; IK reads more decisively than HU and no longer depends on the old stacked-section rhythm;
- reading spread / 1400px: PASS; profile facts are readable, photo hierarchy remains clear, Q&A page stays intact;
- actual-size left `2084:3 / 794×1123`: PASS after deck contrast and `03` overlap corrections.

## Structure evidence

Final IK readback before promotion:

- visible native text: `55` across spread;
- visible IMAGE fills: `5`;
- same-parent absolute text intersections: `0`;
- page-edge 18px text safe-area risks: `0`;
- whole-page flattening: `NO`;
- native editable factual copy preserved: `YES`;
- replaceable image roles preserved: `YES`.

## Asset / Drive evidence

Drive V6 root was reverified before this experiment:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Asset state:

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified Rurubu image fills only.

## Promotion / rollback

- IK `2084:2` → `PREFERRED / V6_PROFILE_QA_IK_CLEANROOM_PHOTO_COLUMN_2026_08_21`, x=`273800`, y=`0`, visible;
- IK left `2084:3`;
- IK right Q&A `2084:49`;
- HU `2044:2` → `ROLLBACK_HIDDEN / V6_PROFILE_QA_HU_RULE_SUBTRACTION_2026_08_20`, hidden, not deleted.

Decision: `IK ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Scope firewall

Shared learning system, Rurubu feed and neutral non-Rurubu feed were read before writes. No non-Rurubu item-specific Figma, Drive, ledger, asset or GitHub item path was inspected or edited.

V7 was not touched. V6 remains not print-ready pending final real photography/copy, exact printer template, bleed/trim/fold/safe-area specification, PDF preflight and physical proof.
