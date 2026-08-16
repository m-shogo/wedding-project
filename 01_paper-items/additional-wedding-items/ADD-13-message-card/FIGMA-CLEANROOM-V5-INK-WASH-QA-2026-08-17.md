# ADD-13 Message Card — Clean-room V5 Ink Wash QA

Status: `CLEANROOM_V5_STRUCTURAL_PASS / WRITING_AREA_55_PERCENT_PASS / REALISTIC_LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_LOSS / NO_PROMOTION / LEGACY_PRESERVED`
Date: 2026-08-17
Start authority SHA: `d1e97928a57ff680997f7617fc8156477f372630`
Pre-write main SHA: `1e67ba21cdb206096e0ec885f6ee55d8657d2e90`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained production: front `1:3`, back `1:13`
- fresh clean-room page: `22:2 / CLEANROOM / ADD-13 / V5 INK WASH / 2026-08-17`
- V5 front: `22:3 / FRAME_MESSAGE_CARD_FRONT / V5`
- V5 back: `22:27 / FRAME_MESSAGE_CARD_BACK / V5`
- repaired native header stacks: front `25:2`, back `25:3`
- final hidden realistic long-copy stress: front `25:58`, back `25:85`

## Clean-room contract

V5 was created from a new blank Figma page. Retained production, V3, and V4 were not used as authoring sources or component libraries. No old frame, layout group, rule, rail, badge, icon, crop, background composition, raster asset, or generated asset was duplicated into V5.

Only verified non-visual requirements were carried forward: 700×990 working canvas, front/back message-card roles, editable title/prompt/name/date roles, A6 postcard intent, at least 55% writable area, native editable variable copy, and explicit LAYOUT DUMMY treatment for unresolved wording.

## V5 direction

V5 switched grammar again rather than iterating V4's diagonal gesture:

- warm cream paper field;
- one composed editable SVG ink-wash accent on the front rather than multiple decorative native primitives;
- Japanese serif headline with restrained sans support text;
- open ruled handwriting field as the dominant physical function;
- minimal footer with native name/date roles;
- no rounded cards, pills, shadows, gradients, travel icons, fake transport data, or rasterized variable copy.

The back intentionally remains quieter than the front and prioritizes writing capacity over decoration.

## Hybrid authoring split

- variable/factual/replaceable wording: native Figma text;
- fixed visual accent: one composed editable SVG node per intended fixed-art role;
- handwriting rules and simple physical geometry: native vector/rectangles;
- raster/image fills: 0;
- generated image assets: 0;
- Drive asset writes: 0.

Image generation was not selected because the observed design problem is editorial hierarchy and writable-area balance, not missing photography or illustration.

## Structural repair during QA

The first V5 draft exposed two real issues before legacy comparison:

1. handwriting area was below the SPEC requirement on the front;
2. realistic long-copy stress revealed title/meta/prompt collisions because header elements used independent absolute positions.

The repair was structural rather than cosmetic:

- front/back handwriting roles widened to `620×620`;
- writing-area ratio is `0.5546897547` (55.47%) on both sides;
- front and back title/meta/prompt were moved into native vertical auto-layout header stacks;
- header stack sizing was corrected to `primaryAxisSizingMode=AUTO`;
- the back `MESSAGE NOTE` kicker was folded into the same header stack;
- footer name/date roles remain native editable text;
- optional theme placement was separated from the long-name region.

## Final realistic long-copy stress

Stress copy was based on the actual candidate categories in the ADD-13 SPEC rather than an unbounded paragraph.

Front stress `25:58`:

- title: `これからの旅へのアドバイス`
- prompt: extended message / recommended destination / advice wording
- long guest-name sample
- visible text outside root: `0`
- text-to-text collisions: `0`
- header bottom: `182`
- handwriting top: `250`
- handwriting ratio: `55.47%`

Back stress `25:85`:

- title: `おすすめの旅先を教えてください`
- extended prompt
- long guest-name sample
- visible text outside root: `0`
- text-to-text collisions: `0`
- header bottom: `208`
- handwriting top: `250`
- handwriting ratio: `55.47%`

Result: `REALISTIC_LONG_COPY_STRESS_PASS`.

## Three-scale visual review

V5 was reviewed before legacy comparison at thumbnail/whole-item and native `700×990` actual-size.

Observed strengths:

- writing function is immediate;
- editable-copy hierarchy is clean;
- front fixed art is restrained and does not become web UI;
- actual writing capacity now satisfies the physical requirement;
- no obvious AI raster artifact or fake text exists.

Observed weakness:

- the very large ruled field makes V5 more functional but also more generic;
- the back especially reads closer to a high-quality blank note card than a fully resolved wedding stationery product;
- V5 typography does not create enough item-specific correspondence identity to justify replacing the retained production.

## Legacy comparison

Only after V5 structural repair and stress QA were complete were retained production `1:3 / 1:13` opened for comparison.

The retained production remains stronger overall:

- more distinctive Japanese headline art direction;
- stronger front/back correspondence-product identity;
- better editorial tension between headline, open space, and writing guidance;
- stronger sellable-stationery finish at thumbnail scale.

V5 wins on explicit writable-area compliance and structural tolerance, but not on total visual/product quality. Decision: `LEGACY_COMPARISON_LOSS / NO_PROMOTION`.

Retained production was not changed, deleted, or overwritten.

## Drive

Live Drive authority readback passed for `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`. No raster/composed binary asset was required, so Drive writes remain `0`.

## Next safe action

Do not cosmetically iterate V5 in this run after seeing legacy. If ADD-13 is attempted again, start a future fresh run from facts only and switch grammar again. The next candidate must retain the verified 55% writing-area and native auto-layout protections while finding a more distinctive editorial/correspondence identity than both V5 and retained production.