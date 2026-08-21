# ADD-17 子ども向けミニカード / ぬりえ — Professional vNext Field Note / Family Diversity QA

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Start authority SHA: `9edf792b37e110cf9a0b0c7b43a0f9e239602dd8`
Current: `docs/automation/non-rurubu-figma-quality-current.md`

## Why ADD-17 reopened

A family-scale audit after ADD-16 showed that several otherwise healthy vNext items repeated deep navy + warm cream + coral/mint/yellow plus oversized circles/capsule sweeps. ADD-17 WINDOW SEAT was structurally sound, but its navy field, cyan/yellow circular activity window and coral/capsule vocabulary risked reading as another instance of one AI/system template rather than an item-specific children activity object.

This pass reopens family-fit / item-specific art direction only. Prior long-copy, structure and physical-writing evidence remains valid history.

## Clean-room inputs

No previous ADD-17 frame was duplicated or used as construction material for the new direction.

Only verified non-visual requirements were carried forward:

- working canvas `1110×1540`;
- age-independent neutral children activity template;
- large drawing/observation surface on front;
- large physical writing surface plus optional sketch role on back;
- native editable prompt/name/date roles;
- final adoption remains blocked until child attendance/count/age/activity facts are authoritative;
- no generated child/person/animal imagery;
- print-writing-surface and long-copy resilience requirements.

Hybrid split:

- variable/factual copy: native Figma text;
- activity/writing paper and binding: simple native geometry with direct physical meaning;
- writing rules: native functional rules;
- generated/composed raster: `0`;
- SVG: `0`;
- replaceable image roles: `0`.

Exact Drive authority live-confirmed before promotion:

- `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive writes: `0`.

## Three blank-frame directions

Figma file: `PAvkRggJiRuXVypi3RgZCN`
Study page: `56:2 / QA / ADD-17 / FAMILY DIVERSITY CLEANROOM / 2026-08-21`

1. `56:3 / FIELD NOTE` — cobalt notebook binding, terracotta header paper, moss prompt strip, large warm observation paper. Strongest physical-object logic and clearest family differentiation.
2. `56:17 / TREASURE MAP` — olive/sand route composition. More playful, but the hard route line risked reintroducing UI/map-system grammar.
3. `56:37 / STICKER POSTCARD` — violet/lavender postcard collage. Clearly different palette, but block hierarchy was more card/template-like than the selected notebook direction.

`FIELD NOTE` was selected for mature development.

## Mature candidate

Candidate page: `57:2 / VNEXT_DIVERSITY_CANDIDATE / ADD-17 / FIELD NOTE / 2026-08-21`

- front `57:3 / LITTLE FIELD NOTE`;
- back `57:18 / ARRIVAL LOG`;
- realistic stress `57:37 / 57:52`.

Promoted Current page:

- page `60:2 / CURRENT_SELECTED / ADD-17 / LITTLE FIELD NOTE / 2026-08-21`;
- front `60:3 / CURRENT_SELECTED / ADD17 / FRONT / LITTLE FIELD NOTE`;
- back `60:18 / CURRENT_SELECTED / ADD17 / BACK / ARRIVAL LOG`;
- hidden stress `60:37 / 60:52`.

The front behaves like a small bound field notebook rather than an airline/window graphic. A cobalt spine, terracotta paper header, warm observation sheet and moss prompt strip make the activity surface the actual object. The back becomes an arrival log with ruled writing paper and small optional sketch/note surfaces.

## Screenshot-driven failure and repair

The first realistic stress back revealed a real visual failure: the long Japanese headline and long `[ひとこと案内]` entered the writing-paper zone and collided visually. Bounding-box/root containment alone would not have been sufficient evidence.

Bounded repair:

- writing surface moved from y `330` to `420`;
- surface resized to `790×560`;
- prompt moved to y `455`;
- writing rules shifted downward with tighter but still writable rhythm;
- lower optional sketch/note modules and footer rule were rebalanced downward;
- type size was not reduced merely to hide the failure.

Corrected stress screenshot: PASS.

## Three-scale / visual QA

Front:

- whole-item ~500px: PASS;
- reading ~865px: PASS;
- native `1110×1540`: PASS;
- realistic long headline/topic/name stress: PASS.

Back:

- whole-item ~500px: PASS;
- reading ~865px: PASS;
- native `1110×1540`: PASS;
- realistic long headline/prompt/optional-copy stress: PASS after writing-lane correction.

The new family is visually quieter and more tactile than WINDOW SEAT, but still playful through color and physical notebook behavior. It removes the repeated large circle/capsule motif from this item without losing travel discovery meaning.

## Structure QA

Selected candidate and realistic stress readback:

- front: native text `7`, fixed-height visible text `0`, outside visible text `0`, text-text collisions `0`, IMAGE fills `0`;
- back: native text `7`, fixed-height `0`, outside `0`, collisions `0`, IMAGE fills `0`;
- stress front: native text `7`, fixed-height `0`, outside `0`, collisions `0`;
- stress back: native text `7`, fixed-height `0`, outside `0`, collisions `0`.

Stress duplicates were returned hidden after screenshot QA.

## Mature comparison with previous Current

Only after FIELD NOTE passed visual and structural QA was previous WINDOW SEAT reopened for final comparison.

WINDOW SEAT remains structurally strong and playful, but at suite scale it repeats navy/coral/cyan/yellow and large circle/capsule language already present across multiple unrelated vNext items. FIELD NOTE is more item-specific, looks like a real children activity notebook/keepsake, gives the writing/drawing surfaces a clearer physical reason, and increases family diversity without abandoning the travel narrative.

Professional Design Council: `92/100 / PASS / NO VETO`.

- concept clarity / ownability `14/15`;
- emotional invitation / pick-up appeal `14/15`;
- Japanese typography `14/15`;
- composition / rhythm `14/15`;
- travel integration without cliché `8/10`;
- item functionality `10/10`;
- physical print credibility `9/10`;
- editability `5/5`;
- family fit without template sameness `4/5`.

## Image-generation decision

Image generation: `0`.

The visible defect was family-scale motif repetition and insufficient item-specific physical-object grammar, not missing illustration or photography. Generated children, family scenes, airplanes or generic tropical imagery would add identity/provenance risk without solving the diagnosed problem.

## Final-use blocker

Still do not fabricate:

- whether children attend;
- age range/count;
- venue-provided amenities;
- preferred activity;
- personalization;
- final copy / paper / pen / crayon handling.

Resolution remains `NOT_REQUIRED / ADOPT_VNEXT / REDESIGN_REQUIRED` once authoritative input exists. Physical/vendor proof remains `NOT_PRINT_READY`.