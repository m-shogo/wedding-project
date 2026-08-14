# WEDDING PASSPORT — Menu Duplicate Food Title Removal QA

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DUPLICATE_FOOD_TITLE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before Git evidence write: `cf32e22e1e389fadde93bce9dd84206e73101114`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- page: `02_INSIDE / 1:3`
- production menu: `18:90 / FRAME_MENU_DRINK / 1480×2100`
- clean-room comparison: `135:2 / QA_MENU_V6_NO_DUPLICATE_FOOD_TITLE_2026_08_15`
- rollback: `136:2 / ROLLBACK_MENU_PRE_DUPLICATE_FOOD_TITLE_REMOVAL_2026_08_15`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Fresh visual diagnosis

Fresh whole-item and actual-size review of the live V5 menu found a new visible redundancy on the food side. The page already has a 72px primary Japanese page title `お料理` near the top, but the food column repeated another `お料理` immediately below `料理 / 01—06`. At actual size the repeated heading read as a template/component title rather than useful information, while also forcing the six-course flow lower than necessary.

This was a typography/composition defect, not an image or content-availability defect.

## Rollback-safe comparison

A materially different native comparison was created before touching production:

- `135:2 / QA_MENU_V6_NO_DUPLICATE_FOOD_TITLE_2026_08_15`
- cloned `MENU_V3_FOOD_TITLE` hidden
- cloned `MENU_V3_COURSE_FLOW` moved from `y=545` to `y=470`

Whole-page and native `1480×2100` screenshots preferred the comparison. The food column begins directly from `料理 / 01—06` into the course sequence, while `お飲みもの` remains the distinct right-side subsection title. This removes the duplicate component-like heading and gives the left/right hierarchy a cleaner editorial relationship.

## Production change

Before promotion, a full hidden rollback was created:

- `136:2 / ROLLBACK_MENU_PRE_DUPLICATE_FOOD_TITLE_REMOVAL_2026_08_15`

Production root remains `18:90`.

Only two bounded native changes were made:

- `116:75 / MENU_V3_FOOD_TITLE` set `visible=false`;
- `116:76 / MENU_V3_COURSE_FLOW` moved from `y=545` to `y=470`.

The comparison `135:2` was hidden after promotion. No menu facts, drink facts, allergy wording, typography content, guide geometry, or raster assets were fabricated or replaced.

## Post-write screenshot QA

Fresh production screenshot at native `1480×2100`: PASS.

- the first read remains the primary page title `お料理`;
- `料理 / 01—06` now functions as the food-column kicker without a second duplicate heading;
- course 01 begins closer to the kicker, reducing dead template-like space;
- the right-side `お飲みもの` hierarchy and local burgundy anchor remain unchanged;
- `乾杯` atmospheric type remains low-opacity and does not compete with content;
- allergy/footer regions remain unchanged;
- no Web-UI card zoning, added decoration, generic travel iconography, or stock imagery was introduced.

## Structural readback

Production `18:90` after promotion:

- frame: `1480 × 2100`;
- `clipsContent=true`;
- native text nodes: `41`;
- visible text nodes: `38`;
- raster IMAGE-fill nodes: `0`;
- visible text outside root: `0`;
- `116:75 / MENU_V3_FOOD_TITLE`: hidden;
- `116:76 / MENU_V3_COURSE_FLOW`: `y=470`, height `756`, bottom `1226`;
- hidden guides retained: `GUIDE_SAFE`, `GUIDE_TRIM`, `GUIDE_BLEED`;
- rollback `136:2` retained hidden;
- clean-room comparison `135:2` retained hidden.

The prior V5 long-copy evidence remains structurally applicable: this edit removes one heading and moves the complete course flow upward by 75px, increasing rather than reducing available vertical clearance; no semantic course widths, text nodes, auto-layout spacing, drink layout, or allergy layout were tightened.

## Drive / image decision

Drive authority was live-read before production mutation:

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`;
- folder name: `01_パスポート風_メニュー・ドリンク・座席表`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported defect was duplicate editorial hierarchy and unnecessary vertical displacement, not a missing hero, food photo, paper texture, or background role.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DUPLICATE_FOOD_TITLE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Final menu/drink wording, allergy text, physical proof, and printer/vendor validation remain deferred.