# ADD-06 Photo Booth — Continuous Photo Strip fixed-art candidate

Status: `SERIOUS_COMPARISON_CANDIDATE / PRE_FIGMA / CURRENT_UNCHANGED`
Date: 2026-08-25
Start main SHA: `a2b8bbc15442ff5788b688d1c060380a273ddcc8`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority recheck

- Current Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- Current long-copy proof: `47:19`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- canonical QA remains `QA.md`; production was not changed in this run.

## Visible problem

Fresh whole-item and reading-scale screenshots still pass structurally, but the left visual device is weaker than the words `PHOTO STRIP DOORWAY` imply. It currently reads as three independent instant-photo cards with simple flat abstract scenes. At reading scale the composition is clear, but the cards can read closer to small graphic icons than to one continuous photo-booth artifact.

This is not a reason to reject the Current. The Current remains sellable and functional. It is a focused visual-quality hypothesis: a single continuous four-exposure booth strip may make the artifact identity more immediate and richer without adding fake camera UI, people, stock photography or variable text.

## Professional design reasoning

Relevant neutral principles used:

- publication design should balance a stable theme with meaningful variation rather than repeat decorative modules mechanically;
- book/editorial design should treat printed-object behavior and storytelling as part of the design, not only surface decoration;
- travel/editorial work benefits when one authentic physical or atmospheric gesture carries the idea instead of many literal travel symbols.

References consulted in this run:

- Pentagram Editorial Design — https://www.pentagram.com/editorial-design
- Pentagram Book Design — https://www.pentagram.com/book-design
- Pentagram Travel + Leisure — https://www.pentagram.com/work/travel-leisure

## Bounded candidate

New editable SVG:

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

The candidate deliberately uses print grain / halftone-like vector patterns lightly enough to survive small placement while avoiding diffusion-model texture or stock-photo imitation.

## Hybrid authoring split

If this candidate is tested in Figma later:

- all reader-facing copy remains native Figma text;
- this SVG is one fixed visual-art role only;
- the SVG may be recolored/edited as a vector if needed;
- no replaceable photo role is introduced because the scenes are intentionally non-documentary fixed art;
- if future real booth imagery is desired, that would require a separate replaceable-image role and provenance review rather than reusing this asset as fake photography.

## Current decision

`CURRENT_UNCHANGED`.

This asset is not adopted merely because it was created. It has not yet passed placement, whole-item, reading-scale, actual-size, structure, or long-copy Figma QA in the real sign. Do not write it to Drive as a master or replace Current fixed art until it wins a rollback-safe Figma comparison.

The normal next test is:

1. load the required Figma authoring guidance;
2. create a rollback-safe comparison role in ADD-06 without mutating Current;
3. place this SVG as one continuous strip;
4. compare against Current at ~500px whole, ~1000px reading, native `990×1400`, and long-copy proof;
5. reject if the strip dominates the Japanese headline, feels more like a UI/gallery filmstrip than a physical booth print, or loses the wedding warmth;
6. only if it clearly wins, save the adopted master to the exact Drive authority and then promote with full readback evidence.

## Generation / Drive / Figma state

- image generation: `0` — no image-generation tool is available in the current runtime; no generated output is claimed;
- Drive write: `0` — candidate is not adopted yet;
- Figma write: `0` — required `figma-use` guidance resource is not currently exposed by the connector, so production/comparison authoring was not attempted unsafely;
- Git asset commit: `ff4dcde4fec0de4ddc20ab4eb6fe5865af26d007`.

No shared project rule is promoted from this pre-Figma experiment.
