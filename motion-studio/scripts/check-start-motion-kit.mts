import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(root, '..');
const engines = fs.readFileSync(path.join(root, 'src/motion-kit/engines.tsx'), 'utf8');
const presets = fs.readFileSync(path.join(root, 'src/motion-kit/renderablePresets.ts'), 'utf8');
const reel = fs.readFileSync(path.join(root, 'src/compositions/common/StartMotionReel.tsx'), 'utf8');
const rootFile = fs.readFileSync(path.join(root, 'src/StartMotionKitRoot.tsx'), 'utf8');
const index = fs.readFileSync(path.join(root, 'src/index-start-motion-kit.ts'), 'utf8');
const catalog = fs.readFileSync(path.join(repoRoot, 'movie-dashboard/src/data/startMotionKit.ts'), 'utf8');
const errors: string[] = [];

const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const engine of ['TypographyRevealEngine', 'CameraTransformEngine', 'TransitionWipeEngine', 'GraphicHitEngine', 'NativeCutEngine', 'PhotoLayoutEngine']) {
  requireText(engines, `function ${engine}`, `shared renderer missing: ${engine}`);
}
for (const intensity of ["'S'", "'M'", "'L'"]) requireText(engines, intensity, `motion intensity missing: ${intensity}`);
requireText(engines, 'transparent?: boolean', 'transparent overlay support missing');

const ids = [...presets.matchAll(/presetId: '([^']+)'/g)].map((match) => match[1]);
// 2026-08-26: モーション図鑑v1カタログ化のため8→17へ拡張(既存engineのmodeのみ追加、新規engine機能は無し)。
if (ids.length !== 17) errors.push(`renderable subset must contain exactly 17 evidence targets in V1, found ${ids.length}`);
if (new Set(ids).size !== ids.length) errors.push('renderable subset ids must be unique');
if (ids.length >= 36) errors.push('V1 renderer must not pretend all 36 catalog presets are renderable');
for (const id of ids) {
  if (!catalog.includes(`p("${id}"`)) errors.push(`renderable preset missing from Movie Coach catalog: ${id}`);
}
for (const engine of ['typography-reveal', 'camera-transform', 'transition-wipe', 'graphic-hit', 'native-cut', 'photo-layout']) {
  requireText(presets, `engine: '${engine}'`, `renderable subset must exercise shared engine: ${engine}`);
}

requireText(reel, 'renderableMotionPresets.map', 'Motion Reel must render the evidence subset');
requireText(reel, 'REAL PHOTO / VIDEO SLOT', 'Motion Reel must remain explicit about real media slots');
requireText(rootFile, 'id="StaRtMotionReelV1"', 'Motion Reel composition missing');
requireText(rootFile, 'id="StaRtMotionOverlayPreview"', 'transparent overlay preview composition missing');
requireText(index, 'registerRoot(StartMotionKitRoot)', 'StaRt Motion Kit entrypoint missing');

if (errors.length) {
  console.error(`StaRt shared renderer contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`StaRt shared renderer contracts OK: ${ids.length} renderable presets / 4 shared engines / transparent overlay preview.`);
