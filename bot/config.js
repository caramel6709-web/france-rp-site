// Structure du serveur communautaire « Sunset Club » — style ╭『emoji』nom
export const SERVER_NAME = '『🌴』Palm Society';
export const DESCRIPTION = '🌴 Palm Society — serveur communautaire chill : GTA 6, gaming, memes et bonne ambiance. Rejoins la team !';

const STAFF_BASE = ['ManageMessages', 'ManageThreads', 'ModerateMembers', 'MoveMembers', 'MuteMembers'];
const MODO = [...STAFF_BASE, 'ViewAuditLog', 'KickMembers', 'ManageNicknames'];
const ADMIN_P = [...MODO, 'BanMembers', 'ManageChannels', 'ManageEvents', 'MentionEveryone', 'DeafenMembers'];
const DIREC_P = [...ADMIN_P, 'ManageGuild', 'ManageRoles', 'ManageWebhooks', 'ManageGuildExpressions'];
// sep : rôle séparateur décoratif · staff : accès aux salons staff · self : rôle choisi à l'accueil
export const ROLES = [
  { sep: true, name: '━━━━━━ 『 FONDATION 』 ━━━━━━' },
  { key: 'owner',  name: '👑・Fondateur',          color: 0xf1c40f, hoist: true, perms: ['Administrator'] },
  { key: 'cofond', name: '💎・Co-Fondateur',       color: 0x00d2ff, hoist: true, perms: ['Administrator'] },
  { sep: true, name: '━━━━━━━ 『 STAFF 』 ━━━━━━━' },
  { key: 'dir',    name: '🥈・Directeur',          color: 0xc0c0c0, hoist: true, staff: true, perms: DIREC_P },
  { key: 'sadmin', name: '🛡️・Super Admin',        color: 0xee5253, hoist: true, staff: true, perms: ADMIN_P },
  { key: 'admin',  name: '👮・Administrateur',     color: 0xff6b6b, hoist: true, staff: true, perms: ADMIN_P },
  { key: 'smodo',  name: '🔰・Super Modérateur',   color: 0x2e86de, hoist: true, staff: true, perms: [...MODO, 'BanMembers'] },
  { key: 'modo',   name: '🔨・Modérateur',         color: 0x54a0ff, hoist: true, staff: true, perms: MODO },
  { key: 'mtest',  name: '🧪・Modérateur Test',    color: 0x48dbfb, hoist: true, staff: true, perms: STAFF_BASE },
  { sep: true, name: '━━━━━━ 『 ÉQUIPES 』 ━━━━━━' },
  { key: 'anim',   name: '🎉・Animateur',          color: 0xff6b9d, hoist: true, perms: ['ManageEvents', 'CreateEvents', 'MoveMembers', 'PrioritySpeaker'] },
  { key: 'recrut', name: '📝・Recruteur',          color: 0xa29bfe, perms: [] },
  { key: 'graph',  name: '🎨・Graphiste',          color: 0xfd79a8, perms: ['CreateGuildExpressions'] },
  { key: 'dev',    name: '💻・Développeur',        color: 0x00cec9, perms: ['ManageWebhooks'] },
  { sep: true, name: '━━━━━ 『 COMMUNAUTÉ 』 ━━━━━' },
  { key: 'partner', name: '🤝・Partenaire',        color: 0x6c5ce7, hoist: true, perms: [] },
  { key: 'team',   name: '⭐・Team',               color: 0xffeaa7, hoist: true, perms: [] },
  { key: 'vip',    name: '💜・VIP',                color: 0x9b59b6, hoist: true, perms: ['UseExternalStickers'] },
  { key: 'ancien', name: '🏅・Ancien',             color: 0xb2bec3, perms: [] },
  { key: 'actif',  name: '🔥・Membre Actif',       color: 0xff7f50, perms: [] },
  { key: 'member', name: '✅・Membre',             color: 0x95a5a6, perms: [] },
  { sep: true, name: '━━━━━━ 『 PROFIL 』 ━━━━━━' },
  { key: 'gta6',   name: '🏝️・GTA 6',             color: 0xff4fa3, self: 'jeux' },
  { key: 'gtav',   name: '🚗・GTA V',              color: 0x2ecc71, self: 'jeux' },
  { key: 'roblox', name: '🧱・Roblox',             color: 0xd63031, self: 'jeux' },
  { key: 'fn',     name: '🪂・Fortnite',           color: 0x0984e3, self: 'jeux' },
  { key: 'mc',     name: '⛏️・Minecraft',          color: 0x55a630, self: 'jeux' },
  { key: 'pc',     name: '🖥️・PC',                 color: 0x636e72, self: 'plateforme' },
  { key: 'ps',     name: '🎮・PlayStation',        color: 0x0652dd, self: 'plateforme' },
  { key: 'xbox',   name: '🟩・Xbox',               color: 0x107c10, self: 'plateforme' },
  { key: 'mobile', name: '📱・Mobile',             color: 0xb2bec3, self: 'plateforme' },
  { sep: true, name: '━━━━ 『 NOTIFICATIONS 』 ━━━━' },
  { key: 'nAnn',   name: '🔔・Notif Annonces',     color: 0x99aab5, self: 'notifs' },
  { key: 'nEvent', name: '🎊・Notif Events',       color: 0x99aab5, self: 'notifs' },
  { key: 'nGive',  name: '🎁・Notif Giveaways',    color: 0x99aab5, self: 'notifs' },
  { key: 'nSond',  name: '📊・Notif Sondages',     color: 0x99aab5, self: 'notifs' },
  { key: 'nGta',   name: '📰・Notif GTA 6',        color: 0x99aab5, self: 'notifs' },
];

// Catégorie : name (null = salons hors catégorie), bars (╭ ｜ ╰ devant les salons, défaut oui), access,
//   gate (salons visibles seulement après acceptation du règlement = rôle ✅・Membre ; public: true pour une exception)
// Salon : type text|voice|news|forum, access :
//   'readonly' | 'anim' | 'team' | 'staff' | ['clé', ...] (caché sauf ces rôles) | { connect: ['clé', ...] } (visible, verrouillé sauf ces rôles)
const FONDATION = ['cofond'];
const DIRECTION = [...FONDATION, 'dir'];
const ADMIN = [...DIRECTION, 'sadmin', 'admin'];
const STAFF = [...ADMIN, 'smodo', 'modo', 'mtest'];
const lock = (...keys) => ({ connect: keys.flat() });
const SEP = { name: '-------', type: 'voice', access: lock() };
export const CATEGORIES = [
  { name: null, bars: false, channels: [
    { name: '#PalmSociety 🌴', type: 'voice', access: lock() },
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
    { name: '『👑』FONDATION 💎👑',              type: 'voice', access: lock(FONDATION) },
    { name: '『🥈』Bureau du Directeur',        type: 'voice', access: lock(DIRECTION) },
    { name: '『👮』Bureau des Admins',           type: 'voice', access: lock(ADMIN) },
    { name: '『🔰』Bureau des Modérateurs',      type: 'voice', access: lock(STAFF) },
    { name: '『🚨』Bureau Urgence',              type: 'voice', access: lock(STAFF) },
    { name: '『😴』Bureau Zone de Repos ᶻᶻᶻ',    type: 'voice', access: lock(STAFF) },
    { name: '『💡』Bureau du Staff',             type: 'voice', access: lock(STAFF) },
    { name: '『⬆️』En Attente de Move ⬆️',       type: 'voice' },
  ]},
  { name: '[•] Informations [•]', gate: true, channels: [
    { key: 'annonces', name: '『📯』annonces', public: true, access: 'readonly', type: 'news' },
    { name: '『🔗』liens-utiles', public: true,        access: 'readonly' },
    { name: '『❗』infos', public: true,               access: 'readonly' },
    { name: '『🥇』classements', public: true,         access: 'readonly' },
    { name: '『🆘』report-discord', public: true,      access: 'readonly' },
    { name: '『🛠️』updates',             access: 'readonly' },
    { name: '『🎁』giveaways',           access: 'anim' },
    { name: '『🚀』boosts',              access: 'readonly' },
    { name: '『🎊』grands-événements',   access: 'anim' },
    { name: '『🎎』événements',          access: 'anim' },
    { name: '『✨』annonce-animation',   access: 'anim' },
    { name: '『📊』sondages',            access: 'readonly' },
    { name: '『💠』réseaux',             access: 'readonly' },
    { name: '『🤝』partenariats',        access: 'readonly' },
    { name: '『🔶』recrutement-animateurs', access: 'readonly' },
    { name: '『📶』communication-pub',   access: 'readonly' },
    { name: '『🔷』recrutement-staffs',  access: 'readonly' },
  ]},
  { name: '[•] Social [•]', gate: true, channels: [
    { key: 'general', name: '『💬』discussion' },
    { name: '『🎁』invitations-info-🎁', access: 'readonly' },
    { name: '『🤖』commandes' },
    { name: '『✨』forum', type: 'forum', topic: 'Discussions, guides et débats.' },
    { name: '『🌍』jeux' },
    { name: '『📸』médias' },
  ]},
  { name: '[•] GTA 6 [•]', gate: true, channels: [
    { name: '『🗞️』gta6-news', access: 'readonly', type: 'news' },
    { name: '『🧵』spoilers' },
    { name: '『🚘』gta-discussion' },
    { name: '『👥』cherche-crew' },
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
  { name: '[•] Événements [•]', gate: true, channels: [
    { name: '『💥』projets-events' },
    { name: '『🏛️』En attente', type: 'voice' },
    { name: '『🏛️』Bureau des Événements', type: 'voice', access: lock(STAFF, 'anim') },
  ]},
  { name: '[•] Recrutements [•]', gate: true, channels: [
    { name: '『📚』candidature-staff' },
    { name: '『🎉』candidature-animateur' },
    { name: '『🎨』candidature-graphiste' },
    { name: '『💻』candidature-développeur' },
    { name: '『🤝』candidature-partenariat' },
    { name: '『⭐』candidature-team' },
  ]},
  { name: '[•] Vocaux [•]', gate: true, channels: [
    { name: '『🔊』Général 1', type: 'voice' },
    { name: '『🔊』Général 2', type: 'voice' },
    { name: '『🏖️』GTA Session', type: 'voice' },
    SEP,
    { name: '『🎉』Bureau Animation', type: 'voice', access: lock(STAFF, 'anim') },
    { name: '『🎉』Radio Animateur', type: 'voice', access: lock(STAFF, 'anim') },
    { name: '『🎉』Animation', type: 'voice' },
    SEP,
    { name: '『⛔』Privé 2', type: 'voice', limit: 2 },
    { name: '『⛔』Privé 2', type: 'voice', limit: 2 },
    { name: '『⛔』Privé 2', type: 'voice', limit: 2 },
    { key: 'afk', name: '『💤』AFK', type: 'voice' },
  ]},
  { name: '[•] Team [•]', access: 'team', channels: [
    { name: '『⭐』team-chat' },
    { name: '『🌠』Team', type: 'voice' },
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
**『📂』・Salons** — Chaque sujet dans le bon salon.
**『🪪』・Profil** — Pseudo et photo de profil corrects.
**『🛡️』・Staff** — Les décisions du staff se respectent. Un souci ? Écris dans 『🚨』signalements.

⚠️ **Sanctions** : avertissement → mute → kick → ban.
*En restant ici, tu acceptes ce règlement et les [conditions de Discord](https://discord.com/terms).*`;

export const BANNED_WORDS = ['*nigg*', '*pédé*', 'fdp', 'ntm', '*discord.gg/*', '*discord.com/invite*'];
