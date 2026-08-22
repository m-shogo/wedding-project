# Rurubu V8 Outer AP — RSL-215 recurrence cleanup

Date: 2026-08-22

After promoting 1DAY AO, a six-root live audit found one remaining publication-furniture inconsistency: Outer AH's back-cover index still said `05 1DAY` while the Current section itself had already become `05 / 一日旅`.

Rollback-safe AP `2251:2` changed only that final index term to `05 一日旅`.

QA: 500px / 1400px / 1587×1123 PASS; native text 12; IMAGE 1; intersections 0; 18px safe risk 0; generic schema/process leakage 0.

This is a successful recurrence catch under existing `RSL-215`, not a new design rule. It is evidence that the schema-language audit is now finding leftover instances across adjacent publication surfaces instead of repeatedly rediscovering the same problem after release.

Previous AH `2234:2` is hidden rollback; AP is Current. No image generation, Drive write, or image replacement occurred.
