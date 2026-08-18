# ADD-07 Escort Card Guide — V2 Redundant Destination Note Subtraction QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `a14d7ddc26c018f9a614c524286aaca3b5507137`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- selected A2: `14:3`
- selected A3: `14:25`
- long-copy proofs: A2 `15:4`, A3 `15:27`
- Drive: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- retained legacy remains unchanged.

## Visible problem

Fresh A2 review showed the lower note `カードに記載された卓へお進みください。` repeating information already communicated twice: the lead explains that the guest should proceed to the table written on the card, and Step 03 already says `行き先の卓へ`.

The extra sentence behaved as explanatory footer copy rather than new wayfinding information and weakened the otherwise direct route-board hierarchy.

## Bounded comparison / adopted change

Only `TXT_DESTINATION_NOTE` was hidden in selected A2/A3 and synchronized long-copy proofs. No route geometry, Japanese title, `BOARDING GATE`, steps, date/location, safe area, or factual/semantic role was changed.

Hidden rollback copies created before adoption:

- A2 selected: `25:2`
- A3 selected: `25:25`
- A2 stress: `25:48`
- A3 stress: `25:71`

Post-change selected roots:

- A2 `14:3`: destination-note visible count `0`
- A3 `14:25`: destination-note visible count `0`

## Three-scale / stress QA

- A2 500px whole-item: PASS; the `01 → 02 → 03` route is cleaner and no longer followed by repeated prose.
- A2 reading/native ratio: PASS; date/location remain a quiet physical footer.
- A2 long-copy proof `15:4`: temporarily revealed and screenshot-reviewed after subtraction, PASS.
- A3 retains the same semantic subtraction and independent reflow.
- visible text outside root: `0` on A2/A3 selected and both stress proofs.
- IMAGE fills: `0`.

Bounding-box overlap between each step number and its action label remains the intentional station-style number/action construction already verified visually; it was not changed based on geometry alone.

## Hybrid / asset decision

- variable/instruction copy remains native Figma text;
- route remains editable vector;
- no raster/generated asset is required;
- Drive write: `0`.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is maintained. The selected clean-room V2 family remains current; legacy remains preserved.