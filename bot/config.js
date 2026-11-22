// Structure du serveur communautaire « Sunset Club » — style ╭『emoji』nom
export const SERVER_NAME = '☀️👑 Soleria RolePlay 👑☀️';
export const DESCRIPTION = '☀️ Bienvenue sur Soleria RolePlay ! Rejoins un service (police, gendarmerie, SAMU, pompiers, mairie…), vis ton RP et suis toutes les actualités du serveur.';

const STAFF_BASE = ['ManageMessages', 'ManageThreads', 'ModerateMembers', 'MoveMembers', 'MuteMembers'];
const MODO = [...STAFF_BASE, 'ViewAuditLog', 'KickMembers', 'ManageNicknames'];
const ADMIN_P = [...MODO, 'BanMembers', 'ManageChannels', 'ManageEvents', 'MentionEveryone', 'DeafenMembers'];
const DIREC_P = [...ADMIN_P, 'ManageGuild', 'ManageRoles', 'ManageWebhooks', 'ManageGuildExpressions'];
// sep : rôle séparateur · staff : accès aux salons staff · self : choisi à l'accueil · rp : service RP (donné après recrutement)
export const ROLES = [
  { sep: true, name: '━━━━━━ 『 FONDATION 』 ━━━━━━' },
  { key: 'owner',  name: '👑・Fondateur',          color: 0xf1c40f, hoist: true, perms: ['Administrator'] },
  { sep: true, name: '━━━━━━━ 『 STAFF 』 ━━━━━━━' },
  { key: 'dir',    name: '🥈・Directeur',          color: 0xc0c0c0, hoist: true, staff: true, perms: DIREC_P },
  { key: 'sadmin', name: '🛡️・Super Admin',        color: 0xee5253, hoist: true, staff: true, perms: ADMIN_P },
  { key: 'admin',  name: '👮・Administrateur',     color: 0xff6b6b, hoist: true, staff: true, perms: ADMIN_P },
  { key: 'smodo',  name: '🔰・Super Modérateur',   color: 0x2e86de, hoist: true, staff: true, perms: [...MODO, 'BanMembers'] },
  { key: 'modo',   name: '🔨・Modérateur',         color: 0x54a0ff, hoist: true, staff: true, perms: MODO },
  { key: 'mtest',  name: '🧪・Modérateur Test',    color: 0x48dbfb, hoist: true, staff: true, perms: STAFF_BASE },
  { key: 'wl',     name: '📋・Staff Whitelist',    color: 0x1dd1a1, hoist: true, staff: true, perms: ['ManageNicknames', 'MoveMembers'] },
  { sep: true, name: '━━━━━━ 『 ÉQUIPES 』 ━━━━━━' },
  { key: 'anim',   name: '🎉・Animateur',          color: 0xff6b9d, hoist: true, perms: ['ManageEvents', 'CreateEvents', 'MoveMembers', 'PrioritySpeaker'] },
  { key: 'dev',    name: '💻・Développeur',        color: 0x00cec9, hoist: true, perms: ['ManageWebhooks'] },
  { key: 'graph',  name: '🎨・Graphiste',          color: 0xfd79a8, perms: ['CreateGuildExpressions'] },
  { key: 'recrut', name: '📝・Recruteur',          color: 0xa29bfe, perms: [] },
  { sep: true, name: '━━━━━━ 『 SERVICES RP 』 ━━━━━━' },
  { key: 'maire',  name: '🏛️・Mairie',             color: 0xf8c291, rp: true },
  { key: 'pref',   name: '🏢・Préfecture',         color: 0xe58e26, rp: true },
  { key: 'police', name: '🚓・Police Nationale',   color: 0x1e3799, rp: true },
  { key: 'gend',   name: '🚔・Gendarmerie',        color: 0x0c2461, rp: true },
  { key: 'samu',   name: '🚑・SAMU',               color: 0xeb2f06, rp: true },
  { key: 'pomp',   name: '🚒・Pompiers',           color: 0xb71540, rp: true },
  { key: 'justice', name: '⚖️・Justice',           color: 0x6a89cc, rp: true },
  { key: 'bus',    name: '🚌・Transports',         color: 0xfad390, rp: true },
  { key: 'depan',  name: '🔧・Dépanneur',          color: 0x82ccdd, rp: true },
  { key: 'tv',     name: '🎥・Journaliste',        color: 0xb8e994, rp: true },
  { key: 'entre',  name: '💼・Entreprise',         color: 0x78e08f, rp: true },
  { key: 'gang',   name: '💸・Gang',               color: 0x4b4b4b, rp: true },
  { sep: true, name: '━━━━━ 『 COMMUNAUTÉ 』 ━━━━━' },
  { key: 'partner', name: '🤝・Partenaire',        color: 0x6c5ce7, hoist: true, perms: [] },
  { key: 'vip',    name: '💎・VIP',                color: 0x9b59b6, hoist: true, perms: ['UseExternalStickers'] },
  { key: 'ancien', name: '🏅・Ancien',             color: 0xb2bec3, perms: [] },
  { key: 'actif',  name: '🔥・Membre Actif',       color: 0xff7f50, perms: [] },
  { key: 'member', name: '✅・Membre',             color: 0x95a5a6, perms: [] },
  { sep: true, name: '━━━━━━ 『 PROFIL 』 ━━━━━━' },
  { key: 'pc',     name: '🖥️・PC',                 color: 0x636e72, self: 'plateforme' },
  { key: 'mobile', name: '📱・Mobile',             color: 0xb2bec3, self: 'plateforme' },
  { key: 'tab',    name: '📲・Tablette',           color: 0xb2bec3, self: 'plateforme' },
  { key: 'cons',   name: '🎮・Console',            color: 0x0652dd, self: 'plateforme' },
  { sep: true, name: '━━━━ 『 NOTIFICATIONS 』 ━━━━' },
  { key: 'nAnn',   name: '🔔・Notif Annonces',     color: 0x99aab5, self: 'notifs' },
  { key: 'nEvent', name: '🎊・Notif Events',       color: 0x99aab5, self: 'notifs' },
  { key: 'nGive',  name: '🎁・Notif Giveaways',    color: 0x99aab5, self: 'notifs' },
  { key: 'nSond',  name: '📊・Notif Sondages',     color: 0x99aab5, self: 'notifs' },
  { key: 'nRecrut', name: '📢・Notif Recrutements', color: 0x99aab5, self: 'notifs' },
  { key: 'nUpd',   name: '🛠️・Notif Updates',      color: 0x99aab5, self: 'notifs' },
];

// Catégorie : name (null = hors catégorie), bars (╭ ｜ ╰, défaut oui), access, gate (visible après acceptation du règlement)
// Salon : type text|voice|news|forum, public (exception au gate), limit, access :
//   'readonly' | 'anim' | 'staff' | ['clé', ...] (caché sauf ces rôles) | { connect: [...] } (visible, verrouillé sauf ces rôles)
const FONDATION = ['owner'];
const DIRECTION = [...FONDATION, 'dir'];
const ADMIN = [...DIRECTION, 'sadmin', 'admin'];
const STAFF = [...ADMIN, 'smodo', 'modo', 'mtest', 'wl'];
const lock = (...keys) => ({ connect: keys.flat() });
const SEP = { name: '-------', type: 'voice', access: lock() };
export const CATEGORIES = [
  { name: null, bars: false, channels: [
    { name: '#SoleriaRP 👑', type: 'voice', access: lock() },
  ]},
  { name: '📊 SERVER STATS 📊', bars: false, channels: [
    { key: 'statMembers', name: '『🌟』Membres : {members}', type: 'voice', access: lock() },
    { key: 'statBoosts',  name: '『🚀』Boosts : {boosts}',   type: 'voice', access: lock() },
  ]},
  { name: '[•] BIENVENUE [•]', channels: [
    { key: 'welcome', name: '『👋』bienvenue',     access: 'readonly' },
    { key: 'rules',   name: '『📄』règlement',     access: 'readonly' },
    { name: '『📜』informations',  access: 'readonly' },
    { key: 'roles',   name: '『🔔』notifications', access: 'readonly' },
    { name: '『🚀』invitations',   access: 'readonly' },
  ]},
  { name: '[•] GESTION SERVEUR [•]', bars: false, gate: true, channels: [
    { name: '『👑』FONDATION 👑 (ᶻᶻᶻ)',          type: 'voice', access: lock(FONDATION) },
    { name: '『👑』Bureau de Félix (F)',         type: 'voice', access: lock(FONDATION) },
    { name: "『👑』Bureau d'Infinity (F)",       type: 'voice', access: lock(FONDATION) },
    { name: '『🥈』Bureau du Directeur (D)',     type: 'voice', access: lock(DIRECTION) },
    { name: '『🕵️』Bureau Sécurité',             type: 'voice', access: lock(ADMIN) },
    { name: '『👮』Bureau des Admins',           type: 'voice', access: lock(ADMIN) },
    { name: '『🚨』Bureau Urgence Sécurité',     type: 'voice', access: lock(STAFF) },
    { name: '『😴』Bureau Zone de Repos ᶻᶻᶻ',    type: 'voice', access: lock(STAFF) },
    { name: '『💠』Bureau du Staff WL',          type: 'voice', access: lock(STAFF) },
    { name: '『💡』Bureau du Staff',             type: 'voice', access: lock(STAFF) },
    { name: '『⬆️』En Attente de Move ⬆️',       type: 'voice' },
  ]},
  { name: '[•] Informations [•]', gate: true, channels: [
    { key: 'annonces', name: '『📯』annonces', access: 'readonly', type: 'news', public: true },
    { name: '『🔗』lien-du-jeu',         access: 'readonly', public: true },
    { name: '『❗』infos',               access: 'readonly', public: true },
    { name: '『🥇』stats-soleria',       access: 'readonly', public: true },
    { name: '『🆘』report-discord',      access: 'readonly', public: true },
    { name: '『🛠️』updates-du-jeu',      access: 'readonly' },
    { name: '『🎁』giveaways',           access: 'anim' },
    { name: '『🚀』boosts',              access: 'readonly' },
    { name: '『🎊』grands-événements',   access: 'anim' },
    { name: '『🎎』événements',          access: 'anim' },
    { name: '『✨』annonce-animation',   access: 'anim' },
    { name: '『📊』sondages',            access: 'readonly' },
    { name: '『💠』réseaux',             access: 'readonly' },
    { name: '『🚨』unban-serveur-principal', access: 'readonly' },
    { name: '『🏛️』élections-municipales-rp', access: 'readonly' },
    { name: '『🔶』recrutement-animateurs', access: 'readonly' },
    { name: '『📶』communication-pub',   access: 'readonly' },
    { name: '『🔷』recrutement-staffs-soleria', access: 'readonly' },
  ]},
  { name: '[•] Social [•]', gate: true, channels: [
    { key: 'general', name: '『💬』discussion' },
    { name: '『🎁』invitations-info-🎁', access: 'readonly' },
    { name: '『🤖』commandes' },
    { name: '『✨』forum', type: 'forum', topic: 'Discussions, guides et débats.' },
    { name: '『🌍』jeux' },
    { name: '『📸』médias' },
  ]},
  { name: '[•] Développement [•]', gate: true, channels: [
    { name: '『🧵』spoilers', access: 'readonly' },
    { name: '『💡』idées-du-jeu' },
  ]},
  { name: '[•] Support [•]', channels: [
    { name: '『💾』question' },
    { name: '『🎈』demande-unban' },
    { name: '『🎈』bug-reports' },
    { name: '『🎈』reports-joueurs' },
    { name: '『🎈』reports-staff' },
  ]},
  { name: '❓ | Aides', gate: true, channels: [
    { name: '『❓』Aide 1', type: 'voice', access: lock(STAFF) },
    { name: '『❓』Aide 2', type: 'voice', access: lock(STAFF) },
    { name: '『❓』Aide 3', type: 'voice', access: lock(STAFF) },
    { name: "『❓』En attente d'aide", type: 'voice' },
  ]},
  { name: '[•] Mairie_RP [•]', gate: true, channels: [
    { name: '『💥』projets-municipaux-rp', access: ['maire', ...STAFF] },
    { name: '『🏛️』En attente', type: 'voice' },
    { name: '『🏛️』Bureau du Maire Soleria_RP', type: 'voice', access: lock('maire', ADMIN) },
  ]},
  { name: '[•] Recrutements Services [•]', gate: true, channels: [
    { name: '『📚』mairie-rp',          access: 'readonly' },
    { name: '『🏢』préfecture-rp',      access: 'readonly' },
    { name: '『🚓』police-rp',          access: 'readonly' },
    { name: '『🚔』gendarmerie-rp',     access: 'readonly' },
    { name: '『🚑』samu-ambulance-rp',  access: 'readonly' },
    { name: '『🚒』pompiers-rp',        access: 'readonly' },
    { name: '『⚖️』justice-rp',         access: 'readonly' },
    { name: '『🚌』transports-bus-rp',  access: 'readonly' },
    { name: '『🔧』dépanneurs-rp',      access: 'readonly' },
    { name: '『🎥』soleria-tv-rp',      access: 'readonly' },
    { name: '『💼』entreprises-rp',     access: 'readonly' },
    { name: '『💸』gangs-rp',           access: 'readonly' },
  ]},
  { name: '[•] Vocaux [•]', gate: true, channels: [
    { name: '『🔊』Général 1', type: 'voice' },
    { name: '『🔊』Général 2', type: 'voice' },
    SEP,
    { name: '『🎉』Bureau Animation Soleria', type: 'voice', access: lock(STAFF, 'anim') },
    { name: '『🎉』Radio Animateur RP', type: 'voice', access: lock(STAFF, 'anim') },
    { name: '『🎉』Animation RP', type: 'voice' },
    SEP,
    { name: '『⛔』Privé 2', type: 'voice', limit: 2 },
    { name: '『⛔』Privé 2', type: 'voice', limit: 2 },
    { name: '『⛔』Privé 2', type: 'voice', limit: 2 },
    { key: 'afk', name: '『💤』AFK', type: 'voice' },
  ]},
  { name: '[•] Staff [•]', access: 'staff', channels: [
    { name: '『☕』staff-chat' },
    { name: '『📢』annonces-staff', access: 'readonly' },
    { key: 'logs', name: '『📜』logs' },
    { name: '『⚖️』sanctions' },
    { name: '『🗃️』candidatures-reçues' },
    { key: 'modupdates', name: '『📬』discord-updates' },
  ]},
];

export const RULES = `**『🤝』・Respect** — Pas d'insultes, de harcèlement, de racisme ni de discriminations.
**『🚫』・Spam** — Pas de spam, de flood ni de majuscules à outrance.
**『📢』・Pub** — Pas de pub (serveurs, réseaux…) sans l'accord du staff, même en MP.
**『🔞』・Contenu** — Rien de NSFW, choquant ou illégal.
**『🎮』・Triche** — Pas de cheat ni de vente de comptes/argent.
**『🎭』・RolePlay** — Respecte ton personnage et les règles RP en jeu (pas de freekill, pas de metagaming, pas de powergaming).
**『📂』・Salons** — Chaque sujet dans le bon salon.
**『🪪』・Profil** — Pseudo et photo de profil corrects.
**『🛡️』・Staff** — Les décisions du staff se respectent. Un souci ? Écris dans 『🚨』signalements.

⚠️ **Sanctions** : avertissement → mute → kick → ban.
*En restant ici, tu acceptes ce règlement et les [conditions de Discord](https://discord.com/terms).*`;

export const BANNED_WORDS = ['*nigg*', '*pédé*', 'fdp', 'ntm', '*discord.gg/*', '*discord.com/invite*'];
