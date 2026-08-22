# Rurubu V8 Memory AD — design learning feedback

Date: 2026-08-22
Figma current: `2228:2`
Previous current: `2199:2` hidden rollback

## Problem observed

The left Memory essay and right Guide already had different layouts, but left furniture `01 / WATERFRONT` duplicated the right guide's numbered `01 朝`. That small label made the spread's semantic roles less distinct than the layout suggested.

## New professional input

The 2026 New York Times Magazine redesign discussion was used as a process reference: page furniture, captions, rules, typography and pacing are part of one integrated editorial system rather than independent decoration.

## Test

Changed only the left-page micro furniture to article-owned Japanese wording:

`海辺 / 朝の記憶`
`風の強さまで、覚えている。`

The right page keeps the functional `01–04` guide sequence.

## Before / after learning check

Previous Rurubu learning had already taught us to preserve functional binding rules and to differentiate adjacent page semantic jobs. The new professional input extended that judgment down to page furniture: a tiny number/label can still contradict the intended page role even when the main composition is correct.

## Result

`AD 2228:2` promoted after:

- 500px PASS
- 1000px reading-scale PASS
- 1587×1123 actual-size PASS
- native text `22`
- IMAGE `0`
- intersections `0`
- 18px safe risk `0`
- accidental one-character Japanese explicit-wrap candidates `0`

## Failure fingerprint

`F-RSL-210-PAGE-FURNITURE-DUPLICATES-ADJACENT-NAVIGATION-ROLE`

## Scope boundary

Exact copy, positions, chronology of dayparts, typography sizes and Memory/Guide structure remain Rurubu-specific. Other items may test the semantic-role question, not copy this layout.
