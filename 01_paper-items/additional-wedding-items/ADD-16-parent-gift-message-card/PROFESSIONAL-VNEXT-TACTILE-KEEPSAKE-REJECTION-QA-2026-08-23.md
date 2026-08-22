# ADD-16 両親贈呈品メッセージカード — Tactile Keepsake Clean-room Rejection QA

Date: 2026-08-23
State: `CURRENT_RETAINED / CLEANROOM_COMPARISONS_REJECTED / NO_PRODUCTION_PROMOTION`

## Live authority

- latest observed `main` immediately before write: `65b0a78171cc4bd30b2dc58e5f03cda4223fe747`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- current production retained: `57:3 / 57:17 / HOME TEXTILE MAT`
- exact Drive authority live-confirmed: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive writes: `0`

## Why this audit was reopened

The retained `HOME TEXTILE MAT` remained structurally healthy, but live actual-size review showed a legitimate art-direction question: the named textile metaphor was expressed mostly through restrained bars/rules and could be read as intentionally minimal rather than materially tactile. Under the reopened professional gate, this justified one new clean-room comparison rather than assuming the existing 93/100 Current was unbeatable.

The old Current was not used as a visual construction source. Only the verified canvas size (`700×1036`) and semantic roles were carried forward: parent-facing kicker, emotional display headline, native message role, native signature/date, and reverse writing surface.

## New blank-frame directions

New page:

- `64:2 / VNEXT_CLEANROOM / ADD-16 / TACTILE KEEPSAKE / 2026-08-23`

Three materially different directions:

1. `64:3 / WOVEN KEEPSAKE`
   - forest selvage, multicolor woven marks, vertical thread, Japanese-first copy;
   - strongest tactile/keepsake idea, therefore matured for full-size comparison.
2. `64:19 / MEMORY CLOTH PATCH`
   - dark upper cloth field with pale inset patch;
   - rejected at thumbnail scale because the patch read too much like a card/panel and moved back toward UI-like containment.
3. `64:33 / FAMILY ARCHIVE CARD`
   - archive-label / broadside direction;
   - clean and readable, but too generic/editorial-administrative for a parents-gift keepsake and emotionally flatter than the retained Current.

## Mature WOVEN KEEPSAKE comparison

Full-size clean-room candidates:

- front `64:41 / VNEXT_SELECTED_CANDIDATE / ADD16 / FRONT / WOVEN KEEPSAKE`
- back `64:79 / VNEXT_SELECTED_CANDIDATE / ADD16 / BACK / WOVEN KEEPSAKE WRITING`

Hybrid split:

- variable/factual/emotional copy: native editable Figma text;
- fixed tactile cue: simple native functional geometry;
- generated raster: `0`;
- SVG: `0`;
- IMAGE fills: `0`.

Image generation was not used because the comparison question was whether a stronger tactile graphic grammar would improve the item; no person/family imagery is appropriate for generation.

## Screenshot QA and repair

The first mature front exposed a real Japanese editorial failure:

- automatic wrapping isolated `を、` and split the final phrase mechanically;
- the message placeholder rose into the headline lane;
- the first lower weave treatment looked like a square color grid rather than textile.

Repairs were bounded to the candidate only:

- display copy changed to explicit semantic three-line grouping: `育ててもらった時間を、 / これからの暮らしへ / 織っていく。`;
- message lane moved below the completed display block;
- square grid was removed and replaced with crossing vertical/horizontal strips to create an actual over/under textile cue.

Post-repair screenshots:

- front actual `700×1036`: structurally readable and clearly more tactile than the initial study;
- back actual `700×1036`: writing area remains open and credible.

## Professional comparison against retained Current

Only after the new candidate was mature was retained `57:3 / 57:17` reopened for comparison.

Result: **retain Current**.

Why the new candidate loses despite stronger literal textile cues:

- the crossing weave patch becomes a visible motif in its own right and slightly reduces the emotional gravity appropriate for a parent-gift message;
- the brighter multicolor weave increases pop but shifts the artifact closer to a crafted activity/graphic sample than a dignified keepsake;
- the retained `HOME TEXTILE MAT` has a stronger balance of calm, warmth, handwriting space, and parent-gift seriousness while still avoiding the earlier letter/envelope convergence;
- the new candidate proves that making a metaphor more literal is not automatically a quality improvement.

This is an art-direction rejection, not a structural failure.

## Decision

`CURRENT_RETAINED / CLEANROOM_COMPARISONS_REJECTED`.

Production remains unchanged:

- front `57:3`
- back `57:17`

No rollback of production was necessary because production was never mutated.

## Item-local learning

`VERIFIED_LOCAL`:

**Literalizing a successful physical metaphor can reduce emotional appropriateness.**

For a solemn or gratitude-led keepsake, a stronger object cue must still be judged against emotional gravity, writing function, and the role of the artifact. More tactile, more colorful, or more visibly thematic is not automatically more professional.

Do not promote this to a project-wide rule from one item. Re-test only if another materially different artifact shows the same tension between metaphor clarity and emotional appropriateness.

## Deferred finalization

Unchanged blockers remain:

- final body copy/signatures/forms of address;
- actual gift/package attachment method;
- one shared card vs one card per family;
- paper stock/finish and whether textile character is better expressed physically through stock/ink/finish;
- printer template/profile, bleed/export settings;
- 100% print and physical attachment proof.
