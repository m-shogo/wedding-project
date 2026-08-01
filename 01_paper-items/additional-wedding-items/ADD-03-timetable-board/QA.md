# ADD-03 当日タイムテーブルボード — QA

Status: `CURRENT / PRE-FIGMA_QA_CONTRACT`
Date: 2026-08-02

## Fact QA

- [ ] date is exactly `2026.10.24 SAT`
- [ ] location is exactly `YOKOHAMA`
- [ ] ceremony is exactly `14:10–14:40`
- [ ] reception is exactly `15:00–17:30`
- [ ] unconfirmed entries are `TBD` in working file
- [ ] no invented reception/opening/departure/after-party time is exported

## Structural QA

- [ ] one semantic frame
- [ ] all required text remains native and editable
- [ ] route nodes are native vectors
- [ ] no flattened timetable raster
- [ ] no missing or duplicated semantic node
- [ ] A2 and any A3 variant are separate controlled frames

## Readability QA

Review at:

1. whole-board thumbnail
2. 50% zoom
3. 100% actual-size print reference
4. simulated viewing distance of approximately 1.5–2 m

Pass conditions:

- Ceremony and Reception times are readable before decorative detail
- title does not compete with times
- transfer/TBD row cannot be mistaken for a confirmed event
- Japanese and English labels remain legible
- no essential text sits within provisional safe inset
- no hairline disappears at actual size

## Editorial QA

Reject when:

- layout reads as a web dashboard
- every event has an identical rounded card
- airport iconography is repeated mechanically
- dark navy overwhelms the board and reduces wedding warmth
- empty space is filled with meaningless stamps
- route line crosses time or label text
- visual metaphor implies false gate, terminal, flight or operational information

## Screenshot-driven correction protocol

1. capture full frame
2. identify at most three load-bearing defects
3. fix those defects only
4. capture post-fix frame
5. remove additions that create overlap or hierarchy noise

## Print gate

`PREPARED_FOR_FIGMA` is not `PRINT_READY`.

Before print:

- exact vendor dimensions and bleed
- final confirmed event information
- final font availability
- PDF font embedding/output review
- actual-size proof
- venue placement and viewing-distance check
