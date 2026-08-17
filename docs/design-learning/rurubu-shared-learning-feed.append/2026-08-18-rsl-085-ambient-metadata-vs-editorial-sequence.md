# RSL-085 — Ambient metadata must not outrank the editorial sequence

Date: 2026-08-18
Source scope: Rurubu WEDDING only
Source item: V6 Outer / back-cover chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Live Outer AE `1646:2` had a strong photo-led upper back cover, but its lower chronology still read like placed metadata rather than a magazine sequence. The oversized `20XX-20XX` ghost range competed with the actual milestones, while 01–05 lacked a restrained reading path into the final WEDDING terminal.

## Root-cause hypothesis

The ambient/decorative metadata had more visual authority than the information it was supposed to support. The milestones also had insufficient major/minor hierarchy, so the lower page behaved like a loose UI/data cluster.

## Bounded test

Created rollback-safe duplicate Outer AF `1655:2` from AE and changed only the chronology area:

- compressed the ambient `20XX-20XX` ghost to a small low-opacity metadata role;
- kept 01 / 03 / 05 as major native-type beats;
- kept 02 / 04 as quieter support beats;
- added one thin, low-opacity navy binding rail `1655:95` rather than new cards or repeated boxes;
- retained the established WEDDING terminal as the strongest close;
- preserved front cover, photography, image hashes and replaceable-photo roles.

## Expected improvement

Create a clearer `photo → chronology → WEDDING` flow, reduce UI/template feel, and let native typography carry the editorial hierarchy without adding decorative modules.

## Regression risks

- the binding rail could become diagrammatic;
- minor events could become too quiet;
- large ordinal typography could collide with year labels;
- chronology could violate back-cover safe area.

## Evidence and result

First structural QA found two real collisions: milestone 01/year 0 and milestone 03/year 2. AF was not promoted in that state. The year/label pairs were moved, then QA was rerun.

Final verified state:

- preferred Outer AF root: `1655:2`;
- back page: `1655:3`;
- binding rail: `1655:95`;
- rollback AE: `1646:2`, hidden;
- Start Here: `845:27`;
- whole-item / thumbnail: PASS;
- reading/page scale: PASS;
- actual-size back cover: PASS;
- visible back-cover native text: 23;
- text collisions: 0;
- 18px text safe-area risks: 0;
- new image generation: 0;
- new Drive asset: 0;
- new binary placement: 0;
- image hash/geometry changes: 0.

Drive V6 root was re-read before promotion: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Result: `AF VERIFIED_LOCAL / PREFERRED`.

## Failure fingerprint

`OVERSIZED_AMBIENT_METADATA_COMPETES_WITH_EDITORIAL_HIERARCHY`

- operation/capability: print chronology editorialization;
- environment/tool path: Figma native text / frames;
- symptom family: ghost/watermark metadata dominates the sequence; repeated entries read like UI metadata;
- likely cause class: decorative hierarchy outranks semantic hierarchy and lacks a restrained binding path;
- last evidence date: 2026-08-18;
- replacement method: compact ambient metadata, major/minor native-type hierarchy, one restrained semantic binding rule, strong terminal;
- stop condition: if the rail begins to read as a diagram or reduces sequence clarity, remove the rail and retain only the type hierarchy.

## What must remain Rurubu-specific

Do not transfer the exact navy/yellow/coral palette, ordinal sizes, coordinates, Yokohama/WEDDING wording, date treatment, masthead or terminal geometry.

## Cross-item applicability hypothesis

For photo-led print layouts where ambient metadata visually competes with the real sequence, test shrinking ambient metadata and establishing major/minor native-type hierarchy before adding cards. A single restrained binding rule may help only when it improves reading continuity without becoming a diagram.

This is not cross-item verified. Another wedding item would need its own rollback-safe test and three-scale evidence before promotion.