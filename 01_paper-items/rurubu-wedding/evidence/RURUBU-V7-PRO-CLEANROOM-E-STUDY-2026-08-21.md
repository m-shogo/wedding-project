# Rurubu WEDDING V7 — Professional Clean-room E Study

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
V6 baseline: frozen `JC + IX + JB + IZ + IT + JA`
Decision state: `TESTED_LOCAL / NOT_PREFERRED / NOT_PRINT_READY`

## Purpose

Start a new V7 from blank frames without copying V6 composition, crop decisions, decorative geometry, or existing image hashes. Test a stronger professional editorial system while preserving native semantic copy and replaceable image roles.

## New professional research consumed

1. W3C JLReq / Japanese Script Resources: Japanese composition must treat line composition, punctuation, heading placement, figures/tables, notes and the basic text area as an integrated layout problem rather than styling text after layout.
   - https://www.w3.org/TR/jlreq/
   - https://www.w3.org/TR/jpan-lreq/
2. Pentagram / The Baffler: a flexible grid can preserve publication identity while allowing materially different opening treatments; photography and illustration should enter into a dialogue with text instead of being inserted into one repeated template.
   - https://www.pentagram.com/work/the-baffler
3. JAGDA `Graphic Design in Japan 2026`: current Japanese professional practice still treats Book & Editorial Design as a distinct judged discipline; the 2026 yearbook itself is a 476-page publication with a dedicated book designer, reinforcing sequence and publication-system thinking rather than isolated-page polish.
   - https://www.jagda.or.jp/news/10422/

Local hypothesis: V7 should use one coherent typographic voice and recurring editorial anchors, but each spread role must be allowed a materially different visual tempo. The grid is a coordination system, not a card generator.

## Fresh V7 Figma work

Created from blank frames on `00_RURUBU_START_HERE`; no V6 or old V7 frame was duplicated.

### Outer E

- root: `2153:38`
- back: `2153:39`
- front: `2153:40`
- name: `V7 CLEANROOM / OUTER E / NEW GENERATED HAWAII ISSUE 2026-08-21`
- new image hashes only:
  - lagoon: `89334c02e04f8dc04aa39f050158af42d6131817`
  - flatlay: `bd72082e6d5615286d5c04f4688cb2780624d28e`
  - beach: `6cb3b19049e39ca8bca14f4315cc9393f5496119`
- structure QA: native text `21`; IMAGE fills `3`; text intersections `0`; 18 px text safe-area risks `0`.
- screenshot QA: 500 px whole spread PASS for readability/hierarchy; 1400 px reading PASS; actual-size front `794×1123` structurally PASS.
- professional visual verdict: `NOT_PREFERRED`. Layout has a clear publication idea and stronger asymmetry, but the procedurally generated hero reads too much like simplified clip-art / geometric travel illustration to pass the professional-authenticity gate.

### Profile / Q&A E

- root: `2153:67`
- profile: `2153:68`
- Q&A: `2153:69`
- name: `V7 CLEANROOM / PROFILE_QA E / GENERATED OBJECT EDITORIAL 2026-08-21`
- same new generated asset family used only inside this fresh V7 study; no old V6 image hash was reused.
- initial structure QA found four text-box intersections around Q1/Q2/Q3. They were corrected before final readback.
- final structure QA: native text `25`; IMAGE fills `2`; text intersections `0`; 18 px text safe-area risks `0`.
- screenshot QA: 500 px whole spread PASS; 1400 px reading PASS; actual-size Q&A `794×1123` PASS for hierarchy and Japanese line breaks.
- professional visual verdict: `NOT_PREFERRED`. Typographic hierarchy is materially stronger than a dashboard/card treatment, but the generated flatlay/beach support is still visibly synthetic and not strong enough for final editorial art direction.

### Story / Chronology E

- root: `2155:23`
- story: `2155:24`
- chronology: `2155:25`
- name: `V7 CLEANROOM / STORY_CHRONOLOGY E / ROUTE MAP EDITORIAL 2026-08-21`
- new route-map raster hash: `412d6ef543a9ccfe6caa3477c56a96d00657e381`
- structure QA: native text `31`; IMAGE fills `1`; text intersections `0`; 18 px text safe-area risks `0`.
- screenshot QA: 500 px whole spread PASS; 1400 px reading PASS; actual-size story `794×1123` PASS.
- professional visual verdict: `TESTED_LOCAL / CONTINUE_DIRECTION`, not preferred. The functional route-map role is more defensible than faux-photographic geometric art because it has a real information job. It still needs richer cartographic/editorial detail before promotion.

## Generated raster / transport lifecycle

The previously observed official external-upload path was tested once against the newly saved Drive lagoon master. `Figma.upload_assets` returned a valid single-use `mcp.figma.com` submit URL, but the runtime POST failed with `Could not resolve host: mcp.figma.com`. This is the same normalized transport fingerprint already recorded in project learning; it was not retried.

Method switch used immediately:

`temporary fixed Figma art → exportAsync PNG → figma.createImage(bytes) → one IMAGE role → remove temporary source → native semantic overlays`

This method successfully placed four new Rurubu V7 raster roles in Figma without reusing existing image hashes. It independently reproduces the operational benefit previously observed on a non-Rurubu artifact. Transport success and visual-quality success remain separate decisions.

## Drive evidence

New V7 authority folder:

- `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x` — `RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

New saved master counterparts:

- lagoon: `1hN0EuiXu5Aa-J31T3_tbdllsDOKORNZt`
- flatlay: `1TWWUPMMfKgyBsf33KAfe4kWkbHO9gtsJ`
- beach: `1zjPwT5ZQ_nmzBbfDGQ13EMlidrNOrd1l`
- route map: `18-Fvl_5_IjIxqLi42Nu5R82nTvAIQg_l`

Important truth boundary: these Drive PNGs are locally produced counterparts from the same art-direction/spec and are not yet byte-for-byte proven identical to the in-file Figma export bytes. Figma image hashes above are the placement truth; Drive IDs are the versioned master-counterpart evidence. Do not claim binary identity until verified.

## Anti-AI / professional critique

### What improved

- no legacy composition reuse;
- no V6 image reuse;
- strong Japanese headline scale and real page-role differences;
- fewer repeated containers/cards;
- native editable copy throughout;
- route-map illustration has a semantic job rather than decorative density;
- chronology uses deliberately unequal event scale rather than equal cards.

### What failed the professional gate

- lagoon/beach/flatlay procedural imagery is too geometrically simple and can read as clip-art;
- the visual assets lack the material, photographic, illustrative or cartographic specificity expected from professional travel editorial;
- Outer E therefore has a clear concept but insufficient image craft;
- Profile/Q&A E typography is promising, but asset craft still lowers the whole spread.

Root-cause hypothesis: the new binary/authoring route solves placement, not art direction. Professional quality requires either materially richer semantic illustration/cartography or strong generated/verified photography; transport capability must not be mistaken for visual capability.

## Next bounded work

1. Keep V6 preferred set unchanged as comparison baseline.
2. Keep `2153:38`, `2153:67`, `2155:23` as V7 study evidence; do not promote them merely because they are new.
3. Continue V7 toward six spread roles, but switch the visual-generation method away from simplistic geometric faux-photography.
4. For Memory/Guide, Cafe/Food and 1DAY roles, generate assets only from explicit editorial roles; prefer richer map/diagram/material/photographic semantics.
5. When an actual high-quality image-generation channel is available, use role-specific briefs and complete `generate → Drive → Figma → crop/hash → three-scale QA`; if official Drive→Figma upload remains DNS-blocked, use the verified in-file raster fallback while preserving Drive provenance separately.
6. Do not start V8 until V7 has six comparable role spreads or a genuine blocker makes further V7 work low-value.
