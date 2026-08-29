import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { assertCompleteOrAbsent, classifyMediaSet } from "./media-qa-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = fs.readFileSync(path.join(root, "src/data/demoStockMediaCatalog.ts"), "utf8");
const workspaceData = fs.readFileSync(path.join(root, "src/data/motionZukanProductionWorkspace.ts"), "utf8");
const shelf = fs.readFileSync(path.join(root, "src/components/DemoStockMediaShelf.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");
const studioPackage = fs.readFileSync(path.join(root, "../motion-studio/package.json"), "utf8");
const dummyPublisher = fs.readFileSync(path.join(root, "../motion-studio/scripts/publish-opening-dummy-render.mts"), "utf8");
const errors = [];

const expectedFiles = new Map([
  ["public/demo-assets/stock-photos/pexels-17630524-1280x720.jpg", "9e842a64c6df0a1e3f62f15bef827eb3a270491d830c2dec75743ae4e9a95943"],
  ["public/demo-assets/stock-photos/pexels-18858568-1280x720.jpg", "27785614a5378ce3851fff951a4c4a300d64014208bd52645086a4a5371f39b9"],
  ["public/demo-assets/stock-photos/pexels-27687897-1280x720.jpg", "d5d65a1abff9a43b9b16bc2ba4e3494b9f67bf2e59d3d269cfeaad6e1cdfc331"],
  ["public/demo-assets/stock-photos/pexels-27954353-1280x720.jpg", "fc4a1dbf8304300f06d544b2cb6d99d60d6632bf3060f782ad8f913c6f583483"],
  ["public/demo-assets/stock-photos/pexels-30219174-1280x720.jpg", "ce8a35d7cef639768bbbb986ad5eab9aa5eebb2f158b9e25b3e72230213ee37d"],
  ["public/demo-assets/stock-photos/pexels-33029121-1280x720.jpg", "7c6269f640f56c2aff969c210f78e32cfe90496c6a93e15748c9c197593c7730"],
  ["public/demo-assets/stock-photos/pexels-33741754-1280x720.jpg", "892dee588bc8699f4e3869a237806133f172bf5e4dd23778a202eb1941f18639"],
  ["public/demo-assets/stock-photos/pexels-35511825-1280x720.jpg", "1b82866b9af0c181564a152495e0bae19a1b4b4b778d019b4e60d59605f27ff8"],
  ["public/demo-assets/stock-photos/pexels-36708862-1280x720.jpg", "efd57449103cdd7a9be65f9b937c9315e1d9195bcee2b6293b807f853d911b5f"],
  ["public/demo-assets/stock-photos/pexels-36807071-1280x720.jpg", "2b5940cabbe823827cb298e73e6e4224bc707b756e4efe248e1497c4fc1a8636"],
  ["public/demo-assets/stock-photos/pexels-4180047-1280x720.jpg", "516ac2aad1801f705a20f5e1fa43e80d57c48ad9aa54e754ef9ddbda2cf5ba53"],
  ["public/demo-assets/bgm-candidates/pixabay-cinematic-wedding-223110.mp3", "10dccc08254869fa33faacd304c7398b06e2351448129530a87a4254988c836b"],
  ["public/demo-assets/bgm-candidates/pixabay-acoustic-wedding-guitar-359697.mp3", "64b09c41d219e371cd850a7874d41f6aec101451eb331e33654c3f3580421723"],
  ["public/demo-assets/bgm-candidates/pixabay-simple-upbeat-158080.mp3", "be7ff0127db7b57b5ff799c2d641ffccd5700d17bd1ac29db7256a416ce77467"],
  ["public/demo-assets/bgm-candidates/pixabay-ambient-piano-347950.mp3", "600bbd1404468e4c2f39f9d05e21640010e51e7748439b600e557871ca75efa2"],
]);

const expectedDemoRenders = [
  "public/demo-renders/motion-zukan-cinematic-v1.mp4",
  "public/demo-renders/motion-zukan-acoustic-v1.mp4",
  "public/demo-renders/motion-zukan-upbeat-v1.mp4",
  "public/demo-renders/motion-zukan-ambient-v1.mp4",
];
const expectedDummyProductionRender = "public/demo-renders/opening-v1-dummy-production.mp4";
const expectedDummyProductionManifest = "public/demo-renders/opening-v1-dummy-production.manifest.json";
const demoBinaryFiles = [...expectedFiles.keys(), ...expectedDemoRenders, expectedDummyProductionRender];
const demoMediaState = classifyMediaSet(demoBinaryFiles.map((relative) => path.join(root, relative)));
assertCompleteOrAbsent("Demo stock/render media", demoMediaState, errors);

if (demoMediaState.mode === "COMPLETE") {
for (const [relative, expectedHash] of expectedFiles) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).size === 0) {
    errors.push(`missing or empty: ${relative}`);
    continue;
  }
  const actualHash = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
  if (actualHash !== expectedHash) errors.push(`sha256 mismatch: ${relative}`);
}

for (const relative of [...expectedFiles.keys()].filter((file) => file.endsWith(".jpg"))) {
  const result = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", path.join(root, relative)], { encoding: "utf8" });
  if (result.status !== 0 || result.stdout.trim() !== "1280,720") errors.push(`photo is not 1280x720: ${relative}`);
}

for (const relative of [...expectedFiles.keys()].filter((file) => file.endsWith(".mp3"))) {
  const result = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name,sample_rate,channels", "-of", "csv=p=0", path.join(root, relative)], { encoding: "utf8" });
  if (result.status !== 0 || result.stdout.trim() !== "mp3,44100,2") errors.push(`BGM is not MP3 44.1kHz stereo: ${relative}`);
}

for (const relative of expectedDemoRenders) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).size === 0) {
    errors.push(`missing or empty rendered demo: ${relative}`);
    continue;
  }
  const videoProbe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_frames", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames", "-show_entries", "format=duration", "-of", "json", absolute], { encoding: "utf8" });
  const audioProbe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name,sample_rate,channels", "-of", "json", absolute], { encoding: "utf8" });
  try {
    const video = JSON.parse(videoProbe.stdout).streams?.[0];
    const duration = Number(JSON.parse(videoProbe.stdout).format?.duration);
    const audio = JSON.parse(audioProbe.stdout).streams?.[0];
    if (videoProbe.status !== 0 || video?.codec_name !== "h264" || video?.width !== 1280 || video?.height !== 720 || video?.r_frame_rate !== "30/1" || video?.nb_read_frames !== "600" || duration < 20 || duration > 20.1) {
      errors.push(`rendered demo video contract mismatch: ${relative}`);
    }
    if (audioProbe.status !== 0 || audio?.codec_name !== "aac" || audio?.sample_rate !== "48000" || audio?.channels !== 2) {
      errors.push(`rendered demo audio contract mismatch: ${relative}`);
    }
  } catch {
    errors.push(`rendered demo ffprobe output was invalid: ${relative}`);
  }
}

}

if (demoMediaState.mode === "COMPLETE") {
  const relative = expectedDummyProductionRender;
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).size === 0) {
    errors.push(`missing or empty dummy production render: ${relative}`);
  } else {
    const videoProbe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_frames", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames", "-show_entries", "format=duration", "-of", "json", absolute], { encoding: "utf8" });
    const audioProbe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name,sample_rate,channels", "-of", "json", absolute], { encoding: "utf8" });
    try {
      const videoResult = JSON.parse(videoProbe.stdout);
      const video = videoResult.streams?.[0];
      const duration = Number(videoResult.format?.duration);
      const audio = JSON.parse(audioProbe.stdout).streams?.[0];
      if (videoProbe.status !== 0 || video?.codec_name !== "h264" || video?.width !== 1920 || video?.height !== 1080 || video?.r_frame_rate !== "30/1" || video?.nb_read_frames !== "1800" || duration < 60 || duration > 60.1) {
        errors.push(`dummy production video contract mismatch: ${relative}`);
      }
      if (audioProbe.status !== 0 || audio?.codec_name !== "aac" || audio?.sample_rate !== "48000" || audio?.channels !== 2) {
        errors.push(`dummy production audio contract mismatch: ${relative}`);
      }
    } catch {
      errors.push(`dummy production ffprobe output was invalid: ${relative}`);
    }
  }
}

{
  const manifestPath = path.join(root, expectedDummyProductionManifest);
  const renderPath = path.join(root, expectedDummyProductionRender);
  if (!fs.existsSync(manifestPath)) {
    errors.push(`missing dummy production integrity manifest: ${expectedDummyProductionManifest}`);
  } else {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      if (manifest.schemaVersion !== "opening-v1-dummy-render-manifest/v1" || manifest.authority !== "DUMMY_PRODUCTION_SIMULATION" || manifest.publicationApproved !== false || manifest.qa?.status !== "PASSED") {
        errors.push("dummy production manifest authority or QA guard mismatch");
      }
      if (!/^[a-f0-9]{64}$/.test(manifest.artifact?.sha256 ?? "") || !(manifest.artifact?.byteSize > 0)) {
        errors.push("dummy production manifest artifact identity is invalid");
      }
      if (demoMediaState.mode === "COMPLETE") {
        const actualHash = crypto.createHash("sha256").update(fs.readFileSync(renderPath)).digest("hex");
        if (manifest.artifact?.sha256 !== actualHash || manifest.artifact?.byteSize !== fs.statSync(renderPath).size) {
          errors.push("dummy production manifest hash/size does not match MP4");
        }
      }
      if (manifest.video?.codec !== "h264" || manifest.video?.width !== 1920 || manifest.video?.height !== 1080 || manifest.video?.fps !== "30/1" || manifest.video?.frames !== "1800") {
        errors.push("dummy production manifest video contract mismatch");
      }
      if (manifest.audio?.codec !== "aac" || manifest.audio?.sampleRate !== "48000" || manifest.audio?.channels !== 2) {
        errors.push("dummy production manifest audio contract mismatch");
      }
    } catch (error) {
      errors.push(`dummy production manifest is invalid: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

const count = (token) => catalog.split(token).length - 1;
if (count('authority: "DEMO_ONLY_NOT_USER_MEDIA"') !== 12) errors.push("photo authority must appear once in the interface and once per 11 records");
if (count('authority: "BGM_CANDIDATE"') !== 5) errors.push("BGM authority must appear once in the interface and once per 4 records");
if (count('authority: "DEMO_RENDER_ONLY"') !== 5) errors.push("render authority must appear once in the interface and once per 4 records");
for (const genre of ["CINEMATIC", "ACOUSTIC", "UPBEAT", "AMBIENT"]) {
  if (!catalog.includes(`genre: "${genre}"`)) errors.push(`missing BGM genre: ${genre}`);
}
for (const token of ['schemaVersion: "demo-stock-media/v1"', "contentIdRegistered: true", "finalPublicationApproved: false", "https://www.pexels.com/legal-pages/license/", "https://pixabay.com/service/license-summary/"]) {
  if (!catalog.includes(token)) errors.push(`catalog missing rights/provenance token: ${token}`);
}
for (const token of ["DUMMY_PRODUCTION_SIMULATION", "canonicalPhotoSlots: 11", 'bgmStatus: "DUMMY_CANDIDATE"']) {
  if (!catalog.includes(token)) errors.push(`catalog missing dummy production guard token: ${token}`);
}
for (const token of ["STOCK DEMO / NOT YOUR PHOTOS", "DUMMY PRODUCTION SIMULATION / 60-SECOND FULL RENDER", "本人写真・実公開承認を示すものではありません", 'download="opening-v1-dummy-production.mp4"', "60秒MP4をダウンロード", 'cache: "no-store"', 'manifest.authority !== "DUMMY_PRODUCTION_SIMULATION"', 'qa?.status !== "PASSED"', "QA PASSED · SHA-256", "QA manifestを検証できません", "QA manifest JSONを開く", "20-SECOND RENDERED DEMOS", "DEMO RENDER ONLY · 最終公開は未承認", "DEMO PACK / SAFE IMPORT", "11枚＋選択BGMを素材BOXへ", "デモパックJSONをコピー", "Content ID登録済み", "最終公開は未承認", "<video", "<audio controls"]) {
  if (!shelf.includes(token)) errors.push(`media shelf missing disclosure token: ${token}`);
}
if (!page.includes("<DemoStockMediaShelf />")) errors.push("VisualMotionLibrary must mount DemoStockMediaShelf");
for (const token of ["render:opening-v1:dummy-production", "publish:opening-v1:dummy-production"]) {
  if (!studioPackage.includes(token)) errors.push(`motion-studio package missing reproducible dummy publish command: ${token}`);
}
for (const token of ["DUMMY_PRODUCTION_SIMULATION", "publicationApproved !== false", "check-opening-render.mts", "copyFileSync", "opening-v1-dummy-render-manifest/v1", "createHash('sha256')"]) {
  if (!dummyPublisher.includes(token)) errors.push(`dummy publisher missing fail-closed token: ${token}`);
}

try {
  const executableSource = `${catalog}\n${workspaceData}\nexport function exercise() {
    const pack = buildDemoStockMediaPack("ACOUSTIC");
    const empty = emptyMotionZukanProductionWorkspaceState();
    const once = applyDemoStockMediaPack(empty, pack);
    const twice = applyDemoStockMediaPack(once, pack);
    const assigned = assignDemoAssetsToEmptyScenes(once, ["scene-a", "scene-b"], "OPENING");
    const handoff = buildMotionZukanProductionHandoff({ schemaVersion: "motion-zukan-composer-state/v1", scenes: [], timelines: [] }, once, "opening");
    const parsedHandoff = parseMotionZukanProductionHandoff(JSON.stringify(handoff));
    const rejectedHandoff = parseMotionZukanProductionHandoff(JSON.stringify({ ...handoff, guards: { ...handoff.guards, demoAssetsAreProduction: true } }));
    const malformedHandoff = parseMotionZukanProductionHandoff("not-json");
    const removed = removeDemoStockMediaPack(assigned);
    const rejected = applyDemoStockMediaPack(empty, { ...pack, authority: "PRODUCTION" });
    return { pack, empty, once, twice, assigned, handoff, parsedHandoff, rejectedHandoff, malformedHandoff, removed, rejected };
  }`;
  const transpiled = ts.transpileModule(executableSource, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  });
  const diagnostics = transpiled.diagnostics ?? [];
  if (diagnostics.some((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)) {
    throw new Error("TypeScript transpilation reported an error");
  }
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString("base64")}`;
  const { pack, empty, once, twice, assigned, handoff, parsedHandoff, rejectedHandoff, malformedHandoff, removed, rejected } = (await import(moduleUrl)).exercise();
  if (pack.photos.length !== 11 || pack.bgmCandidate.genre !== "ACOUSTIC") errors.push("demo pack builder returned the wrong catalog selection");
  if (pack.guards.userMediaApproved !== false || pack.guards.finalPublicationApproved !== false) errors.push("demo pack authority guards were relaxed");
  if (once.assets.length !== 11 || once.assets.some((asset) => !asset.placeholder)) errors.push("demo pack import must add 11 placeholder assets");
  if (once.assets.some((asset) => !asset.suitability.includes("OPENING") || !asset.suitability.includes("PROFILE"))) errors.push("demo photos must remain available to both demo workspaces");
  if (new Set(once.assets.map((asset) => asset.assetId)).size !== 11 || twice.assets.length !== 11) errors.push("demo pack import is not idempotent");
  if (once.demoBgmSelection?.authority !== "BGM_CANDIDATE" || once.demoBgmSelection?.finalPublicationApproved !== false) errors.push("demo BGM selection lost its candidate-only guard");
  if (assigned.sceneMeta.length !== 2 || assigned.sceneMeta.some((meta) => meta.assetIds.length !== 1)) errors.push("demo photos were not assigned one-per-empty-scene");
  if (handoff.workspaceChecksPassed !== false || handoff.guards.externalProductionGateEvaluated !== false || handoff.guards.demoAssetsAreProduction !== false || handoff.guards.bgmCandidateApproved !== false) errors.push("production handoff relaxed an external or demo authority guard");
  if (!parsedHandoff.ok || parsedHandoff.handoff.workspace.assets.length !== 11) errors.push("valid production handoff did not round-trip");
  if (rejectedHandoff.ok || malformedHandoff.ok) errors.push("invalid production handoff was not rejected fail-closed");
  if (removed.assets.length !== 0 || removed.demoBgmSelection !== null || removed.sceneMeta.some((meta) => meta.assetIds.length !== 0)) errors.push("demo pack removal left demo-only state behind");
  if (rejected !== empty) errors.push("unauthorized demo pack was not rejected without mutation");
} catch (error) {
  errors.push(`demo pack executable regression failed: ${error instanceof Error ? error.message : String(error)}`);
}

const previewRoot = path.join(root, "public/motion-previews");
const previewBinaries = fs.existsSync(previewRoot)
  ? fs.readdirSync(previewRoot, { recursive: true }).filter((entry) => /\.(?:mp4|png)$/i.test(String(entry)))
  : [];
if (previewBinaries.length > 0) {
const photoPreviewOracle = spawnSync(process.execPath, [path.join(root, "scripts/verify-photo-motion-stock-previews.mjs")], { encoding: "utf8" });
if (photoPreviewOracle.status !== 0) {
  errors.push(`photo motion stock preview oracle failed: ${photoPreviewOracle.stderr.trim() || photoPreviewOracle.stdout.trim()}`);
} else if (photoPreviewOracle.stdout.trim()) {
  console.log(photoPreviewOracle.stdout.trim());
}

const typographyPreviewOracle = spawnSync(process.execPath, [path.join(root, "scripts/verify-typography-motion-previews.mjs")], { encoding: "utf8" });
if (typographyPreviewOracle.status !== 0) {
  errors.push(`typography motion preview oracle failed: ${typographyPreviewOracle.stderr.trim() || typographyPreviewOracle.stdout.trim()}`);
} else if (typographyPreviewOracle.stdout.trim()) {
  console.log(typographyPreviewOracle.stdout.trim());
}

const transitionPreviewOracle = spawnSync(process.execPath, [path.join(root, "scripts/verify-transition-motion-previews.mjs")], { encoding: "utf8" });
if (transitionPreviewOracle.status !== 0) {
  errors.push(`transition motion preview oracle failed: ${transitionPreviewOracle.stderr.trim() || transitionPreviewOracle.stdout.trim()}`);
} else if (transitionPreviewOracle.stdout.trim()) {
  console.log(transitionPreviewOracle.stdout.trim());
}

const graphicPreviewOracle = spawnSync(process.execPath, [path.join(root, "scripts/verify-graphic-motion-previews.mjs")], { encoding: "utf8" });
if (graphicPreviewOracle.status !== 0) {
  errors.push(`graphic motion preview oracle failed: ${graphicPreviewOracle.stderr.trim() || graphicPreviewOracle.stdout.trim()}`);
} else if (graphicPreviewOracle.stdout.trim()) {
  console.log(graphicPreviewOracle.stdout.trim());
}

const sourceCutPreviewOracle = spawnSync(process.execPath, [path.join(root, "scripts/verify-source-cut-motion-previews.mjs")], { encoding: "utf8" });
if (sourceCutPreviewOracle.status !== 0) {
  errors.push(`source-cut representative preview oracle failed: ${sourceCutPreviewOracle.stderr.trim() || sourceCutPreviewOracle.stdout.trim()}`);
} else if (sourceCutPreviewOracle.stdout.trim()) {
  console.log(sourceCutPreviewOracle.stdout.trim());
}
} else {
  console.log("Motion preview pixel oracles OK (code-only): local preview binaries are absent by Git media policy.");
}

if (errors.length) {
  console.error(`Demo stock media contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(demoMediaState.mode === "COMPLETE"
  ? "Demo stock media contracts OK: 11 hashed Pexels photos, 4 hashed Pixabay BGM candidates, 4 rendered 20-second genre demos, and the 60-second full-HD dummy production simulation are present; publication guards remain explicit."
  : "Demo stock media contracts OK (code-only): local stock/render binaries are absent; catalog, manifest authority, reproducibility, and publication guards passed.");
