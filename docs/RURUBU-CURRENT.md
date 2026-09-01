# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-01`

The only current Rurubu WEDDING production version is **V30**.

Read first:
`docs/rurubu-v30/README.md`

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

`1 PART = 1 IMAGE / 1 PHOTO SLOT = 1 REPLACEABLE CLIPPED MASK.`

`docs/rurubu-v20/` and `assets/rurubu-v20/` are frozen historical/reference material only and must never be treated as current production authority.

Do not create V31 unless explicitly requested by the user.

**CURRENT = V30. V20 = FROZEN HISTORY.**
