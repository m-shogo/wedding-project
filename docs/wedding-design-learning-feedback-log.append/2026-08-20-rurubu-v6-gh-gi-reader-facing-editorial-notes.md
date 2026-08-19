# Rurubu V6 — GH / GI reader-facing editorial note feedback

Date: 2026-08-20
Scope: Rurubu WEDDING only

## Experiment 1 — GH Cafe 3 Picks

Visible problem: the Cafe travel-note area was technically populated but read as tiny generic role metadata (`SWEETS / MOOD / PHOTO / TALK`) rather than a useful magazine note.

Principle tested: a weak support field can gain editorial density by converting fragmented generic microcopy into a short reader-facing native list before adding any new image, card or decoration.

Expected improvement: stronger scanability, more authentic travel-guide utility, less template/authoring residue.

Regression risk: a checklist can become another UI module or compete with the 01 feature if made too large; factual content must not be silently removed.

Evidence:
- source GC `1933:2`
- adopted GH `1947:2`
- Cafe actual-size `1947:3` = 794×1123
- ~500px whole PASS
- 1200px reading PASS
- actual-size PASS
- collision 0 / 18px safe risk 0

Status: ADOPTED / VERIFIED_LOCAL.

Next application: only use this treatment where the support content is truly editorial guidance rather than facts, accessibility content or physical production instructions.

## Experiment 2 — GI Story 3 Scenes

Visible problem: `TRAVEL NOTE / 03 SCENES` plus English role labels looked like template notation beside otherwise Japanese editorial copy.

Principle tested: reader-facing microcopy should describe the scene rather than expose generic internal role names when no brand/factual need requires those names.

Expected improvement: stronger finished-magazine feel and better actual-size comprehension.

Regression risk: do not erase intentional bilingual identity or valid English publication language merely because Japanese is available.

Evidence:
- source FR `1904:18`
- adopted GI `1950:2`
- Story actual-size `1950:3` = 794×1123
- ~500px whole PASS
- 1200px reading PASS
- actual-size PASS
- collision 0 / 18px safe risk 0

Status: ADOPTED / VERIFIED_LOCAL.

## Asset / editability

- image generation 0
- Drive writes 0
- new image hashes 0
- photography unchanged and replaceable
- final changed wording remains native Figma text
- old GC/FR preserved hidden for rollback

Cross-item note: method may transfer; Rurubu wording, palette, coordinates, layout and visual grammar must not.
