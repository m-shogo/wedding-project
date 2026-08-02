# Quality Over Legacy Design

Date: 2026-08-02
Scope: all wedding design work in `m-shogo/wedding-project`
Status: Current project decision

## Decision

Past designs are evidence and comparison material, not mandatory starting points.

The project must preserve useful knowledge, production discipline, accepted content, rights information, and rollback history. It must not preserve weak visual decisions merely because time was already spent on them.

For Rurubu V5/V6 and every future wedding item—including the passport booklet, boarding-pass escort card, Mintia ticket, invitations, place cards, signs, maps, labels, and new printables—the current best design should be chosen after comparison, even when that requires a clean-room redesign or complete asset regeneration.

## What must be inherited

- confirmed wedding concept and factual content
- user preferences and rejected directions
- editorial-design knowledge
- Japanese typography and print-production knowledge
- asset provenance, permissions, and replacement status
- Drive-first asset lifecycle
- semantic Figma structure, native text, editability, and rollback safety
- verified lessons from failures and successful experiments

## What must not be inherited automatically

- old composition
- old hero-photo placement
- card geometry
- border radius, shadow, gradient, sticker, and badge density
- previous color distribution
- old crop decisions
- generated photos or image hashes
- an accepted-looking layout that has not passed current editorial and print QA
- design choices kept only because they are already implemented

## Required comparison process

Before carrying an old design forward:

1. State the design problem and the intended guest experience.
2. Review current editorial/Figma/AI knowledge and relevant references.
3. Identify what remains valid from the old design.
4. Produce at least one materially different clean-room alternative when the old structure may be limiting quality.
5. Compare the legacy-derived and clean-room candidates at whole-item, reading, and actual-size detail scales.
6. Score hierarchy, originality, wedding identity, typography, photography, usability, print plausibility, and absence of AI/template/Web-UI feel.
7. Adopt the stronger candidate or combine only clearly superior components.
8. Preserve rejected candidates as rollback/comparison evidence, not as Current.

A new candidate is not better merely because it is newer. The decision must be supported by screenshots, structure review, and item-specific QA.

## Regeneration policy

Regenerate visual assets when one or more of these are true:

- the source composition does not fit the target aspect ratio
- the image lacks a usable text-safe zone
- the visual quality is below the required role size
- the image makes the design feel generic, AI-generated, or stock-like
- the image conflicts with the new editorial concept
- recognisable generated people may be mistaken for the real couple, family, friends, or dog
- a substantially better result is likely from a revised role brief

Do not regenerate merely to create activity or duplicate accepted work. Every regeneration must have a stated defect, changed prompt/brief, and acceptance criterion.

## Anti-anchoring review questions

Before polishing any existing design, ask:

- Would this layout still be chosen if it did not already exist?
- Is this element present because it helps the reader, or because it was expensive to make?
- Are we solving the current content problem or decorating the previous solution?
- Would a professional editor start from this structure today?
- What would be designed differently with no access to the old frame?
- Can removal or a new hierarchy produce a larger gain than refinement?

## Completion rule

A legacy-derived design may become Current only when it wins a current comparison. A clean-room redesign may become Current only when it passes the same evidence gates.

The governing principle is:

> Preserve knowledge and truth. Replace weak visuals without hesitation. The best verified design wins.
