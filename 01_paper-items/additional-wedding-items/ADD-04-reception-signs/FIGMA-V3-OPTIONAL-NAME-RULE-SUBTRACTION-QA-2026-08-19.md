# ADD-04 Reception Signs V3 — optional-name rule subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPTIONAL_NAME_RULE_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `b3ed858a78d87a22f1dfcdae0621f5668ab775bd`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- groom selected: `16:2`
- bride selected: `16:17`
- groom long-copy proof: `16:32`
- bride long-copy proof: `16:47`
- Drive authority: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- retained legacy groom/bride `1:3 / 1:14` unchanged.

## Visible problem

Fresh actual-size review found the optional name role presented as native `[お名前]` followed by a long horizontal underline. Because the name is a printed semantic field, not a handwriting input, the underline had no physical or interaction requirement. At whole-item scale it made the otherwise typographic reception sign read slightly like a form field.

The lower direction line was intentionally retained: it is not an input underline; it is the selected V3's directional route/endpoint grammar and still binds `[方向]` to the lower sign field.

## Bounded comparison

Groom comparison:

- `22:2 / QA / ADD-04 GROOM / OPTIONAL NAME RULE SUBTRACTION / 2026-08-19`

Only `RULE_NAME` inside the native `GROUP_NAME_FIELD_AUTO` was hidden. `TXT_NAME_OPTIONAL` remains native/auto-layout, and the black reception band, bilingual reception label, date/location, direction copy and route were unchanged.

The comparison was visibly stronger: the optional name role reads as editorial copy rather than a web/form input while still retaining ample spacing from the directional field.

Because groom/bride are the same semantic pair with mirrored composition, the identical bounded subtraction was applied to both selected signs and both long-copy proofs after the groom comparison passed.

## Promotion / rollback

Hidden name rules:

- groom selected `16:11 / RULE_NAME`;
- bride selected `16:26 / RULE_NAME`;
- groom stress `16:41 / RULE_NAME`;
- bride stress `16:56 / RULE_NAME`.

Hidden rollback copies:

- `23:2` groom selected pre-change;
- `23:17` bride selected pre-change;
- `23:32` groom stress pre-change;
- `23:47` bride stress pre-change.

Comparison `22:2` hidden after promotion.

## Three-scale / structure QA

- groom whole/reading/actual-size `740×1050`: PASS;
- bride whole/reading/actual-size `740×1050`: PASS;
- groom realistic long-name/long-direction stress: visual PASS;
- both long-copy proofs returned hidden after QA.

Post-write readback:

- selected groom/bride: IMAGE fills `0`, outside visible text `0`, `RULE_NAME` hidden;
- stress groom/bride: IMAGE fills `0`, outside visible text `0`, `RULE_NAME` hidden;
- the only bounding-box overlap reported is the established Japanese reception headline and its smaller English sublabel by about `9px`; screenshot review confirms no visible glyph collision, so it was not changed merely to satisfy numeric boxes;
- native `GROUP_NAME_FIELD_AUTO` is preserved on both sides, so long names still reflow without layout reconstruction.

## Drive / image decision

Drive authority metadata was live-read before the edit. New Drive assets: `0`. Image generation: `0`.

The defect was a visible form-like rule around an already-semantic native field, not missing imagery.

## Decision

`OPTIONAL_NAME_RULE_SUBTRACTION_PASS`.

ADD-04 V3 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. This uses the already-verified project method that a functional reserved/editable role does not automatically need a printed box/rule. It is not a blanket rule to remove the directional route or other lines that still perform a binding/wayfinding function.