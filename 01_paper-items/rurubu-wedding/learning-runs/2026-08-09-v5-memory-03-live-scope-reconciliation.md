# Rurubu V5 — MEMORY 03 live-scope reconciliation

Date: 2026-08-09
Status: `DISCOVERED → VERIFIED_LIVE_CONTRADICTION / CANONICAL_LEDGER_RECONCILIATION_PENDING_SAFE_EDIT`
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
- V6 Hawaii reference matrix / reference analysis / asset queue

## Visible / structural problem

The item ledger and Current Status still declare `ACTIVE_CURRENT_PHOTO_ROLES_11 / RETIRED_PRESERVED_ROLES_2`, and V5-08 / `77:446 / IA_MEMORY_3_PHOTO` is described as a completed active photo role.

Fresh live-Figma inspection shows that the entire V5-08 MEMORY 03 semantic module is not participating in Current:

- `77:446 / IA_MEMORY_3_PHOTO` — `visible=false`, hash preserved as `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- `77:448 / IA_MEMORY_3_NO_BG` — `visible=false`
- `77:449 / IA_MEMORY_3_NO` — `visible=false`
- `77:450 / IA_MEMORY_3_TITLE` — `visible=false`
- `77:451 / DUMMY_LABEL__IA_MEMORY_3_CITY` — `visible=false`
- `77:452 / IA_MEMORY_3_BODY` — `visible=false`

At the same lower-right slot, the V5-09 resort module is the visible third supporting memory:

- `77:454 / IA_MEMORY_4_PHOTO` — `visible=true`, hash `c09aa82e7b2ac75708707345c6f845452bf67663`
- `77:456 / IA_MEMORY_4_NO_BG` — `visible=true`
- `77:457 / IA_MEMORY_4_NO` — `visible=true` and visually numbered `03`
- `77:458 / IA_MEMORY_4_TITLE` — `visible=true`
- `77:459 / IA_MEMORY_4_CITY` — `visible=true`
- `77:460 / IA_MEMORY_4_BODY` — `visible=true`

The fresh whole-inside screenshot therefore contains one lead memory plus two supporting memories, i.e. three visible memory destinations total. It does not show the V5-08 night-view module.

## Tested principle

`Quality over legacy` plus the already tested Rurubu lesson: registered provenance and active visual scope are different concepts. A hidden legacy module must not be forced back into Current merely to satisfy an obsolete denominator.

Before touching the layout, ask: would V5-08 be restored if the old ledger denominator did not exist? The current page already has a coherent `1 lead + 2 support` hierarchy and the removed V5-08 module contributes no visible content. Restoring it solely to preserve `11 active` would be ledger-driven design rather than editorial design.

## Expected improvement

Reconcile progress accounting to the actual Current composition while preserving the V5-08 Drive master, derivative, image hash, QA history, and semantic nodes as rollback/provenance evidence.

This is a truthfulness and rollback improvement, not a claim that the V5-08 asset itself was bad.

## Possible regression

- Retiring the role without preserving provenance would lose useful evidence.
- Renaming or deleting the hidden nodes could break historical mappings.
- Reactivating the role just to preserve the old denominator could worsen density and reverse a live editorial decision.

Therefore no live Figma node was deleted, renamed, re-cropped, or reactivated in this run.

## Fresh structure evidence

Current inside `77:290`:

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- Current remains editable and semantic
- hidden V5-08 hash is still preserved
- visible V5-09 hash is unchanged
- rollback frames remain authoritative and untouched

Current outer `77:18`:

- native text nodes: `85`
- visible text nodes: `44`
- IMAGE-fill nodes: `14`

Cover hero remains unchanged:

- `77:148 / IMG_HERO`
- geometry `665 × 610`
- live hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Q60 staging `469:132` still carries the same low-quality hash, so it is not evidence that Q60 reached Figma.

## Fresh Drive evidence

The prepared Q60 derivative was re-read from Google Drive:

- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- known SHA-256 from the verified ledger/local readback: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The file itself remains healthy; the unresolved cover issue is quality-preserving Figma transport and subsequent visual/structure QA.

## Result / decision

`VERIFIED_LIVE_CONTRADICTION`.

Do not reactivate V5-08 merely to keep the old active-role denominator. Preserve its assets and hidden semantic nodes as historical/rollback evidence. The next canonical step is to reconcile `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json` first, then `CURRENT-STATUS.md`, so active/retired counts represent the live composition.

No new completion count is declared here because the ledger is the progress authority and the currently available GitHub contents write replaces whole files; the connector read of the large ledger is truncated, so reconstructing/replacing it would risk destructive data loss. A safe partial/atomic ledger edit is required before changing authoritative counts.

## Failure / blocker

The blocker is not Figma and not the asset. It is safe canonical ledger mutation through the currently exposed GitHub connector. Creating a new evidence file is safe; replacing the large truncated ledger is not.

The repeated `mcp.figma.com` raw-upload DNS path for Q60 is also intentionally not retried in this run, in accordance with the loop-breaker rule.

## Next application

1. Use a safe patch/atomic edit path for the ledger when available.
2. Reclassify V5-08 as preserved-but-not-active only if the live hidden state still matches at that moment.
3. Derive counts from the reconciled ledger, then update Current Status.
4. Keep Q60 as the highest-impact remaining visual blocker and use a genuinely different binary-safe transport method rather than the repeated DNS route.
5. Only after the cover hero passes and final V5 three-scale/structure/fold QA passes may `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` open the V6 production gate.

## Learning status

- Observation: `VERIFIED`
- Scope-retirement principle: already supported by prior Rurubu evidence, applied here as a candidate reconciliation
- Canonical ledger change: `PENDING_SAFE_EDIT`
- V5 completion: **not declared**
- V6 production gate: **still closed**
