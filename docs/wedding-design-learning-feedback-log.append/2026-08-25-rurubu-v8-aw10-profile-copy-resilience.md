# 2026-08-25 — Rurubu V8 AW10 profile copy resilience

## What changed the decision

After AW9 improved the V8 Profile with verified couple evidence, the next risk was hidden by the very short `回答待ち` placeholders. Rather than treating current visual fit as proof of content readiness, this pass consumed RSL-266 and neutral NRSL-001 as QA-method hypotheses and ran realistic synthetic Japanese answer stress on a rollback-safe duplicate.

## Failure observed

The first AW9 stress showed a defect that geometry-only QA did not catch:

- person-answer nodes were fixed at `220×32`, `textAutoResize=NONE`;
- rendered glyphs overflowed the nominal node box;
- the SHOGO answer visually ran into the nearby photo although node-bound collision checks still returned `0`;
- Q1–Q3 also produced weak Japanese phrase breaks.

Synthetic stress strings were explicitly non-factual and never promoted into production.

## Corrected experiment

AW10 `2555:2` keeps AW9's reader-facing design and verified couple image but increases invisible native-text reserve:

- person-answer roles to `270×90 / 350×90`;
- photo and closing note shifted downward to preserve page rhythm;
- Q1–Q3 answer measures widened to `295 / 330 / 620` after the first AW10 stress still showed awkward phrase boundaries.

No font shrinking, cards, containers, fabricated answers or new images were introduced.

## Evidence

Current copy:

- 500px PASS;
- 1400px PASS;
- 1587×1123 DESIGN QA PASS;
- text intersection `0`;
- 18px edge risk `0`;
- Japanese→Inter mismatch `0`.

Verified stress `2555:36`:

- 500px PASS;
- 1400px PASS;
- no rendered answer/photo collision;
- improved Japanese semantic wraps;
- geometry QA remains clean.

AW10 promoted current; AW9 hidden rollback; failed AW9 stress and verified AW10 stress both retained hidden as production knowledge.

## Before / after learning check

**YES.** Without the stress method, AW9 could have been called robust because `回答待ち` fit perfectly and collision geometry was clean. The new check changed the design from short-placeholder-safe to meaningfully more resilient for future answers while preserving V8's quiet book identity.

## Learning state

RSL-266 is now independently reproduced in both V7 and V8 systems:

`VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`.

Do not transfer AW10's exact dimensions. Transfer only the language-specific stress + rendered screenshot + bounded correction method.

## Remaining truth gates

- actual final answers still require fresh REAL CONTENT QA;
- verified couple photo remains a `350×233` Figma screen derivative;
- high-resolution photo QA, printer template, preflight and physical proof remain blocked.
