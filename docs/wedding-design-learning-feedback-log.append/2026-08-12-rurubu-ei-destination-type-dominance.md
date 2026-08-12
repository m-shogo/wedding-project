# Rurubu EI — destination typography as the dominant visual — 2026-08-12

## Problem observed
A photo-led magazine cover can still read as a polished brochure when the destination headline and feature modules share too-similar visual weight. In EH, the photography was strong, but `横浜` / `ふたり旅。` and Feature 01/02 were still more balanced than the genre benefits from.

## Capability / principle tested
Treat the Japanese destination name itself as a primary visual object. Increase scale contrast before adding decoration: one very large destination word, a materially smaller companion line, then medium feature typography and micro information.

The same principle applies beyond Rurubu when a print item needs editorial energy: hierarchy should first come from type scale, crop, overlap and direct placement, not from adding containers.

## Expected improvement
- faster recognition at thumbnail distance;
- stronger print/editorial silhouette;
- less app/brochure hierarchy;
- more room for supporting photography to behave as collage rather than cards.

## Regression risk
Very large Japanese display type can create safe-area failures, awkward glyph wrapping or accidental collisions even when the screen composition looks strong. Range-styled text also needs actual-size checking because structural bounding boxes alone cannot prove good glyph fit.

## Evidence from EI
- source Best: EH `1061:2`
- clean-room comparator: EI `1067:2`
- Review Best: `1069:2`
- `横浜`: 112px range within native text node `1067:143`
- companion `ふたり旅。`: 58px in the same native text node
- Feature 02 photo: 372×282, about -5.2°
- thumbnail 500 / whole 1000 / actual-size front 794×1123 / actual-size back 794×1123: PASS
- initial safe-area defect: Feature 01 `01` at x=16; repaired to x=20 before promotion
- final same-parent text collisions: 0
- final bounded safe-area text risks: 0

## Q60 transport lesson
An authenticated Drive materialization is now able to produce the exact 155,439-byte Q60 JPEG in the runtime, which is better evidence than conversational or manual binary transcription. However the official Figma upload endpoint still failed at DNS resolution before any byte reached Figma. This means:

- Drive materialized = verified local source availability;
- upload target issued = transport attempt prepared;
- DNS failure = no Figma placement;
- existing image hash must not be relabeled as Q60.

Do not weaken provenance language to reward a transport attempt.

## Reusable rule
For print-editorial work, test **type-scale dominance before adding graphic furniture**. When enlarging Japanese display type, always pair visual screenshot QA with safe-area/collision checks, and do not treat transport preparation as asset placement.
