# Director Recipe Catalog 設計方針

日付: 2026-08-25
状態: Phase A 実装（データモデル + 研究ドキュメント）完了。Phase B以降（Remotion共有レンダラー、Movie Dashboard UI、Palmier/DaVinci連携、A/Bフレームワーク）は別セッションへ引き継ぐ。
関連: `movie-dashboard/src/data/directorRecipeCatalog.ts`, `movie-dashboard/scripts/verify-director-recipe-catalog-contracts.mjs`, `docs/handoff/START-EXTENDED-MOTION-HANDOFF-2026-08-24.md`

## 目的

StaRt Extended Opening（Mrs. GREEN APPLE「StaRt」候補、Phase 5以降で全体尺確定）の演出設計を、
36個のMotion Kitプリセット（実装単位）とは別のレイヤーとして、**編集判断の語彙（レシピ）**として整理する。

Motion Kitが「どう動かすか（実装コンポーネント）」を持つのに対し、
Director Recipe Catalogは「いつ・なぜ・どう組み合わせるか（編集判断）」を持つ。

```text
Director Recipe Catalog（編集判断・語彙・カテゴリ）
        ↓ motionPresetIds で紐付け
Motion Kit（36 preset、実装可能な最小単位）
        ↓ Phase B以降
Remotion 共有レンダラー
```

## データモデルの設計判断

### recipeとpresetを分離した理由

Motion Kitの36 presetは実装可能な最小単位（コンポーネント寄り）。
一方、実際の編集判断は「このセクションでは何を優先し、何を避けるか」という
もっと大きな粒度で行われる。1つのrecipeは複数presetを組み合わせて成立することが多い
（例: `start-triple-hit` は `accent-stamp-triplet` + `wipe-route-line` + `accent-speed-lines`）。

recipeを新規80〜100件追加したが、**新規に80個の独立Remotionコンポーネントを作る計画ではない**。
`motionPresetIds` は既存36 presetのIDのみを参照し、contractスクリプトで機械的に検証する。

### カテゴリ設計（10カテゴリ、各9件+StaRt固有16件=97件）

| カテゴリ | 件数 | 狙い |
|---|---:|---|
| CINEMATIC_CAMERA | 9 | カメラの動かし方・動かさなさの規律 |
| PHOTO_PRESENTATION | 9 | 写真そのものの見せ方（枠・余白・階層） |
| TYPOGRAPHY | 9 | 文字演出の型 |
| ANIME_OP_GRAMMAR | 9 | アニメOP的な編集「文法」（特定作品の模倣は禁止） |
| CUT_TRANSITION | 9 | カット・トランジションの優先順位 |
| RHYTHM_MUSIC_HIT | 9 | 95/190 BPMグリッドと3-hitの基礎設計 |
| TRAVEL | 9 | 旅行モチーフ（地図・スタンプ・搭乗券） |
| EDITORIAL_CM | 9 | 雑誌編集・CM文法（テンプレ感の解毒剤） |
| WEDDING_EMOTION | 9 | 結婚式固有の感情ビート |
| START_SPECIFIC | 16 | StaRtの14セクションへ直接紐付けた具体設計 |

合計97件（80〜100件の範囲内）。カテゴリ数・件数・重複なしはcontractスクリプトで機械検証する。

### `status` は常に `planned`

- 全レシピの `status: "planned"` を固定。`approved` / `reviewed` を初期値として一切含めない。
- `verify-director-recipe-catalog-contracts.mjs` が `status: "approved"` / `status: "reviewed"` の
  文字列出現を検知したら即失敗するようにしている（AIによる勝手な承認を防ぐ機械的な歯止め）。
- Motion Kit (`startMotionPresets`) の `status` 運用と同じ思想を踏襲した。

### AIっぽさ・過剰編集リスクのフィールド化

`aiTemplateRisk` と `overEditingRisk` を全レシピ必須フィールドにした。
これは「作れるかどうか」ではなく「使いすぎたときに何が起きるか」を
レシピ自体に埋め込むための設計判断。特にANIME_OP_GRAMMARカテゴリと
RHYTHM_MUSIC_HITの3-hit系は `overEditingRisk: "高"` を明記し、
使用回数の上限をrecipeのavoidWhenへ具体的に書いた
（例: 「3-hitごとにfull-screen flash/shake/cutを行う」を明示的に禁止）。

## 3-hitポリシー（優先案の明記）

タスク指示の通り、「写真を3回切る」ではなく「Hero写真を維持したまま
graphic hitを3回打つ」を優先案として明記した。

- `rhythm-three-hit`（RHYTHM_MUSIC_HIT）: 基礎設計としてstamp→line→route dotの3-hitを定義
- `start-triple-hit`（START_SPECIFIC）: 1番サビB（chorus-1-b, 48-58s）向けの具体実装
- `start-second-triple-hit`（START_SPECIFIC）: 2番サビB（chorus-2-b, 98-108s）向け。
  1回目より「10〜20%だけ強い」という発展の度合いまで明記
- `start-three-hit-motif-rotation`（START_SPECIFIC）: 1番と2番でモチーフの順序を変える設計補助

いずれも `motionPresetIds` に `photo-static-hero` 系は含めず、写真は固定したまま
`accent-stamp-triplet` / `wipe-route-line` / `accent-speed-lines` などのgraphic presetだけを
組み合わせる設計にしてある。

## StaRt固有レシピ（16件）とセクション対応

`START_SPECIFIC` の16件は、14セクションのうち特に設計判断が必要な区間に対応させた
（一部セクションは複数レシピ、`start-anti-overwhelm-guard` は全セクション横断）。

| レシピID | 対応セクション |
|---|---|
| `start-curtain-open` | opening-pickup |
| `start-intro-ticket-lift` | intro |
| `start-1a-photo-read` | verse-1-a |
| `start-1b-anticipation-build` | verse-1-b |
| `start-chorus-hero-lift` | chorus-1-a |
| `start-triple-hit` | chorus-1-b |
| `start-interlude-breath` | interlude-1 |
| `start-verse2-panel-update` | verse-2-a |
| `start-verse2-playful-crop` | verse-2-b |
| `start-second-chorus-hero-b` | chorus-2-a |
| `start-second-triple-hit` | chorus-2-b |
| `start-travel-recap` | post-chorus-interlude-a |
| `start-rising-toward-yokohama` | post-chorus-interlude-b |
| `start-final-name-date` | end-before-c-section |
| `start-three-hit-motif-rotation` | chorus-1-b, chorus-2-b（横断） |
| `start-anti-overwhelm-guard` | 全14セクション（横断・安全弁） |

`start-anti-overwhelm-guard` は唯一「演出を足す」のではなく「演出量に歯止めをかける」レシピとして
意図的に加えた。Style Bibleの最終判断基準（二人の実素材を強くするか／記憶として自然か／
数年後に見て恥ずかしくないか／AI・テンプレを感じさせないか）を編集の型として埋め込む。

## Anime-OP Grammarの扱い（模倣禁止の明記）

`ANIME_OP_GRAMMAR` カテゴリの全レシピに以下を徹底した。

- レシピ名・subCategoryは「Speed Line」「Impact Frame」「Panel Grid」等、
  **一般的な編集技法名**にとどめ、特定作品名・キャラクター名を一切使わない。
- `avoidWhen` に「特定作品の識別可能な意匠を模倣する時（禁止）」を複数レシピで明記。
- `aiTemplateRisk` / `overEditingRisk` を他カテゴリより高めに設定し、
  常用ではなく限定使用であることをフィールドレベルで示した。
- `start-anti-overwhelm-guard` により、anime-OP系レシピの使用が
  実写真主体（Style Bibleの8割目安）を上回らないようにする安全弁を別途用意した。

## 検証（contract）の設計

`verify-director-recipe-catalog-contracts.mjs` は以下を機械検証する。

1. レシピ数が80〜100件の範囲内
2. `id` の重複なし
3. 10カテゴリすべてが1件以上存在
4. `START_SPECIFIC` が15件以上
5. `status: "approved"` / `status: "reviewed"` が初期データに存在しない
6. `motionPresetIds` が実在する36 preset ID（`startMotionKit.ts`）のみを参照している
7. `recommendedStaRtSections` が実在する14 section ID（`startExtendedRhythmMap.ts`）のみを参照している
8. Palmier handoff builder (`buildPalmierRecipeHandoff`) に
   「Do not generate or transform identity」「Do not auto-approve」の安全文言が含まれる
9. `aiTemplateRisk` / `overEditingRisk` が空文字のレシピが存在しない

`movie-dashboard/package.json` の `check:movie-coach` チェーンへ
`check:director-recipe-catalog` を追加し、既存CI (`movie-dashboard-ci.yml`) の
`pnpm check:movie-coach` 実行に自動で含まれるようにした。

## Phase Bへの引き継ぎ事項

- 共有レンダラーは「typography-reveal / camera-transform / transition-wipe / graphic-hit」の
  4エンジン（`startMotionKit.ts` の `SharedMotionEngine`）を基礎にする想定。
  Director Recipeはpreset単位で `motionPresetIds` を持つため、
  共有レンダラー実装時にpreset→engineのマッピングをそのまま利用できる。
- Movie Dashboard UI（Phase D）では、Motion Kit Catalogページ（`StartMotionKitCatalog.tsx`）と
  同様のフィルタ・Palmier handoffコピー機能をDirector Recipe Catalogにも実装することを想定しているが、
  今回のPhase Aではページ・ルート・サイドバーへの追加は行っていない
  （データとcontractのみ。UIは意図的に対象外）。
- `buildPalmierRecipeHandoff` はテキスト生成関数として既に実装済みなので、
  Phase C（Palmier Handoff）はこの関数の出力をそのままハンドオフテキストとして使える。
- Phase G（A/Bフレームワーク）では、同一StaRtセクションに対して
  `getDirectorRecipesBySection` で候補レシピを列挙し、Claude Code版とCodex版で
  異なるレシピ選択をした場合の比較に使える設計にしてある。

## やらなかったこと（意図的なスコープ外）

- Remotionコンポーネントの実装（Phase B）
- Movie Dashboard UIページ・ルーティング（Phase D）
- Palmier/DaVinci連携ファイルの実生成（Phase F）
- A/Bフレームワークの実装（Phase G）
- 歌詞全文・著作権音源・AI生成人物の使用（プロジェクト全体の絶対禁止事項）
