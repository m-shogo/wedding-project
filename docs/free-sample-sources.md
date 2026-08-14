# 無料素材の入手先（演出・モーションを分割して即使う）

「集める→まとめる→切る→選ぶ」の①集めるを、**無料でライセンスがクリアな素材**で回すための入手先。
落とした素材は `10_references/media/pool/`（Git管理外）に置き、
[reference-recipes.md](reference-recipes.md) の型を決めてから `scripts/slice_clips.py` で切り分ける。

ライセンス確認日: **2026-08-14**（各サイトの公式ページで確認。出典は末尾）

## 大前提

- **ライセンスは変わる**。ここは確認日時点の記録。**使う直前に公式で再確認**する。
- **上映用とSNS投稿用を分けて確認する**。
- **人物・動物・読める文字・ロゴ・看板が写った素材は不採用**（Style Bible準拠）。無料でも同じ。
- 音源（BGM/SE）は権利が特にシビア。[08_rights-privacy.md](08_rights-privacy.md) で別管理する。

## ⚠️ このプロジェクト固有の注意（重要）

**Coverr素材をAI生成の参照素材（reference image / I2Vの入力）に使わない。**
Coverrのライセンスは「AIアルゴリズムの学習、AIモデルの作成、データセットとしての利用」を明示的に禁止している。
このプロジェクトはI2V（画像→動画）やreference素材を使うため、抵触しうる。
AIに渡す参照素材は、AI利用を禁じていない素材か、自前素材、`motion-studio` の自作素材にする。

他サイトも「AI学習利用」条項は今後追加されうる。**AIへ素材を渡す前に必ず規約を見る**。

## 映像（背景・B-roll・つなぎ）

確認日時点の要約。○＝可、×＝不可/不要。

| サイト | 商用利用 | クレジット表記 | 主な禁止事項 | AI利用 | 向くレシピ/motion |
|---|---|---|---|---|---|
| **Pexels** | ○ | 不要 | 競合ストックサイトへの再配布、無加工での販売、識別可能な人物を悪く見せる用途、商標利用、推奨の示唆 | 規約に明示なし（要確認） | rec-03/08/09/10, drift/parallax |
| **Pixabay** | ○ | 不要 | **無加工のまま単体で販売・配布**、識別可能な人物を含む不適切/違法な利用、誤認を招く利用、商標利用 | 規約に明示なし（要確認） | rec-03/09/10, drift/locked |
| **Mixkit** | ○（Free License） | 不要 | 原型のまま転売、第三者へのサブライセンス/商業的利用提供 | 規約に明示なし（要確認） | rec-01/09, push-in/drift |
| **Coverr** | ○ | 不要 | 競合サービス化、転売・再配布、**AI学習/AIモデル作成/データセット利用** | **× 明示的に禁止** | rec-08/09/12, pan/pull-out |
| Mazwai | 要確認 | 要確認 | **単独サイトは消滅**（freepik.comへ301リダイレクト） | 要確認 | 使用前に移管先の規約を確認 |
| Videvo | 要確認 | **無料枠は表記必要** の情報あり | 単独運営を終了しFreepik系へ統合の情報あり | 要確認 | 使用前に移管先の規約を確認 |

### 補足

- **Mixkit** には `Free License` と `Restricted License`（個人・非商用のみ）の2種類がある。
  **素材ごとにどちらか確認する**。結婚式の上映は個人利用だが、SNS投稿や収益化を伴う場合は特に注意。
- **Pixabay** は「要約のみでなく完全なライセンス全文が法的拘束力を持つ」と明記している。重要判断時は全文を見る。
- **Pexels / Pixabay** の「識別可能な人物」条項は、このプロジェクトの「人物なし」ルールと方向が同じ。人物入り素材は元々不採用。
- **Mazwai / Videvo** は2026年時点でFreepik系への統合が確認された（Mazwaiは301リダイレクトを実地確認）。
  移管後のライセンスは未確認のため、**このプロジェクトでは当面使わない**。使うなら移管先の規約を確認してから。

## モーション演出（光・粒子・オーバーレイ・トランジション）

「演出をすぐ載せる」用。実写の上にブレンド（スクリーン/加算）で重ねて使う。

| 種類 | 探し方 | 使い方 | 対応レシピ/motion |
|---|---|---|---|
| ライトリーク | Pexels / Pixabay / Mixkit で "light leak" | 章切替に加算合成 | rec-05, match-cut(光) |
| ボケ・粒（bokeh） | 同 "bokeh overlay" | 夜景・余韻に重ねる | rec-10, locked |
| フィルムグレイン | 同 "film grain" | 全体の質感統一 | 全般（AIっぽさ低減） |
| 発光・フレア | 同 "lens flare" | 出発・希望の一瞬 | rec-02, tilt-up |
| ルミナンス/whipトランジション | 同 "transition overlay" | カット間のつなぎ | rec-07/11, whip-pan/match-cut |
| 雲・霧オーバーレイ | 同 "cloud fog overlay" | 背景の奥行き足し | rec-03, drift |

オーバーレイは上表の商用可サイト（Pexels / Pixabay / Mixkit / Coverr）内で探すと権利が読みやすい。

## 文字・地名・スタンプは無料素材で拾わない

読める文字・地名・ロゴが入った素材は、無料でも**採用しない**。
テロップ・地名・搭乗券・スタンプは `motion-studio` のRemotionテンプレで自作する
（AI画像/動画にも焼き込まない。Style Bible / motion-studio ルール準拠）。

## 取得は公式APIだけを使う（スクレイピング禁止）

Pexelsの `robots.txt` は以下を明示的に **Disallow** している（2026-08-14 確認）。

```text
Disallow: */download/*     ダウンロードURL
Disallow: *q=*             検索クエリURL
Disallow: */api/v*         APIパス
```

つまり、検索ページやダウンロードURLを自動で叩く取得方法は**先方が拒否している**。
回避せず、**公式APIという正規ルート**を使う。APIは無料だがキー登録が必要。

```sh
# 1. 無料APIキーを取得する
#    Pexels : https://www.pexels.com/api/
#    Pixabay: https://pixabay.com/api/docs/

# 2. キーを環境変数に入れる（リポジトリにcommitしない）
export PEXELS_API_KEY='取得したキー'

# 3. まず候補を見る（ファイル名・入手元・サイズを表示。ダウンロードしない）
python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3

# 4. よければ取得する
python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3 --write
```

- 取得先は `10_references/media/pool/`（Git管理外）。
- 出所・ライセンス・作者は `10_references/media/pool/_provenance.csv` へ自動記録される。
- Pixabayは「リクエストを24時間キャッシュすること」を求めているため、検索結果をキャッシュする。
- **人物・動物・文字・ロゴ・看板の有無はAPIでは判定できない。取得後に必ず目視確認する。**

手で落とす場合は、ブラウザで各サイトを開いて `pool/` に保存し、
出所を `sample-clips.csv` の `notes` に控える。

## 分割してすぐ使う流れ

```text
0. fetch_stock.py（公式API）またはブラウザで 10_references/media/pool/ に保存
1. 取得した動画を目視確認する（人物・動物・文字・ロゴ・看板が無いか）
2. reference-recipes.md で「この動き(motion)を使う」と決める
3. python3 scripts/slice_clips.py reel --write     # 1本にまとめて全体を見る
4. 使いたい区間の in/out と motion を sample-clips.csv に記録
5. python3 scripts/slice_clips.py slice --write    # 秒単位で切り出し
6. 良かったものだけ pick=picked / rating を更新 → clips/ に残る
7. 出所・ライセンス・表記要否を notes に控える（例: `Pexels / 表記不要 / rec-09`）
```

## ライセンスを控える場所

無料でも「どこから・どの条件で」を残す。上映後やSNS投稿時に確認できるようにする。

- 素材ごと: `sample-clips.csv` の `notes`（出所サイト名・表記要否・レシピid）
- 資産台帳: `docs/templates/asset-log.csv`（本採用したもの）
- 権利まとめ: `docs/08_rights-privacy.md`（上映版/SNS版の可否）

## 出典（2026-08-14 確認）

一次情報:

- Pexels License — https://www.pexels.com/license/
- Pixabay Content License Summary — https://pixabay.com/service/license-summary/
- Mixkit 公式情報 — https://mixkit.co/llm-info/ （ライセンス一覧は https://mixkit.co/license/ ）
- Coverr License — https://coverr.co/license
- Mazwai — https://mazwai.com/license は freepik.com へ301リダイレクト（実地確認）

二次情報（未確定・要一次確認）:

- Videvo のライセンス階層と無料枠の表記要否、Freepik系への統合。
  公式ページ（videvo.net / help.videvo.net）は取得時403のため未確認。

## 再確認したい時

「Pexelsの現行ライセンスを確認して」のように依頼すれば、公式ページを当たって
この表を更新する。特に **AI利用条項** と **Mixkitの素材別ライセンス種別** は変わりやすい。
