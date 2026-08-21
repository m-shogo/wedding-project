# ADD-07 エスコートカード案内ボード — QA

Status: `CURRENT / FAMILY_DIVERSITY_PROMOTED_A2_A3 / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / A3_INDEPENDENT_REFLOW_PASS / PREVIOUS_SUNRISE_V2_LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-22
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- Current A2: `32:2 / CURRENT / ADD-07 / A2 / HANGING CARD RACK / FAMILY-DIVERSE 2026-08-21` — `1400×1980`
- Current A3: `32:16 / CURRENT / ADD-07 / A3 / HANGING CARD RACK / FAMILY-DIVERSE 2026-08-21` — `990×1400`
- family-diversity study page: `35:2 / FAMILY_DIVERSITY / ADD-07 ESCORT GUIDE / 2026-08-21`
- mature clean-room A2 candidate retained: `36:48`
- mature clean-room A3 candidate retained: `36:71`
- hidden long-copy proofs: `36:94 / 36:117`
- previous SUNRISE DISCOVERY A2/A3 preserved hidden: `38:2 / 38:38`
- previous V2 preserved: `14:3 / 14:25`
- retained legacy A2/A3 preserved: `1:2 / 1:17`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`

Current evidence:

- `JAPANESE-FOOTER-LINEBREAK-QA-2026-08-22.md`
- `FAMILY-DIVERSITY-HANGING-CARD-RACK-PROMOTION-QA-2026-08-21.md`
- prior professional-vNext evidence retained: `PROFESSIONAL-VNEXT-SUNRISE-DISCOVERY-QA-2026-08-21.md`

## Current direction — HANGING CARD RACK

Family-scale audit found that SUNRISE DISCOVERY, while individually strong, repeated a suite-level dominant grammar of navy spine + oversized coral disc + lagoon rounded sweep.

A new clean-room pass used only verified A2/A3 dimensions and semantic requirements. Three blank-frame studies were authored without copying the current/legacy visual construction:

1. `35:3 / INDEX TAB JOURNEY`
2. `35:18 / PICKUP PEGBOARD`
3. `35:36 / FOLDOUT MAP STEPS`

`PICKUP PEGBOARD` was selected and then rebuilt as a full-size `HANGING CARD RACK` A2/A3 family. The item now derives its identity from the actual guest action: finding and taking a physical escort card.

Current visual grammar:

- deep-plum display field;
- one thin hanging rail;
- three cream hanging card objects with holes/threads;
- coral/yellow/lagoon used only as step-number accents;
- large Japanese instruction above;
- date/place and a small next-step footer below.

No giant orb/capsule/sweep, route nodes, fake airline semantics, scanner UI, badge, generated people, or stock photography.

## Three-scale visual QA

A2:

- whole-item / thumbnail: PASS;
- reading scale: PASS;
- actual `1400×1980` render: PASS;
- post-promotion stable-root screenshot: PASS;
- post-2026-08-22 semantic-footer repair actual-size screenshot: PASS.

A3:

- whole-item: PASS;
- reading scale: PASS;
- actual `990×1400`: PASS;
- independent reflow: PASS.

Professional Design Council score: `93/100`; no Executive Creative Director, Japanese Editorial Designer or Print Production Director veto.

## 2026-08-22 A2 Japanese semantic line-break repair

Live screenshot review caught a typographic defect that structure checks did not: A2 footer `カードを見つけたら、次の場所へ。` wrapped with isolated `へ。` on the second line.

Bounded repair:

- Current A2 footer `38:37` and hidden A2 stress footer `36:116` changed only to native semantic lines `カードを見つけたら、\n次の場所へ。`;
- type remains `Noto Sans JP Medium 28px / 42px`, width `410`, height `84`, `textAutoResize=HEIGHT`;
- no font shrink, geometry change, new asset, container or decoration;
- A2 whole/reading/actual-size screenshot: PASS;
- A3 was separately re-audited and intentionally left unchanged because its footer already reads naturally on one line.

This is a `VERIFIED_LOCAL` receiving-item application of the already-promoted Japanese semantic line-break rule. It does not create a new shared rule.

## Structure / long-copy QA

Stress expanded title, lead and all three step phrases. Initial title/lead collision was fixed by widening the title measure and increasing the header-to-card-rack vertical gap rather than shrinking the title.

Final A2 stress:

- outside text `0`;
- collisions `0`;
- long lead bottom `900`;
- longest step bottom `1459`;
- footer bottom `1849`;
- root bottom `1980`.

Final A3 stress:

- outside text `0`;
- collisions `0`;
- long lead bottom `629`;
- longest step bottom `1052`;
- footer bottom `1277`;
- root bottom `1400`.

Selected family:

- semantic/factual copy remains native editable Figma text;
- visible text uses `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- variable information baked into fixed art `0`.

Stress proofs are hidden after QA.

## Hybrid authoring / asset decision

- semantic/factual copy: native editable Figma text;
- fixed visual support: simple native paper/card/rail geometry with physical meaning;
- SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: family-scale abstract-shape repetition was the defect. A physical escort-card rack solves it more directly than decorative travel/Hawaii imagery and keeps the instruction clear. The 2026-08-22 repair was typography-only and likewise did not justify generation.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final card-placement operation and wording;
- final A2/A3 installation choice;
- printer stock/profile, trim/bleed and safe-area proof;
- physical A2/A3 output proof;
- installation height/easel lip and 2–4m viewing-distance check;
- venue lighting/background contrast.

## Next

Family-scale audit `ADD-08 メニュー補助サイン`. Rebuild only if a material dominant-grammar duplication remains; do not redesign solely for activity.