import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/startMotionShowcase.ts"), "utf8");
const catalog = fs.readFileSync(path.join(root, "src/data/startMotionKit.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartMotionShowcase.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const sidebar = fs.readFileSync(path.join(root, "src/components/Sidebar.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

requireText(data, 'timingState: "blocked-until-cleared-local-audio"', "exact timing must remain blocked until cleared local audio is loaded");
requireText(data, "exactEndMarker: null", "Extended end marker must remain unset until waveform/marker review");
requireText(data, "Web推測秒はGit正本にしない", "web-guessed seconds prohibition missing");
requireText(data, "GitにはLYRIC_### slotだけ", "lyric-slot-only Git policy missing");
requireText(data, "AIで本人性を生成・変形しない", "real-person/dog identity safety rule missing");
requireText(data, "Showcaseの研究用roughでありFinalではない", "Showcase-not-Final rule missing");

for (const section of ["verse-1", "chorus-1", "instrumental-1", "verse-2", "chorus-2", "post-chorus-instrumental", "end"]) {
  requireText(data, `"${section}"`, `Showcase section missing: ${section}`);
}

const slotIds = [...data.matchAll(/slotId: "(SHOW_\d+)"/g)].map((match) => match[1]);
if (slotIds.length < 12) errors.push(`Showcase rough must cover the song arc with at least 12 slots, found ${slotIds.length}`);
if (new Set(slotIds).size !== slotIds.length) errors.push("Showcase slot IDs must be unique");

const phraseSlots = [...data.matchAll(/phraseSlot: "(LYRIC_\d+)"/g)].map((match) => match[1]);
if (phraseSlots.length < 6) errors.push(`Showcase should expose multiple local-only lyric placeholders, found ${phraseSlots.length}`);
if (new Set(phraseSlots).size !== phraseSlots.length) errors.push("lyric placeholder IDs must be unique in the rough timeline");
if (/lyric(Text|Body|Content|Phrase)\s*:/i.test(data)) errors.push("Git must not add a field for copyrighted lyric body text");
if (/song(Start|End)Sec|exact(Start|End)Sec/.test(data)) errors.push("Showcase must not hard-code exact song seconds before local-audio marker review");

const presetIds = [...data.matchAll(/motionPresetId: "([^"]+)"/g)].map((match) => match[1]);
if (presetIds.length !== slotIds.length) errors.push(`every Showcase slot must reference one Motion Kit preset: slots=${slotIds.length}, presets=${presetIds.length}`);
for (const presetId of new Set(presetIds)) {
  if (!catalog.includes(`p("${presetId}"`)) errors.push(`Showcase references unknown Motion Kit preset: ${presetId}`);
}

const plannedCount = (data.match(/status: "planned" ?[},]/g) ?? []).length;
if (plannedCount !== slotIds.length) errors.push(`all rough slots must remain planned until artifact review: planned=${plannedCount}, slots=${slotIds.length}`);
if (/status:\s*"approved"/.test(data)) errors.push("Showcase must not auto-approve slots");

requireText(data, "buildStartShowcasePalmierHandoff", "Palmier rough handoff builder missing");
requireText(data, "Do not let Claude Code and Codex edit the same active Palmier timeline", "Claude/Codex isolated timeline rule missing");
for (const token of ["EXACT TIMING GATE", "Palmier rough handoff copy", "JSON export", "Motion Kit 36", "SHOWCASE ≠ FINAL"]) {
  requireText(page, token, `Showcase page missing: ${token}`);
}
requireText(app, 'path="movie-coach/start-showcase"', "StaRt Motion Showcase route missing");
requireText(sidebar, 'to: "/movie-coach/start-showcase"', "StaRt Motion Showcase navigation missing");
requireText(sidebar, 'label: "StaRt Motion Showcase"', "StaRt Motion Showcase nav label missing");

if (errors.length) {
  console.error(`StaRt Motion Showcase contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`StaRt Motion Showcase contracts OK: ${slotIds.length} rough slots / ${phraseSlots.length} lyric placeholders / no exact seconds / no lyric body.`);
