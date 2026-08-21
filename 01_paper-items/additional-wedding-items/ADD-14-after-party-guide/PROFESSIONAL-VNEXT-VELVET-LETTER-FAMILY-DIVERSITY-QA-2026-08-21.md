# ADD-14 二次会案内 — Professional vNext Velvet Letter / Family Diversity QA

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Start authority SHA: `6ffd2fa870efaa7777c9a6d9d6bad852f2ffd28a`
Current: `docs/automation/non-rurubu-figma-quality-current.md`

## Why ADD-14 reopened

A family-scale audit found a recurring visual fingerprint across unrelated non-Rurubu vNext artifacts: deep navy + warm cream + coral/mint/yellow with oversized circles/capsule sweeps. The existing MOONLIT RENDEZVOUS was individually healthy, but its cream/ocean split, coral moon and mint sweep contributed to suite-level template sameness.

This pass reopened only the item-specific/family-fit art-direction ceiling. Existing structure, auto-height and long-copy evidence remained useful history.

## Clean-room inputs

No existing ADD-14 frame was duplicated or used as construction material for the new design.

Only verified non-visual requirements were carried forward:

- A6 `592×420` and A5 `840×592` working canvases;
- native editable venue/address/access/reception/start/end/fee/RSVP/contact/notice roles;
- optional independent QR semantic role;
- all event facts remain unresolved placeholders;
- print/readability, long-copy, rollback and auto-height requirements;
- existing Current/legacy preserved for later comparison only.

Hybrid split:

- variable/factual copy: native Figma text;
- fixed paper/sleeve/fold/support fields: simple native geometry with physical-letter meaning;
- optional QR: independent invisible semantic role;
- generated/composed raster: `0`;
- SVG: `0`;
- image fills: `0`.

Exact Drive authority live-confirmed:

- `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`
- Drive writes: `0`.

## Three blank-frame directions

Figma file: `IygEr140Yqk12LsGL3TFrT`
Study page: `53:2 / QA / ADD-14 / FAMILY DIVERSITY CLEANROOM / 2026-08-21`

1. `53:3 / NIGHT RECEIPT` — black spine, pale receipt paper, acid-lime header and coral RSVP. Distinct but slightly utilitarian.
2. `53:17 / VELVET LETTER` — plum sleeve, blush letter paper, sky-blue edge and apricot date fold. Strongest intimacy and physical invitation character.
3. `53:29 / CITY ZINE` — cobalt/vermilion/yellow editorial flyer. Clear and energetic, but less intimate for the after-hours role.

`VELVET LETTER` was selected for mature development.

## Mature candidate

Candidate page:
- `54:2 / VNEXT_DIVERSITY_CANDIDATE / ADD-14 / VELVET LETTER / 2026-08-21`
- A6 `54:3`
- A5 `54:18`
- realistic stress A6/A5 `54:33 / 54:48`

Promoted Current page:
- `56:2 / CURRENT_SELECTED / ADD-14 / VELVET LETTER / 2026-08-21`
- A6 `56:3 / CURRENT_SELECTED / ADD14 / A6 / VELVET LETTER`
- A5 `56:18 / CURRENT_SELECTED / ADD14 / A5 / VELVET LETTER`
- hidden realistic stress `56:33 / 56:48`.

The visual concept is a late-night note slipped from a velvet sleeve: plum outer field, pale warm letter paper, sky-blue paper edge, apricot date fold and restrained sage RSVP support. Travel/continuation is carried by the idea of a second note/chapter rather than airline UI, moon circles or flight-path decoration.

A5 is independently reflowed rather than scaled from A6.

## Screenshot / stress QA

A6 selected: PASS at native `592×420`.
A5 selected: PASS at native `840×592`.
A6 realistic long venue/address/access/notice/RSVP stress: PASS.
A5 realistic long venue/address/access/notice/RSVP stress: PASS.

The new direction remains legible without shrinking Japanese copy into screen-only microtype. It also removes the repeated large-circle/capsule vocabulary from this item.

## Structure QA

Final candidate + stress readback:

- selected A6: native text `8`, fixed-height `0`, outside text `0`, text-text collisions `0`, IMAGE fills `0`;
- selected A5: native text `8`, fixed-height `0`, outside `0`, collisions `0`, IMAGE fills `0`;
- stress A6: native text `8`, fixed-height `0`, outside `0`, collisions `0`, IMAGE fills `0`;
- stress A5: native text `8`, fixed-height `0`, outside `0`, collisions `0`, IMAGE fills `0`.

Stress duplicates were returned hidden after review.

## Mature comparison with previous Current

Only after VELVET LETTER passed selected/stress visual and structure QA was prior `MOONLIT RENDEZVOUS` reopened for final comparison.

MOONLIT remains functional and attractive, but its cream/deep-ocean split, coral circular field and mint sweep repeat visual vocabulary already found across unrelated suite items. VELVET LETTER is more intimate, more physically specific to an invitation/note, and improves suite diversity while keeping an after-hours celebratory character.

Professional Design Council: `92/100 / PASS / NO VETO`.

- concept clarity / ownability `14/15`;
- emotional invitation `14/15`;
- Japanese typography `14/15`;
- composition / rhythm `14/15`;
- travel/continuation integration without cliché `8/10`;
- item functionality `9/10`;
- print credibility `9/10`;
- editability `5/5`;
- family fit without template sameness `5/5`.

## Image-generation decision

Image generation: `0`.

The diagnosed defect was suite-level motif/palette repetition, not missing photography or illustration. Venue/event facts are still unresolved, so generated venue imagery/maps/QR-like artifacts would be misleading and would not solve the actual art-direction problem.

## BLOCKED_REQUIRED_INPUT / deferred

Do not fabricate:
- whether the after-party is held;
- official venue/address/floor;
- reception/start/end;
- fee/payment method;
- access/travel time;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if used.

Also deferred:
- printer template/profile;
- bleed/safe-area/export settings;
- QR scan proof if used;
- 100% A6/A5 physical print proof.

Current result:
`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_VELVET_LETTER_SELECTED / FAMILY_DIVERSITY_PASS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.