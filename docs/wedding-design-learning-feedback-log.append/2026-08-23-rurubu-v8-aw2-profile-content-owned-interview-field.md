# Rurubu V8 AW2 — Profile/Q&A content-owned interview field

Date: 2026-08-23
Scope: Rurubu WEDDING only

## New researched knowledge

Fresh references this run focused on professional editorial systems rather than repeating recent photo/grid research. The useful principle was not a surface style: a publication can preserve one recognizable identity while allowing materially different page treatment when the story/content role requires it. Editorial form should respond to language and story rather than force every unit into an identical module.

Research state: `OBSERVED → ROOT_CAUSE_HYPOTHESIS` until tested in Rurubu.

## Live defect found

V8 Profile AW `2278:2` had a strong left profile page, but the right Q&A page repeated Q1/Q2/Q3 vertically at nearly equal cadence. The answers had unequal editorial salience: Q1/Q2 were concise travel-character responses; Q3 was a more human wedding-memory close.

## Tested local change

Created rollback-safe AW2 `2329:2` and changed only the right interview field:

- paired Q1/Q2 in the upper field;
- retained Q3 as a wider lower closing voice;
- preserved every question and answer string;
- preserved left profile composition and factual/native text;
- added no image, container, card, shadow, gradient or decorative filler.

## Verification

- 500px whole-item: PASS
- 1400px reading: PASS
- 1587×1123 actual-size: PASS
- visible native text: `23`
- IMAGE fills: `0`
- text intersections: `0`
- bounded 18px safe risks: `0`
- accidental explicit one-character lines: `0`
- Japanese semantic font mismatch: `0`

## Decision

AW2 `2329:2` promoted to current V8 Profile/Q&A at `x=1800 / y=8500`.

AW `2278:2` preserved hidden as rollback evidence at `x=300000`.

State: `VERIFIED_LOCAL DESIGN QA / NOT GLOBAL WINNER / NOT PRINT READY`.

## Learning promoted locally

`RSL-236 / F-RSL-236-INTERVIEW-RAIL-REPEATS-EQUAL-QA-MODULES-DESPITE-UNEQUAL-ANSWER-SALIENCE`

The verified local principle is about answer-role salience, not a reusable two-column Q&A layout. Do not copy AW2's coordinates, palette or exact two-up treatment elsewhere.

## Asset truth

- generated images: `0`
- adopted images: `0`
- Drive masters added: `0`
- production photos placed: `0`
- factual/native copy changed: `0`
- V6 control changed: NO
- V7 production changed: NO

## Before/after learning check

PASS. Fresh research changed the live design decision from likely spacing/type polish inside the old repeated rail to a bounded information-architecture change based on the unequal editorial jobs of the answers.