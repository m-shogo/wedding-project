# NRSL — Internal proof/status labels must not become guest-facing copy

Source scope/items: non-Rurubu / ADD-13 message card, ADD-14 after-party guide, ADD-16 parent gift message card

State: `VERIFIED_CROSS_ITEM`

## Visible problem
Across three materially different print artifacts, a standalone internal production/status label remained visible in the selected clean-room composition even though the actual unresolved semantic fields were already explicitly marked as placeholders.

Examples included a separate `LAYOUT DUMMY` line immediately under an otherwise guest-facing headline or title. At whole-item scale this read as proof-sheet metadata and interrupted the intended emotional/editorial hierarchy.

## Root cause
Placeholder truthfulness and production-status visibility were being conflated.

The semantic requirement is to keep unresolved facts explicit and editable. It does **not** require an additional standalone production-status line when each unresolved field already carries its own semantic placeholder state.

## Bounded verified changes
### ADD-13
- selected clean-room V6 retained the unresolved semantic fields;
- internal guest-irrelevant microcopy/status was removed or translated to reader-facing labeling;
- evidence commit: `e632d8dfa6f201f472cd048fe1452096940ae5e9`.

### ADD-16
- selected clean-room V3 preserved recipient/message/date/signature placeholders;
- only the redundant title-status label was hidden;
- evidence commit: `8de6d8a13ee1ff949334cdef971dbbde8bcbc2d7`.

### ADD-14
- selected clean-room V3 A6/A5 preserved venue/address/time/access/fee/RSVP/contact placeholders;
- only `META / TITLE STATUS / LAYOUT DUMMY` was hidden in A6/A5 and corresponding stress clones;
- hidden rollback copies: `37:2`, `37:29`, `37:56`, `37:83`;
- post-change A6/A5 screenshots PASS;
- stress A6 `33:2` and A5 `33:28`: visible text outside root = `0` after cleanup;
- evidence commit: `9434671c33f43c2f5de9538b34a84cd902f8568f`.

## Expected improvement
Keep uncertainty/provisional state attached to the actual editable semantic role while removing proof-sheet language from the reader-facing hierarchy.

This improves thumbnail/editorial purity without inventing final copy or weakening semantic honesty.

## Regression risk
Do not generalize this into hiding unresolved facts.

A field whose final value is unknown must remain explicit as a semantic placeholder. The removable element is only a **redundant standalone internal status/proof label** that does not represent a guest-facing role.

## Three-scale result
The pattern has now been independently reproduced across message-card, event-guide, and parent-gift-card artifacts:

- whole/thumbnail: cleaner headline-to-content hierarchy;
- reading scale: semantic placeholders remain understandable;
- actual-size: no proof/status line competes with guest-facing copy;
- long-copy structure remains intact where revalidated.

## What must remain item-specific
Do not transfer exact typography, colors, wording, coordinates, layout grammar, or the decision to hide any particular semantic placeholder.

## Cross-item default
When a selected print candidate shows internal words such as `STATUS`, `DUMMY`, `QA`, `PROOF`, `TEMP`, or implementation instructions as an **independent reader-facing line**, ask:

1. Does this line represent an actual guest-facing semantic role?
2. Is the unresolved state already encoded on the real variable field?
3. Would removing only this standalone line preserve truthfulness and editability?

If yes, remove/hide the redundant internal line rollback-safely and rerun screenshot + long-copy/structure QA.

Do not remove semantic placeholders merely to make a screenshot look final.
