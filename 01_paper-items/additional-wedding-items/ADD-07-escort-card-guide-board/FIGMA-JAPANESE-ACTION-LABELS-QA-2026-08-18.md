# ADD-07 エスコートカード案内ボード — Japanese Action Labels QA

Status: `VERIFIED_LOCAL / CLEANROOM_V2_SELECTED_A2_A3 / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `d50edbadd88a7ebc01ad42d21551166276c676af`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- selected A2: `14:3`
- selected A3: `14:25`
- long-copy A2: `15:4`
- long-copy A3: `15:27`
- Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`

## Visible issue

Fresh whole-item review showed that each route step repeated the same instruction twice: large English action copy (`FIND YOUR NAME`, `PICK UP YOUR TICKET`, `FIND YOUR DESTINATION`) followed by Japanese copy. Together with `BOARDING GATE`, this pushed the board toward airport-instruction UI rather than a Japanese wedding wayfinding sign.

The three action meanings were already fully available in Japanese and the large `01 → 02 → 03` route provided the sequencing. The English step labels therefore added visual mass more than information.

## Bounded comparison

A rollback-safe A2 comparison was created:

- `21:2 / QA_ADD07_A2_JAPANESE_ACTIONS_ONLY_2026_08_18`
- only the three action text roles were simplified to Japanese-only copy
- route geometry, numbers, title, lead, terminal field, date/location and destination note were unchanged
- Japanese action size was increased from 34px bilingual rows to a clearer 42px A2 single-language read

The comparison improved the first read: `エスコートカードをお取りください → 01 お名前を探す → 02 カードを取る → 03 行き先の卓へ`, while preserving `BOARDING GATE` as the single thematic bilingual kicker.

## Adopted change

The same Japanese-first action treatment was adopted on selected A2 and the independent A3 reflow:

- A2 `14:16 / 14:18 / 14:20`
- A3 `14:38 / 14:40 / 14:42`

A2 action copy uses 42px; A3 uses 32px to preserve the independent smaller-format rhythm.

Pre-change rollback copies were preserved hidden:

- `22:2` selected A2 rollback
- `22:25` selected A3 rollback
- `22:48` long-copy A2 rollback
- `22:71` long-copy A3 rollback

The comparison `21:2` was hidden after adoption.

## Long-copy QA

The long-copy proof was not weakened to short production strings. It was rebuilt with longer Japanese-only action phrases that do not invent kana/alphabetical ordering, guest lists or table facts:

- `お名前が記載されたカードを見つけてください`
- `見つけたカードをお手元にお取りください`
- `カードに記載された行き先の卓へお進みください`

Fresh stress screenshots confirm A2 and A3 remain inside their roots with no visible text outside the frame. The route still reads as one continuous physical path and Step 03 stays inside the cream information field rather than crossing into the navy terminal field. Stress roots were hidden again after verification.

## QA result

- A2: `1400×1980`, outside visible text `0`
- A3: `990×1400`, outside visible text `0`
- A2/A3 raster IMAGE fills remain `0`
- action route remains editable vector
- no variable/factual copy was baked into artwork
- no new fake gate data, alphabetical-order claim, guest list, QR or table list was introduced
- retained legacy production remains unchanged

Result: `JAPANESE_FIRST_ROUTE_ACTIONS_PASS`.

Current state remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED_A2_A3 / LEGACY_PRESERVED / NOT_PRINT_READY`.

## Drive / assets

Drive write: `0`.
Image generation: `NOT_REQUIRED`.

The defect was duplicated English instructional copy, not missing visual imagery.
