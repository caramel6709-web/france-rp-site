// Variante de setup.js qui n'utilise que l'API HTTP de Discord (pas de connexion gateway).
// Usage : DISCORD_TOKEN=... GUILD_ID=... node setup-api.js
import 'dotenv/config';
import { PermissionFlagsBits as P } from 'discord.js';
import { SERVER_NAME, ROLES, CATEGORIES, RULES, BANNED_WORDS } from './config.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;
const API = 'https://discord.com/api/v10';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, path, body) {
  for (;;) {
    const res = await fetch(API + path, {
      method,
      headers: { Authorization: `Bot ${DISCORD_TOKEN}`, 'Content-Type': 'application/json' },
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
const guild = await api('GET', G);
console.log(`Configuration de ${guild.name}…`);
await api('PATCH', G, { name: SERVER_NAME });

// Supprime les salons par défaut d'un serveur neuf
for (const c of await api('GET', `${G}/channels`)) {
  if (['général', 'Général', 'Salons textuels', 'Salons vocaux'].includes(c.name)) await api('DELETE', `/channels/${c.id}`);
}

// Rôles
const existingRoles = await api('GET', `${G}/roles`);
const roles = {};
for (const r of [...ROLES].reverse()) {
  roles[r.key] = existingRoles.find((x) => x.name === r.name) ?? await api('POST', `${G}/roles`, {
    name: r.name, color: r.color, hoist: r.hoist, mentionable: false, permissions: bits(...r.perms),
  });
  console.log(`  rôle ${r.name}`);
}
const staff = [roles.owner, roles.admin, roles.modo];
const overwrites = (access) => {
  if (access === 'staff') return [
    { id: GUILD_ID, type: 0, deny: bits('ViewChannel') },
    ...staff.map((r) => ({ id: r.id, type: 0, allow: bits('ViewChannel') })),
  ];
  if (access === 'readonly') return [
    { id: GUILD_ID, type: 0, allow: bits('ViewChannel'), deny: bits('SendMessages', 'CreatePublicThreads') },
    ...staff.map((r) => ({ id: r.id, type: 0, allow: bits('SendMessages') })),
  ];
  return [];
};

// Catégories et salons
const channels = {};
for (const cat of CATEGORIES) {
  const category = await api('POST', `${G}/channels`, { name: cat.name, type: 4, permission_overwrites: overwrites(cat.access) });
  for (const ch of cat.channels) {
    const voice = ch.type === 'voice';
    const c = await api('POST', `${G}/channels`, {
      name: ch.name, type: voice ? 2 : 0, parent_id: category.id,
      permission_overwrites: overwrites(ch.access ?? cat.access),
      ...(voice ? {} : { rate_limit_per_user: ch.access ? 0 : 2 }),
    });
    if (ch.key) channels[ch.key] = c;
    console.log(`  salon ${ch.name}`);
  }
}
await api('PATCH', G, {
  afk_channel_id: channels.afk.id, afk_timeout: 900,
  system_channel_id: channels.welcome.id, system_channel_flags: 1 << 3,
}).catch((e) => console.warn('  réglages AFK/système ignorés :', e.message));

// Messages d'info
const send = (ch, title, description, color = 0x5865f2) =>
  api('POST', `/channels/${ch.id}/messages`, { embeds: [{ title, description, color }] });
await send(channels.rules, 'Règlement', RULES, 0xe74c3c);
await send(channels.welcome, `Bienvenue sur ${SERVER_NAME} !`,
  `Ici c'est **chill** : discussions, memes, gaming et **GTA** 🚗\n\n` +
  `➡️ Lis le <#${channels.rules.id}>\n➡️ Prends tes rôles dans <#${channels.roles.id}>\n➡️ Viens papoter dans les salons 💬 CHILL\n\nBon séjour ! 🌙`);
await send(channels.roles, '🎭 Rôles',
  'Tape `/role gta` dans un salon pour obtenir (ou retirer) le rôle 🚗 **Joueur GTA** et être notifié des sessions et events GTA.');
await send(channels.annonces, '📢 Ouverture !', `${SERVER_NAME} est ouvert. Invite tes potes ! 🎉`, 0x2ecc71);

// AutoMod
const exempt_roles = staff.map((r) => r.id);
const block = (custom_message) => ({ type: 1, metadata: { custom_message } });
const alert = { type: 2, metadata: { channel_id: channels.logs.id } };
const rules = [
  { name: 'Mots interdits', trigger_type: 1, trigger_metadata: { keyword_filter: BANNED_WORDS },
    actions: [block('Message bloqué : langage ou lien interdit.'), alert] },
  { name: 'Insultes / contenu sexuel', trigger_type: 4, trigger_metadata: { presets: [1, 2, 3] },
    actions: [block('Message bloqué par la modération.'), alert] },
  { name: 'Spam', trigger_type: 3, actions: [block('Message bloqué : spam détecté.'), alert] },
  { name: 'Spam de mentions', trigger_type: 5,
    trigger_metadata: { mention_total_limit: 5, mention_raid_protection_enabled: true },
    actions: [block('Trop de mentions !'), alert, { type: 3, metadata: { duration_seconds: 600 } }] },
];
for (const r of rules) {
  await api('POST', `${G}/auto-moderation/rules`, { ...r, event_type: 1, enabled: true, exempt_roles })
    .then(() => console.log(`  AutoMod : ${r.name}`))
    .catch((e) => console.warn(`  AutoMod « ${r.name} » ignoré : ${e.message}`));
}
console.log('\n✅ Serveur configuré !');
