# V5 chunked Figma image transfer proof and Q3 rejection

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Target semantic node: `77:148 / IMG_HERO`

## Source

- master authority: Drive master `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
- accepted role-sized derivative already preserved in Drive: `1wcYwYVj3gavM0YGO1_Jn52fL11AvSHIn` (`1330 × 1220`, Q95, `667,843` bytes)
- transport-test derivative: same role crop, `1330 × 1220`, JPEG Q3, `17,976` bytes
- target box: `665 × 610`

## Visible problem

The live cover hero remains visibly soft and below the dominant-photo quality target. The previous direct upload route was blocked because the execution container could not reach the Figma upload endpoint.

## Principle or capability tested

Test whether a binary asset can be transferred without external network access by splitting its base64 representation into bounded chunks, storing those chunks temporarily as shared plugin data on hidden transfer node `80:18`, joining and decoding them inside the Figma Plugin API runtime, and applying the resulting image to the existing semantic node.

## Expected improvement

- prove a network-independent binary-safe transport method
- preserve node `77:148`, native text, layout hierarchy, crop editability, and rollback safety
- enable later transfer of a quality-passing derivative rather than repeatedly using extremely small inline payloads

## Possible regression

- chunk corruption or truncation
- temporary shared data left in the file
- accidental replacement of the Current hero with a visibly inferior derivative
- false completion based only on a new image hash

## Execution and integrity evidence

1. Base64 was split into two chunks: `12,000` and `11,968` characters.
2. Each chunk was written to hidden node `80:18` and read back with exact length and boundary checks.
3. The chunks joined to `23,968` characters and decoded to exactly `17,976` bytes inside Figma.
4. `figma.createImage()` succeeded.
5. Existing node `77:148` was preserved and received temporary image hash `74abf6afa7da24df9ca2bfb0846365973fdb55a2`.
6. Temporary shared-data chunks were cleared after the import.

## Screenshot result

`REJECTED_VISIBLE_POSTERIZATION`

Whole-spread screenshot QA showed severe posterization, block boundaries, lost tonal transitions, and damaged photographic detail. The image was clearly worse than the pre-test live hero and could not pass whole-item, reading, or actual-size detail review.

This was an intentional transport proof using an aggressively compressed derivative. It does not count as intended-source application, derivative QA pass, photo-role pass, or visual completion.

## Rollback verification

The exact pre-test live image hash was captured as:

`e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

After rejection, node `77:148` was restored to that hash. A post-rollback whole-spread screenshot confirmed that the posterized image was removed and the previous live design returned. Semantic node identity and surrounding editable structure remained intact.

## Failure discovered

`figma.commitUndo()` is listed in broad Plugin API references but is not supported by the current `use_figma` execution runtime. The first apply script therefore failed atomically before changing the file. The corrected script omitted that unsupported method and succeeded. Do not use `commitUndo()` in this runtime without a fresh capability check.

## Additional evidence issue

The actual pre-test live hash `e58dd...` differs from the older hash recorded in the asset ledger. This confirms that the ledger's V5-01 live-hash field is stale and must not be used as source-identity proof until reconciled against live Figma. No completion count was increased.

## Decision

- chunked shared-plugin-data transfer: `PROTOTYPED → VERIFIED AS TRANSPORT CAPABILITY`
- Q3 derivative: `REJECTED`
- project-wide permanent rule: `NOT PROMOTED YET`
- live Current candidate: restored; no visual adoption

## Next application

Use the proven chunked route with a quality-passing derivative, beginning with the existing Q60/Q85/Q95 role-sized candidates. Transfer in bounded groups with exact chunk-count, length, decoded-byte, and boundary verification. Apply to `77:148`, run whole-spread and actual-size screenshot QA, and adopt only if it visibly improves the hero. Reconcile the live hash in the asset ledger only after the accepted derivative has passed source, screenshot, and structure QA.
