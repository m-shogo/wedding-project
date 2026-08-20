# RSL-167 — Empty space can become an accidental section divider

Source scope/item: Rurubu WEDDING / V6 Story + Chronology
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

IJ `2080:3` had a strong full-width hero and a strong lower café/photo-text field, but the broad cream gap between them read at whole-page scale as an unintended section divider. The problem looked like excessive whitespace even though both neighboring content fields were already valid.

## Evidence before change

- IJ actual-size story page showed the hero ending around y=`520` and the lower photo beginning around y=`660`.
- The resulting cream band was larger than the page's actual editorial transition function.
- No missing image or information role was identified.

## Root-cause hypothesis

Whitespace is not automatically editorial. When a gap has no pacing, annotation, physical or semantic job, it can split an otherwise coherent print page into web-like horizontal sections. Before filling it with decoration, independently test whether moving an existing legitimate downstream field closer restores continuity.

## Principle / capability tested

Test **downstream-field reweighting before decoration** when empty paper behaves as a false section band.

## Exact bounded change

Rollback-safe IL `2085:2` duplicated IJ. Only story left `2085:3` changed:

- lower café image moved y=`660 → 585` and resized `545×370 → 525×420`;
- its bound texture/headline/body/note group moved upward consistently;
- a smaller cream transition remained instead of eliminating breathing room completely;
- hero, supporting destination photo, chronology right page, wording, hashes and factual content were unchanged;
- no new asset/container/shadow/gradient was introduced.

## Expected improvement

One continuous hero → support-photo → narrative field, while retaining purposeful breathing room and native editability.

## Regression risk

Moving fields too close can create mechanical photo stacking or collisions. A blank band may be functional in another artifact because of fold, trim, handwriting, scan, section semantics or long-copy reserve. The transferable rule is to prove the gap's function, not to remove whitespace globally.

## Three-scale evidence

- whole spread / 500px: PASS; lower story field connects to the hero more naturally than IJ;
- reading spread / 1400px: PASS;
- actual-size story left / `794×1123`: PASS;
- visible native text `39` across spread;
- visible IMAGE fills `6`;
- same-parent text intersections `0`;
- page-edge 18px safe risks `0`;
- whole-page flattening `NO`.

## Figma / Drive / GitHub evidence

- Figma `bfM0d4c9dCeBv5pCkJ3TNM`;
- preferred IL `2085:2`;
- story left `2085:3`;
- chronology right `2085:28`;
- hidden rollback IJ `2080:2`;
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` remained verified;
- generated/adopted/new Drive assets `0`;
- evidence `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IL-STORY-CONTINUOUS-PHOTO-BRIDGE-QA-2026-08-21.md`;
- evidence commit `e9345ccaf31a5197770e7861d1290cbab51379a4`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: IL adopted; IJ retained hidden as rollback.

## What must remain Rurubu-specific

Do not transfer exact y-values, photo ratios, destination imagery, cream-field size, overlap geometry, travel-texture treatment, palette or Japanese travel-magazine composition.

## Cross-item applicability hypothesis

When a different print item shows a large blank band between two legitimate fields, independently verify whether the gap performs a real physical/editorial job. If not, test bringing the downstream field closer before adding decoration or a new container.

## Next receiving-item experiment

Use a rollback-safe duplicate, preserve the receiving item's own physical semantics, and compare whole-item / reading / actual-size evidence. Reject the treatment if the gap is required for fold, scan, writing, variable-copy tolerance, or intentional chapter pacing.
