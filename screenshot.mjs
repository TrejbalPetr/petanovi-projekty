import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BROWSER_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

function findBrowser() {
  for (const p of BROWSER_PATHS) {
    if (existsSync(p)) return p;
  }
  throw new Error("No browser found. Install Chrome or Edge.");
}

function nextScreenshotPath(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const existing = readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
  const n = existing.length + 1;
  return join(dir, `screenshot-${n}.png`);
}

const url = process.argv[2] || "http://localhost:3000";
const screenshotDir = join(__dirname, "temporary screenshots");

const browser = await puppeteer.launch({
  executablePath: findBrowser(),
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

console.log(`Navigating to ${url}...`);
await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1000));

const outPath = nextScreenshotPath(screenshotDir);
await page.screenshot({ path: outPath, fullPage: true });
console.log(`Screenshot saved: ${outPath}`);

await browser.close();
