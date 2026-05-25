import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.evaluate(() => openModal('register'));
await page.waitForTimeout(700);
await page.screenshot({ path: "C:/Users/DANIEL JS/Desktop/screenshot_registro.png" });
await browser.close();
console.log("OK");
