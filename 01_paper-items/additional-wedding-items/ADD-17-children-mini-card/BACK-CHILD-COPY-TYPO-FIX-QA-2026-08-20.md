# ADD-17 子ども向けミニカード V5 — Back child-copy typo fix QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / STRUCTURE_PASS / LEGACY_PRESERVED`
Date: 2026-08-20
Start authority SHA: `18499a565bd172ff332110eef281340479340f97`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- selected back: `2:5`
- corrected native text node: `15:62`
- hidden pre-change rollback: `40:2`
- Drive folder: `ADD-17_子ども向けミニカード_ぬりえ / 1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- production front `2:2` and all prior rollback/history remain unchanged.

## Visible problem

Fresh native-size review of selected back `2:5` found the child-facing cue printed as `えでもOK` beside the open writing/sketch area. In context this is a lexical typo: the intended reader-facing cue is `絵でもOK`.

The defect is small in geometry but high-confidence in meaning. Leaving it would make the sellable print artifact look unfinished even though the surrounding hierarchy and structure are healthy.

## Bounded correction

Before mutation, selected back `2:5` was cloned to hidden rollback `40:2 / ROLLBACK / ADD17 / BACK / PRE_絵でもOK_COPY_FIX / 2026-08-20`.

Only native text node `15:62` changed:

- before: `えでもOK`
- after: `絵でもOK`

No typography size, position, writing lines, optional-name field, binding rule, color, fixed-art geometry, or other copy changed.

No image generation, Drive write, rasterization, or generated asset was used.

## Three-scale QA

Post-change selected back was reviewed at:

- whole-item / 500 px: PASS;
- reading scale / 900 px: PASS;
- native actual size / `1110×1540`: PASS.

The corrected kanji remains readable without changing balance or writing-space behavior.

## Structure readback

Post-write live readback of selected back `2:5`:

- size: `1110×1540`;
- visible native text nodes: `5`;
- visible text outside root: `0`;
- text-to-text collisions: `0`;
- IMAGE fill nodes: `0`;
- corrected cue readback: `絵でもOK`.

## Drive / asset decision

Exact Drive authority metadata was re-read before the Figma write and matched folder ID `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`.

Drive writes: `0`.
Image generation: `0`.

## Result

- child-facing lexical correctness: `PASS`;
- sellable visual status: maintained;
- native editability: maintained;
- structure / overflow: `PASS`;
- legacy / rollback preservation: `PASS`;
- final adoption: still `BLOCKED_REQUIRED_INPUT` on actual child attendance/count/age/use requirements;
- print readiness: unchanged `NOT_PRINT_READY`.

This is an item-local correction, not a new cross-item visual rule.