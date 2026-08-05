import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3000/case-studies/ux4g";
const THEME = process.argv[3]; // "light" | "dark" | undefined

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  if (THEME) {
    await context.addInitScript((t) => window.localStorage.setItem("theme", t), THEME);
  }
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(300);

  const results = await page.evaluate(() => {
    function parseColor(str) {
      const m = str.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    }
    function compositeOver(fg, bg) {
      const a = fg.a;
      return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
    }
    function effectiveBackground(el) {
      const chain = [];
      let node = el;
      while (node) {
        chain.push(node);
        node = node.parentElement;
      }
      chain.reverse();
      let bg = { r: 255, g: 255, b: 255, a: 1 };
      for (const n of chain) {
        const cs = getComputedStyle(n);
        const c = parseColor(cs.backgroundColor);
        if (c && c.a > 0) bg = compositeOver(c, bg);
      }
      return bg;
    }
    function luminance(r, g, b) {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    function contrast(c1, c2) {
      const l1 = luminance(c1.r, c1.g, c1.b) + 0.05;
      const l2 = luminance(c2.r, c2.g, c2.b) + 0.05;
      return l1 > l2 ? l1 / l2 : l2 / l1;
    }

    const all = Array.from(document.querySelectorAll("body *"));
    const out = [];
    for (const el of all) {
      if (el.children.length > 0) continue;
      const text = el.textContent?.trim();
      if (!text) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const opacity = parseFloat(style.opacity);
      if (opacity < 0.4) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const fg = parseColor(style.color);
      if (!fg) continue;
      const bg = effectiveBackground(el.parentElement || el);
      const ratio = contrast(fg, bg);
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = parseInt(style.fontWeight) || 400;
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const threshold = isLarge ? 3.0 : 4.5;

      if (ratio < threshold) {
        out.push({
          text: text.slice(0, 70),
          tag: el.tagName.toLowerCase(),
          className: (el.className || "").toString().slice(0, 60),
          color: `rgb(${Math.round(fg.r)},${Math.round(fg.g)},${Math.round(fg.b)})`,
          bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
          ratio: Math.round(ratio * 100) / 100,
          threshold,
          fontSize,
          scrollY: Math.round(rect.top + window.scrollY),
        });
      }
    }
    const seen = new Set();
    return out
      .filter((o) => {
        const key = o.text + o.className;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => a.scrollY - b.scrollY);
  });

  console.log(`Found ${results.length} low-contrast text elements on ${URL} (forced theme=${THEME ?? "unset"}):\n`);
  for (const r of results) {
    console.log(`[y=${r.scrollY}] <${r.tag} class="${r.className}"> ratio=${r.ratio} (need ${r.threshold}) fg=${r.color} bg=${r.bg}`);
    console.log(`   "${r.text}"`);
  }

  await browser.close();
}
main();
