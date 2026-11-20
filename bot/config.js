// Structure du serveur « Le QG » — modifie librement noms, salons et rôles.
export const SERVER_NAME = 'Le QG 🌙';

export const ROLES = [
  { key: 'owner',  name: '👑 Fondateur',  color: 0xf1c40f, hoist: true, perms: ['Administrator'] },
  { key: 'admin',  name: '🛡️ Admin',      color: 0xe74c3c, hoist: true, perms: ['Administrator'] },
  { key: 'modo',   name: '🔨 Modérateur', color: 0x3498db, hoist: true,
    perms: ['KickMembers', 'BanMembers', 'ModerateMembers', 'ManageMessages', 'MuteMembers', 'MoveMembers', 'ViewAuditLog'] },
  { key: 'vip',    name: '💎 VIP',        color: 0x9b59b6, hoist: true, perms: [] },
  { key: 'gta',    name: '🚗 Joueur GTA', color: 0x2ecc71, hoist: false, perms: [] },
  { key: 'member', name: '😎 Membre',     color: 0x95a5a6, hoist: false, perms: [] },
];

// access: 'public' = tout le monde, 'readonly' = lecture seule, 'staff' = staff uniquement
export const CATEGORIES = [
  { name: '📌 INFOS', channels: [
    { key: 'welcome', name: '👋・bienvenue', access: 'readonly' },
    { key: 'rules',   name: '📜・règlement', access: 'readonly' },
    { key: 'annonces', name: '📢・annonces', access: 'readonly' },
    { key: 'roles',   name: '🎭・rôles',     access: 'readonly' },
  ]},
  { name: '💬 CHILL', channels: [
    { name: '💬・discussion' },
    { name: '😂・memes' },
    { name: '📸・photos' },
    { name: '🎵・musique' },
    { name: '🎮・jeux-vidéo' },
    { name: '🤖・commandes-bot' },
  ]},
  { name: '🚗 GTA', channels: [
    { name: '🚗・gta-discussion' },
    { name: '📷・screens-gta' },
    { name: '🤝・cherche-équipe' },
    { name: '🏁・events-gta' },
  ]},
  { name: '🔊 VOCAUX', channels: [
    { name: '🛋️ Salon Chill', type: 'voice' },
    { name: '🎮 Gaming 1', type: 'voice' },
    { name: '🎮 Gaming 2', type: 'voice' },
    { name: '🚗 GTA Session', type: 'voice' },
    { name: '🎵 Musique', type: 'voice' },
    { name: '💤 AFK', type: 'voice', key: 'afk' },
  ]},
  { name: '🛡️ STAFF', access: 'staff', channels: [
    { name: '🛡️・staff-chat', access: 'staff' },
    { key: 'logs', name: '📋・logs-modération', access: 'staff' },
    { name: '🔊 Staff', type: 'voice', access: 'staff' },
  ]},
];

export const RULES = `## 📜 Règlement du QG

**1.** Respect de tout le monde : pas d'insultes, de harcèlement, de racisme ni de discriminations.
**2.** Pas de spam, de flood ni de majuscules à outrance.
**3.** Pas de pub (serveurs, réseaux…) sans l'accord du staff.
**4.** Pas de contenu NSFW, choquant ou illégal.
**5.** Pas de triche ni de vente de comptes/argent GTA.
**6.** Utilise les bons salons pour chaque sujet.
**7.** Les décisions du staff doivent être respectées. Un souci ? Contacte un 🔨 Modérateur.

⚠️ Sanctions : avertissement → exclusion temporaire → kick → ban.

*En restant sur le serveur, tu acceptes ce règlement. Bon chill ! 🌙*`;

// Mots bloqués automatiquement par l'AutoMod de Discord (ajoute les tiens)
export const BANNED_WORDS = ['*nigg*', '*pédé*', 'fdp', 'ntm', '*discord.gg/*'];
