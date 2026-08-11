# Rurubu V5 — DJ full-bleed editorial clean-room

Date: 2026-08-12
Scope: RURUBU WEDDING only
Status: ADOPTED AS BEST OUTER COMPARATOR, NOT CURRENT

## Visible problem

DI was the strongest prior outer comparator, but from-scratch review at thumbnail, whole-spread, and actual-size scales still showed a safe poster rhythm on the front: dominant photography above, then a comparatively broad cream information field below. The lower half did not let photography and editorial elements interlock strongly enough for an energetic Japanese travel-information magazine silhouette.

## Principle / capability tested

Use an already verified, identity-safe travel-memory photograph as the entire front-page substrate, while explicitly keeping its semantic role as travel memory rather than Yokohama fact. Rebuild hierarchy with a bounded irregular paper patch, direct native Japanese typography, one small tilted factual Yokohama proxy, unequal support-photo scale, and overlap. Do not enlarge the unresolved low-quality Yokohama proxy and do not add rounded UI cards.

## Expected improvement

- stronger travel-magazine recognition before copy is read
- less poster/landing-page separation between hero and information area
- denser but readable asymmetric rhythm
- clearer distinction between atmospheric travel memory and factual destination evidence
- better use of existing verified photography while Q60 exact transport remains blocked

## Regression risks

- typography can lose contrast against full-bleed photography
- overlapping text boxes can collide even when the screenshot looks acceptable
- the coast image could be falsely interpreted as Yokohama without explicit semantic labeling
- an oversized cream patch can recreate the same dead poster zone the redesign is intended to remove

## Experiment and corrections

Source DI: `925:2`.
DJ root: `933:2`.
DJ front: `933:131`.
Review snapshot after adoption: `936:2`.

The coast image became `DJ_DOMINANT_TRAVEL_MEMORY_FULLBLEED` (`933:132`) at full front-page size. The unresolved Yokohama proxy became the small tilted `DJ_YOKOHAMA_DESTINATION_ANCHOR_PROXY_SMALL` (`933:134`) instead of a hero. A support/guest image (`933:155`) overlaps the lower composition. Feature 01 uses an irregular cream paper patch (`933:176`) rather than a modular card.

Interim paper height 322px was rejected at actual size because it left a residual blank poster-like zone; it was reduced to 252px. Structure QA then found one same-parent text-box intersection between `TRAVEL MEMORY / 旅の記憶` (`933:149`) and feature 02 (`933:183`). DJ was not promoted until the label moved from y=574 to y=586 and the intersection count returned to zero.

## Verification evidence

- thumbnail: 500px root screenshot PASS
- whole-spread reading: 1600px root screenshot PASS
- actual-size/detail: 1800px front screenshot PASS
- visible native text: 39
- visible IMAGE fills: 7
- same-parent text intersections: 0
- fold guide: `933:190`, x=792.7000122070312, y=0, 2×1122.5
- dominant travel-memory hash: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- Yokohama proxy anchor hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- guest/support photo hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- canonical Current outer `77:18`: unchanged
- canonical Current inside `77:290`: unchanged

Generated this run: 0. Newly adopted generated assets: 0. New external binaries placed: 0. Existing verified photography reused as dominant: yes. DJ layout placed: yes. DJ visually verified: yes. DJ structure verified: yes. Q60 exact Figma placement: no. Q60 visual verification: no.

## Adoption and next application

ADOPT DJ as the strongest outer comparator and preserve DI as rollback. The next high-value asset action remains exact replacement of only the small Yokohama destination anchor with the Drive-verified Q60 derivative when a genuinely different binary-safe transport path is available. Do not make the low-quality proxy dominant, and do not start V6 until the remaining V5 asset lifecycle and gate are genuinely closed.
