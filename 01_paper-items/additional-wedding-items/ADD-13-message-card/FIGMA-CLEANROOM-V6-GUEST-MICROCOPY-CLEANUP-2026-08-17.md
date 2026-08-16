# ADD-13 Message Card — Clean-room V6 guest-facing microcopy cleanup

Status: `VERIFIED_LOCAL / V6_GUEST_FACING_MICROCOPY_CLEANUP_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `8de6d8a13ee1ff949334cdef971dbbde8bcbc2d7`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- clean-room page: `27:2 / CLEANROOM / ADD-13 / V6 POSTAL FIELD / 2026-08-17`
- selected V6 front: `27:3`
- selected V6 back: `27:4`
- hidden long-copy stress back: `27:51`
- retained legacy production: `1:3 / 1:13` (unchanged)
- Drive authority: `ADD-13_Message_Card / 1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`

## Visible defect

Fresh V6 back screenshot showed one internal production note directly under the native semantic prompt:

`本番文言は未確定。可変テキストのまま差し替えます。`

That sentence is correct as production metadata but is not guest-facing copy. At reading scale it made the otherwise open writing surface read like a proof sheet. The unresolved date also used the English proof label `DATE [LAYOUT DUMMY]`, while the rest of the card is Japanese-first.

## Bounded change

A hidden rollback was created before mutation:

- `32:2 / ROLLBACK / ADD-13 V6 PRE GUEST-FACING MICROCOPY CLEANUP / 2026-08-17`
- rollback back frame: `32:3`

Only guest-facing microcopy state changed:

- `27:24 / META / PROMPT NOTE` -> `visible=false`
- `27:33 / TXT_DATE` -> `日付 [LAYOUT DUMMY]`
- hidden long-copy stress equivalents `27:56` and `27:65` received the same visibility/date treatment

No layout geometry, writing-area geometry, headline, prompt role, guest-name role, rule geometry, palette, raster asset, legacy production, or factual value changed.

## QA

Fresh back screenshot after change:

- whole/reading composition: PASS; proof-sheet note is gone and the open writing field reads continuously
- actual-size render requested at native `1400×993`: PASS
- back `27:4`: `1400×993`, visible native text `4`, IMAGE fills `0`, outside visible text `0`
- stress `27:51`: hidden, visible native text `4`, IMAGE fills `0`, outside visible text `0`
- production and stress internal prompt-note nodes both read back hidden
- production and stress date roles both read back `日付 [LAYOUT DUMMY]`
- rollback section `32:2` remains hidden and contains the pre-change back copy

Image generation was not required: the screenshot-supported defect was internal proof metadata, not missing visual art. Drive writes: `0`.

## Result

`VERIFIED_LOCAL / V6_GUEST_FACING_MICROCOPY_CLEANUP_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

The clean-room V6 remains editable and rollback-safe. Final message theme, guest-facing wording, date policy, paper/vendor requirements and physical proof remain deferred; do not replace unresolved placeholders with invented facts.
