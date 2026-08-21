# 2026-08-21 — Rurubu V7 professional clean-room E

Scope: Rurubu WEDDING only
State: `TESTED_LOCAL / PARTIAL_VISUAL_REJECT / CONTINUE_V7`

## New knowledge that changed the design decision

- W3C JLReq/Japanese Script Resources reinforced that headline, body, notes, figures and the basic text area belong to one composition system. V7 therefore uses Noto Sans JP / Noto Serif JP hierarchy and verifies Japanese line breaks at actual size instead of treating type as labels around boxes.
- Pentagram's flexible-editorial-grid approach changed the plan from “repeat one good spread template six times” to “one publication voice, different tempo by page role.”
- Current JAGDA 2026 book/editorial recognition reinforced publication-level sequence as a professional quality dimension.

## Real experiment

Fresh blank-frame V7 studies created:

- Outer E `2153:38`
- Profile/Q&A E `2153:67`
- Story/Chronology E `2155:23`

No V6 frame was duplicated and no V6 image hash was intentionally reused.

## Figma failure learned

Initial Profile/Q&A structural QA found four text-box overlaps around 01/02/03 question numbering. The fix was not a font-size reduction; question text was moved out of the large-number optical field and Q1 answer was given more vertical separation. Final intersections: `0`.

Failure fingerprint candidate: large editorial numerals need explicit optical exclusion space; decorative overlap is not automatically acceptable because the spread is “magazine-like.”

## Visual failure learned

The new in-file generated lagoon, flatlay and beach rasters proved the binary/authoring path but failed the professional-art-direction gate. At reading and actual size they read as simplified geometric clip-art rather than convincing travel editorial.

Fingerprint: `F-RSL-184-TRANSPORT-SUCCESS-ASSET-CRAFT-FAIL`.

Corrective consequence: do not repeat the same simplistic faux-photographic geometry for the remaining V7 spreads. Story/Chronology switched toward a semantically functional route-map raster, which was more defensible but still not preferred.

## Asset lifecycle truth

- generated/composed in Figma and placed: YES
- native semantic text preserved: YES
- V7 Drive folder created: YES
- four Drive master counterparts saved: YES
- official Drive/local → Figma upload confirmed: NO; one DNS failure matched the existing fingerprint
- fallback in-file raster transport: YES
- visually preferred/adopted: NO

This run therefore demonstrates learning and production capability, not a final visual win.
