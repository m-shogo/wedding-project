# RSL-175 — Widen a dominant photo role before accepting a narrow typographic sidebar

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V6 Gourmet-Cafe left
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The page already had a strong legitimate dominant cafe photograph, but the large `01` and multi-line feature headline were forced into a narrow vertical strip beside it. At thumbnail and reading scales this recreated an image-plus-sidebar/web-section reading even though no rounded card was present.

## Root-cause hypothesis

UI-like composition can be created by **role width and sequencing**, not only by visible containers. When a dominant image is paired with a narrow, high-density title column, the typography can feel squeezed and detached from the photograph. Adding decoration would not fix that hierarchy defect.

## Principle / bounded test

On rollback-safe IT `2116:65`, preserve the same two verified replaceable image sources and factual/native copy roles, widen the dominant cafe-photo field, move the main native Japanese headline/copy into a broader field below the photograph, retain useful cafe memo information in a compact role, and use the second photograph as a smaller unequal `02` feature instead of an equal module.

Expected improvement: stronger photo-led first read, less sidebar/UI geometry, and a more continuous travel-editorial rhythm without a new asset.

Regression risk: subtraction can create dead paper; a below-photo headline can become generic brochure composition if too centered/quiet; the secondary photo beat can collide with the useful memo if its scale is not bounded.

## Evidence

- Whole spread / 500 px: PASS.
- Reading spread / 1400 px: PASS.
- Actual-size left / 794×1123: PASS.
- IT left visible native text: `16`.
- IT left visible IMAGE fills: `2`.
- Text intersections: `0`.
- 18 px text safe-area risks: `0`.
- Figma preferred: IT `2116:65`; left `2116:66`; right `2116:96` unchanged from IS.
- Rollback: IS `2110:2`, hidden.
- Image hashes retained: `c1ada11205bc3978bf426b304d683f1c1566cac2`, `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`; no new save/upload/hash.
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IT-GOURMET-LEFT-PHOTO-LED-OPENING-QA-2026-08-21.md`.

## Adopted status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`. This is not yet cross-item verified or a project-wide visual rule.

## Must remain Rurubu-specific

Exact cafe imagery, Japanese headline wording, magenta/cyan/yellow palette, numbering treatment, crop, coordinates, editorial density and Rurubu-like genre grammar must not transfer literally.

## Cross-item applicability hypothesis

On another print artifact where a dominant image is paired with a narrow typographic sidebar, independently test whether redistributing width/sequence into a broader editorial text field improves hierarchy **before** adding another box, badge or decoration. The receiving item must verify the result in its own visual/physical role.
