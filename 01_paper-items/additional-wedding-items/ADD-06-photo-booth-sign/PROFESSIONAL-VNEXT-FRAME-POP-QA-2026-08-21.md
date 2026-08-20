# ADD-06 フォトブースサイン — Professional vNext `FRAME POP` QA

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_SELECTED / LONG_COPY_STRESS_PASS / PREVIOUS_V6_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `d0da107f909a05661b2fe6b96fa1ff668aa00525`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- professional bar: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Clean-room brief

Emotional brief: **遠くからでも一瞬でフォトブースだと分かり、近づくほど“写真を撮って遊びたい”気分になる、会場の楽しい寄り道。**

Only verified non-visual requirements were used before authoring:

- A3 portrait working canvas `990×1400`;
- current semantic hierarchy: `写真撮影はこちら` / `フォトブース` / guidance / date / location placeholder;
- date `2026.10.24`;
- unresolved location remains `[会場内設置場所]` native text.

No V6/V3/legacy layout, flash field, large fixed `写真`, rule, crop or asset was used as the vNext authoring base.

## Three blank-frame directions

New page:

- `44:2 / VNEXT_PRO / ADD-06 PHOTO BOOTH / SNAP & SMILE / 2026-08-21`

Three materially different studies:

1. `44:3 / FLASH LANDING` — cream poster, giant cropped yellow light + lagoon/coral motion.
2. `44:12 / FRAME POP` — deep-ocean hero band + asymmetric coral/lagoon edge fields + yellow sun.
3. `44:22 / SNAP WAVE` — dark poster with large sunlight/lagoon waves.

Council critique:

- `FLASH LANDING`: strong first read, but the large lagoon gesture visibly crossed the instruction line; rejected rather than cosmetically patched.
- `SNAP WAVE`: energetic, but the dark field plus oversized wave treatment moved closer to the already-established dark-wayfinding territory and made the main text/window relationship more fragile.
- `FRAME POP`: clearest step forward for the new brief — bright, playful, immediate, Japanese-first and materially lighter than the retained dark family while preserving physical wayfinding clarity.

Selected direction: `FRAME POP`.

## Selected professional vNext

- `45:2 / SELECTED PROFESSIONAL VNEXT / ADD-06 / FRAME POP WAYFINDING`
- canvas: `990×1400`

Art direction:

- deep-ocean top field carries oversized native `写真撮影はこちら`;
- `フォトブース` becomes the immediate second read on warm cream;
- one coral left celebration field, one lagoon right field and one yellow sun create playful photographic energy through scale/crop, not camera UI;
- guide/date/location remain in a calm reading lane;
- no lens reticle, scanner marks, fake viewfinder, photo-frame UI, badge, route, plane, shadow, gradient or stock/generated photography.

## Three-scale visual QA

Selected `45:2`:

- whole-item / ~500px: PASS — photo guidance and booth role are immediately legible;
- reading scale: PASS — instruction/date/location remain clearly subordinate;
- actual working canvas `990×1400`: PASS — edge fields/crop retain believable print density and do not intrude on semantic copy.

The rejected A study is retained as useful evidence of a failed fixed-art/copy intersection; it was not promoted.

## Long-copy stress

Hidden proof:

- `45:12 / QA / PROFESSIONAL VNEXT ADD-06 / LONG COPY STRESS`

Stress copy:

- guide expands to `撮影スペースの場所をご確認のうえ、順番にお進みください`;
- location expands to `[会場内のフォトブース設置場所・長い案内名称]`.

Readback:

- guide height `74`, bottom `799`;
- location height `72`, bottom `1252`;
- frame bottom `1400`;
- visible text outside root `0`;
- text collisions `0`.

Stress proof was hidden after verification.

## Structure QA

Selected `45:2`:

- `990×1400`;
- `clipsContent=true`;
- visible native text `5`;
- every visible text role `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- visible text outside root `0`;
- visible text collisions `0`;
- variable location/guidance remains native editable text;
- variable content baked into image/SVG `0`.

## Hybrid authoring / image decision

- factual/semantic text: native Figma text;
- fixed art: four large simple native geometry roles;
- editable SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required;
- IMAGE fills `0`;
- Drive write `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the photo-booth sign invites photography but does not itself need a stock/generated photo. A generated camera/people/tropical image would compete with wayfinding and increase themed-template risk. The diagnosed need was energy and invitation, solved by typography/scale/color.

## Completion-only comparison with retained V6

After vNext was mature, retained V6 `42:2 / CLEANROOM_ADD06_V6_SELECTED_DARK_WAYFINDING_POSTER_2026_08_20` was opened for comparison.

V6 remains a strong, professional dark wayfinding poster, but its deep-dark field + mint flash treatment feels more directional/technical and less playful. Under the current `SUNSHINE DEPARTURE` / pop-fun brief, vNext is preferred because:

- the sign feels more like a celebratory invitation to participate;
- the warm cream middle field improves approachability;
- coral/lagoon/yellow create stronger event energy without a camera-interface metaphor;
- semantic hierarchy and long-copy safety are not weakened.

V6 remains untouched as rollback/history.

## Professional Council score

`89 / 100`

- Concept clarity / ownability: 13/15
- Emotional excitement / participation appeal: 14/15
- Japanese editorial typography: 13/15
- Composition / hierarchy / rhythm: 14/15
- Travel/Hawaii integration without cliché: 8/10
- Item-specific function: 10/10
- Physical print credibility: 9/10
- Editability / resilience: 4/5
- Family fit without template sameness: 4/5

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

## Decision

`PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`.

Next progression target: `ADD-07 エスコートカード案内ボード`.