# V5 Friends & Family two-up scope comparison — 2026-08-07

Scope: Rurubu WEDDING V5 only. No Passport, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Visible problem

The live back-cover Current candidate uses only two visible Friends & Family photo/caption groups, but `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json` still treated the hidden legacy `V5-11 / BACK_VISUAL_FRIEND_1_PHOTO / 77:35` group as a required Current photo role. This created a mismatch between the editorial Current and the completion denominator.

Live Current evidence before the experiment:
- `77:35 / BACK_VISUAL_FRIEND_1_PHOTO`: hidden
- `77:36 / DUMMY_LABEL__BACK_VISUAL_FRIEND_1_PHOTO_LABEL`: hidden
- `77:37 / BACK_VISUAL_FRIEND_1_CAP_BG`: hidden
- `77:38 / BACK_VISUAL_FRIEND_1_CAP`: hidden
- `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`: visible
- `77:41 / BACK_VISUAL_FRIEND_2_CAP_BG`: visible
- `77:42 / BACK_VISUAL_FRIEND_2_CAP`: visible
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`: visible
- `77:45 / BACK_VISUAL_FRIEND_3_CAP_BG`: visible
- `77:46 / BACK_VISUAL_FRIEND_3_CAP`: visible

The Drive master for legacy V5-11 is still preserved and readable:
- filename: `11_FRIENDS_FAMILY_01_TOAST_DUMMY.png`
- Drive ID: `1zZfvktztbPx59Yb0Gxor8IsbGG1w6Fq8`

## Anti-anchoring question

Would a third Friends photo/caption group be added if the hidden legacy group did not already exist?

The Current two-up composition already has a clear section title, two unequal photographs, two captions, and sufficient quiet space before `OUR JOURNEY ROUTE`. Therefore the third group must prove an editorial gain rather than remain required because it existed in an older structure.

## Hypothesis

Restoring the old third Friends group will increase local density without adding a necessary narrative role, while the Current two-up treatment will read more clearly and preserve stronger separation from the journey route.

Expected improvement if two-up wins:
- cleaner Friends & Family hierarchy;
- less crowded lower half;
- clearer transition into `OUR JOURNEY ROUTE`;
- truthful asset ledger that distinguishes preserved legacy material from active Current scope.

Possible regression:
- two photographs might feel under-populated for a Friends & Family section;
- removing the third active role could reduce the feeling of abundance associated with a travel magazine.

Evidence required:
- rollback-safe duplicate, not Current mutation;
- whole back-page comparison;
- reading-scale comparison of Friends → route transition;
- structure check that hidden semantic nodes and Drive source remain preserved.

## Experiment

Created a rollback-safe duplicate of Current back page:
- `336:2 / V5_BACK_FRIENDS_3UP_TEST_2026_08_07`

Only in the duplicate, restored the previously hidden Friend 1 group:
- `336:18` photo
- `336:19` dummy label
- `336:20` caption background
- `336:21` caption

Current `77:19` was not modified.

## Result

**CURRENT TWO-UP WINS / THREE-UP REJECTED.**

Whole-page comparison shows the three-up restoration immediately creates collision/overlap in the Friends area: the restored first image enters the existing two-photo composition and its caption text overlaps the active caption region. The Current two-up layout remains cleaner, easier to scan, and gives the route section a deliberate pause.

At reading scale, Current preserves:
`OUR TRAVEL NOTES → main memory → FRIENDS & FAMILY (2 supporting memories) → OUR JOURNEY ROUTE`.

The rejected comparison frame is preserved as rollback/comparison evidence rather than deleted.

## Structure and provenance result

Current semantic nodes `77:35`–`77:38` remain present but hidden; no deletion occurred. The V5-11 Drive master also remains intact. Therefore V5-11 is not being marked `PHOTO_ROLE_PASS` or `ROLE_COMPLETE`; it is being retired from the active Current visual scope.

Recommended ledger semantics:
- total registered roles: `13`
- active Current roles: `12`
- retired preserved roles: `1`
- retired role: `V5-11`
- `photo_role_pass`: unchanged
- `role_complete`: unchanged

A retired role can be reactivated only if a later clean-room/current comparison proves that a three-photo Friends composition is stronger. Reactivation requires normal Drive → derivative → Figma → screenshot → structure evidence.

## Learning status

A completion ledger must represent the Current editorial scope, not force hidden legacy modules back into the design merely to satisfy an old denominator. Retirement is not completion and must preserve provenance, semantic nodes, and rollback evidence.

Status: `PROTOTYPED → VERIFIED / CURRENT_TWO_UP_CONFIRMED / V5-11_RETIRED_FROM_ACTIVE_SCOPE / GLOBAL_RULE_NOT_PROMOTED`

## Gate impact

This does **not** advance any photo-quality pass:
- dominant-photo gate remains unresolved;
- `PHOTO_ROLE_PASS` count remains unchanged;
- V5 dummy-design gate remains closed;
- V6 production gate remains closed.
