# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EZ_PREFERRED / PROFILE_QA_ET_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FB_PREFERRED / ONE_DAY_PLAN_FA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EZ `1836:2` — front `1836:51`.
- Profile / Q&A ET `1817:2` — Profile `1817:3`.
- Story / chronology EN `1773:2` — chronology `1773:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FB `1843:2` — Cafe `1843:3`.
- Yokohama 1DAY Plan FA `1840:2` — right `1840:33`.

Start Here `845:27`:

`V5 FU/FX · V6 EZ + ET/EN + EW MEMORY SPOTS + FB CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

EU `1818:2` and EY `1835:2` are preserved as hidden rollbacks. EV `1821:2` and EX `1831:2` remain hidden rollbacks. V7 was not edited.

## Latest verified progress

### FA — 1DAY photo-led stop hierarchy

Same-scale six-spread review showed the 1DAY right page as the weakest remaining page. Its native schedule and editability were correct, but repeated narrow text-left / similarly weighted photo-right units still read as an itinerary template.

FA preserves all stop copy, chronology, image hashes and replaceable-photo semantics while assigning unequal photo responsibility:

- STOP01 compact `238×210`, source `240×220`;
- STOP02 dominant `480×290`, source `810×552`;
- STOP03 bridge `290×220`, source `352×368`;
- STOP04 closing `480×220`, source `732×498`.

Final FA: 900px whole PASS; 1200px reading PASS; right `1840:33` actual-size `794×1123` PASS; native text `25`; collision `0`; 18px safe-area risk `0`; image intrinsic violations `0/4`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FA-1DAY-PHOTO-LED-STOPS-QA-2026-08-19.md`.
Learning: `RSL-120` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-120-unequal-photo-mass-itinerary-rhythm.md`.

### FB — Cafe composed-raster intrinsic-safe correction

Post-FA cross-audit found one remaining source-fidelity violation: EY's composed Cafe travel texture was displayed at `793.7×448` from a `720×860` source.

FB changes only that fixed-decoration geometry:

- composed texture: `720×448`, centered at x `36.84375`;
- source remains `720×860`;
- native copy, opacity, Yokohama view photo, Table page and all image hashes remain unchanged.

Final FB: 1200px whole PASS; Cafe `1843:3` actual-size `794×1123` PASS; native text `17`; collision `0`; 18px safe-area risk `0`; Cafe intrinsic violations `0/2`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FB-CAFE-INTRINSIC-SAFE-TEXTURE-QA-2026-08-19.md`.

No new shared-learning entry was created for FB because the correction is a direct application of the already-established intrinsic/source-fidelity gate rather than a new transferable finding.

### EZ — Outer selective photo-frame subtraction

The smaller rotated Cafe photo retains a functional white separation frame while the larger Dining support works edge-led. Final whole/read/front actual-size PASS; collision 0; safe risk 0.

### ET / EN / EW

Profile/Q&A ET, Story/chronology EN and Memory Spots EW remain live preferred and unchanged this run. Same-scale screenshots were re-read before writes.

## Shared-learning input used this run

- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- neutral non-Rurubu `2026-08-17-nrsl-unequal-content-mass-columns.md` was consumed only as a hypothesis about assigning unequal visual mass according to semantic/content responsibility;
- no non-Rurubu item-specific Figma, Drive, asset, ledger, palette, coordinates or current production state was inspected or copied.

## Cross-spread audit after promotion

All six preferred roots exist and are visible. Preferred-set internal/proof/status-copy leakage scan found `0` visible matches.

A source-fidelity audit found the single Cafe composed-texture width violation described above; FB repaired it. No unrelated image was substituted merely to change repetition counts.

## Drive / asset truth

Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Latest run:
- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image-source changes: 0
- native variable text preserved: YES
- replaceable photo roles preserved: YES
- rollback states preserved: YES
- V7 touched: NO

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EZ + ET/EN + EW + FB + FA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before every write.
3. Continue same-scale six-spread review and attack screenshot-visible weak regions before cosmetic additions.
4. Revalidate dynamic native copy after material spatial/typography changes.
5. Continue semantic photo-repetition reduction only where a photo role is not essential evidence; never substitute unrelated imagery merely to reduce counts.
6. Keep photo frames/rules/support geometry only where they prove a binding or separation function.
7. Prefer unequal editorial responsibility among repeated content/photo roles when equal mass creates module rhythm; rerun actual-size and source-fidelity QA after geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
