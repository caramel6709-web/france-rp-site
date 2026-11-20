// Structure du serveur — style 『emoji』・nom. Modifie librement.
export const SERVER_NAME = '『🌙』Le QG';

// self: rôle que les membres peuvent prendre eux-mêmes avec /role
export const ROLES = [
  { key: 'owner',   name: '👑・Fondateur',       color: 0xf1c40f, hoist: true,  perms: ['Administrator'] },
  { key: 'cofond',  name: '💼・Co-Fondateur',    color: 0xe67e22, hoist: true,  perms: ['Administrator'] },
  { key: 'admin',   name: '🛡️・Administrateur',  color: 0xe74c3c, hoist: true,  perms: ['Administrator'] },
  { key: 'modo',    name: '🔨・Modérateur',      color: 0x3498db, hoist: true,
    perms: ['KickMembers', 'BanMembers', 'ModerateMembers', 'ManageMessages', 'MuteMembers', 'MoveMembers', 'ViewAuditLog', 'ManageNicknames'] },
  { key: 'helper',  name: '🧩・Helper',          color: 0x1abc9c, hoist: true,  perms: ['ModerateMembers', 'ManageMessages'] },
  { key: 'team',    name: '⭐・Team',            color: 0xff6b9d, hoist: true,  perms: [] },
  { key: 'vip',     name: '💎・VIP',             color: 0x9b59b6, hoist: true,  perms: [] },
  { key: 'actif',   name: '🔥・Membre Actif',    color: 0xff7f50, hoist: false, perms: [] },
  { key: 'member',  name: '😎・Membre',          color: 0x95a5a6, hoist: true,  perms: [] },
  { key: 'gta6',    name: '🌴・GTA 6',           color: 0xff4fa3, hoist: false, perms: [], self: true },
  { key: 'gtav',    name: '🚗・GTA V',           color: 0x2ecc71, hoist: false, perms: [], self: true },
  { key: 'gamer',   name: '🎮・Gamer',           color: 0x5865f2, hoist: false, perms: [], self: true },
  { key: 'notif',   name: '🔔・Notif Annonces',  color: 0x99aab5, hoist: false, perms: [], self: true },
  { key: 'event',   name: '🎉・Notif Events',    color: 0x99aab5, hoist: false, perms: [], self: true },
];

// access : 'readonly' (lecture seule), 'team' (Team + staff), 'staff', 'locked' (vocal : seuls Team/staff rejoignent)
export const CATEGORIES = [
  { name: '『📌』・INFORMATIONS', channels: [
    { key: 'welcome',  name: '『👋』・bienvenue', access: 'readonly' },
    { key: 'rules',    name: '『📜』・règlement', access: 'readonly' },
    { key: 'annonces', name: '『📢』・annonces',  access: 'readonly' },
    { key: 'roles',    name: '『🎭』・rôles',     access: 'readonly' },
  ]},
  { name: '『🌍』・ESPACE COMMUNAUTÉ', channels: [
    { key: 'general', name: '『💬』・discussion' },
    { name: '『📸』・médias' },
    { name: '『💡』・suggestions' },
    { name: '『🤖』・commandes' },
  ]},
  { name: '『🌴』・ESPACE GTA 6', channels: [
    { name: '『📰』・gta6-news', access: 'readonly' },
    { name: '『🎮』・gta-discussion' },
    { name: '『🤝』・cherche-équipe' },
  ]},
  { name: '『⭐』・ESPACE TEAM', access: 'team', channels: [
    { name: '『⭐』・team-chat' },
    { name: '『📅』・planning' },
  ]},
  { name: '『🔊』・VOCAUX', channels: [
    { name: '『🔊』Général 1', type: 'voice' },
    { name: '『🎮』GTA 6', type: 'voice' },
    { name: '『🔒』Privé', type: 'voice', access: 'locked' },
    { key: 'afk', name: '『💤』AFK', type: 'voice' },
  ]},
  { name: '『🛡️』・ESPACE STAFF', access: 'staff', channels: [
    { name: '『🛡️』・staff-chat' },
    { key: 'logs', name: '『📋』・logs' },
    { name: '『🔒』Staff', type: 'voice' },
  ]},
];

export const RULES = `**『🤝』・Respect** — Pas d'insultes, de harcèlement, de racisme ni de discriminations.
**『🚫』・Spam** — Pas de spam, de flood ni de majuscules à outrance.
**『📢』・Pub** — Pas de pub (serveurs, réseaux…) sans l'accord du staff.
**『🔞』・Contenu** — Rien de NSFW, choquant ou illégal.
**『🎮』・Triche** — Pas de cheat ni de vente de comptes/argent GTA.
**『📂』・Salons** — Chaque sujet dans le bon salon.
**『🛡️』・Staff** — Les décisions du staff se respectent. Un souci ? Contacte un 🔨・Modérateur.

⚠️ **Sanctions** : avertissement → mute → kick → ban.
*En restant ici, tu acceptes ce règlement.* 🌙`;

export const BANNED_WORDS = ['*nigg*', '*pédé*', 'fdp', 'ntm', '*discord.gg/*'];
