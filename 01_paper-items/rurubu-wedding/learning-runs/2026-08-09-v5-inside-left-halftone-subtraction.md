# V5 inside-left halftone subtraction

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Scope: Current inside spread `77:290`, bounded decorative detail only
State: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PROJECT_RULE_NOT_PROMOTED`

## Authority and live-state read before action

Re-read the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, Rurubu production OS, postmortem/V6 guardrails, editorial knowledge base, lessons log, and V6 Current Status. Live Figma and the Drive Q60 cover-hero derivative were also rechecked before editing.

V6 remains production-blocked because V5 cover hero `77:148` is still the only active photo-role blocker. Drive still contains `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`; no blocked transport mechanism was retried in this run.

## Visible problem

The inside-left profile page retained a very low-opacity pink `AUTH_HALFTONE_TEXTURE` behind/near the bride profile note. The dots had no profile, travel, factual, navigation, contrast, or grouping role. A prior independent experiment had already removed the equivalent non-semantic texture on the inside-right page.

Exact Current node before experiment:
- `77:373 / AUTH_HALFTONE_TEXTURE`, visible `true`
- parent `77:363`
- local geometry `84 × 56`

## Hypothesis

Removing only the left-page halftone would reduce template-like decorative noise and make the bride profile note read as direct editorial type, without weakening profile identity or page hierarchy.

Expected improvement:
- cleaner profile field;
- less decorative duplication;
- slightly stronger native-type authority.

Possible regression:
- the bride profile could become visually too empty;
- removal could make the left page feel less lively than the right.

Evidence required:
- rollback-safe duplicate;
- whole-spread comparison;
- detail inspection of the texture itself;
- Current screenshot after promotion;
- structure readback proving text, images, fold, rollback and image hashes remain unchanged.

## Prototype

Created rollback-safe comparison:
- `547:2 / V5_INSIDE_LEFT_HALFTONE_SUBTRACTION_QA_2026_08_09`

Only the cloned left halftone was hidden:
- comparison node `547:85 / AUTH_HALFTONE_TEXTURE` → `visible=false`

No text, image, crop, geometry, fold, route, card, or other decoration was changed.

## Three-scale QA

### Whole spread

The comparison retained the same dominant path:
`OUR PROFILE / ABOUT US → profile pair → 3 QUESTIONS → common interests → TRAVEL NOTE` on the left and `OUR HISTORY → history photograph → MEMORY SPOTS` on the right.

The removed dots were not needed to balance the spread; the profile photography, vertical accent rules, numbered question markers, and section typography already provide sufficient energy.

### Reading/page scale

The bride-side note `きれいな景色を見つけるのが得意` remains clearly associated with the bride profile through position, color, and the adjacent blue vertical rule. No grouping information was lost.

### Actual-size/detail

Isolated inspection of Current parent `77:363` showed the texture was essentially a faint pink dot field on otherwise empty paper. It carried no unique semantic content or contrast function. This confirmed that subtraction removes decoration rather than information.

## Decision and Current promotion

`ADOPTED FOR V5 CURRENT`.

Current mutation:
- `77:373 / AUTH_HALFTONE_TEXTURE`: `visible true → false`

The node was hidden, not deleted, preserving rollback/editability.

## Post-promotion verification

Current inside screenshot passed without visible hole, collision, reflow, crop change, or hierarchy regression.

Structure readback:
- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- left halftone `77:373`: hidden
- right halftone `77:508`: hidden
- history plane `77:502`: hidden from a later verified run
- fold guide `77:540`: visible
- rollback `59:2` and `59:178`: preserved
- comparison `547:2`: preserved

Key image hashes unchanged:
- groom `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory 01 `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 03 `77:446`: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- memory 04 `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Learning status

Source: live Figma comparison + project subtraction-first editorial rule.

Hypothesis: a faint non-semantic texture can be removed when type, alignment, and semantic color already provide grouping.

Result: verified improvement in this bounded profile context.

Failure: none in the adopted path; importantly, no attempt was made to generalize the result to all textures or decorations.

Status: `VERIFIED / V5 CURRENT ADOPTED / PROJECT_RULE NOT PROMOTED`.

Next application: continue evaluating decorations only when they have a concrete semantic or contrast job. Do not remove useful travel/location markers merely for minimalism.

## Gate impact

No photo-role state changed:
- PHOTO_ROLE_PASS `10/11`
- ROLE_COMPLETE `10/11`
- dominant photo roles `2/3`

The unresolved cover hero remains the only active V5 photo blocker. V6 production remains closed until the full V5 dummy-photo/design QA gate is genuinely verified.
