# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-01`

The only current Rurubu WEDDING production version is **V30**.

Read first, in this order:
1. `docs/rurubu-v30/README.md`
2. `assets/rurubu-v30/README.md`

The second file is not optional: it contains the current production-asset, replacement-mask, one-part-one-image, Canva-ban, and accident-prevention gates that must be applied during execution.

Current Git branch:
`rurubu/v30-final-production-20260901`

Current Figma page:
`V30_FINAL_PRODUCTION`

Current Figma board:
`V30 / FINAL PRODUCTION / 2026-09-01` — node `3535:2`

## V30 HARD PRODUCTION OVERRIDES

These rules are mandatory even if an older note or current proof is ambiguous:

- Real-person / friend / couple / pet photography may use **dummy/proxy photos during layout**, because final photos will be replaced later.
- Every replaceable photo slot must be built as an **easy-swap non-destructive Figma mask/clipped frame** from the beginning.
- The photo image remains separate from its decorative frame/backing.
- Replacing a photo must require only swapping/replacing the image inside the existing slot; surrounding editorial art must not need rebuilding.
- **The photo must never visually extend outside its intended frame/mask bounds.** Use a real mask or a clipping frame with `clipsContent = true`; verify no pixel spills outside the slot after crop/scale/rotation.
- Decorative frames/backings may intentionally overlap outside the photo slot, but the underlying photo itself stays clipped to its own mask.
- For P05, keep exactly **4 SHOGO FRIENDS photo slots + 4 SHIORI FRIENDS photo slots = 8 independently replaceable masked photo slots**.
- **ONE PART = ONE IMAGE is mandatory for generated/editorial assets.** One production part must be delivered as one independent image file.
- Never pack multiple separate production parts into one generated PNG/canvas/contact sheet/sprite merely to save generations or uploads.
- If a page needs title + tape + stamp + ticket + frame, those are separate image files unless they are intentionally one inseparable semantic editorial unit approved as a single part.
- A proof/contact sheet may show several candidates together for review, but it must never become the production asset used in Figma.
- Canva is not part of the V30 production design chain. Non-photographic visual personality comes from page-specific image-generation assets; Figma remains compositor/placement/mask/native-text/QA.
- Photo replaceability must be **tested by an actual swap**, not accepted from layer naming alone.
- Before guest-facing export, production/stale markers such as `TBD`, `DUMMY`, `REAL PHOTO`, `PHOTO SWAP`, `V20`, `VOL.20`, `V21`, `V31` must have zero visible hits.
- Do not keep rejected/obsolete hidden assets inside the live `V30_FINAL_PRODUCTION` page as a graveyard; move them to history/reference or `99_REJECTED_DO_NOT_USE`.
- Do not non-uniformly stretch generated editorial art to rescue the wrong aspect ratio; regenerate/rebuild for the intended physical size.
- Repeating the exact same PNG across multiple unrelated jobs/pages is an anti-template risk; use meaningful variants when repetition becomes visible.
- Generated assets enter live Figma only after `SOURCE_KEYED → Python cutout → alpha QA → PRODUCTION_RGBA → traceability` passes.
- After meaningful visual changes, save contact/page/spread/A5 checkpoints to `90_QA_EXPORT` for regression comparison.
- Faces, eyes, expressions, gestures, names, answers and other critical content must remain safe from trim/fold/decoration; P05's eight photos must remain recognizable at A5.
- **CONTENT ROLE LOCKED / VISUAL EXECUTION UNLOCKED**: page roles stay fixed, but weak geometry may be rebuilt from zero.
- Do not patch a missing/weak image-generated editorial unit with generic Figma cards/rectangles merely to make a page look finished.

`1 PART = 1 IMAGE / 1 PHOTO SLOT = 1 REPLACEABLE CLIPPED MASK.`

`STRICT PROCESS + LOCKED CONTENT ROLE + FREE HIGH-QUALITY VISUAL EXECUTION.`

`docs/rurubu-v20/` and `assets/rurubu-v20/` are frozen historical/reference material only and must never be treated as current production authority.

Do not create V31 unless explicitly requested by the user.

**CURRENT = V30. V20 = FROZEN HISTORY.**
