# Inline image format compatibility is a separate gate

Date: 2026-08-04
Scope: Rurubu V5/V6 and later Figma image-transfer work
Status: `PROTOTYPED / RUNTIME-SPECIFIC / NOT PROJECT_RULE`

## Context

The V5 back-cover main image had a verified role-sized WebP derivative in Drive. External upload was unavailable, so the derivative was reconstructed inside Figma from verified base64 chunks.

## Observation

The payload passed chunk-length, total-length, and decoded-byte checks, but `figma.createImage()` rejected the WebP bytes as an unsupported image type. The visual mutation was atomic and did not occur.

## Root cause

Image support differs by execution path:

- a format may be valid in Google Drive
- a format may be valid in a browser
- a format may be accepted by Figma's external asset-upload service
- the same format may still be rejected by the specific in-editor Plugin API runtime

Transport integrity therefore does not establish format compatibility.

## General principle

Treat these as independent gates:

1. source and crop quality
2. derivative visual quality
3. binary transfer integrity
4. decoder/runtime format compatibility
5. live node placement
6. screenshot and structure QA

Do not infer one from another.

## Process change

- For network-independent `figma.createImage()` transfers in the current runtime, prefer a bounded JPEG or PNG proof before preparing large batches.
- Validate expected chunk lengths and decoded bytes before calling `createImage()`.
- Keep the Current image hash until the replacement passes screenshot QA.
- Clear all staging data after success or rejection.
- Do not mark a role complete on successful byte reconstruction alone.

## Evidence

- target node: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- pre/post live image hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- rejected WebP test bytes: `17,686`
- rejected WebP SHA-256: `01978467ce182404116ddd1af88f7de5eaee5d1e0922475c0130eaabfbda9a16`
- exact error: `Image type is unsupported`
- staging cleanup verified: `true`
- JPEG fallback Drive ID: `1yZIwZ5cdLf_qAXe2BI9Yt5RsH5yE8q8V`

## Next application

Prototype the JPEG fallback on the same bounded node. Promote this lesson only after JPEG or PNG succeeds and the result passes visual and structural QA.