# Rurubu WEDDING V5 — EM travel-photo back / EL live reconciliation

Scope: RURUBU WEDDING only. Current production frames `77:18 / 77:290` were not changed.

## Live-state reconciliation

The run began from GitHub's recorded EK outer / EG inside authority, then re-read live Figma before writing. Live Figma was already ahead: Start Here and Review showed `EK outer / EL inside`, with EL working frame `1086:2` and Review snapshot `1089:2`. The stale EG assumption was therefore discarded rather than written back over the live file.

Fresh EL visual evidence at 500px whole-spread and natural-size 794×1123 left/right pages confirmed the profile-collage direction. Fresh structure readback confirmed 53 visible native text nodes, six visible IMAGE fills, zero same-parent text intersections, zero bounded safe-area text risks, and fold `1086:283` at x=792.7 / width 2 / height 1122.5. EL remains adopted.

## Visible problem

EK's front cover was strong, but its back-cover dominant camera/map/flower flat-lay still looked like generic wedding stock styling. The result weakened whole-item travel-magazine recognition even though the front cover was increasingly destination-led.

## Principle tested

Do not preserve a large image merely because it is already technically verified. When the dominant visual itself is the style defect, subtract it and let an already accepted, provenance-known travel photograph carry the page. Rebuild hierarchy through one dominant travel field, unequal overlapping support photography, native Japanese display type, and compact captions rather than cards.

## Experiment

Created safe clean-room outer EM `1094:2` from the verified EK Review state. The front cover was intentionally preserved. On the back cover, the dominant flat-lay was replaced with the accepted same-V5 coast image hash `adbb8e529451a81dd25e4eb29bf068655569ce25`. The image was expanded to the main 793.7px-wide field; two verified support photographs were overlapped at different scale and small rotation. The Japanese title became solid deep-navy direct-on-photo type, while the friends heading became white direct-on-photo type. No new rounded card, gradient, drop shadow, external binary, or generated asset was added.

## Expected improvement

A viewer should identify travel editorial from the full item before reading the wedding details. The back and front should now belong to the same genre: destination photography first, then Japanese headline and compact feature anchors.

## Regression risk

The coast image is an accepted same-version dummy role rather than the final real back-cover photograph, so reuse must not be misreported as a new master. Large photo replacement could also reduce headline contrast, create text-box collisions, or push microtype outside safe areas.

## QA evidence

EM was reviewed at 500px thumbnail, 1200px whole-reading scale, natural-size front 794×1123, and approximately natural-size back 798×1123. The large coast field produced a materially stronger travel-magazine read than EK's object flat-lay. Front-cover hierarchy remained intact.

Final live structure: 36 visible native text nodes, six visible IMAGE fills, zero same-parent text intersections, zero bounded safe-area text risks, fold `1094:187` at x=792.7 / width 2 / height 1122.5. Back-main image hash is `adbb8e529451a81dd25e4eb29bf068655569ce25`; the front hero remains proxy hash `539c259be8036b481d06b4f76db9a39b407d90e8` and is not Q60 proof.

## Decision

ADOPTED. EM Review snapshot `1096:2` promoted as Best Outer. EK Review `1081:2` is hidden rollback. EL `1089:2` remains Best Inside. Start Here now reads `EM outer / EL inside`.

## Asset lifecycle classification

Generated this run: 0. Newly adopted generated assets: 0. New external binary placed: 0. Existing accepted same-V5 image reused: 1. EM placed: yes. EM visually verified: yes. EM structure verified: yes. Q60 exact Drive binary placed: no. Q60 visually verified in Figma as exact binary: no.

## Next application

When a dominant image reads as generic stock/editorial filler, repairing text around it is lower value than replacing the dominant visual with a provenance-known role-fit photo. Keep V5 incomplete until the Q60 exact Drive-to-Figma lifecycle and final gate reconciliation are genuinely closed; do not start V6 production from this result alone.
