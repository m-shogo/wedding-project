# StaRt Wedding Edit — Real Media Plumbing完成(TASK1-9、続編)

Status: RECORD
Scope: 前回(`2026-08-27-start-wedding-real-media-slot-matrix.md`作成時点)の
既知ギャップだった「通常shotの大半を描画する共有`shotEngine.tsx`にreal media
resolverが配線されていない」を解消した。

## 設計(TASK3)

共有`shotEngine.tsx`をStaRt Wedding専用コードで汚さないため、
`StartDemoBackdrop`(start129共有部品)自体に、role+variantIndexから
asset(path/kind/sourceType)を解決する関数を注入できる、optionalな
`assetResolver`propを追加した。

```ts
export type StartDemoAssetResolution = {path?: string; kind: 'photo' | 'video'; sourceType?: 'real' | 'demo' | 'placeholder'};
export type StartDemoAssetResolver = (role: Start129AssetRole, variantIndex: number) => StartDemoAssetResolution;
```

- 省略時(`assetResolver`未指定)は、既存の`resolveDemoAsset()`をそのまま使う
  (Start129/Director Recipe等、既存の呼び出し元は一切変更不要)。
- `ShotRenderer`(`shotEngine.tsx`)→`LayoutRender`→`StartDemoBackdrop`の
  全経路(full/split-2/strip-3/panel-4/grid-editorial/inset/stack、
  計8箇所の呼び出し)へ`assetResolver`/`showSourceBadge`をoptional propとして
  prop drilling した。
- `StaRt Wedding Edit`側は、`weddingAssetResolver`
  (`src/data/startWeddingEdit/realMedia.ts`、`resolveWeddingMediaAsset()`の
  薄いadapter)を`StartWeddingEditComposition.tsx`の`<ShotRenderer>`呼び出しへ
  渡すことで、B案41 shot全てがreal media manifestを参照するようになった。

## bespoke / intro側の統合(既存)

`choreographedMoments.tsx`(bespoke 6 phrase)と`IntroNarrativeB.tsx`は、
前回`WeddingRealOrDemoBackdrop`という薄いwrapper経由で既に配線済みだった。
今回、`WeddingRealOrDemoBackdrop`自体を新しい`assetResolver`propを使う形へ
簡略化し(独自のImg/OffthreadVideo/blurred-extend実装を削除し、
`StartDemoBackdrop`へ委譲)、ロジックの二重実装を解消した。

これにより、**通常shot・bespoke・introの3経路すべてが、同一の
`assetResolver`契約(`weddingAssetResolver`)を通る**状態になった。

## sourceType可視化(TASK9)

`StartDemoBackdrop`が`showSourceBadge`propを受け取ると、右上に
`REAL`/`DEMO`/`PLACEHOLDER`を小さく表示する。本番Clean composition
(`StartWeddingEdit-*-Clean`)では`showSourceBadge`を渡さない(常にfalse)。
Guide composition(`StartWeddingEdit-*-Guide`)でのみ`reviewMode`と連動して
表示する。

## crop/focus実配線(TASK12)

`weddingAssetResolver`はrole+variantIndexからpath/kind/sourceTypeのみを
解決する(既存の`resolveDemoAsset`と同じ最小契約)。crop/focusは
既存の`shot.focus`(storyboard側)→`objectPosition`という経路がそのまま
機能する(`LayoutRender`が`focus`から`objectPosition`を計算し、
`StartDemoBackdrop`の`fit: 'cover'|'contain'|'blurred-extend'`へ渡す
処理は今回変更していない)。real media側の`focusX`/`focusY`/`fit`
(`realMedia.ts`のmanifestフィールド)は、shot側の`focus`が指定されていない
場合の候補値として、次のiterationでLayoutRender側に渡す拡張の余地を残した
(今回は未接続。shot.focusが優先される設計は変更していない)。

## 検証(TASK5-8、TASK17-19)

### Timing回帰(変更なし、全てPASS)

```text
pnpm typecheck: PASS
pnpm check: PASS
check:full-song-identity: 30/30 phrase, 43/43 cue, max delta 0.00ms
check:post60-regression: mismatch 0件
check:minimum-usable-duration: error 0件(warning 4件、既知)
check:choreography-event-timing: PASS
check:preview-offset-isolation: PASS
check:start-wedding-real-media-preflight: PASS(Preflight State: MEDIA_BLOCKED、manifest空のため正常)
test:generated-idempotency: PASS
```

### manifest空でのB-clean regression(TASK7/19)

1080p full renderを実行し、以下を確認した。

```text
raw video frame(rgb24) SHA-256: 配線前後で完全一致
audio PCM SHA-256:              13d62793...(既存記録と完全一致、5世代目)
frame count / duration:         4368 frames / 145.600000s(video) 145.642667s(audio)
blackdetect / freezedetect:     検出0件
```

**配線前後でraw video frameのSHA-256が完全一致** — assetResolver injection
導入によるB-clean(manifest空状態)の見た目・timingへの影響は、ピクセル単位で
ゼロであることを直接証明した(単なる「差が無さそう」ではなく実測)。

### synthetic real override実証(TASK6/8)

ローカルのみのtemporary検証(commitしていない): 既存demo asset 1枚を
`public/real/start-wedding/HERO_WIDE/`へ一時コピーし、
`START_WEDDING_REAL_MEDIA`へ`status: 'approved'`のsynthetic entryを一時追加。

確認できたこと:

1. **resolver単体**: `weddingAssetResolver('HERO_WIDE', 0)`が
   `sourceType: 'real'`を返す。他role(`HERO_CLOSE`等)は影響を受けず
   `sourceType: 'demo'`のまま。
2. **status=candidate(未承認)は使われない**: `status`を`candidate`に
   変えると自動的に`demo`へfallbackする(AIが勝手に承認しない設計の
   直接確認)。
3. **実render経路**: `verse-1a`のHERO_WIDE shot(通常shot、bespoke化
   されていない41 shotの1つ)をGuide compositionで実際にrenderし、
   画面右上に緑色の`REAL`バッジが表示され、かつ実際に表示される写真が
   demo asset(空港の人物)とは異なるsynthetic real画像(山の写真)に
   差し替わっていることを目視確認した。

検証後、`realMedia.ts`・`public/real/start-wedding/HERO_WIDE/`配下の
synthetic testファイルは完全に削除・復元し、diffが残っていないことを
確認してからcommitした。

### 既存の3段目(demo/placeholder両方missing時)について

現在B案が使用する全12roleに1件以上のdemo assetが存在するため、
「real無し・demo無し」の状態を今回新たに作って実証してはいない。ただし、
この経路(`StartDemoBackdrop`の`path`未解決時に`AbstractPlaceholder`を
描画する分岐)自体は今回一切変更していない、既存の未変更ロジックである。

## 結論

```text
OPENING_REAL_MEDIA_PLUMBING_READY: YES
```

- 共有`shotEngine.tsx`はbackward compatible(Start129/Director Recipeの
  既存composition render結果は無変更、実renderで確認済み)。
- 通常shot(41件)・bespoke(6 phrase)・introの全経路がreal media resolverを
  経由するようになった。
- real → demo → placeholderのfallbackはresolver単体・実render両方で実証済み。
- Timing/timing regressionは0件、B-clean(manifest空)はraw video frame
  SHA-256完全一致で無変更を証明済み。
- 残りのブロッカーは実素材投入(`OPENING_REAL_MEDIA_READY`)のみ。
