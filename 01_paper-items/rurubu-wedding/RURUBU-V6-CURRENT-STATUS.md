# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FO_PREFERRED / PROFILE_QA_FP_PREFERRED / STORY_CHRONOLOGY_FQ_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FN_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer FO `1891:18` — front `1891:68`; FH `1854:2` hidden rollback.
- Profile / Q&A FP `1895:18` — Profile `1895:19`; Q&A unchanged from FG composition; FG `1851:2` hidden rollback.
- Story / chronology FQ `1898:125` — chronology `1898:151`; FL `1874:2` hidden rollback.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FN `1866:2` — Table `1866:29`.
- Yokohama 1DAY Plan FM `1879:71` — right `1879:102`.

Start Here `845:27`:

`V5 FU/FX · V6 FO + FP/FQ + EW MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

The six preferred spreads remain arranged as one compact 3×2 review board. Rollback/history remains preserved.

## Latest verified progress — FP Profile / FQ chronology

### FP visible defect and bounded change

FG Profile lower-right `03 / NEXT DESTINATION` legitimately had no third photo, but the weak treatment read like an unfilled photo slot.

FP `1895:18` keeps all existing photo roles/hashes and all profile facts unchanged, but turns that role into a narrow photo-safe native editorial closing column:

- large native `03`;
- `NEXT TRIP / 03` kicker;
- native Japanese headline `次の旅へ。`;
- short native body copy;
- one thin magenta binding rule;
- no new photo, generated asset, card, shadow or raster.

The first wider treatment was rejected because the headline/body invaded the adjacent photo. The final narrow version was adopted only after actual-size and safe-area QA.

FP evidence:

- whole spread 1000px: PASS and clearer than FG;
- Profile actual-size `1895:19` = `794×1123`: PASS;
- visible Profile native text `26`;
- absolute text collisions `0`;
- 18px safe-area risks: initial `1` (~0.3px at right edge), corrected to `0` by shifting the closing column 2px left;
- new image hashes `0`.

Learning: RSL-128 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

### FQ visible defect and bounded change

FL chronology had a strong hero and event-03 photo, but event 05 `入籍` remained visually weak between that photo beat and the final WEDDING terminal. The existing bounded travel texture did not materially improve the page.

Two rollback-safe treatments were compared:

1. stronger/repositioned event-05 texture — REJECTED; little visible benefit;
2. hide event-05 texture and make `05 + date + 入籍 + native body + one thin yellow rule` a boxless typographic feature — ADOPTED as FQ.

The first FQ script attempt failed atomically before mutation because an existing `Noto Sans JP Bold` text node was resized before font load. The corrected call followed font-load-before-mutate. Structure QA then found the child event-05 body still retained 330px width after its parent stack was narrowed; resizing that child to 240px restored the right safe area.

FQ evidence:

- whole spread 1000px: PASS and stronger than FL;
- chronology actual-size `1898:151` = `794×1123`: PASS;
- visible chronology native text `31`;
- absolute text collisions `0`;
- final 18px safe-area risks `0`;
- new image hashes `0`.

Learning: RSL-129 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FP-FQ-NATIVE-CLOSING-AND-EVENT5-TYPOGRAPHY-QA-2026-08-19.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fp-fq-native-closing-and-event5-typography.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-128-129-native-closing-and-photo-less-milestone.md`.

## Existing preferred verification retained

- FO retains the direct-on-photo front issue metadata treatment and verified outer hierarchy.
- EW retains the verified Memory Spots travel-guide hierarchy.
- FN retains the current Cafe/Table reader-information treatment.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to FO / EW / FN / FM in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning history;
- read the neutral non-Rurubu feed only as permitted cross-scope principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, assets, ledgers, GitHub paths or production state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-128/RSL-129 are local cross-item candidates, not promoted visual rules.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

The folder still contains existing generated Profile / Q&A / Timeline / Memories masters. They remain unadopted unless a quality-preserving placement path and actual-size QA are verified.

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

## Completion gate

Do not call V6 complete or print-ready until all of the following are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 FO + FP/FQ + EW + FN + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_CLEAN / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs before every write.
3. Use the six-spread same-scale board before cosmetic changes.
4. Keep testing whether native typography, subtraction, existing legitimate photo responsibility or bounded decoration can solve a defect before adding another module.
5. Never substitute semantically unrelated imagery merely to reduce repetition counts.
6. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
7. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
