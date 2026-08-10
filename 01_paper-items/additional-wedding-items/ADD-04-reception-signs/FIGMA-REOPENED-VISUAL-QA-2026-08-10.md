# ADD-04 受付サイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main`; `docs/automation/non-rurubu-figma-quality-current.md` status `VISUAL_REOPENED`.

## Live authority

- Figma file: `ADD-04_RECEPTION_SIGNS_2026-10-24` / `qWlF9THLR1G76hLcx1zYOx`
- production groom: `1:3 / FRAME_GROOM_RECEPTION_A5`
- production bride: `1:14 / FRAME_BRIDE_RECEPTION_A5`
- Drive folder: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The legacy pair is structurally sound but still too close to a generic signage template: large Japanese label, English duplicate, a long horizontal route rule ending in a dot, then a large mostly-empty lower field. The groom/bride pair differs mainly through accent color and route length. That is not enough evidence for `SELLABLE_VISUAL_QA_PASS` under the reopened visual gate.

## Rollback-safe clean-room comparison

Created a bounded QA section without modifying production:

- section `3:2 / QA_ADD_04_REOPENED_EDITORIAL_PAIR_2026_08_10`
- groom `3:3 / QA_GROOM_RECEPTION_V2_EDITORIAL`
- bride `3:20 / QA_BRIDE_RECEPTION_V2_EDITORIAL`

The comparison changes the composition materially rather than polishing the legacy template: top rule instead of full-height side stripe; Japanese `受付` kicker; larger side label; compact asymmetric route block; editorial metadata line; dedicated guidance field; restrained rust vertical mark; large low-opacity pair number; shared family grammar without making the two signs recolor duplicates.

## Screenshot-led refinement

Whole-item screenshots were captured for production and both clean-room candidates. After the first clean-room pass, the large pair number was judged too assertive and was reduced to 13% opacity; the lower editorial mark was narrowed. No decorative airplane/passport/stamp imagery was added.

## Structure readback

Both clean-room frames:

- size: `740 × 1050`
- native editable text nodes: `11`
- IMAGE fills: `0`
- text outside frame: `0`
- variable fields remain native semantic placeholders: `[受付案内 · LAYOUT DUMMY]`, `[受付名 · LAYOUT DUMMY]`

No rasterization or generated imagery was introduced.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_COMPARISON`.

The visible defect is typography/composition and pair differentiation, not a missing hero image. Adding generated imagery would make the reception desk signs less direct and risks decoration for decoration's sake. Drive writes: `0`.

## Status

- existing structural state retained: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`
- reopened visual state: `CLEANROOM_COMPARISON_CREATED / SELLABLE_VISUAL_QA_PENDING`
- production was intentionally not promoted in this run; final choice should compare the pair side-by-side at thumbnail, reading and actual A5 scale before promotion.

## Deferred finalization

- approved receptionist name/surname if used
- final reception-operation copy
- venue lighting / 2 m readability
- stand overlap / glare
- printer template, bleed and 100% physical proof

## Next

Complete paired visual comparison of production vs V2, promote only if the clean-room pair clearly wins, then proceed to ADD-05.