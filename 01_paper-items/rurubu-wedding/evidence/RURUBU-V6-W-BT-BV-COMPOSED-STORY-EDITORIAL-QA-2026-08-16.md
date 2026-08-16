# Rurubu WEDDING V6 — W / BT / BV Composed Story Editorial QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / V7_HOLD / NOT_PRINT_READY`

## Source problem

Live preferred W/BT/BS was structurally clean and materially better than prior V6 studies, but the Story page in BS still read quieter and more Figma-assembled than the cover, Q&A and chronology at whole-item scale. The lower-right Story area remained mostly cream space with native copy and small rules.

## Hypothesis

Use the promoted Wedding hybrid-authoring rule more literally: keep native text and replaceable photographs, but collapse fixed non-semantic travel texture into **one composed raster decoration role** rather than adding more live Figma ornament geometry. Then strengthen photo scale and native Japanese headline overlap only where image intrinsic resolution permits.

This also tests the neutral cross-scope capability that temporary in-Figma artwork may be rasterized into one IMAGE role when external binary transport is unavailable. Literal non-Rurubu artwork/layout was not inspected or transferred.

## Bounded tests

### BU `1498:2`

Duplicated BS `1486:81` rollback-safely.

A textless 360×430 travel-map texture was assembled temporarily, exported at 2×, converted to a Figma image hash, and the temporary source geometry was deleted. Final BU retained only one new fixed decoration layer:

- `DECOR / STORY_TRAVEL_TEXTURE_COMPOSED_RASTER`
- hash `691a6ceed471a5d8efa144052a10564eed177b4f`
- intrinsic `720×860`

BU improved print texture but the visual change alone was too small to justify promotion.

### BV `1498:159`

Duplicated BU and kept the one composed decoration raster. Story-only changes:

- hero photograph expanded to `820×520` from verified `1356×560` source;
- support photo 1 retained `220×202` from `240×220` source;
- café support photo expanded to `475×325` from `810×552` source;
- native Japanese anchor increased and moved into a stronger photo/texture overlap;
- body and travel-note metadata tightened into the lower-right editorial field;
- no final copy was rasterized;
- all three Story photographs remain replaceable IMAGE roles;
- Timeline page remains visually/structurally unchanged from BS.

Initial BV structure QA found one real text collision between the enlarged Story anchor and the support-photo caption. That state was not promoted. The caption was moved inside the support photograph as small white metadata, then QA was rerun.

## Three-scale evidence

- whole-item / 500px thumbnail: PASS; BV reads more photo-led and less empty than BS;
- reading scale / 1200px spread: PASS;
- actual-size Story `1498:160` at `794×1123`: PASS.

## Final structure QA

Story `1498:160`:

- visible native text: `11`;
- replaceable photo IMAGE roles: `3`;
- fixed composed decoration IMAGE roles: `1`;
- text/text collisions: `0`;
- 18px text safe-area risks: `0`;
- photo intrinsic-size violations: `0`;
- outside visible-node failures: `0`.

Timeline in BV:

- visible native text: `30`;
- visible replaceable IMAGE roles: `5`;
- text/text collisions: `0`;
- 18px text safe-area risks: `0`;
- photo intrinsic-size violations: `0`.

## Promotion and rollback

Promoted:

- Outer W `1491:2` unchanged;
- Profile/Q&A BT `1488:2` unchanged;
- Story/Chronology BV `1498:159 / PREFERRED / V6_INSIDE_BV_COMPOSED_STORY_EDITORIAL_2026_08_16`.

Hidden rollback/comparison:

- BS `1486:81`;
- intermediate BU `1498:2`.

Start Here `845:27`:

`V5 FU/FX · V6 W + BT/BV INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- external binary placement: `0`;
- new in-Figma composed raster role: `1`;
- composed raster source geometry retained: `NO`;
- native editable copy preserved: `YES`;
- replaceable photo roles preserved: `YES`;
- whole/read/actual-size visual verification: `YES`;
- structure/safe-area verification: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

Drive V6 root was freshly read back before the write:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Judgment

BV is preferred over BS because the Story page gains visible editorial depth without bringing back cards, generic shadows or live ornament micro-geometry. The one composed raster is fixed decoration only; all meaningful copy remains native and all photography remains replaceable.

This remains dummy-design verification, not completion or print readiness.