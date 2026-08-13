# Rurubu FB nonrepetitive-front clean-room feedback — 2026-08-13

## Visible problem
FA is currently the verified best outer comparator, but fresh thumbnail and whole-item review still exposed two weaknesses on the front cover: the same coast image is used as a dominant back-cover travel field and again as a lower-right front fragment, and Feature 02 still reads partly as a tilted photo-card because of its broad cyan caption paper.

## Principle / capability tested
Start with subtraction rather than decoration. In a rollback-safe duplicate, remove the repeated front coast fragment first, then test whether the remaining photo hierarchy can carry the page without adding another generic card, badge, shadow, gradient, or generated asset.

## Expected improvement
- reduce repeated-asset / assembled-wedding-book feeling
- make the front and back covers visually more distinct
- let the Yokohama headline, exact destination postcard, history image, old-town image and Feature 02 create the editorial rhythm
- reduce dependence on decorative modules

## Regression risk realized
The removed coast fragment carried more visual mass than expected. After hiding it, the lower-right of the front page became a conspicuous cream dead area. Enlarging Feature 02 once improved the middle of the page but did not resolve the lower-right imbalance. The resulting front was weaker than FA at 500 px whole-item scale and was therefore not promoted.

## Evidence
- source / retained Best Outer: FA `1161:2`
- rejected clean-room experiment: FB `1172:2`
- FB front coast node `1172:133`: hidden during experiment
- FB Feature 02 photo `1172:177`: enlarged to `436 × 332`, about `-4.2°`
- FB Feature 02 caption paper `1172:178`: `396 × 46`, about `-4.2°`
- 500 px FB screenshot: FAIL versus FA because the lower-right loses density and editorial closure
- FA remains Review `1167:2` / Start Here `1168:2`; EO remains inside authority `1107:285` / Review `1111:188`
- Current `77:18 / 77:290` remained untouched

## Adopted / rejected
**REJECTED.** FB is not a Best candidate and must not be counted as visual progress. FA / EO remain authoritative.

## Runtime blocker
Follow-up refinement and cleanup mutations were blocked before execution by the runtime safety-status guard. The blocked calls produced no Figma mutation. Repeating the same write method was stopped. The FB experiment is still present in live Figma and should be hidden / clearly marked rejected as the first safe write in a future run; it was never promoted into Review or Start Here.

## Q60 evidence reconciliation
Fresh Drive readback confirmed:
- master `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` / `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg` / JPEG / `155,439` bytes
- 560-role derivative `1YwRdAauE1-CtXV3VD08CEvn7b-lFYlGX` / `RURUBU_V5_01_COVER_HERO__ROLE_560x514_Q60.jpg` / JPEG / `33,725` bytes

A fresh live-Figma name/hash audit found no proven placement of the 560-role derivative. The only exact Q60 derivative currently evidenced in the clean-room family remains the smaller secondary destination image with hash `644f449c3bf2001a94d4b822d2b55e2614c11042`. Dominant Q60 master provenance therefore remains OPEN.

## Asset classification
- generated this run: `0`
- newly adopted generated asset: `0`
- new external binary placed: `0`
- rejected layout experiment created: `1`
- Best promotion: `0`

## Next application
Do not remove a repeated image merely because repetition is undesirable. First prove that remaining visual mass can close the composition at thumbnail and actual size. If the replacement is geometry-only, prefer one materially stronger remaining photo scale/overlap rather than another module. Any future dominant-photo promotion still requires exact Drive ID → Figma node/image hash → screenshot → structure → ledger agreement.
