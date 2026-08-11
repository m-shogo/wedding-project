# 2026-08-12 — Rurubu DJ full-bleed editorial hierarchy

Visible problem: DI still separated the cover into a dominant upper photograph and a comparatively broad lower cream information field, so at thumbnail and actual size it retained a safe poster rhythm instead of a dense Japanese travel-magazine page.

Principle tested: use verified photography as the page substrate, then layer native Japanese type, one bounded irregular paper patch, a small factual destination inset, and unequal support-photo scale directly into that photographic field. Atmosphere and fact stay semantically separate: the coast image is explicitly travel memory, while the unresolved Yokohama proxy remains a minor factual anchor.

Expected improvement: stronger travel-magazine recognition before copy, more asymmetric editorial rhythm, less UI/poster segmentation, and less visual dependence on the low-quality destination proxy.

Regression risk: text contrast can fail on full-bleed photography; overlaps can create hidden text-box collisions; a broad paper patch can recreate dead poster space; atmospheric photography could be misread as destination evidence if not labeled.

Evidence: DJ `933:2`, front `933:131`, Review `936:2`. 500px thumbnail PASS, 1600px whole spread PASS, 1800px actual-size front PASS. Structure: 39 visible native text nodes, 7 visible IMAGE fills, 0 same-parent text intersections, fold `933:190` at x=792.7000122070312 with 2×1122.5 geometry. Dominant hash `adbb8e529451a81dd25e4eb29bf068655569ce25`; factual Yokohama proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`; support photo hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

Rejected/corrected states: the initial 322px cream patch was rejected for dead poster-like space and reduced to 252px. Structure QA caught one `TRAVEL MEMORY / 旅の記憶` versus feature-02 text-box intersection; promotion waited until the label moved and the intersection count returned to zero.

Adopted status: YES as strongest outer comparator, not Current. DI remains rollback. Canonical Current `77:18 / 77:290` remains untouched.

Generated: 0. Newly adopted generated asset: 0. New external binary placed: 0. Existing verified photography reused: YES. DJ placed: YES. DJ visually verified: YES. DJ structure verified: YES. Q60 exact placed/visually verified: NO.

Next application: when a genuinely different binary-safe path is available, replace only the small factual Yokohama anchor with the already Drive-verified Q60 derivative and repeat node/hash plus three-scale QA. Do not enlarge the weak proxy and do not treat documentation or transport as V5 completion.
