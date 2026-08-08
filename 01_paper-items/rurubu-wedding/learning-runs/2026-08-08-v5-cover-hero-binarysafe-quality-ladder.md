# V5-01 Cover Hero — Binary-safe quality ladder / transfer run

Date: 2026-08-08
Status: `PROTOTYPED / CURRENT_UNCHANGED / TRANSFER_IN_PROGRESS`
Scope: Rurubu WEDDING V5 only

## Authority refresh

Before this run, the project-wide Figma production system, asset-generation memory, continuous-learning system, central design-learning log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, editorial knowledge base, Rurubu lessons log, V5 operating system, postmortem, and V6 research/asset planning files were re-read from GitHub main. V6 production remains gated behind `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS`.

## Visible problem

Current cover hero node `77:148 / IMG_HERO` is a 665×610 dominant role but still uses the low-quality derivative hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`. Rollback-safe staging target `469:132` was re-audited and has the same old hash, so the prior Q60-labelled comparison was not a real Q60 visual comparison.

The verified Q60 Drive derivative is materially sharper but its 155,439-byte payload cannot be safely transported through the previously failing native upload/DNS path, and large inline base64 payloads have already shown truncation risk.

## Source / provenance

Original role master remains:
- `01_COVER_HERO_YOKOHAMA_DUMMY.png`
- Drive ID `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`

Verified high-quality role derivative remains:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- 1330×1220
- 155,439 bytes
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

No new scene, person, or generated master was created. This run only tested role-specific derivatives of the already verified master.

## Hypothesis / tested principle

A role-specific 2× JPEG derivative can preserve the editorial skyline/water/landmark detail required at a 665×610 dominant role while reducing payload enough for a bounded, guard-checked inline transfer. Compression is acceptable only if actual-size and whole-cover screenshot QA remain visibly clean; transport success alone is not acceptance.

Expected improvement:
- materially sharper landmark, ferris wheel, building edge, railing and water detail than Current
- preserve exact semantic node and existing crop/geometry
- avoid the repeated external upload/DNS blocker

Possible regression:
- sky/water posterization or blockiness from too-aggressive JPEG compression
- binary truncation during transport
- false completion if staging frame name is trusted instead of image hash

Evidence required for adoption:
1. exact Drive readback ID/bytes
2. exact encoded and decoded byte guards before Figma mutation
3. new staging image hash on `469:132`
4. detail/actual-size screenshot QA
5. front-cover reading-scale screenshot QA
6. whole-item screenshot QA against Current and clean-room `413:2`
7. structure/rollback audit
8. only then Current promotion and ledger/Git readback

## Results so far

### Rejected compression attempts

- Q7: transport-friendly, but target-size review showed obvious sky/water posterization and blockiness. `REJECTED` before Figma promotion.
- Q12: still visibly posterized at target-size review. `REJECTED` before Figma promotion.

These rejections are evidence that “small enough to transport” is not a quality criterion.

### Q20 prototype

Created from the verified Q60 derivative at the same 1330×1220 dimensions:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q20_BINARYSAFE.jpg`
- 74,789 bytes
- SHA-256 `0c64707ed4198725d09cbe2df70da85f8939727e460974cfe51d34aecdc3ac6c`
- Drive ID `1Le02JBuT12zi4Zmfmm9PxZ2yIWrabR6-`
- Drive readback size: 74,789 bytes

Local target-size review was substantially cleaner than Q7/Q12. Status: `PROTOTYPED`, not accepted.

A 15,000-character inline chunk was then rejected atomically when the exact length guard observed only 13,136 characters. Current and staging image fills were unchanged. The method was switched rather than retried at the same size.

### Q15 transfer candidate

Q15 was reviewed at 665×610 target size and retained skyline, ferris wheel, building and water detail with acceptable local appearance while reducing payload further:
- Drive filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q15_BINARYSAFE.jpg`
- Drive ID `1YuLuYFCnWl6QVU6g9Bfw10WdJG9p0xD4`
- 1330×1220
- 55,606 bytes
- SHA-256 `6cbd40bd5707c3339b0893c7a724dba2825de0a0043322f3e1ebb4086e82f45a`
- Drive readback size: 55,606 bytes
- base64 encoded length: 74,144 characters

A 10,000-character chunk also failed its exact-length guard (9,567 received), so that size class was rejected. The method switched to the previously proven 4,000-character bounded shared-plugin-data transport.

At this checkpoint, exact 4,000-character chunks `c0` through `c4` have been stored successfully under a run-specific Figma plugin-data namespace. A two-chunk/8k attempt was rejected atomically when one chunk arrived short; it caused no image mutation. Single 4k chunks are the current bounded method.

## Adoption state

- Q7: `REJECTED`
- Q12: `REJECTED`
- Q20: `PROTOTYPED / DRIVE_VERIFIED / NOT_FIGMA_QA`
- Q15: `PROTOTYPED / DRIVE_VERIFIED / PARTIAL_BINARY_TRANSFER / NOT_FIGMA_QA`
- Current `77:148`: `UNCHANGED`
- PHOTO_ROLE_PASS: remains `10/11`
- ROLE_COMPLETE: remains `10/11`
- dominant-photo pass: remains `2/3`
- V6 production gate: remains `CLOSED`

## Failure / lesson candidate

Large inline payload success cannot be inferred from tool acceptance or apparent string display. Exact encoded-length guards must precede any binary decode or image mutation. When a size class truncates, reduce the bounded chunk size rather than repeatedly retrying the same transport shape.

This is a `PROTOTYPED` lesson only. It must not become `PROJECT_RULE` until repeated on appropriate roles without quality regression.

## Next application

Continue single guarded 4,000-character chunks until all 74,144 encoded characters are present, verify exact decoded 55,606 JPEG bytes and markers, mutate only staging `469:132`, then run detail/read/whole screenshot QA against Current and clean-room `413:2`. Promote `77:148` only if the staged candidate wins and all structure/rollback evidence remains valid.
