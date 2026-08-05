import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.join(__dirname, "..", "..", "responsive-screens", "scroll");

const args = process.argv.slice(2);
const pagePath = args[0] || "/";
const pageName = args[1] || "home";
const vp = { width: Number(args[2]) || 390, height: Number(args[3]) || 844 };
const scrollSteps = Number(args[4]) || 6;

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  const context = await browser.newContext({ viewport: vp });
  const page = await context.newPage();
  await page.goto(BASE_URL + pagePath, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const stepSize = Math.max(vp.height, Math.floor(scrollHeight / scrollSteps));

  for (let i = 0; i < scrollSteps; i++) {
    const y = i * stepSize;
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(300);
    const file = path.join(OUT_DIR, `${pageName}__${vp.width}x${vp.height}__step${i}.png`);
    await page.screenshot({ path: file });
    console.log("OK", file);
    if (y >= scrollHeight) break;
  }

  await browser.close();
}

main();
