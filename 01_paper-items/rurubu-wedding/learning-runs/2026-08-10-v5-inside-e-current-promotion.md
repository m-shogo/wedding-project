# Rurubu V5 — inside clean-room E Current promotion

Date: 2026-08-10
Status: `VERIFIED / CURRENT_INSIDE_PROMOTED / OUTER_GATE_STILL_OPEN`
Scope: Rurubu WEDDING only

## Authority and safety

Live Figma remained the highest authority. Project-wide production, asset-generation, continuous-learning, project-memory, quality-over-legacy, Current Status, and current Rurubu learning evidence were re-read before the design work. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

Current outer was not modified. V6 production remains closed.

## Why promotion was justified

The previous Current inside remained visually too English-template-led for the requested Japanese travel-magazine direction. Clean-room E (`615:2`) materially improved the same verified semantic content by making Japanese headings primary, increasing unequal profile-photo scale and overlap, and preserving the successful one-lead/two-support memory hierarchy.

The candidate passed:
- whole-spread screenshot QA
- left-page reading QA
- right-page reading QA
- native/editable structure inspection
- exact image-hash parity with Current
- separate 140% Japanese long-copy stress proof `617:2`

The candidate therefore won the current-vs-clean-room comparison for the inside spread. The promotion changed the existing Current semantic nodes rather than replacing the Current frame with a raster or unrelated duplicate.

## Rollback before promotion

Fresh pre-promotion rollback snapshot:
- `618:2 / V5_INSIDE_PRE_CLEANROOM_E_PROMOTION_ROLLBACK_2026_08_10`

Original historical rollback frames remain preserved as well.

## Promoted Current

Current frame remains:
- `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

Key native headings now read:
- `77:293 / IA_LEFT_KICKER` → `ふたりのプロフィール`, 34 px
- `77:308 / IA_QA_HEADING` → `ふたりに3つの質問`, 25 px
- `77:401 / IA_HISTORY_HEADING` → `ふたりの旅年表`, 34 px
- `77:427 / IA_MEMORY_HEADING` → `思い出スポット`, 28 px

English remains secondary/contextual rather than carrying the primary editorial hierarchy.

The groom/bride and memory-photo geometry from clean-room E was also promoted into the existing semantic nodes. No final factual content was baked into images and no semantic node IDs were discarded.

## Post-promotion screenshot QA

Whole spread:
- PASS
- Japanese section scanning is immediate
- profile page reads as photo-led editorial rather than a dashboard or equal-card layout
- right page retains history → dominant history photograph → Memory Spots reading order

Left page:
- PASS
- enlarged groom image and overlapping bride crop create intentional unequal scale without obscuring the profile identities
- Q&A remains one editorial section with Q1 lead and Q2/Q3 supports
- common-interest row and Travel Note remain readable and subordinate

Right page:
- PASS
- Japanese `ふたりの旅年表` and `思い出スポット` strengthen travel-magazine authenticity
- lead Memory Spot remains dominant; two support spots remain distinct
- no visible clipping or collision after promotion

## Post-promotion structure and provenance readback

Current `77:290`:
- native text nodes: `95`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- visible IMAGE-fill nodes: `6`
- fold guide `77:540`: visible, 2 px

Verified active inside image hashes are unchanged:
- `77:296 / IA_PROFILE_A_PHOTO` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
- `77:302 / IA_PROFILE_B_PHOTO` → `2359f635b4926a83e22ca1f9214e75c709291152`
- `77:422 / IA_HISTORY_MEMORY_PHOTO` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- `77:430 / IA_MEMORY_1_PHOTO` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- `77:438 / IA_MEMORY_2_PHOTO` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
- `77:454 / IA_MEMORY_4_PHOTO` → `c09aa82e7b2ac75708707345c6f845452bf67663`

This verifies that the promotion changed layout/typography hierarchy while preserving the verified image provenance and exact semantic photo roles.

## Learning result

`PROTOTYPED → VERIFIED / V5 CURRENT INSIDE ADOPTED`

Visible problem:
- English-first template hierarchy weakened authenticity even after photo scale had improved.

Tested principle:
- Japanese-first section hierarchy + stronger unequal photo scale can make the same semantic content read more like a Japanese travel-information magazine without adding UI containers.

Expected improvement:
- faster Japanese scanning, stronger magazine identity, less AI/template feel.

Regression tested:
- long-copy resilience, clipping, image hashes, fold guide, native text, rollback.

Result:
- adopted for Current inside.

This remains a Rurubu-specific verified result; it is not automatically promoted to a project-wide rule.

## V5 gate after promotion

Inside design has advanced, but V5 is **not complete**.

The formal active photo gate remains:
- `PHOTO_ROLE_PASS 9/10`
- `ROLE_COMPLETE 9/10`
- dominant photo `2/3`

Remaining visible/dominant blocker:
- `V5-01 / 77:148 / IMG_HERO`
- Current low-quality hash remains `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Clean-room outer H (`613:2`) is the strongest outer editorial comparator from this run, but its temporary layout-comparison hero is not the real V5-01 cover asset and is not counted as role completion.

## Next safe work

1. Continue outer H comparison/refinement only where it materially improves authentic magazine composition.
2. Close the actual V5-01 cover hero through a genuinely binary-safe quality-preserving image path; do not reuse a wrong semantic image merely to satisfy the count.
3. After the real hero is placed, run whole/page/detail QA comparing Current outer and H.
4. Only after dominant 3/3 and final typography/fold/structure/provenance reconciliation should V5 dummy-design QA be declared complete and V6 production begin.