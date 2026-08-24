# ADD-02 — Spain clean-room rejection + Taiwan date-register subtraction QA — 2026-08-24

Status: `VERIFIED_LOCAL / TAIWAN_CURRENT_UPDATED / SPAIN_CURRENT_RETAINED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` observed before Git write: `e04e20347ed662e3fe47418b97785b940f523331`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- shared-learning authority read before work: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive metadata live-readback: PASS
- Drive write: `0`

## Professional research used

A fresh official Spain tourism review was used only as principle-level input. Spain's official tourism site frames the country around a broad mix of art/culture, contemporary architecture, cultural routes and highly developed ceramic craft traditions. The clean-room experiment therefore avoided flag/flamenco/airline cosplay and tested architectural/courtyard/ceramic print language instead.

Sources used during the run:
- Spain official tourism: `spain.info/en/`
- Spain official art/culture overview: `spain.info/en/art-culture/`
- Spain official ceramics/craft overview: `spain.info/en/top/cities-shopping-craftwork-ceramics-spain/`

No official logo, mark, protected artwork or exact tourism composition was copied.

## Spain — clean-room exploration from blank frames

The live Spain production `2:29 / FRAME_TABLE_SIGN_SPAIN` was audited first and retained as comparison only. New studies were authored on a separate new Figma page without duplicating production nodes.

New page:
- `185:2 / VNEXT_STUDY / ADD-02 SPAIN / CLEANROOM / 2026-08-24`

Three independent thumbnail directions:
- `185:3 / A / CERAMIC SUN WINDOW`
- `185:19 / B / COURTYARD FOLD`
- `185:37 / C / FESTIVAL BROADSIDE`

Only verified semantic facts were re-entered:
- canvas ratio / eventual production size `1000×1480`;
- `SPAIN / スペイン`;
- table role `04`;
- native `[国テーマ見出し]`;
- native `[国テーマ説明]`;
- confirmed date `2026.10.24`.

### First full-size refinement — rejected

B was refined independently to full size:
- `186:2 / VNEXT_V5 / SPAIN / COURTYARD TILE FOLD / SELECTED CANDIDATE`
- hidden stress `186:33 / QA / SPAIN V5 / COURTYARD TILE FOLD / LONG COPY STRESS`

It replaced the previous random-rectangle reading with a more deliberate courtyard/paper structure, but the small repeated ceramic-star treatment visually collapsed into house/envelope-like icons at whole-item scale. It was cleaner, but not more convincing than current production.

Decision: `REJECTED / NOT_PROMOTED`.

### Method switch — second full-size direction rejected

Rather than cosmetically retrying the same tile-strip concept, the run switched method to a single architectural gesture:
- `187:2 / VNEXT_V6 / SPAIN / SUNLIT ARCHWAY POSTER / CLEANROOM CANDIDATE`
- hidden stress `187:14 / QA / SPAIN V6 / SUNLIT ARCHWAY / LONG COPY STRESS`

The V6 candidate used one large cobalt arch + saffron light field, open native-copy area and a clear table-number role. It was structurally cleaner and avoided the prior tile-icon problem, but whole-item comparison showed a second regression: the candidate became too quiet/minimal for the project's travel-wedding excitement target. The existing Spain production remains stronger on celebratory energy and destination-family fit.

Decision: `TESTED_LOCAL / REJECTED / CURRENT SPAIN RETAINED`.

No Spain production node was mutated.

## Taiwan — visible defect

Fresh whole/reading review of current Taiwan `2:38` showed three tiny colored register bars above the date inside the lower-right paper register:
- `173:129 / TW / REGISTER 1`
- `173:130 / TW / REGISTER 2`
- `173:131 / TW / REGISTER 3`

Although originally intended as print/register rhythm, they had no reader-facing, physical, binding, trim or information-grouping job. At whole-item scale they read like a progress/status mini-UI inside an otherwise strong destination poster.

The date paper already has a terracotta edge, clear physical field and confirmed native date, so the bars were redundant.

## Bounded Taiwan comparison

Rollback-safe comparison:
- `187:26 / QA / ADD-02 TAIWAN / NO DATE REGISTER BARS / 2026-08-24`

Changed only the visibility of the three `TW / REGISTER` bars. Destination name, Japanese label, table number, weave fields, paper register, date, theme/description roles, typography and geometry stayed unchanged.

Result:
- whole-item: PASS; the lower-right paper reads as a cleaner print/factual field instead of a UI widget;
- reading scale: PASS;
- native `1000×1480`: PASS;
- no loss of Taiwan-specific diagonal weave identity.

Decision: adopt the subtraction.

## Taiwan rollback and production mutation

Full hidden rollbacks were created before mutation:
- Current rollback `187:43 / ROLLBACK / ADD-02 TAIWAN / PRE-NO-DATE-REGISTER-BARS / 2026-08-24`
- long-copy rollback `187:60 / ROLLBACK / ADD-02 TAIWAN / LONG COPY / PRE-NO-DATE-REGISTER-BARS / 2026-08-24`

Adopted change:
- Current `2:38`: `173:129 / 173:130 / 173:131` hidden
- long-copy stress `154:20`: `154:34 / 154:35 / 154:36` hidden
- completed QA comparison `187:26` hidden after verification

## Taiwan post-change long-copy QA

The existing V3 long-copy stress `154:20` was temporarily revealed after the production change and re-rendered.

PASS:
- long theme headline remains readable;
- long description remains clear of the diagonal fixed-art bands;
- date field remains isolated and legible without register bars;
- no new optical collision with the paper register.

Stress was returned to hidden state after capture.

## Structure readback

Current Taiwan `2:38`:
- visible native text: `6`
- fixed-height visible text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- register bars visible: `0/3`

Stress Taiwan `154:20`:
- hidden after QA
- visible native text when rendered: `6`
- fixed-height visible text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- register bars visible: `0/3`

## Hybrid / image decision

- factual / variable / semantic text: native Figma text
- Taiwan diagonal weave + paper field: retained fixed native geometry
- ambiguous mini register bars: removed rather than replaced
- Spain clean-room fixed art: native/vector-like study geometry only
- generated/composed raster: `0`
- replaceable image role: `0`
- image generation: `0`
- Drive write: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: this run's diagnosed defects were composition specificity and redundant micro-geometry, not missing photography, illustration or atmosphere.

## Learning state

### Spain
`VERIFIED_LOCAL / REJECTED`.

Two different clean-room methods independently failed to beat current Spain for different reasons:
1. repeating small craft motifs became icon-like;
2. a single large architectural gesture became too quiet for the required wedding/travel energy.

Do not continue either method cosmetically without a materially new premise. Future Spain work should preserve celebration energy while increasing place-specific craft/material meaning; difference alone is not improvement.

### Taiwan
`VERIFIED_LOCAL`.

This re-applies the existing whole-item reader-job test: small `register`, `rail`, `rule`, `tab` or `edge` geometry should remain only if the rendered artifact shows a real print/physical/binding/information job. Do not generalize into removing print marks globally; true registration/prepress marks belong in production/preflight surfaces, not guest-facing design unless intentionally visible and meaningful.

## Result

- Spain: `CURRENT_RETAINED / CLEANROOM_V5_REJECTED / CLEANROOM_V6_REJECTED`
- Taiwan: `CURRENT_UPDATED / DATE_REGISTER_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS`
- ADD-02 family remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`.
