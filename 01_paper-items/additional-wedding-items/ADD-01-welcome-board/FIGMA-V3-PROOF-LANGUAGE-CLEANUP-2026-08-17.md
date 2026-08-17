# ADD-01 ウェルカムボード — V3 proof-language cleanup

Date: 2026-08-17
State: `SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V3_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / PROOF_LANGUAGE_CLEANUP_PASS / REAL_HERO_PHOTO_REQUIRED / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `9306b863bc55d051b5d926564cd0ccd53513ed0f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `XyyTGuz6BMf8XRhPZZfdoT`
- V3 candidate: `19:3 / V3 / ADD-01 / PHOTO WINDOW POSTER / 852x1200`
- real-photo role: `19:4 / PHOTO / REAL COUPLE / REPLACEABLE`, `514×720`
- Drive authority: `ADD-01_ウェルカムボード` / `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`
- retained legacy production: unchanged

## Visible issue

Fresh thumbnail review showed two kinds of guest-facing implementation language in the serious clean-room V3 candidate:

1. semantic unknowns still carried the internal suffix `LAYOUT DUMMY`;
2. the empty real-photo role visibly printed `[実写真 · REPLACEABLE]`, which is useful as a layer/role name but not as guest-facing stationery content.

The candidate remains blocked on the real selected couple photograph, so this cleanup does not claim final visual promotion. It only removes proof-sheet language while preserving the honest unresolved-content boundary.

## Bounded Figma change

Before mutation, hidden rollback `20:2` was created from V3 `19:3`.

Native semantic placeholders were shortened:

- `[会場名 · LAYOUT DUMMY]` → `[会場名]`
- `[新郎新婦名 · LAYOUT DUMMY]` → `[新郎新婦名]`
- `[サブコピー · LAYOUT DUMMY]` → `[サブコピー]`

The internal text node `19:6 / TEXT / PHOTO PLACEHOLDER / [実写真 · REPLACEABLE]` was hidden. The actual photo container `19:4 / PHOTO / REAL COUPLE / REPLACEABLE` remains visible, stable and unchanged at `514×720`; no fake or generated couple image was inserted.

## Three-scale / structure QA

Post-change renders:

- thumbnail: `355×500` — cleaner guest-facing read; no production-status copy remains visible;
- reading: `568×800` — semantic venue/name/subcopy placeholders remain readable;
- actual size: `852×1200` — layout/crop role remains intact.

Structural readback:

- visible native text: 9
- visible proof-language / `REPLACEABLE` text matches: 0
- outside visible text: 0
- real photo role: `514×720`, visible, stable, replaceable
- internal photo-role label: hidden
- IMAGE fills in current candidate: 0
- rollback `20:2`: hidden
- Drive writes: 0

## Decision

`PROOF_LANGUAGE_CLEANUP_PASS` only.

The earlier completion blocker is unchanged: a real authoritative couple photograph is still required before the V3 candidate can be compared fairly enough for final promotion. No AI-generated bride/groom substitute was used. Retained production remains untouched.
