# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EZ_PREFERRED / PROFILE_QA_ET_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_EY_PREFERRED / ONE_DAY_PLAN_FA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EZ `1836:2` — front `1836:51`.
- Profile / Q&A ET `1817:2` — Profile `1817:3`.
- Story / chronology EN `1773:2` — chronology `1773:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe EY `1835:2` — Cafe `1835:3`.
- Yokohama 1DAY Plan FA `1840:2` — right `1840:33`.

Start Here `845:27`:

`V5 FU/FX · V6 EZ + ET/EN + EW MEMORY SPOTS + EY CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

EU `1818:2` is preserved as hidden rollback. EV `1821:2` and EX `1831:2` remain hidden rollbacks. V7 was not edited.

## Latest verified progress

### FA — 1DAY photo-led stop hierarchy

Same-scale review of all six preferred V6 spreads showed the 1DAY right page as the weakest remaining page. Its content and editability were correct, but the repeated narrow text-left / similar-photo-right pattern still read as an itinerary template with excessive cream mass.

FA preserves all native stop copy, chronology, image hashes and replaceable-photo semantics. It changes only right-page geometry:

- STOP01 stays compact at `238×210`, source `240×220`;
- STOP02 becomes the dominant mid-page photo at `480×290`, source `810×552`;
- STOP03 becomes a smaller bridge at `290×220`, source `352×368`;
- STOP04 becomes the closing photo field at `480×220`, source `732×498`;
- native stop copy is moved toward the corresponding photo;
- no new photo, generated asset, card, shadow, gradient, Drive save, external binary placement, copy role or image hash.

Final FA: whole/thumbnail 900px PASS; reading 1200px PASS; right `1840:33` actual-size `794×1123` PASS; native text `25`; same-parent text collision `0`; 18px safe-area risk `0`; image intrinsic violations `0/4`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FA-1DAY-PHOTO-LED-STOPS-QA-2026-08-19.md`.
Learning: `RSL-120` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-120-unequal-photo-mass-itinerary-rhythm.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fa-1day-photo-led-stops.md`.

### EZ — Outer selective photo-frame subtraction

The smaller rotated Cafe photo keeps its functional white separation frame while the larger Dining support works edge-led. Final 500px/1200px/front actual-size PASS; visible native text 13; collision 0; 18px safe-area risk 0.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EZ-OUTER-SELECTIVE-PHOTO-FRAME-SUBTRACTION-QA-2026-08-19.md`.
Learning: `RSL-119`.

### EY — Cafe native closing feature

The native closing line `好きな店が、旅の目的地になる。` is promoted into a real closing beat rather than adding another photo/card. Final 500px/1200px/Cafe actual-size PASS; collision 0; safe risk 0.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EY-CAFE-NATIVE-CLOSING-FEATURE-QA-2026-08-19.md`.
Learning: `RSL-118`.

### EW — Memory Spots redundant-copy subtraction

EW removes redundant SPOT02 helper copy, strengthens the existing pullquote, and enlarges the same verified SPOT02 photo to `430×355`. Final 500px/1200px/actual-size QA PASS; collision 0; 18px safe risk 0; image intrinsic violations 0/4.

### EU → FA — rollback lineage

EU remains hidden as rollback. FA was created from EU in a rollback-safe duplicate, independently compared at whole/read/actual-size scales, then promoted only after source-size and text-boundary QA passed.

## Shared-learning input used this run

- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- neutral non-Rurubu lesson `2026-08-17-nrsl-unequal-content-mass-columns.md` was consumed only as a structural hypothesis about assigning unequal visual mass according to semantic/content responsibility;
- no non-Rurubu item-specific Figma, Drive, asset, ledger, palette, coordinates or current production state was inspected or copied.

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

`V6 EZ + ET/EN + EW + EY + FA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before every write.
3. Continue same-scale six-spread review and attack screenshot-visible weak regions before cosmetic additions.
4. Revalidate dynamic native copy after any material spatial or typography change.
5. Continue semantic photo-repetition reduction only where the photo role is not essential evidence; never substitute unrelated imagery merely to reduce counts.
6. Keep photo frames, rules and support geometry only where they prove a binding/separation function at whole-item scale.
7. Prefer unequal editorial responsibility among repeated photo/content roles when equal mass creates module/grid rhythm; independently verify intrinsic source sizes and long-copy safety after geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
