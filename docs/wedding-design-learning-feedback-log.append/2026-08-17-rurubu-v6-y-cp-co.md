# Rurubu V6 visual learning feedback — Y + CP/CO

Date: 2026-08-17
Scope: Rurubu WEDDING only

## Observation

After CN/CM, the remaining visible weakness was not missing decoration. The chronology had crossing reading paths between major photo events and minor facts, and the Profile lower photo cluster still floated on cream despite having strong photos and native captions.

## Hypotheses tested

1. Chronology: spatially separate minor facts from major photographic events instead of solving hierarchy only with font-size differences.
2. Profile: bind an already-correct photo cluster with one bounded low-opacity composed texture instead of adding cards or flattening the section.

## Tests and results

### CO chronology — adopted

- CM duplicated rollback-safe to CO `1566:2`.
- 02/04 moved to a narrow quiet notes rail.
- 01/03/05 remain major photo beats in the main field.
- redundant crossing rules hidden.
- headline fit corrected; Event 03 safe-area correction made after QA.
- 1200px spread and 794×1123 actual-size PASS.
- text collisions 0; 18px safe risks 0; image intrinsic violations 0.

Expected improvement: clearer editorial route and less timeline/UI reading.
Regression risk: rail could become a web sidebar if made too strong. Final treatment remains quiet and subordinate.

### CP Profile — adopted after correction

- CN duplicated rollback-safe to CP `1567:18`.
- one existing Rurubu composed travel texture placed only behind the lower three-photo cluster at opacity 0.16.
- first `770×430` texture size failed intrinsic-width QA against `720×860` source and was corrected to `720×430` before adoption.
- 500px thumbnail and 794×1123 Profile actual-size PASS.
- text collisions 0; 18px safe risks 0; all photo/image roles intrinsic-safe.

Expected improvement: lower snapshots read as one magazine scene rather than floating cards.
Regression risk: excessive texture opacity/coverage would become decoration noise or a fake container.

## Final live state

- Outer Y `1542:2` retained;
- Profile/Q&A CP `1567:18` preferred;
- Story/Chronology CO `1566:2` preferred;
- Start Here: `V5 FU/FX · V6 Y + CP/CO INSIDE STUDIES · V7 HOLD`;
- CN `1562:2` and CM `1559:2` preserved hidden as immediate rollbacks.

## Asset lifecycle

- new ImageGen: 0;
- new Drive saves: 0;
- new external binary placement: 0;
- new raster bytes: 0;
- existing composed raster reused in a new bounded role: yes;
- native variable text preserved: yes;
- replaceable photo roles preserved: yes;
- generated section masters remain Drive-verified and unadopted.

## Learning states

- RSL-068: major-photo / minor-notes spatial separation — `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-069: bounded composed texture as photo-cluster binder — `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific layout, texture, palette, photo choices and editorial grammar must not transfer literally to other Wedding items.
