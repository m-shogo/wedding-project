import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/opening_v1_preview.mp4');
const receiptPath = join(studioRoot, 'out/qa/opening-v1-preview-source-fingerprint.json');
const mode = process.argv.includes('--write') ? 'write' : process.argv.includes('--strict') ? 'strict' : 'status';

const renderSourcePaths = [
  'src/index-opening-v1.ts',
  'src/OpeningV1Root.tsx',
  'src/compositions/opening/OpeningV1.tsx',
  'src/compositions/opening/OpeningV1PhotoScenes.tsx',
  'src/compositions/opening/OpeningV1UtilityScenes.tsx',
  'src/compositions/opening/OpeningV1AudioLayer.tsx',
  'src/data/openingV1.ts',
  'src/data/openingV1Media.ts',
  'src/data/openingV1Presentation.ts',
  'src/data/openingV1Sound.ts',
  'src/data/theme.ts',
] as const;

type Receipt = {
  schemaVersion: 'opening-v1-preview-source-fingerprint/v1';
  authority: 'PREVIEW_RENDER_SOURCE_BINDING';
  renderedAt: string;
  preview: {path: string; sha256: string};
  sourceFingerprintSha256: string;
  sources: Array<{path: string; sha256: string}>;
};

const shaBuffer = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
const shaFile = (path: string) => shaBuffer(readFileSync(path));
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function currentBinding() {
  if (!existsSync(previewPath)) throw new Error('OPENING_PREVIEW_SOURCE_PREVIEW_MISSING');
  const sources = renderSourcePaths.map((path) => {
    const absolute = join(studioRoot, path);
    if (!existsSync(absolute)) throw new Error(`OPENING_PREVIEW_SOURCE_FILE_MISSING:${path}`);
    return {path, sha256: shaFile(absolute)};
  });
  const sourceFingerprintSha256 = shaBuffer(
    sources.map((source) => `${source.path}\0${source.sha256}`).join('\n'),
  );
  return {
    preview: {path: rel(previewPath), sha256: shaFile(previewPath)},
    sourceFingerprintSha256,
    sources,
  };
}

function writeReceipt() {
  const current = currentBinding();
  const receipt: Receipt = {
    schemaVersion: 'opening-v1-preview-source-fingerprint/v1',
    authority: 'PREVIEW_RENDER_SOURCE_BINDING',
    renderedAt: new Date().toISOString(),
    ...current,
  };
  mkdirSync(dirname(receiptPath), {recursive: true});
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(`Opening V1 preview source fingerprint written: ${rel(receiptPath)}`);
  console.log(`sourceFingerprintSha256=${receipt.sourceFingerprintSha256}`);
}

function evaluate() {
  const blockers: string[] = [];
  if (!existsSync(receiptPath)) {
    return {state: 'NOT_RUN' as const, blockers: ['OPENING_PREVIEW_SOURCE_RECEIPT_MISSING']};
  }
  let receipt: Receipt;
  try {
    receipt = JSON.parse(readFileSync(receiptPath, 'utf8')) as Receipt;
  } catch {
    return {state: 'BLOCKED' as const, blockers: ['OPENING_PREVIEW_SOURCE_RECEIPT_INVALID_JSON']};
  }
  if (receipt.schemaVersion !== 'opening-v1-preview-source-fingerprint/v1') blockers.push('OPENING_PREVIEW_SOURCE_RECEIPT_SCHEMA');
  if (receipt.authority !== 'PREVIEW_RENDER_SOURCE_BINDING') blockers.push('OPENING_PREVIEW_SOURCE_RECEIPT_AUTHORITY');
  if (!receipt.renderedAt || Number.isNaN(Date.parse(receipt.renderedAt))) blockers.push('OPENING_PREVIEW_SOURCE_RENDERED_AT_INVALID');

  let current: ReturnType<typeof currentBinding> | null = null;
  try {
    current = currentBinding();
  } catch (error) {
    blockers.push(error instanceof Error ? error.message : String(error));
  }
  if (current) {
    if (receipt.preview.path !== current.preview.path || receipt.preview.sha256 !== current.preview.sha256) {
      blockers.push('OPENING_PREVIEW_SOURCE_PREVIEW_STALE');
    }
    if (receipt.sourceFingerprintSha256 !== current.sourceFingerprintSha256) {
      blockers.push('OPENING_PREVIEW_RENDER_IMPLEMENTATION_STALE');
    }
    const savedByPath = new Map(receipt.sources?.map((source) => [source.path, source.sha256]) ?? []);
    for (const source of current.sources) {
      if (savedByPath.get(source.path) !== source.sha256) blockers.push(`OPENING_PREVIEW_SOURCE_STALE:${source.path}`);
    }
    if (!Array.isArray(receipt.sources) || receipt.sources.length !== current.sources.length) {
      blockers.push(`OPENING_PREVIEW_SOURCE_COUNT:${Array.isArray(receipt.sources) ? receipt.sources.length : 0}/${current.sources.length}`);
    }
  }
  return {state: blockers.length ? ('BLOCKED' as const) : ('PASS' as const), blockers};
}

if (mode === 'write') {
  writeReceipt();
} else {
  const status = evaluate();
  console.log(`Opening V1 preview render-source binding: ${status.state}`);
  for (const blocker of status.blockers) console.log(`BLOCK / ${blocker}`);
  if (mode === 'strict' && status.state !== 'PASS') process.exit(1);
}
