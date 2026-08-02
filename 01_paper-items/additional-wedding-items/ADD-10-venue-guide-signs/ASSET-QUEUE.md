# ADD-10 会場案内サイン — ASSET QUEUE

Status: `NO_RASTER_REQUIRED / FIGMA_NATIVE`
Date: 2026-08-02

## Decision
Production raster assets: **0**

## Native Figma build queue
- [ ] Confirm actual venue floor map and all guest-accessible routes
- [ ] Confirm required destinations and number of signs
- [ ] Confirm each sign's arrow direction at the real installation point
- [ ] Build optical arrow set: left / right / forward / turn / upstairs / downstairs only as required
- [ ] Build A4 portrait master
- [ ] Build A5 landscape reflow; do not scale A4 mechanically
- [ ] Build optional narrow format only if stand or wall geometry requires it
- [ ] Add semantic node naming from `SPEC.md`
- [ ] Add explicit TBD layer that is excluded from final export
- [ ] Capture grouped screenshots for left/right/forward variants
- [ ] Correct spacing and arrow balance from screenshot evidence
- [ ] Run 100% print proof and low-light / glare test

## Reuse policy
- Do not reuse the ADD-01 compass, route badge, or travel badge as default decoration
- Do not copy the visual shell of WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or るるぶWEDDING
- Native text and vector geometry are preferred because destination and direction information will change

## Raster escalation condition
Create or reuse a raster only when all conditions are met:
1. a concrete visual defect is visible in screenshot or physical proof,
2. native vector cannot solve it without reducing editability,
3. the asset has one fixed semantic purpose,
4. the final file passes alpha/print QA.
