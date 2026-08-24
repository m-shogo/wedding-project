# ADD-16 両親贈呈品メッセージカード — Actual-size date legibility QA

Date: 2026-08-24
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main SHA: `bb5af2e7621943ab9fe449da3cfc01d998abb200`

## Scope

Bounded typography repair on the already-selected `HOME TEXTILE MAT` front only. No composition, message copy, palette, weave/selvage geometry, back writing surface, image role, or family visual language was changed.

## Live authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Current front: `57:3 / CURRENT_SELECTED / ADD16 / FRONT / HOME TEXTILE MAT`
- Current front date: `57:16 / TEXT / DATE`
- hidden realistic front stress: `57:36`
- stress date: `57:49 / TEXT / DATE`
- exact Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive write: `0`
- image generation: `0`

## Observed problem

Fresh native `700×1036` review showed the confirmed date `2026.10.24` visually weaker than intended at the physical/detail review scale. The date was `Inter Bold / 18 px / 26 px line-height`, while the surrounding composition already had sufficient quiet space for a stronger factual read.

This is the same already-promoted QA class `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE`: a factual role should not be accepted only because it technically renders inside Figma.

No universal point-size threshold is inferred here because the final printer/paper/physical proof is still unresolved. The decision is local and screenshot-backed.

## Rollback-safe bounded test

A comparison was created from the Current front without changing any other role:

- comparison: `72:2 / QA / ADD-16 / FRONT / DATE LEGIBILITY 24PX / 2026-08-24`
- only date typography changed: `18 px / 26 px → 24 px / 32 px`
- characters unchanged: `2026.10.24`
- font unchanged: `Inter Bold`
- x/y/width unchanged
- all message/signature roles unchanged
- no image/SVG/generated asset added

The 24px date remained clearly subordinate to the Japanese display while improving the factual read at native size.

## Promotion / rollback

Before Current mutation, complete hidden rollbacks were created:

- `72:18 / ROLLBACK / ADD-16 / FRONT / PRE-DATE-LEGIBILITY-24PX / 2026-08-24`
- `72:34 / ROLLBACK / ADD-16 / FRONT LONG COPY / PRE-DATE-LEGIBILITY-24PX / 2026-08-24`

Promoted changes:

- Current `57:16`: `18 → 24 px`, line-height `26 → 32 px`
- stress `57:49`: `18 → 24 px`, line-height `26 → 32 px`
- comparison `72:2`: hidden after verification

## Three-scale / stress QA

- whole-item: PASS; no change to the front's dominant hierarchy or textile/homecoming identity.
- reading scale: PASS; date is more stable without competing with display/message roles.
- native actual-size render `700×1036`: PASS.
- realistic long-copy front: PASS after temporary live reveal; long body/signature copy remains clear and the enlarged date does not collide with the lower weave.

Post-readback:

- Current date `57:16`: `Inter Bold / 24 px / 32 px / textAutoResize=HEIGHT`
- stress date `57:49`: `Inter Bold / 24 px / 32 px / textAutoResize=HEIGHT`
- Current/stress fixed-height date count: `0`
- IMAGE fills added: `0`

## Hybrid authoring / asset decision

- factual date remains native editable text;
- no variable information was rasterized;
- no generated/composed asset was needed;
- no Drive write was needed.

The bottleneck was factual typography, not missing hero/illustration/texture.

## Learning state

`VERIFIED_LOCAL` application of the already promoted factual-microtype actual-size QA rule. No new project rule is created from this change.

## Deferred finalization

Still `NOT_PRINT_READY` pending final printer template/profile, paper stock/finish, actual gift/package attachment method, and 100% physical proof.
