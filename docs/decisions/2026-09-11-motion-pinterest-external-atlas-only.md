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

## 2026-09-17 update — 制作者チャンネル由来（Additions17）

これまで質の高かった20の制作者のGIPHYチャンネル（ish_des_ign、naufalrel、lucas_zanotto、evanhilton、analicecampos、ettrics ほか）から各最大5件、計99件をコマ送り確認し、32件を登録した。企業・暗号資産・政治的な主張・実在人物の切り抜きは除外。

主な追加: 各国語のあいさつ切り替え、昔のPC画面の手紙タイプ／「MEMORIES」読み込み、ペンが花の木に変わるコマ撮り、8ミリフィルム越しの風景、丸い道を走る車の旅ループ、年号のフリップ、鼓動するハート、絵の具の渦。

結果: 278 → 310件、GIF 167 → 199件。

## 2026-09-17 update — ウェディング・旅行・文字ループ（Additions18）

文字のループ、写真の並べ方、額縁、愛のタイポ、ハート、紙吹雪、シャンパン、花、飛行機、地球、コンパス、ロードトリップ、カメラの20語から478件を集め、64件をコマ送り確認して36件を登録した。

- `ウェディング` タグ: ハートの花、バラの開花、LOVEのOがハート、紙吹雪、クラッカー、シャンパンなど
- `旅行` タグ: 線画地図の上の飛行機、山道のドライブ視点、Road tripタイトル、コンパス、昼夜の切り替わりなど
- `マッチカット` タグ: 丸いレンズの形でつなぐカット、絵の中へ入るズーム、花の無限ズーム
- ワンタップ検索に `# ウェディング` `# マッチカット` を追加

結果: 310 → 346件、GIF 199 → 235件。

## 2026-09-17 update — 紙・シネマグラフ・レトロ映像（Additions19）

分割文字、ネオン、線、液体、紙、折り紙、フィルム質感、VHS、走査線、砂嵐、ロトスコープ、シネマグラフ、手描き、リソグラフの19語から459件を集め、61件をコマ送り確認して24件を登録した（1件だけのシートが作れず未確認だった #60 は登録しない）。

- `シネマグラフ` タグ: 写真の一部だけが動く（森の光、夕日の海、湖の霧、夜の光の波）。実写真の旅行写真へさりげない動きを足す参考
- `紙` タグ: 紙飛行機、折り鶴・鯉・蝶の折り紙、ちぎり紙の背景
- `レトロ` タグ: VHSの「PLAY」画面、色ノイズ、テレビの砂嵐
- ワンタップ検索に `# シネマグラフ` を追加

結果: 346 → 370件、GIF 235 → 259件。

## 2026-09-17 update — 追加の制作者チャンネル（Additions20）

別の20の制作者チャンネルから87件をコマ送り確認し、31件を登録した。政治的メッセージ、実在人物の切り抜き、下品・暴力的なもの、医療器具は除外。

登録前の検算で、コンタクトシートの行番号と候補番号の対応が途中からずれていたことに気づき、制作者名との照合で修正した。あわせてマージ済みのAdditions15〜19も、登録名と元タイトル・制作者を全件並べて照合し、ずれがないことを確認した。

主な追加: 電車の窓の田園風景、暗い雲を抜ける飛行機、おもちゃの汽車、「THANK YOU」の吹き出し、虹色の「BELIEVE」、ネオンのトンネル、マンダラ／万華鏡、点が並び替わる配置。

結果: 370 → 401件、GIF 259 → 290件。

## 2026-09-17 update — 打点・カウントダウン・指輪・花束・フィルム（Additions21）

スターバースト、漫画の擬音、集中線、爆発文字、カウントダウン、スタンプ、地図ピン、キラキラ、金ラメ、指輪、花束、結婚、スクラップブック、フィルムの18語から447件を集め、66件をコマ送り確認して47件を登録した。アニメ・映画・ゲームの作品ロゴ、企業ロゴ（地図アプリ等）、実在人物は除外。

- `3点バースト候補`: ネオンの星、切り紙のギザギザ星、火花、ドット絵の「POW!」、BAMの吹き出し、グローブの衝突、爆発、点の数字カウントダウン、スタンプ
- `ウェディング`: 刻印入りの指輪、ネオンの輪、プロポーズ、ダイヤ、花束、金色の粒子・ラメ、紙のカメラ
- カウントダウン: 点の数字、手描きの丸、木の手の指、数字ロケット
- フィルム: フィルムの流れ、映写機、編集機、フィルムリーダー

結果: 401 → 448件、GIF 290 → 337件。

## 2026-09-17 update — 写真の見せ方とMixkit無料テンプレート（Additions22・23）

ユーザーの目的（StaRtのOpening、3点バースト、写真＋文字、旅行・結婚式）に直結するものに絞る方針へ切り替えた。GIPHY検索はテレビ番組の切り抜きが増えて候補が尽きてきたため、写真の見せ方の検索から12件だけ登録し（Additions22）、残りはMixkitの無料テンプレートから登録した（Additions23）。

Mixkit（robots.txtで全体許可）:
- 公式サイトマップから全テンプレートを洗い出し（DaVinci 36 / Premiere Pro 566 / After Effects 198 / Final Cut Pro 51）、DaVinci用の未登録分と、結婚式・旅行・写真スライド・タイトル・打点系の71件を選んだ
- 公式プレビューMP4（360p）を6コマに分解して目視確認し、46件を登録。販促・SNS広告・子どもの誕生日・企業向けなどは除外
- 全件で公式プレビューMP4とポスター画像がHTTP 200、ページに「Restricted License」の表記なし
- DaVinci用は `DaVinci Resolveテンプレ` タグ（既存の14件にも付与して計20件）。その他のツール用は `Premiere Proテンプレ（動きの参考）` などのタグで、DaVinciで作る時の動きの参考として扱う
- `地名ラベル` タグ: DaVinci用のテロップ・注釈6件（旅先の地名や日付を控えめに出す用途）
- `写真の見せ方` タグ: 家族写真を手に持って入れ替える、写真の壁、散らばった写真、写真リビールのトランジションなど

ワンタップ検索に `# 写真の見せ方` `# DaVinci Resolveテンプレ` `# 地名ラベル` を追加。

結果: 448 → 506件（GIF 349 / 公式プレビューMP4 60 / Vimeo 25 / YouTube 9 / 元ページのみ 62）。タグ別: StaRt向き110、旅行114、ウェディング50、3点バースト候補37、写真の見せ方18、DaVinci Resolveテンプレ20。

## 2026-09-18 update — Mixkit第2弾と重複データの掃除（Additions24）

Mixkitの残りから、インク・水しぶき・分割・積み上げ文字など「動きの型」として転用できる67件を公式プレビューのコマ送りで確認し、48件を登録した。クリスマス、ネオンの店舗看板、企業・IT向け、ロゴアニメ、動物の紹介は、Openingの方向（documentary / travel film / editorial）から外れるため除外した。

主な追加:

- インク・水彩: 黒いしみが広がるトランジション、インクのにじみで写真が現れるオープナー、水彩のにじみで2人の写真が開くオープナー
- 打点（`3点バースト候補`）: 水しぶきで単語が弾ける、煙で3行積み上がる、斜めストライプが走る、中央から割れて弾む、単語が横から突き当たる／回りながら止まる
- 積み上げ文字（`StaRt向き`）: 色ブロックが段違いに積まれる、単語が上から落ちて見出しになる、手描き図形と一緒に文が組み変わる、細い罫線と大きなセリフ体
- 写真の見せ方: 文字の中に風景の映像が流れるマスクタイトル、斜めの破片で写真が入れ替わる、小さな写真枠が並んで流れる
- ウェディング: 金の草花が描き足されて名前を囲む、金の紙吹雪の招待状風カード、細い装飾罫が名前を挟む
- トランジション: 縦帯・短冊・鏡・引き・回転ズーム・色ずれ（プリズム）

あわせて、データファイル側に残っていた重複14件（runtimeのdedupeで黙って落ちていて、画面には元々出ていなかったもの）を削除した。同じテンプレートがFinal Cut Pro用とAfter Effects用の両ページで公開されていて公式プレビューが同一、というケースもここで気づいた。

再発防止として `pnpm check:external-motion-atlas` に「データファイルの件数 = runtimeの件数」の検算を追加した。同じ id / sourceUrl+titleOriginal / previewUrl を二重登録すると、以後はCIで落ちる。

ワンタップ検索に `# インク` `# トランジション` を追加。

結果: 506 → 554件（GIF 349 / 公式プレビューMP4 108 / Vimeo 25 / YouTube 9 / 元ページのみ 62）。タグ別: StaRt向き124、旅行110、3点バースト候補52、ウェディング51、写真の見せ方24、筆記体10、地名ラベル9。

hover再生は、ブラウザペインが非表示（`document.visibilityState === "hidden"`）だと`play()`が解決しても実際には進まないため、この環境では再生の実測はできていない。ポスター画像の表示と、hoverでの読み込み開始（readyState 0→4）までは確認済み。

## 2026-09-19 update — Mixkit第3弾：写真スライド・枠付きタイトル・注釈テロップ（Additions25）

Mixkitのwedding/travel/slideshowカテゴリと、枠・注釈・callout系のテンプレートから、公式サイトマップ全851件のうち未登録分をキーワード照合で166件に絞り、さらに用途に近い54件を公式プレビューのコマ送りで確認して43件を登録した。誕生日・企業ロゴ・ゲーム・ニュース・Instagramストーリー広告系は除外した。

主な追加:

- 写真スライド（`写真の見せ方`）: 白フチ写真が傾いて流れるスライドショー、結婚式映像に筆記体の名前が溶けて重なるスライドショー、白カードに写真を載せて横送りするスライドショー、縦パネルで写真が入れ替わるつなぎ
- 枠付きタイトル: 細い枠が線で描かれて1語が出る、正方形の枠に4行組み上がる、上下罫線に挟まれたセリフ体3行、黒帯見出し＋副題
- 注釈テロップ（`地名ラベル`）: 点や丸から斜めの線が伸びて写真の一点を指す型を8種類（帯ラベル、説明箱、四角、3行、かぎ括弧囲みなど）
- 名前テロップ（`ウェディング`）: 夜景に細い線と名前、枠付きの名前＋肩書き、蛍光帯＋セリフ体の名前、上下飾りに挟まれた名前＋日付
- トランジション7種: 回転、グリッド育成、枠が溶ける、白飛びズーム、上下分割で弾む、寄り引き、上へ抜けるズーム

結果: 554 → 597件。`地名ラベル`9→18、`ウェディング`51→57、`写真の見せ方`24→27。

hover再生の実測は引き続きこの環境では確認できていない（ブラウザペイン非表示時は`play()`が解決しても進まないため）。ポスター画像表示、`pnpm check:external-motion-atlas`のraw=runtime検算、`pnpm build`は確認済み。

## 2026-09-19 update — 関連性優先の小バッチ（Additions26）

Mixkit公式サイトマップの未登録候補は412件残っていたが、大半がゲーム・ニュース・企業ロゴ・Instagram広告向けの汎用テロップで、Style Bibleの方向（documentary / travel film / editorial、テンプレ感を避ける）から外れる。件数を追うより用途一致を優先し、9件だけに絞って登録した。

- ウェディングの名前タイトル3件: 白線画の花輪、金色の花輪、金の唐草模様の枠（いずれも2人の名前を上品に見せる型）
- StaRt向けの映画クレジット風エンディング2件: 白いドレスの後ろ姿の映像に「監督・脚本・主演」のような役職クレジットが流れるもの、同じ映像に出演者一覧がエンドロール風に並ぶもの。旅の記録映画のエンディングにそのまま使える構図
- 歌詞・曲名テロップ1件: SONG NAME形式の下に1行の説明が出る型
- インクトランジション3件: 下から噴き上がる／大きなしみが飲み込む／粒子が集まって流れる、の3種類（既存のインク系と見た目が明確に異なるものだけ）

結果: 597 → 606件。

以後、Mixkitの残り候補は汎用テロップ・広告系が中心のため、明確な必要性（StaRtの実装で「この場面にこの動きが要る」という具体的な要求）が出るまで、この探索は一区切りとする。

## 2026-09-19 update — 収集から選定への切り替え（Favorite / Maybe / Reject）

606件を集めた段階で、次にやるべきことは件数を増やすことではなく「実際にOpeningで使う演出を選ぶ」ことだと判断した。`docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md` #68（A/B Comparison: Favorite / Maybe / Reject）と、Director Recipe Catalogに既にある同じ仕組みを踏襲し、映像Pinterestにも人間の選定状態を追加した。

- 各カードに ☆ Favorite / ? Maybe / ✕ Reject の3ボタンを追加（もう一度押すと解除）
- 詳細モーダルにも同じ3ボタンをフルサイズで表示
- 選定状態は`localStorage`のこのブラウザだけに保存（`external-motion-atlas-human-decisions-v1`）。Director Recipe Catalogの選定（`start-director-human-decisions-v1`）とはid名前空間が違うため、キーを分離した
- フィルタ行に「全部 / ☆Favorite / ?Maybe / ✕Reject / 未選定」の件数付きチップを追加し、選んだものだけ絞り込める
- AIは`favorite`へ勝手に昇格させない。ボタンは常に人間が押す前提

`startHumanReview.ts`の`readHumanReviewDecisions` / `writeHumanReviewDecisions`に`storageKey`引数を追加し、Director Recipe Catalogと同じ実装を再利用した（新規実装を増やさない）。

次にやること: 606件から実際にStaRt Extendedの14 sectionへ使う候補をFavoriteへ絞り込み、`startSectionRecipeMap.ts`側の実装検討へつなげる。
