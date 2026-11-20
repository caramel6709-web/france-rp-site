// Structure du serveur — style 『emoji』・nom. Modifie librement.
export const SERVER_NAME = '『🌴』Sunset Club';

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

// access : 'readonly' (lecture seule), 'team' (Team + staff), 'staff', 'locked' (vocal : seuls Team/VIP/staff rejoignent)
// Les traits ╭ │ ╰ sont ajoutés automatiquement devant chaque salon.
export const CATEGORIES = [
  { name: '『📌』・INFORMATIONS', channels: [
    { key: 'welcome',  name: '『👋』bienvenue', access: 'readonly' },
    { key: 'rules',    name: '『📜』règlement', access: 'readonly' },
    { key: 'annonces', name: '『📢』annonces',  access: 'readonly' },
    { key: 'roles',    name: '『🎭』rôles',     access: 'readonly' },
    { name: '『🎁』giveaways', access: 'readonly' },
    { name: '『🚀』boosts',    access: 'readonly' },
    { name: '『🔗』réseaux',   access: 'readonly' },
  ]},
  { name: '『🌍』・COMMUNAUTÉ', channels: [
    { key: 'general', name: '『💬』discussion' },
    { name: '『📸』médias' },
    { name: '『😂』memes' },
    { name: '『🎵』musique' },
    { name: '『🐾』animaux' },
    { name: '『🍔』food' },
    { name: '『🤖』commandes' },
  ]},
  { name: '『🎉』・FUN', channels: [
    { name: '『🔢』compteur', topic: 'Comptez de 1 en 1, chacun son tour. Celui qui se trompe recommence à 1 !' },
    { name: '『🔤』mot-suivant', topic: 'Écris un mot qui commence par la dernière lettre du mot précédent.' },
    { name: '『🏆』best-of', topic: 'Les meilleurs moments et phrases cultes du serveur.' },
    { name: '『🖥️』ton-setup', topic: 'Montre ton setup gaming !' },
    { name: '『📊』sondages', access: 'readonly' },
  ]},
  { name: '『🌴』・GTA 6', channels: [
    { name: '『📰』gta6-news', access: 'readonly' },
    { name: '『🎬』trailers-leaks' },
    { name: '『🗺️』théories-map' },
    { name: '『💬』gta-discussion' },
    { name: '『📷』screens-clips' },
    { name: '『🤝』cherche-crew' },
  ]},
  { name: '『🎮』・GAMING', channels: [
    { name: '『🕹️』jeux-du-moment' },
    { name: '『🎥』clips' },
    { name: '『🔍』cherche-joueurs' },
    { name: '『🏅』exploits', topic: 'Tes plus gros exploits, records et trophées.' },
  ]},
  { name: '『🎫』・SUPPORT', channels: [
    { name: '『❓』question' },
    { name: '『🚨』signalements' },
    { name: '『💡』suggestions' },
  ]},
  { name: '『⭐』・ESPACE TEAM', access: 'team', channels: [
    { name: '『⭐』team-chat' },
    { name: '『📅』planning' },
    { name: '『💭』idées' },
    { name: '『⭐』Team', type: 'voice' },
  ]},
  { name: '『🔊』・VOCAUX', channels: [
    { name: '『🔊』Général 1', type: 'voice' },
    { name: '『🔊』Général 2', type: 'voice' },
    { name: '『🌴』GTA 6', type: 'voice' },
    { name: '『🎮』Gaming', type: 'voice' },
    { name: '『🎵』Musique', type: 'voice' },
    { name: '『🔒』Privé', type: 'voice', access: 'locked' },
    { key: 'afk', name: '『💤』AFK', type: 'voice' },
  ]},
  { name: '『🛡️』・STAFF', access: 'staff', channels: [
    { name: '『🛡️』staff-chat' },
    { key: 'logs', name: '『📋』logs' },
    { name: '『⚖️』sanctions' },
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
