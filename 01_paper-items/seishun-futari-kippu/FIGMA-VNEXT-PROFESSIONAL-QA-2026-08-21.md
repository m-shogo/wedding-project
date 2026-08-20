# 青春ふたりきっぷ — vNext Professional QA / 2026-08-21

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / VNEXT_SELECTED_CANDIDATE / READY_FOR_PROMOTION / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before evidence write: `a96f880993525b949cb6b07a558571f029ecbbf0`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- cross-item text-geometry lesson: `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-21-nrsl-ai-text-geometry-readback.md`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Drive authority: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- provisional trim: `720×250` / approximately `72×25mm`; physical MINTIA-case measurement remains required before print lock.

## Clean-room rule observed

The new vNext work used a brand-new page and blank frames. No old production node, old V2 layout, train illustration, stamp, guilloche, route geometry, image crop, prior decoration or generated asset was duplicated into the new design.

Only factual / semantic constraints were carried forward:
- front-only compact ticket/label role;
- provisional `720×250` canvas;
- title `青春ふたりきっぷ`;
- confirmed date `2026.10.24`;
- two-person role;
- editable departure / destination semantics.

Old production was opened only after the new candidate completed concept selection, text-geometry readback and long-route stress QA.

## Three new art-direction concepts

New page:

`67:2 / VNEXT_PRO / SEISHUN FUTARI / SUNSHINE DEPARTURE / 2026-08-21`

Blank-frame concepts:

1. `67:3 / SUNRISE PLATFORM`
   - ocean vertical spine;
   - oversized sunrise crop;
   - coral departure sweep;
   - straightforward Japanese ticket hierarchy.
2. `67:13 / TWO-SEAT NIGHT EXPRESS`
   - dark night field;
   - two overlapping seat/window-like organic fields;
   - strongest rail/night metaphor, but screenshot QA showed title/route compression and excessive crowding in the narrow right region.
3. `67:23 / DATE PUNCH COLLECTIBLE`
   - giant cropped date punch;
   - strong title field;
   - lagoon route band;
   - small arrival-sun crop;
   - reads most clearly as a small collectible rather than a mini form or rail-themed template.

Professional critique selected concept C. A was coherent but too close to the wider `SUNSHINE DEPARTURE` family grammar already used by Passport/Boarding; B had interesting rail atmosphere but failed compact-space typography. C gave this item stronger item-specific identity and thumbnail memorability.

## Selected candidate

`68:2 / VNEXT_SELECTED_CANDIDATE / SEISHUN FUTARI / DATE PUNCH JOURNEY`

Selected direction was rebuilt as a fresh 720×250 frame rather than duplicating old production.

Visual structure:
- warm paper field;
- oversized coral `24` punch as the dominant collectible gesture;
- Japanese title `青春ふたりきっぷ` as the main semantic read;
- restrained line `今日だけの切符を、ふたりで。`;
- lagoon route field with native `[出発地] → [行先]`;
- confirmed `2026.10.24` and native `2名さま`;
- tiny edge notches used only as physical-ticket hints;
- no train clip-art, fake serial, operator logo, fake barcode, giant celebration stamp, admin UI, card grid, or dense icon catalog.

## Hybrid authoring split

- all copy / route / date / party information: native Figma text;
- fixed decoration / fields / notches: simple native editable geometry;
- reusable SVG required: `0` for this selected direction;
- generated/composed raster: `0`;
- IMAGE fills: `0`;
- variable information baked into decoration: `0`.

Image generation was deliberately not used because the diagnosed defect was motif density / compact information hierarchy, not missing imagery. Adding a generated train/landscape would recreate the themed-template problem instead of improving the item.

## AI text-geometry learning applied at authoring time

Unlike the earlier Passport and Boarding candidates, every text node in all three concept frames and the selected candidate was created with role-correct `textAutoResize=HEIGHT` immediately.

Selected candidate readback:
- date punch: `190×96 / HEIGHT`;
- title: `430×50 / HEIGHT`;
- subtitle: `380×26 / HEIGHT`;
- route: `300×30 / HEIGHT`;
- date: `170×24 / HEIGHT`;
- party: `115×22 / HEIGHT`.

This prevents the previously verified `AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID` failure before long-copy testing rather than repairing it later.

## Actual-size microtype correction

An initial selected candidate contained a 13px keepsake line at the bottom. Because this item is approximately 72×25mm, that line risked recreating the old actual-size microtype weakness.

Bounded test:
- briefly increased it to 15px and stress-tested the variable route;
- long route expanded to two lines ending at y=218 while the keepsake line began at y=220, leaving only 2px and producing visibly cramped hierarchy.

Decision:
- remove the nonessential keepsake microcopy entirely;
- increase the lagoon route field from 70px to 80px height;
- preserve more vertical reserve for actual variable route content.

This is a deliberate subtraction for physical-size legibility, not aesthetic minimalism.

## Long-route stress

Stress candidate:

`69:2 / QA / VNEXT SEISHUN FUTARI / LONG ROUTE STRESS / 2026-08-21`

Stress route:

`[かなり長い出発地名] → [かなり長い行先名]`

Result after repair:
- route expands to 2 lines / 60px height;
- route bottom = `218`;
- lagoon role bottom = `227`;
- date bottom = `181`;
- party bottom = `210`;
- no text exits the `720×250` canvas;
- no microtype was introduced to force fit;
- route remains the dominant content inside its own physical color field.

Stress screenshot: PASS.

## Three-scale visual QA

### Whole-item / thumbnail

PASS.

The large `24`, title and lagoon field are immediately legible as a collectible object. The composition is substantially simpler and more memorable than a themed rail-template made from many small ornaments.

### Reading scale

PASS.

Title → short emotional line → route/date/two-person information is unambiguous. The title is Japanese-first and English filler is absent. The strong date punch provides pop energy without pretending to be a real railway stamp or authority mark.

### Actual-size / detail

PASS for the provisional 72×25mm digital master.

- main title 40px at the 10px/mm working scale;
- route 21px;
- date 18px;
- party 16px;
- no 9–13px operational microtype remains;
- long route can use two lines without collision;
- native text bounds are structurally trustworthy.

Final physical-size proof remains mandatory because actual MINTIA label dimensions are not yet measured.

## Professional council score

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-up: `14/15`
- Japanese typography / editorial craft: `13/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / journey integration without cliché: `9/10`
- Item-specific functionality: `9/10`
- Physical print credibility: `8/10`
- Editability / realistic content resilience: `5/5`
- Family fit without template sameness: `5/5`

Total: `91/100`.

Executive Creative Director: no veto.
Japanese Editorial Designer: no veto after microtype subtraction and long-route stress.
Print Production Director: no veto for the provisional digital master; physical case measurement / 100% print proof remains deferred.

## Final comparison against retained production

Only after the new candidate was mature, retained production `11:2 / FRAME_LABEL` was opened for final comparison.

Retained production has strong nostalgic ticket craft, but it still carries much more ornamental information mass: guilloche, outer/inner rules, route nodes, micro facts, management placeholder, perforation dots and multiple small typographic roles. At 72×25mm it reads quieter and denser, with several 8.5–15px roles.

The vNext selected candidate is materially more aligned with the new professional brief: stronger at thumbnail scale, more joyful/pop, less template-like, fewer pseudo-rail artifacts, clearer at actual size, and more distinct from Passport/Boarding despite sharing the project-wide sense of departure.

Decision: vNext is the preferred professional direction.

## Drive / asset lifecycle

- Drive folder metadata was read back live.
- generated candidates: `0`;
- adopted asset masters: `0`;
- Drive writes: `0`.

No asset lifecycle was opened because no image/SVG bottleneck was diagnosed.

## Deferred finalization

`NOT_PRINT_READY` remains for:
- physical MINTIA application-area measurement;
- final departure / destination content;
- paper/adhesive/finish choice;
- 100% scale print + actual-case application proof.

## Next target

Proceed to `ADD-01 ウェルカムボード` with a completely new item-specific emotional brief and blank-frame vNext direction. Do not carry the Passport/Boarding/青春 palette or layout as a template; carry only the professional critique and QA methods.
