# BOARDING PASS — vNext Professional QA / 2026-08-21

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / VNEXT_SELECTED_CANDIDATE / READY_FOR_PROMOTION / NOT_PRINT_READY`

## Live authority

- start/latest `main` before this evidence write: `4ff19ff7772820ec38ecd9690b0a34ea253bd3e2`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- vNext reset: `docs/automation/NON-RURUBU-PROFESSIONAL-VNEXT-RESET-2026-08-20.md`
- professional council: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- selected front: `60:3 / VNEXT_SELECTED_CANDIDATE / BOARDING FRONT / SUNSHINE GATE`
- selected back: `60:33 / VNEXT_SELECTED_CANDIDATE / BOARDING BACK / ALOHA AFTERGLOW`
- retained selected V5 family for final comparison only: `39:22 / 41:2`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive metadata was read back live; no Drive write was required.

## Clean-room authorship

The vNext direction was authored from blank 1200×550 frames and did not copy V5 production layout, guilloche, cut-corner treatment, print boundary, event-ledger rail, image crop, decorative vector, or prior V2/V3/V5 visual construction.

Only factual/semantic requirements were carried forward: physical escort-ticket role, detachable/perforated stub semantics, confirmed date `2026.10.24`, ceremony time `14:10`, `YOKOHAMA`, and native editable roles for guest name, reception, table, and final guide.

Retained production was inspected only after the vNext candidate had completed structure repair and stress QA.

## Authoring split

- variable/factual copy: native Figma text;
- physical ticket/perforation and fixed atmosphere: simple native editable geometry;
- replaceable photography: none required;
- generated/composed raster: none required;
- IMAGE fills: `0` on both selected roots;
- fake airline credentials / flight number / class / barcode: `0`.

## Cross-item structural failure reproduced and repaired

The Passport vNext QA discovered that visually correct Figma text could still have invalid editable geometry: `textAutoResize=NONE` with nominal height `10px`. BOARDING PASS independently reproduced the same failure fingerprint across **all 21 vNext text roles**.

Before repair:

- front 16/16 text nodes: height `10px`, `textAutoResize=NONE`;
- back 5/5 text nodes: height `10px`, `textAutoResize=NONE`.

Rollback copies were preserved:

- `61:2 / ROLLBACK / VNEXT BOARDING FRONT / PRE TEXT GEOMETRY FIX / 2026-08-21`
- `61:32 / ROLLBACK / VNEXT BOARDING BACK / PRE TEXT GEOMETRY FIX / 2026-08-21`

After loading required fonts, all 21 selected-candidate text nodes were converted to `textAutoResize=HEIGHT` while preserving widths and positions.

Representative corrected geometry:

- front headline `60:18`: `570×10 / NONE` → `570×132 / HEIGHT`
- front guest name `60:20`: `520×10 / NONE` → `520×48 / HEIGHT`
- stub table `60:30`: `165×10 / NONE` → `165×43 / HEIGHT`
- back headline `60:38`: `650×10 / NONE` → `650×124 / HEIGHT`
- back message `60:39`: `590×10 / NONE` → `590×68 / HEIGHT`.

Post-repair screenshots preserve the intended visual composition.

## Long-copy / variable-role stress

Rollback-safe stress copies:

- `62:2 / QA / VNEXT BOARDING FRONT / LONG COPY STRESS / 2026-08-21`
- `62:32 / QA / VNEXT BOARDING BACK / LONG COPY STRESS / 2026-08-21`

Front stress changed only native variable roles:

- long guest name: height `96`, bottom `334`;
- long reception: height `60`, bottom `430`;
- long table: height `60`, bottom `430`;
- stub guest name: height `52`, bottom `172`;
- stub table: height `86`, bottom `356`;
- long final guide: height `48`, bottom `468`.

The extreme stress remains inside the 550px canvas. The name block approaches the event-label region but still maintains separation; reception/table stress remains readable even where the lagoon sweep enters the lower field. This is a pass for realistic content resilience, not permission to accept arbitrarily long production strings without final review.

Back stress expands the message to height `102`, bottom `347`, still leaving clear separation before date/place at y `420`.

## Three-scale visual QA

### Whole-item / thumbnail

PASS.

Front now reads as a joyful physical escort ticket rather than an airline/admin form: deep-ocean anchor → Japanese departure headline → name-first identity → compact event roles → actual detachable stub → oversized sun crop + lagoon movement. The perforation is functional paper language, not fake airport UI.

Back carries the same family into a darker afterglow state with a large coral sunset crop and short Japanese message.

### Reading scale

PASS.

Guest name is the first functional read after the headline. Reception / table / ceremony remain scannable, and stub fields are visually distinct without introducing a dashboard grid. Japanese semantic labels dominate; English is limited to artifact identity and location.

### Actual-size / detail / structure

PASS for the digital master; physical vendor proof remains deferred.

- selected roots: `1200×550` each;
- native text: 16 front + 5 back;
- IMAGE fills: 0;
- corrected auto-height bounds now match rendered content;
- stress copy remains inside the canvas;
- no flattened variable information or generated imagery was introduced.

## Professional council score

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-up: `14/15`
- Japanese typography / editorial craft: `13/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / flight / Hawaii warmth without cliché: `9/10`
- Item-specific functionality: `9/10`
- Physical print credibility: `9/10`
- Editability / realistic content resilience: `5/5`
- Family fit without template sameness: `5/5`

Total: `92/100`.

Executive Creative Director: no veto.
Japanese Editorial Designer: no veto.
Airline / Wayfinding Designer: no veto; functional perforation/stub retained, fake transport authority avoided.
Print Production Director: no veto for the digital master after text-geometry repair; physical proof remains deferred.

## Final comparison against retained selected V5

Retained V5 front/back remain competent, restrained and structurally proven, but their cream/ink coupon language is quieter and closer to premium editorial stationery. The vNext family more clearly fulfills the new brief: pop, joyful, sunny, travel-forward, immediately legible, and physically ticket-like without becoming airport cosplay.

Decision: vNext is the preferred professional direction for the current `SUNSHINE DEPARTURE` brief. Retained V5 remains intact as rollback/history.

## Asset decision

Image generation: `0`.
Drive write: `0`.
Reason: the current quality bottleneck was native text geometry / professional QA, not missing image content. Adding generated imagery would increase decoration without solving a diagnosed defect.

## Deferred finalization

`NOT_PRINT_READY` remains until final guest names, reception/table/final-guide values, physical print stock, perforation/vendor tolerances and final proof are authoritative.

## Next target

Proceed to 青春ふたりきっぷ vNext clean-room art direction. The text-geometry failure is now independently reproduced in two materially different items and should be treated as a cross-item QA rule for new AI-authored Figma candidates.
