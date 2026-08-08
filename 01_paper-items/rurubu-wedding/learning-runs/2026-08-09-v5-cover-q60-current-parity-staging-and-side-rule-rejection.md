# V5 cover Q60 current-parity staging and side-rule subtraction audit

Date: 2026-08-09
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority read before work

Re-read the project-wide production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, Rurubu editorial knowledge base, editorial lessons log, V5 operating system, postmortem, and V6 clean-room status/research/asset queue before making the bounded changes in this run.

## Live truth at start

The V5 asset gate remains:
- active Current photo roles: `11`
- intended source applied: `11/11`
- PHOTO_ROLE_PASS: `10/11`
- ROLE_COMPLETE: `10/11`
- dominant photo pass: `2/3`

The only active photo blocker remains:
- `V5-01 / 77:148 / IMG_HERO`
- live geometry `665 × 610`
- Current image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

The accepted higher-quality derivative remains:
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- `1330 × 1220`
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Drive raw-file readback in this run again returned exactly `155,439` bytes. The execution runtime also materialized the file and its checksum matched the ledger, so regeneration was not justified.

## Experiment A — direct Figma upload retry boundary

### Visible problem

The cover hero is visibly softer than the rest of the now-repaired dominant photography and is the last V5 dummy-photo blocker.

### Hypothesis

If the already-verified Q60 derivative can reach the exact comparison node through Figma's native asset-upload endpoint, it should remove the quality blocker without changing composition or generating a replacement.

### Result

`Figma.upload_assets` successfully created a single-use endpoint for `469:132`, but the raw JPEG POST from the execution environment failed at DNS resolution for `mcp.figma.com`.

This is the same blocker fingerprint already observed in previous runs. The route was immediately stopped; no Current node and no comparison fill was mutated.

### Decision

`REJECTED AS A REPEATED BLOCKED ROUTE` for this runtime. Do not spend another run retrying the external upload host unless the network capability itself changes.

## Experiment B — side-headline rule subtraction

### Visible problem

The front-cover line `横浜で叶える / 最高のWEDDING DAY` still has a narrow pink vertical rule. Because the project requires subtraction before adding decoration, the rule needed an explicit test rather than being kept because it already existed.

### Safe prototype

Created rollback-safe comparison:
- frame `537:2 / V5_OUTER_SIDE_HEADLINE_DIRECT_TYPE_QA_2026_08_09`
- hidden only in the comparison: `537:180 / SIDE_HEADLINE_PINK`
- Current `77:18` remained untouched

### Three-scale result

At whole-item and front-cover reading scale, removing the 5 px rule weakened the anchoring of the headline against the large photographic field. The rule is small, does not create a card or UI container, and has a concrete editorial job: it binds the secondary cover promise into one readable unit. The subtraction did not improve magazine authenticity enough to justify the loss of hierarchy.

### Decision

`PROTOTYPED → REJECTED`. Preserve the comparison as evidence; keep the Current pink rule.

### Reusable lesson candidate

Subtraction is a test, not a quota. A minimal rule may remain when it performs real grouping/hierarchy work and the no-rule comparison becomes visually less anchored. Do not promote this one case directly to a project-wide rule.

## Experiment C — replace stale Q60 staging composition with Current-parity staging

### Visible problem

Old Q60 staging frame `469:2` was created before several verified Current cover refinements. Its feature-number background state and cover-line composition no longer matched the latest live Current. Even if Q60 were transferred into `469:132`, a whole-cover comparison would confound image quality with stale composition differences.

### Principle tested

A one-variable experiment should change the hero raster only. The comparison frame must otherwise match Current before judging a dominant-image replacement.

### Safe change

Cloned latest live Current `77:18` without modifying Current and created:
- `538:2 / V5_COVER_HERO_Q60_CURRENT_PARITY_STAGING_2026_08_09`
- exact hero target `538:132 / IMG_HERO`
- target geometry `665 × 610`

This staging copy includes the already-adopted direct cover lines and feature-index subtraction, so future Q60 comparison can isolate the photo variable.

### Result

`VERIFIED AS STAGING ARCHITECTURE`, not as a photo-role pass. No Q60 image has yet been applied to `538:132`; therefore PHOTO_ROLE_PASS and dominant counts do not change.

## Experiment D — model-visible chunk staging guard

The verified history role succeeded with deterministic shared-plugin-data chunks, so a Q60 fallback was prepared using the exact Drive bytes. Q60 encodes to `207,252` base64 characters and was split into 30 deterministic chunks (`29 × 7000 + 4252`).

A first attempt to place the first two model-visible chunks into a `use_figma` call failed the pre-mutation length guard (`4355/6999` instead of `7000/7000`). The Figma script failed atomically and did not store the payload or mutate the canvas.

This confirms that manual/model-visible transcription is not reliable for this larger payload in the present runtime. Per the repeated-blocker rule, do not continue 30 manual chunk writes merely to create activity.

Decision: `REJECTED FOR Q60 AT THIS PAYLOAD SIZE` unless a binary-safe or connector-native file bridge becomes available.

## Current outcome

No completion count was inflated:
- PHOTO_ROLE_PASS `10/11`
- ROLE_COMPLETE `10/11`
- dominant `2/3`

Current `77:18` and Current hero `77:148` were not changed. V6 production remains gated.

Meaningful verified progress in this run is architectural and editorial:
1. Q60 Drive source integrity was re-verified without regeneration.
2. The repeatedly blocked upload route was stopped rather than retried indefinitely.
3. A subtraction candidate was tested and correctly rejected with visual evidence.
4. A fresh Current-parity Q60 staging frame `538:2` was created so the next successful binary bridge will compare hero quality as a single variable rather than against stale layout geometry.
5. The large-payload manual chunk fallback failed its integrity guard before mutation and is now rejected for Q60 rather than being repeated.

## Next safe application

- Do not regenerate the cover hero: the Q60 source itself has no proven defect.
- Do not retry external `mcp.figma.com` POST or manual 30-chunk transcription under the same runtime capability.
- Continue safe V5 editorial/typography/structure work that does not pretend to close the photo role, while watching for a true connector-native file-to-Figma binary bridge.
- When a binary-safe bridge becomes available, apply Q60 only to `538:132`, verify image hash, run actual-size hero/detail, front-cover reading, and whole-outer QA, then compare against Current and the preserved clean-room candidates before any Current promotion.
- Only after cover hero reaches verified PHOTO_ROLE_PASS and final V5 weakest-three/fold/typography/structure QA passes may the V6 production gate open.
