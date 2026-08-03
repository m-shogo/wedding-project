# Chunked binary transfer needs an independent quality gate

Date: 2026-08-03
Applies to: Rurubu V5 first; possible later project-wide use after repetition
Status: `TESTED / TRANSPORT VERIFIED / VISUAL CANDIDATE REJECTED / NOT PROMOTED`

## Source

Live V5 cover-hero experiment on semantic node `77:148 / IMG_HERO`, using hidden transfer node `80:18` and the Figma Plugin API.

## Hypothesis

A base64 image divided into bounded, read-back-verified chunks can be reconstructed inside Figma without relying on the blocked external upload endpoint, while preserving the existing semantic node and editable layout.

## Result

The transport mechanism succeeded:

- two chunks read back at exact lengths
- joined payload boundary checks passed
- decoded bytes matched the source exactly
- a Figma image hash was created
- the image was applied to the existing semantic node
- temporary transfer chunks were cleared

However, the deliberately tiny Q3 derivative showed severe posterization in the whole-spread screenshot and was rejected. The exact pre-test image hash was restored and screenshot-verified.

## Failure

Transport correctness did not produce visual correctness. A low-byte image can pass every payload and node-integrity check while still failing the dominant editorial role.

The first apply script also called unsupported `figma.commitUndo()` and failed atomically. Runtime capability must outrank broad API-reference availability.

## General principle

Treat binary transport and derivative quality as independent gates:

1. payload integrity
2. exact node placement
3. live image hash
4. screenshot quality at whole-item scale
5. actual-size detail quality
6. rollback verification

A technically perfect transfer of a poor derivative remains rejected.

## Adopted process change

- bounded chunk transfer is now a proven fallback candidate for environments without external upload access
- every chunk requires exact length and readback checks
- the decoded byte count must match the local derivative
- temporary chunks must be cleared
- the previous live image hash must be captured before replacement
- screenshot QA occurs before ledger promotion
- unsupported Plugin API methods are removed after one atomic failure rather than retried blindly

## Next application

Repeat the same transport mechanism with an existing Q60/Q85/Q95 `1330 × 1220` derivative. Promote the method beyond V5 only after a quality-passing image completes screenshot QA, structure QA, ledger update, and GitHub readback.
