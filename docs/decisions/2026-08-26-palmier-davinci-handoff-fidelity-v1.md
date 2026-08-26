# Palmier → DaVinci Handoff Fidelity Registry v1

日付: 2026-08-26
状態: 実装済み(canonical data + UI + verifier)。Runtime検証は未実施。
関連: `movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts`, `movie-dashboard/src/data/maskRevealHandoffFidelity.ts`, `movie-dashboard/src/components/MaskRevealSceneHandoffCard.tsx`, `docs/research/2026-08-26-movie-tool-learning-run-01.md`, `docs/research/2026-08-26-movie-tool-learning-run-02.md`

## 背景

`docs/research/2026-08-26-movie-tool-learning-run-01.md` / `-02.md` は、Palmierの実exporterソース(`FCPXMLExporter.swift`)とDaVinci Resolve 21公式資料を根拠に、「PalmierからDaVinciへ何が転送され、何が失われ、失われたものをどう復元できるか」を評価した研究記録。ユーザーの指示で、この知見を研究docのまま放置せず、モーション図鑑が実際に使えるCanonical data・UI・Adapter・Verifierへ昇格した。

## やったこと

1. **Canonical registry** (`palmierDavinciHandoffFidelity.ts`): 研究run-01/02の表を機械可読な`HandoffPropertyRecord[]`へ正規化。各recordは`sourceCitations`で研究docを引用し、発明した分類は無い。

   - `TransportClass`: `EXACT / APPROX / REBUILD_VALUES / REBUILD_ASSET / REBUILD_INTENT / BAKE_OPTION / LOST`
   - `AutomationClass`: `AUTO_REBUILD / ASSISTED_REBUILD / VISUAL_REBUILD / MANUAL_ONLY`
   - `CapabilityTrust`: `VERIFIED_WRITE / GENERATED_ARTIFACT / ASSISTED_MANUAL / UNKNOWN`
   - `EvidenceState`: `PENDING_RUNTIME / RUNTIME_VERIFIED`(Expected/ObservedをGL-05に沿って分離)

2. **Codex instruction builder** (`buildCodexRebuildInstruction`): run-02の「Instruction recipe delta」フォーマットをそのまま関数化。Target/Timeline/Clip/Human Master property/Transport state/Preferred native route/Automation capability/Editable-after-rebuild/Verificationを必ず埋める。「同じに見えるようにして」という曖昧指示を許さない。

3. **Mask Reveal統合** (`maskRevealHandoffFidelity.ts`): 唯一Human Master Sceneを持つ`type-mask-reveal`の実際のPalmier/DaVinci分担(Palmierはrough timing/placement、DaVinciがFusionで最終motionを構築)に対応する4 property(`clip-placement-trim-speed` / `position-scale-rotation-flip` / `text-properties` / `crop-keyframes`)をタグ付けし、レポートを生成する。

4. **UI** (`MaskRevealSceneHandoffCard.tsx`): 「Palmier → DaVinci Handoff Fidelity」折りたたみパネルを追加。転送件数/要再構築件数、各propertyのtransport class・復元手順・native route・automation/capability/evidence状態を表示。`allRuntimeVerified`がfalseの間は「研究段階の分類」と明示し、検証済みであるかのように見せない。

5. **Verifier** (`check:palmier-davinci-handoff-fidelity`, `check:movie-coach`へ追加):
   - 全recordがrun-01/02を引用していること
   - `audio-volume-keyframes` / `audio-fade`が`AUTO_REBUILD`や`VERIFIED_WRITE`を名乗っていないこと(GL-06/07: 一般的なResolve scriptingの存在からFairlight書き込み可能性を推論しない)
   - この repoではまだ実Canaryを実行していないため、**どのrecordも`VERIFIED_WRITE`/`RUNTIME_VERIFIED`を名乗れない**こと
   - Codex instruction templateが必須フィールドを全て含むこと
   - Mask Reveal handoff cardが`PENDING_RUNTIME`の注記を必ず表示すること

## Trusted の単位

Tool全体を信頼する/しないという単位にしない。`HandoffPropertyRecord`単位でtransport/automation/capability/evidenceを個別に持たせているため、例えば「クリップ配置は転送されるが、音量キーフレームは要手動再現」のように**Capability/Property単位**で信頼度が変わることを表現できる。

Resolveのversionが上がった場合も、影響を受けたproperty recordだけを`PENDING_RUNTIME`へ差し戻せばよく、レジストリ全体を作り直す必要はない(run-02のGL-08「Version-pin rebuild evidence」に対応)。

## 今回やらなかったこと(正直な境界)

- **実Resolve Canary未実施**。このレジストリの`evidenceState`は全件`PENDING_RUNTIME`のまま。研究docのソースコメント/公式資料に基づく分類であり、実際にPalmier FCPXMLをResolveへimportして確認したものではない(GL-05)。
- `.setting` / `.drfx` / Fusion comp / Python / Luaによる自動再構築の**実装コード自体はまだ書いていない**。`buildCodexRebuildInstruction`はCodexへの指示テンプレートを生成するだけで、Fusion compを実際に生成するジェネレーターではない。
- Mask Reveal以外のMotion Pattern(35件)への適用は未実施。Mask Reveal以外はまだHuman Master Sceneを持たないため、紐付ける対象がない。

## 次にやるべきこと(優先順位)

1. `docs/research/2026-08-26-movie-tool-learning-run-01.md`が提案する`lost-rebuild-01` Canary(5〜8秒の合成Scene)を実際にPalmier→DaVinciで実行し、初めて`RUNTIME_VERIFIED`なrecordを1件作る。
2. Canaryが2回再現してから、該当propertyだけ`evidenceState: "RUNTIME_VERIFIED"`へ昇格する(1回の成功では不十分、既存ルールに準拠)。
3. Fusion compの実際のgenerator(`.setting`出力)をCodexで試作し、`capabilityTrust`を`GENERATED_ARTIFACT`→`VERIFIED_WRITE`へ動かせるか検証する。
4. Mask Reveal以外のPatternがHuman Master Sceneを持つようになったら、同じ`maskRevealHandoffFidelity.ts`のパターンを横展開する。
