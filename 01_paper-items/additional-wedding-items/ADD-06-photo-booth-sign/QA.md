# ADD-06 フォトブースサイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_PROMOTED / CONTINUOUS_STRIP_ARTIFACT_PASS / LONG_COPY_STRESS_PASS / SVG_EDITABILITY_PASS / DRIVE_MASTER_VERIFIED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-25
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- **Current page:** `56:105 / CURRENT_SELECTED / ADD-06 / STRIP IN THE LIGHT / 2026-08-25`
- **Current root:** `56:106 / CURRENT / ADD-06 / STRIP IN THE LIGHT / CONTINUOUS DEVELOPED PRINTS`
- hidden Current long-copy proof: `56:157 / QA / LONG COPY / STRIP IN THE LIGHT`
- clean-room study page: `55:2 / CLEANROOM STUDY / ADD-06 / CONTINUOUS STRIP / 2026-08-25`
- V3-A study winner: `55:3 / STRIP IN THE LIGHT`
- V3-B rejected study: `55:54 / AFTERGLOW CONTACT SHEET`
- study long-copy proof: `55:107`
- retained pre-promotion Current: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- retained previous long-copy proof: `47:19`
- previous family-diversity study: `46:2`
- previous mature candidate: `47:2`
- previous bounded fixed-art/tape/reflection studies and all rollback/history nodes remain preserved.

Exact Drive authority:

- folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- adopted SVG master: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1 / photo-strip-continuous-developed-prints-v2.svg`

Current evidence:

- `CLEANROOM-V3-STRIP-IN-THE-LIGHT-PROMOTION-QA-2026-08-25.md`
- `CONTINUOUS-PHOTO-STRIP-V2-REFINEMENT-QA-2026-08-25.md`
- previous 2026-08-23/24 bounded-polish evidence remains retained history.

## Clean-room Current direction — STRIP IN THE LIGHT

The 2026-08-25 V3 was created from blank Figma frames and did not duplicate the previous production layout, dark full-height left rail, three developed-print card geometry, old vectors, crops or background composition. Only verified size and semantic content roles were re-entered.

The dominant artifact is now one **continuous physical photo-booth strip** containing four non-person abstract exposures:

1. coastal dawn / horizon;
2. flash bloom;
3. reception light trails / movement;
4. night water / afterglow.

The strip is an editable SVG fixed-art role, not generated raster photography and not fake documentary wedding imagery. It contains no authoritative text, fake camera UI, barcode, reticle or guest/couple identity.

Reading hierarchy:

1. native `写真撮影はこちら`;
2. native `フォトブース`;
3. native guidance;
4. date `2026.10.24` and unresolved `[会場内設置場所]`;
5. small native emotional closing copy.

The composition uses an open warm-cream editorial field, a slightly rotated continuous strip on the left, and one lower dark physical information field. It no longer relies on a full-height dark UI-like lane containing three separate colorful cards.

## Sellable visual comparison

Professional Design Council: **94/100 / NO VETO**.

The clean-room V3 beats retained Current `45:2` at the reopened visual gate because:

- thumbnail scale reads as one real photo-booth strip rather than three independent icon/card modules;
- Japanese hierarchy remains the first textual read;
- wedding warmth/pop is carried by a few successive exposure moments rather than decorative badges or camera UI;
- the layout is more editorial and intentionally asymmetric without becoming sparse/premium-by-emptiness;
- fixed art remains editable vector while variable copy stays native.

V3-B was rejected: its dark outer page + centered cream sheet + date field read more like a mounted poster and weakened the immediate photo-booth artifact reading.

## Three-scale visual QA

Current `56:106`:

- whole-item / ≈500px: **PASS** — continuous strip is immediate and Japanese headline remains dominant;
- reading / ≈1000px: **PASS** — all four exposures remain distinct; flash bloom no longer reads as a logo; no gallery/filmstrip UI impression;
- actual `990×1400`: **PASS** — paper edge, exposure windows and grain remain credible without visual noise; dark lower field preserves factual contrast.

Old Current `45:2` remains intact for comparison/rollback history.

## Long-copy / Japanese typography QA

Current hidden proof: `56:157`.

Stress strings verified:

- `撮影の順番を確認しながら、空いている撮影スペースへゆっくりお進みください。`
- `[メインダイニング前・フォトブース特設スペース]`
- `写真を撮って、今日の楽しい思い出をそれぞれのおうちまで持って帰ろう。`

Result: **PASS**. The long location stays inside the lower dark field; closing copy remains separated beneath it.

During structure QA, the multiline hero exposed a known Figma authoring defect: applying `resize()` after `textAutoResize='HEIGHT'` returned that node to fixed height. The contract was corrected and all seven native text roles in Current and stress were read back as auto-height.

## Structure / hybrid QA

Current `56:106`:

- visible native text: `7`;
- auto-height: `7/7`;
- fixed-height visible text: `0`;
- IMAGE fills: `0`;
- replaceable raster photo role: `0`;
- generated raster: `0`;
- semantic/factual text baked into SVG: `0`.

Fixed-art SVG:

- Current SVG root: `56:108`;
- imported as editable Figma vector tree;
- descendants: `40`;
- vector-like editable descendants: `28`.

Responsibility split:

- variable/factual/emotional copy: native Figma text;
- photo-strip fixed art: editable SVG;
- final location remains semantic placeholder;
- no fake guests/couple/children/dog imagery.

## Drive asset lifecycle

Adopted master was saved only after real Figma comparison selected V3-A.

Drive readback:

- ID: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1`;
- name: `photo-strip-continuous-developed-prints-v2.svg`;
- MIME: `image/svg+xml`;
- size: `3124 bytes`;
- created/modified: `2026-08-25T04:31:36.758Z`;
- parent: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`.

This closes the fixed-art lifecycle through `role/candidate → clean-room Figma comparison → visual selection → Drive master verified → promoted Current`.

## Learning state

`VERIFIED_LOCAL` for ADD-06:

A literal physical artifact can be more convincing than multiple individually attractive mini-scenes when the latter read as separate cards/icons. The transferable hypothesis is **not** “always use a continuous strip”; another item should independently test whether consolidating repeated mini-art into one artifact-specific physical object improves whole-item reading.

No project-wide style rule is promoted from this item alone.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

Do not reopen solely to create activity. Reopen only for a new screenshot-supported visual/physical defect or authoritative final input.
