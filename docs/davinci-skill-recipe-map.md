# DaVinci Resolve スキル ⇄ Director Recipe 逆引き

Phase F。研究トラック（StaRt Extended Opening）。**Opening V1（60秒 Photo-first）の正本ではない。**
Opening V1はRemotionが正本のまま、Palmier/CapCutはfinal polish専用。詳細は `docs/opening-v1-motion-map.md`。

## このドキュメントの目的

`movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A、97レシピ）は、レシピごとに
`davinciSkills: string[]` フィールドを持つ。97レシピを1つずつ読むのは実制作では重い。
このドキュメントは逆引き — 「DaVinci Resolveのこのスキルを練習すれば、どのレシピが作れるようになるか」
を先に見せるためのカリキュラムであり、Fusionの乱用を避けてEdit pageでできることはEdit pageで作る、
という方針を明示する。

対象はPalmier/CapCutで足りない領域を DaVinci Resolve で仕上げたい場合、または DaVinci Resolveの
学習カリキュラムとして使う場合。**このrepoの現行編集ツールはRemotion(Opening V1) / Palmier /
CapCut**であり、DaVinci Resolveは今のところ標準ツールに含まれていない。導入を決めた場合の
準備資料として先に作っておく。

## タグの2系統

`davinciSkills` の値は2系統に分かれる。

| prefix | 意味 | 対象 |
|---|---|---|
| `davinci-*` | DaVinci Resolveの具体的な操作・ページ・パネル | 実際にResolveで手を動かす技能 |
| `concept-*` | 編集思想・判断基準（ツール非依存） | Remotion/Palmier/CapCut/Resolveどれで作業しても要る判断 |

`concept-*` はDaVinci固有スキルではないため、このドキュメントでは`davinci-*`側を主に扱う。
`concept-*`は各レシピの `editGrammar` / `whyItWorks` / `avoidWhen` を読むことに相当する
（例: `concept-rhythm` は「何拍でどう切るか」という判断そのもの）。

## 集計（97レシピ全件走査、2026-08-25時点）

| タグ | 件数 | 系統 |
|---|---:|---|
| `concept-rhythm` | 35 | concept |
| `concept-framing` | 24 | concept |
| `concept-stillness` | 17 | concept |
| `concept-continuity` | 15 | concept |
| `davinci-text` | 15 | davinci |
| `davinci-keyframe` | 14 | davinci |
| `davinci-marker` | 12 | davinci |
| `davinci-transform` | 11 | davinci |
| `concept-story` | 9 | concept |
| `davinci-trim` | 8 | davinci |
| `concept-typography` | 6 | concept |
| `concept-color-consistency` | 5 | concept |
| `davinci-easing` | 4 | davinci |
| `davinci-fusion-node` | 1 | davinci |

集計方法: `movie-dashboard/src/data/directorRecipeCatalog.ts` の全97エントリの `davinciSkills` 配列を
機械的にパースして件数化。再集計する場合:

```sh
node -e "
const fs = require('fs');
const src = fs.readFileSync('movie-dashboard/src/data/directorRecipeCatalog.ts', 'utf8');
const re = /davinciSkills:\s*\[([^\]]*)\]/g;
const count = {}; let m;
while ((m = re.exec(src))) {
  for (const s of m[1].split(',').map(v => v.trim().replace(/^\"|\"\$/g,'')).filter(Boolean))
    count[s] = (count[s] || 0) + 1;
}
console.log(count);
"
```

**`davinci-fusion-node` は97件中1件のみ**（`cam-25d-parallax`）。これはFusion乱用を避ける方針が
Phase Aのデータ設計時点ですでに反映されている証拠でもある。Fusionが要るのは本当に視差（2.5D
parallax）が要る時だけで、それ以外の96レシピはEdit page / Color page / Fairlight pageの範囲で作れる。

## Edit page優先の方針

DaVinci Resolveは強力だが、Fusion pageは学習コストが高く、過剰に使うと「AIっぽさ」「テンプレ感」に
つながりやすい（`docs/02_style-bible.md` のQA基準参照）。このプロジェクトでの優先順位は次の通り。

1. **Edit page** — cut, trim, keyframe（Inspectorのtransform）, marker, text+（Fusion Titleではなく
   標準Text+）でできることは全てEdit pageで作る。97件中96件がこれで完結する設計。
2. **Color page** — 露出・色の一貫性（`concept-color-consistency`該当5件）。
3. **Fairlight page** — J-cut/L-cutのオーディオトリム（`davinci-trim`の一部）。
4. **Fusion page** — 2.5Dパララックス(`cam-25d-parallax`)など、レイヤー分離と視差が本当に必要な1件のみ。

## 逆引き表（スキル → レシピ）

### `davinci-transform` — 11件

対象: `cam-locked-frame` / `cam-restrained-push` / `cam-directional-pan` / `cam-slow-pull` /
`cam-native-aspect` / `photo-full-bleed` / `photo-editorial-crop` / `cut-source-whip` /
`rhythm-chorus-lift` / `start-1a-photo-read` / `start-chorus-hero-lift`

Edit pageの Inspector → Transform（Zoom / Position / Rotation）で完結する。Fusion不要。

### `davinci-keyframe` — 14件

対象: `cam-restrained-push` / `typo-char-stagger` / `typo-word-punch` / `anime-speed-lines` /
`anime-cel-shadow` / `anime-micro-rgb` / `cut-directional-wipe` / `cut-route-wipe` /
`travel-route-dot` / `travel-ticket-edge` / `travel-multileg-recap` / `travel-arrival-home` /
`start-intro-ticket-lift` / `start-1b-anticipation-build`

Edit page（またはCut page）のInspectorで、パラメータ横のキーフレームボタンを打つだけ。Fusion不要。

### `davinci-easing` — 4件

対象: `cam-restrained-push` / `cam-slow-pull` / `typo-tracking-burst` / `cut-source-whip`

Keyframe Editor（Inspector下部のspline curve editor）でイージングカーブを調整する。
`davinci-keyframe` の上位互換的スキルで、単に打つだけでなく速度変化の質を作る。

### `davinci-marker` — 12件

対象: `typo-rhythm-type-on` / `anime-impact-frame` / `cut-soft-impact` / `rhythm-half-time-grid` /
`rhythm-micro-accent-190` / `rhythm-three-hit` / `rhythm-section-boundary` / `travel-passport-stamp` /
`start-curtain-open` / `start-triple-hit` / `start-second-triple-hit` / `start-three-hit-motif-rotation`

Timeline markerで拍・区切り・アクセント位置を先に置いてから、その上にクリップを揃える。
DaVinci標準機能（`M`キー）のみで、Fusion不要。

### `davinci-marker` + Fairlight `davinci-trim` — J-cut/L-cut系

対象（`davinci-trim` 8件）: `cam-handheld-restraint` / `cam-foreground-pass` /
`photo-video-insert` / `cut-hard-rhythm` / `cut-match-shape-r` / `cut-j-cut` / `cut-l-cut` /
`editorial-trailer-beat`

Edit pageで映像トラックと音声トラックのリンクを外し（`Alt+クリック`または`Unlink`）、
音声側だけ先行/後行させてトリムする。Fairlight pageで波形を見ながら微調整してもよい。

### `davinci-text` — 15件

対象: `photo-freeze-on-motion` / `typo-mask-reveal` / `typo-char-stagger` / `typo-quiet-caption` /
`typo-outline-fill` / `typo-rhythm-type-on` / `typo-vertical-wipe` / `typo-frame-lock` /
`anime-scribble-underline` / `anime-oversized-word` / `editorial-lower-third` /
`editorial-copywriter-line` / `wedding-date-venue-lock` / `start-verse2-playful-crop` /
`start-final-name-date`

標準の **Text+**（Fusion Titleではなく「Text+」ツール）で完結する。Text+はFusion pageを開かずに
Edit page上のInspectorだけで文字・アニメーションを設定できる。**Fusion pageを開く必要はない。**

### `davinci-fusion-node` — 1件のみ

対象: `cam-25d-parallax`

前景/被写体/背景をレイヤー分離した切り抜き素材を用意し、Fusion pageでMerge3Dノードまたは
Transform + Depth的な擬似視差を組む。97件中これだけがFusionを要求する設計であることを、
実装時にも維持する（新レシピを足す時に安易にFusionへ逃げない）。

## 主要カテゴリ代表レシピの最小再現手順

97件全部は重いため、代表的な6レシピについて、DaVinci Resolveでの具体手順を書く。
いずれもEdit page中心で、Fusionは使わない。

### 1. `cam-locked-frame`（Locked Frame Observation / CINEMATIC_CAMERA）

skills: `davinci-transform`, `concept-stillness`

1. Edit pageでクリップをTimelineに置く。
2. Inspector → Video → Transform を開き、**何も変更しない**（Zoom=100%, Position=0,0のまま）。
3. カット尻（クリップ終端）を1拍分（このプロジェクトでは95BPM half-time基準、約0.63秒）
   余分に残してから次のクリップへhard cutでつなぐ。
4. Transitionパネルは使わない（Cut onlyの意図を保つ）。
5. 文字を置く場合はText+をクリップ最小限の帯（画面端）に置き、動かさない。

### 2. `cam-restrained-push`（Restrained Push-In / CINEMATIC_CAMERA）

skills: `davinci-transform`, `davinci-keyframe`, `davinci-easing`

1. クリップをTimelineに置き、Inspector → Video → Zoomを開く。
2. 再生ヘッドをクリップ先頭に置き、Zoom=1.00でキーフレームボタンを押す（ダイヤモンドアイコン）。
3. 再生ヘッドをクリップ末尾へ移動し、Zoom=1.03〜1.05に設定（自動でキーフレームが打たれる）。
4. Keyframe Editor（Inspector下部のspline curve）で両端のイージングを ease-in-out にする
   （デフォルトのLinearから変更）。
5. 1クリップにつき1動作のみ。往復させない（`editGrammar`のルール通り）。
6. 全カットへ機械的適用しない。前後は`cam-locked-frame`のstaticと混ぜる。

### 3. `typo-word-punch`（Single Word Punch / TYPOGRAPHY）

skills: `davinci-keyframe`, `concept-rhythm`

1. Timeline markerで190BPMのvocal accentタイミングを先に打つ（`M`キー）。
2. そのマーカー位置にText+クリップを4〜10フレームだけ置く（1語のみ）。
3. Text+のOpacityまたはPositionにキーフレームを打ち、出現→即消滅の瞬間性を作る
   （拡大縮小のアニメーションは使わない — `typographyGrammar`のルール）。
4. 感情的なHero写真の上には重ねない（`avoidWhen`）。
5. 連続する単語すべてには使わない（`overEditingRisk: 高`）。

### 4. `cut-j-cut`（J-Cut Audio Bridge / CUT_TRANSITION）

skills: `davinci-trim`, `concept-continuity`

1. Edit pageで、次シーンの映像+音声クリップと現在シーンの映像+音声クリップを並べる。
2. 次クリップの映像・音声リンクを外す（クリップを右クリック→Linked Clips解除、または
   `Alt+クリック`で個別選択）。
3. 次クリップの音声側だけを0.3〜0.5秒（95BPM half-time基準で概ね半拍弱）前方へドラッグし、
   現在シーンの映像とオーバーラップさせる。
4. Fairlight pageで波形を見ながら、環境音のレベルとフェードを微調整する。
5. 映像のtransitionは足さない（音の先行だけで移動を感じさせる — `whyItWorks`）。

### 5. `rhythm-three-hit`（Three-Hit Graphic Sequence / RHYTHM_MUSIC_HIT）

skills: `davinci-marker`, `concept-rhythm`

1. 190BPMの3拍分をTimeline markerで先に打つ（stamp / line / route-dotの3点）。
2. Hero写真クリップ自体は**1本のまま切らない**（`editGrammar`: 写真を3回切るのではない）。
3. 各マーカー位置に、対応するmotion preset（`accent-stamp-triplet` / `wipe-route-line` /
   `accent-speed-lines`）に相当する短いグラフィッククリップ（12〜24フレーム、Text+または
   PNG stamp）を上位トラックへ重ねる。
4. 各hitはsingle-hitで即終了させ、full-screen flashやshakeにしない（`avoidWhen`）。
5. 1番(chorus-1-b)と2番(chorus-2-b)で順序を変える（`start-three-hit-motif-rotation`参照）。

### 6. `cam-25d-parallax`（2.5D Parallax Depth / CINEMATIC_CAMERA — Fusion必須の唯一の例）

skills: `davinci-fusion-node`, `concept-framing`

1. 前提: 切り抜き品質が高い1枚だけに限定（`avoidWhen`: 輪郭が破綻する写真は避ける）。
2. 前景・被写体・背景を別レイヤー（別PNG、透過あり）として用意する。
3. Fusion pageで各レイヤーをMediaInノードとして読み込み、Transform3D（またはPlanar Tracker+
   Depth的な簡易奥行き付け）で背景を最も遠く・前景を最も近くに配置する。
4. カメラの微小なパン/チルトを1つだけ設定し、視差でわずかに奥行きを出す（過度な視差はCG的に
   見えるため`overEditingRisk: 中`）。
5. パララックス終端は`color field release`（`cut-color-field`相当）へつなぐと呼吸が作れる
   （`transitionGrammar`）。
6. **このレシピ以外で新たにFusionノードを組む前に、Edit page/Text+/Transformで代替できないか
   必ず確認する。** Fusion多用はこのプロジェクトの方針（Edit page優先）に反する。

## 関連

- `movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A、単一情報源）
- `movie-dashboard/src/data/startSectionRecipeMap.ts`（Phase E、section⇄recipe）
- `motion-studio/exports/palmier/director-recipe-section-handoff.{csv,md,json}`（Phase F、Palmier向けhandoff）
- `docs/decisions/2026-08-25-director-recipe-palmier-davinci-handoff.md`（このPhase Fの設計判断）
- `docs/02_style-bible.md`（AI/テンプレ感のQA基準。Fusion乱用回避の背景）
