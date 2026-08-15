# NRSL-004 — Placeholder wording should describe the artifact role, not the authoring workflow

Source scope/items: non-Rurubu / ADD-08 メニュー補助サイン + ADD-16 両親贈呈品メッセージカード

State: `VERIFIED_CROSS_ITEM`

## Visible problem

Two materially different print artifacts independently showed the same failure fingerprint: a placeholder was structurally correct and visually subordinate, but its **semantic field wording** still exposed production/CMS language.

- ADD-08: `[正式案内文 · LAYOUT DUMMY]`
- ADD-16: `[感謝メッセージ導入 · LAYOUT DUMMY]`

At actual size these phrases read like authoring instructions or internal field names rather than native proof copy inside a resolved wedding print design.

## Root-cause hypothesis

Placeholder quality has two separate layers:

1. proof metadata hierarchy — `LAYOUT DUMMY` must remain visibly subordinate;
2. lexical semantics — the field label itself should name the content role from the artifact/reader perspective, not describe workflow state, CMS structure, or drafting phase.

Solving only layer 1 can still leave a sellable-looking composition with obvious production language.

## Bounded tests

### ADD-08

Production: `xvJH23nWjWAApd3yOwr4y3 / 1:3`.

Changed only:

- `[正式案内文 · LAYOUT DUMMY]`
- → `[ご案内 · LAYOUT DUMMY]`

The semantic field remained 27 px; proof suffix remained 10 px muted warm gray at opacity about 0.78. No layout, CTA, right rail, facts, images, or hierarchy were otherwise changed.

Evidence: `01_paper-items/additional-wedding-items/ADD-08-menu-support-signs/QA.md`.

### ADD-16

Production: `ylmVBbwNcnjueYrymNpa3c / 1:2`.

Created clean-room comparison `16:2`, then promoted only:

- `[感謝メッセージ導入 · LAYOUT DUMMY]`
- → `[感謝の言葉 · LAYOUT DUMMY]`

The semantic field remained 13 px; proof suffix remained 7 px muted warm gray at opacity about 0.78. Full rollback: `16:13`. Comparison was hidden after promotion.

Evidence: `docs/automation/add-16-parent-gift-message-card-natural-placeholder-2026-08-15.md`.

## Expected improvement

Keep unresolved content explicitly semantic and editable while reducing the visual smell of CMS fields, drafting notes, or internal production instructions.

## Regression risk

Over-simplifying a placeholder can erase necessary authority distinctions. Do not replace a precise role with a vague word when the production team must distinguish multiple different unresolved fields. The correct label should be concise **and still semantically unique** within the artifact.

Changing `characters` can also reset mixed-range styling; after any lexical edit, explicitly read back font size/fill ranges for the semantic field and `LAYOUT DUMMY` suffix.

## Three-scale evidence

ADD-08:
- whole-item / reading / native 1400×1980: PASS after wording change;
- post-readback preserved 27 px semantic field + 10 px muted suffix.

ADD-16:
- whole-item thumbnail: PASS;
- actual-size 400.63×582.05: PASS;
- post-readback preserved 13 px semantic field + 7 px muted suffix, native text 7, IMAGE fills 0.

## Figma / Drive / GitHub evidence

ADD-08:
- Figma `xvJH23nWjWAApd3yOwr4y3 / 1:3`
- Drive `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`
- item QA: `01_paper-items/additional-wedding-items/ADD-08-menu-support-signs/QA.md`

ADD-16:
- Figma `ylmVBbwNcnjueYrymNpa3c / 1:2`
- changed node `4:19 / TXT_LEAD`
- clean-room `16:2` hidden
- rollback `16:13` hidden
- Drive `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- item evidence: `docs/automation/add-16-parent-gift-message-card-natural-placeholder-2026-08-15.md`
- item commit: `08de40f434310345a1188004dac040e6f8af4692`

## What must remain item-specific

Do not transfer the exact words `ご案内` or `感謝の言葉`, font sizes, palettes, card geometry, hierarchy, or copy tone to unrelated items. The receiving artifact must choose its own shortest semantically correct field label.

## Cross-item applicability

When a fresh actual-size screenshot shows `LAYOUT DUMMY` content that still feels like an admin/CMS/production instruction, independently test a shorter artifact-native semantic label before redesigning the composition or adding imagery.

## Next receiving-item experiment

On a materially different ticket/sign/card, audit unresolved semantic fields for workflow nouns such as `正式文言`, `案内文`, `導入`, `設定`, `用途`, `記入方法・設置場所`, or other implementation-facing phrases. Change only when the shorter label remains uniquely understandable to the editor. Always re-read mixed text styling after the character mutation.
