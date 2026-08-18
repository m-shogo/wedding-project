# RURUBU V6 EA — Cafe/Table Intrinsic-Safe QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate: `1720:2 / PREFERRED / V6_INSIDE_EA_CAFE_INTRINSIC_SAFE_2026_08_18`
Rollback: `1719:2 / ROLLBACK / V6_INSIDE_DZ_CAFE_TYPOGRAPHIC_FIELD_2026_08_18`

## Visible problem

DZ was visually accepted, but a live intrinsic-size audit found two visible photo roles displayed above source dimensions:

- `PHOTO / GOURMET_VIEW_REPLACEABLE`: display `260×220`, intrinsic `240×220` (`1.083×` width).
- `PHOTO / GOURMET_DINING_HERO_REPLACEABLE`: display `793.7×500`, intrinsic `732×498` (`1.084×` width, `1.004×` height).

This contradicted the current-status claim that active dummy photography was fully intrinsic-safe.

## Root-cause hypothesis

Small single-digit upscales can survive whole-spread screenshot review while still weakening actual-size sharpness and creating authority drift. The correct response is not to accept the drift because the layout looks good; first test whether the same editorial hierarchy survives with source-bounded display geometry.

## Bounded test

Created rollback-safe EA from DZ and changed only the two violating image geometries:

- Yokohama view: `260×220 → 238×218`; hash unchanged `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Dining hero: `793.7×500 → 732×498`; hash unchanged `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.
- Dining hero remains top-left aligned at `0,0` so white native title still sits on photography.
- All native text, composed texture, support-photo hash, captions, hierarchy, and replaceability remain unchanged.

## Expected improvement

Remove avoidable raster enlargement while preserving the accepted Cafe/Table art direction, native editability, and photo-replacement roles.

## Regression risk

- the dining photo no longer spans the full 793.7px page width;
- the smaller Yokohama view could lose visual weight;
- title contrast could fail if source-bounded geometry moved the photo away from native white type.

## Three-scale / structure evidence

EA screenshot comparison: PASS; the right-side cream margin reads as print margin rather than a broken module, and the Cafe view remains legible.

Actual-size validation:

- Cafe page native text: `14`; collision count `0`; 18px safe-area risk `0`.
- Table page native text: `19`; collision count `0`; 18px safe-area risk `0`.
- composed texture `720×430` vs intrinsic `720×860`: PASS.
- Yokohama view `238×218` vs intrinsic `240×220`: PASS.
- dining hero `732×498` vs intrinsic `732×498`: PASS.
- travel-object support `320×235` vs intrinsic `944×608`: PASS.

## Adoption

`VERIFIED_LOCAL` and adopted as preferred EA.

Start Here `845:27` updated to:

`V5 FU/FX · V6 AH + DN/DO + DS MEMORY SPOTS + EA CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`

DZ remains hidden rollback. V7 was not edited.

## Asset lifecycle truth

- newly generated assets: `0`;
- Drive writes: `0`;
- external binary placements: `0`;
- new image hashes: `0`;
- native text preserved: `YES`;
- replaceable image roles preserved: `YES`;
- screenshot/structure QA: `PASS`;
- print-ready claim: `NO`.
