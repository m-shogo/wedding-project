# Rurubu V5 — MEMORY 03 live-scope reconciliation

Date: 2026-08-09
Status: `DISCOVERED → VERIFIED / CURRENT_SCOPE_CORRECTED`
Scope: Rurubu WEDDING V5 only

## Source authorities read before action

- live Figma `01_RURUBU_WEDDING`
- verified Google Drive Q60 readback
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `CURRENT-STATUS.md`
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `RURUBU-V6-CURRENT-STATUS.md`
- V6 Hawaii research matrix and asset queue

## Visible / structural problem

The monolithic V5 asset ledger and previous Current Status counted `V5-08 / 77:446 / IA_MEMORY_3_PHOTO` as an active, complete Current photo role. Fresh live Figma inspection contradicted that claim.

The full former V5-08 MEMORY 03 semantic module is not participating in Current:
- `77:446 / IA_MEMORY_3_PHOTO` — hidden, hash preserved as `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- `77:447 / IA_MEMORY_3_PHOTO_LABEL` — hidden
- `77:448 / IA_MEMORY_3_NO_BG` — hidden
- `77:449 / IA_MEMORY_3_NO` — hidden
- `77:450 / IA_MEMORY_3_TITLE` — hidden
- `77:451 / DUMMY_LABEL__IA_MEMORY_3_CITY` — hidden
- `77:452 / IA_MEMORY_3_BODY` — hidden

At the same effective lower-right photo geometry, V5-09 is the visible third memory destination:
- `77:454 / IA_MEMORY_4_PHOTO` — visible, `x=518`, `y=783`, `88 × 92`, hash `c09aa82e7b2ac75708707345c6f845452bf67663`
- `77:456 / IA_MEMORY_4_NO_BG` — visible
- `77:457 / IA_MEMORY_4_NO` — visible and renders `03`
- `77:458 / IA_MEMORY_4_TITLE` — visible
- `77:459 / IA_MEMORY_4_CITY` — visible
- `77:460 / IA_MEMORY_4_BODY` — visible

The fresh whole-inside screenshot confirms one lead memory plus two supporting memories — three visible Memory Spots total — with no empty hole created by keeping V5-08 hidden.

## Tested principle

`Quality over legacy` plus the existing scope rule: registered provenance and active visual scope are different concepts. A hidden legacy module must not be forced back into Current merely to satisfy an obsolete denominator.

Anti-anchoring question: would V5-08 be restored if the old `11 active` ledger count did not exist? No. The current page already has a coherent `1 lead + 2 support` hierarchy; restoring V5-08 solely to preserve an old count would be ledger-driven design rather than editorial design.

## Expected improvement

Reconcile progress accounting to the actual Current composition while preserving V5-08 Drive master, derivative, image hash, historical QA, semantic nodes, and rollback evidence.

Possible regression:
- deleting provenance would lose useful evidence
- reactivating the role only for count consistency could worsen density and reverse the current hierarchy
- retiring the wrong module could create a visible hole

Evidence required:
- complete module visibility audit
- visible replacement-module audit
- geometry/hash comparison
- whole-inside screenshot
- structure/fold/rollback verification

## Read-only audit mistake and correction

The first module-level inspection script attempted to read `visible` from a Figma PAGE node and failed with `node.visible: no such property 'visible' on PAGE node`.

Result: `REJECTED IMPLEMENTATION / ATOMIC NO-OP`.

No Figma mutation occurred. The script was corrected to treat PAGE visibility as neutral and then rerun successfully. This mistake is recorded so future visibility walkers test property support before reading SceneNode-only properties.

## Fresh structure evidence

No Figma visual mutation was made in this reconciliation run.

Current inside `77:290`:
- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- visible IMAGE-fill nodes: `6`
- fold guide `77:540`: visible

Current outer `77:18`:
- native text nodes: `85`
- visible text nodes: `44`
- IMAGE-fill nodes: `14`
- visible IMAGE-fill nodes: `6`
- fold guide `77:288`: visible

Rollback frames `59:2` and `59:178` remain preserved.

## Fresh Drive evidence

The prepared cover Q60 derivative was re-read from Google Drive without regeneration:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- `155,439 bytes`
- dimensions `1330 × 1220`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The Q60 source itself remains healthy. The unresolved cover issue is quality-preserving Figma transport plus subsequent three-scale visual/structure QA. Already-rejected external `mcp.figma.com` POST and model-visible large-chunk transcription methods were not repeated.

## Result / decision

`PROTOTYPED → VERIFIED / SCOPE RECONCILIATION ADOPTED`.

V5-08 is now treated as `RETIRED_FROM_CURRENT_VISUAL_SCOPE` while preserving:
- Drive master ID `1168rkBzpx84Wvr7IxPCW31WOr30kdqhb`
- derivative Drive ID `1rJJDOX_lwkCbA_DiCDptZfAQrMieG5LL`
- derivative `352 × 368`, `7,762 bytes`
- derivative SHA-256 `a87c39773e7374356641266aa709c585c60ff3435169fbeaed33a83d8fc35aae`
- Figma image hash `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- comparison `427:2`
- historical three-scale QA
- hidden semantic nodes and rollback state

Verified visible-scope counts are:
- registered roles: `13`
- active Current roles: `10`
- retired/preserved roles: `3`
- Drive readback: `13/13 registered`
- intended source applied: `10/10 active`
- PHOTO_ROLE_PASS: `9/10 active`
- ROLE_COMPLETE: `9/10 active`
- dominant: `2/3`

The only remaining visible photo-role blocker remains `V5-01 / 77:148 / IMG_HERO`.

## Git / authority update

Updated:
- `CURRENT-STATUS.md`

Created:
- `RURUBU-V5-LIVE-SCOPE-RECONCILIATION-2026-08-09.json`

The large monolithic `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json` is not destructively replaced through the current full-file-only connector because preserving every existing role-level note and evidence record atomically is more important than forcing a write. The reconciliation overlay supersedes only its stale active-scope/count fields; the monolithic ledger continues to preserve unchanged per-role provenance.

## Failure / rejected behavior

Rejected:
- re-showing V5-08 merely to restore an obsolete `11`-role denominator
- treating historical QA of a now-hidden role as active Current completion
- retrying known Q60 transport blockers without a capability change
- hiding the failed PAGE visibility walker instead of recording and correcting it

## Reusable lesson candidate

**Active completion denominators must be derived from effective live visibility, not from the historical fact that an asset was once applied and passed QA.** A hidden role may retain complete provenance and rollback evidence while being retired from Current scope.

Knowledge state: `VERIFIED` for Rurubu V5 scope reconciliation. Do not promote to `PROJECT_RULE` solely from this single additional case; apply again when another item/version exposes the same distinction.

## Next application

1. Keep V5-08 hidden and rollback-safe.
2. Keep the remaining photo gate truthful: cover hero `77:148` is still open.
3. Use Current-parity Q60 staging `538:2 / 538:132` only when a genuinely binary-safe file bridge becomes available.
4. After hero reaches dominant `3/3`, run final weakest-three, typography, density, fold/safe-area, structure and three-scale V5 QA.
5. Only then open V6 production as separate clean-room concepts.

Status: `VERIFIED / CURRENT SCOPE CORRECTED / V5 NOT COMPLETE / V6 GATE CLOSED`