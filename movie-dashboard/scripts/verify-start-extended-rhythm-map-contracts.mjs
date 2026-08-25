import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {
  startExtendedAuthority,
  startExtendedResearchHypotheses,
  startExtendedSections,
  startLyricTimingSlots,
} from "../src/data/startExtendedRhythmMap.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/startExtendedRhythmMap.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartMotionShowcase.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

if (startExtendedAuthority.audioState !== "AUDIO_BLOCKED") errors.push("cleared local audio is absent, so audioState must fail closed as AUDIO_BLOCKED");
if (startExtendedAuthority.timingState !== "researched-reference-not-final") errors.push("research timing must never be treated as final");
if (startExtendedAuthority.finalTimingAuthority !== "cleared-local-audio-waveform-and-markers") errors.push("local audio waveform/marker authority missing");
if (startExtendedAuthority.exactEndMarker !== null) errors.push("exactEndMarker must remain null until cleared local audio is inspected");
if (!(startExtendedAuthority.referenceEndSec > 0)) errors.push("a positive research reference endpoint is required");
if (!(startExtendedResearchHypotheses.bpm > 0 && startExtendedResearchHypotheses.halfTimeBpm > 0)) errors.push("tempo hypotheses must be positive numbers");

requireText(data, "GitにはLYRIC_###", "lyric-slot-only policy missing");
if (data.includes("startExtendedSongFacts")) errors.push("unverified timing values must not be exported as song facts");

if (startExtendedSections.length !== 14) errors.push(`extended rhythm map must expose 14 sections, found ${startExtendedSections.length}`);
const sectionIds = startExtendedSections.map((section) => section.id);
if (new Set(sectionIds).size !== sectionIds.length) errors.push("extended section IDs must be unique");
for (let index = 0; index < startExtendedSections.length; index++) {
  const section = startExtendedSections[index];
  if (!(section.referenceStartSec < section.referenceEndSec)) errors.push(`section ${section.id} has an invalid reference range`);
  const previous = startExtendedSections[index - 1];
  if (previous && previous.referenceEndSec !== section.referenceStartSec) errors.push(`reference sections are not contiguous at ${section.id}`);
}
if (startExtendedSections.at(-1)?.referenceEndSec !== startExtendedAuthority.referenceEndSec) errors.push("last research section must end at referenceEndSec");

const lyricIds = startLyricTimingSlots.map((slot) => slot.id);
if (lyricIds.length !== 32) errors.push(`extended rhythm map must expose 32 local lyric timing slots, found ${lyricIds.length}`);
if (new Set(lyricIds).size !== lyricIds.length) errors.push("extended lyric timing slot IDs must be unique");
if (/lyric(Text|Body|Content|Phrase)\s*:/i.test(data)) errors.push("Git must not contain a copyrighted lyric-body field");

for (const token of ["RESEARCH TIMING REFERENCE", "AUDIO_BLOCKED", "HYPOTHESIS", "EXTENDED RHYTHM MAP"]) {
  requireText(page, token, `Showcase page missing extended rhythm UI token: ${token}`);
}

if (errors.length) {
  console.error(`StaRt Extended Rhythm Map contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`StaRt Extended Rhythm Map contracts OK: ${startExtendedSections.length} sections / ${lyricIds.length} lyric timing slots / AUDIO_BLOCKED fail-close / local audio remains final authority.`);
