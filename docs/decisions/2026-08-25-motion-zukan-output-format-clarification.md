# モーション図鑑 Output Format Clarification

Status: ACTIVE / MUTABLE / AUTHORITATIVE CLARIFICATION  
Date: 2026-08-25  
Scope: `wedding-project` Movie only

This clarification overrides any older wording that could be read as making JSON / XML / NLE XML / OTIO / `.drt` or another serialization format itself the Human Master.

## Clarification

`JSON` は正本フォーマットではない。

ユーザーが決めるべきものは、ファイル形式ではなく、人間が意味を理解できる演出値である。

例:

```text
位置: 右下
表示開始: 0.6秒
動き: 下から上
強さ: 弱
Scale: 100% → 104%
```

内部では必要に応じて機械可読な構造へ保持してよいが、JSON / XML / OTIO / その他の特定ファイル形式をHuman Masterそのものと扱わない。

## Canonical model

考え方は次の通り。

```text
Human-readable production values
↓
Canonical structured scene state
↓
Target-specific exporter / adapter
↓
各ツールが要求する形式
```

例:

```text
人間の値
Delay = 0.6秒
Position = 右下
Scale = 100 → 104%

↓

DaVinci向け
DaVinciが必要とするtimeline / Fusion / scripting / import形式へ変換

Palmier向け
Palmierが扱える形式へ変換

その他
その媒体が要求する形式へ変換
```

## Important rule

> **入力・編集する値は人間に分かりやすくする。書き出す時に、相手側のフォーマット・単位・座標系へ変換する。**

したがってUIにDaVinci固有の値をそのまま露出させる必要はない。

例:

```text
UI
少し待ってから
↓
Canonical
0.6 sec
↓
DaVinci export
Project FPSに合わせたframe/timeへ変換
```

```text
UI
右下
↓
Canonical
normalized position
↓
DaVinci export
その実装方式が要求するPositionへ変換
```

## Format policy

- JSONを前提に固定しない
- XMLを前提に固定しない
- DaVinciの特定import formatをHuman Masterにしない
- Palmierの特定formatもHuman Masterにしない
- Canonical scene stateは出力先に依存させない
- exporter / adapterが各target formatへの責任を持つ
- 将来formatが変わってもHuman Selected / Locked / Preset / SceneInstanceの意味を壊さない

## Product boundary

モーション図鑑 / Scene Composerは、人間が演出を決める場所。

Exporter / adapterは、その決定を各制作ツールが理解できる形へ翻訳する場所。

最終精密調整はDaVinciで行う。

> **Human-friendly in, tool-native out.**
