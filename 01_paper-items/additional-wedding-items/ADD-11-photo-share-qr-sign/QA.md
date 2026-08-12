# ADD-11 写真共有 / QR案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-13

## Current production authority

- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-11 写真共有・QR案内サイン`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- Figma URL: `https://www.figma.com/design/PWQ5ygJJt0IlOqj5ri5jng`
- Drive folder: `ADD-11_写真共有_QR案内サイン`
- Drive folder ID: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- reopened visual authority: `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`
- latest typography repairs: `FIGMA-A5-JA-LINEBREAK-REPAIR-2026-08-12.md` if present in history and `FIGMA-A4-JA-LINEBREAK-REPAIR-2026-08-12.md`; the reopened visual evidence also contains the verified A5 repair record.

## Production frames

- `1:31` — `ADD11_A5_TABLETOP` — 875 × 1240
- `1:45` — `ADD11_A6_MINI` — 620 × 875
- `3:2` — `ADD11_A4_POSTER` — 1240 × 1754 independent poster reflow

A5 is the primary tabletop direction. A4 is an independent larger reflow rather than a proportional scale-up. A6 is a smaller neutral derivative for near-field placement; final adoption depends on installation needs.

## Reopened sellable visual authority
The reopened clean-room comparison replaced the earlier instruction-sheet / bordered-QR-card impression with the approved V2 QR authority-field family while preserving the three production root IDs.

Current art direction:
- Japanese-first category label `写真共有` and Noto Serif JP headline drive the hierarchy;
- the unresolved QR is intentionally reserved inside a deep-navy authority field rather than a web-card-like bordered widget;
- the QR placeholder remains deliberately non-scannable: only `QR CODE` plus `［確定リンク待ち · LAYOUT DUMMY］`;
- A5/A4 use a right-side navy field while A6 independently reflows the QR role into a bottom field;
- one restrained rust seam separates editorial copy from the QR authority field;
- no fake finder patterns, valid QR modules, stock icons, generated people, rounded cards, pills, badges, gradients, shadows or transport-roleplay are used.

Fresh 2026-08-13 screenshots of A5 at natural `875 × 1240` and A4 at `990 × 1400` render still support the sellable visual judgment. The left editorial field / navy QR field relationship remains intentional, Japanese typography is readable, and the QR role does not look like a fake operational control.

## Typography repair authority
Fresh actual-size review on 2026-08-12 caught Japanese automatic-wrap defects that structural overflow checks had missed.

A5 `INTRO_JA / 6:29` now uses deliberate phrase-boundary line breaks:
- `撮影した写真を、`
- `こちらから共有できます。`
- `たくさんの思い出を`
- `残していただけたら嬉しいです。`

A4 `INTRO_JA / 6:89` was likewise repaired so `嬉しいです。` is not split unnaturally. These repairs changed no factual meaning, QR role or format hierarchy.

## Highest-value design decision
The sign must never fabricate a scannable QR code or imply that an unconfirmed sharing destination is authoritative. Production therefore keeps a deliberately non-scannable native placeholder. The real QR remains a finalization boundary.

## Rollback evidence

Reopened V2 rollback section:
- `6:2 / ROLLBACK_ADD_11_PRE_REOPENED_QR_FIELD_2026_08_10`
- A5 rollback `6:3`
- A6 rollback `6:33`
- A4 rollback `6:63`

Typography repair rollback evidence is retained on `99_QA`, including A5 `8:2` and the A4 repair rollback recorded in `FIGMA-A4-JA-LINEBREAK-REPAIR-2026-08-12.md`.

## Long-copy stress QA
Reopened V2 stress family:
- `5:52` — `QA_ADD11_A5_V2_LONG_COPY_STRESS`
- `5:68` — `QA_ADD11_A6_V2_LONG_COPY_STRESS`
- `5:84` — `QA_ADD11_A4_V2_LONG_COPY_STRESS`

Expanded sharing explanation, privacy/public-scope text and QR instruction remain in their assigned native auto-layout fields without collision.

## Structure QA — fresh 2026-08-13 readback

### A5 `1:31`
- 875 × 1240, `clipsContent=true`
- native text: `10`
- IMAGE fills: `0`
- text outside root: `0`
- `INTRO_JA / 6:29`: native editable text, 400 × 168

### A6 `1:45`
- 620 × 875, `clipsContent=true`
- native text: `10`
- IMAGE fills: `0`
- text outside root: `0`

### A4 `3:2`
- 1240 × 1754, `clipsContent=true`
- native text: `10`
- IMAGE fills: `0`
- text outside root: `0`
- `INTRO_JA / 6:89`: native editable text, 620 × 156

No flatten/raster replacement was introduced. All variable text remains native and editable.

## Image / Drive decision
`IMAGE_GENERATION_NOT_REQUIRED` for this production direction. Generated imagery would compete with the eventual real QR and does not solve a screenshot-supported defect. Drive writes for this authority sync: `0`; exact Drive folder metadata was re-read before the write.

## BLOCKED_REQUIRED_INPUT

These are required only for final adoption/export and do not block further visual progression:
- authoritative photo-sharing destination URL;
- confirmed sharing service/account ownership;
- final public/private access scope;
- upload/view permission model;
- access expiration or retention period;
- final privacy / guest-consent wording;
- final installation format selection among A5/A4 and whether A6 is needed.

## DEFERRED_FINALIZATION
After the authoritative URL and access policy are fixed:
- generate the real QR from that exact destination;
- verify encoded URL against the authority source;
- confirm QR quiet zone in final artwork;
- scan on iPhone and Android;
- perform 100% physical-size scan proof;
- test low light and oblique angle readability;
- confirm printer bleed/template/profile and safe area;
- confirm stand/frame interference at the venue;
- export final PDF and store final deliverables in the registered Drive folder.

## Result
- Specification QA: `PASS`
- Figma production creation: `PASS`
- Reopened sellable visual QA: `PASS`
- Whole / reading / detail visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-copy structural QA: `PASS`
- Native editability: `PASS`
- Rollback evidence: `PASS`
- Drive authority readback: `PASS`
- Physical / device scan proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

The real QR and final print data remain intentionally deferred until the authoritative URL and access policy are available.
