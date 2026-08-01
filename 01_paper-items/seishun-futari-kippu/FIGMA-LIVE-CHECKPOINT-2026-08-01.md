# 青春ふたりきっぷ — Figma Live Checkpoint 2026-08-01

Status: `LIVE_REBUILT / DESIGN_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/v7rIRHv8YKQXG0LYD0I5OA

## Grounding result

The scheduled run rechecked live state instead of relying on prior chat history.

GitHub `main` latest authority before this work:
- `a005d4577a5b7bd10b3809c65f26b26b442d6027`

Current preparation contract:
- `FIGMA-PLACEMENT-PREP.md`
- provisional size `720 × 250 px`, corresponding to approximately `72 × 25 mm` at the working scale
- physical MINTIA application-area measurement still required before print lock

Live Figma audit found:
- `00_README` existed but was empty
- `01_LABEL` existed but was empty
- `99_QA` existed but was empty

The prior prepared/completed impression was therefore not treated as live truth.

## Drive verification

Exact production filenames did not return from the first filename search, but broader Drive search confirmed the Current research and authority documents for 青春ふたりきっぷ remain accessible.

No accepted asset was regenerated.

Because exact asset bytes were not available through the connector during this run, native editable geometry was used for the production shell while preserving the documented semantic roles. These roles remain replaceable with the accepted Drive assets later without rebuilding native text.

## Live Figma reconstruction

Pages rebuilt:
- `00_README`
- `01_LABEL`
- `99_QA`

Production frame:
- `FRAME_LABEL` — node `11:2`
- size `720 × 250`

QA frame:
- `ACTUAL_SIZE_QA` — node `11:140`

### Preserved native semantic content

- `TXT_TITLE` — `青春ふたりきっぷ`
- `TXT_SUBTITLE` — `WEDDING JOURNEY TICKET`
- `TXT_ROUTE` / route group — `新郎駅 → 新婦駅 → 未来行き`
- `TXT_DATE` — `2026.10.24`
- `TXT_ISSUE_NO` — `No.1024`
- `GROUP_FACTS`
- `ICON_TRAIN`
- `DECOR_SHUKU_STAMP`
- `DECOR_GATE_STAMP`
- `BG_GUILLOCHE_NATIVE`
- `SHAPE_TICKET_FRAME`

All normal copy remains native editable text.

### Art direction

The live design uses:
- warm off-white railway-ticket paper tone
- restrained sage/railway green
- black-green official-document typography
- red `祝` accent
- blue fictional gate-stamp accent
- thin frame rules and perforation cues
- one clear route line
- one compact train illustration
- subtle native guilloche pattern

The design intentionally avoids:
- generic equal-card layout
- excessive icons
- app-dashboard styling
- gradients as primary art direction
- operational barcode or real railway-operator resemblance

## Screenshot QA

Initial screenshot identified one concrete failure:
- `TXT_PHRASE` overlapped the blue gate stamp and was not credible at the expected 25 mm physical height.

Evidence-driven correction:
- removed `TXT_PHRASE`, as explicitly permitted by the Current preparation contract when actual-size legibility fails
- reduced and repositioned the blue decorative gate stamp
- refreshed the QA reference clone

Post-fix screenshot result:
- title remains dominant and legible
- route remains clear
- date and issue number remain readable
- red and blue accents do not obscure required information
- train and stamp have sufficient separation
- no decorative element reads as an operational code
- no major clipping or overlap is visible

## Honest remaining blockers

Before `PRINT_READY`:

1. Measure the actual MINTIA label application area.
2. Update the frame, bleed, and safe zones to the measured dimensions while preserving normalized relationships.
3. Re-import the accepted Current Drive SVG/PNG assets into the preserved semantic roles when connector access permits.
4. Print one copy at 100% scale.
5. Apply it to the actual case and inspect title, route, date, corners, adhesion, and normal viewing-distance legibility.
6. Export the final print PDF and run final-print QA.

## Declaration

Current state:

`LIVE_REBUILT / DESIGN_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
