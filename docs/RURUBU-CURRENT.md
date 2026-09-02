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

`VISUAL_MASTER_LOCKED ≠ FIGMA_STRUCTURE_READY ≠ FIGMA_DESIGN_COMPLETE`.

## Current work ownership — USER LOCKED

Current workflow:

### ChatGPT
- analyze user feedback;
- improve Root/shared/page manifests;
- remove contradictory older rules;
- complete review/acceptance design;
- prepare the Codex handoff prompt;
- review Codex output afterward.

### Codex
- production ImageGen;
- key-background/cutout/alpha preparation;
- Figma writes and cleanup;
- photo proxy placement;
- Figma screenshots/exports;
- Drive/Git production evidence when instructed.

**ChatGPT must not jump ahead into production Figma/ImageGen while manifest/feedback work is open unless the user explicitly reassigns that work.**

## Current Git / Figma authority

Git branch:
`rurubu/v30-final-production-20260901`

PR:
`#878 — Rurubu V30: final production clean-slate`

Figma file key:
`bfM0d4c9dCeBv5pCkJ3TNM`

Figma page:
`V30_FINAL_PRODUCTION`

Board:
`3535:2`

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

It overlaps the P02 area and can make P02 look occupied/confusing.

**Codex must delete `3708:2` before the next P01 production pass.**

Do not delete or overwrite the real P02 frame `3535:9`.

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

V20 = frozen history/reference only.

Do not create V31 unless explicitly requested.

## New hard rule: bundled fixed display modules

If short fixed text/numbers visually belong to one authored object with its:
- background/vessel;
- badge;
- icon;
- route/doodle;
- flower/heart/sparkle;
- local outline/shadow;

then **the complete visible module may be generated/prepared as one production asset**.

Visible fixed text does **not** need to remain editable in Figma.

Exact approved strings/numbers must instead be preserved in manifest/asset metadata and QA-checked.

Examples:
- `2026` badge;
- Date ticket;
- Feature `1 + heading + icon + vessel`;
- Q-number shell;
- story-hook vessel;
- `OUR JOURNEY / TAKE A TRIP` stamp;
- `PAGE / 01` badge;
- masthead/title/name lockups when fixed/approved.

Keep separate/native:
- long body copy;
- unapproved Q&A;
- personal/TBD facts;
- frequently changing text;
- replaceable real photographs.

`ONE INDEPENDENT EDITORIAL OBJECT = ONE IMAGE`.

A bundled fixed display module is **one object**, even if it contains several internal visible elements.

## New hard rule: clean standalone photo proxies

The Visual Master is comparison authority, **not photo-slot source material**.

Do not crop `P01.png`, `P02.png`, etc. and use those crops inside photo slots.

Do not use page screenshots as proxy photos.

Reason:
- page decorations/background may be baked into the crop;
- the same flower/title/frame can appear twice;
- photo vs page-part boundaries become unclear;
- Reference Delta can falsely improve.

Allowed proxy sources:
1. suitable user-provided real photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy with no page-layout decoration.

For visual QA, the proxy must still match the slot's subject role/count/orientation/focal mass.

## Replaceable-photo structure

Every real-photo slot:
- independent clipped/masked container;
- real/proxy photo separate from decoration/frame;
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

But final acceptance is reopened because:
- Feature 1/2/3 inherited modules remain stale;
- Date ticket remains stale;
- Bottom Story remains stale;
- names ribbon/lower stamp/page area need requalification;
- current Hero/Feature Visual-Master-crop proxies are now deprecated because they contain page-layout contamination risk.

Current P01 state:

`BEST CURRENT PROMOTED`
+
`CARRY-OVER DEBT OPEN`
+
`CLEAN-PROXY DEBT OPEN`
+
`DISPLAY-MODULE REWORK OPEN`
+
`FINAL PHOTO QA PENDING`.

Detailed next-build requirements:
`assets/rurubu-v30/p01/polish-manifest.json`

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

## P02/P03 prevention already modeled

Page polish manifests now exist:
- `assets/rurubu-v30/p02/polish-manifest.json`
- `assets/rurubu-v30/p03/polish-manifest.json`

They explicitly define bundled fixed display-module candidates and prohibit Visual-Master-crop photo proxies.

P04–P08 manifests now require the same classification during their Visual Master review before part generation; their exact module list must not be invented before PASS A/PASS B.

## Stop condition for governance

Add rules only for real/repeatable failures or truth/print/editability risk.

The current rules were added because P01 exposed real implementation failures.

When all relevant feedback is represented and contradictions are removed:

`STOP WRITING RULES → HAND OFF TO CODEX → MAKE THE BOOK BETTER.`

**CURRENT = V30. V20 = FROZEN HISTORY.**
