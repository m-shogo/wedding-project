# ローカル動画AIセットアップ手順

最終確認日: 2026-06-10

## この手順の目的

結婚式ムービー用に、無料またはローカル寄りで試せる動画生成AI環境を用意する。

このプロジェクトでは、動画AIで本編を丸ごと作らない。動画AIは、オープニングムービーやプロフィールムービーに入れる短い背景、章切り替え、空気感の補助素材を作るために使う。

## まず理解すること

役割を分ける。

```text
Claude（このrepo）
→ 台本、構成、秒割り、テロップ、生成プロンプトを作る

ComfyUI
→ 動画生成AIを画面で操作する

Wan / Stable Video Diffusion などの動画モデル
→ 画像や文章から短い動画素材を作る

CapCut / DaVinci Resolve / ffmpeg
→ 採用素材を編集して本編に組み込む
```

今回入れる対象は、文章LLMではなく、動画生成AIを操作するための環境。

## このMacの前提

2026-06-10に確認した状態。

- Mac: Apple Silicon
- macOS: 26.4.1
- メモリ: 24GB
- Homebrew: あり
- Python: あり
- `ffmpeg`: あり

この構成ならComfyUI Desktopを試す価値がある。ただし、動画生成モデルは重いので、最初は低解像度、短尺、少ないステップで試す。

## 置き場所のルール

このリポジトリには、手順、プロンプト、ログ、採点、編集指示だけを置く。

Gitに入れないもの:

- モデル本体
- 生成した動画
- 実写真
- 実動画
- BGM
- 書き出し済みムービー

推奨配置:

```text
/Applications/ComfyUI.app
  ComfyUI Desktop本体

~/ComfyUI-Shared/
  ComfyUI Desktopの共有モデルと入出力

~/Developer/personal/wedding-project/
  結婚式ムービーの設計、プロンプト、ログ、編集指示
```

ComfyUI Desktopの既定では、作成したインスタンスは `~/ComfyUI-Installs`、共有モデルや出力は `~/ComfyUI-Shared` に置かれる。アンインストールしてもこれらは自動削除されない。

## おすすめ構成

最初はこれ。

```text
ComfyUI Desktop
+ Wan2.2 TI2V 5B fp16
+ umt5_xxl_fp16 text encoder
+ CapCut
```

理由:

- ComfyUI Desktopは画面で操作できる。
- Wan系はComfyUIの公式チュートリアルとワークフローがある。
- 5B fp16はMac MPSで最小テストが成功した。
- Image-to-VideoやText-to-Videoの前に、5B fp16で短尺・低解像度を試せる。
- CapCutで仕上げる前提なら、動画AI素材は3-5秒で十分。
- プロンプト生成・構成設計はClaude（このrepo）で行うのでAnythingLLMは不要。

## インストール手順

### 1. ComfyUI Desktopを入れる

Homebrewで入れる場合:

```sh
brew install --cask comfyui
```

公式サイトから入れる場合:

1. ComfyUI公式のmacOS Desktopページを開く。
2. macOS用インストーラをダウンロードする。
3. `.dmg` を開く。
4. `ComfyUI.app` をApplicationsに入れる。
5. 初回起動時にmacOSの警告が出たら、システム設定のプライバシーとセキュリティから許可する。

### 2. ComfyUIを起動する

1. `ComfyUI.app` を起動する。
2. 最初のインスタンスを作る。
3. ブラウザまたはアプリ内画面でComfyUIが開くことを確認する。
4. まずはテンプレートやサンプルワークフローが開けるか確認する。

### 3. まず画像生成か軽いワークフローで動作確認する

いきなり動画モデルを入れない。

先に確認すること:

- ComfyUIが起動する
- Queueを押せる
- 出力フォルダに画像や結果が出る
- エラーが出たらログを読める

ここまで通ってから動画モデルに進む。

### 4. 動画モデルを入れる

第一候補はWan2.2系。

ComfyUIの公式Wan2.2チュートリアルでは、ComfyUIを更新したうえで、メニューからワークフローテンプレートを開き、必要なモデルを配置する流れになっている。

最初に試す順番:

1. Wan2.2 5B系または軽めのImage-to-Video
2. うまく動いたらWan2.2 14B Image-to-Video
3. さらに必要ならText-to-VideoやFirst-Last-Frame系

Mac 24GBでは、最初から720pや14B高設定にしない。まずはWan2.2 TI2V 5B fp16で小さく動かして、破綻、速度、メモリ不足を確認する。

### 5. モデルファイルの場所

ComfyUIのモデルは、ワークフローの指示に合わせて以下のようなフォルダへ置く。

```text
ComfyUI/
  models/
    diffusion_models/
    text_encoders/
    vae/
    clip_vision/
```

ComfyUI Desktopの場合は、共有モデルフォルダや各インスタンス内の `models/` を使う。どちらに入れるべきかは、ComfyUIのモデルマネージャーまたはワークフローテンプレートの表示に従う。

## 最初の試作

最初に作るのは、オープニングムービー用の「ハワイの海」素材。

目的:

- 3-5秒の背景素材
- 人物なし
- 文字なし
- テロップ余白あり
- CapCutでループまたは速度調整しやすい

使うプロンプト:

```text
A cinematic 5-second looping shot of gentle ocean waves in Hawaii at golden hour, elegant wedding travel film style, soft sunlight reflections, calm motion, subtle film grain, slow smooth camera movement, clean composition with caption space, no text, no logo, no watermark, no people, no animals, no signage.
```

ネガティブ:

```text
text, logo, watermark, people, animals, signage, distorted objects, fast camera motion, shaky camera, unreadable artifacts
```

設定方針:

- まずImage-to-Videoで試す。
- 入力画像は、海、夕暮れ、余白あり、人物なしにする。
- カメラ移動は弱くする。
- 破綻しやすい細かい文字、看板、手、顔は入れない。

## 採用判断

生成したら、すぐ採用しない。以下を記録して判断する。

- `docs/templates/ai-shot-list.csv`
- `docs/templates/ai-video-scorecard.csv`
- `docs/templates/asset-log.csv`

80点以上だけ採用候補にする。

即不採用:

- 人物が出た
- 動物が出た
- 文字やロゴが出た
- カメラが速すぎる
- テロップを置けない
- AI作品っぽさが強い
- 結婚式の雰囲気より実験感が勝つ

## Claudeに渡す時の依頼文

このままClaudeに渡せる形。

```text
このリポジトリは結婚式ムービー制作管理repoです。
まず CLAUDE.md、docs/00_start-here.md、docs/02_style-bible.md、docs/ai-video-operation.md、docs/local-video-ai-setup.md を読んでください。

やりたいこと:
ローカル動画AI環境を使って、結婚式オープニングムービー用の3-5秒AI背景素材を作りたい。

重要方針:
- AI動画で本編を丸ごと作らない
- 新郎新婦、家族、友人、犬はAI生成しない
- 人物、動物、文字、ロゴ、看板は出さない
- まずハワイの海の短尺背景素材を1本だけ試す
- 生成物の実ファイルはGitに入れない
- repoにはプロンプト、採点、編集指示、判断だけ残す

お願い:
1. docs/local-video-ai-setup.md の手順が現在のMac環境に合っているか確認してください。
2. ComfyUI Desktop + Wan系で始める場合の最小手順を提案してください。
3. 最初の試作用に、ComfyUIで使うプロンプト、入力画像条件、採点基準、CapCutへの渡し方を具体化してください。
4. 実行前に、外部アップロードや大きいモデルダウンロードが発生する作業は確認してください。
```

## Codexに頼む時の依頼文

```text
docs/local-video-ai-setup.md を読んで、ComfyUI Desktopで最初のハワイ海素材を試す準備をして。
実写真や個人情報は使わない。
大きいモデルダウンロード、外部アップロード、Homebrewインストール前には確認して。
生成物はGitに入れず、ログと採点だけrepoに残して。
```

## トラブル時

### ComfyUIが起動しない

- macOSのプライバシーとセキュリティで許可が必要か見る。
- ComfyUI Desktopを再起動する。
- インスタンスのログを見る。

### ワークフローを開くとノードが足りない

- ComfyUIを更新する。
- ワークフローがDesktop安定版より新しい機能を要求していないか確認する。
- 公式テンプレートから読み直す。

### モデルが見つからない

- ファイルを置いたフォルダが合っているか確認する。
- `models/diffusion_models/`、`models/text_encoders/`、`models/vae/`、`models/clip_vision/` を確認する。
- ComfyUIを再起動する。

### メモリ不足になる

- 解像度を下げる。
- フレーム数を減らす。
- ステップ数を減らす。
- 14Bではなく軽いモデルから試す。
- まず静止画だけで構図を固める。

### MacでFP8エラーが出る

ログに以下のような内容が出る場合がある。

```text
Trying to convert Float8_e4m3fn to the MPS backend but it does not have support for that dtype.
```

これはApple SiliconのMPSでFP8型を扱えない時に出る。MacではFP8量子化モデルやFP8前提のワークフローを避け、fp16/bf16系またはMac対応が明記された軽量ワークフローから試す。Wan系を使う場合も、最初は5B系、低解像度、少ないフレーム数で動作確認する。

実検証ログ:

- `docs/decisions/2026-06-10-wan14b-fp8-mps-test.md`
- `docs/decisions/2026-06-10-wan5b-fp16-mps-test.md`

## 参考リンク

- ComfyUI Desktop macOS: https://docs.comfy.org/installation/desktop/macos
- ComfyUI system requirements: https://docs.comfy.org/installation/system_requirements
- ComfyUI GitHub: https://github.com/comfy-org/comfyui
- ComfyUI Wan2.2 official workflow: https://docs.comfy.org/tutorials/video/wan/wan2_2
- ComfyUI Wan2.1 FLF2V workflow: https://docs.comfy.org/tutorials/video/wan/wan-flf
