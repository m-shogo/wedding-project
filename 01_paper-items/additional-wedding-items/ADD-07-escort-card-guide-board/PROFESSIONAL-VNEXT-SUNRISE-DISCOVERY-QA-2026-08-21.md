# ADD-07 エスコートカード案内ボード — Professional vNext `SUNRISE DISCOVERY` QA

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_SELECTED_A2_A3 / LONG_COPY_STRESS_PASS / PREVIOUS_V2_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `0371f33474f0ef545d6ea94faae841084fec7deb`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`

## Clean-room brief

Emotional brief: **カードを探して取って、自分のテーブルへ向かう小さな発見を、旅の出発前のわくわくとして見せる。**

Only verified non-visual facts/semantic requirements were used before authoring:

- A2 `1400×1980`;
- A3 `990×1400`, independently reflowed rather than proportional scaling;
- title `エスコートカードをお取りください`;
- lead `お名前のカードを見つけて、記載されたテーブルへお進みください。`;
- step 01 `お名前を探す`;
- step 02 `カードを取る`;
- step 03 `行き先の卓へ`;
- `2026.10.24 / YOKOHAMA`.

No retained V2 route, terminal edge, step geometry, cards, rail, icon, image, SVG or old frame was used as the construction base.

## Three blank-frame A2 directions

New page:

- `31:2 / VNEXT_PRO / ADD-07 ESCORT GUIDE / FIND YOUR JOURNEY / 2026-08-21`

1. `31:3 / ISLAND DEPARTURE` — cream field, oversized sun and two breeze sweeps, staggered action typography.
2. `31:17 / BOARDING SUNRISE` — deep-ocean side field, large sunrise disc and lagoon departure sweep.
3. `31:31 / THREE TIDES` — dark field with three large colored action tides.

Screenshot critique:

- `ISLAND DEPARTURE`: first draft title wrapped into an unintended third line and collided with the lead; rejected as a concept rather than promoted.
- `THREE TIDES`: bold but Step 02 became compositionally fragile near the edge of its tide and drifted toward a stylized step-route motif.
- `BOARDING SUNRISE`: strongest basis for a new physical-object silhouette and clear discovery progression. It was rebuilt, not duplicated, as the final `SUNRISE DISCOVERY` family with corrected title proportions and cleaner reading lanes.

## Selected professional vNext family

- A2: `32:2 / SELECTED PROFESSIONAL VNEXT / ADD-07 / A2 / SUNRISE DISCOVERY`
- A3: `32:16 / SELECTED PROFESSIONAL VNEXT / ADD-07 / A3 / SUNRISE DISCOVERY REFLOW`

A2 visual grammar:

- narrow deep-ocean physical spine;
- large Japanese title/lead on warm cream;
- Step 01 begins in open cream space;
- Step 02 sits inside one oversized coral sunrise disc;
- Step 03 lands above one lagoon departure sweep;
- date/YOKOHAMA remain compact on the navy spine.

A3 is independently re-authored with different physical dimensions, title scale, lead spacing, sunrise size and sweep dimensions rather than mechanically scaling A2.

No equal cards, progress dots, fake boarding gate, route nodes, barcode, plane, stamp, badge, shadow or gradient.

## Screenshot defect and bounded correction

The first selected A2/A3 build showed an unintended three-line title wrap and title/lead overlap at whole-item scale.

Bounded correction:

- A2 title `104px → 82px`, width `900 → 980`, lead y `455 → 500`;
- A3 title `74px → 58px`, width `650 → 680`, lead y `330 → 360`.

Post-fix screenshots: PASS. Both titles now read as the intended two-line instruction with deliberate lead separation.

## Three-scale visual QA

A2 `32:2`:

- whole-item / thumbnail: PASS;
- reading scale: PASS;
- native `1400×1980`: PASS.

A3 `32:16`:

- whole-item: PASS;
- reading scale: PASS;
- native `990×1400`: PASS;
- independent reflow: PASS.

## Long-copy stress

Hidden proofs:

- A2 `34:16 / QA / PROFESSIONAL VNEXT ADD-07 / A2 LONG COPY STRESS`;
- A3 `34:30 / QA / PROFESSIONAL VNEXT ADD-07 / A3 LONG COPY STRESS`.

The first stress attempt failed because required Figma fonts had not been loaded. The method was corrected by loading the fonts before mutating text; the same failing call was not blindly repeated.

Stress copy expanded the title, lead and all three action phrases.

Initial stress exposed a real title/lead collision:

- A2 long title bottom `447` vs lead top `390`;
- A3 long title bottom `317` vs lead top `285`.

Bounded correction applied to selected + stress families:

- A2 lead y `390 → 500`;
- A3 lead y `285 → 360`.

Final stress readback:

- A2: outside text `0`, collisions `0`, long lead bottom `656`, long Step 03 bottom `1599`, frame bottom `1980`;
- A3: outside text `0`, collisions `0`, long lead bottom `477`, long Step 03 bottom `1132`, frame bottom `1400`.

Stress proofs remain hidden after verification.

## Structure QA

A2 `32:2`:

- `1400×1980`, `clipsContent=true`;
- visible native text `10`;
- every visible text role `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- outside text `0`;
- text collisions `0`.

A3 `32:16`:

- `990×1400`, `clipsContent=true`;
- visible native text `10`;
- every visible text role `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- outside text `0`;
- text collisions `0`.

## Hybrid authoring / image decision

- semantic/factual copy: native editable Figma text;
- fixed art: three simple large native geometry roles;
- SVG: not required;
- generated/composed raster: not required;
- replaceable image: not required;
- IMAGE fills `0`;
- Drive write `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the board’s job is discovery/instruction. Hero photography or generic Hawaii/airline art would compete with the action sequence; stronger scale, color and physical-field composition solved the current vNext brief more cleanly.

## Completion-only comparison with retained V2

After vNext maturity, retained selected V2 `14:3 / CLEANROOM_ADD07_V2_SELECTED_A2_QUIET_DEPARTURE_ROUTE` was opened for comparison.

V2 remains a strong restrained editorial wayfinding board with a thin mint action route and navy terminal edge. Under the current professional `SUNSHINE DEPARTURE` brief, vNext is preferred because:

- it replaces the quiet route-diagram feel with larger celebratory destination fields;
- the coral sunrise makes Step 02 a memorable discovery moment;
- the lagoon departure gesture gives the final action stronger movement;
- the Japanese title/lead and sequence remain clear without fake transport semantics;
- A2/A3 long-copy safety remains intact.

V2 remains untouched as rollback/history.

## Professional Council score

`89 / 100`

- Concept clarity / ownability: 13/15
- Emotional excitement / discovery appeal: 14/15
- Japanese editorial typography: 13/15
- Composition / hierarchy / rhythm: 14/15
- Travel/Hawaii integration without cliché: 9/10
- Item-specific function: 10/10
- Physical print credibility: 8/10
- Editability / resilience: 4/5
- Family fit without template sameness: 4/5

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final card-placement operation and wording;
- final A2/A3 installation choice;
- printer stock/profile, trim/bleed and safe-area proof;
- physical A2/A3 output proof;
- installation height/easel lip and 2–4m viewing-distance check;
- venue lighting/background contrast.

## Decision

`PROFESSIONAL_VNEXT_SELECTED_A2_A3 / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`.

Next progression target: `ADD-08 メニュー補助サイン`.