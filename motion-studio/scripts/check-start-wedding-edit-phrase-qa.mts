// Phase7: 歌詞phraseレベルのdata QA。
//
// 「QAが尺・解像度・黒画面・フリーズ・scene数しか見ていない」という指摘に対応する。
// レンダー結果ではなくlyrics-wedding-edit.local.jsonのデータ契約を検証することで、
// 演出の多様性・網羅性・読みやすさの前提条件を機械的に担保する。

import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const lyricsPath = join(studioRoot, 'local/lyrics-wedding-edit.local.json');

if (!existsSync(lyricsPath)) {
  console.error('❌ local/lyrics-wedding-edit.local.json が無い');
  process.exit(1);
}

const data = JSON.parse(readFileSync(lyricsPath, 'utf8'));
const phrases: Array<{
  phraseId: string;
  text: string;
  startSec: number;
  endSec: number;
  selectedAnimation?: string;
  semanticType: string;
  confidence?: string;
}> = data.phrases;

const errors: string[] = [];
const warnings: string[] = [];

// 1. 30phrase全件のcoverage(開始<終了、順序が単調増加、重複/空白が無い)
if (phrases.length !== 30) {
  errors.push(`phrase数が${phrases.length}件(期待30件)`);
}
for (let i = 0; i < phrases.length; i++) {
  const p = phrases[i];
  if (p.endSec <= p.startSec) {
    errors.push(`${p.phraseId}: endSec(${p.endSec}) <= startSec(${p.startSec})`);
  }
  if (i > 0) {
    const prev = phrases[i - 1];
    if (p.startSec < prev.endSec - 0.01) {
      errors.push(`${p.phraseId}: 直前phrase(${prev.phraseId})と時間が重複(${prev.endSec} > ${p.startSec})`);
    }
    const gap = p.startSec - prev.endSec;
    if (gap > 1.5) {
      warnings.push(`${prev.phraseId}→${p.phraseId}: ${gap.toFixed(2)}秒の空白区間(歌詞が無い時間が長い)`);
    }
  }
}

// 2. selectedAnimationの分布検査
const animCounts: Record<string, number> = {};
const sequence: string[] = [];
for (const p of phrases) {
  const a = p.selectedAnimation ?? 'character-build';
  animCounts[a] = (animCounts[a] ?? 0) + 1;
  sequence.push(a);
}
const distinctFamilies = Object.keys(animCounts);
console.log('=== Animation Family使用分布 ===');
for (const [k, v] of Object.entries(animCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}件 (${((v / phrases.length) * 100).toFixed(0)}%)`);
}
console.log(`使用family数: ${distinctFamilies.length}種`);

if (distinctFamilies.length < 12) {
  errors.push(`使用animation familyが${distinctFamilies.length}種(最低12種類必要)`);
}
const cbCount = animCounts['character-build'] ?? 0;
const cbRatio = cbCount / phrases.length;
if (cbRatio > 0.35) {
  errors.push(`character-buildが${(cbRatio * 100).toFixed(0)}%(35%超過)`);
}

// 3. 同じfamilyが3行以上連続していないか
let run = 1;
for (let i = 1; i < sequence.length; i++) {
  if (sequence[i] === sequence[i - 1]) {
    run++;
    if (run >= 3) {
      errors.push(`${phrases[i - 2].phraseId}〜${phrases[i].phraseId}: 同じfamily(${sequence[i]})が${run}行連続`);
    }
  } else {
    run = 1;
  }
}

// 4. 冒頭「ようこそ」不在 / 「StaRt」存在チェック(静的ソース検査)
const titleSrcRaw = readFileSync(join(studioRoot, 'src/compositions/start129/TitleSequences.tsx'), 'utf8');
// コメント行(説明文)を除外し、実際のコード/JSX内容だけを検査する
const titleSrc = titleSrcRaw
  .split('\n')
  .filter((line) => !line.trim().startsWith('//') && !line.trim().startsWith('*'))
  .join('\n');
if (titleSrc.includes('ようこそ')) {
  errors.push('TitleSequences.tsx(冒頭)に「ようこそ」が残っている');
}
if (!titleSrc.includes("'S'") && !titleSrc.includes('"S"')) {
  errors.push('TitleSequences.tsx にStaRtの文字配列(S,t,a,R,t)が見つからない');
}

// 5. 「I can, You can, We can」がデータに含まれていないか
for (const p of phrases) {
  if (p.text.includes('I can') || p.text.includes('You can')) {
    errors.push(`${p.phraseId}: 除外対象のはずの"I can, You can"系テキストが含まれている`);
  }
}

// 6. 2回目の「僕は探すんだ」が含まれているか(P030相当)
const impactPhrases = phrases.filter((p) => p.text === '僕は探すんだ');
if (impactPhrases.length !== 2) {
  errors.push(`「僕は探すんだ」の出現回数が${impactPhrases.length}回(期待2回)`);
}

// 7. confidence/humanReviewの透明性チェック
const noConfidence = phrases.filter((p) => !p.confidence);
if (noConfidence.length > 0) {
  warnings.push(`confidence未設定のphraseが${noConfidence.length}件`);
}

// 8. v3: generated.ts(5 map統合結果)とのcross-consistency検査。
//    「マップが存在するがcodeから未参照」「突合できていないphraseがある」を検出する。
const generated = await import(pathToFileURL(join(studioRoot, 'src/data/startWeddingEdit/generated.ts')).href);

const mapsUsed: Record<string, boolean> = generated.weddingEditMapsUsed;
for (const [name, present] of Object.entries(mapsUsed)) {
  if (!present) {
    warnings.push(`local map未検出: ${name}(sync時にfallback/警告扱いになっている可能性)`);
  }
}

type EnrichedPhrase = {
  phraseId: string;
  selectedAnimation?: string;
  transitionIntent?: string;
  confidence?: string;
  humanReviewRequired?: boolean;
  importantWords: Array<{word: string; accentSec: number; beatSec: number | null}>;
  mapStatus: string;
};
const enriched: EnrichedPhrase[] = generated.weddingEditLyricPhrases;

const unmatched = enriched.filter((p) => p.mapStatus !== 'MATCHED');
if (unmatched.length > 0) {
  errors.push(`mapStatusがMATCHEDでないphraseが${unmatched.length}件: ${unmatched.map((p) => p.phraseId).join(', ')}`);
}

const noImportantWords = enriched.filter((p) => p.importantWords.length === 0);
console.log('\n=== importantWords(実accentSec)を持たないphrase(fallback定数使用の可能性) ===');
if (noImportantWords.length > 0) {
  console.log(`  ${noImportantWords.map((p) => p.phraseId).join(', ')} (${noImportantWords.length}/${enriched.length}件)`);
} else {
  console.log('  なし');
}

// 最重要修正1で名指しされたphraseは、実accent markerを持っていることを必須にする。
const REQUIRE_REAL_ACCENT = ['P001', 'P002', 'P004', 'P010', 'P011', 'P018', 'P019', 'P023', 'P026', 'P029', 'P030'];
for (const id of REQUIRE_REAL_ACCENT) {
  const p = enriched.find((e) => e.phraseId === id);
  if (!p) {
    errors.push(`${id}: generated.tsに存在しない`);
    continue;
  }
  if (p.importantWords.length === 0) {
    errors.push(`${id}: 実accent marker(importantWords)が0件。fallback定数のまま`);
  }
}
// P004/P019は4段階の意味変化が要求されているため、4語以上を必須にする。
for (const id of ['P004', 'P019']) {
  const p = enriched.find((e) => e.phraseId === id);
  if (p && p.importantWords.length < 4) {
    errors.push(`${id}: importantWordsが${p.importantWords.length}件(4段階の意味変化には4語以上必要)`);
  }
}

const humanReview = enriched.filter((p) => p.humanReviewRequired);
console.log(`\n=== humanReviewRequired=true のphrase(音声確認が必要) ===`);
console.log(`  ${humanReview.length}/${enriched.length}件: ${humanReview.map((p) => p.phraseId).join(', ')}`);

// 9. weddingLyricLine.tsxに残る固定fraction fallbackの棚卸し(削除ではなく、
//    fallback専用パスとして残っていることの透明性チェック)。
const lyricLineSrc = readFileSync(join(studioRoot, 'src/motion-kit/startWeddingEdit/weddingLyricLine.tsx'), 'utf8');
const fixedFractionMatches = [...lyricLineSrc.matchAll(/durFrames \* 0\.\d+/g)].map((m) => m[0]);
console.log(`\n=== 固定fraction fallback定数の残存箇所(marker不在時のみ使用される想定) ===`);
if (fixedFractionMatches.length > 0) {
  console.log(`  ${fixedFractionMatches.join(', ')}`);
} else {
  console.log('  なし(完全に実accent駆動)');
}
if (!lyricLineSrc.includes('weddingLyricFallbackByPhraseId')) {
  errors.push('weddingLyricLine.tsxにfallback可視化用のweddingLyricFallbackByPhraseIdが無い(Guide overlayのFALLBACK表示ができない)');
}

console.log('');
warnings.forEach((w) => console.warn(`⚠️  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\nphrase QA: ${errors.length}件のエラー`);
  process.exit(1);
}
console.log(
  '✅ phrase-level QA OK (coverage / family分布 / 連続family / StaRt完成 / bridge歌詞混入なし / 2回目僕は探すんだ / 5map cross-consistency / 実accent必須phrase充足 / fallback可視化)',
);
