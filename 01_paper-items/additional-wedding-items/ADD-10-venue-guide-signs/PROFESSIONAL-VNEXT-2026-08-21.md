# ADD-10 Professional vNext — 2026-08-21

Status: `VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start `main`: `40622322b733f4ab2709e15ea31a9e0c270ee11a`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `VISUAL_REOPENED`
- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- prior clean-room V4 preserved: `32:3 / 32:15 / 32:27`
- earlier vNext V2 family preserved: `48:31 / 48:42 / 48:53`
- retained legacy family preserved: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`

## Clean-room inputs

Only non-visual requirements were carried into the new work:

- A4 working canvas `1400×1980`;
- Japanese-first wayfinding;
- native semantic destination placeholder `[目的地]`;
- native floor/room placeholder `[階数・部屋名]`;
- left / right / forward direction roles;
- date context `2026.10.24`;
- official destination names, installation-specific route truth, final floor/room, sign count and installation locations remain unresolved and were not fabricated.

No prior V4/legacy layout, palette, arrow geometry, spacing, decoration, image crop, or generated asset was used as a construction source.

## V2 rejection after live screenshot review

The first blank-frame vNext direction, `SUNSHINE ARROW`, was built as:

- `48:31 / LEFT`
- `48:42 / RIGHT`
- `48:53 / FORWARD`

Live screenshots verified direction truth but exposed a higher-level art-direction weakness: the composition remained too sparse and polite for the current professional brief. The cream field, small sun/accent gestures and isolated axis produced competent wayfinding, but not enough first-glance energy or memorable print presence to justify promotion over the retained V4.

Per clean-room policy, V2 was not incrementally restyled into V3. It remains preserved as rejected comparison evidence.

## Fresh blank-frame V3 — COLOR SIGNAL

A materially different V3 was authored on a new blank page without duplicating V2/V4/legacy production:

- page `49:2 / VNEXT_V3_SELECTED / ADD-10 / COLOR SIGNAL / 2026-08-21`
- left `49:3 / VNEXT_V3_SELECTED / ADD-10 / COLOR SIGNAL / LEFT`
- right `49:19 / VNEXT_V3_SELECTED / ADD-10 / COLOR SIGNAL / RIGHT`
- forward `49:33 / VNEXT_V3_SELECTED / ADD-10 / COLOR SIGNAL / FORWARD`

One-sentence concept:

> A venue sign should read like a bold travel departure signal from across the room: one destination, one unmistakable direction, one celebratory color hit.

Visual system:

- deep-ocean navy is the dominant high-contrast field;
- cream native Japanese destination/floor copy carries the information hierarchy;
- a single oversized coral direction vector is the memorable gesture;
- yellow and lagoon are restrained indexing accents, not decorative clutter;
- the lower warm-paper band holds the human guidance phrase and date;
- no fake airport code, barcode, route node, badge, card grid, shadow, gradient, stock travel image, or decorative English filler.

The functional arrow uses editable imported SVG vector geometry rather than raster imagery. LEFT/RIGHT/FORWARD paths are explicit and independently screenshot-verified.

## Hybrid authoring split

- destination / floor-room / guidance / date: native editable Figma text;
- functional direction gesture: editable SVG vector tree (`FRAME → VECTOR`);
- fixed accent fields: simple native geometry;
- replaceable image role: `0`;
- generated/composed raster: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the visible bottleneck was recognition, hierarchy and emotional force, not missing photography/illustration. Adding destination imagery would slow one-glance wayfinding and increase stock/AI-template risk.

## Long-copy stress

Rollback-safe stress proof:

- `49:47 / QA / ADD-10 V3 / LONG COPY STRESS / LEFT / PASS / HIDDEN`

Stress copy:

- destination: `[メインダイニング・レセプション会場]`
- floor/room: `[ホテル棟 3階・オーシャンビュー バンケットルーム]`

The first stress run failed visibly because the initial 156px destination scale expanded into the floor/room role. The selected family was then hardened without changing the concept:

- destination scale `156 → 120` with 150px line-height and 1180px width;
- floor/room width expanded to 1180px and positioned deeper;
- functional arrow moved lower to preserve a stable copy lane.

Final stress result:

- destination bottom `540`;
- floor/room top `610`, giving `70px` clearance;
- arrow top `850`, giving `170px` clearance below floor/room;
- outside visible text `0`;
- screenshot PASS.

## Native text geometry failure caught and repaired

Structural readback reproduced the previously known failure fingerprint:

`AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID`

The screenshot looked correct, but KICK / NOTE / DATE roles initially retained `textAutoResize=NONE` and nominal `10px` heights. Destination/floor roles were already auto-height.

A first repair attempt also exposed an ordering detail: setting `textAutoResize=HEIGHT` and then calling `resize()` can revert the role to fixed geometry. Final repair therefore preserves width/height first and sets `textAutoResize=HEIGHT` last.

Final selected/stress family:

- all semantic text nodes: `textAutoResize=HEIGHT`;
- outside text: `0`;
- IMAGE fills: `0`;
- functional arrow: editable vector tree, not flattened raster.

## Three-scale visual QA

Whole-item / thumbnail:
- PASS. Destination + oversized coral direction are immediate; no admin/dashboard/card reading remains.

Reading scale:
- PASS. Japanese-first hierarchy is clear; the lower guidance band provides warmth without competing with the route signal.

Actual-size `1400×1980`:
- PASS. Cream/navy contrast, destination typography, arrow silhouette and supporting copy remain credible at A4 working size.

Direction truth:
- LEFT screenshot: PASS;
- RIGHT screenshot: PASS;
- FORWARD screenshot: PASS.

## Comparison against retained V4 — only after V3 maturity

The retained V4 left `32:3` was opened only after V3 completed long-copy, structure and three-scale QA.

V4 remains clean and functional, but its pale field + thin mint axis reads quieter and more generic at distance. V3 clearly improves the current brief on:

- recognition speed;
- emotional energy;
- bold travel/departure character;
- memorable thumbnail identity;
- distance legibility.

V3 therefore wins the current professional reset without deleting or overwriting V4.

## Professional Design Council score

`91 / 100`

- Concept clarity / ownability: 14/15
- Emotional excitement / pick-up value: 13/15
- Japanese typography / editorial craft: 14/15
- Composition / hierarchy / rhythm: 14/15
- Travel-flight-Hawaii integration without cliché: 7/10
- Item-specific wayfinding functionality: 10/10
- Physical print credibility: 9/10
- Editability / content resilience: 5/5
- Family fit without template sameness: 5/5

No Executive Creative Director, Japanese Editorial, or Print Production veto remains.

## Deferred finalization

Still unresolved and not fabricated:

- official venue destination names;
- exact left/right/forward truth per installation point;
- final floor/room labels;
- sign count / installation locations;
- frame/stand/wall-mount interference;
- matte/low-glare venue-light proof;
- route walk-through by a first-time visitor;
- printer profile/template, bleed/trim and physical proof.

## Result

`VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-11 写真共有 / QR案内` professional vNext clean-room reset.
