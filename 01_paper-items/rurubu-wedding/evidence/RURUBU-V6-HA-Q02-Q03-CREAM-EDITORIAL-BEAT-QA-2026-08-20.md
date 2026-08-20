# RURUBU V6 HA — Q02/Q03 Cream Editorial Beat QA — 2026-08-20

## Scope

Rurubu WEDDING only. V7 remained HOLD. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD-item Figma/Drive/GitHub paths were inspected or mutated.

## Authorities read before write

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/rurubu-shared-learning-feed.md`
- `docs/design-learning/non-rurubu-shared-learning-feed.md` under the neutral-feed firewall only
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- live Figma `845:2 / 00_RURUBU_START_HERE`
- Drive root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Visible problem

GT `1981:111` was compositionally mature, but Q02/Q03 were still bound inside a single dark navy rectangle (`DECOR / QA_Q02_Q03_PHOTO_BINDING_NAVY`). At whole and actual size this read as a reusable UI/status component rather than two compact interview beats in a Japanese travel-information spread.

A prior Rurubu attempt to simply place white copy directly onto the dining photograph had already failed contrast QA, so this run did not cosmetically retry that method.

## Rollback-safe candidate

HA `1996:99` duplicated GT and changed only the Q02/Q03/support-photo beat:

- the large navy field was reduced to one 3px functional rule;
- Q02/Q03 stayed on the cream paper field with their native cyan/yellow ordinals;
- question/answer copy was changed from inverse white to existing navy reader text;
- Q02 and Q03 question/answer pairs were wrapped in native vertical Auto Layout stacks:
  - `1997:2 / STACK / QA_Q02_CREAM_NATIVE_AUTOHEIGHT`
  - `1997:3 / STACK / QA_Q03_CREAM_NATIVE_AUTOHEIGHT`
- existing replaceable dining support photo remained the same image/hash but became a shallower editorial field: `545×255`, y `610`;
- Q04, Q05/Q06, hero photograph, profile page, all factual copy, and all other image hashes were preserved.

No new card, shadow, gradient, generated decoration, image, or external asset was added.

## Rejected intermediate states / failure evidence

1. After removing the dark field, Q02/Q03 inherited white inverse copy and became too faint on cream. Rejected visually. The copy was restored to the existing navy text color.
2. After native Auto Layout was introduced, realistic long-copy proof initially grew Q02/Q03 stacks to y-bottom `597` while the dining photo still began at y `595`, producing a 2px growth overlap. Rejected structurally. The photo was moved to y `610` and reduced from `545×270` to `545×255`, leaving 13px minimum growth clearance in the stress proof.

## Three-scale visual QA

- thumbnail / 500px whole spread: PASS; HA is less UI-like than GT and Q02/Q03 remain scannable;
- reading / 1200px whole spread: PASS; the cream interview beat and adjacent photo read as one editorial sequence;
- actual size / `1996:146` / `794×1123`: PASS; Q02/Q03 hierarchy, Q04 feature, lower dining beat, Q05/Q06 and folio remain readable.

## Structure QA

Preferred HA right page:

- native visible text: `29`;
- visible text-text collisions: `0`;
- 18px text safe-area risks: `0`;
- Q02 stack → photo clearance: `63px`;
- Q03 stack → photo clearance: `77px`;
- right page remains parented to HA root.

Hidden realistic long-copy proof `1998:2` / right `1998:49`:

- Q02 question: `相手の好きなところを、旅先で改めて感じるのはどんな時？`
- Q02 answer: `予定が変わっても笑って楽しみながら、その場で一緒に次の行き先を考えてくれるところ。`
- Q03 question: `ふたりで一緒にいる時間の中で、いちばん楽しい瞬間は？`
- Q03 answer: `次の旅先を相談したり、行きたい店や景色を見つけて予定を考えている時間。`
- both Auto Layout stacks grew to `100px`;
- text collisions: `0`;
- 18px safe-area risks: `0`;
- minimum stack → photo clearance: `13px`.

## Asset / provenance QA

- Q&A support image hash remains `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- support role reduced to `545×255`, so this change creates no new enlargement risk versus GT;
- all six preferred V6 spreads after HA: `29` visible IMAGE roles / `8` unique hashes;
- preferred visible production/proof/placeholder leakage audit: `0` hits for `EDITABLE|PLACEHOLDER|DUMMY|PROOF|TODO|20XX|1991.XX|XX.XX`;
- Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Promotion / rollback

- preferred: HA `1996:99`;
- Q&A right: `1996:146 / PAGE / QA_EDITORIAL_HA_Q02_Q03_CREAM_NATIVE_BEAT`;
- hidden rollback: GT `1981:111`;
- hidden stress evidence: `1998:2`;
- Start Here `845:27`: `V5 FU/FX · V6 GU + HA/GW + GV MEMORY SPOTS + GK CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Asset lifecycle state

- generated this run: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing replaceable image recomposed: YES;
- native variable text preserved and strengthened with Auto Layout: YES;
- visually verified: YES;
- V7 touched: NO.

## Remaining gates

HA is a verified dummy-design improvement, not print-ready evidence. Final legitimate photography, final personal copy, final page count/imposition, exact printer template, bleed/trim/fold requirements, PDF preflight, and physical proof remain open.
