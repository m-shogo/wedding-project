# ADD-08 メニュー補助サイン — Clean-room V3 Drink / World Trip — 2026-08-15

Status: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_FOR_DRINK_WORLD / ALLERGY_V2_RETAINED / LEGACY_PRESERVED / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Authority readback

- latest main immediately before evidence write: `16ba4e275abdccf48b3ab9be57854994a9ebcf04`
- Figma: `xvJH23nWjWAApd3yOwr4y3`
- page: `0:1 / 01_PRODUCTION`
- retained production: `1:3 / FRAME_MENU_SUPPORT_A4`
- prior clean-room V2 comparison family: `18:2`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive writes this iteration: `0`

The old production and prior V2 designs were not used as layout/component sources during V3 authoring. They remained untouched. The retained production was visually inspected only after V3 authoring and long-copy QA were complete.

## Inputs allowed into V3

Only verified non-visual requirements were carried forward:

- A4 portrait / working canvas `1400×1980`;
- bleed 3 mm / safe area 10 mm+;
- planned roles: Drink Menu Guide and World Trip Special Menu Introduction;
- all menu, drink, allergy, dietary and operational facts remain native semantic placeholders until authoritative copy exists;
- variable copy remains native editable Figma text;
- no final menu facts were invented or baked into vector/raster artwork.

## V3 clean-room construction

Section:

- `21:2 / CLEANROOM_ADD08_V3_DRINK_WORLD_2026_08_15`

### Drink Menu Guide V3

- `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- Japanese-first title hierarchy with a dark title field;
- asymmetric beverage ledger occupying the left reading field;
- independent teal measurement field at right with a new editable SVG curve/tick motif;
- native semantic sections: Alcohol / Soft Drink / Guide;
- after stress QA exposed collisions in the first draft, the content body was rebuilt as `23:2 / LAYOUT / DRINK CONTENT STACK`, a native vertical auto-layout stack;
- raster IMAGE fills: `0`;
- variable/factual wording: native text only.

### World Trip Special Menu V3

- `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`
- Japanese-first editorial title field;
- three staggered culinary chapters rather than equal cards or a route/map composition;
- new editable orbit/culinary-line SVG used only as fixed decoration;
- after stress QA exposed chapter-divider pressure in the first draft, the chapter body was rebuilt as `23:13 / LAYOUT / WORLD TRIP CHAPTER STACK` with native vertical/horizontal auto-layout chapter groups;
- raster IMAGE fills: `0`;
- menu names, country/theme descriptions and venue guidance remain explicit native `LAYOUT DUMMY` placeholders.

## Three-scale / visual QA

Whole-item and reading-scale screenshots were reviewed after the auto-layout repair.

### Drink

- thumbnail: title and the strong dark/teal two-field silhouette remain legible; no equal-card/admin-dashboard pattern;
- reading scale: Alcohol / Soft Drink / Guide hierarchy is immediate and the right-side measure motif acts as fixed art rather than fake data/UI;
- actual-size render: native text, rules and vector detail remain clean at the 1400×1980 source size.

### World Trip

- thumbnail: rust title field + cream chapter field + right-side orbit create a distinctive print silhouette;
- reading scale: 01/02/03 chapter rhythm is strong without becoming a grid of equal cards;
- actual-size render: serif Japanese chapter headings, body placeholders and vector detail remain crisp.

After V3 was complete, retained production `1:3` was inspected. The retained generic support sheet remains historically useful, but the V3 Drink and World Trip directions are more role-specific, visually closed and sellable as standalone A4 menu-support artifacts. Therefore the unresolved Drink / World Trip portion of ADD-08 now clears the visual comparison gate.

The previously strong Allergy / Dietary V2 remains the selected direction for that variant. The resulting ADD-08 selected family is therefore:

- Drink Menu Guide → V3 `21:3`;
- Allergy / Dietary Information → V2 `18:19`;
- World Trip Special Menu Introduction → V3 `21:43`.

## Long-copy / structure QA

Final stress duplicates:

- Drink: `23:34 / QA_CLEANROOM_ADD08_V3_DRINK_LONG_COPY_STRESS_FINAL_2026_08_15`
- World Trip: `23:75 / QA_CLEANROOM_ADD08_V3_WORLD_LONG_COPY_STRESS_FINAL_2026_08_15`

Programmatic readback after stress:

- Drink: 17 native text nodes, 0 IMAGE fills, 0 text nodes outside the 1400×1980 root; content stack height 1102 px;
- World Trip: 16 native text nodes, 0 IMAGE fills, 0 text nodes outside the root; chapter stack height 927 px with three native horizontal chapter rows and vertical copy stacks.

Screenshot review of the final stress copies showed no destructive overlap or clipping after the auto-layout repair.

## Hybrid / generation decision

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`.

The quality defect was composition and copy-resilience, not missing photography or illustration. Native typography plus new editable SVG fixed art was the higher-value method. No raster asset was generated merely to satisfy a quota.

## Deferred finalization

- final drink/menu copy;
- confirmed allergy/dietary and venue-operation wording;
- printer bleed/template/profile;
- physical proof and real venue/table visibility;
- A5 independent reflows, which must be authored as their own reflow rather than mechanically scaled from A4.

These remain `DEFERRED_FINALIZATION`; they do not reopen the selected A4 visual family.
