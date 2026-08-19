# Rurubu WEDDING V6 — GN / GO Reader-Facing Microcopy QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Source problem

The preferred V6 review board was visually mature, but Profile/Q&A and Story/chronology still contained small labels that read like generic production-template role names rather than finished Japanese travel-magazine microcopy. The Q&A page also repeated the same closing meaning twice at the bottom.

## Root-cause hypothesis

When layout hierarchy and photography are already working, generic role-like English microcopy or duplicated helper copy can preserve an AI-template / work-in-progress feeling. Reader-facing native editorial language can remove that residue without adding cards, images, or fixed decoration.

## GN — Profile / Q&A

Source: GA `1922:2`.
Candidate/adopted: GN `1957:2`.
Rollback: GA renamed and hidden.

Bounded changes only:

- `TRAVEL PROFILE` → `ふたりの旅プロフィール`;
- `TRAVELER DATA / 6 NOTES` → `6つの旅メモ`;
- duplicate bottom kicker `これからも、ふたりの旅はつづく。` hidden while retaining the stronger native closing `ふたりの旅は、つづく。`;
- no photo, crop, Q&A answer, geometry, image hash, or composed-raster changes.

Evidence:

- whole spread 1200px: PASS;
- left actual-size `794×1123`: PASS;
- right actual-size `794×1123`: PASS;
- Profile visible native text: `26`;
- Q&A visible native text: `29`;
- absolute text collision: `0` on both pages;
- 18px text safe-area risks: `0` on both pages;
- image roles unchanged: Profile 4 IMAGE roles, Q&A 2 IMAGE roles.

## GO — Story / chronology

Source: GI `1950:2`.
Candidate/adopted: GO `1958:2`.
Rollback: GI renamed and hidden.

Bounded changes only:

- `YOKOHAMA / EVENING WALK` → `横浜 / 夕暮れさんぽ`;
- `NEXT DESTINATION / YOKOHAMA` → `次の目的地 / 横浜`;
- `CAFE MEMORY / 休日の一枚` → `休日のカフェ`;
- `PHOTO STORY / 01—06` → `6つの景色 / 01—06`;
- `SCENE 01 / 旅のはじまり` → `01 / 旅のはじまり`;
- `FINAL DESTINATION / 06` → `06 / 今日という目的地`;
- no photo, crop, chronology geometry, image hash, or composed-raster changes.

Evidence:

- 500px thumbnail: PASS;
- 1200px reading spread: PASS;
- Story actual-size `794×1123`: PASS;
- chronology actual-size `794×1123`: PASS;
- Story visible native text: `12`;
- chronology visible native text: `32`;
- absolute text collision: `0` on both pages;
- 18px text safe-area risks: `0` on both pages;
- image roles unchanged: Story 4 IMAGE roles; chronology 2 IMAGE roles.

## Adoption state

`GN = ADOPTED + PLACED + VISUALLY_VERIFIED + STRUCTURE_VERIFIED`

`GO = ADOPTED + PLACED + VISUALLY_VERIFIED + STRUCTURE_VERIFIED`

Generated assets this run: `0`.
Adopted generated assets this run: `0`.
Drive saves this run: `0`.
External binary placements this run: `0`.
New image hashes this run: `0`.

## Regression risk

Do not globally remove English from Rurubu. Short intentional English category/masthead language may still contribute to the genre. The treatment applies to small labels whose wording reads primarily as internal role metadata, generic template filler, or duplicated helper copy.

## Result

Adopted. Both candidates reduce work-in-progress/template residue while preserving native-editable text, replaceable photography, rollback history, and the existing V6 editorial geometry.