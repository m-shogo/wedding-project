// Full-song canonical(TimingMaster) ↔ generated(generated.ts) exact identity gate。
//
// 背景: check-start-wedding-post60-regression.mtsは、60秒以降のcue単位
// plumbingは全件検証しているが、phrase単位のstart/end検証は固定anchor時刻
// (60,63,67.5...)のサンプリングであり、かつ0〜60秒は対象外だった。
// このcheckは、全30 phrase・全73 vocal cueについて、近傍matchingを
// 一切使わず、必ずphraseId/cueIdでの直接比較のみでcanonical→generatedの
// 変換一致を検証する(P0-A、ユーザー指示「全曲でMismatch 0を目指す」)。
//
// 対象:
//   - 全phraseのstartSec/endSec(±1frame)
//   - 全word-accent cueのaccentSec(±1frame、cueId完全一致)
//   - 全syllable-hit(3-hit) cueのthreeHitFrameSecs(±1frame、cueId完全一致)
// 対象外(このcheckでは扱わない。他checkの責務):
//   - phrase-onset cueそのもの(generated.tsにはphrase.startSec/endSecとして
//     既に反映されているため、上記phrase単位のstartSec検証でカバー済み)
//   - choreography.ts側のChoreographyEvent(check-choreography-event-timing-
//     consistency.mtsの責務)
//
// 実行: node --no-warnings scripts/check-start-wedding-full-song-identity.mts

import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');
const generatedPath = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
if (!existsSync(generatedPath)) {
  console.error('❌ generated.tsが無い(実データ)。');
  process.exit(1);
}

const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const {sourceStartMs, globalContentOffsetMs} = master.audio;

const FRAME_TOLERANCE = 1; // ±1frame(30fpsで約33.3ms)まで許容。ms→frame量子化分。
const MS_TOLERANCE = (1000 / 30) * FRAME_TOLERANCE;

const errors: string[] = [];
let maxAbsDeltaMs = 0;
let checkedPhraseCount = 0;
let checkedCueCount = 0;

const generatedModule = (await import(`../src/data/startWeddingEdit/generated.ts?t=${Date.now()}`)) as {
  weddingEditLyricPhrases: Array<{
    phraseId: string;
    startSec: number;
    endSec: number;
    importantWords?: Array<{cueId: string; word: string; accentSec: number}>;
    threeHitFrameSecs?: number[] | null;
    threeHitCueIds?: string[] | null;
  }>;
};
const generatedById = new Map(generatedModule.weddingEditLyricPhrases.map((p) => [p.phraseId, p]));

const track = (deltaMs: number) => {
  maxAbsDeltaMs = Math.max(maxAbsDeltaMs, Math.abs(deltaMs));
};

for (const phrase of master.phrases) {
  const generated = generatedById.get(phrase.phraseId);
  if (!generated) {
    errors.push(`${phrase.phraseId}: generated.tsに存在しない(phraseId完全一致で検索)`);
    continue;
  }
  checkedPhraseCount++;

  const expectedStartSec = (phrase.startMs + globalContentOffsetMs - sourceStartMs) / 1000;
  const expectedEndSec = (phrase.endMs + globalContentOffsetMs - sourceStartMs) / 1000;
  const deltaStartMs = (generated.startSec - expectedStartSec) * 1000;
  const deltaEndMs = (generated.endSec - expectedEndSec) * 1000;
  track(deltaStartMs);
  track(deltaEndMs);
  if (Math.abs(deltaStartMs) > MS_TOLERANCE) {
    errors.push(`${phrase.phraseId}: startSec不一致(delta=${deltaStartMs.toFixed(2)}ms、許容±${MS_TOLERANCE.toFixed(1)}ms)`);
  }
  if (Math.abs(deltaEndMs) > MS_TOLERANCE) {
    errors.push(`${phrase.phraseId}: endSec不一致(delta=${deltaEndMs.toFixed(2)}ms、許容±${MS_TOLERANCE.toFixed(1)}ms)`);
  }

  for (const c of phrase.cues) {
    if (c.kind === 'word-accent') {
      checkedCueCount++;
      const expectedSec = (resolveEffectiveCueTimeMs(c, phrase, master.audio) - sourceStartMs) / 1000;
      const match = generated.importantWords?.find((w) => w.cueId === c.cueId);
      if (!match) {
        errors.push(`${c.cueId}: generated.tsのimportantWordsにcueId完全一致するentryが無い`);
        continue;
      }
      const deltaMs = (match.accentSec - expectedSec) * 1000;
      track(deltaMs);
      if (Math.abs(deltaMs) > MS_TOLERANCE) {
        errors.push(`${c.cueId}: accentSec不一致(delta=${deltaMs.toFixed(2)}ms、許容±${MS_TOLERANCE.toFixed(1)}ms)`);
      }
    }
  }

  const hitCues = phrase.cues.filter((c) => c.kind === 'syllable-hit').sort((a, b) => a.timeMs - b.timeMs);
  if (hitCues.length > 0) {
    if (!generated.threeHitCueIds || !generated.threeHitFrameSecs) {
      errors.push(`${phrase.phraseId}: generated.tsにthreeHitCueIds/threeHitFrameSecsが無い(3-hit cueが${hitCues.length}件あるのに)`);
    } else {
      for (const c of hitCues) {
        checkedCueCount++;
        const idx = generated.threeHitCueIds.indexOf(c.cueId);
        if (idx === -1) {
          errors.push(`${c.cueId}: generated.tsのthreeHitCueIdsにcueId完全一致するentryが無い`);
          continue;
        }
        const expectedSec = (resolveEffectiveCueTimeMs(c, phrase, master.audio) - sourceStartMs) / 1000;
        const generatedSec = generated.threeHitFrameSecs[idx];
        const deltaMs = (generatedSec - expectedSec) * 1000;
        track(deltaMs);
        if (Math.abs(deltaMs) > MS_TOLERANCE) {
          errors.push(`${c.cueId}: threeHitFrameSecs不一致(delta=${deltaMs.toFixed(2)}ms、許容±${MS_TOLERANCE.toFixed(1)}ms)`);
        }
      }
    }
  }
}

console.log(`検査対象: phrase ${checkedPhraseCount}/${master.phrases.length}件、word-accent+syllable-hit cue ${checkedCueCount}件(全曲、近傍matchingなし、phraseId/cueId完全一致のみ)`);
console.log(`最大絶対delta: ${maxAbsDeltaMs.toFixed(2)}ms(許容±${MS_TOLERANCE.toFixed(1)}ms)`);

if (errors.length > 0) {
  console.error(`\n❌ full-song-identity: FAIL(${errors.length}件)`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log('\n✅ full-song-identity OK(全曲でcanonical→generatedのMismatch 0)');
console.log('注意: これはplumbing(データ伝播)一致の検証。audio onsetの音楽的正しさは人間の聴取確認が必要。');
