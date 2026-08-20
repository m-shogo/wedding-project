# ADD-16 Professional vNext — HOMEWARD JOURNEY QA — 2026-08-21

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_SELECTED / LONG_COPY_VISUAL_PASS / HANDWRITING_FIELD_PRINT_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `ef02987accdb998126c0ab7a5018d8252cd9f0ab`
Promotion authority SHA observed immediately before final Figma write: `1508941f976262cc8d760c00cdf8c740cf1e2933`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope / blocker handling

ADD-15 remains `BLOCKED_REQUIRED_INPUT / DEPLOYMENT_DECISION_MISSING / FIGMA_NOT_STARTED`; its item authority says not to repeat the same blocked probe. No ADD-15 mutation was made.

ADD-16 was advanced as the next safe target.

## Clean-room rule

The professional vNext visual construction started from blank frames on a new Figma page. Retained `HOME HORIZON`, older V2/V3 and legacy production were not duplicated or used as a component/layout source during authoring. Carried forward only verified non-visual requirements: `700×1036` working size, parent-recipient role, gratitude/message role, optional short line, date, couple signature, optional handwriting area, unresolved family/copy boundary, print/readability constraints.

The retained current was opened only after the vNext front/back and long-copy proofs were mature enough for comparison.

## Figma

File: `ylmVBbwNcnjueYrymNpa3c`

Current professional-vNext page:
- `45:2 / CURRENT_SELECTED / ADD-16 / HOMEWARD JOURNEY / 2026-08-21`

Three original blank-frame directions:
- `45:3 / HOMEWARD SUN`
- `45:13 / LEI OF THANKS`
- `45:22 / POSTCARD HOME`

Professional critique before refinement:
- `HOMEWARD SUN`: strongest balance of warmth, travel/homecoming metaphor, Japanese-first hierarchy, celebratory sunlight and parent-gift dignity.
- `LEI OF THANKS`: emotionally strong but dark field + large circles risked event-poster language rather than intimate keepsake.
- `POSTCARD HOME`: travel semantics were clear, but the hard right block felt more systematic and less emotionally generous.

Selected/current roots:
- front `45:32 / CURRENT_SELECTED / ADD16 / FRONT / HOMEWARD SUN`
- back `45:42 / CURRENT_SELECTED / ADD16 / BACK / AFTERGLOW HOME`
- hidden realistic long-copy front/back `45:53 / 45:63`

Retained previous selected, comparison/history only:
- `18:3 / 18:14 / CLEANROOM V3 HOME HORIZON`
- hidden previous long-copy `18:26 / 18:37`
- legacy `1:2 / 1:13`

## Art direction

Emotional brief:

`結婚式という新しい旅立ちの日に、育った場所へ「ありがとう」を持って帰る。`

Front:
- warm cream paper field;
- deep-ocean physical spine;
- oversized cropped sunrise;
- Japanese-first `ありがとうを、持って帰ろう。`;
- mint homeward breeze as one binding movement gesture;
- recipient/date/signature remain native editable roles.

Back:
- deep-ocean afterglow field;
- coral sunset crop + mint sky sweep + yellow closing sweep;
- Japanese message is primary;
- no family/person imagery, fake airline credential, house/heart icon, route-stepper UI, barcode, shadow, gradient or decorative English filler.

## Handwriting-field correction found during final visual QA

The first vNext back structurally retained an invisible `240×145` handwriting semantic area, but native screenshot review showed that the physical area sat over the dark navy/coral afterglow. That meant the role existed in Figma but was not reliably usable with normal dark pen ink on the printed artifact.

This is a production defect, not a geometry-overflow defect.

Bounded correction on both selected and stress back:
- added `49:2 / 49:3 / DECOR / HANDWRITTEN PAPER FIELD`;
- borderless warm-cream ellipse `300×190` at `x=35, y=695`;
- existing semantic handwriting role remains independent at `x=65, y=720, 240×145`, opacity `0`, stroke `0`;
- the light field sits behind the semantic area and above the coral afterglow;
- no printed helper label or UI-like rectangle was added.

Result: the optional future handwriting role now has a practical light physical writing surface while preserving the afterglow composition and native editability.

## Hybrid authoring split

- native text: all variable/factual/family-facing copy;
- simple native vector/shape: fixed large color fields, sweeps and the borderless handwriting paper field;
- generated/composed raster: `0`;
- editable SVG: `0` — no reusable silhouette currently justifies SVG complexity;
- replaceable image: `0`;
- person/family AI imagery: `0`.

Image generation was not used because the quality bottleneck was emotional typography/composition and physical handwriting usability rather than missing hero imagery. Generated family imagery would create identity/provenance risk and is inappropriate for this role.

## Three-scale screenshot QA

Three concept thumbnails were reviewed before the full-size selection. Selected front/back were then reviewed at native `700×1036`, and both realistic long-copy stress roots were temporarily revealed and reviewed at native size before returning them to hidden QA state.

### Selected front

PASS.
- first read is gratitude headline;
- oversized sunrise and navy spine create a memorable departure/homecoming gesture;
- Japanese hierarchy carries the page;
- no admin/card UI feeling;
- smallest meaningful reader-facing role is 20px or larger in the selected face.

### Selected back

PASS after handwriting-field correction.
- message remains dominant;
- mint/coral/yellow movement produces warm afterglow without obscuring copy;
- the borderless cream writing field creates a real pen-safe optional note surface instead of a form box.

### Long-copy front `45:53`

PASS.
- long recipient wraps to two lines;
- long gratitude body remains clear;
- long couple signature wraps naturally;
- all reader-facing text remains inside root and text-text collision count is `0`.
- the long recipient overlaps the yellow sunrise field only as a high-contrast dark-on-light editorial overlap; legibility remains intact.

### Long-copy back `45:63`

PASS after handwriting-field correction.
- long recipient and long gratitude paragraph remain readable;
- date and long signature remain separated;
- optional writing surface remains available;
- outside text `0`; text-text collision `0`.

## Structure readback after final Figma write

Selected front `45:32`:
- visible native text `6`;
- fixed-height visible text `0`;
- IMAGE fills `0`;
- visible text outside root `0`;
- text-text collisions `0`.

Selected back `45:42`:
- visible native text `6`;
- fixed-height visible text `0`;
- IMAGE fills `0`;
- visible text outside root `0`;
- text-text collisions `0`;
- handwriting semantic role `45:52 = 240×145, opacity 0`;
- physical light field `49:2 = 300×190`.

Stress front/back `45:53 / 45:63`:
- each native visible text count when evaluated `6`;
- fixed-height text `0`;
- IMAGE fills `0`;
- outside root `0`;
- text-text collisions `0`;
- stress back handwriting field mirrors selected via `45:73 + 49:3`;
- both stress roots returned to `visible=false` after screenshot QA.

## Mature comparison against retained HOME HORIZON

Only after vNext maturity, retained `18:3 / 18:14` was reviewed at native `700×1036`.

Retained HOME HORIZON remains structurally competent and quiet, but its large unused cream fields, sparse serif placeholders and single thin horizon read significantly more restrained than the current project brief.

The professional vNext clearly wins for the requested direction because it adds:
- stronger emotional first read;
- memorable scale contrast;
- more travel/departure movement without fake travel credentials;
- more celebratory color while retaining parent-gift dignity;
- a clearer visual family relationship with the broader `SUNSHINE DEPARTURE` suite;
- a physically usable optional handwriting surface.

No retained visual node or decoration was copied into the vNext.

## Professional Design Council score

`91 / 100` — PASS (`>=85`, no veto)

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-it-up: `14/15`
- Typography / Japanese editorial craft: `13/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel-flight-Hawaii integration without cliché: `8/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `9/10`
- Editability / content resilience: `5/5`
- Family fit without template sameness: `4/5`

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains after the handwriting-field correction.

## Drive

Exact authority confirmed live:
- `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`

Drive write: `0` because this selected direction uses no generated/adopted binary asset.

## Promotion decision

`PROFESSIONAL_VNEXT_SELECTED`.

ADD-16 now holds:
- `SELLABLE_VISUAL_QA_PASS`
- `DESIGN_QA_PASS_WITH_PLACEHOLDERS`
- `LONG_COPY_VISUAL_PASS`
- `HANDWRITING_FIELD_PRINT_SAFE`
- `LEGACY_PRESERVED`
- `NOT_PRINT_READY`

Final family facts, recipient forms, actual gift/package, final message/signatures, paper/vendor profile and physical attachment remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`. These do not block progression to ADD-17.