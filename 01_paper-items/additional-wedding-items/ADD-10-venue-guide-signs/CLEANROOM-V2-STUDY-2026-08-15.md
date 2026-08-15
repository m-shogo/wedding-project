# ADD-10 会場案内サイン — Clean-room V2 Study — 2026-08-15

Status: `VISUAL_REOPENED / CLEANROOM_V2_A4_CREATED / STRUCTURE_PASS / VISUAL_NOT_PROMOTED / LEGACY_PRESERVED / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Authority readback

- latest main immediately before evidence write: `eae804351507e12261fd513b36369a0ea586ac12`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- authoring page: `99_QA`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive live readback: folder verified and empty; no asset write required
- Drive writes this iteration: `0`

## Allowed clean-room inputs

Only current SPEC facts and constraints were used before authoring:

- item role: modular venue wayfinding system;
- confirmed context: `YOKOHAMA`, `2026.10.24 SAT`, ceremony `14:10–14:40`, reception `15:00–17:30`;
- core format under test: A4 portrait;
- required candidate destination role used for layout: `受付 / RECEPTION`;
- floor, room, actual branching point, sign count, installation method, and arrow direction remain unconfirmed for production;
- Japanese destination is first hierarchy, English is secondary;
- arrow is a major functional element;
- ivory / deep navy / mint / restrained structural-line palette;
- no photography, flags, barcode, stamps, ticket/passport/Rurubu grammar, or equal-card Web UI;
- variable destination / floor / room / direction must remain native editable text/vector.

No existing production frame or previous ADD-10 clean-room family was visually inspected before this V2 family was created.

## New clean-room V2 A4 family

Section:

- `30:2 / CLEANROOM_ADD10_V2_A4_WAYFINDING_2026_08_15`

Candidates:

- `30:3 / CLEANROOM_ADD10_V2_A4_LEFT`
- `30:16 / CLEANROOM_ADD10_V2_A4_RIGHT`
- `30:29 / CLEANROOM_ADD10_V2_A4_FORWARD`

Direction:

- three A4 direction prototypes were built from blank frames rather than duplicated from retained production;
- left/right are optically composed independently rather than implemented as a mechanical mirrored component;
- forward uses a separate vertical hierarchy;
- a large mint editable arrow is the primary directional device;
- `受付` is dominant Japanese copy, `RECEPTION` is subordinate English copy;
- floor/room remains `[階数・部屋名 · LAYOUT DUMMY]`;
- every candidate carries `[方向・設置地点は未確定 / EXPORT前に会場確認必須]` so a template cannot be mistaken for an approved route;
- YOKOHAMA + date are the only small confirmed context line;
- no raster imagery or generated decoration was introduced.

## Hybrid responsibility split

- destination / English label / floor-room / TBD note / date-location: native Figma text;
- arrow / destination node / structural rules: new editable vector geometry;
- raster/composed decoration: not required under the current SPEC;
- replaceable image role: not applicable.

## Structure readback

Each A4 candidate currently reports:

- native editable text nodes: `5`;
- raster IMAGE-fill nodes: `0`;
- semantic direction-arrow nodes: `1`;
- text outside root: `0`.

The destination stack is native auto-layout and remains editable.

## Whole-family screenshot QA

The first family screenshot confirms:

- direction and destination remain immediately readable;
- no card/dashboard UI pattern is present;
- all three variants remain sparse and physically plausible as wayfinding signs;
- no fake floor/room/direction fact was introduced.

However the screenshot also exposes a quality issue: the lower half of the A4 field is still too inactive, so the family currently reads as a strong functional wayfinding prototype rather than an unequivocally sellable wedding-signage system.

Decision: `VISUAL_NOT_PROMOTED`.

The retained production was therefore not opened for visual comparison in this iteration; a weak V2 does not earn a legacy comparison merely because it is structurally valid.

## Next method change

Create a fresh V3 direction from blank authority facts, without using this V2 as a visual source. The next direction should increase physical-sign presence through scale, optical information placement, and route-axis treatment rather than adding decorative icons, cards, or raster imagery. Only after V3 completes long-copy / structure QA should retained production and V2 be opened for final comparison.

## Generation decision

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`.

The SPEC explicitly favors native direction vectors and typography and forbids photography. The current weakness is composition / field activation, not a shortage of raster art.

## Deferred finalization

- actual route directions and branching points;
- official floor / room names;
- number of signs and placement map;
- stand / wall / tabletop installation method;
- venue existing-sign coordination;
- optional 90×210 narrow-format adoption;
- printer bleed/profile and 100% physical proof.

These remain `DEFERRED_FINALIZATION` / `BLOCKED_REQUIRED_INPUT`. The V2 study remains rollback-safe comparison evidence only.
