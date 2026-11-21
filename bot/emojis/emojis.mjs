// Emojis originaux 128x128 en SVG
const sunsetGrad = `<linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd23f"/><stop offset=".55" stop-color="#ff5e8a"/><stop offset="1" stop-color="#b03cff"/></linearGradient>`;
const pink = '#ff4fa3', cyan = '#29e3ff';
const palm = (x, y, s = 1, c = '#1a0b2e') => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
  <path d="M-3 0 Q2 -40 10 -78 L15 -77 Q8 -38 4 0 Z"/>
  <path d="M12 -78 Q-10 -92 -36 -80 Q-14 -84 10 -74Z"/><path d="M12 -78 Q-6 -104 -30 -104 Q-8 -96 9 -76Z"/>
  <path d="M12 -78 Q20 -106 42 -108 Q24 -96 14 -76Z"/><path d="M12 -78 Q38 -92 58 -78 Q36 -82 14 -74Z"/>
  <path d="M12 -78 Q30 -74 44 -56 Q28 -68 12 -74Z"/><path d="M12 -78 Q-6 -72 -18 -54 Q-2 -68 12 -74Z"/></g>`;
const star = (cx, cy, r, f) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p += `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)} `; } return `<polygon points="${p}" fill="${f}" stroke="#1a0b2e" stroke-width="3" stroke-linejoin="round"/>`; };
const glow = `<filter id="g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
const txt = (t, size, fill, y = 78, extra = '') => `<text x="64" y="${y}" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-size="${size}" fill="${fill}" stroke="#1a0b2e" stroke-width="5" paint-order="stroke" ${extra}>${t}</text>`;

export const EMOJIS = {
  sunsetclub: `<defs>${sunsetGrad}<clipPath id="c"><circle cx="64" cy="64" r="60"/></clipPath></defs>
    <circle cx="64" cy="64" r="60" fill="#2a0f4a"/><g clip-path="url(#c)"><circle cx="64" cy="70" r="40" fill="url(#sun)"/>
    ${[78, 88, 97, 105].map((y, i) => `<rect x="0" y="${y}" width="128" height="${3 + i}" fill="#2a0f4a"/>`).join('')}
    <rect x="0" y="108" width="128" height="20" fill="#1a0b2e"/>${palm(30, 112, .8)}${palm(100, 112, .6)}</g>
    <circle cx="64" cy="64" r="60" fill="none" stroke="${pink}" stroke-width="5"/>`,
  palmier: `<defs>${sunsetGrad}</defs>${palm(56, 124, 1.05, '#1f9d55')}<path d="M59 124 Q64 84 72 42" stroke="#8b5a2b" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="66" cy="50" r="6" fill="#6b3f1d"/><circle cx="76" cy="52" r="6" fill="#6b3f1d"/>`,
  sunset: `<defs>${sunsetGrad}<clipPath id="c"><rect x="4" y="4" width="120" height="120" rx="26"/></clipPath></defs>
    <g clip-path="url(#c)"><rect width="128" height="128" fill="#3b1361"/><circle cx="64" cy="74" r="44" fill="url(#sun)"/>
    ${[80, 90, 99, 107].map((y, i) => `<rect x="0" y="${y}" width="128" height="${3 + i}" fill="#3b1361"/>`).join('')}
    <rect y="110" width="128" height="18" fill="${cyan}" opacity=".85"/></g>`,
  flamant: `<g stroke-linecap="round" fill="none"><path d="M60 92 L58 124 M70 92 L80 108 L66 112" stroke="#e8467c" stroke-width="5"/></g>
    <ellipse cx="66" cy="78" rx="30" ry="20" fill="${pink}" stroke="#1a0b2e" stroke-width="3"/>
    <path d="M86 72 Q102 50 84 30 Q70 16 58 28" stroke="#1a0b2e" stroke-width="15" fill="none" stroke-linecap="round"/>
    <path d="M86 72 Q102 50 84 30 Q70 16 58 28" stroke="${pink}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M58 22 L40 34 L56 36 Z" fill="#1a0b2e"/><circle cx="64" cy="26" r="3" fill="#1a0b2e"/>
    <path d="M50 74 Q66 64 82 76" stroke="#c2185b" stroke-width="4" fill="none"/>`,
  wanted: `<rect x="4" y="34" width="120" height="60" rx="14" fill="#1a0b2e"/>${[0, 1, 2, 3, 4].map((i) => star(20 + i * 22, 64, 12, i < 3 ? '#ffd23f' : '#4a3a5a')).join('')}`,
  sirene: `<defs>${glow}</defs><rect x="28" y="84" width="72" height="22" rx="6" fill="#2b2b3a"/>
    <path d="M36 86 Q36 44 64 40 Q92 44 92 86 Z" fill="#2b2b3a"/><path d="M40 86 Q40 48 64 46 L64 86Z" fill="#ff2d55" filter="url(#g)"/>
    <path d="M88 86 Q88 48 64 46 L64 86Z" fill="#1e6bff" filter="url(#g)"/>
    <path d="M18 40 L6 30 M14 58 L2 58 M110 40 L122 30 M114 58 L126 58" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>`,
  cash: `${[0, 1, 2].map((i) => `<g transform="translate(${8 + i * 6} ${60 - i * 16}) rotate(${-8 + i * 6} 56 24)">
    <rect width="104" height="48" rx="6" fill="#3fbf6f" stroke="#1a4d2e" stroke-width="4"/><rect x="10" y="9" width="84" height="30" rx="4" fill="none" stroke="#1a4d2e" stroke-width="2"/>
    <circle cx="52" cy="24" r="12" fill="#2a8f50"/><text x="52" y="31" text-anchor="middle" font-family="Arial Black" font-size="20" fill="#d9ffe6">$</text></g>`).join('')}`,
  bolide: `<defs>${glow}</defs><g filter="url(#g)"><path d="M8 82 L18 66 Q40 56 54 54 L76 40 Q96 38 110 52 L120 60 Q124 70 120 82 Z" fill="${pink}"/>
    <path d="M58 54 L76 44 Q90 43 100 54 Z" fill="${cyan}"/></g><rect x="6" y="80" width="116" height="6" rx="3" fill="#1a0b2e"/>
    <circle cx="36" cy="84" r="13" fill="#1a0b2e"/><circle cx="36" cy="84" r="6" fill="#ccc"/><circle cx="96" cy="84" r="13" fill="#1a0b2e"/><circle cx="96" cy="84" r="6" fill="#ccc"/>
    <path d="M2 100 L40 100 M60 100 L126 100" stroke="${cyan}" stroke-width="4" stroke-linecap="round"/>`,
  cocktail: `<path d="M22 26 L106 26 L64 72 Z" fill="${pink}" stroke="#1a0b2e" stroke-width="4" stroke-linejoin="round"/>
    <path d="M30 34 L98 34 L64 66Z" fill="#ff8fc7"/><path d="M64 72 L64 108 M42 112 L86 112" stroke="#1a0b2e" stroke-width="7" stroke-linecap="round"/>
    <circle cx="94" cy="24" r="14" fill="#ffd23f" stroke="#1a0b2e" stroke-width="3"/><path d="M40 4 L70 50" stroke="${cyan}" stroke-width="5" stroke-linecap="round"/>`,
  lunettes: `<path d="M8 48 L120 48" stroke="#1a0b2e" stroke-width="8" stroke-linecap="round"/>
    <path d="M12 48 L58 48 Q58 82 36 82 Q14 82 12 48Z" fill="#1a0b2e"/><path d="M70 48 L116 48 Q114 82 92 82 Q70 82 70 48Z" fill="#1a0b2e"/>
    <path d="M20 54 L34 54 L24 66Z M78 54 L92 54 L82 66Z" fill="${cyan}" opacity=".8"/>`,
  gg: `<rect x="6" y="20" width="116" height="88" rx="22" fill="#5865f2"/>${txt('GG', 64, '#fff', 88)}`,
  hype: `<rect x="2" y="30" width="124" height="68" rx="18" fill="${pink}"/>${txt('HYPE', 44, '#ffd23f', 80)}`,
  lol: `<rect x="6" y="26" width="116" height="76" rx="20" fill="#ffd23f"/>${txt('LOL', 54, '#fff', 84)}`,
  new: `<rect x="4" y="30" width="120" height="68" rx="16" fill="#2ecc71"/>${txt('NEW', 50, '#fff', 82)}`,
  check: `<circle cx="64" cy="64" r="56" fill="#2ecc71" stroke="#1a0b2e" stroke-width="4"/><path d="M36 66 L56 86 L94 44" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  croix: `<circle cx="64" cy="64" r="56" fill="#ff2d55" stroke="#1a0b2e" stroke-width="4"/><path d="M42 42 L86 86 M86 42 L42 86" stroke="#fff" stroke-width="14" stroke-linecap="round"/>`,
  alerte: `<path d="M64 10 L122 112 L6 112 Z" fill="#ffd23f" stroke="#1a0b2e" stroke-width="6" stroke-linejoin="round"/><rect x="57" y="42" width="14" height="40" rx="7" fill="#1a0b2e"/><circle cx="64" cy="96" r="8" fill="#1a0b2e"/>`,
  couronne: `<path d="M14 96 L8 36 L38 62 L64 24 L90 62 L120 36 L114 96 Z" fill="#ffd23f" stroke="#1a0b2e" stroke-width="5" stroke-linejoin="round"/>
    <rect x="14" y="96" width="100" height="16" rx="4" fill="#f0a500" stroke="#1a0b2e" stroke-width="5"/>
    <circle cx="64" cy="74" r="8" fill="${pink}"/><circle cx="36" cy="80" r="6" fill="${cyan}"/><circle cx="92" cy="80" r="6" fill="${cyan}"/>`,
  diamant: `<path d="M30 30 L98 30 L120 54 L64 116 L8 54 Z" fill="${cyan}" stroke="#1a0b2e" stroke-width="5" stroke-linejoin="round"/>
    <path d="M8 54 L120 54 M30 30 L46 54 L64 116 L82 54 L98 30 M46 54 L64 30 L82 54" stroke="#1a0b2e" stroke-width="3" fill="none"/><path d="M34 34 L46 50 L18 50Z" fill="#fff" opacity=".6"/>`,
  coeur: `<defs>${glow}</defs><path d="M64 112 L18 64 Q4 46 18 30 Q36 14 64 40 Q92 14 110 30 Q124 46 110 64 Z" fill="none" stroke="${pink}" stroke-width="10" stroke-linejoin="round" filter="url(#g)"/>`,
  manette: `<path d="M30 40 L98 40 Q120 40 124 76 Q126 104 108 104 Q96 104 88 88 L40 88 Q32 104 20 104 Q2 104 4 76 Q8 40 30 40Z" fill="#5865f2" stroke="#1a0b2e" stroke-width="5"/>
    <path d="M34 56 L34 76 M24 66 L44 66" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="90" cy="58" r="6" fill="${pink}"/><circle cx="102" cy="70" r="6" fill="#ffd23f"/><circle cx="78" cy="70" r="6" fill="#2ecc71"/><circle cx="90" cy="82" r="6" fill="${cyan}"/>`,
  feu: `<path d="M64 6 Q92 40 100 64 Q108 100 64 120 Q20 100 28 64 Q32 46 46 34 Q46 54 56 60 Q50 30 64 6Z" fill="#ff6a00" stroke="#1a0b2e" stroke-width="4"/>
    <path d="M64 50 Q84 74 80 92 Q76 110 64 110 Q48 110 46 92 Q46 76 58 70 Q58 82 64 84 Q60 66 64 50Z" fill="#ffd23f"/>`,
  vague: `<path d="M4 90 Q20 30 64 34 Q100 36 108 64 Q90 52 78 62 Q94 66 96 82 Q70 70 58 88 Q40 110 4 104Z" fill="#1e88e5" stroke="#1a0b2e" stroke-width="4"/>
    <path d="M60 42 Q92 42 100 60" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M4 104 L124 104 L124 120 L4 120Z" fill="${cyan}"/>`,
  micro: `<rect x="44" y="8" width="40" height="66" rx="20" fill="#2b2b3a" stroke="#1a0b2e" stroke-width="4"/><path d="M52 26 L76 26 M52 38 L76 38 M52 50 L76 50" stroke="#666" stroke-width="3"/>
    <path d="M30 58 Q30 92 64 92 Q98 92 98 58" stroke="${pink}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M64 92 L64 112 M44 116 L84 116" stroke="${pink}" stroke-width="7" stroke-linecap="round"/>`,
  boost: `<path d="M64 6 Q92 26 92 66 L92 92 L36 92 L36 66 Q36 26 64 6Z" fill="#f2f2f7" stroke="#1a0b2e" stroke-width="5"/><circle cx="64" cy="50" r="12" fill="${cyan}" stroke="#1a0b2e" stroke-width="4"/>
    <path d="M36 70 L18 94 L36 92Z M92 70 L110 94 L92 92Z" fill="${pink}" stroke="#1a0b2e" stroke-width="4" stroke-linejoin="round"/><path d="M48 96 Q64 130 80 96Z" fill="#ff6a00"/>`,
  giveaway: `<rect x="14" y="56" width="100" height="62" rx="6" fill="${pink}" stroke="#1a0b2e" stroke-width="5"/><rect x="8" y="40" width="112" height="22" rx="5" fill="#ff8fc7" stroke="#1a0b2e" stroke-width="5"/>
    <rect x="56" y="40" width="16" height="78" fill="#ffd23f"/><path d="M64 40 Q36 8 30 30 Q30 42 64 40 Q98 42 98 30 Q92 8 64 40Z" fill="#ffd23f" stroke="#1a0b2e" stroke-width="4"/>`,
};
