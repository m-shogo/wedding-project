# RURUBU V6 — T + BK/BQ Photo-bound Chronology QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Result: `BQ VERIFIED_LOCAL / PREFERRED / V7 HOLD / NOT_PRINT_READY`

## Starting authority

Before writes the run re-read:

- project `AGENTS.md`;
- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`;
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`;
- Rurubu shared feed and append inventory through RSL-047;
- neutral non-Rurubu shared feed only, without inspecting any non-Rurubu item production state;
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`;
- `RURUBU-V6-CURRENT-STATUS.md`;
- `RURUBU-V6-FAILURE-MEMORY-AND-PREFLIGHT-2026-08-15.md`;
- live Figma T/BK/BH;
- Drive V6 root and generated master inventory;
- GitHub main.

## Visible problem

BH was already much better than equal cards, but the chronology still used a partially parallel system:

- major event numbers/copy sat in the cream field;
- their photographs sat beside them;
- the repeated upper sunset support duplicated the same visual source used by event 01;
- an old generated timeline image layer remained in the tree even though screenshot readback showed no meaningful visible contribution.

At whole-item scale the page was correct but still slightly closer to an arranged timeline than a strongly edited travel-magazine feature.

## Root-cause hypothesis

A chronology does not need one global treatment for every event. If the photo is large enough and has usable contrast, native date/title/copy can be bound directly to that photo. Smaller or busier image roles should keep their copy outside rather than forcing uniformity.

Expected improvement:

- major beats read as complete editorial units;
- fewer parallel text/image systems;
- less duplicate-photo repetition;
- no added cards, shadows, gradients or generated decoration;
- native copy and replaceable images remain intact.

Regression risks:

- text on photos could lose contrast;
- forcing the method onto small event 03 could make it cramped;
- large event numbers could collide with adjacent copy;
- moving support text could violate safe area;
- removing an existing layer could reduce useful binding if it actually contributed visually.

## Rollback-safe test sequence

Source remained untouched during testing: BH `1451:2`.

Working clone: `1468:2`.

The experiment intentionally progressed through bounded states instead of overwriting BH:

1. BL — bound 01/03/05 copy directly to photos.
2. BM — rejected uniform treatment for 03 and restored its text to the cream field.
3. BN — hid the reused generated timeline module after screenshot evidence showed no meaningful contribution.
4. BO/BP — absolute-bounds QA exposed number/copy collisions and right-edge risk; positions were repaired instead of promoting the visually promising but structurally invalid state.
5. BQ — removed duplicated upper sunset support, retained one distinct old-town support image, rebalanced it, and reran visual/structural QA.

No new binary asset, generated image, Drive write, card, shadow or gradient was added.

## BQ visual result

BQ root:

- `1468:2 / PREFERRED / V6_INSIDE_BQ_PHOTO_BOUND_MILESTONE_CHRONOLOGY_2026_08_16`.

Chronology:

- `1468:21 / PAGE / TIMELINE_EDITORIAL`.

Editorial treatment:

- 01: native number on cream edge; native date/title/copy directly over the sunset event photo;
- 02: compact text-only support beat;
- 03: large native number/text remains outside its smaller skyline image after the direct-photo version proved too cramped;
- 04: compact support beat beside the skyline image;
- 05: native date/title/copy directly over the dining photo;
- 06: existing dark WEDDING terminal field unchanged;
- duplicated upper sunset support hidden;
- distinct old-town support retained at `210×155`;
- reused generated timeline decor hidden.

## Active BQ photo roles

- feature hero `1468:22` — `793.7×430` — hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- old-town top support `1468:24` — `210×155` — hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- event 01 `1468:29` — `350×190` — hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- event 03 `1468:37` — `238×148` — hash `644f449c3bf2001a94d4b822d2b55e2614c11042` — registered intrinsic `240×220`, PASS;
- event 05 `1468:45` — `410×155` — hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

All remain replaceable IMAGE roles. No source is newly generated in this run.

## Three-scale evidence

### Whole / thumbnail

BQ whole spread at 500px: PASS.

Compared with BH, the primary visible improvement is that 01 and 05 read as photo-led milestone units rather than text on one side and image on the other. The duplicate upper sunset is gone.

### Reading scale

BQ whole spread at 1000px: PASS.

The mixed treatment is intentional: 01/05 use photo-bound native copy; 03 stays outside its small image; 02/04 remain support beats. The page no longer forces one template treatment on all milestones.

### Actual size

BQ chronology `1468:21 / 794×1123`: PASS.

Final programmatic audit:

- visible native text: `30`;
- visible replaceable IMAGE roles: `5`;
- absolute text/text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible text outside page: `0`.

Rendered actual-size review also PASS for line breaks, contrast and hierarchy.

## Drive readback

V6 root remained reachable:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Generated masters still present but not newly adopted:

- Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`;
- Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`;
- Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

The known submit/DNS transport fingerprint has not materially changed and was not retried.

## Promotion transaction

Fresh pre-promotion Figma readback confirmed:

- Start Here: `V5 FU/FX · V6 T + BK/BH INSIDE STUDIES · V7 HOLD`;
- BH `1451:2` visible preferred;
- BQ `1468:2` visible study.

After full QA:

- BQ renamed/promoted to preferred;
- BH renamed to rollback and hidden;
- Start Here updated to `V5 FU/FX · V6 T + BK/BQ INSIDE STUDIES · V7 HOLD`;
- V7 unchanged.

## State distinction

- newly generated: `0`;
- Drive saved this run: `0`;
- newly placed binary: `0`;
- existing image hashes recomposed: `YES`;
- duplicated source subtracted: `YES`;
- dead generated decoration hidden: `YES`;
- native text preserved: `YES`;
- replaceable photos preserved: `YES`;
- visually verified: `YES`;
- structurally verified: `YES`;
- print ready: `NO`.

## Adoption decision

`BQ ADOPTED / VERIFIED_LOCAL`.

BH is retained hidden as rollback evidence. The transferable finding is recorded separately as RSL-048; literal positions, photo choices, colors and Rurubu chronology grammar remain item-specific.
