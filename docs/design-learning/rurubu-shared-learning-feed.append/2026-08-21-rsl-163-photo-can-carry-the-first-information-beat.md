# RSL-163 — A legitimate photograph can carry the first information beat instead of sitting above a separate module

Source scope/item: Rurubu WEDDING / V6 Yokohama 1DAY IG
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

HS `2019:2` already had a strong Yokohama hero photograph, but the first route beat (`10:00 / 海辺から、旅を始める。`) sat below the photo as a separate information band. The lower page then split into a note block plus a compact two-column label/value grid. At whole-item scale this made the left page feel closer to `hero → content modules` than to one continuous travel-magazine page.

## Evidence before change

- existing legitimate dominant Yokohama photo already passed provenance and visual QA;
- no new photography was required to solve the hierarchy problem;
- HS structure was clean, so the defect was primarily editorial role assignment rather than collision or missing content.

## Root-cause hypothesis

A dominant photograph loses editorial power when the first narrative beat is forced into a separate post-image module without a real semantic need. When the image has a readable region, native headline/time/title/copy can share that photo field, allowing the photograph to carry both atmosphere and the first information beat. Secondary facts can then be compressed into a quieter editorial memo rather than repeated form-like labels.

## Bounded test

1. Duplicate HS into rollback-safe IG `2073:2`.
2. Change only the left page; preserve the entire right 4-stop route page.
3. Extend the existing photo role vertically from 560px to 650px.
4. Place the existing native `START / 海辺`, `10:00`, start title and copy on the darker lower portion of the photograph.
5. Rebuild the lower cream field around the existing large `01 / 寄り道、歓迎。` and closing quote.
6. Hide the four tiny memo labels while preserving their values in one compact horizontal line.
7. Re-run 500px, 1400px, actual-size and structure QA.
8. Correct the one detected `午後〜夜` / `寄り道歓迎` text intersection before promotion.

## Expected improvement

- one photo-led first read instead of a photo followed by a separate start module;
- less dashboard/form grammar in secondary facts;
- clearer scale contrast between hero, first beat, editorial note and closing quote;
- no additional asset or decoration required.

## Regression risk

- overlay copy can fail when the image region lacks stable contrast;
- removing labels can make values ambiguous in another context;
- extending a photo can expose weak source fidelity or an inferior crop;
- excessive overlay can obscure photography and reduce replaceability;
- a quieter lower field can become empty rather than editorial if the remaining anchors are too weak.

## Three-scale evidence

### Whole-item / thumbnail

500px: PASS. IG reads as a continuous photo-led page and the previous mini-dashboard/data-grid impression is reduced.

### Reading scale

1400px: PASS. The photo-overlay start block remains readable, the compact memo line is understandable, and the large `01` plus closing quote provide a deliberate lower-field rhythm.

### Actual size

Left `2073:3 / 794×1123`: PASS.
Right `2073:33 / 794×1123`: PASS.

## Structure evidence

Left final:

- visible native text `19`;
- visible IMAGE fills `1`;
- unintended text intersections `0`;
- 18px text safe-area risks `0`.

Right unchanged:

- visible native text `25`;
- visible IMAGE fills `3`;
- unintended text intersections `0`;
- 18px text safe-area risks `0`.

## Figma / Drive / GitHub evidence

- preferred IG: `2073:2`;
- left page: `2073:3`;
- right page: `2073:33`;
- hidden HS rollback: `2019:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- new generated assets: `0`;
- new Drive writes: `0`;
- new binary uploads: `0`;
- new image hashes: `0`;
- left hero hash remains `539c259be8036b481d06b4f76db9a39b407d90e8`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IG-1DAY-PHOTO-OVERLAY-EDITORIAL-MEMO-QA-2026-08-21.md`.

## Adopted / rejected status

- IG final: `ADOPTED / VERIFIED_LOCAL`.
- HS preferred role distribution: `SUPERSEDED`, preserved as hidden rollback.
- first IG memo geometry with one 5px overlap: `REJECTED / CORRECTED`.

## What must remain Rurubu-specific

Do not transfer:

- Yokohama photograph or crop;
- exact hero extension height;
- native copy, times or route facts;
- overlay coordinates;
- memo value-line geometry;
- cyan/yellow/pink palette;
- Rurubu-like Japanese travel-magazine grammar.

## Cross-item applicability hypothesis

On another print item that already has a legitimate dominant photograph, test whether the first information beat truly needs a separate box/band beneath it. If the photograph contains a stable readable zone and the information remains semantically clear, a rollback-safe candidate may let native text share the photo field and simplify secondary facts. The receiving item must independently verify contrast, crop replaceability, label ambiguity, long-copy tolerance and all three visual scales.

Transferable method:

`verify photo role/fidelity → identify false post-hero module boundary → test native first-beat overlay in a readable photo zone → compress only self-explanatory secondary facts → three-scale + collision/safe-area QA → adopt only if continuity improves without ambiguity`.