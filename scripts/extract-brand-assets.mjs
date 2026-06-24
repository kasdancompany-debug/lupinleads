import sharp from "sharp";
import path from "path";
import { unlink } from "fs/promises";

const brandDir = path.join(process.cwd(), "public", "brand");
const sheet = path.join(brandDir, "lupin-brand-sheet.png");
const primary = path.join(brandDir, "lupin-logo-primary.png");

async function writeMeta(filename) {
  const meta = await sharp(path.join(brandDir, filename)).metadata();
  console.log(`Wrote ${filename} (${meta.width}×${meta.height})`);
}

async function main() {
  await sharp(sheet)
    .extract({ left: 50, top: 524, width: 385, height: 82 })
    .png()
    .toFile(path.join(brandDir, "lupin-lockup-dark.png"));
  await writeMeta("lupin-lockup-dark.png");

  await sharp(sheet)
    .extract({ left: 348, top: 108, width: 652, height: 168 })
    .png()
    .toFile(path.join(brandDir, "lupin-lockup-light.png"));
  await writeMeta("lupin-lockup-light.png");

  await sharp(path.join(brandDir, "lupin-logo-light.png"))
    .trim({ threshold: 12 })
    .png()
    .toFile(primary);
  await writeMeta("lupin-logo-primary.png");

  await sharp(primary)
    .extract({ left: 218, top: 0, width: 315, height: 310 })
    .trim({ threshold: 14 })
    .png()
    .toFile(path.join(brandDir, "lupin-mark.png"));
  await writeMeta("lupin-mark.png");

  // Squircle app icon from brand sheet (dark green tile + full-color mark)
  const iconOnlyBuffer = await sharp(sheet)
    .extract({ left: 125, top: 350, width: 78, height: 78 })
    .trim({ threshold: 12 })
    .png()
    .toBuffer();

  for (const size of [16, 32, 180, 512]) {
    const pad = Math.round(size * 0.14);
    const inner = size - pad * 2;
    const icon = await sharp(iconOnlyBuffer)
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
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

  // Next.js file-based icons (optional fallback alongside metadata.icons)
  await sharp(path.join(brandDir, "lupin-app-icon-180.png")).toFile(
    path.join(process.cwd(), "src", "app", "apple-icon.png")
  );
  await sharp(path.join(brandDir, "lupin-favicon-32.png")).toFile(
    path.join(process.cwd(), "src", "app", "icon.png")
  );
  console.log("Wrote src/app/apple-icon.png and src/app/icon.png");

  for (const f of ["_test-mark-sheet.png", "_test-mark-primary.png", "_test-mark2.png", "_test-mark3.png", "_test-mark4.png", "_test-app.png", "_test-app2.png", "_test-light.png", "_test-light2.png", "_test-light3.png", "_test-light4.png"]) {
    try {
      await unlink(path.join(brandDir, f));
    } catch {
      /* ignore */
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
