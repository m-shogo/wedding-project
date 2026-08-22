# ADD-06 フォトブースサイン — Coral Tape Subtraction QA

Date: 2026-08-23
Status: `VERIFIED_LOCAL / CURRENT_UPDATED / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`
Start main SHA: `94ac78dadafa52916c85b3c1db166922af8012d9`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- long-copy proof: `47:19 / QA / FAMILY-DIVERSE ADD-06 / PHOTO STRIP LONG COPY STRESS`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- Drive authority live-read back before Git evidence write; Drive write `0`.

## Visible defect

The Current had a coral rotated rectangle named `DECOR / CORAL TAPE` at the top-left transition between the dark photo-strip stock and the cream editorial field.

At whole-item scale it did not visibly attach any of the three photo frames, did not bind a text/image relationship, and did not represent trim, mounting, ticket, fold, photo-corner or another physical production function. Instead it read as an isolated decorative accent immediately above the first photo, adding one more small graphic gesture to an otherwise strong photo-strip artifact.

This was tested using the existing shared `binding-function check` method rather than assuming that every decorative line/bar should be removed.

## Bounded comparison

Rollback-safe comparison:

- `51:2 / VERIFIED / ADD-06 / NO AMBIGUOUS CORAL TAPE / 2026-08-23`

Only `DECOR / CORAL TAPE` was hidden. No typography, image-frame geometry, developed-print fixed art, photo-strip stock, spacing, date/location, or semantic copy changed.

Whole-item comparison showed that removal improved the first-read hierarchy:

`PHOTO BOOTH → 写真撮影はこちら → フォトブース → guidance`

The physical photo-strip identity remained fully legible without the bar. The top of the page became calmer and less template-decorated while the three developed prints still carried the photographic artifact cue.

## Promotion / rollback

Complete pre-change rollback copies were preserved:

- Current rollback: `51:33`
- long-copy rollback: `51:64`

Production updates:

- Current coral tape `47:53`: hidden
- long-copy coral tape `47:27`: hidden

The comparison `51:2` was retained hidden as verified evidence. No other design node was changed.

## Three-scale QA

- whole-item / ~500–700px: PASS; the page reads more directly and no longer needs a floating tape accent to feel active.
- reading / 1000px: PASS; the photo strip remains clearly physical and the Japanese hierarchy is cleaner.
- actual `990×1400`: PASS.
- long-copy proof remains structurally synchronized with the same subtraction.

## Structure / hybrid QA

Post-change:

### Current `45:2`
- visible native text `7`
- auto-height `7/7`
- fixed-height visible text `0`
- outside visible text `0`
- IMAGE fills `0`
- `DECOR / CORAL TAPE`: hidden

### Long-copy proof `47:19`
- visible native text `7`
- auto-height `7/7`
- fixed-height visible text `0`
- outside visible text `0`
- IMAGE fills `0`
- `DECOR / CORAL TAPE`: hidden

Responsibility split remains unchanged:

- variable/factual copy: native text;
- photo-strip/developed-print fixed art: native fixed geometry;
- SVG: `0`;
- generated raster: `0`;
- replaceable image role: `0`;
- Drive write: `0`.

## Learning status

`VERIFIED_LOCAL` application of the already cross-item-verified binding-function QA method: a bar/rule/tape should be retained only when whole-item review proves a real binding, physical, or semantic job.

This does not create a new project rule and does not imply that tape, borders, rails or attachment cues should be removed from other artifacts. The exact coral bar and photo-strip composition are ADD-06-specific.

## Deferred finalization

Unchanged:

- final booth wording/location;
- actual mounting/stand method and sightline;
- printer template/profile and bleed/safe area;
- physical print and venue-lighting proof.
