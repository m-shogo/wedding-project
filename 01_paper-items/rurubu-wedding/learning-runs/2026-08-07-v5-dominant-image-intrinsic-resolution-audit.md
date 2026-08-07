# V5 dominant-image intrinsic-resolution audit — 2026-08-07

Scope: Rurubu WEDDING V5 only. No Passport, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Authorities reread

Before action, the project-wide Figma production system, asset-generation memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, current Rurubu status, V5 evidence ledger, and the current Rurubu learning/lessons authority were reread from GitHub main. Live Figma and Drive were then treated as higher authority than stale ledger assumptions.

## Visible problem

V5 cannot pass dummy-design QA while the three dominant photo roles remain visibly soft or provenance-incomplete. Decorative polish must not outrank these roles.

Dominant targets:
- `77:148 / IMG_HERO`
- `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- `77:422 / IA_HISTORY_MEMORY_PHOTO`

## Live Figma intrinsic-resolution evidence

A fresh Plugin API inspection queried each IMAGE fill's current image hash and intrinsic pixel size, rather than inferring quality from frame dimensions or screenshot appearance.

### Cover hero

- node: `77:148`
- box: `665 × 610`
- live image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- intrinsic image: `640 × 587`
- scale mode: `FILL`
- result: intrinsic pixels are already below the Figma box itself and far below the current dummy derivative target of approximately `1330 × 1220`.

This also exposes live-state drift: the current ledger still records the earlier rejected transport-test hash `a776d183a5ea8715f6fe9186c4c0749973df06b4`, while live Figma now uses `e58dd...`. The newer hash must not be called accepted merely because it is newer.

Drive readback for the intended cover master was reverified:
- file: `01_COVER_HERO_YOKOHAMA_DUMMY.png`
- Drive ID: `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
- bytes: `2,089,658`

Visual comparison confirms the live hero is the same Yokohama scene family, but source identity is not promoted to verified mapping without binary/hash evidence.

### Back main

- node: `77:24`
- box: `472 × 304`
- live image hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- intrinsic image: `176 × 220`
- scale mode: `FILL`
- result: severe upscaling plus aspect-ratio mismatch; this is a concrete dominant-photo defect, not subjective micro-polish.

The accepted test derivative remains Drive-verified:
- file: `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q70_TRANSPORT.jpg`
- Drive ID: `1L-SQiPuNHrCMuTbb_yaf9FNPg5iuf8uN`
- dimensions: `944 × 608`
- bytes: `95,542`
- SHA-256: `4ab985df8eccde405a66eaedb12cf6218e5b21856521f60ec175a5a61273c1f1`

The Drive file was materialized locally again and the byte count / SHA-256 matched this evidence exactly.

### History

- node: `77:422`
- box: `678 × 280`
- live image hash: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- intrinsic image: `384 × 480`
- scale mode: `FILL`
- result: the source is narrower than the very wide target and must be both enlarged and heavily cropped. It cannot pass the current dominant-photo gate on intrinsic resolution/crop evidence.

## Whole-item screenshot observation

A fresh full outer screenshot was captured after the audit. Current remained unchanged.

At whole-item scale:
- back-main softness is clearly visible relative to surrounding typography and smaller friend images;
- the cover composition remains intact but the hero does not have enough intrinsic pixel headroom for a dominant print-facing role;
- no rollback frame or fold guide was removed.

Live anchors reverified:
- Current outer: `77:18`
- Current inside: `77:290`
- rollback outer: `59:2`
- rollback inside: `59:178`
- provisional fold guide: `77:288`

## Tested principle / capability

### Principle

Do not diagnose dominant-photo quality from screenshot softness alone. Query intrinsic image dimensions and current image hashes so that crop, upscale, provenance, and ledger drift become measurable.

### Expected improvement

- prevents spending time on decoration while dominant images are physically under-resolved;
- converts a vague quality complaint into exact role-specific repair targets;
- catches live-Figma / ledger drift before false completion claims;
- allows the next transfer experiment to be judged against explicit minimum dimensions.

### Possible regression

Intrinsic dimensions alone do not prove editorial quality, source identity, crop quality, or print readiness. A large image can still be wrong. Therefore this audit cannot itself advance `PHOTO_ROLE_PASS`.

### Evidence needed to adopt

For each dominant role:
1. verified Drive source or accepted derivative;
2. exact Figma node placement and new image hash;
3. whole-item screenshot QA;
4. reading/page QA;
5. actual-size/detail QA;
6. structure/rollback verification;
7. ledger and Git readback.

## Transport-method decision

The already-repeated raw POST route to `mcp.figma.com` remains retired for this environment after repeated DNS failure. The prior corrupted/truncated model-visible base64 method also remains rejected.

A new local-byte chunk method was prepared from the exact Q70 artifact, but connector output truncation was detected before any Figma staging. Per the binary-integrity rule, no chunk was written to Figma and Current was not mutated.

This is a deliberate rejection, not a failed visual write.

## Result

`VERIFIED DIAGNOSTIC PROGRESS / LIVE CURRENT UNCHANGED / DOMINANT DEFECTS QUANTIFIED / LEDGER DRIFT FOUND / PHOTO_ROLE_PASS UNCHANGED / V6 GATE CLOSED`

No completion counts changed.

## Next safe action

Use a binary-safe connector path or independently verifiable small-chunk path that does not expose/truncate the source payload. Apply the accepted back-main derivative first to a rollback-safe duplicate of `77:18`, compare whole-item/reading/detail, and only then promote the winning image hash to Current `77:24`. Repeat the same evidence discipline for cover hero and history before any V6 production work.
