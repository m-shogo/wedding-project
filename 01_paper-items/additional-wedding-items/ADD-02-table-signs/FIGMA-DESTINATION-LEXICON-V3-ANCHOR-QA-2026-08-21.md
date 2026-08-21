# ADD-02 — Destination Lexicon V3 Anchor QA

Date: 2026-08-21
State: `VERIFIED_LOCAL / SERIOUS_COMPARISON_CANDIDATE / NOT_PROMOTED`
Start/live authority SHA: `c6cdc0390ecb87b8ce4745b7202fce9d3a24b72a`
Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン` (existing authority; no Drive write in this bounded test)

## Why this run changed method

The previous blank-frame A–D study proved that subtracting repeated circles/pills or replacing them with one shared paper metaphor did not create enough destination specificity. The next-method brief therefore required a place-derived visual lexicon on only two anchors before touching the 11-sign production family.

No current production frame, old V2/V3, old crop, old decorative vector, generated asset, layout group or palette was duplicated into these candidates. Only verified facts/constraints were carried: 1000×1480, destination label, Japanese label, table number, date and native theme headline/description roles.

## New clean-room V3 anchors

Created on the existing study page `VNEXT_STUDY / ADD-02 / PLACE-DERIVED FAMILY / 2026-08-21`:

- HAWAII `149:2 / VNEXT_V3 / HAWAII / COASTAL LIGHT PRINT FIELD / CLEANROOM`
- JAPAN `149:21 / VNEXT_V3 / JAPAN / PAPER LIGHT DETAIL FIELD / CLEANROOM`

The pair intentionally does not share one hero geometry.

### HAWAII — COASTAL LIGHT PRINT FIELD

- warm cream paper field;
- ocean-teal side atmosphere field plus sunlit ochre edge;
- repeated low-detail wind/water ripples as fixed print-like atmosphere rather than literal palm/hibiscus/tiki imagery;
- native HAWAII / ハワイ / TABLE / theme / description / date text remains independent;
- no fake airline data, fake Hawaiian words, people or stock-paradise imagery.

### JAPAN — PAPER LIGHT DETAIL FIELD

- pale paper field with dark bound edge;
- warm light sheet, restrained vermilion edge and offset layered-paper/shadow field;
- fibre/detail rhythm rather than Fuji/torii/sakura/icon stacking;
- Japanese display name is stronger than the Latin country label;
- native destination/table/theme/description/date text remains independent.

## Three-scale visual QA

Both candidates were rendered at:

- thumbnail: 500px max dimension;
- reading: 1200px max dimension;
- actual canvas: source remains exactly 1000×1480 and was inspected through the 1200px render/readback.

Bounded visual result: `PASS_AS_SERIOUS_COMPARISON_CANDIDATE`.

Compared with the previous A–D study, the anchors now remain distinguishable through material/light behavior even without relying only on recolor or a repeated circle/fold/book metaphor. They retain more warmth than the rejected gallery-poster directions. They are **not** promoted over the mature 11-sign production family yet; only two destinations have been independently authored and no fixed generated/composed master has completed the Drive lifecycle.

## Long-copy / structure QA

Initial structure readback exposed a real authoring defect: all 12 new native text nodes reported `textAutoResize=NONE` despite being intended as variable semantic text. This was corrected before treating the candidates as verified.

Hidden stress duplicates:

- HAWAII `149:40`
- JAPAN `149:59`

The first HAWAII stress expanded the headline to bottom y=790 while the description began at y=760, producing a real overlap risk. The description lane was moved to y=830 in both selected HAWAII and its stress duplicate, then screenshot QA was rerun.

Final selected-root readback:

- HAWAII `149:2`: 6/6 visible native text roles auto-height; outside visible text 0; IMAGE fills 0.
- JAPAN `149:21`: 6/6 visible native text roles auto-height; outside visible text 0; IMAGE fills 0.
- hidden long-copy stress: no outside visible text after repair.

This run therefore does not reuse an older long-copy PASS after a spatial change; it revalidated the changed text lane.

## Hybrid authoring / image-generation truth

Responsibility split in Figma:

- variable/factual copy: native editable text;
- current bounded fixed atmosphere: simple native geometry only for the prototype;
- SVG: 0;
- replaceable IMAGE fill: 0;
- generated/composed master placed: 0.

An image-generation call was made during the run, but its returned artifact was an unrelated QA/report-style graphic rather than a valid HAWAII/JAPAN destination fixed-art master. It was rejected immediately and was **not** saved to the ADD-02 Drive authority, not uploaded to Figma, and not counted as production progress.

This is important lifecycle evidence: `generated != adopted`. A generated artifact must satisfy the item-specific role brief before Drive/Figma placement.

## Production decision

`CURRENT_PRODUCTION_RETAINED / V3_ANCHORS_VERIFIED_LOCAL / NOT_PROMOTED`.

Current production HAWAII `2:2` and JAPAN `2:47` remain untouched. The two-anchor V3 has earned further comparison work, not automatic rollout to nine additional destinations.

## Next highest-value step

1. keep `149:2 / 149:21` as the bounded anchor pair;
2. when a controllable item-specific image/composed-asset generation path is available, create materially different role-valid fixed-art candidates from the existing HAWAII/JAPAN lexicon brief and complete `generate → critique → exact Drive master → readback → Figma role → three-scale QA`;
3. otherwise test one additional non-tropical destination from blank frame to determine whether the lexicon method scales without becoming a new template;
4. only after the anchor method clearly beats current production on destination specificity **and** preserves wedding excitement should the remaining family be rebuilt.

## Learning state

`DESTINATION_DIFFERENTIATION_BY_SHARED_ABSTRACT_GRAMMAR` remains a source observation.

New local evidence: `DESTINATION_SPECIFICITY_REQUIRES_DISTINCT_MATERIAL_OR_ATMOSPHERE_ROLE`, state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` only for destination-family work. Do not promote it to a project-wide visual rule yet.
