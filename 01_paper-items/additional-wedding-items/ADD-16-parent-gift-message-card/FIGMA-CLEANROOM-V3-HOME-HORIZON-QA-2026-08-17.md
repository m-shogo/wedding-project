# ADD-16 両親贈呈品メッセージカード — Clean-room V3 Home Horizon QA

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `866d7c596672bf993471a5233baa53fa138eaae3`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Drive folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained legacy production: front `1:2`, back `1:13`
- clean-room page: `18:2 / CLEANROOM / ADD-16 / V3 HOME HORIZON / 2026-08-17`
- V3 front: `18:3`
- V3 back: `18:14`
- hidden stress front: `18:26`
- hidden stress back: `18:37`

## Clean-room contract

V3 was built from new blank postcard frames without duplicating or visually sampling legacy production or the previous V2 study. Only current non-visual requirements were carried in: 100×148 mm portrait intent, front/back parent-gift message semantics, recipient/message/date/couple-signature/optional-home-port roles, editable copy, and the SPEC concept `HOME PORT / THE JOURNEY BEGAN HERE`.

No family composition, names, episodes, gift specifications, or invented memories were authored as facts. No legacy production screenshot was opened for comparison until the V3 candidate and realistic long-copy stress were complete.

## V3 art direction

`HOME HORIZON` translates the travel theme into a quiet origin/home metaphor rather than ticket/passport decoration:

- warm cream paper field;
- Japanese serif typography with controlled asymmetry;
- one restrained mint horizon/route line and one rust origin mark;
- no side slab, certificate symmetry, heart/house/airplane iconography, photos, rounded cards, shadows, or script fonts;
- front uses recipient → gratitude headline → optional short metaphor → horizon → date/signature;
- back uses a native auto-layout message stack so recipient/body/metaphor grow together safely;
- all family-specific or final copy remains native semantic `LAYOUT DUMMY` content.

## Long-copy stress

Stress inputs deliberately used:

- a long family-recipient line;
- a multi-paragraph gratitude body;
- a longer optional home-port metaphor;
- long bride/groom signature strings.

Final readback:

### front `18:3`
- size: `700×1036`
- visible native text: `8`
- IMAGE fills: `0`
- visible text outside root: `0`

### back `18:14`
- size: `700×1036`
- visible native text: `7`
- IMAGE fills: `0`
- visible text outside root: `0`

### hidden stress
- front `18:26`: outside visible text `0`
- back `18:37`: outside visible text `0`
- screenshot review confirms no recipient/title collision, body overflow, route/footer collision, or signature escape.

The back message stack remains native auto-layout and therefore expands with real Japanese body copy rather than relying on a fixed-height placeholder block.

## Three-scale QA

- whole / thumbnail: PASS; the card reads as quiet family stationery rather than travel merchandise;
- reading scale: PASS; recipient and gratitude headline lead, decorative route remains subordinate;
- actual-size: PASS; body copy, footer signatures and optional handwritten-signature box remain credible;
- realistic long-copy stress: PASS.

## Legacy comparison — only after V3 completion

Legacy front `1:2` and back `1:13` were opened only after V3/stress completion.

Legacy remains refined and restrained, but it is more minimal and carries a strong edge-bound composition. V3 is materially different and is selected as the clean-room candidate because:

- the `HOME PORT` idea is expressed as one quiet horizontal journey/origin gesture rather than as a decorative travel motif;
- long family copy is structurally safer through native message auto-layout;
- the front/back pair has clearer continuity from recipient/gratitude to body/signature;
- the composition remains sellable without relying on family photos or AI-generated imagery.

Legacy production is preserved unchanged as rollback/reference evidence.

## Hybrid authoring / asset decision

- native text: all recipient/message/date/signature/family copy;
- native vector: one horizon route + one origin mark;
- editable SVG: not required;
- generated/composed raster: not required;
- IMAGE fills: `0`;
- Drive writes: `0`.

The item does not have a screenshot-supported image bottleneck; adding imagery would increase identity/provenance risk without improving the core emotional reading.

## Deferred / blocked finalization

Still unresolved:

- one card per family vs one shared card;
- actual gift type / package / attachment method;
- whether names appear on front;
- final printed body length vs short-message role;
- vertical vs horizontal writing decision if requirements change;
- relationship to any read-aloud letter;
- final copy and signatures;
- paper/vendor/bleed/export specification and physical proof.

Keep `NOT_PRINT_READY` until those inputs are authoritative. Do not fabricate family-specific facts.
