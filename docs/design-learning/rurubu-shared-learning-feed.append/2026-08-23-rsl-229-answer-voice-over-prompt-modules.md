# RSL-229 — Answer voice should outrank repeated prompt modules

Date: 2026-08-23
Scope: Rurubu WEDDING
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Observation

A Q&A spread can avoid rounded cards and still read like a form/dashboard when question numbers and prompts occupy more visual authority than the available human answers.

## Root-cause hypothesis

The page is organized by the schema of the interview (`Q1…Q6`) instead of the editorial value of the content. Repeated question furniture becomes the visible subject, while the person/voice becomes secondary.

## Local test

V7 Profile J `2301:2` → Profile K `2303:2`.

K preserved all known content and did not invent missing answers. It enlarged the two existing answer texts into editorial voice beats and compressed the prompt-only Q2/Q3/Q5/Q6 into quieter indexes. Large repeated numeric modules were removed where they carried no additional editorial responsibility.

## Verification

- 500 px whole-spread QA: PASS
- 1400 px reading QA: PASS
- `1587×1123` actual-size QA: PASS
- native text: `30`
- text intersections: `0`
- 18 px text safe-area risks: `0`
- accidental one-character Japanese explicit lines: `0`
- V7 identity retained; page did not collapse into the quieter V8 system.

## Failure fingerprint

`F-RSL-229-QA-PROMPT-MODULES-OUTWEIGH-AVAILABLE-HUMAN-VOICE`

Symptom:
- repeated question numbers/prompts dominate a Q&A page;
- answers feel like metadata beneath the question UI;
- the page reads like a styled questionnaire rather than editorial conversation.

Corrected method:
1. identify actual voice/content that exists;
2. give that content visual authority first;
3. group prompt-only items by their real semantic role;
4. retain equal treatment only when their editorial role is genuinely equal;
5. do not invent answers or use arbitrary displacement merely to create variation.

## Boundary

This is not a rule to enlarge every answer or remove every question number. Some interviews legitimately need systematic question navigation. Promotion beyond Rurubu requires materially different cross-item evidence under the shared-learning system.
