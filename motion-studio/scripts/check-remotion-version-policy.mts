import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')) as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
const lockfile = fs.readFileSync(path.join(root, 'pnpm-lock.yaml'), 'utf8');

const allDeps = {...packageJson.dependencies, ...packageJson.devDependencies};
const remotionEntries = Object.entries(allDeps)
  .filter(([name]) => name === 'remotion' || name.startsWith('@remotion/'))
  .sort(([a], [b]) => a.localeCompare(b));

if (remotionEntries.length === 0) {
  throw new Error('No Remotion packages found in package.json');
}

const manifestVersions = new Set(remotionEntries.map(([, version]) => version));
if (manifestVersions.size !== 1) {
  throw new Error(`Remotion manifest versions must move atomically. Found: ${remotionEntries.map(([name, version]) => `${name}=${version}`).join(', ')}`);
}

const manifestSpecifier = remotionEntries[0][1];
const expectedResolved = '4.0.475';

// Current production state intentionally keeps the historical ^4.0.0 manifest
// together with the committed lockfile that resolves every used Remotion package
// to 4.0.475. A future upgrade must change package.json AND pnpm-lock.yaml in the
// same PR. Do not exact-pin only one side.
if (manifestSpecifier !== '^4.0.0' && manifestSpecifier !== expectedResolved) {
  throw new Error(`Unexpected Remotion manifest policy: ${manifestSpecifier}. Keep current ^4.0.0 or perform the atomic exact-pin upgrade canary.`);
}

for (const [name] of remotionEntries) {
  const importerPattern = new RegExp(`['\"]?${name}['\"]?:\\n\\s+specifier: \\^4\\.0\\.0\\n\\s+version: ${expectedResolved.replace(/\./g, '\\.')}`);
  if (!importerPattern.test(lockfile)) {
    throw new Error(`Lockfile coherence check failed for ${name}: expected specifier ^4.0.0 resolving to ${expectedResolved}`);
  }
}

const resolvedVersions = [...lockfile.matchAll(/(?:^|\n)\s{4}(?:'@remotion\/[^']+'|remotion):\n\s{6}specifier: \^4\.0\.0\n\s{6}version: ([0-9]+\.[0-9]+\.[0-9]+)/g)].map((m) => m[1]);
if (resolvedVersions.length < remotionEntries.length || resolvedVersions.some((version) => version !== expectedResolved)) {
  throw new Error(`Remotion lockfile resolved versions are not coherent at ${expectedResolved}: ${resolvedVersions.join(', ')}`);
}

console.log(`Remotion version policy OK: ${remotionEntries.length} packages, manifest ${manifestSpecifier}, lockfile ${expectedResolved}.`);
