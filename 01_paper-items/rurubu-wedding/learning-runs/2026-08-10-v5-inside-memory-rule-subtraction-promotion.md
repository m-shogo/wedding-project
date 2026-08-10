# V5 inside Current — Memory Spots rule subtraction promotion

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / PROMOTED_TO_CURRENT / ROLLBACK_PRESERVED`

## Authority and live-state refresh

Immediately before the experiment and again before Current promotion, live Current inside `77:290`, latest Figma state, and latest GitHub main were re-read. Only Rurubu WEDDING was changed.

## Visible problem

After the G2 clean-room promotion and the print-folio repair, the right-page `思い出スポット` area still used two thick `8 px` pink/blue horizontal fields. At whole/page scale they read more like progress/tab bars than print-editorial rules and competed with the dominant lead photograph.

## Principle tested

Preserve useful color coding while reducing field mass:

`8 px color field → 3 px editorial rule`

Expected improvement:
- less interface-like geometry
- stronger photo authority
- retain pink/blue editorial identity and left/right grouping

Regression risk:
- the Memory Spots heading could lose enough anchoring that the section feels disconnected
- thin rules might become too weak at actual size

## Clean-room comparison

Created:
- `673:2 / V5_INSIDE_RURUBU_CLEANROOM_I_MEMORY_RULE_SUBTRACTION_2026_08_10`
- right page `673:125`

Duplicate-only changes:
- pink `CRC_MEMORY_PINK_RULE`: `380 × 8` → `380 × 3`, y `626 → 629`
- blue `CRC_MEMORY_BLUE_RULE`: `278 × 8` → `278 × 3`, y `626 → 629`
- no text, image, crop, timeline, Memory Spot geometry, footer, fold, or content change

Whole-spread and right-page actual-size screenshots showed the 3 px treatment remaining visible while reducing the tab/progress-bar silhouette. The candidate remained overlap-free and preserved the fold.

## Promotion and rollback

Before Current mutation, live Current was re-read and confirmed to still contain the `8 px` rules and the previously promoted 3 px print folio.

Pre-promotion Current was preserved as:
- `674:2 / V5_INSIDE_PRE_I_MEMORY_RULE_PROMOTION_ROLLBACK_2026_08_10`

Promoted only the existing Current rule nodes:
- `606:271 / CRC_MEMORY_PINK_RULE` → `380 × 3`, y=629
- `606:272 / CRC_MEMORY_BLUE_RULE` → `278 × 3`, y=629

Current frame remained `77:290`; semantic image/text structure was untouched.

## Post-promotion QA

Fresh whole-spread screenshot passed.

Structure readback:
- visible native text: `54`
- same-parent text overlaps: `0`
- fold `77:540`: visible `2 × 1122.5`
- footer remains the verified print-folio treatment (`77:486` 3 px / `77:487` 8 px native microtype)
- rollback `674:2` exists

Protected image hashes unchanged:
- groom `77:296` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302` → `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- lead memory `77:430` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
- visible memory 03 `77:454` → `c09aa82e7b2ac75708707345c6f845452bf67663`

## State distinction

- generated: none
- duplicate experiment placed: yes
- duplicate visually verified: yes
- promoted to Current: yes, two rule nodes only
- post-promotion visually verified: yes
- image provenance/hash changed: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V5 complete: no
- V6: remains closed

## Learning result

Color bars can carry real editorial identity without needing UI-scale thickness. When a heading already establishes the section and the photography supplies hierarchy, reduce decorative field mass before adding or redesigning modules. Thin rules can preserve color coding while returning authority to the photographs.
