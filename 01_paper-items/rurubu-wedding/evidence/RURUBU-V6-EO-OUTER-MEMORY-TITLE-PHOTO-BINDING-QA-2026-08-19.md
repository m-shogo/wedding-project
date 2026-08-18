# Rurubu V6 EO — Outer memory-title photo binding QA

Date: 2026-08-19
Scope: Rurubu WEDDING only

## Observed defect

Outer EE `1730:2` remained visually split by a full-width navy `みんなとの思い出` strip between the dominant travel flatlay and the chronology. At whole-item scale the strip read like a web-section header even though the photograph itself already had a sufficiently dark lower field for a native headline.

## Bounded tests

Two separate Q&A experiments were also tested and rejected before touching production: direct Q02/Q03 text on a busy photo (`1778:2`) failed contrast; splitting the same content into two small navy boxes (`1779:2`) preserved readability but increased card/module reading. Both are hidden rejected studies.

Outer EO `1780:2` was cloned from EE. Only the back-cover memory heading treatment changed:

- hide `DECOR / MEMORY_CAPTION_STRIP`;
- move `みんなとの思い出` onto the existing dark lower region of the dominant photo;
- keep the heading native/editable, 30px white with a restrained shadow;
- move the chronology heading/rule upward to restore a direct photo → chronology reading path;
- no photo/hash/crop/content changes and no new raster/generated asset.

## Evidence

- whole spread 1400px: PASS; stronger than EE;
- back actual size `794×1123`: PASS;
- visible native back-cover text: 23;
- absolute text collisions: 0;
- 18px text safe-area risks: 0;
- photo roles/hash/provenance: unchanged from EE;
- EE preserved hidden as rollback;
- EO promoted as live preferred.

Figma:
- preferred EO `1780:2`;
- back page `1780:3`;
- rollback EE `1730:2`;
- rejected Q&A direct-text study `1778:2`;
- rejected Q&A split-support study `1779:2`.

Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Decision

`VERIFIED_LOCAL / ADOPTED` for EO.

The transferable lesson is not “remove dark strips.” A container may be removed only when the underlying photo field provides sufficient contrast and the photo→copy relationship remains clear at actual size. The Q&A counterexample in the same run proved that the same subtraction can fail when the image is too busy/bright.
