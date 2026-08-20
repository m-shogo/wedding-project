# ADD-02 Italy — table-number functional readability QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ITALY_TABLE_NUMBER_READABILITY_PASS / FAMILY_REVIEW_SYNC_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before the Figma write: `5d3d38ea72a6ebe08b4040ae9a3bcba891879ea7`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Italy production root: `2:11 / FRAME_TABLE_SIGN_ITALY`
- current family review board: `116:3 / QA_ADD02_CURRENT_FAMILY_REVIEW_LIVE_SYNC_2026_08_20`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

Drive metadata was read back live before the Figma write. Drive writes: `0`.

## Visible / functional problem

Fresh same-scale family review showed Italy's table number `02` was a clear functional outlier. Ten country signs used large table numbers in the roughly 132–152px range, while Italy used a 70px `DECOR_SMALL_IDENTIFIER`. At family/thumbnail scale Italy's table number became materially harder to identify even though table number is one of the primary guest-facing functions of the sign.

This was not a request to make all destination artwork visually identical. The comparison changed only the functional table-number role; Italy's architecture composition, palette, country labels, semantic note placeholder, botanical linework and print grain remained item-specific.

## Bounded comparison

Three rollback-safe studies were created outside production:

- `123:2` — 120px in the old 140px-wide box: rejected because `02` wrapped vertically;
- `123:47` — 132px in the old narrow box: rejected for the same box constraint;
- `123:92` — 132px with a proper 230×160 text role at x=690 / y=1110: PASS.

The accepted comparison aligned the functional prominence of `02` with the rest of the family while retaining Italy's independent composition. Native `1000×1480` screenshot review confirmed that `02` became immediately findable without competing with the Italian name or upper architecture artwork.

## Adoption / rollback

Before selected mutation, the original Italy root was preserved as hidden rollback:

- `123:137 / ROLLBACK / ADD-02 ITALY / PRE TABLE-NUMBER READABILITY / 2026-08-20`

Adopted on production root `2:11`:

- `21:260 / DECOR_SMALL_IDENTIFIER / 02`
- font size: `70 → 132px`
- position: `x 790 → 690`, `y 1240 → 1110`
- text role box: `140×100 → 230×160`

All three comparison studies were hidden after adoption.

## Family review sync

Because `116:3` is a clone-based review board, its Italy copy would otherwise immediately drift behind production. The previous Italy QA clone `122:295` was retained hidden as rollback, and a fresh production clone was inserted at the same board position:

- current Italy QA clone: `123:182 / QA_CLONE / FRAME_TABLE_SIGN_ITALY`
- old clone: `122:295 / ROLLBACK_QA_CLONE / FRAME_TABLE_SIGN_ITALY / PRE NUMBER READABILITY` (hidden)

Fresh same-scale family-board screenshot: PASS. The functional table-number hierarchy now reads consistently across 01–11 without forcing the country artwork into a uniform template.

## QA

Italy production `2:11` after adoption:

- size: `1000×1480`;
- visible native text: `4`;
- table number: `02 / 132px / 230×160`;
- visible IMAGE fills: `1` existing replaceable/tiled print-grain role;
- visible text outside root: `0`;
- text-to-text bounding-box collisions: `0`.

Three-scale result:

- family / thumbnail: PASS;
- reading scale: PASS;
- native `1000×1480` actual-size/detail: PASS.

## Hybrid / asset state

- variable/semantic copy remains native Figma text;
- country artwork remains native/vector fixed art plus the existing print-grain IMAGE role;
- new generated imagery: `0`;
- Drive writes: `0`;
- no other country production root changed.

## Decision

`VERIFIED_LOCAL / ITALY_TABLE_NUMBER_READABILITY_PASS / FAMILY_REVIEW_SYNC_PASS`.

This is a functional-readability correction, not a family-style homogenization rule. Exact country artwork, number placement and typography remain item-specific; future table-sign changes should continue to be judged per destination while keeping the guest-critical table identifier discoverable at whole-family scale.
