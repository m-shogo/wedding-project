# Rurubu WEDDING V6 AC / AD Inside QA — 2026-08-16

Scope: Rurubu WEDDING only. V7 remains HOLD.

## Live authority before write

- GitHub main observed immediately before evidence write: `089ac4a7ec37a3dda5a82ad7925399a42078ef62`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Start Here page: `845:2 / 00_RURUBU_START_HERE`
- Current preferred Profile/Q&A: `1343:2 / PREFERRED / V6_INSIDE_AC_PHOTO_LED_PROFILE_QA_2026_08_16`
- New preferred chronology: `1348:2 / PREFERRED / V6_INSIDE_AD_TRAVEL_MAG_CHRONOLOGY_2026_08_16`
- Previous chronology U retained rollback-safe as hidden comparison: `1339:2 / COMPARISON / V6_INSIDE_U_EDITORIAL_TIMELINE_DESTINATION_2026_08_16`
- Start Here status synchronized to `V5 FU/FX · V6 M + AC/AD INSIDE STUDIES · V7 HOLD`.

## AD chronology — visible problem

U was structurally safe but still read too much like a timeline diagram: a horizontal route rail and evenly legible milestone markers organized the lower page before the photography did. This was inconsistent with the desired Japanese travel-information-magazine reading rhythm.

## Bounded clean-room test

AD was cloned from U so all verified copy, image hashes, replaceable roles and rollback evidence remained available, then only the right chronology page was materially recomposed.

Changes:

- removed the visible route rail and its milestone-dot diagram cues;
- preserved the large feature photography at the top;
- rebuilt six events as uneven/staggered photo clusters rather than a rail/card sequence;
- retained all six event photos as independently replaceable IMAGE roles;
- added large native `01–06` number anchors instead of baking numbers into decoration;
- kept dates, titles and descriptions as native editable text;
- made `2026.10.24 / WEDDING` a distinct lower-page destination with a larger final photo rather than another equal event card.

No new generated background, decorative card grid, shadow system or gradient was added.

## Three-scale visual QA

- whole spread: `1400×990` — PASS;
- thumbnail: longer edge `500 px` — PASS; the right page still reads as one large feature photo followed by an irregular chronology rather than a uniform grid;
- actual-size right page: `794×1123` — PASS after moving the final WEDDING copy above its destination photo.

Observed result: AD has a materially more photo-led, asymmetric magazine scan path than U. The route-rail/diagram reading has been removed without sacrificing chronological comprehension.

## Structure QA

Right chronology page `1348:14`:

- visible native text: `27`;
- visible IMAGE roles: `9`;
- replaceable IMAGE roles: `9`;
- 18 px safe-area risks across visible text/images: `0`;
- visible text/image nodes outside page bounds: `0`;
- generated timeline module remains hidden and is not part of the adopted visual result.

Replaceable image hashes remain explicit on the semantic photo roles; native text remains independently editable.

## Generated Profile v2 transport experiment

Drive high-resolution master:

- `RURUBU_V6_PROFILE_SECTION_ROLE_v2.png`
- Drive ID: `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- MIME: `image/png`
- Drive readback size: `2,308,995 bytes`

The master was fetched from Drive and materialized locally. Because the previously recorded `upload_assets` DNS failure fingerprint had already repeated, that transport path was not retried.

A role-aligned derivative was instead transported through `figma.createImage(Uint8Array)` and produced a new Figma image hash:

- `7a4c99c3235a073ff9afe468651d6f3ccbcd43a6`

Study frame:

- `1350:2 / REJECTED_VISUAL / V6_INSIDE_AE_GENERATED_PROFILE_ALIGNED_INLINE_JPEG_2026_08_16`

The semantic alignment concept worked: native profile copy and replaceable photos could sit over the generated blank photo/profile/snapshot zones. However, the code-sized inline JPEG derivative was visibly blocky/soft at page scale. Therefore AE was **not adopted** and was hidden. The Drive PNG master itself is not rejected; only this compressed transport derivative is rejected for visual production use.

## Decision

- Profile/Q&A preferred remains **AC `1343:2`**.
- Chronology preferred changes **U → AD `1348:2`**.
- AE generated-profile alignment: **transport/role-alignment proof only, REJECTED_VISUAL for production**.
- V7 remains HOLD.
- V6 is not declared complete or print-ready; continued improvement is still required.
