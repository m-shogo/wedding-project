# Lesson — Base64 character count is not binary integrity

Date: 2026-08-03
Context: Rurubu WEDDING V5 image transfer
Status: `TESTED / REJECTED_METHOD / PROJECT_RULE_NOT_PROMOTED`

## Source

V5-07 intended Drive master and a visually accepted `352 × 368` JPEG derivative saved to Drive as file ID `1b6ELbuMRenOCfAI7RNygNyIJoWEg3fMv`.

## Hypothesis

A derivative whose encoded payload appeared to fit inside the Figma tool code limit could be imported in one bounded `use_figma` call without external networking.

## Result

Figma rejected the supplied payload as invalid base64 before any mutation. The failure was atomic. The target semantic node and live design remained unchanged.

## Failure

The encoded string was altered or truncated somewhere in the model-visible/tool-argument path. Staying below a nominal character limit did not prove exact binary preservation.

## General lesson

For production image placement, payload-size estimates and successful text transport are not binary-integrity evidence. A candidate transfer route must include exact source length, chunk lengths, ordered readback, joined length, decode length, and preferably a checksum before creating a Figma image.

## Process change

- do not retry one-call long base64 image imports
- retain Drive-verified derivatives for a binary-safe route
- require per-chunk readback and exact reconstruction before any live node mutation when chunk transfer is used
- keep photo-role counts unchanged until screenshot and structure QA pass

## Next application

Apply this lesson to V5 dominant-image repair and all later V6 assets. Do not promote it into a broad project rule until a checksum-verified alternative succeeds end to end.
