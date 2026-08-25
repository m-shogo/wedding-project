# モーション図鑑 — Scene単位の並び替え

## 結論

通しPreview下の軽量Scene Timelineでは、Scene単位のドラッグ＆ドロップ並び替えを許可する。

これはDaVinciのようなクリップ編集ではなく、完成済みSceneの順序変更だけを対象にする。

## UX

例:

```text
01 出会い
02 ハワイ
03 沖縄
04 結婚
```

をドラッグして、

```text
01 出会い
02 沖縄
03 ハワイ
04 結婚
```

へ変更できる。

## ルール

- 操作単位はSceneのみ。
- Scene内部のLayer / Motion / Clip / Keyframeはここでは編集しない。
- 並び替え後はProjectTimelineのsceneIds / placements / edgesを再計算する。
- SceneInstance本体のHuman Master値は変更しない。
- HUMAN_SELECTED / LOCKEDは変更しない。
- Preview中に並び替えても、各Sceneの中身を自動補正しない。
- Scene間TransitionはSceneEdgeの既存方針に従う。
- Undo/Redoは将来実装可能だが、v1の必須条件ではない。

## 位置づけ

```text
モーション図鑑で選ぶ
→ Try-on
→ 採用
→ Context Preview
→ 全体通しPreview
→ Scene Timelineで順番調整
→ 必要なSceneへ戻って編集
```

Scene Timelineは「作品全体の構成を軽く整える場所」であり、NLEを再実装する場所ではない。
