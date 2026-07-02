import sharp from "sharp";
import path from "path";
import { unlink } from "fs/promises";

const brandDir = path.join(process.cwd(), "public", "brand");
const sheet = path.join(brandDir, "lupin-brand-sheet.png");

async function writeMeta(filename) {
  const meta = await sharp(path.join(brandDir, filename)).metadata();
  console.log(`Wrote ${filename} (${meta.width}×${meta.height})`);
  return { width: meta.width ?? 0, height: meta.height ?? 0 };
}

function sampleCornerBg(data, info) {
  const w = info.width;
  const h = info.height;
  const indices = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + (w - 1)) * 4];
  let r = 0;
  let g = 0;
  let b = 0;
  for (const idx of indices) {
    r += data[idx];
    g += data[idx + 1];
    b += data[idx + 2];
  }
  return { r: Math.round(r / 4), g: Math.round(g / 4), b: Math.round(b / 4) };
}

function featherAlphaFromBg(data, bg, tolerance, feather = 10) {
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bg.r;
    const dg = data[i + 1] - bg.g;
    const db = data[i + 2] - bg.b;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist <= tolerance) {
      data[i + 3] = 0;
    } else if (dist < tolerance + feather) {
      const t = (dist - tolerance) / feather;
      data[i + 3] = Math.round(data[i + 3] * t);
    }
  }
}

function pixelLuminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function pixelSaturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

/** Undo white-matte premultiplication on semi-transparent edge pixels. */
function defringeFromWhite(data) {
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a <= 0 || a >= 255) continue;

    const alpha = a / 255;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - alpha)) / alpha)));
    data[i + 1] = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - alpha)) / alpha)));
    data[i + 2] = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - alpha)) / alpha)));
  }
}

/** Remove leftover light-gray / white halos after corner keying. */
function removeLightMatte(data, { grayLuma = 205, whiteLuma = 238, maxSat = 0.24 } = {}) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a === 0) continue;

    const lum = pixelLuminance(r, g, b);
    const sat = pixelSaturation(r, g, b);
    if (sat > maxSat) continue;

    if (lum >= whiteLuma) {
      data[i + 3] = 0;
      continue;
    }

    if (lum >= grayLuma) {
      const t = (lum - grayLuma) / (whiteLuma - grayLuma);
      data[i + 3] = Math.round(a * (1 - t));
    }
  }
}

function polishTransparentEdges(data, info) {
  const { width, height } = info;
  const copy = Buffer.from(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (copy[idx + 3] === 0) continue;

      let touchesTransparent = false;
      for (let dy = -1; dy <= 1 && !touchesTransparent; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            touchesTransparent = true;
            break;
          }
          const nIdx = (ny * width + nx) * 4;
          if (copy[nIdx + 3] === 0) {
            touchesTransparent = true;
            break;
          }
        }
      }

      if (!touchesTransparent) continue;

      const lum = pixelLuminance(copy[idx], copy[idx + 1], copy[idx + 2]);
      const sat = pixelSaturation(copy[idx], copy[idx + 1], copy[idx + 2]);
      if (lum >= 190 && sat <= 0.3) {
        data[idx + 3] = Math.round(copy[idx + 3] * Math.max(0, 1 - (lum - 190) / 55));
      }
    }
  }
}

async function removeCornerBg(buffer, tolerance, feather = 10, { matte = "auto" } = {}) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bg = sampleCornerBg(data, info);
  featherAlphaFromBg(data, bg, tolerance, feather);
  defringeFromWhite(data);

  const isLightBg = pixelLuminance(bg.r, bg.g, bg.b) >= 180;
  if (matte === "light" || (matte === "auto" && isLightBg)) {
    removeLightMatte(data);
    polishTransparentEdges(data, info);
  }

  return sharp(data, { raw: info }).png().toBuffer();
}

async function saveTransparent(
  filename,
  crop,
  { trimThreshold = 0, tolerance = 34, feather = 10, matte = "auto" } = {}
) {
  let pipeline = sharp(sheet).extract(crop).png();
  if (trimThreshold > 0) {
    pipeline = pipeline.trim({ threshold: trimThreshold });
  }
  const raw = await pipeline.toBuffer();
  const transparent = await removeCornerBg(raw, tolerance, feather, { matte });
  await sharp(transparent).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(path.join(brandDir, filename));
  return writeMeta(filename);
}

async function buildFavicons(markBuffer) {
  const trimmedMark = await removeCornerBg(
    await sharp(markBuffer).trim({ threshold: 32 }).png().toBuffer(),
    18,
    8,
    { matte: "light" }
  );

  for (const size of [16, 32, 180, 512]) {
    const pad = Math.round(size * 0.14);
    const inner = size - pad * 2;
    const icon = await sharp(trimmedMark)
      .resize(inner, inner, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();
    const radius = Math.round(size * 0.22);
    const bg = Buffer.from(
      `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${radius}" fill="#0a1410"/>
      </svg>`
    );
    const filename =
      size === 180
        ? "lupin-app-icon-180.png"
        : size === 512
          ? "lupin-app-icon-512.png"
          : `lupin-favicon-${size}.png`;
    await sharp(bg)
      .composite([{ input: icon, gravity: "center" }])
      .png()
      .toFile(path.join(brandDir, filename));
    await writeMeta(filename);
  }

  await sharp(path.join(brandDir, "lupin-app-icon-180.png")).toFile(
    path.join(process.cwd(), "src", "app", "apple-icon.png")
  );
  await sharp(path.join(brandDir, "lupin-favicon-32.png")).toFile(
    path.join(process.cwd(), "src", "app", "icon.png")
  );
  console.log("Wrote src/app/apple-icon.png and src/app/icon.png");
}

async function main() {
  await saveTransparent("lupin-mark.png", { left: 415, top: 62, width: 195, height: 108 }, {
    trimThreshold: 20,
    tolerance: 22,
    feather: 6,
    matte: "light",
  });

  const markBuffer = await sharp(path.join(brandDir, "lupin-mark.png")).png().toBuffer();
  await buildFavicons(markBuffer);

  await saveTransparent("lupin-lockup-light.png", { left: 42, top: 330, width: 345, height: 98 }, {
    tolerance: 20,
    feather: 8,
  });
  await saveTransparent("lupin-lockup-nav-light.png", { left: 42, top: 340, width: 345, height: 58 }, {
    tolerance: 20,
    feather: 8,
  });

  await saveTransparent("lupin-lockup-dark.png", { left: 50, top: 524, width: 385, height: 82 }, {
    tolerance: 34,
    feather: 12,
  });
  await saveTransparent("lupin-lockup-nav-dark.png", { left: 50, top: 524, width: 385, height: 36 }, {
    tolerance: 34,
    feather: 12,
  });

  await saveTransparent("lupin-logo-primary.png", { left: 310, top: 42, width: 410, height: 290 }, {
    trimThreshold: 18,
    tolerance: 20,
    feather: 8,
  });

  const dims = {
    mark: await writeMeta("lupin-mark.png"),
    lockupDark: await writeMeta("lupin-lockup-dark.png"),
    lockupNavDark: await writeMeta("lupin-lockup-nav-dark.png"),
    lockupLight: await writeMeta("lupin-lockup-light.png"),
    lockupNavLight: await writeMeta("lupin-lockup-nav-light.png"),
    logoPrimary: await writeMeta("lupin-logo-primary.png"),
  };
  console.log("Dimensions:", JSON.stringify(dims, null, 2));

  const probeFiles = await import("fs/promises").then((fs) =>
    fs.readdir(brandDir).then((files) => files.filter((f) => f.startsWith("_probe")))
  );
  for (const name of probeFiles) {
    try {
      await unlink(path.join(brandDir, name));
    } catch {
      /* ignore */
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
