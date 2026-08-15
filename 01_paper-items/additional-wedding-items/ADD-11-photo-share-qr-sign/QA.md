# ADD-11 写真共有 / QR案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / SEAM_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-15
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current production authority

- Figma file: `ADD-11 写真共有・QR案内サイン`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- production A5: `1:31 / ADD11_A5_TABLETOP` — 875 × 1240
- production A6: `1:45 / ADD11_A6_MINI` — 620 × 875
- production A4: `3:2 / ADD11_A4_POSTER` — 1240 × 1754 independent poster reflow
- Drive folder: `ADD-11_写真共有_QR案内サイン`
- Drive folder ID: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- reopened visual authority: `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`
- A4 Japanese line-break repair: `FIGMA-A4-JA-LINEBREAK-REPAIR-2026-08-12.md`

A5 remains the primary tabletop direction. A4 is an independent larger reflow rather than a proportional scale-up. A6 is a smaller near-field derivative whose final installation use remains unresolved.

## Current art direction

- Japanese-first category label `写真共有` and serif headline drive the hierarchy.
- The unresolved QR remains deliberately non-scannable and reserved inside a deep-navy authority field; no valid QR modules or fake finder patterns are present.
- A5/A4 use a right-side navy QR field; A6 independently reflows the QR role into a lower navy field.
- The former rust `ACCENT_EDGE` seam has been removed from all three production variants after rollback-safe comparison proved that the navy field boundary already carried the physical grouping and the seam added decorative segmentation without a binding function.
- No rounded card, pill, badge, shadow, gradient, generated person, fake operational control or transport-roleplay is used.

## 2026-08-15 — seam subtraction / binding-function audit

Visible problem: at whole-item scale, the rust seam repeated the cream/navy split that was already fully legible through the field boundary. A5/A4 used a vertical rust bar and A6 used a horizontal rust strip. It read as decorative segmentation rather than a necessary image-caption/title-body/physical-region binding device.

This was tested as a bounded receiving-item experiment for the neutral `NRSL-002 / RSL-008` binding-function method. No Rurubu layout, asset, palette, node or item-specific production evidence was inspected or copied.

Rollback-safe clean-room comparisons:

- A5 `15:2 / QA_ADD11_A5_NO_SPLIT_SEAM_2026_08_15`
- A6 `16:2 / QA_ADD11_A6_NO_ACCENT_SEAM_2026_08_15`
- A4 `16:18 / QA_ADD11_A4_NO_ACCENT_SEAM_2026_08_15`

Only cloned `ACCENT_EDGE` visibility changed. QR field geometry, QR placeholder, semantic copy, Japanese typography, privacy placeholder, date and paper sizes were untouched.

Three-scale evidence:

- A5 whole-item / 500px: PASS; the two-field composition remains immediately legible without the rust seam.
- A5 reading / 1000px: PASS; title → body/steps → QR authority field reading order is unchanged and the split feels less template-like.
- A5 actual-size / 875×1240: PASS; no missing grouping or weakened QR role.
- A6 actual-size / 620×875: PASS; cream upper field and navy lower field remain self-evident without the rust strip.
- A4 actual-size / rendered 990×1400 from native 1240×1754: PASS; the vertical field boundary is sufficient and the right QR field remains authoritative.

Promotion rollback copies created immediately before production mutation:

- A5 `16:34 / ROLLBACK_ADD11_A5_PRE_SEAM_REMOVAL_2026_08_15`
- A6 `16:50 / ROLLBACK_ADD11_A6_PRE_SEAM_REMOVAL_2026_08_15`
- A4 `16:66 / ROLLBACK_ADD11_A4_PRE_SEAM_REMOVAL_2026_08_15`

All three are hidden. Comparison candidates are also hidden after promotion.

Production mutation was limited to native seam visibility:

- A5 `6:19 / ACCENT_EDGE` → hidden
- A6 `6:49 / ACCENT_EDGE` → hidden
- A4 `6:79 / ACCENT_EDGE` → hidden

Post-write structure readback:

- A5 `1:31`: `clipsContent=true`, native text `10`, visible text `10`, IMAGE fills `0`, seam hidden.
- A6 `1:45`: `clipsContent=true`, native text `10`, visible text `10`, IMAGE fills `0`, seam hidden.
- A4 `3:2`: `clipsContent=true`, native text `10`, visible text `10`, IMAGE fills `0`, seam hidden.
- no raster/flatten replacement was introduced; variable text remains native and editable.

Result: `SEAM_SUBTRACTION_PASS`. The sign is quieter and less template-segmented while the QR authority field retains its actual functional grouping role.

## Existing typography / long-copy evidence retained

A5 `INTRO_JA / 6:29` uses deliberate phrase-boundary line breaks:

- `撮影した写真を、`
- `こちらから共有できます。`
- `たくさんの思い出を`
- `残していただけたら嬉しいです。`

A4 `INTRO_JA / 6:89` was likewise repaired so `嬉しいです。` is not split unnaturally.

Existing V2 long-copy stress family remains valid because this run changed no text geometry, auto-layout sizing, copy width, safe area or QR position:

- `5:52 / QA_ADD11_A5_V2_LONG_COPY_STRESS`
- `5:68 / QA_ADD11_A6_V2_LONG_COPY_STRESS`
- `5:84 / QA_ADD11_A4_V2_LONG_COPY_STRESS`

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED` for this change. The screenshot-supported defect was a redundant native seam, not missing imagery. Generated imagery would compete with the eventual real QR and add no functional value.

Drive authority was re-read immediately before the Figma write and remains `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`, parent `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`. Drive writes: `0`.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

These remain finalization boundaries only and do not invalidate the sellable visual pass:

- authoritative photo-sharing destination URL and service/account ownership;
- final public/private access scope, permission model, retention/expiration and privacy/consent wording;
- final A5/A4 installation selection and whether A6 is needed;
- generate the real QR from the exact approved destination, verify the encoded URL, scan on iPhone/Android, and run 100% physical-size/low-light/oblique-angle proof;
- confirm printer bleed/template/profile, safe area, stand/frame interference, final export and Drive delivery.

## Result

- Reopened sellable visual QA: `PASS`
- Seam binding-function audit: `PASS / SEAM_SUBTRACTION_PASS`
- Whole / reading / actual-size visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-copy structural QA: `PASS` (existing stress retained; no dynamic text geometry changed)
- Native editability: `PASS`
- Rollback evidence: `PASS`
- Drive authority readback: `PASS`
- Physical / device scan proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
