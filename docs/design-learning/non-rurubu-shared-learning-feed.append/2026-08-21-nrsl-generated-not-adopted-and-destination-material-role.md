# Non-Rurubu shared learning append — ADD-02 destination V3 anchors

Date: 2026-08-21
Owner: non-Rurubu Figma quality task

## NRSL — GENERATED OUTPUT IS NOT AN ASSET UNTIL ROLE-VALID

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: ADD-02 11卓の国別テーブルサイン

### Visible problem

An image-generation attempt returned a polished but semantically unrelated QA/report-style graphic instead of the requested destination fixed-art role. Treating generation success as asset success would have polluted Drive/Figma with a wrong artifact.

### Root cause

The generation transport can succeed while semantic role adherence fails. Asset lifecycle state must therefore distinguish `generated` from `adopted`.

### Bounded response

The artifact was visually rejected immediately. It was not saved to the exact ADD-02 Drive authority, not uploaded to Figma, and not counted as a candidate/master/placed asset.

### Evidence

- source item: ADD-02
- Figma production unchanged for image roles
- new V3 anchors: `149:2 / 149:21`, IMAGE fills 0
- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-DESTINATION-LEXICON-V3-ANCHOR-QA-2026-08-21.md`

### Transferable principle

For generated/composed production art, use explicit states: `GENERATED → ROLE_VALID_CANDIDATE → ADOPTED → DRIVE_MASTER_VERIFIED → PLACED → THREE_SCALE_VERIFIED`. A failure at role validity must stop the lifecycle before Drive/Figma placement.

Do not transfer any ADD-02 palette, destination motif or layout.

## NRSL — DESTINATION FAMILY DIFFERENTIATION CAN COME FROM MATERIAL/ATMOSPHERE ROLE, NOT SHARED HERO GEOMETRY

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: ADD-02 HAWAII/JAPAN V3 anchors

### Visible problem

Earlier subtraction studies removed repeated abstract shapes but became generic modernist posters or replaced one repeated metaphor with another. Destination identity remained weak.

### Bounded experiment

Two blank-frame anchors were built with different material/atmosphere roles while keeping only physical size and semantic information roles constant:

- HAWAII `149:2`: coastal light / wind-ripple print field;
- JAPAN `149:21`: paper / light / offset-sheet detail field.

### Result

At 500px thumbnail and 1200px reading scale, the pair remains more distinguishable through material/light behavior than the rejected A–D study while retaining more wedding warmth. Both roots remain 1000×1480, native text 6/6 auto-height after repair, outside text 0, IMAGE fill 0.

A long-copy stress also found a HAWAII headline/description overlap after auto-height was corrected; the description lane was moved and revalidated. This reinforces the existing rule that spatial changes require fresh dynamic-copy stress.

### Regression risk

A material/atmosphere role can itself become a new template if mechanically repeated across all destinations. This is not permission to assign one texture preset per country or to use cultural stereotypes.

### Next receiving experiment

Test one materially different destination family/item where the subject itself should be distinguishable without relying only on labels. Verify whether distinct material/atmosphere roles improve specificity without fragmenting family coherence. Keep this as a hypothesis outside destination-family contexts until independently reproduced.
