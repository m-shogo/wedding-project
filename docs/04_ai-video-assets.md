# AI動画素材計画

## 基本

AIで本編を作らない。AIで作るのは、編集で使い回せる短尺素材。

```text
3-5秒素材
↓
CapCut / DaVinci で繰り返し・速度調整
↓
複数ムービーに再利用
```

## 作る素材

- 飛行機窓
- 雲海
- 世界地図
- 空港
- 滑走路
- ハワイの海
- 夜景
- 光演出
- 扉の光
- 波
- 粒子
- 抽象背景

## 作らない素材

- 新郎新婦
- 犬
- 家族
- 友人
- 実在の看板や文字が主役の映像

## 生成フロー

1. 参考映像を集める。
2. 欲しい5秒を言語化する。
3. 静止画を作る。
4. `docs/templates/ai-video-scorecard.csv` で動画化適性を評価する。
5. ローカルで試作する。
6. 採用候補だけ本番動画AIへ投げる。
7. 採用素材だけ残す。

## 動画化適性チェック

- 奥行きがある
- 光源がある
- カメラ移動の余地がある
- ループできる
- テロップ余白がある
- AI破綻リスクが低い
- Style Bibleに合っている

詳細手順:

- `docs/ai-video-operation.md`
- `docs/failure-patterns.md`

## プロンプトの型

```text
A cinematic 5-second looping background shot of [subject],
travel wedding film style, navy gold white color palette,
soft morning light, subtle film grain, elegant and emotional,
slow smooth camera movement, clean composition, space for captions,
no text, no logo, no watermark, no people, no animals, no signage.
```
