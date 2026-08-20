# ADD-14 二次会案内 — Professional vNext `MOONLIT RENDEZVOUS` QA

Date: 2026-08-21
Start `main` for this item: `4f6aa93b96a0490e0d0a557efa592cfc46558c9f`
State: `PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`.
- Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`.
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`.
- item SPEC: `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/SPEC.md`.
- Figma file: `IygEr140Yqk12LsGL3TFrT`.
- exact Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`; live metadata verified; Drive write `0`.

## Clean-room boundary

No retained V3/legacy visual layout, route axis, old decoration, old generated asset or crop was used as an authoring source. The new work started from blank frames.

Only verified requirements were carried forward:

- A6 working canvas `592×420` and A5 `840×592`;
- conditional after-party template role;
- native editable venue/address/reception/start/end/fee/access/RSVP/contact/notice semantics;
- all event facts remain unresolved and must not be invented;
- optional QR, if ever used, remains a separate replaceable semantic role.

Retained V3 `32:2 / 32:3 / 32:29` and legacy `1:2 / 1:18` remain untouched for mature comparison/history only.

## Three blank-frame directions

Concept page:
- `51:2 / VNEXT_PRO / ADD-14 AFTER PARTY / 2026-08-21`

Directions:

1. `51:3 / MOONLIT RENDEZVOUS`
   - warm cream invitation side + deep-ocean factual side;
   - oversized coral moon and low mint night wind;
   - strongest balance of night energy, joyful color and immediate information separation.
2. `51:16 / LATE DEPARTURE`
   - full deep-ocean field, oversized pink/mint/yellow activity;
   - visually energetic but closer to a generic night-event poster and less distinct from the retained dark-field family.
3. `51:30 / CITY GLOW POSTCARD`
   - warm upper editorial field + dark lower facts band;
   - clear and bright, but slightly less intimate/after-hours than A.

Professional selection: `MOONLIT RENDEZVOUS`.

## Selected vNext

Selected page:
- `52:2 / SELECTED / VNEXT PRO / ADD-14 / MOONLIT RENDEZVOUS / 2026-08-21`
- A6 `52:3 / VNEXT_SELECTED_CANDIDATE / ADD14 / A6 / MOONLIT RENDEZVOUS`
- A5 `52:20 / VNEXT_SELECTED_CANDIDATE / ADD14 / A5 / MOONLIT RENDEZVOUS`
- hidden stress A6 `52:38`
- hidden stress A5 `52:55`

### A6

- cream left field carries `夜のつづきへ、もうひと旅。`, status, venue/address, access and notice;
- navy right field carries reception/start/end/fee/RSVP semantics;
- coral moon and bottom-edge mint wind create night-flight/afterglow motion without fake route nodes, neon signage, alcohol motifs, barcode or UI-card containment;
- unknown facts remain explicit native placeholders.

### A5

A5 is an independent reflow rather than a scaled copy:

- cream upper editorial field carries title, status, venue/address/access/notice;
- deep-ocean lower field carries practical time/fee/RSVP/contact roles;
- coral moon and mint edge gesture preserve family resemblance without forcing the A6 split-column geometry.

The first A5 screenshot caught a title wrap that collided with `[実施状況]`. The title was resized/reflowed before selection.

## Long-copy stress and geometry repair

Stress uses intentionally long venue/address/access/notice/fee/RSVP/contact placeholders without fabricating real facts.

- A6 stress screenshot: PASS;
- A5 stress initially appeared visually acceptable, but after correct native auto-height geometry was applied, programmatic readback exposed a real `TXT_VENUE_NAME` ↔ `TXT_VENUE_ADDRESS` collision;
- A5 stress address was moved down and re-screened;
- final A5 stress screenshot and collision readback: PASS.

This validates the existing project learning that screenshot appearance alone is insufficient when AI-authored text geometry has not yet been read back in its true auto-height state.

## Auto-height hardening

Initial structural readback found all newly-authored text nodes as fixed-height because the authoring helper set `textAutoResize='HEIGHT'` before calling `resize()`, and the sizing call reset the mode.

Bounded repair:
- all `50` native text nodes across selected A6/A5 and stress A6/A5 were explicitly set to `HEIGHT` after sizing;
- final fixed-height count: `0 / 0 / 0 / 0`;
- visible text outside root: `0` on all roots;
- IMAGE fills: `0`;
- final same-parent collisions: `0` on all roots.

## Visual QA

A6:
- native `592×420` whole/reading/detail review: PASS;
- long-copy native stress: PASS.

A5:
- native `840×592` whole/reading/detail review: PASS;
- long-copy stress after title and address fixes: PASS.

## Mature comparison against retained V3

The retained V3 was opened only after the new candidate passed visual, stress and structural QA.

Retained V3 remains functionally strong but reads as a very dark information sheet centered around a horizontal time axis. The vNext is materially more inviting and more aligned with the current joyful night-flight brief: warm invitation light, stronger front/back information contrast, bigger emotional scale and memorable afterglow color without sacrificing the practical hierarchy.

Decision: vNext clearly wins the current professional brief. Old V3/legacy remain preserved.

## Professional Design Council score

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-up: `14/15`
- Typography / Japanese editorial craft: `13/15`
- Composition / hierarchy / rhythm: `13/15`
- Travel-flight-Hawaii integration without cliché: `8/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `9/10`
- Editability / content resilience: `5/5`
- Family fit without template sameness: `5/5`

Total: `91/100`.

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains after the A5 wrap/collision and auto-height repairs.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The current quality problem was emotional amplitude and night-event information hierarchy, not a missing hero image. Venue/event facts are not confirmed, so generated venue photography, maps or QR-like content would be misleading and prohibited. Fixed decoration stays native simple shapes; Drive received no asset write.

An invisible `AREA_AFTER_PARTY_QR_REPLACEABLE` semantic reserve exists only as a replaceable role; it does not imply that QR use is confirmed.

## BLOCKED_REQUIRED_INPUT

Final production/adoption still requires authoritative facts:

- whether the after-party is actually held; otherwise this item becomes `NOT_REQUIRED`;
- official venue/address/floor;
- reception/start/end times;
- fee/payment method;
- access/travel time;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if used.

## DEFERRED_FINALIZATION

- printer template/profile;
- exact bleed/safe-area/export settings;
- QR scan proof if used;
- 100% A6/A5 physical print proof.

Result: `PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.
