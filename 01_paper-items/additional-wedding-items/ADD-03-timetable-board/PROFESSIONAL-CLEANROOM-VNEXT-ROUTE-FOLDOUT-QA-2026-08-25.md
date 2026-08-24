# ADD-03 当日タイムテーブル — Professional Clean-room vNext / One-Day Route Foldout QA / 2026-08-25

State: `CLEANROOM_FIXED_ART_CREATED / LOCAL_PREVIEW_REVIEWED / SERIOUS_COMPARISON_CANDIDATE / FIGMA_ASSEMBLY_PENDING / CURRENT_PRODUCTION_UNCHANGED`

## Authority

- run-start GitHub `main`: `b5fab72d8fdde0a7d18b0a4f6275717ecab32d5e`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- shared learning: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` + non-Rurubu feed
- exact Figma file: `woFUHUqZcvNkih8o42xeH4`
- retained Current A2: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`
- retained Current A3: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

No Current node, old V2/V3 layout, old decorative vector, crop, image or generated asset was used as a construction source for the new fixed art. The current `DAY BROADSHEET` was inspected first only to diagnose whether a fresh materially different clean-room direction was justified; after that, the new visual construction was made from a blank 1400×1980 field using only verified facts/constraints and the semantic role of “one wedding day timetable”.

## Fresh Current screenshot diagnosis

Live A2 screenshot review at approximately 500–1000 px confirms that `DAY BROADSHEET` remains structurally excellent and immediately scannable, but exposes one real art-direction ceiling against the current user brief:

- it reads primarily as a sober printed program / institutional broadside;
- travel / departure anticipation is carried mostly by the words, not by the composition;
- there is little sense of “moving through one day” beyond stacked chronology;
- it is professional, but the emotional temperature is lower than the desired travel / airplane / Hawaii / pop / fun / excitement direction.

This is **not** a reason to mutate the Current production. It is sufficient reason to test one materially different clean-room candidate and retain Current unless the new candidate clearly wins after Figma three-scale + long-copy QA.

## Professional research consumed

High-quality references were used as design judgment only; no artwork or layout was copied.

### Pentagram — Editorial Design

https://www.pentagram.com/editorial-design

Transferable principle: editorial systems need `theme + variation`; familiarity must coexist with surprise. The timetable should therefore keep a clear chronological grammar while allowing a more memorable visual journey than repeated equal rows or web-like modules.

### Pentagram — Book Design

https://www.pentagram.com/book-design

Transferable principle: physical print design is typography + layout + production + storytelling experience. The page should behave like a designed artifact rather than like a screen captured into paper.

### Pentagram — Travel + Leisure

https://www.pentagram.com/work/travel-leisure

Transferable principle: travel editorial gains energy from strong, simple compositions and a clear visual atmosphere, while information is given enough room to breathe. “Travel” should not be simulated with fake transport UI or scattered icons.

### JAGDA — Graphic Design in Japan 2026

https://www.jagda.or.jp/news/10422/

Transferable principle: evaluate the object as real graphic design across Book & Editorial / General Graphics / physical production categories, not as a Figma effect. Actual-size typography, print rhythm and the quality of the whole object remain decisive.

## Internal clean-room exploration

Three materially different fixed-art directions were explored locally from blank 1400×1980 canvases before selecting a serious candidate:

### A — Departure Route Broadside

- coral departure header;
- irregular cobalt edge;
- one turquoise route gesture;
- three chronology cuts.

Rejected before repository adoption because the independent shapes still read too much like generic bright-shape travel graphics. It added energy but did not sufficiently bind the visual gesture to the timetable’s specific chronological function.

### B — Island Day Collage

- offset coral/yellow paper masses;
- broad lagoon field;
- cobalt lower counter-mass.

Rejected because large rectangular fields risked reintroducing poster/card/container grammar. It had stronger color energy but weaker information-specific meaning.

### C — Foldout Map

- three large map-like paper masses;
- route curve;
- open cream copy patches.

Rejected because the copy patches became card-like and the multi-column mass felt more like a generic map poster than a wedding-day program.

The first three explorations were not committed as production assets. They served only to eliminate weak methods before creating the serious candidate.

## Serious candidate — ONE-DAY ROUTE FOLDOUT

Committed fixed-art study:

- `studies/vnext-2026-08-25/one-day-route-foldout-fixed-art.svg`
- commit: `a7bf21a59bb403883e5863d803cef598c96170be`

### Concept

Treat the wedding day as **one route that physically moves through the sheet**, rather than as three independent timetable rows.

The composition uses:

- warm cream paper as the main editable-copy field;
- one irregular cobalt fold entering from the left, creating a physical map/foldout impression without simulating an app panel;
- one coral departure field plus a subordinate yellow sunrise fold at the top;
- one continuous turquoise route gesture as the dominant travel/day narrative;
- three short event-anchor slashes integrated with the route rather than circles, badges or transport UI;
- one cobalt lower fold to give the page a closing physical counterweight.

No plane icon, barcode, gate, flight number, stamp, fake passport data, QR, fake route map label or decorative English is present.

### Why it is stronger than the discarded explorations

- the travel cue is tied directly to chronology: one route = one wedding day;
- there is one dominant gesture, not many small decorations;
- event information can remain open native typography rather than cards;
- color energy is materially higher than DAY BROADSHEET without relying on gradients/shadows/web containers;
- the artifact can read as a printed foldout/day sheet rather than an admin dashboard.

### Main risk

The route curve can visually compete with native event copy if the copy lane is not protected. Therefore Figma assembly must keep the route primarily in the left/middle field and reserve the right side for event typography. Do not shrink copy merely to preserve the route; move/refine the fixed art or reject the candidate if realistic long-copy needs more room.

## Preview assembly hypothesis — NOT final copy

A local non-production preview was used only to test whether the fixed art can host the known semantic roles. The preview used:

- study headline: `今日を、旅する。` (not authoritative copy);
- confirmed `2026.10.24 SAT / YOKOHAMA`;
- confirmed times `14:10`, `14:40`, `15:00`;
- semantic titles `挙式`, `次の時間へ`, `披露宴`;
- placeholders for unresolved guidance;
- existing closing-copy mass only as a visual text-mass proxy.

The study demonstrated a workable text-free fixed-art split, but preview text is **not baked into the SVG and is not adopted Current copy**.

## Hybrid authoring contract

### Native Figma text

All reader-facing information remains native text:

- headline/subhead;
- `2026.10.24 SAT / YOKOHAMA`;
- `14:10–14:40` / `14:40–15:00` / `15:00–17:30`;
- event titles;
- unresolved `14:40–15:00` guidance placeholder;
- closing copy.

### Editable SVG fixed art

Only the non-semantic fixed visual system is SVG:

- cobalt fold;
- coral/yellow departure fold;
- turquoise route gesture;
- three route/event anchor slashes;
- lower cobalt fold;
- tiny trim-adjacent color registration rhythm.

No authoritative wording is embedded.

### Generated/composed raster

`0` for this experiment. The current quality bottleneck is composition/emotional rhythm, not missing photographic/illustrative imagery.

### Replaceable image role

`0` required.

## Figma assembly specification

When safe `use_figma` guidance is available, build this as a fresh blank-frame comparison; do not duplicate `14:2`.

### A2 candidate

- root: new blank `1400×1980` frame;
- fixed-art SVG imported as editable vector tree;
- native copy layer stack separated from the fixed art;
- no Auto Layout for the whole poster if it forces mechanical equal spacing; use semantic auto-height text and purposeful editorial coordinates;
- all text roles `textAutoResize=HEIGHT` after any explicit `resize()` call;
- Japanese semantic copy uses a verified Japanese font, not Latin fallback;
- long-copy proof must be a separate rollback-safe duplicate.

### Suggested text-safe geometry to test, not production truth

- header copy lane: x ≈ 170–820, y ≈ 90–300;
- event copy lane: x ≈ 700–1240, three deliberately unequal vertical positions aligned with the route’s three anchor slashes;
- closing copy lane: x ≈ 330–840, y ≈ 1710–1860;
- keep route fixed art mostly left/middle; do not let it force narrow Japanese measures.

### A3

If A2 survives three-scale review, create an **independent A3 reflow** rather than scaling A2. Preserve the concept (foldout + one route), not literal coordinates.

## Required Figma QA before any Current comparison

1. candidate alone at whole-item / ~500 px;
2. reading / ~1000 px;
3. actual-size/native detail;
4. realistic Japanese long-copy for all three event guidance roles;
5. semantic Japanese line-break review;
6. fixed-art vs variable-text optical collision review;
7. native text auto-height readback;
8. outside-text = 0;
9. IMAGE fill = 0 unless a later deliberate asset role is introduced;
10. only after the candidate is mature, compare with retained `DAY BROADSHEET`.

Promotion gate:

- new candidate must keep timetable recognition as fast as Current;
- must materially improve travel/wedding excitement;
- must not become a map app, airport UI, travel poster or generic colored-shape template;
- must keep strong Japanese typography and actual-size credibility;
- if it does not clearly win, retain `DAY BROADSHEET` and mark the clean-room study `REJECTED` or `HOLD`.

## Drive

Exact authority was live-read this run:

- `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

No Drive write was performed because the fixed-art study is not yet an adopted/serious Figma-verified production asset. Git remains the study master until the candidate survives Figma comparison.

## Figma write status this run

`BLOCKED_TOOL_GUIDANCE / NON-DESTRUCTIVE_PREPARATION_COMPLETED`

The connected Figma write action requires the `figma-use` skill/guidance before invocation. The canonical `skill://figma/figma-use/SKILL.md` resource was not readable in this environment. The run did not bypass that contract.

Read-only Current screenshot QA remained available, and the run switched methods rather than repeatedly probing or mutating production unsafely.

## Result

- Current production changed: `0`
- retained Current: `DAY BROADSHEET` remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
- new committed clean-room fixed-art study: `1`
- rejected local clean-room directions: `3`
- generated raster: `0`
- Drive write: `0`
- Figma write: `0`
- learning state: `VERIFIED_LOCAL` for the hypothesis that **a timetable can gain travel energy when one continuous visual journey is structurally bound to chronology, but generic travel color/shapes or card-like map fields are not sufficient**.

## Next action

At the next run where safe Figma authoring guidance is available:

1. re-read latest main + this item QA + Drive authority;
2. assemble ONE-DAY ROUTE FOLDOUT on a blank A2 frame;
3. run whole / reading / actual-size + realistic long-copy QA before seeing retained Current side-by-side;
4. create an independent A3 reflow only if A2 is genuinely strong;
5. promote only if it clearly beats DAY BROADSHEET in both excitement and artifact/timetable specificity.
