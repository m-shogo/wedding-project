# NRSL — Generic English internal-concept labels can weaken Japanese-first print hierarchy

Date: 2026-08-22
Source scope: non-Rurubu
State: `VERIFIED_CROSS_ITEM → CROSS_ITEM_CANDIDATE`
Failure fingerprint: `GENERIC_ENGLISH_INTERNAL_CONCEPT_LABEL`

## Visible problem

Two materially different Current items independently retained small English labels that described the designer's concept rather than helping the guest use or understand the printed object:

- ADD-16 HOME TEXTILE MAT: `A HOME TO CARRY WITH US`;
- ADD-11 DARKROOM DEVELOPING TRAY: `DARKROOM / SHARE 01`.

Both items were otherwise structurally and visually healthy. The labels were not factual English required by the object and were not necessary brand marks. At actual-size review they read as generic editorial decoration / internal art-direction language, weakening the Japanese-first voice.

## Root-cause hypothesis

During AI-assisted graphic design, a concept name or mood phrase can accidentally survive into reader-facing production because it helps the model explain the visual system during authoring. Once the visual metaphor itself is strong, that explanatory English becomes redundant decoration.

## Bounded tests

### ADD-16

- Current front: `57:3`;
- rollback: `63:2`;
- only `TEXT / KICKER` changed from `A HOME TO CARRY WITH US` to native Japanese `両親へ`;
- long-copy proof `57:36` synchronized;
- fresh screenshot PASS;
- selected/stress each retain fixed-height `0`, outside `0`, IMAGE `0`.

Evidence: `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/FIGMA-JAPANESE-KICKER-POLISH-2026-08-22.md`
Git commit: `927c6b9797e1f56ad84e269c6c4b0aa5c5d189a6`.

### ADD-11

- Current A5/A4: `52:2 / 53:2`;
- complete hidden rollback copies created before the edit;
- `TEXT / ARTIFACT` changed from `DARKROOM / SHARE 01` to native Japanese `写真共有` on selected and stress roots;
- font role changed from Inter Bold to Noto Sans JP Bold while preserving existing scale/position;
- fresh A5 screenshot PASS;
- existing structural gates remain intact; IMAGE `0`.

Evidence: `01_paper-items/additional-wedding-items/ADD-11-photo-share-qr-sign/FIGMA-JAPANESE-ARTIFACT-LABEL-POLISH-2026-08-22.md`
Git commit: `c5e6094cbfaa00e2067c917e534a41b8d8c1ec3b`.

## Expected improvement

- Japanese editorial voice becomes more deliberate;
- the artifact communicates through typography and physical form rather than explanatory AI-style labels;
- internal concept names stop leaking into guest-facing production;
- useful English can still remain where it has real artifact, brand, wayfinding, or cultural meaning.

## Regression risk

Do **not** turn this into `remove all English` or `translate every label`. English may be correct when it is an authentic artifact identity, recognized functional term, proper noun, destination/brand language, or a deliberate bilingual editorial voice. Removing meaningful English can reduce travel character or artifact authenticity.

The question is whether the text has a reader-facing job beyond decorating/explaining the concept.

## Three-scale evidence

Both receiving items were reviewed at their Current actual-size screenshots after the bounded repair. No hierarchy regression or new crowding appeared. Existing whole/reading/actual-size and long-copy proofs remain valid because geometry outside the small label role was not changed.

## What must remain item-specific

Do not transfer exact copy (`両親へ`, `写真共有`), fonts, colors, positions, textile/darkroom metaphors, or item layout.

## Cross-item applicability

When a future Current contains small English copy, classify it before touching it:

1. factual/proper/brand/functional/authentic artifact language → normally preserve;
2. deliberate bilingual editorial voice with a clear reader job → test in context;
3. internal concept name, generic mood slogan, fake system label, or unexplained numbering used only for visual texture → independently test subtraction or a more useful native label.

Next receiving-item experiment: inspect a materially different item that currently uses small English identity copy, but change it only when the screenshot shows the text has no real reader-facing job. Do not manufacture a cross-item rule by editing healthy bilingual typography.