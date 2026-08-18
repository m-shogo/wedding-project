# NRSL — Japanese-first semantic event labels

Date: 2026-08-19
Source scope: non-Rurubu
State: `VERIFIED_CROSS_ITEM`

## Visible problem
Two materially different print artifacts were already Japanese-led overall, but isolated semantic event labels remained English-only:

- BOARDING PASS V5: `CEREMONY 14:10` inside a ledger whose other roles were `受付 / 卓 / ご案内`;
- ADD-03 timetable V2: `CEREMONY` and `RECEPTION` inside a board whose title, notes and placeholders were Japanese.

In both cases the English words were understandable, but they read as residual template/transport styling rather than necessary information or authenticity.

## Root-cause hypothesis
When artifact identity and travel/transport grammar are already established by physical shape, typography, route/ledger structure and a bounded artifact-type label, repeating ordinary event terminology in English can fragment hierarchy. Reader-facing semantic labels should normally follow the dominant language unless the English wording performs a distinct authenticity, legal, brand, or navigation job.

## Bounded tests

### BOARDING PASS V5
Only `CEREMONY 14:10` changed to `挙式 14:10`. Date, time, guest identity, location, ticket cut, guilloche, event ledger and placeholders were unchanged.

Result: native-size `1200×550` review was stronger and more coherent; structure remained native text 10 / IMAGE 0 / outside 0.

Evidence:
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`, selected `39:22`, stress `40:2`
- Drive: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- Git: `01_paper-items/boarding-pass/FIGMA-V5-JAPANESE-CEREMONY-LABEL-QA-2026-08-19.md`
- Git commit: `6fdad7260c7d0491f461d90386951dd5625d0470`

### ADD-03 timetable
Only `CEREMONY → 挙式` and `RECEPTION → 披露宴` changed on A2/A3 selected and their long-copy proofs. Times, duration, date/location, event indices, TBD transfer interval, notes and timeline geometry were unchanged.

Result: A2 `1400×1980` and A3 `990×1400` whole/reading review were stronger; selected/stress outside text remained 0 and IMAGE remained 0.

Evidence:
- Figma: `woFUHUqZcvNkih8o42xeH4`, selected `14:2 / 15:40`, stress `15:2 / 15:72`
- Drive: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`
- Git: `01_paper-items/additional-wedding-items/ADD-03-timetable-board/FIGMA-JAPANESE-EVENT-LABELS-QA-2026-08-19.md`
- Git commit: `66aaefce8c2afc4232bbb4515001cd7aba84cc87`

## Expected improvement
A more coherent Japanese-first information hierarchy with less generic airport/template tone, without weakening travel identity or editability.

## Regression risk
Do not mechanically translate every English element. Artifact-type labels, genuine brands, standardized codes, names, destinations, or English whose visual/semantic role is intentionally authentic may be worth retaining. Translation can also alter text width and line breaks; re-run actual-size and long-copy QA.

## Three-scale evidence
- BOARDING PASS: whole/native/actual `1200×550` PASS.
- ADD-03 A2/A3: whole and reading PASS; native physical roots `1400×1980` and `990×1400` PASS; matching long-copy roots keep outside text 0.

## What must remain item-specific
Do not transfer exact fonts, rust/blue/teal colors, ticket ledger geometry, timeline axis, copy scale, English artifact kickers, or any literal layout between items.

## Cross-item applicability
When a Japanese wedding print artifact contains isolated English semantic labels, first ask whether the English text carries a unique reader-facing/authenticity job. If not, test a Japanese semantic label in a rollback-safe duplicate before adding more decoration or English filler.

## Next receiving-item experiment
Apply the method only when another non-Rurubu item shows a concrete mixed-language hierarchy problem. Compare both versions at thumbnail and actual size, and retain English where it clearly performs a binding, authenticity, brand, or navigation role.