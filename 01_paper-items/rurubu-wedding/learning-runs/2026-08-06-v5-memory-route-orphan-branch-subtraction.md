# V5 MEMORY SPOTS orphan route-branch subtraction

Date: 2026-08-06
Scope: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PHOTO_GATE_UNCHANGED`

## Source and authority readback

Before the change, the project-wide Figma production authority, asset-generation memory, continuous-learning system, project memory, current Rurubu status, live Figma inside spread, verified Drive folder, and GitHub main evidence were reviewed.

The current declaration remains `INTENDED_SOURCE_APPLIED_1_OF_13 / PHOTO_ROLE_PASS_0_OF_13`; this bounded editorial correction does not alter either count or open the V6 production gate.

## Visible problem

After the former third supporting MEMORY SPOTS module was hidden, its route connector remained visible near the bottom-right of the page:

- `77:496 / AUTH_MEMORY_BRANCH_3`
- `77:497 / AUTH_MEMORY_BRANCH_DOT_3`
- `77:491 / AUTH_MEMORY_ROUTE_TRUNK` still extended through the empty third-row position

At whole-spread and page scale, the turquoise dot and dashed branch read as an orphan annotation pointing to no content. The long vertical trunk implied a missing card and made the earlier subtraction look incomplete.

## Anti-legacy decision

The empty third branch would not be selected in a clean-room layout because it no longer communicates a semantic relationship. Adding a replacement badge, caption, or decorative object would preserve the old three-row geometry rather than improve the page. The correct first action was to subtract the orphan branch and resize the trunk to the two visible modules.

## Hypothesis

Hiding the unused third branch/dot and shortening only the trunk would:

- remove a visible production defect;
- make the two-module supporting layout appear intentional;
- preserve the existing first and second photo-to-route relationships;
- avoid changing text, image fills, crop, semantic photo nodes, fold guides, or rollback frames.

Possible regression: the remaining connector could appear abruptly cut off or lose visual relation to the second supporting module.

Adoption evidence required: live whole-spread screenshot, page-scale inspection, detail inspection, and structure readback showing the first two branches visible, third branch hidden, trunk ending after the second branch, native text unchanged, photo hashes unchanged, and rollback evidence preserved.

## Bounded Figma change

Mutated nodes:

- `77:496 / AUTH_MEMORY_BRANCH_3`: `visible true → false`
- `77:497 / AUTH_MEMORY_BRANCH_DOT_3`: `visible true → false`
- `77:491 / AUTH_MEMORY_ROUTE_TRUNK`: height `280 → 148`

No nodes were deleted. No text, image fill, crop, card geometry, or page hierarchy was changed.

## Three-scale QA

### Thumbnail / whole spread

The right-page lower area no longer contains a floating turquoise dot or branch with no destination. The profile/history split and overall page balance remain intact.

### Reading / page scale

The MEMORY SPOTS sequence now reads as:

`lead location → supporting location 02 → supporting location 03`

The route trunk and two visible branches correspond exactly to the two supporting modules. The connector no longer implies a missing fourth displayed item.

### Detail / actual-size inspection

The trunk terminates below the second branch without exposing a stray segment. No clipping, text reflow, image-edge change, mask exposure, or collision was introduced.

## Structure evidence after adoption

- `77:491`: visible; height `148`
- `77:492 / 77:493`: first branch and dot visible
- `77:494 / 77:495`: second branch and dot visible
- `77:496 / 77:497`: hidden and retained for rollback
- native text nodes in V5 inside frame: `94`
- visible text nodes: `65`
- `77:430` image hash unchanged: `8344d95d228f3ca6661d2dbd06220353d265a540`
- `77:438` image hash unchanged: `27ad4cfab8fd579b8452540ce954f8b36edc77fb`
- `77:454` image hash unchanged: `f8357056c1f50bc928066273ce9391f5feba02d2`
- fold guide `77:540` preserved and visible
- V4 rollback frames `59:2` and `59:178` preserved

## Result

`VERIFIED / ADOPTED` for current V5.

The screenshot and structure readback show a complete two-branch connector rather than a broken three-branch remnant. This is a verified editorial/structural correction, not a photo asset lifecycle completion.

## Failure / blocker carried forward

Batch A remains blocked at exact Figma image placement through a binary-safe route. Previously failed manual base64 and external POST methods were not repeated. The dominant-photo and V6 gates remain unchanged.

## Reusable lesson and next application

When a content module is hidden or removed, audit all relational graphics—connector trunks, branches, dots, rules, numbering, captions, and tabs—as a dependency set. Preserving an orphan connector for legacy geometry creates a stronger defect than leaving quiet space. This result is `VERIFIED` for the Rurubu MEMORY SPOTS case but is not yet promoted to a universal project rule without another applicable verification.
