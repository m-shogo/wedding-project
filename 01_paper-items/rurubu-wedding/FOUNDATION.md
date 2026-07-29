# るるぶWEDDING Foundation

Status: FOUNDATION_READY_FOR_FIGMA / PRINT_VENDOR_VALUES_PENDING
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Fixed geometry
- finished format: A4二つ折りプロフィールブック
- spread: 420 × 297 mm
- fold: vertical center at 210 mm
- page roles: left/back cover + right/front cover for the outer spread
- front cover priority: `るるぶ WEDDING` → couple hero photo → `YOKOHAMA 2026.10.24` → PICK UP treatment → 4–6 feature lines
- back cover priority: `OUR TRAVEL NOTES` → memories / friends / history as travel-magazine editorial modules

## Print values deliberately not frozen yet
The Drive research explicitly says paper, exact print size and bleed must be finalized with the actual print conditions. Therefore the following are not guessed or promoted to Current:
- bleed amount
- trim-safe margin
- fold-safe margin
- paper stock
- printer/export profile

Until those values are confirmed, Figma foundation may show clearly named provisional guides, but they must remain `PROVISIONAL` and must not be treated as production trim data.

## Figma foundation order
1. create the 420 × 297 mm-equivalent spread frame
2. add named center-fold guide
3. add separate Front Cover / Back Cover containers
4. establish color variables and text styles before visual decoration
5. create native title/date/hero-photo placeholder first
6. introduce frozen SVG assets one at a time
7. compare 2–3 monochrome wireframes before committing to color

## Asset discipline
- one fixed asset per source file
- no asset sheets
- raster files with baked checkerboard/background pixels remain REJECTED
- SVG candidates are preferred because they are transparent by construction and editable in Figma
- candidate assets stay CANDIDATE until seen in the real spread and passed through visual QA

## Stress-test requirements before QA
- long Japanese/Latin names
- 4–6 cover feature lines with longest realistic copy
- mixed portrait/landscape photo ratios
- dense guest/friend photo module
- history/timeline copy with line wrapping
- all text checked for trim/fold collision after print values are confirmed

## Exit criteria for Foundation
Foundation is complete enough to start wireframe when:
- spread and fold structure exist
- front/back semantic containers exist
- Variables/Text Styles are established
- provisional vs production print guides are visibly distinguished
- no decoration is required to understand the hierarchy

Final print-readiness still requires vendor-specific bleed/safe/export values.
