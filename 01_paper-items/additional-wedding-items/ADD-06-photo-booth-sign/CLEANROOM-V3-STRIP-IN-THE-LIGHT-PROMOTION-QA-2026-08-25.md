# ADD-06 Photo Booth — Clean-room V3 `STRIP IN THE LIGHT` promotion QA

Status: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_PROMOTED / LONG_COPY_STRESS_PASS / SVG_EDITABILITY_PASS / DRIVE_MASTER_VERIFIED / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-25
Run start main SHA: `18a664b6cc80097c16d42a708aead2f3645b00ee`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority and scope

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- old retained Current: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- clean-room study page: `55:2 / CLEANROOM STUDY / ADD-06 / CONTINUOUS STRIP / 2026-08-25`
- V3-A study winner: `55:3 / STRIP IN THE LIGHT`
- rejected V3-B study: `55:54 / AFTERGLOW CONTACT SHEET`
- V3-A long-copy stress: `55:107`
- promoted Current page: `56:105 / CURRENT_SELECTED / ADD-06 / STRIP IN THE LIGHT / 2026-08-25`
- promoted Current root: `56:106 / CURRENT / ADD-06 / STRIP IN THE LIGHT / CONTINUOUS DEVELOPED PRINTS`
- hidden promoted long-copy proof: `56:157`
- exact Drive authority folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- adopted SVG Drive master: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1 / photo-strip-continuous-developed-prints-v2.svg`
- Git SVG source: `01_paper-items/additional-wedding-items/ADD-06-photo-booth-sign/assets/photo-strip-continuous-developed-prints-v2.svg`

Rurubu item-specific Figma/Drive/assets/paths were not read or used.

## Clean-room rebuild contract

The V3 study was built on a newly created blank Figma page/frame. It did not duplicate the old Current, old V2/V3 layout, old dark left rail, old three-card print geometry, old decorative vectors, crops or generated assets.

Only verified facts/semantic requirements were re-authored:

- physical canvas: `990×1400`;
- reader-facing roles: `PHOTO BOOTH`, `写真撮影はこちら`, `フォトブース`, guidance, `2026.10.24`, `[会場内設置場所]`, closing message;
- unresolved venue location remains an explicit native placeholder;
- no invented venue facts, names, QR, camera UI, barcode, transport credential or person imagery.

## Professional art direction

Visible weakness in the retained Current: the left visual still read as three separate colorful cards/icons even after individual tape/reflection cleanup. That artifact reading was weaker than the concept name `PHOTO STRIP DOORWAY` implied.

V3-A reframes the artifact around one literal continuous developed-print strip:

- one cream photo-paper object containing four successive abstract exposures;
- the strip is slightly rotated and occupies the left physical zone without a full-height dark UI-like rail;
- large Japanese headline and native guidance remain on an open cream editorial field;
- date/location/closing copy are grounded in one lower dark physical field rather than repeated cards/pills;
- the top coral crop creates one celebratory signal rather than multiple small badges.

V3-B used a dark outer page plus centered cream sheet and date block. At 500px it read more like a poster mounted on a dark background and had weaker immediacy, so it was rejected rather than promoted.

## Hybrid authoring split

- variable/factual/emotional copy: seven native Figma text roles;
- fixed photo-strip art: editable SVG imported as a vector node tree;
- replaceable photography: `0`;
- generated raster: `0`;
- people / couple / guests / children: `0`;
- authoritative copy baked into SVG: `0`.

The SVG root in promoted Current is `56:108`; readback showed `40` descendants, `28` vector-like editable nodes. The fixed-art remains an editable vector composition rather than a flattened image.

## Three-scale visual QA

### Whole-item / thumbnail ≈500px

PASS.

Compared with old Current `45:2`, V3-A reads more immediately as a physical photo-booth strip rather than three independent cards. The Japanese headline remains the first textual read; the strip supports rather than becoming fake camera UI.

### Reading scale ≈1000px

PASS.

The four exposures remain distinct and print-like. The flash-bloom frame no longer reads as a logo. The open cream field prevents the new fixed art from turning the sign into a gallery/filmstrip UI.

### Actual size `990×1400`

PASS.

The strip paper edge, four exposure windows and grain remain legible without excessive noise. The lower dark field keeps date/location/closing information readable and preserves print contrast.

## Long-copy and Japanese typography QA

Hidden proof: `56:157` (source stress study `55:107`).

Stress copy verified:

- guidance: `撮影の順番を確認しながら、空いている撮影スペースへゆっくりお進みください。`;
- location: `[メインダイニング前・フォトブース特設スペース]`;
- closing: `写真を撮って、今日の楽しい思い出をそれぞれのおうちまで持って帰ろう。`.

Result: PASS. The longest tested location stays inside the dark field and the closing copy remains separated below it.

A structural defect was caught during this run: the multiline hero initially reverted to fixed height because `resize()` had been applied after `textAutoResize`. The authoring order was corrected and all seven native text roles in promoted Current and stress were explicitly read back as `textAutoResize=HEIGHT`.

Promoted Current text structure:

- native text: `7`;
- auto-height: `7/7`;
- fixed-height visible text: `0`;
- SVG authoritative text: `0`;
- IMAGE fills: `0`.

## Drive asset lifecycle

The adopted SVG master was saved only after the Figma visual comparison selected V3-A.

Drive readback:

- file ID: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1`;
- file: `photo-strip-continuous-developed-prints-v2.svg`;
- MIME: `image/svg+xml`;
- size: `3124 bytes`;
- created/modified: `2026-08-25T04:31:36.758Z`;
- parent: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`.

This closes `candidate → Figma comparison → selected → Drive master verified → promoted Figma Current` for this fixed-art role.

## Sellable comparison decision

Professional Design Council result: `94/100 / NO VETO`.

V3-A clearly beats the retained Current at the reopened visual gate because:

1. the physical artifact is now one continuous photo strip instead of three icon-like cards;
2. whole-item hierarchy is more editorial and less UI-rail driven;
3. wedding warmth/pop remains through coral, flash glow, reception motion and night-water exposures without generated people or stock imagery;
4. variable copy remains native and stress-safe;
5. the fixed-art has real vector editability and an adopted Drive master.

Old Current `45:2` and all previous study/rollback/history nodes remain preserved.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

No final location or venue implementation fact was invented in order to promote the visual design.
