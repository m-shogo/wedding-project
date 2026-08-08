# V5 inside-right halftone subtraction

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Scope: Current inside spread `77:290`, bounded decorative detail only
State: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PROJECT_RULE_NOT_PROMOTED`

## Authority read before action

This run re-read the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, current V5 learning evidence, and the V6 production gate. V6 remains blocked by the unresolved V5 cover-hero role.

## Visible problem

The inside-right history page contained a very low-opacity halftone field below the timeline. It carried no chronology, location, caption, image provenance, or navigation information. The travel-plane icon and map pin do carry recognizable travel/location meaning, so those were treated separately rather than removed as a bundle.

## Hypothesis

Removing only the non-semantic halftone should slightly reduce template-like decorative noise while preserving the travel identity and all reading hierarchy.

Expected improvement:
- cleaner history-to-photo transition;
- less gratuitous decorative texture;
- unchanged semantic travel cues.

Possible regression:
- the history header could become too empty;
- removing the plane together with the texture could weaken travel character.

Evidence required:
- rollback-safe duplicate;
- whole-spread screenshot comparison;
- current screenshot after adoption;
- structure audit proving native text, image hashes, fold guide, travel plane/pin, rollback frames, and comparison frame remain intact.

## Experiment

Created rollback-safe comparison:
- `535:2 / V5_INSIDE_PLANE_HALFTONE_SUBTRACTION_QA_2026_08_09`

Initial prototype hid both the inside-right plane and halftone. Whole-spread comparison showed that removing both made the header cleaner but unnecessarily weakened the travel motif. The prototype was therefore revised to:
- keep `RURUBU/Icon/plane` visible;
- keep `RURUBU/Icon/pin` visible;
- hide only the inside-right `AUTH_HALFTONE_TEXTURE`.

Comparison frame was renamed:
- `535:2 / V5_INSIDE_HALFTONE_ONLY_SUBTRACTION_QA_2026_08_09`

## Caught mistake and correction

The first Current write searched `AUTH_HALFTONE_TEXTURE` from the full inside spread and matched the left-page copy first (`77:373`) instead of the intended inside-right texture (`77:508`). Screenshot QA immediately exposed that the right-side dots were still present.

The file was then audited for duplicate names:
- left halftone `77:373`, parent `AUTH_EDITORIAL_DETAIL_V4` on the profile page;
- right halftone `77:508`, parent `AUTH_EDITORIAL_DETAIL_V4` on the history page.

Correction:
- restored `77:373` to `visible=true`;
- set `77:508` to `visible=false`.

Reusable execution lesson: when duplicate semantic names exist in sibling page subtrees, scope the lookup to the intended page/frame or use the exact node ID; a whole-spread `findOne` is unsafe even for a simple visibility mutation.

## Verified Current result

Current inside: `77:290`

Post-correction screenshot QA:
- left-page halftone preserved;
- inside-right halftone removed;
- plane preserved;
- pin preserved;
- no text reflow, collision, image crop change, or hierarchy loss observed.

Structure readback:
- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- left halftone `77:373`: visible
- right halftone `77:508`: hidden
- fold guide `77:540`: visible
- travel plane `77:502`: visible
- travel pin `77:504`: visible
- rollback frames `59:2` and `59:178`: preserved
- comparison `535:2`: preserved

Relevant image hashes remained unchanged, including:
- groom `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory 01 `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 04 `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Decision

`ADOPTED FOR V5 CURRENT` for the inside-right halftone only.

The plane and pin subtraction are `REJECTED` for this pass because they remove useful travel/location character without solving a real hierarchy problem.

This is not promoted to a project-wide rule. It remains a bounded V5 editorial finding.

## Gate impact

No photo-role state changed. The unresolved cover hero remains the only active photo-role blocker:
- PHOTO_ROLE_PASS `10/11`
- ROLE_COMPLETE `10/11`
- dominant `2/3`

V6 production remains closed until the V5 cover-hero and final dummy-design gate are verified.
