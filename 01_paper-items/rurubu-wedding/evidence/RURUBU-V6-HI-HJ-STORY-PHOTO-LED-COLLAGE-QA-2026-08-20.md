# Rurubu WEDDING V6 — HI/HJ Story Photo-led Collage QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `HJ ADOPTED / VERIFIED_LOCAL`
V7: HOLD

## Source problem

At same-scale six-spread review, current GW Story was the clearest hierarchy mismatch. Its left page still read `cream header → hero image`, while the stronger current V6 spreads opened directly from photography. After converting the header to a photo-led title field, the small support photograph still read as a separate module below the hero rather than binding the image field into the page transition.

## Root-cause hypothesis

No additional image or decoration was required. The existing hero had sufficient text-safe sky and the verified support photo had enough semantic/source fidelity to carry more editorial responsibility. Moving the title/deck into the hero and then moving the existing support photo across the hero/paper seam should improve continuity and asymmetry without degrading editability or source fidelity.

## Experiment A — HI photo-led title field

Rollback-safe duplicate from GW.

Changed only Story left:

- hero `PHOTO / STORY_HERO_REPLACEABLE`: y `132 → 0`, size remained `820×520`, hash remained `539c259be8036b481d06b4f76db9a39b407d90e8`;
- native title `ふたりの旅は、ここから。` moved to x30/y62 and changed to white;
- native deck moved to x32/y122 and changed to white;
- native kick retained;
- existing title/deck/kick were re-appended above the hero to preserve z-order;
- no new image/card/gradient/generated decoration/fact was introduced.

### Failure: `RECTANGLE_WIDTH_DIRECT_ASSIGN_READONLY`

The first write attempted direct `width` assignment on an existing rectangle. Figma returned `node.width: read-only property on RECTANGLE node`. The write was atomic and current state remained unchanged. The method switched to `resize()`.

### Failure: `PHOTO_LED_TITLE_CAPTION_CONTEXT_DRIFT`

Actual-size screenshot revealed the pre-existing white hero caption had remained around y604 and was now sitting on cream after the hero moved. It became effectively invisible. That state was rejected. Caption moved to x24/y492 inside the hero and cyan photo edge moved to y512 before acceptance.

### HI evidence

- whole spread 1200×849: PASS;
- actual-size Story 794×1123: PASS;
- Story native text 12;
- same-parent text collisions 0;
- 18px text safe-area risks 0;
- Story hashes unchanged.

HI Figma: `2023:111`; Story `2023:112`.

## Experiment B — HJ deeper support overlap

Rollback-safe duplicate from accepted HI.

Changed only existing support image relationship:

- `PHOTO / STORY_SUPPORT_1_REPLACEABLE` hash remained `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- size remained `238×216`;
- rotation remained ~`+2.8°`;
- y moved `424 → 360` so the image crosses the hero/paper seam;
- native caption moved to x566/y552 on the image edge;
- no new asset, hash, crop, card or decoration.

Expected improvement: hero and support photo should read as one asymmetric editorial composition rather than two stacked modules.

Regression risks: title/photo collision, caption context loss, photo source-size regression, or excessive scrapbook/module feeling.

## HJ three-scale evidence

- whole spread / 1200×849: PASS; support overlap makes the seam more intentional than HI;
- reading/page context: PASS;
- actual-size Story `2024:3 / 794×1123`: PASS;
- Story native text: 12;
- same-parent text collisions: 0;
- 18px safe-area risks: 0;
- page-level stray text: 0;
- image hashes unchanged:
  - hero `539c259be8036b481d06b4f76db9a39b407d90e8`;
  - support1 `644f449c3bf2001a94d4b822d2b55e2614c11042`;
  - support2 `c1ada11205bc3978bf426b304d683f1c1566cac2`;
  - composed texture `691a6ceed471a5d8efa144052a10564eed177b4f`.

Chronology inherited unchanged from GW and remained structurally clean in the candidate clone.

## Decision / rollback

- HJ `2024:2`: `PREFERRED / V6_INSIDE_HJ_STORY_DEEPER_SUPPORT_OVERLAP_2026_08_20` — ADOPTED.
- HI `2023:111`: hidden rollback.
- GW `1987:2`: hidden rollback.
- Start Here `845:27` synchronized to `GZ/HJ`.

## Asset lifecycle truth

- generated this run: 0;
- Drive saves this run: 0;
- external binary placements: 0;
- new image hashes: 0;
- adopted/placed: HJ existing-asset recomposition YES;
- visually verified: YES;
- native variable text preserved: YES;
- replaceable photo roles preserved: YES.

Drive authority reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Learning state

`RSL-156: VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What must remain Rurubu-specific: exact Yokohama photo, crop, overlap position, angle, headline, magenta/cyan/yellow styling and travel-magazine grammar.
