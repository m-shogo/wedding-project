# 2026-08-10 — V5 outer clean-room AE / AF / AG full-photo cover pass

## Scope

Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

Authority re-read around this run:
- project `AGENTS.md`
- project `README.md`
- live Figma `01_RURUBU_WEDDING`
- Current outer `77:18` and Current inside `77:290`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- Google Drive Q60 master readback
- GitHub main beginning at `e88829e363ec3a350fc860368ac6c2fa413cab21`

## Scratch-selection decision

AD `694:2` was stronger than legacy Current, but it still looked like a large hero followed by a neatly separated feature/index panel. If the outer cover did not already exist, that lower-panel construction would not be selected from scratch for the strongest Japanese travel-information-magazine direction. A materially different clean-room branch was therefore justified.

## Visible problem

1. The front lower third still read as a separate UI/index surface instead of part of the cover image field.
2. Two adjacent magenta vertical rules over-signaled a designed module instead of editorial flow.
3. The yellow pickup bar remained a badge-like UI artifact.
4. The feature descriptions and footer microtype were weak at actual size.
5. The dominant Q60 master was verified in Drive but still could not reach Figma through the runtime upload endpoint.

## Principle / capability tested

- make the photograph the page field, not one module among modules
- place the Japanese feature hierarchy directly on photography when contrast allows
- remove duplicate rules, pickup bars, and labels before adding decoration
- preserve native text and verified provenance-safe image hashes
- keep Current untouched until the real Q60 source is placed and the candidate wins whole/page/actual-size comparison

Expected improvement: more immediate magazine-cover silhouette, less dashboard/index-panel feeling, stronger photo-led energy and better asymmetric reading order.

Regression risks: text-on-photo contrast loss, excessive crowding, teaser collision, low-quality provisional hero becoming more visible because of larger display area, and accidental Current mutation.

## AE — full-bleed editorial hierarchy

Created duplicate:
- `697:2 / V5_OUTER_RURUBU_CLEANROOM_AE_FULLBLEED_EDITORIAL_2026_08_10`

Key changes from AD:
- front hero expanded to `774×700`
- logo reduced to `300×97`; date badge reduced to `126×80`
- yellow pickup bar and pickup text removed
- feature hierarchy rebuilt as one dominant 01 plus stacked 02/03
- teaser photos kept as irregular overlap, using the same verified coast and old-town hashes
- no new card, rounded rectangle, gradient, or generic shadow system added

Whole-spread and actual-size front screenshots showed AE clearly stronger than AD at thumbnail/cover silhouette scale, but the lower third still behaved like a cream index panel.

## AF — full-photo cover

Created duplicate:
- `698:2 / V5_OUTER_RURUBU_CLEANROOM_AF_FULLPHOTO_COVER_2026_08_10`

Key changes:
- provisional hero expanded to `774×1010`, making photography the dominant cover field almost to the trim-bottom area
- removed both the duplicate magenta hero-bottom rule and the feature vertical divider
- moved `今号の3大特集`, 01/02/03 headlines and descriptions directly onto the photograph
- feature headlines switched to warm white while keeping number accents magenta/cyan/yellow
- teaser collage retained as an editorial overlap rather than a gallery card
- footer changed to a thin print-rule treatment below the photo field

Whole-spread screenshot confirmed the cover no longer reads as “hero + UI index panel.” The tradeoff is that the provisional `539c...` hero is visibly more exposed; this is acceptable only as comparator evidence and does not satisfy V5-01.

## Q60 transport attempt

Fresh Drive readback verified:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- runtime materialization succeeded as a real JPEG file

A fresh `upload_assets` endpoint was issued only for duplicate AF hero `698:130`. Raw-byte POST failed before transfer with the same runtime fingerprint: `curl: (6) Could not resolve host: mcp.figma.com`.

Fresh Figma readback immediately after the failure confirmed:
- AF hero `698:130` remained hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- no Q60 placement occurred
- Current was untouched

This route remains exhausted under the current runtime and should not be repeated for activity.

## AG — full-photo actual-size legibility repair

Created duplicate:
- `699:2 / V5_OUTER_RURUBU_CLEANROOM_AG_FULLPHOTO_LEGIBILITY_2026_08_10`
- front `699:129`

Key changes from AF:
- removed redundant `AB_TEASER_LABEL`
- increased `誌面先取り` microtype to `11px`
- strengthened hero editorial line to `22px`
- increased `今号の3大特集` to `14px`
- feature descriptions raised to `13 / 12 / 12px`
- footer rule and folio returned to dark navy on the cream trim-bottom band for actual-size contrast

Actual-size front screenshot confirmed the footer is now readable and the lower-cover feature cluster is clearer while remaining directly integrated with the photograph.

## Final AG live QA

`699:2`:
- visible native text: `39`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- fold guide `699:163`: `2×1122.5`, visible

Verified image hashes preserved:
- back main `699:6`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `699:18`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `699:22`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- provisional hero `699:130`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `699:134`: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `699:135`: `0cbbf09357938365c2550f08928be1db33fa6060`
- coast teaser `699:158`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- old-town teaser `699:159`: `439a719d73f28e8dd2889f2026cccb15f345ec63`

Current protection readback:
- Current outer remains `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- Current hero `77:148` remains hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- no Current promotion performed

## Adoption decision

- AE: adopted as a stronger intermediate than AD
- AF: adopted over AE for the stronger full-photo cover grammar
- AG: adopted as this run's strongest comparator after actual-size legibility repair
- Q60: Drive-verified/materialized, NOT placed in Figma
- Current promotion: NOT PERFORMED
- V5 completion: NOT CLAIMED
- V6 production: NOT STARTED

## Learning / next application

- When a cover still feels like a hero followed by a UI/index panel, the highest-value move is often to make the photograph the entire page field and pull native editorial hierarchy onto the image, not to add more cards or badges.
- A full-photo cover makes low-quality provisional imagery more obvious. That is useful evidence: it raises the value of fixing the dominant source rather than hiding the defect behind layout chrome.
- Small teaser photos can remain if they reinforce travel-magazine overlap, but their labels are expendable when the imagery already explains the role.
- Actual-size footer contrast must be checked after changing a full-page image field; the AF white footer treatment disappeared against the cream trim band and required AG repair.
- AG should not be promoted until the real Q60 image is binary-safely placed and wins whole-item, reading/page, actual-size, crop, fold, and structure QA.

Status: `AG_VERIFIED_BEST_COMPARATOR_THIS_RUN / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_BUT_FIGMA_TRANSPORT_BLOCKED / V5_GATE_OPEN / V6_NOT_STARTED`
