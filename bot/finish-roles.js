// Crée les rôles manquants en respectant les limites de Discord (peut prendre longtemps),
// puis relance setup-api.js --reset pour appliquer salons, permissions, accueil et AutoMod.
import 'dotenv/config';
import { execFileSync } from 'node:child_process';
import { ROLES } from './config.js';
import { PermissionFlagsBits as P } from 'discord.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;
const API = 'https://discord.com/api/v10', G = `/guilds/${GUILD_ID}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(method, path, body) {
  for (;;) {
    const res = await fetch(API + path, { method, headers: { Authorization: `Bot ${DISCORD_TOKEN}`, ...(body && { 'Content-Type': 'application/json' }) }, body: body && JSON.stringify(body) });
    if (res.status === 429) { const w = ((await res.json()).retry_after ?? 1) * 1000 + 500; console.log(`  pause ${Math.round(w / 1000)} s`); await sleep(w); continue; }
    const data = res.status === 204 ? null : await res.json();
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${JSON.stringify(data)}`);
    return data;
  }
}
const existing = (await api('GET', `${G}/roles`)).map((r) => r.name);
const need = [];
for (const r of ROLES) { const i = existing.indexOf(r.name); if (i >= 0) existing.splice(i, 1); else need.push(r); }
need.sort((a, b) => (b.key === 'member') - (a.key === 'member'));
console.log(`${need.length} rôles à créer`);
for (const r of need) {
  await api('POST', `${G}/roles`, { name: r.name, color: r.sep ? 0 : r.color, hoist: !!r.hoist, mentionable: !!r.mention,
    permissions: (r.perms ?? []).reduce((a, n) => a | P[n], 0n).toString() });
  console.log(`  rôle créé : ${r.name} (${new Date().toLocaleTimeString('fr-FR')})`);
}
console.log('Tous les rôles existent, finalisation du serveur…');
execFileSync('node', ['setup-api.js', '--reset'], { stdio: 'inherit' });
