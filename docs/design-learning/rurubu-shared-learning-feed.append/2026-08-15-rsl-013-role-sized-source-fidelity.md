# RSL-013 — Role-sized source fidelity can force a macro-composition switch

Source scope/item: Rurubu WEDDING / V5 outer clean-room FU

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

FL `1195:2` used street source hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, intrinsic `352×368`, as a displayed `515×822.5` front-cover spine. The composition read strongly at thumbnail scale but depended on an intrinsically small raster for dominant printed area.

## Evidence before change

- FL passed previous visual/structure comparisons.
- Fresh intrinsic-size audit showed the dominant street role was materially larger than its source in the most sensitive dimension.
- Existing V6 failure memory already warned against creating hierarchy by enlarging weak rasters, but the current composition had not yet been re-evaluated under that rule.

## Root-cause hypothesis

Source fidelity was being treated as an asset-level check after macro-composition rather than a constraint that can invalidate the macro-composition itself. If the source cannot support the intended physical role, preserving its orientation/area and continuing to polish the layout creates a false local optimum.

## Bounded tests

### FT `1208:2` — REJECTED

Promoted higher-resolution Yokohama waterfront hash `539c259...` to front dominant and bounded the street source. Fidelity improved, but front/back then repeated the same dominant city source and lower-page closure weakened. Hidden rejected study retained.

### FU `1209:2` — VERIFIED_LOCAL / ADOPTED

- dominant travel-object source hash `e3738476...`: intrinsic `944×608`, displayed `793.7×512`;
- street source hash `439a719...`: intrinsic `352×368`, reduced to `226×304` support;
- dining source hash `d76eb07...`: intrinsic `732×498`, displayed `444×286` support;
- exact Q60 skyline hash `644f449...`: intrinsic `240×220`, displayed `230×211`;
- native `横浜` remains dominant place identity; exact skyline supplies concrete Yokohama evidence; dominant raster supplies wedding-travel atmosphere.

## Expected improvement

Prevent actual-size softness from being designed into the hierarchy, while preserving a photo-led magazine silhouette through a source whose intrinsic detail supports its physical role.

## Regression risk

A technically higher-resolution substitute can still be editorially wrong, repetitive, semantically weak, or create dead space. Source fidelity is a prerequisite, not a sole winner criterion. FT demonstrates this failure mode.

## Three-scale evidence

- whole-item / 500 px: FU PASS and stronger than FL under source-fidelity review;
- reading spread / 1000 px: PASS;
- actual-size front `1209:132` / 794×1123: PASS after typography repairs;
- actual-size back `1209:3` / ≈798×1123: PASS;
- final visible native text `35`;
- final visible IMAGE fills `7`;
- absolute text intersections `0`;
- 18 px text safe-area risks `0`;
- provisional fold `1209:193`, x=`792.700012`, width=`2`, height=`1122.5`.

## Figma / Drive / GitHub evidence

- adopted FU root `1209:2`;
- FU front `1209:132`;
- dominant travel-object node `1209:153`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- bounded street node `1209:164`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- dining support `1209:177`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- exact secondary Q60 `1209:189`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- exact secondary Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`;
- dominant Q60 master Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` remains OPEN for exact dominant placement;
- learning run: `01_paper-items/rurubu-wedding/learning-runs/2026-08-15-v5-fu-source-fidelity-cleanroom.md`.

## Adopted / rejected / blocked status

- FU: `VERIFIED_LOCAL → ADOPTED`;
- FT: `REJECTED` and hidden;
- dominant Q60 exact transport: unchanged `BLOCKED` under known fingerprint; not retried.

## What must remain Rurubu-specific

Do not transfer the travel-object flat-lay, giant `横浜`, magenta/cyan/yellow treatment, exact overlap geometry, photo ratios, or Japanese travel-magazine grammar.

## Cross-item applicability hypothesis

Before another print artifact increases image area to create hierarchy, independently inspect the source's intrinsic dimensions against the intended physical role. If source fidelity fails, test a role/macro-composition switch rather than preserving the hero geometry and adding cosmetic treatment.

## Next receiving-item experiment

On a materially different print item that uses a dominant raster, compare its intrinsic source size and actual display role. If the source is materially weak for the role, make one rollback-safe alternative that reduces/reassigns the weak raster rather than merely sharpening or framing it. Verify at thumbnail, reading and actual size before considering cross-item promotion.
