# 2026-08-11 — Rurubu V5 BF/BG clean-room feedback append

This is an append-only companion entry for `docs/wedding-design-learning-feedback-log.md`. The monolithic authority is intentionally not replaced from a truncated connector readback; this entry preserves the complete new feedback without risking prior history.

## Visible problems
- BD outer was still a large photo followed by a tidy feature index.
- BE inside-left still behaved partly like a profile form with evenly distributed Q&A.

## Principles tested
- Let dominant photography occupy more of the cover before inventing another container.
- Use one asymmetric paper field, unequal story scale, and overlapping photos rather than three equal feature modules.
- Let portraits establish profile-page hierarchy first; make Q1 dominant and stack Q2/Q3 asymmetrically.
- Prefer short editorial rules and direct native type over cards/pills.

## Verified result
- `BF / 761:2`: stronger outer comparator than BD. Front `761:131`. Three-scale screenshot QA passed after repairing paper-field z-order and cramped 02/03 treatment. Final visible native text `39`, IMAGE fills `8`, same-parent text intersections `0`, fold `761:176 = 2 × 1122.5`.
- `BG / 763:2`: stronger inside comparator than BE. Left `763:3`, right `763:126`. Three-scale QA passed after deleting a duplicate pull quote and repairing one SHOGO name/metadata intersection. Final visible native text `53`, IMAGE fills `6`, same-parent text intersections `0`, fold `763:276 = 2 × 1122.5`.
- Current outer `77:18` and Current inside `77:290` remain unchanged.

## Reusable feedback
1. Removing cards is insufficient if the composition still behaves like hero + index. Extend the dominant photo and let one asymmetric paper field interrupt it.
2. Z-order must be explicitly reviewed after collage changes; geometry-only QA cannot detect a paper field or photo obscuring copy.
3. Do not solve secondary-story crowding by shrinking Japanese type until it merely fits. Recompose the story into a deliberate print callout.
4. Profile pages become less form-like when portrait scale/overlap creates the first hierarchy and the questions follow unequal columns.
5. Before creating a new pull quote, inspect for an existing semantic/native text node and promote that authority instead.
6. Programmatic intersection QA remains useful after visual QA; BG exposed a real name/metadata intersection that was easy to miss at thumbnail scale.

## Asset-state truth
Fresh Q60 Drive readback reconfirmed `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155,439` bytes, and runtime materialization. A fresh Figma upload target was requested for BF hero `761:132`; the raw-byte POST failed before upload because `mcp.figma.com` DNS could not resolve. The same method was not repeated.

- generated new image: NO
- adopted new generated image: NO
- Q60 Figma placed: NO
- Q60 visually verified in Figma: NO
- PHOTO_ROLE_PASS: `9/10`
- dominant-photo pass: `2/3`
- V5 complete: NO
- V6 production started: NO

Detailed evidence: `01_paper-items/rurubu-wedding/learning-runs/2026-08-11-v5-bf-bg-cleanroom-editorial-qa.md`.

Status: `VERIFIED_FOR_COMPARATOR / BF_OUTER_BEST / BG_INSIDE_BEST / CURRENT_NOT_PROMOTED / GLOBAL_RULE_NOT_PROMOTED`
