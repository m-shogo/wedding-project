# Rurubu WEDDING V10 — P02 distinct portrait role QA — 2026-08-29

Scope: **Rurubu WEDDING V10 only**.

## Canonical/live state

- Production page: `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`).
- P02: `2787:9` / `PROFILE` / composition verb `PAIR + LABEL + FACT`.
- Closest reference: `2771:2`.
- QA mode after the change: `PRODUCTION_CANDIDATE`.
- Drive authority and all eight semantic folders were live-listed before the write.

## Largest reference-distance diagnosed

P02 reused the same Shaka couple photograph in the large couple anchor **and both personal portrait roles**. The geometry passed the structural linter, but the repeated source weakened the editorial distinction between SHOGO and SHIORI and made the three image roles read more like one repeated template source than a magazine profile pair.

No new asset was generated. The correction used a REAL photo already present in the organized `02_PHOTO` library and already live elsewhere in V10.

## Adopted Figma correction

### Kept

- `2787:12` couple anchor: `REAL_PHOTO_PROFILE_HAWAII_COUPLE_SHAKA_02.jpg`
  - Drive ID: `1eTF3D0qS7qocpCWDVCXkSdTFBwJQzW-o`
- `2787:13` SHOGO portrait: crop from the same Shaka source.
  - The original subject crop was restored after two attempted relaxed crops produced worse screenshot results.
- `2787:14` SHIORI portrait: changed to `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01.jpg`
  - Drive ID: `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw`
  - Existing `121×140` replaceable mask preserved.
  - `clipsContent=true` preserved.
  - Existing independent floral polaroid fixed frame `3122:2` preserved above the photo.

The final adopted change therefore diversifies only the SHIORI personal-memory role. It does not alter the page title, facts, names, date, mask geometry, or fixed frame.

## Screenshot/reference result

Final reading path remains:

1. `ふたりのプロフィール`
2. yellow editorial bridge + factual date burst
3. large couple anchor
4. differentiated SHOGO / SHIORI personal portrait cues
5. native fact fields

Compared with `2771:2`, the largest remaining distance is now **authoritative profile-detail density plus the still-pending final profile title/frame graphics**, not repeated personal portrait sourcing. No fake profile values were invented to increase density.

Manual Reference Match Score: **85/100 — CREDIBLE / REFINE**.

## Live canonical linter after correction

- `PRODUCTION_CANDIDATE`: **8/8**
- Pages with fatal AI tell: **0**
- Strong canonical warning: **0**
- Highest signature similarities:
  - P02 ↔ P06: **66% INFORMATIONAL**
  - P05 ↔ P07: **59% INFORMATIONAL**
  - P01 ↔ P02: **56% INFORMATIONAL**
  - P01 ↔ P06: **55% INFORMATIONAL**
- `>=70% REVIEW`: **0**
- `>=85% HIGH_RISK`: **0**

P02 linter values after the change:

- shapes: `12`
- visible text: `12`
- meaningful image fills: `4`
- dominance: `2.552`
- edge shapes: `2`
- controlled rotated shapes: `10`
- fatal: none
- warnings: none

## P02 A5 actual-size preflight

- visible native text: **12**
- text outside trim: **0**
- 6 mm working-safe violations: **0**
- text below 12 px: **0**
- missing fonts: **0**
- replaceable photo masks: **3/3 `clipsContent=true`**

Photo sources remain `PHOTO_PROXY_OK_FOR_LAYOUT / FINAL_PHOTO_QA_DEFERRED`; this change does **not** promote temporary people photography to final print photography.

The live fixed Shiori floral frame remains:

- `FRAME_GLOBAL_PHOTO_POLAROID_FLORAL_WHITE_01.png`
- Drive ID: `1-EgrkJMu5b0hvnPcUwgXG1UaN0V-YciS`
- source `1122×1402`
- current display estimate ~`318 ppi`
- fixed graphic QA previously verified

## Status

- `ASSET_FIRST_80`: 8/8
- `PRODUCTION_CANDIDATE`: 8/8
- `DESIGN_COMPLETE`: **NO**
- `PRINT_READY`: **NO**
- new generation this pass: **0**
- new fixed-raster promotion this pass: **0**

Remaining P02 blockers are authoritative profile values/content and pending fixed title/frame transport; they must not be substituted with fabricated text or low-quality decoration.
