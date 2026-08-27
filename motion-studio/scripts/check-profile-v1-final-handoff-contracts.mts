import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd();
const review=readFileSync(join(root,'scripts/profile-v1-final-render-review.mts'),'utf8');
const bundle=readFileSync(join(root,'scripts/export-profile-v1-production-bundle.mts'),'utf8');
const davinci=readFileSync(join(root,'scripts/profile-v1-davinci-finishing-evidence.mts'),'utf8');
const approval=readFileSync(join(root,'scripts/profile-v1-final-delivery-approval.mts'),'utf8');
const status=readFileSync(join(root,'scripts/profile-v1-production-status.mts'),'utf8');
const errors:string[]=[];const need=(s:string,t:string,w:string)=>{if(!s.includes(t))errors.push(`${w} missing ${t}`)};
for(const t of ['HUMAN_FINAL_RENDER_REVIEW','profile-v1-final-render-review/v1','STALE_FINAL_RENDER','productionReady: false'])need(review,t,'review');
for(const t of ['profile-v1-production-bundle/v1','FINAL_RENDER_BOUND_HANDOFF','REFERENCE_TIMELINE_AND_FINAL_RENDER',"macActualState: 'NOT_RUN'",'productionReady: false'])need(bundle,t,'bundle');
for(const t of ['profile-v1-davinci-finishing-evidence/v1','MAC_DAVINCI_ACTUAL_EVIDENCE','STALE_PROFILE_DAVINCI_BUNDLE','productionReady:false'])need(davinci,t,'davinci');
for(const t of ['profile-v1-final-delivery-approval/v1','HUMAN_FINAL_DELIVERY_APPROVAL',"decision:'HOLD'",'productionReady:false',"a.decision!=='APPROVE'",'PROFILE_FINAL_PRODUCTION_READY_MISMATCH'])need(approval,t,'approval');
for(const t of ['profile-v1-production-status/v1','FINAL_RENDER_REQUIRED','DAVINCI_EVIDENCE_INIT_REQUIRED','DAVINCI_ACTUAL_REQUIRED_OR_STALE','FINAL_DELIVERY_APPROVAL_INIT_REQUIRED','FINAL_DELIVERY_APPROVAL_REQUIRED_OR_STALE','PRODUCTION_READY',"const productionReady=approval.state==='PASS'"])need(status,t,'status');
if(review.includes('productionReady: true')||bundle.includes('productionReady: true')||davinci.includes('productionReady:true'))errors.push('upstream layers must not self-promote productionReady=true');
if(!approval.includes("a.productionReady!==(a.decision==='APPROVE')"))errors.push('final approval must bind productionReady to explicit APPROVE');
if(errors.length){console.error(`Profile V1 final handoff contracts FAILED (${errors.length})`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('Profile V1 final handoff contracts OK: only current SHA-bound explicit Human final approval can yield productionReady; upstream/Mac layers remain non-promoting.');
