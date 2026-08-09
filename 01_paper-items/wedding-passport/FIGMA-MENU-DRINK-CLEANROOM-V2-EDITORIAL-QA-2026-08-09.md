# WEDDING PASSPORT — Menu / Drinks Clean-Room V2 Editorial QA

Date: 2026-08-09
State: `VISUAL_REOPENED / CLEANROOM_V2_CREATED / SCREENSHOT_QA_ADVANCE / NATIVE_EDITABLE_PASS / PRODUCTION_NOT_YET_PROMOTED`

## Live authority

- Session start `main`: `b994d1800b7637f9a0584acc5244dbaef8082a41`
- Menu-phase write authority: `731d9349d03238ba1fae1f9ec4e0154e7b277feb`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Existing production menu frame: `02_INSIDE / 18:90 / FRAME_MENU_DRINK`
- Clean-room comparison: `02_INSIDE / 84:2 / QA_MENU_DRINK_CLEANROOM_V2_EDITORIAL_2026_08_09`
- Drive authority folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- RURUBU / るるぶ scope: not read or modified.

## Concurrent-authority handling

During this run another hourly task advanced `main` and promoted the seating-chart V3 in commit `731d9349d03238ba1fae1f9ec4e0154e7b277feb`. The menu work was not written on the older authority. The latest commit was read first; seating was left alone and the menu phase continued independently.

## Visible defect in existing production

The live screenshot of `18:90` is functional but visually weak for a sellable wedding stationery product:

- generic `MENU` / `DRINK` two-column list;
- nearly all content concentrated in the upper half;
- the lower half reads as accidental emptiness rather than intentional negative space;
- English category labels dominate the placeholder hierarchy;
- composition resembles a basic document/web two-column layout more than a premium printed dining card;
- there is little item-specific editorial rhythm beyond a horizontal and vertical divider.

This was treated as a composition/hierarchy defect before assuming imagery was required.

## Clean-room V2 direction

Created `84:2` as a rollback-safe comparison without mutating `18:90`:

- 1480 × 2100 px;
- warm paper field and one narrow navy page edge;
- Japanese-first large serif title `お料理と / お飲みもの`;
- restrained `DINING NOTES` secondary title;
- food and drink sections are intentionally unequal rather than a mirrored 50/50 grid;
- six courses use large editorial serif numbers and native vertical flow;
- drinks occupy a narrow full-height tinted editorial field rather than a rounded card;
- native allergy/dietary guidance role is retained at the bottom;
- no rounded cards, badges, stamps, airplanes, gradients, shadows, fake transport data, or fake final food/drink facts;
- all menu, drink and allergy values remain explicit editable `LAYOUT DUMMY` text.

## Screenshot QA

The first V2 whole-item screenshot clearly improved the overall editorial hierarchy but exposed one detail defect: course-description microcopy sat too close to the larger course name.

The six course content flows were then refined from 8 px to 16 px internal spacing. Post-fix screenshot shows:

- Japanese title is the clear first read;
- the page uses the full sheet more intentionally than legacy production;
- course numbering gives scan rhythm without using box/card repetition;
- drink field reads as a separate editorial chapter rather than a UI card;
- course-name and course-description lines no longer visually crowd each other;
- placeholder density remains sufficient to judge the composition despite final copy being unavailable.

## Structure readback

Clean-room V2 currently contains:

- native text nodes: `40`;
- IMAGE-fill nodes: `0`;
- raster/flatten replacement: `0`;
- six course rows in native auto-layout flow;
- five drink rows in native auto-layout flow;
- six course detail flows with `16 px` name-to-description spacing;
- all variable copy remains native editable text.

The comparison is not promoted to production yet. Long-copy stress and actual-size detail comparison still need to be closed before promotion.

## Image-generation decision

Generated imagery was **not forced into this page during this step**.

Reason: the screenshot-supported primary defect was layout/hierarchy, and the clean-room composition could be materially improved without hiding weak structure behind decoration. The reopened Current explicitly allows image generation on this page later if comparison shows that a specific non-person role such as subtle archival paper texture, culinary/editorial line art, or a restrained non-factual still-life field materially improves the sellable result.

Any later generated asset must:

- contain no final menu text or QR/factual copy;
- contain no people;
- avoid generic travel-stock motifs;
- remain replaceable/non-destructive in Figma;
- pass whole/reading/detail visual QA before adoption;
- be saved to the exact non-Rurubu Drive authority only if seriously adopted/compared.

## Drive

- Drive live-read before Git write: yes
- Drive changes: `0`
- generated assets adopted: `0`
- duplicate assets created: `0`

## Decision

`CLEANROOM_V2_CREATED / VISUAL_COMPARISON_ADVANCE / NATIVE_EDITABLE_PASS / PRODUCTION_NOT_YET_PROMOTED`

This is not yet `SELLABLE_VISUAL_QA_PASS` because long-copy/actual-size and final comparison against production remain open.

## Next

1. create long-copy stress proof for six course names/descriptions and five drink values;
2. inspect actual-size typography and the tinted drink field;
3. compare no-image V2 against one generated-asset variant only if a concrete editorial asset role remains justified;
4. promote only the verified winner while preserving the existing production rollback and semantic anchors.
