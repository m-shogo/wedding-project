# 2026-08-24 — Rurubu V7 G5 gutter-reserve feedback

Scope: Rurubu WEDDING only.

New professional learning this run came from facing-page/binding-margin practice rather than another styling pass. The live audit found a specific inside-edge risk candidate: G4's Hawaii-memory caption was only 18.7 px from the study spread center.

A rollback-safe G5 moved only that caption 40 px outward, increasing center reserve to 58.7 px with copy, typography, photos, crops, palette and hierarchy unchanged. 500 px, 1400 px and native 1587×1123 design QA all passed; structure remained 20 native texts, 6 IMAGE fills, 0 text intersections and 0 current-root overlaps.

The important lesson is not a numeric gutter rule. The exact printer/template/binding/creep authority does not yet exist. The verified local result is only that this specific spread can carry more inside reserve with no visual regression. Final print safety remains blocked.

Figma current: G5 `2418:2`; caption `2418:9`. G4 `2395:2` is hidden rollback.

No image generation, Drive write, new master, new image hash, photo crop change, factual-copy change, V6 change or V8 production change occurred.
