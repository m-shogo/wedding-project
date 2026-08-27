import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd();
const review=readFileSync(join(root,'scripts/profile-v1-final-render-review.mts'),'utf8');
const bundle=readFileSync(join(root,'scripts/export-profile-v1-production-bundle.mts'),'utf8');
const davinci=readFileSync(join(root,'scripts/profile-v1-davinci-finishing-evidence.mts'),'utf8');
const approval=readFileSync(join(root,'scripts/profile-v1-final-delivery-approval.mts'),'utf8');
const status=readFileSync(join(root,'scripts/profile-v1-production-status.mts'),'utf8');
const errors:string[]=[];const need=(s:string,t:string,w:string)=>{if(!s.includes(t))errors.push(`${w} missing ${t}`)};
for(const t of [
  'HUMAN_FINAL_RENDER_REVIEW',
  'profile-v1-final-render-review/v1',
  'STALE_FINAL_RENDER',
  'renderSourceFingerprintSha256',
  'renderSources: RenderSource[]',
  'STALE_RENDER_SOURCE_FINGERPRINT',
  'STALE_RENDER_SOURCE:',
  'RENDER_SOURCE_COUNT:',
  'src/compositions/profile/ProfileV1GeneratedAccents.tsx',
  'src/compositions/opening/DoorLight.tsx',
  'src/motion-kit/engines.tsx',
  'src/motion-kit/transitionWipeResolver.ts',
  'src/data/profileV1GeneratedAccentRegistry.ts',
  'productionReady: false',
  'BOUND_AT_INVALID',
  'REVIEWED_BEFORE_BINDING',
  'reviewedAtMs < boundAtMs',
])need(review,t,'review');
for(const t of [
  'profile-v1-production-bundle/v1',
  'FINAL_RENDER_BOUND_HANDOFF',
  'REFERENCE_TIMELINE_AND_FINAL_RENDER',
  "'scripts/profile-v1-production-preflight.mts'",
  'profileV1GeneratedAccentImplementations',
  'profileV1OptionalGeneratedSlots',
  'generatedAccents',
  "generatedAccentAuthority: 'PROFILE_V1_GENERATED_ACCENT_REGISTRY'",
  'timelineCsvSha256: timelineSha',
  'shaText(timelineCsv)',
  'generatedAccentRoutes:',
  "'generated_accent_routes'",
  'GENERATED_ACCENT_ROUTE_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
  'PALMIER_TIMELINE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
  "macActualState: 'NOT_RUN'",
  'productionReady: false',
])need(bundle,t,'bundle');
for(const t of [
  'profile-v1-davinci-finishing-evidence/v1',
  'MAC_DAVINCI_ACTUAL_EVIDENCE',
  'STALE_PROFILE_DAVINCI_BUNDLE',
  'STALE_PROFILE_DAVINCI_BUNDLE_PATH',
  'STALE_PROFILE_DAVINCI_SOURCE_PATH',
  'PROFILE_DAVINCI_EXPORT_FILE_MISSING',
  'PROFILE_DAVINCI_EXPORT_SHA_MISMATCH',
  'PROFILE_DAVINCI_BOUND_AT_INVALID',
  'PROFILE_DAVINCI_REVIEWED_BEFORE_BINDING',
  'reviewedAtMs<boundAtMs',
  "const exportPath=join(root,ev.export.path)",
  'sha(exportPath)!==ev.export.sha256',
  "profileV1GeneratedAccentImplementations",
  'generatedAccents:GeneratedAccentRoute[]',
  'generatedAccentAuthority:string',
  'generatedAccentRoutes:GeneratedAccentRoute[]',
  'expectedAccentRoutes=profileV1GeneratedAccentImplementations.map(accentSignature).sort()',
  'sameAccentRoutes',
  'PROFILE_DAVINCI_GENERATED_ACCENT_ROUTES_STALE',
  'PROFILE_DAVINCI_PALMIER_ACCENT_AUTHORITY_MISSING',
  'PROFILE_DAVINCI_DAVINCI_ACCENT_ROUTES_STALE',
  "const timelinePath = join(root, 'out/handoff/profile-v1/profile-v1-palmier-timeline.csv');",
  'timelineCsv:string;timelineCsvSha256:string',
  'PROFILE_DAVINCI_PALMIER_TIMELINE_PATH_MISMATCH',
  'PROFILE_DAVINCI_PALMIER_TIMELINE_MISSING',
  'PROFILE_DAVINCI_PALMIER_TIMELINE_SHA_MISMATCH',
  'productionReady:false',
])need(davinci,t,'davinci');
for(const t of [
  'profile-v1-final-delivery-approval/v1',
  'HUMAN_FINAL_DELIVERY_APPROVAL',
  "decision:'HOLD'",
  'productionReady:false',
  "a.decision!=='APPROVE'",
  'PROFILE_FINAL_PRODUCTION_READY_MISMATCH',
  'PROFILE_FINAL_APPROVAL_INVALID_JSON',
  'PROFILE_FINAL_APPROVAL_BUNDLE_PATH',
  'PROFILE_FINAL_APPROVAL_DAVINCI_EVIDENCE_PATH',
  'PROFILE_FINAL_BOUND_AT_INVALID',
  'PROFILE_FINAL_DECIDED_BEFORE_BINDING',
  'decidedAtMs<boundAtMs',
])need(approval,t,'approval');
for(const t of [
  'profile-v1-production-status/v1',
  'BUNDLE_GENERATED_ACCENT_ROUTES_STALE',
  'BUNDLE_DAVINCI_ACCENT_ROUTES_STALE',
  'BUNDLE_PALMIER_ACCENT_AUTHORITY_MISSING',
  'BUNDLE_PALMIER_TIMELINE_PATH_MISMATCH',
  'BUNDLE_PALMIER_TIMELINE_MISSING',
  'BUNDLE_PALMIER_TIMELINE_SHA_STALE',
  'FINAL_RENDER_REQUIRED',
  'DAVINCI_EVIDENCE_INIT_REQUIRED',
  'DAVINCI_ACTUAL_REQUIRED_OR_STALE',
  'FINAL_DELIVERY_APPROVAL_INIT_REQUIRED',
  'FINAL_DELIVERY_APPROVAL_REQUIRED_OR_STALE',
  'PRODUCTION_READY',
  "const productionReady=approval.state==='PASS'",
])need(status,t,'status');
if(bundle.includes("['assembly', 'scripts/profile-v1-assembly-preflight.mts'"))errors.push('bundle must use full production preflight rather than bypass generated-accent contracts');
if(review.includes('productionReady: true')||bundle.includes('productionReady: true')||davinci.includes('productionReady:true'))errors.push('upstream layers must not self-promote productionReady=true');
if(!review.includes('reviewedAtMs < boundAtMs'))errors.push('final render Human review must occur after its current evidence binding');
if(!review.includes('e.renderSourceFingerprintSha256 !== c.renderSourceFingerprintSha256'))errors.push('final render Human review must invalidate when the production render implementation fingerprint changes');
if(!review.includes('savedSources.get(source.path) !== source.sha256'))errors.push('final render Human review must compare each current render source by path and SHA');
if(!approval.includes("a.productionReady!==(a.decision==='APPROVE')"))errors.push('final approval must bind productionReady to explicit APPROVE');
if(!approval.includes('a.productionBundle.path!==rel(bundlePath)')||!approval.includes('a.davinciEvidence.path!==rel(davinciPath)'))errors.push('final approval must bind canonical bundle/evidence paths');
if(!approval.includes('decidedAtMs<boundAtMs'))errors.push('final approval must reject approval timestamps older than the current binding');
if(!davinci.includes('reviewedAtMs<boundAtMs'))errors.push('DaVinci Actual must reject Human review timestamps older than the evidence binding');
if(davinci.includes('timelineCsvSha256:string')&&!davinci.includes('sha(timelinePath)'))errors.push('DaVinci direct path must compare current Palmier timeline SHA before init/strict');
if(davinci.includes('generatedAccents:GeneratedAccentRoute[]')&&!davinci.includes('sameAccentRoutes(bundle.generatedAccents)'))errors.push('DaVinci direct path must compare bundle accent routes with canonical Motion Zukan registry');
if(davinci.includes('generatedAccentRoutes:GeneratedAccentRoute[]')&&!davinci.includes('sameAccentRoutes(bundle.davinci?.generatedAccentRoutes)'))errors.push('DaVinci direct path must compare DaVinci accent routes with canonical Motion Zukan registry');
if(!davinci.includes('existsSync(exportPath)')||!davinci.includes('sha(exportPath)!==ev.export.sha256'))errors.push('DaVinci Actual must verify the declared exported movie exists and matches its recorded SHA');
if(errors.length){console.error(`Profile V1 final handoff contracts FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('Profile V1 final handoff contracts OK: Human final-render review is SHA-bound to the final movie, current Profile composition, generated accents, DoorLight, motion engine/resolver and canonical runtime/plan sources; DaVinci evidence validates canonical Motion Zukan generated-accent routes, SHA-bound Palmier timeline, source render, exported movie bytes and a Human review made after evidence binding; only a current path/SHA-bound Human final approval made after binding can yield productionReady.');
