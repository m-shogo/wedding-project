# ADD-01 ウェルカムボード — Clean-room V2 Promotion QA

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_V2_CREATED / LONG_COPY_STRESS_PASS / PRODUCTION_PROMOTED / SELLABLE_VISUAL_QA_PASS / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `d290db42a1c498c8a91a4cb81896bd8808c663a3`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `XyyTGuz6BMf8XRhPZZfdoT`
- production: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT / 852 × 1200`
- clean-room candidate: `4:2 / QA_ADD_01_CLEANROOM_V2_EDITORIAL_POSTER_2026_08_10`
- long-copy stress: `4:21 / QA_ADD_01_CLEANROOM_V2_LONG_COPY_STRESS_2026_08_10`
- rollback proof: `7:2 / ROLLBACK_ADD_01_PRE_CLEANROOM_V2_PROMOTION_2026_08_10`
- Google Drive root: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`

The older initial `DESIGN_QA_PASS_WITH_PLACEHOLDERS`-equivalent evidence remains useful for print geometry and editability, but was not used as sellable-visual proof.

## Reopened diagnosis

The former production was functional but visually too template-like under the reopened gate:

- centered `WELCOME` hero heading and centered subcopy;
- a very large neutral hero-photo placeholder sitting as a centered rectangle;
- centered names/date/location stack;
- circular `24 OCT / YOKOHAMA` badge;
- overall top-center / center-photo / bottom-center rhythm that read like a generic wedding template rather than authored editorial print.

No image-generation brief could ethically replace the real couple hero image. The correct design task was to improve the frame around a replaceable real-photo role rather than synthesize the couple.

## Clean-room V2

Created a materially different native Figma composition:

- Japanese-led title: `ようこそ、旅の一日へ`;
- asymmetric left editorial column instead of centered hero text;
- hero-photo role moved to a tall right-side crop (`474 × 744`) with square corners and a narrow rust vertical anchor;
- date `10.24` retained only as a low-opacity native typographic atmosphere, not a badge;
- removed the circular travel badge and generic `WELCOME` hierarchy from the visible composition;
- names/date/location are left-aligned as a bottom editorial identity block;
- hero caption and hero-role labels remain native overlays, not baked into the image role;
- background remains print-native ivory with restrained forest/rust palette;
- no rounded web cards, gradient, shadow, UI controls, fake transport data or generic airplane/stamp decoration.

Screenshot QA caught two real defects during the clean-room build and they were repaired before promotion:

1. initial title/subcopy intruded into the hero-photo column;
2. initial long-name stress collided with the date row.

The final candidate uses an intentional two-line Japanese title and a vertically separated bottom identity block.

## Long-copy stress

`4:21` uses explicit semantic dummies:

- `[長い新郎新婦名レイアウト確認 · LAYOUT DUMMY]`
- `YOKOHAMA / [長い会場名レイアウト確認 · LAYOUT DUMMY]`
- `[長い写真キャプション確認 · LAYOUT DUMMY]`

Final stress screenshot shows:

- long couple name wraps without date collision;
- long venue remains inside its dedicated region;
- long photo caption remains inside the caption field;
- no text leaves the root frame.

## Structure QA

Production `1:3` after promotion:

- native text nodes: 10;
- IMAGE fills: 0;
- replaceable hero role: native rectangle `IMG_WELCOME_HERO_REPLACEABLE`, `474 × 744`;
- text outside root: 0;
- hidden bleed/trim/safe guides retained and remain non-visible;
- couple names, venue, date, hero caption and photo role remain editable;
- no flattened/raster text was introduced.

Stress `4:21` also has text outside root = 0.

## Promotion and rollback

Before replacing production, the former production was preserved as:

`7:2 / ROLLBACK_ADD_01_PRE_CLEANROOM_V2_PROMOTION_2026_08_10`

Production ID remains stable:

`1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`

The production now renders the clean-room V2 editorial composition.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image was claimed or stored. More importantly, the missing hero is intended to become a real couple photo; generating bride/groom likeness as if real is outside the allowed boundary. The production therefore keeps a non-destructive replaceable hero role. If a future screenshot identifies a non-person texture/background need, that role can be generated separately without baking variable text or people into pixels.

## Drive

- exact Drive root ID was live-read immediately before Figma promotion: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`;
- Drive changes: `0`;
- reason: no generated/adopted raster asset in this run.

## Decision

`SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_RETAINED / PRODUCTION_PROMOTED / ROLLBACK_SAFE / FINAL_REAL_HERO_PHOTO_DEFERRED / NOT_PRINT_READY`

Remaining finalization: real hero-photo selection/crop, confirmed couple-name styling, confirmed venue text, physical A2/A3 choice and print/vendor proof. These do not block progression to `ADD-02 11卓の国別テーブルサイン`.