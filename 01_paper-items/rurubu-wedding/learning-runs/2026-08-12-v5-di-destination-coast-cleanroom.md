# Rurubu V5 — DI destination-coast clean-room

Date: 2026-08-12
Scope: RURUBU WEDDING only
Status: ADOPTED AS BEST OUTER COMPARATOR, NOT CURRENT

## Visible problem

DH was materially cleaner than legacy Current, but its dominant camera/map/rings flat-lay still read first as a wedding-props/lifestyle styling page. At thumbnail scale the cover did not produce the immediate destination-photography silhouette expected from a Japanese travel-information magazine. The lower feature region also risked drifting back toward spacious lifestyle-editorial composition.

## Principle / capability tested

Use an already verified high-quality travel-memory photograph as the dominant photographic surface, while preserving factual honesty by explicitly identifying it as travel memory rather than the exact Yokohama location. Keep the unresolved Yokohama image as a small semantic destination anchor until the exact Q60 lifecycle can be completed. Build density with native Japanese hierarchy and unequal feature scale instead of cards.

## Implementation

- Safe duplicate of DH: DI `925:2`; Current `77:18` and `77:290` were never edited.
- Front: `925:131`.
- Dominant photo: `925:132 / DI_DOMINANT_DESTINATION_COAST`, existing verified hash `adbb8e529451a81dd25e4eb29bf068655569ce25`, resized to 793.7 × 790.
- Exact-destination proxy remains only as `925:134 / DI_YOKOHAMA_DESTINATION_ANCHOR_PROXY_SMALL`, hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, 184 × 132, tilted and subordinate.
- Added native label `TRAVEL MEMORY / 旅の記憶` so the coast photograph is not represented as Yokohama.
- Removed the dark masthead background field; masthead now sits directly on photography.
- Pushed cream feature paper down and retained giant 01 hierarchy.
- Restored 03 `ゲストと楽しむ横浜案内` as direct native type to fill editorial dead space without a card/grid.
- First structural pass found one `CE_KICK` / `CS_MAIN` text-box collision. It was repaired before adoption.

## Expected improvement

At whole-item and thumbnail scale, the cover should read as travel-information editorial before it reads as wedding stationery. At actual size, dominant destination atmosphere, large Japanese headline, direct-on-photo secondary feature, small factual inset and dense lower feature hierarchy should provide a more Rurubu-like rhythm.

## Regression risk

The dominant coast photograph is not asserted to be Yokohama. If the `TRAVEL MEMORY / 旅の記憶` semantic label is removed or the small Yokohama anchor is lost, the composition could imply a false destination. Q60 therefore remains an explicit unresolved asset-lifecycle blocker. Do not enlarge the low-quality proxy simply to increase Yokohama specificity.

## Evidence

- Thumbnail 500px QA: PASS.
- Whole-spread reading QA: PASS.
- Actual-size front 794 × 1123 QA: PASS.
- Visible native text: 39.
- Visible image fills: 7.
- Same-parent text intersections after repair: 0.
- Fold: `925:190`, x=792.7000122070312, y=0, 2 × 1122.5.
- Review promotion: `930:2 / BEST OUTER — DI — source 925:2`.
- Previous DH review `922:2`: hidden rollback, preserved.
- Start Here: `DI outer / DF inside`.
- Current originals: outer `77:18`, inside `77:290`, unchanged on final live readback.

## Asset / progress classification

Generated this run: 0. Newly adopted generated assets: 0. New external binaries placed: 0. Existing verified photography reused as dominant: yes. DI layout placed: yes. DI visually verified: yes. DI structure verified: yes. Q60 exact Figma placement: no. Q60 visual verification: no.

## Adoption and next application

ADOPT DI as the strongest outer comparator, not as Current. Preserve DH as rollback. Next high-value application is exact replacement of only the small Yokohama semantic anchor with the verified Q60 derivative when a functioning binary path is available. Do not reopen V6 until the remaining V5 destination asset lifecycle and full gate are genuinely verified.
