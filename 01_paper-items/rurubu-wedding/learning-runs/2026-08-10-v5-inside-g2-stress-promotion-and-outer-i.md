# V5 inside G2 stress-safe promotion + outer I clean-room comparison

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Starting GitHub main observed before this write: `521392de743631493eefc54f9dc6e5a387749bdd`
Production Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authorities re-read

This run re-read the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Rurubu status, and live Figma state before writes. The run preserved the V5/V6 gate and did not touch Passport, Boarding Pass, 青春ふたりきっぷ, or ADD items.

## Experiment A — inside G long-copy stress

### Visible problem

`631:274 / V5_INSIDE_RURUBU_CLEANROOM_G_PRINT_EDITORIAL_2026_08_10` was visually stronger than Current at whole and page scale, but had not proved that the denser magazine composition could survive realistic Japanese copy expansion.

### Hypothesis

The cleaner rectangular-photo hierarchy and asymmetric Memory composition should be retained, but text resilience must be solved through width, leading, and spacing rather than reintroducing UI cards.

### First stress result — rejected as incomplete

Created `633:2 / V5_INSIDE_RURUBU_CLEANROOM_G_STRESS140_2026_08_10` with approximately 140% Japanese copy in Q&A, common-points, Travel Note, and Memory bodies.

Fresh programmatic audit found real collisions:

- Q1 A/B: 2 px vertical collision
- Q2 A/B: 11 px collision
- Q3 A/B: 11 px collision
- Memory 02 body collided with Memory 03/visible 03 title area
- Memory 02 body also touched the next destination micro-label

Status: `PROTOTYPED / REJECTED_FOR_PROMOTION`.

### G2 repair

Created `634:2 / V5_INSIDE_RURUBU_CLEANROOM_G2_STRESS_RESILIENT_2026_08_10` from G without modifying Current.

Changes were editorial-flow changes only:

- separated title/subtitle baselines instead of adding containers
- Q2/Q3 body width increased to `276 px`
- Q2/Q3 body size reduced to `12 px` with `17.4 px` leading
- A/B blocks re-spaced vertically
- common-points copy moved down and given wider text flow
- Travel Note rule/copy moved down while remaining inside the page
- Memory 02/03 support copy widened to `116 px`, set to `11 px / 16 px`, and re-spaced
- no new cards, badges, shadows, or gradients

### G2 stress verification

Created `634:274 / V5_INSIDE_RURUBU_CLEANROOM_G2_STRESS140_2026_08_10` with the same expanded copy.

A final 2 px Q1 A/B touch was detected, then resolved by moving Q1 B to `y=724` in both G2 and its stress proof.

Final programmatic stress audit:

- visible native text: `54`
- visible IMAGE fills: `6`
- text overlaps: `0`
- fold guide: `634:545`, visible, `2 × 1122.5`

All six image hashes remained unchanged from verified V5 provenance:

- groom: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride: `2359f635b4926a83e22ca1f9214e75c709291152`
- history: `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory lead: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory support 02: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- visible memory 03 / V5-09: `c09aa82e7b2ac75708707345c6f845452bf67663`

Natural-size left and right page screenshots were reviewed after the repair. G2 kept the stronger photo-led hierarchy and no longer needed the visible `旅 / 写真 / HAWAII` pill row used by the prior Current.

## G2 Current promotion

Before promotion, live Current `77:290` was re-read. It still used the more UI-like circular bride profile, rounded/crop-bar treatment, and visible shared-interest pills.

A first promotion script correctly aborted before mutation because the intentional root candidate name differed. The script was revised to ignore only the root name while requiring all descendant type/name/order signatures to match exactly.

Rollback clone created:

- `635:2 / V5_INSIDE_PRE_G2_PROMOTION_ROLLBACK_2026_08_10`

G2 visual properties were then copied into the existing Current hierarchy so the established semantic IDs were preserved rather than replacing the Current frame.

Post-promotion Current remains:

- `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

Post-promotion structural readback:

- visible native text: `54`
- visible IMAGE fills: `6`
- text overlaps: `0`
- fold guide `77:540`: visible, `2 × 1122.5`
- rollback `635:2`: present

Current semantic image IDs and verified hashes after promotion:

- `77:296 / IA_PROFILE_A_PHOTO` — `330 × 344` — `a39dd297eb9de572317a5ce57f0af12e8597b156`
- `77:302 / IA_PROFILE_B_PHOTO` — `246 × 246` — `2359f635b4926a83e22ca1f9214e75c709291152`
- `77:422 / IA_HISTORY_MEMORY_PHOTO` — `694 × 302` — `539c259be8036b481d06b4f76db9a39b407d90e8`
- `77:430 / IA_MEMORY_1_PHOTO` — `458 × 262` — `adbb8e529451a81dd25e4eb29bf068655569ce25`
- `77:438 / IA_MEMORY_2_PHOTO` — `142 × 136` — `439a719d73f28e8dd2889f2026cccb15f345ec63`
- `77:454 / IA_MEMORY_4_PHOTO` — `154 × 126` — `c09aa82e7b2ac75708707345c6f845452bf67663`

Status: `PROTOTYPED → VERIFIED / ADOPTED_FOR_CURRENT_V5_INSIDE`.

## Experiment B — outer clean-room I

### Visible problem

`613:2 / V5_OUTER_RURUBU_CLEANROOM_H_MAX_EDITORIAL_2026_08_10` had stronger photo asymmetry than the legacy outer, but its front headline still read more like a generic wedding publication than a Japanese destination-information magazine.

### Hypothesis

A destination-first Japanese cover hierarchy should create a stronger travel-magazine silhouette without copying an existing published Rurubu cover.

### Prototype

Created:

- `632:2 / V5_OUTER_RURUBU_CLEANROOM_I_JP_TRAVEL_MAG_2026_08_10`
- front child `632:129 / FRONT_COVER_CLEANROOM_I_JP_TRAVEL_MAG`

Key changes:

- destination line: `YOKOHAMA / ふたりで巡る保存版`
- kicker: `＼ 横浜で叶える ふたりの旅支度 ／`
- dominant headline: `横浜 / ふたり旅。` at `72 px`
- stronger Japanese subheads for spots/history/guest guide
- support photographs resized and rotated at unequal scales rather than as a uniform gallery
- feature navigation staggered asymmetrically

Whole-outer and natural-size front screenshots show a materially stronger Japanese travel-magazine silhouette than H.

### Adoption limit

Outer I is **not Current** and is not a cover-photo pass. It still uses a comparison image whose role/provenance is not the verified V5 cover-hero source. The only remaining active photo blocker therefore remains `V5-01 / 77:148`.

Status: `PROTOTYPED / VISUALLY_STRONGER_COMPARATOR / NOT_PROMOTED`.

## Reusable lesson candidates

1. **A clean-room design must survive realistic Japanese copy expansion before promotion.** Normal-copy screenshots can hide geometry that will fail once copy approaches final editorial length.
2. **Stress resilience should first be solved through line measure, leading, spacing, and hierarchy, not by restoring cards.** G2 passed 140% copy after width/leading changes with no new containers.
3. **Preserving semantic IDs during a winning clean-room promotion is compatible with a major visual redesign when source and destination structures match and a rollback clone is created first.**
4. **Destination-first Japanese hierarchy produces a stronger travel-guide silhouette than generic wedding-copy hierarchy, but imagery provenance remains an independent gate.**

These remain lesson candidates until repeated evidence justifies project-rule promotion.

## Gate state after this run

V5 is **not complete**.

- active PHOTO_ROLE_PASS: `9 / 10`
- dominant-photo pass: `2 / 3`
- remaining blocker: cover hero `V5-01 / 77:148`
- V6 production remains closed

No image generation was counted as progress in this run because the unresolved cover problem is a binary-safe placement/provenance problem, not absence of an available source candidate.
