# るるぶWEDDING V8 — Profile Z answer-owned voice QA

Date: 2026-08-22
State: `VERIFIED_LOCAL_DESIGN_STUDY / PROFILE_Z_CURRENT / ROLLBACK_SAFE / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
Scope: Rurubu WEDDING only.

## Live authority before write

- GitHub main: `29b45870daeef03a9274b0fc7db9fa802e09ad4b`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- V6 control remains frozen: `JC + IX + JB + IZ + IT + JA`
- V7 six-role comparison set remains preserved and not preferred.
- V8 before this experiment: `W + V + Q + R + X + T`.
- Drive V8 authority folder re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`.
- No new Drive master or image placement was involved.

## Fresh professional research used as hypothesis

This run intentionally used new or deeper references rather than repeating the previous W/X sources.

1. **Córdova Canillas / It's Nice That** — editorial design should be driven by content; a publication does not become strong from layout technique alone. Useful hypothesis: the real short answers can carry visual authority instead of the interview prompts behaving like form labels.
2. **Elana Schlenker / Eye on Design** — she explicitly described the mainstream editorial habit of placing a large decorative letter and calling the page designed. Useful hypothesis: avoid adding decorative display mass; use the actual respondent voice as the display material.
3. **IDEA / Takeo Nakano** retained as background principle only: book design should be editorial from fundamental structure, not surface treatment.

These references informed a bounded test; no literal layout, type treatment, palette or protected artwork was copied.

## Visible problem

Profile V `2207:2` was structurally clean and stronger than earlier variants, but the Q&A page still gave the prompts more visual authority than the responses. At reading scale it could still read like an elegant interview form: `Q1/Q2/Q3 + question + smaller gray answer`.

The problem was not missing imagery. The existing answers were the only truly person-owned voices on the page and were being visually subordinated.

## Root-cause hypothesis

When very short Q&A answers contain the actual speaker voice, making the prompts dominant and the answers secondary can preserve UI/form semantics even after cards and rules are removed. A more editorial treatment should let the respondent voice carry the visual mass while the prompt remains navigational context.

## Bounded experiment

### Rejected first study — Y `2214:2`

A rollback-safe clone increased question/prompts unevenly and rewrote the kicker to reader-facing Japanese.

Result: rejected. The unequal prompt sizes created visual variation without enough semantic basis; Q2 became too quiet while Q1/Q3 became louder primarily for composition. This failed the professional-authenticity gate because the hierarchy could not be defended from content.

Y is hidden and named:

`REJECTED / V8 PROFILE Y / PROMPT-WEIGHT HIERARCHY WITHOUT SEMANTIC BASIS / 2026-08-22`

### Adopted second study — Z `2215:2`

Created from current V, not from Y.

Changes:

- `Q&A / SMALL VOICES` → native `Q&A / 小さな会話`;
- kept `会話のページ。` rather than inventing a new factual statement;
- reduced each question to navigation/context scale;
- promoted the existing native answers to the larger editorial voice:
  - `海の近く。朝が早い街。`
  - `予定を詰めすぎないこと。`
  - `みんなの声と、食卓の景色。`
- kept Q1/Q2/Q3 as small red navigation anchors;
- kept SHOGO / SHI-CHAN left-page hierarchy and article-owned close unchanged;
- added no image, card, badge, shadow, gradient, decorative English or invented fact;
- answer color was restored to full publication contrast after reading-scale review;
- initial Q-number text boxes overlapped question text boxes by 5–8 px even though the screenshot looked clean; the label boxes were narrowed and structural QA rerun before promotion.

## Three-scale QA

- 500 px whole spread: PASS. The answer voices remain visible as the three primary Q&A beats without turning into a uniform card/list system.
- 1000 px reading scale: PASS. Prompt → answer reading remains clear and the page reads as editorial conversation rather than a form.
- 1587×1123 actual size: PASS. Japanese line breaks remain intentional and minor text is legible.

## Structure QA

Profile Z `2215:2`:

- visible native text: `23`
- visible IMAGE roles: `0`
- absolute text-box intersections: `0` after Q-label box correction
- 18 px text safe-area risks: `0`
- one-character Japanese explicit line heuristic: `0`
- whole-page flattening: `0`
- variable copy remains native/editable

## Promotion / rollback

- Current: Profile Z `2215:2`
- Previous Current V `2207:2`: hidden rollback, not deleted
- Rejected Y `2214:2`: hidden rejected study
- V6/V7 controls unchanged

## Asset truth

- new image-model generation: `0`
- newly created Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`

The lack of a new image was not treated as completion of the image-generation objective. This experiment addressed a real typographic/editorial defect while preserving the separate future requirement for role-specific generation → Drive → Figma closure.

## Learning state

`RSL-204 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprints:

- `F-RSL-204-PROMPTS-DOMINATE-SHORT-ACTUAL-VOICE-AND-PRESERVE-FORM-SEMANTICS`
- rejected local branch fingerprint: `F-RSL-204-UNEQUAL-PROMPT-SCALE-WITHOUT-CONTENT-BASIS`

Do not transfer the exact Q&A geometry, names, copy, navy/red palette or scale values. The transferable hypothesis is only: when respondent answers are short and semantically strong, test whether the actual voice should own the display hierarchy before adding decorative editorial devices.
