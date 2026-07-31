from PIL import Image, ImageDraw, ImageFont, ImageOps
from pathlib import Path
import math, random, json, zipfile, hashlib, shutil

BASE=Path(__file__).resolve().parent.parent / "generated-dummy"
if BASE.exists():
    shutil.rmtree(BASE)
BASE.mkdir(parents=True)

FONT_REG="/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"
FONT_BOLD="/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
def F(s,b=False): return ImageFont.truetype(FONT_BOLD if b else FONT_REG,s)

def gradient(size, top, bottom):
    w,h=size
    strip=Image.new("RGB",(1,h))
    px=strip.load()
    for y in range(h):
        t=y/max(1,h-1)
        px[0,y]=tuple(int(top[i]*(1-t)+bottom[i]*t) for i in range(3))
    return strip.resize((w,h))

def scenic(size, seed, label, people=False, group=False):
    random.seed(seed)
    w,h=size
    im=gradient(size,(174,216,230),(255,244,219))
    d=ImageDraw.Draw(im)
    d.ellipse((int(w*.08),int(h*.08),int(w*.20),int(h*.08+w*.12)),fill=(246,213,91))
    for cx,cy,rw,rh in [(0.65,0.13,0.10,0.04),(0.80,0.20,0.13,0.05)]:
        x=int(w*cx); y=int(h*cy); rx=int(w*rw); ry=int(h*rh)
        d.ellipse((x-rx,y-ry,x+rx,y+ry),fill="white")
    hy=int(h*.62)
    d.rectangle((0,hy,w,h),fill=(173,222,207))
    d.polygon([(0,hy+int(h*.08)),(int(w*.25),hy-int(h*.06)),(int(w*.48),hy+int(h*.03)),(int(w*.72),hy-int(h*.05)),(w,hy+int(h*.08)),(w,h),(0,h)],fill=(108,171,200))
    d.rectangle((0,int(h*.82),w,h),fill=(246,224,174))
    for x in [int(w*.12),int(w*.86)]:
        d.line((x,int(h*.45),x+int(w*.02),int(h*.80)),fill=(106,90,63),width=max(3,w//160))
        for ang in [-70,-35,0,35,70]:
            ln=int(w*.11)
            ex=x+int(math.cos(math.radians(ang))*ln)
            ey=int(h*.44)+int(math.sin(math.radians(ang))*ln*.6)
            d.line((x,int(h*.44),ex,ey),fill=(109,177,151),width=max(3,w//130))
    if people:
        centers=[(0.45,0.58),(0.56,0.58)] if not group else [(0.39,0.60),(0.50,0.57),(0.61,0.60)]
        for i,(cx,cy) in enumerate(centers):
            x=int(w*cx); y=int(h*cy); head=max(8,int(min(w,h)*.04))
            color=[(83,73,77),(75,93,101),(90,78,67)][i%3]
            d.ellipse((x-head,y-head*2,x+head,y),fill=color)
            d.rounded_rectangle((x-head,y,x+head,y+head*4),radius=head//2,fill=color)
    ph=max(74,int(h*.12))
    d.rounded_rectangle((int(w*.05),h-ph-int(h*.04),int(w*.95),h-int(h*.04)),radius=20,fill=(255,255,255))
    d.text((w//2,h-ph//2-int(h*.04)),label,font=F(max(18,w//30),True),fill=(70,61,58),anchor="mm")
    d.text((w//2,h-ph//2+max(25,w//32)-int(h*.04)),"DUMMY / REPLACE LATER",font=F(max(11,w//55)),fill=(130,118,112),anchor="mm")
    return im

SPECS=[
("cover_hero_dummy.jpg",(960,1200),101,"COVER HERO",True,False),
("profile_a_dummy.jpg",(800,1000),102,"PROFILE A",True,False),
("profile_b_dummy.jpg",(800,1000),103,"PROFILE B",True,False),
("history_memory_dummy.jpg",(1200,800),104,"HISTORY MEMORY",True,False),
("memory_spot_01_dummy.jpg",(1200,800),105,"MEMORY SPOT 01",False,False),
("memory_spot_02_dummy.jpg",(900,900),106,"MEMORY SPOT 02",False,False),
("memory_spot_03_dummy.jpg",(1200,800),107,"MEMORY SPOT 03",False,False),
("memory_spot_04_dummy.jpg",(900,900),108,"MEMORY SPOT 04",False,False),
("back_memory_dummy.jpg",(1200,800),109,"BACK MEMORY",True,False),
("friends_01_dummy.jpg",(1200,800),110,"FRIENDS 01",True,True),
("friends_02_dummy.jpg",(1200,800),111,"FRIENDS 02",True,True),
("friends_03_dummy.jpg",(1200,800),112,"FRIENDS 03",True,True),
]

manifest={"status":"DUMMY_ONLY_REPLACE_LATER","photos":[],"backgrounds":[]}
for name,size,seed,label,people,group in SPECS:
    p=BASE/name
    scenic(size,seed,label,people,group).save(p,quality=90,optimize=True)
    manifest["photos"].append({"file":name,"size":list(size),"role":label,"dummy":True,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()})

for name,variant in [("background_travel_sky_dummy.jpg","sky"),("background_paper_texture_dummy.jpg","paper")]:
    size=(1600,1100); w,h=size
    if variant=="sky":
        im=gradient(size,(184,221,234),(255,248,226)); d=ImageDraw.Draw(im); random.seed(201)
        for _ in range(16):
            x=random.randint(-80,w); y=random.randint(0,int(h*.55)); rx=random.randint(60,160); ry=random.randint(20,50)
            d.ellipse((x-rx,y-ry,x+rx,y+ry),fill=(255,255,255))
    else:
        im=Image.new("RGB",size,(255,249,234)); d=ImageDraw.Draw(im); random.seed(202)
        for _ in range(500):
            x=random.randrange(w); y=random.randrange(h); r=random.choice([1,1,2,3])
            c=random.choice([(234,221,195),(249,233,238),(221,238,232),(224,234,242)])
            d.ellipse((x-r,y-r,x+r,y+r),fill=c)
    d.text((w-25,h-25),"DUMMY BG",font=F(30,True),fill=(160,145,138),anchor="rs")
    p=BASE/name; im.save(p,quality=90,optimize=True)
    manifest["backgrounds"].append({"file":name,"size":list(size),"dummy":True,"variant":variant,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()})

(BASE/"DUMMY-PACK-MANIFEST.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
print(BASE)
