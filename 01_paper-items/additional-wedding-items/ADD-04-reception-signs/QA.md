# ADD-04 受付サイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-13

This file began as the 2026-08-02 pre-Figma QA contract. The live reopened production supersedes the stale `live Figma visual QA: NOT_RUN / PREPARED_FOR_FIGMA` state.

## Live production authority

- Figma file: `ADD-04_RECEPTION_SIGNS_2026-10-24` / `qWlF9THLR1G76hLcx1zYOx`
- production groom: `1:3 / FRAME_GROOM_RECEPTION_A5`
- production bride: `1:14 / FRAME_BRIDE_RECEPTION_A5`
- Drive folder: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- reopened visual evidence: `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`

## Current visual / structure QA

Fresh production screenshot plus live readback reconfirm the promoted editorial pair:

- Japanese `受付 / 新郎側・新婦側` hierarchy remains dominant and readable;
- the pair shares paper/typographic family DNA without relying on a simple color-only duplicate;
- route geometry, editorial metadata and low-opacity `01 / 02` retain intentional asymmetry;
- guidance and reception-name fields remain explicit native editable semantic placeholders;
- groom `1:3`: 740×1050, 11 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- bride `1:14`: 740×1050, 11 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- no rasterization or generated imagery was introduced;
- no current screenshot-supported need for image generation exists.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Deferred finalization

- [ ] approved receptionist name/surname if used
- [ ] final reception-operation wording
- [ ] actual venue lighting and ~2 m readability
- [ ] stand overlap / glare / lower-edge occlusion
- [ ] final printer template, bleed/safe-area validation
- [ ] 100% physical proof of the pair

Do not invent names or operational instructions. Keep `NOT_PRINT_READY` until final copy, venue conditions, vendor requirements and physical proof are authoritative.
