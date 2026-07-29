# 07 Prompt Library

更新: 2026-07-29

## 目的
AIに「いい感じにして」と投げず、**役割・品質基準・禁止事項・確認方法**まで含めて、デザイン判断を再現しやすくする。

## Prompt基本形
```text
ROLE
あなたは [editorial / print / ticket / identity] デザイナー。

GOAL
何を、誰が、どこで使う印刷物なのか。

CURRENT
現在の採用方向性 / 参考 / 固定事項。

PRIORITY
1. 最重要
2. 次
3. 装飾

DESIGN RULES
色、書体、グリッド、余白、写真、モチーフ。

AVOID
ダサくなる原因 / コピー禁止 / 読みにくさ。

OUTPUT
最初に構造→次に視覚→最後にQA。いきなり完成Figmaを書かない。

SELF-CRITIQUE
完成前に、情報階層・余白・整列・統一・印刷実寸を自己レビュー。
```

---

# A. Reference Analysis Prompt
参考画像を見て「そのまま真似」せず、設計要素へ分解するときに使う。

```text
この参考画像をコピーするのではなく、以下の軸へ分解してください。
1. 情報階層
2. グリッド
3. 余白
4. 写真面積
5. タイポグラフィの役割
6. 色の面積比
7. 装飾モチーフ
8. 本物っぽさを作っている要素
9. 安っぽく見える可能性がある要素
10. 今回の結婚式へ抽象化して転用できる要素

最後に `STRONG / PARTIAL / REJECT` で評価し、理由を書く。
```

# B. Design Critic Prompt
```text
この案を褒めるのではなく、プロのアートディレクターとして厳しくレビューしてください。

チェック項目:
- 3秒で何が主役か分かるか
- 情報階層が3段階以上に分かれすぎていないか
- 同じ階層の余白が揃っているか
- 色を使う理由があるか
- 写真と文字が競合していないか
- 装飾を20%減らした方が良くならないか
- “結婚式テンプレ感”が出ていないか
- 旅行モチーフがアイコンの羅列になっていないか
- 印刷した実寸で本文が読めるか
- 既存ブランドのコピー感がないか

問題を P0 / P1 / P2 で分類し、修正は最小差分から提案する。
```

# C. Figma Foundation Prompt
```text
完成画面を描く前にFOUNDATIONだけ作ってください。

1. Color variables / styles
2. Text styles
3. Spacing scale
4. Grid / safe area / bleed
5. Photo frame rules
6. Icon stroke rule
7. Stamp rule
8. Layer naming rule

この段階では本番レイアウトを作らない。
Foundationをスクリーンショットで確認してから次へ進む。
```

# D. Figma Layout Prompt
```text
CURRENT仕様だけを使ってレイアウトしてください。
勝手に新しい装飾やコンテンツを増やさない。

先にwireframeを作り、以下を確認:
- 主役
- 情報順
- グリッド
- 写真面積
- 余白

wireframe承認後に色・装飾・写真を適用する。
Auto Layoutを構造に使い、目分量の絶対配置を減らす。
```

# E. Final QA Prompt
```text
このFigmaを印刷入稿前提で監査してください。

- text overflow
- safe area violations
- bleed
- fold collision
- inconsistent text styles
- unbound / inconsistent colors
- duplicated near-identical colors
- icon style mismatch
- alignment drift
- photo crop risk
- minimum readable size
- hidden/obsolete layers
- CURRENTとARCHIVEの混在

自動修正してよいものと、人間判断が必要なものを分ける。
```

---

# るるぶWEDDING 強化Prompt
```text
ROLE: editorial art director / Japanese travel magazine designer.
GOAL: A4二つ折りの結婚式プロフィールブック。旅行雑誌特集号の高揚感を持つが、既存るるぶのコピーにはしない。

PRIORITY:
1. `るるぶWEDDING` ロゴと実写真
2. 2026.10.24
3. 3〜5本の特集見出し
4. 補助装飾

STYLE:
- 上品65 / 楽しさ35
- Sky / Yellow / Red / White
- 中面はWarm Ivory
- 表紙は賑やか、中面は静か、裏表紙は余韻

AVOID:
- 全面原色
- 見出し過多
- すべての写真を同サイズ
- AI生成文字を最終ロゴにする
- 既存誌ロゴのトレース

PROCESS:
ロゴ3方向 → モノクロ評価 → 表紙wireframe3案 → 1案選定 → カラー → 中面 → 裏表紙 → QA。
```

# Passport 強化Prompt
```text
ROLE: luxury editorial / travel document designer.
GOAL: 上質なWEDDING PASSPORT。旅券再現よりMENU/DRINK/SEATINGの読みやすさを優先。

PROCESS:
1. 表紙をモノクロで3案
2. エンブレムを2モチーフ以内で3案
3. 中面wireframe
4. 11卓データを入れた可読性試験
5. 最後にGold/Stampを追加

AVOID:
装飾過多、金の使いすぎ、薄すぎる本文、背景地図の主張、真正旅券コピー。
```

# Boarding Pass 強化Prompt
```text
ROLE: information designer.
GOAL: 受付でゲストが2秒以内に名前とTABLEを見つけられる航空券風エスコートカード。

GUEST NAME > TABLE > DATE/VENUE > THEME DETAILS の順を絶対に崩さない。
長い名前を含むダミーデータ10件で耐久テストする。
```

# Ticket 強化Prompt
```text
ROLE: railway ephemera / small-format print designer.
GOAL: MINTIA上で成立する青春ふたりきっぷ。
小型印刷の可読性とレトロ券面の密度を両立。

実寸不明の間はサイズFIXしない。
地紋は印刷で潰れないよう低密度から始める。
```

## Prompt運用ルール
- 一度に4アイテムを書かせない。
- 1 prompt = 1意思決定または1工程を基本にする。
- 重要ルールは短いCurrent Authorityへ寄せ、毎回長大な履歴を渡さない。
- 小修正はAIへ丸投げせず、人間がFigmaで直接触る方が速ければ直接修正。
