# Rurubu V5 — inside clean-room E 140% Japanese long-copy stress

Date: 2026-08-10
Status: `PROTOTYPED / LONGCOPY_STRESS_PASS / CURRENT_UNCHANGED`
Scope: Rurubu WEDDING only

## Target

Base candidate:
- `615:2 / V5_INSIDE_RURUBU_CLEANROOM_E_JP_EDITORIAL_2026_08_10`

Stress proof:
- `617:2 / V5_INSIDE_CLEANROOM_E_LONGCOPY_140_STRESS_2026_08_10`
- left `617:3`
- right `617:125`

Current remained untouched:
- `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

## Hypothesis

The Japanese-first clean-room E direction is only a serious Current candidate if its denser magazine hierarchy can absorb realistic 130–150% Japanese copy without clipping, collisions, or collapse back into UI cards.

## Test

Longened native Japanese text in the duplicate only:
- Q1 A/B
- Q2 A/B
- Q3 A/B
- lead Memory Spot body
- support Memory Spot 02 body
- visible support Memory Spot 03 body
- Travel Note

All edited stress text used native Figma text with `textAutoResize=HEIGHT`. No photo, crop, image hash, Current node, or rollback frame was changed.

## Screenshot QA result

Whole spread:
- PASS for stress-proof purpose
- Q&A remains readable as one editorial section
- right-page lead/support hierarchy remains intact
- no new card/container was required

Left page / reading scale:
- expanded Q1 copy wraps naturally without colliding with Q2/Q3
- Q2/Q3 remain separated into two columns
- shared-interest row remains below Q&A
- Travel Note remains inside the page and visually subordinate

Right page / reading scale:
- lead Memory Spot body grows to two lines without breaking the lead-photo hierarchy
- support bodies become noticeably denser but remain within their intended side column
- no visible overlap with the support photos or number/title labels

Detail:
- no visible clipping or overset was observed in the screenshot
- Japanese punctuation/line breaks remain plausible for dummy-design stress
- this is a layout-resilience proof, not final real-content editorial QA

## Decision

`PROTOTYPED → LONGCOPY_STRESS_PASS`

This removes the previously stated long-copy blocker for clean-room E. It does **not** by itself promote `615:2` to Current. A final direct Current-vs-E comparison, fold/safe-area detail review, and ledger/status reconciliation are still required before promotion.

## Reusable lesson state

- Japanese-first hierarchy can survive substantially longer copy without reverting to equal cards or shrinking everything.
- text resilience should be proved on a duplicate with realistic native copy before a visually stronger editorial frame becomes Current.
- remains Rurubu-specific `VERIFIED_FOR_CANDIDATE`, not a new project-wide rule.

## Next

1. Directly compare `615:2` against Current `77:290` at whole-spread and actual-size detail scales.
2. If E still wins, preserve a pre-promotion rollback snapshot and reconcile the Current pointer/evidence deliberately.
3. Keep outer promotion blocked until the real V5-01 cover hero role is genuinely closed.