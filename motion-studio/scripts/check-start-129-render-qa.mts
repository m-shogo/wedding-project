// renderした6本のMP4を機械QAする。
//
// 以前は「renderできた」ことを品質完成と取り違えていた。
// このcheckは実ファイルをffprobe/ffmpegで解析し、
// duration・解像度・fps・音量・黒frame・freeze・scene変化数を検証する。
//
// 「scene変化数」= 実際に画が変わった回数。演出密度の客観指標として使う。

import {execFileSync} from 'node:child_process';
import {existsSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirArg = process.argv.find((a) => a.startsWith('--dir='));
const outDir = join(studioRoot, dirArg ? dirArg.slice('--dir='.length) : 'out/start-129-demo');
const isFinal = outDir.includes('final');

if (!existsSync(outDir)) {
  console.error(`❌ renderディレクトリが無い: ${outDir.replace(studioRoot + '/', '')}`);
  console.error('   先に pnpm render:start-129:demo を実行してください。');
  process.exit(1);
}

const files = readdirSync(outDir).filter((f) => f.endsWith('.mp4')).sort();
if (files.length !== 6) {
  console.error(`❌ MP4が${files.length}本(期待6本: A/B/C × clean/guide)`);
  process.exit(1);
}

const errors: string[] = [];
const warnings: string[] = [];

const ffprobe = (args: string[]) => execFileSync('ffprobe', args, {encoding: 'utf-8'}).trim();
const ffmpegGrep = (file: string, filter: string, pattern: RegExp): string[] => {
  try {
    execFileSync('ffmpeg', ['-i', file, '-vf', filter, '-an', '-f', 'null', '-'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return [];
  } catch (e) {
    const err = e as {stderr?: string; stdout?: string};
    const text = `${err.stderr ?? ''}${err.stdout ?? ''}`;
    return text.split('\n').filter((l) => pattern.test(l));
  }
};
/** ffmpegはfilterの出力もstderrへ書くため、正常終了でもstderrを読む */
const ffmpegAnalyze = (file: string, filter: string): string => {
  const r = execFileSync('ffmpeg', ['-i', file, '-vf', filter, '-an', '-f', 'null', '-'], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return r;
};

console.log(`検査対象: ${outDir.replace(studioRoot + '/', '')} (${isFinal ? 'FINAL' : 'DEMO'})\n`);

const sceneCounts: Record<string, number> = {};

for (const f of files) {
  const path = join(outDir, f);
  const line: string[] = [f];

  // duration / resolution / fps
  const dur = Number(ffprobe(['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path]));
  const wh = ffprobe(['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path]);
  // ffprobeはstream毎に1行返すため、先頭行(video)だけを使い末尾のカンマを落とす
  const fps = ffprobe([
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', path,
  ])
    .split('\n')[0]
    .replace(/,+$/, '')
    .trim();
  const [w, h] = wh.split(',').map(Number);
  line.push(`${dur.toFixed(2)}s`, `${w}x${h}`, fps);

  if (Math.abs(dur - 129) > 0.2) errors.push(`${f}: durationが${dur.toFixed(2)}s(期待129秒±0.2)`);
  if (fps !== '30/1') errors.push(`${f}: fpsが${fps}(期待30/1)`);
  if (isFinal && (w !== 1920 || h !== 1080)) errors.push(`${f}: FINALの解像度が${w}x${h}(期待1920x1080)`);
  if (w / h < 1.7 || w / h > 1.8) errors.push(`${f}: aspectが16:9でない(${w}x${h})`);

  // 音量
  let meanDb = -99;
  try {
    execFileSync('ffmpeg', ['-i', path, '-af', 'volumedetect', '-f', 'null', '-'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    /* ffmpegは正常終了する。下のcatchは保険 */
  }
  const volOut = (() => {
    try {
      const r = execFileSync(
        'sh',
        ['-c', `ffmpeg -i "${path}" -af volumedetect -f null - 2>&1 | grep mean_volume || true`],
        {encoding: 'utf-8'},
      );
      return r.trim();
    } catch {
      return '';
    }
  })();
  const m = volOut.match(/mean_volume:\s*(-?[\d.]+)\s*dB/);
  if (m) meanDb = Number(m[1]);
  line.push(`vol ${meanDb}dB`);
  if (isFinal && meanDb < -60) {
    errors.push(`${f}: 実質無音(mean ${meanDb}dB)。FINALでは正規音源が必要`);
  } else if (meanDb < -60) {
    warnings.push(`${f}: 実質無音(mean ${meanDb}dB)。DEMOのため許容するが、音楽同期は未検証`);
  }

  // 黒frame
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

  // 長時間freeze(3秒以上完全静止)
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
  if (freeze > 0) errors.push(`${f}: 3秒以上の完全静止が${freeze}箇所(演出密度不足)`);

  // scene変化数: 演出密度の客観指標
  const scenes = (() => {
    try {
      const r = execFileSync(
        'sh',
        ['-c', `ffmpeg -i "${path}" -vf "select='gt(scene,0.22)',metadata=print" -an -f null - 2>&1 | grep -c "lavfi.scene_score" || true`],
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
    errors.push(`${f}: scene変化が${scenes}回。129秒で20回未満は「背景を置いただけ」の疑い`);
  }

  console.log('  ' + line.join(' | '));
}

// A/B/Cのscene変化数が似すぎていないか(=同じ編集をしている疑い)
const cleanScenes = Object.entries(sceneCounts)
  .filter(([k]) => k.includes('clean'))
  .map(([k, v]) => ({k, v}));
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
  console.error(`\nstart-129 render QA: ${errors.length}件のエラー`);
  process.exit(1);
}
console.log('✅ start-129 render QA OK');
console.log('注意: これは機械QA。3案のフル視聴と反証レビューの代わりにはならない。');
