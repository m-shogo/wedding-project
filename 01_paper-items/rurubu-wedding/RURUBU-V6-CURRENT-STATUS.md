# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_W_CURRENT / INSIDE_CF_CE_PREFERRED_STUDIES / EDITORIAL_FOLIO_COHESION_VERIFIED / JAPANESE_TYPOGRAPHY_COHESION_VERIFIED / TIMELINE_BOUNDED_TEXTURE_PLUS_RHYTHM_PRESERVED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here:

`V5 FU/FX · V6 W + CF/CE INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer W `1491:2` — unchanged in this pass.
- Profile / Q&A CF `1538:2` — `PREFERRED / V6_INSIDE_CF_JAPANESE_TYPOGRAPHY_COHESION_2026_08_17`.
- Story / chronology CE `1535:78` — `PREFERRED / V6_INSIDE_CE_EDITORIAL_FOLIO_COHESION_2026_08_17`.

Immediate rollback:

- CD `1535:2` — hidden as `ROLLBACK_HIDDEN / V6_INSIDE_CD_PRE_CF_JAPANESE_TYPE_2026_08_17`.
- CB `1527:2` — older hidden rollback before CD.
- CA `1517:2` — hidden rollback before CE.
- CC `1534:2` — rejected/hidden small snapshot-caption experiment.

Older comparison/proof frames remain preserved. V7 remains HOLD and was not edited.

## CF Japanese typography cohesion

### Visible defect

After CD/CE folio promotion, a full preferred-spread font-family audit found exactly two visible Japanese nodes assigned to a Latin-family font:

- Q&A closing pullquote `答えのつづきは、\nこれからの旅で。` — Inter Bold 38;
- Q&A closing note `ふたりの言葉を、写真と一緒に残すページ。` — Inter Regular 11.

Every other visible Japanese native-text node across Outer W + CD/CE used Noto Sans JP.

### Bounded treatment

CF duplicates CD and changes only those two font-family assignments:

- pullquote → Noto Sans JP Bold;
- note → Noto Sans JP Regular.

Characters, sizes, boxes, x/y positions, images, image hashes, crops, decoration, folios, fold guide and page geometry are unchanged.

### Verification

- CF whole spread 1000px: PASS;
- Q&A actual-size `1538:39` = 794×1123: PASS;
- intended pullquote remains two lines;
- text collision `0`;
- 18px text safe-area risk `0`.

Post-promotion typography audit:
- Outer W Japanese non-Noto visible nodes: `0`;
- Profile/Q&A CF Japanese non-Noto visible nodes: `0`;
- Story/chronology CE Japanese non-Noto visible nodes: `0`.

## CD / CE editorial folio cohesion retained

The previously verified folio system is preserved in CF/CE:

- `02 PROFILE / FAVORITES`;
- `03 Q&A / MEMORIES`;
- `04 OUR STORY / JOURNEY`;
- `05 TRAVEL TIMELINE`.

The page-05 folio remains light cream on the dark WEDDING ending band after its earlier polarity correction.

Underlying layout, photography and crop geometry remain unchanged from the verified CD/CE pass.

### Prior rejected experiment

CC `1534:2` added three small native captions directly to the profile snapshot cluster. It remained technically readable but did not materially strengthen the page and looked applied after the fact, so it remains hidden/rejected.

## Structure / visual state

CF retains CD structure counts except for font metadata:
- Profile: native text `18`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- Q&A: native text `26`, IMAGE roles `3`, text collision `0`, 18px text safe-area risk `0`.

CE remains:
- Story: native text `12`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- Timeline: native text `31`, IMAGE roles `5`, text collision `0`, 18px text safe-area risk `0`.

Representative Profile/Q&A values remain layout-evaluation dummy content, not final personal facts.

## Story / chronology content retained from CA

CE preserves the verified CA chronology content plus the editorial folio:
- bounded composed chronology texture remains subordinate to native copy and replaceable photography;
- major/minor event rhythm remains unchanged;
- image intrinsic checks remain unchanged;
- no new image source or crop was introduced in the CD/CE or CF pass.

## Photo-diversity audit

The preferred dummy studies still reuse some photo hashes across the book. Same-scope Rurubu alternatives were previously inspected before substitution:

- larger low-reuse candidates with recognizable people were rejected because they could imply the real bride/groom;
- low-resolution non-person alternatives remain unsuitable for hero roles;
- older composed/generated timeline/profile assets remain visually weak, soft, empty, or previously rejected at actual size.

Do not reduce identity/provenance/resolution quality merely to remove repetition. The replaceable-photo contract is preserved so final legitimate photography can solve this later.

## Drive / generated section masters

V6 Drive root remains verified:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Drive re-audit on 2026-08-17 confirmed the generated section masters still exist, including:
- Profile V1 `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`;
- Q&A V1 `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`;
- Timeline V1 `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Memories V1 `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`;
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`;
- Memories v2 `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`.

Registered generated masters remain authoritative-but-unadopted. Existing Figma-imported generated Profile derivatives were re-audited; the low-resolution/soft variants remain rejected, and the 800×1000 inline-JPEG derivative has no new evidence that would reverse its prior visual rejection. No material change to known external binary-submit constraints was observed, so unchanged failed transport methods were not repeated.

## Evidence

Latest evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CF-CE-JAPANESE-TYPOGRAPHY-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CD-CE-EDITORIAL-FOLIO-QA-2026-08-17.md`.

Latest learning:
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-058-japanese-font-family-audit.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-057-editorial-folio-cohesion.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-w-cf-ce.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-w-cd-ce.md`.

Previous chronology evidence remains relevant to unchanged CA-derived content:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BZ-CA-TIMELINE-TEXTURE-RHYTHM-QA-2026-08-17.md`.

## Asset lifecycle truth of latest pass

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new distinct raster bytes: `0`;
- existing image hashes changed: `0`;
- native editable folios retained: `YES`;
- native Japanese font-family normalization: `2 nodes`;
- replaceable image semantics preserved: `YES`;
- whole/read/actual-size visual verification: `YES`;
- structure/safe-area verification: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Learning

### RSL-057
A recurring native folio/page slug can create publication-level continuity across materially different interior layouts without reintroducing card/UI geometry. The semantic folio role may stay consistent, but color/polarity must adapt to the local page field.

### RSL-058
Audit font-family assignments, not only rasterized screenshots. Japanese text can appear acceptable through fallback while remaining typographically inconsistent. Font-family changes require fresh actual-size and collision QA because glyph metrics can alter line breaks.

Both are currently:
`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

They are not cross-item verified. Exact page numbers, slugs, font choice, type sizes, placement, colors, photography and Rurubu editorial grammar remain Rurubu-specific.

## Completion gate

Do not call V6 complete or print-ready until:
- W + CF/CE cohere with final real content as one magazine system;
- final personal copy replaces dummy content and final-copy stress is rerun;
- final photography replaces repeated/stand-in roles where applicable and crop/contrast are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 W + CF/CE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Treat final legitimate photography as the next largest visual-quality lever; do not substitute low-resolution or identity-unsafe imagery simply to increase variety.
3. Replace final Profile/Q&A dummy copy later and rerun realistic long-copy/safe-area proof.
4. Keep generated section masters in Drive as unadopted until a quality-preserving placement path and actual-size visual pass exist.
5. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
