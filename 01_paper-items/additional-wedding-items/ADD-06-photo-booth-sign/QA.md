# ADD-06 フォトブースサイン — QA

Status: `CURRENT / CLEANROOM_V6_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / V3_AND_LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- page: `0:1 / ADD-06_PHOTO_BOOTH_SIGN`
- selected clean-room V6: `42:2 / CLEANROOM_ADD06_V6_SELECTED_DARK_WAYFINDING_POSTER_2026_08_20`
- V6 long-copy proof: `43:2 / QA_ADD06_V6_LONG_COPY_STRESS_2026_08_20` — hidden after QA
- V6 pre-flow-hardening rollback: `43:12` — hidden
- rejected clean-room V4/V5 studies remain hidden/preserved
- former selected V3 preserved: `25:3`
- retained clean-room V2 comparison: `23:3`
- retained legacy production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

Current selection evidence: `FIGMA-CLEANROOM-V6-DARK-WAYFINDING-PROMOTION-QA-2026-08-20.md`.

The previous `QA.md` selection line still named V3 even though V6 had already been promoted by item-specific evidence. This file is now reconciled to the live selected V6; no Figma design was changed during this reconciliation.

## Current visual direction

V6 is a dark Japanese-first physical wayfinding poster rather than a sparse cream poster with a lens/target motif.

Current reading hierarchy:

1. `写真撮影はこちら`;
2. `フォトブース` role label;
3. native guidance `撮影スペースへお進みください`;
4. date `2026.10.24`;
5. unresolved native location placeholder `[会場内設置場所]`.

Fixed visual support is limited to a large mint flash/color field, low-opacity fixed `写真` semantic typography and one compact information rule. There is no lens/reticle, card grid, badge, shadow, gradient, fake credential, stock photo or generated-image filler.

## Clean-room history

V4, V5 and V6 were built from blank `990×1400` frames using only verified non-visual facts/semantic requirements.

- V4 rejected: lens/arc treatment still risked target/widget semantics; no-lens comparison became too weak.
- V5 rejected: Japanese-first typography improved, but the cream middle field still relied too heavily on empty space.
- V6 selected: one high-contrast dark/mint field materially improved whole-item silhouette and wayfinding hierarchy.

Former V3 and legacy remain intact as rollback/history and were not construction ingredients for V6.

## Fresh live visual revalidation — 2026-08-20

The selected V6 was re-read live after the ADD-04/ADD-05 progression and the stale QA mismatch was discovered.

Fresh screenshots:

- whole-item / ~500 px: PASS;
- reading / ~1000 px: PASS;
- existing native `990×1400` and long-copy evidence remains valid.

The live 500px screenshot still has a strong first read: large Japanese photo guidance, one dominant mint field, compact date/location anchor and no dashboard/card semantics. The 1000px screenshot confirms the instruction and placeholder remain legible over the fixed low-opacity semantic field.

No fresh screenshot exposed a visual defect requiring V7 or image generation.

## Structure / long-copy QA

Existing V6 evidence remains the current structural authority:

- selected visible native text `6`;
- IMAGE fills `0`;
- proof/dummy language `0`;
- location safe width `450px`;
- selected location height `44px`;
- selected instruction height `40px`;
- long-copy instruction height `120px`;
- long-copy location height `88px`;
- stress proof remains contained and hidden after QA.

The oversized low-opacity fixed `写真` role may geometrically cross the instruction region, but it is a deliberately backgrounded fixed semantic field. Fresh screenshots show no visible glyph collision or reader-facing legibility loss.

Variable date/location/guidance remains native editable text. No variable copy is baked into raster/SVG.

## Hybrid authoring / asset decision

- variable/factual text: native editable Figma text;
- fixed semantic typography: native text;
- fixed flat graphics: editable native vector/rectangle roles;
- generated/composed raster: `0`;
- IMAGE fills: `0`;
- replaceable photo role: not required.

`IMAGE_GENERATION_NOT_REQUIRED`: the selected direction already solves the composition/hierarchy problem without decorative photography or texture.

Drive authority was live-read during this reconciliation and confirmed as `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`. Drive write `0`.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

Do not reopen V6 for cosmetic churn unless a fresh screenshot, physical proof or authoritative input exposes a concrete defect. Next progression target: `ADD-07`.
