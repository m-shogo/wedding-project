# V5 FA diagonal photo-led clean-room — 2026-08-13

Status: `ADOPTED_BEST_OUTER / VISUAL_QA_PASS / STRUCTURE_QA_PASS / ROLLBACK_SAFE / V5_NOT_COMPLETE`

## Authority before write
- live Figma `01_RURUBU_WEDDING`
- previous best outer: EZ `1157:2`, Review `1158:2`, Start Here `1158:194`
- best inside retained: EO `1107:285`, Review `1111:188`
- Current untouched: outer `77:18`, inside `77:290`
- GitHub main before evidence commit: `f8a8cc74a261c68df84c6673633dff83b661416b`

## Visible problem
Fresh 500 px, whole-item and actual-size review showed EZ was stronger than legacy V5 but would not be selected from scratch. The front still read as stacked horizontal bands: headline field → wide hero → lower full-width street image. Feature 02 still behaved like a photo-card plus UI-like cyan bar. The scale rhythm was insufficiently varied for a Japanese travel-information magazine cover.

## Clean-room experiment
FA was created as a rollback-safe duplicate of EZ in Working, then recomposed using only existing verified editable nodes and accepted image fills. No Current node or other paper item was changed.

Front-cover hierarchy after the adopted experiment:
- short wide history-photo field instead of an oversized full-height proxy
- vertical old-town image at lower left
- larger angled dining Feature 02 crossing image zones
- verified coast image as a bounded lower-right travel photo
- exact Yokohama Q60 derivative retained as a tilted destination postcard
- native Japanese masthead/headline and native feature text retained
- no new rounded cards, generic shadow, gradient, or rasterized final text

A large one-shot recompose was atomically rejected by the runtime before mutation. The method was switched to small reversible photo-geometry steps, as required by the failure-switch rule. Later blocked multi-node polish attempts were also atomic and produced no mutation.

## Three-scale evidence
- thumbnail: 500 px whole-item PASS
- reading/whole-item: 1000 px PASS
- actual-size front: 794 × 1123 PASS
- Review clone: 500 px PASS
- Start Here clone: 500 px PASS

The final front reads with a stronger diagonal/asymmetric eye path: `横浜` → destination postcard → 01 hero → angled 02 → vertical 03 → coast. This materially reduces the web-section feel of EZ.

## Structure readback
FA Working: `1161:2 / V5_OUTER_FA_DIAGONAL_PHOTO_LED_CLEANROOM_2026_08_13`
- whole visible native text: `35` (`20` back + `15` front)
- visible IMAGE nodes: `8`
- back absolute text intersections: `0`
- front absolute text intersections: `0`
- 18 px text safe-area risks: `0` on both pages
- fold: `1161:193 / PROVISIONAL_FOLD_GUIDE`, `x=792.7`, `width=2`, full height

Exact secondary Q60 evidence in FA Working:
- Drive ID: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- Figma node: `1161:189`
- image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`
- rendered geometry: `252 × 231`, rotation about `3.4°`

The dominant wide image remains history derivative hash `539c259be8036b481d06b4f76db9a39b407d90e8` and is explicitly **not** evidence that the Q60 master was placed.

## Promotion and rollback
- Working best outer: FA `1161:2`
- Review best outer: FA `1167:2`
- Start Here best outer: FA `1168:2`
- retained best inside: EO `1107:285` / Review `1111:188`
- previous EZ Review `1158:2`: hidden rollback
- previous EZ Start Here `1158:194`: hidden rollback
- Current `77:18 / 77:290`: fresh readback unchanged

Q60 hash `644f...` was re-read unchanged in Working `1161:189`, Review `1167:189`, and Start Here `1168:189`.

## Asset classification
- generated this run: `0`
- newly adopted generated asset: `0`
- new external binary placed this run: `0`
- existing exact secondary Q60 derivative reused and verified: `YES`
- FA created / placed / visually verified / structure verified / promoted: `YES`

## Gate
V5 remains incomplete. The dominant Q60 master `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` is still not proven as the dominant Figma image. V6 production remains closed until that provenance and the final V5 print/fold/asset reconciliation are genuinely complete.
