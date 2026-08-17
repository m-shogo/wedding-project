# ADD-13 Message Card — V6 Text Auto-height Repair

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS MAINTAINED / LONG_COPY_STRESS_PASS`
Date: 2026-08-17
Start authority SHA: `292570437f8c0cd98b8e67a521e079145dc96aee`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- selected V6 front/back: `27:3 / 27:4`
- hidden long-copy stress: `27:35 / 27:51`
- new hidden rollback section: `38:2`

## Visible / structural issue

Fresh actual-size readback found several visible native text nodes still had fixed heights of only `10 px`, despite the V6 evidence describing native auto-height resilience. The current production screenshot happened to look acceptable, but the structure was fragile and the hidden stress evidence still contained proof-only suffixes in guest-name/date copy.

Affected visible roles included front date `27:10`, front write-here instruction `27:19`, stress equivalents `27:41 / 27:50`, and stress back title/name/date roles `27:53 / 27:64 / 27:65`.

## Bounded repair

Before mutation, front/back + both stress clones were copied into hidden rollback section `38:2`.

No composition, paper size, writing-area geometry, guides, palette, legacy production, or image role changed.

The affected native text nodes were changed to `textAutoResize=HEIGHT`. Hidden stress-only proof suffixes were removed from guest-name/date strings while retaining materially long guest-name stress content.

Notable readback changes:

- production front date `27:10`: `10 px → 26 px` auto-height;
- production front instruction `27:19`: `10 px → 28 px` auto-height;
- stress front guest name `27:40`: `10 px → 60 px` under long-copy content;
- stress back long title `27:53`: `10 px → 180 px` under long-copy content;
- stress back date `27:65`: `10 px → 26 px` and proof-only `[LAYOUT DUMMY]` removed.

## QA

Fresh screenshots after repair:

- production front `27:3`, actual `1400×993`: PASS;
- stress front `27:35`, actual `1400×993`: PASS, long title/prompt/name render without clipping;
- stress back `27:51`, actual `1400×993`: PASS, long title/prompt render without clipping.

Programmatic root readback after repair:

- front `27:3`: visible native text `5`, outside root `0`;
- back `27:4`: visible native text `4`, outside root `0`;
- stress front `27:35`: visible native text `5`, outside root `0`;
- stress back `27:51`: visible native text `4`, outside root `0`.

Stress clones were returned to hidden state after QA.

## Hybrid / Drive

- native text: repaired;
- native vector/writing guides: unchanged;
- SVG/generated raster/image roles: none required;
- Drive write: `0`.

This was a native-text resilience defect, not an imagery defect.

## Result

`VERIFIED_LOCAL`: V6 keeps its selected Sellable Visual + structural status, now with live text geometry matching the documented long-copy intent. Legacy production remains untouched. Physical proof/final copy/vendor work remains `NOT_PRINT_READY`.