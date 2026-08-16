# Opening V1 セクション2（雲つなぎ）に実写の雲海を採用

日付: 2026-08-14
状態: Palmier timelineへ反映済み。最終採用は人間確認待ち

## 背景

60秒を書き出して9セクションを目視したところ、セクション2（5.0〜9.0秒 / frame 150-270）が
`borderRadius: 999` の角丸を2つ置いただけのplaceholderだった。
写真11枚待ちの43秒とは別に、ここは写真と無関係に直せる4秒だった。

## 検討した3案

| 案 | 内容 | 判断 |
|---|---|---|
| A | Remotion製 `雲海` テンプレを使う | 採用したが不十分 |
| B | `雲海` の形状を作り直す | 見送り（設計判断のため人間待ち） |
| C | **実写の雲海を使う** | **採用** |

### A: Remotion雲海テンプレ

まずplaceholderを本物の `CloudSea` へ差し替えた（コミット c283967）。
Style Bibleの「朝日・やわらかい空色」に合わせて `timeOfDay=morning`。

ただし出来上がりが「雲海」ではなく「霞」に見えた。原因を調べると
`feGaussianBlur stdDeviation=42` が `ry=70〜140` のellipseに対して強すぎた。

ぼかし量を `softness` propsにしてStudioで調整できるようにした（コミット 4cb7d46）が、
42 / 24 / 18 / 10 を比較しても差は小さかった。真因はぼかしではなく形状。

- 雲が `y = 660 + layer*130` で画面下1/3に集中している
- ellipseが横に平たい（rx 260〜580 に対し ry 70〜142）
- 画面下160pxの単色rectが雲どうしを繋いでいる

つまり「上から見た雲海」ではなく「地平線の霞」の形になっている。

### C: 実写（採用）

Pexelsから取得した `pexels_6156696` を使う。
本物の雲の粒立ちがあり、セクション3以降に続く実写真とも馴染む。

問題は右上に機体の翼が全編写っていたこと。素材ごと捨てず、
`sample-clips.csv` に `crop` 列を追加して該当部分だけ外した（コミット 9fe5f00）。

```text
crop = 1760:990:80:90   16:9を保ったまま上部を除外し、1920x1080へ戻す
```

0.3 / 2.5 / 4.7秒の3地点で翼が消えていることを確認済み。

## Palmierへの反映

```text
project : Opening V1 (C9D14029-BB01-4364-833C-796202ADF9AE)
timeline: 3CE243A4 / 1920x1080 / 30fps / 1800frames
```

| 項目 | 値 |
|---|---|
| 取り込み | `10_references/media/clips/cloudsea_blue_a.mp4` をpath参照でimport（コピーしない） |
| mediaRef | `D9BC6479` |
| 配置 | V2（trackIndex 1）の frame 150-270。V2はこの区間が空だったので既存clipを壊さない |
| clip id | `F8F8FF44` |
| フェード | fadeIn 12 / fadeOut 12 frames |
| 音声 | 自動生成された linked audio (`C21BDDA1` / A2) を -60dB でミュート |

Pexelsクリップにはエンジン音の音声トラックが含まれるため、必ずミュートする。

## テロップの扱い

Remotion側の「ALTITUDE / The journey begins.」は実写に覆われるが、
**フェード中はRemotion層が透けて浮かび上がる**（frame 265で確認）。
消失はしていない。

Palmier側でテロップを足し直す案は採らなかった。
Cormorant Garamondは `@remotion/google-fonts` がレンダリング時に読み込む方式で
システムには未インストールのため、Palmierで足すと別フォントになる。
「色とフォントは `theme.ts` / `fonts.ts` だけで管理する」に反する。

テロップをはっきり見せたい場合の選択肢:

1. fadeOutを長くして、Remotion層のテロップが読める時間を増やす
2. 実写clipを短くし、末尾1秒をRemotion側に譲る
3. 実写をRemotionの `public/` に置き `OffthreadVideo` で背景にする
   （テロップ・内枠が正しいフォントで乗るが、Palmierが実写配置の正担当という分担から外れる）

## 次にやること

- 人間が通しで見て、セクション2の採否を判断する
- 採用なら `sample-clips.csv` の `clip-004` を `pick=picked` へ上げる（現在 `candidate`）
- `雲海` テンプレの形状を直すかどうかを決める（Bの判断）
