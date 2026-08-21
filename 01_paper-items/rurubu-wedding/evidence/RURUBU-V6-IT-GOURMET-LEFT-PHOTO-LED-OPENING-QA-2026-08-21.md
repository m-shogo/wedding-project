# Rurubu V6 IT — Gourmet / Cafe photo-led opening QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem selected

A fresh common-scale comparison of `IQ + IP + IR + IH + IS + IM` selected the Gourmet/Cafe left page as the next weakest visual surface. The existing lead cafe photo was legitimate and strong, but a large `01` plus a narrow multi-line title column beside the photo made the page read like an image with a squeezed sidebar rather than a continuous Japanese travel-magazine feature.

## Rollback-safe test

- Source preferred before test: IS `2110:2`.
- Clean-room duplicate: IT `2116:65`.
- IT left page: `2116:66`.
- IT right dining page: `2116:96`; inherited unchanged from IS.
- Existing lead image preserved: hash `c1ada11205bc3978bf426b304d683f1c1566cac2`.
- Existing support waterfront image preserved: hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- No image generation, Drive save, upload, new image hash, card, shadow or gradient was added.

The left page was rebuilt around a wider dominant cafe photograph, a direct large `01` at the photo edge, a broad native Japanese headline/copy field below the photograph, a compact three-point cafe memo, and a smaller unequal `02` waterfront feature. Redundant closing copy/micro-notes were hidden rather than deleted.

## Intermediate repairs

- First candidate placed `01` behind the lead image in z-order; the numeral was brought above the photograph.
- First `02` stack put title/copy too tightly beneath the support photo; it was re-composed as a side-by-side editorial beat.
- Structure QA then found four text-box contacts. The `02` numeral/title/copy column was separated from the `01` copy/memo field and structure QA was rerun.
- One initial Figma script failed atomically because of an invalid right-page child lookup; it made no canvas mutation and the corrected method was used.

## Three-scale evidence

- Whole spread / 500 px: PASS.
- Reading spread / 1400 px: PASS.
- Actual-size left page / 794×1123: PASS.
- Visible native text on IT left: `16`.
- Visible IMAGE-fill nodes on IT left: `2`.
- Text intersections: `0`.
- 18 px text safe-area risks: `0`.
- Whole-page flattening: NO.
- Native variable text preserved: YES.
- Replaceable image roles preserved: YES.

## Promotion

- IT `2116:65` → `PREFERRED / V6_INSIDE_IT_GOURMET_LEFT_PHOTO_LED_OPENING_2026_08_21`, x=`273800`, y=`1300`, visible.
- IS `2110:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IS_GOURMET_AFTERGLOW_POSTCARD_CLOSE_2026_08_21`, x=`281000`, y=`1300`, hidden, not deleted.

Decision: `IT ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset evidence

Drive V6 root reverified during this run:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Asset lifecycle delta for this change: generated `0`, newly adopted generated `0`, new Drive saves `0`, external uploads `0`, new image hashes `0`.

## Boundary

This is dummy-design QA, not final print readiness. Final legitimate photography/copy, exact printer template, bleed/trim/fold requirements, PDF preflight and physical proof remain separate gates. V7 was not touched.
