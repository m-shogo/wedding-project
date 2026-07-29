# 10 Workflow Hacks / 小技・抜け技・大技

更新: 2026-07-29

この文書は、ペーパーアイテム制作で通常ルートが弱いときに使う実践ノウハウ集。

Status:
- `VERIFIED` — このプロジェクトで実験し、再現できた
- `OFFICIAL` — Figma/OpenAI等の公式機能として確認
- `CANDIDATE` — 有力だが、このプロジェクトではまだ実地検証していない
- `AVOID` — 失敗報告または不安定要因が大きい

---

# 1. 透明背景がうまく出ないとき

## 1-A. まず直接alphaを要求
Status: `OFFICIAL / FIRST TRY`

生成時:
```text
isolated object only,
transparent background,
no floor,
no environment,
no cast shadow outside the object,
generous empty margin around the subject,
clean silhouette,
no text unless explicitly required
```

生成経路でalphaが不安定なら次へ。

## 1-B. グリーンバック生成 → 自動クロマキー
Status: `VERIFIED`

生成Prompt:
```text
isolated [ASSET], centered,
flat solid chroma green background #00FF00,
NO green color anywhere in the subject,
no green reflection,
no environmental shadow,
clean separated silhouette,
20% empty margin around all sides,
high edge contrast,
no text,
no watermark
```

前景に緑が必要なら `#0000FF` のブルーバックへ切り替える。

実装:
`scripts/remove-chroma-background.py`

検証:
- 人工的な正解alphaを持つアンチエイリアス付き素材で比較
- soft chroma mask + feather + despill
- alpha silhouette IoU: 約 `0.9996`
- pure background transparency: `100%`
- opaque foreground preservation: `100%`

単純なhard thresholdより、境界alphaと色かぶりを残しにくかった。

向くもの:
- アイコン
- スタンプ
- 紋章
- 飛行機/電車線画
- 小物
- 平面的な装飾

向かないもの:
- 髪
- ガラス
- 煙
- 半透明布
- 緑を多く含む被写体
- 写真品質の人物切り抜き

## 1-C. Semantic background remover
Status: `OFFICIAL/CANDIDATE`

FigmaにはRemove Background / Isolate Object等のAI画像編集機能がある。
複雑な輪郭はクロマキーよりこちらを優先候補にする。

使い分け:
- clean icon / ornament → chroma key
- photo / complex edge → semantic removal

---

# 2. AI生成PNGをFigmaで編集可能なベクターにする

## Figma Vectorize
Status: `OFFICIAL`

2026年のFigmaには raster → editable vector のVectorizeがある。
特に使える用途:
- 手描きlettering
- AI生成した単色紋章
- スタンプ
- テクスチャ
- ラフなlogo shape

良い流れ:
```text
AIで形だけ生成
→ 背景除去
→ Vectorize
→ 色数を2〜4色まで減らす
→ node cleanup
→ Variablesへ色をbind
```

注意:
- 複雑/低解像度画像はVectorize品質が落ちる
- 先にRemove Background / Boost Resolutionすると改善する場合がある
- 公式Help上、Vectorizeはpaid plans対象。Starterで使えなければ別ルートを使う

## Rurubu logoでの応用
AIへ最終文字を描かせて採用しない。

候補:
1. `るるぶWEDDING` のlettering方向だけ画像で探索
2. 良い骨格を選ぶ
3. Vectorizeまたは手動再構築
4. 和文文字は正しいglyphへ置換
5. optical spacingを人間調整

これで「AIの誤字ロゴ」を避けつつ、AIの造形探索だけ利用できる。

---

# 3. 画像の比率が足りない
Status: `OFFICIAL/CANDIDATE`

FigmaにはExpand Imageがある。

用途:
- 表紙写真をA5縦へ広げたい
- 左右に文字置き場を作りたい
- 空/海/壁を自然に延長したい

原則:
- 人物の顔/身体そのものを生成で変えない
- 背景側だけExpandする
- 元写真の人物は実写真を保持する

Prompt例:
```text
extend only the empty sky/background area,
keep all people unchanged,
do not alter faces, bodies, clothing or pose,
create clean negative space for magazine cover typography
```

---

# 4. 写真から色を決める
Status: `OFFICIAL`

FigmaのImage Color Pickerやpalette extractionを使い、実写真から色を取る。

使い方:
- 写真そのものの強い色を全色採用しない
- 1色を主accent、1色をsub accentへ
- Navy/Ivoryは共通foundationを維持

るるぶでは、実写真の空・海・建物から色を抽出し、雑誌の原色paletteと混ぜる方が写真との馴染みが良くなる。

---

# 5. ゲスト名を1枚ずつ手入力しない

## CSV-based population
Status: `CANDIDATE / HIGH PRIORITY`

Google Sheets直同期pluginは2025〜2026にfetch failure報告があり、このプロジェクトでは正本ルートにしない。

優先:
1. CSVをDrive/Gitで管理
2. CSV対応plugin / 自作MCP処理でFigmaへ流し込み
3. 最終結果を目視/QA

候補:
- CSV Populate
- Super Paste
- Variate
- custom Figma MCP script

BOARDING PASSで特に有効。

Stress test用CSVには必ず:
- 最短名
- 最長名
- 英字名
- 記号/スペース入り
- TABLE 1桁/2桁
を入れる。

---

# 6. ロゴを一発生成しない
Status: `VERIFIED POLICY`

Logoは以下に分解する。

```text
A. wordmark
B. emblem
C. date badge
D. secondary label
```

一度に全部生成すると「素材は多いがロゴとして弱い」状態になりやすい。

### るるぶWEDDING
- wordmark 3案
- モノクロ
- 3cm程度まで縮小して判読
- 写真上でも判読
- 選定後に色

### WEDDING PASSPORT
- wordmark 3案
- emblem 3案
- emblemは主モチーフ最大2種
- wordmarkとemblemを最後に統合

---

# 7. “デザインをAIに作らせる”より“AIに分解させる”
Status: `RESEARCH-SUPPORTED`

AI workflow:
```text
Reference analysis
→ feature decomposition
→ Foundation
→ wireframe 3案
→ human select
→ visual
→ lint
```

2026年のFigma AI/MCP実利用者にも、複雑画面を一発生成するとcleanupが増えるという報告がある。

今回のルール:
- 1 item
- 1 decision
- 1 selected Section
を基本単位にする。

---

# 8. 印刷用PDFはFigma標準exportだけを信用しない
Status: `HIGH PRIORITY`

Figmaはscreen-first / RGBが基本。
印刷時は別途preflightする。

候補:
- Print for Figma: CMYK / ICC / bleed / crop marks / DPI / preflight
- Printery系print export
- 最終fallback: SVG/PDFをIllustrator/Affinity等でprepress

本番では印刷会社の指定を最上位にする。

確認項目:
- finished size
- bleed
- crop marks
- ICC/profile
- CMYK conversion
- 300 DPI相当
- rich black / small black text
- fold位置

---

# 9. “スクショで良い”をやめる
Status: `POLICY`

素材は可能な限り:
1. SVG
2. high-res PNG
3. JPEG
の順で扱う。

reference screenshotとproduction assetを同じfolderへ置かない。

---

# 10. Pluginは最後に足すのではなく工程へ割り当てる
Status: `POLICY`

Pluginの役割を明示する。

- Asset search → Iconify
- Typography exploration → Fontpair / Type foundation候補
- Content population → CSV Populate / Super Paste / Variate
- Lint → Design Lint
- Style migration → Batch Styler
- Cleanup → Clean Document
- Print → Print for Figma等
- Mockup → Mockuuups Studio等

“便利そうだから入れる”は禁止。

---

# 11. 実物mockupでダサさを発見する
Status: `CANDIDATE`

Figma上の平面だけで判断しない。

- A4二つ折りを机に置いた状態
- Passportを手に持った状態
- Boarding Passを受付で30〜80枚並べた状態
- MINTIAへ貼った状態

のmockupを作り、情報密度とサイズ感を確認する。

Mockuuups Studio等のprint mockupは、この工程の候補。

---

# 12. SNSノウハウの扱い
- 公式情報 = capability / availability /仕様の根拠
- Reddit / Forum / X等 = 現場の失敗・新plugin発見
- Plugin作者投稿 = 候補発見には使うが宣伝バイアスを考慮
- 実際にプロジェクトで試し、成功したものだけ `VERIFIED` へ昇格

このファイルは今後も増補する。
