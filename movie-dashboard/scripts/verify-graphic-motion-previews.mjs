import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const width = 1280; const height = 720; const errors = [];
const library = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const evidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");
const previews = [
  ["accent-speed-lines","16c3ec032c06e43abe1ce1185f1572f44e6809c629db818a3d1cd1eda055fb3c","26595d7c7bfc19c065198196744dc0f3a24c1c08cbac99c3ad68d52ab9f4a3e2"],
  ["accent-stamp-triplet","7082e229b167b21e8588b4e36fbc1a5c7f906f96730833bec0be65864e179757","057859c5cbb523dc1533d6ecae41d7fbd1ef3c7129a1ff0b43c3eb5f097e0b02"],
  ["accent-halftone-burst","1afce28484ebf9103ebaa557f235ab3eee24a39952b447dbdccc45aae58dcd63","4495263a3a737aa2c90e6ea34f5aec40f919023b8711b5d4ca27a3b45638ea05"],
  ["accent-scribble-underline","3b8e04058b241d741b3341652111cf641189a5c60ccff32772ebb02778fca22b","f51786409d87885867f0e64edca55a86a0ced027a8f85ec6b18e704c7a6d5b44"],
  ["accent-impact-frame","174a38a46b6d4989e40099a220e804e39b00871d1266aed98e3a4254d4d5bbf2","e59071aaeedd26819e88d564a91e30ca309704c21ebf4b4f644e6b9aec405e9a"],
  ["accent-cel-shadow-sweep","6a0b78c57270da086a4432653197f9ef2c8b29a1be7394a3089cfa657bb05fe2","04e55c2bc49cd5b1e115a24067a8403cae0943f6250ae29b19a71e14b9974516"],
  ["accent-micro-rgb-split","c3ec8c494ef0704704f62bb79a5ac9205ab0eee7eb416add5f70316feff3db61","f208e0aaa6a1e4b0e09b9f42977803ce396f8b555ca415d5ee5de5ca5ae538a4"],
].map(([id,hash,posterHash])=>({id,hash,posterHash}));
for (const preview of previews) {
  if (!library.includes(`"${preview.id}": "/motion-previews/${preview.id}/repo-v1"`)) errors.push(`${preview.id}: library wiring missing`);
  if (!evidence.includes(`"${preview.id}", "${preview.hash}"`)) errors.push(`${preview.id}: evidence spec missing`);
}
const frames=[0,3,4,6,7,8,9,10,11,12,14,16,18,20,24,30];
const sha=(file)=>crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const decode=(video,frame)=>{const r=spawnSync("ffmpeg",["-v","error","-i",video,"-vf",`select=eq(n\\,${frame})`,"-frames:v","1","-f","rawvideo","-pix_fmt","rgb24","-"],{encoding:null,maxBuffer:width*height*4});if(r.status!==0||r.stdout.length!==width*height*3)throw new Error(`${video}:${frame} decode failed`);return r.stdout;};
function stats(buffer){let gold=0,white=0,mean=0,minX=width,maxX=-1,samples=0;for(let y=0;y<620;y+=2){for(let x=0;x<width;x+=2){const o=(y*width+x)*3,r=buffer[o],g=buffer[o+1],b=buffer[o+2];const isGold=r>175&&g>135&&b<170&&r>b+45;const isWhite=r>170&&g>170&&b>170&&Math.max(r,g,b)-Math.min(r,g,b)<22;if(isGold){gold++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);}if(isWhite)white++;mean+=(r+g+b)/3;samples++;}}return{gold,white,mean:mean/samples,goldCenterX:gold?(minX+maxX)/2:null};}
function difference(a,b){let energy=0,samples=0;for(let y=0;y<620;y+=2){for(let x=0;x<width;x+=2){const o=(y*width+x)*3;energy+=(Math.abs(a[o]-b[o])+Math.abs(a[o+1]-b[o+1])+Math.abs(a[o+2]-b[o+2]))/3;samples++;}}return energy/samples;}
for(const p of previews){const video=path.join(root,`public/motion-previews/${p.id}/repo-v1.mp4`),poster=path.join(root,`public/motion-previews/${p.id}/repo-v1-poster.png`);if(!fs.existsSync(video)||!fs.existsSync(poster)){errors.push(`${p.id}: missing`);continue;}if(sha(video)!==p.hash||sha(poster)!==p.posterHash)errors.push(`${p.id}: hash mismatch`);const probe=spawnSync("ffprobe",["-v","error","-count_frames","-select_streams","v:0","-show_entries","stream=width,height,r_frame_rate,nb_read_frames","-of","json",video],{encoding:"utf8"});const stream=probe.status===0?JSON.parse(probe.stdout)?.streams?.[0]:null;if(stream?.width!==1280||stream?.height!==720||stream?.r_frame_rate!=="30/1"||Number(stream?.nb_read_frames)!==120)errors.push(`${p.id}: render contract mismatch`);const decoded=new Map(frames.map(f=>[f,decode(video,f)]));p.stats=Object.fromEntries(frames.map(f=>[f,{...stats(decoded.get(f)),differenceFrom0:difference(decoded.get(f),decoded.get(0))}]));}
const s=(id,f)=>previews.find(p=>p.id===id)?.stats?.[f];
if(!(s("accent-speed-lines",12).differenceFrom0>0.5&&Math.abs(s("accent-speed-lines",12).differenceFrom0-s("accent-speed-lines",30).differenceFrom0)<0.1))errors.push("speed-lines must translate then hold");
if(!(s("accent-stamp-triplet",8).goldCenterX<s("accent-stamp-triplet",16).goldCenterX&&s("accent-stamp-triplet",16).goldCenterX<s("accent-stamp-triplet",24).goldCenterX))errors.push("stamp-triplet must hit three ordered positions");
if(!(s("accent-halftone-burst",4).white<s("accent-halftone-burst",8).white&&s("accent-halftone-burst",8).white<s("accent-halftone-burst",12).white))errors.push("halftone must expand progressively");
if(!(s("accent-scribble-underline",11).gold<s("accent-scribble-underline",18).gold&&s("accent-scribble-underline",24).white>s("accent-scribble-underline",18).white))errors.push("scribble must draw gold then white strokes");
if(!(s("accent-impact-frame",8).mean>s("accent-impact-frame",0).mean+120&&Math.abs(s("accent-impact-frame",14).mean-s("accent-impact-frame",0).mean)<2))errors.push("impact must peak and clear");
if(!(s("accent-cel-shadow-sweep",10).mean<s("accent-cel-shadow-sweep",0).mean-15&&Math.abs(s("accent-cel-shadow-sweep",24).mean-s("accent-cel-shadow-sweep",0).mean)<2))errors.push("cel-shadow must sweep dark then clear");
if(!(s("accent-micro-rgb-split",6).mean>s("accent-micro-rgb-split",3).mean+60&&Math.abs(s("accent-micro-rgb-split",9).mean-s("accent-micro-rgb-split",3).mean)<2))errors.push("rgb-split must activate briefly then clear");
if(errors.length){console.error(`Graphic motion preview oracle FAILED (${errors.length})`);errors.forEach(e=>console.error(`- ${e}`));console.error(JSON.stringify(Object.fromEntries(previews.map(p=>[p.id,p.stats]))));process.exit(1);}console.log(`Graphic motion preview oracle OK: ${JSON.stringify(Object.fromEntries(previews.map(p=>[p.id,p.stats])))}`);
