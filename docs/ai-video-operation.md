# 動画AI運用手順

更新基準日: 2026-08-07

## 目的

クレジットと手戻りを抑えながら、結婚式ムービーに自然に混ざる高品質な短尺素材を作る。
AI作品を見せることではなく、実写真・実動画・Motion Studio・CapCutの間を補うことが目的。

## 絶対原則

- AI動画は本編の主役ではなく、背景・つなぎ・B-roll・光や空気感の補強に使う。
- 新郎新婦、家族、友人、犬は実写真・実動画を優先し、AIで置換しない。
- 重要な文字、ロゴ、テロップ、看板は生成映像へ焼き込まない。CapCut / Motion Studio側で載せる。
- 1ショット1主動作、1カメラ意図を基本とする。
- 長い万能プロンプトを作るのではなく、ショット意図を正規化してモデル別に変換する。
- 同じ失敗が3回続いたら文章を足すのではなく、静止画・参照素材・ショット設計・モデル選択を見直す。

## 最短の標準フロー

1. `movie-dashboard` → **動画プロンプト** を開く。
2. 欲しいショットを1つに絞る。
3. I2V / T2V / First-Last Frame を選ぶ。
4. 主動作、カメラ、速度、光、字幕余白、参照素材の役割を入力する。
5. まず低コストモデルで2〜4案比較する。
6. 人物・文字・形状破綻・カメラ・光・AIっぽさをQAする。
7. 構図と動きが決まった候補だけ高品質モデルへ進める。
8. 採用候補をCapCutへ実尺で置き、前後ショットとつないで確認する。
9. 採用/不採用を `docs/templates/ai-video-scorecard.csv` とプロンプト管理へ残す。
10. 採用素材だけ `04_ai-video-assets/` の運用対象にする。

## 2026-08 モデルルーティング

### Seedance 2.0 Mini

標準の反復・下書き入口。

- 向く: 短尺B-roll、I2Vの大量比較、動きの方向性確認。
- 使い方: まず4〜6秒、2〜4案。
- 採用候補だけSeedance 2.0 / Runway Gen-4.5 / Veo 3.1へ昇格する。
- 「安いから完成品までMini固定」ではなく、比較用として使う。

### Seedance 2.0

参照素材を複数使う時の主力。

- 画像・動画・音声参照を使える環境では、参照ごとの役割を明示する。
- 例: `composition=画像A / camera motion=動画B / color mood=画像C`
- 一度に複数の動作をさせず、時間順に `establish → main motion → settle` とする。

### Seedance 2.5

最新追跡対象。Dreamina上の提供状況・仕様が変動するため、現時点では標準経路に固定しない。

- 公式Dreaminaでは長尺・多数のマルチモーダル参照・局所修正を掲げている。
- 利用可能な場合も、結婚式の短尺B-rollでは長尺生成を目的化しない。
- 生成前に現行UIの提供状況を確認する。

### Runway Gen-4.5

自然なI2Vとカメラ演出の仕上げ候補。

- 公式ガイドでは、I2Vの入力画像が構図・被写体・光・スタイルを決める。
- I2Vプロンプトは画像内容の再説明より、**動き・カメラ・時間変化**へ集中する。
- 2〜10秒。結婚式素材では5秒前後を基本にする。
- 複雑なカメラ命令を一度に詰め込まない。

### Veo 3.1

実写寄りの物理感、First/Last Frame、参照画像を使う仕上げ候補。

- First/Last Frameがある時は、途中で別の絵を発明させず、両端の自然な遷移を優先する。
- 参照画像は「何を保持する参照か」を限定する。
- 音声生成は必要なショットだけ使い、BGMや重要音は編集側で管理する。

### Kling

比較候補。

- 更新が速いため固定バージョン名を正本にしない。
- Seedance / Runwayと同一ショットで比較し、破綻率を実測する。

### Sora

新規標準経路から外す。

- SoraのWeb/アプリ版は2026-04-26に終了。
- Sora APIも2026-09-24終了予定。
- 過去素材の参照はよいが、新しい制作基盤をSora依存にしない。

## AIっぽさを減らす撮影文法

「cinematic」「masterpiece」「8K」「epic」を大量に重ねると、実写素材の間で生成カットだけが目立ちやすい。
代わりに、現実の撮影で起きる小さな不完全さを具体的に設計する。

### 入れるもの

- physically plausible motion / realistic inertia
- gentle acceleration and deceleration
- restrained framing
- natural exposure response
- subtle optical breathing
- small real-world imperfections
- one motivated camera move
- one primary visual event

### 避けるもの

- unnecessary dolly zoom
- perfect symmetrical movement without reason
- excessive particles / flare / glow
- multiple simultaneous camera moves
- dramatic lighting change without source
- unexplained object transformation
- over-sharpened CGI texture
- random text / subtitle / signage

## I2Vの書き方

静止画がすでにある場合、プロンプトで画像内容を長く再説明しない。

悪い例:

```text
A beautiful airport with large windows, blue seats, a runway outside,
cinematic, masterpiece, 8K, elegant, luxury, emotional...
```

改善例:

```text
Only the distant runway lights and soft reflections move subtly.
The camera makes a very slow push-in with gentle acceleration and a soft stop.
Natural observational footage, restrained framing, realistic exposure response.
Preserve the supplied composition and geometry.
No cuts and no extra invented actions.
```

## T2Vの書き方

T2Vだけは、被写体と環境も短く明示する。

```text
[subject] in [environment].
[one primary action].
[one camera move].
[lighting behavior].
[natural realism instruction].
[caption-space / loop requirement when needed].
```

## 参照素材のルール

参照を増やすほど良くなるわけではない。
「何をどの参照から借りるか」を決める。

```text
composition = reference image A
camera motion = reference video B
color mood = reference image C
```

- 人物の参照は原則使わない。
- 旅行先の実在ロゴや看板を参照すると文字混入しやすいので避ける。
- 参考映像を丸ごとコピーさせず、カメラ・光・速度など抽象化した要素だけ借りる。

## 生成前チェック

- ショットの用途が1文で言えるか。
- 1ショット1主動作か。
- カメラ指示が1つか。
- テロップ余白が必要か決めたか。
- 静止画の時点で人物、動物、文字、ロゴ、看板が0か。
- 参照素材の役割が明示されているか。
- 最初から高コストモデルへ投げていないか。

## 生成後QA

即不採用:

- 人物・動物が出る。
- 読める文字、ロゴ、看板、透かしが出る。
- 直線、窓枠、翼、建物などの形が途中で変形する。
- 不自然なカットや勝手なカメラ移動が入る。
- 光源、影、反射がフレーム間で飛ぶ。
- テロップ余白が潰れる。
- 前後の実写素材より明らかにAIショーリールに見える。

追加評価:

- カメラの加速・減速が自然か。
- 被写体や雲、水、光に自然な慣性があるか。
- 静止画の構図を維持しているか。
- 最後が急停止せず編集で切りやすいか。
- 音なしでも素材として成立するか。
- CapCutへ置いた時、3〜5秒で使いたい部分があるか。

## 採点

100点満点。80点以上だけ本番候補。

- Style Bible適合
- 奥行き
- 光
- カメラ移動余地
- ループ性
- テロップ余白
- 破綻リスクの低さ
- 編集で使いやすいか
- クレジットを使う価値があるか
- **実写素材の間でAIっぽく浮かないか**

## コスト制御

1. 静止画で構図を決める。
2. Mini/Fast系で動きを決める。
3. 最終候補だけ高品質モデルへ。
4. 1モデルで3回同じ失敗なら別モデル/別設計へ切り替える。
5. 4Kは採用確定後に必要なショットだけ。
6. 同じ背景を速度変更・トリミング・逆再生で再利用できるか先に検討する。

## 現在の優先素材

1. 飛行機窓
2. 雲海
3. 空港の光
4. 滑走路
5. 世界地図と航路
6. 海
7. 夜景
8. 扉の光

## 正本

- ショット意図・生成プロンプト: `movie-dashboard` の動画プロンプト / プロンプト管理
- AI素材計画: `docs/04_ai-video-assets.md`
- 採点: `docs/templates/ai-video-scorecard.csv`
- 失敗パターン: `docs/failure-patterns.md`
- モデルの調査根拠: `docs/ai-video-model-routing-2026-08.md`
