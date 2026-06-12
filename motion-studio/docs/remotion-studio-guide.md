# Remotion Studio 操作ガイド(wedding-project専用)

Remotion Studioで「どれを見ればいいか」「何を触れば何が変わるか」を迷わないためのガイド。
Studio本体の機能説明ではなく、このプロジェクトでの使い方に絞る。

## まず制作コックピットを開く

Studioを開く前に `exports/index.html`(制作コックピット)を開くと、
今日やること・各シーンの状態・見るべきCompositionの順番が分かる。

```sh
open motion-studio/exports/index.html   # Finderからダブルクリックでも可
```

古い場合は `pnpm export` で更新してから見る。

コックピットには主要Compositionの**見た目プレビュー**(still画像)が出る。

- サムネイルが古い / 無い場合: `pnpm export:stills && pnpm export` で更新
- still画像は**目安**。動き・テンポの最終確認はRemotion Studioで再生する
- サムネイル画像(`exports/previews/*.png`)はGit管理しない(生成物)

## 起動方法

```sh
cd /Users/m-shogo/Developer/personal/wedding-project/motion-studio
pnpm dev
```

ブラウザで Remotion Studio が開く(通常 http://localhost:3000)。

## Compositionを見る順番

迷ったらこの順に見る(制作コックピットにも同じ順番がある)。

| 順 | Composition | フォルダ | 見る目的 |
|---|---|---|---|
| 1 | `文字部品-確認` | 30-部品確認 | TextPart 3種の見た目確認 |
| 2 | `写真-Hawaii` | 10-開幕素材 | Hawaii写真カードの確認 |
| 3 | `搭乗券` | 10-開幕素材 | オープニング冒頭のBOARDING PASS |
| 4 | `雲海` | 10-開幕素材 | AI生成版(op_16系)とRemotion版の比較 |
| 5 | `扉-光` | 10-開幕素材 | 入場直前の余韻 |
| 6 | `開幕-全体確認` | 90-全体確認 | 全体のテンポ・順番の確認 |

## 画面の見方

### 左側: Composition一覧

フォルダで分類されている。番号順が制作の流れ。

- `00-動作確認` — 透過テスト用。普段は触らない
- `10-開幕素材` — オープニングムービー用テンプレ
- `20-Profile素材` — プロフィールムービー用テンプレ
- `30-部品確認` — 再利用パーツ(parts/)の確認用。本番素材ではない
- `90-全体確認` — 通しのテンポ確認用。本番素材ではない
- `99-説明書` — Studio内マニュアル

クリックすると中央のプレビューが切り替わる。

### 中央下: タイムライン

- **スペースキー** で再生 / 停止
- タイムラインの好きな位置をクリックでそのフレームへ移動
- **← →** キーで1フレームずつ移動
- 左下にフレーム番号が出る(30fps。90フレーム=3秒)

### 右側: propsパネル

選択中のCompositionに渡しているprops(文言・色味・ズーム率など)が表示される。
値を変えるとプレビューに即反映される。**変えただけでは保存されない**(リロードで元に戻る)。

## propsを触ると何が変わるか

- 文言系(`title`, `label`, `passenger` など) — 表示される文字がそのまま変わる
- enum系(`variant`, `background`, `position` など) — 配色・配置パターンが切り替わる
- 数値系(`zoomTo`, `staggerFrames` など) — 動きの強さ・タイミングが変わる。
  schemaにmin/maxがあるので極端な値は入らない

**触っていい例:**

- `搭乗券` の `variant` を ivory ↔ navy で切り替えて見比べる
- `写真-Hawaii` の `zoomTo` を 1.05 → 1.10 にしてズームの強さを見る
- `showCinematicBars` をオン/オフして黒帯の有無を比較する

**危ない例:**

- `photos` のパス文字列を手書きで変える — 写真は `assets.ts` のID管理。
  Studioで一時的に見るだけなら害はないが、その値をSave defaultsで保存しない
- `開幕-全体確認` のpropsを調整して保存する — 代表値なので本番に反映されず混乱のもと
- min/max限界の極端な値で保存する — 上品さ(Style Bible)から外れる

## Save defaults の注意

propsパネル上部の **Save defaults** を押すと、調整値が `src/Root.tsx` の
defaultProps に**書き戻される**(=ファイルが変更される)。

- 試しに触るだけなら押さない(リロードすれば元に戻る)
- この値で確定したい、と思ったときだけ押す
- 不安なら保存前後に `git diff motion-studio/src/Root.tsx` を見る
- 意図しない保存をしたら `git checkout -- motion-studio/src/Root.tsx` で戻せる

## 触っていいもの / 触らない方がいいもの

**触っていい(壊れない):**

- propsパネルの値(保存しなければ消える)
- タイムラインの再生位置
- Composition の切り替え

**触らない方がいい:**

- `開幕-全体確認` のprops — 代表値のみで単一情報源は `openingProject.ts`。
  ここで触っても本番に反映されない
- `photos` のパス文字列を手書きで変える — 写真IDは `assets.ts` 管理。
  実写真は `public/photos/opening/` に置いて `pnpm sync:photos` してから指定する
- シーンの順番・尺を変えたい場合 — Studioではなく `openingProject.ts` を編集する
  (変更後は `pnpm check` を通す)

---

## Composition別 触れる項目一覧

### A. 文字部品-確認(30-部品確認)

**用途**: TextPart 3種(parts/text)の見た目確認。本番素材ではない。

時間で切り替わる3セグメント構成(各100フレーム):

1. **FadeUpCaption** — 写真下の短文・字幕(暗背景)
2. **MaskRevealTitle** — 章タイトル・場所名(明背景)
3. **ElegantLowerThird** — 人物・家族・犬の名前札(暗背景)

**見るポイント:**

- 文字サイズは会場スクリーンで読めるか
- 読みやすさ(背景とのコントラスト、影の効き)
- 派手すぎないか(Style Bible: 上品・シネマティック)
- フェードの速度が落ち着いているか

propsはないので、見て気になった点を `docs/templates/review-notes.csv` に残す。

### B. 写真-Hawaii(10-開幕素材)

**用途**: Hawaii写真カード(MEMORY 03)の確認。

**触れる主なprops:**

| props | 効果 |
|---|---|
| `label` | 左上の小ラベル(MEMORY 03 など) |
| `title` | 見出し(HAWAII など) |
| `photos` | 写真3枚のID配列 |
| `background` | 背景(beige / navy / transparent) |
| `maxRotationDeg` | カードの傾き上限(0-3度) |
| `cardRadius` | カードの角丸(0-24) |
| `shadowStrength` | 影の強さ(0-2) |
| `staggerFrames` | カードが出る時間差(0-60フレーム) |
| `zoomTo` | 写真のゆっくりズーム到達倍率(1-1.15) |

**注意:**

- `photos` が null の要素は仮表示(プレースホルダ)になる
- 実写真は `public/photos/opening/` に置いてから ID で指定する
  (`pnpm sync:photos` → `assets.ts` の status 更新)
- captionPart 導入前なのでテロップはまだ出ない

### C. 搭乗券(10-開幕素材)

**用途**: オープニング冒頭の BOARDING PASS イントロ。

**触れる主なprops:**

| props | 効果 |
|---|---|
| `variant` | ivory / navy の配色切り替え(**人間の決定待ち**) |
| `title` | 上部タイトル |
| `flightNumber` | 便名(MEMORY FLIGHT 1024 など) |
| `date` | 日付表記 |
| `seat` / `gate` | 座席・ゲート表記 |
| `passenger` | 搭乗者名 |
| `departureCode` / `arrivalCode` | 出発・到着の空港コード風表記 |
| `zoomTo` | ゆっくりズーム到達倍率(1-1.2) |
| `showCinematicBars` | 上下の黒帯(映画予告編風)の有無 |

文言の正式値は `openingProject.ts` の concept から来る。試し打ちはStudioで、
確定は `openingProject.ts` 側で行う。

### D. 開幕-全体確認(90-全体確認)

**用途**: `openingProject.ts` 連動の全体テンポ・順番確認。

**注意:**

- ここで細かい編集をしない。見た目の最終確認は**個別Composition**で行う
  (propsは代表値で、各テンプレのdefaultPropsを完全反映していない)
- シーン順・尺の単一情報源は `openingProject.ts`。変えたいときはそちらを編集して
  `pnpm check` を通す

---

## 写真差し替えの基本

1. 実写真を `public/photos/opening/` に置く(Git管理外。コミットされない)
2. `pnpm sync:photos` を実行(`photoLibrary.generated.ts` が更新される)
3. `assets.ts` の該当ID(例: `photo-hawaii-01`)の status を更新する
   (missing → 置いたら generated_preview 等。candidate以上は人間確認)
4. テンプレへの受け渡しは `photoPublicPath(id)` 経由。Root.tsxのphotos欄に
   手書きパスを入れない
5. `pnpm check` で整合確認

## Fable / Codex 作業後の確認順

AIに作業させた後、人間はこの順で確認する。

1. `pnpm check` — 整合が崩れていないか
2. `pnpm export` — 管理ファイルを最新化
3. `exports/index.html` — 制作コックピットで全体把握(TODO・素材状況)
4. `review.html` — シーン×素材×品質チェック
5. Remotion Studio(`pnpm dev`)— 影響したCompositionを目視
6. 必要なら still / mp4 書き出しで最終確認
   (`pnpm exec remotion still <ID> /tmp/x.png --frame=N`)

## 困ったとき

- Compositionが出ない / エラー表示 → `pnpm typecheck && pnpm check` で原因を見る
- 見た目を画像で残したい → `pnpm exec remotion still <ID> /tmp/x.png --frame=N`
- 全体の入口ページ → `pnpm export` 後に `exports/index.html` を開く
