# RSL-265 — Truth-gated Q&A retains salience from now-missing answers

Date: 2026-08-24
Source: Rurubu WEDDING / V7 Profile+Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-265-TRUTH-GATED-QA-RETAINS-SALIENCE-FROM-NOW-MISSING-ANSWERS`

## Observed

V7 K2 had correctly replaced unresolved personal answers with `回答待ち`, but the Q&A design still privileged Q1 and Q4 using giant `01 / 04` numerals and answer blocks. That hierarchy originally depended on an older content state. Once all six answers became unresolved, the visual emphasis no longer had a current editorial referent.

## Root-cause hypothesis

Truth-gating content can leave behind layout decisions that were justified by the previous content state. If visual hierarchy is not re-audited after the truth/state change, stale emphasis can survive as decorative authority.

## Test

K3 `2491:2` removed the giant Q1/Q4 ordinals and their uniquely visible answer placeholders, rewrote the page title from a completed-interview claim to a question-state title, and retained only modest typographic emphasis on Q1/Q4 as opening and midpoint pacing beats.

No answer was invented and no six-equal-card/dashboard layout was introduced.

## Result

- 500px: PASS
- 1400px: PASS after shortening the first too-long title candidate
- 1587×1123: DESIGN QA PASS
- native visible text 26
- IMAGE fills 5
- text-text intersections 0
- 18px edge risks 0
- K3 promoted current; K2 hidden rollback

## Principle

After a content truth/state change, re-audit the hierarchy that was justified by the previous state. Typography, numerical emphasis, photo weight and module prominence should express the current editorial facts—not the history of how the layout evolved.

This is not a rule to flatten all hierarchy or make all questions equal. Asymmetry remains valid when it has a reader-facing editorial job such as opening, transition, contrast, answer salience, sequence or navigation.

## Do not transfer

Do not transfer V7's exact Q1/Q4 scale, coordinates, coral/navy treatment, question grouping or typography as a project rule.

## Evidence

`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-K3-UNANSWERED-QA-HIERARCHY-QA-2026-08-24.md`

## Related failure learning

- RSL-251 — numbers require a reader-facing referent.
- RSL-254 — personal claims require source authority.
- RSL-258 — cloned-frame text edits require semantic targeting/readback.

## Transport note

The newly exposed official Figma `upload_assets` route was tested once because it was a material capability change relative to the earlier binary path. POST still failed with `Could not resolve host: mcp.figma.com`; C12 remained unchanged. Under RSL-005 the same route should not be retried again until the environment materially changes.
