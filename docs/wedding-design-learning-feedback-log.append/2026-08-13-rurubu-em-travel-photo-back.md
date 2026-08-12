# Wedding design learning feedback — Rurubu EM travel-photo back

Scope: Rurubu WEDDING V5 only.

Visible problem: the previous best outer EK had a strong destination-led front, but the back-cover dominant camera/map/flower flat-lay still read as generic wedding stock imagery. Whole-item genre recognition therefore weakened on the left half.

Principle tested: dominant photography is a hierarchy decision, not merely an asset slot. When the dominant image itself carries the wrong genre signal, subtract it before adding decoration. Prefer one large role-fit travel photograph plus unequal overlapping support images and native Japanese type over object flat-lay styling or extra cards.

Expected improvement: the complete outer spread should read as travel editorial at thumbnail scale, not as a travel cover paired with a wedding-product moodboard.

Regression risk: same-version image reuse can be misreported as a newly completed asset; direct-on-photo type can lose contrast; larger overlap can create collisions or safe-area failures.

Evidence: EM `1094:2` passed 500px thumbnail, 1200px whole-reading, natural-size front and back inspection. Live structure: 36 visible native text nodes, six visible IMAGE fills, zero same-parent text intersections, zero bounded safe-area text risks. Review snapshot `1096:2` is visible; old EK Review `1081:2` is hidden rollback. Start Here reads `EM outer / EL inside`.

Decision: ADOPTED. No new generated asset and no new external binary were placed. The dominant back image reuses accepted same-V5 coast hash `adbb8e529451a81dd25e4eb29bf068655569ce25`.

Next application: prioritize replacement of wrong-genre dominant imagery before polishing captions, stickers, or micro-decoration. Preserve exact provenance distinctions: reuse is not generation, and visual improvement is not Q60 completion.
