"""Rebuild a clean, naturally lit studio cutout from the original headshot."""
from pathlib import Path
import ssl
import urllib.request

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

root = Path(__file__).resolve().parents[1]
original = root / "public" / "images" / "headshot.png"
out = root / "public" / "images" / "headshot-studio-cutout.png"
model_path = Path.home() / ".u2net" / "u2net.onnx"


def ensure_model() -> None:
    model_path.parent.mkdir(parents=True, exist_ok=True)
    if model_path.exists() and model_path.stat().st_size > 1_000_000:
        return
    url = "https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx"
    ctx = ssl._create_unverified_context()
    with urllib.request.urlopen(url, context=ctx, timeout=180) as resp:
        model_path.write_bytes(resp.read())


def main() -> None:
    ensure_model()
    from rembg import remove

    # Stay at native resolution — upscaling was softening the portrait
    src = Image.open(original).convert("RGBA")
    cut = remove(src)

    alpha = cut.split()[-1]
    # Tiny edge cleanup only
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.25))

    rgb = cut.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(1.30)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
    rgb = ImageEnhance.Color(rgb).enhance(0.97)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.28)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.1, percent=65, threshold=3))

    r, g, b = rgb.split()
    r = r.point(lambda x: int(x * 0.985))
    b = b.point(lambda x: min(255, int(x * 1.04)))
    rgb = Image.merge("RGB", (r, g, b))

    fill = Image.new("RGB", rgb.size, (252, 249, 244))
    rgb = Image.blend(rgb, fill, 0.05)

    result = rgb.convert("RGBA")
    result.putalpha(alpha)

    bbox = result.getbbox()
    if bbox:
        pad = 36
        left, top, right, bottom = bbox
        left = max(0, left - pad)
        top = max(0, top - pad)
        right = min(result.width, right + pad)
        bottom = min(result.height, bottom + pad)
        result = result.crop((left, top, right, bottom))

    result.save(out, "PNG", optimize=True)
    print("saved", out, result.size, "alpha", result.getchannel("A").getextrema())


if __name__ == "__main__":
    main()
