# RSL-066 — Minor chronology anchors without re-equalizing the timeline

Date: 2026-08-17
Source scope: Rurubu WEDDING / V6 chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The CJ chronology correctly made Event 1 / 3 / 5 stronger than Event 2 / 4, but Event 2 / 4 became so visually quiet that the center-left field could read as unused page space rather than deliberate editorial rhythm.

## ROOT_CAUSE_HYPOTHESIS

Major/minor hierarchy does not require minor events to lose all ordinal cues. A small native number anchor plus a moderately stronger native title can make a minor beat intentional while keeping it clearly subordinate to the photo-led major beats.

## TESTED_LOCAL

Rollback-safe CM candidate from CJ:

- re-enabled existing Event 2 / 4 native number nodes at `14px`;
- removed their small decorative rule bars to avoid duplicate navigation cues;
- raised Event 2 / 4 title scale from `17px` to `22px`;
- kept date/copy restrained;
- enlarged the existing Event 3 replaceable photo from `285×210` to `310×230`, still below its `352×368` intrinsic source;
- retained Event 1 / 3 / 5 as the photographic major beats and Event 6 as the terminal WEDDING beat;
- added no cards, shadows, gradients, generated assets or new image hashes.

## Expected improvement

Make minor events read as authored parts of the route instead of missing content, while preserving strong unequal editorial hierarchy.

## Regression risk

- reverting to six equal timeline modules;
- visual noise from too many ordinal markers;
- collision after strengthening minor titles;
- using stronger hierarchy as justification to invent event facts.

## Evidence

- whole spread ~1200px: PASS;
- chronology actual-size `794×1123`: PASS;
- native text `30`;
- text collision `0`;
- 18px text safe-area risk `0`;
- image intrinsic violation `0`;
- image hashes changed `0`;
- intentional top-hero bleed remains the only page-bound overflow.

Figma:

- CM preferred `1559:2`;
- chronology page `1559:27`;
- CJ `1554:97` preserved as hidden rollback.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CN-CM-PROFILE-CAPTIONS-CHRONOLOGY-QA-2026-08-17.md`.

## What must remain Rurubu-specific

Do NOT transfer literal event numbering, chronology layout, colors, photo positions, WEDDING terminal treatment, or event copy to another wedding item.

## Cross-item applicability hypothesis

For repeated chronological or ordered information, small native ordinal metadata may clarify minor beats without requiring equal cards, if the receiving item independently verifies that the major/minor hierarchy remains obvious at thumbnail, reading and actual size.

## Next receiving-item experiment

Only when a different wedding item has an ordered sequence that looks visually incomplete after removing equal cards, test a small ordinal cue on a rollback-safe duplicate. Do not treat this as a project-wide visual rule until independently reproduced.