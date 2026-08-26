import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const card = fs.readFileSync(path.join(root, "src/components/MaskRevealSceneHandoffCard.tsx"), "utf8");
const routingMatrix = fs.readFileSync(path.join(root, "src/components/TypographyProductionRoutingMatrix.tsx"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const workspace = fs.readFileSync(path.join(root, "src/components/MaskRevealEditableWorkspace.tsx"), "utf8");
const bundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const adjustability = fs.readFileSync(path.join(root, "src/data/resolveHumanAdjustability.ts"), "utf8");
const outputClarification = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md"), "utf8");
const presetBridge = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'buildMaskRevealSceneProductionBundle(scene)',
  'buildMaskRevealSceneProductionBundleJson(scene)',
  'EXPORT / ADAPTER',
  'bundle.sceneMarkerId',
  'Scene revision:',
  'bundle.sourceRevision',
  'Palmier Timeline:',
  'bundle.timeline.projectTimelineXmlFileName',
  'Sidecar JSON:',
  'bundle.timeline.sidecarFileName',
  'DaVinci Actual:',
  '"PENDING"',
  'Sidecar JSONをコピー',
  'Sidecar JSONを書き出す',
  'Export詳細を見る',
  'navigator.clipboard.writeText(json)',
  'downloadText(json, bundle.timeline.sidecarFileName)',
  'Human MasterはSceneの人間が理解できる値です。',
  'JSON / XML自体はHuman Masterではありません。',
  'Sceneを編集するとupdatedAtが変わり、このexportも現在のSceneInstanceから再生成されます。',
  'NLE XML自体はPalmier実timelineからexportします。',
  'getResolveHumanAdjustability',
  'Human adjustability:',
  'Platform:',
  'Late edit QA:',
  'Editability(内部parameterをどこまで編集できるか)と Human Adjustability(人間がどれだけ簡単に直せるか)は別判定です。',
  'import { TypographyProductionRoutingMatrix } from "./TypographyProductionRoutingMatrix"',
  '<TypographyProductionRoutingMatrix />',
]) {
  requireText(card, token, `Scene Handoff UI missing: ${token}`);
}

for (const token of [
  'Typography 9候補のProduction Routingを見る',
  'typographyProductionRoutes.map',
  'getRemotionElementCandidate(route.patternId)',
  'DaVinci routeあり',
  'DaVinci翻訳待ち',
  'Element CI:',
  'Studio Actual:',
  'Palmier timing: READY',
  'DaVinci Actual: NOT_RUN',
  'type-mask-reveal のみです。',
  'production-readyではありません。',
]) {
  requireText(routingMatrix, token, `Typography routing matrix missing honesty/control token: ${token}`);
}

for (const token of [
  'export type HumanAdjustabilityClass =',
  '"EASY_INSPECTOR"',
  '"EASY_TIMELINE"',
  '"GUIDED_FUSION"',
  '"ASSISTED_MANUAL"',
  '"BAKED"',
  'export type ResolvePlatformScope = "ALL_DESKTOP" | "MACOS_WINDOWS" | "UNKNOWN"',
  'propertyId: "text-properties"',
  'propertyId: "lottie-overlay"',
  'platformScope: "MACOS_WINDOWS"',
  'propertyId: "audio-volume-keyframes"',
  'evidenceState: "PENDING_RUNTIME"',
]) {
  requireText(adjustability, token, `Human adjustability authority missing: ${token}`);
}

for (const token of [
  'import { MaskRevealSceneHandoffCard } from "./MaskRevealSceneHandoffCard"',
  '<MaskRevealSceneHandoffCard scene={scene} />',
  '採用済みSceneを編集中。変更はfield単位で自動保存されます。',
]) {
  requireText(workspace, token, `Scene Handoff card not connected to live adopted SceneInstance: ${token}`);
}

for (const token of [
  'xmlGeneratedExternally: true',
  'productionReady: false',
  'sourceRevision: scene.updatedAt',
]) {
  requireText(bundle, token, `Scene Handoff UI dependency lost production truth: ${token}`);
}

for (const token of [
  'DAVINCI_IMPLEMENTATION_AVAILABLE',
  'DAVINCI_TRANSLATION_NOT_IMPLEMENTED',
  'actualAppliedEvidence: "NOT_RUN"',
  'productionReady: false',
]) {
  requireText(routing, token, `Typography routing authority missing honest state: ${token}`);
}

for (const token of [
  'AUTHORITATIVE CLARIFICATION',
  '`JSON` は正本フォーマットではない。',
  'Human-readable production values',
  'Canonical structured scene state',
  'Target-specific exporter / adapter',
  'Human-friendly in, tool-native out.',
]) {
  requireText(outputClarification, token, `Output format authority missing: ${token}`);
}

for (const token of [
  'Preset First → Accordion Detail → DaVinci Final Precision.',
  '人間向けPreset → 正規化された内部値 → DaVinci実装値',
  'Preset labelからDaVinci値へ直接飛ばさない。',
]) {
  requireText(presetBridge, token, `Preset-first bridge authority missing: ${token}`);
}

if (card.includes('HUMAN MASTER HANDOFF')) {
  errors.push('Scene export UI must not label JSON/XML serialization itself as HUMAN MASTER HANDOFF');
}
if (/\.xml[`"']\s*,?\s*JSON\.stringify/.test(card) || /downloadText\([^\n]*\.xml/.test(card)) {
  errors.push("Scene Handoff UI must not generate or download fake Palmier NLE XML");
}
if (!card.includes('bundle.preview.productionReady ? "VERIFIED" : "PENDING"')) {
  errors.push("Scene Handoff UI must visibly fail-close DaVinci Actual as PENDING until verified");
}
if (/DaVinci Actual:\s*PASS/.test(routingMatrix)) {
  errors.push("Typography routing matrix must not fabricate DaVinci Actual PASS");
}

if (errors.length) {
  console.error(`Mask Reveal Scene Handoff UI contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Mask Reveal Scene Handoff UI contracts OK: Human-readable Scene values remain Human Master; live SceneInstance drives target-specific sidecar export; Typography 9-candidate production routes are visible without overstating DaVinci coverage; Palmier XML remains external; DaVinci Actual visibly stays PENDING/NOT_RUN until real evidence exists; Human Adjustability remains separate from internal Editability.");
