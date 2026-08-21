# RSL-201 — Article-owned closing copy can replace pseudo-editorial section mass

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Profile P → V
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Profile P had already removed card/UI containment and differentiated SHOGO / SHI-CHAN, but the lower-left page still relied on a large low-opacity `01` as visual mass. It also repeated substantially similar meaning between `同じ街を、違う速さで。` and the stronger existing close `歩く人と、食べる人。違うテンポで、同じ街を楽しむ。`.

The page therefore retained a small amount of AI/editorial-template residue even after its main hierarchy had improved.

## Root-cause hypothesis

Removing cards is not sufficient if the page then uses a low-opacity numeral, giant ghost word or similar unowned display element merely to make the lower field look designed. If article-owned copy already contains a real closing idea, that content can carry the visual mass more credibly.

## Principle tested

Prefer a strong article-owned closing beat over decorative display type whose main job is to simulate editorial sophistication.

## Bounded test

Rollback-safe Profile V `2207:2`:

- low-opacity section numeral `01` hidden, not deleted;
- redundant marginalia `同じ街を、違う速さで。` hidden, not deleted;
- existing native close `歩く人と、食べる人。違うテンポで、同じ街を楽しむ。` promoted to 28 px / 44 px leading;
- existing caption moved below the close;
- SHOGO / SHI-CHAN and Q&A hierarchy preserved;
- no image, card, shadow, gradient, decorative English or invented copy added.

## Expected improvement

The left page should close on an idea owned by the article rather than on a decorative section marker, while reducing semantic duplication.

## Regression risk

If the promoted close is too large, the page can become another type-only template or overstate a minor sentence. Removing a section marker can also weaken navigation when that marker actually performs a binding/index function; this test applies only when the display element has no demonstrated functional job.

## Three-scale evidence

- whole-item / 500 px: PASS.
- reading / 1000 px: PASS.
- actual-size / 1587×1123: PASS.
- visible native text: `23`.
- visible IMAGE roles: `0`.
- text intersections: `0`.
- 18 px text safe risks: `0`.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted current: Profile V `2207:2`
- rollback: Profile P `2194:2` hidden
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-U-PROFILE-V-DESTINATION-IDENTITY-ARTICLE-OWNED-CLOSE-QA-2026-08-22.md`

## Relationship to prior learning

This independently reinforces the existing RSL-198 family inside a third materially different Rurubu editorial role. The normalized failure remains:

`F-RSL-198-LOW-OPACITY-DISPLAY-TYPE-SIMULATES-EDITORIAL-MASS-WITHOUT-CARRYING-CONTENT`

This is **not** promoted to `VERIFIED_CROSS_ITEM` because all reproductions are still inside Rurubu. No project-wide visual rule is created.

## What must remain Rurubu-specific

Do not transfer SHOGO / SHI-CHAN typography, exact copy, coordinates, sizes, cream/navy/rust palette or Profile/Q&A composition.

## Cross-item applicability hypothesis

When another print/editorial item has already established hierarchy but still uses a ghost numeral/word solely to occupy space, independently compare an article-owned closing idea before adding or retaining pseudo-editorial mass.

## Next receiving-item experiment

A receiving item should first prove that the display element has no real navigation, binding or physical-artifact function. If it does have a function, RSL-008's binding-function check takes precedence over subtraction.