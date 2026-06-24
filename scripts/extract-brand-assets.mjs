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

async function removeCornerBg(buffer, tolerance, feather = 10) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bg = sampleCornerBg(data, info);
  featherAlphaFromBg(data, bg, tolerance, feather);
  return sharp(data, { raw: info }).png().toBuffer();
}

async function saveTransparent(filename, crop, { trimThreshold = 0, tolerance = 34, feather = 10 } = {}) {
  let pipeline = sharp(sheet).extract(crop).png();
  if (trimThreshold > 0) {
    pipeline = pipeline.trim({ threshold: trimThreshold });
  }
  const raw = await pipeline.toBuffer();
  const transparent = await removeCornerBg(raw, tolerance, feather);
  await sharp(transparent).png().toFile(path.join(brandDir, filename));
  return writeMeta(filename);
}

async function buildFavicons(markBuffer) {
  const trimmedMark = await removeCornerBg(
    await sharp(markBuffer).trim({ threshold: 32 }).png().toBuffer(),
    18,
    8
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
    trimThreshold: 16,
    tolerance: 18,
    feather: 8,
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
