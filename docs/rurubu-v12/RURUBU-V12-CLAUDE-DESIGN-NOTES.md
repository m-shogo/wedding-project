# Rurubu WEDDING V12 — Claude Independent Design Notes (fresh start from V11)

Status: IN_PROGRESS (P01 only)
Branch: `claude/rurubu-v12`
Figma: file `bfM0d4c9dCeBv5pCkJ3TNM`, page `12_RURUBU_V12_CLAUDE_A5_8P_PRODUCTION`

## Why V12 instead of continuing V11

V11 accumulated multiple incompatible style layers over the session (glossy
bubble titles → clean Zen Maru Gothic mastheads → brush-calligraphy splatter
titles), each individually reasonable but never validated against an actual
authentic Rurubu reference. The user pointed to three real reference images
placed as flat picture-fill rectangles on the V11 Figma page itself
(`3270:2/3/4`, named "PAGE01 1" / "PAGE02 1" / "TOP 1" — confirmed via
`get_metadata` to be plain image-filled rectangles, not another agent's live
production work, so safe to study without any collision risk) — an actual
Rurubu WEDDING Hawaii book mockup (front/spine/back cover + inner spreads).

Studying it directly revealed the real style is **not** brush-calligraphy
splatter: it's clean, chunky, rounded poster lettering with a thick
cream-white die-cut sticker outline, solid vivid color fill with subtle
cel-shading, and a soft drop shadow — plus a completely consistent flat-vector
illustration language across every decoration (flowers, camera, hearts,
luggage), which V11 never had since its decorations were a mix of Drive stock
illustrations, real photos, and multiple different Codex generation styles.

## What this run did

1. Created `claude/rurubu-v12` branch from latest `origin/main`.
2. Created Figma page `12_RURUBU_V12_CLAUDE_A5_8P_PRODUCTION`, 8 frames with
   the same verified A5+bleed+trim+safe-area geometry as V11 (reused, since
   that part was already confirmed correct against live V10 in the V11 run).
3. Generated a title-lettering style test via Codex `image_gen` matching the
   reference's construction exactly (chunky rounded poster type, thick
   cream-white outline, solid color + subtle cel-shading, soft shadow — NOT
   brush calligraphy) and verified it visually before committing to the style
   for all 8 pages.
4. Generated all 8 page titles in this one consistent style (cover, profile,
   Q&A, story, memories, memory spot, 1day, message) — not yet all placed.
5. Built **P01 COVER**: real hero photo (same verified `REAL_PHOTO_COVER_
   HAWAII_BEACH_COUPLE_FULLBODY_01.jpg` used throughout this project),
   small solid-magenta corner logo block (top-left, echoing the real
   brand's corner-logo convention), the new sticker-style title, and a
   white-bordered rounded date/name badge with drop shadow. Verified by
   screenshot — reads much closer to the reference than any V11 attempt.

## Not yet done

- P02–P08 still bare frames (title graphics generated, not placed).
- Decoration icon set (hibiscus, camera) generation started but not yet used
  — deliberately reconsidering whether to generate a whole new icon set or
  reuse the already-verified Drive `DECORATION_GLOBAL_*` assets, since those
  looked internally consistent with each other and the actual V11 problem was
  mixing them with mismatched *title* styles, not the decorations themselves.
- Structured info-box layouts (profile fact table, Q&A card grid, numbered
  spot+category tags, 1day timeline+mini-map) from the reference not yet
  built — this is the second major gap after title style.
- No audit pass yet (only 1 of 8 pages exists).
