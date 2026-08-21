# NRSL — Japanese semantic line-break QA promoted project rule

Date: 2026-08-22
State: `PROMOTED_PROJECT_RULE`

This entry promotes the previously `VERIFIED_CROSS_ITEM` Japanese semantic line-break QA method after a third materially different reproduction in ADD-17.

## Evidence chain

1. **ADD-07 escort guide** — short action phrases were structurally valid but machine-wrapped (`お名前を探 / す`, etc.). Role-specific measure/type adjustment restored phrase-level reading without forcing all copy to one line.
2. **ADD-12 couple quiz** — a display title remained in-bounds but rendered `どこまで知って / る？`; intentional native line breaks at semantic units produced stronger editorial Japanese while preserving the same wording and display scale.
3. **ADD-17 children activity card** — realistic long-copy stress for a new foldout discovery-map candidate was entirely inside the activity surface but automatically split `聞こえた音` across lines. Clause-level native breaks restored natural Japanese rhythm without shrinking the type or reducing the drawing area.

The third reproduction is materially different in role, scale and copy behavior: an A6-ish action guide, a quiz display headline, and a large activity prompt all exhibited the same normalized failure family despite green overflow/collision checks.

## Promoted rule

**For Japanese display/action/prompt roles, bounds correctness is necessary but not sufficient. Reading-scale QA must explicitly inspect semantic line breaking.**

A Japanese text role fails editorial QA when automatic wrapping creates a visibly accidental break such as:

- an orphaned inflection/ending;
- a one-character or unnaturally short grammatical tail;
- a short verb phrase split at a point that impairs instant recognition;
- a clause broken in a way that looks machine-set even though overflow and collision are zero.

Preferred repair order:

1. identify semantic phrase/clause units;
2. test a role-appropriate measure and line count;
3. for authoritative or controlled copy, use intentional native-text line breaks when that creates the strongest editorial rhythm;
4. adjust font size only inside verified actual-size legibility limits;
5. for genuinely variable copy, do not hard-code one final wrap blindly — preserve a practical text-fit contract and rerun realistic stress.

## What this rule is not

- not a universal one-line rule;
- not a fixed number-of-lines rule;
- not permission to shrink Japanese type until it fits;
- not permission to hard-code final line breaks into unknown future copy;
- not a style template shared across items.

Natural multi-line Japanese remains valid. The project-wide requirement is **meaningful phrase-level typography rather than accidental machine wrapping**.

## Production impact

Future Wedding Figma QA should include a Japanese semantic-wrap check in addition to:

- text bounds / outside-root checks;
- text-text collision checks;
- long-copy stress;
- actual-size legibility;
- physical safe-area/fold/trim checks.

The exact wording, type size, width, line count and composition remain item-specific.

## Latest receiving-item evidence

ADD-17 Figma:
- file `PAvkRggJiRuXVypi3RgZCN`
- selected front `62:2`
- selected back `62:22`
- realistic front stress `62:46`
- realistic back stress `62:66`

ADD-17 canonical evidence:
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/PROFESSIONAL-VNEXT-FOLDOUT-DISCOVERY-MAP-QA-2026-08-22.md`
- selection commit `3fc680bb0aac3388aa987983d9018d5c7981e5aa`

Previous cross-item authority:
- `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-22-nrsl-japanese-semantic-linebreak-verified-cross-item.md`
