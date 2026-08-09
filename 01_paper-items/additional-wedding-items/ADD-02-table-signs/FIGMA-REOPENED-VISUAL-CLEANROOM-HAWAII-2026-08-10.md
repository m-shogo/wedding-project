# ADD-02 — Reopened Visual Clean-room / Hawaii

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_DIRECTION_CREATED / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before first evidence write: `c7bbe8c3f20d589557bb88b3e3e1455f2feb6203`
- latest observed `main` immediately before V3 evidence write: `e82efa7c14fcf80985361f4f6be633deddc3b0ac`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- existing structural authority: `FIGMA-LONG-COPY-COMPLETION-QA-2026-08-09.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Hawaii production: `2:2 / FRAME_TABLE_SIGN_HAWAII`
- clean-room V2: `6:2 / QA_ADD_02_HAWAII_CLEANROOM_V2_IMAGE_LED_EDITORIAL_2026_08_10`
- clean-room V3: `7:2 / QA_ADD_02_HAWAII_CLEANROOM_V3_VECTOR_LED_EDITORIAL_2026_08_10`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

The prior `DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid structural and long-copy evidence only. It is not accepted as sellable visual evidence in this reopened pass.

## Reopened whole-suite diagnosis

The live whole-page screenshot shows that the previous three-archetype redesign solved the worst one-template repetition, but the current placeholder state is still visually weak as a sellable destination-sign suite:

- large hero roles are still flat color blocks with no destination atmosphere;
- country identity is carried mostly by country name + palette;
- at thumbnail scale the suite still reads as sparse colored layout variations rather than richly art-directed destination objects;
- the European side columns and urban lower blocks are structurally distinct but remain visually generic without a stronger image-led/editorial layer.

This is a visual-completion failure under `VISUAL_REOPENED`, not a regression of the previous structure QA.

## Hawaii clean-room V2 direction

Created a materially different Hawaii candidate on `99_QA` without touching production:

`6:2 / QA_ADD_02_HAWAII_CLEANROOM_V2_IMAGE_LED_EDITORIAL_2026_08_10`

Direction:

- tall replaceable destination-image role occupies the right 680px and reaches from top to y=1040;
- left 320px becomes a narrow editorial text rail instead of a lower caption block;
- `HAWAII` is a single large word at 54px after screenshot QA caught and repaired an initial wrap defect;
- narrow rust vertical anchor separates text rail and image role;
- lower field uses an oversized low-opacity native `01`, Japanese `ハワイ`, compact editorial note, folio and restrained contour rings;
- no airport code, fake credential, stamp, plane, gradient, shadow, rounded card, or web-UI treatment;
- all variable/editorial text remains native;
- destination imagery remains a replaceable semantic role rather than text baked into pixels.

## V2 screenshot QA

First screenshot exposed an unintended `HAW / AI` title wrap. The candidate was not accepted in that state.

After repair, the final screenshot shows:

- `HAWAII` as one intentional word;
- clear `TABLE 01 → HAWAII → note → image role → lower identity` hierarchy;
- materially stronger asymmetric rhythm than production Hawaii;
- no visual collision with the hero role;
- the large lower `01` works as atmosphere rather than a badge.

V2 was intentionally not promoted because the right hero remained a flat placeholder block and still read as an unfinished wireframe at thumbnail scale.

## V3 vector-led clean-room advance

Because image generation was unavailable again in this run, V2 was duplicated safely rather than promoting an unfinished image placeholder. Production remained untouched.

Created:

`7:2 / QA_ADD_02_HAWAII_CLEANROOM_V3_VECTOR_LED_EDITORIAL_2026_08_10`

V3 turns the upper 680×1040 hero role into a native, replaceable editorial atmosphere proof using only editable Figma vector/shape layers:

- deep-teal sky field;
- muted coral sun disc;
- layered volcanic ridge silhouette;
- three restrained ocean/shore color fields;
- thin print-like horizontal texture rules;
- a single pale botanical line drawing at the lower right;
- a narrow warm-sand shore strip that still preserves the future replaceable-image role;
- no fake transport data, badge, stamp, gradient, shadow or UI card.

This is not intended to substitute permanently for a strong generated/real destination image. Its purpose is to establish art direction and give the next generation-capable run a serious native comparator instead of a blank color box.

### V3 screenshot-led correction

The first V3 screenshot improved the hero, but exposed two residual template signals:

1. the left Japanese dummy copy wrapped awkwardly;
2. four lower contour rings plus the duplicated `01` read as generic template decoration.

Those defects were corrected in the same run:

- `TXT_COUNTRY_NOTE` rewritten as a clean two-line semantic dummy and reduced to 21px with 33px leading;
- lower foot note changed to a two-line native dummy with 18px / 28px leading;
- contour rings 2–4 hidden;
- only one restrained contour ring retained and repositioned;
- large decorative `01` reduced to 4% opacity;
- small lower-right `01` enlarged/repositioned as the sole explicit identifier;
- bottom rust rule lengthened slightly for stronger editorial anchoring.

### V3 three-scale visual QA

Whole/thumbnail:

- V3 reads materially less like an unfinished wireframe than V2;
- the hero now has an immediate destination mood and clear image-led hierarchy even without raster imagery;
- visual weight is concentrated in the upper coastal field rather than repeated lower ornament.

Reading scale:

- `TABLE 01`, `HAWAII`, Japanese dummy copy and lower identity remain separated and readable;
- the rust divider continues to give a strong left/right editorial rhythm;
- the botanical line and horizon are subordinate to title and table identity.

Actual size (`1000 × 1480` render):

- no visible text collision or crop failure;
- Japanese dummy copy remains legible and optically separated from the hero;
- vector coastal field remains crisp and editable;
- future raster hero can still replace the base field without baking text into the image.

## V3 structure QA

Live readback for `7:2`:

- frame: `1000 × 1480`;
- native text nodes: `9`;
- IMAGE fills: `0`;
- text outside root: `0`;
- hidden `GUIDE_SAFE`: `50,50 / 900 × 1380`;
- hidden nodes: `4` (safe guide + three rejected contour rings);
- no flattened/raster text introduced;
- future image role remains separated from all variable/native text.

The production suite `1:3` was also re-screenshot in this run. It confirms that the 11 live signs are still dominated by flat color fields and sparse layout variations; therefore Hawaii V3 is only a design-direction advance, not sufficient evidence to promote the family or mark ADD-02 sellable.

## Image-generation production brief

Image generation remains the correct next production workstream for ADD-02 because the reopened screenshot defect is specifically destination atmosphere, not typography capacity.

Hawaii role brief:

- purpose: editorial destination hero for table sign, not a travel-ad stock image;
- aspect/crop: tall ~`680:1040`, portrait crop, focal content kept inside center/right with a quieter left edge near the rust divider;
- subject: non-person Hawaii coastal atmosphere — ocean edge, volcanic texture, tropical foliage, architecture/detail, or layered editorial landscape;
- style: believable print/editorial photography or restrained collage, tactile and natural;
- palette: deep teal / warm sand / muted coral compatibility;
- text-safe requirement: no readable signage, no fake lettering, no variable wedding text baked in;
- compare directly against V3's native vector coastal field rather than against a blank placeholder;
- reject: fantasy saturation, plastic AI surfaces, impossible architecture, fake typography, tourist-ad stock clichés, people presented as real guests/couple.

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` — no generated candidate was claimed, stored or placed.

## Drive

- exact authority folder was live-read immediately before the V3 Git write: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- Drive changes: `0`;
- reason: no generated/adopted raster asset existed; native Figma vector proof does not require Drive duplication.

## Decision

`CLEANROOM_V3_VISUAL_DIRECTION_ADVANCE / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED / DESTINATION_IMAGE_ROLE_BRIEF_READY / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED`

Next safe target remains ADD-02. In the next generation-capable run, generate materially different Hawaii destination-image candidates, reject AI/stock failures, place only serious candidates into a replaceable copy of the `7:2` hero role, compare them against V3 at whole/reading/actual-size scales, and only then decide whether the image-led grammar is strong enough to expand across the remaining 10 table signs. Do not advance to ADD-03 merely because the older structural PASS exists.