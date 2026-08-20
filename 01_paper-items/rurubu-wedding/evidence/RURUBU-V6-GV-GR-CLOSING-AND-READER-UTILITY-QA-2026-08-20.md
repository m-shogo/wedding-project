# Rurubu V6 GV / GR visual QA — 2026-08-20

Scope: `01_paper-items/rurubu-wedding` only. V7 not touched. No non-Rurubu production surface inspected or edited.

## Authorities read before writes

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/rurubu-shared-learning-feed.md`
- `docs/design-learning/non-rurubu-shared-learning-feed.md`
- current Rurubu V6 status
- live Figma preferred nodes
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## GV Outer — full-width WEDDING closing beat

Source: GU `1975:2`.
Candidate/adopted: GV `2006:2`; back `2006:3`.
Rollback: GU hidden.

### Visible problem

GU back chronology closed with `06 / date / WEDDING` compressed into a left-side cluster while a large lower-right cream field remained visually accidental.

### Bounded change

- enlarged native `06` to 72px;
- expanded `WEDDING` to 46px and 560px text width;
- kept authoritative `2026.10.24` native and placed it above WEDDING;
- no photo/crop/hash/content fact changes.

### Rejected intermediate states

1. `06` wrapped vertically due to insufficient text-box width.
2. structural QA then found `06` touching date/WEDDING by 6–8px.

Both were corrected before promotion.

### Evidence

- whole spread screenshot ~700px: PASS;
- actual-size back screenshot `794×1123`: PASS;
- visible back native text: 21;
- text collisions: 0;
- 18px safe-area risks: 0;
- generated: 0;
- Drive save: 0;
- new binary placement: 0;
- new image hash: 0.

Decision: ADOPTED / VERIFIED_LOCAL.

## GR 1DAY Plan — Japanese-first reader utility copy

Source: GQ `1968:71`.
Candidate/adopted: GR `2007:2`; left `2007:3`.
Rollback: GQ hidden.

### Visible problem

The 1DAY composition was already strong, but `TRIP DATA / MOVE / PACE / BEST / MOOD` and `OUR YOKOHAMA / FLEXIBLE DAY` still read as generic template/production labels at actual size.

### Bounded change

Native text only:

- `START / WATERFRONT` → `START / 海辺`
- `POINT / 01` → `旅のコツ`
- `TRIP DATA / YOKOHAMA` → `横浜1DAYメモ`
- `MOVE / PACE / BEST / MOOD` → `移動 / ペース / おすすめ / 気分`
- `OUR YOKOHAMA / FLEXIBLE DAY` → `寄り道しながら、1日を楽しむ。`

Photos, times, itinerary facts and image hashes did not change.

### Rejected intermediate state

The inherited width of `旅のコツ` overlapped `寄り道、歓迎。` by 17px. The label width was reduced and structure QA was rerun.

### Evidence

- whole spread screenshot ~700px: PASS;
- actual-size left screenshot `794×1123`: PASS;
- visible left native text: 23;
- text collisions: 0;
- 18px safe-area risks: 0;
- generated: 0;
- Drive save: 0;
- new binary placement: 0;
- new image hash: 0.

Decision: ADOPTED / VERIFIED_LOCAL.

## Final live preferred readback

- GV Outer `2006:2`
- GZ Profile/Q&A `2004:2`
- GW Story/chronology `1987:2`
- GY Memory Spots `2003:2`
- GL Cafe/Table `2000:2`
- GR 1DAY Plan `2007:2`

All are parented to `845:2 / 00_RURUBU_START_HERE` and Start Here text reflects the same set.

## Asset lifecycle state

`generated 0 / adopted generated 0 / Drive new save 0 / external binary placement 0 / new image hash 0 / native text preserved / replaceable photo roles preserved / rollback preserved / V7 untouched`.