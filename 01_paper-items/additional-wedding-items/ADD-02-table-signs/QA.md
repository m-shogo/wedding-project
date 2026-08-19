# ADD-02 — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / FRANCE_ARCH_SIMPLIFICATION_PASS / BALI_GATE_SIMPLIFICATION_PASS / TAIWAN_GRID_SUBTRACTION_PASS / HONG_KONG_HARBOR_RULER_SUBTRACTION_PASS / SINGAPORE_CHART_BAR_SUBTRACTION_PASS / KOREA_FOLD_RULER_SUBTRACTION_PASS / MALDIVES_WATER_RULER_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Latest `main` observed before this reconciliation: `85847ced7af372a3d003141ea78b60a5455c5f90`

## Current live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- current Drive master: `1x4N7LUsJiPI93hU__BA8WYnasDw9QNT7 / ADD-02_ARCHIVAL_PRINT_GRAIN_MASTER_v1.png`

All eleven retained production roots remain intact as the current selected family. Historical clean-room V5–V14 studies remain comparison/history only unless explicitly promoted by later evidence. The separate photo-led V14 experiment remains blocked and must not be treated as placed/adopted production.

## Current family visual state

The eleven signs remain materially different rather than one layout with flag/color swaps. Country title, Japanese country label, semantic country-description placeholder and large table number remain native editable text. Each current sign retains one replaceable tiled print-grain IMAGE role; variable/factual copy is not baked into raster/SVG.

Previously verified family-level polish remains active:

- redundant top `TABLE 01`–`TABLE 11` labels removed;
- guest-facing `LAYOUT DUMMY / QA / PROOF` suffixes removed while semantic placeholders remain;
- unsupported art-direction descriptors removed from guest-facing output where they had no reader-facing job;
- Hawaii / Japan badge-like contour containment and Italy orphan lower rule were removed only after bounded comparison;
- France now retains two architectural arch outlines rather than four repeated echoes;
- Bali now retains two outer split-gate pairs rather than four stepped pairs;
- print grain remains a tiled `256×256` role rather than a stretched low-resolution hero.

## 2026-08-19 bounded fixed-art subtraction

Fresh whole-item review found several country signs where repeated construction marks read as chart/form/UI scaffolding rather than destination print art. Each was tested independently; other countries were not mechanically changed for uniformity.

### France `2:20`

Four offset `FR_ARCH_RULE_*` outlines in the upper navy field carried the architectural idea too far: the first two established the window/arch cue, while the third and fourth read as repeated UI/scaffold echoes.

- comparison: `107:26 / QA / ADD-02 FRANCE / TWO ARCHES / 2026-08-19`;
- rollback: `108:2 / ROLLBACK / ADD-02 FRANCE / PRE_ARCH_SIMPLIFICATION / 2026-08-19`;
- adopted: hide `FR_ARCH_RULE_3 / FR_ARCH_RULE_4` only;
- retained: `FR_ARCH_RULE_1 / FR_ARCH_RULE_2`, navy/ivory fields, red register, horizon rule, all native text and print grain.

Fresh QA: whole ~500px PASS; reading ~1000px PASS; actual canvas `1000×1480`; visible native text `4`; IMAGE fills `1`; outside text `0`; visible text collisions `0`.

Evidence: `FIGMA-FRANCE-ARCH-SIMPLIFICATION-QA-2026-08-19.md`.

### Bali `2:74`

Eight stepped `BA_GATE_L/R_0`–`BA_GATE_L/R_3` bars around the central gap read partly as an audio equalizer / dashboard glyph instead of split-gate architecture.

Two comparisons were tested:

- `106:2`: keep only the outermost gate pair — rejected because the field became too empty and lost useful architectural depth;
- `106:26`: keep the two outer gate pairs and remove the two innermost pairs — adopted.

- rollback: `107:2 / ROLLBACK / ADD-02 BALI / PRE_GATE_SIMPLIFICATION / 2026-08-19`;
- adopted: hide `BA_GATE_L/R_2` and `BA_GATE_L/R_3` only;
- retained: `BA_GATE_L/R_0`, `BA_GATE_L/R_1`, clay/black fields, ochre sun, country/Japanese labels, semantic note, large `09`, lower register and print grain.

Fresh QA: whole ~500px PASS; reading ~1000px PASS; actual canvas `1000×1480`; visible native text `4`; IMAGE fills `1`; outside text `0`. A numeric note/number text-box overlap remains in bounds, but fresh screenshots show no visible glyph collision, so optical spacing was not damaged merely to satisfy bounding-box math.

Evidence: `FIGMA-BALI-GATE-SIMPLIFICATION-QA-2026-08-19.md`.

### Taiwan `2:38`

Nine `TW_GRID_H_* / TW_GRID_V_*` lines combined with fixed amber/cinnabar blocks to read like a bar-chart/dashboard grid.

- comparison: `95:2 / QA / ADD-02 TAIWAN / NO CHART GRID / 2026-08-19`;
- rollback: `96:2 / ROLLBACK / ADD-02 TAIWAN / PRE_GRID_SUBTRACTION / 2026-08-19`;
- adopted: hide only the nine grid lines;
- retained: country title, Japanese label, semantic note placeholder, large `05`, fixed blocks, route cut and print grain.

Fresh QA: `1000×1480`, visible native text `4`, IMAGE fills `1`, outside text `0`; whole 500px and actual-size PASS.

Evidence: `FIGMA-TAIWAN-GRID-SUBTRACTION-QA-2026-08-19.md`.

### Hong Kong `2:56`

Five cyan `HK_HARBOR_H_*` rules directly under the two tower/window blocks read like chart grid lines.

Two comparisons were tested:

- `97:2`: hide only harbor horizontal ruler;
- `97:30`: hide harbor ruler plus tower vertical scaffold.

The more aggressive scaffold removal added no visible benefit, so only the five harbor lines were adopted.

- rollback: `98:2 / ROLLBACK / ADD-02 HONG KONG / PRE_HARBOR_RULER_SUBTRACTION / 2026-08-19`;
- tower structure, fixed blocks, country/Japanese labels, semantic note, large `07`, lower rule and print grain remain.

Fresh QA: `1000×1480`, visible native text `4`, IMAGE fills `1`, outside text `0`; whole 500px and actual-size PASS.

Evidence: `FIGMA-HONG-KONG-HARBOR-RULER-SUBTRACTION-QA-2026-08-19.md`.

### Singapore `2:65`

Four equally spaced `SG_ARCH_BLOCK_*` bars in the jade upper field read like a bar chart/dashboard more than destination print art. The field split, country title and botanical ellipse/stem already carried the composition.

- comparison: `101:2 / QA / ADD-02 SINGAPORE / NO CHART BARS / 2026-08-19`;
- rollback: `102:2 / ROLLBACK / ADD-02 SINGAPORE / PRE_CHART_BAR_SUBTRACTION / 2026-08-19`;
- adopted: hide `SG_ARCH_BLOCK_1`–`SG_ARCH_BLOCK_4` only;
- retained: dark/jade/sand fields, botanical arc/stem, country/Japanese labels, semantic note, large `08` and print grain.

Fresh QA: whole 500px PASS; actual-size `1000×1480` PASS; visible native text `4`; IMAGE fills `1`; outside text `0`; text collisions `0`.

Evidence: `FIGMA-SINGAPORE-CHART-BAR-SUBTRACTION-QA-2026-08-19.md`.

### Korea `2:83`

Five equally spaced `KR_FOLD_*` rules above/into the Korean-name area read as ruled form fields rather than a meaningful fold or physical print boundary.

- comparison: `99:2 / QA / ADD-02 KOREA / NO REPEATED FOLD RULER / 2026-08-19`;
- rollback: `99:24 / ROLLBACK / ADD-02 KOREA / PRE_FOLD_RULER_SUBTRACTION / 2026-08-19`;
- adopted: hide only `KR_FOLD_1`–`KR_FOLD_5`;
- retained: blue/red/ink block construction, diagonal cut, country/Japanese labels, semantic note, large `10`, bottom blue/red rule and print grain.

Fresh QA: `1000×1480`, visible native text `4`, IMAGE fills `1`, outside text `0`, visible text intersections `0`; whole 500px and actual-size PASS.

Evidence: `FIGMA-KOREA-FOLD-RULER-SUBTRACTION-QA-2026-08-19.md`.

### Maldives `2:92`

Six evenly spaced `MV_WATER_1`–`MV_WATER_6` rules filled the deep-water band like a ruled ledger/form rather than water.

Two comparisons were tested:

- `103:2`: keep three alternating water rules plus the existing current line;
- `103:24`: remove all six equal water rules and retain only the existing `MV_DIAGONAL_CURRENT` line.

The partial reduction still read as a ruler; the single-current version was stronger and was adopted.

- rollback: `104:2 / ROLLBACK / ADD-02 MALDIVES / PRE_WATER_RULER_SUBTRACTION / 2026-08-19`;
- adopted: hide `MV_WATER_1`–`MV_WATER_6`;
- retained: current line, sky/deep-water/sand fields, coral disc, country/Japanese labels, semantic note, large `11`, register and print grain.

Fresh QA: actual-size `1000×1480` PASS; visible native text `4`; IMAGE fills `1`; outside text `0`. A numeric note/number text-box overlap remains in geometry, but the fresh screenshot shows no visible glyph collision, so the optical layout was not damaged merely to satisfy bounding-box math.

Evidence: `FIGMA-MALDIVES-WATER-RULER-SUBTRACTION-QA-2026-08-19.md`.

## Structural / visual gate

Current verified invariants:

- all 11 roots remain `1000×1480` and editable;
- one visible print-grain IMAGE role per sign;
- large table numbers remain intact and immediately scannable;
- semantic country-description placeholders remain native text;
- text outside each audited root: `0`;
- no full-page flattening/raster replacement;
- all fresh comparisons/rollbacks are hidden after QA;
- other country art was not mechanically changed merely to make the family uniform.

Numeric text-box intersections may exist on some signs where the large table-number box overlaps the note box region, but actual screenshots must show visible glyph collision before geometry is changed. Do not damage good optical spacing based on bounds alone.

## Asset / Drive decision

Image generation in the 2026-08-19 polish: `0`.
Drive write: `0`.

The observed defects were excessive native chart/form/equalizer/scaffold repetition, not missing imagery. Existing print grain remains unchanged.

The separate Hawaii V14 photo-led method remains a truthful blocker: do not repeat the previously failed shell/DNS or unsupported `createImageAsync` ingestion paths unless the environment/capability materially changes.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final country-description copy;
- exact stand/holder dimensions and obstruction proof;
- vendor bleed/safe-area template;
- stock/profile and physical actual-size print proof;
- thin-rule/dark-navy/pale-aqua behavior under venue lighting.

Do not reopen healthy country signs for cosmetic uniformity. Continue only when a fresh screenshot exposes a concrete item-specific defect.