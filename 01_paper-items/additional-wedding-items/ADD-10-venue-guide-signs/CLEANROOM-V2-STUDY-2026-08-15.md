# ADD-10 会場案内サイン — Clean-room V2/V3 Study — 2026-08-15

Status: `VISUAL_REOPENED / CLEANROOM_V2_STRUCTURAL_PASS / CLEANROOM_V3_STRUCTURAL_PASS / V3_REJECTED_POST_COMPARISON_CONVERGENCE / LEGACY_PRESERVED / NOT_PROMOTED / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Authority readback

- latest main immediately before V3 evidence write: `306c1178cb0db1c1b76dd2f79821c6f1d3b90cb6`
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

No existing production frame was visually inspected before V2 or before V3 authoring. V3 was also authored as a new blank-frame concept rather than cloning V2.

## Clean-room V2 A4 family

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

### V2 structure readback

Each A4 candidate reports:

- native editable text nodes: `5`;
- raster IMAGE-fill nodes: `0`;
- semantic direction-arrow nodes: `1`;
- text outside root: `0`.

The destination stack is native auto-layout and remains editable.

### V2 visual QA

The first family screenshot confirmed immediate arrow/destination readability and no UI-card pattern, but the lower field remained too inactive. V2 therefore read as a functional wayfinding prototype rather than an unequivocally sellable wedding-signage system.

Decision: `VISUAL_NOT_PROMOTED`.

Legacy production was not opened at this point.

## Clean-room V3 A4 family

V3 was then authored from blank authority facts in a materially different `hotel-sign slab` direction, without duplicating V2.

Section:

- `31:2 / CLEANROOM_ADD10_V3_A4_HOTEL_SIGN_2026_08_15`

Candidates:

- `31:3 / CLEANROOM_ADD10_V3_A4_LEFT`
- `31:15 / CLEANROOM_ADD10_V3_A4_RIGHT`
- `31:27 / CLEANROOM_ADD10_V3_A4_FORWARD`

V3 direction:

- direction and information are separated into large physical sign planes rather than floating as small objects in one open field;
- left/right use independent deep-navy directional slabs with large ivory arrows;
- forward uses a top directional slab and a separate lower information field;
- destination Japanese text was increased to venue-distance scale;
- mint route-axis rule and destination node provide a restrained structural cue;
- all copy remains native; arrows/rules remain editable vectors;
- no raster or generated decoration.

## V3 long-copy / structure QA

QA section:

- `31:39 / QA_CLEANROOM_ADD10_V3_LONG_COPY_2026_08_15`

Stress candidates:

- `31:40`
- `31:52`
- `31:64`

Stress content used the longer required candidate `披露宴会場 / RECEPTION HALL` and a materially longer floor-room placeholder.

Programmatic readback for all three stress frames:

- native editable text nodes: `5` each;
- raster IMAGE-fill nodes: `0` each;
- text outside root: `0` each.

Screenshot QA showed the forward variant remained clean; left/right wrapped `披露宴会場` to two lines but stayed readable and non-destructive. This is a structural PASS, not final-copy proof.

## Post-completion legacy comparison

Only after V3 and V3 long-copy/structure QA were complete was retained production opened for comparison.

Retained production evidence inspected:

- `2:2 / A4_LEFT_LAYOUT_TEMPLATE`
- `2:13 / A4_RIGHT_LAYOUT_TEMPLATE`

Result: `V3 REJECTED FOR PROMOTION / POST_COMPARISON_VISUAL_CONVERGENCE`.

The retained A4 family already uses a large deep-navy directional side field with a large ivory arrow and an ivory information field. Although V3 was independently authored from blank frames and improved scale, typography, route-axis treatment, and placeholder discipline, the final silhouette converges too closely to retained production to serve as a convincing clean-room replacement direction.

This is not node reuse and does not invalidate the structural QA, but it fails the stricter clean-room visual-independence goal.

Failure fingerprint:

- `POST_COMPARISON_VISUAL_CONVERGENCE` — an independently authored candidate can still converge toward the retained silhouette; discovery after completion requires rejecting it as promotion evidence rather than rationalizing similarity.

V3 remains preserved as valid structural/process evidence but is not promoted.

## Hybrid responsibility split

Across V2/V3:

- destination / English label / floor-room / TBD note / date-location: native Figma text;
- arrow / destination node / structural rules: new editable vector geometry;
- raster/composed decoration: not required under the current SPEC;
- replaceable image role: not applicable.

## Next method change

The next ADD-10 attempt must be a new clean-room V4 from authority facts only and must avoid both the open-field V2 and side-slab V3 grammars. Do not use retained production, V2, or V3 as a component/source. A materially different route should be explored, for example a typographic/axis-led hanging-sign or transit-index composition where the arrow and Japanese destination create one directional gesture without a full-height side slab.

Complete V4 structure + long-copy QA first, then compare only after completion.

## Generation decision

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`.

The SPEC explicitly favors native direction vectors and typography and forbids photography. The current weakness is art-direction independence, not a shortage of raster art.

## Deferred finalization

- actual route directions and branching points;
- official floor / room names;
- number of signs and placement map;
- stand / wall / tabletop installation method;
- venue existing-sign coordination;
- optional 90×210 narrow-format adoption;
- printer bleed/profile and 100% physical proof.

These remain `DEFERRED_FINALIZATION` / `BLOCKED_REQUIRED_INPUT`. V2/V3 and retained production remain preserved.
