# V5 cover-snap live-scope reconciliation

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer: `77:18`
Comparison: `432:2 / V5_02_COVER_SNAP_DERIVATIVE_TEST_2026_08_08`

## Problem

The asset ledger still treated `V5-02 / AUTH_COVER_SNAP_01 / 77:236` as an active Current photo role pending import. Before doing import work, live Figma was checked because live Figma outranks the ledger.

## Live-scope finding

Current node:
- `77:236 / AUTH_COVER_SNAP_01`
- `132 × 132`
- `visible=false`

Associated label:
- `77:237 / AUTH_COVER_SNAP_LABEL`
- `visible=false`

A search of Current outer `77:18` found no other effectively visible cover-snap/airplane node. Therefore the role does not participate in the visible Current composition.

## Asset lifecycle work completed before the scope discrepancy was discovered

Master:
- `02_COVER_SNAP_AIRPLANE_DUMMY.png`
- Drive ID `1fkzkpkhi2nEq-gxYjroqJipsvAoDStwI`
- `1,625,765 bytes`
- visual QA: PASS as a generic airplane-window sunset/cloud scene; no people, no false-person identity risk, no baked final text/logo

The master was visually suitable, so regeneration was rejected as unnecessary activity.

Derivative candidates were created at the required `528 × 528` (`4×` the `132 × 132` semantic box). The preserved binary-safe test derivative is:
- `RURUBU_V5_02_COVER_SNAP__FIGMA_528x528_Q08_BINARYSAFE.jpg`
- Drive ID `19KuYUYkyePCErVjXbzX0KQpNoBOdFh34`
- Drive readback `4,492 bytes`
- SHA-256 `6366d4700992fcc1407929d815c96b6c8a7b8f1c6e88c1c32cbce0e2f01ee11e`

## Transport experiments

### Rejected / failed

1. A larger Q42 derivative (`14,669 bytes`) was Drive-verified but a single-call inline base64 payload failed encoded-length guard before canvas mutation.
2. A Q18 derivative (`8,169 bytes`) also failed single-call encoded-length guard before canvas mutation.
3. Native Figma upload endpoint was attempted only after switching method, but the execution environment could not resolve `mcp.figma.com`; the known DNS blocker was not repeatedly retried.
4. Large manually supplied chunks proved vulnerable to single-character loss, so the method was changed again rather than accepting corrupt transport.

### Verified binary-safe method

The Q08 derivative was split into six small guarded document-shared chunks:
- `1000, 1000, 1000, 1000, 1000, 992` encoded characters
- reconstructed encoded length `5,992`
- decoded length `4,492`
- JPEG SOI/EOI markers verified before `figma.createImage()`

It was applied only to rollback-safe comparison node:
- `432:220 / AUTH_COVER_SNAP_01`
- prior hash `261ba74d26b1bed8b905d4ec9afa29dbbcd67912`
- tested hash `6508fe94eb77b14d73b06ed2b8e705d33e5ab880`

Current was never modified.

## QA interpretation

A detail screenshot of the comparison node rendered effectively blank because the semantic node itself is hidden. That initially looked like an image-placement problem; property/ancestor inspection proved it was a scope/visibility fact instead.

This means screenshot completion cannot be claimed for the visible design, and importing the intended source into Current solely to raise a counter would violate quality-over-legacy and the no-activity-for-activity rule.

## Decision

`DISCOVERED → PROTOTYPED_TRANSPORT → VERIFIED_SCOPE_CORRECTION`

`V5-02` is now:
- registered and provenance-preserved
- retired from Current visual scope
- excluded from the active completion denominator
- **not** PHOTO_ROLE_PASS
- **not** ROLE_COMPLETE

The active denominator changes from `12` to `11`; retired/preserved roles change from `1` to `2`. Existing verified pass counts remain `5`.

## Tested principle

Before spending effort repairing/importing a photo role, verify that the semantic role still participates in the live visible composition. A hidden legacy node is not an active visual requirement merely because an older ledger still lists it.

Expected improvement:
- prevents fake progress and unnecessary binary work
- aligns the ledger with live Figma
- keeps the V5 completion gate about the actual guest-visible design

Possible regression:
- a future clean-room cover may intentionally restore a travel snap, at which point the role must be reactivated and rerun through visible screenshot/detail QA; retirement must not become permanent dogma.

## Next application

Prioritize the six remaining active incomplete roles:
1. cover hero `77:148`
2. groom profile `77:296`
3. bride profile `77:302`
4. lead memory `77:430`
5. Friends 02 `77:39`
6. Friends 03 `77:43`

The cover hero remains the final dominant-photo blocker. V6 production gate stays closed.
