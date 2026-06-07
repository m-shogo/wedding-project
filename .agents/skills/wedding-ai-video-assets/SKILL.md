---
name: wedding-ai-video-assets
description: Runway、Pika、Luma、Kling、Hailuo、Wan、Hunyuan、ComfyUI向けに結婚式用AI背景素材の候補、評価、プロンプトを作るときに使う。
---

# Wedding AI Video Assets

## 目的

クレジット消費を抑えながら、結婚式ムービーに使える3-5秒の背景・つなぎ素材を作る。

## 手順

1. `docs/02_style-bible.md`、`docs/04_ai-video-assets.md`、`docs/ai-video-operation.md`、`docs/failure-patterns.md` を読む。
2. 必要な素材を章ごとに洗い出す。
3. 静止画で成立する構図を先に作る。
4. `docs/templates/ai-video-scorecard.csv` の観点で、奥行き、光、ループ性、テロップ余白、破綻リスクを評価する。
5. 80点以上の候補だけ動画AIに進める。
6. 本番生成前にローカル試作や低コスト試作を優先する。

## プロンプトルール

- 3-5秒
- slow smooth camera movement
- clean composition
- space for captions
- no text
- no logo
- no watermark
- no people
- no animals
- no signage
