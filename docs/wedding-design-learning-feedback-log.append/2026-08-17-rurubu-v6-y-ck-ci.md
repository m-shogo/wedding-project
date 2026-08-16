# Wedding design learning feedback — Rurubu V6 Y + CK/CI

Date: 2026-08-17
Scope: Rurubu WEDDING only
Status: `VERIFIED_LOCAL / V7_HOLD / NOT_PRINT_READY`

## Experiment 1 — chronology CI

Visible problem: CH still felt like a timeline UI because 01/03/05 were large colored number blocks.

Principle tested: subtract redundant containers and let unequal photography + native number typography carry hierarchy.

Expected improvement: more editorial/travel-magazine reading, less dashboard grammar.

Regression risk: chronology order could weaken.

Result: adopted. CI `1551:2` is preferred. Whole/reading/actual-size comparison passed; chronology final text collision `0`, 18px safe risk `0`. `SCENE 03` was removed after structure QA found one collision.

## Experiment 2 — Profile CK

Visible problem: CG's six facts read like a sparse form below a strong hero.

Principle tested: compress repeated semantic facts into a native-text traveler-data rail instead of adding cards or decoration.

Expected improvement: denser magazine rhythm while keeping values editable.

Regression risk: longer values could collide.

Result: adopted. CK `1553:79` is preferred. Profile actual-size collision `0`, safe risk `0`. Hidden long-copy proof `1553:156` also passed collision/safe-area checks with longer realistic Japanese values.

## Final preferred set

- Outer Y `1542:2` unchanged;
- Profile/Q&A CK `1553:79` adopted;
- Story/Chronology CI `1551:2` adopted;
- V7 remains HOLD.

Generated: `0`; Drive saved: `0`; new binary placed: `0`; adopted new raster decoration: `0`; existing verified photo roles repositioned: yes; native text preserved: yes; rollback preserved: yes.

Exact Rurubu layout, palette, photos, type scale and decorative grammar remain item-specific.