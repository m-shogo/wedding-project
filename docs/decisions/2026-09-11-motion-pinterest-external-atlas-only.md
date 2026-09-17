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

旧実装 `MotionPinterestStable.tsx` は 2026-09-11 の `9f0533d3` 以降どこからも読まれていなかったため、2026-09-17 に削除した。

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

## 2026-09-17 update — GIF登録（Additions15）

GIPHY（robots.txtで全体許可、Claude向けの拒否なし）の検索ページ25語から650件の候補を集め、次の手順で43件を登録した。

1. テレビ番組・企業告知・有名人の切り抜きなど、動きの参考にならないものを除外（約60件へ）
2. 各GIFを6コマに分解したコンタクトシートで動きを目視確認
3. 実際に見えた動きだけを日本語説明に書く。重複した動き・色替えだけのもの・判別しにくい抽象映像は不採用
4. 元ページとGIF本体がHTTP 200で開けることを確認

| genre | 追加 |
|---|---:|
| 画像 | 7 |
| テキスト | 17 |
| エフェクト | 10 |
| 画像＋テキスト | 9 |

結果: 196 → 239件、GIF 85 → 128件。ウェディング寄りでは、筆記体の書き順・ポラロイド・パスポート・手描きルート地図・旅ログカード・紙の花・Save the Date などを優先した。
youmotion.com 由来の3件はテンプレート販売元のデモなので、説明文にその旨を書いている。

## 2026-09-17 update — StaRt向け・3点バースト候補（Additions16）

StaRt（Mrs. GREEN APPLE）の調査メモ（`docs/research/2026-09-17-start-three-burst-design-reset.md`）で整理した要素に合わせて、GIPHYの検索26語から635件を集め、63件をコマ送り確認して39件を登録した。

狙った要素:
- ニュートラルな背景に彩度の高い立体物を置く（おもちゃ風3D、ローポリ、ガラス）
- プリズムの分光・乱反射
- 立体ブロック文字、ポップなタイポ
- 形でつなぐモーフ（マッチカットの考え方）
- 打点で一瞬だけ強く出るバースト

タグ:
- `StaRt向き`: 39件すべて
- `3点バースト候補`: 打点1回分に使える一瞬の強い動き 7件（風船→紙吹雪、シャッターの白フラッシュ、爆発マーク上の文字パンチ、実写の風船割り、1点→3円の分裂、集中線の閃光、花火）

注意: `3点バースト候補` は「1打分の動きの参考」であり、3打そのものの完成形ではない。3打の設計（DETAIL → RELATION → HERO、写真の形・色でつなぐ）は研究メモの PRISM MATCH 方針に従う。

画面に `# StaRt向き` / `# 3点バースト候補` / `# 旅行` / `# 筆記体` / `# プリズム` のワンタップ検索を追加。

結果: 239 → 278件、GIF 128 → 167件。
