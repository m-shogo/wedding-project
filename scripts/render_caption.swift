// テロップPNG描画ツール (drawtext無しffmpeg対応)
// usage: render_caption --out out.png --font "Times New Roman" --size 52
//                       --ybase 0.83 --line "1行目" --line "2行目"
// 1920x1080の透過PNGに、白文字+薄い影で下中央テロップを描く。

import AppKit

let W = 1920
let H = 1080

var outPath = ""
var fontName = "Helvetica"
var fontSize: CGFloat = 52
var yBase: CGFloat = 0.83
var shadowStyle = "normal"
var lines: [String] = []

var args = Array(CommandLine.arguments.dropFirst())
while !args.isEmpty {
    let flag = args.removeFirst()
    guard !args.isEmpty else { break }
    let value = args.removeFirst()
    switch flag {
    case "--out": outPath = value
    case "--font": fontName = value
    case "--size": fontSize = CGFloat(Double(value) ?? 52)
    case "--ybase": yBase = CGFloat(Double(value) ?? 0.83)
    case "--shadow": shadowStyle = value  // normal / strong
    case "--line": lines.append(value)
    default: break
    }
}

guard !outPath.isEmpty, !lines.isEmpty else {
    FileHandle.standardError.write(Data("missing --out or --line\n".utf8))
    exit(1)
}

guard let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: W, pixelsHigh: H,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0
), let ctx = NSGraphicsContext(bitmapImageRep: rep) else {
    exit(1)
}

NSGraphicsContext.current = ctx

let font = NSFont(name: fontName, size: fontSize)
    ?? NSFont.systemFont(ofSize: fontSize, weight: .light)
// strong: 白背景（白い床・空など）でも読めるようにする
let shadow = NSShadow()
if shadowStyle == "strong" {
    shadow.shadowColor = NSColor.black.withAlphaComponent(0.8)
    shadow.shadowOffset = NSSize(width: 0, height: 0)
    shadow.shadowBlurRadius = 14
} else {
    shadow.shadowColor = NSColor.black.withAlphaComponent(0.35)
    shadow.shadowOffset = NSSize(width: 2, height: -2)
    shadow.shadowBlurRadius = 4
}

let attrs: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: NSColor.white,
    .shadow: shadow,
]

let spacing = fontSize * 1.45
for (i, line) in lines.enumerated() {
    let str = NSAttributedString(string: line, attributes: attrs)
    let size = str.size()
    let x = (CGFloat(W) - size.width) / 2
    let yTop = yBase * CGFloat(H) + CGFloat(i) * spacing
    let y = CGFloat(H) - yTop - size.height
    str.draw(at: NSPoint(x: x, y: y))
    if shadowStyle == "strong" {  // 重ね描きで影を濃くする
        str.draw(at: NSPoint(x: x, y: y))
    }
}

ctx.flushGraphics()
NSGraphicsContext.current = nil

guard let png = rep.representation(using: .png, properties: [:]) else {
    exit(1)
}
try png.write(to: URL(fileURLWithPath: outPath))
