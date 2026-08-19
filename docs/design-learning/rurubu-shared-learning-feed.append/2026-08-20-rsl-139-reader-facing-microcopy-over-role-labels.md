# RSL-139 — Reader-facing microcopy can remove residual template-role language

Date: 2026-08-20
Source scope/item: Rurubu WEDDING / V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Two materially different preferred V6 spreads were visually mature but still contained small labels that read like internal production-role names or generic template filler rather than finished reader-facing editorial language. Profile/Q&A also repeated nearly the same closing message twice.

## Evidence before change

- Profile/Q&A GA `1922:2`: `TRAVEL PROFILE`, `TRAVELER DATA / 6 NOTES`, plus duplicate closing kicker.
- Story/chronology GI `1950:2`: `YOKOHAMA / EVENING WALK`, `NEXT DESTINATION / YOKOHAMA`, `CAFE MEMORY / 休日の一枚`, `PHOTO STORY / 01—06`, `SCENE 01 / 旅のはじまり`, `FINAL DESTINATION / 06`.

## Root-cause hypothesis

Once hierarchy, photography, and page rhythm are already strong, small role-like labels can preserve an AI-template/work-in-progress feeling. Adding more decoration does not solve that semantic residue. Reader-facing native editorial language—or subtraction when a helper line merely duplicates the stronger statement—can improve finish without changing composition.

## Bounded tests

### GN Profile/Q&A

- rollback-safe duplicate from GA;
- `TRAVEL PROFILE` → `ふたりの旅プロフィール`;
- `TRAVELER DATA / 6 NOTES` → `6つの旅メモ`;
- hid only the duplicate bottom kicker while retaining `ふたりの旅は、つづく。`;
- no photo, Q&A answer, geometry, image-hash, or raster changes.

### GO Story/chronology

- rollback-safe duplicate from GI;
- converted six small role-like labels to reader-facing Japanese editorial captions;
- no photo, chronology geometry, image-hash, or raster changes.

## Expected improvement

Reduce production-template residue and strengthen finished Japanese editorial voice without introducing another card, image, badge, or visual system.

## Regression risk

Do not infer that all English should be removed. Intentional masthead, category, issue, brand, or genre language can remain valuable. Only target text whose main function reads as internal role naming, generic filler, or duplicated helper copy.

## Three-scale evidence

GN:
- whole spread 1200px PASS;
- left actual-size 794×1123 PASS;
- right actual-size 794×1123 PASS;
- text collisions 0;
- 18px text safe-area risks 0.

GO:
- 500px thumbnail PASS;
- 1200px reading PASS;
- Story actual-size 794×1123 PASS;
- chronology actual-size 794×1123 PASS;
- text collisions 0;
- 18px text safe-area risks 0.

## Figma / Drive / GitHub evidence

Figma:
- GN `1957:2` adopted; GA `1922:2` hidden rollback.
- GO `1958:2` adopted; GI `1950:2` hidden rollback.
- Start Here `845:27` updated to `V6 GB + GN/GO + GE + GJ + GD · V7 HOLD`.

Drive:
- authority root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- no new Drive saves or binary asset changes.

GitHub evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GN-GO-READER-FACING-MICROCOPY-QA-2026-08-20.md`
- `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gn-go-reader-facing-microcopy.md`

## Adopted / rejected / blocked status

GN: `ADOPTED / VERIFIED_LOCAL`.
GO: `ADOPTED / VERIFIED_LOCAL`.

## What must remain Rurubu-specific

Do not transfer the exact Japanese phrases, travel-magazine tone, section names, folio language, palette, hierarchy, photography, or layout to other Wedding items.

## Cross-item applicability hypothesis

On another print artifact, when small visible copy reads like an internal layer/role/template label rather than reader content, independently test whether reader-facing native copy—or deletion of a duplicated helper line—improves finished quality without weakening navigation, semantics, physical function, or hierarchy.

## Next receiving-item experiment

Only test this on a materially different item if its own reader-visible microcopy has a similar internal-role/template residue. Preserve deliberate English brand/category language unless the receiving item's own evidence shows it is the defect.