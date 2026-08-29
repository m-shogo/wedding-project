# Palmier → DaVinci Handoff Fidelity Registry v1

日付: 2026-08-26
状態: 実装済み(canonical data + UI + verifier)。Runtime検証は未実施。
関連: `movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts`, `movie-dashboard/src/data/maskRevealHandoffFidelity.ts`, `movie-dashboard/src/components/MaskRevealSceneHandoffCard.tsx`, `docs/research/2026-08-26-movie-tool-learning-run-01.md`, `docs/research/2026-08-26-movie-tool-learning-run-02.md`

> **Run 33 correction (2026-08-26):** このDecisionの旧版には「ローカル無料版DaVinci Resolve 21.0.4を確認した」という追記があったが、その観測を裏付ける再現可能なruntime evidenceはrepoに保存されておらず、Blackmagic Designの現行Support Centerが示す最新Resolve 21配布は21.0.3 (2026-07-22)である。したがって旧21.0.4観測はCurrent authorityから撤回する。現在は`targetPatch=21.0.3`をplanning baselineとし、`testedPatch`はActual Canaryがlive runtime identityを記録するまで未設定とする。

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

## Run 33 correction: 旧「ローカル21.0.4観測」の扱い

このDecisionの旧版には、ローカル環境について次のような観測メモがあった。

- `DaVinci Resolve.app`無料版21.0.4と判断した
- Python API接続が`None`
- External scripting設定項目が見つからない
- その結果、無料版では外部scriptingを使えないと判断した

しかし、これらを同一executionとして再現可能にするSession/evidence/runtime identity captureがrepoに保存されていない。さらに、2026-08-26時点のBlackmagic Design Support Centerが示す最新Resolve 21配布は21.0.3であり、21.0.4の公式配布根拠を確認できない。

したがって今後は:

```text
OLD_LOCAL_NOTE != RUNTIME_EVIDENCE
TARGET_PATCH != TESTED_PATCH
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
```

として扱う。

旧メモから得た「Free/Studioやexternal scripting capabilityを実環境ごとに確認する」という教訓自体は維持するが、**21.0.4というversion値やFree版scripting制約を、その旧メモだけでCurrent Runtime Verifiedへ昇格しない**。

Actualでは必ず:

1. immutable Canary Sessionを先に作る
2. live Resolve product/version/edition/platformを記録する
3. そのexact runtimeでcapabilityを観測する
4. evidence validatorを通す
5. 独立execution countを満たすまでcanonical promotionしない

という順序を使う。

## 現在のversion authority

- Resolve planning target: `21.0.3`
- Resolve tested patch: `null` / Actual待ち
- exact installed local runtime: Actual Canaryで再取得するまで未確定

`resolveHandoffPolicy.ts`もこの区別をmachine-readableに保持する。

## 次にやるべきこと(優先順位)

1. まず現在インストールされているResolveで`docs/prompts/2026-08-26-resolve21-lottie-drfx-local-actual-agent.md`を使い、live runtime identityを取得してLottie/DRFX Actualを実行する。Free/Studioやpatchは事前推測せず観測値を保存する。
2. 実Palmier exportが利用できるローカル環境で`DV21-PALMIER-FCPXML-01`をunblockし、clean Resolve import/readbackを実行する。
3. Canaryが2回再現してから、該当propertyだけ`evidenceState: "RUNTIME_VERIFIED"`相当へ昇格する(1回の成功では不十分、既存ルールに準拠)。
4. Studio scriptingが必要なrecipeは、actual edition/runtimeがそのsurfaceを本当に提供する場合だけ別Canaryで検証する。
5. Mask Reveal以外のPatternがHuman Master Sceneを持つようになったら、同じ`maskRevealHandoffFidelity.ts`のパターンを横展開する。
