# Rurubu WEDDING V9 — Profile / Memory hierarchy pass

Date: 2026-08-27
Scope: Rurubu WEDDING V9 only
Base main at branch creation: `d67c87e3e4fa417790613d6702d424bd77bef82c`

## Live authorities

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Profile: `2601:5`
- Memory: `2601:7`
- Drive asset pool/reference: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup`

No new generated assets were created or adopted in this pass.

## Editorial diagnosis

A fresh six-page screenshot review preserved the established publication rhythm (Cover dense / Back quieter / Profile medium / Story quieter / Memory dense / 1DAY medium) and identified two remaining UI/template signals that could be corrected without adding decoration:

1. Profile Q&A numbers were still wide rounded pills, and the two person-name captions were oversized centered pills beneath the photos.
2. Memory's lower three photographs remained a mechanically level row, while the floating `OUR FAVORITE` burst repeated emphasis without adding reader information.

The corrections therefore used hierarchy, scale, alignment and subtraction rather than additional stickers/assets.

## Profile + Q&A changes

### Q&A index markers

For each of the three questions:

- reduced the number background from `62×38` pill geometry to a compact `38×38` circular editorial marker;
- centered the native editable number text inside the circle;
- reclaimed horizontal measure by moving question/answer/rule start from x=126 to x=100;
- kept the existing question copy, answer copy and category-color editorial rules.

Affected node groups:

- Q1: `2601:66 / 2601:67 / 2601:68 / 2601:69 / 2708:234`
- Q2: `2601:70 / 2601:71 / 2601:72 / 2601:73 / 2708:235`
- Q3: `2601:74 / 2601:75 / 2601:76 / 2601:77 / 2708:236`

Reading-scale screenshot QA: PASS. The numbers now read as editorial indices rather than tappable controls, while the Japanese question hierarchy is stronger and the text measure is less cramped.

### Photo name captions

The large centered `SHOGO` / `SHIORI` pills were converted into compact asymmetrically anchored photo-caption tabs:

- `SHOGO`: `2601:60 / 2601:61` → x=54, y=508, `126×30` background with small radius and centered editable name text;
- `SHIORI`: `2601:62 / 2601:63` → x=610, y=508, `126×30` background with small radius and centered editable name text.

Reading-scale screenshot QA: PASS. The names remain strongly bound to their photos but no longer dominate as interface controls.

Rollback evidence:

- `2749:2` — pre Q&A marker refinement
- `2751:2` — pre name-caption-tab refinement

Both are hidden rollback frames on the V9 page.

## Memory + Gallery changes

### Lower photo rhythm

The lower three replaceable photo masks and their matching frame overlays were redistributed into a controlled stagger instead of one equal baseline:

- Memory 04: `2601:103 / 2669:488` → `32,530 / 250×200`
- Memory 05: `2601:104 / 2669:487` → `306,552 / 218×178`
- Memory 06: `2601:105 / 2669:486` → `548,532 / 214×198`

Associated tape/caption geometry was optically adjusted while preserving photo/frame matching:

- tape: `2633:307 / 2633:308`
- captions: `2664:228` through `2664:233`

Reading-scale screenshot QA: PASS. The page remains dense, but the lower gallery now has one smaller/lower middle beat rather than a uniform web-card row.

### Non-informational burst subtraction

After the lower photo rhythm was strengthened, the floating `OUR FAVORITE` burst no longer performed a necessary binding/index role and competed with the native closing copy. Therefore:

- hid `2601:113 / ACCENT / BURST LABEL`;
- hid `2601:114 / TEXT / BURST`.

This **supersedes the earlier local decision** in `docs/automation/rurubu-v9-current.md` that retained `OUR FAVORITE` as an intentional break. The fresh whole-page comparison showed the photo stagger itself now supplies the visual break, so the extra burst became redundant.

Rollback evidence:

- `2749:78` — pre Memory gallery-rhythm pass

## Post-change six-page structural QA

PASS across all six current production frames:

- A4: `794×1123` × 6
- visible replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding visible frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- photo/frame geometry mismatches: 0
- photo/frame z-order issues: 0 (overlay remains above photo)
- visible node overflow outside page bounds: 0
- visible text below 10.5 px: 0
- visible rollback/failed/dummy/placeholder leaks: 0
- current production frames have no whole-page IMAGE fill; no flattening introduced

## Verified local learning

`VERIFIED_LOCAL`: when compact indexing is semantically useful, reduce UI grammar by changing the *shape and spatial role* rather than deleting the information. Circular list indices and compact photo-caption tabs retained reader function while reducing button-like reading.

`VERIFIED_LOCAL`: once photo hierarchy itself supplies a deliberate visual beat, a decorative burst that repeats emphasis without information can be removed. Magazine density should be carried by hierarchy and photography before ornamental count.

No project-wide rule is promoted by this single pass.

## Next target

- preserve Back Cover and Story as quieter sequence roles unless a concrete weakness appears;
- inspect actual dummy-photo crop quality and duplicate-photo role pressure across Cover/Profile/Story/Memory without assuming every placeholder must be replaced;
- continue only concrete UI-grammar or spacing fixes;
- keep missing-asset generation deferred until the six-page assembly exposes specific unresolved roles.
