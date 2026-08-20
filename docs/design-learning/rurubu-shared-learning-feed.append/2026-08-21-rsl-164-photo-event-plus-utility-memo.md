# RSL-164 — Let the dominant event own the page before utility facts resume

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V6 Memory Spots
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The GY Memory Spots guide page contained a legitimate large Spot 04 dining photo, but the photo ended into a separated checklist/info region whose equal three-column rows read as a distinct module. At whole-item scale the page changed from travel-editorial storytelling to web/dashboard utility too abruptly.

## Evidence before change

- preferred source: GY `2003:2`, guide right `2003:24`;
- Spot 04 image already legitimate and replaceable;
- no structural collision or safe-area defect was causing the visual weakness;
- 500px comparison showed role allocation and sectioning, not missing decoration, as the problem.

## Root-cause hypothesis

When one visual event is clearly the editorial climax of a print page, ending its image field before secondary utility facts can make those facts feel like a new UI section. If the utility information is still short and important, the stronger treatment may be to let the dominant event own more page area, then attach a compact native editorial memo to its edge rather than creating a separate module.

## Principle / capability tested

`dominant event field → attached native utility memo`, combined with the already cross-verified binding-function check for separator lines.

## Exact bounded test

On rollback-safe IH `2077:2` only:

- preserved all four existing Rurubu image hashes;
- deepened Spot 04's replaceable photo field;
- kept its native title/copy over the image;
- added a native editable `04` numeral using the existing Spot 03 typographic role as the local grammar source;
- removed the lower navy separator after whole-item evidence showed it was redundant;
- overlapped the existing yellow memo kicker on the photo edge;
- retained all six utility facts as native text in a shallower two-row memo;
- changed no wording, photo source, date, fact, palette family, or external asset.

## Expected improvement

Keep the narrative/emotional photo event visually dominant for longer, reduce false sectioning, and make utility facts read as an editorial after-note instead of a dashboard block.

## Regression risk

- utility text may become too small or dense;
- dominant imagery may overrun footer/safe reserve;
- removing a separator can weaken grouping if it had a real binding function;
- enlarging an existing raster can expose softness;
- a giant section numeral can become decoration-only noise if it does not clarify sequence.

## Three-scale evidence

- whole-item / 500px: PASS;
- reading / 1400px: PASS;
- actual-size right / 794×1123: PASS.

Structure readback: visible native text `32`; IMAGE fills `4`; same-parent text intersections `0`; 18px text safe risks `0`.

## Figma / Drive / GitHub evidence

- Figma preferred: IH `2077:2`;
- right page: `2077:24`;
- new native Spot 04 numeral: `2077:54`;
- hidden rollback: GY `2003:2`;
- Drive V6 authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- asset generation: 0;
- Drive writes: 0;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IH-MEMORY-SPOTS-PHOTO-BOUND-GUIDE-QA-2026-08-21.md`;
- evidence commit: `7917182906dede95a9704485adf56c54504af6d0`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: adopted as the current V6 Memory Spots preferred spread.

## What must remain Rurubu-specific

Do not transfer the 03/04 numbering treatment, exact image proportions, yellow/magenta/cyan palette, dining image, Japanese headline scale, travel-magazine density, or Memory Spots geometry.

## Cross-item applicability hypothesis

Another print artifact may independently test this only when a dominant visual/story event is immediately followed by a small utility block that reads as a false new section. The transferable question is whether short native utility facts can attach to the dominant field without losing readability or physical function—not whether every lower module should be collapsed into an image.

## Next receiving-item experiment

On a materially different wedding print item, compare `dominant field + separate utility module` versus `dominant field + attached compact native memo` at whole-item scale. Preserve artifact-specific physical rules and reject the treatment if the utility block needs independent scanning, writing, QR, perforation, or other physical semantics.
