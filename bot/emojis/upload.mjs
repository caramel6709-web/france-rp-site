import fs from 'fs';
const G = '/guilds/1573440791924318328', A = 'https://discord.com/api/v10';
const api = async (m, p, b) => { for (;;) { const r = await fetch(A + p, { method: m, headers: { Authorization: 'Bot proxy-injected', 'Content-Type': 'application/json' }, body: b && JSON.stringify(b) });
  if (r.status === 429) { const w = ((await r.json()).retry_after ?? 2) * 1000 + 200; await new Promise((z) => setTimeout(z, w)); continue; } const d = r.status === 204 ? null : await r.json(); if (!r.ok) throw new Error(JSON.stringify(d)); return d; } };
const uri = (f) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
await api('PATCH', G, { icon: uri('icon.png') }); console.log('icône OK');
const have = new Set((await api('GET', `${G}/emojis`)).map((e) => e.name));
for (const f of fs.readdirSync('png')) {
  const name = f.replace('.png', '');
  if (have.has(name)) continue;
  const e = await api('POST', `${G}/emojis`, { name, image: uri(`png/${f}`) }).catch((err) => console.log(name, err.message));
  if (e) console.log(`<:${e.name}:${e.id}>`);
}
