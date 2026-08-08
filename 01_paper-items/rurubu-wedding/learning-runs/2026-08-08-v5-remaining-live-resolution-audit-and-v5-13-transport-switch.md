# V5 remaining live-photo resolution audit / V5-13 transport switch

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Current frames: outer `77:18`, inside `77:290`

## Authorities re-read
Before this work, re-read the project-wide Figma production system, generated-asset memory, continuous-learning system, central design learning log, project memory, quality-over-legacy decision, Current Status, asset ledger, production operating system, postmortem/V6 guardrails, and Rurubu editorial-design knowledge base. V6 production remains gated.

## Visible problem
The four remaining active V5 roles were known to be incomplete, but the exact live source resolution of the images already present in Figma had not been compared against their semantic boxes in one bounded audit. In particular, V5-13 had stale geometry in older ledger history and an existing dining image that looked plausible but soft.

## Hypothesis
Before generating or importing anything, read live semantic geometry and the underlying Figma image dimensions. If an intended-looking image is already high enough resolution, avoid unnecessary replacement. If the live source is undersized, keep the role open and use the verified Drive derivative instead.

Possible regression: source dimensions alone do not prove source identity or visual quality. Therefore no role may pass from this audit without the remaining Drive/hash/screenshot/structure evidence.

## Live Figma audit
Using the Plugin API image hash and `getSizeAsync()` on each remaining active image fill:

| role | node | semantic box | live image hash | live underlying image size | result |
| --- | --- | ---: | --- | ---: | --- |
| V5-01 cover hero | `77:148 / IMG_HERO` | `665×610` | `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` | `640×587` | REJECT: below even 1× box and far below 2× dummy-design floor |
| V5-03 groom profile | `77:296 / IA_PROFILE_A_PHOTO` | `154×180` | `bef2164a2fc70e882f31f735bf66773299b1a62e` | `128×160` | REJECT as completion evidence: below box and far below preferred 4× profile floor |
| V5-04 bride profile | `77:302 / IA_PROFILE_B_PHOTO` | `122×122` | `1c6a3d54817e2ca8e25a3d9b700e7ab9cb4ff4fd` | `128×160` | REJECT as completion evidence: only approximately 1× and identity review still required |
| V5-13 Friends dining | `77:43 / BACK_VISUAL_FRIEND_3_PHOTO` | `244×166` | `3abe9ce228d2252b847860ac895f2c178b6b3ddd` | `160×120` | REJECT: materially below semantic box |

This audit proves that none of the remaining live images should be grandfathered into PHOTO_ROLE_PASS merely because the scene looks plausible.

## V5-13 source and derivative evidence
Live geometry was re-read as exactly `244×166`, rotation about `-2.5°`, corner radius `2`, visible in `77:19 / BACK_COVER`. This corrects stale earlier geometry and makes the existing Drive derivatives exactly 3× target:

- master: `13_FRIENDS_FAMILY_03_DINING_DUMMY.png`
  - Drive ID `1AcZTgDJY9LGYP_zfgh320OLtUifR53N1`
- Q45 derivative: `RURUBU_V5_13_FRIENDS_DINING__FIGMA_732x498_Q45.jpg`
  - Drive ID `1y3WtRP7yPFk5bbbw-xlPFwS6AgY85sI9`
  - local/readback bytes `33,895`
  - encoded length `45,196`
- Q35 derivative: `RURUBU_V5_13_FRIENDS_DINING__FIGMA_732x498_Q35.jpg`
  - Drive ID `1ZHMaUI6O7Bbp7aTFU4AFJcdEWz8gPCOc`
  - local/readback bytes `26,980`
  - encoded length `35,976`

Visual inspection of Q35 confirms the role is identity-safe: the dining table, food, glassware, hands, waterfront and town are the subject; no recognizable face is presented as a real friend or guest. The composition remains suitable for the `244×166` editorial role.

## Safe duplicate and transport attempts
Created rollback-safe comparison spread:
- `456:2 / V5_FRIENDS_DINING_Q35_UPLOAD_COMPARISON_2026_08_08`
- cloned target: `456:27`
- Current `77:18` remained untouched.

### Attempt 1 — monolithic model-visible base64
A Q45 inline call exceeded reliable model/tool transport and failed with `SyntaxError: unexpected end of string`. Atomic failure; no canvas mutation.

### Attempt 2 — guarded shared-plugin chunks
Switched to Q35 and attempted smaller shared-plugin-data staging. The intended first two chunks were 7,200 characters each, but readback returned only `5,426` and `5,646`. The guard detected truncation before decode or image creation. No Current mutation.

### Attempt 3 — native Figma upload-assets endpoint
Switched methods again. Figma produced a valid one-shot upload URL targeted directly at duplicate node `456:27`. The execution container still could not resolve `mcp.figma.com` (`curl: (6) Could not resolve host`). A DoH-based curl variation also failed before any POST reached Figma. The upload URL therefore did not produce a placement.

This is the same network-class blocker previously seen for external Figma upload. Per project rules, do not keep repeating this path in the same run.

## Result
`VERIFIED_AUDIT / V5_13_DERIVATIVE_VISUALLY_ACCEPTABLE / TRANSPORT_BLOCKED / CURRENT_UNCHANGED / COUNTS_UNCHANGED`

No role count is increased. Current truthful status remains `PHOTO_ROLE_PASS 7/11`, `ROLE_COMPLETE 7/11`, dominant `2/3` until exact placement and three-scale QA are completed.

## Learning status
- Live Figma underlying image dimensions are high-value evidence and should be checked before assuming an existing fill is usable.
- A plausible scene at small screenshot scale can still be sourced from an image smaller than the semantic box.
- For V5-13, regeneration is not justified: the Drive master/role derivative is already conceptually correct and identity-safe; the remaining defect is reliable binary transport.
- Large model-visible base64 and external `mcp.figma.com` upload remain rejected in this runtime. The next method must be materially different or the run should advance another safe role/design task.

Evidence state: `DISCOVERED → PROTOTYPED → VERIFIED_AUDIT`; not promoted to PROJECT_RULE from one audit alone.

## Next safe action
1. Use a connector/runtime that can pass the Drive/local file as binary directly into Figma, or a proven guarded binary reconstruction with chunk lengths small enough to survive transport and exact length readback.
2. Apply first to duplicate `456:27`.
3. Run whole-spread, reading/page and natural-size `244×166` QA.
4. Verify new image hash and underlying image size.
5. Only then promote `77:43`, update the ledger/counts, central feedback log, Rurubu lessons log, and GitHub readback.
6. Continue treating cover hero `77:148` as the final dominant blocker and highest-area quality priority.
