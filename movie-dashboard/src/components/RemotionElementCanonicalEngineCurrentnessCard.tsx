export function RemotionElementCanonicalEngineCurrentnessCard() {
  return (
    <div className="mt-3 border border-cyan-200 bg-cyan-50/70 p-2.5 dark:border-cyan-900 dark:bg-cyan-950/20">
      <p className="text-[9px] font-semibold tracking-[0.12em] text-cyan-800 dark:text-cyan-200">
        CANONICAL ENGINE CURRENTNESS · TypographyRevealEngine
      </p>
      <p className="mt-1 text-[9px] leading-4 text-cyan-800 dark:text-cyan-200">
        9個のTypography Elementは、生成時のcanonicalBlockSha256を
        src/motion-kit/engines.tsx#TypographyRevealEngine と照合します。canonical engineが変わったら、
        以前のprepared batchとStudio Actual evidenceはCURRENTとして扱いません。
      </p>
      <p className="mt-1 text-[9px] font-mono leading-4 text-cyan-700 dark:text-cyan-300">
        CANONICAL_ENGINE_CHANGED ⇒ REPREPARE_REQUIRED ⇒ OLD_STUDIO_ACTUAL_EVIDENCE_NOT_CURRENT
      </p>
      <code className="mt-2 block break-all bg-cyan-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">
        cd motion-studio && node --no-warnings scripts/check-typography-element-canonical-engine-currentness.mts
      </code>
      <p className="mt-2 text-[9px] leading-4 text-amber-800 dark:text-amber-200">
        このrepo currentness checkはMac Remotion Studio GUI Actualを実行しません。Actualは実機確認されるまでNOT_RUNのままです。
      </p>
    </div>
  );
}
