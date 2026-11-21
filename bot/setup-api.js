// Configure le serveur via l'API HTTP de Discord (pas besoin que le bot tourne).
// Usage : DISCORD_TOKEN=... GUILD_ID=... node setup-api.js [--reset]
// --reset efface tous les salons, rôles et règles AutoMod (les emojis sont conservés).
import 'dotenv/config';
import { PermissionFlagsBits as P } from 'discord.js';
import { SERVER_NAME, DESCRIPTION, ROLES, CATEGORIES, RULES, BANNED_WORDS } from './config.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;
const API = 'https://discord.com/api/v10';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(method, path, body) {
  for (;;) {
    const res = await fetch(API + path, {
      method, headers: { Authorization: `Bot ${DISCORD_TOKEN}`, ...(body && { 'Content-Type': 'application/json' }) },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) { const w = ((await res.json()).retry_after ?? 1) * 1000 + 100; await sleep(w); continue; }
    const data = res.status === 204 ? null : await res.json();
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${JSON.stringify(data)}`);
    return data;
  }
}
const bits = (...names) => names.reduce((a, n) => a | P[n], 0n).toString();
const G = `/guilds/${GUILD_ID}`;
const RESET = process.argv.includes('--reset');

const guild = await api('GET', G);
const existing = await api('GET', `${G}/channels`);
if (existing.length > 6 && !RESET) throw new Error(`Le serveur a déjà ${existing.length} salons. Relance avec --reset pour tout reconstruire.`);
console.log(`Configuration de ${guild.name}…`);
if (guild.features.includes('COMMUNITY')) await api('PATCH', G, { features: guild.features.filter((f) => f !== 'COMMUNITY') });
await api('PATCH', G, { name: SERVER_NAME, afk_channel_id: null, system_channel_id: null });
for (const c of existing) await api('DELETE', `/channels/${c.id}`);
if (RESET) {
  for (const r of await api('GET', `${G}/roles`)) if (!r.managed && r.id !== GUILD_ID) await api('DELETE', `${G}/roles/${r.id}`);
  for (const r of await api('GET', `${G}/auto-moderation/rules`)) await api('DELETE', `${G}/auto-moderation/rules/${r.id}`);
  console.log('  ancien contenu effacé');
}
// @everyone : permissions de base sans mention @everyone ni création d'invitations sauvage
await api('PATCH', `${G}/roles/${GUILD_ID}`, { permissions: bits('ViewChannel', 'SendMessages', 'SendMessagesInThreads', 'CreatePublicThreads',
  'EmbedLinks', 'AttachFiles', 'AddReactions', 'UseExternalEmojis', 'ReadMessageHistory', 'UseApplicationCommands', 'Connect', 'Speak',
  'Stream', 'UseVAD', 'UseEmbeddedActivities', 'UseSoundboard', 'ChangeNickname', 'CreateInstantInvite', 'SendVoiceMessages', 'SendPolls') });

// Rôles
const roles = {};
const created = [];
for (const r of ROLES) {
  const role = await api('POST', `${G}/roles`, {
    name: r.name, color: r.sep ? 0 : r.color, hoist: !!r.hoist, mentionable: !!r.self && r.self === 'jeux',
    permissions: bits(...(r.perms ?? [])),
  });
  if (r.key) roles[r.key] = role;
  created.push(role.id);
  console.log(`  rôle ${r.name}`);
}
const me = await api('GET', '/users/@me');
const botRole = (await api('GET', `${G}/roles`)).find((x) => x.tags?.bot_id === me.id);
const order = [...(botRole ? [botRole.id] : []), ...created];
await api('PATCH', `${G}/roles`, order.map((id, i) => ({ id, position: order.length - i })));

const staff = [roles.owner, roles.cofond, ...ROLES.filter((r) => r.staff).map((r) => roles[r.key])];
const role = (r, allow, deny) => ({ id: r.id, type: 0, ...(allow && { allow: bits(...allow) }), ...(deny && { deny: bits(...deny) }) });
const everyone = { id: GUILD_ID };
const write = ['SendMessages', 'CreatePublicThreads', 'CreatePrivateThreads', 'SendMessagesInThreads'];
const overwrites = (access) => Array.isArray(access)
  ? [role(everyone, null, ['ViewChannel']), ...access.map((k) => role(roles[k], ['ViewChannel', 'Connect']))]
  : ({
  readonly: [role(everyone, ['ViewChannel'], write), ...staff.map((r) => role(r, ['SendMessages']))],
  anim:     [role(everyone, ['ViewChannel'], write), ...[...staff, roles.anim].map((r) => role(r, ['SendMessages']))],
  team:     [role(everyone, null, ['ViewChannel']), ...[roles.team, ...staff].map((r) => role(r, ['ViewChannel']))],
  staff:    [role(everyone, null, ['ViewChannel']), ...staff.map((r) => role(r, ['ViewChannel']))],
  locked:   [role(everyone, null, ['Connect']), ...[roles.team, roles.vip, ...staff].map((r) => role(r, ['Connect']))],
}[access] ?? []);

// Salons (les salons « news » et « forum » nécessitent le mode Communauté : créés en texte puis convertis)
const TYPES = { text: 0, voice: 2, news: 0, forum: 0 };
const channels = {}, later = [];
for (const cat of CATEGORIES) {
  const category = await api('POST', `${G}/channels`, { name: cat.name, type: 4, permission_overwrites: overwrites(cat.access) });
  for (const [idx, ch] of cat.channels.entries()) {
    const type = ch.type ?? 'text';
    const branch = idx === 0 ? '╭' : idx === cat.channels.length - 1 ? '╰' : '｜';
    const spec = {
      name: branch + ch.name, parent_id: category.id, ...(ch.topic && { topic: ch.topic }),
      permission_overwrites: Array.isArray(ch.access) ? overwrites(ch.access)
        : ch.access ? [...overwrites(cat.access), ...overwrites(ch.access)] : overwrites(cat.access),
      ...(type === 'text' && { rate_limit_per_user: cat.access || ch.access ? 0 : 2 }),
    };
    if (type === 'forum') { later.push({ ch, spec, position: idx }); continue; }
    const c = await api('POST', `${G}/channels`, { ...spec, type: TYPES[type], position: idx });
    if (type === 'news') later.push({ ch, convert: c });
    if (ch.key) channels[ch.key] = c;
    console.log(`  salon ${spec.name}`);
  }
}

// Mode Communauté
await api('PATCH', G, {
  features: [...new Set([...(await api('GET', G)).features, 'COMMUNITY'])],
  verification_level: 1, explicit_content_filter: 2, default_message_notifications: 1,
  rules_channel_id: channels.rules.id, public_updates_channel_id: channels.modupdates.id,
  system_channel_id: channels.general.id, system_channel_flags: 0,
  afk_channel_id: channels.afk.id, afk_timeout: 900, description: DESCRIPTION, preferred_locale: 'fr',
}).then(() => console.log('  mode Communauté activé'));
for (const l of later) {
  if (l.convert) await api('PATCH', `/channels/${l.convert.id}`, { type: 5 });
  else {
    await api('POST', `${G}/channels`, { ...l.spec, type: 15, position: l.position,
      default_reaction_emoji: { emoji_name: '👍' }, default_sort_order: 0 });
    console.log(`  forum ${l.spec.name}`);
  }
}

// Emojis du serveur utilisables dans les messages
const emo = Object.fromEntries((await api('GET', `${G}/emojis`)).map((e) => [e.name, `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`]));
const e = (n, fallback) => emo[n] ?? fallback;

const send = (k, embed) => api('POST', `/channels/${channels[k].id}/messages`, { embeds: [embed] });
const ch = (k) => `<#${channels[k].id}>`;
const r = (k) => `<@&${roles[k].id}>`;
await send('rules', { title: '『📖』・Règlement', description: RULES, color: 0xe74c3c });
await send('welcome', { title: `Bienvenue sur ${SERVER_NAME} !`, color: 0xff6b9d, description:
  `${e('partyblob', '🎉')} Un serveur **communautaire et chill** : GTA 6, gaming, memes et bonne ambiance.\n\n` +
  `『📖』・Lis le ${ch('rules')}\n『🎭』・Choisis tes rôles via **Salons & rôles** (en haut de la liste)\n` +
  `『💬』・Viens parler dans ${ch('general')}\n\nBon séjour ! ${e('blobcool', '😎')}` });
await send('roles', { title: '『🎭』・Les rôles', color: 0x5865f2, description:
  `**『👑』・Direction**\n${r('owner')} ・ ${r('cofond')} ・ ${r('direc')}\n\n` +
  `**『🛡️』・Staff**\n${r('admin')} ・ ${r('modo')} ・ ${r('support')} ・ ${r('test')}\n\n` +
  `**『🎪』・Équipes**\n${r('anim')} ・ ${r('recrut')} ・ ${r('graph')} ・ ${r('dev')}\n\n` +
  `**『⭐』・Communauté**\n${r('partner')} — serveurs partenaires\n${r('team')} — membres de la team (espace Team)\n` +
  `${r('vip')} — proches et boosters\n${r('ancien')} — là depuis le début\n${r('actif')} — les plus actifs\n${r('member')} — tout le monde\n\n` +
  `**『🎮』・Profil & notifications**\nÀ choisir toi-même dans **Salons & rôles** : jeux, plateforme et notifications.` });
await send('annonces', { title: '『🎉』・Ouverture !', color: 0x2ecc71,
  description: `${SERVER_NAME} est ouvert ${e('PepoDance', '🥳')} Invite tes potes !` });

// Accueil Discord (choix des rôles à l'arrivée)
let seq = 0n;
const snow = () => String(((BigInt(Date.now()) - 1420070400000n) << 22n) + seq++);
const opt = (group) => ROLES.filter((x) => x.self === group).map((x) => ({
  id: snow(), title: x.name.split('・')[1], emoji_name: [...x.name.split('・')[0]].filter((c) => c !== '️').join(''), role_ids: [roles[x.key].id], channel_ids: [],
}));
const textIds = (names) => names.map((k) => channels[k]?.id).filter(Boolean);
const allChannels = await api('GET', `${G}/channels`);
const byPart = (p) => allChannels.find((c) => c.name.includes(p))?.id;
await api('PUT', `${G}/onboarding`, {
  enabled: true, mode: 0,
  default_channel_ids: [...textIds(['welcome', 'rules', 'annonces', 'roles', 'general']),
    ...['médias', 'commandes', 'jeux', 'gta-discussion', 'spoilers', 'question', 'demande-aide'].map(byPart)].filter(Boolean),
  prompts: [
    { id: snow(), type: 0, title: 'À quoi tu joues ?', single_select: false, required: false, in_onboarding: true, options: opt('jeux') },
    { id: snow(), type: 0, title: 'Sur quelle plateforme ?', single_select: false, required: false, in_onboarding: true, options: opt('plateforme') },
    { id: snow(), type: 0, title: 'Quelles notifications veux-tu ?', single_select: false, required: false, in_onboarding: true, options: opt('notifs') },
  ],
}).then(() => console.log('  accueil (choix des rôles) activé'))
  .catch((err) => console.warn('  accueil ignoré :', err.message));

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
    .catch((err) => console.warn(`  AutoMod « ${rule.name} » ignoré : ${err.message}`));
}

await api('PUT', `${G}/members/${guild.owner_id}/roles/${roles.owner.id}`);
await api('PUT', `${G}/members/${guild.owner_id}/roles/${roles.member.id}`);
console.log('\n✅ Serveur configuré !');
