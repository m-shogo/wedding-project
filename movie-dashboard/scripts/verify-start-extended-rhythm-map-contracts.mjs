import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/startExtendedRhythmMap.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartMotionShowcase.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

requireText(data, 'timingState: "researched-reference-not-final"', "research timing must never be treated as final");
requireText(data, 'finalTimingAuthority: "cleared-local-audio-waveform-and-markers"', "local audio waveform/marker authority missing");
requireText(data, 'referenceEndSec: 129', "2:09 reference endpoint missing");
requireText(data, "約2:09 / Cメロ開始直前", "human-readable 2:09 endpoint missing");
requireText(data, "約2:07開始の例もある", "source timing tolerance note missing");
requireText(data, "GitにはLYRIC_###", "lyric-slot-only policy missing");
requireText(data, "190 BPMを全cutへ使わない", "190 BPM anti-overcut rule missing");
requireText(data, "95 BPM half-time", "95 BPM photo grid rule missing");
requireText(data, 'bpm: 190', "190 BPM fact missing");
requireText(data, 'halfTimeBpm: 95', "95 BPM half-time fact missing");
requireText(data, 'key: "B major"', "B major fact missing");
requireText(data, 'timeSignature: "4/4"', "4/4 fact missing");

for (const section of [
  "opening-pickup", "intro", "verse-1-a", "verse-1-b", "chorus-1-a", "chorus-1-b", "interlude-1",
  "verse-2-a", "verse-2-b", "chorus-2-a", "chorus-2-b", "post-chorus-interlude-a", "post-chorus-interlude-b", "end-before-c-section",
]) {
  requireText(data, `id: "${section}"`, `extended section missing: ${section}`);
}

const lyricIds = [...data.matchAll(/id: "(LYRIC_\d+)"/g)].map((match) => match[1]);
if (lyricIds.length !== 32) errors.push(`extended rhythm map must expose 32 local lyric timing slots, found ${lyricIds.length}`);
if (new Set(lyricIds).size !== lyricIds.length) errors.push("extended lyric timing slot IDs must be unique");
if (/lyric(Text|Body|Content|Phrase)\s*:/i.test(data)) errors.push("Git must not contain a copyrighted lyric-body field");

for (const marker of [17, 28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 126, 129]) {
  requireText(data, `${marker}`, `reference marker missing: ${marker}s`);
}

for (const token of ["RESEARCH TIMING REFERENCE", "約2:09", "190 BPM", "95 BPM", "EXTENDED RHYTHM MAP"]) {
  requireText(page, token, `Showcase page missing extended rhythm UI token: ${token}`);
}

if (errors.length) {
  console.error(`StaRt Extended Rhythm Map contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`StaRt Extended Rhythm Map contracts OK: 14 sections / ${lyricIds.length} lyric timing slots / 2:09 research endpoint / local audio remains final authority.`);
