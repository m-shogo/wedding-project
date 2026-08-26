# ADD-03 Timetable — Offset Day Sheet V7 Proxy vs Current Rejection

Status: `REJECTED_PRE_FIGMA / CURRENT_RETAINED`
Date: 2026-08-26
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run-start / pre-write latest `main`: `5f2dc81a962f151588950d548fe36beb264886c6`
- exact Figma file: `woFUHUqZcvNkih8o42xeH4`
- retained Current A2: `14:2 / DAY BROADSHEET` — `1400×1980`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- V7 fixed-art source: `assets/offset-day-sheet-v7-fixed-art.svg`
- earlier V7 evidence: `OFFSET-DAY-SHEET-V7-PRE-FIGMA-QA-2026-08-26.md`

Rurubu item-specific production, Drive, Figma, assets and paths were not inspected or used.

## Why this additional gate was run

V7 had reached `SERIOUS_PRE_FIGMA_CANDIDATE`, but the Figma mutation path is currently blocked because `use_figma` requires `figma-use` guidance and the connected guidance resource is not readable. Rather than keep generating more pre-Figma candidates or repeat the same blocked write method, this run used the existing V7 editable SVG plus verified timetable facts/semantic placeholders to make a local non-production composition proxy and compared that proxy against a fresh live screenshot of retained Current.

The proxy is evaluation evidence only. It is not Figma proof, not a production asset, and not a substitute for a real Figma three-scale gate.

## Facts / constraints used in the proxy

Only verified non-visual requirements were used:

- canvas role: A2 `1400×1980` working canvas;
- date: `2026.10.24 SAT`;
- location: `YOKOHAMA`;
- ceremony: `14:10–14:40`;
- unresolved interval: `14:40–15:00` with semantic placeholder guidance only;
- reception: `15:00–17:30`;
- variable/final guidance stays semantic placeholder copy;
- no venue floor, gate, flight, QR, transport credential, or other invented fact.

The proxy typography was composed independently for evaluation; it did not copy Current node positions or rules.

## Hybrid split evaluated

- chronology / date / event labels / guidance / closing: native-text-equivalent semantic typography in the proxy;
- V7 offset sheets / folded corners / registration accent: editable SVG fixed-art;
- generated raster: `0`;
- photography / replaceable image roles: `0`;
- variable copy baked into fixed art: `0`.

## Fresh Current review

Live Current `14:2 / DAY BROADSHEET` was re-rendered at reading scale.

Observed strengths still present:

- time hierarchy is immediate at thumbnail/reading scale;
- large numerals remain the first operational read;
- Japanese title/date/event hierarchy is stable;
- chronology is clearer than the V7 proxy;
- the object already has verified long-copy and structure evidence.

Observed limitation remains: the full-height cobalt field and evenly separated chronology still feel more formal/programmatic than the desired pop/travel excitement brief.

## V7 proxy result

### Whole-item / approximately 500 px

`FAIL TO BEAT CURRENT`.

Strengths:

- the artifact reads as one layered physical paper object;
- cream/cobalt/lagoon/coral/mango gives more celebratory movement than Current;
- no route diagram, card grid, fake travel data or repeated UI modules appear.

Weaknesses:

- the dark + lagoon backing sheets dominate the silhouette and make the object read as a generic layered-poster/stationery composition;
- the large folded corners feel decorative before they feel timetable-specific;
- event guidance becomes visually smaller and weaker than Current at thumbnail scale;
- the offset paper metaphor adds style but does not add enough timetable-specific meaning to compensate for the loss of chronology authority.

### Reading scale

`MIXED / NOT ENOUGH TO PROMOTE TO FIGMA ASSEMBLY`.

The Japanese headline and staggered times can be made readable, but the page still feels like typography placed onto a generic layered paper object. The fixed-art idea is not uniquely tied to `当日タイムテーブル` strongly enough to justify consuming another Figma assembly cycle while Current already has a verified `91/100` sellable state.

### Actual-size proxy

No structural overflow was observed in the local proxy, but this is not accepted as Figma structure evidence. More importantly, the proxy did not reveal a visual advantage large enough to justify moving to production assembly.

## Decision

`OFFSET DAY SHEET V7` is **rejected before Figma assembly**.

- do not import V7 into production merely because a fixed-art asset exists;
- do not treat the existing `SERIOUS_PRE_FIGMA_CANDIDATE` label as a promotion obligation;
- retain the SVG and earlier evidence as process/history only;
- retain Current `DAY BROADSHEET` unchanged;
- do not create V8 as another cosmetic layered-paper variation while the Figma authoring capability is unchanged.

When a materially different ADD-03 clean-room direction is attempted later, it should solve the remaining problem more specifically: increase wedding-day emotional energy **without weakening the timetable's immediate chronology read and without relying on generic layered-paper/festival-branding decoration**.

## Learning state

`TESTED_LOCAL_PRE_FIGMA → REJECTED`.

Visible problem: a physical-paper metaphor can improve warmth while still being too generic to beat an already strong information artifact.

Root cause: V7's physical-sheet identity is real, but it is not sufficiently item-specific; the backing sheets and folded corners carry more identity than the timetable semantics.

Do **not** promote a cross-item rule from this pre-Figma rejection. The only operational consequence is to stop spending additional runs refining this same V7 family without material new evidence or authoring capability.

## Production / asset state

- Current Figma production: unchanged;
- Drive write: `0`;
- image generation: `0`;
- V7 SVG: retained as rejected study/history;
- `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` for Current remains valid;
- `NOT_PRINT_READY` remains until final interval wording, printer/template and physical proof are authoritative.
