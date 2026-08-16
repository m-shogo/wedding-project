# 2026-08-16 — Rurubu V6 W / BT / BS verified editorial-density pass

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Observation

Previous preferred V/BR/BQ was structurally clean but still too beige/sober at whole-item scale. The design had moved away from dashboards/cards, yet the strongest hierarchy often appeared only after reading individual sections rather than immediately at thumbnail scale.

## Hypothesis

Use a **small number of role-bound flat editorial labels/rules** — not a repeated card kit — to make major beats legible at a glance. Keep support information as native typography. This should increase travel-information-magazine energy without reducing editability.

## Bounded tests

### Outer W `1491:2`

From Outer V `1477:2`:

- front unchanged;
- back `TRAVEL LOG` kicker receives yellow tab;
- chronology major dates receive selective magenta/cyan/yellow fields;
- chronology title gains dual magenta/cyan binding rules;
- WEDDING terminal gains yellow top edge;
- no new photo and no generated decor.

Result: adopted after 500px, reading and actual-size back comparison.

### Profile/Q&A BT `1488:2`

From BR `1482:2`:

- Profile receives one magenta kicker and three short row accents;
- Q&A receives yellow kicker, feature blocks only for 01 and 04, cyan memory-caption tag, and one magenta closing rule;
- all variable/factual copy remains native;
- all photo roles remain replaceable.

Initial number blocks produced real text-bound collisions in structure QA. They were resized/repositioned; final collision/safe-area checks are zero.

Result: adopted.

### Story/Chronology BS `1486:81`

From BQ `1468:2`:

- Story receives magenta kicker, stronger photo field, cyan/yellow role-bound accents and larger native note metadata;
- Timeline receives yellow kicker, navy title band, selective 01/03/05 color fields, support rules for 02/04 and yellow WEDDING terminal edge;
- generated timeline decoration stays hidden.

Initial story candidate produced two 18px safe-area risks and text collisions. Those states were rejected before promotion, corrected, and rechecked.

Result: adopted.

## Three-scale result

All final W/BT/BS preferred frames passed:

- whole-item / 500px thumbnail;
- reading-scale spread review;
- actual-size 794×1123 page review for every materially changed page.

Final structure checks:

- W back: native text 18 / IMAGE 3 / collision 0 / safe risk 0;
- W front: native text 12 / IMAGE 5 / collision 0 / safe risk 0;
- BT Profile: native text 17 / IMAGE 4 / collision 0 / safe risk 0;
- BT Q&A: native text 25 / IMAGE 2 / collision 0 / safe risk 0;
- BS Story: native text 11 / IMAGE 3 / collision 0 / safe risk 0;
- BS Timeline: native text 30 / IMAGE 5 / collision 0 / safe risk 0.

## Adoption state

Promoted:

- W `1491:2`;
- BT `1488:2`;
- BS `1486:81`.

Rollback preserved/hidden:

- V `1477:2`;
- BR `1482:2`;
- BQ `1468:2`.

Start Here:

`V5 FU/FX · V6 W + BT/BS INSIDE STUDIES · V7 HOLD`

## Asset truth

- generated this pass: `0`;
- new Drive save: `0`;
- new external binary placement: `0`;
- existing verified Figma image hashes reused: `YES`;
- native text preserved: `YES`;
- replaceable image roles preserved: `YES`;
- generated section decoration newly adopted: `NO`.

## Learning

Adopt `RSL-051` locally: when a print design is structurally correct but visually too quiet at thumbnail scale, test a few **role-bound flat labels/rules** tied to real hierarchy before reintroducing cards or arbitrary decoration. The literal Rurubu palette and geometry must not transfer as a shared visual style.

## Remaining gap

W/BT/BS is a stronger dummy-design system, not print-ready. Final personal copy, final photographs, exact printer template, bleed/trim/fold verification, PDF preflight and physical proof remain separate gates.