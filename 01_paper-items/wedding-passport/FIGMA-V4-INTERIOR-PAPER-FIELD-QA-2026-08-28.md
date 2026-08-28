# WEDDING PASSPORT V4 — Interior Paper Field QA

Date: 2026-08-28
Start main: `82bafee09837f57467f9a9ea9b79dd5f843c56c9`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Figma authority: `UbK8KmuWJcDeGScsN49Uor`
Scope: non-Rurubu Passport V4 only
State: `INTERIOR_PAPER_PHYSICALITY_IMPROVED / STRUCTURE_QA_PASS / NOT_PRINT_READY`

## Visible defect

Fresh review of Back `226:15`, Menu+Drink `226:26`, and Seating `226:71` confirmed that the remaining family-level visual gap was not hierarchy or information architecture. The warm-ivory interiors still read too much like a flat Figma background compared with the verified Passport reference's tactile printed-paper character.

The correction deliberately did **not** add airplane/stamp/badge clutter and did not change the established menu/seating hierarchy.

## Generation-before-design contract

Fixed role: archival warm-ivory paper field.

- target pages: Back / Menu+Drink / Seating;
- working physical class: A5-class `148 × 210 mm` represented by `1480 × 2100` px provisional canvas;
- aspect: 148:210;
- coverage: full-page fixed background, behind all native copy and structural rules;
- text-safe zone: whole content area remains clear; texture contrast kept low enough not to interfere with dark navy body text or muted-gold labels;
- z-order: bottommost child in each production root;
- crop: none inside current root; future bleed extension remains deferred until printer template is authoritative;
- raster PPI: `N/A` because the adopted role is editable vector/SVG, not raster;
- print intent: low-frequency paper fibers and sparse flecks only; avoid fine noise that can turn into halftone dirt in CMYK print;
- reference feature targeted: warm tactile paper / restrained physical print feel;
- rejected AI/template signals: fake stamps, fake passport text, generic travel icons, dense grain, plastic embossing, decorative UI cards.

## Candidate comparison

Two materially different vector-composed candidates were built on temporary QA board `248:2`:

- Candidate A `248:3`: horizontal low-frequency fiber field with sparse flecks — calmer, archival, leaves typography dominant;
- Candidate B `248:31`: stronger vertical/deckle grain — more visibly textured and more likely to compete with dense seating copy.

Candidate A was adopted. Candidate B was rejected for production because the stronger directional grain risks becoming a visual layer rather than a substrate. The comparison board is retained hidden for rollback/evidence.

## Figma production change

Adopted fixed composed paper fields:

- Back `226:15` → `248:59 / FIXED / PAPER FIELD / ARCHIVAL HORIZONTAL`;
- Menu+Drink `226:26` → `248:104 / FIXED / PAPER FIELD / ARCHIVAL HORIZONTAL`;
- Seating `226:71` → `248:149 / FIXED / PAPER FIELD / ARCHIVAL HORIZONTAL`.

Each is an editable SVG/vector frame placed as child index 0 behind all native information. Variable/factual copy remains native Figma text. No guest names, menu items, dates, QR, venue or other variable facts were baked into the paper field.

## Screenshot / structure QA

Fresh post-write renders succeeded at reading scale for Menu+Drink and Seating, and Menu+Drink also rendered at native `1480 × 2100` actual-size geometry.

Programmatic readback after adoption:

- Back: paper node present; 7 visible text nodes; visible out-of-bounds text `0`; IMAGE-fill nodes `0`;
- Menu+Drink: paper node present; 36 visible text nodes; visible out-of-bounds text `0`; IMAGE-fill nodes `0`;
- Seating: paper node present; 37 visible text nodes; visible out-of-bounds text `0`; IMAGE-fill nodes `0`.

Each paper field contains 44 vector descendants. This is one fixed composed role per page, not dozens of manually authored production primitives.

## Print-first QA

- effective raster PPI: `N/A` (vector field);
- no low-resolution raster was introduced;
- texture intentionally uses large, low-opacity marks rather than high-frequency grain;
- muted-gold and deep-navy CMYK reproduction still requires printer/profile proof;
- exact bleed/trim/safe extension remains `DEFERRED_FINALIZATION` until printer template is authoritative;
- 100%/physical proof remains required to confirm fibers/flecks do not become visible dirt and that gold hairlines remain printable.

`DESIGN_COMPLETE != PRINT_READY` remains active.

## Drive status

Drive writes this run: `0`.

The adopted composed role currently exists as editable Figma vector artwork. No Drive master claim is made. If the role is later externalized as a reusable master, save only the adopted candidate to the exact non-Rurubu Passport authority folder and read back its Drive ID.

## Next exact task

1. Re-run the four-face Passport V4 review with the new interior substrate.
2. If Back / Menu / Seating now meet the reference-led visual floor, close Passport `SELLABLE_VISUAL_QA_PASS` only after the final four-face comparison and actual-size typography review.
3. Keep `NOT_PRINT_READY` until printer template, CMYK/profile, PDF preflight and 100%/physical proof exist.
4. Once Passport visual completion is evidenced, move to BOARDING PASS rather than spending another run on cosmetic texture changes.
