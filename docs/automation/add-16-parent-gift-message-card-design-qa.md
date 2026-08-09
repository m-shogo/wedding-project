# ADD-16 両親贈呈品メッセージカード — Figma Design QA

Date: 2026-08-09
Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Run start Git main: `ee72d4a23d37b0e6f53cc11fa90d8689a30eff53`
- Git main immediately before write: `ee72d4a23d37b0e6f53cc11fa90d8689a30eff53`
- Item spec: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/SPEC.md`
- Figma production file key: `ylmVBbwNcnjueYrymNpa3c`
- Production nodes: front `1:2`, back `1:13`
- QA section: `1:22`
- Post-flow long-copy stress: front `2:24`, back `2:36`
- Drive folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- Drive child items at audit/write time: none

## Verified Figma improvement
The previous native-edit blocker cleared. The existing exact ADD-16 file was reused; no duplicate Figma file was created.

Created a native editable 100×148 mm portrait-equivalent front/back production pair with 3 mm bleed guides, hidden trim/safe guides, semantic text roles, and restrained `HOME PORT` editorial art direction. The composition intentionally avoids rounded-card UI, gradients, shadows, fake transport data, decorative badge clutter, AI-generated family imagery, and fabricated family facts.

All unknown recipient, message, signature and family-specific copy remains explicit native `LAYOUT DUMMY` content. No parent names, family relationships, anecdotes, gift details or presentation order were invented.

After the first stress proof showed the recipient/message area could become visually tight under long copy, the production was hardened with native vertical auto-layout flows:
- front `ADD16/FRONT/CONTENT_FLOW` (`2:22`): title → recipient → hairline → message lead;
- back `ADD16/BACK/MESSAGE_FLOW` (`2:23`): Japanese kicker → hairline → message body.

Pre-flow stress proofs were retained as QA history. Post-flow long-copy proofs were then generated from the updated production.

## Screenshot QA
- whole/reading/detail inspection completed for production front/back;
- post-flow front stress shows long recipient + multi-line message lead without collision;
- post-flow back stress shows multi-paragraph body + long signature without collision;
- visual hierarchy remains Japanese-first with restrained teal hairlines and meaningful negative space.

## Structure QA
Production front:
- native text: 6
- image fills: 0
- frame-bound overflow: 0
- native vertical auto-layout present

Production back:
- native text: 4
- image fills: 0
- frame-bound overflow: 0
- native vertical auto-layout present

Post-flow long-copy stress:
- front overflow: 0; auto-layout height 254 px
- back overflow: 0; auto-layout height 223 px
- image fills: 0

Rollback-safe production baseline duplicates remain under `99_QA / ROLLBACK + STRESS`.

## Drive
Exact Drive folder metadata was re-read immediately before Git write. Folder remains empty and unchanged because no screenshot-supported asset defect or required production raster asset exists.

## Deferred / blocked required input
- one card per family vs shared card;
- gift size/wrapping/attachment and handoff method;
- printed name policy and final recipient/signature copy;
- full vs short message, vertical vs horizontal writing, and overlap with any read-aloud letter;
- printer template/profile, exact vendor bleed/safe requirements and 100% physical proof.

These are `DEFERRED_FINALIZATION` / `BLOCKED_REQUIRED_INPUT` and no longer block design progression. Maintain `NOT_PRINT_READY` until physical/vendor checks are complete.

Next target: `ADD-17 子ども向けミニカード / ぬりえ`.