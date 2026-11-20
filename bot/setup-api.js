// Configure le serveur via l'API HTTP de Discord (pas besoin que le bot tourne).
// Usage : DISCORD_TOKEN=... GUILD_ID=... node setup-api.js   (sur un serveur NEUF)
import 'dotenv/config';
import { PermissionFlagsBits as P } from 'discord.js';
import { SERVER_NAME, ROLES, CATEGORIES, RULES, BANNED_WORDS } from './config.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;
const API = 'https://discord.com/api/v10';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(method, path, body) {
  for (;;) {
    const res = await fetch(API + path, {
      method, headers: { Authorization: `Bot ${DISCORD_TOKEN}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) { await sleep(((await res.json()).retry_after ?? 1) * 1000 + 100); continue; }
    const data = res.status === 204 ? null : await res.json();
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${JSON.stringify(data)}`);
    return data;
  }
}
const bits = (...names) => names.reduce((a, n) => a | P[n], 0n).toString();
const G = `/guilds/${GUILD_ID}`;

// --reset : efface TOUS les salons, rôles et règles AutoMod avant de reconstruire
const RESET = process.argv.includes('--reset');
const existing = await api('GET', `${G}/channels`);
if (existing.length > 6 && !RESET) throw new Error(`Le serveur a déjà ${existing.length} salons. Relance avec --reset pour tout effacer et reconstruire.`);
const guild = await api('GET', G);
console.log(`Configuration de ${guild.name}…`);
await api('PATCH', G, { name: SERVER_NAME, afk_channel_id: null, system_channel_id: null });
for (const c of existing) await api('DELETE', `/channels/${c.id}`);
if (RESET) {
  for (const r of await api('GET', `${G}/roles`)) if (!r.managed && r.id !== GUILD_ID) await api('DELETE', `${G}/roles/${r.id}`);
  for (const r of await api('GET', `${G}/auto-moderation/rules`)) await api('DELETE', `${G}/auto-moderation/rules/${r.id}`);
  console.log('  ancien contenu effacé');
}

// Rôles : créés du bas vers le haut de la liste
const roles = {};
for (const r of [...ROLES].reverse()) {
  roles[r.key] = await api('POST', `${G}/roles`, {
    name: r.name, color: r.color, hoist: r.hoist, mentionable: false, permissions: bits(...r.perms),
  });
  console.log(`  rôle ${r.name}`);
}
const staff = ['owner', 'cofond', 'admin', 'modo', 'helper'].map((k) => roles[k]);
const role = (r, allow, deny) => ({ id: r.id, type: 0, ...(allow && { allow: bits(...allow) }), ...(deny && { deny: bits(...deny) }) });
const everyone = { id: GUILD_ID };
const overwrites = (access) => ({
  readonly: [role(everyone, ['ViewChannel'], ['SendMessages', 'CreatePublicThreads', 'CreatePrivateThreads']), ...staff.map((r) => role(r, ['SendMessages']))],
  team:     [role(everyone, null, ['ViewChannel']), ...[roles.team, ...staff].map((r) => role(r, ['ViewChannel']))],
  staff:    [role(everyone, null, ['ViewChannel']), ...staff.map((r) => role(r, ['ViewChannel']))],
  locked:   [role(everyone, null, ['Connect']), ...[roles.team, roles.vip, ...staff].map((r) => role(r, ['Connect']))],
}[access] ?? []);

const channels = {};
for (const cat of CATEGORIES) {
  const category = await api('POST', `${G}/channels`, { name: cat.name, type: 4, permission_overwrites: overwrites(cat.access) });
  for (const [idx, ch] of cat.channels.entries()) {
    const voice = ch.type === 'voice';
    const branch = idx === 0 ? '╭' : idx === cat.channels.length - 1 ? '╰' : '│';
    const c = await api('POST', `${G}/channels`, {
      name: branch + ch.name, ...(ch.topic && { topic: ch.topic }), type: voice ? 2 : 0, parent_id: category.id,
      permission_overwrites: ch.access ? [...overwrites(cat.access), ...overwrites(ch.access)] : overwrites(cat.access),
      ...(voice ? {} : { rate_limit_per_user: cat.access || ch.access ? 0 : 2 }),
    });
    if (ch.key) channels[ch.key] = c;
    console.log(`  salon ${branch}${ch.name}`);
  }
}
await api('PATCH', G, { afk_channel_id: channels.afk.id, afk_timeout: 900, system_channel_id: channels.general.id })
  .catch((e) => console.warn('  réglages ignorés :', e.message));

// Messages
const send = (ch, embed) => api('POST', `/channels/${ch.id}/messages`, { embeds: [embed] });
const ch = (k) => `<#${channels[k].id}>`;
const r = (k) => `<@&${roles[k].id}>`;
await send(channels.rules, { title: '『📜』・Règlement', description: RULES, color: 0xe74c3c });
await send(channels.welcome, { title: `Bienvenue sur ${SERVER_NAME} !`, color: 0xff6b9d, description:
  `Un serveur **chill** entre potes, gaming et **GTA 6** 🌴\n\n` +
  `『📜』・Lis le ${ch('rules')}\n『🎭』・Choisis tes rôles dans ${ch('roles')}\n『💬』・Viens parler dans ${ch('general')}\n\nBon séjour ! 🌙` });
await send(channels.roles, { title: '『🎭』・Les rôles', color: 0x5865f2, description:
  `**『🛡️』・Staff**\n${r('owner')} ・ ${r('cofond')} ・ ${r('admin')} ・ ${r('modo')} ・ ${r('helper')}\n\n` +
  `**『⭐』・Communauté**\n${r('team')} — membres de la team (accès à l'espace Team)\n${r('vip')} — amis proches et boosters\n` +
  `${r('actif')} — les plus actifs du serveur\n${r('member')} — tout le monde\n\n` +
  `**『🎮』・À prendre toi-même** (commande \`/role\` dans ${ch('general')})\n` +
  `${r('gta6')} ・ ${r('gtav')} ・ ${r('gamer')} ・ ${r('notif')} ・ ${r('event')}` });
await send(channels.annonces, { title: '『🎉』・Ouverture !', description: `${SERVER_NAME} est ouvert. Invite tes potes ! 🌙`, color: 0x2ecc71 });

// AutoMod
const exempt_roles = staff.map((x) => x.id);
const block = (custom_message) => ({ type: 1, metadata: { custom_message } });
const alert = { type: 2, metadata: { channel_id: channels.logs.id } };
for (const rule of [
  { name: 'Mots interdits', trigger_type: 1, trigger_metadata: { keyword_filter: BANNED_WORDS }, actions: [block('Message bloqué : langage ou lien interdit.'), alert] },
  { name: 'Insultes / contenu sexuel', trigger_type: 4, trigger_metadata: { presets: [1, 2, 3] }, actions: [block('Message bloqué par la modération.'), alert] },
  { name: 'Spam', trigger_type: 3, actions: [block('Message bloqué : spam détecté.'), alert] },
  { name: 'Spam de mentions', trigger_type: 5, trigger_metadata: { mention_total_limit: 5, mention_raid_protection_enabled: true },
    actions: [block('Trop de mentions !'), alert, { type: 3, metadata: { duration_seconds: 600 } }] },
]) {
  await api('POST', `${G}/auto-moderation/rules`, { ...rule, event_type: 1, enabled: true, exempt_roles })
    .then(() => console.log(`  AutoMod : ${rule.name}`))
    .catch((e) => console.warn(`  AutoMod « ${rule.name} » ignoré : ${e.message}`));
}

// Rôle du bot tout en haut + Fondateur pour le propriétaire
const all = await api('GET', `${G}/roles`);
const me = await api('GET', '/users/@me');
const botRole = all.find((x) => x.tags?.bot_id === me.id);
// Ordre : bot tout en haut, puis les rôles dans l'ordre de config.js (Fondateur en premier)
const order = [...(botRole ? [botRole.id] : []), ...ROLES.map((x) => roles[x.key].id)];
await api('PATCH', `${G}/roles`, order.map((id, i) => ({ id, position: order.length - i })));
await api('PUT', `${G}/members/${guild.owner_id}/roles/${roles.owner.id}`);
await api('PUT', `${G}/members/${guild.owner_id}/roles/${roles.member.id}`);
console.log('\n✅ Serveur configuré !');
