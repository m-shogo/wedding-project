// renderした6本のMP4を、movie-dashboardが再生できる場所へコピーする。
//
// Dashboardは別のVite devサーバーで動くため、motion-studio/out を直接読めない。
// movie-dashboard/public/local-start-render/ は既にgitignore済みの
// 「ローカルrender置き場」なので、そこへ同期する(巨大MP4はGitへ入れない)。

import {copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(studioRoot, '..');
const dirArg = process.argv.find((a) => a.startsWith('--dir='));
const srcDir = join(studioRoot, dirArg ? dirArg.slice('--dir='.length) : 'out/start-129-demo');
const destDir = join(repoRoot, 'movie-dashboard/public/local-start-render/start-129');

if (!existsSync(srcDir)) {
  console.error(`❌ renderが無い: ${srcDir.replace(repoRoot + '/', '')}`);
  console.error('   先に pnpm render:start-129:demo を実行してください。');
  process.exit(1);
}

mkdirSync(destDir, {recursive: true});
const files = readdirSync(srcDir).filter((f) => f.endsWith('.mp4'));
const manifest: Array<{file: string; variant: string; mode: string; bytes: number}> = [];

for (const f of files) {
  copyFileSync(join(srcDir, f), join(destDir, f));
  const m = /start129_([ABC])_(clean|guide)\.mp4/.exec(f);
  manifest.push({
    file: f,
    variant: m?.[1] ?? '?',
    mode: m?.[2] ?? '?',
    bytes: statSync(join(srcDir, f)).size,
  });
  console.log(`  ✅ ${f}`);
}

// Dashboardが「renderがあるか」を判定できるようにmanifestを置く(小さいJSON)
writeFileSync(
  join(destDir, 'manifest.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: srcDir.replace(repoRoot + '/', ''),
      isFinal: srcDir.includes('final'),
      videos: manifest.sort((a, b) => a.file.localeCompare(b.file)),
    },
    null,
    2,
  ),
);

console.log(`\n✅ ${files.length}本を movie-dashboard/public/local-start-render/start-129/ へ同期`);
console.log('   (Git管理外。Dashboardの /movie-coach/start-129 で再生できます)');
