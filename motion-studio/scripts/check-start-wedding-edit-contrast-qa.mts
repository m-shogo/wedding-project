// StartWeddingEdit: 30phrase × A/B/C の実renderに対する機械的contrast/safe-area QA。
//
// 「読みやすさを担保している」という主張がJSON契約チェックだけでは根拠不足という指摘に対応する。
// OCR/numpyが無い環境のため、ffmpegのsignalstats(YMIN/YMAX)を各animation familyの
// 概算text領域へcropして使う。文字が実際に描画されていれば、backplate/photo等の背景と
// 文字strokeの間に必ず輝度差が生まれるため、YMAX-YMINのrangeが小さい(=画面内で
// ほぼ均一な明るさしかない)frameは「文字が見えていない/contrastが潰れている」候補として
// 機械的に検出できる。これは完全なOCR相当ではないが、根拠のある実測ベースの近似指標である。

import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, rmSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirArg = process.argv.find((a) => a.startsWith('--dir='));
const videoDir = join(studioRoot, dirArg ? dirArg.slice('--dir='.length) : 'out/start-wedding-edit-review-v3');

if (!existsSync(videoDir)) {
  console.error(`❌ renderディレクトリが無い: ${videoDir.replace(studioRoot + '/', '')}`);
  console.error('   先に pnpm render:start-wedding-edit:review-v3 を実行してください。');
  process.exit(1);
}

const variantFiles: Record<'A' | 'B' | 'C', string> = {
  A: join(videoDir, 'start_wedding_edit_v3_a_clean.mp4'),
  B: join(videoDir, 'start_wedding_edit_v3_b_clean.mp4'),
  C: join(videoDir, 'start_wedding_edit_v3_c_clean.mp4'),
};
for (const [v, p] of Object.entries(variantFiles)) {
  if (!existsSync(p)) {
    console.error(`❌ ${v}案のclean mp4が無い: ${p.replace(studioRoot + '/', '')}`);
    process.exit(1);
  }
}

// video解像度をffprobeで取得し、crop矩形をscaleする(final-v3は1920x1080、review-v3は960x540)。
const probeWH = (path: string): {w: number; h: number} => {
  const out = execFileSync(
    'ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path],
    {encoding: 'utf-8'},
  ).trim();
  const [w, h] = out.split(',').map(Number);
  return {w, h};
};
const {w: videoW, h: videoH} = probeWH(variantFiles.A);
const scaleX = videoW / 1920;
const scaleY = videoH / 1080;

const generated = await import(pathToFileURL(join(studioRoot, 'src/data/startWeddingEdit/generated.ts')).href);
type EnrichedPhrase = {
  phraseId: string;
  startSec: number;
  endSec: number;
  selectedAnimation?: string;
  importantWords: Array<{word: string; accentSec: number; beatSec: number | null}>;
};
const phrases: EnrichedPhrase[] = generated.weddingEditLyricPhrases;

// weddingLyricLine.tsxのplacementFor()と同じ区分を、1920x1080基準のcrop矩形として再現する。
// (厳密なpixel一致ではなく、各familyの配置意図に沿った概算の探索領域)
type Rect = {x: number; y: number; w: number; h: number};
const regionFor = (anim: string | undefined): Rect => {
  switch (anim) {
    case 'type-mask':
    case 'split-conflict':
    case 'three-hit-build':
      return {x: 460, y: 380, w: 1000, h: 340}; // center
    case 'question-pause':
      return {x: 40, y: 140, w: 1840, h: 260}; // top band
    case 'whisper-reveal':
      return {x: 900, y: 600, w: 940, h: 320}; // bottom-right
    case 'baseline-travel':
    case 'foreground-reveal':
      return {x: 60, y: 700, w: 900, h: 260}; // bottom-left(上寄り)
    default:
      return {x: 60, y: 760, w: 1300, h: 224}; // bottom-left(既定)
  }
};

const tmpDir = join(studioRoot, '.tmp-contrast-qa');
mkdirSync(tmpDir, {recursive: true});

type Result = {phraseId: string; variant: string; anim: string; t: number; ymin: number; ymax: number; range: number};
const results: Result[] = [];
const errors: string[] = [];
const LOW_CONTRAST_THRESHOLD = 35; // YUVの0-255スケールで、この範囲未満は「ほぼ均一」とみなす

for (const p of phrases) {
  // 実accent(importantWords[0])があればそこ、無ければphrase中点を検査timecodeにする。
  // importantWordsのaccentSecは、3-hitのpre-roll等でphrase.startSecよりわずかに
  // 早い場合がある(意図的な予備動作)。その場合そのまま検査すると直前phraseの
  // Sequenceを検査してしまうため、phrase開始+0.3秒側へclampする。
  const rawT = p.importantWords[0]?.accentSec ?? (p.startSec + p.endSec) / 2;
  const t = Math.max(rawT, p.startSec + Math.min(0.3, (p.endSec - p.startSec) / 2));
  const region = regionFor(p.selectedAnimation);
  const cropW = Math.round(region.w * scaleX);
  const cropH = Math.round(region.h * scaleY);
  const cropX = Math.round(region.x * scaleX);
  const cropY = Math.round(region.y * scaleY);

  for (const variant of ['A', 'B', 'C'] as const) {
    const outTxt = join(tmpDir, `${p.phraseId}_${variant}.txt`);
    try {
      const raw = execFileSync(
        'sh',
        [
          '-c',
          `ffmpeg -ss ${t} -i "${variantFiles[variant]}" -frames:v 1 -vf "crop=${cropW}:${cropH}:${cropX}:${cropY},signalstats,metadata=print" -f null - 2>&1 || true`,
        ],
        {encoding: 'utf-8'},
      );
      const yminMatch = raw.match(/lavfi\.signalstats\.YMIN=([\d.]+)/);
      const ymaxMatch = raw.match(/lavfi\.signalstats\.YMAX=([\d.]+)/);
      const ymin = yminMatch ? Number(yminMatch[1]) : 0;
      const ymax = ymaxMatch ? Number(ymaxMatch[1]) : 0;
      const range = ymax - ymin;
      results.push({phraseId: p.phraseId, variant, anim: p.selectedAnimation ?? 'character-build', t, ymin, ymax, range});
      if (range < LOW_CONTRAST_THRESHOLD) {
        errors.push(
          `${p.phraseId}(${variant}, ${p.selectedAnimation ?? 'character-build'}) @${t.toFixed(2)}s: text領域のY range=${range.toFixed(1)}` +
            `(閾値${LOW_CONTRAST_THRESHOLD}未満。文字が写っていない/背景と同化している可能性)`,
        );
      }
    } catch (e) {
      errors.push(`${p.phraseId}(${variant}): ffmpeg解析失敗 - ${(e as Error).message}`);
    }
  }
}

rmSync(tmpDir, {recursive: true, force: true});

console.log(`検査対象: ${videoDir.replace(studioRoot + '/', '')} (${videoW}x${videoH})`);
console.log(`30phrase × A/B/C = ${results.length}件の text領域 Y range を計測\n`);

const sorted = [...results].sort((a, b) => a.range - b.range);
console.log('=== Y range 最小10件(低contrast候補) ===');
for (const r of sorted.slice(0, 10)) {
  console.log(`  ${r.phraseId}(${r.variant}, ${r.anim}) @${r.t.toFixed(2)}s: range=${r.range.toFixed(1)} (YMIN=${r.ymin} YMAX=${r.ymax})`);
}

console.log('');
if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\ncontrast QA: ${errors.length}/${results.length}件が閾値未満`);
  console.error('注意: これはtext strokeの有無を輝度rangeで近似するヒューリスティックであり、OCRによる文字認識ではない。');
  console.error('      閾値未満=即不採用ではなく、目視確認の優先対象として扱うこと。');
  process.exit(1);
}
console.log(`✅ contrast QA OK: 全${results.length}件がtext領域で輝度range ${LOW_CONTRAST_THRESHOLD}以上`);
console.log('注意: signalstatsベースの近似指標。OCRによる文字認識・safe area外はみ出しの厳密判定ではない。');
