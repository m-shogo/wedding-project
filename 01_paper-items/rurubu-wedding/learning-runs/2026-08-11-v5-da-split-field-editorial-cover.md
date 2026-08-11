# Rurubu V5 — DA split-field editorial clean-room

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority reread
Before writes, re-read `CLAUDE.md`, V5/V6 status, comparator authority, GitHub main, live Figma page/navigation state, CV/CZ/CY screenshots and structures, and the exact Drive Q60 cover derivative. True Current outer `77:18` / inside `77:290` remained untouched.

## Visible problem
CV and CZ still read as a polished web/editorial cover with one full-width hero followed by orderly feature blocks. Even after reducing the low-quality cover proxy, the composition lacked the hard asymmetric split, color-field interruption, and headline/photo interlock associated with a Japanese travel-information magazine.

## Principle tested
Create a materially different clean-room outer without adding card UI:
- reduce the unresolved proxy hero to a right-side destination field instead of letting it own the full width;
- establish a yellow destination field on the left and let the native `横浜 / ふたり旅。` headline cross from that field into the hero;
- use one cyan transition rule and one magenta feature rule as functional editorial anchors;
- keep feature 01 typographic, tilt feature 02 into it, and let feature 03 remain the large lower photographic anchor;
- preserve native editable text, existing image fills, rollback history, fold, and Current.

Expected improvement: unmistakable magazine silhouette at thumbnail scale, stronger asymmetric rhythm, less exposure of the low-quality proxy, and more purposeful color hierarchy.
Regression risk: Japanese headline wrapping, excessive yellow field dominance, text collisions, fold drift, and loss of photo hierarchy.

## Candidate and corrections
Working candidate: `V5_OUTER_DA_CLEANROOM_SPLIT_FIELD_EDITORIAL_2026_08_11` — `875:2`.
Front: `875:131`.
Hero proxy: `875:133`.
Fold: `875:186`.

The first actual-size render exposed an unacceptable wrap: `ふたり旅。` broke into `ふたり / 旅。`. This version was rejected. The native mixed-color headline was widened into the hero field and resized to 56 px; the magenta bar was widened with it. A second 794×1123 render confirmed the single-line `ふたり旅。` treatment.

## Visual evidence
DA was checked at whole-item/thumbnail scale and at actual-size front scale. Compared with CV, DA has a materially different silhouette: left yellow destination field, right photo field, headline crossing the boundary, nonuniform feature/photo relationships, and less visual monopoly by the proxy raster.

Final structure QA:
- visible native text: 37
- visible image fills: 7
- same-parent visible text intersections: 0
- fold: x `792.7000122070312`, y `0`, `2×1122.5`
- thumbnail / whole-item screenshot QA: PASS
- actual-size front screenshot QA: PASS at 794×1123
- native text: preserved
- Current artwork: unchanged

Visible image hashes remain existing verified/proxy material. No new generated image was adopted. Hero remains proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, so cover asset-quality gate remains FAIL.

## Drive readback
Fresh Drive raw-file readback reconfirmed `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. Local runtime SHA-256 recheck matched `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`. The file is still not placed in Figma and is not counted as placed or visually verified.

## Navigation and adoption
DA was promoted as the strongest outer composition comparator. Review snapshot: `878:2` (`BEST OUTER — DA — source 875:2`). CZ `867:2` and the superseded CV review snapshot `851:2` were moved to `06_RURUBU_0811_STUDIES`. Working now contains CU / CV / CY / DA only; Studies contains 52 top-level studies; Review stays focused at 8 top-level items. Start Here now declares `DA outer / CY inside`.

## Gate
- generated images this run: 0
- newly adopted generated images: 0
- DA placed: YES
- DA visually verified: YES
- DA structure verified: YES
- Q60 exact Figma placement: NO
- V5 photo role pass: 9/10
- dominant photo pass: 2/3
- V5 complete: NO
- V6 production started: NO

## Next application
When a required photo is temporarily weak, do not merely shrink it inside the same layout. Change the editorial architecture so the weakness no longer dictates the silhouette: use asymmetric destination fields, native type crossing image boundaries, and unequal photo scale. Once the exact Q60 or a genuinely stronger cover-role asset is available, re-run DA/CV comparison with the real raster before declaring V5 complete.