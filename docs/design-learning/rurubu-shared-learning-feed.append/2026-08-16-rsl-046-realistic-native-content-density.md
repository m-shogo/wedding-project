# RSL-046 — Representative native content is part of visual design QA, not a late data-entry step

Date: 2026-08-16
Source scope: Rurubu WEDDING V6
Source item: Profile/Q&A BG → BI
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The BG Profile page had a strong hero and memory-photo collage, but all six profile values were literal `—` placeholders arranged in a wide `3 columns × 2 rows` field. At actual size the page therefore looked like a wireframe form even though the geometry itself was collision-free.

## Root-cause hypothesis

Placeholder emptiness can create a false visual diagnosis. A layout that is judged with `—` may appear too sparse, while the same semantic structure with representative native copy may reveal the intended editorial density. Variable-content pages should therefore be designed and visually judged with realistic text mass before decorative geometry is added.

## Bounded test

Rollback-safe BI duplicated BG and changed only the Profile page:

- retained the existing full-width replaceable hero and three replaceable memory photos;
- retained native title, profile name and pullquote;
- rearranged six existing native label/value pairs from `3×2` to a denser `2×3` information block;
- replaced `—` with representative editable dummy values of realistic length;
- added no cards, borders, gradients, shadows, generated decoration or image assets;
- Q&A was not changed.

A dedicated hidden stress proof then replaced all six values with substantially longer strings, including multi-line values.

## Expected improvement

- remove false wireframe/empty-form appearance;
- expose real typographic density and wrapping behavior earlier;
- preserve native editability for later factual replacement;
- avoid adding decoration to solve a problem caused by unrealistic content.

## Regression risk

- dummy values being mistaken for final personal facts;
- longer copy colliding with neighboring values or lower photos;
- typography being shrunk excessively merely to make stress copy fit;
- future copy changes invalidating a previously passed layout.

Dummy values must remain clearly treated as design content, not factual authority.

## Three-scale evidence

### Whole-item / thumbnail

BG and BI at 500px: BI preferred. The profile page reads as a completed editorial data feature instead of hero → empty form → photos.

### Reading / actual size

BI Profile `1458:3` at native 794×1123: PASS.

- visible native text: 17
- replaceable IMAGE roles: 4
- text/text collision: 0
- 18px text safe-area risks: 0.

### Long-value proof

BI-specific proof `1459:2` used longer native values across all six fields.

- label/value collisions: 0
- data versus lower-photo collisions: 0
- safe-area risks: 0
- existing Profile name/pullquote overlays on the hero remained intentional and unchanged.

## Evidence

- Figma preferred: `1458:2 / PREFERRED / V6_INSIDE_BI_DENSE_NATIVE_PROFILE_DATA_2026_08_16`
- Profile page: `1458:3`
- hidden stress proof: `1459:2`
- rollback: BG `1439:58` hidden
- GitHub QA: `01_paper-items/rurubu-wedding/RURUBU-V6-T-BI-BH-DENSE-PROFILE-QA-2026-08-16.md`
- GitHub reconciliation: `01_paper-items/rurubu-wedding/RURUBU-V6-T-BI-BH-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## What must remain Rurubu-specific

Do not transfer:

- exact two-column coordinates;
- the displayed dummy values;
- Rurubu palette, photo collage, headline treatment or travel-magazine grammar;
- final personal facts.

## Cross-item applicability hypothesis

For another Wedding item with variable information fields, replace minimal placeholder marks with representative native text before judging whitespace or adding decoration. Re-run copy stress whenever that information block moves or typography changes.

This aligns with the neutral shared lesson that moved variable copy must be re-stressed, but this specific content-density treatment remains unverified outside Rurubu.