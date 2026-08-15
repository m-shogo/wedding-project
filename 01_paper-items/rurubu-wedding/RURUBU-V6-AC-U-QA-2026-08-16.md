# RURUBU WEDDING V6 — AC/U QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `V6 AC/U PREFERRED_INSIDE_STUDIES / VERIFIED_LOCAL / V7_HOLD / NOT_PRINT_READY`

## Authority / pre-write readback

- GitHub main before evidence write: `d88f6d5adfa53fe5aea156a7e4054e606d81a399`.
- Shared learning read before work:
  - `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
  - `docs/design-learning/rurubu-shared-learning-feed.md`
  - `docs/design-learning/non-rurubu-shared-learning-feed.md`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- Previous preferred studies:
  - V `1339:54 / V6_INSIDE_V_SHARP_PROFILE_EDITORIAL_QA_2026_08_16`
  - U `1339:2 / V6_INSIDE_U_EDITORIAL_TIMELINE_DESTINATION_2026_08_16`
- Drive generated profile role v2 readback: `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm / RURUBU_V6_PROFILE_SECTION_ROLE_v2.png`.
- Drive generated timeline role v2 readback: `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8 / RURUBU_V6_TIMELINE_SECTION_ROLE_v2.png`.
- No non-Rurubu item-specific Figma/Drive/GitHub path was inspected or changed.

## Experiments

### W — high-resolution profile asset transport

Rollback-safe duplicate `1341:2` was created from V and targeted a dedicated generated-support rectangle.

One official `upload_assets` URL was issued for the high-resolution Drive PNG, then the raw binary upload failed with the already-known fingerprint:

`Could not resolve host: mcp.figma.com`

Per the shared repeated-failure rule, this method was not retried. W was renamed `REJECTED_TRANSPORT_BLOCKED` and hidden.

State separation:

- Drive master available: YES
- upload URL issued: YES
- binary transported: NO
- new Figma image hash: NO
- visually adopted: NO

### X — existing generated profile hash at bounded small size

Candidate `1341:53` tested whether the existing in-Figma generated profile hash could remain useful when displayed small enough to avoid its known actual-size softness.

Two variants were visually checked:

1. small decorative collage support in the lower-right profile region;
2. semantic alignment where the generated large blank well supported native quote text and the small wells supported three replaceable snapshot photos.

Both remained visibly weaker than V/AC: the asset read as a pasted soft module, and the text-support fit created awkward wrapping. X was rejected and hidden.

### Z — existing generated timeline hash as editable-overlay background

Candidate `1341:104` placed the existing in-Figma timeline image hash behind six independent replaceable event photos and native date/title/copy roles.

Direct screenshot readback of source node `1300:3 / DECOR / COMPOSED / GENERATED_TIMELINE_MODULE_V1` showed the stored image rendering as essentially a plain cream field, not the intended tropical timeline artwork. Therefore the hash cannot serve as the current generated timeline authority. Z was rejected and hidden.

### AB — diagonal photo-route chronology

Candidate `1342:2` tested a materially different diagonal photo journey using U's replaceable event images and native text.

The diagonal rail cut through images and the lower timeline became more sparse and diagram-like than U. Whole-spread visual review rejected AB; it was hidden. U remains the preferred chronology study.

### AC — sharp photo-led profile/Q&A

Candidate `1343:2 / V6_INSIDE_AC_PHOTO_LED_PROFILE_QA_2026_08_16` was created from V after the generated-support approaches failed visual QA.

Profile changes were deliberately limited to existing editable roles:

- dominant replaceable profile photo enlarged and given a slight editorial rotation;
- three replaceable snapshot photos enlarged, overlapped, and given varied rotation/scale;
- native profile title, name, labels, values, quote and note remained editable;
- no generated module, fake text, new card grid, gradient or decorative micro-geometry was introduced.

Q&A page retained V's native 6-question structure and dominant memories photography.

## AC visual / structure QA

Whole spread screenshot at 1587×1123-equivalent: PASS and stronger than V on profile photo rhythm.

Actual-size profile page `1343:3 / 794×1123`: PASS.

Structure readback:

- profile page: native text `18`, visible IMAGE roles `4`, 18 px text safe-area risks `0`, same-page text collisions `0`;
- Q&A page: native text `22`, visible IMAGE roles `2`, 18 px text safe-area risks `0`, same-page text collisions `0`.

The profile now reads as one dominant travel image plus a small overlapping memories cluster instead of a large photo followed by three evenly parked thumbnails.

Decision: `AC PREFERRED_PROFILE_QA_STUDY / VERIFIED_LOCAL / NOT_PRINT_READY`.

## Promotion / rollback state

Preferred visible studies:

- AC `1343:2` — profile/Q&A;
- U `1339:2` — story/timeline.

Hidden rollback/rejected studies:

- V `1339:54` renamed `ROLLBACK / V6_INSIDE_V...`;
- W `1341:2` — transport blocked;
- X `1341:53` — generated small support visually rejected;
- Z `1341:104` — stored timeline generated hash readback invalid/blank;
- AB `1342:2` — diagonal chronology visually rejected.

Nothing was deleted. V7 remains on hold.

## Current limit

V6 is not complete and is not print-ready. The major unresolved capability is still binary-safe transport of the high-resolution generated section masters into Figma. Until that changes, do not enlarge the known soft generated profile hash or treat the blank stored timeline hash as valid artwork.
