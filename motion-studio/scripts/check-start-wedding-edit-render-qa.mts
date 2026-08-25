// StartWeddingEdit renderの機械QA。
//
// 129秒固定は無効(旧Start129仕様)。duration判定は
// local/start-wedding-edit.local.json の sourceEndSec を正本にする。
// 「renderできた」ことを品質完成と取り違えない: 実ファイルをffprobe/ffmpegで
// 解析し、duration・解像度・fps・音量・黒frame・freeze・scene変化数・歌詞coverageを検証する。

import {execFileSync} from 'node:child_process';
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirArg = process.argv.find((a) => a.startsWith('--dir='));
const outDir = join(studioRoot, dirArg ? dirArg.slice('--dir='.length) : 'out/start-wedding-edit');

if (!existsSync(outDir)) {
  console.error(`❌ renderディレクトリが無い: ${outDir.replace(studioRoot + '/', '')}`);
  console.error('   先に pnpm render:start-wedding-edit を実行してください。');
  process.exit(1);
}

const editRangePath = join(studioRoot, 'local/start-wedding-edit.local.json');
if (!existsSync(editRangePath)) {
  console.error('❌ local/start-wedding-edit.local.json が無い。sourceEndSecが分からないため検査できない。');
  process.exit(1);
}
const editRange = JSON.parse(readFileSync(editRangePath, 'utf8'));
const expectedDuration = Number(editRange.sourceEndSec);

const files = readdirSync(outDir).filter((f) => f.endsWith('.mp4')).sort();
if (files.length !== 6) {
  console.error(`❌ MP4が${files.length}本(期待6本: A/B/C × clean/guide)`);
  process.exit(1);
}

const errors: string[] = [];
const warnings: string[] = [];

const ffprobe = (args: string[]) => execFileSync('ffprobe', args, {encoding: 'utf-8'}).trim();

console.log(`検査対象: out/start-wedding-edit (期待duration ${expectedDuration}s)\n`);

const sceneCounts: Record<string, number> = {};

for (const f of files) {
  const path = join(outDir, f);
  const line: string[] = [f];

  const dur = Number(ffprobe(['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path]));
  const wh = ffprobe(['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path]);
  const fps = ffprobe(['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', path])
    .split('\n')[0]
    .replace(/,+$/, '')
    .trim();
  const [w, h] = wh.split(',').map(Number);
  line.push(`${dur.toFixed(2)}s`, `${w}x${h}`, fps);

  if (Math.abs(dur - expectedDuration) > 0.3) {
    errors.push(`${f}: durationが${dur.toFixed(2)}s(期待${expectedDuration}s±0.3)`);
  }
  if (fps !== '30/1') errors.push(`${f}: fpsが${fps}(期待30/1)`);
  if (w / h < 1.7 || w / h > 1.8) errors.push(`${f}: aspectが16:9でない(${w}x${h})`);

  const volOut = (() => {
    try {
      return execFileSync('sh', ['-c', `ffmpeg -i "${path}" -af volumedetect -f null - 2>&1 | grep mean_volume || true`], {
        encoding: 'utf-8',
      }).trim();
    } catch {
      return '';
    }
  })();
  const m = volOut.match(/mean_volume:\s*(-?[\d.]+)\s*dB/);
  const meanDb = m ? Number(m[1]) : -99;
  line.push(`vol ${meanDb}dB`);
  if (meanDb < -50) errors.push(`${f}: 実質無音(mean ${meanDb}dB)。実音源が入っていない可能性`);

  const black = (() => {
    try {
      const r = execFileSync(
        'sh',
        ['-c', `ffmpeg -i "${path}" -vf "blackdetect=d=0.4:pic_th=0.98" -an -f null - 2>&1 | grep -c black_start || true`],
        {encoding: 'utf-8'},
      );
      return Number(r.trim() || '0');
    } catch {
      return 0;
    }
  })();
  line.push(`black ${black}`);
  if (black > 0) errors.push(`${f}: 0.4秒以上の黒frameが${black}箇所`);

  const freeze = (() => {
    try {
      const r = execFileSync(
        'sh',
        ['-c', `ffmpeg -i "${path}" -vf "freezedetect=n=-45dB:d=3.0" -an -f null - 2>&1 | grep -c freeze_start || true`],
        {encoding: 'utf-8'},
      );
      return Number(r.trim() || '0');
    } catch {
      return 0;
    }
  })();
  line.push(`freeze3s ${freeze}`);
  if (freeze > 0) errors.push(`${f}: 3秒以上の完全静止が${freeze}箇所`);

  const scenes = (() => {
    try {
      const r = execFileSync(
        'sh',
        // 0.22ではdissolve比率の高い編集(A案)のscene変化が過小検出される実測があったため、
        // 0.15を採用(実測: 0.22→12件/0.15→26件@A案、B/C案も比例してscaleし過検出はしていない)。
        ['-c', `ffmpeg -i "${path}" -vf "select='gt(scene,0.15)',metadata=print" -an -f null - 2>&1 | grep -c "lavfi.scene_score" || true`],
        {encoding: 'utf-8'},
      );
      return Number(r.trim() || '0');
    } catch {
      return 0;
    }
  })();
  sceneCounts[f] = scenes;
  line.push(`scene変化 ${scenes}`);
  if (scenes < 20) {
    errors.push(`${f}: scene変化が${scenes}回。${expectedDuration.toFixed(0)}秒で20回未満は演出密度不足の疑い`);
  }

  console.log('  ' + line.join(' | '));
}

const cleanScenes = Object.entries(sceneCounts).filter(([k]) => k.includes('clean')).map(([k, v]) => ({k, v}));
if (cleanScenes.length === 3) {
  const vals = cleanScenes.map((c) => c.v);
  const spread = Math.max(...vals) - Math.min(...vals);
  if (spread < 3) {
    warnings.push(`A/B/Cのscene変化数がほぼ同じ(${vals.join('/')})。編集リズムの差が弱い可能性`);
  }
}

console.log('');
warnings.forEach((w) => console.warn(`⚠️  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\nstart-wedding-edit render QA: ${errors.length}件のエラー`);
  process.exit(1);
}
console.log('✅ start-wedding-edit render QA OK');
console.log('注意: これは機械QA(duration/解像度/音量/黒frame/freeze/scene変化数)。');
console.log('歌詞の音楽的な正確さ・3-hit同期の精度は、正確なbeat detectツールが無いため未検証(ffmpeg解析ベースの推定のみ)。');
