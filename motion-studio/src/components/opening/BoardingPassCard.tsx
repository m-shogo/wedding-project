import type {CSSProperties} from 'react';
import {random} from 'remotion';
import {serifFamily} from '../../data/fonts';
import {colors} from '../../data/theme';

export type BoardingPassVariant = 'ivory' | 'navy';

type Props = {
  variant: BoardingPassVariant;
  title: string;
  flightNumber: string;
  date: string;
  seat: string;
  gate: string;
  passenger: string;
  departureCode: string;
  departureName: string;
  arrivalCode: string;
  arrivalName: string;
};

const palettes = {
  ivory: {
    cardBg: colors.ivory,
    text: colors.navy,
    accent: '#8C7A4F',
    rule: colors.gold,
    perforation: '#C9BC9C',
    barcode: colors.navy,
  },
  navy: {
    cardBg: colors.navy,
    text: colors.ivory,
    accent: colors.goldLight,
    rule: colors.gold,
    perforation: '#465370',
    barcode: colors.ivory,
  },
} as const;

const PlaneGlyph = ({color}: {color: string}) => (
  <svg width="30" height="30" viewBox="-16 -16 32 32" style={{display: 'block'}}>
    <path d="M 14 0 L -10.5 7.7 L -4.9 0 L -10.5 -7.7 Z" fill={color} />
  </svg>
);

const Field = ({
  label,
  value,
  accent,
  text,
}: {
  label: string;
  value: string;
  accent: string;
  text: string;
}) => (
  <div>
    <div style={{fontSize: 17, letterSpacing: '0.18em', color: accent}}>{label}</div>
    <div style={{fontSize: 27, color: text, marginTop: 6}}>{value}</div>
  </div>
);

// 搭乗券カードの静的な見た目。アニメーションは呼び出し側で付ける。
export const BoardingPassCard = ({
  variant,
  title,
  flightNumber,
  date,
  seat,
  gate,
  passenger,
  departureCode,
  departureName,
  arrivalCode,
  arrivalName,
}: Props) => {
  const p = palettes[variant];
  const codeStyle: CSSProperties = {
    fontSize: 64,
    letterSpacing: '0.06em',
    color: p.text,
    lineHeight: 1,
  };
  const codeNameStyle: CSSProperties = {
    fontSize: 16,
    letterSpacing: '0.22em',
    color: p.accent,
    marginTop: 8,
  };
  const bars = Array.from({length: 30}, (_, i) => ({
    width: 2 + Math.floor(random(`bar-w-${i}`) * 4),
    height: 0.55 + random(`bar-h-${i}`) * 0.45,
  }));

  return (
    <div
      style={{
        width: 1240,
        display: 'flex',
        background: p.cardBg,
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: serifFamily,
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
      }}
    >
      <div style={{flex: 1, padding: '44px 52px 40px'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: `1.5px solid ${p.rule}`,
            paddingBottom: 18,
          }}
        >
          <span style={{fontSize: 24, letterSpacing: '0.34em', color: p.accent}}>
            {title}
          </span>
          <span style={{fontSize: 19, letterSpacing: '0.26em', color: p.text}}>
            BOARDING PASS
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 36,
            margin: '40px 0 34px',
          }}
        >
          <div>
            <div style={codeStyle}>{departureCode}</div>
            <div style={codeNameStyle}>{departureName}</div>
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{flex: 1, borderTop: `1.5px dashed ${p.rule}`}} />
            <PlaneGlyph color={p.accent} />
            <div style={{flex: 1, borderTop: `1.5px dashed ${p.rule}`}} />
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={codeStyle}>{arrivalCode}</div>
            <div style={codeNameStyle}>{arrivalName}</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: 64}}>
          <Field label="FLIGHT" value={flightNumber} accent={p.accent} text={p.text} />
          <Field label="DATE" value={date} accent={p.accent} text={p.text} />
          <Field label="SEAT" value={seat} accent={p.accent} text={p.text} />
          <Field label="PASSENGER" value={passenger} accent={p.accent} text={p.text} />
        </div>
      </div>
      <div
        style={{
          width: 250,
          borderLeft: `2.5px dashed ${p.perforation}`,
          padding: '44px 34px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{fontSize: 17, letterSpacing: '0.3em', color: p.accent}}>
          {flightNumber}
        </div>
        <div style={{display: 'flex', gap: 4, alignItems: 'flex-end', height: 64}}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                width: b.width,
                height: `${b.height * 100}%`,
                background: p.barcode,
              }}
            />
          ))}
        </div>
        <div style={{fontSize: 17, letterSpacing: '0.22em', color: p.text}}>
          GATE {gate}
        </div>
      </div>
    </div>
  );
};
