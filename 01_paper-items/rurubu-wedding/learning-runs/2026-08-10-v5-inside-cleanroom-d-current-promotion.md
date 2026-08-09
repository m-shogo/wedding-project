# Rurubu V5 — clean-room inside D Current promotion

Date: 2026-08-10
Status: `CURRENT_INSIDE_PROMOTED / LONG_COPY_STRESS_PASS / STRUCTURE_READBACK_PASS / PHOTO_HASHES_PRESERVED / COVER_HERO_STILL_BLOCKED`
Scope: Rurubu WEDDING V5 inside spread only

## Why this promotion happened

The live Current inside spread remained too polite and template-like relative to the requested Japanese travel-magazine direction. The clean-room candidate `596:2 / V5_INSIDE_RURUBU_CLEANROOM_D_PHOTOLED_2026_08_10` was materially different and won the comparison because it improved hierarchy through photography, scale contrast, overlap, and editorial rhythm rather than adding more cards.

The candidate was not promoted on appearance alone. Before Current mutation it was tested with an explicit 130–150% Japanese-copy stress proof and corrected where that proof exposed collisions.

## Long-copy stress proof

Proof frame:
- `601:2 / V5_INSIDE_RURUBU_CLEANROOM_D_LONGCOPY_STRESS_2026_08_10`

The proof expanded:
- Q1 A/B
- Q2 A/B
- Q3 A/B
- Travel Note
- Memory Spot 01 body
- Memory Spot 02 body
- Memory Spot 03/current V5-09 body

### First result

The first stress screenshot exposed real layout weaknesses:
- Q1 A/B and Q2/Q3 answer spacing was insufficient
- the right-side support copy column was too narrow for longer Memory Spot copy

These were treated as failed evidence, not ignored.

### Corrections

Q&A:
- Q1 answers were given independent vertical space
- Q2 and Q3 were widened to roughly 260px columns
- Q2/Q3 answer baselines were separated enough for 130–150% copy
- shared-interest labels and Travel Note were moved down as a controlled lower-page close

Memory supports:
- support body copy widened to roughly 130px
- support title position was separated from the numbered circle
- the support separator was moved to preserve readable breathing room

### Verified stress result

The final `601:2` whole-spread screenshot showed:
- no Q1 answer collision
- no Q2/Q3 answer collision
- no Travel Note collision
- no Memory Spot body collision
- numbered support circles no longer collide with titles
- fold remains clear

This converts long-copy resilience from an unverified assumption into direct screenshot evidence for this candidate.

## Current promotion method

Current inside frame remained the same semantic frame:
- `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

A rollback snapshot was created first:
- `606:2 / V5_INSIDE_PRE_CLEANROOM_D_PROMOTION_ROLLBACK_2026_08_10`

Legacy rollback remains:
- `59:178`

The promotion copied the verified candidate geometry and visibility into the existing Current semantic nodes instead of replacing the Current frame. This preserved the established node IDs used by provenance/asset evidence.

Candidate-only editorial overlays were added only where they had a concrete visual job:
- `606:262 / CRC_QA_BANNER`
- `606:263–268 / CRC_COMMON_*`
- `606:269 / CRD_PROFILE_CROP_BAR`
- `606:270 / CRC_HISTORY_YELLOW_RULE`
- `606:271 / CRC_MEMORY_PINK_RULE`
- `606:272 / CRC_MEMORY_BLUE_RULE`
- `606:273 / CRD_MEMORY_CROP_BAR`

Old UI-like containment was hidden rather than deleted, preserving rollback/editability:
- `77:307 / IA_QA_PANEL`
- `77:310 / AUTH_QA_HERO_PANEL`
- `77:311 / IA_QA_1_NO_BG`
- `77:318 / IA_QA_2_NO_BG`
- `77:325 / IA_QA_3_NO_BG`
- `85:18 / V5_QA_HERO_LEFT_RULE`
- `102:22 / V5_QA_02_RULE`
- `102:23 / V5_QA_03_RULE`
- legacy common-pill text `77:357`, `77:359`, `77:361`

## Promoted Current visual result

### Profile / opening page

- groom atmosphere photo is now approximately `286 × 300` and acts as the clear primary visual
- bride atmosphere photo is approximately `194 × 194` and overlaps the upper profile zone as a secondary image
- mirrored two-card profile behavior is removed
- Q&A becomes one editorial reading section rather than a set of cards
- shared interests and Travel Note form a quiet lower-page close

### History / Memory Spots page

- existing large history lead remains the calm primary visual
- Memory Spot 01 is enlarged to approximately `430 × 246`
- support photos are approximately `114 × 114`
- support body widths are increased for longer Japanese copy
- pink / blue / aqua rules create scan order without adding containers

## Structure readback after Current promotion

Current inside:
- frame `77:290`
- native text nodes: `95`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide: `77:540`

Verified semantic photo IDs and hashes were preserved:
- `77:296 / IA_PROFILE_A_PHOTO` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
- `77:302 / IA_PROFILE_B_PHOTO` → `2359f635b4926a83e22ca1f9214e75c709291152`
- `77:422 / IA_HISTORY_MEMORY_PHOTO` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- `77:430 / IA_MEMORY_1_PHOTO` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- `77:438 / IA_MEMORY_2_PHOTO` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
- `77:454 / IA_MEMORY_4_PHOTO` → `c09aa82e7b2ac75708707345c6f845452bf67663`

New promoted geometry readback:
- `77:296` → x42 y122 / 286 × 300
- `77:302` → x286 y92 / 194 × 194
- `77:422` → 678 × 280
- `77:430` → x64 y650 / 430 × 246
- `77:438` → x520 y650 / 114 × 114
- `77:454` → x520 y792 / 114 × 114

Both rollback states exist after promotion:
- legacy `59:178`
- pre-promotion `606:2`

## Asset / ledger effect

No photo master or derivative changed. No Drive ID changed. No semantic photo node ID changed. No Figma image hash changed for the verified active inside roles.

Therefore this is an editorial-layout promotion, not a photo-role lifecycle transition. The V5 asset denominator and photo completion counts must not be incremented from this change.

The active V5 photo gate remains:
- `PHOTO_ROLE_PASS 9/10`
- dominant-photo gate `2/3`

The remaining active photo blocker remains the outer cover hero.

## Learning state

### VERIFIED for this item

1. The requested Rurubu-like gain was larger when photo scale and editorial overlap changed than when micro-decoration was polished.
2. A clean-room candidate can safely win over legacy when Current semantic IDs and rollback are preserved during promotion.
3. Long-copy stress must happen before promotion; it exposed defects that short dummy copy hid.
4. UI containment could be removed while retaining clear reading order through type, photo scale, and editorial rules.

### REJECTED / lesson

An earlier cover experiment `597:2` was rejected and removed after reparenting overlay nodes caused frame-coordinate distortion. Rebuild-from-clean-source was safer than repairing the corrupted duplicate.

### Not PROJECT_RULE yet

These findings are verified for this Rurubu V5 item. They remain below project-wide rule status until repeated evidence supports promotion through the project learning process.

## Remaining V5 blocker / next design target

The inside spread has materially advanced and is now Current. V5 is still not complete because the cover hero remains the rejected low-quality hash.

Next safe priority:
1. keep `598:2` as the stronger outer clean-room cover silhouette candidate
2. do not promote its cover until a quality-passing hero reaches the target node
3. do not retry the already repeated `mcp.figma.com` DNS-blocked binary upload route
4. continue non-blocked outer editorial structure work only when it meaningfully improves the eventual high-resolution hero composition
5. keep V6 production gate closed until V5 dummy-photo/design QA is genuinely verified
