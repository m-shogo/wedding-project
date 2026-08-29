# ADD-02 Spain — V4C Ceramic Courtyard clean-room study

Date: 2026-08-29
Start/main authority immediately before write: `4005ad18a716c06838377585036c62d1ba6759a3`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
State: `V4C_CLEANROOM_CANDIDATE_CREATED / LONG_COPY_COLLISION_FOUND_AND_FIXED / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- V4B page: `201:2 / V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`
- retained V4B Spain comparison: `203:3 / V4B / ADD-02 / TABLE 04 / SPAIN / EDITORIAL PRINT`
- new V4C Spain root: `210:2 / V4C / ADD-02 / TABLE 04 / SPAIN / CERAMIC COURTYARD / CLEANROOM`
- hidden V4C long-copy proof: `215:2 / QA / V4C / ADD-02 / SPAIN / LONG COPY STRESS`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive write: `0`
- Rurubu item-specific scope: not read or modified

## Why V4C exists

The V4B family audit already identified `GEOMETRIC_FIXED_ART_OVER_SIMPLIFICATION`, with Spain/Taiwan/Korea as the weakest remaining fixed-art roles. Fresh live screenshot review of Spain `203:3` confirmed the same issue: the regular equal tile grid, simple arch and broad flat fields still read more like a vector study than a tactile sellable destination table sign.

V4C was therefore created as a **new blank 1000×1480 frame**. It did not clone or restyle retained production/V2/V3/VNext or the V4B Spain root. Only verified semantic facts were manually re-authored: TABLE 04, SPAIN / スペイン, `[国テーマ]`, `[国テーマ説明]`, and `2026.10.24`.

## V4C art direction

`CERAMIC COURTYARD` uses:

- a deep cobalt upper field and warm paper lower field;
- one large terracotta architectural portal rather than a repeated card/grid system;
- hand-painted botanical stems/leaves and two large ceramic ring marks;
- irregular polygonal ceramic shards instead of V4B's repeated equal rounded tile modules;
- restrained robust paint/brush marks and a separate dark date edge field;
- native Japanese/English semantic copy in an editorial lower-left reading zone.

The first V4C screenshot exposed a new issue in the initial ceramic-fragment treatment: rounded rectangles still echoed the same card-like fingerprint. Those were removed in the same run and replaced with irregular editable polygon shards before this evidence was written.

## Hybrid authoring split

- native editable text: TABLE number, destination EN/JP, theme, description, date;
- fixed visual: editable native/vector geometry only;
- generated/raster imagery: `0`;
- IMAGE fills: `0`;
- variable copy baked into fixed art: `0`.

No Drive asset was generated or saved because this run tested the authority-approved fallback path: a materially different higher-fidelity editable illustration method. If later visual QA still rejects V4C, the already-specified generated full-atmosphere Spain role remains valid for a future candidate.

## Screenshot / three-scale progress

Fresh screenshots were reviewed for:

- retained V4B Spain `203:3` at reading scale;
- V4C Spain `210:2` at reading scale after initial construction;
- V4C Spain again after replacing rounded fragments with polygon shards;
- V4C Spain at native `1000×1480` after structure repair.

Observed improvement: the new candidate has a more specific architectural/ceramic first read and removes V4B's regular repeated tile grid. It is materially different enough to serve as a serious comparison candidate.

This is **not yet `SELLABLE_VISUAL_QA_PASS`**. V4C remains a comparison candidate until full family review and the unresolved Taiwan/Korea high-fidelity roles are addressed.

## Long-copy defect found and fixed

The first hidden V4C long-copy proof intentionally used:

- `スペイン／アンダルシア地方`;
- `[非常に長い国テーマ名プレースホルダー]`;
- a multi-line Japanese description block.

That stress run exposed a real layout defect: the long theme grew to 64px and overlapped the description because the first V4C implementation used independent absolute y positions.

Fix applied live in both visible V4C `210:2` and hidden proof `215:2`:

- created native vertical `TEXT / EDITORIAL STACK` auto-layout;
- destination EN, JP, theme and description are native text children;
- stack width `540px`, `itemSpacing=10`, height auto;
- production stack final height `265px`;
- long-copy proof final height `382px`;
- post-fix stress overlap pairs: `0`;
- post-fix visible text outside root: `0`.

The hidden stress proof was returned to hidden state after verification.

## Print-first QA

Current ADD-02 physical authority is `100 × 148 mm` on a `1000×1480` working frame, therefore the current scale is `10 Figma units/mm`.

Actual-size type equivalents in V4C:

- destination EN `102px ≈ 28.91pt`;
- destination JP `34px ≈ 9.64pt`;
- theme `27px ≈ 7.65pt`;
- description `24px ≈ 6.80pt`;
- table number `24px ≈ 6.80pt`;
- date `26px ≈ 7.37pt`.

Fixed-art print detail:

- new ceramic paint marks use `5px ≈ 0.5mm` strokes;
- main botanical strokes are `5–7px ≈ 0.5–0.7mm`;
- ceramic rings use `9–12px ≈ 0.9–1.2mm` strokes;
- very-low-opacity paper fibers remain decorative only and must not be relied on for hierarchy.

Raster/effective PPI: `N/A`; V4C has no raster roles and introduces no `RESOLUTION_WARNING`.

CMYK risk remains open for deep cobalt/navy, terracotta/coral and ochre/gold-like fields. Grayscale hierarchy is carried primarily by destination scale and dark/light field separation rather than hue alone, but final conversion/profile proof is still required.

## Deferred / print readiness

`DESIGN_COMPLETE != PRINT_READY` remains enforced.

Still deferred before `PRINT_READY`:

- confirmed printer template and production bleed/trim/safe geometry;
- final stock/finish and table-stand/display behavior;
- CMYK/output profile conversion proof;
- PDF export, font/embed, transparency/overprint/knockout preflight;
- 100% physical print proof;
- final `[国テーマ]` and `[国テーマ説明]` copy.

No bleed or safe geometry was guessed in this V4C study.

## Next

Continue ADD-02 rather than stopping on this single candidate:

1. address Taiwan `203:4` and Korea `203:7`, which still show the same over-simplified fixed-art fingerprint;
2. close full 11-root three-scale family review;
3. compare V4B/V4C only after the new candidates independently clear their visual/structure gates;
4. promote only on a clear family-level win; otherwise keep V4C as rejected/learning evidence and continue with another materially different direction.
