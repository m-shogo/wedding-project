import {
  formatWeddingTypographyProductionHandoff,
  getWeddingTypographyProductionHandoff,
} from '../src/data/weddingProductionTypographyHandoff.ts';
import type {WeddingMovieId} from '../src/data/weddingProductionTypographyElements.ts';

const args = process.argv.slice(2);
const readArg = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const movie = readArg('--movie');
const format = readArg('--format') ?? 'json';

if (movie !== 'opening' && movie !== 'profile') {
  throw new Error('Usage: --movie opening|profile [--format json|markdown]');
}
if (format !== 'json' && format !== 'markdown') {
  throw new Error(`Unsupported --format ${format}. Expected json or markdown.`);
}

const movieId: WeddingMovieId = movie;
if (format === 'markdown') {
  process.stdout.write(formatWeddingTypographyProductionHandoff(movieId));
} else {
  process.stdout.write(`${JSON.stringify(getWeddingTypographyProductionHandoff(movieId), null, 2)}\n`);
}
