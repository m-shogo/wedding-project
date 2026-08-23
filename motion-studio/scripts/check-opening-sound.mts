import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import {openingV1TotalSec} from '../src/data/openingV1.ts';
import {openingV1SoundCues} from '../src/data/openingV1Sound.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.argv.includes('--strict');
const playableStatuses = new Set(['candidate', 'approved', 'final']);

let errors = 0;
const err = (message: string) => {
  errors++;
  console.error(`❌ ${message}`);
};

const ids = openingV1SoundCues.map((cue) => cue.id);
for (const duplicate of new Set(ids.filter((id, index) => ids.indexOf(id) !== index))) {
  err(`sound cue id重複: ${duplicate}`);
}

for (const cue of openingV1SoundCues) {
  const asset = assets[cue.assetId];
  if (!asset) {
    err(`${cue.id}: assetId ${cue.assetId} がassets.tsに存在しない`);
    continue;
  }
  if (asset.type !== 'audio') {
    err(`${cue.id}: ${cue.assetId} はaudio素材ではない(type=${asset.type})`);
  }
  if (cue.startSec < 0 || cue.startSec >= openingV1TotalSec) {
    err(`${cue.id}: startSec=${cue.startSec} が0-${openingV1TotalSec}s外`);
  }
  if (cue.endSec <= cue.startSec || cue.endSec > openingV1TotalSec) {
    err(`${cue.id}: endSec=${cue.endSec} が不正(start=${cue.startSec}, total=${openingV1TotalSec})`);
  }
  if (cue.volume < 0 || cue.volume > 1) {
    err(`${cue.id}: volume=${cue.volume} は0-1の範囲外`);
  }
  if (playableStatuses.has(asset.status) && !asset.path.startsWith('public/audio/')) {
    err(`${cue.id}: 再生対象audioはpublic/audio/配下必須: ${asset.path}`);
  }
}

if (strict) {
  const bgmCues = openingV1SoundCues.filter((cue) => cue.role === 'bgm');
  if (bgmCues.length !== 1) {
    err(`finalではBGM cueを1件だけ要求: 現在${bgmCues.length}件`);
  }

  for (const cue of bgmCues) {
    const asset = assets[cue.assetId];
    if (!asset) {
      continue;
    }
    if (!playableStatuses.has(asset.status)) {
      err(
        `final render不可 — ${cue.assetId} status=${asset.status}。` +
          '会場上映/SNSの利用条件を確認したBGMをcandidate以上へ昇格する',
      );
      continue;
    }
    if (!asset.path.startsWith('public/audio/')) {
      continue;
    }
    const absolutePath = join(studioRoot, asset.path);
    if (!existsSync(absolutePath)) {
      err(`final render不可 — BGM実ファイルが無い: ${asset.path}`);
    }
  }
}

if (errors > 0) {
  console.error(`check-opening-sound${strict ? ' --strict' : ''} 失敗 — ${errors}件`);
  process.exit(1);
}

console.log(
  `✅ Opening V1 sound cues: ${openingV1SoundCues.length}件 / ${openingV1TotalSec}s内 / ` +
    `${strict ? 'final BGM gate OK' : 'asset整合OK（previewはBGM未投入でも可）'}`,
);
