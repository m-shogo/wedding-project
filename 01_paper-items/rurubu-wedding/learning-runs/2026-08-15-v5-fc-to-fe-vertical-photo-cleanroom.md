# V5 FC → FE vertical-photo clean-room experiment

Date: 2026-08-15
Scope: Rurubu WEDDING only
Starting GitHub main: `c917274142776e53457b398ce9e335b2f87360c0`

## Authority readback before writes
- project-wide and Rurubu authorities re-read
- shared learning system + Rurubu/non-Rurubu feeds re-read; non-Rurubu feed had no transferable verified lesson yet
- live Figma file `bfM0d4c9dCeBv5pCkJ3TNM` re-read
- Drive Q60 master/derivative inventory re-read; exact secondary derivative remains `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- Current `77:18 / 77:290` was not modified

## Visible problem
FC `1180:2` was improved over legacy V5 but its front still used a wide horizontal history-derived image band. At thumbnail and actual size this divided the cover into a cream masthead block, a horizontal hero section, then the stronger overlapping 02/03 collage. The result still read partly like stacked web sections rather than one continuous Japanese travel-magazine composition.

## Root-cause hypothesis
The main defect was not lack of another asset. It was the **orientation and role assignment of existing photography**. A long vertical photo spine should create stronger editorial continuity and allow the overlapping secondary images to function as true magazine cut-ins.

## Bounded clean-room test
1. Duplicated FC rollback-safely to FD `1185:2`.
2. Hid `EV_HERO_HISTORY_DERIVATIVE_NOT_Q60` instead of trying to enlarge or further crop it.
3. Promoted verified street image hash `439a719d73f28e8dd2889f2026cccb15f345ec63` into a `515 × 822.5` vertical photo spine.
4. Kept food image hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` as a large angled overlap.
5. Kept alternate destination image hash `c09aa82e7b2ac75708707345c6f845452bf67663` as a smaller lower-right secondary image.
6. Preserved the exact Q60 secondary chain in the clean-room copy: Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → FE Figma node `1186:189` → image hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.
7. Refined FD to FE `1186:2` by increasing Feature 02 typographic contrast/scale. Initial FE structure QA found one Feature 02 number/title text-box intersection; the title was moved to x=452 and the QA was rerun before promotion.

## Expected improvement
- one continuous photo-led page rather than horizontal section bands
- materially stronger asymmetric scale relationship
- clearer `01 → 02 → 03` editorial reading rhythm
- less dependence on the non-Q60 history proxy
- no need for additional card geometry or decorative UI containment

## Regression risk
- oversized vertical street image could expose source-detail limitations at actual size
- overlapping food photo could cover too much of the spine
- Feature 02 typography could become cramped on the rotated photo
- destination postcard could become too large for its 240×220 derivative provenance

## Evidence
### whole-item / thumbnail
FE whole spread rendered at 500px and 1000px comparison scale. The right cover remains legible at thumbnail scale and the photo spine reads as one composition rather than three horizontal sections.

### actual size
FE front `1186:132` rendered at natural `794 × 1123`. Street texture, 01 headline, angled food image, 02 caption, 03 callout and exact Yokohama postcard remained visually usable. The Q60 secondary was not enlarged beyond its bounded postcard role.

### structure QA
Final FE front:
- visible native text: 15
- visible IMAGE fills: 4
- absolute text intersections: 0
- bounded 18px text safe-area risks: 0
- fold guide: `1186:193`, x=`792.7000122070312`, width=`2`, height=`1122.5`
- image hashes:
  - `1186:133` → `c09aa82e7b2ac75708707345c6f845452bf67663`
  - `1186:164` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - `1186:177` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - `1186:189` → `644f449c3bf2001a94d4b822d2b55e2614c11042`

## Decision
`VERIFIED_LOCAL / ADOPTED`

FE `1186:2` was promoted to `BEST_CLEANROOM_OUTER_FE_REVIEW_2026_08_15`.
FC `1180:2` is retained as hidden rollback evidence.
FD `1185:2` is retained as hidden intermediate study evidence.
Inside EO remains unchanged.

## Image-generation decision
Generated: `0`.
New generated asset adopted: `0`.
New external binary placed: `0`.
Reason: this run proved the dominant visible defect was photo-role/orientation hierarchy, not lack of an asset. Generating another image would have added activity without first exhausting the stronger verified role redistribution.

## Remaining gate
V5 is **not complete**. Dominant Q60 master exact Figma provenance remains open, followed by final asset/print/fold reconciliation. V6 production remains not started.

## Cross-item learning candidate
**A continuous photo spine can outperform a wide hero band when a page already contains strong overlapping secondary photography.** Transfer only the diagnostic principle (orientation/role before adding assets), not Rurubu's specific collage, angles, colors, or photo choices.