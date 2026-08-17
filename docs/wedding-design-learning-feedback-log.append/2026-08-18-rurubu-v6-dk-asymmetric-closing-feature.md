# Rurubu V6 DK — asymmetric Q&A closing feature

Date: 2026-08-18
Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Observation

Preferred DJ still ended Q&A with Q05 and Q06 at nearly equal visual weight. The page was structurally correct but retained a final trace of questionnaire/form rhythm.

## Hypothesis

A magazine spread should not necessarily end repeated prompts at equal weight. Making Q05 a quiet support beat and Q06 the semantic closing feature could create a stronger editorial ending without adding cards or decoration.

## Bounded test

Created rollback-safe DK `1650:87` from DJ `1640:2`.

- reduced Q05 hierarchy;
- promoted Q06 hierarchy;
- added small native `OUR NEXT CHAPTER` kicker;
- kept all copy native and all photos replaceable;
- added no generated/raster asset and changed no image hash.

## QA / failure / correction

Whole, reading and Q&A actual-size review favored DK.

First long-copy proof failed because Q05 question/answer still used fixed-Y placement and collided after wrapping. This was not accepted. Q05 and Q06 were converted to native vertical auto-layout stacks and a second realistic-copy proof was run.

Final result:

- preferred DK normal copy: collision 0 / 18px safe risk 0 / Q&A overflow 0;
- second long-copy proof: collision 0 / safe risk 0 / overflow 0;
- rollback DJ retained hidden;
- failed proof retained hidden;
- passing proof retained hidden.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AD-DK-DE-QA-ASYMMETRIC-CLOSING-FEATURE-2026-08-18.md`.

## Decision

Adopt DK. The final Q&A region now reads as quiet Q05 support → strong Q06 closing feature rather than two equal form rows.

## Regression risk / next application

Final personal copy can still change wrapping; rerun actual-size proof after real Q05/Q06 wording lands. Do not transfer the exact Rurubu composition, colors, wording, coordinates or sizes to other Wedding items.