# ADD-16 Professional vNext — HOMEWARD JOURNEY QA — 2026-08-21

Status: `VNEXT_CANDIDATE_CREATED / THREE_DIRECTION_CLEANROOM / THREE_SCALE_QA_STARTED / LONG_COPY_STRUCTURE_PASS / NOT_PROMOTED`
Start authority SHA: `ef02987accdb998126c0ab7a5018d8252cd9f0ab`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope / blocker handling

ADD-15 remains `BLOCKED_REQUIRED_INPUT / DEPLOYMENT_DECISION_MISSING / FIGMA_NOT_STARTED`; its QA explicitly says not to repeat the same probe and to continue another safe non-Rurubu target. No ADD-15 Figma mutation was made.

ADD-16 was therefore advanced as the next safe target.

## Clean-room rule

New visual construction started from blank frames on a new Figma page. Retained HOME HORIZON / legacy nodes were not duplicated or used as a component/layout source during authoring. Carried forward only verified non-visual requirements: 700×1036 working size, parent-recipient role, gratitude/message role, optional short line, date, couple signature, optional handwriting area, unresolved family/copy boundary, print/readability constraints.

## Figma

File: `ylmVBbwNcnjueYrymNpa3c`
New page: `45:2 / VNEXT_PRO / ADD-16 / HOMEWARD JOURNEY / 2026-08-21`

Three blank-frame concepts:
- `45:3 / HOMEWARD SUN`
- `45:13 / LEI OF THANKS`
- `45:22 / POSTCARD HOME`

Professional critique:
- HOMEWARD SUN: strongest balance of warmth, travel/homecoming metaphor, Japanese-first hierarchy, celebratory sunlight, and parent-gift dignity.
- LEI OF THANKS: emotionally strong but dark field + large circles risks becoming event-poster language rather than intimate keepsake.
- POSTCARD HOME: travel semantics are clear, but the hard right block feels more graphic/systematic and less emotionally generous.

Selected refinement:
- front `45:32 / VNEXT_SELECTED_CANDIDATE / ADD16 / FRONT / HOMEWARD SUN`
- back `45:42 / VNEXT_SELECTED_CANDIDATE / ADD16 / BACK / AFTERGLOW HOME`
- hidden stress front/back `45:53 / 45:63`

## Art direction

Emotional brief: `結婚式という新しい旅立ちの日に、育った場所へ「ありがとう」を持って帰る。`

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
- optional handwriting geometry retained as an invisible semantic area rather than visible UI box;
- no family/person imagery, fake airline credentials, house icon, heart icon, route-stepper UI, barcode, shadow, gradient or decorative English filler.

## Hybrid authoring split

- native text: all variable/factual/family-facing copy;
- simple native vector/shape: fixed large color fields and sweeps;
- generated/composed raster: `0`;
- editable SVG: `0` — no reusable silhouette currently justifies SVG complexity;
- replaceable image: `0`;
- person/family AI imagery: `0`.

Image generation was not used because the current bottleneck is emotional typography/composition rather than missing hero photography. Generated family imagery would add identity/provenance risk and is explicitly inappropriate for this role.

## Screenshot QA

Three concept thumbnails were rendered at 700px long edge before refinement. Selected front/back were then rendered at native `700×1036`.

Selected front native: PASS — first read is gratitude headline, sunrise and homeward movement; no admin/UI-card reading.
Selected back native: PASS — message remains dominant; large color fields create afterglow without obscuring variable copy.

Whole/read/detail gate is started but not yet declared final because hidden long-copy visual reveal and mature retained-current comparison still remain before promotion.

## Structure readback

Selected front `45:32`:
- visible native text `6`
- fixed-height visible text `0`
- IMAGE fills `0`
- visible text outside root `0`

Selected back `45:42`:
- visible native text `6`
- fixed-height visible text `0`
- IMAGE fills `0`
- visible text outside root `0`

Stress front `45:53` / back `45:63`:
- each visible semantic text count when evaluated `6`
- fixed-height text `0`
- IMAGE fills `0`
- outside root `0`

## Drive

Existing exact authority remains `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード` from current item QA. Drive write: `0` because no generated/adopted binary asset was needed in this iteration.

## Promotion state

Do not promote yet. Remaining high-value checks:
1. reveal and screenshot long-copy front/back at native size;
2. inspect smallest reader-facing copy and handwriting-area behavior;
3. Professional Council 100-point score;
4. only after candidate maturity, compare against retained current HOME HORIZON;
5. promote only if vNext clearly wins; otherwise keep retained current and iterate another blank-frame direction.

Final family facts, recipient forms, actual gift/package, final message/signatures, paper/vendor/physical attachment remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION` and do not block visual exploration.