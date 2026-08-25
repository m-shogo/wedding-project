# RSL-268 — A grounded planning source is a distinct editorial truth state

Source scope/item: Rurubu WEDDING / V7
Date: 2026-08-25
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Fingerprint

`F-RSL-268-GENERIC-MODEL-COURSE-PERSISTS-WHEN-A-GROUNDED-PLANNING-SOURCE-EXISTS`

## Source problem

V7 C6D had already corrected unsupported exact itinerary times by falling back to generic dayparts. That was factually safe, but it left the model-course page more generic than necessary after a real user-owned Hawaii planning memo was available.

The design risk had two opposite failure modes:

1. keep generic placeholder sequencing even when a stronger source exists; or
2. overcorrect by presenting a planning memo as verified completed-trip history.

## Root-cause hypothesis

Editorial truth is not binary (`dummy` versus `final fact`). A **planning source** can be legitimate reader-facing material when its status is explicit. It can support exact planned times/places without proving that the event actually occurred exactly that way.

If a travel-guide role is specifically about planning/sequence, hiding all source precision can weaken utility just as surely as inventing unsupported precision weakens truth.

## Bounded test

C6E `2505:2` replaced only C6D's generic right-page model-course role with a clearly labeled 2025 Hawaii planning-memo sequence:

- `6:00 / ダイヤモンドヘッド`
- `7:40 / KCCファーマーズマーケット`
- `16:00 / カラカウア通り`

Source-status copy explicitly states that the spread is composed from the 2025 Hawaii travel planning memo and that booking/event/opening details require rechecking before departure.

Specific-place dummy photos were hidden rather than allowed to imply documentary proof.

## Evidence

Source:

- Google Drive document `ハワイ🌺`
- ID `1tuFgCN63Z9Fnadr7qKy6enDZ0fAfTEmRiG2tKLE4UYg`
- treated as **planning memo**, not completed-trip diary

Figma:

- C6E `2505:2` current
- C6D `2413:2` hidden rollback
- authority page `2052:2`
- right-page structural place-photo dummies withheld

Visual/structure QA:

- 500px PASS
- 1400px PASS
- 1587×1123 DESIGN QA PASS
- visible native text `21`
- visible image fills `3` (left page only)
- text intersections `0`
- 18px edge risks `0`
- current V7/V8 root overlap `0`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C6E-GROUNDED-PLANNING-MEMO-MODEL-COURSE-QA-2026-08-25.md`

## Existing learning this extends without replacing

- **RSL-093:** model-course authenticity comes from a real reader job, not additional surface styling.
- **RSL-257:** precise temporal data is appropriate only with authority. C6E demonstrates an allowed, explicitly labeled planning-source case.
- **RSL-262:** grounded place-specific copy must not authenticate unverified imagery.

RSL-268 is distinct because it defines the intermediate **source-plan** state and the transition rules around it.

## Transfer principle

For another artifact with planning, proposal, draft schedule or pre-event source material:

1. do not collapse the source into final-event truth;
2. do not throw away useful precision merely because it is not post-event evidence;
3. label the source state in reader-facing language when that state is editorially relevant;
4. keep update-sensitive caveats visible where needed;
5. separate source-grounded copy from imagery that has not been verified for the named event/place.

## Do not transfer

- Hawaii / Diamond Head / KCC / Kalakaua subject matter;
- exact times or dates;
- V7 coral/cyan/navy treatment;
- typography sizes and coordinates;
- stop count;
- page geometry.

Project-wide promotion still requires independent cross-item evidence.
