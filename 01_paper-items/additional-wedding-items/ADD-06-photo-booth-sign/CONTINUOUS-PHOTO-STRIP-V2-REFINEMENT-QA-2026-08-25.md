# ADD-06 Photo Booth — Continuous Photo Strip V2 refinement QA

Status: `SERIOUS_COMPARISON_CANDIDATE / PRE_FIGMA / V2_FIXED_ART_REFINED / CURRENT_UNCHANGED`
Date: 2026-08-25
Run start main SHA: `f0ee39f2efea0b08f791cf6a9ac00ee1b2ef62df`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority recheck

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- Current long-copy proof: `47:19`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- canonical QA: `01_paper-items/additional-wedding-items/ADD-06-photo-booth-sign/QA.md`

Live metadata was re-read before refining the candidate:

- root `990×1400`;
- dark photo-stock lane `47:46 = x0 / y0 / 318×1400`;
- three existing paper frames `206×270` at y=`150 / 505 / 860`;
- native copy begins at x=`390`;
- seven semantic native-text roles remain unchanged.

Fresh Current screenshot at native `990×1400` remains a valid sellable baseline: the Japanese hero is strong and the three developed-print cards are readable, but the left visual still reads as three separate card/icons rather than one literal photo-booth strip.

## Why V1 was refined instead of promoted

The V1 continuous strip was a useful serious comparison, but its second exposure still read too much like a small poster/logo construction: coral rectangle + cream inner rectangle + centered yellow disc + ring. The thin inner outline around the entire cream strip could also read as a Figma frame instead of physical photo paper.

A professional photo artifact benefits when the image windows feel like successive exposures rather than four mini graphic posters. The refinement therefore changes the fixed art before any Figma placement test rather than asking Figma layout to compensate for a weak source asset.

## V2 fixed-art candidate

New editable SVG:

- `assets/photo-strip-continuous-developed-prints-v2.svg`
- master size `320×1120`;
- one continuous cream photo-paper strip;
- four consistent exposure windows;
- no authoritative copy;
- no fake UI, barcode, reticle, camera controls or transport data;
- no people, couple, guests, children or documentary simulation.

Material changes from V1:

1. removed the extra inner paper-outline rail so the cream strip itself carries the physical edge;
2. kept the four exposure windows as one consistent contact-strip rhythm;
3. replaced the second exposure's logo-like concentric circles with an overexposed flash-bloom field using a soft radial light falloff and irregular flare mass;
4. reduced uniform dot/grain density and separated light/dark grain roles so print texture supports rather than dominates;
5. kept coastal dawn, reception motion and night-water as distinct exposure roles without adding labels or explanatory icons.

## Professional / physical rationale

The candidate is not intended to imitate an Instax product, but official Fujifilm specifications reinforce a useful physical observation: instant photographs are framed physical prints with a defined image field, not floating UI cards. Current instax mini image size is documented as `62×46 mm`, and print resolution as `318 dpi`; the transferable point here is the visible relationship between paper object and image field, not the brand's exact proportions.

For ADD-06, the V2 strip uses that physical reading only as a general print-artifact reference while preserving the wedding suite's own palette and non-documentary abstract exposures.

## Exact next Figma comparison contract

Do not mutate Current first.

Create a rollback-safe comparison role and place V2 proportionally at approximately:

- `x=19`
- `y=145`
- `w=280`
- `h=980`

inside the existing `318px` dark stock.

The comparison may hide only the three existing developed-print groups. Do not move the right native text lane, date, location, footer or long-copy geometry merely to make the strip fit.

Required Figma verification before any promotion:

1. whole-item ≈500px;
2. reading ≈1000px;
3. native `990×1400` actual/detail;
4. long-copy proof visible;
5. SVG import tree is editable and understandable;
6. native text remains seven semantic auto-height roles with no outside text;
7. reject if the continuous strip dominates the Japanese hero, looks like gallery/filmstrip UI, or loses wedding warmth;
8. reject if the flash bloom or grain becomes noisy at actual-size;
9. only if V2 clearly beats Current, save the adopted master to the exact Drive authority and read back metadata before Current promotion.

## Hybrid authoring split

- variable/factual/emotional copy: native Figma text;
- continuous strip: one editable SVG fixed-art role;
- replaceable photography: `0` for this comparison;
- generated raster: `0`;
- Drive write: `0` while candidate remains unadopted;
- Current production mutation: `0`.

## Result

`V2_FIXED_ART_REFINED / CURRENT_UNCHANGED / PRE_FIGMA`.

This is meaningful source-art improvement, not a completion claim. Current keeps its existing `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` until a real Figma comparison proves V2 better.

Git asset commit: `b7dfc40660f32f5f8c9e084525cef51530198803`.
