# ADD-06 フォトブースサイン — clean-room V6 dark wayfinding promotion QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / CLEANROOM_V6_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before Git write: `a0cfb9a425459c1c18b89072fe31d750796afbe4`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- page: `0:1 / ADD-06_PHOTO_BOOTH_SIGN`
- selected clean-room V6: `42:2 / CLEANROOM_ADD06_V6_SELECTED_DARK_WAYFINDING_POSTER_2026_08_20`
- hidden V6 long-copy stress: `43:2 / QA_ADD06_V6_LONG_COPY_STRESS_2026_08_20`
- pre-copy-flow rollback: `43:12 / ROLLBACK_ADD06_V6_PRE_COPY_FLOW_HARDENING_2026_08_20`
- retained former selected V3: `25:3`
- retained legacy production: `1:2`
- exact Drive authority re-read before authoring: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

This evidence supersedes the older `QA.md` selection line that still names V3 as selected. The older QA remains valid as structural/history evidence for V3 until the consolidated QA file is reconciled; no legacy node was deleted or visually reused.

## Why the visual pass was reopened

A fresh native screenshot of V3 showed a warm-ivory poster dominated by `BEST SHOT`, a simplified two-ring lens mark and a cyan footer. It remained structurally sound, but the large empty center field and target-like circular mark still read closer to a generic template/widget than a deliberately art-directed physical sign under the current reopened visual standard.

The correct response was not another V3 micro-polish. New directions were rebuilt from blank `990×1400` frames and used only verified facts/semantic requirements.

## Clean-room exploration

All new directions were authored without duplicating or visually referencing production/V2/V3 layouts, ornaments, vectors, crops, generated assets or image fills.

### V4 — rejected

- root: `41:2 / CLEANROOM_ADD06_V4_JAPANESE_EDITORIAL_POSTER_2026_08_20`
- bounded no-lens comparison: `41:14`
- result: materially different from V3, but the large lens arc still risked target/widget semantics; removing it made the center field too weak. Rejected and hidden.

### V5 — rejected

- root: `41:26 / CLEANROOM_ADD06_V5_JAPANESE_TYPE_POSTER_2026_08_20`
- rollback: `41:37`
- result: Japanese-first exhibition typography was clearer, but the cream middle field still depended too heavily on empty space. Rejected and hidden.

### V6 — selected

- root: `42:2`
- direction: dark physical wayfinding poster with one large mint flash/color field, Japanese-first title, restrained role label, fixed low-opacity `写真` semantic field and a compact date/location anchor.
- no lens/reticle, card, badge, shadow, gradient, fake credential, stock photo, generated image or Web-UI control treatment.

The V6 thumbnail read is stronger than V3 because the poster has a single high-contrast field rather than a sparse cream canvas with a target-like mark. Reading scale preserves a clear order: `フォトブース → 写真撮影はこちら → 撮影スペースへお進みください → 2026.10.24 → [会場内設置場所]`.

## Facts / constraints re-authored

Only non-visual authority was carried forward:

- physical working canvas: A3-equivalent `990×1400`;
- date: `2026.10.24`;
- location remains an unresolved native semantic placeholder: `[会場内設置場所]`;
- artifact role: photo-booth / photography wayfinding sign.

No venue floor, room name, direction arrow, distance, QR, couple identity, operating time or other unknown fact was invented.

## Hybrid authoring split

- variable/factual roles: native editable Figma text (`TEXT / DATE`, `TEXT / LOCATION PLACEHOLDER`);
- variable guidance role: native editable auto-height `TEXT / INSTRUCTION`;
- fixed semantic/art-direction typography: native text (`TEXT / FIXED SEMANTIC FIELD / 写真`);
- fixed flat graphics: editable native vector/rectangle roles (`DECOR / FLASH FIELD`, `VECTOR / INFORMATION RULE`);
- generated/composed raster assets: `0`;
- IMAGE fills: `0`;
- replaceable photography: not required for the selected direction;
- Drive writes: `0`.

Image generation was not used because the observed bottleneck was composition/hierarchy and false-premium emptiness, not missing photography or paper texture. No real-person image role was required.

## Three-scale visual QA

Fresh screenshots after final V6 flow hardening:

- whole-item / 500px: PASS — title, mint field and date anchor survive thumbnail reduction; no dashboard/card reading;
- reading / 1000px: PASS — Japanese-first hierarchy and dark/mint contrast remain coherent;
- actual-size / native `990×1400`: PASS — title, instruction, date and unresolved location placeholder remain legible and optically separated.

The final selected screenshot was taken after the redundant lower support line was removed; the three meaningful reader-facing information tiers remain sufficient without filler copy.

## Long-copy / structure QA

Stress root `43:2` uses materially longer native strings for both guidance and location roles. The selected and stress roles use auto-height native text.

Final selected readback:

- visible native text: `6`;
- IMAGE fills: `0`;
- proof/dummy language: `0`;
- location safe width: `450px` so a long location does not run under the fixed mint field;
- selected location height: `44px`;
- selected instruction height: `40px`.

Final long-copy stress readback:

- visible native text: `6`;
- IMAGE fills: `0`;
- proof/dummy language: `0`;
- long instruction height: `120px`;
- long location height: `88px`;
- no location/support collision after redundant support removal;
- stress remains contained within the physical root and was returned to hidden state after screenshot QA.

The oversized low-opacity fixed `写真` atmosphere role intentionally crosses the right trim and geometrically overlaps the instruction bounding region. It is a fixed decorative semantic field rendered behind the reader-facing copy, not variable content. Fresh screenshots show no visible glyph collision or legibility loss, so the deliberate crop/overprint is not treated as a variable-text overflow defect.

## Rollback / history

- former V3 and all legacy production remain intact;
- V4/V5 rejected studies are hidden, not deleted;
- V6 pre-flow-hardening rollback is hidden at `43:12`;
- V6 long-copy proof is hidden after verification;
- no prior production frame was used as the construction basis for V4/V5/V6.

## Decision

`CLEANROOM_V6_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

V6 is selected because it materially improves whole-item art direction over the retained V3 while preserving native editability and long-copy resilience. This is an item-specific visual promotion, not a new shared project rule.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final production inputs exist:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile, bleed/safe-area confirmation;
- physical print, contrast and venue-lighting proof.

No new shared-learning entry is promoted from this run. The existing clean-room, three-scale and actual-size text-resilience rules were sufficient.