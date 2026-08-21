# RSL-194 — Equal-row index rhythm can preserve wireframe/AI feel after imagery is removed

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V8 Memory+Guide
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Memory K `2181:30` had already removed a weak abstract generated image, but the Guide page still used four equal rows, repeated horizontal rules, and nearly equal text weight for `01–04`. The result was clean yet still read as a refined UI/table wireframe at whole-item scale.

## Root-cause hypothesis

Removing cards or weak imagery does not automatically remove template logic. **Equal row height + repeated separators + equal typographic weight** can independently preserve a modular/UI reading even in an otherwise quiet book spread.

## Professional principle tested

New research on Studio Yukiko / Flaneur was used as a hypothesis: establish a constrained publication system, but derive the visual treatment of each editorial piece from its actual content role instead of forcing every item into the same magazine template. Irma Boom’s book-design work was also used as a counterpoint that navigation itself can be authored rather than inherited as a standard index convention.

## Bounded experiment

Rollback-safe Memory M `2186:31` kept the left essay and all factual/native scene copy, but changed only the right Guide/Index rhythm:

- hide four equal horizontal rules;
- keep sequence labels `01–04`;
- make 朝 the large opening beat;
- pair 昼/夕 as a compact middle beat;
- make 夜 the large closing beat;
- keep all text native/editable;
- add no image, card, badge, decorative English, gradient, shadow, or new visual motif.

Initial Japanese headline wrap produced an unacceptable third-line orphan (`たど / る。`). The candidate was not promoted until the text box was widened and the headline returned to two intentional lines.

## Three-scale evidence

- 500 px whole spread: PASS; equal utility-row reading materially reduced.
- 1400 px reading scale: PASS; sequence remains explicit and hierarchy is clearer.
- 1587×1123 actual spread: PASS.
- visible native text `21`
- IMAGE `0`
- text intersections `0`
- 18 px safe risk `0`

## Adopted result

Memory M `2186:31` promoted Current.
Memory K `2181:30` preserved as hidden rollback.

## Failure fingerprint

`F-RSL-194-EQUAL-ROW-RHYTHM-SURVIVES-CARD-SUBTRACTION`

Meaning: when a supposedly editorial print page still feels like a wireframe after card/container subtraction, inspect whether equal rows, repeated separators, and equal typographic weight are the real remaining template grammar.

Stop condition: do not vary scale/position arbitrarily. Variation must preserve explicit reading order and be defensible from the content role. If hierarchy becomes ambiguous, reject the experiment.

## Regression risk

- arbitrary scale variation can look like fake randomness;
- removing rules can weaken navigation when the rules genuinely bind content;
- large display Japanese text can create bad line breaks or unsafe physical edges;
- quiet type-only spreads can still become one repeated V8 skeleton if this treatment is copied literally.

## What must remain Rurubu-specific

Do not transfer the exact `朝/昼/夕/夜` arrangement, coordinates, navy/rust palette, headline wording, type sizes, spread proportions, or Rurubu Memory role.

## Cross-item applicability hypothesis

On another print artifact whose content is forced into repeated equal rows, test whether a **content-derived opening / middle / closing rhythm** can preserve navigation while reducing table/UI reading. Before removing separators, apply the existing shared binding-function method: a rule that performs real binding/navigation work should be retained.

## Next receiving-item experiment

Use only on a materially different artifact with a visible equal-row/list grammar. Compare equal rows vs content-derived rhythm at whole-item scale, then verify reading order, long-copy behavior, Japanese line breaks, and physical safe area before adoption.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-MEMORY-M-RHYTHMIC-INDEX-QA-2026-08-21.md`
