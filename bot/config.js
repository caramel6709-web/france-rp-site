// Structure du serveur communautaire « Sunset Club » — style ╭『emoji』nom
export const SERVER_NAME = '『🌴』Sunset Club';
export const DESCRIPTION = '🌴 Serveur communautaire chill : GTA 6, gaming, memes et bonne ambiance. Rejoins la team !';

const STAFF_BASE = ['ManageMessages', 'ManageThreads', 'ModerateMembers', 'MoveMembers', 'MuteMembers'];
// sep: rôle séparateur (décoratif, sans permission)
export const ROLES = [
  { sep: true, name: '━━━━━━ 『 DIRECTION 』 ━━━━━━' },
  { key: 'owner',  name: '👑・Fondateur',      color: 0xf1c40f, hoist: true, perms: ['Administrator'] },
  { key: 'cofond', name: '💼・Co-Fondateur',   color: 0xf39c12, hoist: true, perms: ['Administrator'] },
  { key: 'direc',  name: '🏛️・Direction',      color: 0xe67e22, hoist: true, staff: true,
    perms: [...STAFF_BASE, 'ManageGuild', 'ManageRoles', 'ManageChannels', 'ManageWebhooks', 'ManageGuildExpressions', 'ManageEvents',
      'ViewAuditLog', 'KickMembers', 'BanMembers', 'ManageNicknames', 'MentionEveryone', 'DeafenMembers'] },
  { sep: true, name: '━━━━━━━ 『 STAFF 』 ━━━━━━━' },
  { key: 'admin',  name: '🛡️・Administrateur', color: 0xe74c3c, hoist: true, staff: true,
    perms: [...STAFF_BASE, 'ManageChannels', 'ManageEvents', 'ViewAuditLog', 'KickMembers', 'BanMembers', 'ManageNicknames', 'MentionEveryone', 'DeafenMembers'] },
  { key: 'modo',   name: '🔨・Modérateur',     color: 0x3498db, hoist: true, staff: true,
    perms: [...STAFF_BASE, 'ViewAuditLog', 'KickMembers', 'ManageNicknames'] },
  { key: 'support', name: '🎧・Support',        color: 0x1abc9c, hoist: true, staff: true, perms: STAFF_BASE },
  { key: 'test',   name: '🧪・Staff Test',      color: 0x16a085, hoist: true, staff: true, perms: ['ManageMessages', 'MoveMembers'] },
  { sep: true, name: '━━━━━━ 『 ÉQUIPES 』 ━━━━━━' },
  { key: 'anim',   name: '🎪・Animateur',       color: 0xff6b9d, hoist: true, perms: ['ManageEvents', 'CreateEvents', 'MoveMembers', 'PrioritySpeaker'] },
  { key: 'recrut', name: '📝・Recruteur',       color: 0xa29bfe, hoist: false, perms: [] },
  { key: 'graph',  name: '🎨・Graphiste',       color: 0xfd79a8, hoist: false, perms: ['CreateGuildExpressions'] },
  { key: 'dev',    name: '💻・Développeur',     color: 0x00cec9, hoist: false, perms: ['ManageWebhooks'] },
  { sep: true, name: '━━━━━ 『 COMMUNAUTÉ 』 ━━━━━' },
  { key: 'partner', name: '🤝・Partenaire',     color: 0x6c5ce7, hoist: true, perms: [] },
  { key: 'team',   name: '⭐・Team',            color: 0xffeaa7, hoist: true, perms: ['ChangeNickname'] },
  { key: 'vip',    name: '💎・VIP',             color: 0x9b59b6, hoist: true, perms: ['AttachFiles', 'EmbedLinks', 'UseExternalEmojis', 'UseExternalStickers'] },
  { key: 'ancien', name: '🏅・Ancien',          color: 0xb2bec3, hoist: false, perms: [] },
  { key: 'actif',  name: '🔥・Membre Actif',    color: 0xff7f50, hoist: false, perms: [] },
  { key: 'member', name: '✅・Membre',          color: 0x95a5a6, hoist: false, perms: [] },
  { sep: true, name: '━━━━━━ 『 PROFIL 』 ━━━━━━' },
  { key: 'gta6',   name: '🏝️・GTA 6',          color: 0xff4fa3, self: 'jeux' },
  { key: 'gtav',   name: '🚗・GTA V',           color: 0x2ecc71, self: 'jeux' },
  { key: 'roblox', name: '🧱・Roblox',          color: 0xd63031, self: 'jeux' },
  { key: 'fn',     name: '🪂・Fortnite',        color: 0x0984e3, self: 'jeux' },
  { key: 'mc',     name: '⛏️・Minecraft',       color: 0x55a630, self: 'jeux' },
  { key: 'pc',     name: '🖥️・PC',              color: 0x636e72, self: 'plateforme' },
  { key: 'ps',     name: '🎮・PlayStation',     color: 0x0652dd, self: 'plateforme' },
  { key: 'xbox',   name: '🟩・Xbox',            color: 0x107c10, self: 'plateforme' },
  { key: 'mobile', name: '📱・Mobile',          color: 0xb2bec3, self: 'plateforme' },
  { sep: true, name: '━━━━ 『 NOTIFICATIONS 』 ━━━━' },
  { key: 'nAnn',   name: '🔔・Notif Annonces',  color: 0x99aab5, self: 'notifs' },
  { key: 'nEvent', name: '🎉・Notif Events',    color: 0x99aab5, self: 'notifs' },
  { key: 'nGive',  name: '🎁・Notif Giveaways', color: 0x99aab5, self: 'notifs' },
  { key: 'nSond',  name: '📊・Notif Sondages',  color: 0x99aab5, self: 'notifs' },
  { key: 'nGta',   name: '📰・Notif GTA 6',     color: 0x99aab5, self: 'notifs' },
];

// type : text (défaut) | voice | news (annonces suivables) | forum
// access : readonly | anim | team | staff | locked | ['clé de rôle', ...] (salon visible seulement par ces rôles + fondateurs)
const DIRECTION = ['direc'];
const ADMIN = [...DIRECTION, 'admin'];
const STAFF = [...ADMIN, 'modo', 'support', 'test'];
export const CATEGORIES = [
  { name: '[•] Informations [•]', channels: [
    { key: 'welcome',  name: '『👋』bienvenue',       access: 'readonly' },
    { key: 'rules',    name: '『📖』règlement',       access: 'readonly' },
    { key: 'annonces', name: '『📯』annonces',        access: 'readonly', type: 'news' },
    { name: '『📢』annonces-🚨',     access: 'readonly' },
    { name: '『🔗』liens-utiles',     access: 'readonly' },
    { name: '『🥇』classements',      access: 'readonly' },
    { name: '『🆘』report-discord',   access: 'readonly', topic: 'Pour signaler un membre, ouvre un post dans le support.' },
    { name: '『🛠️』updates',          access: 'readonly' },
    { name: '『🎁』giveaways',        access: 'anim' },
    { name: '『🚀』boosts',           access: 'readonly' },
    { name: '『🎉』grands-événements', access: 'anim' },
    { name: '『🎎』événements',       access: 'anim' },
    { name: '『✨』annonce-animation', access: 'anim' },
    { name: '『📊』sondages',         access: 'readonly' },
    { key: 'roles', name: '『🎭』rôles', access: 'readonly' },
    { name: '『💠』réseaux',          access: 'readonly' },
    { name: '『📶』communication-pub', access: 'readonly' },
    { name: '『🔷』recrutement-staff', access: 'readonly' },
  ]},
  { name: '[•] Social [•]', channels: [
    { key: 'general', name: '『💬』discussion' },
    { name: '『🎟️』invitations-info-🎟️', access: 'readonly', topic: 'Comment inviter tes potes et les récompenses.' },
    { name: '『🤖』commandes' },
    { name: '『🌟』forum', type: 'forum', topic: 'Discussions, guides et débats.' },
    { name: '『🌍』jeux' },
    { name: '『📸』médias' },
  ]},
  { name: '[•] GTA 6 [•]', channels: [
    { name: '『🗞️』gta6-news', access: 'readonly', type: 'news' },
    { name: '『🧵』spoilers' },
    { name: '『🚘』gta-discussion' },
    { name: '『👥』cherche-crew' },
  ]},
  { name: '[•] Support [•]', channels: [
    { name: '『💾』question' },
    { name: '『🎈』demande-aide' },
    { name: '『🐞』bug-reports' },
    { name: '『💡』suggestions', type: 'forum', topic: 'Une idée pour le serveur ? Crée un post !' },
  ]},
  { name: '[•] Vocaux [•]', channels: [
    { name: '『🔈』Général 1', type: 'voice' },
    { name: '『🔉』Général 2', type: 'voice' },
    { name: '『🏖️』GTA Session', type: 'voice' },
    { name: '『🔒』Privé', type: 'voice', access: 'locked' },
    { key: 'afk', name: '『💤』AFK', type: 'voice' },
  ]},
  { name: '[•] Team [•]', access: 'team', channels: [
    { name: '『⭐』team-chat' },
    { name: '『🌠』Team', type: 'voice' },
  ]},
  { name: '[•] Bureaux [•]', access: 'staff', channels: [
    { name: '『🏛️』bureau-direction',     access: DIRECTION },
    { name: '『🛡️』bureau-administration', access: ADMIN },
    { name: '『🔨』bureau-modération',    access: STAFF },
    { name: '『📝』bureau-recrutement',   access: [...ADMIN, 'recrut'] },
    { name: '『🎪』bureau-animation',     access: [...STAFF, 'anim'] },
    { name: '『☕』staff-chat' },
    { key: 'logs', name: '『📜』logs' },
    { name: '『⚖️』sanctions' },
    { key: 'modupdates', name: '『📬』discord-updates' },
    { name: '『🗣️』Réunion', type: 'voice', access: STAFF },
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
