import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.join(__dirname, "..", "..", "responsive-screens");

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1440, height: 900 },
  bigmonitor: { width: 1920, height: 1080 },
};

const PAGES = [
  { name: "home", path: "/" },
  { name: "case-studies", path: "/case-studies" },
  { name: "case-study-pocket-pms", path: "/case-studies/pocket-pms" },
  { name: "case-study-axiesroom", path: "/case-studies/axiesroom" },
  { name: "case-study-generic", path: "/case-studies/hotelogix-frontdesk" },
  { name: "contact", path: "/contact" },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport: vp });
    const page = await context.newPage();
    for (const p of PAGES) {
      try {
        await page.goto(BASE_URL + p.path, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(500);
        const file = path.join(OUT_DIR, `${p.name}__${vpName}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log("OK", file);
      } catch (err) {
        console.log("FAIL", vpName, p.path, err.message);
      }
    }
    await context.close();
  }

  await browser.close();
}

main();
