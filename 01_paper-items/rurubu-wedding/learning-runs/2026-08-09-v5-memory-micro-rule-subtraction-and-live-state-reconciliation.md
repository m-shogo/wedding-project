# V5 memory micro-rule subtraction and live-state reconciliation

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Scope: Current inside spread `77:290`; bounded decorative subtraction only
State: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PROJECT_RULE_NOT_PROMOTED`

## Authority and live-state reconciliation

Before acting, the run re-read the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Status, current V5 learning evidence, and the V6 gate. Live Figma remained the highest authority.

A concurrency drift was detected between recent learning records and the live canvas. The current live truth at the start of this run was:

- left halftone `77:373`: hidden
- right halftone `77:508`: hidden
- plane `77:502`: hidden
- pin `77:504`: visible
- fold guide `77:540`: visible
- cover hero `77:148`: still uses image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Q60 parity staging `538:132`: still uses the same old hero hash

This live state supersedes older learning-run descriptions that had left halftone or plane visible. No attempt was made to restore older states merely to match documentation.

## Drive truth

The unresolved Q60 derivative was read back directly from Google Drive:

- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: `155,439`

The source remains healthy; the remaining blocker is Figma placement/transport, not a reason to regenerate the asset.

## Visible problem

On the inside-right page, a 160px cyan dashed `AUTH_MICRO_RULE` (`77:537`) sat to the right of the `MEMORY SPOTS / MINI MAP` heading, near the location pin. Its paired `AUTH_MAP_MICRO` text was already hidden. The line therefore carried no destination, caption, provenance, chronology, or navigation information and read as residual template decoration.

## Hypothesis

Removing only the orphaned micro-rule would:

- reduce template/UI-like decorative noise;
- make the Memory Spots heading and pink section rule the clear entry point;
- preserve the pin as the meaningful location cue;
- leave all native text, photos, crop, fold, rollback and semantic roles untouched.

Possible regression:

- the heading area could become too empty;
- the pin could appear visually detached without the dashed line.

Evidence required:

- rollback-safe duplicate;
- whole-spread comparison;
- right-page/natural-size comparison;
- fresh Current screenshot after promotion;
- structure and image-hash readback.

## Experiment

Created rollback-safe comparison:

- `548:2 / V5_INSIDE_MEMORY_MICRO_RULE_SUBTRACTION_QA_2026_08_09`
- duplicate rule: `548:255 / AUTH_MICRO_RULE`

Only the duplicate rule was hidden. Current remained untouched during comparison.

### Three-scale QA

Whole spread / thumbnail:
- the dashed cyan line disappeared without creating an obvious hole;
- overall hierarchy remained `OUR HISTORY → dominant history image → MEMORY SPOTS → lead memory → supporting spots`.

Reading/page scale:
- the pink horizontal rule under the Memory Spots heading remains the structural section divider;
- the location pin remains visible and semantically sufficient;
- the removed cyan line no longer competes with the heading and pink section rule.

Actual-size/right-page detail:
- no text reflow, collision, clipping, crop change, or weakened label-to-photo relationship was observed;
- the pin still reads as a location cue without requiring a decorative dashed connector.

Decision: `ADOPT`.

## Current promotion

Promoted to Current:

- `77:537 / AUTH_MICRO_RULE`: `visible true → false`

No node deletion, text mutation, image replacement, crop mutation, geometry change, or component flattening occurred.

## Post-promotion verification

Current inside structure:

- native text: `92`
- visible text: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540`: visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- comparison `548:2`: preserved
- left halftone `77:373`: hidden
- right halftone `77:508`: hidden
- plane `77:502`: hidden
- pin `77:504`: visible
- micro-rule `77:537`: hidden

Image hashes remained unchanged:

- groom `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory 01 `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 03 `77:446`: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- memory 04 `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Reusable lesson

When a decorative connector/rule has lost its paired label or semantic function, test removing the orphaned geometry before redesigning the module. A location pin can remain as the semantic cue while an unrelated dashed rule is removed.

This remains a V5-level `VERIFIED` finding. It is not promoted to `PROJECT_RULE` from one case.

## Gate impact

No photo-role state changed:

- PHOTO_ROLE_PASS: `10/11 active`
- ROLE_COMPLETE: `10/11 active`
- dominant-photo pass: `2/3`

The cover hero remains the only active photo-role blocker. V6 production remains closed until the V5 dummy-photo/design gate is genuinely verified.
