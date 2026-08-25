# モーション図鑑: 採用後のContext Preview方針

## 決定

採用前と採用後でPreviewの役割を分ける。

### 採用前
- Motion単体Preview
- 自分のSceneでTry-on Preview
- Compare Mode

### 採用後
- タイムライン上で前後Scene込みのContext Preview
- 目安は前1〜2Scene / 現在Scene / 次1〜2Scene

### 仕上げ
- Opening全体の通しPreview
- Profile全体の通しPreview

## Context PreviewのUI原則

Context Previewは**再生だけ**にする。

表示しないもの:
- AIによる良し悪し判定
- 「同じ方向が続いています」等の警告
- Motion Budget表示
- 自動修正提案
- リズム採点
- 方向・速度・強度の分析オーバーレイ

目的は、映像を前後の流れとして人間が見て判断すること。

```text
Motionを選ぶ
↓
自分のSceneで試す
↓
採用
↓
タイムラインへ入る
↓
前後込みで再生
↓
必要ならSceneへ戻って修正
↓
全体通しPreview
```

## 設計意図

単体で良いMotionでも、連続したSceneとして見るとテンポや方向感が合わないことがある。
ただし、その判断をAIに委ねず、人間が実際の映像を見て行う。

そのためContext Previewは「診断画面」ではなく、純粋な再生ビューとして扱う。

## Human Master保護

- Context Previewを開始してもSceneInstanceを変更しない
- 再生だけでHUMAN_SELECTED / LOCKEDを書き換えない
- Preview中に自動補正しない
- 修正は明示的にScene編集へ戻って行う

## Product flow

```text
図鑑Preview
→ Try-on Preview
→ 2画面比較
→ 採用
→ Context Preview
→ 全体通しPreview
→ DaVinci Final
```

この順序で、選択・試着・採用・流れ確認・全体確認を分離する。
