// Configure automatiquement le serveur : rôles, salons, règlement, AutoMod.
// À lancer UNE fois : npm run setup
import 'dotenv/config';
import {
  Client, GatewayIntentBits, ChannelType, PermissionFlagsBits as P,
  AutoModerationRuleEventType as Ev, AutoModerationRuleTriggerType as Tr,
  AutoModerationActionType as Act, EmbedBuilder,
} from 'discord.js';
import { SERVER_NAME, ROLES, CATEGORIES, RULES, BANNED_WORDS } from './config.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;
if (!DISCORD_TOKEN || !GUILD_ID) throw new Error('Remplis DISCORD_TOKEN et GUILD_ID dans le fichier .env');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  const guild = await client.guilds.fetch(GUILD_ID);
  console.log(`Configuration de ${guild.name}…`);
  await guild.setName(SERVER_NAME).catch(() => {});

  // Rôles (créés du plus bas au plus haut pour garder la hiérarchie)
  const roles = {};
  for (const r of [...ROLES].reverse()) {
    const existing = guild.roles.cache.find((x) => x.name === r.name);
    roles[r.key] = existing ?? await guild.roles.create({
      name: r.name, color: r.color, hoist: r.hoist, permissions: r.perms.map((p) => P[p]),
    });
    console.log(`  rôle ${r.name}`);
  }

  const everyone = guild.roles.everyone;
  const staff = [roles.owner, roles.admin, roles.modo];
  const overwrites = (access) => {
    if (access === 'staff') return [
      { id: everyone.id, deny: [P.ViewChannel] },
      ...staff.map((r) => ({ id: r.id, allow: [P.ViewChannel] })),
    ];
    if (access === 'readonly') return [
      { id: everyone.id, deny: [P.SendMessages, P.CreatePublicThreads], allow: [P.ViewChannel] },
      ...staff.map((r) => ({ id: r.id, allow: [P.SendMessages] })),
    ];
    return [];
  };

  // Catégories et salons
  const channels = {};
  for (const cat of CATEGORIES) {
    const category = guild.channels.cache.find((c) => c.type === ChannelType.GuildCategory && c.name === cat.name)
      ?? await guild.channels.create({ name: cat.name, type: ChannelType.GuildCategory, permissionOverwrites: overwrites(cat.access) });
    for (const ch of cat.channels) {
      const type = ch.type === 'voice' ? ChannelType.GuildVoice : ChannelType.GuildText;
      const channel = guild.channels.cache.find((c) => c.name === ch.name && c.parentId === category.id)
        ?? await guild.channels.create({
          name: ch.name, type, parent: category.id,
          permissionOverwrites: overwrites(ch.access ?? cat.access),
          ...(type === ChannelType.GuildText ? { rateLimitPerUser: ch.access ? 0 : 2 } : {}),
        });
      if (ch.key) channels[ch.key] = channel;
      console.log(`  salon ${ch.name}`);
    }
  }
  if (channels.afk) await guild.setAFKChannel(channels.afk).catch(() => {});

  // Messages d'info
  const embed = (title, desc, color = 0x5865f2) => new EmbedBuilder().setTitle(title).setDescription(desc).setColor(color);
  await channels.rules.send({ embeds: [embed('Règlement', RULES, 0xe74c3c)] });
  await channels.welcome.send({ embeds: [embed(`Bienvenue sur ${SERVER_NAME} !`,
    `Ici c'est **chill** : discussions, memes, gaming et **GTA** 🚗\n\n` +
    `➡️ Lis le ${channels.rules}\n➡️ Prends tes rôles dans ${channels.roles}\n➡️ Viens papoter dans les salons 💬 CHILL\n\nBon séjour ! 🌙`)] });
  await channels.roles.send({ embeds: [embed('🎭 Rôles',
    'Tape `/role gta` dans un salon pour obtenir (ou retirer) le rôle 🚗 **Joueur GTA** et être notifié des sessions et events GTA.')] });
  await channels.annonces.send({ embeds: [embed('📢 Ouverture !', `${SERVER_NAME} est ouvert. Invite tes potes ! 🎉`, 0x2ecc71)] });

  // AutoMod natif de Discord (fonctionne même quand le bot est éteint)
  const exempt = { exemptRoles: staff.map((r) => r.id) };
  const block = (msg) => ({ type: Act.BlockMessage, metadata: { customMessage: msg } });
  const alert = { type: Act.SendAlertMessage, metadata: { channel: channels.logs.id } };
  const rules = [
    { name: 'Mots interdits', triggerType: Tr.Keyword, triggerMetadata: { keywordFilter: BANNED_WORDS },
      actions: [block('Message bloqué : langage ou lien interdit.'), alert] },
    { name: 'Insultes / contenu sexuel', triggerType: Tr.KeywordPreset, triggerMetadata: { presets: [1, 2, 3] },
      actions: [block('Message bloqué par la modération.'), alert] },
    { name: 'Spam', triggerType: Tr.Spam, actions: [block('Message bloqué : spam détecté.'), alert] },
    { name: 'Spam de mentions', triggerType: Tr.MentionSpam,
      triggerMetadata: { mentionTotalLimit: 5, mentionRaidProtectionEnabled: true },
      actions: [block('Trop de mentions !'), alert, { type: Act.Timeout, metadata: { durationSeconds: 600 } }] },
  ];
  for (const r of rules) {
    await guild.autoModerationRules.create({ ...r, eventType: Ev.MessageSend, enabled: true, ...exempt })
      .then(() => console.log(`  AutoMod : ${r.name}`))
      .catch((e) => console.warn(`  AutoMod « ${r.name} » ignoré : ${e.message}`));
  }

  console.log('\n✅ Serveur configuré ! Lance maintenant le bot avec : npm start');
  client.destroy();
});

client.login(DISCORD_TOKEN);
