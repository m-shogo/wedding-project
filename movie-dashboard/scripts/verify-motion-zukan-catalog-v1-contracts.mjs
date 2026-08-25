import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const data = read("src/data/visualMotionLibrary.ts");
const motionKit = read("src/data/startMotionKit.ts");
const samples = read("src/data/motionSampleAssetSets.ts");
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
requireText(data, 'verified: false,\n    notes: "この図鑑カタログ化ではローカルRender/DaVinci実機検証を行っていない。', "Generated implementations must admit no local render/DaVinci verification happened yet");
requireText(data, 'verified: false,\n    notes: "Reuse Before Buildに基づき既存実装をカタログ化した段階。', "Generated previews must admit CONCEPT status until an Actual render exists");

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

if (errors.length) {
  console.error(`Motion Zukan Catalog v1 contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Motion Zukan Catalog v1 contracts OK: all ${presetIds.length - 1} remaining Motion Kit presets are cataloged via reuse (not hand-picked/re-authored), stay humanDecision=NONE / usageStage=NEVER / unverified until a human adopts them, and ANIME_ACCENT is not defaulted to a high Opening fit.`,
);
