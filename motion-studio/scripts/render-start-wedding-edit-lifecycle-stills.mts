// StaRt Wedding Edit: 30phrase × A/B/C のlifecycle stillを自動生成する。
//
// 「30枚のQAが必要」という指摘に対応する。phrase-start / important-word-accent /
// mid-phrase / just-before-end の4timepoint × 3 variant = 12枚/phrase、
// 30phrase合計360枚を review-v3(軽量, 960x540)から抽出し、phraseごとに
// 1枚のcontact sheetへ集約する(個々のPNGも残すため、目視は縮小contact sheetで
// 済ませつつ、必要な1枚だけ元解像度で確認できる)。
//
// 冒頭S→StaRt(0-12.5s)は別途 pnpm qa:start-wedding-edit-intro-stills で確認する。

import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirArg = process.argv.find((a) => a.startsWith('--dir='));
const videoDir = join(studioRoot, dirArg ? dirArg.slice('--dir='.length) : 'out/start-wedding-edit-review-v3');
const outArg = process.argv.find((a) => a.startsWith('--out='));
const outRoot = join(studioRoot, outArg ? outArg.slice('--out='.length) : 'out/start-wedding-edit-lifecycle-stills');

const variantFiles: Record<'A' | 'B' | 'C', string> = {
  A: join(videoDir, 'start_wedding_edit_v3_a_clean.mp4'),
  B: join(videoDir, 'start_wedding_edit_v3_b_clean.mp4'),
  C: join(videoDir, 'start_wedding_edit_v3_c_clean.mp4'),
};
for (const [v, p] of Object.entries(variantFiles)) {
  if (!existsSync(p)) {
    console.error(`❌ ${v}案のclean mp4が無い: ${p.replace(studioRoot + '/', '')}`);
    console.error('   先に pnpm render:start-wedding-edit:review-v3 を実行してください。');
    process.exit(1);
  }
}

const generated = await import(pathToFileURL(join(studioRoot, 'src/data/startWeddingEdit/generated.ts')).href);
type EnrichedPhrase = {
  phraseId: string;
  startSec: number;
  endSec: number;
  selectedAnimation?: string;
  importantWords: Array<{word: string; accentSec: number; beatSec: number | null}>;
};
const phrases: EnrichedPhrase[] = generated.weddingEditLyricPhrases;

mkdirSync(outRoot, {recursive: true});

const extractFrame = (video: string, t: number, out: string) => {
  execFileSync('ffmpeg', ['-y', '-ss', String(Math.max(0, t)), '-i', video, '-frames:v', '1', out, '-loglevel', 'error']);
};

let totalStills = 0;
const phraseDirs: string[] = [];

for (const p of phrases) {
  const dur = p.endSec - p.startSec;
  const clampedAccent = p.importantWords[0]
    ? Math.max(p.importantWords[0].accentSec, p.startSec + Math.min(0.3, dur / 2))
    : p.startSec + dur / 2;
  const timepoints: Array<{label: string; t: number}> = [
    // 0.1s(3frame)だとcharacter-build等の最初の文字がfade-in途中(ほぼ不可視)で
    // 「文字が無い」ように見える誤検知が起きたため、0.3s側へ寄せる。
    {label: '1_start', t: p.startSec + Math.min(0.3, dur / 3)},
    {label: '2_accent', t: Math.min(clampedAccent, p.endSec - 0.05)},
    {label: '3_mid', t: (p.startSec + p.endSec) / 2},
    {label: '4_pre-end', t: Math.max(p.startSec + 0.05, p.endSec - 0.15)},
  ];

  const phraseDir = join(outRoot, p.phraseId);
  mkdirSync(phraseDir, {recursive: true});
  phraseDirs.push(phraseDir);

  for (const variant of ['A', 'B', 'C'] as const) {
    for (const tp of timepoints) {
      const out = join(phraseDir, `${tp.label}_${variant}.png`);
      extractFrame(variantFiles[variant], tp.t, out);
      totalStills++;
    }
  }

  // phraseごとのcontact sheet(4 timepoint × 3 variant = 12コマ、4列3行)
  const files = readdirSync(phraseDir)
    .filter((f) => f.endsWith('.png') && f !== 'contact.png')
    .sort();
  const listFile = join(phraseDir, '_list.txt');
  execFileSync('sh', ['-c', `printf '%s\\n' ${files.map((f) => `'file ${f}'`).join(' ')} > "${listFile}"`]);
  execFileSync('sh', [
    '-c',
    // filename順は 1_start_A,1_start_B,1_start_C, 2_accent_A,... なので
    // 3列(variant)×4行(timepoint)で並べると各行が同一timepointのA/B/C比較になる。
    `cd "${phraseDir}" && ffmpeg -y -f concat -safe 0 -i _list.txt -vf "scale=360:203,tile=3x4" -frames:v 1 contact.png -loglevel error`,
  ]);
  execFileSync('rm', [listFile]);
  console.log(`✅ ${p.phraseId} (${p.selectedAnimation ?? 'character-build'}): 12枚 + contact.png`);
}

console.log(`\n完了: ${phrases.length}phrase × 3variant × 4timepoint = ${totalStills}枚`);
console.log(`出力先: ${outRoot.replace(studioRoot + '/', '')}/<phraseId>/contact.png (各phraseの一覧)`);
console.log(`各phraseの個別PNGも同ディレクトリに残る(1_start/2_accent/3_mid/4_pre-end × A/B/C)。`);
