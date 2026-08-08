# Rurubu V5 — cover / bride / dining transport and identity-safe prep (2026-08-08)

Status: `PROTOTYPED / DRIVE_READBACK_READY / FIGMA_CURRENT_UNCHANGED / COUNTS_UNCHANGED`

## Scope

Rurubu WEDDING V5 only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not modified.

## Authority / gate state read before work

Project-wide production system, asset-generation memory, AI continuous-learning system, central learning log, project memory, quality-over-legacy decision, Rurubu Current Status, V5 asset evidence ledger, editorial knowledge base, Rurubu lessons log, V5 operating system, postmortem, and V6 research/asset queue were reread before mutation work.

Formal V5 state at run start remained `PHOTO_ROLE_PASS 8/11`, `ROLE_COMPLETE 8/11`, dominant `2/3`. The unresolved active roles remain V5-01 cover hero, V5-04 bride profile, V5-13 Friends dining.

## Live Figma audit

- V5-01 `77:148 / IMG_HERO`: semantic box `665×610`; live source `640×587`; current image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`. This is below target and cannot be promoted.
- V5-04 `77:302 / IA_PROFILE_B_PHOTO`: semantic box `122×122`; live source `128×160`; current image hash `1c6a3d54817e2ca8e25a3d9b700e7ab9cb4ff4fd`. It also carries recognizable-face false-identity risk.
- V5-13 `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`: semantic box `244×166`; live source `160×120`; current image hash `3abe9ce228d2252b847860ac895f2c178b6b3ddd`.

No Current node was mutated during failed transfer attempts.

## V5-01 cover hero

### Visible problem

The live hero remains under-resolution, while the existing Q30 role derivative is too compressed in sky/water gradients to count as final visual evidence.

### Tested principle

Prefer a quality-preserving role-sized derivative from the verified master rather than re-generating a visually suitable master or accepting extreme compression just because it transports easily.

### Result

A new `1330×1220` Q60 derivative was created from the existing Q90 role crop:

- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- bytes: `155,439`
- SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- Drive save/readback size verified: `155,439` bytes
- local visual QA: Yokohama skyline, ferris wheel, waterfront, sunset gradients and rail/water detail remain materially stronger than the rejected Q30 path.

A rollback-safe duplicate `469:2 / V5_COVER_HERO_Q60_QA_2026_08_08` with hero node `469:132` was created. Current remained untouched.

### Transport failures / method changes

1. Figma native upload endpoint was obtained, but the execution container again could not resolve `mcp.figma.com`; native upload route was abandoned for this run rather than retried.
2. Figma Plugin API `fetch()` was tested as a genuinely different method against the Drive readback URL. The runtime reported `fetch is not a function`; rejected.
3. Large shared-plugin-data/base64 chunks were tested with explicit encoded-length guards. A 45k segment arrived truncated (`17,754` chars); rejected atomically. 15k was also unreliable. 10k segments can be stored correctly, but the 207,252-character payload would require a long staged transfer and is not yet visually complete.

No IMAGE-fill presence, transport attempt, or Drive save is counted as V5-01 completion.

## V5-04 bride profile

### Visible problem

The verified master is high-resolution (`04_PROFILE_BRIDE_CAFE_DUMMY.png`, Drive ID `1xOhG8tOmhUclfUchGzFOlrWP2vb9yPfO`, `2,196,328` bytes), but its source composition contains a clear recognizable generated face. Presenting that face in the profile role could imply that the generated person is the real bride.

### Tested principle

Before regenerating, test whether the already-good master can yield a materially safer non-identifying crop while preserving the semantic role and print plausibility.

### Result

A clean, square identity-safe crop was made from the existing master. It excludes the face while retaining hair/earring, bridal lace/back silhouette, warm architectural background, and the editorial `bride / cafe / elegant travel` cue.

Role derivative candidates were created at exact 4× semantic dimensions `488×488`:

- Q30: `11,932` bytes, SHA-256 `cb099eb490d840e07413d246a4b4b9e8f95bdeba2a22199713da108787d287c9`, Drive ID `1OJLOs_17GCNrED-oUAWtCHknmx0v2cub`
- Q20: `9,020` bytes, SHA-256 `034814a14015df52f1c0a0ebd987620266a44d40c21b9dd85c597ac5ea82bdb8`, Drive ID `1nH_9u-IeZWgyFgiCX1koAUfRv_nXW-qC`
- Q15: `7,433` bytes, SHA-256 `07d4cd959abcc038461451d8700f5dcb99b903f3ce17e886c3168eb94320e5ef`, Drive ID `1jdpMofTsWt473swZAaBudDqvAuDAbmU5`

The Q15/Q20/Q30 local visual comparison shows that the Q30 remains the preferred retained-quality derivative; the smaller variants exist only as bounded transport experiments, not as automatic quality winners.

Figma one-call base64 tests were guarded. Q30 arrived as `13,918` rather than expected `15,912` chars; Q20 arrived as `10,963` rather than expected `12,028`; both were rejected atomically. No duplicate frame or Current photo was changed by these failed calls.

### Adoption state

`PROTOTYPED / IDENTITY-SAFE CROP VERIFIED LOCALLY / DRIVE-SAVED / FIGMA VISUAL QA NOT YET PASSED`.

Do not increment PHOTO_ROLE_PASS or ROLE_COMPLETE until exact Figma placement, hash/dimension verification and three-scale screenshot/structure QA succeed.

## V5-13 Friends dining

### Visible problem

The live source remains only `160×120` for a `244×166` role. Existing Drive Q35 derivative `732×498`, `26,980` bytes is visually appropriate and identity-safe, but the binary path is fragile.

### Tested principle

Keep the same role-sized crop and lower transfer size only when actual-size visual plausibility remains acceptable; never mark a transport-friendly derivative complete without screenshot QA.

### Result

A bounded Q15 derivative was created from the Q35 role crop:

- file: `RURUBU_V5_13_FRIENDS_DINING__FIGMA_732x498_Q15.jpg`
- dimensions: `732×498` (exact 3× role box)
- bytes: `13,867`
- SHA-256: `85d994fe0f86290162dbf8df58abb34a3a2d54bd1320631447d586f8445d7bab`
- Drive ID: `1R0JW7jny0XSOaysUzLMLo8n8nDxVGqdy`

Local visual QA at the source/role scale retained flowers, cup/dessert, hands/table and waterfront atmosphere with no recognizable-friend identity claim. The direct Figma text payload nevertheless arrived with one unexpected encoded character (`18,493` vs expected `18,492`) and was rejected by the integrity guard before mutation.

## Learning result

- `DISCOVERED`: Figma `use_figma` tool input has a practical truncation/integrity ceiling below some otherwise-valid image payloads; it is not enough to rely on the nominal plugin code limit.
- `PROTOTYPED`: progressively smaller, exact-role derivatives can reduce payload while preserving small-role print plausibility, but must be judged visually per role.
- `VERIFIED`: the V5-04 master does not need regeneration solely to avoid false-person identity risk; a face-excluding crop can preserve the editorial role and remove the identity implication.
- Not promoted to `PROJECT_RULE`: no new general JPEG quality number or payload threshold is established. Q-values remain role- and evidence-specific.

## Next safe step

1. Finish V5-04 on a rollback-safe duplicate using a payload below the observed truncation boundary or a binary-safe segmented transfer; run whole/page/detail screenshot QA and structure QA before Current promotion.
2. Close V5-13 with the same bounded method if actual-size QA remains acceptable.
3. Continue staged binary-safe reconstruction for V5-01 Q60; do not fall back to the rejected Q30 merely to increase the completion count.
4. Update the central learning log and Rurubu lessons log when a safe append/write route is available; this run file preserves the exact evidence meanwhile.
5. Keep V6 production gate closed until V5 is fully verified.

Formal counts remain unchanged: `PHOTO_ROLE_PASS 8/11`, `ROLE_COMPLETE 8/11`, dominant `2/3`.
