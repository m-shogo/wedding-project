# AI動画 生成ガイダンス根拠ログ — 2026-08-07

更新基準日: 2026-08-07

この文書は `movie-dashboard` の動画Prompt / 生成キュー / 結果レビュー / 失敗学習で使うルールの根拠を残す。
モデル名・UI・料金・尺・入力方式は変化が速いため、**公式情報 > 実測 > コミュニティ知見** の順で扱い、コミュニティ情報だけで固定仕様を実装しない。

## Evidence tiers

- **Tier A — 公式**: provider公式Help / Docs。Prompt compilerへ直接反映してよい。
- **Tier B — プロジェクト実測**: wedding-projectで実際に生成・目視した結果。失敗taxonomy / routingへ反映してよい。
- **Tier C — community / SNS**: Reddit等の再現報告。仮説・実験候補としてのみ採用し、固定仕様にはしない。

## Runway Gen-4.5 — Tier A

### Sources

- Creating with Gen-4.5
  - https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5
- Image to Video Prompting Guide
  - https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide
- Introduction to Prompting
  - https://help.runwayml.com/hc/en-us/articles/47313698911891-Introduction-to-Prompting
- Camera Terms, Prompts, & Examples
  - https://help.runwayml.com/hc/en-us/articles/46749315925395-Camera-Terms-Prompts-Examples

### Implemented learnings

1. I2Vでは入力画像が構図・被写体・照明・スタイルを担うため、本文は **motion / camera / temporal progression** を中心にする。
2. Promptは最初から盛らず、簡潔な基礎Promptから1要素ずつ追加してiterationする。
3. negative phrasingをモデル本文へ入れず、肯定文で維持したい状態を書く。
4. Gen-4.5の現行ガイド上の直接生成はT2V / I2V中心。first/last frame用途はPalmier側の対応生成やKeyframe系機能へrouteする。
5. 現行公式仕様として2〜10秒を扱う。

### wedding-project implementation

- `videoPromptBuilder.ts`
  - Runway Prompt本文をpositive-only方向へ変更。
  - `negativePrompt`は `QA ONLY — DO NOT SEND ...` と明示。
  - no / avoid / without等を入力するとwarning。
  - first-last + Runwayはrouting warning。

## Palmier — Tier A

### Source

- Palmier Docs
  - https://www.palmier.io/docs

### Implemented / planned learnings

1. timeline上でfirst / last frameを使った生成が可能。
2. reference imagesを使ってlook / subject / frame consistencyを補助できる。
3. AI生成clipはPromptや参照情報を保持したままvariation / rerunできる。
4. MCP経由でagentがproject contextを読み、生成・配置・trim / split / reorder等を扱える。
5. generationは有料creditを使うため、ChatGPT側では勝手に有料生成を発火せず、人間が意図して実行する境界を維持する。

### wedding-project policy

- Prompt作成 / queue / result intake / QA / retryはmovie-dashboardを正本にする。
- Palmierは10秒/30秒/90秒のtimeline試作・比較・編集コンテキストとして使う。
- first-lastが必要なshotはPalmierを優先route候補とする。
- Palmierで得た失敗理由・採用結果はmovie-dashboardへ戻す。

## Seedance — Tier B + Tier C

2026-08-07時点の検索では、Runwayのように今回のPrompt規則を固定できる十分な公式Prompt文書を確認できなかったため、固定仕様化しない。

### Community evidence

- Reddit / r/seedance: “After generating hundreds of Seedance videos...” (2026-07)
  - 長いcinematic prompt essayより、Subject / Scene / Motion / Cameraを簡潔に構造化した方が安定したという実利用報告。
- Reddit / PromptEngineering: Seedance prompt library discussion
  - camera language / scene consistency / one-take patternsを比較しやすいというコミュニティ知見。

### wedding-project policy

- 上記は **仮説** として採用。
- I2Vは参照画像を正本にし、Promptを短くする。
- 1 shot = 1 primary action + 1 camera intent。
- Miniで低コスト比較 → QA → finish model。
- UI上のモデル名・尺・価格・reference機能は生成直前に確認する。

## Cross-model community signal — Tier C

複数の2026年コミュニティ投稿で共通するのは、単一モデルへ長尺全体を任せるより、

1. storyboard / shot plan
2. 強い静止画またはreference
3. I2Vで短尺化
4. shotごとのQC
5. compositor / NLEで文字・caption・motion graphics

の分業が実制作で安定しやすいという点。

これは wedding-project の現行設計、

```text
Storyboard
→ preset / shot intent
→ model-specific prompt
→ generation queue
→ result intake
→ human QA
→ bounded retry
→ Palmier / CapCut real-duration edit
```

と整合するため、継続する。

## 更新ルール

- provider公式ガイドを確認した日を `guidance-checked=` としてPrompt notesへ残す。
- 仕様値は出典が公式でない場合、UI上でhard validationしない。
- SNS / Redditは「面白いPrompt」をそのまま輸入せず、再現可能な短いルールに分解して小さく試す。
- 同じ失敗を2回以上観測したら `AI動画 失敗学習` で原因カテゴリを確認。
- 同系統retry 3回で停止し、Prompt以外の入力条件を変更する。
