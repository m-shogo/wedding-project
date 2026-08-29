# BOARDING PASS — V4 Clean-room Tide Signal

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CURRENT_SELECTED / LONG_COPY_STRESS_PASS / PRINT_SIZE_READABILITY_HARDENED / LEGACY_PRESERVED / NOT_PRINT_READY`

Latest promotion run start-main SHA: `0f7c9297cc24fd56c06bef4407b01f33c36f344d`; latest-main re-read before final Figma/Git writes: `e3fee562c347d9308162488ac47df6840b6cb454`.

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- image-generation-centered rule: `docs/design-learning/IMAGE-GENERATION-CENTERED-VISUAL-DESIGN-POLICY.md`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`
- V4 promoted page: `81:2 / CURRENT_V4_BOARDING_PASS_2026_08_28`
- Front: `81:3 / CURRENT V4 / BOARDING FRONT / TIDE SIGNAL`
- Back: `81:4 / CURRENT V4 / BOARDING BACK / TIDE SIGNAL`
- exact Drive authority live-confirmed: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- no Rurubu item-specific production content was read or modified

## Clean-room facts / constraints used

V4 was authored on a new blank page. Retained production/V2/V3/V5/vNext visual layouts, decorative vectors, color-field composition, guilloche, crops, badges, and prior generated assets were not used as construction input.

Only verified non-visual requirements were carried forward:

- physical escort-ticket role;
- frame size `1200×550`;
- detachable/perforated stub semantics;
- confirmed date `2026.10.24`;
- confirmed ceremony time `14:10`;
- confirmed place `YOKOHAMA`;
- native editable roles for guest name, table, reception/final guide, and couple names;
- no fake airline flight number/class/barcode/gate authority;
- no real-person / guest / child / dog AI generation.

## V4 art direction

Direction: `TIDE SIGNAL`.

The escort ticket is treated as a physical event-entry strip rather than airport cosplay: warm paper field, deep marine ink, functional detachable coral stub, shallow mineral tide field, restrained wave/register marks, and Japanese guest-first typography.

## Hybrid authoring split

- native editable text: all factual/variable/reader-facing copy;
- physical perforation/stub: simple editable native geometry;
- fixed atmospheric visual: editable composed SVG wave/register role;
- replaceable photography: `0` roles;
- raster IMAGE fills: `0`;
- variable text baked into fixed art: `0`.

## Composition

### Front `81:3`

- warm paper main field;
- right detachable coral stub with dark perforation guide;
- dominant Japanese headline `旅の席へ、ようこそ。`;
- native guest-name role immediately below;
- date / ceremony / table in one open information row;
- `YOKOHAMA` and `[受付場所・最終案内]` remain native;
- lower mineral tide field + composed contour/register fixed art;
- no fake flight credentials, class, barcode, scanner UI, dashboard cards, plane/stamp filler.

### Back `81:4`

- deep marine outer field;
- warm paper message field;
- quiet Japanese return-note hierarchy;
- native date/place/couple roles;
- coral edge + mineral lower tide field as physical family cues;
- no copied front grid or fake travel authority.

## FINAL MISSING ASSET LIST

Current result: `0` unresolved raster/image-generation roles.

The required fixed-art role is flat/geometric and is better served by editable composed SVG/native vector than raster generation. No missing photography, illustration, or background role justifies a generation batch. This is a deliberate hybrid-authoring decision, not an image-generation quota failure.

## Long-copy / stub stress — 2026-08-28

Temporary proofs were created only from the completed V4 itself, without mutating retained legacy:

- Front proof: `84:53 / QA PASS / V4 / BOARDING FRONT / LONG COPY STRESS`;
- Back proof: `84:92 / QA PASS / V4 / BOARDING BACK / LONG COPY STRESS`.

Both proofs are hidden after QA.

Stress included:

- long guest-name placeholder;
- longer table placeholder;
- longer reception/final-guide placeholder;
- longer back message;
- long bride/groom placeholders.

### Defects found and repaired

1. The original detachable stub was too narrow for a long guest role. Production `82:20 / AUTO / STUB / SEMANTIC INFO` was widened from `180` to `200`, moved to `x=975`, guest size reduced to `22`, table size to `26`, preserving actual-size readability while materially improving long-name resilience.
2. Back stress exposed the couple role falling beyond the warm paper field onto the dark background. `81:19 / COMPOSED PAPER / BACK MESSAGE FIELD` was extended from height `360` to `390`.
3. The back stack still ended too close to the tide foot under stress. `82:26 / AUTO / BACK / LETTER STACK` was shifted from `y=104` to `y=94` and item spacing tightened from `12` to `10`, preserving hierarchy while increasing bottom safety.

Post-repair stress screenshots show all stressed reader-facing content visible with no collision. The intentionally extreme table placeholder can wrap on the stub, but remains contained and readable; ordinary table assignments have substantially more margin.

## Print-first actual-size correction — 2026-08-29

The current V4 canvas remains `1200×550`. Under the established physical working scale this corresponds to `120×55 mm` (`10 Figma units = 1 mm`), so Figma font-size units convert to physical point size by approximately `px × 0.2835`.

A fresh print audit found several structurally valid but physically undersized critical roles:

- `DATE / CEREMONY / TABLE` labels at `15 px ≈ 4.25 pt`;
- guide/place/back-couple text at `18 px ≈ 5.10 pt`;
- back message at `20 px ≈ 5.67 pt`;
- stub guest at `22 px ≈ 6.24 pt`;
- critical date/time/table values at `24 px ≈ 6.80 pt`.

Those sizes are acceptable as screen microtype but too weak as dependable final wedding stationery information. Rather than adding decoration, the V4 production typography was increased while keeping the existing Auto Layout system.

Applied production changes:

- Front `81:3`
  - guest label `82:5`: `18 → 20 px`;
  - `DATE / CEREMONY / TABLE` labels `82:10,13,16`: `15 → 18 px` (`≈ 5.10 pt`);
  - corresponding values `82:11,14,17`: `24 → 28 px` (`≈ 7.94 pt`), line-height `36 px`;
  - `YOKOHAMA` `82:18`: `18 → 20 px`;
  - final guide `82:19`: `18 → 22 px` (`≈ 6.24 pt`), line-height `30 px`;
  - stub kicker `82:21`: `18 → 20 px`;
  - stub guest `82:22`: `22 → 26 px` (`≈ 7.37 pt`), line-height `36 px`;
  - stub table label `82:23`: `15 → 18 px`.
- Back `81:4`
  - kicker `82:27`: `18 → 20 px`;
  - message `82:29`: `20 → 24 px` (`≈ 6.80 pt`), line-height `36 px`;
  - date/place `82:31`: `19 → 22 px` (`≈ 6.24 pt`), line-height `28 px`;
  - couple role `82:32`: `18 → 22 px`, line-height `30 px`.

The same typography increases were applied to hidden long-copy proof roles `84:71,76,77,79,80,82,83,84,85,87,88,89,98,100,102,103` so the existing stress evidence remains representative of production rather than testing an easier smaller-text version.

Post-write live readback:

- Front `81:3`: no visible text outside `1200×550`; primary info Auto Layout expanded only `332 → 338 px`; detail row groups expanded `54 → 58 px`; stub stack `194 → 196 px`.
- Back `81:4`: no visible text outside frame; back letter stack expanded `311 → 325 px` and remains contained.
- Front long-copy proof `84:53`: visible text `17`, outside `0` after new print-size typography.
- Back long-copy proof `84:92`: visible text `5`, outside `0` after new print-size typography.
- raster IMAGE fills remain `0`; effective raster PPI is therefore `N/A` for this correction and no `RESOLUTION_WARNING` is introduced.
- thinnest current visible composed-vector strokes are `3 Figma units ≈ 0.3 mm`; still subject to printer/ink/profile proof before final approval.

This correction improves physical readability but does not resolve vendor perforation tolerance, trim/safe placement around the detachable stub, CMYK conversion, stock/finishing, PDF preflight, overprint/knockout, or physical tear/attachment behavior. `DESIGN_COMPLETE != PRINT_READY` remains enforced.

## Three-scale / actual-size visual QA

Front and Back were reviewed at thumbnail/reading scale and native `1200×550` actual canvas size after the fixes.

- Front: headline → guest → date/time/table → final guide → detachable stub remains immediate; fixed tide art stays subordinate.
- Back: headline → message → date/place → couple remains readable; paper field and tide foot no longer swallow long copy.
- no equal-card/dashboard grammar;
- no fake airport credentials;
- no filler imagery or generic airplane/stamp language.

## Structure QA

Final live readback:

- Front `81:3`: visible native text `17` / fixed-height text `0` / outside visible text `0` / IMAGE fills `0` / `clipsContent=true`;
- Back `81:4`: visible native text `5` / fixed-height text `0` / outside visible text `0` / IMAGE fills `0` / `clipsContent=true`;
- Front stress `84:53`: outside visible text `0` after print-size correction;
- Back stress `84:92`: outside visible text `0` after print-size correction;
- page-wide flattening: `0`.

## Completion-only legacy comparison

Only after V4 stress/structure/actual-size QA had matured was the retained selected family opened for comparison:

- retained Front `39:22`;
- retained Back `41:2`.

Decision:

- retained Front remains a strong rollback artifact, but V4 has clearer physical detachable-ticket identity and stronger guest-first hierarchy without fake transport credentials;
- retained Back is elegant but more generic as a standalone editorial card; V4 Back has stronger physical/material continuity with the selected Front;
- V4 therefore wins as the combined front/back family and is promoted without deleting or overwriting retained history.

## Drive / asset state

Drive authority was live-read back as folder `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`.

- generated raster imagery this refinement: `0`;
- Drive writes this refinement: `0`;
- no missing adopted raster master exists to upload;
- fixed graphics remain editable in Figma.

## Learning

`VERIFIED_LOCAL`:

- detachable-stub typography needs its own stress boundary; passing the main ticket body is insufficient;
- Auto Layout can successfully absorb long copy while a separate background/material field still fails, so stress QA must inspect both text containment and the visual surface behind expanded text;
- extending the physical paper field plus tightening vertical rhythm was superior to shrinking body copy;
- no-image generation is the correct result when screenshot evidence points to containment and typography rather than a missing visual asset;
- small-ticket structural PASS can conceal 4–6 pt-equivalent critical text; point-equivalent actual-size audit is required before treating readability as print evidence;
- hidden stress proofs must be kept typography-equivalent to production after print-size changes or their PASS becomes stale.

## Deferred / next

Keep `NOT_PRINT_READY` until final guest/table/guide values, vendor perforation tolerances, exact trim/bleed/safe template, paper stock, printer profile, PDF preflight, overprint/knockout/transparency checks, finishing, and 100%/physical proof exist.

BOARDING PASS V4 remains selected at `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRINT_SIZE_READABILITY_HARDENED / NOT_PRINT_READY`.

Next target: `青春ふたりきっぷ` print-first re-audit from its current V4 authority, using facts/constraints only and without visual reuse from retained production.
