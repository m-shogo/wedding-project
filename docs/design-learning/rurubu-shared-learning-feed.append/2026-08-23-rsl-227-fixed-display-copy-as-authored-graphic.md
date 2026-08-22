# RSL-227 — Fixed identity copy can be tested as an authored graphic while exact editable source is preserved

Source scope/item: Rurubu WEDDING / V7 Hawaii Outer
Date: 2026-08-23
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V7 Outer study C used a fixed destination title (`ハワイ`) and fixed subhead (`旅するWEDDING`) as ordinary native text directly on the hero photograph. The layout already had travel-magazine energy, but the fixed title had weak identity ownership at thumbnail scale and read more like text placed on top of an image than a deliberately art-directed publication device.

Evidence before change:
- Figma source `2055:2`;
- title `2055:23`, plain white Noto Sans JP Bold 96;
- subhead `2055:24`, yellow Noto Sans JP Bold 34.

## Root-cause hypothesis

The defect was not that native text is inherently weak. It was a role mismatch: **copy that is fixed, short, identity-bearing and unlikely to change was being authored with the same surface treatment as ordinary editable page copy.** That prevented the title itself from carrying enough of the cover's visual identity.

This hypothesis is intentionally narrower than “rasterize headings” or “decorate fixed text.” Variable/factual/semantic copy remains native by default under the project-wide hybrid-authoring rule.

## New professional knowledge used

Fresh 2026 Tokyo TDC research was used as a decision input. Current Japanese type/editorial work demonstrates that display lettering can be an authored visual object with deliberate relationships between restraint, decoration, geometry, rhythm and Japanese letterform history. The useful principle was not a specific outline, palette or composition; it was that fixed editorial display copy may legitimately require art direction beyond neutral typesetting.

## Bounded experiment

Created rollback-safe candidate:
- `2282:2 / V7 PRO STUDY C2 / HAWAII POP EDITORIAL / OUTER / FIXED DISPLAY LOCKUP / TESTED_LOCAL / 2026-08-23`.

Preserved original `2055:2` unchanged.

Inside the candidate:
- hid only the cloned native title/subhead roles;
- preserved an exact editable hidden source `2282:32` containing `ハワイ` and `旅するWEDDING`;
- composed the fixed display treatment from exact native text + bounded accent geometry;
- exported that source at 4× to `2240×760 px`;
- placed one fixed graphic `2282:36` with image hash `8366653cf107cc809effb5e53f7dfaddb85842d6`;
- did not flatten the page;
- kept ordinary/variable/service copy native.

## Expected improvement

At whole-item and reading scales, the destination title should become a recognisable cover identity element rather than a generic text overlay, while exact wording remains recoverable/editable from the preserved source and the publication remains structurally editable.

## Regression risks

- decoration can become louder than editorial meaning;
- a fixed raster can become a brittle asset if source truth is not preserved;
- generated/composed text can introduce spelling/letterform errors if exact native source is not used;
- rasterization can reduce print quality if the role-sized export is too small;
- applying the method to variable or factual copy would damage editability and truth;
- repeating the same lockup grammar across unrelated items would create a new AI/template signature.

## Three-scale evidence

Candidate `2282:2`:
- whole-item / 500 px: PASS;
- reading / 1400 px: PASS;
- actual-size / 1587×1123: PASS;
- visible native text: 19;
- visible image-fill roles: 6;
- unintended text-box intersections: 0;
- 18px text safe risks: 0.

The 4× raster is approximately 384 ppi at the candidate's current working physical width (~148.2 mm) under the present 420 mm spread assumption. This is only a comparison gate, not printer authority.

## Failure fingerprint

`F-RSL-227-FIXED-IDENTITY-COPY-AUTHORED-AS-ORDINARY-TEXT-WITHOUT-TESTING-DISPLAY-ART-DIRECTION`

Fingerprint meaning:
- operation/design role: fixed short identity/display copy on a print/editorial surface;
- symptom: technically readable native text has weak visual ownership and reads like a generic overlay;
- likely cause: fixed identity copy was never tested as a dedicated art-directed role;
- corrected method: on a rollback-safe candidate, compare a purpose-built fixed graphic while preserving exact editable source and normal native variable copy;
- stop condition: reject if the graphic becomes decorative noise, harms typography/print clarity, or loses editability/truth.

## Before/after learning check

The new professional knowledge changed an actual design decision: instead of further changing font size/position on the existing native title, the test changed the **authoring responsibility** of only the fixed identity role while preserving source truth. The result passed all three visual scales and structure QA.

## What must remain Rurubu/V7-specific

Do not transfer:
- coral outline;
- cyan baseline;
- yellow subhead;
- exact scale/position;
- Hawaii wording;
- Rurubu pop density;
- interaction with the existing Rurubu WEDDING masthead.

## Cross-item applicability hypothesis

On another materially different print/editorial item, when a fixed short title/wordmark-like phrase remains visually generic despite sound hierarchy, independently test whether an authored fixed graphic improves identity **without** baking variable/factual copy into the image. Preserve exact editable text/source, perform spelling/letterform QA, and compare at whole-item, reading and actual-size scales.

Do not promote this to a project-wide visual rule from one Rurubu example. The project-wide hybrid-authoring permission already exists; RSL-227 only supplies local evidence for one specific fixed-display use case.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2052:2`
- source study: `2055:2`
- candidate: `2282:2`
- editable hidden source: `2282:32`
- fixed graphic: `2282:36`
- image hash: `8366653cf107cc809effb5e53f7dfaddb85842d6`
- dedicated QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C2-FIXED-HAWAII-DISPLAY-LOCKUP-QA-2026-08-23.md`
