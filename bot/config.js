// Structure du serveur communautaire « Sunset Club » — style ╭『emoji』nom
export const SERVER_NAME = '☀️👑 Soleria RolePlay 👑☀️';
export const DESCRIPTION = '☀️ Bienvenue sur Soleria RolePlay ! Rejoins un service (police, gendarmerie, SAMU, pompiers, mairie…), vis ton RP et suis toutes les actualités du serveur.';

const STAFF_BASE = ['ManageMessages', 'ManageThreads', 'ModerateMembers', 'MoveMembers', 'MuteMembers'];
const MODO = [...STAFF_BASE, 'ViewAuditLog', 'KickMembers', 'ManageNicknames'];
const ADMIN_P = [...MODO, 'BanMembers', 'ManageChannels', 'ManageEvents', 'MentionEveryone', 'DeafenMembers'];
const DIREC_P = [...ADMIN_P, 'ManageGuild', 'ManageRoles', 'ManageWebhooks', 'ManageGuildExpressions'];
// Organisation des rôles :
//  - rôles de TITRE « emoji • Nom Soleria emoji » : affichage + accès aux salons (staff: true), sans permission
//  - rôles de PERMISSION (Perm Globe, P4 → P1) : portent les vrais droits, à cumuler avec le titre
//  - séparateurs vides (sep) ; label sert seulement au message des rôles
// self : proposé à l'accueil · mention : mentionnable par tous
const BLANK = 'ㅤ';
export const ROLES = [
  { sep: true, name: BLANK, label: 'Fondation' },
  { key: 'owner',   name: '👑 • Fondateur Soleria 👑',           color: 0xf1c40f, hoist: true, staff: true },
  { key: 'globe',   name: '🌐 • Perm Globe 🛡️',                  color: 0xffd6e7, perms: ['Administrator'] },
  { sep: true, name: BLANK, label: 'Direction' },
  { key: 'dir',     name: '🥈 • Directeur Soleria 🏆',            color: 0xc0c0c0, hoist: true, staff: true },
  { key: 'afond',   name: '📁 • Assistant des Fondateurs ⭐',      color: 0xf6e58d, hoist: true, staff: true },
  { sep: true, name: BLANK, label: 'Permissions' },
  { key: 'p4',      name: 'P4', color: 0xbdc3c7, perms: DIREC_P },
  { key: 'p3',      name: 'P3', color: 0xbdc3c7, perms: ADMIN_P },
  { key: 'p2',      name: 'P2', color: 0xbdc3c7, perms: [...MODO, 'BanMembers'] },
  { key: 'p1',      name: 'P1', color: 0xbdc3c7, perms: STAFF_BASE },
  { sep: true, name: BLANK, label: 'Administration' },
  { key: 'sadmin',  name: '⭐ • Super Administrateur Soleria',     color: 0xff3838, hoist: true, staff: true },
  { key: 'chefsec', name: '🛡️ • Chef Sécurité Soleria RP 🌀',     color: 0x3742fa, hoist: true, staff: true },
  { key: 'admin',   name: '🔥 • Administrateur Soleria',          color: 0xff4d4d, hoist: true, staff: true },
  { key: 'atest',   name: '🧪 • Administrateur Test Soleria',     color: 0xff7675, hoist: true, staff: true },
  { key: 'respanim', name: '🎪 • Responsable Animation Soleria RP', color: 0xe84393, hoist: true, staff: true },
  { key: 'respev',  name: '🎊 • Responsable Événements RP',        color: 0xfd79a8, hoist: true, staff: true },
  { key: 'urgence', name: '⚠️ • URGENCE • SÉCURITÉ ⚠️',            color: 0xff0000, mention: true },
  { sep: true, name: BLANK, label: 'Modération' },
  { key: 'smodo',   name: '💜 • Super Modérateur Soleria',        color: 0x6c5ce7, hoist: true, staff: true },
  { key: 'mconf',   name: '🔰 • Modérateur Confirmé Soleria',     color: 0x4834d4, hoist: true, staff: true },
  { key: 'modo',    name: '🔨 • Modérateur Soleria',              color: 0x54a0ff, hoist: true, staff: true },
  { key: 'mtest',   name: '🧪 • Modérateur Test Soleria',         color: 0x48dbfb, hoist: true, staff: true },
  { key: 'wl',      name: '📋 • Staff WL Soleria ✅',              color: 0x1dd1a1, hoist: true, staff: true },
  { key: 'evstaff', name: '🎟️ • Staff Événement Soleria',        color: 0x10ac84, staff: true },
  { key: 'staff',   name: '☀️ • Staff de Soleria RolePlay 📋',    color: 0xffffff, staff: true },
  { sep: true, name: BLANK, label: 'Rôles RP' },
  { key: 'maire',   name: '🏛️ • Maire de Soleria 🏛️',            color: 0x74b9ff, hoist: true },
  { key: 'pref',    name: '🏢 • Préfet de Soleria',               color: 0x55efc4, hoist: true },
  { key: 'anim',    name: '🎉 • Animateur Soleria 🎊',            color: 0x0fbcf9, hoist: true, perms: ['ManageEvents', 'CreateEvents', 'MoveMembers', 'PrioritySpeaker'] },
  { key: 'dev',     name: '💻 • Développeur Soleria',             color: 0x00cec9, hoist: true },
  { key: 'police',  name: '🚓 • Police Nationale',                color: 0x1e3799 },
  { key: 'gend',    name: '🚔 • Gendarmerie',                     color: 0x0c2461 },
  { key: 'samu',    name: '🚑 • SAMU',                            color: 0xeb2f06 },
  { key: 'pomp',    name: '🚒 • Pompiers',                        color: 0xb71540 },
  { key: 'justice', name: '⚖️ • Justice',                         color: 0x6a89cc },
  { key: 'bus',     name: '🚌 • Transports',                      color: 0xfad390 },
  { key: 'depan',   name: '🔧 • Dépanneur',                       color: 0x82ccdd },
  { key: 'tv',      name: '🎥 • Soleria TV',                      color: 0xb8e994 },
  { key: 'entre',   name: '💼 • Entreprise',                      color: 0x78e08f },
  { key: 'gang',    name: '💸 • Gang',                            color: 0x4b4b4b },
  { sep: true, name: BLANK, label: 'Communauté' },
  { key: 'booster', name: '🚀 • Méga Booster ☀️',                 color: 0xff6b81, hoist: true },
  { key: 'comm',    name: '📣 • Communication Soleria',           color: 0x6ab04c },
  { key: 'inviteur', name: '📨 • Super Inviteur',                 color: 0x8e44ad },
  { key: 'vip',     name: '💎 • VIP',                             color: 0x9b59b6, hoist: true },
  { key: 'partner', name: '🤝 • Partenaire Soleria',              color: 0x6c5ce7, hoist: true },
  { key: 'bvn',     name: '☀️☀️☀️ Bienvenue sur Soleria RolePlay ☀️☀️☀️', color: 0xe17055 },
  { key: 'ancien',  name: '✨ • Ancien Staff Retraité',            color: 0xfdcb6e },
  { sep: true, name: BLANK, label: 'Membres' },
  { key: 'member',  name: '✅ • Membre',                          color: 0x6ab04c },
  { sep: true, name: BLANK, label: 'Notifications' },
  { key: 'nAnn',    name: 'Notification Annonces 📢',             color: 0xf39c12, self: 'notifs' },
  { key: 'nEvent',  name: 'Notification Events 📢',               color: 0x3498db, self: 'notifs' },
  { key: 'nSond',   name: 'Notification Sondages 📢',             color: 0xe74c3c, self: 'notifs' },
  { key: 'nUpd',    name: 'Notification Spoilers-Updates 📢',     color: 0xe67e22, self: 'notifs' },
  { key: 'nRecrut', name: 'Notification Recrutements RP 📢',      color: 0x2ecc71, self: 'notifs' },
  { key: 'nGive',   name: 'Notification Giveaways 📢',            color: 0x9b59b6, self: 'notifs' },
];

// Catégorie : name (null = hors catégorie), bars (╭ ｜ ╰, défaut oui), access, gate (visible après acceptation du règlement)
// Salon : type text|voice|news|forum, public (exception au gate), limit, access :
//   'readonly' | 'anim' | 'staff' | ['clé', ...] (caché sauf ces rôles) | { connect: [...] } (visible, verrouillé sauf ces rôles)
const FONDATION = ['owner'];
const DIRECTION = [...FONDATION, 'dir'];
const ADMIN = [...DIRECTION, 'afond', 'sadmin', 'chefsec', 'admin', 'atest'];
const STAFF = [...ADMIN, 'respanim', 'respev', 'smodo', 'mconf', 'modo', 'mtest', 'wl', 'evstaff', 'staff'];
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
