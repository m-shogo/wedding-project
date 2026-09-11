# Motion Pinterest = external real-world atlas only

Date: 2026-09-11

## Canonical purpose

`/movie-coach/motion-pinterest` is a visual discovery atlas of motion examples that already exist in the world.
It is NOT the repository's internal Motion Kit / Director Recipe / Remotion / DaVinci render catalog.

## Primary genres — fixed

1. 画像
2. テキスト
3. エフェクト
4. 画像＋テキスト

Do not replace these with technical categories. Travel / Editorial / Photo / Camera / Transition etc. are tags only.

## Allowed atlas sources

- Real animated GIFs
- Real YouTube videos
- Real video preview pages such as Motion Array / Mixkit / Behance / Dribbble / Vimeo
- Real still images when they clearly demonstrate the design/motion reference
- Official previews/screenshots

Every item must keep its original source URL.

## Forbidden inside Motion Pinterest

- `visualMotionLibrary` items as atlas content
- Motion Kit 36 as atlas content
- Director Recipe 97 as atlas content
- locally generated Remotion samples
- locally generated DaVinci samples
- invented or AI-generated motion examples
- fake reconstructions of external examples

Those may continue to exist elsewhere in the project but are not Pinterest content.

## UX

- Preview first
- Prefer embedded GIF / YouTube over URL-only cards
- 2 columns mobile, 3 tablet, 4 desktop, 5–6 wide desktop
- Japanese plain-language explanation of what moves and how
- Difficulty ★1–3
- Original source URL
- Search and media-type filtering
- No TikTok one-item-at-a-time browsing
- Image + text category should be intentionally rich because it is highly relevant to the wedding Opening movie

## Canonical data/UI

- Data: `movie-dashboard/src/data/externalMotionAtlas.ts`
- UI: `movie-dashboard/src/pages/MotionPinterestStable.tsx`
- Route wrapper: `movie-dashboard/src/pages/MotionPinterest.tsx`

Initial external corpus: 36 real-world references
- 画像: 8
- テキスト: 8
- エフェクト: 8
- 画像＋テキスト: 12
