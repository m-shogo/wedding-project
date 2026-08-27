# BOARDING PASS — V4 Clean-room Tide Signal

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CURRENT_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Latest promotion run start-main SHA: `0f7c9297cc24fd56c06bef4407b01f33c36f344d`; latest-main re-read before final Figma/Git writes: `530024bf35392692f488d4e5230c1414012357cb`.

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
- Front stress `84:53`: outside visible text `0`;
- Back stress `84:92`: outside visible text `0`;
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
- no-image generation is the correct result when screenshot evidence points to containment and typography rather than a missing visual asset.

## Deferred / next

Keep `NOT_PRINT_READY` until final guest/table/guide values, vendor perforation tolerances, paper stock, printer profile, finishing, and physical proof exist.

BOARDING PASS V4 is now selected at `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

Next clean-room V4 target: `青春ふたりきっぷ`, from a blank frame using facts/constraints only and without visual reuse from retained production.
