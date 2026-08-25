import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sidebar = fs.readFileSync(path.join(root, "src/components/Sidebar.tsx"), "utf8");
const errors = [];

const requiredSections = ["CORE", "LEARN", "REVIEW / DECIDE", "AI VIDEO", "PRODUCTION", "SYSTEM"];
for (const section of requiredSections) {
  if (!sidebar.includes(`label: "${section}"`)) errors.push(`sidebar section missing: ${section}`);
}

const requiredRoutes = [
  "/",
  "/movie-coach",
  "/movie-coach/profile",
  "/movie-coach/auto",
  "/movie-coach/dictionary",
  "/movie-coach/start-rhythm",
  "/movie-coach/start-selection",
  "/movie-coach/start-production",
  "/movie-coach/timeline",
  "/movie-coach/color",
  "/movie-coach/audio",
  "/movie-coach/fusion",
  "/movie-coach/shortcuts",
  "/movie-coach/book",
  "/movie-coach/review",
  "/movie-coach/compare",
  "/movie-coach/reference",
  "/opening-photo-intake",
  "/opening-bgm-intake",
  "/video-shot-planner",
  "/video-prompt-builder",
  "/video-generation-queue",
  "/video-preflight",
  "/video-result-review",
  "/video-asset-reprobe",
  "/video-failure-lab",
  "/video-model-evidence",
  "/palmier-handoff",
  "/storyboard",
  "/assets",
  "/clips",
  "/profile-planner",
  "/prompts",
  "/missing",
  "/production-map",
  "/quality",
  "/capcut",
  "/asset-placement-guide",
  "/data",
  "/guide",
];

for (const route of requiredRoutes) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = sidebar.match(new RegExp(`to: "${escaped}"`, "g")) ?? [];
  if (matches.length !== 1) errors.push(`sidebar route ${route} expected once, found ${matches.length}`);
}

if (!sidebar.includes('label: "Movie Coach / Today"')) errors.push("primary Movie Coach link must explain Today purpose");
if (!sidebar.includes('label: "StaRt Rhythm Lab"')) errors.push("StaRt rhythm study must be visible in learning navigation");
if (!sidebar.includes('label: "StaRt Selection / Next"')) errors.push("StaRt Selection Mode must expose the next production action");
if (!sidebar.includes('label: "StaRt制作ワークスペース"')) errors.push("StaRt Production Workspace must be visible in review navigation");
if (!sidebar.includes('label: "Opening写真11枚"')) errors.push("Opening photo intake must be visible in production navigation");
if (!sidebar.includes('label: "Opening BGM"')) errors.push("Opening BGM intake must be visible in production navigation");
if (!sidebar.includes('className="flex-1 p-3 overflow-y-auto"')) errors.push("grouped long navigation must remain scrollable");

if (errors.length) {
  console.error(`Sidebar information architecture contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Sidebar information architecture contracts OK: ${requiredSections.length} sections / ${requiredRoutes.length} routes.`);
