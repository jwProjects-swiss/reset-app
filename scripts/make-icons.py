"""Erzeugt die App-Icons. Aufruf: python3 scripts/make-icons.py"""
from PIL import Image, ImageDraw, ImageFilter

BG = (13, 17, 32)

def icon(size, disc_ratio):
    s = size * 4
    img = Image.new("RGB", (s, s), BG)
    glow = Image.new("RGB", (s, s), BG)
    g = ImageDraw.Draw(glow)
    r = int(s * disc_ratio / 2)
    c = s // 2
    g.ellipse((c - int(r * 1.25), c - int(r * 1.25), c + int(r * 1.25), c + int(r * 1.25)), fill=(110, 80, 75))
    glow = glow.filter(ImageFilter.GaussianBlur(s * 0.07))
    img = Image.blend(img, glow, 0.9)
    # Scheibe mit weichem Verlauf von hell (oben links) nach warm (unten rechts)
    disc = Image.new("RGB", (s, s))
    px = disc.load()
    hx, hy = c - r * 0.32, c - r * 0.44
    stops = [(0.0, (255, 250, 243)), (0.42, (246, 220, 198)), (1.0, (234, 181, 148))]
    for y in range(c - r, c + r + 1):
        for x in range(c - r, c + r + 1):
            d = min(1.0, (((x - hx) ** 2 + (y - hy) ** 2) ** 0.5) / (r * 1.5))
            for (a, ca), (b, cb) in zip(stops, stops[1:]):
                if a <= d <= b:
                    t = (d - a) / (b - a)
                    px[x, y] = tuple(int(ca[i] + (cb[i] - ca[i]) * t) for i in range(3))
                    break
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).ellipse((c - r, c - r, c + r, c + r), fill=255)
    img.paste(disc, (0, 0), mask)
    return img.resize((size, size), Image.LANCZOS)

icon(192, 0.56).save("public/icon-192.png")
icon(512, 0.56).save("public/icon-512.png")
icon(512, 0.44).save("public/icon-maskable-512.png")
icon(180, 0.56).save("public/apple-touch-icon.png")
