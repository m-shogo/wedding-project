# ADD-11 写真共有 / QR案内 — Clean-room V2 guest-copy cleanup

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / GUEST_COPY_PROOF_LANGUAGE_REMOVAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `aa79598cfeee45ca2e6dd93d1a57113ebb44777e`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A5: `18:19 / FRAME_ADD11_A5_CLEANROOM_V2`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2`
- hidden stress: A5 `19:4`, A4 `19:56`
- Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- retained legacy production remains unchanged.

## Visible problem

A fresh live screenshot/readback found that the selected clean-room V2 still printed internal authoring terms directly on the guest-facing artifact, including `LAYOUT DUMMY` on the share note, all three access steps, privacy/hashtag/expiry placeholders, and inside the QR reserve itself.

The unresolved roles are legitimate and must remain explicit/editable, but implementation terminology made an otherwise selected editorial design read like a Figma proof sheet. This was a real sellable-visual defect, not missing content.

## Rollback-safe change

Before mutation, hidden rollback copies were created for both selected frames and both stress frames:

- `23:2` — A5 selected rollback
- `23:32` — A4 selected rollback
- `23:54` — A5 stress rollback
- `23:84` — A4 stress rollback

Selected A5/A4 changed only at the lexical layer:

- `[写真共有のご案内文 · LAYOUT DUMMY]` → `[写真共有のご案内]`
- `QR / LAYOUT DUMMY` → `QR / [共有リンク]`
- `[共有先を開く · LAYOUT DUMMY]` → `[共有先を開く]`
- `[案内に沿って操作 · LAYOUT DUMMY]` → `[案内に沿って操作]`
- `[写真を共有 · LAYOUT DUMMY]` → `[写真を共有]`
- `[公開範囲・閲覧権限の注意事項 · LAYOUT DUMMY]` → `[公開範囲・閲覧権限の注意事項]`
- `[#HASHTAG · LAYOUT DUMMY]` → `[#HASHTAG]`
- `[アクセス期限 · LAYOUT DUMMY]` → `[アクセス期限]`

The long-copy stress clones retained materially long Japanese strings but removed `LAYOUT DUMMY` and `レイアウト検証用ダミー` proof wording. No final service, URL, access policy, hashtag, expiry date, or real QR was invented.

No geometry, QR reserve size, vector ornament, image role, date, or retained legacy production was changed.

## Three-scale visual QA

### A5 `18:19`

- whole / 500px: PASS — `SHARE YOUR JOURNEY` and the QR orbit remain immediate, while internal proof language no longer dominates the secondary read;
- reading / 900px: PASS — steps and unresolved operational roles remain explicit without looking like implementation notes;
- actual size `875×1240`: PASS — native text, QR reserve, orbit and lower information field remain crisp and coherent.

### A4 `19:34`

- whole / 500px: PASS — `旅の記憶を、ひとつに。` remains the first read and the centered QR role remains clear;
- reading / 900px: PASS — three-step flow and lower privacy/hashtag/expiry roles remain distinct;
- actual size `1240×1754`: PASS — no clipping or hierarchy regression observed.

The cleanup materially reduces the proof-sheet/admin-template impression without removing uncertainty from unresolved fields.

## Structural / long-copy readback

A5 selected `18:19`:

- `875×1240`;
- visible native text `14`;
- fixed-height 10/12px text roles `0`;
- visible proof-language matches `0`;
- visible text outside root `0`;
- text-to-text collisions `0`;
- IMAGE fills `0`.

A4 selected `19:34`:

- `1240×1754`;
- visible native text `13`;
- fixed-height 10/12px text roles `0`;
- visible proof-language matches `0`;
- visible text outside root `0`;
- text-to-text collisions `0`;
- IMAGE fills `0`.

A5 stress `19:4` and A4 stress `19:56`:

- remain hidden after QA;
- fixed-height roles `0`;
- proof-language matches `0`;
- outside text `0`;
- text-to-text collisions `0`;
- IMAGE fills `0`.

## Hybrid authoring / Drive

- all unresolved/factual roles remain native editable Figma text;
- QR remains a non-scannable replaceable semantic reserve; no fake final QR was introduced;
- no raster/generated asset was required for this defect;
- Drive write: `0`;
- exact Drive authority was live-read and matched before the Figma change.

## Decision

ADD-11 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

and adds:

`GUEST_COPY_PROOF_LANGUAGE_REMOVAL_PASS`.

Final service/URL, privacy/access policy, hashtag, expiry, real QR generation/scan proof, final size choice and printer/installation proof remain deferred finalization. The retained legacy production and prior rollback history are untouched.
