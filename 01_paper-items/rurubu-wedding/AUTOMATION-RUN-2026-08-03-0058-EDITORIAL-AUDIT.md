# Rurubu V5 Editorial Audit — 2026-08-03 00:58 JST

Status: `ANALYSIS_ONLY / NO_LIVE_FIGMA_WRITE_CLAIMED`

## Purpose

This run converts the project-wide Figma, editorial, AI, and quality-over-legacy authorities into a bounded V5 review plan. It does not claim a live design improvement without screenshot and structure evidence.

## Highest-value current questions

1. Would the V5 outer/inside compositions still be selected if the earlier frames did not exist?
2. Do the three dominant photo roles—cover hero, back-cover main, and history lead—create a clear first, second, and third reading priority?
3. Are remaining panels acting as editorial containers, or are they inherited Web-UI cards?
4. Can one meaningful element be removed before any new decoration is added?
5. Do Japanese headings, captions, dates, and microcopy survive actual-size print review?
6. Are the fold and trim zones protecting faces, landmarks, headlines, and route information?

## Bounded comparison required before declaring V5 stronger

Create or preserve two candidates:

- `V5-L`: current legacy-derived candidate with verified repairs
- `V5-C`: clean-room comparison frame with materially different hierarchy, not a recolor

Compare both at:

- whole-spread thumbnail scale
- normal reading scale
- actual-size detail scale

Score 1–5:

- dominant focus
- travel-magazine authenticity
- wedding identity
- Japanese typography
- photography and crop quality
- reading path
- absence of Web-UI/template/AI feel
- print plausibility

No candidate wins on total score alone if photography, Japanese typography, or print plausibility is below 4.

## Dominant-photo acceptance criteria

For each of `IMG_HERO`, back-cover main, and history lead:

- intended Drive master ID is recorded
- role-sized derivative is at least approximately 2× target box dimensions for design QA
- Figma node ID and image hash are recorded
- no visible pixelation at reading/detail scale
- crop protects the subject, horizon, hands/faces, and fold/trim safety
- image provides a usable text-safe zone where required
- generated recognizable people cannot be mistaken for the real couple
- screenshot and structural QA pass

Transport success or an IMAGE fill alone is not a pass.

## Typography stress test

For one representative headline/body/caption group, test realistic text at:

- 100% expected length
- 130% expected length
- 150% expected length

Reject a system that relies on clipping, unreadably small type, accidental Japanese line breaks, or converting final copy into outlined/rasterized text.

## Next live-Figma action

The next safe implementation action remains:

1. inspect current whole-spread screenshots and target-node dimensions
2. re-derive the cover hero at role-appropriate size/quality
3. apply only to the existing semantic node
4. screenshot-QA crop, sharpness, contrast, hierarchy, and fold safety
5. record Drive ID → node ID → image hash in the ledger
6. only then continue to back-cover main and history lead

## Truthfulness boundary

This file records a review plan and acceptance criteria only. It must not be cited as proof that the live Figma design changed or improved.
