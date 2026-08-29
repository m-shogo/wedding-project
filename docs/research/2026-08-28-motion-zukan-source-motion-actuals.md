# モーション図鑑 Source-media Actual検証

日付: 2026-08-28

## 結論

`cut-match-shape`と`whip-source-matched`を、proceduralな代表Conceptではなく、
出所とhashを固定したPexels実動画2本ずつでrenderした。両方とも独立pixel oracleと
通常速度・contact sheet目視QAを通過したため、Implementationを`TESTED`へ昇格した。

これはsource-media適合性の証拠であり、Palmier / DaVinciのnative-app操作や
本人素材での最終採用を証明する`PRODUCTION_READY`ではない。Evidenceの
`productionAuthority`は両方とも`false`を維持する。

## cut-match-shape

- Source A: Pexels 31288104、SHA-256 `27ca0d54...`
- Source B: Pexels 4057958、SHA-256 `4addf87d...`
- Render: 1280×720 / 30fps / 90frames / H.264 / audioなし
- Native cut: frame 44→45
- 太陽中心: `(646,284)` → `(643,300)`、距離16.28px
- shot内差分: 2.10 / 2.80
- cut差分: 49.91

太陽の円形と中心位置は連続して見える一方、海岸と空の別shotへ明確に切り替わる。
crossfadeや生成図形は使用していない。

## whip-source-matched

- Source A: Pexels 19188177、SHA-256 `5a5d3441...`
- Source B: Pexels 6556837、SHA-256 `61a4fd8a...`
- Render: 1280×720 / 30fps / 24frames / H.264 / audioなし
- Native cut: frame 11→12
- Source A horizontal shift: -164px
- Source B horizontal shift: -112px
- cut差分: 66.43

両方とも列車窓から撮影された実camera motionで、背景が左へ流れる区間を接続した。
方向反転、停止、crossfadeはない。6556837のPexels URLとlicense URLは
`movie-dashboard/src/data/sourceMotionActualCatalog.json`へ追加した。raw sourceはGit除外のため、
CIはcatalogのURL/license/hashと永続Actual outputを検証し、ローカルにsourceが存在する時だけ
source hashも再照合する。

## 再生成と検証

```bash
cd movie-dashboard
pnpm render:source-motion-actuals
pnpm check:source-motion-actuals
```

render scriptは4本のsource SHA-256が一致しない限り停止する。検証scriptはsource/output
hash、ffprobe、audio不在、shape中心、native cut差分、前後shotの水平shift符号、
catalog/evidence/queue登録を確認する。
