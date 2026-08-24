# StaRt Extended Opening Architecture

Status: `DESIGN CANDIDATE / NOT FINAL BGM / TIMECODES REQUIRE LICENSED AUDIO`

## Target ending

Use the musical structure as the authority rather than guessing a fixed duration from web data.

Target:

`Intro → first verse/pre-chorus/chorus → instrumental → second verse/pre-chorus/chorus → post-second-chorus instrumental → CUT BEFORE BRIDGE`

The chord/form references agree that the second chorus is followed by an instrumental and then a Bridge. That post-second-chorus instrumental is the preferred Wedding Opening landing zone.

Exact seconds must be measured from the actual licensed source audio in Palmier/DaVinci. Do not freeze an approximate web timestamp into production.

## Keep Short candidate

The current 60s Candidate A remains useful as:
- fast A/B preview
- venue fallback
- practice timeline
- comparison against the Extended version

It is no longer the assumed final duration.

## Extended story grammar

### Phase 1 — OPEN / TRAVEL START
- Real Hero photo immediately
- Okinawa / Seoul / Hawaii travel memory chapters
- minimal title cards
- photo readability first

### Phase 2 — FIRST CHORUS PEAK
- strongest couple photo
- restrained small push vs static
- micro accents answer fast notes without cutting every beat

### Phase 3 — FIRST INSTRUMENTAL / ANIME-OP SHIFT
- shift from normal wedding slideshow grammar into graphic opening grammar
- route lines / paper / split frames / typography / match cuts
- introduce more real short video/B-roll if available
- no generated people or animals

### Phase 4 — SECOND VERSE
- continue the journey rather than retelling biography
- daily-life / travel-action / preparations / moving shots
- alternate calm frames and energetic graphic phrases
- lyric-reactive motion can appear locally, but photos remain readable

### Phase 5 — SECOND CHORUS PEAK
- densest montage of the Opening
- strongest real couple footage/photo
- 3-hit / 4-hit graphic accents
- title hierarchy can become bolder
- avoid stacking flash + zoom + shake + blur simultaneously

### Phase 6 — POST-CHORUS INSTRUMENTAL LANDING
- reduce information density
- Hawaii → Yokohama / wedding-day arrival
- date / location / welcome message
- final frame should breathe before entrance
- stop before the Bridge begins

## Visual ratio target

The Extended version should not become a lyric video.

Target starting ratio for A/B:
- 60–70% real photos / real video
- 20–30% typography / graphic motion
- <=10% AI/generated abstract B-roll or transition support

People/dogs remain real-only.

## Lyrics strategy

Two different products:

1. `StaRt Type Motion Playground`
   - local learning/reference playground
   - may exercise every lyric phrase after rights/source text are cleared
   - purpose is to learn many typography and camera treatments

2. `Wedding Final`
   - selects only the treatments that improve the Opening
   - does not need to display every lyric
   - readability, real memories and Wedding story outrank demonstrating animation skill

## Copyright/source boundary

Repository source of truth stores:
- lyric slot id (`LYRIC_001`, etc.)
- timing
- phrase length class
- musical role
- motion preset id
- layout / camera / intensity metadata

Repository must not contain copied full third-party lyrics unless an explicitly authorized source/use decision exists.

Local-only option:
`motion-studio/local/lyrics.local.json`

This file should be gitignored and may be populated from a legitimate local source for timing/authoring.

## Completion gate

Extended final cannot be locked until:
1. actual permitted source audio is available locally
2. section markers are measured from that exact file
3. second chorus → instrumental → Bridge boundary is confirmed by waveform/listening
4. real-photo/video inventory is sufficient for the longer duration
5. Short vs Extended preview is A/B reviewed
6. venue/music/lyric-rights path is confirmed
