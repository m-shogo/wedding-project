# V5 EJ — photo-led back-cover clean-room promotion

Date: 2026-08-12
Scope: Rurubu WEDDING V5 only

## Visible problem
EI's front had a strong destination-led hierarchy, but its back cover still read as a large flat-lay followed by loosely stacked photo/timeline modules. At whole-item scale it was the weaker half of the spread and would not be selected from scratch as the final outer.

## Principle / capability tested
Subtraction first, then rebuild the back as one photographic field plus one editorial information field. Preserve all accepted image hashes and native text while changing scale relationships materially: full-bleed main photograph, unequal overlapping support photographs, large solid Japanese headline, and a compact 3×2 travel-log rhythm. Avoid additional cards, rounded containers, gradients, and shadow decoration.

## Expected improvement
The back should read as a Japanese travel-magazine feature page rather than a scrapbook/dashboard: stronger first glance, fewer modules, more image continuity, more deliberate asymmetry, and a denser but calmer print rhythm.

## Regression risk
The enlarged photography could crowd the lower travel-log field; inherited micro labels/footer could survive under nested frames; timeline copy could clip at actual size; EI front and its still-open Q60 provenance must not be accidentally altered.

## Execution and evidence
- Safe duplicate: EI `1067:2` → EJ `1072:2`; Current `77:18 / 77:290` untouched.
- Back `1072:3`: main photo expanded to 793.7×760; two support photos set to materially different sizes/rotations; headline enlarged to 46px solid white; lower cream field carries the 3-column × 2-row travel log.
- First actual-size render exposed lower-row/footer crowding. Repositioned second timeline row and footer, then re-rendered.
- Actual-size render also exposed redundant `FRIENDS 01 / FRIENDS 02` micro labels. Exact nodes `1072:72 / 1072:74` were subtracted and the spread was re-rendered.
- Final visual QA: 500px whole-item thumbnail PASS; whole reading PASS; front 794×1123 PASS; back 794×1123 PASS.
- Final structure QA: native visible text 35; IMAGE fills 6; same-parent text intersections 0; bounded safe-area text risks 0; fold `1072:184` at x=792.7, width=2, height=1122.5.
- Review promotion: `1076:2`; EI review `1069:2` preserved hidden rollback; EG `1058:2` remains Best Inside.

## Asset lifecycle result
Fresh Drive readback confirmed the Q60 role derivative `RURUBU_V5_01_COVER_HERO__ROLE_560x514_Q60.jpg`, Drive ID `1YwRdAauE1-CtXV3VD08CEvn7b-lFYlGX`, 33,725 bytes, SHA-256 `473d1f844923fc9809c26ce3a04a1611db3da29d1841cdaf657e4ca2b2385383`. A bounded `figma.createImage` attempt failed atomically at base64 decode; no Figma node changed. Because the method failed and related transport methods have already failed, it was not repeated. EJ hero remains existing proxy hash `539c259...`; Q60 exact provenance stays OPEN.

## Decision
ADOPTED / PROMOTED: EJ outer. EG inside retained.

## Next application
Keep the full-bleed-plus-one-information-field pattern as a candidate grammar for V6, but only after V5 exact Q60 provenance closes. At actual-size QA, always inspect inherited nested micro labels and bottom-edge typography even when collision metrics are zero.
