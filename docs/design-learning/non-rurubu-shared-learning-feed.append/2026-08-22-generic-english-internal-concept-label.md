# NRSL — Generic English internal-concept labels can weaken Japanese-first print hierarchy

Date: 2026-08-22
Updated: 2026-08-23
Source scope: non-Rurubu
State: `PROMOTED_PROJECT_RULE`
Failure fingerprint: `GENERIC_ENGLISH_INTERNAL_CONCEPT_LABEL`

## Visible problem

Three materially different Current items independently retained small English labels that described the designer's concept, simulated a system identity, or implied an instruction that the guest did not actually need:

- ADD-16 HOME TEXTILE MAT: `A HOME TO CARRY WITH US`;
- ADD-11 DARKROOM DEVELOPING TRAY: `DARKROOM / SHARE 01`;
- ADD-13 RESORT DESK LETTER back: `CHECKOUT NOTE`.

All three items were otherwise structurally and visually healthy. The labels were not factual English required by the object and were not necessary brand marks. At actual-size review they read as generic editorial decoration, internal art-direction language, fake system copy, or misleading instructions, weakening the Japanese-first voice or artifact clarity.

## Root-cause hypothesis

During AI-assisted graphic design, a concept name, mood phrase, fake system label, or explanatory artifact name can accidentally survive into reader-facing production because it helps the model reason about or describe the visual system during authoring. Once the visual metaphor itself is strong, that explanatory English can become redundant or misleading decoration.

The failure is **not English itself**. The failure is English that lacks a legitimate reader-facing job.

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

### Cross-item verification — ADD-13 / 2026-08-23

ADD-13 provided a third materially different verification and, importantly, refined the rule so it does not become an anti-English heuristic.

Current artifact:

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`;
- front `52:72 / RESORT DESK LETTER` already uses deliberate duplex identity `YOKOHAMA · LETTER 01`;
- back Current before the test: `52:91 / ... / CHECKOUT NOTE`;
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`.

Visible problem:

- `CHECKOUT NOTE` visually fit the hospitality metaphor, but semantically it could read as a hotel checkout instruction or an internal concept name rather than the identity of the back side of a writable message card;
- the front/back pair therefore had weaker editorial continuity than the physical letter metaphor itself deserved.

Rollback-safe bounded comparison:

1. comparison `55:2` first tested `YOKOHAMA · LETTER 02`;
2. that version was **REJECTED** because the 120px strip forced an awkward `YOKOH / AMA ...` wrap at the existing Inter Bold 20px;
3. method switched to the shorter `LETTER 02` rather than shrinking type or widening the established strip;
4. `LETTER 02` remained a meaningful English artifact identity, fit on one line, and paired naturally with the front's `LETTER 01`.

Promotion:

- hidden rollback Current: `55:20`;
- hidden rollback stress: `55:38`;
- Current back remained stable ID `52:91` and changed only the strip label to `LETTER 02`;
- stress strip `52:131` synchronized;
- comparison `55:2` hidden after adoption;
- generated raster/SVG/image additions: `0`;
- Drive write: `0`.

Post-change whole/reading/actual-size screenshot QA: PASS.

A separate post-change stress screenshot also exposed a Japanese semantic-line-break defect in the retained stress title. Current short copy was healthy, so Current title typography was not mutated. The hidden stress proof was repaired independently at 28px with explicit semantic breaks. This confirms the wider principle that replacing a questionable English label must still be followed by normal Japanese editorial QA rather than treated as a self-sufficient cleanup.

Evidence:

- `01_paper-items/additional-wedding-items/ADD-13-message-card/FIGMA-BACK-ARTIFACT-LABEL-POLISH-2026-08-23.md`
- item evidence commit: `821799a27461c5259718e4215cf2de59ee77f9e2`
- canonical QA sync commit: `79c080ff59e67a6b9c7889a6f3d5c12d4de0b5f8`

## Expected improvement

- Japanese editorial voice becomes more deliberate where Japanese is the actual reader-facing language;
- internal concept names stop leaking into guest-facing production;
- fake system labels and misleading instructions are reduced;
- artifact identity becomes clearer;
- useful English remains available where it provides genuine travel character, brand/proper identity, artifact authenticity, or intentional bilingual editorial voice.

## Regression risk

Do **not** turn this into `remove all English`, `translate every label`, or `Japanese is always better`.

English may be correct when it is:

- an authentic artifact identity;
- a recognized functional term;
- a proper noun, destination, venue or brand language;
- a deliberate bilingual editorial voice with a clear reader job;
- an item-specific physical cue that becomes less authentic if translated.

Removing meaningful English can reduce travel character or artifact specificity. Replacing a short English label with a longer string can also create new wrapping or actual-size defects, as the rejected ADD-13 `YOKOHAMA · LETTER 02` test demonstrated.

## Promoted project rule

For small English identity/kicker/system-style copy in wedding print work, classify the text **before** editing it:

1. **Factual / proper / brand / functional / authentic artifact language** → normally preserve and QA for physical-size readability.
2. **Deliberate bilingual editorial voice with a clear reader-facing job** → preserve unless a screenshot-supported hierarchy problem exists.
3. **Internal concept name / generic mood slogan / fake system label / unexplained numbering / misleading instruction used mainly for visual texture** → independently test subtraction or replacement in a rollback-safe comparison.

When replacement is appropriate:

- do not automatically translate literally;
- test the replacement inside the actual physical text lane at whole, reading and actual size;
- reject replacements that create awkward wrapping, microtype, weak hierarchy or loss of artifact authenticity;
- keep variable/factual final copy native and editable;
- run Japanese semantic-linebreak QA after the change when surrounding Japanese typography is affected.

This is a **reader-job classification rule**, not an English-removal style rule.

## Three-scale evidence

ADD-16, ADD-11 and ADD-13 were each reviewed at Current whole/reading/actual-size screenshots after their bounded repair. No hierarchy regression or new crowding remained in the adopted variants. ADD-13 additionally demonstrated a rejected replacement before the final one-line artifact identity was adopted.

## What must remain item-specific

Do not transfer exact copy (`両親へ`, `写真共有`, `LETTER 02`), fonts, colors, positions, textile/darkroom/letter metaphors, or item layout.

## Cross-item applicability

Use this classification on future print artifacts containing small English copy, but do not hunt for English merely to manufacture work. Apply only when actual-size or family-scale review shows that a label has no legitimate reader-facing job or actively weakens artifact meaning.

Next receiving-item experiment: when another materially different item exposes ambiguous English identity copy, first classify its reader job. If meaningful, preserve it. If internal/misleading, run one bounded comparison and record both accepted and rejected treatments rather than assuming deletion or translation is correct.
