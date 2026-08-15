# RSL-018 — Semantic role redistribution must still pass the intrinsic gate

Date: 2026-08-15
Source scope/item: Rurubu WEDDING / V6 Outer H → M
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Selected V6 Outer H used a dining photograph as the largest back-cover raster. The image was technically valid and visually pleasant, but its social/lifestyle semantics were weaker than the page-level `TRAVEL LOG / 旅の途中で見つけた景色` role. A verified camera/map travel flatlay with stronger travel-memory semantics existed in the same Rurubu asset set but was assigned only to a smaller front support role.

## Root-cause hypothesis

The highest-value defect was not missing imagery. It was **semantic role assignment**: the asset whose subject best explained the editorial role was not carrying the dominant visual mass. Reassigning the existing travel flatlay to the back dominant role, while reducing dining to a secondary support role, should improve editorial coherence without image generation.

A second hypothesis was that denser overlapping support photography could improve Japanese travel-magazine rhythm, but only if the density increase did not enlarge weak rasters beyond their intrinsic dimensions.

## Bounded tests

All tests were rollback-safe duplicates of the selected Outer H. Native wording and factual content remained editable/native.

1. **J / `1239:55`** — role redistribution only:
   - travel flatlay → back dominant;
   - dining → smaller front support.
2. **K / `1240:2`** — denser back collage:
   - enlarged cafe support;
   - enlarged skyline support;
   - moved headings upward into a denser rhythm.
3. **L / `1240:55`** — corrected the accidental title/photo collision seen in K.
4. **M / `1241:2`** — retained the stronger semantic role distribution and cafe density, but restored the skyline role to its verified intrinsic-safe `240×220` display size.

## Expected improvement

- back cover reads first as travel-memory editorial content rather than restaurant/lifestyle content;
- stronger hierarchy without another generated asset;
- denser photo rhythm without returning to UI/card geometry;
- all selected raster roles remain print-source plausible.

## Regression risk

- a semantically better asset can still be compositionally weaker at thumbnail scale;
- increasing collage density can create accidental text/photo collisions;
- enlarging small support images to make the page feel busier can silently violate print/source fidelity;
- role swapping can create duplicate or contradictory storytelling elsewhere in the spread.

## Three-scale evidence

- **Whole item / thumbnail:** M full-spread `1588×1123` screenshot PASS and stronger travel-first back-cover semantics than H.
- **Reading/page:** the back flatlay, navy title field, cafe/skyline support cluster and native timeline read as one editorial sequence; front remains coherent after dining becomes support imagery.
- **Actual size/detail:** back-page equivalent review PASS; native headings remain legible; selected M structure has `28` visible native text nodes, `7` visible IMAGE fills and `0` 18px text safe-area risks.

K and L were not counted as progress because the skyline source was `240×220` while those studies displayed it at `270×238`. M restored the role to `240×220` before promotion.

## Figma evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- previous selected Outer H: `1232:55` — hidden rollback
- J: `1239:55` — hidden study
- K: `1240:2` — hidden rejected study
- L: `1240:55` — hidden rejected study
- selected Outer M: `1241:2`
- selected Inside I: `1233:2`
- Start Here status: `845:27` = `V5 FU/FX · V6 M/I`
- M dominant flatlay: `1241:4`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, display `620×422`
- M skyline support: `1241:10`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, display `240×220`
- M dining front support: `1241:46`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, display `507.7×300`

## Drive / provenance evidence

Fresh Drive readback this run confirmed:

- flatlay Q18: `17YaX5CK-c0cTr4zsL2Dly4J1XSZyFxHG` / `944×608` source family;
- cafe Q22: `1CN3gXWgHccx6WwcsmJcXDfXWgARMLFrO` / `810×552` source family;
- dining Q15: `1R0JW7jny0XSOaysUzLMLo8n8nDxVGqdy` / `732×498` source family;
- skyline role: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` / `240×220`.

No new Drive master, derivative or external binary placement was required.

## GitHub evidence

- active asset ledger: `01_paper-items/rurubu-wedding/RURUBU-V6-M-I-ACTIVE-ASSET-LEDGER-2026-08-15.json`
- comparator promotion: `01_paper-items/rurubu-wedding/RURUBU-V6-M-I-COMPARATOR-PROMOTION-2026-08-15.json`
- ledger commit: `9887b9e08cc1e9b1c34d41e5966492204b6f5044`
- promotion commit: `1d903da8da54e76315c34727ae7c7124dc3b3285`

## Adopted / rejected / blocked status

- J: `TESTED_LOCAL`; useful semantic proof but not selected final study.
- K: `REJECTED` because density improvement enlarged a low-resolution skyline beyond intrinsic size and caused title/photo pressure.
- L: `REJECTED` because title collision was fixed but intrinsic violation remained.
- M: `VERIFIED_LOCAL`, adopted as selected V6 outer comparator.

## What must remain Rurubu-specific

Do not transfer the flatlay/cafe/skyline/dining choices, image angles, exact display sizes, navy/cream/pink palette, `TRAVEL LOG` copy, Yokohama story, or Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

When a print design appears to need a new hero image, first audit whether an already verified image has stronger semantics for the dominant role and whether the current dominant asset belongs in a support role instead. Role redistribution is a valid first experiment before generation.

However, every density or scale change triggered by that redistribution must independently re-pass intrinsic/display and actual-size QA. A more energetic layout is not an improvement if it obtains that energy by enlarging weak source pixels.

## Next receiving-item experiment

On a materially different Wedding print item with multiple already-authorized raster roles, test only the **method**: rank images by semantic role fit before requesting new generation, then reject any visually stronger redistribution that violates the target source-fidelity gate. Do not copy Rurubu layout or styling.
