# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AA_CURRENT / INSIDE_CX_CY_PREFERRED_STUDIES / FRONT_PHOTO_CLUSTER_VERIFIED / PROFILE_QA_SEMANTIC_PHOTO_ROLE_REASSIGNMENT_VERIFIED / NATIVE_VARIABLE_TEXT_RESILIENCE_VERIFIED / DEPENDENT_QA_AND_CHRONOLOGY_COPY_STACKS_VERIFIED / ALL_25_ACTIVE_RASTER_ROLES_INTRINSIC_SAFE / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Current preferred set after fresh promotion/readback:

- Outer AA `1592:2` — `PREFERRED / V6_OUTER_AA_FRONT_PHOTO_CLUSTER_2026_08_17`;
- Profile / Q&A CX `1601:2` — `PREFERRED / V6_INSIDE_CX_NATIVE_TEXT_RESILIENCE_2026_08_17`;
- Story / chronology CY `1601:81` — `PREFERRED / V6_INSIDE_CY_NATIVE_TEXT_RESILIENCE_2026_08_17`.

Immediate rollback / proof:

- Outer Z `1576:160` — hidden rollback;
- Profile/Q&A CW `1593:2` — hidden rollback;
- Story/chronology CQ `1569:2` — hidden rollback;
- first CX/CY auto-height stress proofs are preserved hidden as rejected structural evidence;
- second-pass CX/CY realistic-copy proofs `1603:9 / 1603:89` are preserved hidden after PASS;
- older rollback-safe comparisons remain preserved.

Start Here live readback:

`V5 FU/FX · V6 AA + CX/CY INSIDE STUDIES · V7 HOLD`

V7 was not edited.

## AA retained — front cover photo cluster

Outer AA was re-read live and retained unchanged in this run.

Its existing verified behavior remains:

- dominant waterfront hero;
- tighter asymmetric dining/cafe support-photo cluster;
- native destination/masthead hierarchy;
- no UI-style card reconstruction;
- cover text collisions `0`;
- 18px text safe-area risks `0`;
- cover rasters remain intrinsic-safe.

## CX — Profile / Q&A native-text resilience

CW already had the preferred photo-role distribution, but a structural audit using the newer shared-learning method found several genuinely variable native text roles still using fixed-height boxes.

Rollback-safe CX repaired only native-editability behavior while preserving the chosen composition and image hashes.

### Profile

Converted to native `textAutoResize=HEIGHT`:

- Profile value 1–6.

A first experiment also made the decorative Profile pullquote unlimited auto-height. Realistic stress proved this was the wrong contract because an overlong pullquote collided with Profile data. That treatment was rejected and the pullquote returned to its explicit bounded display role.

This preserves the distinction between genuinely variable/factual text and deliberate display typography.

### Q04

Q04 question was converted to native auto-height.

Because its answer must move when the question wraps, Q04 question + answer are now one native vertical auto-layout stack:

- `STACK / QA_Q04_NATIVE_AUTOHEIGHT`.

The `04` numeral remains an independent display role.

## CY — Story / chronology native-text resilience

CQ's visual composition was retained, but variable/factual text geometry was strengthened.

Converted to native height-following behavior:

- Story body;
- chronology deck;
- Event 01–06 dates;
- Event 01–06 titles;
- Event 01–06 copy.

For each chronology event, title + copy are now a native vertical auto-layout pair:

- `STACK / EVENT_1_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_2_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_3_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_4_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_5_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_6_TITLE_COPY_AUTOHEIGHT`.

Dates and event numerals remain independent native editorial roles.

## Realistic-copy stress

### First pass — REJECTED

The first proof deliberately exposed real structural failures:

- long Profile pullquote collided with Profile value 2;
- longer Q04 question collided with its answer;
- longer chronology Event 01–05 titles collided with their copy.

The first state was not promoted.

### Second pass — PASS

After restoring the bounded pullquote and adding the native dependent stacks, a second proof used materially longer Japanese Profile values, Q04 wording/answer, Story copy and Event 01–06 titles/copy.

Result:

- Profile collisions `0`;
- Q&A collisions `0`;
- Story collisions `0`;
- chronology collisions `0`;
- 18px text safe-area risks `0` on all four pages.

Actual-size screenshot evidence was captured before the proof frames returned to hidden state.

## Three-scale visual QA

The repair intentionally preserves current art direction rather than introducing another cosmetic redesign.

CX:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Profile actual-size `794×1123`: PASS;
- Q&A actual-size `794×1123`: PASS.

CY:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Story actual-size `794×1123`: PASS;
- chronology actual-size `794×1123`: PASS.

Post-promotion structural readback:

- affected audited variable/factual roles still fixed-height `0`;
- visible text collisions across AA + CX/CY `0`;
- 18px text safe-area risks `0`;
- active raster/image roles `25`;
- image hashes changed `0`.

## Active raster reconciliation

Fresh post-promotion readback across AA + CX/CY found:

- visible active raster/image roles: `25`;
- intrinsic-safe: `25/25`;
- intrinsic violations: `0`;
- new image hashes this run: `0`;
- generated section assets adopted: `0`;
- new Drive saves: `0`.

Canonical reconciliation:

- `01_paper-items/rurubu-wedding/RURUBU-V6-AA-CX-CY-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`.

## Drive / generated section masters

V6 Drive root remains live:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Registered generated section masters remain authoritative-but-unadopted:

- Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`;
- Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`;
- Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

No material capability change occurred for the known quality-preserving external binary-placement blocker, so that failed route was not retried.

## Latest evidence / learning

Primary evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AA-CX-CY-NATIVE-TEXT-RESILIENCE-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/RURUBU-V6-AA-CX-CY-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-aa-cx-cy.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-076-native-text-resilience-audit.md`.

Learning:

- RSL-076 — screenshot PASS does not prove native variable-text resilience; classify native text by role, use targeted auto-height, structurally couple dependent copy, preserve genuine bounded display typography, and rerun realistic-copy stress: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

The neutral source method had cross-item evidence, but Rurubu still tested it locally before adoption. Exact Rurubu copy, typography, stack dimensions, positions, photography and chronology composition remain item-specific.

## Asset lifecycle truth for this run

- newly image-generated assets `0`;
- newly adopted generated assets `0`;
- new Drive saves `0`;
- new external binary placements `0`;
- new raster bytes `0`;
- image hashes changed `0`;
- audited fixed-height variable/factual roles repaired `27`;
- native dependent auto-layout stacks added `7`;
- native variable/factual text preserved `YES`;
- photo replaceability preserved `YES`;
- screenshot / reading / actual-size QA `PASS`;
- realistic-copy stress `PASS`;
- rollback preserved `YES`;
- V7 touched `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- AA + CX/CY cohere with final legitimate photography and final personal copy as one magazine system;
- final personal copy receives a fresh realistic-copy / actual-size stress;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 AA + CX/CY = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / NATIVE_TEXT_RESILIENCE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare AA + CX/CY as one magazine and target the next region that still reads as a template rather than a finished Japanese travel-information magazine.
3. Preserve the new native-text resilience when making later visual changes.
4. Prefer final legitimate photography when available; rerun crop, semantic, contrast and actual-size QA after replacement.
5. Replace dummy native copy with final personal copy and rerun dedicated realistic/long-copy stresses.
6. Keep generated section masters unadopted until quality-preserving placement + actual-size QA is possible.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
