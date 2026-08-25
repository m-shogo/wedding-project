import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const data = read("src/data/visualMotionLibrary.ts");
const motionKit = read("src/data/startMotionKit.ts");
const samples = read("src/data/motionSampleAssetSets.ts");
const evidence = read("src/data/motionPreviewEvidence.ts");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

// startMotionKit.ts の36 presetをそのままカタログ化する(新規発明ではなくReuse)。
const presetIdMatches = [...motionKit.matchAll(/^\s{2}p\(\s*"([^"]+)"/gm)];
const presetIds = presetIdMatches.map((match) => match[1]);
if (presetIds.length !== 36) {
  errors.push(`startMotionKit.tsのpreset数が想定(36)と異なる: ${presetIds.length}`);
}

requireText(
  data,
  'import { startMotionPresets, type StartMotionPreset } from "./startMotionKit";',
  "visualMotionLibrary.ts must import the existing Motion Kit presets instead of re-authoring them",
);

// 日本語ファースト検索(CLAUDE.md「日本語ファースト」節)のため、35件すべてに
// 固有の日本語エイリアスが用意されていることを検証する(共通useCase訳だけに頼らない)。
const aliasBlockMatch = data.match(/const KIT_JAPANESE_ALIASES: Record<string, string\[\]> = \{([\s\S]*?)\n\};/);
if (!aliasBlockMatch) {
  errors.push("KIT_JAPANESE_ALIASES table is missing");
} else {
  const aliasIds = [...aliasBlockMatch[1].matchAll(/"([a-z0-9-]+)":\s*\[/g)].map((match) => match[1]);
  if (new Set(aliasIds).size !== aliasIds.length) errors.push("KIT_JAPANESE_ALIASES has duplicate preset ids");
  for (const id of presetIds) {
    if (id === "type-mask-slide") continue;
    if (!aliasIds.includes(id)) errors.push(`${id}: KIT_JAPANESE_ALIASESに日本語エイリアスが無い`);
  }
}
requireText(data, "aliases: [...(KIT_JAPANESE_ALIASES[preset.id] ?? []), preset.label],", "Generated patterns must search-prioritize Japanese aliases over the English label");
requireText(
  data,
  'const kitPatternsExcludingMaskSlide = startMotionPresets.filter((preset) => preset.id !== "type-mask-slide");',
  "Motion Zukan v1 must catalog every remaining Motion Kit preset (type-mask-slide is already covered by type-mask-reveal); no further hand-picked subset filter is allowed",
);
requireText(data, "motionPatterns.push(...kitPatternsExcludingMaskSlide.map(kitPresetToPattern));", "Generated patterns must be appended, not replace the existing type-mask-reveal literal");
requireText(data, "motionImplementations.push(...kitPatternsExcludingMaskSlide.map(kitPresetToImplementation));", "Generated implementations missing");
requireText(data, "motionPreviews.push(...kitPatternsExcludingMaskSlide.map(kitPresetToPreview));", "Generated previews missing");

// Honesty invariants for every generated (non-Mask-Reveal) entry.
requireText(data, 'humanDecision: "NONE",\n    usageStage: "NEVER",', "Generated patterns must stay humanDecision=NONE / usageStage=NEVER until a human actually adopts them");
requireText(data, "この図鑑カタログ化ではローカルRender/DaVinci実機検証を行っていない。", "Generated implementations must admit no local render/DaVinci verification happened yet");
requireText(data, "Reuse Before Buildに基づき既存実装をカタログ化した段階。", "Generated previews must admit CONCEPT status until an Actual render exists");
requireText(
  data,
  "ローカルRemotion renderで見た目を確認済みだが、実写真は未投入(DemoBackdrop placeholder)かつDaVinci Actualではないため、verified/statusはCONCEPTのまま据え置く。",
  "Locally-rendered previews must still admit they are not Actual DaVinci evidence and stay unverified",
);

// Style Bible: 映画予告編風・冒険アニメOP風をデフォルトにしない。ANIME_ACCENT系はOpening◎を既定にしない。
requireText(
  data,
  "case \"ANIME_ACCENT\":\n      return { openingFit: \"△\", profileFit: \"×\" };",
  "ANIME_ACCENT presets must not default to a high Opening fit (Style Bible: don't default to anime-OP look)",
);

// 新しい実装カタログは既存のPRODUCTION_READY / ACTUAL_* 禁止ガードと同じ`data`文字列内にあるため、
// 既存のverify-visual-motion-library-contracts.mjsのグローバル正規表現が引き続き適用される。
if (/status:\s*"TESTED"/.test(data) || /status:\s*"PRODUCTION_READY"/.test(data)) {
  errors.push("Motion Zukan v1 additions must not claim TESTED/PRODUCTION_READY implementation status without real local verification");
}

// 追加した汎用sample asset setが、既存sample-typography-welcome-v1のusedBy契約を書き換えていないこと。
requireText(samples, 'usedByPatternIds: ["type-mask-reveal"],\n    usedByPreviewIds: ["preview-type-mask-reveal-repo-concept"],', "sample-typography-welcome-v1's existing usage list must not be rewritten by the v1 catalog batch");
requireText(samples, 'id: "sample-generic-typography-v1"', "Generic typography sample asset set for Motion Zukan v1 missing");
requireText(samples, 'id: "sample-generic-hero-photo-v1"', "Generic hero-photo sample asset set for Motion Zukan v1 missing");
requireText(samples, 'id: "sample-generic-multi-photo-v1"', "Generic multi-photo sample asset set for Motion Zukan v1 missing");

// 2026-08-26のローカルRemotion render QAで「見た目確認済み」を名乗る7件は、
// motionPreviewEvidence.tsに対応するevidence recordを持つこと(主張と証拠の整合)。
const LOCAL_RENDER_SET_MARKER = "LOCAL_RENDER_VERIFIED_2026_08_26 = new Set([";
if (data.includes(LOCAL_RENDER_SET_MARKER)) {
  const start = data.indexOf(LOCAL_RENDER_SET_MARKER) + LOCAL_RENDER_SET_MARKER.length;
  const end = data.indexOf("]);", start);
  const claimed = [...data.slice(start, end).matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  for (const id of claimed) {
    if (!evidence.includes(`patternId: "${id}"`)) {
      errors.push(`${id}: ローカルRender確認済みと主張しているがmotionPreviewEvidence.tsにevidenceが無い`);
    }
  }
} else {
  errors.push("LOCAL_RENDER_VERIFIED_2026_08_26 marker missing (expected local render evidence tracking set)");
}

if (errors.length) {
  console.error(`Motion Zukan Catalog v1 contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Motion Zukan Catalog v1 contracts OK: all ${presetIds.length - 1} remaining Motion Kit presets are cataloged via reuse (not hand-picked/re-authored), stay humanDecision=NONE / usageStage=NEVER / unverified until a human adopts them, and ANIME_ACCENT is not defaulted to a high Opening fit.`,
);
