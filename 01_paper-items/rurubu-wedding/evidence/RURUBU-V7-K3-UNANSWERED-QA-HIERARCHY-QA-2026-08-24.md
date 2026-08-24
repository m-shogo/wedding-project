# Rurubu V7 K3 — Unanswered Q&A Hierarchy QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Problem observed

Current K2 `2391:2` had already truth-gated all personal answers to `回答待ち`, but its right-page Q&A still carried a hierarchy inherited from an older content state: Q1 and Q4 alone had giant `01 / 04` numerals and visible answer placeholders while Q2/Q3/Q5/Q6 were compact question-only lines.

Once all six answers are unresolved, that hierarchy no longer has an answer-salience reason. At thumbnail scale it reads as a designed emphasis without a current editorial referent.

## Professional research → local hypothesis

New research rotated to interview/editorial typography rather than another photography pass. Eye Magazine's writing on typography treats type as an editor/director of content: visual emphasis should structure and express the actual message, rather than survive as a decorative layer after the content state changes. AIGA interview-publication teaching material similarly evaluates hierarchy through typography, color, position and alignment as part of editorial structure.

Rurubu-specific hypothesis: when content authority changes from partially answered to fully unresolved, the visual hierarchy must be re-audited. A prior answer-driven emphasis must not survive merely because it looked editorial.

## K3 bounded change

Created rollback-safe candidate K3 `2491:2` from K2.

Changes on the Q&A page only:

- kicker: `ふたりに、6つの質問。` → `6つの質問`
- title: `お互いに、聞いてみました。` → `ふたりに、聞きたいこと。`
- hide decorative/privileged giant `01` and `04`
- hide Q1/Q4-only `回答待ち` answer blocks so unresolved answers are not represented inconsistently
- Q1 becomes `Q1　第一印象は？` at 20px
- Q4 becomes `Q4　これから挑戦 / したいこと。` at 20px
- Q2/Q3/Q5/Q6 remain compact prompts
- no new card, pill, badge, shadow, gradient or image
- all personal facts/answers remain unresolved; no answer was invented

Q1/Q4 retain modest typographic prominence as opening and second-half pacing beats, but no longer imply that those two questions have privileged answer content.

## Failure during candidate QA

The first K3 title `ふたりに、聞いてみたいこと。` was truth-safe but too long at reading scale and crowded the adjacent photo boundary. It was not promoted. The title was shortened semantically to `ふたりに、聞きたいこと。` and re-tested.

## Three-scale QA

- 500px whole-item: PASS; K3 removes the strongest questionnaire/UI-like `01 / 04` dominance while preserving V7 energy.
- 1400px reading/page: PASS after title shortening; reading order remains clear and no photo-boundary crowding remains.
- 1587×1123 actual-size/detail: PASS for DESIGN QA.

Structure readback:

- current candidate before promotion: `2491:2`
- native visible text: `26`
- IMAGE fills: `5`
- text-text intersections: `0`
- 18px edge risks: `0`
- authority parent: `2052:2`

## Promotion

- K3 `2491:2` promoted to current V7 Profile position `x=15900 / y=13000`
- K2 `2391:2` preserved as hidden rollback at `x=300000`
- K3 current name explicitly retains `REAL-CONTENT-BLOCKED / UNPAGINATED-STUDY`

## Six professional critique views

- Art director: PASS — V7 personality remains energetic without arbitrary giant ordinals.
- Editorial designer: PASS — hierarchy now reflects question structure rather than obsolete answer salience.
- Book designer: PASS — page rhythm still varies; it does not become six equal dashboard modules.
- Typographer: PASS — Q1/Q4 are controlled pacing beats, not oversized numerical furniture.
- Photo editor: unchanged; all current photography remains non-final dummy evidence.
- Print designer: DESIGN QA only; final copy, photography, printer template and proof remain blocked.

## Learning state

`RSL-265 / VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-265-TRUTH-GATED-QA-RETAINS-SALIENCE-FROM-NOW-MISSING-ANSWERS`

Transferable principle: after content truth/state changes, re-audit the visual hierarchy that was justified by the previous state. Do not retain emphasis only because it already looks designed.

Do not transfer K3 coordinates, font sizes, question grouping or V7 palette as project-wide rules.

## Asset / truth

- image generation: 0
- Drive write: 0
- new image hash: 0
- final photography: 0
- V6 changes: 0
- V8 production changes: 0

A separate high-resolution C12 upload test used the newly available official Figma `upload_assets` route after a material capability change, but the returned submit URL still failed at POST with `Could not resolve host: mcp.figma.com`. The C12 hero hash was read back unchanged. Under RSL-005 the route was not retried again this run.
