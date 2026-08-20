# Rurubu WEDDING V6 — IH Memory Spots photo-bound guide QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Preferred candidate: `2077:2`
Rollback: GY `2003:2`

## Visible problem

In the common-scale preferred-set comparison, GY remained structurally clean but its Memory Spots guide right page still lost editorial force below Spot 04. The large dining photograph ended too early and was followed by a separated checklist/info region whose equal three-column rows read closer to a web/dashboard summary than a Japanese travel-magazine closing beat.

## Root-cause hypothesis

The page already had enough legitimate photography and copy. The defect was role allocation: Spot 04 needed to remain the dominant photographic event for longer, while the utility information needed to behave as a compact editorial memo rather than a separate module.

## Bounded clean-room test

IH `2077:2` was duplicated from GY without touching the left page or replacing any image source.

On `PAGE / MEMORY_SPOTS_GUIDE` `2077:24` only:

- enlarged `PHOTO / MEMORY_SPOT_04_REPLACEABLE` to a deeper dominant photo field;
- preserved the existing Spot 04 native title/copy over the image;
- introduced one native editable `04` numeral by cloning the existing native `03` typographic role;
- removed the redundant navy separator line from the lower information region;
- moved the yellow `4つのスポットチェック` kicker to overlap the lower edge of the photo;
- compressed the six existing utility facts into a shallower two-row native-text memo without changing their wording;
- added no card, shadow, gradient, new photo or generated decoration.

## Expected improvement

- stronger photo-led first read on the right page;
- clearer 03 → 04 scale progression;
- less false sectioning after the dining photo;
- more continuous magazine-page rhythm while retaining all six utility facts and native editability.

## Regression risks checked

- large `04` could collide with Spot 03 content or the image crop;
- deeper photo could consume footer/safe-area reserve;
- compact utility rows could become unreadably small or collide;
- enlarging the existing raster could expose source softness;
- removing the navy rule could weaken grouping if it carried a real binding function.

## Three-scale evidence

- whole spread / 500px: PASS; the right page now reads as `03 feature → dominant 04 photo → compact travel memo` rather than `03 → photo → separate checklist module`;
- reading / 1400px: PASS; Spot 03 hierarchy, large native `04`, white photo-overlay copy and lower memo are all readable;
- actual-size right / `2077:24` / 794×1123: PASS; lower memo remains legible and footer reserve remains intact.

The binding-function check also passed: removing `DECOR / GUIDE_INFO_NAVY` did not break grouping because the photo edge plus yellow kicker already bind the lower memo to Spot 04 at whole-item scale.

## Structure evidence

Post-change readback for IH:

- visible native text nodes: `32`;
- visible IMAGE fills: `4`;
- same-parent absolute text intersections: `0`;
- 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- replaceable image roles preserved: YES.

Image hashes remained unchanged:

- lead `2077:4`: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- Spot 02 `2077:15`: `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- Spot 03 `2077:29`: `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- Spot 04 `2077:36`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

## Asset / Drive state

Drive V6 authority reverified before promotion:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Current experiment generated no new asset and performed no Drive write or external upload.

- generated: `0`;
- adopted generated: `0`;
- newly placed external assets: `0`;
- new image hashes: `0`.

## Promotion

- IH `2077:2` → `PREFERRED / V6_INSIDE_IH_MEMORY_SPOTS_PHOTO_BOUND_GUIDE_2026_08_21`, x=`272000`, y=`1300`, visible;
- GY `2003:2` → hidden `ROLLBACK / V6_INSIDE_GY_MEMORY_SPOT03_JAPANESE_READER_HIERARCHY_2026_08_20`.

Decision: `IH ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Completion boundary

This is a dummy-design visual promotion, not print-ready completion. Final legitimate photos/copy, printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.
