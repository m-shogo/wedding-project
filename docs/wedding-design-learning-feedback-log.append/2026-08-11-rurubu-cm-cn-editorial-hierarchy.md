# 2026-08-11 Rurubu WEDDING feedback — CM/CN editorial hierarchy

Scope: Rurubu WEDDING only. Current outer `77:18` and Current inside `77:290` remained untouched.

## Visible problem

The prior inside comparator CC still gave Q1/Q2/Q3 almost enough shared geometry to read as a designed form. The prior outer comparator CK improved ratio handling but proved the cover layout with a history-role photograph, while the lower ivory field still carried too much visual mass.

## Capability / principle tested

A Japanese travel-magazine spread becomes denser and more editorial when unequal information importance is expressed directly through scale, photography and typography instead of repeating containers.

The experiment therefore tested two related moves:

1. **Inside:** one question becomes the article lead/pull quote while the other questions become compact annotations.
2. **Outer:** the semantic cover-photo role occupies materially more of the page and feature photography overlaps that photo mass, while keeping 01 much louder than 02/03.

## Expected improvement

- weaker form/dashboard reading
- stronger first-glance hierarchy
- larger photo-to-paper ratio
- more energetic asymmetric rhythm at thumbnail scale
- native Japanese type remains editable and structurally meaningful

## Regression risk and correction

CM first rendered `01` on two lines and over-wrapped the pull quote. The number box and quote width were repaired before adoption. Structure QA then found Q2 and Q3 number/title intersections; those were also repaired.

CN structure QA found one 02 number/title intersection and it was repaired. More importantly, actual-size screenshot review makes the old semantic cover raster's blockiness obvious. That defect is intentionally kept open; stronger composition does not convert a rejected raster into a pass.

## Verified evidence

### CM inside `818:2`

- visible native text `54`
- visible IMAGE nodes `6`
- same-parent text intersections `0`
- fold `818:283`, visible at x `792.7`
- six accepted image hashes preserved
- screenshot review completed after the wrap/collision repairs

Result: **accepted as strongest inside comparator, not Current**.

### CN outer `819:2`

- front `819:131`
- semantic cover proxy `819:133`, `793.7 × 575`
- proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- visible native text `37`
- visible IMAGE nodes `7`
- same-parent text intersections `0`
- fold `819:184`, visible at x `792.7`
- whole-item and 500px thumbnail screenshots preserve clear hierarchy `photo → 横浜 ふたり旅。 → 01 → 02/03`

Result: **accepted as strongest outer composition comparator, not Current**. The proxy raster remains rejected for image quality.

## Q60 evidence boundary

Fresh Drive readback remains:
- ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- `1330 × 1220` JPEG
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The source itself was visually inspected and remains a better cover-role asset than the currently placed proxy. Deterministic shared-plugin-data staging has now verified the first two 12,000-character segments, but the complete bytes have **not** been reconstructed into a Figma image yet.

## Reusable learning

> When a magazine page still looks like an interface, do not make every module prettier. Make one story materially louder, demote secondary information, and increase photo mass before adding any new decoration.

> A low-quality but semantically correct image can be useful as a rollback-safe composition proxy, but it must be visibly labelled as a proxy and can never close the image-quality gate.

> Binary staging is progress only when segments are deterministic and verified, but it is not asset placement. The lifecycle stays open until the exact image is created, applied, screenshot-QA'd, structure-QA'd and recorded.

## Next application

Finish exact Q60 transport and place it only on a CN-derived duplicate. Reassess text-safe crop and dominant-photo balance at thumbnail, reading and actual-size scales before considering any Current promotion. Do not compensate for Q60 transfer delay with more layout decoration.
