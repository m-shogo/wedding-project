# 32 Adaptive Feedback Loop — 迷った時の進め方

更新: 2026-07-29
Status: CURRENT

## 目的
ペーパーアイテム制作で詰まった時に、同じやり方を繰り返して品質を落とさない。
迷い・違和感・失敗を **フィードバック（FB）として扱い、方法そのものを変える**。

---

## 基本ループ
1. **Observe** — 何が弱いかを具体化する
2. **Classify** — 問題の種類を分類する
3. **Change Method** — prompt / workflow / tool / layout のどれを変えるか決める
4. **Prototype Small** — 小さく試す
5. **Compare** — before / after を比較する
6. **Promote or Reject** — 成功ならCurrentへ、失敗なら捨てる
7. **Record** — Gitへ理由と結果を残す

「同じ方法で回数だけ増やす」は原則しない。

---

## 問題分類と打ち手

### A. 美的に弱い / ダサい
例:
- ロゴが弱い
- 情報密度が不自然
- 余白が気持ち悪い
- 写真と文字が競合する

打ち手:
1. Referenceを見直す
2. promptを変える
3. wireframeへ戻す
4. 配色 / Typography / hierarchyを変える
5. 別AI / 別生成手法を比較

**この問題をPluginで解決しようとしない。**
Pluginは美的判断の代替ではない。

### B. 同じ手作業を何度もしている
例:
- ゲスト名流し込み
- 卓番号差し替え
- 同じstyle修正
- exportの繰り返し

打ち手:
1. Figma native featureを確認
2. 既存Pluginを探す
3. CSV / script / MCPで代替できるか確認
4. 反復が継続するなら自作Plugin候補へ

### C. 人間が見落としやすいQA
例:
- 小さすぎる文字
- Missing Font
- placeholder残り
- 長い名前で崩れる
- safe area / bleed逸脱

打ち手:
- 自作Plugin / scriptで機械検査を優先
- 人間レビューと原寸試し刷りを最後に残す

### D. Figmaでやるより外部処理が速い
例:
- 背景透過
- raster cleanup
- SVG cleanup
- image upscale
- CMYK/preflight

打ち手:
- CLI / image tool / 専用印刷ツールへ逃がす
- Figmaへ無理に押し込まない

---

## 自作Pluginを作る判断基準
以下のどれかに該当したらPlugin化を検討する。

- 同じ操作を **3回以上** 繰り返す見込みがある
- 4アイテム横断で再利用できる
- 人間の見落としを機械的に検出できる
- CSV / JSONなど構造データから再現できる
- 既存Pluginでは今回の仕様に合わない
- Claude / Codexから安全に再実行できると価値が高い

逆に以下はPlugin化しない。
- 一度しか起きない調整
- 美的な1mm調整
- 写真の最終crop
- 主観的なロゴ選択
- 実物を見ないと判断できない印刷の質感

---

## Tool切り替えルール
### 第一候補
Figma native

### 第二候補
既存Plugin

### 第三候補
Claude / Codex / MCP / CSV / script

### 第四候補
自作Figma Plugin

### 第五候補
Figma外の専用ツール

ただし順番は固定ではない。最終品質と再現性が高い方法を優先する。

---

## Status管理
新手法は必ず以下で管理する。

- `IDEA`
- `CANDIDATE`
- `PROTOTYPE`
- `VERIFIED`
- `CURRENT`
- `REJECTED`
- `AVOID`

SNSで見つけただけの技をCURRENTにしない。

---

## FBログに最低限残すこと
- 問題
- 旧手法
- なぜ弱かったか
- 新手法
- test条件
- before / after
- 成否
- 次回使うか

---

## このプロジェクトでの固定判断
- 迷ったら停止せず調査する
- 同じ失敗を繰り返さない
- 良い技はGitへ昇格する
- 品質向上が目的であり、Figma・AI・Pluginを使うこと自体は目的ではない
- 横槍や途中の会話が入っても、独立して進められる作業は継続する
