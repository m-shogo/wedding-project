# モーション図鑑 — 自分のSceneで試す / Try-on Preview

Date: 2026-08-26
Status: Accepted
Scope: Movie / モーション図鑑 / Scene Composer

## Decision

モーション図鑑のMotionは、図鑑用のデモPreviewだけでなく、対応済みMotionについては現在編集中の自分のSceneへ非破壊で一時適用して試せる。

この機能は「採用」ではなく「試着」。
ユーザーが明示的に採用するまで、Human MasterのSceneInstanceは変更しない。

## User flow

```text
モーション図鑑
↓
MotionのデモPreviewを見る
↓
[ 自分のSceneで試す ]
↓
現在SceneをPreview用Draftへ複製
↓
候補Motionだけ一時適用
↓
自分の写真 / 動画 / テキストでPreview
↓
[ 採用する ] or [ 戻す ]
```

## Non-destructive rule

- Preview中は本SceneInstanceへ書き込まない。
- `HUMAN_SELECTED` / `LOCKED` を試着操作だけで変更しない。
- `採用する` を押した時だけ、対象Propertyを本Sceneへ反映する。
- `戻す` / 閉じる / 別Motionを試す場合、Preview Draftを破棄する。
- Preview DraftはHuman Masterではない。

Conceptual flow:

```text
Current SceneInstance (Human Master)
↓ structured clone / transient draft
Try-on Draft
↓ candidate Motion applied temporarily
Browser Preview
↓ explicit adopt only
Updated SceneInstance
```

## Preview fidelity

Try-on Previewは「選ぶための即時Preview」であり、DaVinci Actualの代替ではない。

### Browser / dashboard Preview

Purpose:
- 速く試す
- 自分の写真・文字との相性を見る
- Motion候補を比較する

Human-readable canonical valuesを可能な範囲で再現する。

Examples:
- Position X / Y
- Scale
- Rotation
- Opacity
- Duration / Delay
- semantic Easing
- supported Mask / Blur / Crop等

### DaVinci Actual

Purpose:
- 最終精度の確認
- Fusion / Text+ / Spline / Motion Blur等の実挙動確認
- Final polish

Browser Previewを `ACTUAL_DAVINCI_RENDER` と誤表示しない。
Preview provenanceを明示する。

## Capability-aware behavior

すべてのMotionが最初からTry-on対応している必要はない。
MotionごとにPreview capabilityを持つ。

Example states:

- `TRY_ON_READY`: 自分のSceneで即時Preview可能
- `DEMO_ONLY`: 図鑑のデモPreviewのみ
- `DAVINCI_ONLY`: DaVinci側でのみ正確に確認可能
- `MISSING`: Preview未整備

UIでは技術用語を前面に出さず、日本語で簡潔に表示する。

Examples:

- 「自分のSceneで試せます」
- 「デモ動画のみ」
- 「DaVinciで最終確認が必要」

## UI principle

Motion card:

```text
下から文字が出る
Mask Reveal

[ Demo Preview ]

[ 自分のSceneで試す ]
☆
```

Try-on view:

```text
自分の写真 / 動画
自分のテキスト

[ Preview ]

候補Motion: 下から文字が出る

[ 採用する ]   [ 戻す ]
```

採用前に保存・export・handoffへ混入させない。

## Relationship to Compare Mode

Compare ModeとTry-on Previewは組み合わせ可能。

```text
A Motion + 自分のScene
B Motion + 自分のScene
↓
同条件で2画面同時Preview
↓
A/Bどちらか採用
```

ただしv1では、まず単一MotionのTry-onを成立させる。
比較は同じ非破壊Draft原則を再利用する。

## Architecture fit

既存のSceneInstance / editableIntent / property-local override構造と整合する。

- SceneInstance = Human Master
- Recipe / Motion = editable default / candidate
- Try-on Draft = transient evaluation state
- Adopt = explicit Human action

AIやPreview操作がHuman Masterを暗黙に上書きしない。

## Non-goals

- 毎回DaVinciを起動して即時レンダリングすること
- Browser PreviewをDaVinci Actualと偽ること
- 未対応Motionを見た目だけで対応済み扱いすること
- Try-onだけでHUMAN_SELECTED / LOCKEDを変更すること
- Try-on DraftをProjectTimelineの正本へ保存すること

## Product principle

> 図鑑ではデモで探す。気になったら自分の素材で試着する。良ければ人間が採用する。

> Previewは候補を選ぶための道具。Human Masterは採用するまで変えない。
