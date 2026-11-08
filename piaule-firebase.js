/* La Piaule — pont Firebase.
   La page de l'app parle à `window.claude.use(...)` (db, user, room, assets, downloads).
   Ce fichier fournit la même interface, mais branchée sur Firebase (Auth + Firestore),
   pour que l'app tourne seule sur n'importe quel hébergement gratuit. */
(function () {
  "use strict";
  window.__PWA = true;
  const cfg = window.PIAULE_FIREBASE || {};
  const configured = !!(cfg.apiKey && !/^REMPLACE/.test(cfg.apiKey));

  /* ---------- Petit écran plein (connexion / configuration) ---------- */
  const css = `
  .pl-gate{position:fixed;inset:0;z-index:200;background:var(--ink,#0f0e15);color:var(--fg,#f1eff7);display:flex;align-items:center;justify-content:center;padding:24px max(16px,env(safe-area-inset-left,0px));font-family:"Atkinson Hyperlegible",system-ui,sans-serif;overflow:auto}
  .pl-card{width:100%;max-width:380px;display:flex;flex-direction:column;gap:12px;text-align:center}
  .pl-card h1{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:30px;margin:0}
  .pl-card p{margin:0;color:var(--muted,#9a96ad);font-size:14px}
  .pl-card input{background:var(--raised,#211f2c);border:1px solid var(--line,#2a2836);border-radius:14px;padding:13px 14px;font:inherit;color:inherit}
  .pl-btn{min-height:48px;border-radius:14px;border:0;font:inherit;font-weight:800;cursor:pointer;background:var(--accent,#ff6b5a);color:var(--accent-ink,#1a0d0b)}
  .pl-btn.ghost{background:var(--raised,#211f2c);color:var(--fg,#f1eff7)}
  .pl-link{background:none;border:0;color:var(--accent,#ff6b5a);font:inherit;font-weight:700;cursor:pointer}
  .pl-err{color:#ff4d6a;font-size:13px;min-height:18px}
  .pl-sep{display:flex;align-items:center;gap:10px;color:var(--muted,#9a96ad);font-size:12px}
  .pl-sep::before,.pl-sep::after{content:"";flex:1;height:1px;background:var(--line,#2a2836)}
  .pl-logo{width:96px;height:96px;margin:0 auto;border-radius:28px;background:linear-gradient(135deg,#ff6b5a,#ffb347);display:grid;place-items:center}
  .pl-logo svg{width:70px;height:70px}
  .pl-card ol{text-align:left;color:var(--muted,#9a96ad);font-size:14px;padding-left:20px;margin:0}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const LOGO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="26" r="15" fill="#fff" opacity=".95"/><circle cx="20" cy="24" r="3.2" fill="#1b1424"/><path d="M26 24l7 2-7 3z" fill="#ffb347"/><path d="M18 13q2-6 6-3q3-5 6 1" fill="#fff"/></svg>';
  let gate = null;
  function showGate(html) {
    if (!gate) { gate = document.createElement("div"); gate.className = "pl-gate"; }
    gate.innerHTML = '<div class="pl-card"><div class="pl-logo">' + LOGO + "</div>" + html + "</div>";
    if (!gate.isConnected) (document.body || document.documentElement).appendChild(gate);
    return gate;
  }
  function hideGate() { if (gate) gate.remove(); }

  if (!configured || !window.firebase) {
    const show = () => showGate('<h1>La Piaule</h1><p>L\'app n\'est pas encore reliée à sa base de données.</p><ol><li>Crée un projet gratuit sur console.firebase.google.com</li><li>Ajoute une app Web et copie le bloc <b>firebaseConfig</b></li><li>Colle-le dans le fichier <b>firebase-config.js</b></li></ol><p>Tout est expliqué dans le README du dépôt.</p>');
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", show) : show();
    window.claude = { use: async () => null };
    return;
  }

  /* ---------- Firebase ---------- */
  firebase.initializeApp(cfg);
  const auth = firebase.auth();
  const fs = firebase.firestore();
  if (cfg.emulator) { auth.useEmulator("http://127.0.0.1:9099", { disableWarnings: true }); fs.useEmulator("127.0.0.1", 8080); } /* tests en local uniquement */
  try { fs.settings({ ignoreUndefinedProperties: true, merge: true }); } catch (e) {}
  try { fs.enablePersistence({ synchronizeTabs: true }).catch(() => {}); } catch (e) {}

  const FR = {
    "auth/invalid-email": "Adresse email invalide.",
    "auth/missing-password": "Entre un mot de passe.",
    "auth/weak-password": "Mot de passe trop court (6 caractères minimum).",
    "auth/email-already-in-use": "Un compte existe déjà avec cet email. Connecte-toi.",
    "auth/invalid-credential": "Email ou mot de passe incorrect.",
    "auth/wrong-password": "Email ou mot de passe incorrect.",
    "auth/user-not-found": "Aucun compte avec cet email.",
    "auth/too-many-requests": "Trop d'essais. Attends un peu et réessaie.",
    "auth/popup-closed-by-user": "Connexion annulée.",
    "auth/unauthorized-domain": "Ce site n'est pas autorisé dans Firebase (Authentication > Paramètres > Domaines autorisés).",
    "auth/operation-not-allowed": "Cette méthode de connexion n'est pas activée dans Firebase.",
    "auth/network-request-failed": "Pas de connexion internet."
  };
  const frErr = e => FR[e && e.code] || "Connexion impossible. Réessaie.";

  let mode = "login";
  function showLogin(err) {
    const signup = mode === "signup";
    const g = showGate(
      "<h1>" + (signup ? "Crée ton compte" : "Bon retour !") + "</h1>" +
      "<p>" + (signup ? "Rejoins La Piaule, c'est gratuit." : "Content de te revoir sur La Piaule.") + "</p>" +
      '<form id="plForm" style="display:flex;flex-direction:column;gap:10px">' +
      (signup ? '<input id="plName" placeholder="Pseudo" maxlength="32" autocomplete="nickname" required>' : "") +
      '<input id="plMail" type="email" placeholder="Email" autocomplete="email" required>' +
      '<input id="plPass" type="password" placeholder="Mot de passe" autocomplete="' + (signup ? "new-password" : "current-password") + '" required minlength="6">' +
      '<div class="pl-err" id="plErr"></div>' +
      '<button class="pl-btn" type="submit">' + (signup ? "Créer mon compte" : "Se connecter") + "</button></form>" +
      (signup ? "" : '<button class="pl-link" id="plReset" type="button">Mot de passe oublié ?</button>') +
      '<div class="pl-sep">ou</div><button class="pl-btn ghost" id="plGoogle" type="button">Continuer avec Google</button>' +
      '<p>' + (signup ? "Déjà un compte ? " : "Pas encore de compte ? ") + '<button class="pl-link" id="plSwitch" type="button">' + (signup ? "Se connecter" : "S'inscrire") + "</button></p>");
    const $ = id => g.querySelector("#" + id);
    if (err) $("plErr").textContent = err;
    $("plSwitch").onclick = () => { mode = signup ? "login" : "signup"; showLogin(); };
    $("plGoogle").onclick = async () => {
      const prov = new firebase.auth.GoogleAuthProvider();
      const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
      try { standalone ? await auth.signInWithRedirect(prov) : await auth.signInWithPopup(prov); }
      catch (e) { $("plErr").textContent = frErr(e); }
    };
    if ($("plReset")) $("plReset").onclick = async () => {
      const m = $("plMail").value.trim(); if (!m) { $("plErr").textContent = "Écris ton email au-dessus."; return; }
      try { await auth.sendPasswordResetEmail(m); $("plErr").style.color = "#3ecf8e"; $("plErr").textContent = "Email envoyé : regarde ta boîte mail."; }
      catch (e) { $("plErr").textContent = frErr(e); }
    };
    $("plForm").onsubmit = async e => {
      e.preventDefault(); $("plErr").textContent = "";
      const mail = $("plMail").value.trim(), pass = $("plPass").value;
      try {
        if (signup) {
          const cred = await auth.createUserWithEmailAndPassword(mail, pass);
          const name = $("plName").value.trim();
          await cred.user.updateProfile({ displayName: name });
          await fs.doc("comptes/" + cred.user.uid).set({ name, at: Date.now() });
        } else await auth.signInWithEmailAndPassword(mail, pass);
      } catch (e2) { $("plErr").textContent = frErr(e2); }
    };
  }
  auth.getRedirectResult().catch(e => showLogin(frErr(e)));

  let me = null, ownerUid = null;
  const authReady = new Promise(res => {
    auth.onAuthStateChanged(async u => {
      if (!u) { me = null; const go = () => showLogin(); document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", go) : go(); return; }
      me = u; hideGate();
      try { await timeout((async () => {
        const acc = await fs.doc("comptes/" + u.uid).get();
        const name = u.displayName || (acc.exists && acc.data().name) || "Membre";
        if (!acc.exists || acc.data().name !== name) await fs.doc("comptes/" + u.uid).set({ name, at: Date.now() });
        ownerUid = await claimOwner(u.uid);
        if (ownerUid === u.uid) await seed();
      })(), 12000); } catch (e) { dbError(e, "démarrage"); }
      res(u);
    });
  });

  /* Le tout premier compte connecté devient le créateur (panel). */
  async function claimOwner(uid) {
    const ref = fs.doc("config/owner");
    const s = await ref.get();
    if (s.exists) return s.data().uid;
    try { await ref.set({ uid, at: Date.now() }); return uid; } catch (e) { const s2 = await ref.get(); return s2.exists ? s2.data().uid : null; }
  }

  /* Contenu de départ, créé une seule fois par le créateur. */
  async function seed() {
    if ((await fs.doc("serveurs/la-piaule").get()).exists) return;
    const b = fs.batch(), d = (p, v) => b.set(fs.doc(p), v);
    const badges = {
      fondateur: ["Fondateur", "A créé La Piaule. Il n'y en a qu'un.", "crown", "#ffb347", "mythique"],
      equipe: ["Équipe Piaule", "Fait partie de l'équipe qui construit La Piaule.", "shield", "#ff6b5a", "legendaire"],
      dev: ["Développeur", "A codé une partie de l'application.", "wrench", "#4fb4ff", "legendaire"],
      beta: ["Bêta-testeur", "A testé La Piaule avant tout le monde et remonté des bugs.", "bug", "#3ecf8e", "epique"],
      partenaire: ["Partenaire", "Gère un groupe partenaire officiel de La Piaule.", "users", "#a57bff", "epique"],
      "homecity-staff": ["Staff HomeCity", "Membre de l'équipe du serveur HomeCity.", "shield", "#2fb7a5", "legendaire"],
      spotter: ["Spotter", "Repère et photographie bus, trams, métros et trains.", "camera", "#4fb4ff", "rare"],
      "spotter-or": ["Spotter d'or", "100 spots validés par l'équipe HomeCity.", "camera", "#ffcf4a", "legendaire"],
      "chasseur-rames": ["Chasseur de rames", "A capturé une rame rare ou un matériel en fin de service.", "train", "#ff5fa2", "epique"],
      machiniste: ["Machiniste", "Conduit des bus en simulation, sur OMSI et compagnie.", "wheel", "#ff8a3d", "rare"]
    };
    for (const [id, [name, desc, icon, color, rarity]] of Object.entries(badges)) d("badges/" + id, { name, desc, icon, color, rarity });
    d("serveurs/la-piaule", { name: "La Piaule", color: "#ff6b5a", tag: "LP", desc: "Le groupe officiel de La Piaule", public: true, owner: "", mods: [], createdAt: 1 });
    const sal = [["la-piaule-annonces", "annonces", "Infos", "annonces"], ["general", "💬 général", "Discussion"], ["jeux", "🎮 jeux", "Discussion"], ["musique", "🎧 musique", "Discussion"]];
    sal.forEach(([id, name, category, type], i) => d("salons/" + id, { serveur: "la-piaule", name, category, type: type || "text", order: i, createdAt: i + 1 }));
    d("certifs/la-piaule", { at: Date.now() });
    d("versions/v1-0", { num: "1.0", title: "La Piaule 1.0 🎉", notes: "- Première version officielle de La Piaule\n- App installable sur iPhone, Android et PC, gratuite\n- Réponses, réactions, quêtes, profils complets", at: Date.now() });
    d("attributions/" + me.uid, { badges: ["fondateur"], at: Date.now() });
    await b.commit();
  }

  /* Affiche clairement les erreurs de base de données (règles, réseau…) */
  let shown = {};
  function dbError(e, where) {
    const code = (e && e.code) || "inconnue";
    console.warn("La Piaule Firestore", where, e);
    if (shown[code]) return; shown[code] = 1;
    const msg = code === "permission-denied" ? "Accès refusé par la base de données. Vérifie que les règles Firestore (fichier firestore.rules) sont bien publiées."
      : code === "unavailable" ? "Impossible de joindre la base de données. Vérifie ta connexion, ou ouvre l'app dans Safari."
      : code === "failed-precondition" ? "La base Firestore n'est pas encore créée, ou il manque un index."
      : "Erreur de base de données (" + code + ").";
    const b = document.createElement("div");
    b.style.cssText = "position:fixed;left:12px;right:12px;top:calc(env(safe-area-inset-top,0px) + 12px);z-index:300;background:#ff4d6a;color:#fff;padding:12px 14px;border-radius:14px;font:600 14px system-ui,sans-serif;box-shadow:0 8px 24px #0006";
    b.textContent = "⚠️ " + msg + " [" + code + "]";
    b.onclick = () => b.remove();
    (document.body || document.documentElement).appendChild(b);
  }
  const timeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej({ code: "unavailable" }), ms))]);

  /* ---------- db : même forme que l'API de la page ---------- */
  const wrapSnap = s => ({ id: s.id, exists: s.exists, data: () => s.data(), metadata: { fromCache: false, hasPendingWrites: false } });
  function wrapQuery(ref, st) {
    st = st || { wheres: [], order: null, lim: null };
    const post = snap => {
      let docs = snap.docs.map(wrapSnap);
      if (st.order) { const [f, dir] = st.order; docs.sort((a, b) => ((a.data()[f] ?? 0) > (b.data()[f] ?? 0) ? 1 : -1) * (dir === "desc" ? -1 : 1)); }
      if (st.order && st.lim) docs = dir(st) === "asc" ? docs.slice(-st.lim) : docs.slice(0, st.lim);
      return { docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: {} };
    };
    const dir = s => (s.order && s.order[1]) || "asc";
    return {
      path: ref.path,
      where: (f, op, v) => wrapQuery(ref.where(f, op === "eq" ? "==" : op, v), { ...st, wheres: [...st.wheres, f] }),
      /* Trier côté téléphone quand il y a aussi un filtre : pas besoin de créer d'index Firestore. */
      orderBy: (f, d) => st.wheres.length ? wrapQuery(ref, { ...st, order: [f, d || "asc"] }) : wrapQuery(ref.orderBy(f, d || "asc"), st),
      limit: n => st.order ? wrapQuery(ref, { ...st, lim: n }) : wrapQuery(ref.limit(n), st),
      get: () => ref.get().then(post).catch(e => { dbError(e, ref.path); throw e; }),
      onSnapshot: (next, err) => ref.onSnapshot(s => next(post(s)), e => { dbError(e, ref.path); err && err({ code: e.code || "unavailable", message: e.message }); }),
      doc: id => wrapDoc(ref.doc(id)),
      add: data => ref.add(data).then(r => wrapDoc(r))
    };
  }
  function wrapDoc(ref) {
    return {
      id: ref.id, path: ref.path,
      get: () => ref.get().then(wrapSnap),
      set: d => ref.set(d), update: d => ref.update(d), delete: () => ref.delete(),
      onSnapshot: (next, err) => ref.onSnapshot(s => next(wrapSnap(s)), e => err && err({ code: e.code, message: e.message })),
      collection: p => wrapQuery(ref.collection(p))
    };
  }
  const db = { collection: p => wrapQuery(fs.collection(p)), doc: p => wrapDoc(fs.doc(p)) };

  /* ---------- user ---------- */
  const accCache = {};
  const user = {
    id: async () => (await authReady).uid,
    isOwner: async () => { await authReady; return !!me && me.uid === ownerUid; },
    canEdit: async () => { await authReady; return !!me && me.uid === ownerUid; },
    can: async () => true,
    me: async () => { await authReady; return { id: me.uid, name: me.displayName || "", avatarUrl: "", color: "", email: null, isOwner: me.uid === ownerUid, canEdit: me.uid === ownerUid }; },
    profiles: async ids => {
      ids = [].concat(ids || []); const out = {};
      await Promise.all(ids.map(async id => {
        if (!accCache[id]) { try { const s = await fs.doc("comptes/" + id).get(); accCache[id] = s.exists ? s.data() : { name: "" }; } catch (e) { accCache[id] = { name: "" }; } }
        out[id] = { id, name: accCache[id].name || "", avatarUrl: "", color: "", email: null, isMe: !!me && id === me.uid, guest: false };
      }));
      return out;
    },
    search: async q => {
      q = String(q || "").toLowerCase();
      const s = await fs.collection("comptes").limit(300).get();
      return s.docs.filter(d => (d.data().name || "").toLowerCase().includes(q)).slice(0, 20)
        .map(d => { accCache[d.id] = d.data(); return { id: d.id, name: d.data().name || "", avatarUrl: "", color: "", email: null, isMe: !!me && d.id === me.uid, guest: false }; });
    }
  };

  /* ---------- room : présence en ligne + « en train d'écrire » ---------- */
  let beat = null;
  const room = {
    presence: async patch => {
      await authReady; const ref = fs.doc("presence/" + me.uid);
      if (patch && patch.here === null) { clearInterval(beat); beat = null; return ref.delete().catch(() => {}); }
      const ping = () => ref.set({ here: true, at: Date.now() }).catch(() => {});
      ping(); clearInterval(beat); beat = setInterval(ping, 45000);
    },
    onPeers: fn => {
      let last = [];
      const emit = () => { const now = Date.now(); fn({ peers: last.filter(p => now - p.at < 120000).map(p => ({ by: p.id, peer: p.id, isMe: !!me && p.id === me.uid, presence: { here: true }, updatedAt: p.at, kind: "viewer", guest: false })), joined: [], left: [], updated: [] }); };
      const un = fs.collection("presence").onSnapshot(s => { last = s.docs.map(d => ({ id: d.id, at: d.data().at || 0 })); emit(); }, () => {});
      const t = setInterval(emit, 60000);
      return () => { un(); clearInterval(t); };
    },
    emit: async (topic, data) => { await authReady; if (topic === "typing") return fs.doc("typing/" + me.uid).set({ key: (data && data.key) || "", at: Date.now() }); },
    on: (topic, handler) => {
      if (topic !== "typing") return () => {};
      return fs.collection("typing").onSnapshot(s => {
        s.docChanges().forEach(ch => {
          const d = ch.doc.data(); if (!me || ch.doc.id === me.uid || Date.now() - (d.at || 0) > 6000) return;
          handler({ topic, data: { key: d.key }, by: ch.doc.id, peer: ch.doc.id, isMe: false, kind: "viewer", guest: false });
        });
      }, () => {});
    }
  };
  addEventListener("pagehide", () => { if (me) fs.doc("presence/" + me.uid).delete().catch(() => {}); });

  /* ---------- assets : images compressées, rangées dans Firestore ---------- */
  const imgCache = {};
  function compress(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file); const im = new Image();
      im.onload = () => {
        let max = 1280, q = 0.82, out = "";
        for (let i = 0; i < 6; i++) {
          const k = Math.min(1, max / Math.max(im.width, im.height));
          const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          out = c.toDataURL(file.type === "image/png" && i === 0 ? "image/png" : "image/jpeg", q);
          if (out.length < 900000) break; max *= 0.8; q -= 0.08;
        }
        URL.revokeObjectURL(url); res(out);
      };
      im.onerror = () => { URL.revokeObjectURL(url); rej(new Error("image")); };
      im.src = url;
    });
  }
  const assets = {
    upload: async file => {
      await authReady;
      const data = await compress(file);
      const ref = fs.collection("images").doc();
      await ref.set({ data, by: me.uid, at: Date.now() });
      imgCache[ref.id] = Promise.resolve(data);
      return { id: ref.id, url: data, sizeBytes: data.length, contentType: "image/jpeg" };
    },
    list: async () => ({ assets: [], usage: {} }),
    delete: async id => { await fs.doc("images/" + id).delete(); return { deleted: true }; }
  };
  const getImg = id => imgCache[id] || (imgCache[id] = fs.doc("images/" + id).get().then(s => (s.exists ? s.data().data : "")).catch(() => ""));
  /* La page affiche les images avec l'adresse /_blob/<id> : on la remplace par l'image stockée. */
  function fix(node) {
    if (!(node instanceof Element)) return;
    const els = [node, ...node.querySelectorAll('img[src^="/_blob/"],[style*="/_blob/"]')];
    for (const el of els) {
      const src = el.getAttribute && el.getAttribute("src");
      if (el.tagName === "IMG" && src && src.startsWith("/_blob/")) { const id = src.slice(7); el.removeAttribute("src"); getImg(id).then(u => { if (u) el.src = u; }); }
      const sty = el.getAttribute && el.getAttribute("style");
      if (sty && sty.includes("/_blob/")) {
        const m = sty.match(/\/_blob\/([\w-]+)/); if (!m) continue;
        el.style.backgroundImage = "none";
        getImg(m[1]).then(u => { if (u) el.style.backgroundImage = 'url("' + u + '")'; });
      }
    }
  }
  new MutationObserver(ms => { for (const m of ms) { if (m.type === "attributes") fix(m.target); else m.addedNodes.forEach(fix); } })
    .observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "style"] });

  /* ---------- downloads ---------- */
  const downloads = {
    save: async ({ filename, data }) => {
      const b = data instanceof Blob ? data : new Blob([data]);
      const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = filename || "fichier";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      return { status: "saved" };
    }
  };

  window.__signOut = async () => { try { if (me) await fs.doc("presence/" + me.uid).delete(); } catch (e) {} await auth.signOut(); location.reload(); };

  const caps = { db, user, room, assets, downloads };
  window.claude = { use: async name => { await authReady; return caps[name] || null; } };
})();
