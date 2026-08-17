# ADD-01 ウェルカムボード — V3 photo replacement resilience QA

Date: 2026-08-17
State: `CLEANROOM_V3_STRUCTURAL_PASS / PHOTO_ROLE_REPLACEMENT_RESILIENCE_PASS / REAL_HERO_PHOTO_REQUIRED / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `cb2c3e73ccdba2bb5e5ff1d44c92d804db322545`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `XyyTGuz6BMf8XRhPZZfdoT`
- clean-room V3 candidate: `19:3 / V3 / ADD-01 / PHOTO WINDOW POSTER / 852x1200`
- real-photo role: `19:4 / PHOTO / REAL COUPLE / REPLACEABLE`, `514×720`
- Drive authority: `ADD-01_ウェルカムボード` / `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`
- retained legacy production: unchanged

## Why this QA was needed

The hybrid-authoring policy requires important replaceable image roles to survive a materially different dummy source ratio/size without surrounding-layout reconstruction. ADD-01 remains blocked on the authoritative real couple photo, but that does not prevent a non-person synthetic replacement-resilience test of the image container itself.

## Bounded Figma test

Production was not mutated. A hidden QA section was created:

- `22:8 / QA / ADD-01 / PHOTO REPLACEMENT RESILIENCE / 2026-08-17`

Two rollback-safe V3 duplicates were used:

1. `22:9 / QA / PORTRAIT SOURCE 900x1600`
   - photo role `22:10`
   - synthetic non-person source ratio `900×1600`
2. `22:28 / QA / LANDSCAPE SOURCE 1600x900`
   - photo role `22:29`
   - synthetic non-person source ratio `1600×900`

The test rasters were generated inside Figma solely for crop/replacement QA. They contain no bride/groom/family/guest/child/dog likeness and are not production assets.

Both sources were applied with an IMAGE fill to the cloned `514×720` replaceable photo role. The surrounding root remained `852×1200`; the right information flow, title hierarchy, editable native copy and day-arc vector did not move.

## Screenshot / structure result

Reading-scale screenshots showed both materially different source ratios fitting the same `514×720` role without layout reconstruction. The centered synthetic focal marker remained within the existing photo-focal-safe guide in both cases.

Structural readback:

- portrait QA root: `852×1200`
- portrait photo role: `514×720`
- portrait outside visible text: `0`
- landscape QA root: `852×1200`
- landscape photo role: `514×720`
- landscape outside visible text: `0`
- production root after test: `852×1200`
- production photo role after test: still `514×720`
- production photo fill after test: still original SOLID placeholder, not replaced
- production outside visible text: `0`
- QA section hidden after verification

## Decision

`PHOTO_ROLE_REPLACEMENT_RESILIENCE_PASS`.

This removes one structural uncertainty: the V3 photo role can accept materially different source aspect ratios without rebuilding the surrounding layout. Normal final-photo repair should be limited to crop/focal positioning inside the role.

This does **not** remove the visual gate. The authoritative real couple photograph is still required before final crop/contrast/actual-size image-quality QA and before the V3 candidate can be fairly promoted against retained production.

Drive writes: `0` — the synthetic QA rasters are not adopted assets and were not saved to Drive.
