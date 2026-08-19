# ADD-07 エスコートカード案内ボード — QA

Status: `CURRENT / CLEANROOM_V2_SELECTED_A2_A3 / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JAPANESE_ACTION_LABELS_PASS / STEP_MARKER_SUBTRACTION_PASS / REDUNDANT_NOTE_SUBTRACTION_PASS / GENERIC_KICKER_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- selected A2: `14:3 / CLEANROOM_ADD07_V2_SELECTED_A2_QUIET_DEPARTURE_ROUTE` — `1400×1980`
- selected A3: `14:25 / CLEANROOM_ADD07_V2_SELECTED_A3_INDEPENDENT_REFLOW` — `990×1400`
- A2 long-copy proof: `15:4 / QA_ADD07_A2_V2_LONG_COPY_STRESS_2026_08_15` — hidden after QA
- A3 long-copy proof: `15:27 / QA_ADD07_A3_V2_LONG_COPY_STRESS_2026_08_15` — hidden after QA
- retained legacy A2/A3: `1:2 / 1:17`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`

The retained production remains rollback/history only. The selected V2 family was authored from blank frames under the zero-reuse clean-room mandate; no BOARDING PASS artwork, old route geometry, old cards, rails, icons or generated assets were reused as construction material.

## Current selected visual state

Current visible A2/A3 copy is Japanese-first:

- title: `エスコートカードをお取りください`;
- lead: `お名前のカードを見つけて、記載されたテーブルへお進みください。`;
- step 01: `お名前を探す`;
- step 02: `カードを取る`;
- step 03: `行き先の卓へ`;
- date/location: `2026.10.24 / YOKOHAMA`.

The former English action duplicates (`FIND YOUR NAME / PICK UP YOUR TICKET / FIND YOUR DESTINATION`) were removed in the Japanese-first polish. The former circular step markers were removed; the native `01 / 02 / 03` numerals sit directly on the mint action route. The redundant lower note repeating Step 03 was removed.

Fresh 2026-08-19 review also removed the remaining `BOARDING GATE` kicker. The board is not an actual boarding gate, and the Japanese title/lead/route already communicate both function and travel-theme motion. Removing the generic transport-roleplay label strengthened the editorial first read without creating false emptiness; the right navy terminal field still supplies a strong physical-sign identity.

Evidence:

- `FIGMA-JAPANESE-ACTION-LABELS-QA-2026-08-18.md`
- `FIGMA-V2-STEP-MARKER-SUBTRACTION-2026-08-18.md`
- `FIGMA-V2-REDUNDANT-DESTINATION-NOTE-SUBTRACTION-2026-08-18.md`
- `FIGMA-V2-STEP3-MARKER-SEPARATION-QA-2026-08-17.md`
- `FIGMA-V2-GENERIC-BOARDING-GATE-KICKER-SUBTRACTION-QA-2026-08-19.md`

## Generic-kicker subtraction QA

Rollback-safe A2/A3 comparison candidates were created at `27:2 / 27:25` with only `BOARDING GATE` hidden. Both were stronger at whole-item scale, so the change was adopted in selected and long-copy proofs.

Pre-change rollback copies:

- `27:48` A2 selected;
- `27:71` A3 selected;
- `27:94` A2 stress;
- `27:117` A3 stress.

All comparison and rollback roots are hidden after QA.

Post-adoption readback:

- A2 selected: visible native text `10`, `BOARDING GATE` visible count `0`, outside text `0`;
- A3 selected: visible native text `10`, `BOARDING GATE` visible count `0`, outside text `0`;
- A2/A3 stress: visible native text `10` each, kicker `0`, outside text `0`, hidden after QA;
- IMAGE fills `0`.

A2 long-copy proof was temporarily shown at large scale after adoption and still passes with the long Japanese title/lead/action copy; it returned to hidden state afterward.

## Live structure / long-copy state

- header remains native vertical auto-layout so title/lead grow together;
- action route and terminal edge remain editable vector roles;
- long Japanese title/lead and long Japanese step actions remain in hidden stress proofs;
- no variable/factual copy is baked into raster or SVG;
- no generated/raster imagery is required.

Fresh whole-item A2 and A3 screenshots remain PASS: `01 → 02 → 03` reads as one continuous action path and the right navy terminal field gives large-format sign identity without card/dashboard UI.

## Hybrid authoring / asset state

- variable/factual copy: native editable Figma text;
- route / terminal fixed graphics: editable vector;
- raster/image roles: `0`;
- image generation required: `0`;
- Drive write in this run: `0`.

The current bottleneck is not imagery.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final card-placement operation and wording;
- printer stock/profile, trim/bleed and safe-area proof;
- physical A2/A3 output proof;
- installation height/easel lip and 2–4m viewing-distance check;
- venue lighting/background contrast.

Do not cosmetically reopen a healthy selected family unless a fresh screenshot or authoritative input exposes a concrete defect.