# V5 inside history plane subtraction + Q60 raw bridge audit

Date: 2026-08-09
Scope: Rurubu WEDDING V5 only
Status: `VERIFIED_DESIGN_GAIN / Q60_TRANSPORT_STILL_BLOCKED / V6_GATE_CLOSED`

## Authorities read before work

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `01_paper-items/rurubu-wedding/RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `01_paper-items/rurubu-wedding/POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`

## Experiment A — inside history decorative plane subtraction

### Visible problem

The live inside spread `77:290` retained `77:502 / RURUBU/Icon/plane` in the upper-right of the history page. At whole-spread and natural-size review, the icon did not provide chronology, navigation, provenance, contrast, or factual information. It competed weakly with the history heading/timeline and behaved as a free-floating decorative mark.

### Tested principle

Attempt subtraction before adding or refining decoration. A decorative mark survives only when it has a semantic/editorial job.

### Hypothesis

Removing only the plane icon should make the upper history field calmer and keep attention on `OUR HISTORY`, the six-point timeline, and the dominant history photograph, without changing the page's travel identity.

### Possible regression

The history page might lose too much travel atmosphere or appear visually empty in the upper-right corner.

### Safe prototype

- duplicate of Current inside frame created as `543:2 / V5_INSIDE_HISTORY_PLANE_SUBTRACTION_QA_2026_08_09`
- clone plane node: `543:220`
- only change: `visible true -> false`
- Current remained untouched during comparison

### Evidence and result

Whole-spread, page/reading, and original-size screenshot review found the hierarchy cleaner after subtraction. The travel theme remained strongly communicated by the photography, route/timeline language, memory-spots section, and editorial copy, so the plane was redundant rather than necessary.

Decision: `PROTOTYPED -> VERIFIED -> ADOPTED_FOR_V5_CURRENT`

### Current promotion

- Current node changed: `77:502 / RURUBU/Icon/plane`
- change: `visible true -> false`
- no deletion
- no text edits
- no image/crop/hash changes
- no geometry changes

Post-promotion structure readback:

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540`: preserved and visible
- V4 rollback `59:2` / `59:178`: preserved
- comparison `543:2`: preserved

### Reusable lesson

A small travel icon should not survive purely because the item has a travel theme. When the page already communicates destination/journey through content and photography, an unanchored icon can reduce editorial authority. This is verified for this context only; it is not yet a project-wide prohibition on travel icons.

### Next application

Continue reviewing decorative marks only where they have no unique semantic job. Do not mechanically remove route/location devices that actively aid navigation or grouping.

---

## Experiment B — Q60 raw-file binary bridge audit

### Source truth

Drive readback returned the accepted prepared cover derivative as a real streamed file rather than model-visible base64:

- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- bytes: `155,439`
- MIME: `image/jpeg`
- expected dimensions from ledger: `1330 x 1220`
- expected SHA-256 from ledger: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The connector materialized the binary file successfully in the execution runtime. This confirms that Drive-to-runtime raw transfer is no longer the blocker.

### New method tested

A fresh Figma asset upload URL was requested for the latest Current-parity staging target `538:132`, then the mounted raw JPEG bytes were POSTed directly with `Content-Type: image/jpeg`.

### Result

The POST failed before any Figma placement with the same environment-level DNS fingerprint:

`curl: (6) Could not resolve host: mcp.figma.com`

No Current node was changed and no Q60 role count was advanced.

Decision: `RAW_DRIVE_MATERIALIZATION_VERIFIED / EXTERNAL_FIGMA_UPLOAD_HOST_REJECTED_IN_THIS_RUNTIME`

### Process consequence

- do not retry `mcp.figma.com` POSTs in this runtime without evidence that network/DNS capability changed
- do not return to long model-visible base64 transcription
- do not lower Q60 quality merely to force transport
- continue safe V5 editorial/typographic work while preserving `538:132` as the latest Current-parity Q60 staging target

## Progress truth after this run

No asset-role state changed:

- intended source applied: `11/11 active`
- PHOTO_ROLE_PASS: `10/11 active`
- ROLE_COMPLETE: `10/11 active`
- dominant role pass: `2/3`
- remaining active photo blocker: `V5-01 / 77:148 / IMG_HERO`
- V6 production gate: closed

## Learning-state summary

- decorative plane subtraction: `VERIFIED / CURRENT_ADOPTED`
- raw Drive file materialization: `VERIFIED_CAPABILITY`
- external Figma upload-host POST in current runtime: `REJECTED_BLOCKER`
- Q60 visual completion: `NOT_COMPLETE`
