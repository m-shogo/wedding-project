# RSL-188 — Remove unowned collage before adding assets

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source problem: V8 Outer combined one legitimate generated image with extra solid-color crop blocks that had no reader-facing semantic owner. The result felt like AI/template collage activity rather than professional editorial hierarchy.

Root-cause hypothesis: when decorative image fragments do not carry a specific caption, event, subject, destination or sequencing job, adding more visual modules can weaken publication authenticity even if spacing and color are technically clean.

Bounded test: on rollback-safe V8 Outer G, preserve the legitimate generated ocean-light image, enlarge it into one coherent visual field, hide the two unowned solid crop blocks, bind only the headline to the image, move supporting copy to the paper field, and use native `横浜 / YOKOHAMA` for clearer destination ownership.

Failure observed: placing both headline and deck over the image made the deck cross light bands and lose contrast. Corrected method kept only the headline image-bound and returned the deck to the cream field.

Expected improvement: fewer arbitrary modules, clearer image ownership, stronger publication personality, less AI-template signal.

Regression risk: subtraction can make a spread too quiet; a single abstract image can still be destination-neutral; text-over-image must be rechecked against the actual crop.

Evidence: Figma current Outer `2174:2`; previous Outer `2163:2` hidden rollback; image `2174:14`; Drive master `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`; hash `be21a846e961b3a13c24c7476f6a01b12b8d07ff`; 1400px and 1587×1123 visual review PASS; native text 12; IMAGE 1; text intersections 0; 18px safe risk 0; internal process-language 0.

Failure fingerprint: `F-RSL-188-DECORATIVE-COLLAGE-WITHOUT-SEMANTIC-OWNER`.

What must remain Rurubu-specific: exact ocean-light artwork, Yokohama wording, crop, typography, navy/cream palette and cover geometry.

Cross-item applicability: another print artifact may independently test whether decorative fragments have real semantic/editorial ownership before generating or adding further collage elements. This is not a rule to remove useful photos, physical fields or purposeful visual anchors.
