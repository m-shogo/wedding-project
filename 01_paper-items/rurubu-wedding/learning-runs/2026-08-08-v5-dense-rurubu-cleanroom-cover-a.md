# V5 dense Rurubu clean-room cover A

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate: `413:2 / V5_OUTER_RURUBU_AUTHENTIC_DENSE_CLEANROOM_A_2026_08_08`
Current `77:18` was not modified.

## Authorities re-read
Before the experiment, re-read the project-wide production system, asset memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, current Rurubu status and evidence ledger, Rurubu editorial knowledge/lessons, V5 operating system/postmortem, and V6 current/reference research. Existing V5 gate remains authoritative: `PHOTO_ROLE_PASS 2/12`, dominant `2/3`, cover hero still open.

## User feedback / visible problem
The current cover is too clean, evenly spaced, and web-layout-like. The desired direction is authentic Rurubu: visually busy but editorially controlled, with strong unity. Existing V5 composition is not a required starting point.

## Hypothesis
A clean-room front cover using the verified structural lessons from the Hawaii fidelity study—strong color field, dominant photo, oversized destination title, issue burst, edge logo, direct-over-photo feature copy, narrow vertical feature, and dense micro-headlines—will read materially closer to a real travel guide than continued subtraction of the Current cover.

Expected improvement: stronger shelf impact, intentional information density, less web-card repetition, more recognizable Japanese travel-magazine hierarchy.
Possible regression: density can become unreadable; copy can lose contrast over a sunset hero; reference study can become imitation without WEDDING identity.
Evidence required: whole-spread screenshot, reading-scale screenshot, actual-size typography check, native-text/semantic structure check, and direct comparison with Current.

## Prototype
Duplicated Current outer spread to preserve rollback and rebuilt only the front-cover half as a new overlay structure. The back cover remains available in the same spread for contextual comparison.

Key native/editable modules:
- full pink cover field
- white top bonus strip
- three-block edge logo study
- `RURUBU WEDDING` masthead microtype
- large white destination-title cloud + `横浜`
- yellow issue burst
- large replaceable hero using the existing Current hero image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- direct-over-photo feature hierarchy
- narrow right vertical yellow feature
- dark interview kicker over hero
- bottom three feature teasers
- right-edge microcopy

All new copy is native Figma text. No final names/credentials were baked into generated imagery. Current and rollback frames were untouched.

## Screenshot QA and correction
First screenshot exposed two defects: `RURUBU WEDDING` was clipped behind the white title cloud, and white left-side feature copy lost contrast against the yellow sunset. These were corrected in the same comparison candidate: masthead moved above the cloud and left feature copy changed to dark navy while the yellow kicker remained.

A subsequent structure inspection found that the duplicated legacy `FRONT_COVER` frame still existed visibly underneath the clean-room overlay. Although the overlay hid it visually, retaining two active front-cover systems would weaken semantic clarity and make later adoption/error diagnosis harder. The clean-room candidate therefore changed the inherited `413:129 / FRONT_COVER` to `visible=false` while preserving it as rollback evidence. The back cover, provisional fold guide, and all 29 `CR_*` native clean-room nodes remain visible/editable. A post-change screenshot is visually identical, proving the cleanup removed hidden structural duplication rather than changing the approved appearance.

### Whole-item
PASS as a materially different clean-room direction. It is immediately denser and more travel-guide-like than Current and does not inherit Current card geometry.

### Reading/page
PROVISIONAL PASS. Reading order is top bonus → edge logo/masthead → destination/issue → feature copy + hero → vertical feature/interview → bottom teasers. Density is controlled by repeated pink/yellow/navy roles rather than equal cards.

### Actual-size/detail
PROVISIONAL. Native text remains editable and major text does not clip after correction. Final print-size typography and fold/safe-area evidence still need dedicated checks before adoption.

### Structure / rollback
PASS for comparison-candidate structure. Legacy front cover is hidden rather than deleted; back cover and provisional fold guide remain visible; clean-room content is represented by 29 semantically named native nodes; Current `77:18` is untouched.

## Result
`DISCOVERED → PROTOTYPED → VERIFIED_DIRECTION_AND_STRUCTURE / NOT_CURRENT / NOT_PROJECT_RULE`

This candidate is intentionally not promoted to Current yet. It proves that the project should compare a dense clean-room editorial cover against the legacy-derived V5 instead of assuming subtraction is always the quality path.

## Asset truth
The authoritative V5 ledger still identifies the real hero master as `01_COVER_HERO_YOKOHAMA_DUMMY.png`, Drive ID `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`, `2,089,658 bytes`, target `665×610`, minimum dummy derivative `1330×1220`, with the currently imported `5,927-byte` derivative rejected for visible quality. A separate Drive JPEG named `RURUBU_V5_DUMMY__01_COVER_HERO__IMG_HERO.jpg` (ID `1DeJm3cqf-YDZGvi8n7sP5hwnr27CpGpi`) was also observed, but it is not the role-level source of truth and therefore is not used to alter ledger status. This clean-room design does not convert the hero into PHOTO_ROLE_PASS.

## Reusable learning candidate
A clean-room alternative must be structurally clean as well as visually different. When a duplicate is used as a starting shell, inherited competing layout systems should be hidden/preserved as rollback rather than left simultaneously active beneath the new candidate. This remains a tested lesson, not yet a project-wide rule.

## Next application
1. Resolve V5-01 cover hero through the authoritative master lifecycle; do not substitute a similarly named derivative or convenience file for the ledger source.
2. Compare Current vs `413:2` at thumbnail, reading, and actual-size scales.
3. If dense clean-room wins after print/fold QA, translate the same editorial language to the inside spread rather than copying old card geometry.
4. Keep V6 production gate closed until V5 dummy-design/photo evidence is genuinely verified.
