# ADD-17 — Back cobalt header containment audit

Date: 2026-08-27
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Scope: non-Rurubu only
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`

## Live authority checked

- GitHub start main: `4517d11e9d3789370e358c4f4dbfe749f16a0fb7`
- latest main rechecked 2026-08-27: `6af1a853935c25112558f49287b5686bee33a5ce`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- Current front: `67:3 / CURRENT_SELECTED / ADD17 / FRONT / EXPEDITION FIELD SHEET`
- Current back: `67:4 / CURRENT_SELECTED / ADD17 / BACK / DISCOVERY POSTLOG`
- hidden realistic stress: `69:2 / 69:40`
- exact Drive folder: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`

## Visible problem

Fresh back renders at thumbnail (~500px), reading (~1000px) and native `1110×1540` show the full-width cobalt top band becoming a dominant page header before the writing-sheet artifact is read.

The native reader-facing label `きょうの発見 / 02` is legitimate, but the full-width carrier visually resembles a web/app header or status bar. This is materially different from the already-removed coral side tape: the current question is whether the *full-width containment* is necessary to own the label, not whether the label itself is valid.

The front does not use a matching full-width header; it keeps the same discovery identity as open native typography. The back therefore risks reintroducing the UI/container grammar that earlier ADD-17 refinements intentionally removed.

## 2026-08-27 live geometry / paired-face verification

Fresh front/back reading-scale screenshots independently strengthen the same hypothesis without changing its state.

Front `67:3` keeps `きょうの発見 / 01` as open coral native typography directly on the mint paper field. The discovery identity remains clear without a full-width carrier.

Back `67:4` metadata confirms the questioned containment is a separate fixed role rather than a text-fit requirement:

- `67:24 / DECOR / COBALT TOP BAND`: `x=0 / y=0 / w=1110 / h=160`;
- `67:26 / TEXT / KICKER`: `x=78 / y=53 / w=430 / h=34`;
- `67:27 / TEXT / TITLE`: `x=115 / y=240 / w=760 / h=192`;
- writing rules begin at `y=610` and remain independent of the header;
- optional name/date remain at `y=1432` and are independent of the header;
- prior coral side tape `67:25` remains hidden.

This geometry shows the header is not required to own the writing rules, handwriting area, footer facts, or any physical fold/binding boundary. The next bounded comparison can therefore hide only `67:24` while retaining `67:26` as native text and leaving every other role unchanged.

The paired front/back read also clarifies the regression criterion: `OPEN_LABEL` must preserve enough back-face distinction through typography, paper tone and writing structure rather than replacing one arbitrary full-width band with another decorative carrier.

No new project rule is created from this addendum; the state remains `ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING` until a real Figma mutation comparison is run.

## Root-cause hypothesis

The cobalt band is carrying two roles at once:

1. valid reader-facing identity for `きょうの発見 / 02`;
2. unnecessary full-width containment.

The identity may survive with a smaller physical/editorial treatment or with open native text, while the full-width band is what produces the web-header reading.

This is *not* a rule to remove cobalt, headers or color bands globally. The current band may still prove useful as a physical sheet edge or strong back-face differentiation; only a bounded comparison can decide.

## Bounded test when Figma mutation is available

Do not redesign the page. Preserve:

- headline and `[もうひとつの発見]`;
- writing rules and writing area;
- bottom star;
- footer guidance;
- optional name/date;
- page dimensions;
- all native typography except the label treatment under test.

Compare only:

1. `CURRENT` — full-width cobalt header retained;
2. `OPEN_LABEL` — hide only `67:24 / DECOR / COBALT TOP BAND`; retain `67:26 / TEXT / KICKER` as native text on the cream sheet and adjust optical spacing only if the screenshot proves it necessary;
3. only if `OPEN_LABEL` loses too much back/front differentiation, a **small connected paper-edge/header role** may be tested, but do not create a new decorative family merely to preserve color.

Stop condition: if CURRENT is clearly stronger at whole-item scale, reject the hypothesis and retain the band. Do not keep generating alternate bars.

## Expected improvement

- remove web/app-header reading;
- keep child-friendly discovery identity;
- make the back read first as an open physical writing sheet;
- preserve strong front/back family relationship without identical containment.

## Regression risks

- back may become too quiet or generic;
- `きょうの発見 / 02` may lose hierarchy;
- front/back distinction may weaken;
- a smaller replacement band could become another arbitrary badge/pill.

## Three-scale evidence before change

- whole / ~500px: cobalt header is the first large non-paper field and reads strongly like a top UI header;
- reading / ~1000px: same containment effect persists; fresh paired-face review confirms the front identity works as open type while the back alone uses full-width containment;
- native `1110×1540`: label is readable, but the carrier still behaves as a full-width interface/header block rather than a necessary writing-surface element.

No structure defect is claimed. This is a reopened sellable-visual question on one fixed role only.

## Hybrid / image decision

- semantic copy remains native Figma text;
- no generated raster is needed;
- no new SVG is justified before the bounded containment comparison;
- image generation: `0`;
- Drive write: `0`.

## Decision

Reopen only the back cobalt-header role for bounded visual comparison.

Proposed Current state until verified:

`SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LOCAL_BACK_HEADER_CONTAINMENT_AUDIT_PENDING / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

Do not invalidate the existing long-copy, auto-height, activity-surface, rollback, or factual evidence.
