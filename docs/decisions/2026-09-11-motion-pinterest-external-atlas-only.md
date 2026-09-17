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

- Data: `movie-dashboard/src/data/externalMotionAtlas.ts` + `externalMotionAtlasAdditions*.ts`
- Runtime (dedupe済み。画面はこれだけを読む): `movie-dashboard/src/data/externalMotionAtlasRuntime.ts`
- UI: `movie-dashboard/src/pages/MotionPinterest.tsx`
- Contract: `pnpm check:external-motion-atlas`（CIで実行）

`MotionPinterestStable.tsx` は 2026-09-11 の `9f0533d3` 以降どこからも読まれていない旧実装。正本ではない。

Initial external corpus: 36 real-world references
- 画像: 8
- テキスト: 8
- エフェクト: 8
- 画像＋テキスト: 12

## 2026-09-17 update — mobile / preview-first

Draft PR #882 / #883 / #884 の意図を現行 `MotionPinterest.tsx` へ統合した。

- hoverできない端末: 画面の縦中央帯に入ったプレビューだけ自動再生。`prefers-reduced-motion` では再生しない。
- 並び順: GIF → 埋め込み動画(YouTube / Vimeo / 公式MP4) → 静止画ポスター → 元ページのみ。
- 「▶ 動くものだけ」トグル、絞り込み解除、0件時の復帰、プレビュー上の「詳しく」、Escで詳細を閉じる。
- カード説明文はスマホで非表示、タブレット以上で2行。全文は詳細に残す。
- `posterUrl`（公式プレビュー静止画）を追加。埋め込めない動画ページもポスターがあれば一覧で見分けられる。

公式プレビューの補完（2026-09-17 確認）:

| source | 一覧で動かない件数(前) | 対応 |
|---|---:|---|
| Mixkit | 14 | 公式ページに掲載の `assets.mixkit.co/.../mixkit-{id}-360.mp4` とポスターを参照。カテゴリページを指していた2件は個別テンプレートURLへ正確化。**14件すべて解消** |
| Motion Array | 35 | Cloudflareのbot challengeで自動取得不可。回避しない。人が開いて公式サムネイルURLを `posterUrl` に入れる |
| Behance | 27 | robots.txtが `ClaudeBot` / `anthropic-ai` を明示拒否。AIで取得しない。人が確認して `posterUrl` に入れる |

結果: 196件中「一覧で動く」119 → 133件、元ページのみ 76 → 62件。素材ファイル自体はGitに入れず、公式URLの参照だけ持つ。
