# RSL-014 — Destination semantic coherence and role scale should be solved before adding imagery

Source scope/item: Rurubu WEDDING / V6 outer

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem
V6 Outer A was structurally clean and already stronger than V5, but the front still split into a shallow Yokohama hero plus lower support modules, while a foreign-looking old-town alley appeared in more than one outer role. At whole-item scale that weakened the Yokohama issue identity and made the collage feel assembled rather than edited.

## Root-cause hypothesis
The defect was not insufficient image count. Two upstream decisions were wrong: (1) the destination-authoritative image was under-scaled for its editorial job, and (2) a semantically inconsistent support source was carrying too much repeated visual mass.

## Principle/capability tested
Before generating another asset, test whether a verified destination-authoritative image needs a larger role and whether semantically conflicting/repeated support imagery can be reassigned from the existing verified pool.

## Exact bounded change
On rollback-safe V6 Outer C `1227:2` only:
- enlarge the verified Yokohama waterfront hero to `793.7 × 470`;
- keep the exact Q60 skyline role bounded as a postcard rather than stretching it;
- replace the lower foreign-alley support with the verified cafe-memory source;
- replace the back foreign-alley role with the exact Yokohama skyline source;
- retain one travel-object support field;
- add no new card, shadow, gradient, text, generation, Drive save, or external binary.

V5, legacy Current and Inside A were untouched.

## Expected improvement
A stronger destination-first first read, less synthetic multi-destination collage feeling, clearer dominant/support hierarchy, and reduced visual repetition without increasing asset count.

## Regression risk
A larger hero can expose weak source detail; reuse of the skyline source across front/back can become repetitive if its role size is not bounded; reducing the number of distinct support images can create dead space or over-simplify the magazine rhythm.

## Three-scale evidence
- whole-item 1000px: PASS and visually stronger than Outer A;
- actual front 794×1123: PASS;
- actual back 794×1123: PASS;
- structure: 28 visible native text nodes, 7 visible IMAGE fills, 0 absolute text intersections, 0 18px text-safe-area risks.

## Figma / asset evidence
- promoted outer: `1227:2 / V6_BEST_OUTER_C_YOKOHAMA_FIELD_2026_08_15`
- front: `1227:34`
- preserved previous outer: `1221:2 / V6_PREVIOUS_OUTER_A_DESTINATION_LED_2026_08_15`
- inside remains `1223:2`
- Start Here: `845:27 = V5 FU/FX · V6 C/A`
- waterfront hash: `539c259be8036b481d06b4f76db9a39b407d90e8`, Drive `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- exact skyline hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`, Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- cafe hash: `c1ada11205bc3978bf426b304d683f1c1566cac2`, Drive `1CN3gXWgHccx6WwcsmJcXDfXWgARMLFrO`

Drive filename search did not return fresh index matches in this run, so no new Drive state was claimed; the previously verified IDs in the active asset ledger remain provenance authority.

## Adopted / rejected / blocked status
`VERIFIED_LOCAL`: Outer C adopted as current V6 outer best. No new generated asset was produced or counted.

## What must remain Rurubu-specific
Do not transfer Yokohama imagery, the giant `横浜` headline, exact photo sizes, overlap angles, cream/navy/magenta/cyan/yellow palette, postcard treatment, or Japanese travel-magazine composition.

## Cross-item applicability hypothesis
On another print artifact with a place/story identity, independently audit **semantic authority × image role scale × repeated support source** before generating additional imagery. A technically good image that is too small for its job, or a visually attractive image that contradicts the artifact's story, may be the actual bottleneck.

## Next receiving-item experiment
Use this only when a materially different artifact has a dominant place/story image and multiple supporting raster roles. Compare: (A) add/generate another image versus (B) enlarge the semantically authoritative image and remove/reassign one contradictory/repeated support role. Judge at whole-item, reading and actual-size scales. Do not transfer Rurubu composition or styling.
