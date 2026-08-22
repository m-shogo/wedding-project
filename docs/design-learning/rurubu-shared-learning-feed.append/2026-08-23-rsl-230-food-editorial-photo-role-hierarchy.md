# RSL-230 — Food editorial needs unequal photo/content responsibility

Date: 2026-08-23
Scope: Rurubu WEDDING local learning
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Fingerprint

`F-RSL-230-FOOD-SPREAD-REDUCED-TO-REPEATED-DISH-MODULES`

## Visible problem

A food/travel spread can become a catalogue of equal dish modules: every photograph is similarly sized, every caption has the same weight, and the page reads like restaurant cards rather than an editorial experience. Even attractive food imagery can feel generic or AI-template-like when each image performs the same job.

## Research observation

The Gourmand, Toothsome, Picnic and Fare show different ways food publications treat food as culture, atmosphere, people, place and memory—not only plated-food glamour. The transferable principle is role differentiation, not any specific visual style.

## Local test

V7 Cafe+Table H `2296:2` assigns intentionally different jobs:
- one dominant cafe photo establishes appetite and setting;
- native sensory copy carries sound/light/conversation;
- one smaller contextual city photo changes tempo;
- one dominant dinner photo carries the right page;
- the closing copy carries memory/atmosphere rather than adding another food module.

No cards, menu UI, repeated equal dish blocks or decorative English were added.

QA after correction:
- 500 px: PASS;
- 1400 px: PASS;
- 1587×1123: PASS;
- text intersections: 0;
- 18 px safe risk: 0;
- unintended one-character line-end candidates: 0.

## Failure caught

The first structural pass found a `90×60 px` overlap between the dinner closing headline and its supporting note. The note was moved below the closing beat and structure QA was rerun. Visual attractiveness did not override structural QA.

## Verified local principle

Before adding more food images, ask whether each image or text block has a distinct editorial job. Test **dominant food/setting image + contextual beat + sensory/native copy + clear close** against repeated equal food modules.

This does not imply every food spread must use the same number of images or that food photography should be secondary. Real role-specific Hawaii photography is still required before final-content judgment.

## Promotion boundary

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` only.