# RSL-215 — Reader-facing publication furniture should not expose internal schema vocabulary

Date: 2026-08-22
Source scope: Rurubu WEDDING
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 had already removed many generic English and template-like devices, but four different spreads still exposed small English production/schema labels such as `PROFILE`, `STORY`, `CHRONOLOGY`, `MEMORY`, `GUIDE / INDEX`, and `1DAY`. At thumbnail scale these small labels were not the dominant hierarchy, yet together they reintroduced a prototype/template voice that the main Japanese editorial copy no longer used.

## Root-cause hypothesis

Small page furniture is part of publication voice. When its vocabulary describes the designer's internal content model rather than what the reader needs to know, a finished editorial layout can still feel AI/template-generated. The defect is semantic ownership, not the use of English itself.

## Professional research hypothesis

Fresh sources consulted:

- JAGDA `Graphic Design in Japan 2026`: Book & Editorial Design remains a distinct professional field in current Japanese graphic design.
- IDEA No.326 on Takashi Kono: book/magazine design is framed through modernity and locality.
- IDEA No.387 on Japanese book-design history: publication design explicitly negotiates words, figure and form rather than treating labels as neutral styling.

These references were not copied. They informed a bounded hypothesis that Rurubu's publication furniture should sound like the publication, not like an internal layout schema.

## Bounded test

Four materially different V8 roles were duplicated rollback-safe and only schema-like furniture was changed:

- Profile AJ → AK `2238:2`: `01 / PROFILE` → `01 / ふたり`
- Story Q → AL `2238:35`: `02 / STORY` → `02 / 物語`; `CHRONOLOGY / 2019—2026` → `年表 / 2019—2026`; event `WEDDING` → `結婚式`
- Memory AD → AM `2238:73`: `03 / MEMORY` → `03 / 記憶`; `GUIDE / INDEX` → `寄り道案内`
- 1DAY AG → AN `2238:106`: `05 / 1DAY` → `05 / 一日旅`

Brand/identity English was deliberately not removed: `るるぶ WEDDING` remains publication identity; `SHOGO / SHI-CHAN` remain person identifiers.

## Evidence

All four changed roots:

- whole-item 500px screenshot reviewed
- reading-scale 1400px screenshot generated/reviewed
- actual-size 1587×1123 screenshot generated/reviewed
- text intersections `0`
- 18px safe risk `0`
- generic schema-furniture audit `0`
- native/editable text preserved
- parent page `2052:2`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-JAPANESE-READER-FURNITURE-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-215-INTERNAL-SCHEMA-VOCABULARY-LEAKS-INTO-PUBLICATION-FURNITURE`

Fingerprint fields:

- operation/capability: editorial page-furniture authoring
- symptom: small visible labels describe layout/content schema rather than reader-facing publication meaning
- likely cause: default AI/design-system vocabulary surviving after the main composition became editorially specific
- correction: identify the real semantic owner; replace only unowned schema vocabulary with reader-facing language; preserve English that has a genuine brand/identity/data role
- stop condition: do not mechanically translate all English

## What must NOT transfer

Do not transfer the exact Rurubu terms (`ふたり`, `物語`, `寄り道案内`, `一日旅`), numbering, scale, typography, or layout to another item.

## Cross-item applicability hypothesis

Other wedding items may independently test whether small visible labels expose production vocabulary such as `PROFILE`, `SECTION`, `INFO`, `GUIDE`, `DETAILS`, or other schema terms with no reader-facing job. Receiving items must choose their own language and keep domain-authentic terms when appropriate.
