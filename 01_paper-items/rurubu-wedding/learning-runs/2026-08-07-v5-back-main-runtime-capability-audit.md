# V5 back-main runtime capability audit — 2026-08-07

## Scope

Rurubu WEDDING V5 only. No Passport, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Authorities reread before work

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `01_paper-items/rurubu-wedding/RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `01_paper-items/rurubu-wedding/POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-HAWAII-ASSET-QUEUE-2026-08-02.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-HAWAII-REFERENCE-ANALYSIS-2026-08-02.md`

## Visible problem

The V5 back-cover dominant role `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO / node 77:24` is still showing the older sunset-dining IMAGE fill (`2cfd19cf1701db58039a4fc645e4279832ec465a`) in the live Figma candidate. This is materially weaker than the already accepted travel-flatlay derivative because the current photo duplicates the dining/Friends-and-Family mood instead of functioning as a distinct travel-memory anchor.

## Verified source evidence

Drive derivative read back successfully:

- Drive ID: `1rSYTEUwb3xE87hGOSmuKWuM7cJ9SCA0i`
- filename: `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q88.jpg`
- MIME: `image/jpeg`
- dimensions: `944 x 608`
- bytes: `161671`
- local SHA-256 from the fetched bytes: `bb9b64002a5ab669917cfc574224cf821ad69aacaae4f406f1cd0f2f5f715966`

Visual QA of the readback derivative passed for this dummy role: the camera, map, rings, flowers, compass, notebook and pen are sharp enough for the 472 x 304 Figma role, the frame ratio is exact 2x, there is no recognizable generated person, and the image has a distinct travel/editorial job.

## Live Figma audit

File: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `01_RURUBU_WEDDING`

Current dominant-role hashes:

- V5-10 back main `77:24`: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- cover hero `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- history `77:422`: `1bfd7f1fa601206bfed1594a140b40554e85d77a`

Rollback frames remain present:

- outer `59:2`
- inside `59:178`

Fold guide `77:288` remains present.

The current outer candidate has 85 native text nodes, 41 visible text nodes, and 14 IMAGE-fill nodes. The inside candidate has 92 native text nodes, 59 visible text nodes, and 9 IMAGE-fill nodes.

## Tested hypothesis

**Hypothesis:** the current `use_figma` runtime may expose `figma.createImageAsync`, allowing the verified Drive derivative to be imported directly from a short-lived raw readback URL and avoiding the older blocked raw-upload route.

Capability probe returned:

- `typeof figma.createImageAsync === "function"`
- `typeof fetch === "undefined"`
- `typeof figma.createImage === "function"`

A bounded write attempt then called `figma.createImageAsync` with the temporary raw readback URL before touching node `77:24`.

## Result / failure

The write attempt failed atomically with:

`Error: in createImageAsync: "createImageAsync" is not a supported API`

No node mutation occurred. The existing V5-10 hash therefore remains unchanged.

A full IMAGE-fill inventory of the Rurubu page was also checked. No hidden/live IMAGE hash could be verified as the accepted V5-10 travel-flatlay derivative, so reusing an already-imported hash is not available.

## Decision

- URL-based `createImageAsync`: **REJECTED for this runtime**.
- Retrying the same URL method: **do not do it**.
- Reusing an already-imported matching Figma hash: **not available**.
- Previously verified chunked shared-plugin-data transport remains the next safe method because it has already demonstrated byte reconstruction + `figma.createImage` in this same file.

## Expected improvement once applied

Replacing the sunset-dining placeholder with the verified travel-flatlay derivative should:

- give the back cover a distinct travel-memory anchor;
- reduce semantic duplication with Friends & Family / dining imagery;
- improve dominant-photo specificity at whole-item and reading scales;
- retain an identity-neutral dummy role;
- preserve node geometry and native/editable structure.

## Possible regression

- transport-compressed bytes could be reconstructed incorrectly;
- image replacement could accidentally alter crop behavior;
- the travel-flatlay may visually compete with `OUR TRAVEL NOTES` if contrast/crop is poor;
- a transport success could be mistaken for visual completion.

## Evidence required for adoption

The role must not advance to `PHOTO_ROLE_PASS` until all of the following exist:

1. exact byte reconstruction / accepted derivative source evidence;
2. new Figma image hash on exact node `77:24`;
3. whole outer-spread screenshot QA;
4. reading/page screenshot QA around the back-cover story;
5. actual-size/detail screenshot QA of `77:24`;
6. structure QA proving geometry, native text, fold guide and rollback frames are intact;
7. ledger update with Drive ID → node ID → image hash mapping;
8. GitHub readback.

## Learning state

`PROTOTYPED / REJECTED_METHOD / NO_DESIGN_MUTATION`

This is not a V5 completion claim and does not open the V6 production gate.