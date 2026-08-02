# V5 Back-Cover Decorative Subtraction

Date: 2026-08-03
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_YET_PROMOTED`

## Visible problem

The V5 back cover had three isolated non-informational ornaments—a floating heart, a map pin, and a faint halftone block—placed in otherwise useful negative space. Each was individually small, but together they weakened the editorial hierarchy and made the page feel more like a decorated template than a deliberately composed magazine back cover.

## Principle tested

Attempt subtraction before adding decoration. A decorative element should remain only when it supports navigation, meaning, hierarchy, rhythm, or the wedding/travel narrative strongly enough to justify its visual weight.

## Bounded live change

Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer candidate: `77:18`

Hidden without deleting:

- `77:116` — `RURUBU/Icon/heart`
- `77:118` — `RURUBU/Icon/pin`
- `77:122` — `AUTH_HALFTONE_TEXTURE`

The nodes remain available for rollback. No text, photograph, content module, crop, or hierarchy-bearing element was removed.

## Expected improvement

- cleaner negative space around the main-memory copy and journey section
- fewer unrelated focal points
- stronger path from main memory → Friends & Family → journey timeline
- reduced sticker/template feel

## Possible regression checked

The subtraction could have made the back cover too quiet or removed useful travel cues. Whole-spread screenshot review showed that travel identity remains strongly carried by the title, airplane motif, scrapbook frame, photo tabs, journey timeline, issue labels, and copy. The removed ornaments were not needed for comprehension or balance.

## Verification

Post-change whole-spread screenshot QA confirmed:

- no text loss or overlap
- no new empty-space imbalance
- no contrast regression
- no damage to the front cover
- clearer and calmer back-cover reading path

Structure QA confirmed:

- all three target nodes exist and are only `visible=false`
- current outer candidate `77:18` remains intact
- rollback frames `59:2` and `59:178` remain intact
- dominant image nodes `77:24` and `77:148` remain IMAGE-filled
- native text count remains 88 in the current outer frame
- semantic structure and parent relationships remain intact

## Reusable candidate lesson

Small decorative items should be judged cumulatively, not one by one. Several harmless-looking ornaments can collectively erode hierarchy. During final editorial review, temporarily hide every ornament that carries no information, then restore only those whose removal creates a demonstrable loss.

This is adopted for the current V5 back cover but is not yet a universal project rule. It should be retested on the inside spread and V6 clean-room concepts before promotion.

## Next application

Continue V5 by prioritizing dominant-photo quality when binary-safe transfer becomes available. Until then, audit remaining front-cover ornaments and inside-spread decorations only through bounded, rollback-safe subtraction tests, avoiding changes that merely create activity.
