# ADD-02 — V4B Editorial Print clean-room method switch

Date: 2026-08-28
Start/main authority: `35831c629f5b2489f02b16ce413eb5bf0ef3fafa`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
Drive readback: folder exists; current direct children include only historical comparison/grain assets, neither reused in V4B visual construction.

## Why the first V4 family was not promoted

Fresh family-level review of the standalone V4 clean-room family found a repeated quality weakness that was not visible in structure-only QA: several destinations used materially different layouts, but the fixed art still read as broad flat geometry plus simple circles/curves. Hawaii, Italy, France, Japan and Hong Kong all reproduced the same higher-level fingerprint: the composition was valid and editable, but the visual atmosphere was closer to a clean vector study than a sellable destination/wedding paper product.

This means `STANDALONE_VISUAL_QA_PASS` from the first V4 family is retained only as evidence that those individual layouts were readable and structurally safe. It is **not** treated as `SELLABLE_VISUAL_QA_PASS`.

Normalized failure fingerprint: `GEOMETRIC_FIXED_ART_OVER_SIMPLIFICATION`.

The old production/V2/V3/VNext family was not opened as a construction reference. No legacy shape, vector, crop, background or generated asset was copied into the V4B build.

## V4B clean-room page

New blank page:

- `201:2 / V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`

Eleven new roots:

- Hawaii `201:3` — `SUN-BLEACHED ATLAS`
- Italy `201:4` — `TERRACOTTA ARCHIVE`
- France `203:2` — `CYANOTYPE BOTANICAL`
- Spain `203:3` — `CERAMIC BROADSHEET`
- Taiwan `203:4` — `PAPER CUT MARKET`
- Japan `201:5` — `INDIGO WOODBLOCK HORIZON`
- Hong Kong `201:6` — `NIGHT BROADSHEET`
- Singapore `203:5` — `GARDEN CANOPY`
- Bali `203:6` — `TERRACED WEAVE`
- Korea `203:7` — `HANJI FOLD`
- Maldives `203:8` — `LAGOON ORBIT`

Every root was rebuilt from blank `1000×1480` geometry. The only inherited facts were the 11 destinations, table numbers, editable destination/theme/description/date roles, and confirmed `2026.10.24` date.

## Hybrid authoring split

Per V4B root:

- native Figma text: `TABLE`, destination EN/JP, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`;
- fixed art: one semantic `DECOR / COMPOSED / ...` SVG role;
- IMAGE fills: `0`;
- no variable/factual wording baked into fixed art;
- no page flattening.

The composed SVGs intentionally add more print-like depth than the first V4 through grain/fiber marks, contour/line systems, botanical/window/weave details and more destination-specific large-form gestures. They remain one semantic fixed-art role rather than dozens of unrelated top-level native primitives.

## Screenshot-supported corrections inside V4B

### Hawaii

Initial screenshot exposed a title/JP/theme overlap because the first text stack had fixed 40px heights. All four stack texts were repaired to real `textAutoResize=HEIGHT`; final screenshot no longer overlaps.

### Japan

Initial composed-art wave crossed theme/description copy. The native info stack moved `y=690 → 610` into a calm reading zone without shrinking type.

### Hong Kong

Initial date used cream text over cream lower paper. Date fill changed to dark ink; no other layout change.

### Spain / Taiwan / Singapore / Bali / Korea / Maldives

Fresh thumbnail QA showed the first stack positions competing with high-density fixed art. The text stacks were moved into the calm lower paper fields instead of adding cards or shrinking type:

- Spain `560 → 960`
- Taiwan `650 → 1010`
- Singapore `720 → 1000`
- Bali `720 → 1000`
- Korea `730 → 1040`
- Maldives `710 → 1020`

Post-move Spain and Singapore thumbnails confirm clearer destination-first hierarchy and better separation between visual atmosphere and factual copy.

## Structure / long-copy QA

Final live production readback for **all 11 V4B roots**:

- native text nodes: `6` each;
- fixed-height visible text: `0` each;
- visible text outside root: `0` each;
- IMAGE fill count: `0` each;
- composed fixed-art roles: `1` each;
- root placeholder: `false`.

Long-copy stress exists for all 11 roots. The stress description used materially longer Japanese copy. Every stress root retained:

- outside visible text: `0`;
- fixed-height visible text: `0`.

Hidden V4B long-copy QA roots:

- first four: `202:792 / 202:998 / 202:1246 / 202:1451`
- remaining seven: `204:2 / 204:188 / 204:396 / 204:582 / 204:616 / 204:644 / 204:841`

## Three-scale visual state

Fresh V4B screenshots were reviewed at thumbnail (`~360px`) for representative/critical roots and at reading scale (`~800px`) for Hawaii, Italy, France, Japan and Hong Kong. Hawaii also received native `1000×1480` actual-size screenshot review.

Result:

- V4B clearly improves atmosphere/detail over the first V4 in several representative roots, especially Hawaii, France and Hong Kong;
- the lower calm-zone method materially improves factual-copy hierarchy in Spain/Singapore and is structurally safe;
- **the family is still not promoted** because the full 11-root three-scale sellable gate has not been closed and some roots (especially Spain/Taiwan/Korea) still need stronger fixed-art specificity before legacy comparison.

State: `V4B_FULL_FAMILY_CREATED / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / FAMILY_VISUAL_QA_IN_PROGRESS / SELLABLE_VISUAL_QA_NOT_YET_PASS / LEGACY_NOT_COMPARED / NOT_PROMOTED / NOT_PRINT_READY`.

## FINAL MISSING ASSET LIST after V4B review

The first V4 demonstrated that flat vector geometry alone is not enough. V4B improves this through composed print-detail SVG, but three roots remain candidates for a stronger high-fidelity generated/composed fixed-art method before any sellable promotion decision.

Physical role assumption from current ADD-02 QA/spec: `100 × 148 mm`.
Raster target if generation is used later: minimum 300ppi approximately `1181 × 1748 px`; recommended source around `1600 × 2368 px` to preserve crop/bleed allowance.

### Spain / full fixed-art atmosphere

- role: `DECOR / GENERATED / SPAIN / CERAMIC-ARCHITECTURAL ATMOSPHERE`
- placement: full 100×148mm root, with a calm lower-left native-copy zone
- aspect: 100:148 portrait
- source: recommend >=1600×2368
- text-safe: lower-left approximately 55–60% width, no fake lettering/signage
- negative constraints: no fake travel poster text, no generic airplane/stamp, no warped architecture, no repeating house/envelope-like tile icons, no plastic diffusion sheen
- why current composed art may be insufficient: current arch/cut-paper gesture is clearer after text separation but remains too geometric to prove a premium tactile ceramic/architectural atmosphere.

### Taiwan / full fixed-art atmosphere

- role: `DECOR / GENERATED / TAIWAN / PAPER-LIGHT ATMOSPHERE`
- placement: full 100×148mm root, lower-left quiet text field
- source: recommend >=1600×2368
- negative constraints: no fake Chinese signage/text, no faux UI, no lantern-cliché wall, no stock tourism collage, no baked factual copy
- why missing: current paper-cut planes still read abstract-first rather than giving enough material depth at thumbnail scale.

### Korea / full fixed-art atmosphere

- role: `DECOR / GENERATED / KOREA / HANJI-INK ATMOSPHERE`
- placement: full 100×148mm root, lower-left quiet text field
- source: recommend >=1600×2368
- negative constraints: no flag imitation, no fake Hangul, no generic K-pop/neon motif, no plastic paper texture
- why missing: current fold geometry is readable but remains a graphic study; a stronger tactile hanji/ink visual is required to justify sellable status.

Candidate generation requirement when capability is available: 2–4 materially different treatments per truly missing role, followed by art-direction rejection and exact Drive master save/readback before Figma placement.

## Drive

No new asset was saved in this run. Existing historical Drive assets were read only and not reused. The V4B composed fixed art lives as editable SVG inside the clean-room Figma study. No raster was generated merely to satisfy a quota.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL` for `GEOMETRIC_FIXED_ART_OVER_SIMPLIFICATION`.

Verified locally: separating factual copy into a deliberate calm zone resolves art/text collisions without creating UI cards or reducing type. Not yet promoted as a cross-item visual rule; exact lower-field geometry and destination art remain ADD-02-specific.

## Next safe work

1. Do not compare legacy yet.
2. Close full 11-root three-scale V4B review.
3. Replace the still-too-geometric Spain/Taiwan/Korea fixed-art roles with materially richer generated/composed candidates when the approved image-generation path is available; otherwise use a materially different high-fidelity illustration method rather than cosmetically repeating broad SVG planes.
4. Only after V4B independently reaches the sellable bar, reveal old Current for final comparison.
5. Promote only on a clear V4B win; otherwise retain old Current and keep V4/V4B as rejected study history.
