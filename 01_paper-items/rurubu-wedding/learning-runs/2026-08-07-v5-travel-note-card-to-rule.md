# V5 inside Travel Note — card-to-rule subtraction

Date: 2026-08-07
Item/version: Rurubu WEDDING V5
Live frame: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` (`77:290`)
Bounded semantic role: `77:330`–`77:332`

## Visible problem

The inside-left page ended with a `702 × 102` dark rounded `TRAVEL NOTE` card. The copy was useful, but the large navy container behaved like a dashboard/card footer and visually outweighed its editorial importance. The rest of the page had already moved toward direct type, rules, and quieter containment.

## Principle tested

Project-wide subtraction order: preserve content, native type, semantic roles, and rollback while replacing an unnecessary full card with a lighter editorial separator.

Hypothesis: a thin pink rule plus direct native type would keep the travel-note content legible while improving magazine rhythm and reducing Web-UI silhouette.

Expected gain:
- less full-width card weight at the bottom of the profile page
- clearer hierarchy between `3 QUESTIONS`, shared interests, and the closing note
- more print/editorial character without adding decoration

Possible regression:
- weaker contrast or a visually unfinished bottom edge
- reduced separation from the shared-interest module
- text collision or unsafe proximity to the bottom edge

Adoption evidence required:
- whole-spread screenshot
- page/reading screenshot
- actual-size/detail legibility
- native text and semantic node preservation
- fold and rollback preservation
- image-role hashes unchanged

## Live Figma change

Changed only:
- `77:330 / IA_TRAVEL_NOTE_BG`: `702 × 102`, navy rounded card → `702 × 4`, square pink rule
- `77:331 / IA_TRAVEL_NOTE_LABEL`: native text preserved; fill changed from yellow to pink
- `77:332 / IA_TRAVEL_NOTE`: native text preserved; fill changed from white to navy

No node deletion, copy rewrite, crop change, image replacement, hierarchy flattening, or unrelated geometry change.

## Three-scale QA

### Whole spread / thumbnail

PASS. The left page no longer ends in a heavy dark card. The closing note reads as a subordinate editorial footer while the profile and question hierarchy remain dominant. No new visual hole or cross-spread imbalance was introduced.

### Reading/page scale

PASS. Reading order remains:
`OUR PROFILE / ABOUT US → profiles → 3 QUESTIONS → shared interests → TRAVEL NOTE`.
The note stays clearly separated by the pink rule, while its body copy remains readable on the warm-cream page.

### Detail / actual-size

PASS for dummy-design QA. `TRAVEL NOTE` remains legible in pink; body copy remains legible in navy. No clipping or text reflow was observed. Bottom spacing remains plausible for the current dummy layout; final printer/template preflight remains a later independent gate.

## Structure QA

Post-change live audit:
- native text nodes in inside frame: `92`
- visible text nodes: `59`
- IMAGE-fill nodes: `9`
- `77:330`: preserved semantic node, now `702 × 4`, visible
- `77:331`: preserved native text node, visible
- `77:332`: preserved native text node, visible
- fold guide `77:540`: preserved and visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- history image `77:422` hash remains `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- no image role was marked complete or advanced by this change

## Result

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

The change is adopted because it removes unnecessary containment without sacrificing information, contrast, semantic structure, editability, or rollback safety.

## Failure / limitation

This does not resolve the dominant-photo provenance and quality blockers. The history photo and other intended Drive assets still require exact Drive-ID → node-ID → Figma-hash closure and screenshot QA before V5 can reach the dummy-photo design gate.

This result also does not establish a global rule that dark footer cards are always wrong. Full containment may remain appropriate when contrast or semantic grouping genuinely requires it.

## Next application

Return priority to unresolved dominant-photo evidence. If binary transport remains blocked, continue only bounded high-impact editorial repairs that do not falsely advance photo-role counts. Do not begin V6 production until the V5 dummy-photo gate is verified.
