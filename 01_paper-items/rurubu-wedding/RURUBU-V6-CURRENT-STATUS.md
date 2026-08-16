# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_W_CURRENT / INSIDE_CD_CE_PREFERRED_STUDIES / EDITORIAL_FOLIO_COHESION_VERIFIED / TIMELINE_BOUNDED_TEXTURE_PLUS_RHYTHM_PRESERVED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here:

`V5 FU/FX · V6 W + CD/CE INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer W `1491:2` — unchanged in this pass.
- Profile / Q&A CD `1535:2` — `PREFERRED / V6_INSIDE_CD_EDITORIAL_FOLIO_COHESION_2026_08_17`.
- Story / chronology CE `1535:78` — `PREFERRED / V6_INSIDE_CE_EDITORIAL_FOLIO_COHESION_2026_08_17`.

Immediate rollback:

- CB `1527:2` — hidden as `ROLLBACK_HIDDEN / V6_INSIDE_CB_PRE_CD_FOLIO_SYSTEM_2026_08_17`.
- CA `1517:2` — hidden as `ROLLBACK_HIDDEN / V6_INSIDE_CA_PRE_CE_FOLIO_SYSTEM_2026_08_17`.
- CC `1534:2` — rejected/hidden small snapshot-caption experiment.

Older comparison/proof frames remain preserved. V7 remains HOLD and was not edited.

## CD / CE editorial folio cohesion

### Visible defect

CB and CA were individually readable, but the four interior pages still behaved like separate feature layouts rather than pages from one printed magazine. There was no recurring page folio / section slug at the page edge.

### Bounded treatment

CD and CE preserve all source layout, imagery and crop geometry and add only native editable folios:

- `02 PROFILE / FAVORITES`;
- `03 Q&A / MEMORIES`;
- `04 OUR STORY / JOURNEY`;
- `05 TRAVEL TIMELINE`.

No card, sticker, gradient, shadow, new photo, new composed decoration or raster placement was added.

The first CE page-05 folio used navy text and failed visually against the dark WEDDING ending band. It was corrected to light cream before promotion.

### Rejected experiment

CC `1534:2` added three small snapshot captions directly to the profile photo cluster. It remained technically readable but did not materially strengthen the page and looked applied after the fact, so it was hidden/rejected rather than promoted.

### Final verification

Whole-spread visual QA:
- CD 1000px: PASS;
- CE 1000px: PASS.

Actual-size:
- Profile `1535:3` = 794×1123: PASS;
- Timeline `1535:102` = 794×1123: PASS after folio polarity correction.

Structure readback:
- CD Profile: native text `18`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- CD Q&A: native text `26`, IMAGE roles `3`, text collision `0`, 18px text safe-area risk `0`;
- CE Story: native text `12`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- CE Timeline: native text `31`, IMAGE roles `5`, text collision `0`, 18px text safe-area risk `0`.

## Profile / Q&A content retained from CB

The underlying CB content remains unchanged in CD except for the page folios.

Representative Profile/Q&A values remain layout-evaluation dummy content, not final personal facts.

Existing Q&A/photography verification remains valid because no photo, crop, content block or image hash changed.

## Story / chronology content retained from CA

The underlying CA Story/chronology content remains unchanged in CE except for the page folios.

CA's verified chronology treatment is therefore preserved:
- bounded composed chronology texture remains subordinate to native copy and replaceable photography;
- major/minor event rhythm remains unchanged;
- image intrinsic checks remain unchanged;
- no new image source or crop was introduced in the CD/CE pass.

## Photo-diversity audit

The preferred dummy studies still reuse some photo hashes across the book. Same-scope Rurubu alternatives were previously inspected before substitution:

- two larger low-reuse V5 candidates contained recognizable people and were rejected because they could imply the real bride/groom;
- the remaining non-person beach image was only `270×192`, insufficient for a hero role;
- older composed/generated timeline assets were visually weak or empty and were not adopted.

Do not reduce identity/provenance/resolution quality merely to remove repetition. The replaceable-photo contract is preserved so final legitimate photography can solve this later.

## Evidence

Latest evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CD-CE-EDITORIAL-FOLIO-QA-2026-08-17.md`.

Latest learning:
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-057-editorial-folio-cohesion.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-w-cd-ce.md`.

Previous chronology evidence remains relevant to unchanged CA-derived content:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BZ-CA-TIMELINE-TEXTURE-RHYTHM-QA-2026-08-17.md`.

## Drive / generated section masters

V6 Drive root remains verified:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Registered generated Profile/Q&A/Timeline/Memories masters remain authoritative-but-unadopted. No material change to the known external Figma binary-submit constraints was observed, so unchanged failed transport methods were not repeated.

## Asset lifecycle truth of latest pass

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new distinct raster bytes: `0`;
- existing image hashes changed: `0`;
- native editable copy added: `YES — folios only`;
- replaceable image semantics preserved: `YES`;
- whole/read/actual-size visual verification: `YES`;
- structure/safe-area verification: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Learning

`RSL-057` — a recurring native folio/page slug can create publication-level continuity across materially different interior layouts without reintroducing card/UI geometry. The semantic folio role may stay consistent, but color/polarity must adapt to the local page field; page 05 required light text on the dark WEDDING ending band.

State:
`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

This is not cross-item verified. Exact page numbers, slugs, placement, typography, colors, photography and Rurubu editorial grammar remain Rurubu-specific.

## Completion gate

Do not call V6 complete or print-ready until:
- W + CD/CE cohere with final real content as one magazine system;
- final personal copy replaces dummy content and final-copy stress is rerun;
- final photography replaces repeated/stand-in roles where applicable and crop/contrast are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 W + CD/CE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Review W + CD/CE together at whole-item and actual-size scales; avoid adding decoration unless it solves a specific visible defect.
3. Keep final-photo replacement as the primary route to reduce repeated dummy photography; do not substitute low-resolution or identity-unsafe imagery.
4. Replace final Profile/Q&A dummy copy later and rerun realistic long-copy/safe-area proof.
5. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
