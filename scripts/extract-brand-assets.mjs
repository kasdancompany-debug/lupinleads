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

async function extractPng(filename, crop, trimThreshold = 0) {
  let pipeline = sharp(sheet).extract(crop);
  if (trimThreshold > 0) {
    pipeline = pipeline.trim({ threshold: trimThreshold });
  }
  await pipeline.png().toFile(path.join(brandDir, filename));
  return writeMeta(filename);
}

async function removeWhiteBg(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 235 && g > 235 && b > 235) {
      data[i + 3] = 0;
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function buildFavicons(markBuffer) {
  const trimmedMark = await removeWhiteBg(
    await sharp(markBuffer).trim({ threshold: 32 }).png().toBuffer()
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
  // Icon mark (center of stacked primary logo)
  await extractPng("lupin-mark.png", { left: 415, top: 62, width: 195, height: 108 }, 16);

  const markBuffer = await sharp(path.join(brandDir, "lupin-mark.png")).png().toBuffer();
  await buildFavicons(markBuffer);

  // Horizontal lockups — row labeled "Horizontal Lockup" on brand sheet
  await extractPng("lupin-lockup-light.png", { left: 42, top: 308, width: 345, height: 110 });
  await extractPng("lupin-lockup-nav-light.png", { left: 42, top: 318, width: 345, height: 66 });

  // Dark-mode horizontal lockup (bottom of brand sheet)
  await extractPng("lupin-lockup-dark.png", { left: 50, top: 524, width: 385, height: 82 });

  // Stacked primary logo
  await extractPng("lupin-logo-primary.png", { left: 310, top: 42, width: 410, height: 290 }, 18);

  const dims = {
    mark: await writeMeta("lupin-mark.png"),
    lockupDark: await writeMeta("lupin-lockup-dark.png"),
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
