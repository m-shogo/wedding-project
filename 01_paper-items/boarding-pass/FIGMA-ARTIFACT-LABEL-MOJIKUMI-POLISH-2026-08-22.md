# BOARDING PASS — Artifact-label mojikumi polish / 2026-08-22

State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ARTIFACT_LABEL_WRAP_FIXED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start / pre-write `main`: `117ae15aa2f4177f1e532858d865ba4bb3cad9dd`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid policy: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- Current front/back: `63:41 / 63:72`
- Drive authority live-readback: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive writes: `0`

## Visible problem

The retained Current still passed its major art-direction and structural gates, but live whole/reading screenshots showed one unresolved typography inconsistency:

- front artifact label `63:56 / TEXT / ARTIFACT` wrapped `ESCORT TICKET` into two lines because its native text box was only `100px` wide;
- back artifact label `63:77` already read naturally on one line at the same 17px Inter Bold role.

This did not justify another full clean-room redesign. It was a bounded typography defect inside an otherwise preferred Current.

## Rollback-safe comparison

A production clone was used only as QA evidence, not as a new V2/V3 authoring source:

- comparison `68:2 / QA / BOARDING FRONT / ARTIFACT LABEL SINGLE-LINE / 2026-08-22`
- test changed only the artifact-label geometry.

The first test at width `130px` still wrapped. Method was adjusted once to the widest practical setting inside the existing `170px` plum binding strip:

- `x: 12`
- `width: 146`
- `font: Inter Bold 17px`
- `line-height: 20px`
- `textAutoResize: HEIGHT`

Result: one-line `ESCORT TICKET`, with no collision or trim/binding conflict.

## Promotion

Before production mutation, the complete pre-change Current front was preserved as hidden rollback:

- `68:33 / ROLLBACK / BOARDING FRONT / PRE-ARTIFACT-LABEL-POLISH / 2026-08-22`

Promoted only the verified artifact-label geometry to:

- Current front label `63:56`
- long-copy stress label `64:17`

The comparison `68:2` was hidden after promotion.

No other current node, palette, ribbon geometry, stub geometry, copy, or hierarchy was changed.

## Three-scale / stress QA

Post-change live screenshots:

- whole-item / 500px: PASS — artifact identity remains legible instead of becoming a stacked micro-label;
- reading / 1200px: PASS — label aligns more closely with the back-side artifact identity and does not compete with the Japanese headline;
- actual-size / native `1200×550`: PASS — one-line label stays fully inside the `170px` binding strip;
- long-copy stress `64:2`: PASS — the same one-line artifact label coexists with two-line long guest name, reception, table and guide roles without new collision.

Structural readback after promotion:

- Current label `63:56`: `146×20`, `textAutoResize=HEIGHT`;
- stress label `64:17`: `146×20`, `textAutoResize=HEIGHT`;
- generated imagery: `0`;
- IMAGE fill changes: `0`;
- Drive writes: `0`.

## Decision

Keep the existing `BAGGAGE RIBBON / RETURN LABEL` Current. This was typography polish, not a new visual version.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid and is now stronger at actual reading scale.

## Learning

`VERIFIED_LOCAL`:

A small artifact/identity label may be structurally contained yet still look accidental when it wraps solely because its text box is narrower than the physical field that owns it. For fixed identity copy, compare the line break against the artifact's physical container and corresponding front/back role before accepting a stacked break as intentional.

Do not generalize this into a rule that all English labels must be one line. The transferable test is whether the break is intentional and role-owned, not whether it technically fits.
