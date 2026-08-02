# Candidate Lesson — Container Removal Requires Contrast Re-audit

Date: 2026-08-03
Applies to: Rurubu V5; candidate for V6 and later wedding editorial work
Status: `TESTED / NOT YET PROMOTED`

## Context

The V5 front-cover contents block used a large blue rounded Feature 02 panel. A bounded subtraction experiment removed the panel while retaining the number, title, route, dots, and page reference.

## Observed opportunity

The panel could be removed without losing Feature 02's meaning because its semantic hierarchy was also carried by numbering, typography, placement, and the travel-route motif.

## Observed regression

Immediately after the panel was hidden, the route line and dots remained white. They had been designed for the blue background and became nearly invisible on the cream field.

## Root cause

The container was treated as an isolated shape even though several foreground elements had contrast dependencies on it.

## General editorial principle

Subtraction is not merely hiding a background. When removing containment, re-evaluate every dependent foreground element—text, rules, dots, icons, captions, and page references—against the exposed background.

## Process change

For future de-card passes:

1. identify the semantic information that must survive;
2. hide or remove the container on a bounded node set;
3. review all descendant and associated foreground paints;
4. correct contrast using the existing palette rather than adding a replacement card;
5. run whole-item and reading-scale screenshots before adoption.

## Design change and verification

- panel `77:213` hidden
- Feature 02 title and page text changed to navy
- route `77:244` and dots `77:245`–`77:247` changed to blue
- final whole-spread screenshot shows preserved navigation, stronger hierarchy, and reduced dashboard feel
- semantic IDs, native text, editability, and rollback remain intact

## Promotion requirement

Promote to the main Rurubu knowledge base only after the same dependency-aware subtraction method succeeds on at least one additional module or wedding item without introducing legibility regressions.
