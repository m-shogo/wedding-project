# 2026-06-11 motion-studio新設の判断

## 決めたこと

- Remotion製のモーション素材生成アプリを `motion-studio/` としてこのrepo直下に新設した。
- 別repo(`wedding-motion-studio`)案は不採用。
- 自作Editor UI(Timeline/Inspector/SceneSelector)は作らない。Remotion Studio + Zodスキーマで代替する。

## 理由

- このrepoはCLAUDE.md、Style Bible、品質ゲート、decisionsを持つ「AIに文脈を渡すrepo」。別repoにするとAIセッションが文脈を失い、二重管理になる。
- 式は2026-10-24で終わる有限プロジェクト。「将来の拡張性」のための分離は過剰。
- repo間の `out/ → rendered_assets/` コピー工程が不要になる。CapCutは `motion-studio/out/` を直接読む。
- Remotion StudioはZodスキーマからprops編集UIを自動生成し、「Save defaults」でソースに保存できる。自作Editorは工数の無駄。

## コンセプト

- MEMORY FLIGHT 1024 / 便名SS1024 (Shogo/Shiori + 10月24日)
- ルート: Narita → Okinawa → Seoul → Hawaii → Yokohama
- 文字・数字・地図・ハンコ・カウントダウンはRemotionで描く。AI素材に文字を入れない。

## 未決事項

- 既存storyboard(105秒、JPN→HNL 1区間)と新ルート(4区間)の整合。
  推奨案: 沖縄・韓国はスタンプ連打で省略し、ハワイだけフル演出。要判断。
- 搭乗券のvariant(ivory/navy)。デフォルトはivory(ネイビー背景に映えるため)。
- CapCutでのVP9透過WebM読み込み可否(Phase 0実機テスト待ち)。
  代替1: ProRes 4444 MOV (`pnpm render:stamp-test:prores`)
  代替2: 雲・光系は黒背景MP4 + Screenブレンド(暗色ハンコは透過必須)

## 技術メモ

- Remotion 4.0.475 / React 19 / pnpm。MacローカルでレンダリングするためAIサービスへのアップロードなし。
- 透過はVP9 (`--pixel-format=yuva420p --image-format=png`)で書き出し、ffprobeで `alpha_mode=1` とアルファ値0〜255を確認済み。
- フォントはCormorant Garamond (OFL)。
- 写真は `public/photos/`(Git管理外)、`src/data/memories.ts` で差し替え。
