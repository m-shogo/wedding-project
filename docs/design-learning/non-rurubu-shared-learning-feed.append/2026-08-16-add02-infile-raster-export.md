# NRSL — In-file raster export can replace blocked external binary transport

Date: 2026-08-16
Source scope/item: non-Rurubu / ADD-02 11卓の国別テーブルサイン
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible / operational problem

A clean-room print candidate needed a full-size composed raster atmosphere while semantic text remained native, but the external binary transport path was unavailable in the current runtime. The already-adopted V6 France high-resolution comparison master existed in Drive and was reverified, yet the official Figma upload endpoint returned by `upload_assets` could not be reached from the runtime network path. `use_figma` also has no global `fetch`, so direct URL retrieval inside the plugin is not a valid fallback.

## Failure fingerprint

- operation: place a high-resolution raster into a Figma image role;
- environment/path: connected Drive materialization → Figma `upload_assets` / Plugin API runtime;
- symptom: `mcp.figma.com` upload endpoint DNS/unreachable from runtime; Plugin API global `fetch` undefined;
- cause class: binary transport/runtime capability boundary, not visual design or image-format correctness;
- last observed: 2026-08-16;
- stop condition: do not repeat the same external-upload or direct-fetch method in the same environment without a material capability/network change.

## Root-cause hypothesis

The design requirement is not inherently dependent on external upload. If the fixed decorative field can be authored procedurally in Figma, the temporary artwork can be rendered to PNG bytes inside the plugin runtime, converted to an image fill, and then discarded. This preserves the Hybrid Authoring boundary—one intentional raster visual role plus native semantic copy—without leaving hundreds of decorative primitives in the working file.

## Bounded test

ADD-02 created a fresh clean-room V7 page before retained production was opened and tested two materially different destination roles from facts/art-direction constraints only:

- Hawaii `51:20`;
- Maldives `51:36`.

For each destination:

1. build temporary fixed atmosphere artwork on a `1000×1480` Figma frame;
2. call `exportAsync({format:'PNG', constraint:{type:'SCALE', value:1}})`;
3. create an image with `figma.createImage(bytes)`;
4. use that hash as one full-size IMAGE fill in the real candidate;
5. remove the temporary source artwork;
6. keep table index, destination names, editorial-note placeholder and date as native editable text.

Resulting raster evidence:

- Hawaii hash `8383af980bd69a7892d5b445a126e3192da2bdfb`, PNG bytes `408,354`;
- Maldives hash `809c3ff661fb3814091f329cf5defcfab3fd734b`, PNG bytes `715,185`.

Both final roots retain only one IMAGE role and five visible native text nodes, with outside visible text count `0`.

## Three-scale / reflow evidence

Both candidates passed pre-comparison family/thumbnail, reading and native `1000×1480` actual-size inspection after repairing screenshot-visible issues. Dedicated long-copy stress clones then verified native note reflow:

- Hawaii stack bottom `1242 / 1480`, outside visible text `0`;
- Maldives stack bottom `1220 / 1480`, outside visible text `0`.

The stress clones were hidden after verification.

## Visual result and limitation

The capability worked, but neither abstract raster atmosphere won production promotion after completion-only comparison against retained ADD-02 production. Hawaii gained volcanic/ocean material depth and Maldives gained lagoon continuity, while retained production still had stronger long-distance title/table-number hierarchy.

This distinction is essential:

- **verified:** in-file full-size raster authoring/transport fallback;
- **not verified:** abstract blur/color atmosphere as a generally superior art direction.

Do not respond to this result by generating more abstract color-field candidates. Future ADD-02 visual work needs richer destination-semantic detail such as architecture, landscape, material, or appropriate photographic/illustrative information.

## Expected improvement

When a future Figma task genuinely needs a composed fixed raster and external transport is blocked, this method can keep production moving without falsely claiming upload success and without forcing fixed art into fragile micro-geometry.

## Regression risks

- in-file procedural artwork can become generic or synthetic if used as a substitute for real destination semantics;
- rendering at insufficient canvas size or scale can create a new resolution defect;
- variable/factual copy must never be baked into the exported raster;
- the temporary vector source must not become a hidden second production authority;
- this is a fallback for appropriate fixed decoration, not a mandate to rasterize entire pages.

## What must remain item-specific

Do not transfer Hawaii/Maldives palettes, destination motifs, composition, text positions, title scale, image hashes or ADD-02 production conclusions to another item.

## Cross-item applicability hypothesis

On another non-Rurubu print artifact where a screenshot-supported defect specifically calls for a fixed composed raster and the external binary path is unavailable, independently test:

`temporary fixed Figma art → native-size exportAsync PNG → one IMAGE role → remove temporary art → native semantic overlays → three-scale/structure QA`.

Only promote this beyond `CROSS_ITEM_CANDIDATE` if a materially different item reproduces the operational benefit without unacceptable visual or resolution regressions.

## Evidence

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`;
- V7 page: `51:18`;
- representatives: `51:20 / 51:36`;
- hidden stress: `52:2 / 52:11`;
- ADD-02 Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- reverified France full-resolution master: `1_upRvZXq4PE54UsvmeWz-Hqhb1fXVP8U`;
- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-CLEANROOM-V7-INFILE-RASTER-EXPORT-2026-08-16.md`;
- item evidence commit: `8d949f4fde0445904d34c5cb79ac5aa52f72d1a1`.
