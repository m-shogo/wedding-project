# Rurubu V5 — EC caption-strip visual promotion

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `EC_VISUALLY_VERIFIED_AND_PROMOTED_AS_BEST_OUTER_COMPARATOR / CURRENT_UNCHANGED / V5_OPEN`

## Authority refresh
Before writes, current project-wide Figma/asset guidance, Rurubu Current Status, Production Operating System V2, postmortem/V6 guardrails, asset evidence ledger, comparator reconciliation, editorial lessons, project-wide learning feedback, live Figma Working state, and Drive cover-hero assets were re-read. Authority order remained live Figma → verified Drive → item ledger/status → process docs → historical evidence.

Current production candidates remained untouched:
- outer `77:18`
- inside `77:290`

Previously selected clean-room comparison:
- EB outer `1029:2`
- DZ inside `1019:2`

Prior unpromoted experiment:
- EC outer `1039:2`

## Scratch-selection and three-scale comparison
EC and EB were compared at:
- thumbnail: 500 px whole spread
- reading/whole-item: 1588×1123 rendered spread
- actual-size/detail: 794×1123 front page

EC was stronger from scratch because it removes EB's top-right date badge and broad feature-02 paper block, preserves a continuous photographic spine, and creates a less UI-like Japanese travel-magazine silhouette.

However, the first actual-size EC render exposed a real defect: feature-02 title text sat dark-on-busy photography and lost contrast. EC was therefore not promoted in that state.

## Defect-specific repair
Visible problem:
- feature 02 had the stronger large tilted photograph, but the title `出会いから / 今日まで旅年表` was visually weak directly over the high-frequency lower image area.

Principle tested:
- subtraction should not become subtraction absolutism; when a busy photograph genuinely requires contrast containment, use the smallest print-native device that completes the editorial job.

Expected improvement:
- retain EC's photo-led hierarchy and removal of the broad module while restoring actual-size readability.

Regression risk:
- reintroducing a card/module silhouette, covering too much photography, collision between `02` and title, or crowding the hero/street-photo seam.

Change on EC only:
- reused existing hidden node `1039:176 / BL_FEATURE_02_CYAN_PAPER` rather than adding a new container;
- converted it to a thin `310×60` warm caption strip at `x=466,y=684`, rotated `-3°`, attached to the lower edge of `1039:153`;
- kept native editable `02` and title text on the strip;
- preserved the 336×250 tilted feature-02 photo and all image hashes;
- preserved the lower full-bleed street photograph beginning at `y=726`.

## Rejected intermediate
First structural QA after the strip repair detected one same-parent text-box intersection between `1039:177` and `1039:178`. The intermediate was not accepted. The title was shifted from `x=532` to `x=538`; the next structural readback returned zero intersections.

## Final verified evidence
Final EC structure:
- native visible text: `36`
- visible IMAGE fills: `6`
- same-parent text intersections: `0`
- front safe-area risks under 18 px: `0`
- fold: `1039:184`, x=`792.7`, width=`2`, height=`1122.5`

Preserved image hashes:
- back main `e3738476f760932bb5b09c9d60f174dd6c84049d`
- back friend cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
- back friend dining / feature-02 reuse `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- hero `539c259be8036b481d06b4f76db9a39b407d90e8`
- lower street `439a719d73f28e8dd2889f2026cccb15f345ec63`

Final visual QA passed at thumbnail, whole-reading, and actual-size front after the collision repair. The thin strip remains visibly attached to photography rather than reading as a separate broad card.

## Promotion and rollback
Review promotion:
- new best outer snapshot: `1043:2 / BEST OUTER — EC — source 1039:2`
- previous EB Review `1036:2` retained and renamed `ROLLBACK HIDDEN — BEST OUTER EB — source 1029:2`
- existing best inside remains `1021:2 / DZ`

Start Here:
- `845:27` updated to `EC outer / DZ inside`
- `845:16` updated to explain the EC subtraction + minimal caption-strip rationale

Current `77:18 / 77:290` remained untouched.

## Cover-hero lifecycle remains open
Fresh Drive readback still identifies Q60 master:
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- file `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`

The existing EC hero hash `539c259...` is visually useful clean-room photography reuse but is not proof of exact Q60 Drive-binary placement. V5-01 therefore remains incomplete; V5 is not complete and V6 production remains blocked.

## Reusable learning
When a broad card is removed from an editorial photograph, do not force direct text over an unreadable image merely to maximize subtraction. Prefer this escalation order:

`direct type → rule → thin edge-attached caption strip → larger field only if necessary`.

The contrast device must be sized to the text job, remain visually subordinate to the photograph, and pass actual-size rendering plus collision QA.

## Progress classification
- generated this run: `0`
- new generated assets adopted: `0`
- new external binary placed: `0`
- clean-room EC visually verified: `YES`
- EC Figma repair placed: `YES`
- EC promoted to Review: `YES`
- structure verified: `YES`
- Current changed: `NO`
- exact Q60 placement: `NO`
- V5 complete: `NO`
- V6 production started: `NO`
