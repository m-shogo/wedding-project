# RSL-026 — Generated support must prove both semantic role fit and visual readback

Source scope/item: Rurubu WEDDING / V6 inside profile + timeline
Date: 2026-08-16
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 had two kinds of generated-section candidates available in principle: a profile collage module and a timeline module. The design goal was to use generated fixed decoration while preserving native text and replaceable image roles. However, simply having a generated master or an in-Figma image hash did not guarantee that the resulting section would improve the page.

## Root-cause hypothesis

Generated/composed support is useful only when all three conditions hold simultaneously:

1. the rendered asset is visually sharp enough at its actual display size;
2. its internal blank wells/labels correspond to the semantic roles placed above it;
3. direct Figma screenshot readback shows the intended artwork actually exists in the stored image hash.

If any one fails, shrinking, stretching or cosmetically reusing the asset can produce pasted-module feel or false completion.

## Bounded tests

- W `1341:2`: attempted one official high-resolution profile upload from Drive master `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`; known `mcp.figma.com` DNS failure recurred, so the transport method stopped without retry.
- X `1341:53`: reused the existing profile hash at a smaller decorative-support size, first as a collage and then with its blank wells assigned to native quote + three replaceable snapshots. Actual-size visual QA still showed soft/pasted treatment and weak text fit; rejected.
- Z `1341:104`: reused the existing timeline hash behind six independent replaceable photos and native text. Source-node screenshot readback `1300:3` rendered as an essentially blank cream field, proving the stored hash was not a valid current timeline artwork; rejected.
- AC `1343:2`: after those generated-support failures, used only sharp existing replaceable photos + native text and varied photo scale/rotation. It improved the profile rhythm without pretending the generated transport issue was solved.

## Expected improvement

Prevent generated assets from being counted as design progress merely because they exist in Drive or as a Figma image hash, while still preserving the hybrid-authoring principle when a valid asset can eventually be transported.

## Regression risk

Rejecting generated support too aggressively can push work back toward native micro-geometry. The rule is not “avoid generated decoration.” It is “verify the rendered support at the intended role and scale before adoption.”

## Three-scale evidence

- V vs AC whole spread: AC profile hierarchy stronger.
- AC actual-size profile 794×1123: PASS.
- AC structure: profile native text 18 / images 4 / 18 px safe risks 0 / text collisions 0; Q&A native text 22 / images 2 / safe risks 0 / collisions 0.
- X actual-size profile: REJECT due pasted/soft support and awkward native-text fit.
- Z source generated timeline node screenshot: REJECT because intended decorative artwork was not present in visual readback.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- preferred AC: `1343:2`, profile `1343:3`
- preferred chronology remains U: `1339:2`
- rejected W/X/Z/AB: `1341:2 / 1341:53 / 1341:104 / 1342:2`
- generated-profile Drive v2: `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- generated-timeline Drive v2: `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- QA evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-AC-U-QA-2026-08-16.md`

## What must remain Rurubu-specific

Do not transfer Rurubu photo angles, collage sizes, Hawaii/tropical ornament, timeline geometry, palette, or Japanese travel-magazine grammar.

## Cross-item applicability hypothesis

For another wedding Figma item using hybrid authoring, independently verify generated/composed support with this sequence before adoption:

`master provenance → actual rendered readback → semantic well/role alignment → actual-size resolution → native-text fit → screenshot QA`.

If a stored image hash renders blank/wrong or a generated module only looks acceptable when enlarged beyond its source quality, reject that placement without treating transport/presence as completion.
