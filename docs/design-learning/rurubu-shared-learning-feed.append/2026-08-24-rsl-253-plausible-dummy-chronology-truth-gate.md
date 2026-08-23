# RSL-253 — Plausible dummy chronology must not masquerade as verified relationship history

Date: 2026-08-24
State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-253-PLAUSIBLE-DUMMY-CHRONOLOGY-MASQUERADES-AS-VERIFIED-RELATIONSHIP-HISTORY`

## Source problem

Two materially different Rurubu WEDDING systems — V7 Story F2 and V8 Story AL2 — displayed the same plausible chronology (`2019 / 2021 / 2024 / 2026`) even though the current content authority says six real history milestones are still missing.

The project already had a canonical layout-only dummy history using `201x / 202x` plus the verified `2026.02.11` and `2026.10.24` dates. The plausible exact years therefore created unnecessary factual authority.

## Root-cause hypothesis

Editorial polish can convert an internal placeholder into an apparent fact. When a chronology looks finished, readers and later production workers are less likely to notice that the dates/details were never verified.

## Test

- V7 F3 `2387:2`: preserve high-energy travel-magazine composition but replace the four plausible event facts with the canonical six-milestone dummy contract.
- V8 AL3 `2388:2`: independently preserve the restrained book/editorial composition while using the same truth-safe six-milestone content contract.
- Keep all date/event copy native Figma text and visibly use `201x / 202x` where years are unknown.
- Preserve F2 `2351:2` and AL2 `2332:2` as hidden rollback.

## Evidence

Both systems passed 500 / 1400 / `1587×1123` design QA.

- F3: native text `22`, IMAGE `4`, intersections `0`, bounded edge risks `0`, Japanese font mismatch `0`.
- AL3: native text `23`, IMAGE `0`, intersections `0`, bounded edge risks `0`, Japanese font mismatch `0`.
- current V7/V8 root overlap after promotion: `0`.

## Decision principle

When project authority explicitly says factual dates/biographical details are unresolved, do not use plausible invented specifics merely because they make the mockup look finished. Use an explicit dummy/TBD contract, keep variable facts editable, and rerun visual/overflow QA when real content arrives.

This is not a final-design recipe and does not require `201x / 202x` in released work. It is a truth gate for pre-content editorial studies.

## Cross-scope boundary

Potentially useful for any artifact containing dates, names, locations, route facts, prices or biographical milestones, but cross-item promotion still requires independent verification outside Rurubu WEDDING. No non-Rurubu production files were inspected or modified for this test.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-V8-STORY-SIX-MILESTONE-CONTENT-TRUTH-GATE-QA-2026-08-24.md`.
