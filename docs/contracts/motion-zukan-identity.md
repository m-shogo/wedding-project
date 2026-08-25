# モーション図鑑 — Project Identity Contract

Status: **ACTIVE / MUTABLE**  
Scope: reusable Movie / Motion knowledge and production tooling  
Repository today: `m-shogo/wedding-project`  
First production collection: Wedding Movie 2026

## Canonical name

この長期プロジェクトの正式な日本語名は、

> **モーション図鑑**

とする。

「Wedding Motion Library」のように結婚式だけへ閉じた名称にはしない。
2026年のWedding Movieは最初の実践Collection / Projectであり、モーション図鑑そのものは今後の動画制作でも再利用・蓄積していく。

## What this name means

モーション図鑑は単なる動画素材置き場でも、文章だけの用語辞典でも、DaVinci Resolveの代替NLEでもない。

目的は、動画制作で使う知識と実装を、人間が見て・理解して・選んで・編集して・再利用できる形で蓄積すること。

蓄積対象には必要に応じて次を含む。

- Motion Pattern
- Neutral Motion Preview
- Actual Preview / provenance
- Scene Recipe
- Scene Instance
- Project Timeline usage
- Typography motion
- Photo / Video motion
- Camera motion
- Transition
- Rhythm / pacing
- Editorial / travel / emotional direction
- DaVinci Resolve / Text+ / Fusion implementation
- Palmier rough-edit / handoff knowledge
- Prompt / Claude / Codex instruction
- Before / After and comparison evidence
- Learning notes / terminology
- Reuse source / external implementation / license metadata
- Production failures and verified fixes

## Product hierarchy

`モーション図鑑` は上位のプロジェクト名であり、既存の内部機能名をすべて同義語として潰さない。

```text
モーション図鑑
├─ Visual Motion Library
│  └─ 動きを見て探す / 比較する / Patternを選ぶ
├─ Scene Recipe Library
│  └─ Motionを実用的なScene構成として再利用する
├─ Scene Composer
│  └─ Text / Media / Timing / Position / Motionを人間が編集する
├─ Project Timeline
│  └─ 採用したSceneInstanceを積み上げる
├─ Learning
│  └─ Vocabulary / DaVinci / Fusion / editing knowledge
└─ Production Handoff
   └─ Human / Claude / Palmier / DaVinci / machine-readable outputs
```

つまり、`Visual Motion Library` はモーション図鑑の「見て探す機能」であって、プロジェクト全体の正式名称ではない。

## Human authority

モーション図鑑は `docs/contracts/human-readable-editable-movie-contract.md` を親契約として扱う。

最重要原則:

> **AIが作った結果を人間が頑張って修正するのではなく、人間が理解・部分修正できる構造をAIが埋める。**

人間が編集できるSource of Truthを保持し、`HUMAN_SELECTED` / `LOCKED` をAI・Claude・Codex・Palmier・自動処理が黙って上書きしない。

## Long-term scope

今後、Wedding以外の用途を追加してよい。

例:

- Wedding
- Travel
- Vlog
- YouTube
- SNS / Short
- Commercial
- Documentary
- Short Film
- Web / Product video

ただし用途別に同じMotionを重複コピーするのではなく、共通Patternを再利用し、用途ごとの差はScene Recipe / defaults / Project Mappingで表現する。

## Naming / migration rule

既存コードには `Visual Motion Library`、`Motion Kit`、`Director Recipes` 等の名称やIDがすでに存在する。

**この正式名称を登録するためだけに一括rename・一括migrationしない。**

- 既存ID / path / data contractは破壊しない
- 今後触るUI・docsから徐々に「モーション図鑑」の文脈を追加する
- 内部技術名が必要な場所では既存英語名を維持してよい
- 人間向けトップレベル表示では「モーション図鑑」を優先する
- 変更理由のない大量rename PRを作らない

## Current first proof

現在の最初のVertical Sliceは `type-mask-reveal`。

Mask Revealでまず以下を証明する。

`見て探す → 人間が編集 → Sceneとして採用 → Palmier Rough → real NLE XML → DaVinci Actual → QA → 再編集可能な状態を残す`

Actual MP4が出来ただけでは図鑑項目の完成とはしない。

## Mutable evolution

ユーザーは現在もモーション図鑑のブラッシュアップ案を検討中。

このdocumentは完成仕様ではなく、今後の発見・実制作・ユーザー判断に応じて更新する。

ただし新しい案を追加する際も、既存制作を一括でやり直さず、現在触っているVertical Sliceから小さく検証する。
