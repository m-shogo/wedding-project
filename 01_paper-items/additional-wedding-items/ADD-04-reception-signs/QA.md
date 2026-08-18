# ADD-04 受付サイン — QA

Status: `CURRENT / CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

The former promoted production pair `1:3 / 1:14` is retained as legacy comparison/rollback history. It is **not** the current selected visual family after the 2026-08-15 clean-room rebuild.

Current selected clean-room V3:

- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- groom selected: `16:2 / CLEANROOM_V3_ADD04_GROOM_TYPO_BAND`
- bride selected: `16:17 / CLEANROOM_V3_ADD04_BRIDE_TYPO_BAND`
- groom long-copy proof: `16:32` — hidden after QA
- bride long-copy proof: `16:47` — hidden after QA
- each selected frame: `740×1050`
- retained legacy: groom `1:3`, bride `1:14`
- Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

Clean-room source evidence: `CLEANROOM-V2-V3-QA-2026-08-15.md`.

## Current visual direction

V3 is a Japanese typographic reception-band pair rather than a recolored duplicate:

- `新郎側受付 / GROOM RECEPTION` and `新婦側受付 / BRIDE RECEPTION` are the primary tabletop read;
- compact date/location context remains secondary;
- groom/bride use opposite band anchoring within one paper/typographic family;
- optional name and direction remain native semantic fields below the band;
- a restrained functional route line supports the lower field without becoming transport UI;
- no generated person/image, fake desk brand, ticket credential, decorative icon row, shadow or dashboard card treatment is used.

Fresh 2026-08-18 live screenshot review of selected groom `16:2` confirms the black band, Japanese label and open lower field remain clear at reading/actual scale. The sign still reads as a physical reception marker rather than a web form.

## Resilience / recent polish retained in current selection

### Optional-name reflow

The optional-name field uses native `GROUP_NAME_FIELD_AUTO` vertical auto-layout so a longer authoritative name cannot collide with its divider. This was repaired before V3 selection.

### Direction-field auto-height

`TXT_DIRECTION_TBD` is native auto-height in groom/bride selected and both long-copy proofs. Verified direction bottom is `712px`; route line y is `750px`; long-copy direction-to-route clearance remains `38px`; visible text outside root is `0`.

Evidence: `FIGMA-CLEANROOM-V3-DIRECTION-AUTOHEIGHT-QA-2026-08-17.md`.

### Guest-facing placeholder language

Current selected/stress copy uses semantic placeholders such as `[お名前]` and `[方向]` rather than internal `LAYOUT DUMMY / QA / PROOF / TEMP` suffixes. Implementation state belongs in node names/hidden QA/GitHub evidence, not on the printed sign.

### Redundant English footer removal

The tiny `RECEPTION / YOKOHAMA` footer was removed from selected groom/bride and their stress proofs because the black band already establishes Reception and the top context already contains Yokohama. The useful bilingual side label directly below the Japanese title remains.

Evidence: `FIGMA-REDUNDANT-ENGLISH-FOOTER-REMOVAL-2026-08-18.md`.

## Structure / stress QA

Current verified state:

- groom selected: native editable text/vector, IMAGE fill `0`, outside visible text `0`;
- bride selected: native editable text/vector, IMAGE fill `0`, outside visible text `0`;
- adaptive optional-name auto-layout present on both sides;
- direction semantic field auto-height in selected + stress;
- long-name / long-direction proofs pass without clipping/collision;
- no variable copy baked into graphics;
- stress proofs return to hidden state after inspection;
- retained legacy pair remains unchanged.

## Fact / placeholder contract

Confirmed copy:

- `新郎側受付 / GROOM RECEPTION`;
- `新婦側受付 / BRIDE RECEPTION`;
- date `2026.10.24 SAT`;
- location `YOKOHAMA`.

Do not invent receptionist names, surname use, payment/gift handling, desk operation, direction wording, QR, gate/flight/seat information or other operational facts. Unknown name/direction roles remain native semantic placeholders.

## Drive / generated assets

- exact Drive folder live-read on 2026-08-18: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`;
- generated/raster production assets required by current design: `0`;
- Drive write for this reconciliation: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the reception pair is carried by typography, physical sign hierarchy and editable field structure; imagery is not the current bottleneck.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- whether receptionist/name text is actually used and its final wording;
- actual direction wording;
- real stand overlap/glare/lower-edge occlusion and venue lighting;
- final printer template, bleed and safe area;
- physical pair proof and approximately 2m viewing-distance check.

Do not reopen the selected visual family for cosmetic churn unless a fresh screenshot or authoritative input exposes a concrete defect.