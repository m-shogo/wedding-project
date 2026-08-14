# ADD-16 両親贈呈品メッセージカード — Figma Design QA

Updated: 2026-08-14
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V2_PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Current live authority — verified 2026-08-14

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- production front: `1:2`
- production back: `1:13`
- Drive folder: `ADD-16_両親贈呈品メッセージカード`
- Drive ID: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- Drive parent: `0ADXt8irGMFGnUk9PVA`

## Current production art direction

The live V2 production is a Japanese-first parent-gift enclosure / correspondence card, not a generic travel-template derivative. It uses a narrow binding strip, restrained rust/mint accents, an asymmetric front hierarchy and a letter-surface back. No raster decoration or generated family imagery is used.

The earlier reopened clean-room comparison remains historical evidence that the legacy sparse template was materially challenged before V2 was adopted; it is not being treated as the current screenshot by itself.

## Fresh screenshot QA — 2026-08-14

Fresh production screenshots were rendered for front `1:2` and back `1:13` at their native approximately 401×582 canvas size.

Front remains visually coherent: Japanese headline is dominant; recipient/message/gift-context fields read as correspondence rather than UI cards; the left binding strip and restrained accents provide physical-paper rhythm without decorative travel filler.

Back remains visually coherent as a letter surface: body, signature rule, signature/date and quiet closing copy form a clear reading sequence. The semantic body copy uses `[本文 · LAYOUT DUMMY]` and `[家族の思い出 · LAYOUT DUMMY]`; no family memory is fabricated.

Result: current live production still supports `SELLABLE_VISUAL_QA_PASS`.

## Live structure readback — 2026-08-14

Front `1:2` metadata:

- 400.63×582.05 px root
- native text nodes: 7
- image fills: 0
- binding strip and accent remain native vector/shape layers

Back `1:13` metadata:

- 400.63×582.05 px root
- native text nodes: 5
- image fills: 0
- signature rule remains native vector

Production root IDs remain stable. No flatten/raster replacement was introduced.

## Placeholder hierarchy polish — 2026-08-13

Fresh actual-size review had found the literal `LAYOUT DUMMY` suffix competing with the semantic field labels. The production was polished rollback-safely without removing placeholder semantics:

- front rollback `11:2`
- back rollback `11:13`
- only literal `LAYOUT DUMMY` suffixes were demoted to 7 px warm-gray at 0.78 opacity
- affected native text: front `4:18`, `4:19`, `4:23`; back `4:37`, `4:39`, `4:40`

Evidence: `docs/automation/add-16-parent-gift-message-card-placeholder-hierarchy-2026-08-13.md`.

## Semantic placeholder polish — 2026-08-12

The back previously exposed an implementation instruction, `[家族固有の事実・思い出は正式入力後に配置]`. A hidden rollback was preserved at `6:2`, then production `4:37 / TXT_BODY` was changed to the semantic editable copy:

`[本文 · LAYOUT DUMMY]\n\n[家族の思い出 · LAYOUT DUMMY]`

No factual family memory was invented.

## Historical reopened visual / long-copy evidence

The legacy production was reopened because it was structurally sound but visually sparse and generic. A materially different native clean-room V2 pair was created and evaluated before promotion:

- clean-room front `3:2`
- clean-room back `3:13`
- long-copy stress front `3:22`
- long-copy stress back `3:33`
- pre-V2 rollback front `4:2`
- pre-V2 rollback back `4:24`

Long-copy stress passed with native text and no clipping/collision. This remains valid structural/overflow evidence while the fresh 2026-08-14 production screenshots are the current visual-completion evidence.

## Image / Drive

`IMAGE_GENERATION_NOT_REQUIRED`.

The live quality bottleneck was typography, authorship, semantic placeholder presentation and paper composition rather than missing imagery. Generating decorative media would not materially improve this item and would reduce editability.

Drive live metadata was re-read on 2026-08-14:

- ID: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- title: `ADD-16_両親贈呈品メッセージカード`
- MIME: `application/vnd.google-apps.folder`
- parent: `0ADXt8irGMFGnUk9PVA`

No Drive asset was added or changed.

## Deferred / blocked required input

- one card per family vs shared card;
- gift size/wrapping/attachment and handoff method;
- printed name policy and final recipient/signature copy;
- full vs short message, vertical vs horizontal writing, and overlap with any read-aloud letter;
- printer template/profile, exact vendor bleed/safe requirements and 100% physical proof.

These remain `DEFERRED_FINALIZATION` / `BLOCKED_REQUIRED_INPUT`; maintain `NOT_PRINT_READY` until physical/vendor checks are complete.

---

## Presentation-format footer removal — 2026-08-14

Fresh native-size front review found one remaining production-only footer: `4:23 / TXT_NOTE / [贈呈形式 · LAYOUT DUMMY]`. The actual card already carries the recipient, gratitude lead, gift-enclosure context and date; `贈呈形式` describes production/handoff setup rather than content the parents need to read. Keeping it on the printed face made the card look slightly more like a proof sheet than a finished gift enclosure.

### Live authority before write

- observed `main`: `30afbe44a03f2639c51f39bf802f52839115f9b1`
- Current: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma: `ylmVBbwNcnjueYrymNpa3c`
- front: `1:2`
- back: `1:13`
- Drive: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`

### Rollback-safe production change

Created hidden full-front rollback before the edit:

- `14:2 / ROLLBACK_ADD16_FRONT_PRE_PRESENTATION_FORMAT_FOOTER_REMOVAL_2026_08_14`
- native size: approximately `400.63×582.05`

Production root `1:2` was preserved. Only `4:23 / TXT_NOTE` was changed to `visible=false`.

Recipient placeholder, gratitude-message placeholder, fixed date, headline, binding strip, gift-context sentence, accents, back content and all factual/semantic roles were left unchanged.

### Screenshot QA

Fresh native-size front screenshot PASS.

- the bottom area now ends with the fixed date rather than a production/handoff instruction;
- headline → recipient → gratitude lead → gift-context → date hierarchy is cleaner;
- the card reads more like a finished enclosure and less like a proof sheet;
- no new empty premium-style void, clipping, collision or decorative replacement was introduced.

### Structural readback

Front `1:2` after the edit:

- root: approximately `400.63×582.05`, `clipsContent=true`;
- native text nodes: `7` total / `6` visible;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- `4:23 / TXT_NOTE`: hidden;
- rollback `14:2`: exists, hidden, same native size.

### Image / Drive

`IMAGE_GENERATION_NOT_REQUIRED`.

This defect was production-only editorial metadata, not missing imagery. Drive write: `0`.

### Decision

ADD-16 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRESENTATION_FORMAT_FOOTER_REMOVAL_PASS / V2_PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`
