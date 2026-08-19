# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FH_PREFERRED / PROFILE_QA_FG_PREFERRED / STORY_CHRONOLOGY_FK_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FJ_PREFERRED / ONE_DAY_PLAN_FI_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / SEMANTIC_PHOTO_RESPONSIBILITY_REAUDITED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer FH `1854:2` — back `1854:3`; front `1854:51`.
- Profile / Q&A FG `1851:2` — Profile `1851:3`; Q&A `1851:47`.
- Story / chronology FK `1870:2` — chronology `1870:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FJ `1866:2` — Table `1866:29`.
- Yokohama 1DAY Plan FI `1863:18` — right `1863:49`.

Start Here `845:27`:

`V5 FU/FX · V6 FH + FG/FK + EW MEMORY SPOTS + FJ CAFE & TABLE + FI 1DAY PLAN · V7 HOLD`

Older comparison/rollback roots remain hidden rather than deleted.

## Latest verified progress — FJ / FK semantic photo responsibility

Same-scale six-spread review found two remaining repeated-photo roles whose semantic/editorial responsibility was weaker than their module cost.

### FJ — Cafe / Table

Source FB `1843:2` used a small Table-04 support photo below an already dominant food photograph. FJ `1866:2` removes that visible support-photo role and promotes `04` into a native typographic feature instead.

Final FJ evidence:

- whole/read context: PASS;
- Table `1866:29` actual-size `794×1123`: PASS;
- visible native text `22`;
- absolute text collisions `0` after one detected initial collision was repaired;
- 18px text safe-area risks `0`;
- Table-04 support photo hidden;
- no new image/raster/hash.

Result: the lower-right area reads as an editorial second beat rather than another photo card while the dominant dining hero preserves the required food/table evidence.

### FK — Story / chronology

Source EN `1773:2` used the repeated dining image for event 05 `入籍`, even though that photograph did not document or explain the milestone. FK `1870:2` hides that image and makes event 05 a native typographic milestone while preserving the hero, event 03 photo, native chronology facts and WEDDING terminal.

Final FK evidence:

- whole/read context: PASS;
- chronology `1870:28` actual-size `794×1123`: PASS;
- visible native text `31`;
- absolute text collisions `0` after one detected initial collision was repaired;
- 18px text safe-area risks `0`;
- event-05 dining photo hidden;
- no replacement/unrelated image used.

### Post-adoption six-spread image-role readback

Current preferred roots contain:

- visible IMAGE-fill roles: `30`;
- unique image hashes: `8`;
- waterfront repetitions: `5`;
- travel-texture repetitions: `5`;
- dining repetitions: `5`;
- cafe repetitions: `5`;
- flatlay repetitions: `3`;
- street repetitions: `3`;
- skyline repetitions: `3`.

These counts are diagnostic only. Images are not removed merely to improve diversity numbers; semantic truth and editorial responsibility remain the gate.

Adoption / rollback:

- preferred FJ `1866:2`; hidden rollback FB `1843:2`;
- preferred FK `1870:2`; hidden rollback EN `1773:2`;
- Start Here updated to FJ/FK;
- V7 unchanged / HOLD.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FJ-FK-SEMANTIC-PHOTO-RESPONSIBILITY-QA-2026-08-19.md`.
Learning: `RSL-124` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-124-semantic-photo-responsibility-gate.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fj-fk-semantic-photo-responsibility.md`.

## Existing preferred verification retained

### FH — Outer

FH remains live preferred and unchanged. Its photo-led cover/back hierarchy and existing actual-size evidence remain authoritative.

### FG — Profile / Q&A

FG remains live preferred and unchanged. Native reader-facing copy, variable-text editability and replaceable photos remain intact.

### EW — Memory Spots

EW remains live preferred and unchanged. Its photo-led spot hierarchy and existing source-safe verification remain authoritative.

### FI — 1DAY Plan

FI remains live preferred and unchanged. STOP01 stays a native typographic start; STOP02/03/04 remain independent replaceable photo roles with prior actual-size verification.

## Shared-learning input used this run

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning history;
- read the neutral non-Rurubu feed only as permitted cross-scope process/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, assets, ledgers, GitHub paths or production state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- new RSL-124 is only `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not cross-item verified.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- unrelated replacement imagery used: NO;
- two semantically weak visible photo roles removed through FJ/FK: YES;
- native variable text preserved: YES;
- remaining replaceable photo roles preserved: YES;
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

`V6 FH + FG/FK + EW + FJ + FI = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / SEMANTIC_PHOTO_RESPONSIBILITY_REAUDITED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs before every write.
3. Continue same-scale six-spread visual comparison before cosmetic changes.
4. For remaining repeated photography, evaluate unique semantic/evidentiary responsibility before keeping/removing a photo role.
5. Never substitute semantically unrelated imagery merely to reduce repetition counts.
6. Prefer native typography or an existing legitimate photo anchor before adding another card/photo/ornament where the role is nonessential.
7. Re-run actual-size collision, safe-area, parent-containment and source-fidelity QA after material typography or geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
