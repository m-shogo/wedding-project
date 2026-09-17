// 映像Pinterest(/movie-coach/motion-pinterest)の外部実例アトラス契約。
// 正本: docs/decisions/2026-09-11-motion-pinterest-external-atlas-only.md
//
// 画面が実際に使う externalMotionAtlasRuntime.ts(重複除去後)を評価する。
// 使い方: node scripts/verify-external-motion-atlas-contracts.mjs [--summary]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src/data");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const errors = [];
const showSummary = process.argv.includes("--summary");

const GENRES = ["IMAGE", "TEXT", "EFFECT", "IMAGE_TEXT"];
const MEDIA_TYPES = ["GIF", "YOUTUBE", "VIDEO_PAGE", "IMAGE"];
// 自作・内部カタログの混入を示す語。アトラスは外部実例だけ。
const INTERNAL_MARKERS = [
  /remotion/i,
  /motion\s*kit/i,
  /director\s*recipe/i,
  /repo-stock/i,
  /visualMotionLibrary/,
  /startMotionKit/,
  /ACTUAL_DAVINCI_RENDER/,
];

const atlasFiles = fs
  .readdirSync(dataDir)
  .filter((name) => /^externalMotionAtlas.*\.ts$/.test(name))
  .sort();
const additionFiles = atlasFiles.filter((name) => /^externalMotionAtlasAdditions\d*\.ts$/.test(name));

// 1. 追加ファイルがruntimeへ配線されているか(追加だけして読み込み忘れる事故を防ぐ)。
const runtimeSource = read("src/data/externalMotionAtlasRuntime.ts");
for (const file of additionFiles) {
  const exportName = file.replace(/\.ts$/, "");
  const imported = runtimeSource.includes(`from "./${exportName}"`);
  const combined = new RegExp(`^\\s*${exportName},\\s*$`, "m").test(runtimeSource);
  if (!imported || !combined) errors.push(`${file}: externalMotionAtlasRuntime.ts の combinedSources に配線されていない`);
}

// 2. runtimeを実際に評価する(TS → ESMへ変換して一時ディレクトリでimport)。
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "external-motion-atlas-"));
let atlas = [];
let rawCount = 0;
try {
  for (const file of atlasFiles) {
    const source = read(`src/data/${file}`);
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: false },
      fileName: file,
    });
    const rewritten = outputText.replace(/from "\.\/(externalMotionAtlas[A-Za-z0-9]*)"/g, 'from "./$1.mjs"');
    fs.writeFileSync(path.join(tmp, file.replace(/\.ts$/, ".mjs")), rewritten);
  }
  const runtime = await import(pathToFileURL(path.join(tmp, "externalMotionAtlasRuntime.mjs")).href);
  atlas = runtime.externalMotionAtlas;
  for (const file of atlasFiles.filter((name) => name !== "externalMotionAtlasRuntime.ts")) {
    const mod = await import(pathToFileURL(path.join(tmp, file.replace(/\.ts$/, ".mjs"))).href);
    for (const value of Object.values(mod)) if (Array.isArray(value)) rawCount += value.length;
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

if (!Array.isArray(atlas) || atlas.length === 0) errors.push("externalMotionAtlas が空、または配列ではない");

// 3. 1件ずつの形式。
const isHttps = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};
const youtubeIdFrom = (item) =>
  item.youtubeId ?? item.sourceUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)?.[1];

const ids = new Set();
for (const item of atlas) {
  const label = item?.id ?? "(id無し)";
  if (!item.id || !/^[a-z0-9][a-z0-9-]*$/.test(item.id)) errors.push(`${label}: id は英小文字・数字・ハイフンのみ`);
  if (ids.has(item.id)) errors.push(`${label}: id が重複している`);
  ids.add(item.id);
  if (!GENRES.includes(item.genre)) errors.push(`${label}: genre は 画像/テキスト/エフェクト/画像＋テキスト の4つだけ (${item.genre})`);
  if (!MEDIA_TYPES.includes(item.mediaType)) errors.push(`${label}: mediaType が不正 (${item.mediaType})`);
  for (const key of ["titleJa", "titleOriginal", "sourceName", "descriptionJa"]) {
    if (typeof item[key] !== "string" || item[key].trim() === "") errors.push(`${label}: ${key} が空`);
  }
  if (![1, 2, 3].includes(item.difficulty)) errors.push(`${label}: difficulty は1〜3`);
  if (!Array.isArray(item.tags) || item.tags.length === 0) errors.push(`${label}: tags が空`);
  // 外部実例なので元URLは必須。ローカルパスや自作renderを入れない。
  if (!isHttps(item.sourceUrl)) errors.push(`${label}: sourceUrl は https の外部URL (${item.sourceUrl})`);
  if (item.previewUrl !== undefined && !isHttps(item.previewUrl)) {
    errors.push(`${label}: previewUrl は https の外部URL (ローカル生成物は禁止) (${item.previewUrl})`);
  }
  if (item.posterUrl !== undefined && !isHttps(item.posterUrl)) {
    errors.push(`${label}: posterUrl は https の外部URL (${item.posterUrl})`);
  }
  if (item.mediaType === "YOUTUBE" && !youtubeIdFrom(item)) errors.push(`${label}: YOUTUBE なのに動画IDを取得できない`);
  if ((item.mediaType === "GIF" || item.mediaType === "IMAGE") && !item.previewUrl) {
    errors.push(`${label}: ${item.mediaType} は previewUrl が必須 (プレビュー優先)`);
  }
  const haystack = [item.id, item.sourceName, item.sourceUrl, item.previewUrl ?? "", ...(item.tags ?? [])].join(" ");
  for (const marker of INTERNAL_MARKERS) {
    if (marker.test(haystack)) errors.push(`${label}: 自作/内部カタログの混入が疑われる (${marker})`);
  }
}

for (const genre of GENRES) {
  if (!atlas.some((item) => item.genre === genre)) errors.push(`genre ${genre} が0件`);
}

// 4. 画面は外部アトラスだけを読む。内部カタログをimportしない。
const page = read("src/pages/MotionPinterest.tsx");
if (!page.includes('from "../data/externalMotionAtlasRuntime"')) {
  errors.push("MotionPinterest.tsx は externalMotionAtlasRuntime を読むこと");
}
for (const forbidden of ["visualMotionLibrary", "startMotionKit", "directorRecipeCatalog", "motionPreviewEvidence"]) {
  if (page.includes(forbidden)) errors.push(`MotionPinterest.tsx が内部カタログ ${forbidden} を参照している`);
}
const app = read("src/App.tsx");
if (!/path="movie-coach\/motion-pinterest" element=\{<MotionPinterest \/>\}/.test(app)) {
  errors.push("App.tsx の /movie-coach/motion-pinterest が MotionPinterest を描画していない");
}

if (showSummary || errors.length) {
  const count = (key) =>
    Object.fromEntries([...new Set(atlas.map((item) => item[key]))].sort().map((value) => [value, atlas.filter((item) => item[key] === value).length]));
  console.log(`files=${atlasFiles.length} raw=${rawCount} runtime=${atlas.length} deduped=${rawCount - atlas.length}`);
  console.log("genre", count("genre"));
  console.log("mediaType", count("mediaType"));
  // MotionPinterest.tsx の Preview と同じ判定順。LINK_ONLY は一覧で動きが見えないカード。
  const previewKind = (item) => {
    if (youtubeIdFrom(item)) return "YOUTUBE_EMBED";
    if (/vimeo\.com\/(?:video\/)?\d+/.test(item.sourceUrl)) return "VIMEO_EMBED";
    if (item.previewUrl && /\.(?:mp4|webm)(?:\?|$)/i.test(item.previewUrl)) return "DIRECT_VIDEO";
    if ((item.mediaType === "GIF" || item.mediaType === "IMAGE") && item.previewUrl) return "IMAGE_OR_GIF";
    if (item.posterUrl) return "POSTER_ONLY";
    return "LINK_ONLY";
  };
  const kinds = {};
  for (const item of atlas) kinds[previewKind(item)] = (kinds[previewKind(item)] ?? 0) + 1;
  console.log("previewKind", kinds);
  const linkOnly = atlas.filter((item) => previewKind(item) === "LINK_ONLY");
  if (linkOnly.length) {
    console.log("LINK_ONLY items:");
    for (const item of linkOnly) console.log(`  ${item.id} | ${item.sourceName} | preview=${item.previewUrl ?? "-"}`);
  }
}

if (errors.length) {
  console.error(`external motion atlas contracts failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`external motion atlas contracts passed (${atlas.length} items)`);
