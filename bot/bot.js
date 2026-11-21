// Bot permanent : bienvenue/au revoir, rôle auto, commandes de modération.
// Lancer avec : npm start (doit tourner en continu)
import 'dotenv/config';
import {
  Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits as P, MessageFlags,
} from 'discord.js';
import { ROLES } from './config.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const findChannel = (guild, part) => guild.channels.cache.find((c) => c.isTextBased() && c.name.includes(part));
const findRole = (guild, name) => guild.roles.cache.find((r) => r.name === name);
const SELF_ROLES = ROLES.filter((r) => r.self);
const warns = new Map(); // avertissements en mémoire (remis à zéro au redémarrage)

const commands = [
  new SlashCommandBuilder().setName('clear').setDescription('Supprime des messages')
    .addIntegerOption((o) => o.setName('nombre').setDescription('1 à 100').setRequired(true).setMinValue(1).setMaxValue(100))
    .setDefaultMemberPermissions(P.ManageMessages),
  new SlashCommandBuilder().setName('warn').setDescription('Avertit un membre')
    .addUserOption((o) => o.setName('membre').setDescription('Membre').setRequired(true))
    .addStringOption((o) => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(P.ModerateMembers),
  new SlashCommandBuilder().setName('mute').setDescription('Exclut temporairement un membre')
    .addUserOption((o) => o.setName('membre').setDescription('Membre').setRequired(true))
    .addIntegerOption((o) => o.setName('minutes').setDescription('Durée').setRequired(true).setMinValue(1).setMaxValue(40320))
    .addStringOption((o) => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(P.ModerateMembers),
  new SlashCommandBuilder().setName('kick').setDescription('Expulse un membre')
    .addUserOption((o) => o.setName('membre').setDescription('Membre').setRequired(true))
    .addStringOption((o) => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(P.KickMembers),
  new SlashCommandBuilder().setName('ban').setDescription('Bannit un membre')
    .addUserOption((o) => o.setName('membre').setDescription('Membre').setRequired(true))
    .addStringOption((o) => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(P.BanMembers),
  new SlashCommandBuilder().setName('role').setDescription('Prendre ou retirer un rôle')
    .addStringOption((o) => o.setName('nom').setDescription('Rôle').setRequired(true)
      .addChoices(...SELF_ROLES.map((r) => ({ name: r.name, value: r.key })))),
].map((c) => c.toJSON());

client.once('ready', async () => {
  const guild = await client.guilds.fetch(GUILD_ID);
  await guild.commands.set(commands);
  client.user.setActivity('『🌴』Sunset Club');
  console.log(`✅ ${client.user.tag} est en ligne`);
  // Compteurs SERVER STATS (Discord limite les renommages : toutes les 10 min)
  const updateStats = async () => {
    const g = await client.guilds.fetch(GUILD_ID);
    const chans = await g.channels.fetch();
    const set = (prefix, value) => {
      const c = chans.find((x) => x?.name.startsWith(prefix));
      if (c && c.name !== `${prefix} : ${value}`) c.setName(`${prefix} : ${value}`).catch(() => {});
    };
    set('『🌟』Membres', g.memberCount);
    set('『🚀』Boosts', g.premiumSubscriptionCount ?? 0);
  };
  updateStats();
  setInterval(updateStats, 10 * 60 * 1000);
});

client.on('guildMemberAdd', async (member) => {
  const memberRole = findRole(member.guild, '✅・Membre');
  if (memberRole) await member.roles.add(memberRole).catch(() => {});
  const ch = findChannel(member.guild, 'discussion');
  ch?.send({ embeds: [new EmbedBuilder().setColor(0x2ecc71).setThumbnail(member.displayAvatarURL())
    .setDescription(`👋 Bienvenue ${member} sur **${member.guild.name}** !\nTu es notre **${member.guild.memberCount}ᵉ** membre. Lis le règlement et installe-toi 🛋️`)] });
});

client.on('guildMemberRemove', (member) => {
  findChannel(member.guild, 'discussion')?.send(`😢 **${member.user.username}** a quitté le serveur.`);
});

const log = (guild, text) => findChannel(guild, 'logs')?.send({ embeds: [new EmbedBuilder().setColor(0xe67e22).setDescription(text).setTimestamp()] });

client.on('interactionCreate', async (i) => {
  if (!i.isChatInputCommand()) return;
  const reply = (content) => i.reply({ content, flags: MessageFlags.Ephemeral });
  const user = i.options.getUser('membre');
  const target = user && await i.guild.members.fetch(user.id).catch(() => null);
  const reason = i.options.getString('raison') ?? 'Aucune raison';
  try {
    switch (i.commandName) {
      case 'clear': {
        const deleted = await i.channel.bulkDelete(i.options.getInteger('nombre'), true);
        return reply(`🧹 ${deleted.size} messages supprimés.`);
      }
      case 'warn': {
        const n = (warns.get(user.id) ?? 0) + 1;
        warns.set(user.id, n);
        await user.send(`⚠️ Avertissement sur **${i.guild.name}** : ${reason}`).catch(() => {});
        if (n >= 3 && target) await target.timeout(60 * 60 * 1000, '3 avertissements');
        log(i.guild, `⚠️ ${user} averti par ${i.user} (${n}/3) — ${reason}`);
        return i.reply(`⚠️ ${user} a reçu un avertissement (${n}/3).${n >= 3 ? ' Mute 1h automatique.' : ''}`);
      }
      case 'mute': {
        const min = i.options.getInteger('minutes');
        await target.timeout(min * 60 * 1000, reason);
        log(i.guild, `🔇 ${user} mute ${min} min par ${i.user} — ${reason}`);
        return i.reply(`🔇 ${user} est mute pour ${min} min.`);
      }
      case 'kick':
        await target.kick(reason);
        log(i.guild, `👢 ${user.tag} expulsé par ${i.user} — ${reason}`);
        return i.reply(`👢 ${user.tag} a été expulsé.`);
      case 'ban':
        await i.guild.members.ban(user, { reason });
        log(i.guild, `🔨 ${user.tag} banni par ${i.user} — ${reason}`);
        return i.reply(`🔨 ${user.tag} a été banni.`);
      case 'role': {
        const def = SELF_ROLES.find((r) => r.key === i.options.getString('nom'));
        const role = findRole(i.guild, def.name);
        if (i.member.roles.cache.has(role.id)) { await i.member.roles.remove(role); return reply(`Rôle ${role.name} retiré.`); }
        await i.member.roles.add(role);
        return reply(`Rôle ${role.name} ajouté !`);
      }
    }
  } catch (e) {
    return reply(`❌ Impossible : ${e.message} (vérifie que le rôle du bot est tout en haut de la liste).`);
  }
});

client.login(DISCORD_TOKEN);
