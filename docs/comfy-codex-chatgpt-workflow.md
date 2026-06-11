# ComfyUI・Codex・ChatGPT連携マニュアル

最終確認日: 2026-06-10

## 目的

結婚式ムービー用のAI背景素材を、無駄なく作るための作業手順。

このプロジェクトでは、AI動画で本編を丸ごと作らない。AI動画は、3-5秒の背景、章切り替え、空気感の補助素材として使う。完成動画はCapCutやDaVinci Resolveで編集する。

## 今の推奨構成

```text
Codex
→ repo整理、手順書、プロンプト保存、ComfyUI動作確認、ログ記録

ChatGPT / Claude
→ 構成案、演出相談、テロップ、プロンプト改善、レビュー

ComfyUI Desktop
→ ローカル動画AI素材を生成する画面

Wan2.2 TI2V 5B fp16
→ Mac MPSで動作確認済みの動画生成モデル

CapCut
→ 採用素材、写真、BGM、テロップを並べて完成動画にする
```

AnythingLLMは必須ではない。手元資料を読み込ませた専用相談窓口として使うなら便利だが、このrepoを中心に進めるならCodexとChatGPT/Claudeで足りる。

## 役割分担

### Codexに頼むこと

- repo内の手順書を読む。
- `docs/02_style-bible.md` に合わせてプロンプトを作る。
- `docs/templates/ai-shot-list.csv` に候補を整理する。
- ComfyUIのモデル、キュー、ログ、出力ファイルを確認する。
- 生成結果を `docs/templates/ai-video-scorecard.csv` の基準で採点する。
- CapCut向けの編集指示を作る。
- 判断を `docs/decisions/` に残す。

向いている依頼:

```text
docs/comfy-codex-chatgpt-workflow.md と Style Bibleを読んで、
オープニング用のハワイ海素材をComfyUIで試す準備をして。
生成物はGitに入れず、プロンプトと採点だけrepoに残して。
```

### ChatGPT / Claudeに頼むこと

- どんな演出がよいか相談する。
- オープニングムービーの構成案を作る。
- 文章、テロップ、ナレーション、機内アナウンス風コピーを作る。
- ComfyUI用プロンプトを改善する。
- 生成結果の見た目をレビューする。

向いている依頼:

```text
結婚式オープニング用に、旅行テーマで3-5秒のAI背景素材案を10個出して。
人物、犬、文字、ロゴ、看板は出さない。
上品、シネマティック、少し泣ける雰囲気。
各案にComfyUI用の英語プロンプトも付けて。
```

### ComfyUIでやること

- モデルを選ぶ。
- プロンプトを入れる。
- 解像度、フレーム数、ステップ数を決める。
- Queueで生成する。
- 出力動画を確認する。

ComfyUIは「考える場所」ではなく「生成する場所」と考える。考える作業はCodexやChatGPT/Claudeで済ませてから、ComfyUIに入る。

## 基本フロー

全体の流れ:

```text
Codex / ChatGPT / Claude
→ 構成、テロップ、AI素材案、プロンプトを決める

ComfyUI Desktop
→ 3-5秒のAI背景素材を作る

CapCut
→ BGM、写真、AI背景、テロップを並べて完成動画にする

Codex
→ 採点、編集指示、レビュー、decision logをrepoに残す
```

AI動画は素材作り。完成動画の編集はCapCutでやる。

### 1. 欲しい素材を1つに絞る

一度にたくさん作らない。

例:

```text
オープニング冒頭に使う、ハワイの海の3-5秒背景素材
```

決めること:

- 使う動画: オープニング / プロフィール / 紹介
- 使う場所: 冒頭 / 章切り替え / 余韻 / 入場前
- 尺: 3-5秒
- 画面: 横長
- テロップ: 置く / 置かない

### 2. Style Bibleを確認する

見るファイル:

- `docs/02_style-bible.md`
- `docs/04_ai-video-assets.md`
- `docs/ai-video-operation.md`

守ること:

- 人物を出さない
- 犬や動物を出さない
- 文字、ロゴ、看板を出さない
- カメラを速くしない
- テロップ余白を残す
- AI作品っぽくしすぎない

### 3. プロンプトを作る

最初のハワイ海素材:

```text
A cinematic 5-second looping shot of gentle ocean waves in Hawaii at golden hour, elegant wedding travel film style, soft sunlight reflections, calm motion, subtle film grain, slow smooth camera movement, clean composition with caption space, no text, no logo, no watermark, no people, no animals, no signage.
```

ネガティブ:

```text
text, logo, watermark, people, animals, signage, distorted objects, fast camera motion, shaky camera, unreadable artifacts, low quality
```

ChatGPT/Claudeに改善させる時:

```text
このComfyUI用プロンプトを、結婚式オープニングの背景素材向けに改善して。
条件:
- 3-5秒
- ハワイの海
- 上品でシネマティック
- 人物、動物、文字、ロゴ、看板なし
- テロップ余白あり
- カメラはゆっくり

元プロンプト:
...
```

### 4. ComfyUIで低解像度テストする

最初は品質ではなく、動くかを見る。

推奨の最小テスト:

```text
model: wan2.2_ti2v_5B_fp16.safetensors
text encoder: umt5_xxl_fp16.safetensors
vae: wan2.2_vae.safetensors
width: 128
height: 128
length: 5
steps: 1
```

これは動作確認用。見た目は採用判断しない。

次の試作:

```text
width: 320
height: 192
length: 17-33
steps: 4-8
```

さらに進める場合:

```text
width: 480
height: 272
length: 49
steps: 8-12
```

いきなり720pや長尺にしない。Macでは時間とメモリを食う。

### 5. 出力を確認する

ComfyUI Desktopの出力先:

```text
~/ComfyUI-Shared/output/
```

動画はだいたい以下に出る:

```text
~/ComfyUI-Shared/output/video/
```

確認すること:

- 人物が出ていないか
- 動物が出ていないか
- 文字やロゴが出ていないか
- カメラが速すぎないか
- 使いたい場所に合うか
- テロップを置く余白があるか

### 6. 採点する

使うログ:

- `docs/templates/ai-shot-list.csv`
- `docs/templates/ai-video-scorecard.csv`
- `docs/templates/asset-log.csv`

採点基準:

```text
80点以上: 採用候補
60-79点: 再生成またはプロンプト調整
59点以下: 不採用
```

即不採用:

- 人物が出る
- 犬や動物が出る
- 読める文字が出る
- ロゴや看板が出る
- カメラが速すぎる
- テロップ余白がない
- 結婚式よりAI実験感が強い

### 7. CapCut用に変換する

採用候補が出たら、Codexに編集指示へ変換させる。

依頼文:

```text
このAI背景素材をCapCut編集指示にして。
用途: オープニング冒頭
尺: 5秒
素材の印象:
入れたいテロップ:
BGMの入り:
トランジション:
```

出すもの:

- 秒数
- 素材名
- 拡大率
- パン方向
- テロップ位置
- フェード
- BGMタイミング

## CapCutで完成動画にする流れ

CapCutは `/Applications/CapCut.app` から起動する。

```bash
open -a CapCut
```

詳しい手順:

- `docs/capcut-operation.md`
- `docs/05_capcut-editing.md`

### 最初の10秒試作

まず本編を作らず、10秒だけ作る。

例:

```text
0:00-0:03  ハワイ海AI背景、タイトル
0:03-0:07  写真2-3枚、ゆっくりズーム
0:07-0:10  雲海または光のAI背景、次章へフェード
```

CapCutでやる順番:

1. New projectを作る。
2. 画角を16:9仮設定にする。会場仕様が分かればそれに合わせる。
3. BGMを先に置く。
4. BGMの山にマーカーを付ける。
5. AI背景素材を `~/ComfyUI-Shared/output/video/` から読み込む。
6. 写真を置く。
7. 写真に100%から108%程度のゆっくりしたキーフレームを入れる。
8. テロップを短く置く。
9. クロスフェードか黒フェードだけでつなぐ。
10. `90_exports/` に書き出す。
11. `docs/templates/review-notes.csv` にレビューを書く。

### CapCutに持ち込む前の素材チェック

採用してよいAI素材:

- 人物がいない
- 動物がいない
- 文字、ロゴ、看板がない
- カメラがゆっくり
- テロップ余白がある
- 写真やBGMを邪魔しない

迷う素材は入れない。CapCutで編集しても、元素材の違和感は消しにくい。

### CapCutから戻すもの

CapCutで作業したら、repoに残すのは実ファイルではなく記録。

残すもの:

- どの素材を使ったか
- 何秒から何秒に置いたか
- BGMのどこに合わせたか
- テロップ案
- レビューで直す点

残さないもの:

- 実動画ファイル
- 写真の原本
- BGM音源
- CapCutの巨大な作業ファイル

## ComfyUI画面での操作目安

### モデル選択

使うモデル:

```text
Load Diffusion Model:
wan2.2_ti2v_5B_fp16.safetensors

Load CLIP:
umt5_xxl_fp16.safetensors
type: wan

Load VAE:
wan2.2_vae.safetensors
```

FP8は使わない。

使わないもの:

```text
*fp8*
*e4m3fn*
Wan2.2 14B FP8
```

### Queue前チェック

Queue前に見る:

- 解像度が高すぎない
- フレーム数が多すぎない
- stepsが多すぎない
- promptに `no people, no animals, no text, no logo` が入っている
- 保存先prefixが分かる名前になっている

ファイル名例:

```text
opening_hawaii_ocean_test01
opening_cloudscape_test01
profile_chapter1_airplane_window_test01
```

## Codexとの連携パターン

### ComfyUIの状態確認

```text
ComfyUIのキュー、モデル一覧、最後のログ、出力動画を確認して。
必要なら採用できるか見立てて。
```

Codexが確認するもの:

```text
http://127.0.0.1:8188/queue
~/ComfyUI-Shared/models/
~/ComfyUI-Shared/output/
~/ComfyUI-Installs/ComfyUI/logs/comfyui.log
```

### 生成結果の採点

```text
このComfyUI出力動画を、結婚式ムービー素材として採点して。
Style Bibleに合わせて、採用/再生成/不採用を判断して。
```

### repoへの記録

```text
今の生成結果を、ai-shot-list、scorecard、asset-logに記録して。
実動画ファイルはGitに入れないで。
```

## ChatGPT / Claudeとの連携パターン

### 素材案を出す

```text
旅行テーマの結婚式オープニング用に、AI背景素材案を10個出して。
各素材は3-5秒、人物なし、動物なし、文字なし。
用途、画面イメージ、ComfyUI用英語プロンプト、避ける失敗を書いて。
```

### プロンプトを改善する

```text
このプロンプトをComfyUI/Wan向けに改善して。
目的は結婚式ムービーの背景素材。
カメラはゆっくり、テロップ余白あり、人物・動物・文字・ロゴなし。
出力はpositive promptとnegative promptだけ。
```

### 生成結果をレビューする

```text
この動画を結婚式オープニング素材としてレビューして。
採用できるか、どこを直すべきか、次のプロンプトをどう変えるか教えて。
```

## 最初の制作メニュー

まず作る順番:

1. ハワイの海
2. 雲海
3. 空港の光
4. 飛行機窓
5. 扉の光

最初の1本だけ作るなら:

```text
ハワイの海、3-5秒、夕暮れ、人物なし、テロップ余白あり
```

成功したら、同じ設定でseed違いを3本作る。

```text
test01
test02
test03
```

3本から一番良いものを選び、次に解像度を上げる。

## やってはいけないこと

- いきなり本番尺を作る。
- いきなり720p以上にする。
- 14B FP8をMac MPSで再挑戦する。
- 生成動画をGitに入れる。
- 人物や犬をAI生成する。
- 文字やロゴが入った素材を採用する。
- ComfyUIで考えながら試行錯誤し続ける。

考える場所はCodex/ChatGPT/Claude。生成する場所がComfyUI。

## 迷った時の一言

Codexにこう頼む。

```text
このrepoのStyle Bibleに合わせて、ComfyUIで次に作るAI背景素材を1つだけ決めて。
Wan2.2 TI2V 5B fp16前提で、低解像度テスト用の設定、positive prompt、negative prompt、採点基準まで出して。
```
