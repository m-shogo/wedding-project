# Rurubu V6 FT — Memory Spots compact 03→04 flow QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Start GitHub main: `1e9b8a6b4df6b9deb065685d6a1ff9330c20a8a2`
State: `VERIFIED_LOCAL / ADOPTED`

## Visible problem

Same-scale review of the six live V6 spreads showed Memory Spots EW was already structurally sound, but the right page kept too much cream separation between Spot 03 and the dominant Spot 04 dining feature. The page read as `03 block → gap → 04 image → guide` rather than one continuous travel-guide reading path.

A separate Cafe/Table FS experiment attempted to bind the small source-safe 02 view image more aggressively to its copy. At whole-spread scale it became cramped and weaker than current FN, so it was rejected and hidden instead of cosmetically retried.

## Root-cause hypothesis

The Memory Spots defect was vertical cadence, not missing imagery or decoration. Compressing two already-valid editorial beats should improve travel-guide density while preserving image roles, native copy and source fidelity.

## Bounded test

Rollback-safe FT cloned EW. Only the Memory Spots right-page vertical cadence changed:

- Spot 03 photo moved upward without resize or hash change;
- Spot 03 number/title/copy/meta compacted upward;
- Spot 04 dining feature moved from `y=500` to `y=450` with the same `732×430` image geometry and hash;
- Spot 04 title/copy/label and the CHECK information block moved upward proportionally;
- no new card, raster, generated asset, image hash or factual copy;
- left Memory Spots page unchanged.

The first structure read found a 2px `03` number/title overlap. FT was not promoted until the title/copy/meta were moved down and the collision was cleared.

## Three-scale evidence

- whole / 500px: PASS; 03→04→CHECK reads as a tighter continuous travel-guide sequence;
- reading / 1200px spread: PASS and stronger than EW;
- actual-size right `1912:24` = `794×1123`: PASS.

## Structure / asset evidence

Final FT:

- preferred root: `1912:2 / PREFERRED / V6_INSIDE_FT_MEMORY_SPOTS_COMPACT_03_DINING_FLOW_2026_08_19`;
- right page: `1912:24`;
- left native text: `12`;
- right native text: `14`;
- absolute text collisions: `0 / 0`;
- 18px safe-area risks: `0 / 0`;
- page-level stray nodes: none observed in candidate bounds;
- photos remain independent replaceable IMAGE roles;
- image hashes unchanged from EW:
  - lead `539c259be8036b481d06b4f76db9a39b407d90e8`;
  - Spot 02 `c1ada11205bc3978bf426b304d683f1c1566cac2`;
  - Spot 03 `644f449c3bf2001a94d4b822d2b55e2614c11042` at `238×218`;
  - Spot 04 `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` at `732×430`.

Rollback:

- EW `1826:18` renamed rollback and hidden;
- rejected Cafe FS `1909:2` hidden as `REJECTED_VISUAL / V6_INSIDE_FS_CAFE_02_OVERBOUND_2026_08_19`.

## Drive / generation state

Drive root re-read before work:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

- newly generated assets: `0`;
- adopted generated assets: `0`;
- Drive new saves: `0`;
- external binary placements: `0`;
- new image hashes: `0`.

Existing generated Profile/Q&A/Timeline/Memories masters remain stored but unadopted; the known quality-preserving placement constraint has not materially changed.

## Result

FT is preferred over EW. The improvement came from compacting existing valid beats, not adding more decorative content. Cafe FS is a counterexample: local binding can become cramped even when the general goal is higher density, so `compress whitespace` is not a blanket instruction.

V7 remains HOLD. This does not satisfy print-ready gates; final photography/copy, imposition, exact print template, PDF preflight and physical proof remain open.