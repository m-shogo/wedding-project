# RSL-184 — In-file raster transport works cross-item; visual craft remains a separate gate

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / clean-room V7 E studies
State: `VERIFIED_CROSS_ITEM` for the transport capability only

## Visible / operational problem

The new V7 required completely new image roles rather than reusing V6/old V7 imagery. A newly saved Drive master was available, but the official external Figma upload path again returned an `mcp.figma.com` submit URL that the runtime could not resolve.

## Failure fingerprint

- operation: place a newly generated/saved raster into Figma;
- path: Drive/local master → Figma `upload_assets` submit endpoint;
- symptom: `Could not resolve host: mcp.figma.com`;
- cause class: runtime DNS / binary transport boundary;
- repeated family: yes, already known from Rurubu and non-Rurubu evidence;
- action: one confirmation only, then method switch; no cosmetic retry loop.

## Bounded test

On fresh Rurubu V7 frames created from blank canvas, use the previously neutral cross-item candidate method:

`temporary fixed Figma art → exportAsync PNG → figma.createImage(bytes) → IMAGE fill → remove temporary source → native semantic text overlay`

New Rurubu hashes produced and placed:

- lagoon `89334c02e04f8dc04aa39f050158af42d6131817`;
- flatlay `bd72082e6d5615286d5c04f4688cb2780624d28e`;
- beach `6cb3b19049e39ca8bca14f4315cc9393f5496119`;
- route map `412d6ef543a9ccfe6caa3477c56a96d00657e381`.

Figma study roots:

- Outer E `2153:38`;
- Profile/Q&A E `2153:67`;
- Story/Chronology E `2155:23`.

Final structural readback after one Profile/Q&A collision repair:

- Outer E: native text `21`, IMAGE `3`, text intersections `0`, 18 px text safe risks `0`;
- Profile/Q&A E: native text `25`, IMAGE `2`, text intersections `0`, 18 px text safe risks `0`;
- Story/Chronology E: native text `31`, IMAGE `1`, text intersections `0`, 18 px text safe risks `0`.

## Cross-item evidence

The same operational method was independently verified on non-Rurubu ADD-02 on 2026-08-16 under a materially different physical artifact and Figma file. Rurubu now reproduces the capability without inspecting or copying ADD-02 item-specific composition/assets.

Therefore the **transport/authoring fallback capability** advances from `CROSS_ITEM_CANDIDATE` to `VERIFIED_CROSS_ITEM`.

This does **not** promote the generated visual style. The new Rurubu lagoon/flatlay/beach imagery is too geometrically simple to pass the professional visual-authenticity gate and remains local study/rejected-for-promotion evidence.

## New design failure fingerprint

`F-RSL-184-TRANSPORT-SUCCESS-ASSET-CRAFT-FAIL`

Symptom: generated/composed raster reaches Figma correctly and passes structural QA, but the artwork itself reads as simplistic geometric clip-art or synthetic placeholder at reading/actual size.

Root cause: a transport workaround solves bytes and editability boundaries, not art direction, material detail or subject specificity.

Replacement method: keep the operational fallback, but switch visual generation toward richer semantic cartography/illustration/material/photographic roles. Never count successful transport as visual adoption.

## Three-scale result

- 500 px whole-item: hierarchy readable across all three new V7 studies;
- 1400 px reading scale: typography and sequence readable;
- actual-size representative pages: structure/type pass, but simplified hero/support visual craft remains below preferred professional threshold.

## Drive evidence

V7 folder: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x`.

Saved role-master counterparts:

- lagoon `1hN0EuiXu5Aa-J31T3_tbdllsDOKORNZt`;
- flatlay `1TWWUPMMfKgyBsf33KAfe4kWkbHO9gtsJ`;
- beach `1zjPwT5ZQ_nmzBbfDGQ13EMlidrNOrd1l`;
- route map `18-Fvl_5_IjIxqLi42Nu5R82nTvAIQg_l`.

The Drive counterparts and Figma in-file rasters were produced from the same role specifications, but byte identity is not yet proven. Keep Drive IDs and Figma image hashes as separate provenance facts.

## Transfer boundary

Safe to transfer:

- transport fallback method;
- state separation (`generated/saved/placed/visually verified/adopted`);
- stop condition for repeated DNS failure;
- rule that transport success is not visual success.

Do not transfer:

- Rurubu palette;
- island/map shapes;
- giant numbers;
- headline treatment;
- asset hashes;
- V7 production conclusions.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-PRO-CLEANROOM-E-STUDY-2026-08-21.md`.
