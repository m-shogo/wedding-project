# ADD-06 フォトブースサイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_PROMOTED / CONTINUOUS_STRIP_ARTIFACT_PASS / TOP_CROP_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / SVG_EDITABILITY_PASS / DRIVE_MASTER_VERIFIED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-27
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current page: `56:105 / CURRENT_SELECTED / ADD-06 / STRIP IN THE LIGHT / 2026-08-25`
- Current root: `56:106 / CURRENT / ADD-06 / STRIP IN THE LIGHT / CONTINUOUS DEVELOPED PRINTS`
- Current top crop: `56:107 / DECOR / CORAL TOP CROP` — **hidden after 2026-08-27 bounded subtraction QA**
- hidden Current long-copy proof: `56:157 / QA / LONG COPY / STRIP IN THE LIGHT`
- long-copy top crop: `56:158` — **hidden after the same QA**
- no-top-crop comparison: `57:2` — hidden after verification
- no-top-crop long-copy comparison: `57:53` — hidden after verification
- pre-change rollback Current: `57:104`
- pre-change rollback long-copy: `57:155`
- clean-room study page: `55:2 / CLEANROOM STUDY / ADD-06 / CONTINUOUS STRIP / 2026-08-25`
- V3-A study winner: `55:3 / STRIP IN THE LIGHT`
- V3-B rejected study: `55:54 / AFTERGLOW CONTACT SHEET`
- retained pre-promotion Current: `45:2 / PHOTO STRIP DOORWAY`

Exact Drive authority:

- folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- adopted SVG master: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1 / photo-strip-continuous-developed-prints-v2.svg`

Current evidence:

- `CLEANROOM-V3-STRIP-IN-THE-LIGHT-PROMOTION-QA-2026-08-25.md`
- `CONTINUOUS-PHOTO-STRIP-V2-REFINEMENT-QA-2026-08-25.md`
- `OBSERVED-TOP-CORAL-CROP-WEB-HEADER-RISK-2026-08-27.md`
- `FIGMA-TOP-CORAL-CROP-SUBTRACTION-QA-2026-08-27.md`
- previous 2026-08-23/24 bounded-polish evidence remains retained history.

## Current direction — STRIP IN THE LIGHT

The 2026-08-25 V3 was built from blank Figma frames using only verified size and semantic content requirements. It did not duplicate the prior production layout, old three-card photo geometry, old decorative vectors, crops, or background composition.

The dominant artifact is one continuous physical photo-booth strip with four non-person abstract exposures:

1. coastal dawn / horizon;
2. flash bloom;
3. reception light trails / movement;
4. night water / afterglow.

The strip is editable SVG fixed art. It contains no authoritative copy, fake camera UI, barcode, reticle, or generated guest/couple identity.

Reading hierarchy:

1. native `写真撮影はこちら`;
2. native `フォトブース`;
3. native guidance;
4. date `2026.10.24` and unresolved `[会場内設置場所]`;
5. native closing copy.

The composition uses an open warm-cream editorial field, a slightly rotated continuous strip on the left, and a lower dark physical information field. The former full-width coral top crop is no longer visible because bounded QA proved it behaved as a web/app header rather than a physical print role.

## 2026-08-27 top-crop subtraction — VERIFIED_LOCAL

### Visible defect

`56:107 / DECOR / CORAL TOP CROP` was a full-width `990×28` coral bar at the canvas top edge. Fresh ≈500px and ≈1000px review showed it reading before the photo-strip artifact and visually detached from native copy, the lower information field, trim/fold/binding semantics, or any reader-facing function.

Normalized fingerprint:

`FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`

### Bounded test

Only the crop role was changed.

- normal comparison: `57:2`
- long-copy comparison: `57:53`

Both candidates hid only their copied `DECOR / CORAL TOP CROP`. Typography, SVG, lower field, copy, date/location/closing geometry, asset provenance and image roles did not change.

### Three-scale result

- whole-item / 500px: **PASS and stronger than Current-with-crop**; the continuous strip + Japanese hero become the immediate first read;
- reading / 1000px: **PASS**; the page loses the web-header frame without becoming sparse;
- native `990×1400`: **PASS**; no lost trim/binding or artifact role appears;
- realistic long-copy / native `990×1400`: **PASS**.

### Rollback and promotion

Before Current mutation:

- rollback Current: `57:104`
- rollback long-copy: `57:155`

Promoted bounded change:

- `56:107` → hidden
- `56:158` → hidden

Comparison frames were hidden after verification.

This restores the sellable visual gate. Coral itself remains valid inside the four-exposure SVG; only the unbound full-width canvas-edge bar was removed.

## Sellable visual gate

Professional Design Council remains **94/100 / NO VETO** from the clean-room V3 promotion, with the residual top-crop defect now closed.

Current again qualifies for:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

The retained V3 direction remains stronger than old `45:2` because it reads as one real photo-booth strip rather than three independent icon/card modules, preserves Japanese-first hierarchy, and carries wedding warmth through successive exposure moments rather than UI chrome.

## Long-copy / Japanese typography QA

Hidden proof: `56:157`.

Verified stress includes:

- `撮影の順番を確認しながら、空いている撮影スペースへゆっくりお進みください。`
- `[メインダイニング前・フォトブース特設スペース]`
- `写真を撮って、今日の楽しい思い出をそれぞれのおうちまで持って帰ろう。`

Result remains **PASS** after top-crop subtraction. The long location remains inside the lower dark field; closing copy remains separated beneath it.

## Structure / hybrid QA

Current `56:106` after promotion:

- native text roles: `7`;
- fixed-height visible text: `0` from prior verified structure evidence;
- IMAGE fills: `0`;
- generated raster: `0`;
- semantic/factual copy baked into SVG: `0`;
- top crop visible: `false`;
- editable SVG root remains `56:108`.

Long-copy `56:157` retains the same hybrid structure with its crop hidden and remains hidden after QA.

Responsibility split:

- variable/factual/emotional copy: native Figma text;
- photo-strip fixed art: editable SVG;
- unresolved final location: native semantic placeholder;
- no fake guests/couple/children/dog imagery.

## Drive asset lifecycle

Drive folder was live-confirmed before the 2026-08-27 change:

- folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`;
- adopted SVG: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1`;
- no new Drive write required.

`IMAGE_GENERATION_NOT_REQUIRED`: the verified defect was purposeless fixed geometry, not missing photography, illustration, texture, background, or hero art.

## Learning state

Top-crop result: `VERIFIED_LOCAL`.

Transfer only this narrow QA hypothesis:

> A full-width decorative edge with no trim, fold, binding, physical-artifact, hierarchy, or reader-facing job can make a print composition read like a web/app header. Test bounded subtraction at whole/read/actual scales before retaining it.

Do not transfer the exact coral treatment, coordinates, photo-booth composition, or a blanket `remove top edges` rule. A top color field may still be correct when another item independently proves a real emotional or binding function.

No new project-wide rule is promoted from ADD-06 alone.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

These do not block visual progression to the next item.

## Decision / next

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / TOP_CROP_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / SVG_EDITABILITY_PASS / DRIVE_MASTER_VERIFIED / ROLLBACK_SAFE / NOT_PRINT_READY`.

Continue progression order with ADD-07 and later items, redesigning only when a fresh screenshot-supported defect or family-level repetition is actually visible.