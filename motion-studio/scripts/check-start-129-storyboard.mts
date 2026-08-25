// StaRt 129秒 storyboard(演出表)の再発防止gate。
//
// 以前の失敗:「1区間=背景1枚+歌詞1個」で映像が静止して見えたのに、
// 契約checkが通っていたため完成扱いしてしまった。
// このcheckは「演出密度」そのものを機械検証する。
//
// 検査を弱めて通すことは禁止(docs/decisions/2026-08-25-start-129-rebuild-root-cause.md)。

import {START_129_FPS, START_129_SECTIONS} from '../src/data/start129/sections.ts';
import {start129AssetRoleSpec} from '../src/data/start129/assetRoles.ts';
import {
  START_129_STORYBOARDS,
  placeShots,
  totalShotCount,
  type Start129Variant,
} from '../src/data/start129/storyboard.ts';

const errors: string[] = [];
const warnings: string[] = [];
const VARIANTS: Start129Variant[] = ['A', 'B', 'C'];

/**
 * 1shotが「時間方向の変化」を持つか。
 *
 * 重要: layoutは構図を変えるだけで、時間方向には静止したままになる。
 * 実際にffmpegのfreezedetectで、static + panel-4 のshotが3秒完全静止として
 * 検出されたため、layoutを「変化あり」に数えない。
 * 動画role(BROLL等)は素材自体が動くため静止しない。
 * effectも時間変化を持つもの(dust/sparks/glint/flash/speed-lines/light-leak/prism)だけを数える。
 */
const TIME_VARYING_EFFECTS = new Set([
  'dust', 'sparks', 'glint', 'flash', 'speed-lines', 'light-leak', 'prism',
]);
const hasVisualChange = (shot: ReturnType<typeof placeShots>[number]): boolean => {
  if (start129AssetRoleSpec(shot.role).kind === 'video') return true;
  if (shot.motion.kind !== 'static') return true;
  if ((shot.effects ?? []).some((e) => TIME_VARYING_EFFECTS.has(e.kind))) return true;
  return false;
};

for (const variant of VARIANTS) {
  const sb = START_129_STORYBOARDS[variant];

  // 1. 14区間すべてに設計があるか
  if (sb.sections.length !== START_129_SECTIONS.length) {
    errors.push(`${variant}案: 区間設計が${sb.sections.length}件(期待${START_129_SECTIONS.length}件)`);
  }
  for (const s of START_129_SECTIONS) {
    if (!sb.sections.find((d) => d.sectionId === s.id)) {
      errors.push(`${variant}案: ${s.id} の設計が無い`);
    }
  }

  // 2. shot総数。同じ絵の反復に見えないだけの数を確保する
  const total = totalShotCount(variant);
  if (total < 24) {
    errors.push(`${variant}案: shot総数が${total}件。24件以上必要(演出密度不足)`);
  }

  // 3. 素材の重複率。同じ写真ばかりで水増ししていないか
  const usedKeys: string[] = [];
  for (const design of sb.sections) {
    for (const shot of design.shots) {
      usedKeys.push(`${shot.role}#${shot.variantIndex}`);
      for (const e of shot.extraRoles ?? []) usedKeys.push(`${e.role}#${e.variantIndex}`);
    }
  }
  const uniqueKeys = new Set(usedKeys);
  const dupRate = 1 - uniqueKeys.size / usedKeys.length;
  if (uniqueKeys.size < 24) {
    errors.push(`${variant}案: ユニーク素材が${uniqueKeys.size}件。24件以上必要(同じ写真の使い回し)`);
  }
  if (dupRate > 0.55) {
    warnings.push(`${variant}案: 素材重複率 ${(dupRate * 100).toFixed(0)}% がやや高い`);
  }

  // 4. 各区間で: shotがsection長を過不足なく埋め、静止しっぱなしのshotが長すぎないか
  for (const design of sb.sections) {
    const section = START_129_SECTIONS.find((s) => s.id === design.sectionId)!;
    const sectionFrames = Math.round((section.endSec - section.startSec) * START_129_FPS);
    const shots = placeShots(design);

    const sum = shots.reduce((n, s) => n + s.durationInFrames, 0);
    if (sum !== sectionFrames) {
      errors.push(`${variant}/${design.sectionId}: shot合計${sum}frameがsection${sectionFrames}frameと不一致(gap/overlap)`);
    }
    for (let i = 0; i < shots.length; i += 1) {
      const expectFrom = i === 0 ? 0 : shots[i - 1].localFrom + shots[i - 1].durationInFrames;
      if (shots[i].localFrom !== expectFrom) {
        errors.push(`${variant}/${design.sectionId}: shot${i + 1}の開始位置が不連続`);
      }
      if (shots[i].durationInFrames <= 0) {
        errors.push(`${variant}/${design.sectionId}: shot${i + 1}のdurationが0以下`);
      }
    }

    // 変化のないshotが長時間続かないか。
    // A案の意図的な余韻は最大4秒まで、B/Cは2.5秒まで。
    const maxStaticSec = variant === 'A' ? 4.0 : 2.5;
    for (const shot of shots) {
      if (!hasVisualChange(shot)) {
        const sec = shot.durationInFrames / START_129_FPS;
        if (sec > maxStaticSec) {
          errors.push(
            `${variant}/${design.sectionId}: 変化のないshot(${shot.role})が${sec.toFixed(1)}秒。上限${maxStaticSec}秒`,
          );
        }
      }
    }

    // 同一素材が区間内で連続していないか(同じ写真を2shot続けない)
    for (let i = 1; i < shots.length; i += 1) {
      if (shots[i].role === shots[i - 1].role && shots[i].variantIndex === shots[i - 1].variantIndex) {
        errors.push(`${variant}/${design.sectionId}: shot${i}と${i + 1}が同じ素材(${shots[i].role}#${shots[i].variantIndex})の連続`);
      }
    }

    // 説明可能性: すべてのshotに理由が書かれているか
    for (const shot of design.shots) {
      if (!shot.noteJa || shot.noteJa.length < 4) {
        errors.push(`${variant}/${design.sectionId}: shot(${shot.role})にnoteJaが無い(なぜこの画かを説明できない)`);
      }
    }
    if (!design.narrativeJa) errors.push(`${variant}/${design.sectionId}: narrativeJaが無い`);
  }

  // 5. 感情曲線: サビが谷になっていないか
  const byId = new Map(sb.sections.map((s) => [s.sectionId, s.intensity]));
  const c1 = byId.get('chorus-1a') ?? 0;
  const c2 = byId.get('chorus-2a') ?? 0;
  const i1 = byId.get('interlude-1') ?? 0;
  if (c1 <= i1) errors.push(`${variant}案: 1サビの強度(${c1})が間奏1(${i1})以下。感情曲線が破綻`);
  if (c2 < c1) errors.push(`${variant}案: 最大サビの強度(${c2})が1サビ(${c1})未満`);
}

// 6. A/B/Cが同じ設計になっていないか(3案の差)
const signature = (v: Start129Variant) =>
  START_129_STORYBOARDS[v].sections
    .map((s) => s.shots.map((sh) => `${sh.role}#${sh.variantIndex}:${sh.motion.kind}:${sh.entry.kind}:${sh.layout?.kind ?? 'full'}`).join('|'))
    .join('//');
const sigs = VARIANTS.map((v) => ({v, sig: signature(v)}));
for (let i = 0; i < sigs.length; i += 1) {
  for (let j = i + 1; j < sigs.length; j += 1) {
    if (sigs[i].sig === sigs[j].sig) {
      errors.push(`${sigs[i].v}案と${sigs[j].v}案のshot設計が完全に同一。3案の差が無い`);
    }
  }
}
// entry種別の分布が3案で似すぎていないか
const entryProfile = (v: Start129Variant) => {
  const m = new Map<string, number>();
  for (const s of START_129_STORYBOARDS[v].sections) {
    for (const sh of s.shots) m.set(sh.entry.kind, (m.get(sh.entry.kind) ?? 0) + 1);
  }
  return m;
};
for (let i = 0; i < VARIANTS.length; i += 1) {
  for (let j = i + 1; j < VARIANTS.length; j += 1) {
    const a = entryProfile(VARIANTS[i]);
    const b = entryProfile(VARIANTS[j]);
    const keys = new Set([...a.keys(), ...b.keys()]);
    let shared = 0;
    for (const k of keys) shared += Math.min(a.get(k) ?? 0, b.get(k) ?? 0);
    const overlap = shared / Math.max(1, Math.max([...a.values()].reduce((x, y) => x + y, 0), [...b.values()].reduce((x, y) => x + y, 0)));
    if (overlap > 0.8) {
      warnings.push(`${VARIANTS[i]}案と${VARIANTS[j]}案のentry文法が${(overlap * 100).toFixed(0)}%重なる。映像文法の差を強めたい`);
    }
  }
}

warnings.forEach((w) => console.warn(`⚠️  ${w}`));

if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\nstart-129 storyboard gate: ${errors.length}件のエラー`);
  process.exit(1);
}

console.log('✅ start-129 storyboard gate OK');
for (const v of VARIANTS) {
  const used = new Set<string>();
  for (const s of START_129_STORYBOARDS[v].sections) {
    for (const sh of s.shots) {
      used.add(`${sh.role}#${sh.variantIndex}`);
      for (const e of sh.extraRoles ?? []) used.add(`${e.role}#${e.variantIndex}`);
    }
  }
  console.log(`   ${v}案: ${totalShotCount(v)} shot / ユニーク素材 ${used.size}件 / 14区間`);
}
console.log('注意: これは設計データの検証。実render・全編目視の代わりにはならない。');
