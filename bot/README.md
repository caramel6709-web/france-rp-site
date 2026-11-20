# 🌙 Le QG — bot Soleria

Configure automatiquement un serveur Discord chill + GTA et le modère.

## Ce qui est créé
- **Rôles** : 👑 Fondateur, 🛡️ Admin, 🔨 Modérateur, 💎 VIP, 🚗 Joueur GTA, 😎 Membre
- **📌 INFOS** : bienvenue, règlement, annonces, rôles (lecture seule)
- **💬 CHILL** : discussion, memes, photos, musique, jeux-vidéo, commandes-bot
- **🚗 GTA** : gta-discussion, screens-gta, cherche-équipe, events-gta
- **🔊 VOCAUX** : Chill, Gaming 1/2, GTA Session, Musique, AFK
- **🛡️ STAFF** (caché) : staff-chat, logs-modération, vocal staff
- **AutoMod Discord** : mots interdits, insultes, spam, spam de mentions (alertes dans les logs)
- **Bot** : message de bienvenue/au revoir, rôle Membre automatique, `/clear` `/warn` `/mute` `/kick` `/ban` `/role`

## Installation (sur TON ordinateur)
1. Crée un serveur Discord vide.
2. Portail développeur → **Bot** : *Reset Token* (copie-le), active **Server Members Intent**.
3. Invite le bot : https://discord.com/oauth2/authorize?client_id=1539756485708353666&permissions=8&scope=bot%20applications.commands
4. Dans Discord : Paramètres → Avancés → **Mode développeur**, puis clic droit sur le serveur → *Copier l'identifiant*.
5. Installe [Node.js](https://nodejs.org), puis dans ce dossier :
   ```bash
   npm install
   cp .env.example .env   # puis remplis DISCORD_TOKEN et GUILD_ID
   npm run setup          # une seule fois : crée tout le serveur
   npm start              # laisse tourner : bienvenue + modération
   ```
6. Dans Paramètres du serveur → Rôles, place le rôle du bot **tout en haut**, et donne-toi 👑 Fondateur.

Pour que le bot reste en ligne 24h/24, héberge `npm start` sur un hébergeur (ex. un petit VPS ou un hébergeur de bots Discord).
Tout se personnalise dans `config.js`.
