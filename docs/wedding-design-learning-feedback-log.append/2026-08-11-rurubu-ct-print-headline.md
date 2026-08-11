# Rurubu CT — project-wide design feedback

Date: 2026-08-11
Scope tested: Rurubu WEDDING V5 clean-room outer comparator only.

## Observation

A large Japanese headline can be compositionally correct yet still feel digitally generic when its legibility depends on a white fill plus heavy outline. A light photograph can also make a small white caption unstable even when the crop itself is good.

## Principle tested

1. For magazine-like print work, first try native Japanese type plus one purposeful flat color field before outline/shadow effects.
2. When only a small caption zone has unstable contrast, bind a narrow ink strip to that caption/photo angle instead of adding a full card or global overlay.
3. Structure QA must inspect fold/safe guides independently from screenshot QA; a guide can regress without an obvious visual symptom.

## Expected improvement

- stronger thumbnail silhouette;
- more print-native editorial hierarchy;
- less AI/web-UI display styling;
- stable actual-size caption readability;
- safer print/fold evidence.

## Regression risk and evidence

The stronger headline bar can become sticker-like if oversized. During CT, structure QA also caught a `1px` kicker/headline overlap and then a shifted fold guide; both were repaired before acceptance. Final CT has zero same-parent text intersections and its provisional fold is restored to full-height `x=792.7, y=0, 2 × 1122.5`.

## Adoption

Accepted for Rurubu CT as the strongest outer **composition comparator**, not promoted to Current. The existing cover proxy raster remains a visual-quality FAIL, so this experiment does not change the V5 photo-role count.

## Next application

Reuse the principle—not the geometry—when a future print item has the same problem: prefer native type + one semantic color field, and use local caption contrast repair rather than container proliferation. Always re-check fold/safe guides structurally after headline movement.
