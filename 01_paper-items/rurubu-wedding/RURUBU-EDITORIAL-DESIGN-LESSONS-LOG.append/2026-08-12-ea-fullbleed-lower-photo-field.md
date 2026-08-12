# EA lesson — full-bleed lower photo field

Date: 2026-08-12

## Problem
DV's upper cover was strong, but the lower zone still reverted to a pale information field plus a separate framed image. The visual system lost travel-magazine energy below the hero.

## Lesson
A high-density Japanese travel-magazine cover does not require more stickers or cards. A better repair can be subtraction plus photographic continuity: one dominant lower photo, one paper-like lead story, one overlapping support-photo caption, and one direct-on-photo secondary story with a thin rule.

## Evidence
- EA source `1024:2`
- front `1024:131`
- Review `1027:2`
- final visible native text `36`
- visible IMAGE fills `7`
- same-parent text intersections `0`
- fold `1024:184`, x `792.7`, width `2`, height `1122.5`
- thumbnail / reading / actual-size screenshot review passed

## Failure knowledge
- Direct black text over dark photography failed.
- A large dark rectangle repaired contrast but reintroduced card-like UI and was removed.
- Z-order must be checked after expanding a photo to full bleed; existing caption fields can silently render underneath it.
- Structural collision count is necessary but not sufficient; actual-size visual QA still caught low-value copy falling into a photo seam.

## Reuse
For future editorial work: before adding a module to a weak secondary zone, test whether the zone should instead become a single photographic field with typography anchored to image geometry.
