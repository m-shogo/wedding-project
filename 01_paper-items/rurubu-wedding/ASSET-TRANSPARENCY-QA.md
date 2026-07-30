# るるぶWEDDING — Asset Transparency QA

Status: PNG_ONLY_AUTHORITY / ASSETS_8_TO_14_REWORK_PENDING
Current authority: GitHub `main`
Verified: 2026-07-30

## Current rule

**SVG transparency QA is obsolete for production. SVG is prohibited.**

Historical SVG files may remain in Git/Drive for provenance, but their old structural transparency PASS does not make them Current candidates.

Production acceptance is based on transparent PNG only.

## PNG acceptance rule

PASS only when:
- file format is PNG
- image has a real alpha channel
- transparent exterior is actual alpha, not checkerboard/matte/background pixels
- no suspicious chroma-green spill remains visible after keying where green screen was used
- the asset visually matches the intended Rurubu/Wedding direction
- visual QA passes **before** alpha/Drive QA is used to mark the queue complete

A technically valid alpha channel is necessary but not sufficient.

## Current accepted alpha-verified candidates

| Queue | Asset | QA | Current state |
|---|---|---|---|
| #1 | logo A | 1448×465 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |
| #2 | logo B | 1493×974 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |
| #3 | logo C | 1303×1024 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |
| #4 | date badge | 1336×843 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |
| #5 | PICK UP! | 1212×998 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |
| #6 | CHECK! | 1073×948 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |
| #7 | BEST SHOT | 1142×943 after crop; real alpha; suspicious visible green = 0 | CURRENT_CANDIDATE |

## Reopened assets

#8–#14 had technically valid RGBA PNG exports, but those PNGs were derived from the rejected SVG visual direction.

Therefore:
- old #8–#14 PNGs are `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
- historical SVG files are `NON_PRODUCTION / DO_NOT_USE`
- #8–#14 must be remade as new PNG-only assets
- their previous alpha PASS must not be copied forward as a completion gate

## Next QA target

`#8 写真フレーム（スクラップ風）`

Required order:
1. visual match QA
2. PNG/alpha QA
3. green-spill QA if chroma key was used
4. Drive upload
5. Drive metadata/existence verification
6. queue `[x]`

Do not proceed to #9 until #8 passes all gates.

## Figma placement rule

- only Current accepted transparent PNG assets may enter the production Figma
- SVG import/recreation is prohibited
- rejected old #8–#14 PNGs are prohibited
- insert one accepted PNG at a time after wireframe winner selection
- after each placement, verify bounds, subject overlap, print-scale legibility and visual fit before placing the next asset