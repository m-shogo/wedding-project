# るるぶWEDDING — Editorial Flatness V5 QA

Status: `EDITORIAL_FLATNESS_V5_QA_PASS / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Date: 2026-08-02

## Why this pass was selected

The four principal paper-item files had already received live rebuild/design QA passes. The highest-value remaining Figma task was the known Rurubu weakness: repeated rounded cards and shadows still made parts of the publication feel closer to a web/app UI than a Japanese travel magazine.

This pass changed only screenshot-supported weaknesses. It preserved all native text and all semantic photo replacement roles.

## Live authority verified before editing

GitHub `main` latest authority before this pass:
- `d1b7d8e18b2f9d39b5edb342468efa6657798ce5` — 青春ふたりきっぷ live rebuild and QA
- earlier Rurubu V4 authority: `ed71679e7f2c870a2ede0336d13f0324aaa59168`

Live Figma targets:
- `01_RURUBU_AUTHENTIC_OUTER` — node `59:2`
- `02_RURUBU_AUTHENTIC_INSIDE` — node `59:178`

Both frames were present and editable.

## Screenshot-supported weaknesses

1. The front-cover lower feature index repeated large rounded cards with identical shadow behavior.
2. Back-cover friend captions and the main-memory text panel read as app cards rather than printed editorial notes.
3. Inside profile, Q&A, and memory-spot panels repeated rounded corners and shadows too uniformly.
4. `CHECK!`, `FRIENDS MAP`, and `CHECK! LOVE STORY` added redundant callouts without improving navigation.

## Changes applied

### Outer spread

- Converted `BACK_VISUAL_MAIN_TEXT_BG` into a flat paper panel.
- Added `AUTH_MAIN_TEXT_RULE_V5`, a narrow magenta editorial rule, instead of using a full outlined floating card.
- Flattened all three Friends & Family caption backgrounds:
  - 1 px-class corners
  - no drop shadow
  - restrained paper-colored border
- Flattened the front-cover lower feature index:
  - removed shadows from all six feature modules
  - reduced corner radii to 2–6 px according to hierarchy
  - changed `LOWER_BG` from a rounded container to a full editorial paper field
- Flattened the temporary photo-replacement label and right-side kicker.
- Removed redundant outer callouts:
  - `CHECK_BADGE`
  - `CHECK_BADGE_TXT`
  - `RURUBU/Chip/Blue` (`FRIENDS MAP`)

### Inside spread

- Flattened both profile surfaces while preserving their unequal editorial hierarchy.
- Flattened the Q&A outer panel and all three question blocks.
- Flattened the `MAIN QUESTION` label.
- Flattened all four memory-spot article surfaces.
- Flattened history caption/note surfaces and temporary dummy badge.
- Flattened the `PICK UP! 思い出MAP` and `BEST SPOT No.1` labels.
- Removed the redundant `CHECK! LOVE STORY` badge and text.

## Screenshot QA result

Post-fix screenshots were captured for both live production frames.

Verified:
- no visible text clipping
- no missing photo replacement role
- no fold-guide collision
- no new overlap caused by the flattened panels
- back-cover main-memory text remains readable after border/shadow removal
- friend captions remain legible against their paper fills
- front feature index retains a clear large / medium / small hierarchy
- profile and Q&A sections now read more like magazine article panels than app cards
- memory-spots layout still preserves the `1 large + 3 small` hierarchy and route structure
- redundant callouts were removed without leaving unexplained gaps

## Design judgment

The pass intentionally did not eliminate every rounded shape. Number markers, travel labels, stamps, and a small number of emphasis badges remain because they serve authentic magazine navigation and hierarchy.

The goal was not `no rounded corners`; the goal was to stop repeating one UI-card grammar across unrelated article types.

## Preserved constraints

- all 12 semantic photo roles remain replaceable
- normal text remains native editable Figma text
- accepted Drive decorative assets were not regenerated
- no AI transformation of the couple, guests, or dog
- earlier comparison/rollback pages remain intact

## Remaining before final

1. Replace all dummy gradient photo roles with selected real photos.
2. Replace dummy profile, Q&A, history, memory, friends/family, and page-reference copy.
3. Re-run crop, subject-safe-position, brightness, and text-contrast QA after each photo group.
4. Re-run text overflow and density QA after approved copy replacement.
5. Verify the exact printer template, bleed, safe area, fold, and page order.
6. Export the final PDF and run final-print QA.
7. Complete an actual-size physical proof.

## Declaration

Current state:

`EDITORIAL_FLATNESS_V5_QA_PASS / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
