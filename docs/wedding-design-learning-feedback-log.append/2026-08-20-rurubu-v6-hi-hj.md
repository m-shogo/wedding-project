# Rurubu V6 HI/HJ — Story photo-led hierarchy + controlled overlap

Date: 2026-08-20
Scope: Rurubu WEDDING only

## Visible problem

Six-spread comparison showed GW Story still opened as a cream header above a hero image. After moving the title into the hero, the small support photo remained a detached module and the hero/paper seam still felt template-like.

## Experiment 1 — HI

Principle tested: existing dominant photo can carry native Japanese title/deck if contrast and text-safe area are verified.

Change:
- hero y `132 → 0`, same size/hash;
- title/deck moved onto hero in white;
- no new imagery or decorative container.

Expected improvement: stronger first read, less header/body separation.

Regression risk: z-order, contrast, caption context, replacement-photo variability.

Observed failure:
- direct rectangle width assignment failed atomically (`RECTANGLE_WIDTH_DIRECT_ASSIGN_READONLY`), method switched to `resize()`;
- actual-size review caught a white hero caption left on the cream field (`PHOTO_LED_TITLE_CAPTION_CONTEXT_DRIFT`); caption was moved inside the hero before acceptance.

Result: HI improved over GW and passed whole/actual/structure QA.

## Experiment 2 — HJ

Principle tested: a source-safe existing support photo can bind the hero to the paper field without another asset.

Change:
- support photo kept `238×216`, same hash and rotation;
- y `424 → 360` so it crosses the hero/paper seam;
- native caption moved with it.

Expected improvement: less stacked-module reading, stronger asymmetric magazine rhythm.

Regression risk: text intrusion, source-size exposure, gratuitous scrapbook appearance.

Evidence:
- whole spread 1200×849: PASS, visibly stronger than HI;
- Story actual 794×1123: PASS;
- native text 12;
- text collision 0;
- 18px safe risk 0;
- image hashes unchanged;
- generated 0 / Drive saves 0 / binary placements 0 / new hashes 0.

Decision: HJ adopted; HI and GW hidden rollback.

Next application: continue comparing all six V6 spreads at equal scale and target only a concrete remaining hierarchy/dead-space defect. Do not turn overlap into a repeated motif without a binding job.
