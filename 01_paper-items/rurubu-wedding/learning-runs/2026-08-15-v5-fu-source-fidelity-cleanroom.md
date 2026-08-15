# Rurubu V5 FU — source-fidelity clean-room

Date: 2026-08-15
Scope: Rurubu WEDDING only
Starting main: `0cc3fc81e9bf1760196a72f063beb8d47eb36cc6`

## Visible problem

FL `1195:2` was strong at thumbnail scale, but its front cover depended on street source hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, intrinsic `352×368`, displayed at `515×822.5`. This repeated a known V6 failure class: using a weak/small raster as a dominant role to create impact. The problem was macro-composition, not merely crop polish.

## Root-cause hypothesis

Photo-role geometry had outgrown source fidelity. Keeping the same vertical-spine composition would continue to trade actual-size print quality for thumbnail energy. A stronger solution should make source fidelity a macro-layout constraint and move the low-resolution street source back to a bounded support role.

## Clean-room tests

### FT — rejected

Figma `1208:2`.

- restored verified Yokohama waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8` (`1356×560`) as front dominant;
- bounded the street source;
- retained dining and exact Q60 skyline support.

Result: source fidelity improved, but the same waterfront image dominated both front and back and the lower front lost closure. `REJECTED` at whole-item scale. Preserved hidden as `REJECTED_HIDDEN_OUTER_FT_REPEAT_WATERFRONT_DEAD_LOWER_2026_08_15`.

### FU — adopted

Figma root `1209:2`, front `1209:132`.

- promoted existing verified travel-object photo hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, intrinsic `944×608`, to dominant front role `793.7×512`;
- bounded street hash `439a719...` to `226×304` support role;
- retained dining hash `d76eb07...` at `444×286` overlap role;
- retained exact secondary Q60 skyline hash `644f449...` at `230×211`, near its `240×220` intrinsic dimensions;
- hid the tropical/destination support that did not improve the editorial story;
- preserved all factual/native text and the back-cover structure.

The destination identity is now split deliberately: native Japanese `横浜` supplies the dominant semantic anchor; the exact Q60 skyline supplies concrete place evidence; the dominant raster supplies wedding-travel editorial atmosphere instead of pretending to be another large Yokohama photograph.

## Actual-size repair before adoption

FU was not promoted from thumbnail evidence alone.

Actual-size front QA exposed:

1. Feature 03 white headline extending off the dark street photo onto cream; fixed by fitting it fully inside the photo and reducing its native type scale.
2. inherited white footer nearly disappearing on cream; repaired to deep navy at 75% opacity.
3. Feature 02 text was only ~3.7 px from the right edge; moved inward.
4. final QA caught a 1 px absolute text-box collision between the `02` number and copy; corrected with a small x-spacing adjustment.

## Three-scale evidence

- whole-item thumbnail 500 px: PASS, stronger than FL for source-fidelity plausibility and wedding-travel semantics;
- reading spread 1000 px: PASS;
- actual-size front `1209:132`, `794×1123`: PASS;
- actual-size back `1209:3`, approximately `798×1123`: PASS.

Final structure:

- visible native text: `35`;
- visible IMAGE fills: `7`;
- absolute text intersections: `0`;
- 18 px text safe-area risks: `0`;
- fold: `1209:193`, x=`792.700012`, width=`2`, height=`1122.5`.

## Asset/provenance state

No new image was generated and no new external binary was placed.

- dominant travel-object source is an existing verified Rurubu image hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- exact secondary Q60 remains Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1209:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- dominant Q60 master remains Drive `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes, but exact dominant Figma placement remains OPEN;
- known `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM` transport fingerprint was not retried.

## Promotion

- FU `1209:2` → `BEST_CLEANROOM_OUTER_FU_TRAVEL_OBJECT_DOMINANT_2026_08_15`;
- FL `1195:2` → hidden rollback `ROLLBACK_HIDDEN_OUTER_FL_2026_08_15`;
- FT `1208:2` → hidden rejected study;
- Start Here `845:27` → `FU outer / FO inside`;
- FO `1200:2` remains Best Inside;
- Current `77:18 / 77:290` untouched.

## Learning

A role-sized source-fidelity audit can invalidate the macro-composition itself. If a design only works because a small raster is enlarged beyond a credible print role, do not preserve the photo orientation/hero geometry and merely sharpen the crop. Reassign the weak source to a bounded role and rebuild hierarchy around a source whose intrinsic detail supports the intended printed area.

This does **not** mean a travel-object flat-lay is a universal wedding solution. The reusable lesson is source fidelity as a macro-layout constraint; exact photo choice, scale relationships, Japanese headline treatment and Rurubu grammar remain item-specific.
