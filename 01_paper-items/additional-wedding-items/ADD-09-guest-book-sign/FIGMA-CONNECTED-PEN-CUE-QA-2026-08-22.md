# ADD-09 Guest Book Sign — Connected Pen Cue QA / 2026-08-22

State: `CURRENT_REPAIRED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start/latest `main` before Figma write: `57de4eb2e631ed2f2c1aed6854ac23d3229ad712`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- Current root: `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / FAMILY DIVERSITY B / 2026-08-21`
- long-copy stress: `41:76 / QA / ADD-09 / PEN TRAY WELCOME / LONG COPY STRESS / 2026-08-21`
- exact Drive authority read back live: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive write: `0`

## Visible problem

A fresh native screenshot showed that the lower writing-desk cue did not read cleanly as one physical pen. The terracotta rounded pen body and mustard triangular tip were spatially detached. At whole-item scale the body could read as a generic rounded pill/bar while the tip read as a separate decorative triangle.

This contradicted the item-specific concept: the lower field is supposed to communicate the real guest action of writing, not introduce another abstract capsule or disconnected decoration.

## Bounded comparison

A rollback-safe comparison was created without changing production first:

- `45:2 / QA / ADD-09 / CONNECTED PEN V2 / 2026-08-22`

The first attempt used a triangular nib but remained optically detached and was rejected. Method switched rather than repeating the same geometry.

The verified candidate used one rotated assembly:

- mustard cap;
- terracotta marker/pen body;
- attached dark-ink nib;
- all three pieces rotate as one object.

No copy, information hierarchy, desk field, rule, color system, dynamic Auto Layout or semantic placeholder changed.

## Promotion / rollback

Before production mutation, hidden rollback copies were created:

- `46:2 / ROLLBACK / ADD-09 / PRE-CONNECTED-PEN-REPAIR / 2026-08-22`
- `46:34 / ROLLBACK / ADD-09 / PRE-CONNECTED-PEN-REPAIR / LONG COPY / 2026-08-22`

The verified connected pen assembly was then applied to Current `41:56` and long-copy stress `41:76`.

Current connected assembly:

- `46:66 / DECOR / CONNECTED PEN`

Stress connected assembly:

- `46:70 / DECOR / CONNECTED PEN`

The comparison candidate was hidden after promotion.

## Screenshot QA

Current `41:56` fresh native screenshot: PASS.

- the lower cue now reads as one marker/pen object rather than a detached triangle plus pill-like bar;
- the writing-desk metaphor remains immediate;
- the visual weight stays subordinate to `ご記帳をお願いします` and does not compete with the main editorial content.

Long-copy stress `41:76` was temporarily shown for screenshot review and then hidden again: PASS.

- expanded Japanese operational copy still finishes above the desk field;
- the connected pen remains in the fixed desk zone and does not collide with dynamic text.

## Structure readback

Current `41:56`:

- visible native text: `12`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- text-text collisions: `0`;
- IMAGE fills: `0`;
- connected pen assemblies: `1`.

Stress `41:76`:

- visible native text: `12`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- text-text collisions: `0`;
- IMAGE fills: `0`;
- connected pen assemblies: `1`;
- returned to hidden state after QA.

## Hybrid authoring / assets

- semantic/factual/variable copy: native editable Figma text;
- fixed desk/pen support: simple native geometry with direct physical meaning;
- editable SVG: `0` new;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- IMAGE fills: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the defect was ambiguous fixed-art geometry, not missing photography/illustration.

## Learning state

`VERIFIED_LOCAL`.

Fingerprint candidate: `PHYSICAL_CUE_FRAGMENTATION` — a fixed visual cue intended to depict one real object can degrade into generic template decoration when its component geometry no longer reads as one connected object at whole-item scale.

Do not promote this as a project rule from one item. The transferable hypothesis is only: when an artifact-specific fixed cue carries semantic weight, review whether it still reads as the intended physical object at thumbnail/whole-item scale rather than as disconnected decorative primitives.

## Decision

`CONNECTED_PEN_CUE_REPAIR_PASS`.

The Current `PEN TRAY WELCOME` remains selected and keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

`NOT_PRINT_READY` remains until final writing method/pen placement, installation wording/location, printer proof and venue-distance readability are verified.
