// StaRt 129秒 3案ショーケースのデータ契約チェック。
// 実render・目視の代わりにはならない。README/CLAUDE.mdの方針どおり、
// CI GREENだけで見た目を承認しない。

import {
  START_129_DURATION_FRAMES,
  START_129_FPS,
  START_129_SECTIONS,
  lyricSlotWindowsForSection,
} from '../src/data/start129/sections.ts';
import {START_129_ASSET_ROLES} from '../src/data/start129/assetRoles.ts';
import {START_129_TECHNIQUES} from '../src/data/start129/techniqueCatalog.ts';
import {LYRIC_SLOT_COUNT} from '../src/data/start129/localLyrics.ts';

const errors: string[] = [];

// 1. 14 section, frame合計が129秒と一致
if (START_129_SECTIONS.length !== 14) {
  errors.push(`14区間である必要があるが ${START_129_SECTIONS.length} 件`);
}
const sortedByOrder = [...START_129_SECTIONS].sort((a, b) => a.order - b.order);
for (let i = 0; i < sortedByOrder.length; i += 1) {
  const s = sortedByOrder[i];
  if (s.order !== i) errors.push(`区間順序が不正: ${s.id}`);
  if (i > 0 && s.startSec !== sortedByOrder[i - 1].endSec) {
    errors.push(`区間が連続していない: ${sortedByOrder[i - 1].id} → ${s.id}`);
  }
}
const totalSec = sortedByOrder[sortedByOrder.length - 1]?.endSec ?? 0;
if (totalSec !== 129) errors.push(`合計秒数が129秒でない: ${totalSec}秒`);
if (START_129_DURATION_FRAMES !== 129 * START_129_FPS) {
  errors.push(`START_129_DURATION_FRAMES が129秒*fpsと一致しない`);
}

// 2. 歌詞slot 1-32が過不足なく、順序どおりに区間へ割り当てられている
const coveredSlots: number[] = [];
for (const section of sortedByOrder) {
  if (!section.lyricSlotRange) continue;
  const [from, to] = section.lyricSlotRange;
  if (from > to) errors.push(`${section.id}: lyricSlotRangeの順序が不正`);
  for (let i = from; i <= to; i += 1) coveredSlots.push(i);
}
const expectedSlots = Array.from({length: LYRIC_SLOT_COUNT}, (_, i) => i + 1);
const isSequential = coveredSlots.every((v, i) => v === expectedSlots[i]);
if (coveredSlots.length !== LYRIC_SLOT_COUNT || !isSequential) {
  errors.push(
    `歌詞32slotが過不足なく順序どおりに割り当てられていない(検出: [${coveredSlots.join(',')}])`,
  );
}

// 2b. lyricSlotWindowsForSectionが、各slotへ「一度だけ・0フレームより長い」windowを
//     割り当てていることを検証する。過去に slot範囲の先頭だけしか表示されないバグが
//     あったため、これは「宣言データの整合性」だけでなく「実際に描画され得るか」を見る。
const windowSlotCounts = new Map<number, number>();
for (const section of sortedByOrder) {
  const windows = lyricSlotWindowsForSection(section);
  if (section.lyricSlotRange) {
    const [from, to] = section.lyricSlotRange;
    const expectedCount = to - from + 1;
    if (windows.length !== expectedCount) {
      errors.push(`${section.id}: lyricSlotWindowsForSectionの件数が${windows.length}件(期待${expectedCount}件)`);
    }
  }
  for (const w of windows) {
    if (w.durationInFrames <= 0) {
      errors.push(`${section.id}: slot #${w.slotIndex} のdurationInFramesが0以下(${w.durationInFrames})`);
    }
    windowSlotCounts.set(w.slotIndex, (windowSlotCounts.get(w.slotIndex) ?? 0) + 1);
  }
}
for (let slot = 1; slot <= LYRIC_SLOT_COUNT; slot += 1) {
  const count = windowSlotCounts.get(slot) ?? 0;
  if (count !== 1) {
    errors.push(`歌詞slot #${slot}: windowが${count}回生成されている(期待1回)`);
  }
}

// 3. Technique Catalog: id重複禁止、showcase値の妥当性、componentRef必須
const techniqueIds = new Set<string>();
for (const t of START_129_TECHNIQUES) {
  if (techniqueIds.has(t.id)) errors.push(`Technique id重複: ${t.id}`);
  techniqueIds.add(t.id);
  if (!['A', 'B', 'C'].includes(t.showcase)) errors.push(`Technique ${t.id}: showcase不正`);
  if (!t.componentRef) errors.push(`Technique ${t.id}: componentRef必須`);
  if (!t.evidenceJa) errors.push(`Technique ${t.id}: evidenceJa必須(根拠なき昇格を防ぐ)`);
}
for (const showcase of ['A', 'B', 'C'] as const) {
  const count = START_129_TECHNIQUES.filter((t) => t.showcase === showcase).length;
  if (count === 0) errors.push(`showcase ${showcase} のTechniqueが0件`);
}

// 4. Asset role: 重複禁止
const roleIds = new Set<string>();
for (const r of START_129_ASSET_ROLES) {
  if (roleIds.has(r.role)) errors.push(`Asset role重複: ${r.role}`);
  roleIds.add(r.role);
}

if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\nstart-129 data contract: ${errors.length}件のエラー`);
  process.exit(1);
}

console.log(
  `✅ start-129 data contract OK: 14区間/129秒/${START_129_DURATION_FRAMES}frame, 歌詞32slot順序OK, Technique ${START_129_TECHNIQUES.length}件(A/B/Cすべてに存在), Asset role ${START_129_ASSET_ROLES.length}件。`,
);
console.log('注意: これはdata契約チェックのみ。実render・目視QAの代わりにはならない(pnpm qa:start-129を実行し、artifactを目視すること)。');
