# ADD-17 子ども向けミニカード — Back coral side-tape subtraction QA

Date: 2026-08-24
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main SHA: `5458a79c576c386bf9bb1c1e55b3f0642b2372a9`

## Scope

Bounded Current-only visual repair on the already-selected `EXPEDITION FIELD SHEET / DISCOVERY POSTLOG` back. No new clean-room direction was opened because the selected concept is already Professional vNext 94/100 and the screenshot-supported defect was one fixed-art rail.

## Live authority

- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- Current front: `67:3 / CURRENT_SELECTED / ADD17 / FRONT / EXPEDITION FIELD SHEET`
- Current back: `67:4 / CURRENT_SELECTED / ADD17 / BACK / DISCOVERY POSTLOG`
- hidden realistic back stress: `69:40`
- exact Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive write: `0`
- image generation: `0`

## Observed problem

Fresh native `1110×1540` review showed `DECOR / CORAL SIDE TAPE` as a full-height coral rail from y=160 to the bottom edge. Although named as a physical paper/tape cue, it did not connect to a fold, binding, trim, tear, writing function, or reader-facing information role. At whole-item scale it read closer to a UI/status side rail than to a necessary physical artifact cue.

The back already retained a strong cobalt top band, open cream writing field, ruled writing surface, and one outlined discovery star. Therefore the coral rail was not required to preserve the selected discovery-note identity.

## Rollback-safe bounded comparison

Comparison clones were created before Current mutation:

- `82:2 / QA / ADD17 / BACK / NO CORAL SIDE TAPE / 2026-08-24`
- `82:21 / QA / ADD17 / BACK LONG COPY / NO CORAL SIDE TAPE / 2026-08-24`

Only `DECOR / CORAL SIDE TAPE` was hidden. Copy, typography, writing rules, cobalt top band, star, date/name roles, size and paper field were unchanged.

Fresh comparison review at whole / reading / native actual-size showed a cleaner and more open writing surface. The remaining cobalt header continued to provide sufficient visual energy and face-to-face family connection with the playful front.

## Promotion and rollback

Complete pre-change rollbacks were created before Current mutation:

- `82:40 / ROLLBACK / ADD17 / BACK / PRE-NO-CORAL-SIDE-TAPE / 2026-08-24`
- `82:59 / ROLLBACK / ADD17 / BACK LONG COPY / PRE-NO-CORAL-SIDE-TAPE / 2026-08-24`

Promoted state:

- Current `67:4`: `DECOR / CORAL SIDE TAPE = hidden`
- stress `69:40`: same treatment
- QA comparisons `82:2 / 82:21`: hidden after verification

Front `67:3` was not changed.

## Three-scale / stress QA

- whole-item: PASS; the back is calmer and less rail/UI-like.
- reading scale: PASS; title → prompt → writing field → guide/name/date is clearer.
- native actual-size `1110×1540`: PASS.
- realistic long-copy back: PASS after temporary live reveal.

Long-copy proof still supports the longer prompt, guide and optional-name stress without introducing new geometry problems. The proof was hidden again after QA.

## Structure readback

Current back `67:4`:
- visible native text: `6`
- fixed-height visible text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- `DECOR / CORAL SIDE TAPE`: hidden
- cobalt top band: visible
- writing rules: visible
- bottom star: visible

Stress back `69:40`:
- visible native text: `6`
- fixed-height visible text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- `DECOR / CORAL SIDE TAPE`: hidden

## Hybrid / image decision

- semantic/variable/factual copy stays native editable text;
- fixed writing rules and cobalt header remain native functional geometry;
- discovery star remains editable vector;
- no raster/generated asset was needed;
- no Drive write was needed.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_PASS`: the visible defect was an unnecessary fixed rail, not missing illustration, photography, texture, or hero art.

## Learning state

`VERIFIED_LOCAL` application of the established non-Rurubu QA principle: a layer name such as `tape`, `edge`, `rail`, or `paper edge` is not proof of physical meaning. The whole-item rendering must show an actual reader-facing, binding, trim, fold, or artifact job.

No new project rule is created from this single change.

## Deferred finalization

Still `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` pending authoritative child attendance/use information, final activity copy, printer template/profile, paper/pen/crayon choice, and 100% physical proof.
