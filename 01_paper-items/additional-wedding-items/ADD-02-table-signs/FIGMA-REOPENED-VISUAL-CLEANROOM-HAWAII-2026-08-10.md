# ADD-02 — Reopened Visual Clean-room / Hawaii

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_DIRECTION_CREATED / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `c7bbe8c3f20d589557bb88b3e3e1455f2feb6203`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- existing structural authority: `FIGMA-LONG-COPY-COMPLETION-QA-2026-08-09.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Hawaii production: `2:2 / FRAME_TABLE_SIGN_HAWAII`
- clean-room candidate: `6:2 / QA_ADD_02_HAWAII_CLEANROOM_V2_IMAGE_LED_EDITORIAL_2026_08_10`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

The prior `DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid structural and long-copy evidence only. It is not accepted as sellable visual evidence in this reopened pass.

## Reopened whole-suite diagnosis

The live whole-page screenshot shows that the previous three-archetype redesign solved the worst one-template repetition, but the current placeholder state is still visually weak as a sellable destination-sign suite:

- large hero roles are still flat color blocks with no destination atmosphere;
- country identity is carried mostly by country name + palette;
- at thumbnail scale the suite still reads as sparse colored layout variations rather than richly art-directed destination objects;
- the European side columns and urban lower blocks are structurally distinct but remain visually generic without a stronger image-led/editorial layer.

This is a visual-completion failure under `VISUAL_REOPENED`, not a regression of the previous structure QA.

## Hawaii clean-room direction

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

## Screenshot QA

First screenshot exposed an unintended `HAW / AI` title wrap. The candidate was not accepted in that state.

After repair, the final screenshot shows:

- `HAWAII` as one intentional word;
- clear `TABLE 01 → HAWAII → note → image role → lower identity` hierarchy;
- materially stronger asymmetric rhythm than production Hawaii;
- no visual collision with the hero role;
- the large lower `01` works as atmosphere rather than a badge.

The candidate is intentionally not promoted yet because the image-led direction needs a real non-person destination visual before the reopened sellable gate can be judged honestly across the 11-sign family.

## Structure QA

`6:2` readback:

- frame: `1000 × 1480`;
- native text nodes: 9;
- IMAGE fills: 0;
- replaceable destination image role: `IMG_COUNTRY_HERO_REPLACEABLE`, `x=320, y=0, 680 × 1040`;
- text outside root: 0;
- hidden `GUIDE_SAFE` retained at `50,50 / 900 × 1380`;
- no flattened/raster text introduced.

## Image-generation production brief

Image generation is the correct next production workstream for ADD-02 because the reopened screenshot defect is now specifically missing destination atmosphere, not typography capacity.

Hawaii role brief for a future generation-capable run:

- purpose: editorial destination hero for table sign, not a travel-ad stock image;
- aspect/crop: tall ~`680:1040`, portrait crop, focal content kept inside center/right with a quieter left edge near the rust divider;
- subject: non-person Hawaii coastal atmosphere — ocean edge, volcanic texture, tropical foliage, architecture/detail, or layered editorial landscape;
- style: believable print/editorial photography or restrained collage, tactile and natural;
- palette: deep teal / warm sand / muted coral compatibility;
- text-safe requirement: no readable signage, no fake lettering, no variable wedding text baked in;
- reject: fantasy saturation, plastic AI surfaces, impossible architecture, fake typography, tourist-ad stock clichés, people presented as real guests/couple.

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` — no generated candidate was claimed, stored or placed.

## Drive

- exact authority folder was live-read immediately before this write: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- Drive changes: `0`;
- reason: no generated/adopted visual asset existed in this run.

## Decision

`CLEANROOM_VISUAL_DIRECTION_ADVANCE / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED / DESTINATION_IMAGE_ROLE_BRIEF_READY / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED`

Next safe target remains ADD-02. In the next generation-capable run, create materially different Hawaii destination-image candidates, visually reject AI/stock failures, place only a serious candidate into `6:2`, re-run whole/reading/actual-size QA, then use the winning image-led grammar to decide whether and how to expand across the remaining 10 table signs. Do not advance to ADD-03 merely because the older structural PASS exists.