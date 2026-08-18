# RSL-093 — A model-course role can complete travel-guide grammar more effectively than more local styling

Source scope/item: Rurubu WEDDING / V6
Date: 2026-08-18
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

The preferred V6 set already contained cover, profile/Q&A, story/chronology, destination spots, and cafe/dining features. These pages were visually stronger than earlier versions, but the publication still lacked a classic travel-guide editorial job: a **morning-to-night model course** that turns places and activities into a temporal route.

Adding more labels, textures, or photo overlaps to existing spreads would have increased local styling without filling this editorial-role gap.

## Evidence before change

Preferred V6 before the bounded test:

- Outer AG `1676:2`;
- Profile/Q&A DN `1675:2`;
- Story/chronology DO `1679:2`;
- Memory Spots DR `1689:2`;
- Gourmet/Cafe DT `1695:2`.

Current official Rurubu Yokohama publishing material still describes 1DAY/half-day model-course and walking-map content as representative travel-guide features. That public genre evidence was used only to identify the missing editorial role; no protected page, logo, prose, geometry, or proprietary illustration was copied.

## Root-cause hypothesis

Publication authenticity depends partly on the **set of reader jobs** the pages perform. A spot guide answers “where”; a gourmet feature answers “what to eat”; a model-course spread answers “how a day flows.”

If a travel booklet lacks the temporal-planning role, additional surface styling on existing pages cannot fully substitute for it.

## Bounded test

A clean-room two-page model-course spread was built from scratch:

- initial DU/DV root `1701:2`;
- preferred name after verification: `PREFERRED / V6_INSIDE_DV_YOKOHAMA_1DAY_PLAN_2026_08_18`;
- left page `1701:3`;
- right page `1701:4`.

The test used:

- native editable Japanese text for all headline, itinerary, time, note and practical metadata;
- existing verified Rurubu image hashes only;
- four independent replaceable itinerary photo roles;
- one simple functional route line plus milestone dots;
- no rounded cards, generic UI grid, decorative shadows, new raster asset, image generation, Drive save or external binary placement.

A compact native practical-info layer (`MOVE / PACE / BEST / MOOD`) was added to the left lower field only after the first whole-spread review showed underused physical paper space.

## Expected improvement

Increase genre authenticity and whole-publication role variety by adding a genuine itinerary/planning function, while preserving the project-wide hybrid-authoring contract: native variable copy, replaceable imagery, and only functional simple geometry.

## Regression risk

- page proliferation can exceed the final physical booklet count;
- a route can become timeline UI if every stop receives identical containment;
- dummy times/copy can be mistaken for final factual authority;
- reusing existing photos too often can weaken whole-book credibility;
- adding a role because a genre often contains it is not enough: the role must still pass whole-spread and actual-size visual QA.

## Three-scale evidence

- whole spread / 1200px: PASS;
- left page actual `794×1123`: PASS;
- right page actual `794×1123`: PASS;
- left native text `19`, collisions `0`, 18px text safe risks `0`;
- right native text `21`, collisions `0`, 18px text safe risks `0`.

The practical-info refinement initially produced several text collisions and one safe-area risk. These were corrected before promotion rather than counted as progress.

## Figma / Drive / GitHub evidence

Figma:

- preferred DV `1701:2`;
- left `1701:3`;
- right `1701:4`;
- Start Here `845:27` now includes `DV 1DAY PLAN` while V7 remains HOLD.

Drive authority:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Detailed QA:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DO-DR-DT-DV-1DAY-PLAN-QA-2026-08-18.md`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: DV adopted as a preferred **middle-feature study**.

Not claimed:

- final pagination;
- final route facts or times;
- final destination photography;
- print-ready state.

## What must remain Rurubu-specific

Do not transfer:

- Yokohama subject matter;
- exact times or stop count;
- magenta/cyan/yellow/navy system;
- Japanese Rurubu-like editorial grammar;
- image hashes;
- route coordinates;
- page geometry;
- folio or final page count.

## Cross-item applicability hypothesis

For another multi-page print artifact that still feels unlike its real-world publication genre, independently audit whether the missing quality is a **reader-job/editorial-role gap** rather than a decoration gap. Test one role that naturally belongs to that artifact's own use case, while preserving its own visual language.

## Next receiving-item experiment

On a materially different multi-page artifact, compare:

1. another local visual-polish pass on an existing page type; versus
2. one new reader-useful editorial role that the artifact genuinely needs.

The transferable principle is diagnostic only: complete the publication's functional/editorial role set before assuming more styling is the answer.