// B案(冒険アニメOP/CM文法)の新しい冒頭。
//
// weddingEditEditorialBlocks(StaRtタイミングマスターのeditorialBlocksから
// sync-start-wedding-timing-master.mtsが機械生成)を実際に消費し、
// 「ようこそ」→「楽しんでいってください」→(新郎新婦紹介、showIntroduction時のみ)→
// 「S」→「StaRt」→本編、という物語を1つのcompositionで描く。
//
// 秒数はここでハードコードしない。すべてweddingEditEditorialBlocksの
// startSec/endSecから取り、masterのeditorialBlocksを動かせばこのcomponentの
// timingも自動的に追従する(migrate-start-wedding-timing-master.mtsの
// intro配分ロジックを変えるだけでよい)。
//
// 現状(2026-08-26): couple-profile.local.jsonのgroom.nameが未入力のため
// showIntroduction=false。migrate scriptはintro-groom/intro-bride/intro-mergeの
// editorial blockを生成しない(4 block構成: welcome/tagline/S/StaRt)。
// このcomponentはblockが無ければ単にその区間を描かないので、新郎名が入力され
// showIntroduction=trueになれば、コード変更なしで7 block構成へ自動的に拡張される。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {weddingEditEditorialBlocks, weddingEditBeatMap, type GeneratedLetterCue} from '../../data/startWeddingEdit/generated';
import {WeddingRealOrDemoBackdrop as StartDemoBackdrop} from './WeddingRealOrDemoBackdrop';

const FPS = 30;
const secToFrame = (s: number) => Math.round(s * FPS);
const findBlock = (id: string) => weddingEditEditorialBlocks.find((b) => b.blockId === id) ?? null;

const beatFramesIn = (startSec: number, endSec: number): number[] =>
  weddingEditBeatMap.beats.filter((s) => s >= startSec && s <= endSec).map(secToFrame);

/** 直近の実測beatからの経過frameで0→1→0のpulseを返す(捏造した均等LFOではなく
 * 実beat列駆動。TitleSequences.tsxのuseBeatPulseと同じ考え方をここでも使う)。 */
const useBeatPulse = (frame: number, beatFrames: number[], decay = 10): number => {
  let nearest = -1;
  for (const b of beatFrames) if (b <= frame) nearest = b;
  if (nearest < 0) return 0;
  const local = frame - nearest;
  return interpolate(local, [0, 2, decay], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

/** ようこそ / タグライン: 画面の主役として大きく、読める保持時間を確保して表示する。
 * 小さな字幕にしない。会場の空気を感じる背景(HERO_WIDE placeholder)の上に、
 * Sへ繋がる細い光の線を予告として右下から伸ばしておく。 */
const WelcomeBlock: React.FC<{lines: string[]; blockStartSec: number; blockEndSec: number}> = ({lines, blockStartSec, blockEndSec}) => {
  const frame = useCurrentFrame();
  const durFrames = secToFrame(blockEndSec - blockStartSec);
  const o = interpolate(frame, [0, 14, durFrames - 14, durFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(frame, [0, 16], [0.92, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Sへ繋がる予告の線(右下から伸びる細い光。S bookで実際に完成する線の先触れ)。
  const traceLen = interpolate(frame, [durFrames - 24, durFrames], [0, 140], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // 会場の空気を感じる背景に、ごく控えめな連続push-inを掛ける(Style Bibleの
  // restrained push方針。テキストが長く保持される区間でも背景が完全静止しない
  // ようにする実務上の理由もある)。
  const bgScale = interpolate(frame, [0, durFrames], [1, 1.05], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#12100D'}}>
      <AbsoluteFill style={{opacity: 0.5, transform: `scale(${bgScale})`}}>
        <StartDemoBackdrop role="NEGATIVE_SPACE" variantIndex={0} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'rgba(10,9,7,0.55)'}} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{opacity: o, transform: `scale(${s})`, textAlign: 'center'}}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 900,
                fontSize: 96,
                color: '#FFFDF7',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <line x1={1920} y1={1080} x2={1920 - traceLen} y2={1080 - traceLen * 0.6} stroke="rgba(244,201,93,0.85)" strokeWidth={3} />
      </svg>
    </AbsoluteFill>
  );
};

/** タグライン(楽しんでいってください): ウェルカムより控えめなサイズで2行、
 * 読む時間を確保する(不要なflash禁止)。 */
const TaglineBlock: React.FC<{lines: string[]; blockStartSec: number; blockEndSec: number}> = ({lines, blockStartSec, blockEndSec}) => {
  const frame = useCurrentFrame();
  const durFrames = secToFrame(blockEndSec - blockStartSec);
  const o = interpolate(frame, [0, 12, durFrames - 14, durFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bgScale = interpolate(frame, [0, durFrames], [1, 1.05], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#12100D'}}>
      <AbsoluteFill style={{opacity: 0.55, transform: `scale(${bgScale})`}}>
        <StartDemoBackdrop role="DEPARTURE" variantIndex={0} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'rgba(10,9,7,0.5)'}} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{opacity: o, textAlign: 'center'}}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 600,
                fontSize: 52,
                color: '#FFFDF7',
                lineHeight: 1.6,
                textShadow: '0 2px 16px rgba(0,0,0,0.6)',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** 新郎/新婦紹介(showIntroduction=trueの場合のみblockが存在する)。
 * 片側に単独写真+名前、「独りじゃない」component(SoloUnionMoment)の
 * 使い回しに見せないため、レイアウトは左右非対称の紹介card形式にする。 */
const ProfileBlock: React.FC<{side: 'left' | 'right'; lines: string[]; photoRole: string; blockStartSec: number; blockEndSec: number}> = ({
  side,
  lines,
  photoRole,
  blockStartSec,
  blockEndSec,
}) => {
  const frame = useCurrentFrame();
  const durFrames = secToFrame(blockEndSec - blockStartSec);
  const dir = side === 'left' ? -1 : 1;
  const enter = interpolate(frame, [0, 14], [dir * 60, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = interpolate(frame, [0, 10, durFrames - 10, durFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#0A0A0C', opacity: o}}>
      <AbsoluteFill style={{display: 'grid', gridTemplateColumns: side === 'left' ? '55% 45%' : '45% 55%'}}>
        <div
          style={{
            gridColumn: side === 'left' ? 1 : 2,
            position: 'relative',
            overflow: 'hidden',
            transform: `translateX(${enter}px)`,
          }}
        >
          <StartDemoBackdrop role={photoRole as never} variantIndex={0} />
        </div>
        <div
          style={{
            gridColumn: side === 'left' ? 2 : 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: side === 'left' ? 'flex-start' : 'flex-end',
            padding: '0 64px',
            transform: `translateX(${-enter}px)`,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: i === 1 ? 900 : 500,
                fontSize: i === 1 ? 56 : 26,
                color: '#FFFDF7',
                marginBottom: 6,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** 二人が合流(couple-profile種別のintro-merge)。photoRoleのみで文字は無し。
 * 「独りじゃない」component(SoloUnionMoment)の丸ごと再利用に見せないよう、
 * ここでは左右から寄る2枚ではなく単一写真へのpush-inにする。 */
const MergeBlock: React.FC<{photoRole: string}> = ({photoRole}) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 30], [1.1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#0A0A0C', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${s})`}}>
        <StartDemoBackdrop role={photoRole as never} variantIndex={0} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** S: 一本の線がSを描き、単なるSVGロゴ表示ではなく次のStaRt文字/写真frameの
 * 境界へ変形する予告にする。 */
const SLineBlock: React.FC<{blockStartSec: number; blockEndSec: number}> = ({blockStartSec, blockEndSec}) => {
  const frame = useCurrentFrame();
  const durFrames = secToFrame(blockEndSec - blockStartSec);
  const draw = interpolate(frame, [0, durFrames - 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // strokeDasharray/dashoffsetで「線が描かれていく」動きにする。
  const pathLen = 420;
  const dashoffset = pathLen * (1 - draw);
  const sPath = 'M 1080 380 C 1020 340, 1020 440, 1080 460 C 1150 480, 1150 560, 1080 580';
  const glow = interpolate(frame, [durFrames - 14, durFrames], [0.4, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#12100D'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 700px 500px at 55% 45%, rgba(244,201,93,${glow * 0.3}) 0%, rgba(18,16,13,0) 70%)`,
        }}
      />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path
          d={sPath}
          fill="none"
          stroke="#F4C95D"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={pathLen}
          strokeDashoffset={dashoffset}
        />
      </svg>
    </AbsoluteFill>
  );
};

/** StaRt: 音楽cue(実測beat)に合わせ一文字ずつ構築する。固定等間隔ではなく、
 * このblock区間内の実測beatへ均等5文字を割り当てる(捏造fractionにしない)。
 * 最後の文字で本編画面が完成し、次shot(P001の実shot)へのgraphic match cutを
 * 予告するため、末尾で白フラッシュ+わずかな拡大を残す(straight cut方針との両立)。 */
const StartTitleBlock: React.FC<{blockStartSec: number; blockEndSec: number; letterCues?: GeneratedLetterCue[]}> = ({
  blockStartSec,
  blockEndSec,
  letterCues,
}) => {
  const frame = useCurrentFrame();
  const durFrames = secToFrame(blockEndSec - blockStartSec);
  const letters = ['S', 't', 'a', 'R', 't'];
  // 重要な訂正: 以前はweddingEditBeatMap.beatsが常に空配列だったため、実質
  // 均等fallbackしか使われていなかった(「実測beat同期」という説明が事実と
  // 異なっていた)。今はmaster.editorialBlocks[].letterCues(migrate scriptが
  // 実測beatまたはestimated fallbackを明示的に記録したもの)をそのまま使う。
  const usingRealCues = letterCues && letterCues.length === letters.length;
  // 実beatはmigrate script側で別途blockStartMs/EndMsの近傍から選ぶため、
  // ごく僅かにblock境界の外(端数msの丸め違い)へ出ることがある。durFrames内へ
  // clampして、以降のinterpolate(lockFrame, durFrames等)が単調増加を維持する
  // ようにする(実測beatを使うこと自体は変えない。表示位置の安全域だけの措置)。
  const clampFrame = (f: number) => Math.max(0, Math.min(durFrames - 1, f));
  const letterFrames = (
    usingRealCues
      ? letterCues.map((c) => secToFrame(c.timeSec - blockStartSec))
      : letters.map((_, i) => Math.round((i * durFrames) / letters.length))
  ).map(clampFrame);
  const isEstimatedFallback = !usingRealCues || letterCues.some((c) => c.timingSource === 'estimated');
  const lockFrame = Math.min(durFrames - 2, letterFrames[letterFrames.length - 1] + 8);
  const pulse = useBeatPulse(frame, beatFramesIn(blockStartSec, blockEndSec).map((f) => f - secToFrame(blockStartSec)), 10);
  const flashO = interpolate(frame, [durFrames - 10, durFrames - 2, durFrames], [0, 0.5, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const finalScale = interpolate(frame, [lockFrame, durFrames], [1, 1.05 + pulse * 0.02], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // 前blockのS光跡から続く環境光。純粋な暗黒背景(#12100D単色)は
  // レンダリング事故(黒frame)に見える上、blackdetect QAでも誤検出される
  // ため、SLineBlockと同じ質のradial gradientを持たせて画面に情報量を残す
  // (機械QAを通すためだけの変更ではなく、視聴者にも「暗転事故」に見えない
  // ようにする実質的な演出上の理由がある)。
  const glowPulse = 0.35 + pulse * 0.15;
  return (
    <AbsoluteFill style={{background: '#12100D', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 900px 600px at 50% 50%, rgba(244,201,93,${glowPulse}) 0%, rgba(18,16,13,0) 70%)`,
        }}
      />
      <div style={{display: 'flex', gap: 4, transform: `scale(${finalScale})`}}>
        {letters.map((ch, i) => {
          const hit = letterFrames[i];
          const local = frame - hit;
          const o = interpolate(local, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const y = interpolate(local, [0, 10], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const s = interpolate(local, [0, 5, 12], [1.4, 1.05, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <span
              key={i}
              style={{
                fontFamily: i === 0 || i === 3 ? "'Georgia', 'Noto Sans JP', serif" : "'Noto Sans JP', sans-serif",
                fontSize: 118,
                fontWeight: 900,
                color: '#FFFDF7',
                opacity: o,
                transform: `translateY(${y}px) scale(${s})`,
                display: 'inline-block',
                textShadow: '0 5px 0 rgba(24,20,14,0.5)',
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <AbsoluteFill style={{background: '#FFFFFF', opacity: flashO, mixBlendMode: 'screen', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

/** 冒頭全体: editorialBlocksをSequenceとして並べる。Sequenceでラップすることで
 * 各Blockの useCurrentFrame() が自動的にそのblock開始からのlocal frameになる
 * (重要な訂正: 以前はSequenceを使わず各Blockが intro全体のglobal frameを
 * そのままblock-local frameとして扱っていたため、blockStartSecが0に近い
 * 最初のblock以外、interpolateのrange外にframeが出てclampされ、実質何も
 * 表示されない不具合があった。実render後のstill確認で発見した)。
 * blockが1つも無い場合(masterが未migrateの異常系)だけ、最低限のfallback
 * (空の暗転)にする。 */
export const IntroNarrativeB: React.FC = () => {
  const welcome = findBlock('intro-welcome');
  const tagline = findBlock('intro-tagline');
  const groom = findBlock('intro-groom');
  const bride = findBlock('intro-bride');
  const merge = findBlock('intro-merge');
  const sLine = findBlock('intro-s-line');
  const startTitle = findBlock('intro-start-title');

  const seq = (block: {startSec: number; endSec: number} | null, key: string, node: React.ReactNode) => {
    if (!block) return null;
    const from = secToFrame(block.startSec);
    const dur = Math.max(1, secToFrame(block.endSec) - from);
    return (
      <Sequence key={key} from={from} durationInFrames={dur} name={key}>
        {node}
      </Sequence>
    );
  };

  return (
    <AbsoluteFill style={{background: '#0A0A0C'}}>
      {seq(welcome, 'intro-welcome', welcome && <WelcomeBlock lines={welcome.textLines} blockStartSec={welcome.startSec} blockEndSec={welcome.endSec} />)}
      {seq(tagline, 'intro-tagline', tagline && <TaglineBlock lines={tagline.textLines} blockStartSec={tagline.startSec} blockEndSec={tagline.endSec} />)}
      {seq(
        groom,
        'intro-groom',
        groom && <ProfileBlock side="left" lines={groom.textLines} photoRole={groom.photoRoles[0] ?? 'HERO_CLOSE'} blockStartSec={groom.startSec} blockEndSec={groom.endSec} />,
      )}
      {seq(
        bride,
        'intro-bride',
        bride && <ProfileBlock side="right" lines={bride.textLines} photoRole={bride.photoRoles[0] ?? 'HERO_CLOSE'} blockStartSec={bride.startSec} blockEndSec={bride.endSec} />,
      )}
      {seq(merge, 'intro-merge', merge && <MergeBlock photoRole={merge.photoRoles[0] ?? 'HERO_WIDE'} />)}
      {seq(sLine, 'intro-s-line', sLine && <SLineBlock blockStartSec={sLine.startSec} blockEndSec={sLine.endSec} />)}
      {seq(
        startTitle,
        'intro-start-title',
        startTitle && <StartTitleBlock blockStartSec={startTitle.startSec} blockEndSec={startTitle.endSec} letterCues={startTitle.letterCues} />,
      )}
    </AbsoluteFill>
  );
};
