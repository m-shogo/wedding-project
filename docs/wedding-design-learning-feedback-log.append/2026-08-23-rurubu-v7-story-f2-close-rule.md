# Rurubu V7 Story F2 — design-learning feedback

Date: 2026-08-23
Scope: Rurubu WEDDING only

## What changed because of new professional knowledge

Fresh JLREQ/JAGAT research shifted the decision away from adding another decorative treatment. The spread was reviewed as a Japanese print composition whose structure should be carried primarily by page architecture, type hierarchy and content sequence.

That changed the live design decision: the right Chronology close rule was tested as optional furniture rather than assumed necessary because the left Story page had a matching rule.

## Before

F `2290:4` repeated matching heavy close-rule grammar on both Story and Chronology pages.

## Tested change

F2 `2351:2`:

- right chronology rule hidden;
- right concluding copy moved upward to close from the chronology itself;
- left Story close rule retained;
- no copy, image, crop, palette or title change.

## Result

F2 passed whole-item 500 px, reading 1400 px and actual-size `1587×1123` design QA. Structure readback: native text 24, IMAGE 4, text collision 0, bounded 18 px edge risk 0, Japanese font mismatch 0, kinsoku/one-character explicit-line findings 0.

F2 promoted to current V7 Story comparison. Old F retained hidden as rollback.

## Failure fingerprint learned

`F-RSL-243-MIRRORED-CLOSE-RULES-EQUALIZE-DIFFERENT-EDITORIAL-PAGE-JOBS`

The failure is not “rules are bad.” It is using the same closing furniture to force symmetry between pages that have different editorial jobs when one side already has sufficient structural closure.

## Before/after learning check

Yes, new knowledge materially changed the decision. Without the page-architecture research, the likely move would have been another local styling adjustment around the chronology close. Instead, the experiment removed redundant furniture and preserved role difference.

## Remaining truth gates

V7 Story photography remains structural dummy material. DESIGN QA pass does not satisfy REAL CONTENT, printer template/preflight or physical proof gates.
