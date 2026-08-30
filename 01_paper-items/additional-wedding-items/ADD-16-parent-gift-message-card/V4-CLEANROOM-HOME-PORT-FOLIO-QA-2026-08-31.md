# ADD-16 — V4 clean-room HOME PORT FOLIO QA

Date: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Run-start `main`: `742c5fbdd7ec46c1ca7336e1e868b41f801769ac`
Latest `main` observed immediately before this write: `177f7dce5ff11628b1493998ab19f0114b1df260`

## Result

`V4_CLEANROOM_SELECTED / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / STRUCTURE_QA_PASS / LONG_COPY_STRESS_PASS / PRINT_SAFE_TEXT_PASS / NOT_PRINT_READY`

This is a new non-Rurubu V4 production direction. Retained production / V2 / V3 / professional-vNext `HOME TEXTILE MAT` remains comparison and rollback evidence only. No old production frame, layout group, decorative vector, text block, or background composition was duplicated into V4.

## Live authorities

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- V4 blank page: `76:2 / V4 / ADD-16 / HOME PORT FOLIO / CLEANROOM / 2026-08-31`
- front: `76:3 / V4 / ADD16 / FRONT / HOME PORT FOLIO / BLEED 3MM`
- back: `76:17 / V4 / ADD16 / BACK / LETTER FIELD / BLEED 3MM`
- hidden front long-copy stress: `76:33`
- hidden back long-copy stress: `76:49`
- front variable native-text stack: `76:63`
- hidden front stress variable native-text stack: `76:64`
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive writes this pass: `0`

## V4 visual intent

Reference-led intent is a quiet keepsake / ceremonial folio, not an airline/passport/ticket imitation and not a web-card composition.

Front reading order:
1. deep-navy physical spine;
2. native recipient role;
3. oversized Japanese `ありがとうを、これからも。` hero;
4. native short-message role;
5. restrained home-port line;
6. signature, meaningful origin-to-destination rule, confirmed date.

Back reading order:
1. deep-navy top field;
2. Japanese `伝えたいことを、ここに。` hero;
3. native body role;
4. usable signature/writing field;
5. confirmed date.

Mint and silver registration marks support the SPEC `HOME PORT` language without copying the retained textile/weave grammar. There is no decorative English filler, airline credential, badge, equal rounded-card grid, generated family imagery, or stock travel illustration.

## Native / SVG / generated / replaceable roles

- variable/factual copy: Figma native editable text;
- recipient/message/signature/date: native text;
- meaningful route/origin/destination and writing rules: native vector/shape geometry;
- editable SVG: `0` — no reusable flat illustration is needed;
- generated/composed raster: `0`;
- replaceable photo/image: `0`;
- raster IMAGE fill: `0`;
- image generation: `NOT_REQUIRED_FOR_THIS_PASS` — imagery would not improve the parent keepsake function, and generated family/person imagery is prohibited.

## Authoritative print geometry

SPEC authority defines:
- final trim: `100 × 148 mm portrait`;
- duplex front/back;
- bleed: `3 mm each edge`;
- safe: `8 mm minimum inward from trim`.

V4 is authored at `7 px/mm`:
- bleed canvas: `106 × 154 mm = 742 × 1078 px`;
- trim: `100 × 148 mm = 700 × 1036 px`, inset `21 px` from bleed edge;
- safe boundary: `8 mm = 56 px` inward from trim, therefore `77 px` inward from bleed edge.

Hidden trim/safe proof geometry exists on V4 normal and stress frames. It is not guest-facing.

## Actual-size typography

At `7 px/mm`, approximate physical type equivalents are:
- front hero `62 px ≈ 25.1 pt`;
- front message `28 px ≈ 11.3 pt`;
- recipient `26 px ≈ 10.5 pt`;
- signature/date `24 px ≈ 9.7 pt`;
- optional home-port line `22 px ≈ 8.9 pt`;
- back hero `52 px ≈ 21.1 pt`;
- back body `27 px ≈ 10.9 pt`;
- back signature `23 px ≈ 9.3 pt`;
- writing label `20 px ≈ 8.1 pt`.

Final structural readback after repair:
- front visible native text `6/6 auto-height`, outside=`0`, overlap=`0`, unsafe text=`0`;
- back visible native text `5/5 auto-height`, outside=`0`, overlap=`0`, unsafe text=`0`;
- stress front visible native text `6/6 auto-height`, outside=`0`, overlap=`0`, unsafe text=`0`;
- stress back visible native text `5/5 auto-height`, outside=`0`, overlap=`0`, unsafe text=`0`.

The first V4 draft exposed two real defects and was not passed prematurely:
1. native text had fixed-height behavior after initial sizing;
2. a long recipient collided with the hero.

Repairs:
- all variable text roles were restored to native auto-height;
- recipient → hero → message → optional home-port line was rebuilt as native vertical Auto Layout (`76:63`, stress `76:64`);
- date was moved inward after numeric safe-area audit found the initial position exceeded the 8 mm safe boundary by about `0.7 mm`.

## Three-scale visual QA

Fresh screenshots were reviewed at:
- thumbnail / three-second scan: `353 × 512 px` render of both front and back;
- reading scale: same composition read at mid-scale with semantic placeholders visible;
- native / print-detail scale: `742 × 1078 px` render, matching the authored 7 px/mm production geometry.

PASS:
- front first-read is the Japanese gratitude hero, not decorative UI;
- back first-read is the writing/message function;
- typography remains clear and subordinate roles remain subordinate;
- no accidental proof/status text is printed;
- no uniform-card / centered-template / generic-AI background impression;
- normal and long-copy stress structures stay inside the root and 8 mm text-safe boundary.

## Raster / resolution

Raster IMAGE fill: `0`.

Therefore effective PPI = `N/A` and `RESOLUTION_WARNING` = `NONE` for the current V4 artwork. If a real family photograph is later formally adopted, its final placement mm, crop/bleed reserve and effective PPI must be calculated before it can become production evidence.

## Handwriting / attachment / physical use

- back includes a functional signature/writing area with two restrained rules;
- usable area is visually preserved at 100 × 148 mm, but real black-pen/pencil proof on final stock remains required;
- punch/fold/QR/perforation: not part of the selected primary 100 × 148 mm authority;
- actual gift/package/attachment method remains unknown, so interference with ribbon/box/flower/gift must be physically tested after that input exists.

## CMYK / production risk

Current RGB art uses deep navy, warm ivory, muted mint and neutral silver-gray. Before `PRINT_READY`:
- deep navy must be proofed for shadow plugging and black-construction choice;
- mint / silver-gray must be proofed for dulling and insufficient contrast after CMYK conversion;
- warm ivory paper/color interaction must be checked against actual stock;
- small black/navy text must not use registration black;
- final vendor profile/black recipe must not be guessed in Figma.

## Deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Still required:
- one card per family vs one shared card;
- actual gift dimensions, packaging and attachment method;
- whether names appear on front;
- final recipient/message/signature/forms of address;
- final paper stock/finish;
- physical black-pen/pencil writing proof;
- printer template confirmation despite currently authoritative 3 mm bleed / 8 mm safe geometry;
- CMYK/profile and black construction;
- duplex registration proof;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% print proof / physical proof.

These are `DEFERRED_FINALIZATION` and do not invalidate the selected V4 sellable-visual gate.