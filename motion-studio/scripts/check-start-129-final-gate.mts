// 本番(WEDDING_FINAL)へ進める状態かを判定するgate。
//
// このgateが通らない限り、Clean Final renderは実行できない。
// 「演出が良くなった」ことと「本番に出せる」ことは別。
// 正規歌詞・正規音源が無い状態でFINAL扱いすることを構造的に防ぐ。
//
// 検査を弱めて通すことは禁止(docs/decisions/2026-08-25-start-129-rebuild-root-cause.md)。

import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {LYRIC_SLOT_COUNT, parseLocalLyricsJson, resolveLyricSlots} from '../src/data/start129/localLyrics.ts';
import {parseLocalRightsJson} from '../src/data/start129/localRights.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const blockers: string[] = [];
const ok: string[] = [];

// --- 1. 正規歌詞 -------------------------------------------------------------
const lyricsPath = join(localDir, 'lyrics.local.json');
if (!existsSync(lyricsPath)) {
  blockers.push(`正規歌詞が未投入: ${lyricsPath} が無い`);
} else {
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(lyricsPath, 'utf8'));
  } catch (e) {
    blockers.push(`歌詞JSONが壊れている: ${(e as Error).message}`);
    raw = null;
  }
  if (raw) {
    const parsed = parseLocalLyricsJson(raw);
    if (!parsed.ok) {
      blockers.push(`歌詞JSONのスキーマ不正: ${parsed.error}`);
    } else {
      const slots = resolveLyricSlots(parsed.data);
      const placeholders = slots.filter((s) => s.isPlaceholder);
      if (placeholders.length > 0) {
        blockers.push(
          `歌詞が${LYRIC_SLOT_COUNT - placeholders.length}/${LYRIC_SLOT_COUNT}枠しか埋まっていない(未投入: ${placeholders.map((p) => p.slotId).join(', ')})`,
        );
      } else {
        // timingの妥当性も見る
        const bad = slots.filter((s) => s.startSec === null || s.endSec === null || (s.endSec as number) <= (s.startSec as number));
        if (bad.length) {
          blockers.push(`歌詞timingが不正なslot: ${bad.map((b) => b.slotId).join(', ')}`);
        } else {
          const outOfRange = slots.filter((s) => (s.startSec as number) < 0 || (s.endSec as number) > 129);
          if (outOfRange.length) {
            blockers.push(`歌詞timingが129秒の外にあるslot: ${outOfRange.map((b) => b.slotId).join(', ')}`);
          } else {
            ok.push(`正規歌詞 ${LYRIC_SLOT_COUNT}/${LYRIC_SLOT_COUNT}枠、timing検証OK`);
          }
        }
      }
    }
  }
}

// --- 2. 正規音源 -------------------------------------------------------------
const audioExts = ['.mp3', '.wav', '.m4a', '.aac'];
const audioFound = audioExts.map((ext) => join(localDir, 'audio', `start-129${ext}`)).find((p) => existsSync(p));
if (!audioFound) {
  blockers.push(`正規音源が未投入: ${join(localDir, 'audio')}/start-129.{mp3,wav,m4a,aac} が無い`);
} else {
  ok.push(`正規音源: ${audioFound.replace(studioRoot + '/', '')}`);
}

// --- 3. 権利メモ -------------------------------------------------------------
const rightsPath = join(localDir, 'rights.local.json');
if (!existsSync(rightsPath)) {
  blockers.push(`権利メモが未作成: ${rightsPath} が無い(上映用途の申告が必要)`);
} else {
  try {
    const parsed = parseLocalRightsJson(JSON.parse(readFileSync(rightsPath, 'utf8')));
    if (!parsed.ok) blockers.push(`権利メモのスキーマ不正: ${parsed.error}`);
    else ok.push('権利メモ: 上映用途の申告あり');
  } catch (e) {
    blockers.push(`権利メモJSONが壊れている: ${(e as Error).message}`);
  }
}

// --- 4. 本人素材 -------------------------------------------------------------
// 本人写真はGit外の別運用。ここでは「ダミー素材のままでないか」だけを申告に基づいて確認する。
const realMediaMarker = join(localDir, 'real-media.local.json');
if (!existsSync(realMediaMarker)) {
  blockers.push(
    `本人写真・動画が未申告: ${realMediaMarker} が無い(Pexelsダミー素材のままではFINALにできない)`,
  );
}

// --- 結果 -------------------------------------------------------------------
ok.forEach((o) => console.log(`✅ ${o}`));

if (blockers.length) {
  console.error('\n🚫 WEDDING_FINAL_BLOCKED');
  blockers.forEach((b) => console.error(`   - ${b}`));
  console.error('\n必要な投入手順:');
  console.error('  1. motion-studio/local/lyrics.local.json に正規歌詞32句 + startSec/endSec');
  console.error('     schema: src/data/start129/localLyrics.ts (LocalLyricsFileSchema)');
  console.error('  2. motion-studio/local/audio/start-129.mp3 (または .wav/.m4a/.aac) に権利確認済み音源');
  console.error('  3. motion-studio/local/rights.local.json に上映用途の申告');
  console.error('     schema: src/data/start129/localRights.ts (LocalRightsFileSchema)');
  console.error('  4. motion-studio/local/real-media.local.json に本人素材投入の申告');
  console.error('  5. pnpm sync:start-129-local を実行');
  console.error('\nいずれもGit管理外。歌詞本文・音源をcommitしないこと。');
  console.error('現在の3案はDEMO(演出比較用)としては見られるが、本番上映用ではない。');
  process.exit(1);
}

console.log('\n✅ WEDDING_FINAL_READY の前提条件を満たしています。');
console.log('   ただしこれは素材の存在確認のみ。会場仕様確認と本人承認は別途必要。');
