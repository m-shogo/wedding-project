# ADD-04 受付サイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main`; `docs/automation/non-rurubu-figma-quality-current.md` status `VISUAL_REOPENED`.

## Live authority

- Figma file: `ADD-04_RECEPTION_SIGNS_2026-10-24` / `qWlF9THLR1G76hLcx1zYOx`
- production groom: `1:3 / FRAME_GROOM_RECEPTION_A5`
- production bride: `1:14 / FRAME_BRIDE_RECEPTION_A5`
- Drive folder: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- rollback section: `5:25 / ROLLBACK_ADD_04_RECEPTION_PRE_V2_EDITORIAL_2026_08_10`
- rollback groom: `5:26 / ROLLBACK_GROOM_RECEPTION_PRE_V2`
- rollback bride: `5:37 / ROLLBACK_BRIDE_RECEPTION_PRE_V2`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The legacy pair was structurally sound but too close to a generic signage template: large Japanese label, English duplicate, a long horizontal route rule ending in a dot, then a large mostly-empty lower field. The groom/bride pair differed mainly through accent color and route length.

## Clean-room comparison evaluated

The bounded comparison remains available:

- section `3:2 / QA_ADD_04_REOPENED_EDITORIAL_PAIR_2026_08_10`
- groom `3:3 / QA_GROOM_RECEPTION_V2_EDITORIAL`
- bride `3:20 / QA_BRIDE_RECEPTION_V2_EDITORIAL`

The clean-room direction materially changes the composition: top rule instead of full-height side stripe; Japanese `受付` kicker; stronger side label; compact asymmetric route block; editorial metadata line; dedicated guidance field; restrained rust vertical mark; large low-opacity pair number; and shared family grammar without making the two signs recolor duplicates.

## Three-scale visual decision

The legacy and clean-room designs were compared again at thumbnail/whole-pair scale, reading scale, and actual A5 detail scale.

The clean-room pair clearly wins: hierarchy reads faster, the pair is differentiated without gimmicks, the large empty field is converted into deliberate editorial rhythm, and the composition no longer depends on generic signage-template cues. The low-opacity `01 / 02` stays subordinate and does not compete with the Japanese labels.

Result: **promoted to production** while preserving the existing production frame IDs.

## Rollback-safe promotion

Before promotion, the legacy production pair was duplicated into the rollback section above. Production IDs `1:3` and `1:14` were retained and their contents were replaced with the approved V2 editorial structures.

## Post-promotion screenshot QA

Actual-size production screenshots were re-read after promotion.

- groom: top navy rule, `受付 / 新郎側`, route block, guidance field, editorial footer and `01` render cleanly; no clipping or accidental overlap observed.
- bride: teal family variant, shorter route block, guidance field, editorial footer and `02` render cleanly; no clipping or accidental overlap observed.
- variable copy remains visibly secondary to the primary wayfinding label.
- no decorative airplane/passport/stamp imagery was added.

## Post-promotion structure readback

Both production frames:

- size: `740 × 1050`
- native editable text nodes: `11`
- IMAGE fills: `0`
- text outside frame: `0`
- variable fields remain native semantic placeholders: `[受付案内 · LAYOUT DUMMY]`, `[受付名 · LAYOUT DUMMY]`

Rollback readback:

- rollback groom/bride each retain the legacy `740 × 1050` structure
- legacy text nodes: `6` each
- IMAGE fills: `0`
- text outside frame: `0`

No rasterization or generated imagery was introduced.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The quality bottleneck was typography/composition and pair differentiation, not a missing hero image. Adding generated imagery would reduce direct wayfinding utility and risk decoration for decoration's sake. Drive writes: `0`; exact Drive folder metadata was re-read before the Figma write.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined design state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

- approved receptionist name/surname if used
- final reception-operation copy
- venue lighting / 2 m readability
- stand overlap / glare
- printer template, bleed and 100% physical proof

These remain `DEFERRED_FINALIZATION` and do not block progression.

## Next

Proceed to ADD-05 サンキュータグ / プチギフトタグ for the reopened visual-art-direction audit.