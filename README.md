# La Piaule 🐦

Une messagerie gratuite pour discuter entre potes : groupes, salons, messages privés, réactions, badges, quêtes et thèmes.
C'est une **app installable** (PWA) : elle s'installe depuis le navigateur sur iPhone, Android, Samsung et PC, sans store et sans rien payer.

## Ce qu'il y a dans le dépôt

| Fichier | Rôle |
|---|---|
| `src/page.html` | Le code de l'app (écrans, messages, profils, panel créateur, affiches…) |
| `index.html` | L'app prête à l'emploi, générée par `python3 build.py` |
| `piaule-firebase.js` | Le pont entre l'app et Firebase (comptes, base de données, images, présence) |
| `firebase-config.js` | **Les clés de ton projet Firebase, à remplir** |
| `firestore.rules` | Les règles de sécurité de la base de données |
| `manifest.webmanifest`, `sw.js`, `icons/` | Ce qui rend l'app installable |

## Mise en ligne (gratuite, environ 10 minutes)

### 1. Créer le projet Firebase
1. Va sur [console.firebase.google.com](https://console.firebase.google.com) et connecte-toi avec ton compte Google.
2. **Créer un projet**, nomme-le `la-piaule`. Tu peux désactiver Google Analytics.
3. Sur la page du projet, appuie sur l'icône **`</>`** (Web), écris `La Piaule`, puis **Enregistrer l'application**.
4. Copie le bloc `firebaseConfig` affiché et colle ses valeurs dans **`firebase-config.js`**, à la place des `REMPLACE_MOI`.

### 2. Activer la connexion
1. Menu **Authentication**, puis **Commencer**.
2. Onglet **Sign-in method** : active **Adresse e-mail/Mot de passe** et **Google**.
3. Onglet **Paramètres**, puis **Domaines autorisés** : ajoute `caramel6709-web.github.io`.

### 3. Créer la base de données
1. Menu **Firestore Database**, puis **Créer une base de données**. Choisis la région `eur3 (europe-west)` et le **mode production**.
2. Onglet **Règles** : remplace tout par le contenu de `firestore.rules`, puis **Publier**.

### 4. Mettre l'app en ligne avec GitHub Pages
1. Sur GitHub, ouvre le dépôt, puis **Settings**, puis **Pages**.
2. Dans **Source**, choisis **Deploy from a branch**, la branche qui contient l'app et le dossier `/ (root)`, puis **Save**.
3. Après une minute, l'app est en ligne sur `https://caramel6709-web.github.io/france-rp-site/`.

### 5. Premier lancement
- **Le premier compte créé devient le créateur.** Il a le panel ♛, la certification des groupes, les badges et les annonces.
  Crée donc ton compte en premier !
- Le groupe officiel, ses salons et le catalogue de badges se créent tout seuls à ce moment-là.

## Installer l'app sur son téléphone
- **iPhone** (Safari) : ouvre le lien, bouton **Partager**, puis **Sur l'écran d'accueil**.
- **Android / Samsung** (Chrome ou Samsung Internet) : ouvre le lien, menu **⋮**, puis **Installer l'application**.
- **PC** (Chrome ou Edge) : icône d'installation dans la barre d'adresse.

## Modifier l'app
Change `src/page.html`, puis lance `python3 build.py` pour régénérer `index.html`.

## Bon à savoir
- Tout tient dans l'offre gratuite de Firebase (offre Spark) pour une communauté de taille raisonnable.
- Les images sont compressées et rangées dans la base de données (pas besoin de Firebase Storage, qui est payant).
- Les messages ne sont pas chiffrés de bout en bout : l'équipe qui gère le projet Firebase peut techniquement les lire.
