# ADD-11 写真共有 / QR案内 — clean-room authority reconciliation — 2026-08-18

Status: `AUTHORITY_RECONCILED / CLEANROOM_V2_SELECTED / LEGACY_PRESERVED / NO_VISUAL_MUTATION_REQUIRED`

Start authority SHA: `be9d282d9a858674d9634a6bb8bbf40a7ad63ba5`

## Why this exists

A live authority check found that the older `QA.md` still describes retained legacy nodes `1:31 / 1:45 / 3:2` as production authority, while the later clean-room evidence explicitly selected the fresh V2 family. To prevent future visual runs from treating legacy as the active selected design, the current clean-room selection is restated here from live Figma + latest item evidence.

## Current selected visual authority

Figma file: `PWQ5ygJJt0IlOqj5ri5jng`

- clean-room page: `18:18 / CLEANROOM / ADD-11 / V2 MEMORY ORBIT / 2026-08-16`
- selected A5: `18:19 / FRAME_ADD11_A5_CLEANROOM_V2`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2`
- hidden A5 stress: `19:4`
- hidden A4 stress: `19:56`
- retained legacy: `1:31 / 1:45 / 3:2` — history/comparison only, unchanged
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`

The latest detailed visual evidence remains `CLEANROOM-V2-MEMORY-ORBIT-QA-2026-08-16.md` plus `FIGMA-CLEANROOM-V2-GUEST-COPY-CLEANUP-2026-08-17.md`.

## Fresh live readback

Selected A5 `18:19`:

- `875×1240`;
- native visible text `14`;
- guest-facing proof-language matches `0`;
- fixed-height 10/12px text roles `0`;
- outside text `0`;
- text collisions `0`;
- QR role `18:26`, `290×290`;
- IMAGE fills `0`.

Selected A4 `19:34`:

- `1240×1754`;
- native visible text `13`;
- guest-facing proof-language matches `0`;
- fixed-height 10/12px text roles `0`;
- outside text `0`;
- text collisions `0`;
- QR role `19:41`, `420×420`;
- IMAGE fills `0`.

Hidden long-copy stress `19:4 / 19:56` also remains proof-language 0 / fixed-height 0 / outside 0 / collision 0.

No design mutation was justified by the fresh readback, so healthy selected V2 geometry was not changed.

## Drive / deferred finalization

Drive folder was live re-read and matched the authority above. Drive write: `0`.

Still deferred: authoritative sharing service/URL, privacy/access policy, hashtag/expiry decision, real QR generation and scan proof, final size/install choice, printer/physical proof.

Current visual completion remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
