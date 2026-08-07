# Rurubu V5 — MEMORY SPOTS bar subtraction

Date: 2026-08-07
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Visible problem

On the inside-right `MEMORY SPOTS / MINI MAP` section, `77:470 / MEMORY_CARD_BAR_1` was a `430 × 12` saturated pink field directly above the lead memory photograph. At whole-spread scale it read more like a UI progress/section bar than an editorial separator, adding visual weight next to an already strong heading, large photograph, numbered marker, and adjacent route lines.

## Source / principle tested

Source authority:
- live Figma Current `77:290`
- whole-spread screenshot QA
- project-wide quality-over-legacy and subtraction-first rules

Hypothesis:
- reducing the thick bar to a thin editorial rule would preserve grouping and the pink section accent while reducing interface-like containment and returning attention to the photograph and heading.

Expected improvement:
- quieter transition from heading to photograph
- less Web-UI/card language
- stronger editorial rhythm

Possible regression:
- the lead memory module could lose separation from the heading
- the thin rule could become visually too weak at print size

Evidence required:
- rollback-safe duplicate
- whole-item comparison
- reading/page comparison
- actual-size/detail screenshot inspection
- no text, crop, image hash, semantic node, fold-guide, or rollback regression

## Experiment

Created safe duplicate:
- `349:2 / V5_INSIDE_MEMORY_BAR_SUBTRACTION_TEST_2026_08_07`

Changed only duplicate node:
- `349:188 / MEMORY_CARD_BAR_1`
- `430 × 12 → 430 × 3`
- same x/y, same pink fill, same section geometry

No text edits, image replacement, crop changes, node deletion, or unrelated movement.

## Three-scale result

The duplicate won comparison.

Whole-item:
- MEMORY SPOTS remains clearly distinct, but the lead image no longer sits under a heavy CTA-like band.

Reading/page:
- heading → subtitle → rule → lead image → number/title/body remains obvious.
- adjacent blue/green micro-rules and route markers no longer compete with an oversized pink field.

Actual-size/detail:
- the 3 px line remains visible at the live Figma scale and retains the section color cue.
- no clipping, collision, or text reflow was introduced.

## Current adoption

Applied the winning geometry to Current:
- `77:470 / MEMORY_CARD_BAR_1`
- before: `430 × 12`
- after: `430 × 3`

Preserved:
- comparison frame `349:2`
- Current inside frame `77:290`
- V4 rollback frames `59:2` and `59:178`
- all native text and semantic image nodes
- dominant image hashes and crop states

No asset lifecycle state changed. `PHOTO_ROLE_PASS` remains unchanged and the dominant-photo gate is still open.

## Reusable lesson

A strong heading plus dominant photograph often needs only a thin editorial separator; a thick saturated bar can add interface-like mass without adding information. This remains a tested V5-specific lesson, not a project-wide rule.

## Next application

Return priority to dominant-photo provenance and quality closure. Continue bounded subtraction only where decoration duplicates hierarchy or acts like UI chrome.
