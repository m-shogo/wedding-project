# ADD-06 Photo Booth — Continuous Photo Strip fixed-art candidate

Status: `SERIOUS_COMPARISON_CANDIDATE / PRE_FIGMA / COMPOSITION_PROXY_PASS / CURRENT_UNCHANGED`
Date: 2026-08-25
Start main SHA: `a2b8bbc15442ff5788b688d1c060380a273ddcc8`
Latest authority recheck before this update: `2823c4de5c82be621a3e97a050f50544417efd53`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority recheck

- Current Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- Current long-copy proof: `47:19`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- Drive folder metadata readback: exact ID/name confirmed live on 2026-08-25; candidate remains unadopted so Drive write stays `0`.
- canonical QA remains `QA.md`; production is unchanged.

## Visible problem

Fresh whole-item and reading-scale screenshots still pass structurally, but the left visual device is weaker than the words `PHOTO STRIP DOORWAY` imply. It currently reads as three independent instant-photo cards with simple flat abstract scenes. At reading scale the composition is clear, but the cards can read closer to small graphic icons than to one continuous photo-booth artifact.

This is not a reason to reject the Current. The Current remains sellable and functional. It is a focused visual-quality hypothesis: a single continuous four-exposure booth strip may make the artifact identity more immediate and richer without adding fake camera UI, people, stock photography or variable text.

## Live geometry evidence — 2026-08-25

Current Figma metadata was re-read rather than inferred from old chat evidence:

- Current root: `990×1400`.
- dark left stock `47:46`: `x=0 / y=0 / w=318 / h=1400`.
- existing three paper frames: `x=56 / w=206`, at `y=150`, `505`, `860`, each `h=270`.
- right-side native-copy lane begins at `x=390`.
- semantic text nodes remain seven native roles: kicker / hero / role / guide / date / location / footer.

This proves the continuous-strip comparison can stay completely inside the existing fixed-art lane without touching native text geometry.

### Exact comparison placement contract

For the next safe Figma comparison, import the `320×1120` SVG as a single editable-vector role and fit it proportionally to:

- target box: approximately `x=19 / y=145 / w=280 / h=980` inside the 318px dark stock;
- preserve aspect ratio; do not stretch non-uniformly;
- preserve at least ~19px dark-stock reveal left/right so the cream strip reads as a physical print object;
- do not move the right native text lane merely to make the asset fit;
- hide the three existing developed-print groups only in the comparison copy/role, never in Current before the candidate wins;
- keep the dark stock as the backing surface for the bounded test.

At this placement the candidate occupies approximately the same overall vertical territory as the three existing card objects while converting the visual grammar from `three isolated cards` to `one continuous booth artifact`.

## Professional design reasoning

Relevant neutral principles used:

- publication design should balance a stable theme with meaningful variation rather than repeat decorative modules mechanically;
- book/editorial design should treat printed-object behavior and storytelling as part of the design, not only surface decoration;
- travel/editorial work benefits when one authentic physical or atmospheric gesture carries the idea instead of many literal travel symbols.

References consulted in the originating run:

- Pentagram Editorial Design — https://www.pentagram.com/editorial-design
- Pentagram Book Design — https://www.pentagram.com/book-design
- Pentagram Travel + Leisure — https://www.pentagram.com/work/travel-leisure

## Bounded candidate

Editable SVG:

- `assets/photo-strip-continuous-developed-prints-vnext.svg`
- master size: `320×1120`
- one continuous paper strip with four exposure windows;
- fixed-art only; no final/variable/semantic copy baked in;
- no people, bride/groom, guests, children, dog, fake documentary moments or fake UI;
- no barcode, reticle, camera controls, booth instructions or fabricated transport data.

Exposure roles:

1. coastal dawn / horizon;
2. flash bloom;
3. reception-light motion;
4. night water.

The candidate uses lightweight vector dot/grain patterns to suggest developed print texture without diffusion-model texture or stock-photo imitation.

## Composition proxy review — 2026-08-25

Because the connected Figma write action still requires `figma-use` guidance that is not exposed in the current connector resource set, production/comparison mutation was not attempted unsafely. Instead, the live `990×1400` Figma geometry above was used to create a non-authoritative local composition proxy with the SVG at the exact proposed visual mass and the existing native-copy lane positions.

Proxy result: `PASS AS SERIOUS COMPARISON`, not adoption.

Observed improvement:

- the dark left field reads as one photo-booth strip rather than three unrelated icons;
- the four exposures create richer narrative variation while the Japanese hero remains the dominant first read;
- the candidate does not require moving the native copy lane;
- the physical cream-paper strip against the dark stock is clearer than a gallery/grid treatment.

Remaining Figma-only risks that the proxy cannot close:

- whether imported SVG detail survives actual Figma scaling/editability;
- whether the strip over-dominates at ~500px whole-item scale in the real renderer;
- whether the outer paper stroke or dot/grain patterns become too busy at actual print/detail scale;
- whether the candidate remains stronger with the real long-copy proof visible;
- whether Figma SVG import creates an understandable editable vector tree.

Therefore this remains `PRE_FIGMA`; proxy evidence must never be reported as a completed three-scale Figma pass.

## Hybrid authoring split

If this candidate is tested in Figma:

- all reader-facing copy remains native Figma text;
- this SVG is one fixed visual-art role only;
- the SVG may be recolored/edited as a vector if needed;
- no replaceable photo role is introduced because the scenes are intentionally non-documentary fixed art;
- if future real booth imagery is desired, that requires a separate replaceable-image role and provenance review rather than reusing this asset as fake photography.

## Current decision

`CURRENT_UNCHANGED`.

This asset is not adopted merely because it was created or because the local proxy is promising. It has not yet passed placement, whole-item, reading-scale, actual-size, structure, SVG-editability, or long-copy Figma QA in the real sign. Do not write it to Drive as a master or replace Current fixed art until it wins a rollback-safe Figma comparison.

The next test is now concrete:

1. load the required Figma authoring guidance;
2. create a rollback-safe comparison role without mutating Current;
3. import the SVG as one editable vector role at approximately `x=19 / y=145 / w=280 / h=980`;
4. hide only the three existing developed-print fixed-art groups inside the comparison;
5. compare Current vs candidate at ~500px whole, ~1000px reading, native `990×1400`, and long-copy proof;
6. read back SVG node structure/editability and confirm native text remains `7/7` auto-height with no outside text;
7. reject if the strip dominates the Japanese headline, feels like gallery/filmstrip UI, loses wedding warmth, or its grain becomes noisy;
8. only if it clearly wins, save the adopted master to the exact Drive authority, read back Drive metadata/ID, and then promote with full evidence.

## Generation / Drive / Figma state

- image generation: `0` — fixed-art SVG was hand/computationally composed; no generated raster output is claimed;
- Drive write: `0` — candidate is not adopted yet;
- Figma write: `0` — required `figma-use` guidance resource is not currently exposed by the connector, so production/comparison authoring was not attempted unsafely;
- Git asset commit: `ff4dcde4fec0de4ddc20ab4eb6fe5865af26d007`.

No shared project rule is promoted from this pre-Figma experiment.
