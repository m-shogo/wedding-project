# Rurubu WEDDING V8 — AV2 Outer single-destination-photo essay QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED / NOT_PRINT_READY`

## Authorities preserved

- V6 control remains frozen: `JC + IX + JB + IZ + IT + JA`.
- V7 comparison remains `C5 + K + F + G2 + H3 + C6`.
- V8 Profile/Story/Memory/Cafe/1DAY remain `AW2 + AL2 + AQ3 + AS2 + AT3`.
- No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ or ADD production state was inspected or changed.

## Fresh professional research

This run deliberately moved away from the recent grid/time-map/photo-anchor references and studied the relation between editorial narrative, locality and the book object.

- Tokyo Art Book Fair's Studio Yukiko interview describes `Flaneur` as a formative experiment in working closely with cities and people, and in asking what design can add to narrative rather than acting as neutral scaffolding.
- Tokyo Art Book Fair's Studio Yukiko talk frames editorial design as a visual narrative layer woven into books and magazines with artists and editors.
- Gerhard Steidl's Book Award Japan comments treat format, design, paper, printing and binding as choices that should serve the specific story/content, while explicitly warning against imitation and urging authors to find their own language.

Observation only: these references do not create a Rurubu rule. They support a testable local question: if V8's cover role is supposed to carry a destination story, is an abstract proxy still doing the reader-facing job, or has restraint become detachment from place?

## Before

Current V8 Outer AV `2273:24` used one abstract generated/composed field:

- node `2273:36`
- name `GENERATED / OCEAN_LIGHT_ESSAY / DRIVE 1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- imageHash `be21a846e961b3a13c24c7476f6a01b12b8d07ff`
- placement `647×386`

The cover was coherent as a restrained book-design system, but common-scale visual review against V6 JC and V7 C5 continued to show weaker immediate destination evidence. The defect was not missing decoration or insufficient typography; the front image itself remained an abstraction where the cover role needed a place-bearing visual beat.

## Hypothesis

A restrained editorial-monograph cover can use one role-owned destination photograph without adopting V6 collage grammar or V7 high-energy magazine grammar. If the photograph is independently replaceable and carries only one editorial job, it should strengthen place desire while preserving V8's publication identity.

This is **not** a rule that every cover needs photography.

## Bounded clean-room test

AV2 was created as a rollback-safe clone of AV and changed only the front image role.

Current candidate:

- root `2347:2`
- `V8 CLEANROOM AV2 / BOOK EDITION / OUTER / SINGLE DESTINATION PHOTO ESSAY / CURRENT / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED / 2026-08-23`
- parent `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- visible `true`
- position `x=1750 / y=8500`

Image role:

- node `2347:14`
- `PHOTO_DUMMY / OUTER_DESTINATION_ESSAY_REPLACEABLE / NOT FINAL`
- placement `647×386`
- imageHash `539c259be8036b481d06b4f76db9a39b407d90e8`
- known intrinsic source from earlier verified Rurubu readback: `1356×560`
- provenance status in this experiment: **existing verified Rurubu structural material only; not a new legitimate OUTER-01 master**

No native/factual copy changed. No new card, badge, gradient, collage, sticker, English taxonomy, or decorative geometry was added. V6/V7 composition and crop hierarchy were not copied.

## Three-scale QA

- 500px whole-item: **PASS / stronger than AV within V8**. Destination evidence is immediate while the front remains one calm image field rather than a collage.
- 1400px reading/page scale: **PASS**. `横浜 → photograph → native headline/deck` reads as one editorial sequence and the left index remains a quiet counter-page.
- `1587×1123` actual-size/detail render: **PASS for DESIGN STRUCTURE**. No visible clipping or collision was observed and the native headline remains readable over the image.

Structural readback after promotion:

- visible native text: `12`
- IMAGE roles: `1`
- text intersections: `0`
- bounded 18px text safe risks: `0`
- image role remains explicitly named `PHOTO_DUMMY / ... / NOT FINAL`
- other V8 roots remained unchanged and visible: `AW2 2329:2 / AL2 2332:2 / AQ3 2337:2 / AS2 2325:2 / AT3 2342:2`

## Resolution / print truth

The structural dummy is not a final print photograph. Using the still-unverified `420×297 mm` spread assumption, the known `1356×560` source placed into the relatively tall `647×386` role is height-limited and roughly in the ~140 ppi class. That is additional evidence **against** treating this dummy as print-ready, not a final preflight measurement.

Exact printer template, final physical box, bleed/trim/fold, final legitimate source dimensions, effective-PPI preflight, PDF export and physical proof remain unresolved.

## Professional critique

- **Art director:** PASS for the V8 idea. The cover now communicates a specific place before asking the reader to appreciate the system.
- **Editorial designer:** PASS. One dominant destination role has a clear job and does not create repeated equal modules.
- **Book designer:** PASS. The front is photograph-led while the back remains text/index-led, giving the outer spread a deliberate tempo contrast.
- **Typographer:** PASS for unchanged native hierarchy; Japanese copy remains editable.
- **Photo editor:** `STRUCTURAL PASS / REAL CONTENT BLOCKED`. The dummy proves the role, not the final image.
- **Print designer:** BLOCKED beyond design QA; dummy source resolution and printer authority are insufficient for a print claim.

## Promotion / rollback

Promoted current:

`2347:2 / V8 CLEANROOM AV2 / BOOK EDITION / OUTER / SINGLE DESTINATION PHOTO ESSAY / CURRENT / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-CONTENT-BLOCKED / 2026-08-23`

Hidden rollback:

`2273:24 / ROLLBACK / V8 AV / OUTER / PRE-DESTINATION-PHOTO-ESSAY / HIDDEN / 2026-08-23`

- rollback `visible=false`
- rollback `x=300000 / y=8500`

## Learning

Candidate fingerprint:

`F-RSL-242-RESTRAINED-OUTER-USES-ABSTRACT-PLACE-PROXY-WHEN-COVER-ROLE-NEEDS-DIRECT-DESTINATION-EVIDENCE`

Learning state: `TESTED_LOCAL`.

The layout effect is three-scale verified with a structural dummy, but legitimate role-specific photography is still absent. Do not promote this to a stronger reusable rule until a real OUTER-01 candidate is generated/selected, saved to the exact V8 Drive authority, placed into the replaceable role, and verified for crop/effective PPI/actual print behavior.

## Asset truth

- new image-model generations: `0`
- new Drive masters: `0`
- new image hashes: `0`
- adopted legitimate final photography: `0`
- newly created replaceable Figma photo role: `1` in the AV2 clone, using an existing hash as explicit dummy material
- native/factual copy changes: `0`
- V6 changes: `0`
- V7 changes: `0`

## Next

Highest-value next step remains legitimate OUTER-01 photography using the existing V8 contact-sheet gate: materially different candidates → photo-editor selection → exact Drive master/readback → `2347:14` replacement → crop/hash/effective-PPI → three-scale QA. Do not create V9.