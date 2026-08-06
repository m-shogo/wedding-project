# Internal Production Copy Must Not Ship as Editorial Microcopy

Date: 2026-08-06
Status: `VERIFIED FOR V5 / NOT YET PROJECT_RULE`

## Source

Live Rurubu V5 inside-right page, node `77:538 / AUTH_MAP_MICRO`, showing `1大＋3小で、主役の場所を明確に。` above the Memory Spots module.

## Hypothesis

A concise sentence can visually resemble legitimate magazine microcopy while actually being a designer-facing composition instruction. Leaving it visible reduces editorial authenticity and risks exposing process language to guests.

## Result

Hiding the node removed the internal instruction without changing the Memory Spots heading, numbered photo hierarchy, captions, native text inventory, image fills, fold guide, or rollback frames. Whole-item, reading-scale, and actual-size/structure review found no empty gap, clipping, collision, text reflow, crop regression, or hierarchy loss.

## Failure / limit

Do not remove microcopy merely because it is small or secondary. Keep reader-facing captions, location information, factual context, explanatory lines, and navigation. Remove only text whose audience is the designer, operator, or QA process rather than the guest.

## Adopted use

For Rurubu V5, audit Current candidates for visible process directions, layout recipes, QA labels, and placeholder instructions before declaring dummy-design completion. Preserve such nodes hidden when rollback or learning value remains.

## Next application

Search the remaining V5 Current frames for copy that describes layout mechanics rather than wedding content, and verify each candidate at whole-item, page, and actual-size scales before subtraction.