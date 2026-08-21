# BOARDING PASS — Physical-Metaphor Deconvergence Rejection QA / 2026-08-22

State: `CURRENT_RETAINED / CLEANROOM_COMPARISONS_REJECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS UNCHANGED / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before write: `091e4222635437034bd6d956b6d3e577f36fecaf`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- project rule consumed: physical-metaphor convergence must be audited at family scale, but differentiation must not be forced when the retained metaphor has the strongest item-specific functional reason.
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- retained current front/back: `63:41 / 63:72`
- Drive authority re-read live: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive writes: `0`

## Why this bounded reopen happened

The current Boarding direction uses a baggage-ribbon visual gesture, while ADD-05 independently uses a ribbon/fold gift-tag grammar. After `PHYSICAL_METAPHOR_CONVERGENCE` became a project rule, this overlap was a legitimate family-scale audit target.

The question was not whether both artifacts contain a ribbon-like shape. The question was whether Boarding's dominant identity had become another tag/ribbon object rather than a real escort ticket.

## Clean-room comparisons

A new Figma page was created without copying retained production visuals into the blank-frame studies:

- page `66:2 / VNEXT_PRO / BOARDING PASS / METAPHOR DECONVERGENCE / 2026-08-22`
- `66:3 / A / PERFORATED DEPARTURE`
- `66:34 / B / TYPOGRAPHIC RUNWAY`
- `66:62 / C / FOLD-LINE ESCORT`

Only verified non-visual requirements were carried forward: `1200×550`, escort-ticket role, detachable/perforated stub semantics, `2026.10.24`, ceremony `14:10`, and editable guest/reception/table/final-guide fields.

### A / PERFORATED DEPARTURE

Result: `REJECTED`.

The genuine perforation/stub logic was clear, but the narrow artifact strip forced `ESCORT TICKET` into an awkward stacked break. The composition also became too static after removing the secondary movement gesture.

### B / TYPOGRAPHIC RUNWAY

Result: `REJECTED_AS_CURRENT_REPLACEMENT`.

This was the strongest clean-room alternative: direct Japanese hierarchy, a genuine detachable stub, and movement created through type/spacing rather than a baggage ribbon. However, whole-item comparison showed that it traded away too much wedding/departure excitement and became closer to a disciplined editorial form. It is a useful rejected study, not a stronger Current.

### C / FOLD-LINE ESCORT

Result: `REJECTED`.

The fold cue and stub remained physical, but the left artifact label again wrapped awkwardly and the direction drifted toward generic folded stationery rather than a specific escort-ticket experience.

## Bounded retained-current subtraction test

A separate rollback-safe clone tested whether the suspected convergence came only from the secondary ribbon/edge decoration:

- `67:2 / D / CURRENT BOUNDED TEST / NO DECORATIVE RIBBON`
- hidden only: `FRONT / APRICOT RIBBON` and `FRONT / LAVENDER PAPER EDGE`
- all copy, plum binding field, date tab, stub, perforation and ticket semantics remained unchanged.

Screenshot result: structurally cleaner but visibly under-authored. The large lower-middle field became inert and the departure/wedding energy weakened. The removal therefore failed the whole-item quality test.

## Mature family-scale judgment

The retained Current is **not** being kept because it already exists. It is retained because the dominant physical reading remains:

1. a horizontal escort ticket;
2. with a real detachable stub;
3. with explicit perforation;
4. with name / reception / table / ceremony / final-guide semantics.

The apricot ribbon is secondary visual movement, not the artifact's primary physical identity. ADD-05, by contrast, is literally a small punched gift tag whose ribbon/fold attachment grammar is its primary use. The overlap therefore does not currently make the two artifacts interchangeable at whole-item scale.

All three blank-frame alternatives and the bounded subtraction were weaker than retained `63:41` on the combined criteria of immediate ticket recognition, wedding/departure excitement, Japanese hierarchy and family distinctiveness.

## Decision

`CURRENT_RETAINED`.

No production node was modified. Existing `BAGGAGE RIBBON / RETURN LABEL` remains:

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

## Learning

`VERIFIED_LOCAL` application boundary:

Physical-metaphor convergence should be diagnosed from the **dominant artifact reading and user action**, not from one shared decorative noun or shape. A secondary ribbon-like gesture is insufficient evidence for forced redesign when the artifacts' primary physical jobs remain clearly different. Conversely, if future family review shows the Boarding object itself reading as a luggage/gift tag rather than an escort ticket, reopen it again with a new blank-frame method rather than polishing these rejected studies.

Do not transfer the current palette, ribbon geometry, stub proportions, or exact composition as a project rule.
