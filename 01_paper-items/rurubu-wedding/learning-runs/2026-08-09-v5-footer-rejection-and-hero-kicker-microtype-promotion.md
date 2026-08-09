# Rurubu V5 — footer subtraction rejection and hero kicker microtype promotion

Date: 2026-08-09
Status: `REJECTED_EXPERIMENT_RECORDED / VERIFIED_MICROTYPE_GAIN_ADOPTED / V6_GATE_UNCHANGED`
Scope: Rurubu WEDDING V5 only
Production Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authorities and live state

Before production edits, the project-wide Figma production system, generated-asset memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, Rurubu Current Status, existing V5 asset evidence, current learning records, and live Figma/Drive state were checked. Live Figma remains the highest authority.

Current official photo gate is unchanged:
- active roles: `11`
- PHOTO_ROLE_PASS: `10 / 11`
- ROLE_COMPLETE: `10 / 11`
- dominant-photo pass: `2 / 3`
- remaining photo blocker: `V5-01 / 77:148 / IMG_HERO`

Drive readback still finds the prepared cover derivative:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`

The already-rejected network upload path was not retried.

## Experiment A — inside footer full subtraction

### Visible problem / hypothesis

The inside-right lower edge still contains `77:486 / PAGE_BOTTOM_BAR` and `77:487 / PAGE_BOTTOM_BAR_TXT`. A new full-subtraction duplicate was tested to ask whether the strip would still be chosen without legacy anchoring.

Expected improvement: quieter, less UI-like page ending.
Possible regression: loss of issue/section micro-navigation and bottom-page anchoring.

### Prototype

Created rollback-safe comparison:
- `567:2 / V5_INSIDE_BOTTOM_FOOTER_SUBTRACTION_QA_2026_08_09`
- duplicate footer nodes `567:204` and `567:205` hidden only in the comparison.

Three-scale visual review showed a quieter page, but inspection of the prior verified learning record `2026-08-07-v5-inside-footer-folio-comparison.md` established that the same semantic problem had already been tested more completely: thin square strip beat direct-type subtraction because it preserved micro-navigation and print-page anchoring while removing rounded UI geometry.

### Decision

`REJECTED / CURRENT_RESTORED`.

The temporary Current hide was immediately reversed. Verified Current state remains:
- `77:486` visible, `700 × 20`, `y=1076`, `cornerRadius=0`
- `77:487` visible, native text retained, `fontSize=10`, `y=1080`

The comparison frame `567:2` is preserved as evidence of the rejected experiment.

### Learning

A new subtraction must be checked against the existing lessons log before promotion. More subtraction is not automatically better when the remaining element has a verified editorial/navigation job. This run detected the duplicate-experiment risk and restored the prior verified state rather than overwriting it.

Status: `REJECTED`; not a project rule.

## Experiment B — cover hero caption kicker readability

### Visible problem

`77:206 / HERO_CAPTION_KICK` (`SPECIAL INTERVIEW`) remained at `10 px`, one of the smallest visible labels on the outer spread. It sits on a high-contrast navy photo-caption strip, so a one-step type increase could improve actual-size readability without adding containers or changing composition.

### Principle / hypothesis

Test a bounded native-type increase before adding visual treatment.

Expected improvement:
- clearer actual-size label legibility
- no change to photo authority, crop, caption hierarchy, or image provenance.

Possible regression:
- label could become too loud relative to the main caption
- fixed-height clipping or text reflow.

Evidence required:
- duplicate comparison
- whole-item screenshot
- target-node actual-size screenshot/readback
- Current promotion readback
- unchanged image hashes, rollback, fold and semantic structure.

### Prototype

Created comparison:
- `568:2 / V5_OUTER_HERO_KICKER_MICROTYPE_QA_2026_08_09`
- target `568:190 / HERO_CAPTION_KICK`

Change:
- `10 → 11 px`
- `textAutoResize → HEIGHT`
- copy unchanged: `SPECIAL INTERVIEW`
- width retained at `277`
- final comparison height `13`

No image, crop, fill, caption body, card geometry, fold, logo, date badge, or feature-list node changed.

### Three-scale QA

Whole-item:
- label remains subordinate to the Japanese main caption and dominant cover image.
- no new visual block or UI-card effect.

Reading/page:
- caption strip reads more cleanly as kicker → main caption.
- no overlap or wrapping.

Actual-size/detail:
- isolated kicker remains a single line and is materially more readable.
- no clipping after `HEIGHT` auto-resize.

### Current promotion

Promoted to live Current:
- `77:206 / HERO_CAPTION_KICK`: `10 → 11 px`
- `textAutoResize = HEIGHT`
- width `277`, height `13`
- native text and semantic node preserved.

Post-promotion outer structure readback:
- native text nodes: `85`
- visible text nodes: `44`
- IMAGE-fill nodes: `14`
- fold guide `77:288`: preserved
- rollback `59:2` and `59:178`: preserved
- accepted comparison `568:2`: preserved
- rejected footer comparison `567:2`: preserved

Key image hashes remained unchanged, including:
- cover hero `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- back main `77:24`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `77:39`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `77:43`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

Decision: `PROTOTYPED → VERIFIED / CURRENT_ADOPTED`.

## Asset and V6 truth

No Drive asset, Figma image fill, image hash, crop, provenance, photo-role status, or ledger denominator changed. The cover hero remains the only active photo-role blocker, and V6 production remains closed until the full verified V5 dummy-photo/design gate is passed.

## Next application

Continue V5 weakest-three typography/density/fold-safe QA without repeating known cover-transfer failures. Once a genuinely different binary-safe asset path exists, repair `77:148`, then run final V5 whole-item/reading/detail/print-plausibility comparison against the preserved clean-room cover before opening V6 production.

## Canonical-log synchronization note

This connector currently exposes whole-file replacement for existing GitHub files but no atomic append action. Because the canonical feedback and lessons logs are large and a truncated readback cannot safely reconstruct them without omission, they were not destructively replaced in this run. This file is the complete append payload/evidence source for later safe synchronization.