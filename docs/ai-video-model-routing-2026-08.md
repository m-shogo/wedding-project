# AI動画モデル調査メモ / 2026-08

更新基準日: 2026-08-07

この文書は `docs/ai-video-operation.md` のモデル選択根拠を残すための調査メモ。
仕様は変化が速いので、ここにモデル名を永久固定しない。

## 結論

結婚式ムービーでは「最強モデルを1つ決める」より、次の4段階に分ける。

1. 静止画・ショット設計を確定する。
2. 低コストモデルで動きだけ比較する。
3. 採用候補だけ高品質モデルで仕上げる。
4. CapCut実尺と前後ショットで最終判断する。

標準入口は Seedance 2.0 Mini、参照制御は Seedance 2.0、自然なI2Vの仕上げは Runway Gen-4.5、First/Last Frameや物理感の比較は Veo 3.1 とする。
Seedance 2.5は最新追跡対象だが、提供状況・仕様が変動中なので標準経路へ固定しない。
Soraは新規基盤から外す。

## Official: Runway Gen-4.5

確認したこと:

- Gen-4.5はText to Video / Image to Videoを提供。
- I2Vでは入力画像が構図・被写体・光・スタイルを与えるため、テキストは主に動き・カメラ・時間変化を書くのが公式推奨。
- 2〜10秒。
- RunwayはWorkflowsというノード型の自動化・スケール用制作機能も提供。

制作への反映:

- I2Vで画像の説明を繰り返さない。
- 「cinematic」語彙を足すより、動き・加減速・カメラを具体化する。
- 5秒前後の仕上げ候補に使う。

Sources:

- https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide
- https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5
- https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video

## Official: Seedance 2.0 / 2.0 Fast / Mini

確認したこと:

- Runway API上のSeedance 2.0はText/Image/Video to Video、keyframe、reference image/video、generated audioをサポート。
- Seedance 2.0 Fastも同様の参照系機能を持ち、4〜15秒。
- CapCut / DreaminaはSeedance 2.0 Miniを低コスト・高速反復向けとして案内。
- Dreaminaでは複数参照を使うワークフローが強調されている。

制作への反映:

- Miniは量産試作。
- 参照素材は枚数より役割を明示する。
- `composition / camera motion / color mood` のように参照責務を分離する。

Sources:

- https://docs.dev.runwayml.com/api-details/api_changelog/
- https://help.runwayml.com/hc/en-us/articles/50488490233363-Creating-with-Seedance-2-0
- https://www.capcut.com/tools/dreamina-seedance-2-0-mini
- https://www.capcut.com/newsroom/dreamina-seedance-2

## Official: Seedance 2.5

確認したこと:

Dreamina公式ページはSeedance 2.5を最新モデルとして案内し、30秒、より多いマルチモーダル参照、R2V、局所編集などを掲げている。一方でページ内に `coming soon` 表記もあり、地域・アカウント・UIによる利用可否が変動している可能性がある。

制作への反映:

- `preview tracking` 扱い。
- 利用可能であっても、長尺生成そのものを目的にしない。
- 結婚式では短い使えるカットを作ることを優先する。
- ローカル修正が利用できる場合は「全再生成」より部分修正を優先する。

Sources:

- https://dreamina.capcut.com/seedance/seedance-2-5
- https://dreamina.capcut.com/seedance

## Official: Google Veo 3.1

確認したこと:

- Veo 3.1はGoogleの最新動画生成モデルとして案内されている。
- Text to Video / Image to Video / first-last frame、動画延長、参照画像に対応する構成がある。
- FlowではIngredients to Video / Frames to Video / Extendなど、参照と編集を組み合わせる制作思想が強化されている。

制作への反映:

- first/last frameが決まっているショットの比較候補。
- 実写寄りの物理感・連続性を優先する場面で使う。
- 音声生成は必須にせず、BGMや重要音は編集側へ残す。

Sources:

- https://deepmind.google/models/veo/
- https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate
- https://blog.google/innovation-and-ai/products/veo-updates-flow/

## Official: OpenAI Sora

確認したこと:

- Sora Web/Appは2026-04-26に提供終了。
- Sora APIは2026-09-24終了予定。

制作への反映:

- 新規制作基盤をSoraへ依存させない。
- 既存のSora素材・学びだけ参照し、モデルルーティングの中心から外す。

Sources:

- https://help.openai.com/ja-jp/articles/20001152-what-to-know-about-the-sora-discontinuation
- https://openai.com/index/sora-is-here/

## SNS / Communityで拾った実務的な仮説

SNS・Redditは仕様の正本ではない。以下は公式情報と分離し、再現性を自分たちの素材で確認してから採用する。

### 仮説1: 「完璧な映画感」を盛りすぎるとAIっぽくなる

2026年のコミュニティ投稿では、perfect framing / dramatic cinematic movementを盛るより、locked camera、観察的なフレーミング、少しの実カメラらしい不完全さを入れた方が実写らしく見えた、という報告がある。

採用する部分:

- restrained framing
- slight real-camera imperfection
- realistic exposure response
- natural acceleration/deceleration

そのまま採用しない部分:

- 特定の放送ノイズや圧縮劣化を全ショットへ入れること。
- `cinematic`を全面禁止すること。

### 仮説2: B-rollは「静止画選定 → I2V → QC」の方が自動化しやすい

編集者・自動化系コミュニティでは、スクリプトから直接動画を一発生成するより、先にstrong stillを選び、その後I2Vし、重要テキストは編集側で載せるフローが現実的という議論が複数ある。

このプロジェクトの既存方針と一致するため採用。

### 仮説3: 同一プロンプトのモデル比較が有効

同一B-roll意図を複数モデルへ投げ、見た目よりdeliverableかどうかを比較する運用報告がある。

このプロジェクトでは完全な同文コピーではなく、**同じショット意図をモデル別コンパイラで翻訳**して比較する。

Community references:

- Reddit: r/Bard / r/Seedance_AI の「broadcast imperfection」議論 (2026-06)
- Reddit: r/generativeAI / r/AiAutomations のB-roll workflow議論 (2026-06)
- Reddit: r/AIToolTesting のVeo / Seedance / Sora比較運用 (2026-02)

## AIっぽさの評価軸

生成品質そのものとは別に、次を採点する。

- 前後の実写と比べてカメラが完璧すぎないか。
- 光・影・反射が時間方向に自然か。
- 被写体や背景に現実的な慣性があるか。
- 構図が勝手にセンターへ吸い寄せられていないか。
- 不要な粒子・フレア・発光が追加されていないか。
- 直線や建築形状が呼吸するように変形していないか。
- 生成映像だけ過剰にシャープ/ツルツルになっていないか。
- 3〜5秒の編集素材として切り出せる安定区間があるか。

## 更新ルール

- 公式仕様変更: このファイルを更新。
- SNSの新テクニック: まず仮説として追記し、採用条件を書く。
- 3回以上再現できた改善: `docs/failure-patterns.md` または `docs/ai-video-operation.md` へ昇格。
- 1回だけ効いた呪文: 正本へ昇格しない。
