# WEDDING PASSPORT V4 — Seating Atlas Contour Refinement QA

State: `VERIFIED_LOCAL / V4_SEATING_VISUAL_REFINEMENT_PASS / STRUCTURE_PRESERVED / NOT_PROMOTED / NOT_PRINT_READY`

Run start latest-main SHA: `7ad4a0a98ec688999b35f69dbd9d3864afd42338`
Pre-write latest-main SHA: `f806e809f1e32b84cb272fe216beeb8c6f208887`

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- V4 clean-room authority/evidence:
  - `01_paper-items/wedding-passport/FIGMA-V4-CLEANROOM-HARBOR-ATLAS-2026-08-27.md`
  - `01_paper-items/wedding-passport/V4-EDITORIAL-PAPER-AUTO-LAYOUT-QA-2026-08-27.md`
- Figma: `UbK8KmuWJcDeGScsN49Uor`
- V4 page: `212:2 / V4_CLEANROOM_2026_08_27`
- target: `212:58 / V4 / 03 SEATING / ATLAS LEDGER / CONTOUR REFINED`
- exact Drive authority remains `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- no Rurubu item-specific Figma / Drive / GitHub content was read or modified

## Visible issue

Fresh booklet-family review at thumbnail, reading, and native-size scales showed a quality imbalance:

- Cover and Back already carried a clear Harbor Atlas fixed-art identity;
- Menu had strong typographic hierarchy and a clear side-index role;
- Seating remained structurally correct but visually read as a plain information sheet / spreadsheet-like ledger, weakening family coherence.

This was not a missing-photo problem. The appropriate bounded change was a restrained fixed visual cue, not new factual imagery or decorative badges.

## Rollback

Before mutation, a hidden rollback copy was created:

- `220:2 / ROLLBACK / V4 SEATING / PRE-ATLAS-CONTOUR / 2026-08-27`

Legacy production / V2 / V3 were not used as construction input.

## Figma change

Added only fixed non-semantic editorial cues behind the seating information:

- eight clipped, low-opacity Harbor-Atlas contour rings: `220:43`–`220:50`;
- nine oxblood register ticks: `220:51`–`220:59`;
- no guest/table text was changed;
- no variable copy was rasterized;
- no IMAGE fill was added;
- no page flattening was introduced.

The first placement visually intruded too far into the Bride & Groom / Table 09 region. It was not accepted as-is. The motif was moved approximately `+180px` right and `-130px` upward, while the register ticks were moved approximately `+145px` right and `-105px` upward. This leaves the cue clipped at the top-right and keeps the dense seating content dominant.

## Three-scale result

- thumbnail / whole item: PASS — Seating now belongs to the same V4 Harbor Atlas family without becoming another Cover/Back layout clone;
- reading scale: PASS — table groups and Bride & Groom remain the primary information path;
- native 1480×2100: PASS — motif remains light and does not obscure names/table labels.

## Structure / editability

The existing seating information structure remains unchanged:

- 11 tables;
- maximum 7 guests/table QA model;
- all guest/table values remain native editable text;
- no generated/raster asset contains variable/factual copy;
- no destructive crop;
- no full-page flatten.

## Image-generation decision

Generation count this refinement: `0`.

Reason: the diagnosed weakness was not a missing hero/background/photo role. The existing V4 Harbor Atlas direction already had a viable fixed-art language; the missing piece was family-level editorial continuity on the Seating page. Adding another generated image would have increased visual competition without solving the information-design problem.

`FINAL MISSING ASSET LIST`: no new Seating production raster asset justified by the current screenshot diagnosis.

## Learning

`VERIFIED_LOCAL`:

> A dense seating ledger can share a publication's visual language through one low-contrast clipped fixed-art cue, while the information itself remains dominant. The family cue should sit behind/away from the densest names and must not turn the ledger into a decorative poster.

Item-specific and not transferable: Harbor Atlas contour geometry, exact ring count, coordinates, oxblood ticks, Wedding Passport palette.

## Promotion / next

V4 remains `NOT_PROMOTED` and `NOT_PRINT_READY`.

Next safe task:

1. complete booklet-family coherence review across Cover / Menu / Seating / Back at thumbnail and native size;
2. close remaining Drive-master persistence blocker when a valid connector `file_uri` becomes available;
3. only after V4 is mature, compare the complete V4 against retained Current and promote only if V4 clearly wins.
