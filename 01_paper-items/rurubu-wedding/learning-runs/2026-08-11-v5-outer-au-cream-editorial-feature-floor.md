# 2026-08-11 — V5 outer AU cream editorial feature-floor QA

## Scope
Rurubu WEDDING V5 outer only. No other wedding item was touched.

## State re-read before write
- latest GitHub main after AT evidence commit: `3fadaf0bfad37e2ab9e249f4d64528d875c2d281`
- live Figma strongest outer comparator before experiment: `715:2 / AP`
- Current outer remains `77:18`
- Q60 cover derivative remains Drive-verified but not Figma placed

## Visible problem
AP is materially stronger than Current, but its lower third is a solid dark navy feature field. At whole-item scale it creates useful contrast, yet at actual size the large dark rectangle can still read as a designed navigation panel attached below the photograph rather than continuous Japanese travel-magazine editorial matter.

## Principle tested
Use subtraction rather than adding more decoration:
- replace the dark lower feature panel with a warm cream paper field;
- retain only one magenta issue kicker at the photo/paper seam;
- remove the long horizontal rail that resembled interface chrome;
- keep three stories as direct native typography with materially different scales;
- retain only short color-coded article rules as intentional editorial anchors;
- preserve the existing dominant photograph, two photo teasers, logo/date, semantic text and verified image hashes.

Expected improvement: less UI/panel reading, more print-native cover-index grammar and a clearer photographic-to-paper transition.

Regression risk: cream could become too quiet or spacious for a newsstand cover; the photograph could lose visual anchoring; small footer copy could lose contrast after the field-color change.

## Implementation
Created rollback-safe duplicate:
- `735:2 / V5_OUTER_RURUBU_CLEANROOM_AU_CREAM_EDITORIAL_FEATURE_FLOOR_2026_08_10`
- front page `735:129`

Changes:
- `AP_FEATURE_FIELD_NAVY` changed from dark navy to warm cream paper color;
- `AL_FEATURE_RAIL` hidden;
- magenta `今号の3大特集` kicker retained as the only full label at the seam;
- feature 01 number increased to 76 px in magenta, title 33 px navy;
- feature 02 number 42 px cyan, title 23.5 px navy;
- feature 03 number 42 px yellow, title 23.5 px navy;
- descriptions changed to dark neutral microtype on cream;
- short magenta/cyan/yellow rules retained as article anchors;
- no cards, pills, gradients, extra shadows or new decorative assets added.

## Screenshot-driven correction
Actual-size front screenshot exposed a real regression caused by the color-field change: the inherited footer rule/text were too light on cream. They were changed to dark navy/dark neutral and the footer microtype was raised to 8.5 px. A fresh actual-size screenshot verified the footer became readable again.

## Three-scale comparison
### Whole-item / thumbnail
`PASS_AS_COMPARATOR`.
At 500 px the cover retains a clear hierarchy: logo/title → dominant photo → overlapping photo teasers → one large 01 story + two smaller side stories. The cream field reads as page stock rather than an app-like dark panel.

### Reading / page scale
`PASS_AS_COMPARATOR`.
The feature cluster remains dense enough to survive reading scale without equal-card repetition. The 01/02/03 color coding is visible but secondary to story hierarchy.

### Actual-size / detail
`PASS_AS_COMPARATOR_AFTER_FOOTER_FIX`.
Footer contrast was corrected. Feature text is native/editable and no same-parent visible text intersections were detected.

## Fresh structure evidence
- visible native text: `41`
- visible IMAGE-fill nodes: `8`
- visible text intersections: `0`
- fold guide: `735:170 / PROVISIONAL_FOLD_GUIDE / 2 × 1122.5`
- Current hero re-read: `77:148` still hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`; Current was not mutated

Verified image hashes preserved in AU:
- back main `735:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `735:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `735:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- temporary comparator hero `735:130` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `735:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `735:136` → `0cbbf09357938365c2550f08928be1db33fa6060`
- coast teaser `735:159` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- old-town teaser `735:160` → `439a719d73f28e8dd2889f2026cccb15f345ec63`

## Decision
`AU = ADOPT_AS_STRONGER_STRUCTURAL_OUTER_COMPARATOR_FOR_NEXT_Q60_TEST`.

Reason: compared with AP, AU reduces the strongest remaining panel/UI signal while keeping the asymmetry, photographic overlap and story-scale contrast. This is a structural decision only; the borrowed temporary hero is still not the cover-specific Q60 asset, so AU is **not** eligible for Current promotion.

Current promotion: `NO`.
V5 complete: `NO`.
V6 production: `NO`.

## Reusable lesson
1. A high-contrast dark feature zone can solve readability but still read as product UI; a paper-colored field with direct typography can retain hierarchy while feeling more print-native.
2. When subtracting a large color field, immediately re-check inherited footer/caption colors—contrast assumptions often depend on the old background.
3. A cream field must earn its space through scale contrast and compact microtype; it cannot become generic luxury whitespace.
4. Structural cover experiments remain provisional until the actual cover-specific dominant photograph is placed and visually tested.

## Next application
- use AU rather than AP as the first structural target if/when the verified Q60 binary can be placed safely;
- after Q60 placement, compare AU vs AP at thumbnail, page and actual-size scales before any Current promotion;
- if Q60 makes cream too quiet, preserve AP as rollback evidence rather than forcing AU to win.

Status: `AU_STRUCTURAL_OUTER_BEST_THIS_RUN / AT_INSIDE_BEST_THIS_RUN / Q60_NOT_FIGMA_PLACED / CURRENT_UNCHANGED / V5_GATE_OPEN / V6_NOT_STARTED`.
