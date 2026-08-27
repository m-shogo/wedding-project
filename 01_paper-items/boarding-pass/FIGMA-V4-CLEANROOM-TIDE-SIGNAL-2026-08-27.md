# BOARDING PASS — V4 Clean-room Tide Signal

State: `V4_CLEANROOM_CREATED / VISUAL_QA_IN_PROGRESS / STRUCTURE_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`

Run start latest-main SHA: `3ba69c2cde4e5c5e142cb4979ed9107d267d4dfe`

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- image-generation-centered rule: `docs/design-learning/IMAGE-GENERATION-CENTERED-VISUAL-DESIGN-POLICY.md`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`
- V4 page: `81:2 / V4_CLEANROOM_BOARDING_2026_08_27`
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

The new direction treats the escort ticket as a physical event-entry strip rather than airport cosplay. It uses a warm paper field, deep marine ink, a functional detachable coral stub, a shallow mineral tide field, restrained wave/register marks, and strong Japanese guest-first typography.

Current production-study roots:

- `81:3 / V4 / BOARDING FRONT / TIDE SIGNAL / CLEANROOM`
- `81:4 / V4 / BOARDING BACK / TIDE SIGNAL / CLEANROOM`

## Hybrid authoring split

- native editable text: all factual/variable/reader-facing copy;
- physical perforation/stub: simple editable native geometry;
- fixed atmospheric visual: editable composed SVG wave/register role;
- replaceable photography: `0` roles in this direction;
- raster IMAGE fills: `0`;
- variable text baked into fixed art: `0`.

## Initial V4 composition

### Front

- warm paper main field;
- right detachable coral stub with dark perforation guide;
- Japanese headline `旅の席へ、ようこそ。` as the dominant read;
- native guest-name role immediately below;
- date / ceremony / table information in one open horizontal event row;
- `YOKOHAMA` and `[受付場所・最終案内]` remain native text;
- lower mineral tide field + composed contour/register fixed art;
- no fake flight credentials, class, barcode, scanner UI, or dashboard cards.

### Back

- deep marine outer field;
- warm paper message field;
- quiet Japanese return-note hierarchy;
- native date/place and couple roles;
- coral edge + mineral lower tide field as physical family cues;
- no copied front card grid or fake travel authority.

## First screenshot QA

The first Front screenshot exposed unintended white fills on all newly created Auto Layout containers. This was treated as an implementation defect, not accepted as design.

The first attempted fix referenced one incorrect node ID and failed atomically; no canvas mutation occurred. Live structure was then inspected, the exact Auto Layout IDs were identified, and the method was corrected rather than blindly retried.

Final affected Auto Layout containers had their default fills removed:

- `82:2 / AUTO / FRONT / PRIMARY INFO`
- `82:8 / AUTO / FRONT / EVENT DETAILS`
- `82:9 / AUTO / DETAIL / DATE`
- `82:12 / AUTO / DETAIL / CEREMONY`
- `82:15 / AUTO / DETAIL / TABLE`
- `82:20 / AUTO / STUB / SEMANTIC INFO`
- `82:26 / AUTO / BACK / LETTER STACK`

Fresh post-fix screenshots show the intended paper/material fields again.

## Visual QA result

Current V4 study:

- Front: readable whole-item hierarchy; headline → guest → event information → physical stub is immediate; tide art stays secondary;
- Back: clearly calmer than Front and reads as one continuous ticket reverse rather than a repeated front layout;
- no obvious equal-card/dashboard grammar;
- no fake airport credentials or generic plane/stamp decoration.

This is a strong initial V4 direction but is **not promoted yet**. Long-copy/stub stress and further actual-size refinement still remain.

## FINAL MISSING ASSET LIST

Current result: `0` unresolved raster/image-generation roles.

The visual role currently needed is flat, geometric, and useful as editable composed SVG. No missing photography/illustration/background role justifies a raster generation batch at this stage. This is an explicit hybrid-authoring decision, not an image-generation quota failure.

## Structure QA

Live readback after repair:

- Front `81:3`: native visible text `17` / fixed-height `0` / outside visible text `0` / IMAGE fills `0`;
- Back `81:4`: native visible text `5` / fixed-height `0` / outside visible text `0` / IMAGE fills `0`;
- page-wide flattening: `0`.

## Learning

`OBSERVED → TESTED_LOCAL`:

- new Auto Layout containers can introduce default fills that visually flatten an otherwise paper-led composition; screenshot QA must catch container-surface leakage before the design is judged;
- when a Figma mutation fails atomically because of a stale/wrong node ID, inspect exact live types/IDs before one corrected retry rather than repeating the same script.

## Deferred / next

Keep `NOT_PRINT_READY` until final guest/table/guide values, vendor perforation tolerances, stock, printer profile, finishing, and physical proof exist.

Next V4 task:

1. run realistic long guest-name / table / guide / back-message stress;
2. inspect actual-size detail and physical-stub readability;
3. refine only screenshot-supported V4 defects;
4. keep retained Current unopened for visual comparison until V4 is mature;
5. promote only if mature V4 clearly beats retained Current.
