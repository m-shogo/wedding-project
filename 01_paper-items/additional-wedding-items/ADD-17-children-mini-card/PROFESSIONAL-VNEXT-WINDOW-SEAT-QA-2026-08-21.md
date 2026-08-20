# ADD-17 Professional vNext — LITTLE JOURNEY / WINDOW SEAT QA — 2026-08-21

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_NEUTRAL_TEMPLATE_SELECTED / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Start authority SHA: `2b22d56d6758c9a32c5d2b2e032bf358e53b5c6f`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Requirement boundary

Final use of ADD-17 is still blocked because authoritative child attendance/count/age, venue-provided amenities and desired activity are unknown. The current authority explicitly permits an age-independent neutral editable template while final adoption stays `BLOCKED_REQUIRED_INPUT`.

No child identity, age, count, interests or venue service was fabricated.

## Clean-room construction

The vNext was authored on a new blank Figma page before opening retained V5 for comparison. No old production layout, contour field, rails, decorative rules, writing lines, image crop or prior V4/V5 visual node was copied into the new design.

Only these verified constraints were carried forward:
- A6 trim `105×148mm` with existing `3mm` bleed model;
- working canvas `1110×1540` at `10px/mm`;
- front drawing/activity role;
- back writing role plus optional sketch and optional name;
- all variable copy must remain native/editable;
- neutral age-independent semantics until real child requirements exist.

## Figma

File: `PAvkRggJiRuXVypi3RgZCN`

Current vNext page:
- `47:2 / CURRENT_SELECTED / ADD-17 / LITTLE JOURNEY / 2026-08-21`

Three materially different blank-frame concept thumbnails:
- `47:3 / ISLAND EXPLORER`
- `47:13 / WINDOW SEAT`
- `47:23 / TREASURE POSTCARD`

Concept critique:
- ISLAND EXPLORER: open and bright, but the lower lagoon gesture competed with guidance and felt closer to suite-level graphic styling than a child-specific discovery experience.
- TREASURE POSTCARD: practical large activity field and cheerful color, but postcard structure felt more generic and less directly connected to flight/travel excitement.
- WINDOW SEAT: strongest concept. A large window/view becomes the activity surface itself, giving immediate travel/flight anticipation without fake gate/class/barcode/airline credentials.

Selected full-size neutral template:
- front `48:2 / CURRENT_SELECTED / ADD17 / FRONT / WINDOW SEAT DISCOVERY`
- back `48:13 / CURRENT_SELECTED / ADD17 / BACK / ARRIVAL NOTE`
- hidden realistic long-copy stress `48:26 / 48:37`

Retained prior production, opened only after vNext maturity:
- front `2:2`
- back `2:5`

## Art direction

Emotional brief:

`子どもが「結婚式に来た」だけでなく、小さな旅の途中で何かを見つけた気持ちになれる紙。`

Front:
- deep ocean background;
- oversized aircraft-window-like viewpoint without credential cosplay;
- cyan sky + yellow sunlight;
- large warm-cream drawing paper inside the view;
- Japanese-first `まどのそとで、なにを見つけた？`;
- stable navy footer lane for secondary guidance and optional name/date.

Back:
- warm cream arrival page;
- giant coral arrival crop, mint breeze, yellow sun crop;
- Japanese-first `見つけたことを、ひとこと。`;
- large borderless white writing paper;
- separate optional circular sketch surface;
- no generated child/person/animal imagery, fake airline UI, barcode, boarding credential, gradient or shadow.

## Screenshot-found defects and corrections

### 1. Back prompt contrast failure

Initial selected back placed coral `TXT_PROMPT` partly over the giant coral arrival field. Native screenshot showed the semantic prompt almost disappearing even though structure/overflow were valid.

Correction:
- selected prompt `48:19` and stress prompt `48:43` changed to deep ocean navy;
- geometry and semantic copy stayed native/editable.

Result: PASS at native screenshot scale.

### 2. Front long-copy guidance crossed two incompatible color fields

Initial front guidance sat inside the yellow lower-window band. Stress copy wrapped to a second line below the band onto navy, creating an accidental split background and weak editorial rhythm.

Correction on selected + stress:
- moved `TXT_GUIDE` to a dedicated navy footer lane at `y=1215`;
- width expanded to `750px`;
- fill changed to white;
- kept native auto-height copy and did not reduce child-facing type to hide the problem.

Selected and realistic long-copy screenshots both PASS after correction.

### 3. Back long prompt consumed the writing-field approach

Stress back showed the long prompt ending too close to the original writing field start.

Correction on selected + stress:
- prompt width increased to `900px`;
- writing paper moved to `y=535` and reduced to `560px` height;
- writing hint moved with the paper to `y=585`;
- open writing surface remains large and visually dominant.

Stress back PASS after correction.

## Hybrid authoring split

- native text: all prompt, guidance, optional name and date roles;
- simple native vector/shape: window/view fields, large color crops, drawing/writing/sketch surfaces;
- generated/composed raster: `0`;
- editable SVG: `0`;
- replaceable image: `0`;
- generated child/person/animal imagery: `0`.

Image generation was not used because the diagnosed quality problem was the activity experience, typography, color-field hierarchy and physical writing/drawing usability—not missing photography or illustration. Adding generated children or generic tropical clip-art would create identity/AI-template risk without solving the item role.

## Three-scale visual QA

Concept thumbnails were reviewed at approximately 555×770.

Selected front/back were reviewed at:
- whole/read scale: rendered to 747×1036 from the 1110×1540 roots;
- actual canvas: exact `1110×1540` renders successfully generated;
- realistic long-copy: temporarily revealed at the same selected geometry and returned hidden after review.

Selected front: PASS.
- strong first read and travel excitement;
- drawing field remains the dominant usable surface;
- no web-card/admin feeling;
- secondary guidance is now stable on navy rather than tied to a decorative yellow band.

Selected back: PASS.
- prompt is readable after contrast correction;
- writing paper remains large and calm;
- optional sketch is clearly secondary;
- color crops add delight without obstructing use.

Stress front `48:26`: PASS after footer-lane correction.
Stress back `48:37`: PASS after prompt/writing-paper spacing correction.

## Structural readback

Selected front `48:2`:
- visible native text `6`;
- fixed-height visible text `0`;
- visible text outside root `0`;
- text-text collision `0`;
- IMAGE fills `0`;
- drawing paper `48:6 = 620×600`.

Selected back `48:13`:
- visible native text `7`;
- fixed-height visible text `0`;
- visible text outside root `0`;
- text-text collision `0`;
- IMAGE fills `0`;
- writing paper `48:20 = 820×560`;
- optional sketch `48:22 = 240×240`.

Stress `48:26 / 48:37` independently returned the same structural PASS: fixed-height `0`, outside `0`, collision `0`, IMAGE `0`. Both stress roots were returned to `visible=false` after proof.

## Mature comparison with retained V5

Retained V5 `2:2 / 2:5` was opened only after the vNext was mature.

V5 remains a competent neutral field-journal template and its earlier structural/readability evidence remains valid. However, the professional vNext clearly better matches the current explicit direction of travel / flight / pop / fun / anticipation:
- stronger memorable object concept;
- clearer sense of flight without fake transport credentials;
- more child-facing delight and discovery;
- larger visual scale shifts and joyful color contrast;
- still preserves large practical drawing/writing surfaces and native editability.

No V5 visual grammar was copied into the vNext.

## Professional Design Council score

`90 / 100` — PASS (`>=85`, no veto)

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-it-up: `14/15`
- Typography / Japanese editorial craft: `13/15`
- Composition / hierarchy / rhythm: `13/15`
- Travel-flight-Hawaii integration without cliché: `9/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `9/10`
- Editability / realistic-copy resilience: `5/5`
- Family fit without template sameness: `3/5`

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains after the contrast and long-copy corrections.

## Drive

Exact authority confirmed live:
- `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`

Drive write: `0` because this direction uses no generated/adopted binary asset.

## Selection vs final adoption

`PROFESSIONAL_VNEXT_NEUTRAL_TEMPLATE_SELECTED` for visual/design authority.

Final real-wedding use remains `BLOCKED_REQUIRED_INPUT` until authoritative information confirms:
- whether children attend;
- approximate age range/count;
- venue amenities;
- whether this activity is wanted;
- personalization requirements;
- final copy and paper/pen/crayon handling.

If later unnecessary, resolve as `NOT_REQUIRED`; if confirmed but unsuitable for the real children, preserve this template and create a requirement-specific alternative. Physical/vendor proof remains `NOT_PRINT_READY`.