import type { CharStaggerDaVinciEvaluatedEvidenceV1 } from "../data/charStaggerDaVinciEvidenceCapture";
import { assessCharStaggerDaVinciPromotionEligibility } from "../data/charStaggerDaVinciPromotionGate";

export function CharStaggerDaVinciPromotionAssessmentView({
  evidence,
}: {
  evidence: CharStaggerDaVinciEvaluatedEvidenceV1;
}) {
  const assessment = assessCharStaggerDaVinciPromotionEligibility(evidence);

  return (
    <div className="mt-2 border-t border-emerald-200 dark:border-emerald-800 pt-2 text-navy-400">
      <p className="font-semibold text-navy-700 dark:text-sand-100">
        Promotion review: {assessment.eligibleForHumanPromotionReview ? "ELIGIBLE" : "BLOCKED"}
      </p>
      <p>
        Live binding roles: {assessment.capturedBindingRoles.length}/{assessment.requiredBindingRoles.length}
      </p>
      <p>
        Automatic promotion: NO / productionReady: NO
      </p>
      {!assessment.eligibleForHumanPromotionReview ? (
        <p>Promotion blockers: {assessment.blockers.join(", ")}</p>
      ) : (
        <p>
          証拠一式はHuman promotion reviewへ進めます。ここではrouteを自動変更せず、実parameter bindingとrender evidenceを人間が承認してから別PRで昇格します。
        </p>
      )}
    </div>
  );
}
