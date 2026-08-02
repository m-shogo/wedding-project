# るるぶWEDDING V5 — Overnight Quality Checkpoint

Date: 2026-08-02 21:03 JST
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `01_RURUBU_WEDDING`
Outer frame: `77:18`

## Editorial problem

The cover hero used the intended Drive master, but its prior transfer derivative was only `5,927 bytes`. The whole-spread screenshot showed conspicuous block pixelation, so transport success had been incorrectly close to a visual-success state.

## Principle applied

- dominant photography outranks decorative polish
- Drive master and Figma derivative remain separate artifacts
- a successful image hash does not equal a quality pass
- crop for the actual semantic frame rather than the source orientation
- preserve the existing semantic node, native text, overlays, and rollback structure

## Verified change

Role: `V5-01 / IMG_HERO`

- Drive source ID: `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
- Drive source: `01_COVER_HERO_YOKOHAMA_DUMMY.png`
- Drive source size: `2,089,658 bytes`
- source dimensions: `1122 × 1402 px`
- target semantic node: `77:148`
- target box: approximately `665 × 610 px`
- new derivative: `640 × 587 px`, JPEG quality 45, `34,751 bytes`
- new Figma image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- node hierarchy and semantic role preserved
- whole outer-spread screenshot QA rerun after placement

## Visual result

The severe macro-block pixelation visible in the earlier whole-spread screenshot was removed. The Yokohama skyline, water, horizon, and sunset now read as a coherent photograph at spread scale.

This is a meaningful improvement, but not a final photo-role pass:

- the derivative is slightly below the target box width
- detail/actual-size sharpness is still limited by the inline payload ceiling
- final print resolution remains unverified

Therefore the truthful state is:

`INTENDED_SOURCE_APPLIED / SPREAD_SCALE_VISUAL_IMPROVEMENT_VERIFIED / DETAIL_QA_PENDING / PHOTO_ROLE_PASS_NOT_YET_GRANTED`

## Rejected attempt and lesson

A second dominant-image transfer for back-main node `77:24` failed atomically because a large base64 value was truncated before `figma.base64Decode()`. No Figma mutation occurred.

Reusable lesson:

- do not paste transfer payloads obtained from a tool response that may ellipsize long output
- generate a smaller bounded payload or use a binary upload path
- after one identifiable truncation error, change the method rather than retrying the same payload

## Next highest-value actions

1. obtain a non-truncated role-sized derivative for back-main `77:24`
2. apply history master to `77:422`
3. run outer and inside whole-spread screenshots
4. update the authoritative asset ledger after the next verified role transition
5. continue card/UI subtraction only after dominant-image quality is under control
