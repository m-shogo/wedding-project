# Rurubu V5 cover Q60 guarded chunk transfer — 2026-08-08

Status: `PROTOTYPED / RESUMABLE / CURRENT_UNCHANGED`

## Source / visible problem

- Source authority: live Figma Current `77:18`, current cover hero `77:148`, rollback-safe Q60 staging `469:2 / 469:132`, V5 asset evidence ledger, Drive Q60 derivative.
- Visible problem: the Current cover hero remains visibly soft/pixelated at whole-cover and detail scales and is the final dominant-photo blocker (`PHOTO_ROLE_PASS 10/11`, dominant `2/3`).
- Verified Q60 Drive derivative: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, `1330×1220`, `155439 bytes`, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.

## Hypothesis / capability tested

A high-quality dominant image should not be recompressed merely to accommodate transport. Instead, preserve the verified Q60 derivative and reconstruct it inside the rollback-safe staging node using bounded textual chunks with strict encoded-length/readback guards before any image-fill mutation.

## Results

1. Native asset upload remained blocked at the external `mcp.figma.com` transfer boundary, so the same failed route was not repeated.
2. Direct network fetch from the Figma runtime is unavailable (`fetch` and other network/runtime primitives are absent).
3. A 16,000-character transfer chunk proved unsafe: the received/read-back string was truncated, so the operation stopped before image mutation.
4. Smaller guarded chunks are reliable in this environment. Verified resumable staging metadata on `469:132` now contains:
   - `c00 = 8000`
   - `c01 = 12000`
   - `c02 = 12000`
   - `c03 = 8000`
   - `c04 = 8000`
   - `c05 = 8000`
   - total verified encoded payload stored = `56000` characters
5. A later `c06` attempt had a syntax-boundary error before storage; readback confirms `c06 = 0` and therefore no corrupt chunk was adopted.
6. Live staging image hash is still the old `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`; Current `77:148` was not changed.

## Expected improvement

After the remaining verified chunks are stored, the full `207252`-character base64 payload will be reassembled and decoded. Adoption requires exact decoded size `155439 bytes`, valid JPEG SOI/EOI markers, a new Figma image hash on staging, and visibly sharper skyline/water/rail/building detail at actual-size review without changing semantic geometry or crop intent.

## Possible regression

- silent text truncation producing a corrupt JPEG;
- wrong image paint index or accidental Current mutation;
- crop/scale-mode drift;
- accepting a transport success without visual QA;
- reducing JPEG quality only to make transport easier.

## Evidence required before adoption

- every stored chunk exact-length readback;
- reconstructed encoded length exactly `207252`;
- decoded bytes exactly `155439` and valid JPEG markers;
- staging node `469:132` receives a new image hash and preserves `FILL` semantics;
- whole-item, cover-reading, and actual-size/detail screenshot QA;
- comparison against Current and clean-room cover `413:2`;
- structure QA, fold/safe-area plausibility, rollback preservation;
- ledger/status/learning-log updates and GitHub readback.

## Adopt / reject state

- Guarded small-chunk transport method: `PROTOTYPED`, not yet a PROJECT_RULE.
- 16k chunk method: `REJECTED` for this environment.
- Q60 staging candidate: `NOT YET ADOPTED`.
- Current V5 completion counts: intentionally unchanged.

## Next application

Resume from the first missing chunk on `469:132`. Do not resend already verified chunks. Only after full binary integrity and three-scale visual QA may the new image hash be promoted to Current `77:148`. V6 production remains gated until V5 dummy-design QA is fully verified.
