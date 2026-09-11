# モーション図鑑 — Human-first Curation / Opening S Picks

Status: ACTIVE / MUTABLE

## Purpose

2026-10-24の結婚式Opening制作を最優先し、モーション図鑑を「名前を知らなくても、実物を見て『これ』と言える」入口にする。

図鑑は技術仕様書を最初に見せない。入口では **実物Preview → 日本語名 → 見た目の一言 → 今回のOP適性** の順に理解できることを優先する。

Opening authority、Human-Readable / Human-Editable Movie Contract、Motion Zukan Product Principlesを上位authorityとし、この文書はS選定と表面UXの編集基準を補助する。

## S badge

`S` は一般人気、テンプレートの売上、実装完成度、技術的な高度さを表さない。

`S` は「現在の結婚式Openingに、編集者として特に使いたい」と判断した少数の演出だけに付ける。

判定軸:

1. 実写真・実動画を主役のまま残せる。
2. documentary / travel film / editorial film の現在方向と衝突しない。
3. StaRtの明るさ・推進感・アクセントへ自然に合わせられる。
4. 旅行テーマを装飾記号の足し算ではなく、移動・視線・場面接続として表現できる。
5. Wedding template感、AI生成感、過剰なVFX感を主役にしない。
6. 1回見て意味が分かり、ゲストの視聴を邪魔しない。
7. DaVinci Resolveで人間が再現・微調整できる。

Sは乱発しない。目安として一覧の10〜20%以内を維持し、より強い候補が見つかれば入れ替える。

### Current S candidates

- `type-mask-reveal` — ★★★★★ — 冒頭タイトル / 名前 / 地名
- `cut-match-shape` — ★★★★★ — 旅行先切替 / 写真→動画
- `photo-small-push` — ★★★★★ — 思い出写真 / 人物写真 / 余韻
- `photo-directional-pan` — ★★★★☆ — 横長写真 / 視線誘導 / 移動感

この4件は固定仕様ではない。外部実例、実素材、StaRt本番編集との相性を見て更新する。

## 3-second card hierarchy

カードを開いた直後に見せる情報は以下だけでよい。

1. 実物Preview
2. `S`（該当時のみ）
3. 日本語名
4. 見た目を一言で説明
5. 一般名 / English name
6. OPおすすめ度
7. 自作難易度
8. 向いている場面

次の情報は折りたたみまたは詳細画面へ送る。

- implementation status
- evidence / QA details
- Resolve version
- Fusion node recipe
- Motion Grammar
- artifact / handoff details
- production readiness internals

Honesty gateや検証証拠は削除しない。ただし「見て選ぶ」導線の前に大量表示しない。

## Preview policy

優先順位:

1. 埋め込み可能な実物動画 / GIF
2. 実物動画から START / ACTION / RESULT の3コマ
3. 公式または権利上安全なサムネイル
4. 外部URL

実物を取得できない場合、説明用の模式図を新規生成して実物の代用にしない。

Previewには必ず出典と分類を持たせる。

- `ACTUAL_DAVINCI_RENDER`
- `ACTUAL_PALMIER_RENDER`
- `ACTUAL_SOURCE_MEDIA_RENDER`
- `OFFICIAL_EXTERNAL_REFERENCE`
- `CONCEPT_ONLY`

`CONCEPT_ONLY`をActualのように見せない。

## External reference record

外部実例を図鑑へ採用する場合、最低限以下を記録する。

- patternId
- sourceTitle
- sourceUrl
- sourceType (`OFFICIAL`, `TUTORIAL`, `REAL_WORLD_EXAMPLE`)
- provider / creator
- previewUsability (`EMBED`, `THREE_STILLS`, `THUMBNAIL`, `URL_ONLY`)
- whatToLookAt
- reusablePrinciple
- weddingOpeningFit
- checkedAt

商品・テンプレ単位ではなく、そこから観察できる「演出単位」で紐付ける。

## DaVinci routing

2026-09時点のBlackmagic Design公式Resolve 21情報では、Edit/Cutのキーフレーム機能が改善され、Fusionには多数のグラフィック機能が追加されている。またFusionで作成したEffect TemplateはEdit/Cut側で利用でき、Fusionでは音声波形を見ながらアニメーションを同期できる。

したがって図鑑は「高度そう = Fusion」としない。

- **Editで作りやすい**: Small Push、Slow Pull、Directional Pan、基本的なTransform / opacity / crop
- **Text+ / Fusion向き**: Mask Reveal、文字単位animation、複数要素の同期、trackingを伴うgraphic
- **Fusion template候補**: 同じ演出を複数Sceneで再利用し、Duration変更へ追従させる価値が高いもの
- **Source-aware transition**: Match Shape Cut等、エフェクトより素材選定・構図合わせが主役のもの

難易度は「ノード数」ではなく、ユーザーがResolve 21で再現・修正できるまでの操作量と失敗しやすさで評価する。

### Official references checked 2026-09-11

- Blackmagic Design — DaVinci Resolve 21 What's New
  - https://www.blackmagicdesign.com/jp/products/davinciresolve/whatsnew
- Blackmagic Design — DaVinci Resolve Fusion
  - https://www.blackmagicdesign.com/jp/products/davinciresolve/fusion
- Blackmagic Design — Fusion 21
  - https://www.blackmagicdesign.com/products/fusion

## Mobile-first rules

スマホでの最初の画面は「制作管理Dashboard」ではなく「演出を選ぶ場所」に見えること。

- 主要tap targetは44px相当以上。
- `Sだけ見る` は1タップ。
- Previewをカードの最上部に置く。
- 技術情報の長文をPreviewへ重ねない。
- 日本語名と「見た目」はスクロールせず近い位置で読める。
- filterは人間語を優先する。`Native App Actual` 等の内部用語は二次導線。
- 0件になった時は、検索語を消す / S解除 / 全演出へ戻る導線を出す。

## Fixed URL target

最終目標は、スマホから毎回同じURLで最新版を開けること。

要件:

- URLが更新ごとに変わらない。
- deep linkで `Sのみ`、family、patternへ直接飛べる。
- public deploymentへGit管理外の著作権音源・本人素材・local-only mediaを混入しない。
- GitHub Pages等を採用する場合も、既存CIとproduction authorityを壊さない。
- 公開前にVite base path、React Router refresh、asset path、GitHub Pages permissionsを確認する。

固定URLを作ること自体を目的化せず、公開すると情報漏洩・ライセンス違反になる素材がある場合は先にpublic-safe subsetを定義する。

## Current UX debt

現状のVisualMotionLibraryは、FIRST STEPの後にActual / production readiness / verification workspace等の制作管理情報が続き、catalog searchとPreviewへ到達する前の情報量が多い。

次のUI改善では、これらを削除せず **「選ぶ」タブ / 「制作・検証」タブ**、または折りたたみへ分離することを優先する。

最初に開く状態では、ユーザーが以下の順で到達できることを完成条件とする。

`Sを見る → Previewを見る → これが好き → 名前を知る → 必要ならDaVinci情報を見る`

検証担当者向け導線は別途保持する。
