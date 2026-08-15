# RSL-025 — Resolution gate + destination chronology

Date: 2026-08-16
Source scope: Rurubu WEDDING V6 inside studies
State: `CROSS_ITEM_CANDIDATE`

## Source problems

1. A generated profile support asset could be structurally aligned with native text and replaceable photos, but its existing Figma image hash became visibly soft when enlarged to the role size needed by the profile page.
2. A six-event chronology still read as a generic template when every milestone had similar visual weight, even after cards had been removed.

## Root-cause hypotheses

### A. Generated support resolution

`HYBRID_STYLE_SEAM` can be caused not only by mismatched art direction but by **resolution hierarchy**: sharp native text and sharp photography make a soft generated support look especially artificial. Correct semantic alignment does not rescue insufficient source quality.

### B. Chronology endpoint

A chronology needs narrative hierarchy, not merely non-uniform coordinates. If all milestones still receive similar image area, the reader perceives six peer modules rather than a journey with escalation and destination.

## Bounded tests

### T — role-aligned generated support

- Figma: `1338:53 / V6_INSIDE_T_GENERATED_PROFILE_ALIGNED_QA_EDITORIAL_2026_08_16`.
- Existing generated profile support enlarged and aligned to its intended photo/text roles.
- Main photo + three snapshots stayed independently replaceable.
- Profile facts stayed native text.
- Q&A was independently tightened into a 3×2 native-text rhythm with dominant memory photography.

Result:

- semantic alignment: PASS;
- Q&A visual rhythm: PASS;
- actual-size generated support sharpness: FAIL / visibly soft.

T was hidden rather than promoted.

### V — sharp semantic fallback

- Figma: `1339:54 / V6_INSIDE_V_SHARP_PROFILE_EDITORIAL_QA_2026_08_16`.
- Hid the soft generated support.
- Kept dominant photo, editable profile facts, three replaceable snapshots, and the improved Q&A/memory hierarchy.

Result:

- profile structural clarity: PASS;
- actual-size sharpness: PASS;
- generated decorative richness: intentionally deferred until a print-capable asset is transportable.

### U — destination chronology

- Figma: `1339:2 / V6_INSIDE_U_EDITORIAL_TIMELINE_DESTINATION_2026_08_16`.
- Varied image sizes/vertical rhythm among the first five milestones.
- Promoted `2026.10.24 / WEDDING` to a materially larger endpoint image.
- Kept route rail restrained and functional.
- Final QA repaired three discovered geometry defects before promotion.

Final right-page QA:

- native text: `21`;
- image roles: `9`;
- 18 px safe-area risks: `0`;
- text/text collisions: `0`;
- text/image collisions: `0`.

## Expected improvement

- Generated/composed support should feel as crisp as the native information layered above it.
- Chronology should read as a story with escalation/arrival, not a set of six peer cards.

## Regression risks

- Hiding a soft generated support can make a page too restrained if no other editorial hierarchy exists.
- Making the final event dominant can overstate it or crowd the bottom safe area.
- Scale variation without structure can become arbitrary collage rather than chronology.

## Three-scale evidence

V:

- whole spread: sharper and more coherent than the enlarged soft-support T;
- reading/page scale: profile hierarchy remains understandable and Q&A reads compactly;
- actual size: no soft decoration competing with native text.

U:

- whole spread: WEDDING is now visibly the endpoint;
- page scale: first five milestones remain scannable without returning to an equal-card grid;
- actual size `794×1123`: PASS after collision/safe-area repair.

Evidence path:

- `01_paper-items/rurubu-wedding/RURUBU-V6-V-U-INSIDE-QA-2026-08-16.md`

## Failure fingerprint update

`GENERATED_SUPPORT_RESOLUTION_SEAM`

- operation: enlarge generated/composed support under native text/photo overlays;
- symptom: support becomes visibly softer than semantic foreground layers at actual size;
- likely cause: insufficient intrinsic resolution / derivative quality for the adopted role size;
- stop condition: do not stretch or cosmetic-sharpen the same hash repeatedly;
- replacement method: use a sharp semantic fallback or a higher-resolution regenerated/verified master, then re-run actual-size QA.

Transport attempt for a fresh high-resolution asset again hit `Could not resolve host: mcp.figma.com`; repeated upload retry was stopped and no transport-only progress was claimed.

## What remains Rurubu-specific

Do NOT transfer:

- exact cream/coral/teal palette;
- V/U coordinates;
- exact 3×2 Q&A pattern;
- WEDDING endpoint size;
- travel-route visual language;
- Rurubu magazine density or typography personality.

## Cross-item applicability hypothesis

Candidate principles only:

1. **Resolution is part of hybrid-authoring cohesion.** A generated support should not be promoted simply because its role alignment is correct; it must also pass actual-size sharpness against native text and photography.
2. **Narrative sequences benefit from endpoint dominance.** When a sequence still reads as peer cards, varying scale around a meaningful destination can create hierarchy without adding more decoration.
3. **Sharp semantic fallback beats knowingly soft decoration.** When transport/source quality blocks the intended generated asset, preserve editability and visual integrity rather than stretching a weak asset merely to satisfy the hybrid method.

Receiving items must independently test these ideas in their own composition before promotion.
