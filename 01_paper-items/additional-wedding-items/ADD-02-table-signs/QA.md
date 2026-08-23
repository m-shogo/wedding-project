# ADD-02 — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DESTINATION_V4_FULL_FAMILY_PROMOTED / FRANCE_TABLE_NUMBER_REDUNDANCY_SUBTRACTION_PASS / FOOTER_GENERIC_ENGLISH_CLEANUP_PASS / ACTUAL_SIZE_DATE_LEGIBILITY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-24
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Latest `main` observed immediately before this reconciliation: `c8dd1ba191f850c50b706b7d7f45d3e90565b1f8`

## Current live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- current visual family: Destination V4/V3 family promoted on 2026-08-21
- current production IMAGE fills: `0`
- previous archival print-grain master remains historical Drive evidence only; it is **not** a current Figma production dependency.

Canonical evidence:

- `FIGMA-DESTINATION-V4-FULL-FAMILY-PROMOTION-QA-2026-08-21.md`
- `FIGMA-FRANCE-TABLE-NUMBER-REDUNDANCY-QA-2026-08-24.md`
- `FIGMA-FOOTER-MICROTYPE-CLEANUP-QA-2026-08-24.md`

## Current family visual state

All eleven roots remain `1000×1480`, editable, and materially different in layout skeleton rather than being one color-swapped template. Semantic/factual copy remains native Figma text. The family intentionally uses no current raster IMAGE fills.

Current destination/table-number reading is item-specific:

- HAWAII `2:2`: `TABLE 01`
- ITALY `2:11`: `TABLE 02`
- FRANCE `2:20`: large `03`; duplicate top `TABLE 03` hidden after bounded QA
- SPAIN `2:29`: `TABLE 04`
- TAIWAN `2:38`: large `05`
- JAPAN `2:47`: `TABLE 06`
- HONG KONG `2:56`: `TABLE 07`
- SINGAPORE `2:65`: `TABLE 08`
- BALI `2:74`: `TABLE 09`
- KOREA `2:83`: `TABLE 10`
- MALDIVES `2:92`: `TABLE 11`

Do not mechanically hide `TABLE xx` labels across the family. A label may be removed only when another stronger cue already performs the same factual role and a rollback-safe comparison proves the subtraction improves the item.

## France table-number redundancy — 2026-08-24

Fresh whole-item review found `TABLE 03` and the large lower `03` competing as duplicate factual cues.

Rollback:

- `176:2 / ROLLBACK / ADD-02 FRANCE / PRE_TABLE03_REDUNDANCY_SUBTRACTION / 2026-08-24`

Adopted change:

- `173:67 / TEXT / TABLE NUMBER / TABLE 03` hidden
- `173:73 / DECOR / BIG NUMBER / 03` retained as the sole table-number cue

Three-scale QA PASS. Post-change France retains visible native text `6`, fixed-height `0`, IMAGE fill `0`.

## Generic footer / actual-size date cleanup — 2026-08-24

Fresh actual-size review found the tiny English `WEDDING JOURNEY` on HONG KONG / SINGAPORE / BALI / KOREA / MALDIVES. It had no real artifact, destination, function, instruction, or factual job and read as generic travel-theme filler.

The `SPEC.md` recommended format is `100 × 148 mm` for a `1000×1480` root. Physical-unit review also found several confirmed dates too small for a factual role. Bounded comparisons were created first on Singapore and Korea:

- `179:2 / QA / ADD-02 SINGAPORE / NO GENERIC FOOTER + DATE 26 / 2026-08-24`
- `179:23 / QA / ADD-02 KOREA / NO GENERIC FOOTER + DATE 26 / 2026-08-24`

Full hidden rollback roots before mutation:

- HONG KONG `180:2`
- SINGAPORE `180:19`
- BALI `180:40`
- KOREA `180:55`
- MALDIVES `180:74`
- HAWAII `182:2`
- ITALY `182:16`
- JAPAN `182:29`

Adopted Current state:

- HONG KONG `2:56`: `WEDDING JOURNEY` hidden; date stays `26 px`
- SINGAPORE `2:65`: filler hidden; date `19 → 26 px`
- BALI `2:74`: filler hidden; date `20 → 26 px`
- KOREA `2:83`: filler hidden; date `19 → 26 px`
- MALDIVES `2:92`: filler hidden; date `20 → 26 px`
- HAWAII `2:2`: date `22 → 26 px`
- ITALY `2:11`: date `22 → 26 px`
- JAPAN `2:47`: date `22 → 26 px`

FRANCE / SPAIN / TAIWAN were not mechanically normalized. Their current dates remain `24 / 23 / 24 px`; each has a different layout role and remains unchanged absent a screenshot-supported defect or physical proof.

Fresh screenshots PASS after repair for Singapore, Bali, Korea, Maldives, Hawaii, Italy and Japan. Hong Kong retained its already-credible 26 px date and only lost the generic footer.

Live post-change readback:

- HONG KONG / SINGAPORE / BALI / KOREA / MALDIVES: visible native text `6` each, fixed-height `0`, outside visible text `0`, IMAGE fills `0`, filler hidden, date `26 px`
- HAWAII / ITALY / JAPAN: visible native text `6` each, fixed-height `0`, outside visible text `0`, IMAGE fills `0`, date `26 px`, `textAutoResize=HEIGHT`

No destination name, Japanese label, table-number cue, theme/description role, fixed art, color or layout skeleton was changed.

This is an item-level application of already-promoted generic-English reader-job QA and actual-size factual-microtype QA. It is not a new rule to make all English/date treatments identical.

## Current structural gate

- all 11 production roots remain `1000×1480`
- all semantic/factual copy remains native/editable text
- current IMAGE fill count remains `0`
- no full-page flattening/raster replacement
- a functional table-number cue remains visible on every sign
- rollback/history/studies remain preserved
- destination-specific hierarchy remains item-specific rather than mechanically normalized

## Asset / Drive decision

Image generation: `0`.
Drive write: `0`.

The defects were duplicate hierarchy, generic decorative microcopy and actual-size factual typography—not missing photography, illustration or texture. No asset generation was justified.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final `[テーマ名]` / `[国テーマ説明]` copy
- exact stand/holder dimensions and obstruction proof
- vendor bleed/trim/safe-area template
- paper stock/profile and physical actual-size proof
- venue-lighting review of thin rules, pale fields and dark colors

Do not reopen healthy signs merely to create activity. Continue only when fresh screenshot evidence or a real finalization input exposes a concrete defect.