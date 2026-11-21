import { createRequire } from 'module'; const { chromium } = createRequire(import.meta.url)('playwright');
import { EMOJIS } from './emojis.mjs';
import fs from 'fs';
fs.mkdirSync('png', { recursive: true });
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 128, height: 128 } });
for (const [name, body] of Object.entries(EMOJIS)) {
  await p.setContent(`<html><body style="margin:0;background:transparent"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">${body}</svg></body></html>`);
  await p.screenshot({ path: `png/${name}.png`, omitBackground: true });
}
// planche de contrôle
const names = Object.keys(EMOJIS);
await p.setViewportSize({ width: 8 * 140, height: Math.ceil(names.length / 8) * 160 });
await p.setContent(`<body style="margin:0;background:#313338;display:flex;flex-wrap:wrap">${names.map((n) => `<div style="width:140px;height:160px;text-align:center;color:#ddd;font:13px sans-serif"><img src="data:image/png;base64,${fs.readFileSync(`png/${n}.png`).toString('base64')}" style="margin:6px"><br>${n}</div>`).join('')}</body>`);
await p.screenshot({ path: 'sheet.png' });
// icône du serveur 512px
await p.setViewportSize({ width: 512, height: 512 });
await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="4 4 120 120">${EMOJIS.sunsetclub}</svg></body>`);
await p.screenshot({ path: 'icon.png', omitBackground: true });
await b.close(); console.log(names.length, 'emojis');
