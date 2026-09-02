# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-02`

The only current Rurubu WEDDING production version is **V30**.

Do not infer current production state from an older chat/report alone.

## REQUIRED READ SET — every production run

Read in this order before changing a V30 page:

1. **This file**
2. **actual page Visual Master** — `assets/rurubu-v30/pXX/PXX.png`
3. **Root manifest** — `assets/rurubu-v30/manifest.json`
4. **V30 visual-polish/execution overrides** — `assets/rurubu-v30/visual-polish-manifest.json`
5. **page manifest** — `assets/rurubu-v30/pXX/manifest.json`
6. **page polish manifest when present** — `assets/rurubu-v30/pXX/polish-manifest.json`
7. **pre-build visual audit** — `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. **post-build acceptance** — `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
9. **page README** when production already exists
10. broader V30 docs only as needed.

Do not treat one manifest alone as sufficient visual authority.

When a page polish manifest is marked as a newer execution override after direct Visual Master rereview, **its module/proxy/decomposition decisions override older conflicting execution details in that page's older main manifest**. Canonical facts and locked page role still remain authoritative.

`VISUAL_MASTER_LOCKED ≠ FIGMA_STRUCTURE_READY ≠ FIGMA_DESIGN_COMPLETE`.

## Current work ownership — USER LOCKED

### ChatGPT
- analyze user feedback;
- inspect actual Visual Masters;
- improve Root/shared/page manifests;
- remove contradictory older rules;
- prepare Codex handoff instructions;
- review Codex output afterward.

### Codex
- production ImageGen;
- key-background/cutout/alpha preparation;
- Figma writes and cleanup;
- clean photo proxy placement;
- Figma screenshots/exports;
- Drive/Git production evidence when instructed.

**ChatGPT must not jump ahead into production Figma/ImageGen while manifest/feedback work is open unless the user explicitly reassigns that work.**

## Current Git / Figma authority

Git branch: `rurubu/v30-final-production-20260901`

PR: `#878 — Rurubu V30: final production clean-slate`

Figma file key: `bfM0d4c9dCeBv5pCkJ3TNM`

Figma page: `V30_FINAL_PRODUCTION`

Board: `3535:2`

Page frames:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

### Known temporary Figma cleanup

A mistaken temporary duplicate exists:
- `3708:2` — `V30 P01 / CARRYOVER REWORK / TEMP`

Codex must delete `3708:2` before the next P01 production pass.

**Do not delete or overwrite real P02 `3535:9`.**

## Locked facts / roles

- A5 portrait / 8 pages
- trim `148 × 210 mm`
- bleed `3 mm`
- wedding date `2026.10.24`
- names `Shogo` / `Shiori`
- P08 barcode digits exactly `2026102400000`

Roles:
- P01 Cover / `るるぶ WEDDING`
- P02 Profile + Q1/Q2
- P03 Our Story + Q3/Q4
- P04 All Travel Memories / Our Journey
- P05 Friends Memories only
- P06 Real Life / Favorites / Best Shots + Q5/Q6
- P07 Closing Message / Thank You
- P08 Magazine Back Cover

V20 = frozen history/reference only. Do not create V31 unless explicitly requested.

## Direct Visual Master rereview status — 2026-09-02

The owner re-uploaded and ChatGPT directly rereviewed:
- `P01.png`
- `P02.png`
- `P03.png`

This rereview was specifically used to classify **actual authored module boundaries**, **variable/native copy**, **clean photo-slot roles**, and **independently movable decoration**.

Current page execution authorities:
- P01: `assets/rurubu-v30/p01/polish-manifest.json` schema v5
- P02: `assets/rurubu-v30/p02/polish-manifest.json` schema v2
- P03: `assets/rurubu-v30/p03/polish-manifest.json` schema v2

### P01 rereview result

Complete fixed-display modules include, where specified in the page polish manifest:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori` + ribbon
- `2026` year cluster
- Date ticket
- Feature 1 / 2 / 3 display shells
- Bottom Story
- `OUR JOURNEY / TAKE A TRIP`
- `PAGE / 01`

Hero and Feature 1–3 photos remain independent replaceable photo slots.

Large bottom floral cluster, left/right tropical/destination clusters, rings and airmail border remain separate where independent overlap is useful.

For the Date module, the owner's explicit current display wording is:
- `WEDDING DATE`
- `2026.10.24`
- `SAT`

This overrides the Visual Master's reference wording `Date / 2026.10.24 / Sat.` for final visible copy.

### P02 rereview result

The header is one authored title ecology centered on `ふたりのプロフィール`, not plain native title text plus stickers.

P02 execution model:
- header/title module may include title lettering + attached heart/plane/camera/floral ecology and ribbon art;
- SHOGO/SHIORI name bubbles are fixed display modules once their exact visible copy is approved;
- blue/pink profile sheets use generated/prepared shell art, while personal profile values remain separate until copy-lock;
- Q1/Q2 are related but non-identical shell modules;
- Q1 alone has a replaceable inset couple photo;
- two portrait photos + Q1 inset photo use clean standalone proxies only;
- left = SHOGO/blue, right = SHIORI/pink.

### P03 rereview result

P03 execution model:
- `OUR STORY` + `ふたりのこれまで` ribbon form one header system;
- the handwritten intro sentence remains separate until copy-lock;
- timeline Step 1–5 are individually authored heading modules, not repeated UI cards;
- the continuous dotted timeline route spans multiple steps and remains independent;
- Step 1–4 have photo relationships; Step 5 intentionally has no photo;
- Q3/Q4 are related but non-identical paper shells;
- Hero + four support photos use clean standalone proxies only;
- Hero pink tape remains independent from the replaceable Hero photo;
- Wedding Day card and PAGE 03 may be complete fixed modules;
- bottom church/tropical cluster remains independently movable where needed.

## Bundled fixed display modules — HARD

If short fixed text/numbers visually belong to one authored object with its background/vessel, badge, icon, route/doodle, local flower/heart/sparkle and print depth, the **complete visible module may be generated/prepared as one production asset**.

Visible fixed text does **not** need to remain editable in Figma.

Exact approved strings/numbers must be preserved in manifest/asset metadata and QA-checked.

Keep separate/native:
- long body copy;
- unapproved Q&A;
- personal/TBD facts;
- frequently changing text;
- replaceable photographs.

`ONE INDEPENDENT EDITORIAL OBJECT = ONE IMAGE`.

A bundled fixed display module is one object even if it contains several internal visible elements.

## Clean standalone photo proxies — HARD

The Visual Master is comparison authority, **not photo-slot source material**.

Do not crop `P01.png`, `P02.png`, etc. and use those crops inside photo slots. Do not use page screenshots as proxy photos.

Allowed proxy sources:
1. suitable user-provided real photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy with no page-layout decoration.

For visual QA, the proxy must match the slot's subject role/count/orientation/focal mass.

## Replaceable-photo structure

Every real-photo slot:
- independent clipped/masked container;
- photo separate from decoration/frame;
- non-destructive replacement;
- photo never spills outside mask;
- replacement must not remove page decoration.

P05 remains 4 SHOGO FRIENDS + 4 SHIORI FRIENDS = 8 independent slots.

## Visual Carry-over Audit

Layer cleanup and visual freshness are different.

Every inherited visible asset after a REWORK must be:
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

until checked: `UNREVIEWED_CARRYOVER`.

`ADOPTED`, prior PASS, unchanged, or `PRODUCTION_RGBA` do not grant permanent visual approval.

## P01 current state

The promoted P01 REWORK at `3535:7` remains the **best CURRENT**. Do not roll back to FIRST BUILD.

Current state:

`BEST CURRENT PROMOTED`
+
`CARRY-OVER DEBT OPEN`
+
`CLEAN-PROXY DEBT OPEN`
+
`DISPLAY-MODULE REWORK OPEN`
+
`FINAL PHOTO QA PENDING`.

Detailed next-build requirements: `assets/rurubu-v30/p01/polish-manifest.json`.

P02 production must not begin until P01 implementation debt is resolved or explicitly deferred by the user.

## Mandatory acceptance order

After Codex production:

1. current Figma screenshot
2. `CLEAN_PROXY_PASS`
3. `BUNDLED_DISPLAY_MODULE_PASS`
4. `IDENTITY_ANCHOR_PASS`
5. `VISUAL_CARRYOVER_PASS`
6. direct Visual Master `REFERENCE_DELTA_PASS`
7. anti-UI/coherence check
8. photo swap / face-safe check
9. A5 / grayscale / print checks
10. human feedback writeback

Technical QA cannot override visual failure.

## P04–P08

P04–P08 have not received this new direct image rereview in the current feedback cycle. Their exact bundled-module lists must **not** be invented from prose.

Before their production:
- inspect the actual Visual Master;
- run PASS A/PASS B;
- classify bundled fixed modules;
- classify native/variable copy;
- classify clean standalone proxy roles;
- then update page authority before Codex production.

## Stop condition for governance

Add rules only for real/repeatable failures or truth/print/editability risk.

Once the relevant feedback is represented and contradictions are removed:

`STOP WRITING RULES → HAND OFF TO CODEX → MAKE THE BOOK BETTER.`

**CURRENT = V30. V20 = FROZEN HISTORY.**
