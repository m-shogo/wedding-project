# ADD-16 — Back generic English kicker subtraction QA — 2026-08-23

Status: `VERIFIED_LOCAL / CURRENT_ADOPTED / ROLLBACK_SAFE`
Start main SHA: `428f4b72ac58af5a5b5792e233b673ae25af4300`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Visible problem

Fresh native-size review of Current back `57:17 / HOME TEXTILE MAT WRITING` found the 15px Inter Bold kicker `FOR THE WORDS WE WANT TO KEEP` above the Japanese display `ことばを、持って帰ろう。`.

The English line did not identify the artifact, destination, function, factual information, or an intentional bilingual reader-facing role. It read as internal art-direction microcopy and duplicated the Japanese message rather than helping the recipient.

This matches the already promoted project rule `GENERIC_ENGLISH_INTERNAL_CONCEPT_LABEL`: English is not removed by default; it is retained only when it has a real reader-facing job.

## Bounded comparison

Figma file: `ylmVBbwNcnjueYrymNpa3c`

- Current back before change: `57:17`
- comparison: `67:2 / QA / ADD-16 / BACK / NO GENERIC ENGLISH KICKER / 2026-08-23`
- comparison changed only `TEXT / KICKER` visibility.
- textile geometry, Japanese display, prompt, writing rules, signature/guide lanes and canvas size were unchanged.

Result at native `700×1036`: the no-kicker version produced a clearer first read from textile structure → Japanese emotional headline → writing prompt and removed an internal-concept-label feel without reducing the tactile/homecoming identity.

## Promotion / rollback

Before Current mutation complete hidden rollbacks were created:

- `68:2 / ROLLBACK / ADD-16 / BACK / PRE-ENGLISH-KICKER-SUBTRACTION / 2026-08-23`
- `68:21 / ROLLBACK / ADD-16 / BACK STRESS / PRE-ENGLISH-KICKER-SUBTRACTION / 2026-08-23`

Adopted mutation:

- Current kicker `57:24 / TEXT / KICKER`: `visible true → false`
- stress kicker `57:57 / TEXT / KICKER`: `visible true → false`
- comparison `67:2` was hidden after adoption.

No copy, font size, Japanese typography, writing geometry, palette, or textile decoration changed.

## Post-change QA

Fresh Current screenshot `57:17` at native `700×1036`: PASS.

Fresh realistic long-copy screenshot `57:50` after temporarily revealing the hidden proof: PASS; the long Japanese display, prompt and footer lanes remain stable without the kicker. The stress root was re-hidden after review.

Structure readback after promotion:

- Current back visible native text: `4`
- Current back fixed-height text: `0`
- Current back outside text: `0`
- Current back IMAGE fills: `0`
- stress back visible native text: `4`
- stress back fixed-height text: `0`
- stress back outside text: `0`
- stress back IMAGE fills: `0`
- Current/stress kicker visibility: `false / false`

## Hybrid / asset decision

- variable/factual/emotional copy: native Figma text;
- textile/weave/writing rules: existing simple native functional geometry;
- generated/composed raster: `0`;
- image generation: `0`;
- Drive write: `0`.

Exact Drive authority was live-confirmed before the change:
`1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`.

The diagnosed defect was editorial language hierarchy, not missing imagery. Generating family/person imagery is prohibited and generic home/travel imagery would weaken the writing surface.

## Result

`CURRENT_HOME_TEXTILE_MAT_RETAINED / GENERIC_ENGLISH_KICKER_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / WRITING_SURFACE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

This is a receiving-item application of an existing promoted rule, not a new project-wide rule.
