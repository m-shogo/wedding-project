# ADD-02 11卓の国別テーブルサイン — V9 photo + type bounded study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V9_PHOTO_TYPE_METHOD_TESTED_LOCAL / HAWAII_COMPARE_ONLY / LONG_COPY_STRESS_PASS / LOW_RES_ASSET_BLOCKS_PROMOTION / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Start main SHA: `9a23cf3f881016681fbb34a1072704c2e3495a29`.
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Why this test exists

V8 showed that destination-specific literal procedural illustration can add identity while still losing to retained production on hierarchy, negative space and sellable editorial finish. The next bounded method is therefore a stronger image-led editorial split: one non-variable destination hero image plus quiet native typography, with the table index and all semantic copy remaining editable.

This run did not promote a production candidate. It tested whether the image-led split itself is worth continuing before spending effort on all 11 destinations.

## Runtime transport constraint

The automation runtime could not use the external asset-upload transport reliably. A local image could not be POSTed to the Figma upload URL from the runtime network. The Plugin API route was therefore tested instead via `figma.base64Decode -> figma.createImage`.

A very small low-resolution study raster was intentionally used only to prove composition/role separation. Its low intrinsic resolution is a hard promotion blocker and must not be treated as print evidence.

Drive authority was read back live. No Drive asset was added because the connector available in this run could not accept the local sandbox file as a Drive file reference without a supported bridge.

## Figma study

New bounded section:

- `61:5 / STUDY / ADD-02 / V9 PHOTO-TYPE HARMONY / PRE-COMPARISON / LOW-RES ASSET / 2026-08-16`

New blank-frame study root:

- `61:6 / COMPARE_ONLY / V9 / HAWAII / PHOTO HERO + QUIET TYPE`
- root: `1000×1480`
- fixed image role: `61:7 / IMAGE / HAWAII HERO / NON-VARIABLE LOW-RES STUDY`
- image hash: `2e0a199453342b7bcedf6db06790820f60f0e42e`
- native semantic text count: `5`
- image fill count: `1`

Native roles remain separate from the raster:

- `TEXT / TABLE INDEX`
- `TEXT / DESTINATION EN`
- `TEXT / DESTINATION JP`
- `TEXT / COUNTRY NOTE`
- `TEXT / DATE`

The variable information roles are inside `TEXT / INFO STACK`, so note growth pushes the date structurally rather than using independent absolute coordinates.

## Visual QA

Pre-comparison screenshot review of V9 showed a useful editorial split: a single visual field carries destination atmosphere, while the lower paper field stays quiet and typography-led. The large native table index remains visible over the hero.

However, the deliberately tiny raster is visibly pixelated when scaled to the `1000×1480` role. Therefore the study cannot satisfy actual-size or print-quality gates.

After the V9 study and stress QA were complete, retained Hawaii production was opened for comparison. Result: V9's photo/type role split is directionally promising, but retained production remains the stronger sellable finished design because V9 lacks production-resolution imagery and final crop/detail control. Retained production was not edited or overwritten.

## Long-copy stress

Hidden clone:

- `61:16 / QA / LONG NOTE STRESS / V9 / HAWAII / HIDDEN`

Stress readback:

- root: `1000×1480`
- native text count: `5`
- image fill count: `1`
- visible text outside root: `0`
- info stack: `x70 / y915 / w860 / h405`, bottom `1320 / 1480`
- long note local bottom: `377`
- date local y/bottom after reflow: `393 / 419`

Result: `LONG_COPY_STRESS_PASS`.

## Method conclusion

Status: `TESTED_LOCAL`, not promoted.

What worked:

- image role and native text can be cleanly separated;
- a single hero image can provide destination specificity without turning the lower information area into a literal illustration;
- table index, destination, placeholder copy and date remain editable;
- long-copy reflow remains structurally safe.

What blocks promotion:

- the available study raster is far below production resolution;
- there is no verified Drive master in this run;
- actual-size image detail and print density therefore cannot pass;
- the visual study cannot be rolled out to all 11 destinations until one representative destination passes with a true high-resolution non-person hero master.

Next safe action:

1. obtain/generate one high-resolution, text-free Hawaii (or another representative destination) hero master through a runtime with working image-generation or asset transport;
2. save/read back that master in the exact ADD-02 Drive authority folder;
3. place it in the same replaceable image role without changing native semantic text;
4. repeat whole/reading/actual-size QA and long-copy stress;
5. only then compare against retained production and decide whether the method is worthy of expansion.

No production node was changed. Legacy remains preserved.