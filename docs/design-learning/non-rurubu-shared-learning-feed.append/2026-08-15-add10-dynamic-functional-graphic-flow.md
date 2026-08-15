# NRSL — Dynamic copy and functional graphics should share structure when their physical zones interact

Source scope/item: non-Rurubu / ADD-10 会場案内サイン

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A blank-frame clean-room V4 wayfinding candidate used a large native destination stack followed by a fixed horizontal direction-axis SVG. Short production placeholder copy looked correct, but the required longer stress role `披露宴会場 / RECEPTION HALL` expanded the Japanese destination to two lines and caused the fixed direction axis to intersect the English/floor-room region.

## Root-cause hypothesis

A functional graphic can become structurally dependent on dynamic text even when the graphic itself has no text. If both occupy the same vertical reading path, keeping the graphic at an absolute coordinate makes long-copy safety depend on one particular copy mass.

## Bounded test

ADD-10 V4 left/right production and stress copies were changed from separate absolute destination/arrow regions to one native vertical auto-layout container:

- `LAYOUT / DESTINATION + DIRECTION FLOW`
- native destination stack first;
- editable SVG direction axis second;
- 90 px semantic gap.

The forward variant was intentionally not changed because its text and vertical arrow occupy separate horizontal zones and did not reproduce the collision.

## Expected improvement

The functional arrow should move with the copy mass rather than collide with it, while remaining independently editable as vector geometry.

## Regression risk

Do not bind every decorative graphic to text. Over-binding can make intentionally fixed physical marks drift or can create unnecessary auto-layout complexity. Use this only where screenshot/stress evidence proves that the graphic and dynamic copy compete for the same physical zone.

## Three-scale / stress evidence

- clean V4 family whole-item / thumbnail: PASS after removal of an accidental auto-layout white fill;
- representative left candidate actual-size `1400×1980`: PASS;
- initial long-copy left/right stress: FAIL due text/axis collision;
- same long-copy after structural flow repair: PASS for left/right;
- forward long-copy remained PASS without the flow because its geometry is independent.

## Figma / Drive / GitHub evidence

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- V4 section: `32:2`
- V4 production: `32:3 / 32:15 / 32:27`
- stress section: `33:2`
- stress frames: `33:3 / 33:15 / 33:27`
- structure after repair: production and stress all native text `6`, IMAGE fills `0`, outside visible text `0`; left/right each contain one adaptive destination+direction flow.
- Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- item evidence: `01_paper-items/additional-wedding-items/ADD-10-venue-guide-signs/CLEANROOM-V4-STUDY-2026-08-15.md`
- item Git commit: `6b64c430b036406d8779ec07633872e49d7d8154`

## What must remain item-specific

Do not transfer ADD-10's transit-index composition, mint arrow axis, serif destination scale, 90 px gap, A4 coordinates, palette, or arrow endpoint treatment.

## Cross-item applicability hypothesis

On another print artifact, when a replaceable vector/icon/mark is positioned immediately after variable-height copy in the same physical reading path, test a realistic long-copy case. If the copy can intrude into the graphic's fixed coordinate, compare an adaptive structural relationship instead of compensating with arbitrary extra whitespace.

## Next receiving-item experiment

A future materially different item with dynamic copy adjacent to a functional non-text graphic may test the method. Promotion requires independent reproduction without importing ADD-10's visual language.
