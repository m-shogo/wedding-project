# AI-Figma Hybrid Authoring — High-Saliency Display Amendment

Status: `PROJECT_RULE_AMENDMENT / 2026-09-03`

Applies to: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`

Purpose: prevent the original native-text examples from being interpreted as an unconditional ban on authored display lettering when an item-specific authority explicitly needs generated/composed high-saliency display art.

## What remains unchanged

The original policy remains correct that:
- variable semantic copy should remain native/editable;
- long body copy, personal facts, TBD copy and frequently changing values should not be baked into generated raster art;
- Figma remains the assembly/editability/QA surface;
- generation is not completion;
- authoritative copy must be protected from fake AI text.

## Clarification — names/headings are not automatically native

The original examples list names, headings and subheads among text that often benefits from native editability. This is a **default**, not an unconditional format rule.

When current item/page authority explicitly classifies a short, locked, high-saliency display role as authored display art, it may be generated/composed as one visual object if that materially improves fidelity and editorial identity.

Examples may include:
- a hero page title whose outline, shadow, vessel and lettering silhouette function as one authored graphic;
- a short locked ribbon/callout whose exact wording is final;
- a locked name label where the lettering treatment itself is a major identity element.

Requirements:
1. exact wording is owner-approved/locked before generation;
2. canonical text remains recorded outside the raster/vector asset in authority/metadata;
3. spelling is QA-checked at final size;
4. the role is intentionally classified by item/page authority as high-saliency display art;
5. generation must materially improve the design versus native reconstruction;
6. do not extend this exception to long/variable/TBD/personal copy.

## Clarification — do not swing to the opposite extreme

This amendment does **not** mean all fixed text should be generated.

Decision order:
- repeated cross-page furniture with variable content -> shared component/system;
- long/variable/TBD/personal/frequently changing copy -> native text;
- short locked high-saliency authored lettering -> generated/composed display candidate only when current item/page authority explicitly chooses it;
- otherwise keep the simplest robust editable representation.

## Live implementation QA

A role classification in documentation is not enough.
Before completion, inspect the actual Figma implementation and confirm the live node/source matches the declared role.

This prevents:
- a page claiming generated display treatment while still using a rejected native placeholder;
- a page claiming a shared component while using an unrelated page-specific construction;
- stale implementation surviving after authority changes.

## Relationship to Rurubu WEDDING V30

Rurubu V30 currently implements this clarification through:
- `assets/rurubu-v30/publication-display-system-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

The Rurubu-specific art direction remains item-specific. Other wedding items should use this amendment only as authoring logic, not copy Rurubu visual language.
