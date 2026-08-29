import {dirname, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

function valueFor(flag: string) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
  return value;
}

function run(script: string, scriptArgs: string[]) {
  const result = spawnSync(process.execPath, ['--no-warnings', script, ...scriptArgs], {
    cwd: motionRoot,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    throw new Error(`${script} failed (${result.status ?? 'unknown'}).`);
  }
}

try {
  const rawFcpxml = valueFor('--fcpxml');
  if (!rawFcpxml) {
    throw new Error('Palmier canary v2 attachment requires --fcpxml <FILE.fcpxml>.');
  }

  const absoluteFcpxml = resolve(process.cwd(), rawFcpxml);

  console.log('# Palmier Canary v2 scene-contract gate');
  run('scripts/validate-palmier-fcpxml-scene-contract.mts', ['--fcpxml', absoluteFcpxml]);

  console.log('\n# Generic structure / freshness / provenance attachment gate');
  const forwarded = [...args];
  const fcpxmlIndex = forwarded.indexOf('--fcpxml');
  forwarded[fcpxmlIndex + 1] = absoluteFcpxml;
  run('scripts/attach-palmier-real-export.mts', forwarded);
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
