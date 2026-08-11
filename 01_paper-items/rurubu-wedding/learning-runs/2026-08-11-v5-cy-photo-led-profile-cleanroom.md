# Rurubu V5 — CY photo-led profile clean-room

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority reread
Before writes, re-read project CLAUDE/README, live Figma pages and Working/Review state, GitHub comparator reconciliation, latest CX learning run, and Drive Q60 master. True Current outer `77:18` / inside `77:290` remained untouched.

## Visible problem
CX had improved Q&A hierarchy, but the left page still read as a safe sequence of heading band → two portrait blocks → questions. At whole-item and actual-size scale it remained too close to a tidy profile form rather than a Japanese travel-magazine feature.

## Principle tested
Use the production photography itself as the upper-page editorial field:
- enlarge profile A to a page-edge dominant crop;
- overlap profile B at a materially different scale;
- place the native Japanese profile headline and subtitle directly over the dominant photo;
- keep names and metadata as native editable text;
- keep one dominant Q1 pull quote and compact Q2/Q3 marginal notes;
- subtract the redundant Q1 horizontal rule rather than adding another container.

Expected improvement: stronger thumbnail silhouette, more aggressive travel-magazine crop/overlap, and less UI/form geometry.
Regression risk: overlay headline could lose contrast; enlarged Q1 number could collide with question text; photo expansion could disturb fold or hashes.

## CY candidate
Candidate: `V5_INSIDE_CY_CLEANROOM_PHOTO_LED_PROFILE_2026_08_11` — `859:2`.
Left page: `859:3`.
Right page: `859:132`.
Fold: `859:283`.

Initial screenshot exposed two real regressions: the overlay headline was behind the dominant photo because of layer order, and the enlarged Q1 treatment retained a redundant magenta horizontal rule. The headline/subtitle/SHOGO native text layers were brought above the photo, the redundant rule was hidden, and a title/subtitle plus Q1 microlabel intersection was repaired before adoption.

## Final evidence
- visible native text: 54
- production image fills: 6
- same-parent visible text intersections: 0
- fold: x `792.7000122070312`, y `0`, `2×1122.5`
- whole-spread screenshot QA: PASS
- actual-size left-page screenshot QA: PASS at 794×1123
- structure QA: PASS
- native text: preserved
- production image hashes preserved:
  - `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - `2359f635b4926a83e22ca1f9214e75c709291152`
  - `539c259be8036b481d06b4f76db9a39b407d90e8`
  - `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - `c09aa82e7b2ac75708707345c6f845452bf67663`

## Adoption / navigation
- CY adopted as strongest inside comparator.
- CX moved to `06_RURUBU_0811_STUDIES` with node ID preserved.
- Review snapshot updated to `BEST INSIDE — CY — source 859:2` (`861:2`).
- Start page updated to `CV outer / CY inside`.
- Working returned to exactly three active frames: CU Q60 receiver, CV outer, CY inside.
- Studies count is 50; old archive remains 138.

## Q60 status
Drive master was freshly materialized again as the exact JPEG: 155,439 bytes, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.
A fresh official Figma upload target for CU hero `834:134` was issued, but the runtime again failed DNS resolution for `mcp.figma.com` before any byte upload. No image mutation occurred.

Strict status: Drive verified YES; local bytes materialized YES; official target issued YES; POST completed NO; Q60 placed NO; Q60 visually verified NO.

## Gate
- outer best: CV `848:2` (composition/typography only; hero asset quality FAIL)
- inside best: CY `859:2`
- V5 photo role pass: 9/10
- dominant photo pass: 2/3
- V5 complete: NO
- V6 production started: NO

## Next application
On profile/editorial spreads, prefer photo as the page field with native typography layered into verified text-safe regions rather than placing a heading band above a photo block. Do not add decorative modules to compensate for the unresolved cover raster; next outer progress requires exact high-quality hero placement or a genuinely better verified replacement asset.
