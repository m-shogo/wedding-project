# 2026-08-12 — V5 DE dense editorial Q&A

Scope: Rurubu WEDDING only. Current outer `77:18` and Current inside `77:290` were not edited.

## Visible problem

CY `859:2` had strong photo-led profile/history structure, but actual-size review still showed a lower-left Q&A area that read too much like a clean profile sheet: the three questions had insufficient editorial compression and the hierarchy between Q1 and Q2/Q3 was not strong enough for a Japanese travel-information magazine spread.

## Principle / capability tested

Use subtraction first, then densify with print-native anchors instead of adding cards. On rollback-safe duplicate DE `894:2`, existing hidden rule assets were repurposed: one strong magenta section bar establishes the Q&A article boundary, Q1 is promoted through scale and a pull-quote rule, and Q2/Q3 are compact side notes anchored by thin cyan/yellow rules. Native editable text and all six production image fills were preserved.

## Expected improvement

A denser but still readable editorial rhythm, materially stronger Q1 dominance, faster scan hierarchy at thumbnail/reading scale, and more recognizable Japanese travel-magazine grammar without dashboard/card geometry.

## Regression risk and review

The main risk was text collision caused by increasing Q1/Q2/Q3 scale inside a fixed print page. The final candidate was checked after the edit at whole-spread and actual-size left-page scale, then programmatically checked for same-parent visible-text intersections. No intersections remained.

A separate outer experiment DC `891:2` enlarged and tilted the low-quality cover proxy to increase photo overlap. Whole/actual-size review showed that this amplified visible raster softness and made destination microcopy wrap worse, so DC was rejected and moved to Studies rather than promoted.

## Verified evidence

- Working comparator: DE `894:2`
- Left page: `894:3`
- Right page: `894:132`
- Fold: `894:283` = x `792.7000122070312`, y `0`, `2 × 1122.5`
- Review snapshot: `897:2` (`BEST INSIDE — DE — source 894:2`)
- Previous CY Review snapshot `861:2` retained hidden as rollback
- 54 visible native text nodes
- 6 visible IMAGE fills
- 0 same-parent visible-text intersections
- Whole-spread/thumbnail QA: checked
- Reading/page QA: checked
- Actual-size left-page QA: checked at `794 × 1123`
- Structure QA: checked
- Production image hashes preserved: `a39dd297eb9de572317a5ce57f0af12e8597b156`, `2359f635b4926a83e22ca1f9214e75c709291152`, `539c259be8036b481d06b4f76db9a39b407d90e8`, `adbb8e529451a81dd25e4eb29bf068655569ce25`, `439a719d73f28e8dd2889f2026cccb15f345ec63`, `c09aa82e7b2ac75708707345c6f845452bf67663`

## Cover hero transport state

Drive Q60 was freshly read back and materialized as JPEG, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, `155439` bytes, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.

A new official Figma `upload_assets` target was issued for safe duplicate hero `891:133`, but the exact-byte POST again failed before upload because the runtime could not resolve `mcp.figma.com`. Per the two-failure/switch-method rule, the transport was not hammered again. Exact Q60 is still **not placed** and **not visually verified** in Figma.

## Adoption and organization

DE is adopted as the strongest inside comparator. DB `881:2` remains the strongest outer comparator. Superseded CY `859:2` and rejected DC `891:2` were moved to Studies; Working now contains only CU `834:3`, CV `848:2`, DB `881:2`, and DE `894:2`. Start Here and Review were reconciled to `DB outer / DE inside`.

Generated this run: 0. Newly adopted generated asset: 0. New external binary placed: 0. DE visual edits placed: yes. DE visually verified: yes. DE structure verified: yes. Exact Q60 placed: no.

V5 gate remains `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, `dominant 2/3`; V5 is not complete and V6 has not started.
