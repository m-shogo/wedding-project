# Rurubu V7/V8 Profile content-truth gate — 2026-08-24

## New knowledge used

Fresh professional editorial-accuracy research shifted the Profile/Q&A review from visual polish to source-confidence: identity-bearing facts, answers and quotations must be verified before publication-like styling makes them appear authoritative.

## Live authority conflict found

Rurubu `CONTENT-PREFILL-20260731.md` keeps person-specific Profile fields and all six Q&A answers unresolved, while current V7 K and V8 AW3 displayed plausible personal details/answers as finished copy.

## Production response

- V7 K `2303:2` → K2 `2391:2`: unverified profile values/Q&A answers now explicit native `回答待ち`; apparent quote changed to non-quote editorial line; old K hidden rollback.
- V8 AW3 `2357:2` → AW4 `2391:50`: person-specific claims converted to prompts plus native `回答待ち`; Q&A answers pending; unverified place/year object-photo caption hidden; old AW3 hidden rollback.
- V6 control unchanged.
- No image generation or Drive write.

## Verification

Both candidates PASS at 500 px, 1400 px and native 1587×1123 for DESIGN QA. K2 structure: text `30`, IMAGE `5`, intersections `0`, 18 px edge risks `0`. AW4: text `20`, IMAGE `1`, intersections `0`, 18 px edge risks `0`. Current V7/V8 root overlap remains `0`.

## Learning outcome

`RSL-254 / F-RSL-254-PLAUSIBLE-PERSONAL-PROFILE-COPY-MASQUERADES-AS-VERIFIED-IDENTITY-FACTS`

State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`.

The improvement is not the literal `回答待ち` styling. The improvement is that a professional-looking placeholder no longer silently becomes the couple's biography or voice. When verified content arrives, replace native pending roles and rerun copy-fit/three-scale QA.
