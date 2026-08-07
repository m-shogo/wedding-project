# オープニングムービー 90秒完全絵コンテ

Created: 2026-08-07

## 目的

結婚式オープニングムービーを、Palmier / motion-studio / CapCut / AI動画生成に分解して迷わず制作するための90秒設計。

テーマは **旅行**。披露宴開始を「旅の出発」に見立てる。

## 制作方針

- AIは背景・つなぎ・世界観補強だけに使う。
- 新郎新婦、犬、家族、友人はAI生成・AI変形しない。
- 文字、名前、日付、会場名はAI動画に描かせない。
- 文字はmotion-studioまたはCapCutで重ねる。
- AI動画は3〜5秒中心。長く使いすぎない。
- Palmierはラフ配置。CapCutは最終仕上げ。

## 90秒構成サマリー

| Scene | 秒数 | タイトル | 目的 | 主担当 |
|---|---:|---|---|---|
| 01 | 0-6 | Before Departure | 冒頭で空気を作る | AI背景 + Palmier |
| 02 | 6-15 | Boarding Pass | 名前・日付を印象付ける | motion-studio |
| 03 | 15-24 | Flight Route | 横浜から旅が始まる | motion-studio |
| 04 | 24-35 | Into the Sky | 飛行機窓・雲で移動感 | AI動画 |
| 05 | 35-50 | Our Memories | 二人の写真フラッシュ | 実写真 + CapCut |
| 06 | 50-62 | Hawaii Light | ハワイの空気と余韻 | AI背景 + 実写真 |
| 07 | 62-72 | The Promise | プロポーズ/特別な瞬間 | 実写真 + 夜景背景 |
| 08 | 72-82 | Back to Yokohama | 今日の会場へ戻る | motion-studio + AI背景 |
| 09 | 82-90 | Countdown / Entrance | 入場直前に高揚させる | motion-studio + CapCut |

## 詳細絵コンテ

### Scene 01: Before Departure

| 項目 | 内容 |
|---|---|
| 秒数 | 0:00-0:06 |
| 画面 | 暗転から、空港ラウンジ/出発前の光へ。人なし、文字なし。 |
| 目的 | ゲストを静かに引き込み、「何か始まる」空気を作る。 |
| 必要素材 | `airport-light`, `soft-particles`, `dark-to-light-transition` |
| 作り方 | AI静止画 → Seedance/Klingで3〜5秒動画化。Palmierで仮配置。 |
| テロップ | なし、または小さく `Welcome aboard` を後乗せ。 |
| BGM | イントロ開始。低音または柔らかい立ち上がり。 |
| QA | 人物・文字・看板・ロゴがないこと。AIっぽい空港案内板を避ける。 |
| 状態 | needed |

### Scene 02: Boarding Pass

| 項目 | 内容 |
|---|---|
| 秒数 | 0:06-0:15 |
| 画面 | 搭乗券風モーション。名前、日付、会場名を表示。 |
| 目的 | 結婚式情報を上品に見せる。旅行テーマを明確化。 |
| 必要素材 | `boarding-pass-title`, `date-card`, `stamp-motion` |
| 作り方 | motion-studioで生成。文字はRemotion側で正確に入れる。 |
| テロップ | 新郎新婦名 / 2026.10.24 / Yokohama |
| BGM | 1つ目の展開に合わせる。 |
| QA | テロップ可読性。AI生成文字は使わない。 |
| 状態 | prompt_ready |

### Scene 03: Flight Route

| 項目 | 内容 |
|---|---|
| 秒数 | 0:15-0:24 |
| 画面 | 紙地図またはネイビー背景の航路演出。横浜→ハワイ→横浜の印象。 |
| 目的 | 旅の導線を短く示す。説明しすぎない。 |
| 必要素材 | `route-map`, `airplane-icon`, `passport-stamps` |
| 作り方 | motion-studioで航路線・スタンプ演出。AI背景は文字なし地図だけ。 |
| テロップ | `The journey begins` / `from Yokohama` など後乗せ。 |
| BGM | 軽くテンポが出始める位置。 |
| QA | 地名文字はRemotionで入れる。AI地図に文字を出させない。 |
| 状態 | needed |

### Scene 04: Into the Sky

| 項目 | 内容 |
|---|---|
| 秒数 | 0:24-0:35 |
| 画面 | 飛行機窓から雲海へ。ゆっくりしたカメラ移動。 |
| 目的 | 披露宴への高揚感を旅の移動に重ねる。 |
| 必要素材 | `airplane-window-clouds`, `cloud-sea`, `sky-transition` |
| 作り方 | AI静止画→Seedance/Kling。良ければPalmierで3〜5秒カットを2本配置。 |
| テロップ | `toward a new chapter` など短く後乗せ。 |
| BGM | リズムが入る。 |
| QA | 窓外の雲が破綻しない。窓に人影・文字・ロゴが映らない。 |
| 状態 | needed |

### Scene 05: Our Memories

| 項目 | 内容 |
|---|---|
| 秒数 | 0:35-0:50 |
| 画面 | 実写真を短くテンポよく。旅行、二人、笑顔、思い出。 |
| 目的 | AIではなく本物の二人を見せる。ゲストの感情を乗せる。 |
| 必要素材 | `couple-photos`, `travel-photos`, `prewedding-photo` |
| 作り方 | Palmierで仮配置。CapCutでズーム/パン/テンポ合わせ。 |
| テロップ | 1〜2語の短文。長文にしない。 |
| BGM | サビ前の盛り上げ。 |
| QA | 写真の画質。表情。内輪すぎないか。 |
| 状態 | needed |

### Scene 06: Hawaii Light

| 項目 | 内容 |
|---|---|
| 秒数 | 0:50-1:02 |
| 画面 | ハワイ夕暮れビーチ、雨上がりビーチ、海の光。 |
| 目的 | ハワイの思い出と旅行テーマを上品に補強する。 |
| 必要素材 | `hawaii-sunset-beach`, `after-rain-beach`, `ocean-light` |
| 作り方 | AI背景動画 + 実写真。AI動画は背景として短く使う。 |
| テロップ | `Hawaii memories` など。必要ならCapCutで後乗せ。 |
| BGM | 一度気持ちよく広がる場所。 |
| QA | 観光広告っぽくなりすぎない。人物・文字・ロゴなし。 |
| 状態 | needed |

### Scene 07: The Promise

| 項目 | 内容 |
|---|---|
| 秒数 | 1:02-1:12 |
| 画面 | 高台夜景、柔らかい光、プロポーズ/特別な瞬間を匂わせる。 |
| 目的 | 感情のピーク前の静かな余韻。 |
| 必要素材 | `romantic-night-view`, `proposal-photo`, `soft-gold-light` |
| 作り方 | AI夜景背景 + 実写真。写真があれば実写真優先。 |
| テロップ | `and the promise we made` など短く。 |
| BGM | 少し落として感情を作る。 |
| QA | 過度に泣かせすぎない。AI背景は静かに。 |
| 状態 | needed |

### Scene 08: Back to Yokohama

| 項目 | 内容 |
|---|---|
| 秒数 | 1:12-1:22 |
| 画面 | 航路が横浜へ戻る。横浜夜景/式場へ向かう光。 |
| 目的 | 旅行の物語を今日の披露宴に接続する。 |
| 必要素材 | `back-to-yokohama-route`, `yokohama-night`, `venue-light` |
| 作り方 | motion-studio航路 + AI横浜夜景。 |
| テロップ | `Today, we arrive here` など。 |
| BGM | 入場直前に向けて再加速。 |
| QA | 横浜らしさは雰囲気で表現。実在看板・文字を避ける。 |
| 状態 | needed |

### Scene 09: Countdown / Entrance

| 項目 | 内容 |
|---|---|
| 秒数 | 1:22-1:30 |
| 画面 | 扉の光→カウントダウン→タイトル。 |
| 目的 | 入場直前にゲストの目線を前へ集める。 |
| 必要素材 | `chapel-door-light`, `countdown-light-bg`, `final-title-card` |
| 作り方 | 扉の光はAI/Remotion比較。数字とタイトルはmotion-studioまたはCapCut。 |
| テロップ | `5 4 3 2 1` / `THE JOURNEY BEGINS` |
| BGM | 入場曲へ繋がる最後の盛り上がり。 |
| QA | 数字の読みやすさ。入場前の余韻を潰さない。 |
| 状態 | needed |

## 必要静止画 12枚

| ID | 用途 | 優先 | 動画化 |
|---|---|---:|---|
| `img-airport-light` | 冒頭空港の光 | 高 | する |
| `img-gate-abstract` | タイトル背景 | 中 | 任意 |
| `img-airplane-window-clouds` | 飛行機窓 | 高 | する |
| `img-yokohama-night` | 横浜夜景 | 高 | する |
| `img-paper-route-map` | 地図背景 | 中 | Remotion優先 |
| `img-hawaii-sunset` | ハワイ夕暮れ | 高 | する |
| `img-after-rain-beach` | 雨上がりビーチ | 中 | する |
| `img-romantic-night-view` | プロポーズ余韻 | 中 | する |
| `img-chapel-door-light` | 入場前扉 | 高 | する |
| `img-countdown-light` | カウントダウン | 高 | Remotion/CapCut可 |
| `img-boarding-pass-bg` | 搭乗券背景 | 中 | Remotion優先 |
| `img-final-title-bg` | 最後のタイトル | 高 | 任意 |

## Palmierテストへの落とし込み

### 10秒テスト素材

- `img-airport-light` またはAI動画版
- `boarding-pass-title` motion-studio書き出し
- `img-chapel-door-light` または扉の光Remotion版
- 写真3枚
- BGM1曲

### 30秒テスト素材

- Scene 01〜04とScene 09の素材を中心にする。
- ハワイ・プロポーズ素材は仮でもよい。
- 目的は世界観確認で、完成を狙わない。

## CapCut Pack化するときの列

| column | 内容 |
|---|---|
| order | 表示順 |
| start | 開始秒 |
| end | 終了秒 |
| sceneId | シーンID |
| assetId | 素材ID |
| sourceType | ai-video / photo / remotion / text |
| editInstruction | CapCutでやること |
| caption | 後乗せテロップ |
| notes | 注意点 |

## 次の作業

1. `docs/ai-generation-prompt-pack.md` の12枚プロンプトから静止画を作る。
2. 採用できる静止画だけ動画化する。
3. Palmier 10秒試作へ進む。
4. 結果を `movie-dashboard` とCSVへ反映する。
