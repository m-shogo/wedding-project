# V5 profile ribbon subtraction

Date: 2026-08-07
Item: Rurubu WEDDING V5
Target: live Figma inside-left profile area

## Authority read

Before this run, the project-wide Figma production system, generated-asset memory, continuous-learning system, project memory, quality-over-legacy decision, V5 Current Status, V5 asset evidence ledger, editorial knowledge base, editorial lessons log, V5 operating system, postmortem/V6 guardrails, and V6 status/research references were reviewed. Live Figma remains the implementation authority.

## Visible problem

The profile area already communicated identity through the section heading, two distinct profile columns, large native names (`SHOGO`, `SHI-CHAN`), profile photos, metadata, and colored vertical rules. Two rotated colored ribbons reading `新郎 PROFILE` and `新婦 PROFILE` repeated that role while adding sticker/tape geometry above the portraits. If these ribbons did not already exist, the current editorial hierarchy would not require them.

## Hypothesis / tested principle

Test the project reduction rule: when names, placement, and structural rules already establish identity, remove redundant label containers before adding or refining decoration.

Expected improvement:
- quieter profile opening;
- less Canva/Web-UI/sticker feel;
- stronger direct path from `OUR PROFILE / ABOUT US` to names and photographs;
- preserve all factual copy and native semantic structure.

Possible regression:
- bride/groom role distinction could become ambiguous;
- the top profile zone could feel unfinished after removal.

Evidence required for adoption:
- whole-spread screenshot;
- reading/page screenshot;
- detail/structure check;
- semantic nodes preserved;
- native text count, IMAGE-fill count, fold guide, rollback nodes, and history image hash unchanged except expected visible-text count reduction.

## Bounded live change

Hidden only; no node deletion:
- `77:335 / PROFILE_RIBBON_A`: visible `true → false`
- `77:336 / PROFILE_RIBBON_A_TXT`: visible `true → false`
- `77:337 / PROFILE_RIBBON_B`: visible `true → false`
- `77:338 / PROFILE_RIBBON_B_TXT`: visible `true → false`

No copy, crop, image, geometry, profile name, photo role, fold guide, or rollback-frame mutation.

## Result

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

Whole-item / thumbnail review:
- profile page now opens directly from the section heading into the two people;
- removed ribbons no longer create a second competing label layer;
- left/right profile distinction remains clear from names, photo placement, color rules, and metadata.

Reading/page review:
- reading order remains `OUR PROFILE / ABOUT US → SHOGO / SHI-CHAN → profile details → 3 QUESTIONS → shared interests → TRAVEL NOTE`;
- no empty-hole artifact, collision, or content loss observed.

Actual-size / structure review:
- native text nodes: `92`;
- visible text nodes: `57` after the four-node subtraction;
- IMAGE-fill nodes: `9`;
- fold guide `77:540`: preserved and visible;
- rollback outer `59:2`: preserved;
- rollback inside `59:178`: preserved;
- history image `77:422` remains visible with hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`;
- all four ribbon nodes remain present and rollback-safe, only hidden.

## Failure / limitation

This change does not resolve V5 dominant-photo provenance or derivative quality. It does not change any `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, or V5 completion count. The current asset ledger remains authoritative and V6 production remains gated.

## Reusable lesson candidate

When a profile spread already distinguishes people through names, photos, metadata, and stable editorial rules, extra `PROFILE` ribbons may be semantically redundant. Test removal first; retain a label only when role distinction actually becomes ambiguous.

Status: `VERIFIED for this V5 context / NOT PROJECT_RULE`.

## Next application

Return priority to dominant-image Drive ID → Figma node → image-hash evidence closure. Continue design subtraction only when there is a concrete duplication or hierarchy defect, and do not retry previously rejected binary-transfer mechanisms without a changed method.
