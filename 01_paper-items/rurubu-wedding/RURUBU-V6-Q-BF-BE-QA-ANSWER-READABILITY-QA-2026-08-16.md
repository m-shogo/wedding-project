# Rurubu WEDDING V6 — Q / BF / BE Q&A answer readability QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `Q_BF_BE_PREFERRED / VERIFIED_LOCAL / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Live authority before work

- GitHub main observed before durable write: `d8b46ac0e1757847611e32d189b2bd22dc79d546`
- Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
- prior preferred: Outer Q `1426:2`, Profile/Q&A BD `1430:2`, Story/chronology BE `1433:2`
- Drive V6 root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- V7 remained HOLD.

At run start the project-wide hybrid authoring policy, shared learning system, Rurubu shared feed, neutral non-Rurubu feed, Rurubu operating system/postmortem, current status, live Figma, Drive root and GitHub main were re-read. No non-Rurubu item-specific Figma/Drive/ledger/path was inspected or mutated.

## Visible problem

BD Q&A had already escaped the repeated-card/grid pattern, but several answer blocks were still `9–10 px` at actual Figma size. They were structurally safe yet visually weaker than the surrounding 11–18 px interview hierarchy and risked reading like micro UI/help text rather than Japanese magazine body copy.

Exact pre-test answer sizes:

- Q1 `11 px`
- Q2 `9 px`
- Q3 `9 px`
- Q4 `11 px`
- Q5 `9 px`
- Q6 `10 px`

## Root-cause hypothesis

The page no longer needed more decoration or another layout rebuild. Its remaining readability defect came from inconsistent answer type scale. Raising all answer copy to a common 11 px body baseline should improve actual-size reading while preserving the asymmetric interview/photo split, provided the photo boundary and realistic long-copy stress still pass.

## Bounded rollback-safe tests

### Outer masthead comparison — rejected

A separate Outer Q duplicate was created first:

- `1436:2 / STUDY / V6_OUTER_R_STRONGER_MASTHEAD_2026_08_16`

Only the existing verified PNG masthead was enlarged `330×106.7 → 400×129.3` and moved to `x=365 / y=14`.

Structure readback found the candidate's masthead entered the 18 px top safe area (`y=14`). It was therefore not promoted and was hidden as:

- `REJECTED / V6_OUTER_R_STRONGER_MASTHEAD_SAFE_AREA_FAIL_2026_08_16`

Outer Q remained preferred. No masthead asset, photo, headline or back-cover geometry was changed in production.

### BF Q&A readability candidate — adopted

Source: BD `1430:2`.

Created:

- BF `1436:56 / V6_INSIDE_BF_QA_ANSWER_READABILITY_2026_08_16`

Changes were limited to the Q&A page:

- Q2 answer `9 → 11 px`
- Q3 answer `9 → 11 px`
- Q5 answer `9 → 11 px`
- Q6 answer `10 → 11 px`
- Q1/Q4 remain `11 px`
- Q2/Q3/Q5/Q6 answer boxes resized from `44–46 px` height to `52 px` to preserve reserve;
- existing replaceable Q&A hero photo moved only `x=315 → 323` while preserving `465×480`, rotation and image hash;
- no new card, shadow, gradient, sticker, raster, generated decoration, baked copy or new image source was added;
- Profile-side geometry and all source image hashes remained unchanged.

The 8 px photo shift was made only after structural measurement found tiny rotated-image bounding overlaps against Q2/Q3. Post-shift readback returns answer/image collision `0`.

## Realistic long-answer stress

A dedicated post-adjustment proof was created from BF:

- `1436:180 / QA / V6_INSIDE_BF_LONG_ANSWER_STRESS_FINAL_2026_08_16`
- hidden after verification.

All six answers were replaced with realistic Japanese multi-clause copy and temporarily set to natural HEIGHT sizing to measure actual growth at 11 px.

Natural stress heights:

- Q1 `39 px`
- Q2 `39 px`
- Q3 `39 px`
- Q4 `39 px`
- Q5 `26 px`
- Q6 `39 px`

Final proof:

- answer/other visible-node collisions: `0`
- 18 px text safe-area risks: `0`
- no page overflow observed
- all answer text remains native `Noto Sans JP Regular`.

An earlier pre-photo-shift stress proof `1436:118` detected the same tiny rotated-photo bounding contact and was superseded by the final proof.

## Three-scale evidence

Post-adjustment BF was reviewed at:

- whole spread / thumbnail: `700×495` render — PASS;
- reading/page context: full spread geometry preserved — PASS;
- actual Q&A page: `794×1123` — PASS.

The page retains the existing editorial reading path while the answer copy no longer drops into a visibly smaller micro-text tier.

## Final structure readback

BF Q&A page:

- visible native text: `24`
- replaceable IMAGE roles: `2`
- answer font-size baseline: `11 px` for all six answers
- text/text collision: `0`
- answer/image collision: `0`
- 18 px text safe-area risks: `0`

Image authority preserved:

- `PHOTO / QA_MEMORY_HERO_REPLACEABLE`: display `465×480`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, only x-position changed to `323`
- `PHOTO / QA_MEMORY_SUPPORT_REPLACEABLE`: display `238×210`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, unchanged.

BF Profile page is unchanged from BD and retains its previously verified value-stress evidence.

## Promotion

Live Figma after promotion:

- Outer Q `1426:2` — preferred, unchanged
- Profile/Q&A BF `1436:56` — preferred
- Story/chronology BE `1433:2` — preferred, unchanged
- BD `1430:2` — hidden rollback
- Outer R `1436:2` — hidden rejected comparison
- BF final long-answer proof `1436:180` — hidden
- Start Here `845:27`: `V5 FU/FX · V6 Q + BF/BE INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

This pass:

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified Figma image hashes reused: `YES`
- native editable copy preserved: `YES`
- replaceable photo roles preserved: `YES`
- generated/fixed section decoration adopted: `NO`
- whole/read/actual-size verification: `YES`
- rollback comparison preserved: `YES`
- V7 touched: `NO`.

Known binary-submit failure fingerprint was not retried.

## Decision

`Q + BF/BE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

BF is preferred over BD because it improves actual-size Japanese answer readability without reintroducing cards or altering the established interview layout, and the 11 px baseline survives a fresh realistic six-answer stress proof with collision/safe-area results of zero.
