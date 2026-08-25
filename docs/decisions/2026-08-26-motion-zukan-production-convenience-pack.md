# モーション図鑑 — 制作便利機能6件の採用

Date: 2026-08-26
Status: Adopted
Scope: Movie / モーション図鑑 / Scene Composer / Project Timeline

## 結論

以下6件をすべて採用する。

1. 曲の構成ガイド
2. Scene複製
3. Undo / Redo・履歴
4. 素材不足表示
5. プロジェクトのバージョン保存
6. 全体デザイン設定

これらはDaVinci Resolveを置き換えるための機能ではない。人が理解しやすいScene単位の制作を速く、安全にし、最終精度調整はDaVinciへ残す。

---

## 1. 曲の構成ガイド

### 目的

曲に合わせてSceneの置き場所を人が判断しやすくする。

### UIイメージ

```text
0:00  Intro
0:12  Aメロ
0:32  盛り上がり
0:48  サビ ★
1:15  間奏
1:32  ラスト
```

Project Timeline上に曲の構成マーカーを表示する。

### 原則

- AIが勝手にSceneを切らない
- AIが勝手にMotionを変更しない
- マーカーは制作補助
- 手動で追加・移動・削除できる
- 将来、拍・強い音・サビ候補等の補助マーカーを扱ってよい
- 音楽解析結果は提案でありHuman Masterではない

### 境界

DaVinci/Fairlightの高度な音声編集や波形編集を再実装しない。

---

## 2. Scene複製

### 目的

完成したSceneの構造を使い回し、写真・動画・文字だけを素早く差し替える。

```text
Scene: 子供時代
↓ 複製
Scene: 学生時代
↓ 写真と文字だけ差し替え
```

### 複製時に保持するもの

- Motion
- Position
- Timing
- Easing
- Opacity
- Color
- Mask / Crop / Blur / Perspective
- Scene尺
- Property Stack

### 複製後に差し替えやすいもの

- 写真
- 動画
- テキスト
- 名前
- 日付
- コメント等のContent Props

### 原則

- 複製先は新しいSceneInstance IDを持つ
- 元Sceneとは独立する
- 元SceneのHUMAN_SELECTED / LOCKEDを壊さない
- 複製後の変更が元Sceneへ逆流しない

---

## 3. Undo / Redo・履歴

### 目的

「さっきの方が良かった」を安全に戻せるようにする。

対象例:

- Transform値変更
- Property-local Override
- Motion変更
- Scene順序変更
- Scene複製・削除
- Text / Media差し替え

### UX

```text
↶ 元に戻す
↷ やり直す
```

詳細履歴は必要時のみ開く。

### 原則

- 通常UIはUndo / Redoだけで簡単にする
- 履歴は人間操作の復元を目的とする
- Previewだけの操作は履歴に積まない
- Try-on PreviewのDraftは本履歴に含めない
- DaVinci内の編集履歴とは別物

---

## 4. 素材不足表示

### 目的

Sceneの完成を邪魔する単純な未入力だけを分かりやすくする。

例:

```text
子供時代Scene
写真1 ✓
写真2 未設定
写真3 ✓
コメント 未設定
```

### 原則

- AI採点ではない
- 映像の良し悪しを判定しない
- 「必要な素材が入っているか」だけ確認
- 未設定項目から直接差し替え操作へ移動できる
- 通しPreviewには分析オーバーレイを出さない

### 状態例

- READY
- MISSING_MEDIA
- MISSING_TEXT
- OPTIONAL_MISSING

必須 / 任意はScene Recipe / My Scene定義側が持つ。

---

## 5. プロジェクトのバージョン保存

### 目的

作品全体を壊さず、別案を試せるようにする。

```text
Opening v1
Opening テンポ速め
Opening 本番候補
```

### 保存対象

- SceneInstances
- ProjectTimeline順序
- SceneEdges
- Project-level Design Settings
- Music guide markers
- 使用素材の参照

### 原則

- バージョンはProject単位
- 元バージョンとは独立して編集可能
- 「保存した瞬間のスナップショット」として扱う
- My Scene Libraryとは別概念
- Gitのversion controlをユーザーに意識させない

### v1で不要

- 複雑なbranch/merge UI
- 差分競合解決UI
- 自動マージ

---

## 6. 全体デザイン設定

### 目的

全Sceneで共通する見た目を一括管理し、毎Scene同じ設定を繰り返さない。

Project-level defaults例:

- 基本フォント
- 基本文字色
- 補助文字色
- Safe Area
- Title系の標準サイズ
- Caption系の標準サイズ
- Opening / ProfileのProject Mode Defaults

### 継承

```text
Project Default
↓
Scene Default
↓
Property-local Override
```

### 原則

- Project設定はDefault
- Sceneで個別上書き可能
- HUMAN_SELECTED / LOCKEDをProject変更で上書きしない
- 既存SceneのHuman Overrideを保護する
- DaVinci Inspectorの複製にはしない

---

## 実装優先順位

### P1 — 実制作で即効性が高い

1. Scene複製
2. Undo / Redo
3. 素材不足表示
4. 全体デザイン設定

### P2 — 全体制作フローを強くする

5. 曲の構成ガイド
6. プロジェクトのバージョン保存

優先順位は実装順の目安であり、6件すべて採用済み。

---

## 既存フローへの統合

```text
モーション図鑑
↓
Motionを探す / 日本語検索 / ★お気に入り
↓
Neutral Preview
↓
自分のSceneでTry-on
↓
2画面Compare
↓
採用
↓
SceneInstance
↓
Scene複製 / 素材確認 / Property-local編集
↓
軽量Scene Timeline
↓
並び替え / 曲の構成ガイド
↓
前後Scene込みPreview
↓
全体通しPreview
↓
気になるSceneへクリックで戻る
↓
Project Version保存
↓
Palmier Rough / DaVinci Final
```

---

## 非目標

- DaVinci Resolveの代替NLE化
- clip/keyframe単位の万能Timeline editor
- AIによる自動採点
- AIによる無断の自動修正
- 音楽に合わせた完全自動編集
- SceneのHuman Masterを裏で変更

中心思想は維持する。

> AIが作ったものを人が直すのではなく、人が直せる構造をAIが組み立てる。

> 普段は選ぶだけ。必要な時だけ細かく触る。
