# ADD-02 — Reopened Visual Clean-room / France + Spain + Taiwan

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_DIRECTION_ADVANCED / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `ce85d856a1583be73dc6720edf39b00eab279e1a`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- France production: `2:20 / FRAME_TABLE_SIGN_FRANCE`
- France clean-room: `13:2 / QA_ADD_02_FRANCE_CLEANROOM_V2_ARCHITECTURAL_POSTER_2026_08_10`
- Spain production: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- Spain clean-room: `13:20 / QA_ADD_02_SPAIN_CLEANROOM_V2_TILE_POSTER_2026_08_10`
- Taiwan production: `2:38 / FRAME_TABLE_SIGN_TAIWAN`
- Taiwan clean-room: `14:2 / QA_ADD_02_TAIWAN_CLEANROOM_V2_NIGHT_PRINT_2026_08_10`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Fresh production diagnosis

The production family remains dominated by repeated sparse color-block formulas. France and Spain are near-identical side-bar layouts with only palette/name changes, while Taiwan belongs to the repeated lower-block family. None would be selected from scratch as a sellable 11-piece destination-sign series.

## France V2 — architectural editorial poster

Created `13:2` without touching production.

Direction:

- deep French blue upper print field and warm-ivory lower paper field;
- oversized `FRANCE` with a restrained editorial subline;
- a cropped, repeated architectural arcade/window geometry rather than landmark clip-art;
- one vermilion registration rule and a non-badged large table number;
- native Japanese destination name and semantic dummy copy;
- no Eiffel Tower cliché, flag card, generic travel stamp, rounded UI card, gradient or shadow.

Screenshot QA at 1000×1480 shows a materially stronger hierarchy than production. The upper architectural rhythm is visually integrated with the headline rather than functioning as a detached badge. The lower area intentionally remains quieter and paper-like, with a single strong red registration axis and large table number.

## Spain V2 — tile/print poster

Created `13:20` without touching production.

Direction:

- saffron + oxblood + terracotta asymmetric upper field;
- offset fine tile-grid fragments and one large rotated diamond frame;
- large `SPAIN` headline inside the color field;
- warm-paper lower field with native `スペイン`, semantic dummy copy and an angled saffron registration rule beneath table number `04`;
- no tourism postcard imagery, fake transport data, badge/pill UI or shadow.

First screenshot QA revealed one horizontal grid line cutting through the `SPAIN` headline. That line (`ES_TILE_H_5`) was hidden and the subline was optically adjusted before the final screenshot. The repaired screenshot no longer has the headline collision.

## Taiwan V2 — night-print / storefront geometry

Created `14:2` without touching production.

Direction:

- deep teal night-ink field with cinnabar vertical registration strip;
- warm paper and amber offset header blocks;
- irregular storefront/grid rhythm with limited red/amber window fields;
- a long diagonal paper-cut line to break the mechanical grid;
- large native `台湾`, semantic dummy copy and table number `05` on the lower paper field;
- no fake neon text, no fake signage, no lantern clip-art, no tourist-photo cliché, no web-card framing.

Screenshot QA confirms it is materially different from the repeated lower-block production grammar and from the Hawaii/Japan/France/Spain clean-room directions. The result is intentionally more print/poster-like than literal destination illustration.

## Structure QA

Live Plugin API readback after visual QA:

### France `13:2`
- frame: `1000 × 1480`
- native text nodes: `7`
- IMAGE fill nodes: `0`
- text outside root: `0`
- safe guide count: `1`
- variable copy remains native editable text

### Spain `13:20`
- frame: `1000 × 1480`
- native text nodes: `7`
- IMAGE fill nodes: `0`
- text outside root: `0`
- safe guide count: `1`
- screenshot-detected headline collision repaired before final QA
- variable copy remains native editable text

### Taiwan `14:2`
- frame: `1000 × 1480`
- native text nodes: `7`
- IMAGE fill nodes: `0`
- text outside root: `0`
- safe guide count: `1`
- variable copy remains native editable text

No rasterized or flattened text was introduced.

## Image-generation status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset is claimed, saved, or placed. Drive remains unchanged. This run continued the clean-room visual pass through native Figma art direction rather than stopping on the image-generation blocker.

When generation becomes available, image candidates should be tested only where they can beat these native poster candidates. France should avoid Eiffel/postcard clichés; Spain should avoid generic tile-stock/festival cliché; Taiwan should avoid fake Chinese signage, fake neon lettering and stereotyped lantern streets. Variable/factual copy must remain native in Figma.

## Drive

- exact authority folder re-read immediately before Git write: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- Drive changes: `0`
- reason: no adopted raster master exists in this run.

## Decision

`ADD_02_VISUAL_DIRECTION_ADVANCE / FRANCE_V2_CREATED / SPAIN_V2_CREATED_AND_SCREENSHOT_REPAIRED / TAIWAN_V2_CREATED / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED`

The clean-room family now has materially distinct directions for Hawaii, Italy, Japan, France, Spain and Taiwan. Do not promote production as a set yet. Next highest-value step is to compare the six directions together at thumbnail scale and create clean-room alternatives for Hong Kong / Singapore / Bali / Korea / Maldives, then select a coherent but non-template family before any bulk production promotion.